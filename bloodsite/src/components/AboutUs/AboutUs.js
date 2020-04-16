import React,{ Component } from "react";
import classes from './AboutUs.css';

import {SocialIcon} from 'react-social-icons';
import gaurav from '../../assets/images/gaurav.jpg';
import sourabh from '../../assets/images/sourabh.jpg';
import rishav from '../../assets/images/rishav.jpg';
import paridhi from '../../assets/images/paridhi.jpg';
import utsav from '../../assets/images/utsav.jpg';

class AboutUs extends Component{
    render(){
        const arr=[classes.persons,classes.person3];
        return(
            <React.Fragment>
                <p className={classes.para}>Our Team</p>
                <div className={classes.team1}>
                    <div className={classes.persons}>
                        <img src={sourabh} height="250px" width="280px"></img>
                        <div className={classes.info}>
                            <h4 className={classes.name}>Sourabh Sand</h4>
                            <p className={classes.email}>sandsourabh98@gmail.com</p>
                            <SocialIcon url="https://www.linkedin.com/in/sourabh-sand-880305171/" 
                                style={{height:"40px",width:"40px"}} 
                                fgColor="white" bgColor="blue" target="_blank"/>&nbsp;&nbsp;
                            <SocialIcon url="https://github.com/sourabh-98" 
                                style={{height:"40px",width:"40px"}} 
                                fgColor="white" bgColor="black" target="_blank"/>&nbsp;&nbsp;
                            <SocialIcon url="https://www.facebook.com/profile.php?id=100008292403773" 
                                style={{height:"40px",width:"40px"}} 
                                fgColor="white" target="_blank"/>
                            <br/><br/>
                            <p className={classes.phone}>+91 8777461226</p>
                        </div>
                    </div>
                    <div className={classes.persons}>
                        <img src={gaurav} height="250px" width="280px"></img>
                        <div className={classes.info}>
                            <h4 className={classes.name}>Gaurav Damani</h4>
                            <p className={classes.email}>gaurav.llh03@gmail.com</p>
                            <SocialIcon url="https://in.linkedin.com/in/gaurav-damani-37081a170" 
                                style={{height:"40px",width:"40px"}} 
                                fgColor="white" bgColor="blue" target="_blank"/>&nbsp;&nbsp;
                            <SocialIcon url="https://github.com/gauravllh03" 
                                style={{height:"40px",width:"40px"}} 
                                fgColor="white" bgColor="black" target="_blank"/>&nbsp;&nbsp;
                            <SocialIcon url="https://www.facebook.com/gaurav.damani.524" 
                                style={{height:"40px",width:"40px"}} 
                                fgColor="white" target="_blank"/>
                            <br/><br/>
                            <p className={classes.phone}>+91 7980303431</p>   
                        </div>
                    </div>
                    <div className={arr.join(" ")}>
                        <img src={rishav} height="250px" width="280px"></img>
                        <div className={classes.info}>
                            <h4 className={classes.name}>Rishav Kumar</h4>
                            <p className={classes.email}>enigma.shroff@gmail.com</p>
                            <SocialIcon url="https://www.linkedin.com/in/enigma-shroff" 
                                style={{height:"40px",width:"40px"}} 
                                fgColor="white" bgColor="blue" target="_blank"/>&nbsp;&nbsp;
                            <SocialIcon url="https://github.com/enigma-shroff" 
                                style={{height:"40px",width:"40px"}} 
                                fgColor="white" bgColor="black" target="_blank"/>&nbsp;&nbsp;
                            <SocialIcon url="https://www.facebook.com/rishav.shroff.35" 
                                style={{height:"40px",width:"40px"}} 
                                fgColor="white" target="_blank"/>
                            <br/><br/>
                            <p className={classes.phone}>+91 7903325079</p>
                        </div>      
                    </div>
                </div>
                <div className={classes.team2}>
                    <div className={classes.persons}>
                        <img src={paridhi} height="250px" width="280px"></img>
                        <div className={classes.info}>
                            <h4 className={classes.name}>Paridhi Agarwal</h4>
                            <p className={classes.email}>theparidhi0@gmail.com</p>
                            <SocialIcon url="https://www.linkedin.com/in/paridhi-agarwal-23789b165/" 
                                style={{height:"40px",width:"40px"}} 
                                fgColor="white" bgColor="blue" target="_blank"/>&nbsp;&nbsp;
                            <SocialIcon url="https://github.com/paridhi7" 
                                style={{height:"40px",width:"40px"}} 
                                fgColor="white" bgColor="black" target="_blank"/>&nbsp;&nbsp;
                            <SocialIcon url="https://www.facebook.com/paridhi.agarwal.33" 
                                style={{height:"40px",width:"40px"}} 
                                fgColor="white" target="_blank"/>
                            <br/><br/>
                            <p className={classes.phone}>+91 9163592929</p>   
                        </div>
                    </div>
                    <div className={classes.persons}>
                        <img src={utsav} height="250px" width="280px"></img>
                        <div className={classes.info}>
                            <h4 className={classes.name}>Utsav Das</h4>
                            <p className={classes.email}>utsavdas1998@gmail.com</p>
                            <SocialIcon url="https://www.linkedin.com/in/utsav-das-8b373b192" 
                                style={{height:"40px",width:"40px"}} 
                                fgColor="white" bgColor="blue" target="_blank"/>&nbsp;&nbsp;
                            <SocialIcon url="https://github.com/utsavD07" 
                                style={{height:"40px",width:"40px"}} 
                                fgColor="white" bgColor="black" target="_blank"/>&nbsp;&nbsp;
                            <SocialIcon url="https://www.facebook.com/utsav.das.official.crazy.1607" 
                                style={{height:"40px",width:"40px"}} 
                                fgColor="white" target="_blank"/>
                            <br/><br/>
                            <p className={classes.phone}>+91 70030 40617</p>   
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
} 

export default AboutUs;