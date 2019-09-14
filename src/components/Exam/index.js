import React, { Component } from 'react';
import AceEditor from 'react-ace';
import firestore from "../Firebase/firebase.js";

export default class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      textInput: ''
    }

    this.onChange = this.onChange.bind(this);

  }


  onChange(newValue) {
    // return;

    console.log('change', newValue);
    var change = newValue
    console.log(this)

    // this.state.textInput = newValue

    this.setState({
      textInput: newValue
    })
  }

  
  render() {
    return (
      <div>
        <AceEditor
          onChange={this.onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{
              $blockScrolling: true
          }}
          value={this.state.textInput}
        />
        {this.state.textInput}
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






