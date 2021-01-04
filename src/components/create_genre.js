import React, {useRef, useContext, useEffect, useState} from 'react';
import { useParams, useHistory } from "react-router-dom";
import { httpPost, httpGet, httpPut } from "../utils/http_util"
import MsgContext from "../context/message"
import { server } from "../config/server_config"

const CreateGenre = () => {
    const {setMsg} = useContext(MsgContext);
    let { genreId } = useParams();
    const [genre, setGenre] = useState(null);
    let history = useHistory()
    const genreName = useRef();

    const onSubmit = async () => {
        if(!genreName.current || !genreName.current.value) {
            genreName.current.focus()
            return 
        }

        let url = ""
        let httpFunc
        if(genreId) {
            url = `${server.url}/catalog/genre/${genreId}/update`
            httpFunc = httpPut
        } else {
            url = `${server.url}/catalog/genre/create`
            httpFunc = httpPost
        }

        let resp = await httpFunc(url, {
            name:genreName.current.value,
        })
        if(!resp || resp.success == false) {
            setMsg("", (resp && resp.msg) || "error" )
        } else {
            history.push(`/catalog/genre/${genreId || resp.data.data}`)
        }
    }

    const getGenre = async () => {
        let {data} = await httpGet(`${server.url}/catalog/genre/${genreId}`)

        if(data) {
            setGenre(data)
        }
    }

    useEffect(() => {
        if(genreId && !genre) {
            getGenre();
        }
    }, []);

    return (
        <div className="ui form" style={{textAlign:"left"}}>
            <h1>{genreId ? "Update" : "Create"} Genre</h1>
            <div className="ui popup" className="field">
                <label>Genre:</label>
                <input ref={genreName} type="text" name="first-name" placeholder="Fantacy, Poetry etc." defaultValue={genre ? genre.name: ""}/>
            </div>
            <button className="ui button primary" onClick={onSubmit} type="submit">Submit</button>
        </div>
    )
}

export default CreateGenre;