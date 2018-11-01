<template>
  <div class="phoneRegister">
    <ul class="peRestList">
      <li>
        <i class="comFamily icon-shouji"></i>
        <input type="text" class="phoneText comLeftInput" id="phoneText" v-model="loginPhone" placeholder="请输入您的手机号码"/>
        <p class="loginTips" v-if="phoneHide">请输入手机号码</p>
      </li>
      <li>
        <i class="comFamily icon-tuxingyanzhengma"></i>
        <input type="text" class="imgInputCode comLeftInput" id="imgInputCode" v-model="imgInputCode" maxlength="4" placeholder="请输入图形验证码"/>
        <img src="../../assets/logo.png" class="imgVecode"/>
        <p class="loginTips" v-if="imgHide">请输入正确的图形验证码</p>
      </li>
      <li>
        <i class="comFamily icon-yanzhengma"></i>
        <input type="text" class="mesInputCode comLeftInput" id="mesInputCode" v-model="mesIptCode" maxlength="6" placeholder="请输入动态密码"/>
        <span v-if="show" @click="getCode" class="logonCount">免费获取验证码</span>
        <span v-if="!show" class="logonCount">{{count}} s</span>
        <p class="loginTips" v-if="codeHide">请输入正确的验证码</p>
      </li>
      <li class="pheBtn">
        <input type="button" value="登录" class="regBtn comLoginBtn" @click="signBtn()"/>
      </li>
    </ul>
    <div class="otherLogin">
      <strong @click="otherLogin">其它登录方式</strong>
      <a href="javascript:;" class="icon-QQ"></a>
      <a href="javascript:;" class="icon-weixin"></a>
      <a href="javascript:;" class="icon-weibo"></a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'phoneRegister',
  data () {
    return {
      show: true,
      phoneHide: false,
      imgHide: false,
      codeHide: false,
      count: '',
      timer: null,
      loginPhone: this.loginPhone,
      imgCode: '1111',
      imgInputCode: this.imgInputCode,
      mesCode: '6666',
      mesIptCode: this.mesIptCode
    }
  },
  methods: {
    getCode () {
      const TIME_COUNT = 60
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (this.loginPhone === '') {
        this.phoneHide = true
        document.getElementById('phoneText').classList.add('lnProTips')
      } else if (!reg.test(this.loginPhone)) {
        this.phoneHide = true
        document.getElementById('phoneText').classList.add('lnProTips')
      } else {
        this.phoneHide = false
        document.getElementById('phoneText').classList.remove('lnProTips')
        if (this.imgInputCode !== this.imgCode) {
          this.imgHide = true
          document.getElementById('imgInputCode').classList.add('lnProTips')
        } else if (this.imgInputCode === this.imgCode) {
          this.imgHide = false
          document.getElementById('imgInputCode').classList.remove('lnProTips')
          if (!this.timer) {
            this.count = TIME_COUNT
            this.show = false
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--
              } else {
                this.show = true
                clearInterval(this.timer)
                this.timer = null
              }
            }, 1000)
          }
        }
      }
    },
    signBtn () {
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (this.loginPhone === '') {
        this.phoneHide = true
        document.getElementById('phoneText').classList.add('lnProTips')
      } else if (!reg.test(this.loginPhone)) {
        this.phoneHide = true
        document.getElementById('phoneText').classList.add('lnProTips')
      } else {
        this.phoneHide = false
        document.getElementById('phoneText').classList.remove('lnProTips')
        if (this.imgInputCode !== this.imgCode) {
          this.imgHide = true
          document.getElementById('imgInputCode').classList.add('lnProTips')
        } else if (this.imgInputCode === this.imgCode) {
          this.imgHide = false
          document.getElementById('imgInputCode').classList.remove('lnProTips')
          if (this.mesIptCode !== this.mesCode) {
            this.codeHide = true
            document.getElementById('mesInputCode').classList.add('lnProTips')
          } else if (this.mesIptCode === this.mesCode) {
            this.codeHide = false
            document.getElementById('mesInputCode').classList.remove('lnProTips')
          }
        }
      }
    },
    otherLogin () {
      this.$emit('otherLo', false)
    }
  }
}
</script>

<style>
  @import "login.css";
</style>
