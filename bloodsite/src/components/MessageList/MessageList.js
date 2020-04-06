import React from 'react';
import classes from './MessageList.css';
class MessageList extends React.Component {
    /*render() {
      return (
        <ul className={classes.messageList}>                 
           {this.props.messages.map((message, index) => {
            return (
             <li key={message.id} className={classes.message}>
               <div>
                 {message.senderId}
               </div>
               <div>
                 {message.text}
               </div>
             </li>
           )
         })}
       </ul>
      )
    }*/
    renderMessage(message) {
        const {member, text} = message;
        const {currentMember} = this.props;
        const messageFromMe = member.username === currentMember.username;
        // const xyz = messageFromMe ?
        //   "MessagesMessage currentMember" : "MessagesMessage";
        if(member.username==="gaurav.llh03" || member.username==="enigma.shroff" || member.username==="sandsourabh98")
        {
            member.username="ADMIN";
        }
        let xyz=[classes.MessagesMessage];
        let x="red";
        let y="O";
        if(messageFromMe)
        {
            //console.log("YES");
            x="yellow";
            y="C";
            xyz.push(classes.currentMember);
        }
        let rand=Math.floor(Math.random() * 10000);
        return (
          <li className={xyz.join(' ')} key={rand}>
            <span
              className={classes.avatar}
            >{y}</span>
            <div className={classes.MessageContent}>
              <div className={classes.username}>
                {member.username}
              </div>
              <div className={classes.text}>{text}</div>
            </div>
          </li>
        );
      }
    render() {
        const {messages} = this.props;
        return (
          <ul className={classes.MessagesList}>
            {messages.map(m => this.renderMessage(m))}
          </ul>
        );
      }
}
export default MessageList;