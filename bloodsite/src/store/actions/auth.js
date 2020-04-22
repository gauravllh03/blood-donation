import * as actionTypes from './actionTypes';
import axios from 'axios';

//authKey--->   AIzaSyD3nIFAqWuVrOwol2QMsgYJgFU3kWXC6fU
export const authStart=()=>{
    return{
        type:actionTypes.AUTH_START
    }
}

export const authSuccess=(token,userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    }
}

export const authFail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeout=(expirationTime)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logout());
        },expirationTime*1000);
    }
}

export const subtract=(lives)=>{
    return{
        type:actionTypes.SUBTRACT_LIFE,
        lives:lives-1
    }
}

export const update=(time)=>{
    return{
        type:actionTypes.UPDATE_TIME,
        timer:time*0
    }
}
export const subtractTime=(time)=>{
    return{
        type:actionTypes.SUBTRACT_TIME,
        timer:time-1
    }
}

export const auth=(email,password,name,blood,age,gender,isSignUp)=>{
    return dispatch=>{
        dispatch(authStart());

        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }

        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3nIFAqWuVrOwol2QMsgYJgFU3kWXC6fU';
        if(!isSignUp)
        {
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3nIFAqWuVrOwol2QMsgYJgFU3kWXC6fU';
        }
        
        axios.post(url,authData)
        .then(response=>{
            console.log(response);
            localStorage.setItem('email',response.data.email);
            const expirationDate=new Date(new Date().getTime()+response.data.expiresIn*1000);
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('userId',response.data.localId);
            if(name=="signin")
                console.log("Signed in bro");
            else    
            {
                const userData={
                    email:email,
                    name:name,
                    bloodgroup:blood,
                    gender:gender,
                    lives:3,
                    age:age
                };
                let userId=response.data.localId;
                let url='https://bloodsite-87a36.firebaseio.com/users/'+userId+'.json';
                axios.put(url,userData)
                .then(resp=>{
                    console.log("Sign Up data on firebase bro!");
                })
                .catch(error=>{
                    console.log("Error"+error);
                })
            }    
            dispatch(authSuccess(response.data.idToken,response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));

        })
        .catch(err=>{
            console.log(err);
            dispatch(authFail(err.response.data.error));
        });
               
    };
}




export const checkAuthState=()=>{
    return dispatch=>{
        const token=localStorage.getItem('token');
        if(!token)
        {
            dispatch(logout());
        }
        else
        {
            const expirationDate=new Date(localStorage.getItem('expirationDate'));
            if(expirationDate>new Date())
            {
                const userId=localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeout((expirationDate.getTime()-new Date().getTime())/1000));
            }
            else
            {
                dispatch(logout());
            }
        }
    }
}