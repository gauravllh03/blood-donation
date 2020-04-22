import React, { Component } from 'react';
import axios from 'axios';
import profilepic from '../../assets/images/profile.png'
import classes from './Profile.css'
import Spinner from '../UI/Spinner/Spinner.js'

class Profile extends Component {
	state = {
		name: null,
		age: null,
		email: null,
		gender: null,
		bloodgroup: null,
		bloodVol: null,
		loading: true
	};


	componentWillMount () {
		
		//const queryParams = '?auth=' + token + 'orderBy=userId&equalTo="' + uid + '"';
		axios.get(`https://bloodsite-87a36.firebaseio.com/donated.json`)
			.then(response=> {
				console.log(response.data);
				let totalBlood=0;
				const email=localStorage.getItem('email');
				for(let key in response.data) {
					if(response.data[key].email===email) {
						totalBlood+= +response.data[key].volume;
					}
				}
				

				console.log(totalBlood);
				this.setState({bloodVol:totalBlood})
			})
			.catch(err=> {
				console.log(err);
			})

			let email= localStorage.getItem('email');
			axios.get("https://bloodsite-87a36.firebaseio.com/users.json")
				.then(response=> {
					let name="";
					let bg="";
					let gender="";
					let age="";
					for(let key in response.data) {
						if(response.data[key].email===email) {
							name= response.data[key].name;
							bg= response.data[key].bloodgroup;
							age= response.data[key].age;
							gender= response.data[key].gender;
							break;
						}
					}
					this.setState({name:name, email:email, bloodgroup:bg, gender:gender, age:age, loading:false})
				})
	}


	render () {
		let profileData= <Spinner/>;
		if(!this.state.loading) {
			profileData = (
				<div>
					<div className={classes.profilepicdiv}>
						<img className={classes.image} src={profilepic} alt="profilepic" />
					</div>
					<div className={classes.data}>
						<h3>Name: {this.state.name}</h3>
						<p>Age: {this.state.age}</p>
						<p>Email: {this.state.email}</p>
						<p>Gender: {this.state.gender}</p>
						<p>Blood Group: {this.state.bloodgroup}</p>
						<p>Total Blood Donated: {this.state.bloodVol}</p>
					</div>
				</div>
			)
		}

		return (
			<div>
			{profileData}
			</div>
		)
	};
};

export default Profile;