import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    playingSong: {},
    playingList:null,
    playingIndex:0,
    history:[],
    historyIndex:-1
    // user:{}
  },
  modules: {},
  mutations,
  actions,
  getters
})
