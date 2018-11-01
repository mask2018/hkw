<template>
  <div class="head" v-if="hdstate">
    <div class="logo">
      <a href="javascript:;" class="icon icon-logo" @click="logoRout"></a>
    </div>
    <div class="search">
      <div class="searchCen clearfix">
        <div class="searc-bar">
          <input type="text" class="searchInput" v-model="srhInput" placeholder="请输入教程" @blur.prevent="inputBlue()" @focus.prevent="inputFocus()"/>
          <div class="record" v-show="recordHide">
            <div class="recordUnd" v-if="recList.length === 0">近期并没有过搜索记录</div>
            <div class="recordList" v-else>
              <p v-for="data,index in recList" v-if="index<5" @click="datRec(data.name)">{{data.name}}</p>
              <p class="clearRecord"><span>清空记录</span></p>
            </div>
          </div>
          <i class="icon-sousuo" @click="seacchBtn(srhInput, true, 1)"></i>
        </div>
        <div class="seaRecord" @mouseover="hisCenHover()" @mouseleave="hisCenHid()">
          <i class="icon-bofangjilu" @click="historyBtn(true, 2)"></i>
          <div class="hisCen" v-if="hisCenHide">
            <div v-if="hisList.length>0">
              <ul class="hisCenList">
                <li v-for="data,index in hisList" v-if="index<4">
                  <a href="javascript:;" @click="linkAll(data.soId)" class="hisCenImg">
                    <img v-bind:src="data.src"/>
                    <span class="hisCenLabel" :class="data.bgColor" v-if="data.label">{{data.label}}</span>
                    <span class="hisCenTime" v-if="data.time">{{data.time}}</span>
                  </a>
                  <div class="hisCenDetail">
                    <a href="javascript:;" @click="linkAll(data.soId)">{{data.title}}</a>
                    <p>{{data.watch}}</p>
                  </div>
                </li>
              </ul>
              <p class="hisCenSee"><span @click="historyBtn(true, 2)">查看更多历史</span></p>
            </div>
            <div class="hisCenEmpty" v-if="hisList.length<1">近期并没有历史记录</div>
          </div>
        </div>
      </div>
    </div>
    <div class="headClose clearfix">
      <div class="comHeadLabel headVip">
        <i class="icon-VIP headComLab"></i>
        <div class="headVipCen">
          <input type="button" value="开通VIP无限观看" class="openBtn" @click="openBtn()"/>
          <p class="headVipTitle"><span>VIP专属特权</span></p>
          <ul class="headVipCenList clearfix">
            <li v-for="data in headList" :key='data.id'>
              <img src="/static/images/headIcon01.png" v-bind:src="data.src"/>
              <span>{{data.name}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="comHeadLabel headLogin">
        <i class="icon-logotouxiang headComLab"></i>
        <div class="loginCen">
          <div class="goLogin" v-if="loginBt">
            <h3>登录立即学习</h3>
            <input type="button" value="登录" class="goLoginBtn" @click="loginShow()"/>
          </div>
          <div class="loginInfor" v-if="inforBt">
            <dl class="inforTop clearfix">
              <dt><img src="/static/images/loginIcon.png"/></dt>
              <dd>
                <h5>MR陈 <i class="icon-quanzhantongVIPbiaoshi-1"></i></h5>
                <p>ID：12312312</p>
              </dd>
            </dl>
            <input type="button" value="开通VIP无限观看" class="inforBtn">
            <p class="inforClose"><span>退出登录</span></p>
          </div>
        </div>
      </div>
      <div class="setUp comHeadLabel">
        <i class="headComLab icon-shezhi"></i>
        <div class="setUpList">
          <span><i class="icon-jianchagengxin"></i>检查更新</span>
          <span @click="clickOpinion()"><i class="icon-yijianfankui"></i>意见反馈</span>
          <span @click="showClose()"><i class="icon-tuichu"></i>退出</span>
        </div>
      </div>
      <div class="small comHeadLabel" @click="headSmall()"><i class="headComLab icon-suoxiao1"></i></div>
      <div class="min comHeadLabel" @click="headMin()" v-if="minIcon"><i class="headComLab icon-huanyuan"></i></div>
      <div class="max comHeadLabel" @click="headMax()" v-if="maxIcon"><i class="headComLab icon-fangda"></i></div>
      <div class="close comHeadLabel" @click="headClose()"><i class="headComLab icon-dacha"></i></div>
    </div>
    <div class="opinion" v-if="opinionSh">
      <div class="opinionCen">
        <p class="opinionClose comOpinionWid">
          <span class="icon-dacha" @click="opnClose()"></span>
        </p>
        <h5 class="opinionTitle">意见反馈</h5>
        <textarea class="opinionTextarea comOpinionWid" placeholder="请填写您的建议意见"></textarea>
        <div class="comOpinionWid opiniondContact">
          <span>QQ号码:</span>
          <input type="number" placeholder="请填写您的QQ号码，以便我们为您提供更好的服务" oninput="if(value.length>15)value=value.slice(0,15)"/>
        </div>
        <input type="button" value="提交" class="opinionSub"/>
      </div>
    </div>
    <div class="closePro" v-if="closeDiv">
      <div class="closeProCen">
        <p class="closeProIc"><span class="icon-dacha" @click="cancelClose()"></span></p>
        <h3 class="closeProTitle"><i class="icon-jinggao"></i>您要退出当前帐号吗？</h3>
        <p class="closeProBtn">
          <span @click="headClose()">确定</span>
          <span @click="cancelClose()">取消</span>
        </p>
      </div>
    </div>
    <transition name = "fade">
      <login v-if="loginHide" @controlLogin="cnoLogin"></login>
    </transition>
  </div>
</template>

<script>
import Login from '@/components/login/Login'
import History from '@/components/head/History'
import Search from '@/components/head/Search'
var ipcRenderer = require('electron').ipcRenderer
export default {
  name: 'dacHead',
  data () {
    return {
      minIcon: false,
      maxIcon: true,
      opinionSh: false,
      closeDiv: false,
      loginBt: true,
      inforBt: false,
      loginDiv: true,
      lgPhoneDiv: false,
      loginHide: false,
      hisCenHide: false,
      headList: [
        {name: '所有分类无限学', src: '/static/images/headIcon01.png'},
        {name: '视频+图文教程', src: '/static/images/headIcon02.png'},
        {name: '源文件下载', src: '/static/images/headIcon03.png'},
        {name: '点亮尊贵标识', src: '/static/images/headIcon04.png'},
        {name: '教程优先录', src: '/static/images/headIcon05.png'},
        {name: '多屏互动随时看', src: '/static/images/headIcon06.png'}
      ],
      srhInput: this.srhInput,
      recList: [],
      recordHide: false,
      hisList: [
        {soId: 1, watch: '观看至20%', title: '字体设计好设计画笔啊字体设计好设计画笔啊', time: '53分03秒', label: 'C4D', bgColor: 'bgColor13'},
        {soId: 1, watch: '观看至20%', title: '字体设计好设计画笔啊1', time: '53分03秒', label: 'C4D', bgColor: 'bgColor13'},
        {soId: 1, watch: '观看至20%', title: '字体设计好设计画笔啊2', time: '53分03秒', label: 'C4D', bgColor: 'bgColor13'},
        {soId: 1, watch: '观看至20%', title: '字体设计好设计画笔啊3', time: '53分03秒', label: 'C4D', bgColor: 'bgColor13'},
        {soId: 1, watch: '观看至20%', title: '字体设计好设计画笔啊4', time: '53分03秒', label: 'C4D', bgColor: 'bgColor13'},
        {soId: 1, watch: '观看至20%', title: '字体设计好设计画笔啊5', time: '53分03秒', label: 'C4D', bgColor: 'bgColor13'}
      ],
      HistoryList: [] || localStorage.getItem('HistoryList')
    }
  },
  components: {
    Login,
    History,
    Search
  },
  props: {
    hdstate: ''
  },
  methods: {
    logoRout () {
      this.$router.go('/components/All')
    },
    clickOpinion () {
      this.opinionSh = true
    },
    opnClose () {
      this.opinionSh = false
    },
    showClose () {
      this.closeDiv = true
    },
    cancelClose () {
      this.closeDiv = false
    },
    headSmall: function () {
      ipcRenderer.send('newClose', 'small')
    },
    headMin: function () {
      this.maxIcon = true
      this.minIcon = false
      ipcRenderer.send('newClose', 'nobig')
    },
    headMax: function () {
      this.maxIcon = false
      this.minIcon = true
      ipcRenderer.send('newClose', 'big')
    },
    headClose: function () {
      ipcRenderer.send('newClose', 'close')
    },
    loginShow () {
      this.loginHide = true
    },
    cnoLogin (bool) {
      this.loginHide = bool
    },
    openBtn () {
      console.log('zan无')
    },
    seacchBtn (data, sty, num) {
      var that = this
      that.$emit('hdSrh', {data: data, state: sty, num: num})
      if (that.data !== '') {
        data = data.replace(/(^\s*)|(\s*$)/g, '')
        if (that.HistoryList.length > 0) {
          if (that.HistoryList.indexOf(data) !== -1) {
            that.HistoryList.splice(that.HistoryList.indexOf(data), 1)
            that.HistoryList.unshift(data)
          } else {
            that.HistoryList.unshift(data)
          }
        } else {
          that.HistoryList.unshift(data)
        }
        localStorage.setItem('HistoryList', JSON.stringify(that.HistoryList))
      } else {
        alert(1)
      }
    },
    historyBtn (sty, num) {
      this.$emit('hdSrh', {state: sty, num: num})
      this.hisCenHide = false
    },
    datRec (data) {
      this.srhInput = data
      this.recordHide = false
    },
    inputBlue () {
      var that = this
      setTimeout(function () {
        that.recordHide = false
      }, 200)
    },
    inputFocus () {
      this.recordHide = true
      var resLis = localStorage.getItem('HistoryList')
      this.recList = localStorage.getItem('HistoryList')
      console.log(resLis)
    },
    linkAll (soId) {
      let routeData = this.$router.resolve({
        name: 'ChildIndex',
        params: { id: soId },
        query: { recId: soId, name: 'one' }
      })
      ipcRenderer.send('newRouter', routeData.href)
    },
    hisCenHover () {
      this.hisCenHide = true
    },
    hisCenHid () {
      this.hisCenHide = false
    }
  },
  mounted () {
    var that = this
    ipcRenderer.on('resizeWin', function (event, arg) {
      if (arg === 'max') {
        that.maxIcon = false
        that.minIcon = true
      } else {
        that.maxIcon = true
        that.minIcon = false
      }
    })
  }
}
</script>
<style>
  @import "login/login.css";
</style>
<style lang="less" scoped>
.head{
  position: fixed; left: 0; top: 0; width: 100%;
  height: 60px; background-color: #171615; z-index: 111;
  -webkit-app-region: drag;
  .logo{
    position: absolute; left: 20px; top: 0; -webkit-app-region: no-drag; outline: none;
    .icon{
      display: inline-block; margin-top: 14px; font-family: iconfont; color: #FFD200; font-size: 32px;
      img{
        height: 20px;
      }
    }
  }
  .search{
    text-align: center;
    height: 60px;
    .searchCen{
      position: relative;
      width: 300px; height: 60px; margin: 0 auto;
      .searc-bar{
        position: relative; -webkit-app-region: no-drag; background-color: #282828; border-radius: 50px;
        width: 240px; float: left; margin-top: 10px;
        .searchInput{
          display: block; height: 40px; width: 180px; padding: 0 15px; border: 0; border-radius: 50px; background-color: #282828; color: #fff;
        }
        i{
          position: absolute; right: 0; top: 0; height: 40px; width: 40px; line-height: 40px; text-align: center; font-family: iconfont;
          border-radius: 50px; background-color: #393939; font-size: 16px; cursor: pointer; color: #D8D8D8;
        }
        i:hover{ background-color: #FFD200; color: #fff;}
        .record{
          position: absolute;
          top: 46px;
          left: 0;
          width: 100%;
          background-color: #282828;
          border: 1px solid #080807;
          font-size: 12px;
          color: #D8D8D8;
          border-radius: 5px;
          .recordList{
            margin: 14px 0; text-align: left;
            p{ height: 28px; line-height: 28px; padding: 0 15px; cursor: pointer; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;}
            p:hover{ background-color: #1E1D1B;}
            .clearRecord{ margin-top: 14px; text-align: center;}
          }
          .recordUnd{ padding: 24px 0;}
        }
      }
      .seaRecord{
        position: relative;
        float: right; width: 40px; margin-top: 20px; height: 40px; color: #D8D8D8; -webkit-app-region: no-drag;
        i{
          display: block; font-size: 22px; cursor: pointer; font-family: iconfont;
        }
        i:hover{ color: #FFD200;}
        .hisCen{
          position: absolute; left: -150px; top: 38px; width: 300px; padding:  0 20px; font-size: 12px; color: #979A9A;
          background-color: #282828; border: 1px solid #080807; border-radius: 5px;
          .hisCenEmpty{ padding: 24px 0;}
          .hisCenList{
            li{
              overflow: hidden; margin-top: 20px;
              .hisCenImg{
                position: relative; float: left; width: 120px; height: 72px; border-radius: 5px;
                img{ display: block; width: 100%; height: 100%; border-radius: 5px;}
                .hisCenLabel{ position: absolute; right: 8px; top: 12px; width: 44px; height: 16px; line-height: 16px; text-align: center;
                  border-radius: 5px; font-size: 12px; color: #fff;}
                .hisCenTime{ position: absolute; right: 8px; bottom: 8px; padding: 4px 12px; background: rgba(49,49,49,0.60); border-radius: 5px; color: #fff;}
              }
              .hisCenDetail{
                float: left; margin-left: 12px; width: 168px; text-align: left; line-height: 26px; margin-top: 12px;
                a{ display: block; width: 100%; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; font-size: 14px; color: #FAFAFA;}
                a:hover{ color: #FFD200;}
              }
            }
          }
          .hisCenSee{
            margin: 20px 0 12px;
            span{ cursor: pointer;}
            span:hover{ color: #FFD200;}
          }
        }
        .hisCen:before{ content: ''; position: absolute; top: -23px; left: 150px; width: 40px; height: 30px; z-index: 13;}
        .hisCen:after{
          content: ''; position: absolute; top: -16px; left: 161px; width: 0px; height: 0px;
          border-width: 8px; border-style: solid; border-color: transparent transparent #282828 transparent;
        }
      }
    }
  }
  .headClose{
    position: absolute; right: 10px; top: 0px; height: 60px; font-size: 16px;
    text-align: right; color: #979A9A; -webkit-app-region: no-drag;
    .comHeadLabel{
      float: left; padding: 0 10px; margin-top: 22px; color: #979A9A;
      .headComLab{ font-family: iconfont; cursor: pointer;}
    }
    .comHeadLabel:hover{
      color: #fff;
    }
    .icon-VIP{ font-family: iconfont; font-size: 20px;color: #FFD200;}
    .icon-VIP:hover{color: #FFD200;}
    .headVip{
      .headVipCen{
        display: none; position: absolute; top: 58px; left: -114px; width: 255px;
        background-color: #282828; border: 1px solid #171615; border-radius: 5px;
        .openBtn{
          display: block; width: 224px; height: 36px; line-height: 36px; margin: 28px auto 28px; font-size: 14px; color: #fafafa; text-align: center; cursor: pointer; border-radius: 100px; border: 0; background: linear-gradient(to right, #FFD200 , #FF7C00);
        }
        .openBtn:hover{ background: linear-gradient(to right, #ffde0f , #ff9622);}
        .headVipTitle{ position: relative; width: 224px; margin: 16px auto 0; text-align: center; font-size: 14px; color: #979A9A;}
        .headVipTitle span{ position: relative; background-color: #282828; padding: 0 10px;}
        .headVipTitle:before{
          content: '';
          position: absolute;
          left: 0;
          top: 7px;
          height: 1px;
          width: 100%;
          background-color: #D8D8D8;
        }
        .headVipCenList{
          padding-bottom: 28px;
          li{
            float: left; width: 85px; margin-top: 24px; text-align: center; font-size: 10px; color: #D8D8D8;
            span{ display: block;}
            img{
              display: block;
              width: 20px; height: 20px;
              margin: 0 auto 8px;
            }
          }
        }
      }
      .headVipCen:before{ content: ''; position: absolute; top: -20px; left: 120px; width: 30px; height: 30px; z-index: 13;}
      .headVipCen:after{
        content: ''; position: absolute; top: -16px; left: 120px; width: 0px; height: 0px;
        border-width: 8px; border-style: solid; border-color: transparent transparent #282828 transparent;
      }
    }
    .headVip:hover{
      color: #979A9A;
      .headVipCen{ display: block;}
    }
    .headLogin{
      position: relative; margin-top: 15px;
      .icon-logotouxiang{
        display: block; width: 30px; height: 30px;line-height: 30px; text-align: center; font-size: 15px; font-family: iconfont; border-radius: 50px;
        background-color: #ECECEC; border: 1px solid #fafafa;
      }
      .loginCen{
        display: none; position: absolute; top: 43px; left: -102px; width: 255px; background-color: #282828; border: 1px solid #171615; border-radius: 5px;
        .goLogin{
          h3{ margin: 32px 0 16px; font-size: 14px; color: #fafafa; text-align: center;}
          .goLoginBtn{ display: block; width: 224px; height: 36px; line-height: 36px; margin: 0 auto 28px; font-size: 14px; color: #fafafa; text-align: center; cursor: pointer; border-radius: 100px; border: 0; background: linear-gradient(to right, #FFD200 , #FF7C00);}
          .goLoginBtn:hover{ background: linear-gradient(to right, #ffde0f , #ff9622);}
        }
        .loginInfor{
          .inforTop{
            width: 224px; margin: 24px auto 20px;
            dt{
              float: left; width: 40px; height: 40px; background-color: #D8D8D8; border-radius: 50px;
              img{ width: 40px; height: 40px; border-radius: 50px;}
            }
            dd{
              float: left; margin-left: 8px; line-height: 20px;
              h5{
                font-size: 14px; color: #FAFAFA; text-align: left;
                i{ display: inline-block; margin-left: 20px; color: #FFD200; font-family: iconfont;}
              }
              p{ font-size: 12px; color: #979A9A; text-align: left;}
            }
          }
          .inforBtn{ display: block; width: 224px; height: 36px; line-height: 36px; margin: 0 auto 28px; font-size: 14px; color: #fafafa; text-align: center; cursor: pointer; border-radius: 100px; border: 0; background: linear-gradient(to right, #FFD200 , #FF7C00);}
          .inforClose{
            width: 224px; margin: 0 auto; line-height: 40px; font-size: 12px; color: #D8D8D8; border-top: 1px solid #080807; text-align: right;
            span{ cursor: pointer;}
          }
        }
      }
      .loginCen:before{ content: ''; position: absolute; top: -16px; left: 112px; width: 30px; height: 20px;}
      .loginCen:after{
        content: ''; position: absolute; top: -16px; left: 120px; width: 0px; height: 0px;
        border-width: 8px; border-style: solid; border-color: transparent transparent #282828 transparent;
      }
    }
    .headLogin:hover{
      color: #979A9A;
      .loginCen{ display: block;}
    }
    .setUp{
      position: relative;
      .setUpList{
        display: none; border-radius: 5px;
        position: absolute; top: 36px; left: -50px; width: 144px; background-color: #282828; z-index: 11;
        span{
          display: block; line-height: 30px; margin: 15px 0; font-size: 14px; color: #979A9A; text-align: center; cursor: pointer;
          i{ display: inline-block; margin-right: 12px; font-family: iconfont;}
        }
        span:hover{ color: #FFD200;}
      }
      .setUpList:after{
        content: ''; position: absolute; top: -24px; left: 56px; width: 0px; height: 0px;
        border-width: 12px; border-style: solid; border-color: transparent transparent #282828 transparent;
      }
    }
    .setUp:hover{
      .setUpList{ display: block;}
    }
  }
  .closePro{
    position: fixed; left: 0; top: 0; width: 100%; height: 100%;
    background-color: rgba(0, 0, 0, .4); z-index: 123;
    .closeProCen{
      position: absolute; left: 50%; top: 50%; width: 256px; height: 130px; margin-left: -128px; margin-top: -65px;
      background-color: #282828; border: 1px solid #080807; border-radius: 5px;
      .closeProIc{
        margin-top: 12px; text-align: right; font-family: iconfont;
        span{ display: inline-block; margin-right: 12px; color: #D8D8D8; cursor: pointer;}
      }
      .closeProTitle{
        margin-top: 14px; margin-bottom: 20px;
        font-family: iconfont; text-align: center; color: #FAFAFA;
        i{ display: inline-block; margin-right: 8px;}
      }
      .closeProBtn{
        text-align: center;
        span{
          display: inline-block; width: 70px; height: 28px; line-height: 28px; margin: 0 17px; text-align: center; color: #979A9A; font-size: 12px; background-color: #D8D8D8; border-radius: 100px; cursor: pointer;
        }
      }
    }
  }
}
</style>
