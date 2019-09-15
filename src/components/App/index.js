import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { withFirebase } from '../Firebase'

import NewExamPage from '../NewExam';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import SignInUIPage from '../SignInUI';
import SignUpUIPage from '../SignUpUI';
import Session from '../Session';
import Exam from '../Exam';
import StudentDashboard from '../StudentDashboard';
import ProfDashboard from '../ProfDashboard';
import CongratsPage from '../Congrats';
import RegisterStudents from '../registerStudents';



import * as ROUTES from '../../constants/routes';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    }
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    })
  }

  componentWillUnmount() {
    this.listener();
  }


  render() {
    return (
      <Router>
        <div>
          <Route exact path={ROUTES.LANDING} component={SignInUIPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpUIPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInUIPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
          <Route path={ROUTES.SESSION} component={Session} />
          <Route path={ROUTES.NEW_EXAM} component={NewExamPage} />
          <Route path={ROUTES.EXAM} component={Exam} />
          <Route path={ROUTES.STUDENT_DASHBOARD} component={StudentDashboard} />
          <Route path={ROUTES.PROF_DASHBOARD} component={ProfDashboard} />
          <Route path={ROUTES.CONGRATS} component={CongratsPage} />
          <Route path={ROUTES.REG_STUDENTS} component={RegisterStudents}/>
        </div>
      </Router>
    )
  }
}

export default withFirebase(App);