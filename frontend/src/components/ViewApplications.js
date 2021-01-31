import React, {Component} from 'react';
import axios from 'axios';
// import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import Button from 'react-bootstrap/Button'

export default class ViewApplications extends Component {
    
    constructor(props) {
        super(props);
        this.applicationsuccess = this.applicationsuccess.bind(this);
        this.applicationreject = this.applicationreject.bind(this);
        this.state = {
            listings: [],
            id: this.props.location.state.id,
            title: this.props.location.state.title,
          
        }
    }


 
    applicationsuccess = this.applicationsuccess;

    applicationsuccess(id) {
        let token = localStorage.getItem('token');
        console.log(token);
        const Application = {
            id: id,
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }    
        axios.post('http://localhost:4000/api/application/success',Application, {headers: headers})
            .then(response => {
                alert(response.data.message);
                 console.log(response.data)
                })
            .catch(err => {
                console.log("yo");
                if(err.response.data.message)
             alert(err.response.data.message);
                console.log(err)});
    
        window.location.reload();
    
    }
    applicationreject = this.applicationreject;

    applicationreject(id) {
        let token = localStorage.getItem('token');
        console.log(token);
        const Application = {
            id: id,
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }    
        axios.post('http://localhost:4000/api/application/reject',Application, {headers: headers})
            .then(response => { 
                console.log(response.data)
                
            })
            .catch(err => {
                if(err.response.data.message)
                    alert(err.response.data.message);
                console.log(err)});
    
        window.location.reload();
    

    }
    sortbyName = () =>{
        let listings = this.state.listings, n = listings.length;
        for(var i=0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                const left = listings[j].applicant.username;
                const left2 = listings[j+1].applicant.username;
                if(left > left2)
                {
                    var temp = listings[j];
                    listings[j] = listings[j+1];
                    listings[j+1] = temp;
                }
            }
        }
        this.setState({listings: listings});
    }
    sortbydecName = () =>{
        let listings = this.state.listings, n = listings.length;
        for(var i=0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                const left = listings[j].applicant.username;
                const left2 = listings[j+1].applicant.username;
                if(left < left2)
                {
                    var temp = listings[j];
                    listings[j] = listings[j+1];
                    listings[j+1] = temp;
                }
            }
        }
        this.setState({listings: listings});
    }

    sortbyRating = () =>{
        let listings = this.state.listings, n = listings.length;
        for(var i=0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var left = listings[j].applicant.rating;
                var left2 = listings[j+1].applicant.rating;
               
                if(left > left2)
                {
                    var temp = listings[j];
                    listings[j] = listings[j+1];
                    listings[j+1] = temp;
                }
            }
        }
        this.setState({listings: listings});
    }
    sortbydecRating = () =>{
        let listings = this.state.listings, n = listings.length;
        for(var i=0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var left = listings[j].applicant.rating;
                var left2 = listings[j+1].applicant.rating;
               
                if(left < left2)
                {
                    var temp = listings[j];
                    listings[j] = listings[j+1];
                    listings[j+1] = temp;
                }
            }
        }
        this.setState({listings: listings});
    }
    sortbyDate = () =>{
        let listings = this.state.listings, n = listings.length;
        for(var i=0; i < n-1; i++)
        {
            console.log("hey");
            for(var j=0; j < n-1; j++)
            {
                var left = listings[j].date_of_application;
                var left2 = listings[j+1].date_of_application;
                
                if(left > left2)
                {
                    var temp = listings[j];
                    listings[j] = listings[j+1];
                    listings[j+1] = temp;
                }
            }
        }
        this.setState({listings: listings});
    }
    sortbydecDate = () =>{
        let listings = this.state.listings, n = listings.length;
        for(var i=0; i < n-1; i++)
        {
            console.log("hey");
            for(var j=0; j < n-1; j++)
            {
                var left = listings[j].date_of_application;
                var left2 = listings[j+1].date_of_application;
                
                if(left < left2)
                {
                    var temp = listings[j];
                    listings[j] = listings[j+1];
                    listings[j+1] = temp;
                }
            }
        }
        this.setState({listings: listings});
    }
    componentDidMount() {
        let token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }   
        const Job = {
            title: this.state.title,     
            id:  this.state.id,
        }
        console.log(Job);

        axios.post('http://localhost:4000/api/job/applications',Job,{ headers: headers} )
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
   

    render() {
        return (
            <div>
                <Button size='sm' variant="info" onClick={this.sortbyName} >Increasing Name</Button> &nbsp; 
                <Button size='sm' variant="info" onClick={this.sortbyDate} >Increasing Date of Application</Button> &nbsp; 
                <Button size='sm' variant="info" onClick={this.sortbyRating} >Increasing Rating</Button> &nbsp;
                <Button size='sm' variant="info" onClick={this.sortbydecName} >Decreasing Name</Button> &nbsp; 
                <Button size='sm' variant="info" onClick={this.sortbydecDate} >Decreasing Date of Application</Button> &nbsp; 
                <br></br><br></br>
                <Button size='sm' variant="info" onClick={this.sortbydecRating} >Decreasing Rating</Button> &nbsp; 
                <br></br><br></br>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>SOP</th>
                            <th>Stage</th>
                            <th>Date of Application</th>
                            <th>Applicant's Rating</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.listings.map((application, i) => {
                            
                           let  status = null;
                            if(application.status=="Applied")
                                status='Shortlist';
                            else if(application.status=="Shortlisted")
                                status='Accept';
                           
                            return (
                                <tr key={i}>
                                    <td>{application.applicant.username}</td>
                                    <td>{application.sop} </td>
                                    <td>{application.status}</td>
                                    <td>{application.date_of_application}</td>
                                    <td>{application.applicant.rating}</td>
                                   
                                    <td><Button  variant="success" onClick={() => {this.applicationsuccess(application._id) }}>{status}</Button> </td> 
                                   <td><Button variant="danger" onClick={() => {this.applicationreject(application._id) }}>Reject</Button></td>
                                    
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