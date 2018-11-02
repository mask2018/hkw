<template>
  <div class="login">
    <div class="loginCen">
      <p class="loginClose"><span class="icon-dacha" @click="logCloseBtn()"></span></p>
      <h3 class="loginLogo"><i class="icon-logo"></i></h3>
      <div class="loginList" v-if="loginDiv">
        <p class="loginTip"><span>登录立即学习</span></p>
        <ul class="clearfix">
          <li>
            <a href="javascript:;"  @click="linkAll(3)">
              <i class="icon-QQ"></i>
              <span>QQ登录</span>
            </a>
          </li>
          <li>
            <a href="https://huke88.com/auth/callback?authclient=qq&loginSuccessRedirectUri=https%3A%2F%2Fhuke88.com%2F" target="_blank">
              <i class="icon-weixin"></i>
              <span>微信登录</span>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <i class="icon-weibo"></i>
              <span>微博登录</span>
            </a>
          </li>
          <li @click="phoneLogin">
            <a href="javascript:;">
              <i class="icon-shouji"></i>
              <span>手机登录</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="loginPhone" v-if="lgPhoneDiv">
        <ul class="loginTab clearfix">
          <li v-for='(data,key,index) in tabs' @click="tabChange(data.tab, index)" v-bind:class='{on:index==styl}' :key='data.id'> {{ data.item }} </li>
        </ul>
        <div class="loginCont">
          <div :is="curView" @otherLo="otherLo"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PhoneLogin from '@/components/login/PhoneLogin'
import PhoneRegister from '@/components/login/PhoneRegister'
var ipcRenderer = require('electron').ipcRenderer
export default {
  name: 'login',
  data () {
    return {
      loginDiv: true,
      lgPhoneDiv: false,
      tabs: {
        item: {
          item: '手机短信登录',
          tab: 'PhoneLogin'
        },
        item1: {
          item: '手机号注册',
          tab: 'PhoneRegister'
        }
      },
      styl: '0',
      curView: 'PhoneLogin'
    }
  },
  created: function () {
    this.$emit('comHead', false)
  },
  components: {
    PhoneLogin,
    PhoneRegister
  },
  methods: {
    tabChange (tabItem, num) {
      this.styl = num
      this.curView = tabItem
    },
    phoneLogin () {
      this.loginDiv = false
      this.lgPhoneDiv = true
    },
    otherLo (bool) {
      this.lgPhoneDiv = bool
      this.loginDiv = true
    },
    logCloseBtn () {
      this.$emit('controlLogin', false)
    },
    linkAll (soId) {
      ipcRenderer.send('qqLogin', {url: 'https://huke88.com/auth/callback?authclient=qq&loginSuccessRedirectUri=https%3A%2F%2Fhuke88.com%2F'})
    }
  },
  mounted () {
    ipcRenderer.on('reply', (e, data) => {
      console.log(data)
      let httpCode = data.request_code[0]
      if (httpCode === '1') {
        alert(data.token[0])
      }
    })
  }
}
</script>

<style>
@import "login.css";
</style>
