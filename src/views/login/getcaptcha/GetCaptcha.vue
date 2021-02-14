<template>
  <div class = "my-login-page">
    <section class = "h-100">
      <div class = "container h-100">
        <div class = "row justify-content-md-center align-items-center h-100">
          <div class = "card-wrapper">
            <div class = "brand">
              <img src = "../../../assets/img/user/login/music_white.svg" alt = "logo" class = "logo">

            </div>
            <div class = "card fat">
              <div class = "card-body">
                <h4 class = "card-title">获取验证码</h4>
                <form method = "POST" class = "my-login-validation" novalidate = "">
                  <div class = "form-group">
                    <label for = "phone">请输入手机号</label>
                    <input id = "phone" type = "phone" class = "form-control" name = "phone" v-model = "phone" required
                           autofocus>
                    <div class = "invalid-feedback" ref = "invalidFeedback">
                      {{point}}
                    </div>
                    <div class = "form-text text-muted">
                      即将给您发送一条验证码，请注意查收！
                    </div>
                  </div>

                  <div class = "form-group m-0">
                    <button @click.prevent = "toRegister" class = "btn btn-primary btn-block">
                      发送验证码
                    </button>
                  </div>
                  <div class = "mt-4 text-center">
                    已经拥有网易云账户? <a href = "#" @click.prevent = "back">点我登录</a>
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
  import { checkPhone, sendCaptcha } from "../../../network/user";

  export default {
    name: "GetCaptcha",
    data() {
      return {
        phone: "",
        point: "",
        type: "register"
      }
    },
    created() {
      this.type = this.$route.query.type
    },
    activated() {
      this.$bus.$emit("tabBarHidden")
    },
    deactivated() {
      this.$bus.$emit("tabBarShow")
    },
    methods: {
      back() {
        this.$router.push("/user")
      },
      showPoint() {
        this.$refs.invalidFeedback.style.display = "block"
      },
      hiddenPoint() {
        this.$refs.invalidFeedback.style.display = "none"
      },
      toRegister() {
        this.hiddenPoint()
        if (this.phone.length !== 11) {
          this.point = "无效的手机号"
          this.showPoint()
          return false
        } else {
          // 检测用户是否已存在
          // 异步的，所以需要一次判断完
          checkPhone(this.phone).then(res => {
            // 要注册但账户存在
            if (this.type === "register" && res.data.exist !== -1) {
              this.point = "账号已存在";
              this.showPoint()
              // return
            } else if (this.type === "forget" && res.data.exist !== 1) {
              // 要改密码但账户不存在
              this.point = "账户不存在";
              this.showPoint();
              // return
            } else {
              this.sendCaptcha()
            }
          })
        }
      },
      sendCaptcha() {
        // 发送验证码（先确认是不是有效的手机号再转页面）
        sendCaptcha(this.phone).then(res => {
          if (res && res.data && res.data.code === 200) {
            this.$toast.show("验证码发送成功");
            setTimeout(() => {
              this.$router.push({
                path: "register",
                query: {
                  phone: this.phone,
                  type: this.type
                }
              })
            }, 1000)
          } else {
            // 请求成功，但网易云不给发验证码了
            this.point = "不要频繁发送，每个手机每天只能发送5次";
            this.showPoint()
          }
        }).catch(res => {
          // 请求错误返回码，只有网易云《请求发送失败错误》才会返回
          this.point = "未知错误！请求发送失败！";
          this.showPoint()
        })
      }
    }
  }
</script>

<style scoped>
  @import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
  @import "../css/my-login.css";

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
