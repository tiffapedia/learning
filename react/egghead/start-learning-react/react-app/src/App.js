import React from 'react';
import PropTypes from 'prop-types';

// 1. create stateless component
//const App = () => <h1>Hello stateless</h1>

// 2. create component using class with state
class App extends React.Component { 
  // state are values changed by the component
  constructor() {
    super();
    this.state = {
      txt: "this is the state txt",
      cat: 0
    }
  }
  // update based on an event
  update(e) {
    // it will change state of txt but not state of cat
    this.setState({txt: e.target.value})
  }
  render(){

    // returns a DOM representation of our component
    // in this case, it is in JSX format (HTML-like)
    //return <h1>Hello World</h1>
    // -> virtualDOM -> HTML

    // React does this so it can do virtualDOM diffing

    // the difference between JSX and HTML is that 
    // JSX cannot use "class", so it uses "className" instead

    // JSX gets compiled to JavaScript
    //return React.createElement("h1", null, "Hello Eggheads")

    // the DOM representation can only be one, so 
    // multiple JSX elements must be wrapped in an enclosing tag
    // because multiple JSX elements == multiple React.createElement() function calls

    let txt = this.props.txt

    // without widget
    /*
    return (
      <div>
        <h1>{txt}</h1>
        <h1>{this.state.txt} - {this.state.cat}</h1>
        <input type="text" onChange={this.update.bind(this)}/>
        <b>Bold</b>
      </div>
    )
    */

    // with widget
    // aka child component (widget) updates parent component (state)
    // multiple widget allows multiple updates to parent component
    return (
      <div>
        <h1>{txt}</h1>
        <h1>{this.state.txt} - {this.state.cat}</h1>
        <Widget update={this.update.bind(this)}/>
        <Widget update={this.update.bind(this)}/>
        <Widget update={this.update.bind(this)}/>
        <b>Bold</b>
        <Button>React</Button>
      </div>
    )
  }
}

// props are static values passed in to the app 
App.propTypes = {
  txt: PropTypes.string,
  cat: PropTypes.number.isRequired
}

App.defaultProps = {
  txt: "this is the default prop txt"
}

const Widget = (props) => 
  <input type="text" onChange={props.update.bind(this)}/>

const Button = (props) =>
  <button>{props.children}</button>

export default App