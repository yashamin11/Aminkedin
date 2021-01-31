import React, {Component} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';


export default class RecruiterProfile extends Component {
    
    constructor(props) {
        super(props);
        this.state = {profile: []};
        
    }


    componentDidMount() {
        let token = localStorage.getItem('token');
        console.log(token);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
          }    

        axios.get('http://localhost:4000/api/rprofile' ,{ headers: headers} )
             .then(response => {
                //  console.log("hey");
                console.log(response.data)
                this.setState({profile: response.data});
             })
             .catch(function(error) {
                if(error.response.data.message)
                alert(error.response.data.message);
                 console.log(error);
             })
    }

    


    render() {
        let user = localStorage.getItem('user_name');
        return (
            <div>
                <h2>{user}'s Profile:</h2>
                <br></br>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact Number</th>
                            <th>Bio</th>
                            <th></th>
                            
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.profile.map((RecruiterProfile, i) => {
                            
                            return (
                                <tr key={i}>
                                    <td>{RecruiterProfile.name}</td>
                                    <td>{RecruiterProfile.email} </td>
                                    <td>{RecruiterProfile.contact} </td>
                                    <td>{RecruiterProfile.bio} </td>
                                    <th><Link to={{ pathname: './recruiterprofileedit', state: { 'id': RecruiterProfile._id, 'name':RecruiterProfile.name,'email':RecruiterProfile.email,'contact':RecruiterProfile.contact,'bio':RecruiterProfile.bio} }}>Edit</Link></th>
                                   
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