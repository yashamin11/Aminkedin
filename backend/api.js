const router = require('express').Router();
let User = require('./models/user');
let Token = require('./models/token');

let Job = require('./models/Job');
let RecruiterProfile = require('./models/recruiterprofile');
let ApplicantProfile = require('./models/applicantprofile');
let Application = require('./models/Application');
const bcrypt = require('bcrypt');
const { application } = require('express');
const { check, validationResult } = require('express-validator');

const multer = require('multer');
let path = require('path');
const { v4: uuidv4 } = require('uuid');

const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport')

let mailTransporter = nodemailer.createTransport({ 
    service: 'gmail', 
    auth: { 
        user: 'yashamin0411@gmail.com', 
        pass: ''
    } 
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
// let mailDetails = { 
//     from: 'yashamin11042001@gmail.com', 
//     to: 'yashamin1104@gmail.com', 
//     subject: 'Test mail', 
//     text: 'Node.js testing mail for GeeksforGeeks'
// }; 


//SG.GAqRITUrTCSyYU1hDlUpTw.UmGMJEgESdJJuSQfgysp2GtqwZTTtQJ2fvqVbxb2AqA

// Users

router.route('/users').get((req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json(err));
});
router.route('/jobget').get((req, res) => {
    Job.find()
      .then(jobs => res.json(jobs))
      .catch(err => res.status(400).json(err));
});
router.route('/appget').get((req, res) => {
    Application.find()
      .then(application => res.json(application))
      .catch(err => res.status(400).json(err));
});
router.route('/profileget').get((req, res) => {
    RecruiterProfile.find()
      .then(recruiterprofile => res.json(recruiterprofile))
      .catch(err => res.status(400).json(err));
});
router.route('/proget').get((req, res) => {
    ApplicantProfile.find()
      .then(applicantprofile => res.json(applicantprofile))
      .catch(err => res.status(400).json(err));
});
router.route('/tokenget').get((req, res) => {
    Token.find()
      .then(token => res.json(token))
      .catch(err => res.status(400).json(err));
});



router.route('/sendemail').get((req, res) => {

    let mailDetails = { 
        from:'yashamin0411@gmail.com', 
        to: 'aman.rajmeel@students.iiit.ac.in', 
        subject: 'Application Accepted', 
        html: '<h1>Congratulations!!<br></br> Your Appliation for your desired job has been Accepted<h1>'
    }; 
    mailTransporter.sendMail(mailDetails, function(err, data) { 
        if(err) { 
            console.log('Error Occurs'); 
        } else { 
            console.log('Email sent successfully'); 
        } 
    }); 
    res.send('Email sent');
});

function Authorize(req)
{
    
    const token = req.header('Authorization');
    console.log(token);
  
    return Token.findOne({ token: token })
        .then(token => {
            if(!token) {return null;}

            return token.user;
        })
        .catch(err => {
            console.log("Error!");
            res.status(400).send(err);
        });
};




router.post('/users/add', (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) res.status(400).send(err);
        else
        {
            let user = new User(req.body);

            user.password = hash;
            // console.log('Yo');
            console.log(user);
            if(user.type!="A")
            {
                let recruiterprofile = new RecruiterProfile;
                recruiterprofile.recruiter = user;
                recruiterprofile.name='Not yet Updated';
                recruiterprofile.email='Not yet Updated';
                recruiterprofile.bio='Not yet Updated';
                recruiterprofile.contact='Not yet Updated';
                // console.log('Hey');
                console.log(recruiterprofile);
                recruiterprofile.save();
            }
            else{
                
                let applicantprofile = new ApplicantProfile;
                applicantprofile.applicant = user;
                applicantprofile.name='Not yet Updated';
                applicantprofile.email='Not yet Updated';
                applicantprofile.education='Not yet Updated';
                applicantprofile.skills='Not yet Updated';
                      
                console.log(applicantprofile);
                applicantprofile.save();

            } 
            user.save()
            .then(user => {
                user.password = undefined;
                res.status(201).json(user);
            })
            .catch(err => {
                console.log(err);
                res.status(400).send(err);
            });
        }
    });
});

