import * as axios from 'axios';
import { API } from '../.config.js';


const getItems = async function() {
    const response = await axios.get(`${API}Item`);
    if (response.status !== 200) throw Error(response.message);
    return response.data;
};

const updateItem = async function(item) {
    const config = {
        method: 'put',
        url: `${API}Item/${item.Id}`,
        headers: { 
          'Content-Type': 'application/json',
        },
        data : JSON.stringify(item),
    };

    const response = await axios(config);

    if (response.status !== 200) throw Error(response.message);
    return response.data;
};

export const data = {
    getItems,
    updateItem,
  };
