import React from 'react';
import Box from '@material-ui/core/Box';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { firestore } from 'firebase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ActionSettingsPower } from 'material-ui/svg-icons';

const registerStudents = () => (
  <div>
    <RegisterStudentsForm />
  </div>
);

let INITIAL_STATE = {
  studentEmail: ''
}

class RegisterStudentsBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.populateList = this.populateList.bind(this);
    
  }

  handleSubmit = event => {

    let student = {

    }
    const { studentEmail } = this.state;
    let db = firestore();
    let user = this.props.firebase.getUser();
    console.log(user.email);
    console.log(studentEmail);
    let docRef = db.collection('students').doc(studentEmail);

    docRef.get().then(function (doc) {
      console.log(doc.data());
      if (doc.exists) {
        student = {
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          exam: user.email
        }
        db.collection('students').doc(studentEmail).set(student)
          .then(function () {
            alert(`${studentEmail} added to exam`)
          })
          .catch(function (error) {
            console.log(error);
          });

        let exam = db.collection('exams').doc(user.email)
          .collection('students').doc(studentEmail).set({
            studentEmail: studentEmail
          })

        let list = document.getElementById('list')

        let node = document.createElement('LI')
        let buttonNode = document.createElement('BUTTON');

        buttonNode.innerHTML = `${studentEmail}`;
        node.appendChild(buttonNode);
        list.appendChild(node);

      } else {
        alert('Student does not have an account yet!')
      }
    })

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  populateList() {

    // let list = document.getElementById('list');
    // let db = firestore();
    // let docRef = db.collection(this.state.userAuth.email).doc('students');

    // docRef.get().then(function(doc) {
    //   console.log(doc);
    // })
  }

  render() {

    return (
      <React.Fragment>
        <Box display="flex" justifyContent="center" alignItems="center">
          <h1>Student Exam Registration Portal</h1>
        </Box>

        <Box display="flex" justifyContent="center" alignItems="center">
          <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
            <TextField
              id="emmail"
              label="E-mail"
              margin="normal"
              variant="outlined"
              name="studentEmail"
              autoComplete="email"
              autoFocus
              onChange={this.onChange}
            />
            <Box display="flex" justifyContent="center" alignItems="center">
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Add Student
         </Button>
            </Box>
          </form>
        </Box>

        <div id='container'>
          <ul id='list'>
            {this.populateList()}
          </ul>
        </div>
      </React.Fragment>
    )
  }
}

const RegisterStudentsForm = compose(
  withRouter,
  withFirebase
)(RegisterStudentsBase)

export default RegisterStudentsForm;