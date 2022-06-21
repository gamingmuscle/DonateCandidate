import api from "./api"
//API Action types
export const ACTION_TYPES = {
    CREATE : "CREATE",
    UPDATE:"UPDATE",
    DELETE:"DELETE",
    FETCH_ALL:"FETCH_ALL",
    FETCH:"FETCH"
}
//  formatData
//  helper function makes sure data is formatted properly
const formatData= data=>({
    ...data,
    age:parseInt(data.age?data.age:0)//unsuse age is an integer
})
//get all api request
export const fetchall = () =>  dispatch =>
{
    console.log("In fetch all")
    api.dCandidate().fetchAll()
    .then(
        response => {
            dispatch({ type:ACTION_TYPES.FETCH_ALL,payload:response.data});
        }
    )
    .catch( err => console.log(err));
    
}
////get api request
export const fetch = (id, onSuccess) => dispatch =>{
    console.log("In fetch")
    api.dCandidate().fetchById(id)
    .then(
        response=> {
            console.log(response.data)
            dispatch({type:ACTION_TYPES.FETCH,payload:response.data});
            onSuccess()
        }
    )
    .catch(err => console.log(err))
} 
export const create = (data, onSuccesss)=> dispatch =>{
    data=formatData(data)
    
    api.dCandidate().create(data)
    .then(res=>{
        dispatch({type:ACTION_TYPES.CREATE,payload:res.data})
        onSuccesss()
    })
    .catch(err => console.log(err))
}
export const update = (id,data, onSuccesss)=> dispatch =>{
    data=formatData(data)
    api.dCandidate().update(id,data)
    .then(res=>{
        dispatch({type:ACTION_TYPES.UPDATE,payload:{id, ...data}})
        onSuccesss()
    })
    .catch(err => console.log(err))
}

export const Delete = (id, onSuccesss)=> dispatch =>{
    api.dCandidate().delete(id)
    .then(res=>{
        dispatch({type:ACTION_TYPES.DELETE,payload:id})
        onSuccesss()
    })
    .catch(err => console.log(err))
}