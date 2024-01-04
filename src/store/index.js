const savedUser = localStorage.getItem('user');

const initialState = {
  token: localStorage.getItem('token') || null,
  user: savedUser ? JSON.parse(savedUser) : { name: '', email: '', permissions: [] },
  isLogged: false,
};

const state = { ...initialState };

const mutations = {
  UPDATE_TOKEN(state, token) {
    state.token = token;
  },
  SET_USER(state, user) {
    state.user = user;
    state.isLogged = true;
    localStorage.setItem('user', JSON.stringify(user));
  },
  REMOVE_TOKEN(state) {
    state.token = null;
    localStorage.removeItem('user');
  },
};

const actions = {
  setToken({ commit }, payload) {
    localStorage.setItem('token', payload);
    commit('UPDATE_TOKEN', payload);
  },
  removeToken({ commit }) {
    localStorage.removeItem('token');
    commit('REMOVE_TOKEN');
  },
  setUser({ commit }, user) {
    const { name, email, permissions } = user;
    const userObject = {
      name: name || '',
      email: email || '',
      permissions: permissions || [],
    };
    commit('SET_USER', userObject);
  },
};

export default {
  state,
  mutations,
  actions,
};
