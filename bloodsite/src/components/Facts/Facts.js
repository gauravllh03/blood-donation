import React,{Component} from 'react';
import classes from './Facts.css';
class Facts extends Component
{
    render()
    {
        console.log(this.props.myth);
        return(
            <div className={classes.Facts}>
                <p style={{fontFamily:'Nosifer'}}>Myth : {this.props.myth}</p>
                <p>Fact : {this.props.fact}</p>
            </div>
        );
    }
}
export default Facts;