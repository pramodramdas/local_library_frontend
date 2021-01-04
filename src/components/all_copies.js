import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { httpGet, httpDelete } from "../utils/http_util"
import {bookInstanceStatusColor} from "../config/css_config"
import { server } from "../config/server_config"

const AllCopies = ({bookId, action}) => {
    const [bookInstances, setBookInstances] = useState([]);
    const history = useHistory()

    const getBookInstances = async () => {
        let {data} = await httpGet(`${server.url}/catalog/bookinstancesbybookid/${bookId}`)

        if(data)
            setBookInstances(data)
    }

    useEffect(() => {
        getBookInstances();
    }, []);

    const renderCopies = () =>  {
        return bookInstances.map((bi) => {  
            let due = (bi.status !== "Available") ? <span><h4>Due:</h4> {new Date(bi.due_back).toString()}<br/><br/></span> : ""
            return <React.Fragment>
                <span style={{color:bookInstanceStatusColor[bi.status]}}>{bi.status}</span>
                <br/><br/>
                <h4>Imprint:</h4> {bi.imprint}
                <br/><br/>
                {due}
                <h4>Id:</h4> <Link to={`/catalog/bookinstance/${bi._id}`}>{bi._id}</Link>
                <hr/>
            </React.Fragment>
        })
    }

    const onDelete = async () => {
        let {data} = await httpDelete(`${server.url}/catalog/book/${bookId}/delete`)
        
        if(data && data.success)
            history.push(`/catalog/books`)
    }

    if(!bookInstances || bookInstances.length == 0) {
        return (
            <div className="inlineHeader" style={{paddingLeft: "15px"}}>
                {
                    (action == "delete") ?
                    <React.Fragment>
                        <h3>Do you really want to delete this Book?</h3>
                        <button className="ui button primary" onClick={onDelete} type="submit">Delete</button>
                    </React.Fragment> :
                    <React.Fragment>There are no copies of this book in the library.<hr/></React.Fragment>
                }
            </div>
        )
    } else {
        return (
            <div className="inlineHeader" style={{paddingLeft: "15px"}}>
                {
                    (action == "delete") ?
                    <React.Fragment>
                        <h4><b>Delete the following copies before attempting to delete this Book.</b></h4>
                        <br/><br/>
                    </React.Fragment> :
                    null
                }
                {renderCopies()}
            </div>
        )
    }

}

export default AllCopies;