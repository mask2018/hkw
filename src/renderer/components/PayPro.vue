<template>
  <div class="PayPro">
    <div class="payHead clearfix">
      <dl class="payInfor">
        <dt class="payInforImg"><img src="/static/images/loginIcon.png"/></dt>
        <dd class="payInforDetail">
          <h5>MR陈</h5>
          <p>ID：12312312</p>
        </dd>
      </dl>
      <div class="payBtn">
        <span class="comFamily icon-dacha" @click="headClose()"></span>
      </div>
    </div>
    <div class="nav">
      <span class="navLab">全站通VIP<i>hot</i></span>
    </div>
    <div class="payProCen">
      <div class="payProList clearfix">
        <div v-for="(data, index) in payList" :class="{on:index==active}" @click="category(index)" class="payList">
          <span v-if="data.label" class="payListLabel icon-chongzhibiaoqian comFamily"><i>{{data.label}}</i></span>
          <div class="payListCen">
            <div class="payListMony"><strong><span>¥<i>{{data.mony}}</i></span>/年</strong>({{data.time}})</div>
            <p class="payListCont">{{data.cont}}</p>
          </div>
        </div>
      </div>
      <div class="payProWay clearfix">
        <div class="comPayWay payWeiXin">
          <i class="payWayImg"><img src="/static/images/loginIcon.png"/></i>
          <span class="payWayName">微信扫一扫支付</span>
          <span class="payWayTip"><i class="comFamily icon-weixin"></i>微信支付</span>
        </div>
        <div class="comPayWay payZfb">
          <i class="payWayImg"><img src="/static/images/loginIcon.png"/></i>
          <span class="payWayName">支付宝扫一扫支付</span>
          <span class="payWayTip"><i class="comFamily icon-zhifubao"></i>支付宝支付</span>
        </div>
      </div>
      <div class="payProOffic">
        <p>特权说明</p>
        <p>1、客户端目前仅支持全站通VIP充值。</p>
        <p>2、VIP账号可在网页、APP客户端、IPAD客户端、PC客户端通用，享受同等权益。</p>
        <p>3、名师评改、作品评改、周练优先点评等会员权益请至网站上操作，客户端将在后续陆续更新开放。</p>
      </div>
    </div>
    <div class="paySuc" v-if="paySucHide">
      <div class="paySucAll">
        <p class="paySucTop"><span class="comFamily icon-dacha" @click="headClose()"></span></p>
        <div class="paySucMain">
          <dl class="paySucTip">
            <dt><i class="comFamily icon-chongzhichenggong1"></i></dt>
            <dd>
              <h5>充值成功</h5>
              <p>您已成功购买 <span>全站通VIP</span></p>
            </dd>
          </dl>
          <input type="button" value="前往学习" class="paySucBut" @click="headClose()"/>
        </div>
        <p class="paySucDet">充值结果受网络等多种因素影响，请耐心等待，一般会在5分钟内到账</p>
      </div>
    </div>
  </div>
</template>

<script>
var ipcRenderer = require('electron').ipcRenderer
export default {
  name: 'PayPro',
  data () {
    return {
      payList: [
        {mony: '299', time: '5个每天 ', cont: '一年内新开VIP 每日可学5个'},
        {mony: '399', time: '无限观看', cont: '一年内新开VIP 可以无限观看', label: '不定期涨价'}
      ],
      active: '0',
      paySucHide: false
    }
  },
  created: function () {
    this.$emit('comHead', false)
  },
  methods: {
    headClose: function () {
      ipcRenderer.send('newClose2', 'close')
    },
    category (index) {
      this.active = index
    }
  }
}
</script>

