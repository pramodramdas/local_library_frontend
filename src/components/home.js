import { useState, useEffect } from "react";
import { httpGet } from "../utils/http_util"
import { server } from "../config/server_config"

const initialCatalog = {
    "totalAuthors": 0,
    "totalBookInstances": 0,
    "totalBookInstancesAvailable": 0,
    "totalBooks": 0,
    "totalGenres": 0
}

const Home = () => {
    const [catalogSummay, setCatalogSummay] = useState(initialCatalog);

    const getCatalog = async () => {
        let {data} = await httpGet(`${server.url}/catalog/`)

        if(data)
            setCatalogSummay(data)
    }

    useEffect(() => {
        getCatalog();
    }, []);

    return (
        <div style={{"float":"left", "textAlign":"left", "fontSize": "medium"}}>
            <h1>Local Library Home</h1>
            <p>React implementation with hooks</p>
            <br/>
            <p>The library has the following record counts:</p>
            <div class="ui bulleted list">
                <div class="item"><b>Books: </b>{catalogSummay.totalAuthors}</div>
                <div class="item"><b>Copies: </b>{catalogSummay.totalBookInstances}</div>
                <div class="item"><b>Copies available: </b>{catalogSummay.totalBookInstancesAvailable}</div>
                <div class="item"><b>Authors: </b>{catalogSummay.totalBooks}</div>
                <div class="item"><b>Genres: </b>{catalogSummay.totalGenres}</div>
            </div>
        </div>
    )
}

export default Home;