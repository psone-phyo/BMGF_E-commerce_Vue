// src/store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    cart: []
  },
  mutations: {
    addToCart(state, product) {
      const existingProduct = state.cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.count += product.count;
      } else {
        state.cart.push(product);
      }
    }
  },
  actions: {
    addProductToCart({ commit }, product) {
      commit('addToCart', product);
    }
  },
  getters: {
    getCart(state) {
      return state.cart;
    }
  }
});
