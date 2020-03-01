import React,{ Component } from "react";
import classes from './Research.css';
import {connect} from 'react-redux';
import { Redirect } from "react-router";
class Research extends Component
{
    render()
    {
        let redirect=null;
        if(!this.props.isAuthenticated)
        {
            redirect=<Redirect to="/"/>;
        }
        return(
            <React.Fragment>
                {redirect}
                <p className={classes.para}>Research work friends</p>
                <br/>
                <p align="center" className={classes.text}><b><font size={36}>Cadaveric Blood Transfusion</font></b></p>
                <br/>
                <button type="button" className={classes.collapsible}>Necessity</button>
                
                <div className={classes.content}>
                <p>Today, blood transfusion by live donors is very less in proportion to the requirement, and there are no facility to produce artificial blood. The number of people who lose their lives because of unavailability of blood is also huge in the country. This underlines the importance of preserved blood to be used during emergencies</p>
                </div>
                <button type="button" className={classes.collapsible}>Procedure</button>
                <div className={classes.content}>
                <p>After death, human blood coagulates in some time, but becomes thin a couple of hours later.At this time, blood can be pumped out of the body.Blood can also be separated into various components.Blood is powdered after some chemical processes and preserve.It can be made into a fluid at the time of use</p>
                </div>
                <button type="button" className={classes.collapsible}>History</button>
                <div className={classes.content}>
                <p>In 1929, professor Vladimir Shamov of Kharkiv, USSR, reported the experimental use of cadaveric blood and demonstrated the absence of toxicity. Russian surgeon Sergei Yudin pioneered the transfusion of cadaveric blood and performed this successfully for the first time on March 23, 1930. Yudin also reported his first seven clinical transfusions with cadaveric blood at the Fourth Congress of Ukrainian Surgeons at Kharkiv in September 1930. With the discovery that cadaveric blood could be stored safely, time was provided for both serological tests and bacteriological examinations. Cadaveric blood was apparently never used widely, even in Russia. From these studies, however have developed a variety of means and methods for the collection, preservation, and storage of blood for transfusion, all of which may be grouped under the generic term of “blood bank". Although cadaver blood transfusion did not catch on in the United States, Dr. Bernard Fantus modified the Soviet idea by preserving blood from healthy living persons. Drawing on earlier work involving preservatives and anticoagulants, Fantus added the element of refrigeration and in 1937 established the first blood bank in the United States at Chicago's Cook County Hospit</p>
                </div>
                <button type="button" className={classes.collapsible}>References</button>
                <div className={classes.content}>
                <p>Wikipedia<br/>
                <a href="https://timesofindia.indiatimes.com/city/nagpur/Can-cadaver-blood-be-used-in-transfusions/articleshow/36452734.cms">Times Of India</a> 
                </p>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps=state=>{
    return{
        isAuthenticated:state.token!==null
    };
}
export default connect(mapStateToProps)(Research);
