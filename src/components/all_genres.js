import { useState, useEffect } from "react";
import { httpGet } from "../utils/http_util"
import { Link } from "react-router-dom";
import { server } from "../config/server_config"

const AllGenres = () => {
    const [genresList, setGenresList] = useState([]);

    const getGenres = async () => {
        let {data} = await httpGet(`${server.url}/catalog/genres/`)

        if(data)
            setGenresList(data)
    }

    useEffect(() => {
        getGenres();
    }, []);

    return (
        <div style={{"float":"left", "textAlign":"left", "fontSize": "medium"}}>
            <h1>Genre List</h1>
            <div class="ui bulleted list">
                {
                    genresList.map((genre) => {
                        return <div class="item">
                            <Link to={{pathname:`/catalog/genre/${genre._id}`,  state:JSON.parse(JSON.stringify(genre))}}>{genre.name} </Link>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default AllGenres;