router.post('/users/login', (req, res) => {
    let username = req.body.username, password = req.body.password;
    if(!username || !password) return res.status(400).send({'message': 'Please enter all fields'});

    User.findOne({ username: username })
        .then(user => {
            if(user){
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (result){
                        Token.findOne({user})
                            .populate({
                                path: 'user'
                            })
                            .then(token => {
                                if(!token)
                                {
                                    token = new Token({user: user});
                                    token.save();
                                }
                                token.user.password = undefined;
                                token.expire = undefined;
                                token._id = undefined;
                                res.status(200).send({token});
                            })
                            .catch(err => {
                                res.status(400).send({'message': 'Token invalid'});
                            });
                    }
                    else res.status(400).send({'message': 'Password Incorrect'});
                });
            }
        else res.status(400).send({'message': "User not found"});
        })
        .catch(err => console.log(err));
});




// ADD Job
router.post('/jobs/add',[check('email').isEmail()],(req, res) => {

    Authorize(req)
    .then(user =>{
        if(!user) return res.status(400).json({'message': 'User not found'});
        User.findOne({_id: user})
            .then(user => {
                if(!user) 
                {
                    console.log("A");
                    return res.status(400).json({'message': 'User not found'});
                }
                if(user.type != "R") 
                {
                    console.log(user.type);
                    return res.status(401).json({'message': 'User not authorized'});
                }
                const errors = validationResult(req)
                if(!errors.isEmpty())
                {
                    return res.status(422).json({'message': 'Please enter a valid E-mail'});   
                }
                console.log(req);
                let job = new Job(req.body);
               
                job.recruiter = user;
                console.log(job);
                job.save()
                .then(job => {
                    res.status(201).json(job);
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).send(err);
                });
            })
            .catch(err => {
                res.status(400).send(err);
            });
    })
    .catch(err => {
        res.status(400).send(err);
    });    
});


// View Applicant Job listings
router.post('/jobs/applicantview', (req, res) => {

    Authorize(req)
    .then(user =>{
        if(!user) return res.status(400).json({'message': 'User not found'});
        User.findOne({_id: user})
            .then(user => {
                if(!user) return res.status(400).json({'message': 'User not found'});
                if(user.type != "A") 
                    return res.status(401).json({'message': 'User not authorized'});
                
            if(req.body.type == 1)
            {
                Job.find({isDeleted: false,deadline: { $gt : Date.now()} })
                .populate({
                    path: 'recruiter'
                })
                .then( job => {
                    res.status(200).json(job)
                })
                .catch(err => {
                    res.status(400).send(err);
                });
            }
                
            })
            .catch(err => {1
                res.status(400).send(err);
            });
    })
    .catch(err => {
        res.status(400).send(err);
    });    
});

router.post('/jobs/getapp', (req, res) => {

    console.log("hello");
    Authorize(req)
    .then(user =>{
        if(!user) return res.status(400).json({'message': 'User not found'});
        User.findOne({_id: user})
            .then(user => {
                if(!user) return res.status(400).json({'message': 'User not found'});
                if(user.type != "A") 
                    return res.status(401).json({'message': 'User not authorized'});
                
            if(req.body.type == 1)
            {
                Application.find({applicant:user})
                .then( application => {
                    console.log(application);
                    res.status(200).json(application)
                })
                .catch(err => {
                    res.status(400).send(err);
                });
            }
                
            })
            .catch(err => {1
                res.status(400).send(err);
            });
    })
    .catch(err => {
        res.status(400).send(err);
    });    
});

// View Recruiter Job Listings
router.post('/jobs/view', (req, res) => {

    // console.log(req);
    Authorize(req)
    .then(user =>{
        if(!user) return res.status(400).json({'message': 'User not found'});
        User.findOne({_id: user})
            
            .then(user => {
                if(!user) return res.status(400).json({'message': 'User not found'});
                if(user.type != "R") 
                    return res.status(401).json({'message': 'User not authorized'});
                
            if(req.body.type == 1)
            {
                Job.find({recruiter: user, isDeleted: false,$where: "this.no_acc < this.positions"}) 
                .then( job => {
                    job.forEach(job => {
                        job.recruiter = undefined;
                    })
                    res.status(200).json(job)
                })
                .catch(err => {
                    res.status(400).send(err);
                });
            }

            else if(req.body.type == 2)
            {
                Job.find({recruiter: user, isDeleted: false})  
                .then( job=> {
                    job.forEach(job => {
                        job.recruiter= undefined;
                    })
                    res.status(200).json(job)
                })
                .catch(err => {
                    res.status(400).send(err);
                });
            }
                
            })
            .catch(err => {1
                res.status(400).send(err);
            });
    })
    .catch(err => {
        res.status(400).send(err);
    });    
});


