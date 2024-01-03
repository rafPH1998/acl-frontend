const state = {
  token: localStorage.getItem('token') || null,
  user: '',
  isLogged: false,
}

const mutations = {
  UPDATE_TOKEN(state, token) {
    state.token = token;
  },
  SET_USER(state, user) {
    state.user = user;
    state.isLogged = true;
  },
  REMOVE_TOKEN(state) {
    state.token = null;
  },
}

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
    commit('SET_USER', user);
  },
}

export default {
  state,
  mutations,
  actions
}
