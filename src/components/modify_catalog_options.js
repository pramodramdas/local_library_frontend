import { Link } from "react-router-dom";

const operations = ["update", "delete"]
const modifyOptions = (id, type, state={}) => {
    return (
        operations.map((op) => {
            return <div>
                <Link to={`/catalog/${type}/${id}/${op}`} state={state}>{`${op} ${type}`}</Link>
                <br/><br/>
            </div>
        })
    )
}

export default modifyOptions