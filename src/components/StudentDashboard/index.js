import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { firestore } from 'firebase';
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

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleSubmit = event => {
    const { firstName, lastName, email, password } = this.state;
    //Check if student has exam
    let db = firestore();
    let student = db.collection("students").doc(this.props.firebase.auth.currentUser.email);
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
        //student does not have an exam now
      });

    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  displayNoExam() {
    return ( <Container component="main" maxWidth="xs">
      You do not have any exams!
    </Container> )
  }
  displayExam() {

  }

  render() {
    if (hasExam) {
      return (
        this.displayExam()
      )
    } else {
      return (
        this.displayNoExam()
      )
      
    }/*
      const { classes } = this.props;
  
      const {
        firstName,
        lastName,
        email,
        password,
        error,
      } = this.state;
  
      const isInvalid =
        password === '' ||
        email === '' ||
        firstName === '' ||
        lastName === '';
  
      return (
  
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
          </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={this.onChange}
                  />
                </Grid>
              </Grid>
                <RadioGroup aria-label="gender" name="gender1" onChange={(event)=>{
                  this.setState({
                    accountType: event.target.value
                  })
                }}>
                  <FormControlLabel value="prof" control={<Radio />} label="I'm a Professor" />
                  <FormControlLabel value="student" control={<Radio />} label="I'm a Student" />
                </RadioGroup>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Sign Up
            </Button>
              <Grid container justify="center">
                <Grid item>
                  <a href={ROUTES.SIGN_IN} variant="body2">
                    Already have an account? Sign in
                </a>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      );*/
  }
}

const StudentDashboardForm = compose(
  withRouter,
  withFirebase
)(StudentDashboard);

export default withStyles(useStyles)(StudentDashboardForm);