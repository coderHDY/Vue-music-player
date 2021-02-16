<template>
  <div class = "user-message-box">
    <div class = "img-box">
      <img :src = "user&&user.img" class = "img">
    </div>
    <div class = "info-box">
      <h4 class = "user-name">{{user&&user.name}}</h4>
      <table class = "user-info">
        <tr>
          <td>生日：</td>
          <td>{{user&&user.birth | formDate}}</td>
        </tr>
        <tr>
          <td>创建时间:</td>
          <td>{{user&&user.createTime | formDate}}</td>
        </tr>
        <tr>
          <td>村龄：</td>
          <td>{{user&&user.createDays}}</td>
        </tr>
        <!--        <span class = "birth"></span>-->
        <!--        <span class = "create-time"></span>-->
        <!--        <span class = "create-days"></span>-->
      </table>
      <button @click = "logout" class = "logout">退出登录</button>
    </div>
    <div class = "listen-songs">累计听歌：{{user&&user.listenSongs}}</div>

  </div>
</template>

<script>
  import { formatDate } from "../../../components/common/utils/utils";

  export default {
    name: "UserInfoMessage",
    props: {
      user: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      logout() {
        this.$store.dispatch("storeLogout");
        this.$router.replace("/login")
      }
    },
    filters: {
      formDate(date) {
        return formatDate(date, "yyyy-MM-dd")
      }
    }
  }
</script>

<style scoped>
  .user-message-box {
    position: relative;
    margin: 0 10px 30px 10px;
    transform: translate(0, -10%);
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
  }

  .img-box {
    position: relative;
    text-align: center;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .img {
    border-radius: 50%;
    border: #fff solid 2px;
  }

  .info-box {
    position: relative;
    text-align: center;
    margin-top: -50px;
  }

  .user-name {
    display: block;
  }

  .user-info {
    text-align: left;
    display: block;
  }

  .info-box td {
    position: relative;
    padding-left: 20px;
  }

  .listen-songs {
    position: absolute;
    display: block;
    left: 50%;
    transform: translate(-50%, 5%);
    height: 60px;
    line-height: 56px;
    padding: 0 20px;
    background-color: #ff0903;
    border: #c5c5c5 3px solid;
    border-radius: 30px;
    color: #fff;
    font-size: var(--font-big);
  }

  .logout {
    background-color: #f2f2f2;
    color: var(--color-red);
    border: #abacff 2px solid;
    height: 30px;
    line-height: 26px;
    padding: 0 10px;
    border-radius: 15px;
  }
</style>
