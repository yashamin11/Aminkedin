import React, {Component} from 'react';
import axios from 'axios';


export default class JobEdit extends Component {
    
    constructor(props) {

        super(props);

        this.state = {
            maxapp: this.props.location.state.maxapp,
            id: this.props.location.state.id,
            positions: this.props.location.state.positions,
            deadline: this.props.location.state.deadline,
            
        }
        this.onChangemaxpp = this.onChangemaxpp.bind(this);
        this.onChangepositons = this.onChangepositons.bind(this);
        this.onChangedeadline = this.onChangedeadline.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangemaxpp(event) {
        this.setState({ maxapp: event.target.value });
    }
    onChangepositons(event) {
        this.setState({ positions: event.target.value });
    }
    onChangedeadline(event) {
        this.setState({ deadline: event.target.value });
    }
 
    onSubmit(e) {
        e.preventDefault();
        let edit = {
            id: this.state.id,
            maxapp: this.state.maxapp,
            positions: this.state.positions,
            deadline: this.state.deadline,
        }
        console.log(edit);
        let token = localStorage.getItem('token');
        console.log(token);

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }   

        axios.post('http://localhost:4000/api/job/edit', edit, {headers: headers})
            .then(response => {
                console.log(response.data.message);
                this.props.history.push("/");
                window.location.reload();
            })
            .catch(err => {
                if(err.response.data.message)
                    alert(err.response.data.message);
                console.log(err.response);
            });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Maximum number of Applications: </label>
                        <input type="number"
                               className="form-control" 
                               value={this.state.maxapp}
                               onChange={this.onChangemaxpp}
                               />  
                         <label>Maximum number of Positions: </label>
                        <input type="number" 
                               className="form-control" 
                               value={this.state.positions}
                               onChange={this.onChangepositons}
                               /> 
                         <label>Deadline for Application </label>
                        <input type="date"
                               className="form-control" 
                               value={this.state.deadline}
                               onChange={this.onChangedeadline}
                               /> 
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit Job" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}