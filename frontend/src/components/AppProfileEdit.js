import React, {Component} from 'react';
import axios from 'axios';


export default class AppEdit extends Component {
    
    constructor(props) {

        super(props);

        this.state = {
            name: this.props.location.state.name,
            id: this.props.location.state.id,
            email: this.props.location.state.email,          
            image: this.props.location.state.image,
            resume:this.props.location.state.resume,
            education:this.props.location.state.education,
            skills:this.props.location.state.skills
        }
        this.onChangename = this.onChangename.bind(this);
        this.onChangeeducation = this.onChangeeducation.bind(this);
        this.onChangeskills = this.onChangeskills.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
      
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeim = this.onChangeim.bind(this);
        this.onChangepdf = this.onChangepdf.bind(this);
    }

    onChangename(event) {
        this.setState({ name: event.target.value });
    }
    onChangeemail(event) {
        this.setState({ email: event.target.value });
    }
    onChangeeducation(event) {
        this.setState({ education: event.target.value });
    }
    onChangeskills(event) {
        this.setState({ skills: event.target.value });
    }
    onChangeim = e => {
		const fr = new FileReader();
		fr.onload = function() {
			this.setState({ image: fr.result });
        }.bind(this);
        if(e.target.files[0])
		fr.readAsDataURL(e.target.files[0]);
	};
 
    onChangepdf = e => {
		const fr = new FileReader();
		fr.onload = function() {
			this.setState({ resume: fr.result });
        }.bind(this);
        if(e.target.files[0])
		fr.readAsDataURL(e.target.files[0]);
    };
    
    onSubmit(e) {
        e.preventDefault();
        let edit = {
            id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            education: this.state.education,
            skills: this.state.skills,
            image: this.state.image,
            resume: this.state.resume

        }
        console.log(edit);


        console.log(edit);
        let token = localStorage.getItem('token');
  
        // console.log(edit);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }   

        axios.post('http://localhost:4000/api/appprofile/edit', edit, {headers: headers})
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
                        <label>Name: </label>
                        <input type="string"
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangename}
                               />
                               <br></br>  
                         <label>Email-ID: </label>
                        <input type="string" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeemail}
                               /> 
                      <label>Educational Institution: </label>
                        <input type="string" 
                               className="form-control" 
                               value={this.state.education}
                               onChange={this.onChangeeducation}
                               /> 
                     <label>Skills: </label>
                        <input type="string" 
                               className="form-control" 
                               value={this.state.skills}
                               onChange={this.onChangeskills}
                               /> 
                     <br></br><br></br>
						<label for="image">Upload Profile Image:</label>&nbsp;
						<input
									type="file"
									onChange={this.onChangeim}
									// value={this.state.image}
									id="image"
									name="image"
								></input>
                        <br></br><br></br>
                        <label for="image">Upload Resume:</label>&nbsp;
						<input
									type="file"
									onChange={this.onChangepdf}
									// value={this.state.image}
									id="resume"
									name="resume"
								></input>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit Profile" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}