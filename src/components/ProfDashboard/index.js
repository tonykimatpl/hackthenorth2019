import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { firestore } from 'firebase';
import * as ROUTES from '../../constants/routes';

let professor = db.collection("professors").doc(this.props.firebase.auth.currentUser.email);
    let getDoc = professor.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        let data = doc.data().lastName;
        console.log(data);
      }
    })
      .catch(err => {
      console.log('Error getting document', err);
    });

const ProfDashboard= () => (
  <div>
    <Box display = "flex" justifyContent="center" alignItems="center">
      <h1>Welcome Professor</h1>
    </Box>
    <div>
      <Box display = "flex" justifyContent="center" alignItems="center">
      <Link href={ROUTES.EXAM}>
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
        >
          Exams
    </Button>
    </Link>
      </Box>
      </div>
  </div>
);

export default ProfDashboard;
