import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useHistory } from "react-router-dom";
import { httpGet, httpDelete } from "../utils/http_util"
import BooksSummary from "./books_summary";
import modifyOptions from "./modify_catalog_options"
import { server } from "../config/server_config"

const Genre = ({ genreId, action }) => {
    const params = useParams()

    genreId = genreId || params.genreId

    const { state } = useLocation()
    const history = useHistory()
    const [books, setBooks] = useState(null);
    const [genreName, setGenreName] = useState((state && state.name) || "");
    const getBooks = async () => {
        let {data} = await httpGet(`${server.url}/catalog/booksbygenreid/${genreId}`)

        if(data)
            setBooks(data)
    }

    const getGenre = async () => {
        let {data} = await httpGet(`${server.url}/catalog/genre/${genreId}`)

        if(data)
            setGenreName(data.name)
    }

    const onDelete = async () => {
        let {data} = await httpDelete(`${server.url}/catalog/genre/${genreId}/delete`)

        if(data && data.success)
            history.push(`/catalog/genres`)
    }

    useEffect(() => {
        getGenre();
        getBooks();
    }, []);

    if(action === "delete") {
        return(
            <div style={{fontSize: "16px", textAlign:"left"}}>
                <h1>Delete Genre: {genreName}</h1>
                {
                    books && books.length > 0 ?
                    <React.Fragment>
                        <b><h4>Delete the following books before attempting to delete this genre.</h4></b><br/>
                        <BooksSummary src="genre" books={books}/>
                    </React.Fragment> :
                    <React.Fragment>
                        <h3>Do you really want to delete this Genre?</h3>
                        <button className="ui button primary" onClick={onDelete} type="submit">Delete</button>
                    </React.Fragment>
                }
            </div>
        )
    } else {
        return (
            <div style={{fontSize: "16px", textAlign:"left"}}>
                <h1>Genre: {genreName}</h1>
                <BooksSummary src="genre" books={books}/>
                {modifyOptions(genreId, "genre", {_id:genreId, name:genreName})}
            </div>
        )
    }
}

export default Genre;