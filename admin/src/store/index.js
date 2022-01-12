import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: null
  },
  mutations: {
    saveToken: (state, data) => {
      localStorage.setItem("elementToken", "Bearer " + data);
      state.token = data;
    },
    removeToken: (state) => {
      localStorage.removeItem("elementToken")
      state.token = null
    }
  },
  getter() {
    if(localStorage.getItem("elementToken")) {
      state.token = localStorage.getItem("elementToken")
    }
  }
})

export default store;
