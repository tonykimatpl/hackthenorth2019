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


const CongratsPage = () => (
  <div>
    <CongratsForm />
  </div>
)


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

class Congrats extends React.Component {

  constructor(props) {
    super(props);
    console.log("Initializing Congrats")
    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    let state = this;
    this.props.firebase.doSignOut().then(function() {
      // Sign-out successful.
      state.props.history.push(ROUTES.SIGN_IN);
    }).catch(function(error) {
      // An error happened.
    });

  }

  render() {
      console.log("Rendering")
      return (
      <Container component="main" maxWidth="xs">
      Your exam has been submitted. Please sign out.
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
    
  }
}

const CongratsForm = compose(
  withRouter,
  withFirebase
)(Congrats);

export default withStyles(useStyles)(CongratsForm);