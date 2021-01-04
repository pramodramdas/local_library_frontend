import React, {useRef, useContext, useEffect, useState} from 'react';
import { useParams, useHistory } from "react-router-dom";
import { httpPost, httpGet, httpPut } from "../utils/http_util"
import MsgContext from "../context/message"
import { server } from "../config/server_config"

const CreateAuthor = () => {
    const {setMsg} = useContext(MsgContext);
    let { authorId } = useParams();
    const [author, setAuthor] = useState(null);
    let history = useHistory()
    const firstName = useRef();
    const familyName = useRef();
    const dob = useRef();
    const dod = useRef();

    const onSubmit = async () => {
        if(!firstName.current || !firstName.current.value) {
            firstName.current.focus()
            return 
        }
        if(!familyName.current || !familyName.current.value) {
            familyName.current.focus()
            return
        }

        let url = ""
        let httpFunc
        if(authorId) {
            url = `${server.url}/catalog/author/${authorId}/update`
            httpFunc = httpPut
        } else {
            url = `${server.url}/catalog/author/create`
            httpFunc = httpPost
        }

        let resp = await httpFunc(url, {
            first_name:firstName.current.value,
            family_name:familyName.current.value,
            date_of_birth:dob.current.value && new Date(dob.current.value),
            date_of_death:dod.current.value && new Date(dod.current.value)
        })
        if(!resp || resp.success == false) {
            setMsg("", (resp && resp.msg) || "error" )
        } else {
            history.push(`/catalog/author/${authorId || resp.data.data}`)
        }
    }

    const getAuthor = async () => {
        let {data} = await httpGet(`${server.url}/catalog/author/${authorId}`)

        if(data) {
            setAuthor(data)
        }
    }

    useEffect(() => {
        if(authorId && !author) {
            getAuthor();
        }
    }, []);

    return (
        <div className="ui form" style={{textAlign:"left"}}>
            <h1>{authorId ? "Update" : "Create"} Author</h1>
            <div className="ui popup" className="field">
                <label>First Name:</label>
                <input ref={firstName} type="text" name="first-name" placeholder="First Name" defaultValue={author ? author.first_name: ""}/>
            </div>
            <div classname="field">
                <label>Family Name:</label>
                <input ref={familyName} type="text" name="last-name" placeholder="Last Name" defaultValue={author ? author.family_name: ""}/>
            </div>
            <div className="field">
                <label>Date of birth:</label>
                <div className="ui calendar" id="dob">
                    <div className="ui input right icon">
                        <input ref={dob} type="date" placeholder="Date/Time" defaultValue={author ? new Date(author.date_of_birth).toISOString().split('T')[0]: ""}/>
                    </div>
                </div>
            </div>
            <div class="field">
                <label>Date of death:</label>
                <div className="ui calendar" id="dod">
                    <div className="ui input right icon">
                        <input ref={dod} type="date" placeholder="Date/Time" defaultValue={author ?  new Date(author.date_of_death).toISOString().split('T')[0]: ""}/>
                    </div>
                </div>
            </div>
            <button className="ui button primary" onClick={onSubmit} type="submit">Submit</button>
        </div>
    )
}

export default CreateAuthor;