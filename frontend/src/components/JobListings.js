import React, {Component} from 'react';
import axios from 'axios';
// import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import Button from 'react-bootstrap/Button'

export default class JobListings extends Component {
    
    constructor(props) {
        super(props);
        this.state = {listings: []}
    }


    componentDidMount() {
        let token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
          }    

        axios.post('http://localhost:4000/api/jobs/view',{'type': 1}, { headers: headers} )
             .then(response => {
                console.log(response.data)
                this.setState({listings: response.data});
             })
             .catch(function(error) {
                if(error.response.data.message)
                alert(error.response.data.message);
                 console.log(error);
             })
    }
    deleteJob(id) {
        let token = localStorage.getItem('token');
        console.log(token);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }    
        axios.post('http://localhost:4000/api/jobs/delete/',{'id': id}, {headers: headers})
          .then(response => { console.log(response.data)});
    
        this.setState({
          listings: this.state.listings.filter(el => el._id !== id)
        })
    }




   

    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date of Posting</th>
                            <th>No of Applications</th>
                            <th>Positions</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.listings.map((job, i) => {
                            let left = 0;
                            if(job.maxapp > job.no_app) left = job.no_app; 
                            else left = job.maxapp;
                            return (
                                <tr key={i} >
                                    <td><Link to={{ pathname: '/jobapplications', state: { id: job._id, title: job.title} }}>{job.title} </Link></td>
                                    <td>{job.date_of_posting}</td>
                                    <td>{left} </td>
                                    <td>{job.positions}</td>

                                    <td> <Button variant="danger" onClick={() => {this.deleteJob(job._id) }}>Delete</Button></td>
                                    <th><Link to={{ pathname: './jobedit', state: { 'id': job._id, 'maxapp':job.maxapp,'positions':job.positions,'deadline':job.deadline} }}>Edit</Link></th>
                                </tr>
                            )

                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}