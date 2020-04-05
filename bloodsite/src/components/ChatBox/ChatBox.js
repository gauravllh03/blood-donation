import React from 'react';
import classes from './ChatBox.css';
import MessageList from '../MessageList/MessageList';
import Title from '../Title/Title';
import SendMessageForm from '../SendMessageForm/SendMessageForm';

//   function randomName() {
//     const adjectives = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
//     const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
//     const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
//     const noun = nouns[Math.floor(Math.random() * nouns.length)];
//     return adjective + noun;
//   }
  
  function randomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
  }
class ChatBox extends React.Component {
    // state={
    //     messages:DUMMY_DATA
    // };
    state = {
        messages: [
          {
            text: "This is a test message!",
            member: {
              color: "green",
              username: "pinball"
            }
          },
          {
            text: "OK gaurav!",
            member: {
              color: "yellow",
              username:  localStorage.getItem("email").substring(0, localStorage.getItem("email").indexOf("@"))
            }
          },
          {
            text: "Thanks",
            member: {
              color: "orange",
              username:"sandunoob"
            }
          }
        ],
        member: {
          username: localStorage.getItem("email").substring(0, localStorage.getItem("email").indexOf("@")),
          color: randomColor()
        }
      }
      onSendMessage = (message) => {
        const messages = this.state.messages
        messages.push({
          text: message,
          member: this.state.member
        })
        this.setState({messages: messages})
      }
    render() {
      return (
        <div className={classes.App}>
          <Title/>
          <MessageList
                messages={this.state.messages}
                currentMember={this.state.member}
            />
          <SendMessageForm onSendMessage={this.onSendMessage}/> 
       </div>
      )
    }
  }

  export default ChatBox;