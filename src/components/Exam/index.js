import React, { Component } from 'react';
import AceEditor from 'react-ace';
import firestore from "../Firebase/firebase.js";
import firebase from 'firebase'
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { spacing } from '@material-ui/system';
import * as ROUTES from '../../constants/routes';

export default class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            textInput1: '',
            textInput2: '',
            textInput3: '',
            userAuth: undefined,
            q1: '',
            q2: '',
            q3: ''

        }
        this.addAns = this.addAns.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChange2 = this.onChange2.bind(this);
        this.onChange3 = this.onChange3.bind(this);
        this.obj = this;

    }

    componentDidMount() {
        const that = this;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                that.setState({
                    userAuth: user,
                })
            } else {
                // No user is signed in.
            }
        });
    }
    getQus = e => {

        e.preventDefault();
        const db = firebase.firestore();
        try {
            let examInfo = db.collection("students").doc(this.state.userAuth.email).get()
                .then(doc => {
                    if (!doc.data().exam) {
                        console.log('No such document!');
                    } else {

                        let data = doc.data();
                        const questions = db.collection("exams").doc(data.exam).get()
                            .then(doc1 => {
                                if (!doc1) {
                                    console.log('No such document!');
                                } else {
                                    // this.q1 = doc1.data().questionOne
                                    // this.q2 = doc1.data().questionTwo
                                    // this.q3 = doc1.data().questionThree

                                    this.setState({
                                        ...this.state,
                                        q1: doc1.data().questionOne
                                    })
                                    this.setState({
                                        ...this.state,
                                        q2: doc1.data().questionTwo
                                    })
                                    this.setState({
                                        ...this.state,
                                        q3: doc1.data().questionThree
                                    })

                                    console.log(doc1.data().questionOne);
                                }
                            })

                    }
                })
                .catch(err => {
                    console.log('Error getting document', err);
                });
        }
        catch (e) {
            console.log(e)
        }
    };


    onChange(newValue) {
        this.setState({
            textInput1: newValue

        })
    };

    onChange2(newValue) {
        this.setState({
            textInput2: newValue
        });
    };

    onChange3(newValue) {
        this.setState({
            textInput3: newValue
        });
    };

    addAns = e => {

        e.preventDefault();
        const db = firebase.firestore();
        console.log(this.state.userAuth.email)

        const userRef = db.collection("students").doc(this.state.userAuth.email).set({
            answer1: this.state.textInput1,
            answer2: this.state.textInput2,
            answer3: this.state.textInput3,

        });
        this.setState({
            answer1: "",
            answer2: "",
            answer3: "",

        });
        this.props.history.push(ROUTES.CONGRATS);
    };
    // getQus = e => {

    //     e.preventDefault();
    //     const db = firebase.firestore();
    //     const userRef = db.collection("users").doc("bro").get()
    //         .then(doc => {
    //             if (!doc.exists) {
    //                 console.log('No such document!');
    //             } else {
    //                 let data = doc.data();
    //                 console.log(data.answer1);


    //             }
    //         })
    //         .catch(err => {
    //             console.log('Error getting document', err);
    //         });
    // };

    render() {
        return (

            <div>

                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <button type="submit" onClick={this.getQus}>Start</button>

                    <Typography component="h1" variant="h5" align="center">
                        Questions        </Typography>
                    <Typography component="h4" variant="h9  ">
                        {this.state.q1}        </Typography>
                    <AceEditor
                        mode="ace/mode/javascript"
                        theme="tomorrow_night.js"
                        onChange={this.onChange}
                        name="UNIQUE_ID_OF_DIV1"
                        editorProps={{
                            $blockScrolling: true
                        }}
                        value={this.state.textInput1}
                    />
                    <hr>
                    </hr>
                    <Typography component="h4" variant="h9">
                        {this.state.q2}         </Typography>
                    <AceEditor
                        mode="ace/mode/javascript"
                        theme="tomorrow_night.js"
                        onChange={this.onChange2}
                        name="UNIQUE_ID_OF_DIV2"
                        editorProps={{
                            $blockScrolling: true
                        }}
                        value={this.state.textInput2}
                    />
                    <hr>
                    </hr>
                    <Typography component="h4" variant="h9">
                        {this.state.q3}         </Typography>
                    <AceEditor
                        mode="ace/mode/javascript"
                        theme="tomorrow_night.js"
                        onChange={this.onChange3}
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{
                            $blockScrolling: true
                        }}
                        value={this.state.textInput3}
                    />

                    <button type="submit" onClick={this.addAns}>Submit</button>

                    {/*         {this.state.textInput} */}
                </Container>

            </div>


        );

    }
}
