import React from 'react';
import classes from './Gridview.css'
import propic from '../../../assets/images/profile_pics.jpg'
import crosspic from '../../../assets/images/hospital.jpg'
import graph from '../../../assets/images/graph.jpeg'

const gridview = (props) => {
        //const graph = <BloodGraph oplus={props.oplus} ominus={props.ominus} abplus={props.abplus} abminus={props.abminus} a={props.a} b={props.b} />;

        return (
            <React.Fragment>
            <div className={classes.gridcontainer}>
                <div className={classes.griditem}>
                    <div>
                        <img src={propic} alt="profilepic" height="80%" width="80%" />
                    </div>
                    <div>
                        <p align="center">Number of Active Users: 10</p>
                    </div>                
                </div>
    
                <div className={classes.griditem}>
                    <div>
                        <img src={graph} alt="graph" height="80%" width="80%" />
                    </div>
                    <div>
                        <p align="center">Available Blood: {props.totalBlood}cc</p>
                    </div>
                </div>
                <div className={classes.griditem}>
                    <img src={crosspic} alt="crosspic" height="80%" width="80%" />
                    <p>Number of hospitals associated with us: 3</p>
                </div>      
            </div>
            
            </React.Fragment>
        )
};

export default gridview;