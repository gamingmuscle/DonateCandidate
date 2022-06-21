import {ACTION_TYPES} from "../actions/DCandidate";

const initialState = {
    data:[]
}
export const dCandidate = (state=initialState,action) => {
    switch (action.type)
    {
        case ACTION_TYPES.FETCH_ALL:
            var obj = {
                ...state,
                data:[...action.payload]
            };
            console.log(obj)
            return obj;
        case ACTION_TYPES.FETCH:
            return {
                ...state,
                data:[action.payload]
            };
        case ACTION_TYPES.CREATE:
                var obj= {
                    ...state,
                    data:[...state.data,action.payload]
                };
                console.log(obj)
                return obj;
        case ACTION_TYPES.UPDATE:
            return  {
                ...state,
                data:state.data.map(x=>x.id == action.payload.id ? action.payload: x)
            };
        case ACTION_TYPES.DELETE:
            return  {
                ...state,
                data: state.data.filter(x => x.id != action.payload)
            };
        default: return state;
    }
}