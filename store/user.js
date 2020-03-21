export const state = () => ({
  user: {},
  error: '',
  token: '',
  cart: []
});

export const mutations = {
  setProducts(state, products) {
    state.cart = products;
  },
  setUser(state, user) {
    state.user = user;
  },
  setError(state, error) {
    state.error = error
  },
  setToken(state, token) {
    state.token = token
  }
};

export const actions = {
  async registerUser({state, commit}, payload){
      commit('setError', '');
      commit('setUser', {});
      try {
        const { data } = await this.$axios.post('auth/register', payload);
        if(data.success){
          commit('setUser', data.user);
          commit('setToken', data.token);
        } else {
          commit('setError', data.error);
        }
      }
      catch (e) {
        commit('setError', e.message);
      }
  }
};

export const getters = {

};
