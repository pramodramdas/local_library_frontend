import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { httpGet } from "../utils/http_util"
import { dateStringToFormatOne } from "../utils/date_util";
import {bookInstanceStatusColor} from "../config/css_config"
import { server } from "../config/server_config"

const AllBookInstances= ({action}) => {
    const [bookInstancesList, setBookInstancesList] = useState([]);

    const getBookInstancesList = async () => {
        let {data} = await httpGet(`${server.url}/catalog/bookInstances/?populate=yes&limit=10`)

        if(data)
            setBookInstancesList(data)
    }

    useEffect(() => {
        getBookInstancesList();
    }, []);

    return (
        <div style={{"float":"left", "textAlign":"left", "fontSize": "medium"}}>
            <h1>Book Instance List</h1>
            <div class="ui bulleted list">
                {
                    bookInstancesList.map((bookInstance) => {
                        return <div class="item">
                            <Link to={{pathname:`/catalog/bookinstance/${bookInstance._id}`,  state:JSON.parse(JSON.stringify(bookInstance))}}>
                                {bookInstance.book.title} : {bookInstance.imprint}
                            </Link>
                            &nbsp;-&nbsp;<span style={{color:bookInstanceStatusColor[bookInstance.status]}}>{bookInstance.status}</span> {bookInstance.status !== "Available" ? `(Due: ${dateStringToFormatOne(bookInstance.due_back)})`:""}
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default AllBookInstances;