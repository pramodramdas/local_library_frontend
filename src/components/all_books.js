import { useState, useEffect } from "react";
import { httpGet } from "../utils/http_util"
import { Link } from "react-router-dom";
import { server } from "../config/server_config"

const AllBooks = () => {
    const [booksList, setBooksList] = useState([]);

    const getBooks = async () => {
        let {data} = await httpGet(`${server.url}/catalog/books/?limit=10`)

        if(data)
            setBooksList(data)
    }

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <div style={{"float":"left", "textAlign":"left", "fontSize": "medium"}}>
            <h1>Book List</h1>
            <div class="ui bulleted list">
                {
                    booksList.map((book) => {
                        return <div class="item">
                            <Link to={{pathname:`/catalog/book/${book._id}`,  state:JSON.parse(JSON.stringify(book))}}>{book.title} </Link>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default AllBooks;