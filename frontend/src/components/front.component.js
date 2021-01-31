import React, { Component } from 'react';

export default class Front extends Component {

  render() {
    
    const mystyle = {
      padding: "10px",
      backgroundColor: "purple",
      fontFamily: "Lato",
      justifyContent: "center",
      color: "white",
      alignItems: "center"
    };
    const body = {
      
    };
    const amin = {
      padding: "10px",
      fontFamily: "Lato",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      backgroundColor: "green",

    };
    return (
      <div>
          <h1 style={mystyle}>Welcome to Aminkedin!</h1>
          <h4 style={amin}>We'll help you find the perfect Job.</h4>
        </div>
    );
  }
}