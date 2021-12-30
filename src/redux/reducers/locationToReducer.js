const initialData = {
    to : [],

};

export const locationToReducer = (state=initialData , action)=>{
    console.log(action.payload);
     switch(action.type)
     
     {
         case 'LOCATION_TO' : {
             return{
                 ...state,
                 to : action.payload
             }
         }
         
         default:return state
     }

}

