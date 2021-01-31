import React, {Component} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';


export default class Ac extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            listings: []
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

        axios.get('http://localhost:4000/api/ac' ,{ headers: headers} )
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
    sortbyTitle = () =>{
        let listings = this.state.listings, n = listings.length;
        for(var i=0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var left = listings[j].job.title;
                var left2 = listings[j+1].job.title;
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
    sortbydecTitle = () =>{
        let listings = this.state.listings, n = listings.length;
        for(var i=0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var left = listings[j].job.title;
                var left2 = listings[j+1].job.title;
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
    sortbydecDate = () =>{
        let listings = this.state.listings, n = listings.length;
        for(var i=0; i < n-1; i++)
        {
           
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
    rateApplicant(id) {
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
        axios.post('http://localhost:4000/api/rateapplicant',Rating, {headers: headers})
          .then(response => { 
              alert("Rating Submitted for the Job!!");
              console.log(response.data)
              window.location.reload();
            })
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

                <Button size='sm' variant="info" onClick={this.sortbyName} >Increasing Name</Button> &nbsp; 
                <Button size='sm' variant="info" onClick={this.sortbyDate} >Increasing Date of Application</Button> &nbsp; 
                <Button size='sm' variant="info" onClick={this.sortbyRating} >Increasing Applicant Rating</Button> &nbsp; 
                <Button size='sm' variant="info" onClick={this.sortbyTitle} >Increasing Title</Button> &nbsp; 
                <Button size='sm' variant="info" onClick={this.sortbydecTitle} >Decreasing Title</Button> &nbsp; 
                <Button size='sm' variant="info" onClick={this.sortbydecName} >Decreasing Name</Button> &nbsp; 
                <br></br>
                <Button size='sm' variant="info" onClick={this.sortbydecRating} >Decreasing Applicant Rating</Button> &nbsp; 
                <Button size='sm' variant="info" onClick={this.sortbydecDate} >Decreasing Date of Application</Button> &nbsp; 
                <br></br>
                <br></br>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date of Joining</th>
                            <th>Job Type</th>
                            <th>Title</th>
                            <th>Rate</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.listings.map((Application, i) => {
                            return (
                                <tr key={i}>
                                    <td>{Application.applicant.username}</td>
                                    <td>{Application.date_of_application} </td>
                                    <td>{Application.job.type} </td>
                                    <td>{Application.job.title} </td>
                                    <td>
                                        <select style={{width: '200px'}} className="form-control" value={this.state.rating} onChange={this.onChangeRating}> 
                                            <option name="1" value="1">1</option>
                                            <option name="2" value="2">2</option>
                                            <option name="3" value="3">3</option>
                                            <option name="4" value="4">4</option>
                                            <option name="5" value="5">5</option>
                                        </select>
                                    </td>
                                    <td><Button variant="primary" onClick={() => {this.rateApplicant(Application._id) }}>Submit</Button></td>
                             
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