import React, {Component} from 'react';
import axios from 'axios';
// import CustomerNavbar from "./user-navbar.component"
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import Button from 'react-bootstrap/Button'

export default class ApplyJob extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            sop: '',
            id: this.props.location.state.id,
            // recruiter: this.props.location.state.name,
        }
        this.onChangeSop = this.onChangeSop.bind(this);
    }
    onChangeSop(event) {
        this.setState({ sop: event.target.value });
    }

    ApplyJob(id) {
        let token = localStorage.getItem('token');
        console.log(token);
        const application = {
            job: id,
            sop: this.state.sop
        }
        console.log(application);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }    
        axios.post('http://localhost:4000/api/apply',application, {headers: headers})
          .then(response => { 
              alert("Applied for the Job!!");
              console.log(response.data)})
              .catch(err => {
                if(err.response.data.message)
                    alert(err.response.data.message);
                console.log(err.response);
                // this.props.history.push("/");
                // window.location.reload();
            });
    
        this.setState({
          sop:'',  
        })

        // window.location.reload();
    }

    render() {
        // let recruiter = this.state.recruiter;
        // console.log(recruiter);
        return (
            <div>
                <label>SOP (Statement of Purpose)</label>
                <input  className="form-control" type="text" maxlength="250" value={this.state.sop} onChange={this.onChangeSop}/>
                <br></br>
                <td><Button variant="success" onClick={() => {this.ApplyJob(this.state.id) }}>Submit</Button></td>
            </div>
        )
    }
}