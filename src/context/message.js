import React from 'react';

const Context = React.createContext({msg: '', type: ''});

export class MsgStore extends React.Component {
    state = { msg: '', type: '' };

    setMsg = (type="", msg="") => {
        this.setState({ type, msg });
    };

    render() {
        return (
            <Context.Provider
            value={{ ...this.state, setMsg: this.setMsg }}
            >
                {this.props.children}
            </Context.Provider>
        );
    }
}

export default Context;
