import { LOGIN, LOGOUT, SETINDEX, SETLIST, SETSONG } from "./mutations-types";
import { vm } from "../main";

export default {
  [LOGIN](state, user) {
    vm.$set(state, "user", user)
  },
  [LOGOUT](state) {
    state.user = null
  },
  [SETSONG](state,song){
    state.playingSong=song
  },
  [SETLIST](state,list){
    state.playingList=list
  },
  [SETINDEX](state,index){
    state.playingIndex=index
  }
}
