import React, {Component} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';


export default class ApplicantProfile extends Component {
    
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

        axios.get('http://localhost:4000/api/appprofile' ,{ headers: headers} )
             .then(response => {
                //  console.log("hey");
               
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
                            <th>Education</th>
                            <th>Skills</th>
                            <th>Rating</th>
                            <th></th>
         
                          
                            
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.profile.map((ApplicantProfile, i) => {
                            
                            return (
                                <tr key={i}>
                                    <td>{ApplicantProfile.name}</td>
                                    <td>{ApplicantProfile.email} </td>
                                    <td>{ApplicantProfile.education}</td>
                                    <td>{ApplicantProfile.skills} </td> 
                                    <td>{ApplicantProfile.applicant.rating}</td>
                                    <th><Link to={{ pathname: './applicantprofileedit', state: { 'id': ApplicantProfile._id,'resume':ApplicantProfile.resume,'image':ApplicantProfile.image,'skills':ApplicantProfile.skills,'education':ApplicantProfile.education,'name':ApplicantProfile.name,'email':ApplicantProfile.email} }}>Edit</Link></th>
                                   
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