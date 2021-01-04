import React, {useRef, useContext, useEffect, useState} from 'react';
import { useParams, useHistory } from "react-router-dom";
import { httpPost, httpGet, httpPut } from "../utils/http_util"
import MsgContext from "../context/message"
import { server } from "../config/server_config"

const CreateInstance = () => {
    const {setMsg} = useContext(MsgContext);
    let { bookInstanceId } = useParams();
    const [books, setBooks] = useState([]);
    const [bookInstance, setBookInstance] = useState(null);
    let history = useHistory()
    const imprint = useRef();
    const dueBack = useRef();
    const statusName = useRef();
    const bookTitle = useRef();

    const onSubmit = async () => {
        if(!bookTitle.current || !bookTitle.current.value) {
            bookTitle.current.focus()
            return 
        }
        if(!statusName.current || !statusName.current.value) {
            statusName.current.focus()
            return 
        }
        if(!imprint.current || !imprint.current.value) {
            imprint.current.focus()
            return 
        }

        let url = ""
        let httpFunc
        if(bookInstanceId) {
            url = `${server.url}/catalog/bookinstance/${bookInstanceId}/update`
            httpFunc = httpPut
        } else {
            url = `${server.url}/catalog/bookinstance/create`
            httpFunc = httpPost
        }

        let resp = await httpFunc(url, {
            book:bookTitle.current.value,
            status:statusName.current.value,
            imprint:imprint.current.value,
            due_back:dueBack.current.value && new Date(dueBack.current.value)
        })
        if(!resp || resp.success == false) {
            setMsg("", (resp && resp.msg) || "error" )
        } else {
            history.push(`/catalog/bookinstance/${bookInstanceId || resp.data.data}`)
        }
    }

    const getBooks = async () => {
        let {data} = await httpGet(`${server.url}/catalog/books`)

        if(data)
            setBooks(data)
    }

    
    const getBookInstance = async () => {
        let {data} = await httpGet(`${server.url}/catalog/bookinstance/${bookInstanceId}`)

        if(data) {
            setBookInstance(data)
        }
    }

    useEffect(() => {
        if(bookInstanceId && !bookInstance) {
            getBookInstance();
        }
        getBooks()
    }, []);

    const renderBooks = () => {
        let bookId = bookInstance && bookInstance.book
        return (
            <select class="ui dropdown" placeholder="Select Book" required="true" ref={bookTitle}>
                {
                    books.map((b) => {
                        return <option value={b._id} style={{color:"#495057"}} selected={bookId === b._id}>{b.title}</option>
                    })
                }
            </select>
        )
    }

    const renderStatus= () => {
        let statusList = ["Maintenance", "Available", "Loaned", "Reserved"]
        let status = bookInstance && bookInstance.status
        return (
            <select class="ui dropdown" placeholder="Select Status" required="true" ref={statusName}>
                {
                    statusList.map((name) => {
                        return <option value={name} style={{color:"#495057"}} selected={status === name}>{name}</option>
                    })
                }
            </select>
        )
    }


    return (
        
        <div className="ui form" style={{textAlign:"left"}}>
            {/* <DisplayMsg/> */}
            <h1>Create BookInstance</h1>
            <div className="ui popup" className="field">
                <label>Book:</label>
                {renderBooks()}
            </div>
            <div className="ui popup" className="field">
                <label>Inprint:</label>
                <input ref={imprint} type="text" name="imprint" placeholder="Publisher and date information" defaultValue={bookInstance ? bookInstance.imprint: ""}/>
            </div>
            <div className="ui popup" className="field">
                <label>Date when book available:</label>
                <div className="ui calendar" id="dod">
                    <div className="ui input right icon">
                        <input ref={dueBack} type="date" placeholder="Date/Time" defaultValue={bookInstance ? new Date(bookInstance.due_back).toISOString().split('T')[0]: ""}/>
                    </div>
                </div>
            </div>
            <div className="ui popup" className="field">
                <label>Status:</label>
                {renderStatus()}
            </div>
            <button className="ui button primary" onClick={onSubmit} type="submit">Submit</button>
        </div>
    )
}

export default CreateInstance;