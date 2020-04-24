import React, { Component } from 'react';
import axios from 'axios';
import profilepic from '../../assets/images/profile.png'
import classes from './Profile.css'
import Spinner from '../UI/Spinner/Spinner.js'
import StripeCheckout from 'react-stripe-checkout';
import burgerLogo from '../../assets/images/blood.jfif';
import CalendarHeatmap from 'react-calendar-heatmap';


class Profile extends Component {
	constructor(props, context) {
        super(props, context);
        this.onClick = this.onClick.bind(this);
    }
	state = {
		name: null,
		age: null,
		email: null,
		gender: null,
		bloodgroup: null,
		bloodVol: null,
		loading: true,
		// values: [
		// 	{ date: '2020-01-22', count: 1 },
		// 	{ date: '2020-01-30', count: 1 },
		// 	{ date: '2020-03-17', count: 1 },
		// 	{ date: '2020-04-17', count: 1 },
		// 	{ date: '2020-06-17', count: 1 },
		// ],
		values:null,
		numDays:180
	};
    onClick(value) {
		console.log(value);
		if(value)
			alert("You donated on this date :"+value.date);
		else
			alert("You did not donate on this day");
    }


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

	componentDidMount()
	{
		let userId= localStorage.getItem('userId');
        let urldate='https://bloodsite-87a36.firebaseio.com/dates/'+userId+'.json';
		axios.get(urldate)
		.then(resp=>{
			//alert(resp.data.values);
			if(resp.data==null)
			{
				let values=[{date:"0",count:1}];
				this.setState({values:values});
			}
			else
			{
				let arr=resp.data.values.split(" ");
				//alert(arr[0]);
				let values=[];
				for(let x in arr)
				{
					values.push({date:arr[x],count:1});
				}
				console.log(values);
				this.setState({values:values});
			}
			
		})
		.catch(error=>{
			console.log(error);
		})
	}
	fileChangeHandler=(event)=>{
		console.log(event.target.files[0]);
	}

	render () {
		let profileData= <Spinner/>;
		if(!this.state.loading && this.state.values) {
			profileData = (
				<div>
					<div className={classes.profile}>
						<div className={classes.profilepicdiv}>
							<img className={classes.image} src={profilepic} alt="profilepic" />
						</div>
						<div className={classes.data}>
							<h3>{this.state.name}</h3>
							<p><span>Age: </span>{this.state.age}</p>
							<p><span>Email: </span>{this.state.email}</p>
							<p><span>Gender: </span>{this.state.gender}</p>
							<p><span>Blood Group: </span>{this.state.bloodgroup}</p>
							<p><span>Total Blood Donated: </span>{this.state.bloodVol}</p>
						</div>
					</div>

					<div className={classes.Heatmap}>
						<p style={{textAlign:"center",color:"wheat"}}>Your Donation HEATMAP 2020 &#128512;</p>
						<CalendarHeatmap
							endDate={new Date('2020-07-01')}
							numDays={this.state.numDays}
							values={this.state.values}
							onClick={this.onClick}
							showWeekdayLabels={true}
						/>
            		</div>


				<div className={classes.contribute}>
					<p style={{textAlign:"center"}}>Dear, {this.state.name} Please donate for the poor!Your small voluntary contribution will enable us to conduct blood test and provide treatment for common blood diseases in financially backward areas of our society.Thank you!</p>
					<div className={classes.payment}>
                    	<StripeCheckout
							amount="5"
							billingAddress
							description="Please Contribute"
							image={burgerLogo}
							locale="auto"
							name="BloodSite"
							stripeKey="pk_test_kFpaOEfmED0xgn9bybb6i7jL00noPEPbN2"
							token={this.onToken}
							zipCode
							label="Pay 10 Rs"
							panelLabel="Pay {{amount}}"
                    	/>
                	</div>
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





            

   

