import React from 'react';
import logo from '../images/logo.png';
import profile from '../images/profile.png';
import icon from '../images/icon.png';
import { ApiService } from '../services/apiService';
import { AddProject } from './AddProject';

interface IProps {
}

interface IState {
    projects: any;
}


export class Stats extends React.Component<IProps, IState> {

    apiService: ApiService;

    constructor(props: any) {
        super(props);
        
        this.state = {
            projects: [],
          };

        this.apiService = new ApiService();
    }

    componentDidMount(){
        this.getAllProjects();
    }

    getAllProjects = () => {
        this.apiService.getAllProjects().then(res => {
            this.setState({projects: res});
            console.log(res);
          }).catch(e => {
            console.log(e);
          })
    }
    
    render() {

        let projectRows = null;
        if (this.state.projects.length > 0) {
            projectRows = (<div>

                {this.state.projects.map((project: any, index: any) => {
                    const deadline = new Date(project.deadline).toDateString();
                    const divStyle = {
                        width: `${project.progress}%`
                      };
                return <div key={project._id} className="proj-row">
                        <div className="proj-item">
                            <p>{project.title}</p>
                            <p className="proj-subtitle">{project.company}</p>
                        </div>

                        <div className="proj-item">
                            <p>{project.cost}</p>
                        </div>

                        <div className="proj-item">
                            <p>{deadline}</p>
                            <p className="proj-subtitle">{project.timeSpent} days left</p>
                        </div>

                        <div className="proj-item">
                            <p>{project.timeSpent} hours</p>
                        </div>

                        <div className="proj-item proj-progress">
                            <p>{project.progress} %</p>
                            <div className="progress">
                                <div className="progress-child" style={divStyle}>
                                </div>
                            </div>
                        </div>

                        <div className="proj-item">
                            <p>{project.status}</p>
                        </div>

                        <div className="proj-item proj-assigned">
                            <img src={icon} />
                            <div className="ml-15"> 
                                <p>{project.assigned ? project.assigned.name : 'not assigned' }</p>
                                <p className="proj-subtitle">{project.assigned ?  project.assigned.position : '--'}</p>
                            </div>
                        </div>
                    </div>
                })}
            </div>)
        }


      return (
        <div>
    <header>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4">
                    <a href="#"><img src={logo} /></a>
                </div>

                <div className="col-md-8 text-right">
                    <AddProject />
                    <div className="search">
                        <a href="#"><i className="fa fa-search" aria-hidden="true"></i></a>
                    </div>
                    <div className="notification">
                        <a href="#"><i className="fa fa-bell" aria-hidden="true"></i></a>
                    </div>

                    <div className="profile">
                        <img src={profile} />
                        <a href="#"><i className="fa fa-angle-down" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <div className="row no-gutters">
        <div className="col-md-1">
            <div className="nav-bar">
                <div className="container-fluid">
                    <div className="nav-bar-item home-item text-center">
                        <a href="#"><i className="fa fa-home" aria-hidden="true"></i></a>
                    </div>
                    <div className="nav-bar-item menu-item text-center">
                        <a href="#"><i className="fa fa-bars" aria-hidden="true"></i></a>
                    </div>
                    <div className="nav-bar-item chart-item text-center">
                        <a href="#"><i className="fa fa-line-chart" aria-hidden="true"></i></a>
                    </div>
                    <div className="nav-bar-item messages-item text-center">
                        <a href="#"><i className="fa fa-envelope-o" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
        </div>

        <div className="col-md-11">
            <div className="nav-bar-top">
                <div className="row">
                    <div className="col-md-5">
                        <div className="inbox-item active">
                            <a href="#" onClick={this.getAllProjects}>All projects({this.state.projects.length})</a>
                        </div>

                        <div className="inbox-item">
                            <a href="#">Workflow</a>
                        </div>
                    </div>

                    <div className="col-md-7 text-right">
                        <p className="filter-text">Show projects:</p>
                        <div className="btn-group">
                            <button type="button" className="drop-filter btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                All
                            </button>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="#">Date</a>
                                <a className="dropdown-item" href="#">Date 2</a>
                                <a className="dropdown-item" href="#">Date 3</a>
                                <a className="dropdown-item" href="#">Date 4</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="proj-title">
                <div className="proj-title-item">
                    <p>Project title</p>
                </div>

                <div className="proj-title-item">
                    <p>Value</p>
                </div>

                <div className="proj-title-item">
                    <p>Deadline</p>
                </div>

                <div className="proj-title-item">
                    <p>Time spent</p>
                </div>

                <div className="proj-title-item">
                    <p>Progress</p>
                </div>

                <div className="proj-title-item">
                    <p>Status</p>
                </div>

                <div className="proj-title-item">
                    <p>Assigned to</p>
                </div>
            </div>

            { projectRows }

        </div>
    </div>            
        </div>
      )
    }
  }