<template>
  <div class="ChildIndex">
    <div class="childHead">
      <span class="openMain" @click="openMain()">打开主界面</span>
      <div class="headClose">
        <span class="small icon-suoxiao1" @click="headSmall()"></span>
        <span class="min icon-huanyuan" @click="headMin()" v-if="minIcon"></span>
        <span class="max icon-fangda" @click="headMax()" v-if="maxIcon"></span>
        <span class="close icon-dacha" @click="headClose()"></span>
      </div>
    </div>
    <div class="childCen clearfix">
      <div class="indexLeft" id="indexLeft">{{videoMeth}}</div>
      <div class="indexIight" id="indexIight">
        <span class="childIcon icon-zuobian" v-if="iconChu" @click="detailChu('0')"></span>
        <span class="childIcon icon-youbian" v-if="iconShou" @click="detailShou('-300')"></span>
        <dl class="rightTop comWid">
          <dt><img src="/static/images/loginIcon.png"/></dt>
          <dd>讲师：阿角</dd>
        </dl>
        <div class="rightRec comWid" @click="openBtn(2)">为自己充值</div>
        <div class="labelTitle comWid">
          <ul class="clearfix">
            <li v-for='(data,key,index) in tabs' :key='data.id' v-bind:class='{on:index==styl}' @click="tabChange(data.tab, index)" v-if="data.state">
              {{ data.item }}
            </li>
          </ul>
        </div>
        <div class="detailAll">
          <div :is="curView" v-on:vdl="vdlMtd" v-on:tabList="tabList"></div>
        </div>
        <div class="fileBot">
          <a href="javascript:;" class="comWid">源文件</a>
        </div>
      </div>
    </div>
    <Load v-if="loadShow"></Load>
  </div>
</template>

