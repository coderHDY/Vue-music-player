<template>
  <div class = "my-login-page">
    <section class = "h-100">
      <div class = "container h-100">
        <div class = "row justify-content-md-center h-100">
          <div class = "card-wrapper">
            <div class = "brand">
              <img src = "../../../assets/img/user/login/music_white.svg" alt = "logo" class = "logo">
            </div>
            <div class = "card fat">
              <div class = "card-body">
                <h5 class = "card-title">
                  <TabControl :items = "point" @tabClick = "tabClick"/>
                </h5>
                <form method = "POST" class = "my-login-validation">
                  <div class = "form-group">
                    <label :for = "type[current_index]">{{admin[current_index]}}</label>
                    <input :id = "type[current_index]" :type = "type[current_index]" v-model = "account"
                           class = "form-control"
                           :name = "type[current_index]"
                           required
                           autofocus :key = "type[current_index]">
                    <div class = "invalid-feedback" ref = "accountPoint">
                      {{this.admin[current_index]}}无效
                    </div>
                  </div>

                  <div class = "form-group">
                    <label for = "password">密码
                      <router-link to = "/getcaptcha?type=forget" class = "float-right">
                        忘记密码?
                      </router-link>
                    </label>
                    <input id = "password" v-model = "password" type = "password" class = "form-control"
                           name = "password" required data-eye>
                    <div class = "invalid-feedback" ref = "passwordPoint">
                      密码错误
                    </div>
                  </div>

                  <div class = "form-group">
                    <div class = "custom-checkbox custom-control">
                      <input type = "checkbox" v-model = "rememberMe" name = "remember" id = "remember"
                             class = "custom-control-input">
                      <label for = "remember" class = "custom-control-label">记住密码</label>
                    </div>
                  </div>

                  <div class = "form-group m-0">
                    <button @click.prevent = "login" class = "btn btn-primary btn-block">
                      登录
                    </button>
                  </div>

                  <div class = "mt-4 text-center">
                    没有账号?
                    <router-link to = "/getcaptcha?type=register">点我创建</router-link>
                  </div>
                </form>
              </div>
            </div>
            <div class = "footer">
              Copyright &copy; 2021 &mdash; coderHdy
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  // 外部模块
  import TabControl from "../../../components/common/tabcontrol/TabControl";
  import { infoUser } from "../../../network/types";
  import { LOGIN } from "../../../store/mutations-types";
  // 网络模块
  import { emailLogIn, phoneLogIn } from "../../../network/user";

  export default {
    name: "LoginPage",
    components: {
      TabControl
    },
    data() {
      return {
        point: [ "手机登录", "邮箱登录" ],
        type: [ "phone", "email" ],
        admin: [ "手机号码", "邮箱地址" ],
        current_index: 0,
        account: "",
        password: "",
        rememberMe: true
      }
    },
    activated() {
      this.$bus.$emit("tabBarHidden")
    },
    deactivated() {
      this.$bus.$emit("tabBarShow")
    },
    methods: {
      tabClick(index) {
        this.current_index = index
      },
      login() {
        if (this.current_index === 0) {
          // 手机登录
          phoneLogIn(this.account, this.password).then(res => {
            console.log(res);
            if (res.data && res.data.code === 502) {
              this.$refs.passwordPoint.style.display = "block"
            } else if (res.data && res.data.code === 200) {
              this.$store.commit(LOGIN, infoUser(res));
              this.$router.replace("/home")
            } else if (res && res.toString().indexOf("400") !== -1 || res && res.toString().indexOf("501") !== -1) {
              this.$toast.show("账号不存在！");
            } else {
              this.$toast.show("账号或密码错误，请检查！");
            }
          }).catch(err => {
            console.log(err);
            this.$toast.show("输入错误！");
          })
        } else {
          // 邮箱登录
          emailLogIn(this.account, this.password).then(res => {
            if (res.data.code === 502) {
              this.$refs.passwordPoint.style.display = "block"
            } else if (res.data.code === 200) {
              this.$store.commit(LOGIN, infoUser(res));
            } else {
              this.$toast.show("账号或密码错误，请检查！");
            }
          }).catch(res => {
            this.$toast.show("输入错误！");
          })
        }
        return false
      }
    }
  }
</script>
<style scoped>
  @import "../css/my-login.css";
  @import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

  .brand {
    background-color: var(--color-red);
  }

  .logo {
    position: relative;
    height: 60px;
    width: 60px;
    top: 15px;
  }
</style>
