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
      cat: 0, 
      currentEvent: "---",
      a: '', 
      b: '',
    }
    // if used with currentEvent will update to the type of event
    this.update = this.update.bind(this)
  }
  // update based on an event
  update(e) {
    // it will change state of txt but not state of cat
    this.setState({
      txt: e.target.value,
      currentEvent: e.type,
      a: this.refs.a.value, // only change based on reference a
      b: this.refs.b.value  // only change based on reference b
    })
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

      // onTouchStart, onTouchMove, onTouchEnd are for touch screen i.e. iPad

      // className is used for CSS
      <div className="application">
        <Title text="123456"/>
        <h1>{txt}</h1>
        <h1>{this.state.txt} - {this.state.cat}</h1>
        <Widget update={this.update.bind(this)}/>
        <Widget update={this.update.bind(this)}/>
        <Widget update={this.update.bind(this)}/>
        <b>Bold</b>
        <Button>I <Heart /> React</Button>
        <textarea
          onKeyPress={this.update}
          onCopy={this.update}
          onCut={this.update}
          onPaste={this.update}
          onFocus={this.update}
          onBlur={this.update}
          onDoubleClick={this.update}
          onTouchStart={this.update}
          onTouchMove={this.update}
          onTouchEnd={this.update}
          cols="30"
          rows="10"
        />
        <h1>{this.state.currentEvent}</h1>
        <input ref="a" type="text" onChange={this.update.bind(this)} /> {this.state.a}
        <input ref="b" type="text" onChange={this.update.bind(this)} /> {this.state.b}

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

// Widget component is a stateless child component of App
const Widget = (props) => 
  <input type="text" onChange={props.update.bind(this)}/>

// Button component is a stateless child component of App
const Button = (props) =>
  <button>{props.children}</button>

const Title = (props) => 
  <h1>Title: {props.text}</h1>

Title.propTypes = {
  text(props, propName, component){
    // similar to text: PropTypes.string.isRequired
    if(!(propName in props)){
      return new Error(`missing ${propName}`)
    }
    // additional validation that check length of string
    if(props[propName].length < 6){
      return new Error(`${propName} was too short`)
    }
  }
}

class Heart extends React.Component {
  render() {
    return <span>&hearts;</span>
  }
}

export default App