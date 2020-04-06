import React from 'react';
import classes from './ChatBox.css';
import MessageList from '../MessageList/MessageList';
import Title from '../Title/Title';
import SendMessageForm from '../SendMessageForm/SendMessageForm';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import axios from 'axios';
import Spinner from '../UI/Spinner/Spinner';
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
    
    state = {
        messages:null,
        member: {
          username: localStorage.getItem("email").substring(0, localStorage.getItem("email").indexOf("@")),
          color: randomColor()
        },
        loading:false
      }
      componentDidMount()
      {
        axios.get('https://bloodsite-87a36.firebaseio.com/messages.json')
        .then(resp=>{
             //console.log(resp.data);
             let messages=[];
             for(let key in resp.data)
             {
                 messages.push(resp.data[key]);
             }
             this.setState({messages:messages});
        }) 
         .catch(err=>{
             console.log(err);
         }) 
      }
      onSendMessage = (message) => {
        axios.post('https://bloodsite-87a36.firebaseio.com/messages.json',{
            text: message,
            member: this.state.member
          }).then(resp=>{
              //console.log(resp);
              axios.get('https://bloodsite-87a36.firebaseio.com/messages.json')
            .then(resp=>{
                console.log("update");
                let messages=[];
                for(let key in resp.data)
                {
                    messages.push(resp.data[key]);
                }
                this.setState({messages:messages});
            }) 
            .catch(err=>{
                console.log(err);
            })
              //this.setState({messages:[]})
          })
          .catch(err=>{
              console.log(err);
          })
      }
    render() {
        let redirect=null;
        if(!this.props.isAuthenticated)
        {
            redirect=<Redirect to="/"/>;
        }

        let messageList=(<MessageList
            messages={this.state.messages}
            currentMember={this.state.member}
        />);

        if(!this.state.messages)
        {
            messageList=<Spinner/>
        }
      return (
        <div className={classes.App}>
            {redirect}
          <Title/>
          {messageList}
          <SendMessageForm onSendMessage={this.onSendMessage}/> 
       </div>
      )
    }
  }
  const mapStateToProps=state=>{
    return{
        isAuthenticated:state.token!==null
    };
}
  export default connect(mapStateToProps)(React.memo(ChatBox,
    (prevProps,nextProps)=>{
        nextProps.messages===prevProps.messages
    }));