import React from 'react';
import { Link } from "react-router-dom";

const BooksSummary = ({src, books}) => {
    return(
        <div style={{paddingLeft: "15px"}}>
            <h3>Books</h3>
                {
                    (books && books.length > 0) ? 
                    books.map((b) => {
                        return <React.Fragment>
                            <h4><Link to={`/catalog/book/${b._id}`}>{b.title}</Link></h4>
                            {b.summary}
                            <hr/>
                        </React.Fragment>
                    }) :
                    <React.Fragment>
                        {`This ${src} has no books.`}
                        <hr/>
                    </React.Fragment>
                }
        </div>
    )
}

export default BooksSummary;