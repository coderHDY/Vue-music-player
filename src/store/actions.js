import { logout } from "../network/user";
import { LOGOUT } from "./mutations-types";

export default {
 storeLogout(context){
    logout().then(()=>{
      context.commit(LOGOUT)
    })
 }
}
