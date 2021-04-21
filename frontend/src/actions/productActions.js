import Axios from "axios";

import {
    PRODUCT_LIST_FAIL, 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS,

    PRODUCT_DETAILS_FAIL, 
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS,
} from "../constants/productConstants";





export const listProducts = ()=> async (dispatch)=> {

    dispatch( {type: PRODUCT_LIST_REQUEST, } );      //NOTE: no payload

    //fetch data from backend wrapped in try/catch
    try{
        const {data} = await Axios.get('/api/products');    //QUESTION: where did api/ come from?
        dispatch( {type: PRODUCT_LIST_SUCCESS, payload: data} );  //by dispatching action, we change the state of redux and based on that we can update the homescreen and show products
    } catch(error){
        dispatch( {type: PRODUCT_LIST_FAIL, payload: error.message} );
    }
};
//NOTES:
//HERE we implimented the listProducts action and its actions: PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL
//NEXT we need to create the product reducer to respond to the actions created here



//step 13  PRODUCT DETAILS:
//get product by its ID from backend and update redux store based on it
export const detailsProduct = (productId)=> async (dispatch)=> {
    dispatch( {type: PRODUCT_DETAILS_REQUEST, payload: productId} );

    try{
        const {data} = await Axios.get(`/api/products/${productId}`);
        dispatch( {type: PRODUCT_DETAILS_SUCCESS, payload: data } );
    }catch(error){
        dispatch( {type: PRODUCT_DETAILS_FAIL,  
            payload: 
                error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message,
        } );
    }
};