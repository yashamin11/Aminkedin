import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Button} from "react-router-dom";

import Navbar from "./components/navbar.component"
import ApplicantNavbar from "./components/ApplicantNav"
import RecruiterNavbar from "./components/RecruiterNav"
import Register from "./components/register.component";
import Login from "./components/login.component";
import Front from "./components/front.component";
import AddJob from "./components/AddJob.js";
import JobListings from "./components/JobListings";
import RecruiterProfile from "./components/RecruiterProfile";
import RecruiterProfileEdit from "./components/RecruiterProfileEdit";
import SearchJob from "./components/SearchJob";
import SOP from "./components/SOP";
import MyApplications from "./components/MyApplications";
import ViewApplications from "./components/ViewApplications";
import JobEdit from "./components/JobEdit";
import Ac from "./components/Ac";
import ApplicantProfile from "./components/AppProfile";
import AppEdit from "./components/AppProfileEdit";







class App extends React.Component {
  render() {
    let user_type = localStorage.getItem('user_type');  
    console.log("10");
    let navbar = null;
    if(user_type === "R")
      navbar = <RecruiterNavbar />;
    else if(user_type === "A")
      navbar = <ApplicantNavbar />;
    else
      navbar = <Navbar />;

    
    return (
      <Router>
        <div className="container">
          {navbar}
          <br></br>
          <Route exact path="/" render={()=> {
            if(user_type === "R") 
            {
              return <RecruiterProfile/>
            }
              else if(user_type === "A") 
              {

                return <ApplicantProfile/>
              }

            else return <Front/>
          }}  />
          <Route path="/front" component={Front} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/add-job" component={AddJob} />
          <Route path="/joblistings" component={JobListings} />
          <Route path="/recruiterprofile" component={RecruiterProfile} />
          <Route path="/recruiterprofileedit" component={RecruiterProfileEdit} />
          <Route path="/searchjob" component={SearchJob} />
          <Route path="/sop" component={SOP} />
          <Route path="/myapplications" component={MyApplications} />
          <Route path="/jobapplications" component={ViewApplications}/>
          <Route path="/jobedit" component={JobEdit} />
          <Route path="/ac" component={Ac} />
          <Route path="/applicantprofile" component={ApplicantProfile} />
          <Route path="/applicantprofileedit" component={AppEdit} />
        </div>

      </Router>
    );
  }
}

export default App;
