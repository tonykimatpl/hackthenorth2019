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
    <Box display = "flex" justifyContent = "center" alignItems = "center">
        <h1>Student Exam Registration Portal</h1>
    </Box>

    <Box display = "flex" justifyContent = "center" alignItems = "center">
    <form noValidate autoComplete="off">
      <TextField
        id="outlined-name"
        label="E-mail"
        margin="normal"
        variant="outlined"
      />
      </form>
      </Box>
      <Box display = "flex" justifyContent = "center" alignItems = "center">
        <Button variant="contained" color="primary">
          Add Student
          </Button>
          </Box>
  </div>
);

let db = firestore();
Firebase.db.collection("exams").doc("CEG2136").collection("students")
.onSnapshot(function(doc) {
console.log("Current data: ", doc.data());
});


export default registerStudents;
