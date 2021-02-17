import { ADDHISTORY, CLEARHISTORY, LOGIN, LOGOUT, POPHISTORY, SETINDEX, SETLIST, SETSONG } from "./mutations-types";
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
  [ADDHISTORY](state,song){
    state.history.push(song);
    state.historyIndex+=1
  },
  [POPHISTORY](state,song){
    state.history.pop(song);
    state.historyIndex-=1
  },
  [CLEARHISTORY](state){
    state.history=[];
    state.historyIndex=-1
  },
  [SETLIST](state,list){
    state.playingList=list
  },
  [SETINDEX](state,index){
    state.playingIndex=index
  }
}
