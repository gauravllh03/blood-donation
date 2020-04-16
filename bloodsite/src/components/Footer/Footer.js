import React, { Component } from 'react';
import classes from './Footer.css'
import burgerLogo from '../../assets/images/blood.jfif';
import {NavLink} from 'react-router-dom';

class Footer extends Component{
    render(){
        return (
            <div className={classes.footer}>
                <div>
                    <div className={classes.about}>
                        <img src={burgerLogo} height="21" width="21"/>&nbsp;&nbsp;
                        <h3 className={classes.heading}>About Bloodsite</h3>
                        <p>
                            Bloodsite is a site which play quiz bla bla bla and you can give blood take blood. You can interact 
                            with donors. Donate blood, earn lives and play quiz. You can also logout.
                            <p style={{textDecoration:"underline"}}><NavLink to="/about"><span className={classes.Team}>Our Team</span></NavLink></p>
                        </p>
                    </div>
                    <div className={classes.links}>
                        <h3>Site Links</h3>
                        <NavLink to="/home">Home</NavLink><br/>
                        <NavLink to="/donate">Donate</NavLink><br/>
                        <NavLink to="/quiz">Quiz</NavLink><br/>
                        <NavLink to="/stats">Statistics</NavLink><br/>
                        <NavLink to="/research">Research</NavLink><br/><br/>
                    </div>
                    <div className={classes.team}>
                        <h3>Our Team</h3>
                        <span>Utsav Das &nbsp;&nbsp;</span>
                            <a href="https://www.linkedin.com/in/utsav-das-8b373b192" target="_blank">
                                <i class="fa fa-linkedin-square"></i></a>&nbsp;
                            <a href="https://github.com/utsavD07" target="_blank">
                                <i class="fa fa-github-square"></i></a>&nbsp;
                            <a href="https://www.facebook.com/utsav.das.official.crazy.1607" target="_blank">
                                <i class="fa fa-facebook-square"></i></a><br/>
                        <span>Sourabh Sand &nbsp;&nbsp;</span>
                            <a href="https://www.linkedin.com/in/sourabh-sand-880305171/" target="_blank">
                                <i class="fa fa-linkedin-square"></i></a>&nbsp;
                            <a href="https://github.com/sourabh-98" target="_blank">
                                <i class="fa fa-github-square"></i></a>&nbsp;
                            <a href="https://www.facebook.com/profile.php?id=100008292403773" target="_blank">
                                <i class="fa fa-facebook-square"></i></a><br/>
                        <span>Gaurav Damani &nbsp;&nbsp;</span>
                            <a href="https://in.linkedin.com/in/gaurav-damani-37081a170" target="_blank">
                                <i class="fa fa-linkedin-square"></i></a>&nbsp;
                            <a href="https://github.com/gauravllh03" target="_blank">
                                <i class="fa fa-github-square"></i></a>&nbsp;
                            <a href="https://www.facebook.com/gaurav.damani.524" target="_blank">
                                <i class="fa fa-facebook-square"></i></a><br/>
                        <span>Rishav Kumar &nbsp;&nbsp;</span>
                            <a href="https://www.linkedin.com/in/enigma-shroff" target="_blank">
                                <i class="fa fa-linkedin-square"></i></a>&nbsp;
                            <a href="https://github.com/enigma-shroff" target="_blank">
                                <i class="fa fa-github-square"></i></a>&nbsp;
                            <a href="https://www.facebook.com/rishav.shroff.35" target="_blank">
                                <i class="fa fa-facebook-square"></i></a><br/>
                        <span>Paridhi Agarwal &nbsp;&nbsp;</span>
                            <a href="https://www.linkedin.com/in/paridhi-agarwal-23789b165/" target="_blank">
                                <i class="fa fa-linkedin-square"></i></a>&nbsp; 
                            <a href="https://github.com/paridhi7" target="_blank">
                                <i class="fa fa-github-square"></i></a>&nbsp;
                            <a href="https://www.facebook.com/paridhi.agarwal.33" target="_blank">
                                <i class="fa fa-facebook-square"></i></a><br/><br/>
                    </div>
                </div>
                <p className={classes.copyright}>&copy; Copyright 2020 Bloodsite. All rights reserved.</p>
            </div>
        );
    }
}

export default Footer;