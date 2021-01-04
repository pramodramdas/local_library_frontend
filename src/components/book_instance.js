import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { httpGet, httpDelete } from "../utils/http_util"
import { bookInstanceStatusColor } from "../config/css_config"
import { dateStringToFormatOne } from "../utils/date_util";
import modifyOptions from "./modify_catalog_options"
import { server } from "../config/server_config"

const BookInstance = ({bookInstanceId, action}) => {
    const params = useParams()
    const history = useHistory()
    const [bookInstance, setBookInstance] = useState(null);

    bookInstanceId = bookInstanceId || params.bookInstanceId
    const getBookInstances = async () => {
        let {data} = await httpGet(`${server.url}/catalog/bookinstance/${bookInstanceId}/?populate=yes`)

        if(data)
            setBookInstance(data)
    }

    useEffect(() => {
        if(bookInstanceId)
            getBookInstances();
    }, []);

    const onDelete = async () => {
        let {data} = await httpDelete(`${server.url}/catalog/bookinstance/${bookInstanceId}/delete`)

        if(data && data.success)
            history.push(`/catalog/bookinstances`)
    }

    let due = (bookInstance && bookInstance.status !== "Available") ? <span><h4>Due  back:</h4> {dateStringToFormatOne(bookInstance.due_back).toString()}<br/><br/></span> : ""

    return (
        <div className="inlineHeader" style={{paddingLeft: "15px"}}>
            {
                bookInstance ?
                <React.Fragment>
                    {
                        (action === "delete") ?
                        <React.Fragment>
                            <h1>Delete BookInstance</h1>
                            <h3>Do you really want to delete this BookInstance?</h3>
                            <h4>ID:</h4> {bookInstanceId}
                            <br/><br/>
                        </React.Fragment> :
                        <h1>ID: {bookInstanceId}</h1>
                    }
                    <h4>Title:</h4> <Link to={`/catalog/book/${bookInstance.book._id}`}>{bookInstance.book.title}</Link>
                    <br/><br/>
                    <h4>Imprint:</h4> {bookInstance.imprint}
                    <br/><br/>
                    <h4>Status:</h4> <span style={{color:bookInstanceStatusColor[bookInstance.status]}}>{bookInstance.status}</span>
                    <br/><br/>
                    {due}
                    <hr/>
                    {
                        action !== "delete" ? 
                        modifyOptions(bookInstanceId, "bookinstance", bookInstance) : 
                        <React.Fragment>
                            <h3>Do you really want to delete this BookInstance?</h3>
                            <button className="ui button primary" onClick={onDelete} type="submit">Delete</button>
                        </React.Fragment>
                    }
                </React.Fragment>:
                null
            }
        </div>
    )
}

export default BookInstance;