// Get Recruiter Profile

router.get('/rprofile', (req, res) => {

    Authorize(req)
    .then(user =>{
        if(!user) return res.status(400).json({'message': 'User not found'});
        User.findOne({_id: user})
            .then(user => {
                if(!user) return res.status(400).json({'message': 'User not found'});
                if(user.type != "R") 
                    return res.status(401).json({'message': 'User not authorized'});
                
                    // console.log(user);
                    // console.log('Heeeeee');

                RecruiterProfile.find({recruiter: user})
                .then( profile => {
                   
                    res.status(200).json(profile)
                })
                .catch(err => {
                    res.status(400).send(err);
                });
       
                
            })
            .catch(err => {1
                res.status(400).send(err);
            });
    })
    .catch(err => {
        res.status(400).send(err);
    });    
});

// Get Applicant Profile
router.get('/appprofile', (req, res) => {

    Authorize(req)
    .then(user =>{
        if(!user) return res.status(400).json({'message': 'User not found'});
        User.findOne({_id: user})
            .then(user => {
                if(!user) return res.status(400).json({'message': 'User not found'});
                if(user.type != "A") 
                    return res.status(401).json({'message': 'User not authorized'});
                
                console.log(user);

                ApplicantProfile.find({applicant: user})
                .populate({
                    path: 'applicant',
                    
                })
                .then( profile => {              
                    res.status(200).json(profile)
                })
                .catch(err => {
                    res.status(400).send(err);
                });     
                
            })
            .catch(err => {1
                res.status(400).send(err);
            });
    })
    .catch(err => {
        res.status(400).send(err);
    });    
});



// Accepting a Application

router.route('/application/success').post((req, res)=> {

    Authorize(req)
    .then(user =>{
        if(!user) return res.status(401).json({'message': 'User not found'});
        var  x = 0;
        var y= '';
        Application.findOne({ _id: req.body.id })
            .populate({
                path: 'job',
                
            })
            .populate({
                path: 'applicant',
                
            })
            .then(application => {
                if(!application) return res.status(400).json({'message': 'Application not found'});
               
                if(application.job.no_acc < application.job.positions) 
               {
                 
             

                if(application.status=="Applied")
                {
                    application.status='Shortlisted';
                    application.save();
                }
                else if(application.status=="Shortlisted")
                {

                     x = 1;
                    application.status="Accepted";     
                    application.save();

                    console.log(application.applicant.email);

                    y =  application.applicant._id;
                 
                   

          

                    
                    console.log(application);
                    User.findOne({_id: application.applicant._id})
                    .then(userss=>{
                        userss.hasbeenAccepted = true;
                        userss.save();
                        
                    })
                    Job.findOne({_id: application.job._id})
                    .then(jobss=>{
                        jobss.no_acc +=1;
                        jobss.save();
                        
                    })
                    Application.find({applicant: y})
                    .then( applications=>{
                        applications.forEach(applicatio => {
                          var a = JSON.stringify(applicatio._id);
                            var b = JSON.stringify(application._id);
                            console.log(a);
                            console.log(b);
                            if(a!=b)
                            {
                                console.log("yooyo");
                                console.log(a);
                                console.log(b);
                                console.log(typeof(a));
                                console.log(typeof(b));
                                applicatio.status = 'Rejected';
                                applicatio.save();
                            }
                        }) 
                      
                        console.log(applications);                  
                    })

                    let mailDetails = { 
                        from:'yashamin0411@gmail.com', 
                        to: application.applicant.email, 
                        subject: 'Application Accepted', 
                        html: '<h1>Congratulations!!<br></br> Your Appliation Has been Accepted<h1>'
                    };
                    mailTransporter.sendMail(mailDetails, function(err, data) { 
                        if(err) { 
                            console.log('Error Occurs'); 
                        } else { 
                            console.log('Email sent successfully'); 
                        } 
                    }); 
                    res.status(200).json({'message': 'Application accepted'});
                    


                }
                // application.save();
            }
            else
            {
                res.status(200).json({'message': 'Maximum Positions reached'});
            }
                
            })
            .catch(err => {
                res.status(400).send(err);
            });          
           
    })
    .catch(err => {
        res.status(400).send(err);
    });
});

