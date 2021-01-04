import { BrowserRouter as Router, Switch, Route, useRouteMatch } from "react-router-dom";
import Home from "./home"
import AllBooks from "./all_books";
import Book from "./book";
import AllAuthors from "./all_authors";
import AllGenres from "./all_genres";
import AllBookInstances from "./all_book_instances"
import BookInstance from "./book_instance"
import Genre from "./genre";
import Author from "./author";
import CreateAuthor from "./create_author"
import CreateGenre from "./create_genre"
import CreateBook from "./create_book"
import CreateInstance from "./create_book_instance"

const Catalog = () => {
    let { path } = useRouteMatch();

    return (
        <Switch>
            <Route exact path="/catalog"><Home /></Route>
            <Route path={`${path}/books`}><AllBooks /></Route>
            <Route path={`${path}/book/create`}><CreateBook /></Route>
            <Route path={`${path}/book/:bookId/update`}><CreateBook /></Route>
            <Route path={`${path}/book/:bookId/delete`}><Book action="delete"/></Route>
            <Route path={`${path}/book/:bookId`}><Book /></Route>
            <Route path={`${path}/bookinstances`}><AllBookInstances /></Route>
            <Route path={`${path}/bookinstance/create`}><CreateInstance /></Route>
            <Route path={`${path}/bookinstance/:bookInstanceId/update`}><CreateInstance /></Route>
            <Route path={`${path}/bookinstance/:bookInstanceId/delete`}><BookInstance action="delete" /></Route>
            <Route path={`${path}/bookinstance/:bookInstanceId`}><BookInstance /></Route>
            <Route path={`${path}/genres`}><AllGenres /></Route>
            <Route path={`${path}/genre/create`}><CreateGenre /></Route>
            <Route path={`${path}/genre/:genreId/update`}><CreateGenre /></Route>
            <Route path={`${path}/genre/:genreId/delete`}><Genre action="delete"/></Route>
            <Route path={`${path}/genre/:genreId`}><Genre /></Route>
            <Route path={`${path}/authors`}><AllAuthors /></Route>
            <Route path={`${path}/author/create`}><CreateAuthor /></Route>
            <Route path={`${path}/author/:authorId/update`}><CreateAuthor /></Route>
            <Route path={`${path}/author/:authorId/delete`}><Author action="delete"/></Route>
            <Route path={`${path}/author/:authorId`}><Author /></Route>
        </Switch>
    )
}

export default Catalog;
