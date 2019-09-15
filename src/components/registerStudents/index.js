import React from 'react';
import Box from '@material-ui/core/Box';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { firestore } from 'firebase';
import Firebase from 'firebase';
import * as ROUTES from '../../constants/routes';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
  }

  handleSubmit = event => {

    const { studentEmail } = this.state;
    let db = firestore();
    let user = this.props.firebase.getUser();
    console.log(user.email);
    console.log(studentEmail);
    let exam = db.collection('exams').doc(user.email)
      .collection('students').doc(studentEmail).set({
        studentEmail: studentEmail
      })
      .then(function() {
        alert(`${studentEmail} added to exam`)
      })
      .catch(function(error) {
        console.log(error);
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
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
      </React.Fragment>
    )
  }
}

const RegisterStudentsForm = compose(
  withRouter,
  withFirebase
)(RegisterStudentsBase)

export default registerStudents;