// Rejecting a Application

router.route('/application/reject').post((req, res)=> {

    Authorize(req)
    .then(user =>{
        if(!user) return res.status(401).json({'message': 'User not found'});
        
        Application.findOne({ _id: req.body.id })
            .populate({
                path: 'job',
                
            })
            .populate({
                path: 'applicant',
                
            })
            .then(application => {
                if(!application) return res.status(400).json({'message': 'Application not found'});

                if(application.status=="Applied")
                {
                    application.status='Rejected';
                    application.applicant.no_app -= 1;
                    application.applicant.save();

                    application.save();
                }
                else if(application.status=="Shortlisted")
                {
                    application.status='Rejected';
                    application.applicant.no_app -= 1;
                    application.applicant.save();

                    application.save();
                }
                else if(application.status=='Accepted')
                {
                    application.status= 'Rejected';
                    application.applicant.no_app -= 1;
                    application.applicant.hasbeenAccepted = false;
                    application.applicant.hasbeenRated = false;
                    application.applicant.hasRated= false;
                    application.job.no_acc -= 1;
                    application.applicant.save();
                    application.job.save();
                    application.save();

                }
                else
                application.save();
               
                
            })
            .catch(err => {
                res.status(400).send(err);
            });
            res.status(200).json({'message': 'Application accepted'});
    })
    .catch(err => {
        res.status(400).send(err);
    });
});



// Job Delete

router.route('/jobs/delete').post((req, res)=> {
  
    Authorize(req)
    .then(user =>{
        if(!user) 
        {
            return res.status(401).json({'message': 'User not found'});
        }
        User.findOne({_id: user})
            .then(user => {
                if(!user) return res.status(400).json({'message': 'User not found'});
                Job.findOne({ _id: req.body.id })
                .then(job => {
                    if(!job) return res.status(400).json({'message': 'Job not found'});
                    if(!job.recruiter.equals(user._id)) 
                    {
                        // console.log(job.recruiter, user._id)
                        return res.status(401).json({'message': 'User not authorized to perform this action'});
                    }
                    Application.find({job})
                    .populate({
                        path: 'applicant'
                    })
                    .then( applications => {
                        applications.forEach(application => {
                            application.status = "Canceled";
                            application.applicant.hasbeenAccepted = false;
                            application.applicant.hasbeenRated = false;
                            application.applicant.hasRated = false;
                             application.applicant.save();
                            application.save();
                        }) 
                    })
                    
                    .catch(err => {
                        res.status(400).send(err);
                    });

                    job.isDeleted = true;
                    job.save();
                    res.status(200).json({'message': 'Job deleted'});
                    
                })
                
                .catch(err => {
                    res.status(400).send(err);
                });
            })
            .catch(err => {
                res.status(400).send(err);
            });
        
    })
    .catch(err => {
        res.status(400).send(err);
    });
});



// Search Job
// router.post('/jobs/search', (req, res) => {

//     console.log("hye");
//     Job.find({title: req.body.name})
//     .populate({
//         path: 'recruiter',        
//     })
//     .then(jobs => {
//         jobs.forEach(job => {
//             job.recruiter.password = undefined;
//             console.log(job.recruiter);
//             console.log("Hye");
//         })
//         res.json(jobs);
//         console.log(jobs);
        
//     })
//     .catch(err => {res.status(400).send(err); });

// });

