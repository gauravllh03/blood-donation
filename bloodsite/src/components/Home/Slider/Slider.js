import React from 'react';
import image2 from '../../../assets/images/slider/image2.jpg'
import image3 from '../../../assets/images/slider/image3.jpg'
import image4 from '../../../assets/images/slider/image4.jpg'
import image5 from '../../../assets/images/slider/image5.jpg'
import classes from './Slider.css'

const slider = () => {
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

export default slider;