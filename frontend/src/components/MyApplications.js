import React, {Component} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';


export default class MyApplications extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            applications: []
        };
        this.onChangeRating = this.onChangeRating.bind(this);
    }

    onChangeRating(event) {
        this.setState({ rating: event.target.value });
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        console.log(token);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
          }    

        axios.get('http://localhost:4000/api/myapplications' ,{ headers: headers} )
             .then(response => {
                console.log(response.data)
                this.setState({applications: response.data});
             })
             .catch(function(error) {
                if(error.response.data.message)
                alert(error.response.data.message);
                 console.log(error);
             })
    }
    rateRecruiter(id) {
        let token = localStorage.getItem('token');
        console.log(token);
        const Rating = {
            id: id,
            rating: this.state.rating
        }
        console.log(Rating);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }    
        axios.post('http://localhost:4000/api/raterecruiter',Rating, {headers: headers})
          .then(response => { 
              alert("Rating Submitted for the Job!!");
              console.log(response.data)})
            .catch(err => {
                if(err.response.data.message)
                    alert(err.response.data.message);
                console.log(err.response);
              });
    
        this.setState({
          rating:0,  
        })
    }

    


    render() {
        let user = localStorage.getItem('user_name');
        return (
            <div>
                <h2>{user}'s Applications:</h2>
                <br></br>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Salary</th>
                            <th>Status</th>
                            <th>Recruiter</th>
                            <th>Rate</th>
                            <th>Action</th>
                            {/* <th>Edit</th> */}
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.applications.map((Application, i) => {
                            // if(Order.status == "Waiting")
                            return (
                                <tr key={i}>
                                    <td>{Application.job.title}</td>
                                    <td>{Application.job.salary} </td>
                                    <td>{Application.status} </td>
                                    <td>{Application.job.recruiter.username} </td>
                                    <td>
                                        <select style={{width: '200px'}} className="form-control" value={this.state.rating} onChange={this.onChangeRating}> 
                                            <option name="1" value="1">1</option>
                                            <option name="2" value="2">2</option>
                                            <option name="3" value="3">3</option>
                                            <option name="4" value="4">4</option>
                                            <option name="5" value="5">5</option>
                                        </select>
                                    </td>
                                    <td><Button variant="primary" onClick={() => {this.rateRecruiter(Application._id) }}>Submit</Button></td>
                                    
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