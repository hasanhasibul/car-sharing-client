import { message } from 'antd';


export const locationTo=(data)=>async dispatch=>{

    dispatch({type: 'LOADING' , payload:true})

    try {
        dispatch({type: 'LOCATION_TO', payload:data})
        dispatch({type: 'LOADING' , payload:false})
    } catch (error) {
        console.log(error)
        dispatch({type: 'LOADING' , payload:false})
    }

}

