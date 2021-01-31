import React, {Component} from 'react';
import axios from 'axios';

export default class AddJob extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            maxapp:'',
            positions: '',
            type:'Full-Time',
            salary:'',
            duration:'',
            deadline:'',
            skillset:'',
            email:'',



        }
        this.onChangetitle = this.onChangetitle.bind(this);
        this.onChangemaxapp = this.onChangemaxapp.bind(this);
        this.onChangepositions = this.onChangepositions.bind(this);
        this.onChangetype = this.onChangetype.bind(this);
        this.onChangesalary = this.onChangesalary.bind(this);
        this.onChangeduration = this.onChangeduration.bind(this);
        this.onChangeskillset = this.onChangeskillset.bind(this);
        this.onChangedeadline = this.onChangedeadline.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
  
    }
    
    onChangetitle(event) {
        this.setState({ title: event.target.value });
    }
    onChangeduration(event) {
        this.setState({ duration: event.target.value });
    }
    onChangedeadline(event) {
        this.setState({ deadline: event.target.value });
    }
    onChangeemail(event) {
        this.setState({ email: event.target.value });
    }
    onChangeskillset(event) {
        this.setState({ skillset: event.target.value });
    }
  
    onChangemaxapp(event) {
        this.setState({ maxapp: event.target.value });
    }

    onChangepositions(event) {
        this.setState({ positions: event.target.value });
    }
    onChangetype(event) {
        this.setState({ type: event.target.value });
    }
    onChangesalary(event) {
        this.setState({ salary: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newJob = {
            title: this.state.title,
            maxapp: this.state.maxapp,
            positions:  this.state.positions,
            type:  this.state.type,
            salary:  this.state.salary,
            deadline: this.state.deadline,
            skillset: this.state.skillset,
            duration: this.state.duration,
            email: this.state.email,
        }

        let token = localStorage.getItem('token');
        console.log(token);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }    
        console.log(newJob);
        axios.post('http://localhost:4000/api/jobs/add', newJob, {headers: headers})
            .then(res => 
                {
                    alert("Job successfully added");
                    console.log(res.data)
                })
            .catch(function(error) {
                if(error.response.data.message)
                    alert(error.response.data.message);
                console.log(error);
            })
        this.setState({
            title: '',
            maxapp:0,
            positions: 0,
            type:'Full-Time',
            salary:0,
            duration:0,
            deadline:'',
            skillset:'',
            email: '',



        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                        <label>Title: </label>
                        <input type="text"
                               className="form-control" 
                               value={this.state.title}
                               onChange={this.onChangetitle}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeemail}
                               />  
                    </div>
                    
                    <div className="form-group">
                        <label>Type: </label>
                        <select  className="form-control"  value={this.state.type} onChange={this.onChangetype}> 
                                <option name="Full-Time" value="Full-Time">Full-Time</option>
                                <option name="Part-Time" value="Part-Time">Part-Time</option>
                                <option name="Work-From-Home" value="Work-From-Home">Work-From-Home</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Max Applications: </label>
                        <input type="number" min="1"
                               className="form-control" 
                               value={this.state.maxapp}
                               onChange={this.onChangemaxapp}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Positions: </label>
                        <input type="number" min="1"
                               className="form-control" 
                               value={this.state.positions}
                               onChange={this.onChangepositions}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Salary: </label>
                        <input type="number" min="1"
                               className="form-control" 
                               value={this.state.salary}
                               onChange={this.onChangesalary}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Duration: </label>
                        <input type="number" min="1"
                               className="form-control" 
                               value={this.state.duration}
                               onChange={this.onChangeduration}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Deadline for Application: </label>
                        <input type="date"
                               className="form-control" 
                               value={this.state.deadline}
                               onChange={this.onChangedeadline}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Required Skill Set: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.skillset}
                               onChange={this.onChangeskillset}
                               />  
                    </div>


                    <div className="form-group">
                        <input type="submit" value="Add listing" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}