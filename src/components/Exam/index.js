import React, { Component } from 'react';
import AceEditor from 'react-ace';
import firestore from "../Firebase/firebase.js";
import firebase from 'firebase'


export default class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      textInput: ''
    }

    this.onChange = this.onChange.bind(this);

  }


  onChange(newValue) {

    console.log('change', newValue);
    var change = newValue

    // this.state.textInput = newValue

    this.setState({
      textInput: newValue
    })
  }
addUser = e => {
    console.log("hola")
    e.preventDefault();
    const db = firebase.firestore();
    const userRef = db.collection("yo").add({
      name: this.state.textInput,
    });  
    this.setState({
      name: "",
    });
  };

  
  render() {
    return (
      <div>


        <AceEditor
          mode = "ace/mode/javascript"
          theme = "tomorrow_night.js"
          onChange={this.onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{
              $blockScrolling: true
          }}
          value={this.state.textInput}
        />
              <button type="submit" onClick={this.addUser}>Submit Q1</button>
              <button type="submit" onClick={this.addUser}>Submit Q1</button>
              <button type="submit" onClick={this.addUser}>Submit Q1</button>


{/*         {this.state.textInput} */}
      </div>
      
      
    );
    
  }
}

// import React, { Component } from 'react';
// import AceEditor from 'react-ace';
// import firestore from "../Firebase/firebase.js";

// export default class Main extends Component {

//   // constructor(props) {
//   //   super(props);

//   //   this.state = {
//   //     textInput: ''
//   //   }

//   //   this.onChange = this.onChange.bind(this);

//   // }


//   // onChange(newValue) {
//   //   // return;

//   //   console.log('change', newValue);
//   //   var change = newValue
//   //   console.log(this)

//   //   // this.state.textInput = newValue

//   //   this.setState({
//   //     textInput: newValue
//   //   })
//   // }

//   constructor() {
//     super();
//     this.state = {
//      Question: ""
//     };
//   }
//   updateInput = e => {
//     this.setState({
//       [e.target.name]: e.target.value
//     });
//   }
//   render() {
//     return (
//       <div>
//         <AceEditor
//           onChange={this.onChange}
//           name="UNIQUE_ID_OF_DIV"
//           editorProps={{
//               $blockScrolling: true
//           }}
//           // value={this.state.textInput}
//         />
//         {/* {this.state.textInput} */}
//       </div>
      
      
//     );
    
//   }
// }






