import { LOGIN, LOGOUT } from "./mutations-types";
import { vm } from "../main";

export default {
  [LOGIN](state, user) {
    vm.$set(state, "user", user)
  },
  [LOGOUT](state) {
    state.user = null
  }
}
