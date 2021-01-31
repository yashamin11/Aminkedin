import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import "../App.css";
// import Button from 'react-bootstrap/Button'

// import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';

export default class Search extends Component {
    
    constructor(props) {
       super(props);
        this.state = {
            listings: [],
            search: '',
            x: 0,
            y: 0,
            type: 'Full-Time',
            duration: 0,
            applied_jobs:[]

        }
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onChangeX = this.onChangeX.bind(this);
        this.onChangeY = this.onChangeY.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.FilterSalary = this.FilterSalary.bind(this);
        this.FilterType = this.FilterType.bind(this);
        this.FilterDuration = this.FilterDuration.bind(this);
        // this.getall = this.getall.bind(this);
        
    }

    onChangeSearch(event) {
        this.setState({ search: event.target.value });
    }
    onChangeX(event) {
        this.setState({ x: event.target.value });
    }
    onChangeY(event) {
        this.setState({ y: event.target.value });
    }
    onChangeType(event) {
        this.setState({ type: event.target.value });
    }
    onChangeDuration(event) {
        this.setState({ duration: event.target.value });
    }
    onSubmit(e) {
       
        e.preventDefault();
        let listings = this.state.listings;
        console.log(listings);
        const Search = {
            name: this.state.search,
        }

        console.log(Search);
        axios.post('http://localhost:4000/api/jobs/search', Search)
             .then(res => {
                console.log(res.data);
                this.setState({listings: res.data});

            })
             .catch(err =>
                {
                    if(err.response.data.message)
                    alert(err.response.data.message);
                    console.log(err)
                });

        this.setState({
            search : '',
        });
    }


