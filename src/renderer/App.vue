<template>
  <div id="app">
    <Head :hdstate="hdstate" @hdSrh="hdSrhs"></Head>
    <router-view @comHead="comAll" :hdSw="hdSw"></router-view>
  </div>
</template>

<script>
import Head from '@/components/Head'
export default {
  name: 'hkw',
  data () {
    return {
      hdstate: true,
      hdSw: []
    }
  },
  components: {
    Head
  },
  methods: {
    comAll: function (bool) {
      this.hdstate = bool
    },
    hdSrhs: function (bool) {
      this.hdSw = bool
    }
  },
  mounted () {
  }
}
</script>

<style>
@import "//at.alicdn.com/t/font_880923_hl22eqn1dm4.css";
.comFamily{ font-family: iconfont;}
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, figcaption, figure, fieldset, legend, button, input, textarea, th, td {
  margin: 0;
  padding: 0
}

body, button, input, select, textarea {
  font: 12px/1 Lucida Grande, 'Microsoft YaHei', "Lucida Grande", "Lucida Sans Unicode", Helvetica, Arial, Verdana, sans-serif
}

h1, h2, h3, h4, h5, h6 {
  font-weight: normal;
}

code, kbd, pre, samp, tt {
  font-family: "Courier New", Courier, monospace
}
a{text-decoration:none}
* {
  -ms-word-break: break-all;
  word-break: break-all;
  -ms-word-wrap: break-word;
  word-wrap: break-word;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
}

iframe{
  border:none;
}

li {
  list-style: none;
}

input {
  outline: none;
}
strong{
  font-weight: normal;
}

a{
  color: #333;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
html{ width:100%; height:100%;}
body {
  height: 100%;
  width:100%;
  -webkit-overflow-scrolling: touch;
}

img {
  border: none;
  vertical-align: middle;
}

address, cite, dfn, em, var,i {
  font-style: normal
}

/* 去除iphone ipad 设备默认按钮样式 */
input[type="button"], input[type="submit"], input[type="reset"] {
  -webkit-appearance: none;
  border-radius: 0;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}

input::-moz-placeholder, textarea::-moz-placeholder {
  color: #cccccc;
}

input:-ms-input-placeholder, textarea:-ms-input-placeholder {
  color: #cccccc;
}

input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
  color: #cccccc;
}
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
.hide {
  display: none;
}
.show {
  display: block;
}
body {
  font-size: 14px;
}
.bgimg{
  display:none;
  position:fixed;
  top:0; left:0;
  width:100%;
  height:100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index:9;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
hr{
  height:41px;
  background-color:#eee;
  border:0;
}
table{
  border-collapse:collapse;
  border-spacing:0;
}
.topBgCenter{
  height: 112px;
}
.bg_fff{
  background-color: #fff;
}
.mt10{ margin-top: 10px}
.mt20{ margin-top: 20px}
.mt30{ margin-top: 30px}
#app{ height: 100%; width: 100%;}
.bgColor1{ background-color: #b062a3;} /*精修*/
.bgColor2{ background-color: #494166;} /*摄影*/
.bgColor3{ background-color: #74c4c4;} /*室内*/
.bgColor4{ background-color: #ea5541;} /*插画*/
.bgColor5{ background-color: #eb4c8c;} /*ui设计*/
.bgColor6{ background-color: #F5C607;} /*字体*/
.bgColor7{ background-color: #fbb03b;} /*海外*/
.bgColor8{ background-color: #FF7C00;} /*软件*/
.bgColor9{ background-color: #6EBD6B;} /*综合*/
.bgColor10{ background-color: #40B0FF;} /*海报*/
.bgColor11{ background-color: #00a2b9;} /*品牌*/
.bgColor12{ background-color: #00528E;} /*职业*/
.bgColor13{ background-color: #367DD5;} /*C4D*/
.bgColor14{ background-color: #00A99D;} /*合成*/
.bgColor15{ background-color: #7e57c2;} /*办公*/
.bgColor16{ background-color: #d49688;} /*影视*/
.bgColor17{ background-color: #ccb374;} /*人像*/
.bgColor18{ background-color: #617f74;} /*店铺*/

.fade-enter-active, .fade-leave-active {
  transition: opacity .8s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
.allWidth{ width: 1656px;  margin: 0 auto;}
@media only screen and (max-width:1812px){
  .allWidth{ width: 1436px;}
}
@media only screen and (max-width:1600px){
  .allWidth{ width: 1230px}
}
@media only screen and (max-width:1400px){
  .allWidth{ width: 1020px;}
}
@media only screen and (max-width:1200px){
  .allWidth{ width: 815px;}
}
@media only screen and (max-width:995px){
  .allWidth{ width: 605px;}
}
</style>
