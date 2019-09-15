import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { firestore } from 'firebase';
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container';
import * as ROUTES from '../../constants/routes';


const StudentDashboardPage = () => (
  <div>
    <StudentDashboardForm />
  </div>
)

var hasExam = false;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Exam Goat
        </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = (theme) => {

  return {
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }
};


const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  accountType: '',
  error: null,
};

class StudentDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    let state = this;
    this.props.firebase.doSignOut().then(function() {
      // Sign-out successful.
      console.log("SIGN OUT")
      state.props.history.push(ROUTES.SIGN_IN);
    }).catch(function(error) {
      // An error happened.
    });

  }
  checkForExams() {
    const { firstName, lastName, email, password } = this.state;
    //Check if student has exam
    let db = firestore();
    let student = db.collection("students").doc(this.props.firebase.getUser().email);
    let getDoc = student.get()
      .then(doc => {
        if (!doc.exists) {
        } else {
          let data = doc.data().exam;
          //If above line did not cause an exception, then the student has an exam
          hasExam = true;
        }
      })
      .catch(err => {
        console.log("ERROR")
        //student does not have an exam now
      });
  }

  render() {
    this.checkForExams()
    if (!hasExam) {


      return (
      <Container component="main" maxWidth="xs">
      You do not have any exams!
      <Grid item xs={6}>

      <button onClick={this.signOut}>
        Sign Out
      </button>
      </Grid>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
      )


    } else {


      return (
        <Container component="main" maxWidth="xs">
          Test
        </Container>
      )
      
      
    }
  }
}

const StudentDashboardForm = compose(
  withRouter,
  withFirebase
)(StudentDashboard);

export default withStyles(useStyles)(StudentDashboardForm);