router.post('/jobs/search', (req, res) => {

    var search = req.body["name"];
    console.log(search);

	if (search === "") {
        // console.log("imhere");
        Job.find({})
        .populate({
            path: 'recruiter',        
        })
        .then(resp => {
			newresp = resp.filter(function(a) {
				return a.no_acc< a.positions && a.isDeleted == false;
			});
			res.send(newresp);
		});
	} else {
        const regex = new RegExp(escapeRegex(search), 'gi');
        Job.find({"title":regex})
        .populate({
            path: 'recruiter',        
        })
        .then(jobs => {
            jobs.forEach(job => {
                job.recruiter.password = undefined;
                console.log(job.recruiter);
                
            })
            res.json(jobs);
            console.log(jobs);
            
        })
        .catch(err => {res.status(400).send(err); });
    }
    

});

// Get all applications of a Job

router.post('/job/applications', (req, res) => {

    Authorize(req)
    .then(user =>{
        if(!user) 
            return res.status(400).json({'message': 'User not found'});
        User.findOne({_id: user})
            .then(user => {
                if(!user) 
                    return res.status(400).json({'message': 'User not found'});
                if(user.type != "R") 
                return res.status(401).json({'message': 'Applicant type: user does not have any applications'});
                

                Application.find({job: req.body.id ,$where: "this.status != 'Rejected' && this.status !='Canceled' "})
                .populate({
                    path: 'job',
                    populate: {
                        path: 'recruiter'
                    }
                    
                })
                .populate({
                    path: 'applicant'               
                    
                })
                .exec((err, applications) => {
                    if(err) 
                    {
                        console.log("error");
                        res.status(400).json(err);
                    }
                    else 
                    {
                        applications.forEach(application => {
                            application.job.recruiter.password = undefined;
                        })
                        res.status(200).json(applications);
                    }
                })
            })
            .catch(err => {
                console.log("Error! ");
                res.status(400).send(err);
            });
     })
    .catch(err => {res.status(400).send(err);});    
});







// Apply for Job
router.post('/apply', (req, res) => {

    // console.log("Hyejossjos");
    console.log(req);
    Authorize(req)
    .then(user =>{
        if(!user) return res.status(400).json({'message': 'User not found'});
        User.findOne({_id: user})
            .then(user => {
                if(!user) return res.status(400).json({'message': 'User not found'});
                if(user.type != "A") 
                    return res.status(401).json({'message': 'User not authorized to apply for job'});
                if(user.no_app>=10)
                return res.status(401).json({'message': 'You cannot apply to more than 10 Jobs'});
                if(user.hasbeenAccepted==true)
                return res.status(401).json({'message': 'You have already been accepted to a Job. Cant apply to more '});


                
                Job.findOne({ _id: req.body.job})
                .then(job => {
                    if(!job) return res.status(400).json({'message': 'Job not found'});    
                 
                    job.no_app += 1;
                    user.no_app +=1;


                    let application = new Application(req.body);
                    console.log(user);
                    application.applicant = user;
                    application.recruiter = job.recruiter;
                    console.log(application);

                    // console.log(product.no_orders, product.quantity);
                    if(job.maxapp >= job.no_app)
                    {
                        application.status='Applied';
                       application.save();
                       job.save();
                       user.save();
                       res.status(200).json(application);
                        // application.status = "Applied";

                    }
                    else
                    {
                        res.status(400).json({'message': 'Maximum Applications limit reached for the Job'});
                    }
                   
                    
                })
                .catch(err => {
                    res.status(400).send(err);
                });
            })
            .catch(err => {
                res.status(400).send(err);
            });
    })
    .catch(err => {
        res.status(400).send(err);
    });    
});



// My Applications

router.get('/myapplications', (req, res) => {

    Authorize(req)
    .then(user =>{
        if(!user) 
            return res.status(400).json({'message': 'User not found'});
        User.findOne({_id: user})
            .then(user => {
                if(!user) 
                    return res.status(400).json({'message': 'User not found'});
                if(user.type != "A") 
                return res.status(401).json({'message': 'Recruiter type: user does not have any applications'});
                

                Application.find({applicant: user,$where: "this.status != 'Canceled'"})
                .populate({
                    path: 'job',
                    populate: {
                        path: 'recruiter'
                    }
                })
                .exec((err, applications) => {
                    if(err) 
                    {
                        console.log("error");
                        res.status(400).json(err);
                    }
                    else 
                    {
                        applications.forEach(application => {
                            application.job.recruiter.password = undefined;
                        })
                        res.status(200).json(applications);
                    }
                })
            })
            .catch(err => {
                console.log("Error! ");
                res.status(400).send(err);
            });
     })
    .catch(err => {res.status(400).send(err);});    
});


