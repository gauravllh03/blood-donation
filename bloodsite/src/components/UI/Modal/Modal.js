import React, { Component } from 'react';
import classes from './Modal.css'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return (nextProps.show !== this.props.show) || nextProps.children !== this.props.children;
        //return true if next incoming props.show is different from current state.show
        // also return true if next incoming child of modal (i.e. order summary/spinner) is different from current one
    }

    render() {
        return (
            <React.Fragment>
                <Backdrop show={this.props.show} clicked={this.props.closeModal}/>
                <div className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                        }}>
                    {this.props.children}
                </div>
            </React.Fragment>
        );
    };
}

export default Modal;