import * as axios from 'axios';
import { API } from '../.config.js';


const getItems = async function(nameFilter, onlyMax) {
    let query = `${API}Item`;
    if (nameFilter) query = query + `/${nameFilter}`;
    if (onlyMax) query = query + `?OnlyMax=true`;
    const response = await axios.get(query)
                                    .catch(function(error) {
                                        throw Error(error.response.data.Message);
                                    });  
    return response.data;
};

const updateItem = async function(item) {
    const content = {
        method: 'put',
        url: `${API}Item/${item.Id}`,
        headers: { 
          'Content-Type': 'application/json',
        },
        data : JSON.stringify(item),
    };
    
    const response = await axios(content)
                            .catch(function(error) {
                                throw Error(error.response.data.Message);
                            });  
    return response.data;
};

const deleteItem = async function(id) {
    const response = await axios.delete(`${API}Item/${id}`)
                                    .catch(function(error) {
                                        throw Error(error.response.data.Message);
                                    });
    return response.data;
};

const addItem = async function(item) {
    const config = {
        method: 'post',
        url: `${API}Item`,
        headers: { 
          'Content-Type': 'application/json',
        },
        data : JSON.stringify({ExternalId:item.ExternalId, Name:item.Name, Cost:item.Cost}),
    };
    const response = await axios(config)
                            .catch(function(error) {
                                throw Error(error.response.data.Message);
                            });     
    return response.data;
};

export const data = {
    getItems,
    updateItem,
    deleteItem,
    addItem,
  };
