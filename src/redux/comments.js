import * as ActionTypes from './actionsTypes';


export const Comments = (state = {
    errmess: null,
    comments: []
}, action)=>{
    switch(action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, isLoading: false, errmess: null, comments: action.payload}
            
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.comments.length;
            comment.date = new Date().toISOString();
            return {...state, comments: state.comments.concat(comment)};

        case ActionTypes.COMMENTS_FAILED:
            return {...state, isLoading: false, errmess: action.payload, comments: []}    
        default: 
            return state;
    }
}