import React from 'react';
import Box from '@material-ui/core/Box';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { firestore } from 'firebase';
import * as ROUTES from '../../constants/routes';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const registerStudents = () => (
  <div>
    <Box display = "flex" justifyContent = "center" alignItems = "center">
        <h1>Student Exam Registration Portal</h1>
    </Box>
  </div>
);

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));


export default registerStudents;
