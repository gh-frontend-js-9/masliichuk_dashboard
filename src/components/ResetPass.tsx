import React, { SyntheticEvent } from 'react';
import { ApiService } from '../services/apiService';
import { Redirect } from 'react-router';
import { FormGroup, Input, Button, Form } from 'reactstrap';

interface IProps {
}

interface IState {
    email:string;
    pass:string;
    confpass:string;
    redirectToLogin:boolean;
}

export class ResetPass extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email:'',
            pass:'',
            confpass:'',
            redirectToLogin: false,
        };
    }

    handleChange = (e: SyntheticEvent)  => {
        const el = e.target as HTMLInputElement;
        this.setState({[el.name]: el.value} as any);
    }

    resetPass = () => {
        ApiService.resetPass(
            this.state.email,
            this.state.pass,
            this.state.confpass,
        ).then(res => {
            console.log(res);
           if (res.statusCode >= 200 && res.statusCode <= 299){
               this.setState({redirectToLogin:true});
           } else {
               alert('Error');
           }

        })
        .catch(e => {
            console.log(e);
          });
    }

    render(){
        if (this.state.redirectToLogin) {
            return <Redirect to='/login' />
        }
        return(
            <Form className="text-center signup">
                <h1>Reset password</h1>
                <h2>Please enter your new password</h2>
                <FormGroup>
                    <Input type="email" name="email" onChange={this.handleChange}  placeholder="Email" />
                </FormGroup>
                <FormGroup>
                    <Input type="password" name="pass" onChange={this.handleChange} placeholder="Password" />
                </FormGroup>
                <FormGroup>
                    <Input type="password" name="confpass" onChange={this.handleChange} placeholder="Reset Password" />
                </FormGroup>
                
                <Button onClick={this.resetPass} >Reset</Button>
            </Form>
        )
    }
}