import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { httpGet } from "../utils/http_util"
import AllCopies from "./all_copies";
import modifyOptions from "./modify_catalog_options"
import { server } from "../config/server_config"

const Book = ({action}) => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const getBook = async () => {
        let {data} = await httpGet(`${server.url}/catalog/book/${bookId}?populate=yes`)

        if(data)
            setBook(data)
    }

    useEffect(() => {
        getBook();
    }, []);
    
    const renderBook = () => {
        return (
            <React.Fragment>
                <h1>{action === "delete" ? "Delete Book:" : "Title:" } {book.title}</h1>
                <h4>Author:</h4> <Link to={`/catalog/author/${book.author._id}`}>{book.author.family_name}, {book.author.first_name} </Link>
                <br/><br/>
                <h4>Summary:</h4> {book.summary}
                <br/><br/>
                <h4>ISBN:</h4> {book.isbn}
                <br/><br/>
                <h4>Genre:</h4>&nbsp;
                {book.genre.map((g, i) => {
                    return <React.Fragment>
                        <Link to={{pathname:`/catalog/genre/${g._id}`,  state:JSON.parse(JSON.stringify(g))}}>{g.name}</Link>
                        {i != book.genre.length-1 ? ", " : null}
                    </React.Fragment>
                })}
                <hr/>
                <AllCopies bookId={bookId} action={action}/>
            </React.Fragment>
        )
    }

    return (
        <div className="inlineHeader" style={{fontSize: "16px"}}>
            {
                book &&
                <React.Fragment>
                    {renderBook()}
                    {(action !== "delete") ? modifyOptions(bookId, "book", book): null}
                </React.Fragment>
            }
        </div>
    )
}

export default Book;