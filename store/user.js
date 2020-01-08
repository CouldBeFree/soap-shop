export const state = () => ({
  user: {},
  cart: []
});

export const mutations = {
  setProducts(state, products) {
    state.cart = products;
  }
};

export const actions = {

};

export const getters = {

};