<script>
import Load from '../Load'
import Catalog from './Catalog'
import Detail from './Detail'
var ipcRenderer = require('electron').ipcRenderer
export default {
  name: 'ChildIndex',
  data () {
    return {
      videoMeth: this.$route.query.recId,
      one: '',
      minIcon: false,
      maxIcon: true,
      loadShow: false,
      iconChu: false,
      iconShou: true,
      tabs: {
        item: {
          item: '课程目录',
          state: true,
          tab: 'Catalog'
        },
        item1: {
          item: '课程信息',
          state: true,
          tab: 'Detail'
        }
      },
      styl: '0',
      curView: 'Catalog'
    }
  },
  components: {
    Load,
    Catalog,
    Detail
  },
  created: function () {
    this.$emit('comHead', false)
  },
  methods: {
    load () {
      this.loadShow = true
    },
    openMain () {
      ipcRenderer.send('openMain', 'show')
    },
    openBtn (soId) {
      let routeData = this.$router.resolve({
        name: 'PayPro',
        params: { id: soId },
        query: { recId: soId, name: 'one' }
      })
      ipcRenderer.send('newPayPro', routeData.href)
    },
    headSmall: function () {
      ipcRenderer.send('newClose1', 'small')
    },
    headMin: function () {
      this.maxIcon = true
      this.minIcon = false
      ipcRenderer.send('newClose1', 'nobig')
    },
    headMax: function () {
      this.maxIcon = false
      this.minIcon = true
      ipcRenderer.send('newClose1', 'big')
    },
    headClose: function () {
      ipcRenderer.send('newClose1', 'close')
    },
    tabChange (tabItem, num) {
      this.styl = num
      this.curView = tabItem
    },
    detailChu (pixel) {
      var that = this
      document.getElementById('indexIight').style.right = pixel + 'px'
      document.getElementById('indexLeft').style.width = document.body.clientWidth - 300 + 'px'
      that.iconShou = true
      that.iconChu = false
    },
    detailShou (pixel) {
      var that = this
      document.getElementById('indexIight').style.right = pixel + 'px'
      document.getElementById('indexLeft').style.width = 100 + '%'
      that.iconShou = false
      that.iconChu = true
    },
    vdlMtd: function (bool) {
      this.videoMeth = bool
    },
    tabList: function (state) {
      this.tabs.item.state = state
      this.styl = 1
      this.curView = Detail
    }
  },
  mounted () {
    var that = this
    ipcRenderer.on('resizeWin1', function (event, arg) {
      if (arg === 'max') {
        that.maxIcon = false
        that.minIcon = true
      } else {
        that.maxIcon = true
        that.minIcon = false
      }
    })
    that._timeOut = setInterval(() => {
      that.loadShow = false
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this._timeOut)
  }
}
</script>
<style scoped lang="less">
  .ChildIndex{
    position: relative; height: 100%; overflow: hidden;
    .childHead{
      position: fixed; top: 0; left: 0; width: 100%; height: 60px; background-color: #171615; z-index: 99;
      -webkit-app-region: drag;
      .openMain{
        -webkit-app-region: no-drag; display: inline-block; width: 122px; height: 40px; line-height: 40px; text-align: center; font-size: 14px; color: #FAFAFA;
        background-color: #282828; border-radius: 5px; margin: 10px 20px; cursor: pointer;
      }
      .headClose{
        position: absolute; right: 20px; top: 22px; height: 30px; font-size: 16px;
        text-align: right; color: #979A9A; font-family: iconfont; -webkit-app-region: no-drag;
        span{
          display: inline-block; margin-left: 20px; cursor: pointer; color: #979A9A;
        }
        span:hover{
          color: #fff;
        }
      }
    }
    .childCen{
      height: 100%;
      .indexLeft{
        width: calc(100% - 300px); height: calc(100% - 60px); padding-top: 60px; transition: width .2s;
        background-color: #212020; font-size: 60px; color: #fff; text-align: center;
      }
      .indexIight{
        position: absolute; right: 0; top: 0; width: 300px; height: calc(100% - 60px); padding-top: 60px; background-color: #282828; transition: right .2s;
        .childIcon{
          position: absolute; left: -28px; top: 50%; margin-top: -40px; width: 28px; height: 80px; line-height: 80px; display: block; text-align: center;
          border-radius: 5px 0 0 5px; background-color: rgba(40, 40, 40, .8); font-family: iconfont; color: #fff; cursor: pointer;
        }
        .comWid{
          width: 276px; margin-left: auto; margin-right: auto;
        }
        .rightTop{
          overflow: hidden; margin-top: 16px; margin-bottom: 16px;
          dt{
            width: 50px; float: left;
            img{ width: 50px; height: 50px; border-radius: 50px;}
          }
          dd{ line-height: 50px; float: left; margin-left: 16px; color: #fafafa;}
        }
        .rightRec{
          height: 40px; line-height: 40px; border-radius: 50px; font-size: 14px; color: #fafafa; text-align: center;
          background: linear-gradient(to right, #FFD200 , #FF7C00); cursor: pointer;
        }
        .rightRec:hover{ background: linear-gradient(to right, #ffde0f , #ff9622);}
        .labelTitle{
          margin-top: 16px; margin-bottom: 8px; height: 38px; padding: 0 4px;
          background-color: #1E1D1B; border-radius: 5px; font-size: 14px; color: #979A9A;
          ul{
            display: flex;
            li{
              flex: 1; height: 30px; line-height: 30px; width: 134px; margin-top: 4px; text-align: center; cursor: pointer;
            }
            li.on{
              color: #FFD200; background-color: #282828; border-radius: 5px;
            }
          }
        }
        .detailAll{
          height: calc(100% - 270px); overflow-y: auto;
        }
        .detailAll::-webkit-scrollbar {
          width: 9px;
          height: 1px;
        }
        .detailAll::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background: #979A9A;
        }
        .detailAll::-webkit-scrollbar-track {
          border-radius: 10px;
          background: #282828;
        }
        .fileBot{
          position: absolute; bottom: 0; right: 0; height: 70px; width: 300px; background-color: #1E1D1B;
          a{
            display: block; height: 38px; line-height: 38px; margin-top: 16px; background-color: #282828; border-radius: 5px; text-align: center; color: #FFD200;
          }
        }
      }
    }
  }
</style>
