import React, {useRef, useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { httpPost, httpGet, httpPut } from "../utils/http_util"
import MsgContext from "../context/message"
import { server } from "../config/server_config"

const CreateBook = () => {
    const {setMsg} = useContext(MsgContext);
    let { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [genresSelected, setGenresSelected] = useState(new Set());

    let history = useHistory()
    const authorName = useRef();
    const bookTitle = useRef();
    const summary = useRef();
    const isbn = useRef();

    const onSubmit = async () => {
        if(!bookTitle.current || !bookTitle.current.value) {
            bookTitle.current.focus()
            return 
        }
        if(!summary.current || !summary.current.value) {
            summary.current.focus()
            return 
        }
        if(!isbn.current || !isbn.current.value) {
            isbn.current.focus()
            return 
        }

        let url = ""
        let httpFunc
        if(bookId) {
            url = `${server.url}/catalog/book/${bookId}/update`
            httpFunc = httpPut
        } else {
            url = `${server.url}/catalog/book/create`
            httpFunc = httpPost
        }

        let resp = await httpFunc(url, {
            title:bookTitle.current.value,
            summary:summary.current.value,
            isbn:isbn.current.value,
            genre:Array.from(genresSelected),
            author:authorName.current.value
        })
        if(!resp || resp.success == false) {
            setMsg("", (resp && resp.msg) || "error" )
        } else {
            history.push(`/catalog/book/${bookId || resp.data.data}`)
        }
    }

    const getGenres = async () => {
        let {data} = await httpGet(`${server.url}/catalog/genres`)

        if(data)
            setGenres(data)
    }

    const getAuthors = async () => {
        let {data} = await httpGet(`${server.url}/catalog/authors`)

        if(data)
            setAuthors(data)
    }

    const getBook = async () => {
        let {data} = await httpGet(`${server.url}/catalog/book/${bookId}`)

        if(data) {
            setBook(data)
            setGenresSelected(data.genre)
        }
    }

    useEffect(() => {
        if(bookId && !book) {
            getBook();
        }
        getGenres();
        getAuthors();
    }, []);

    const renderAuthor = () => {
        let authorId = book && book.author
        return (
            <select class="ui dropdown" placeholder="Select Friend" required="true" ref={authorName}>
                {
                    authors.map((a) => {
                        return <option value={a._id} style={{color:"#495057"}} selected={a._id == authorId}>{`${a.family_name},${a.first_name}`}</option>
                    })
                }
            </select>
        )
    }

    const onGenreChange = (e) => {
        let selected = new Set(genresSelected)
        if(e) {
            if(e.target.checked) 
                selected.add(e.target.value)
            else
                selected.delete(e.target.value)
            setGenresSelected(selected)
        }
    }

    const renderGenre = () => {
        let genreIds = (book && book.genre) || []
        return (
            <div> 
                {    
                    genres.map((g) => {
                        return <div class="ui checkbox">
                            <input type="checkbox" id={g.name} name={g.name} value={g._id} onChange={onGenreChange} defaultChecked={(genreIds.indexOf(g._id) > -1) ? "checked" : ""}/>
                            <label>{g.name}</label>
                        </div>
                    })
                }
            </div>
        )
    }

    return (
        
        <div className="ui form" style={{textAlign:"left"}}>
            {/* <DisplayMsg/> */}
            <h1>{bookId ? "Update" : "Create"} Book</h1>
            <div className="ui popup" className="field">
                <label>Title:</label>
                <input ref={bookTitle} type="text" name="first-name" placeholder="Name of book" defaultValue={book ? book.title: ""}/>
            </div>
            <div className="ui popup" className="field">
                <label>Author:</label>
                {renderAuthor()}
            </div>
            <div className="ui popup" className="field">
                <label>Summary:</label>
                <input ref={summary} type="text" name="first-name" placeholder="Summary" defaultValue={book ? book.summary: ""}/>
            </div>
            <div className="ui popup" className="field">
                <label>ISBN:</label>
                <input ref={isbn} type="text" name="first-name" placeholder="ISBN" defaultValue={book ? book.isbn: ""}/>
            </div>
            <div className="ui popup" className="field">
                <label>Genre:</label>
                {renderGenre()}
            </div>
            <button className="ui button primary" onClick={onSubmit} type="submit">Submit</button>
        </div>
    )
}

export default CreateBook;