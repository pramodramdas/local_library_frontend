import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import Catalog from './components/catalog'
import CreateCatalog from './components/create_catalog'
import GetCatalog from './components/get_catalog'
import Home from "./components/home"
import {MsgStore} from "./context/message"
import DisplayMsg from "./components/display_msg"

const App = () => {
	return (
		<div className="App" style={{height: "100%", width:"100%"}}>
			<MsgStore>
				<DisplayMsg/>
				<Router>
					<div className="ui grid container" style={{height: "100%", width:"100%", float:"left"}}>
						<div className="row">
							<div className="four wide column">
									<div className="three wide row" style={{height: "30%"}}>
										<GetCatalog />
									</div>
									<hr/>
									<div className="three wide row" style={{height: "70%", position: "relative"}}>
										<CreateCatalog />
									</div>
							</div>
							<div className="ten wide column">
								<Switch>
									<Route exact path="/"><Home /></Route>
									<Route path="/catalog"><Catalog /></Route>
								</Switch>
							</div>
						</div>
					</div>
				</Router>
			</MsgStore>
		</div>
	);
}

export default App;
