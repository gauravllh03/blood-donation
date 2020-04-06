// class SendMessageForm extends React.Component {
//     constructor() {
//         super()
//         this.state = {
//             message: ''
//         }
//         this.handleChange = this.handleChange.bind(this)
//         this.handleSubmit = this.handleSubmit.bind(this)
//     }
    
//     handleChange(e) {
//         this.setState({
//             message: e.target.value
//         })
//     }
    
//     handleSubmit(e) {
//         e.preventDefault()
//         this.props.sendMessage(this.state.message)
//         this.setState({
//             message: ''
//         })
//     }
    
//     render() {
//         return (
//             <form
//                 onSubmit={this.handleSubmit}
//                 className={classes.sendMessageForm}>
//                 <input
//                     onChange={this.handleChange}
//                     value={this.state.message}
//                     placeholder="Type your message and hit ENTER"
//                     type="text" />
//             </form>
//         )
//     }
// }
import {Component} from "react";
import React from "react";
import classes from './SendMessageForm.css';
class SendMessageForm extends Component {
  state = {
    text: ""
  }
  onChange(e) {
    this.setState({text: e.target.value});
  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({text: ""});
    this.props.onSendMessage(this.state.text);
  }
  render() {
    return (
      <div>
        <form  className={classes.Form} onSubmit={e => this.onSubmit(e)}>
          <input className={classes.Input}
            onChange={e => this.onChange(e)}
            value={this.state.text}
            type="text"
            placeholder="Enter your message"
            
          />
          <button className={classes.Button}>Send</button>
        </form>
      </div>
    );
  }
}
export default SendMessageForm;