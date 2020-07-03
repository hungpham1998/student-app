import * as Types from '../../config/actionTypes';
import callApi from '../../config/utils/apiCaller';



export const actFetchLearnclassRequest = () => {
    return dispatch => {
        return callApi(`learnclass`, 'GET', null).then(res => {
            console.log(res.data.learnclass.rows)
            dispatch(actFetchlearnclass(res.data.learnclass.rows));
        });
    };
}

export const actFetchlearnclass =  (learnclass) => {
    return {
        type : Types.FETCH_LEARNCLASS,
        learnclass
    }
}
