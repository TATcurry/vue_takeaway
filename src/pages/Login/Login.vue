<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">饿了没</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay = true">短信登录</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on: loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button  class="get_verification" :class="{right_phone: rightPhone}" :disabled="!rightPhone"
              @click.prevent="getCode()">{{currentTime == 30?"获取验证码":`已发送(${currentTime}s)`}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册饿了没帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-if="showPassword" v-model="pwd">
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
                <div class="switch_button" :class="showPassword? 'on': 'off'" @click="showPassword = !showPassword">
                  <div class="switch_circle" :class="{on: showPassword}" ></div>
                  <span class="switch_text">{{showPassword?"abc":"..."}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:3000/captcha" alt="captcha" @click="getCaptcha"
                ref="captche">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>

    <AlertTip :alertText="alertText" v-show="showAlertTip" @closeTip="closeTip"></AlertTip>
  </section>

</template>

<script>
    import AlertTip from "../../components/AlertTip/AlertTip"
    import {reqPwdLogin,reqSendCode,reqSmsLogin} from "../../api";

    export default {
      name: "Login",
      data(){
        return{
          loginWay: true,
          phone: "",
          currentTime: 30,
          showPassword: false,
          alertText: "",
          showAlertTip: false,
          //表单属性
          name: "",
          phone: "",
          pwd: "",
          code: "",
          captcha: ""

        }
      },
      components:{
          AlertTip
      },
      computed:{
        rightPhone(){
          if(/^1\d{10}$/.test(this.phone)){
            if(this.currentTime == 30)
            return true
            else{
              return false
            }
          }
          return false
        },

      },
      methods: {
        showTip(text) {
          this.alertText = text
          this.showAlertTip = true
        },
        closeTip() {
          this.alertText = ""
          this.showAlertTip = false;
        },
        async getCode() {
          if (this.currentTime == 30) {
            const interval = setInterval(() => {
              this.currentTime--;
              if (this.currentTime <= 0) {
                clearInterval(interval)
                this.currentTime = 30
              }
            }, 1000)

            const result = await reqSendCode(this.phone)
            if(result.code === 1){
              // 显示提示
              this.showTip(result.msg)
            }else{
              // 显示提示
              this.showTip("验证码发送成功")
            }
          }
        },
        getCaptcha(){
          //请求地址必须发生改变
          this.$refs.captche.src= "http://localhost:3000/captcha?time=" + new Date()
        },

        async login() {

          let result
          // 前台表单验证
          if (this.loginWay) {  // 短信登陆
            const {phone, code} = this
            if (!this.rightPhone) {
              // 手机号不正确
              this.showTip('手机号不正确')
              return
            } else if (!/^\d{6}$/.test(code)) {
              // 验证必须是6位数字
              this.showTip('验证码必须是6位数字')
              return
            }
            // 发送ajax请求短信登陆
             result = await reqSmsLogin(phone, code)


          } else {// 密码登陆
            const {name, pwd, captcha} = this
            if (!this.name) {
              // 用户名必须指定
              this.showTip('用户名必须指定')
              return
            } else if (!this.pwd) {
              // 密码必须指定
              this.showTip('密码必须指定')
              return
            } else if (!this.captcha) {
              // 验证码必须指定
              this.showTip('验证码必须指定')
              return
            }
            result = await reqPwdLogin({name,pwd,captcha})
          }

          if(result.code === 0){
            const user = result.data
            // 将user保存到vuex的state
            this.$store.dispatch('recordUser', user)
            // 去个人中心界面
            this.$router.replace('/profile')
          }else{
            this.showTip(result.msg)
            this.getCaptcha()
          }
        }

      }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                  color blue
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.on
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