router.get('/ac', (req, res) => {

    Authorize(req)
    .then(user =>{
        if(!user) 
            return res.status(400).json({'message': 'User not found'});
        User.findOne({_id: user})
            .then(user => {
                if(!user) 
                    return res.status(400).json({'message': 'User not found'});
                if(user.type != "R") 
                return res.status(401).json({'message': 'Applicant type: user does not have any applications'});
                
                Application.find({recruiter: user,$where: "this.status == 'Accepted'"})
                .populate({
                    path: 'job',
                    populate: {
                        path: 'recruiter'
                    }
                })
                .populate({
                    path: 'applicant',
                   
                })
                .populate({
                    path: 'recruiter',
                   
                })
                .exec((err, applications) => {
                    if(err) 
                    {
                        console.log("error");
                        res.status(400).json(err);
                    }
                    else 
                    {
                        applications.forEach(application => {
                            application.job.recruiter.password = undefined;
                        })
                        res.status(200).json(applications);
                    }
                })
            })
            .catch(err => {
                console.log("Error! ");
                res.status(400).send(err);
            });
     })
    .catch(err => {res.status(400).send(err);});    
});

// Edit Recruiter Profile
router.post('/recruiterprofile/edit',[check('email').isEmail()], (req, res) => {

    Authorize(req)
    .then(user =>{
        if(!user) return res.status(400).json({'message': 'User not found'});
        User.findOne({_id: user})
            .then(user => {
                if(user.type != "R") 
                    return res.status(401).json({'message': 'Invalid User type'});
                 const errors = validationResult(req);
                 if(!errors.isEmpty())
                    {
                        return res.status(422).json({'message': 'Please enter a valid E-mail'});   
                    }
                
                RecruiterProfile.findOne({_id: req.body.id})
                    .then( profile => {
                        console.log(profile);
                        if(!profile) return res.status(400).json({'message': 'Profile not found'});
                           
                            profile.name =  req.body.name;
                            profile.email = req.body.email;
                            profile.contact = req.body.contact;
                            profile.bio = req.body.bio;
                            console.log(profile);
                            profile.save();
                            res.status(200).json(profile);
                        })
                    .catch(err => res.status(400).json(err));
                })
                
            .catch(err => {
                res.status(400).send(err);
            });
     })
    .catch(err => {
        res.status(400).send(err);
    });    
});

// Edit Applicant Profile

router.post('/appprofile/edit', [check('email').isEmail()],(req, res)=> {

    console.log(req.body);
    Authorize(req)
    .then(user =>{
        if(!user) return res.status(400).json({'message': 'User not found'});
        User.findOne({_id: user})
            .then(user => {
                if(user.type != "A") 
                    return res.status(401).json({'message': 'Invalid User type'});
                    const errors = validationResult(req);
                    if(!errors.isEmpty())
                    {
                        return res.status(422).json({'message': 'Please enter a valid E-mail'});   
                    }
                
                ApplicantProfile.findOne({_id: req.body.id})
                .populate({
                    path: 'applicant',
                   
                })
                    .then( profile => {
                       
                        if(!profile) return res.status(400).json({'message': 'Profile not found'});
                           
                           
                            profile.name =  req.body.name;
                            profile.email = req.body.email;
                            profile.image =  req.body.image;
                            profile.resume = req.body.resume;
                            profile.education = req.body.education;
                            profile.skills = req.body.skills;
                            profile.applicant.email = req.body.email;

                            console.log(profile);
                            // profile.dp = req.file.dp;
                            // console.log("dsdsdsd");
                      
                            profile.save();
                            profile.applicant.save();
                            res.status(200).json(profile);
                        })
                    .catch(err => res.status(400).json(err));
                })
                
            .catch(err => {
                res.status(400).send(err);
            });
     })
    .catch(err => {
        res.status(400).send(err);
    });    
});


