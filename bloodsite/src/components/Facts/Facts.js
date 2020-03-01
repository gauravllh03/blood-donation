import React,{Component} from 'react';
import classes from './Facts.css';
class Facts extends Component
{
    render()
    {
        console.log(this.props.myth);
        return(
            <div className={classes.Facts}>
                <p style={{fontFamily:'Lobster'}}>Myth : {this.props.myth}</p>
                <p style={{fontFamily:'Acme'}}>Fact : {this.props.fact}</p>
            </div>
        );
    }
}
export default Facts;