<style lang="less" scoped>
.PayPro{
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
  .payHead{
    height: 66px;
    background-color: #282828; -webkit-app-region: drag;
    .payInfor{
      float: left; overflow: hidden; margin-top: 12px; margin-left: 24px;
      .payInforImg{
        float: left; width: 40px; height: 40px; border-radius: 50px;
        img{ display: block; width: 40px; height: 40px; border-radius: 50px;}
      }
      .payInforDetail{
        float: left; margin-left: 8px;
        h5{ margin-bottom: 6px; line-height: 20px; font-size: 14px; color: #fafafa;}
        p{ font-size: 12px; color: #979A9A;}
      }
    }
    .payBtn{
      float: right; margin-top: 25px; margin-right: 12px; -webkit-app-region: no-drag;
      span{ cursor: pointer; color: #979A9A; font-size: 16px;}
    }
  }
  .nav{
    height: 42px;
    line-height: 42px;
    margin-top: 8px;
    text-align: center;
    border-bottom: 1px solid #d8d8d8;
    span{
      position: relative;
      display: inline-block;
      font-size: 16px;
      color: #666;
      i{
        display: block;
        width: 26px; height: 16px; line-height: 16px;
        position: absolute;
        right: -30px;
        top: 5px;
        background-color: #DA2A2E;
        font-size: 10px;
        color: #FAFAFA;
        border-radius: 50px 50px 50px 0;
      }
    }
    .navLab:after{
      content: '';
      position: absolute;
      left: 10%;
      bottom: -1px;
      display: block;
      width: 80%;
      margin: 0 auto;
      border-bottom: 4px solid #FFD200;
    }
  }
  .payProCen{
    width: 430px;
    margin: 0 auto;
    .payProList{
      margin-top: 20px;
      margin-bottom: 16px;
      .payList{
        position: relative;
        width: 209px;
        float: left;
        background-color: #fafafa;
        border: 2px solid #D8D8D8;
        border-radius: 5px;
        cursor: pointer;
        font-size: 12px;
        color: #979A9A;
        .payListLabel{
          position: absolute;
          right: 0;
          top: 0;
          width: 60px;
          height: 20px;
          line-height: 20px;
          font-size: 20px;
          text-align: center;
          color: #FFD200;
          border-radius: 0 5px 0 0;
          i{ position: absolute; left: 0; top: 0; width: 100%; height: 20px; line-height: 14px; font-size: 10px; color: #FF7C00;}
        }
        .payListCen{
          width: 177px;
          margin: 0 auto;
          padding: 16px 0;
          text-align: center;
          .payListMony{
            line-height: 30px;
            border-bottom: 1px solid #D8D8D8;
            strong{
              font-size: 14px;
              span{
                color: #FF7C00;
                i{ font-size: 26px;}
              }
            }
          }
          .payListCont{
            line-height: 26px;
          }
        }
      }
      .payList:last-child{ float: right;}
      .payList.on{
        border: 2px solid #FF7C00;
        color: #FF7C00;;
        .payListMony{
          border-bottom: 1px solid #FF7C00;
        }
      }
      .payList.on:after{
        content: '';
        position: absolute;
        right: -1px;
        bottom: -1px;
        width: 28px;
        height: 28px;
        background: url("/static/images/iconYes.png") no-repeat;
      }
    }
    .payProWay{
      padding: 20px 0;
      border: 1px solid #E7E7E7;
      .comPayWay{
        width: 124px;
        float: left;
        margin-left: 56px;
        .payWayImg{
          display: block;
          width: 124px; height: 124px;
          img{ display: block; width: 100px; height: 100px; margin: 12px;}
        }
        .payWayName{ display: block; width: 100%; height: 24px; line-height: 24px; font-size: 12px; color: #979A9A;   background-color: #ECECEC; text-align: center;}
        .payWayTip{
          display: block;
          width: 100%;
          margin-top: 10px;
          font-size: 12px;
          color: #333;
          text-align: center;
          i{ display: inline-block; margin-right: 8px;}
        }
      }
      .payWeiXin{
        .payWayImg{ border: 1px solid #23BF36;}
        .payWayTip{
          i{ color: #23BF36;}
        }
      }
      .payZfb{
        margin-left: 70px;
        .payWayImg{ border: 1px solid #00A0E9;}
        .payWayTip{
          i{
            color: #00A0E9;
          }
        }
      }
    }
    .payProOffic{
      margin-top: 19px;
      line-height: 20px;
      font-size: 12px;
      color: #979A9A;
    }
  }
  .paySuc{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    .paySucAll{
      position: absolute;
      left: 50%;
      top: 50%;
      width: 400px;
      height: 254px;
      margin-top: -127px;
      margin-left: -200px;
      background-color: #282828;
      border: 1px solid #080807;
      border-radius: 5px;
      .paySucTop{
        padding: 12px 12px 28px 0; font-size: 16px; color: #979A9A; text-align: right;
        span{ cursor: pointer;}
      }
      .paySucMain{
        width: 224px;
        margin: 0 auto;
        .paySucTip{
          overflow: hidden;
          dt{
            width: 40px; height: 40px; float: left; font-size: 40px; color: #F53502;
          }
          dd{
            float: left; margin-left: 16px;
            h5{
              margin-bottom: 8px;
              font-size: 18px;
              color: #FAFAFA;
            }
            p{
              font-size: 14px;
              color: #FAFAFA;
              span{ color: #F53502;}
            }
          }
        }
        .paySucBut{ display: block; height: 36px; line-height: 36px; width: 100%; margin: 20px 0 16px; border-radius: 50px; border: 0; background: linear-gradient(to right, #FFD200 , #FF7C00);color: #FAFAFA; cursor: pointer;}
        .paySucBut:hover{ background: linear-gradient(to right, #ffde0f , #ff9622);}
      }
      .paySucDet{ font-size: 12px;color: #FAFAFA; text-align: center;}
    }
  }
}
</style>
