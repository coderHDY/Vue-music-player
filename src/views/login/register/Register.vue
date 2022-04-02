<template>
  <Scroll class="scroll">
    <div class="my-login-page">
      <section class="h-100">
        <div class="container h-100">
          <div class="row justify-content-md-center h-100">
            <div class="card-wrapper">
              <div class="brand">
                <img
                  src="../../../assets/img/user/login/music_white.svg"
                  alt="logo"
                  class="logo"
                />
              </div>
              <div class="card fat">
                <div class="card-body">
                  <h4 class="card-title">{{ showPoint }}</h4>
                  <form method="POST" class="my-login-validation" novalidate="">
                    <div class="form-group">
                      <input
                        style="display:none"
                      /><!-- for disable autocomplete on chrome -->
                      <input
                        style="display:none"
                      /><!-- for disable autocomplete on chrome -->
                      <label for="captcha">验证码</label>
                      <input
                        id="captcha"
                        class="form-control"
                        autocomplete="off"
                        required
                        v-model="captcha"
                      />
                      <div class="invalid-feedback" ref="captchaPoint">
                        验证码错误！
                      </div>
                    </div>
                    <div class="form-group" v-show="isRegister">
                      <label for="name">昵称</label>
                      <input
                        v-model="nickname"
                        id="name"
                        type="text"
                        class="form-control"
                        required
                        autofocus
                      />
                      <div class="invalid-feedback" ref="nicknamePoint">
                        昵称已被占用或不符合规范！
                      </div>
                    </div>

                    <div class="form-group">
                      <label for="password">密码</label>
                      <input
                        v-model="password"
                        id="password"
                        type="password"
                        class="form-control"
                        required
                        data-eye
                      />
                      <div class="invalid-feedback" ref="passwordPoint">
                        密码长度不得小于六位，不能含特殊字符！
                      </div>
                    </div>

                    <div class="form-group">
                      <div class="custom-checkbox custom-control">
                        <input
                          type="checkbox"
                          v-model="isAgree"
                          id="agree"
                          class="custom-control-input"
                          required="required"
                        />
                        <label for="agree" class="custom-control-label"
                          >我同意
                          <a
                            href="https://st.music.163.com/official-terms/service"
                            >《服务条款》</a
                          ></label
                        >
                        <div class="invalid-feedback" ref="agreePoint">
                          请同意协议！
                        </div>
                      </div>
                    </div>

                    <div class="form-group m-0">
                      <button
                        @click.prevent="submit"
                        class="btn btn-primary btn-block"
                      >
                        {{ showPoint }}
                      </button>
                    </div>
                    <div class="mt-4 text-center">
                      已经拥有网易云账户?
                      <a href="#" @click.prevent="back">点我登录</a>
                    </div>
                  </form>
                </div>
              </div>
              <div class="footer">
                Copyright &copy; 2021 &mdash; coderHdy
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </Scroll>
</template>

<script>
import Scroll from "../../../components/common/scroll/Scroll";
import { register } from "../../../network/user";

export default {
  name: "Register",
  data() {
    return {
      phone: "",
      type: "",
      captcha: "",
      nickname: "",
      password: "",
      isAgree: false
    };
  },
  methods: {
    back() {
      this.$router.push("/login");
    },
    hiddenPoint() {
      this.$refs.captchaPoint.style.display = "none";
      this.$refs.nicknamePoint.style.display = "none";
      this.$refs.passwordPoint.style.display = "none";
      this.$refs.agreePoint.style.display = "none";
    },
    submit() {
      this.hiddenPoint();
      switch (this.type) {
        case "register":
          this.goRegister();
          break;
        case "forget":
          this.goForget();
          break;
      }
    },
    goForget() {
      if (!this.captcha) {
        this.$refs.captchaPoint.style.display = "block";
      } else if (!this.password || this.password.length < 6) {
        this.$refs.passwordPoint.style.display = "block";
      } else if (!this.isAgree) {
        this.$refs.agreePoint.style.display = "block";
      } else {
        register({
          account: this.phone,
          password: this.password,
          captcha: this.captcha
        })
          .then(res => {
            // console.log(res);
            if (res.data && res.data.code === 200) {
              this.$toast.show("修改密码成功", 1500);
              // console.log("修改密码成功");
              setTimeout(() => {
                this.$router.replace("/user");
              }, 1500);
            } else if (res.toString().indexOf("503") !== -1) {
              this.$toast.show("验证码错误", 1500);
            } else {
              this.$toast.show("修改密码失败", 1500);
            }
          })
          .catch(err => {
            this.$toast.show("修改密码失败", 1500);
          });
      }
    },
    goRegister() {
      if (!this.captcha) {
        this.$refs.captchaPoint.style.display = "block";
      } else if (!this.password || this.password.length < 6) {
        this.$refs.passwordPoint.style.display = "block";
      } else if (!this.nickname) {
        this.$refs.nicknamePoint.style.display = "block";
      } else if (!this.isAgree) {
        this.$refs.agreePoint.style.display = "block";
      } else {
        register({
          account: this.phone,
          password: this.password,
          captcha: this.captcha,
          nickname: this.nickname
        })
          .then(res => {
            console.log(res);
            if (res.data && res.data.code === 200) {
              this.$toast.show("注册成功", 1500);
              setTimeout(() => {
                this.$router.replace("/user");
              }, 1500);
            } else if (res.toString().indexOf("503") !== -1) {
              this.$toast.show("验证码错误", 1500);
            } else if (res.toString().indexOf("505") !== -1) {
              this.$refs.nicknamePoint.style.display = "block";
            } else {
              this.$toast.show("注册失败", 1500);
            }
          })
          .catch(err => {
            console.log(err);
            this.$toast.show("注册失败", 1500);
          });
      }
      // register({nickname, account, password,captcha})
    }
  },
  components: {
    Scroll
  },
  computed: {
    isRegister() {
      return this.type === "register";
    },
    showPoint() {
      return this.isRegister ? "注册新账号" : "修改密码";
    }
  },
  activated() {
    this.$bus.$emit("tabBarHidden");
    this.phone = this.$route.query.phone;
    this.type = this.$route.query.type;
  },
  deactivated() {
    this.$bus.$emit("tabBarShow");
  }
};
</script>

<style scoped>
@import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
@import "../css/my-login.css";

.scroll {
  height: calc(100vh - 60px);
}

.card-title {
  text-align: center;
}

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
