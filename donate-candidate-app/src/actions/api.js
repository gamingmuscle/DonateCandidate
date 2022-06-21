import axios from "axios";

const apiBaseUrl ="https://localhost:7085/api/";

export default {
    dCandidate(url = apiBaseUrl + 'dcandidate/'){
        let obj = {
            fetchAll:() => axios.get(url), 
            fetchById: id => axios.get(url+id),
            create: newRecord => axios.post(url,newRecord),
            update: (id,obj) => axios.put(url+id,obj),
            delete: id => axios.delete(url+id)
        }
        
        return obj
    }
}