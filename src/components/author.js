import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useHistory } from "react-router-dom";
import { httpGet, httpDelete } from "../utils/http_util"
import { dateStringToFormatOne } from "../utils/date_util";
import BooksSummary from "./books_summary";
import modifyOptions from "./modify_catalog_options"
import { server } from "../config/server_config"

const Author = ({action}) => {
    const {authorId} = useParams()

    const { state } = useLocation()
    const history = useHistory()
    const [books, setBooks] = useState(null);
    const [authorObj, setAuthorObj] = useState(state || {});
    const getBooks = async () => {
        let {data} = await httpGet(`${server.url}/catalog/booksbyauthorid/${authorId}`)

        if(data)
            setBooks(data)
    }

    const getAuthor = async () => {
        let {data} = await httpGet(`${server.url}/catalog/author/${authorId}`)

        if(data)
            setAuthorObj(data)
    }

    const onDelete = async () => {
        let {data} = await httpDelete(`${server.url}/catalog/author/${authorId}/delete`)
        if(data && data.success)
            history.push(`/catalog/authors`)
    }

    useEffect(() => {
        getBooks();
        getAuthor();
    }, []);

    if(action === "delete") {
        return (
            <div style={{fontSize: "16px", textAlign:"left"}}>
                <h1>Delete Author: {`${authorObj.family_name}, ${authorObj.first_name}`}</h1>
                ({dateStringToFormatOne(authorObj.date_of_birth)} - {dateStringToFormatOne(authorObj.date_of_death)})
                <br/><br/>
                {
                    (books && books.length > 0) ?
                    <React.Fragment>
                        <b><h4>Delete the following books before attempting to delete this genre.</h4></b><br/>
                        <BooksSummary src="author" books={books}/>
                    </React.Fragment> :
                    <React.Fragment>
                        <h3>Do you really want to delete this Author?</h3>
                        <button className="ui button primary" onClick={onDelete} type="submit">Delete</button>
                    </React.Fragment>
                }
            </div>
        )
    } else {
        return (
            <div style={{fontSize: "16px", textAlign:"left"}}>
                <h1>Author: {`${authorObj.family_name}, ${authorObj.first_name}`}</h1>
                ({dateStringToFormatOne(authorObj.date_of_birth)} - {dateStringToFormatOne(authorObj.date_of_death)})
                <br/><br/>
                <BooksSummary src="author" books={books}/>
                {modifyOptions(authorId, "author", authorObj)}
            </div>
        )
    }
}

export default Author;