router.post('/job/edit', (req, res) => {

    Authorize(req)
    .then(user =>{
        if(!user) return res.status(400).json({'message': 'User not found'});
        User.findOne({_id: user})
            .then(user => {
                if(user.type != "R") 
                    return res.status(401).json({'message': 'Invalid User type'});
                
                Job.findOne({_id: req.body.id})
                    .then( job => {
                        // console.log(job);
                        if(!job) return res.status(400).json({'message': 'Job not found'});
                           
                            job.maxapp =  req.body.maxapp;
                            job.positions = req.body.positions;
                            job.deadline = req.body.deadline;
                          
                            // console.log(job);
                            job.save();
                            res.status(200).json(job);
                        })
                    .catch(err => res.status(400).json(err));
                })
                
            .catch(err => {
                res.status(400).send(err);
            });
     })
    .catch(err => {
        res.status(400).send(err);
    });    
});

// Rate the Recruiter

router.post('/raterecruiter', (req, res) => {
       console.log(req.body);
        Authorize(req)
        .then(user =>{
            if(!user) return res.status(400).json({'message': 'User not found'});
            User.findOne({_id: user})
                .then(user => {
                    if(!user) return res.status(400).json({'message': 'User not found'});
  
                    Application.findOne({ _id: req.body.id })
                    .populate({ path: 'recruiter'})
                    .populate({ path: 'applicant'})
                    .populate({ path: 'job'})
                    .then(application => {
                            if(!application) return res.status(400).json({'message': 'Application not found'});
                        
                        
                           if(application.applicant.hasRated==true)
                           return res.status(400).json({'message': 'Applicant has Already Rated his Recruiter'});
                           if(application.status!='Accepted')
                           return res.status(400).json({'message': 'Applicant cannot rate a Recruiter who has not Accepted him/her.'});

                          
                            let rating = parseInt(req.body.rating);

                            // if(application.recruiter == 0) vendor.rating = rating;
                            application.job.rating = (application.job.rating*application.job.no_reviews + rating)/(application.job.no_reviews+1);
                            application.job.no_reviews = application.job.no_reviews + 1;
                            console.log(application.job.rating);
                            application.applicant.hasRated = true;
                            application.job.save();
                            application.applicant.save();
                            console.log(application.job.rating);
                            res.status(200).json(application);
                    })
                })
                .catch(err => {
                    res.status(400).json(err);
                });
                    
        })
        .catch(err => {
            res.status(400).send(err);
        });    
    });

// Rate Applicant

router.post('/rateapplicant', (req, res) => {
        console.log(req.body);
         Authorize(req)
         .then(user =>{
             if(!user) return res.status(400).json({'message': 'User not found'});
             User.findOne({_id: user})
                 .then(user => {
                     if(!user) return res.status(400).json({'message': 'User not found'});
   
                     Application.findOne({ _id: req.body.id })
                     .populate({ path: 'recruiter'})
                     .populate({ path: 'applicant'})
                     .populate({ path: 'job'})
                     .then(application => {
                             if(!application) return res.status(400).json({'message': 'Application not found'});
                         
                         
                            if(application.applicant.hasbeenRated==true)
                            return res.status(400).json({'message': 'Applicant has Already been Rated by you'});
                            if(application.status!='Accepted')
                            return res.status(400).json({'message': 'Recruiter cannot rate a Applicant without Accepting him/her.'});
 
                           
                             let rating = parseInt(req.body.rating);
 
                             // if(application.recruiter == 0) vendor.rating = rating;
                             application.applicant.rating = (application.applicant.rating*application.applicant.no_reviews + rating)/(application.applicant.no_reviews+1);
                             application.applicant.no_reviews = application.applicant.no_reviews + 1;
                           
                             application.applicant.hasbeenRated = true;
                             application.applicant.save();
                             console.log(application.job.rating);
                             res.status(200).json(application);
                     })
                 })
                 .catch(err => {
                     res.status(400).json(err);
                 });
                     
         })
         .catch(err => {
             res.status(400).send(err);
         });    
     });


module.exports = router;
