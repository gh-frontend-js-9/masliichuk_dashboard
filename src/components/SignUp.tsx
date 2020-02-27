import React, { SyntheticEvent } from 'react';
import { ApiService } from '../services/apiService';
import { Button, FormGroup, Form, Input } from "reactstrap";
import { useHistory, Redirect } from 'react-router';


interface IProps {
}

interface IState {
    name:string;
    email:string;
    pass:string;
    redirectToStats:boolean;
}

export class SignUp extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            name:'',
            email:'',
            pass:'',
            redirectToStats: false,
        };
    }

    handleChange = (e: SyntheticEvent)  => {
        const el = e.target as HTMLInputElement;
        this.setState({[el.name]: el.value} as any);
    }

    signUp = () => {
        ApiService.signUp(
            this.state.name,
            this.state.email,
            this.state.pass,
        ).then(res => {
            console.log(res);
            if ('errors' in res) {
                alert('Error');
            } else {
                this.setState({redirectToStats: true});
            }
        })
        .catch(e => {
            console.log(e);
          });
    }

    render(){
        if (this.state.redirectToStats) {
            return <Redirect to='/stats' />
        }
        return(
            <Form className="text-center signup">
                <h1>Sign Up</h1>
                <a href="#">Existing member?</a>
                <FormGroup>
                    <Input type="text" name="name" onChange={this.handleChange}  placeholder="Name" />
                </FormGroup>
                <FormGroup>
                    <Input type="email" name="email" onChange={this.handleChange}  placeholder="Email" />
                </FormGroup>
                <FormGroup>
                    <Input type="password" name="pass" onChange={this.handleChange} placeholder="Password" />
                </FormGroup>
                
                <Button onClick={this.signUp} >Sign Up</Button>
            </Form>
        )

    }
}