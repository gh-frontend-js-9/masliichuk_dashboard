import React, { SyntheticEvent } from "react";
import { Button, ModalHeader, ModalBody, ModalFooter, Modal, FormGroup, Form, Label, Input } from "reactstrap";
import { ApiService } from "../services/apiService";

interface IProps {
}

interface IState {
    modal: boolean;
    title:string,
    company:string,
    cost:string,
    deadline:string,
    assigned:string,
}

export class AddProject extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            modal: false,
            title:'',
            company:'',
            cost: '',
            deadline:'',
            assigned:'',
        };

    }

    toggle = () => {
        if (this.state.modal) {
            this.setState({ modal: false })
        } else {
            this.setState({ modal: true })
        }
    }
    
    handleChange = (e: SyntheticEvent)  => {
        const el = e.target as HTMLInputElement;

        this.setState({[el.name]: el.value} as any);
    }

    onCreateProjectClick = () => {
        ApiService.createProject(
            this.state.title,
            this.state.company,
            this.state.cost,
            this.state.deadline,
            this.state.assigned
        ).then(res => {
            console.log(res);
        })
        .catch(e => {
            console.log(e);
          });
    }

    render() {

        return (
            <span>
                <button type="button" onClick={this.toggle} className="btn btn-primary btn-add">Add <i className="fa fa-plus" aria-hidden="true"></i></button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Create project</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input type="text" name="title" id="title" placeholder="Title" onChange={this.handleChange} value={this.state.title} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="company">Company</Label>
                                <Input type="text" name="company" id="company" placeholder="Company" onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="cost">Cost</Label>
                                <Input type="number" name="cost" id="cost" placeholder="Cost" onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="deadline">Deadline</Label>
                                <Input type="date" name="deadline" id="deadline" placeholder="Deadline" onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="assigned">Assigned</Label>
                                <Input type="text" name="assigned" id="assigned" placeholder="Assigned" onChange={this.handleChange} />
                            </FormGroup>

                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onCreateProjectClick}>Ok</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </span>
        )
    }
}
