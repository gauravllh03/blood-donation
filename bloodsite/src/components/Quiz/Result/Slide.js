import React from 'react';
import image2 from '../../../assets/images/slider/quiz1.jpg'
import image3 from '../../../assets/images/slider/quiz2.jpg'
import image4 from '../../../assets/images/slider/quiz3.jpg'
import image5 from '../../../assets/images/slider/quiz4.jpg'
import classes from './Slide.css'

const slide = () => {
    return (
        <React.Fragment>
            <center>
                <div className={classes.slid}>
                    <figure className={classes.figur}>
                        <img className={classes.imag} src={image3} alt="image"/>
                        <img className={classes.imag} src={image2} alt="image"/>
                        <img className={classes.imag} src={image4} alt="image"/>
                        <img className={classes.imag} src={image5} alt="image"/>
                        <img className={classes.imag} src={image3} alt="image"/>
                        <img className={classes.imag} src={image2} alt="image"/>
                        <img className={classes.imag} src={image5} alt="image"/>
                        <img className={classes.imag} src={image3} alt="image"/>
                        <img className={classes.imag} src={image4} alt="image"/>
                        <img className={classes.imag} src={image3} alt="image"/>
                    </figure>
                </div>
            </center>
        </React.Fragment>
    )
};

export default slide;