    sortbySalary = () =>{
        let listings = this.state.listings, n = listings.length;
      
        for(var i=0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var left = listings[j].salary;
                var left2 = listings[j+1].salary;
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
    sortbydecSalary = () =>{
        let listings = this.state.listings, n = listings.length;
   
        for(var i=0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var left = listings[j].salary;
                var left2 = listings[j+1].salary;
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
                var left = listings[j].rating;
                var left2 = listings[j+1].rating;
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
                var left = listings[j].rating;
                var left2 = listings[j+1].rating;
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
    sortbyDuration = () =>{
        let listings = this.state.listings, n = listings.length;
        // console.log("Heee");
        for(var i=0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var left = listings[j].duration;
                var left2 = listings[j+1].duration;
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
    sortbydecDuration = () =>{
        let listings = this.state.listings, n = listings.length;
        // console.log("Heee");
        for(var i=0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var left = listings[j].duration;
                var left2 = listings[j+1].duration;
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

        axios.post('http://localhost:4000/api/jobs/applicantview',{'type': 1}, { headers: headers} )
             .then(response => {
                console.log(response.data)
                this.setState({listings: response.data});
             })
             .catch(function(error) {
                if(error.response.data.message)
                alert(error.response.data.message);
                 console.log(error);
             })
             axios.post('http://localhost:4000/api/jobs/getapp',{'type': 1}, { headers: headers} )
             .then(response => {
                console.log(response.data)
                this.setState({applied_jobs: response.data});
             })
             .catch(function(error) {
                if(error.response.data.message)
                alert(error.response.data.message);
                 console.log(error);
             })
    }
    FilterSalary(e) {
        // console.log("Hyoo");
        e.preventDefault();
        let listings = this.state.listings;
        // console.log(listings);
        let x = this.state.x;
        let y = this.state.y
        const result = listings.filter(listings => listings.salary>=x & listings.salary<=y);
        this.setState({listings: listings});
        this.setState({
            listings: result,
            x:0,
            y:0

        });

        console.log(result);
        
    }

    FilterType(e) {
        // console.log("Hyoo");
        e.preventDefault();
        let listings = this.state.listings;
        // console.log(listings);
        let type = this.state.type;
  
        const result = listings.filter(listings => listings.type==type);
        this.setState({listings: listings});
        this.setState({
            listings: result,
            type: 'Full-Time'

        });

        console.log(result);
        
    }
    FilterDuration(e) {
       
        e.preventDefault();
        let listings = this.state.listings;
        // console.log(listings);
        let duration = this.state.duration;
  
        const result = listings.filter(listings => listings.duration<duration);
        this.setState({listings: listings});
        this.setState({
            listings: result,
            duration: 0

        });

        console.log(result);
        
    }


    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Search Job: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.search}
                               onChange={this.onChangeSearch}
                               /> 
                      
                        
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Search" className="btn btn-primary"/>
                    </div>
                </form>
                <form onSubmit={this.FilterSalary}>
                  
                        <label>Filter Salary: </label>&nbsp;&nbsp;
                        <input type="number" min="1"
                               value={this.state.x}
                               onChange={this.onChangeX}
                               /> &nbsp;&nbsp;

                        
                        <input type="number" min="1"
                              
                               value={this.state.y}
                               onChange={this.onChangeY}
                               /> &nbsp;&nbsp;&nbsp;
                      
                        
         
                  
                        <input type="submit" value="Filter" className="btn btn-primary"/>
                </form>
                <form onSubmit={this.FilterType}>
                    <label>Filter Type: </label>&nbsp;&nbsp;&nbsp;
                            <select  value={this.state.type} onChange={this.onChangeType}> 
                                <option name="Full-Time" value="Full-Time">Full-Time</option>
                                <option name="Part-Time" value="Part-Time">Part-Time</option>
                                <option name="Work-From-Home" value="Work-From-Home">Work-From-Home</option>
                            </select>&nbsp;&nbsp;&nbsp;
                    <input type="submit" value="Filter" className="btn btn-primary"/>
                </form>
                <form onSubmit={this.FilterDuration}>
                  
                  <label>Filter Duration: </label>&nbsp;&nbsp;
                  <select  value={this.state.duration} onChange={this.onChangeDuration}> 
                                <option name="1" value="1">1</option>
                                <option name="2" value="2">2</option>
                                <option name="3" value="3">3</option>
                                <option name="4" value="4">4</option>
                                <option name="5" value="5">5</option>
                                <option name="6" value="6">6</option>
                                <option name="7" value="7">7</option>
                                </select>&nbsp;&nbsp;&nbsp;
                  <input type="submit" value="Filter" className="btn btn-primary"/>
                </form>

            <br></br>
                <Button size='sm' variant="info" onClick={this.sortbySalary} >Ascending Salary</Button> &nbsp;
                <Button size='sm' variant="info" onClick={this.sortbyDuration} >Ascending Duration</Button> &nbsp;
                <Button size='sm'  variant="info" onClick={this.sortbyRating} >Ascending Rating</Button> &nbsp; 
                <Button size='sm' variant="info" onClick={this.sortbydecSalary} >Descending Salary</Button> &nbsp; 
                <Button size='sm' variant="info" onClick={this.sortbydecDuration} >Descending Duration</Button> &nbsp; 
                <Button size='sm' variant="info" onClick={this.sortbydecRating} >Descending Rating</Button> &nbsp; 
                <br></br><br></br>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Salary</th>
                            <th>Recruiter</th>
                            <th>Duration</th>
                            <th>Deadline</th>
                            <th>Rating</th>
                            <th></th>
                            
                            {/* <th>Positions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.listings.map((job, i) => {
                    
                            var array=[...this.state.applied_jobs]
                            console.log(array);
                            let mark=false;
                            let full = false;
                            for(var j=0;j<array.length;j++)
                            {
                                console.log("Yo");
                                console.log(job._id);
                                console.log(array[j].job);
                                var a = JSON.stringify(job._id);
                                var b = JSON.stringify(array[j].job);
                                console.log(a);
                                console.log(b);
                          

                                if(a==b)
                                {
                                    // console.log("yoyoy");
                                    mark=true
                                }
                                // console.log(array[j].job_id,job._id)
                            }
                            if(job.no_acc==job.positions)
                            {
                                full= true;
                            }
                            if(job.no_app==job.maxapp)
                            {
                                full = true;
                            }
                            return (
                                <tr key={i}>
                                    <td>{job.title}</td> 
                                    <td>{job.type}</td>                 
                                    <td>{job.salary}</td>
                                    <td>{job.recruiter.username}</td>
                                    <td>{job.duration}</td>
                                    <td>{job.deadline}</td>
                                    <td>{job.rating}</td>
                                    <td>

                                    { mark ?  <Button  style = {{backgroundColor:'green'}}  color="primary" disabled>Applied</Button>:(full==true ?  <Button  style = {{backgroundColor:'purple'}}  color="primary" disabled>Full</Button>: <Link to={{ pathname: '/sop', state: { id: job._id, }}}> <Button style = {{backgroundColor:'yellow'}} variant="contained" onClick={()=>{}}>Apply</Button></Link> )}</td>
                                    {/* <td><Link  variant="btn" to={{ pathname: '/sop', state: { id: job._id, }}} > Apply </Link></td> */}
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