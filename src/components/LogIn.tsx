import React, { SyntheticEvent } from 'react';
import { ApiService } from '../services/apiService';
import { Redirect } from 'react-router';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import configureStore from '../services/ConfiguredStore';

interface IProps {
    setUser?: any;
}

interface IState {
    email:string;
    pass:string;
    redirectToStats:boolean;
   
}

export default class LogIn extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email:'',
            pass:'',
            redirectToStats: false,
        };
    }

    handleChange = (e: SyntheticEvent)  => {
        const el = e.target as HTMLInputElement;
        this.setState({[el.name]: el.value} as any);
    }

    logIn = () => {
        ApiService.logIn(
            this.state.email,
            this.state.pass,
        ).then(res => {
            console.log(res);
            if (res.statusCode >= 200 && res.statusCode <= 299) {
                this.props.setUser(res);
                this.setState({redirectToStats: true});
            } else {
                alert('Error');
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
                <h1>Log in</h1>
                <Link to='/' >Not a member?</Link>
                <FormGroup>
                    <Input type="email" name="email" onChange={this.handleChange}  placeholder="Email" />
                </FormGroup>
                <FormGroup>
                    <Input type="password" name="pass" onChange={this.handleChange} placeholder="Password" />
                </FormGroup>
                
                <Button onClick={this.logIn} >Log in</Button>
            </Form>
        )
    }
    
}