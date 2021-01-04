import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { httpGet } from "../utils/http_util"
import { dateStringToFormatOne } from "../utils/date_util";
import { server } from "../config/server_config"

const AllAuthors = () => {
    const [authorsList, setAuthorsList] = useState([]);

    const getBooks = async () => {
        let {data} = await httpGet(`${server.url}/catalog/authors/?limit=10`)

        if(data)
            setAuthorsList(data)
    }

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <div style={{"float":"left", "textAlign":"left", "fontSize": "medium"}}>
            <h1>Author List</h1>
            <div class="ui bulleted list">
                {
                    authorsList.map((author) => {
                        return <div class="item">
                            <Link style={{display:"inline"}} to={{pathname:`/catalog/author/${author._id}`,  state:JSON.parse(JSON.stringify(author))}}>
                                {author.family_name}, {author.first_name}
                            </Link>&nbsp;
                            ({dateStringToFormatOne(author.date_of_birth)} - {dateStringToFormatOne(author.date_of_death)})
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default AllAuthors;