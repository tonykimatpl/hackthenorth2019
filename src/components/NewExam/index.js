import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles'
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';
import { firestore, auth } from 'firebase';

const NewExam = () => (
    <div>
        <NewExamForm />
    </div>
);

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
        input: {
            margin: theme.spacing(3, 0, 2),
        }
    }
};

const INITIAL_STATE = {
    courseCode: '',
    questionOne: '',
    questionTwo: '',
    questionThree: '',
    error: null
}

class NewExamFormBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };

        this.authUser = auth.currentUser;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleSubmit = event => {
        const { courseCode, questionOne, questionTwo, questionThree } = this.state;
        const db = firestore();

        db.collection('exams').add({
            professor: this.authUser.email,
            questionOne: questionOne,
            questionTwo: questionTwo,
            questionThree: questionThree,
            courseCode: courseCode
        })
            .then(function () {
                console.log('Success adding new exam');
            })
            .catch(function (error) {
                console.error('Error adding to database');
                console.error(error);
                this.setState({ error });
            });

        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {

        const { classes } = this.props;

        const {
            courseCode,
            questionOne,
            questionTwo,
            questionThree
        } = this.state;

        const isInvalid =
            courseCode === '' ||
            questionOne === '' ||
            questionTwo === '' ||
            questionThree === ''

        return (

            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component='h1' variant='h5'>
                        Add a New Exam
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <Grid item xs={12}>
                            <TextField
                                name='courseCode'
                                variant='outlined'
                                required
                                fullWidth
                                id='courseCode'
                                label='Course Code'
                                autoFocus
                                onChange={this.onChange}
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.input}>
                            <TextField
                                name='questionOne'
                                variant='outlined'
                                required
                                fullWidth
                                id='questionOne'
                                label='Question One'
                                autoFocus
                                onChange={this.onChange}
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.input}>
                            <TextField
                                name='questionTwo'
                                variant='outlined'
                                required
                                fullWidth
                                id='questionTwo'
                                label='Question Two'
                                autoFocus
                                onChange={this.onChange}
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.input}>
                            <TextField
                                name='questionThree'
                                variant='outlined'
                                required
                                fullWidth
                                id='questionThree'
                                label='Question Three'
                                autoFocus
                                onChange={this.onChange}
                            />
                        </Grid>
                        <Button href='/'
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Submit Exam
                        </Button>
                    </form>
                </div>
            </Container>
        )
    }
}

const NewExamForm = compose(
    withRouter,
    withFirebase
)(NewExamFormBase);

export default withStyles(useStyles)(NewExamForm);