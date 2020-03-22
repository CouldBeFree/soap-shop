export const state = () => ({
  error: '',
  products: [
    /*{
      id: 1,
      image: 'https://placeimg.com/300/300/tech',
      category: 'baby-soap',
      name: 'Baby soap',
      price: 44,
      slug: 'souvenir/baby-soap'
    },
    {
      id: 2,
      image: 'https://placeimg.com/300/300/tech',
      category: 'man',
      name: 'Man soap',
      price: 100,
      slug: 'souvenir/man'
    },
    {
      id: 3,
      image: 'https://placeimg.com/300/300/tech',
      category: 'woman',
      name: 'Woman soap',
      price: 66,
      slug: 'souvenir/woman'
    },
    {
      id: 4,
      image: 'https://placeimg.com/300/300/tech',
      category: 'bouquets',
      name: 'Soap bouquet',
      price: 136,
      slug: 'bouquets'
    },
    {
      id: 5,
      image: 'https://placeimg.com/300/300/tech',
      category: 'baby-soap',
      name: 'Baby soap',
      price: 76,
      slug: 'souvenir/baby-soap'
    },
    {
      id: 6,
      image: 'https://placeimg.com/300/300/tech',
      category: 'kits',
      name: 'Kits',
      price: 200,
      slug: 'kits'
    },
    {
      id: 7,
      image: 'https://placeimg.com/300/300/tech',
      category: 'kits',
      name: 'Kits',
      price: 220,
      slug: 'kits'
    },
    {
      id: 8,
      image: 'https://placeimg.com/300/300/tech',
      category: 'bouquets',
      name: 'Bouquet soap',
      price: 300,
      slug: 'bouquets'
    }*/
  ],
  product: {}
});

export const mutations = {
  setError(state, error) {
    state.error = error
  },
  setProducts(state, products) {
    state.products = products
  },
  setProduct(state, product) {
    state.product = product
  }
};

export const actions = {
  async getProducts({ commit }) {
    try {
      commit('setError', '');
      const { data } = await this.$axios.get('/product');
      commit('setProducts', data.data);
    } catch ({ message }) {
      commit('setError', message);
    }
  },
  async getProduct({ commit }, id) {
    try {
      commit('setError', '');
      const { data } = await this.$axios.get(`/product/${id}`);
      commit('setProduct', data.data);
    } catch({ message }) {
      commit('setError', message);
    }
  }
};

export const getters = {

};
