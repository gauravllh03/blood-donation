import * as actionTypes from '../actions/actionTypes';

const initialState={
    token:null,
    userId:null,
    error:null,
    loading:false,
    lives:1,
    money:{
        'O+':10,
        'O-':12,
        'AB+':7,
        'AB-':5,
        'A':8,
        'B':8
    },
    timer:1000
};

const reducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case actionTypes.AUTH_START:
            return{
                ...state,
                error:null,
                loading:true
            }
        
        case actionTypes.AUTH_SUCCESS:
            return{
                ...state,
                token:action.idToken,
                userId:action.userId,
                error:null,
                loading:false
            };
            
        case actionTypes.AUTH_FAIL:
            return{
                ...state,
                loading:false,
                error:action.error
            }
        
        case actionTypes.AUTH_LOGOUT:
            return{
                ...state,
                token:null,
                userId:null
            }
        case actionTypes.SUBTRACT_LIFE:
            return{
                ...state,
                lives:action.lives
            }

        case actionTypes.UPDATE_TIME:
            return{
                ...state,
                timer:action.timer+10
            }
        case actionTypes.SUBTRACT_TIME:
            return{
                ...state,
                timer:action.timer
            }
            /*
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return{
                ...state,
                authRedirectPath:action.path
            }*/
        default: return state;
        
    }

}

export default reducer;