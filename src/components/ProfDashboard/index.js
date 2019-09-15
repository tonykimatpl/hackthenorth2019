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

const ProfDashboardPage = () => (
  <div>
    <ProfDashboardForm />
  </div>
)



class ProfDashboard extends React.Component {

  constructor(props) {
    super(props);

    this.setLastName = this.getLastName.bind(this);
  }

  getLastName() {
    let db = firestore();

    let data;
    let user = this.props.firebase.getUser();
    let professor = db.collection('professors').doc(user.email);
    let getDoc = professor.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!')
        } else {
          data = doc.data().lastName;
          console.log(doc.data());
        }
      })
    return data;
  }

  render() {

    let lastName = this.getLastName();

    return (
      <div>
        <Box display="flex" justifyContent="center" alignItems="center">
          <h1>Welcome Professor</h1>
        </Box>
        <div>
          <Box display="flex" justifyContent="center" alignItems="center">
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
    )
  }
};

const ProfDashboardForm = compose(
  withRouter,
  withFirebase
)(ProfDashboard);

export default ProfDashboardForm;