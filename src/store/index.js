import Vue from 'vue'
import Vuex from 'vuex'
import {data} from '../dataAccess/Data'
import { GET_ITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    items: [],
    selectItems: [],
  },
  mutations: {
    [GET_ITEMS](state, items) {
      const newItems = [].concat(items);
      state.items = newItems;

      //handle updating select dropdown values 
      if (!state.selectItems.length) {
        state.selectItems = [...new Set(state.items.map(x => x.Name))];
      }
    },
    [UPDATE_ITEM](state, item) {
      const index = state.items.findIndex(i => i.Id === item.Id);
      const oldItem = state.items[index];
      state.items.splice(index, 1, item);

      //handle updating select dropdown values 
      if (!state.items.find(i => i.Name === oldItem.Name)) {
        state.selectItems = [...state.selectItems.filter(i => i !== oldItem.Name)];
      }
      if (!state.selectItems.find(i => i.Name === item.Name)) {
        state.selectItems.unshift(item.Name);
      }
    },
    [ADD_ITEM](state, item) {
      state.items.unshift(item);
      
      //handle updating select dropdown values 
      if (!state.selectItems.find(i => i.Name === item.Name)) {
        state.selectItems.unshift(item.Name);
      }
    },
    [DELETE_ITEM](state, itemId) {
      const index = state.items.findIndex(i => i.Id === itemId);
      const oldItem = state.items[index];
      state.items = [...state.items.filter(i => i.Id !== itemId)];
      
      //handle updating select dropdown values 
      if (!state.items.find(i => i.Name === oldItem.Name)) {
        state.selectItems = [...state.selectItems.filter(i => i !== oldItem.Name)];
      }
    },
    createEmptyItem (state) {
      state.items.unshift({ Id: 0, ExternalId: '', Name: '', Cost: 0});
    },
    removeEmptyItem (state) {
      state.items = [...state.items.filter(i => i.Id !== 0)];
    },
  },
  actions: {
    async getItemsAction({ commit }, { nameFilter, maxFilter } = {nameFilter: '', maxFilter: false}) {
      const items = await data.getItems(nameFilter, maxFilter);
      commit(GET_ITEMS, items);
    },
    async updateItemAction({ commit }, item) {
      const updatedItem = await data.updateItem(item);
      commit(UPDATE_ITEM, updatedItem);
    },
    async addItemAction({ commit }, item) {
      const addedItem = await data.addItem(item);
      commit(ADD_ITEM, addedItem);
    },
    async deleteItemAction({ commit }, id) {
      await data.deleteItem(id);
      commit(DELETE_ITEM, id);
    },
  },
  getters: {
    getItemById: state => id => state.items.find(i => i.Id === id),
    getItemByExternalId: state => externalId => state.items.find(i => i.ExternalId === externalId),
    getDistinctItemNames: state => [...new Set(state.items.map(x => x.Name))],
  },
  modules: {
  }
})

