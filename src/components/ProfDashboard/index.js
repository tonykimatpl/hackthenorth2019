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

let INITIAL_STATE = {
  lastName: ''
}


class ProfDashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    let db = firestore();

    let t = this;
    let user = this.props.firebase.getUser();
    let professor = db.collection('professors').doc(user.email);
    let getDoc = professor.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!')
        } else {
          this.setState({...INITIAL_STATE, lastName: doc.data().lastName});
        }
      })
  }

  render() {

    console.log('hello');

    return (
      <div>
        <Box display="flex" justifyContent="center" alignItems="center">
          <h1>Welcome Professor {this.state.lastName}</h1>
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