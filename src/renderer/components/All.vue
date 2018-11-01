<template>
  <div class="Center clearfix">
    <div class="left">
      <ul>
        <li v-for='(data,key,index) in tabs' :key='data.id' v-bind:class='{on:index==styl}'>
          <span @click="tabChange(data.tab, index)">{{ data.item }}</span>
        </li>
      </ul>
      <div class="feedback">
        <span @click="clickOpinion()">意见反馈</span>
      </div>
    </div>
    <div class="right">
      <div :is="curView" :uiLabel="uiLabel"></div>
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
    <search v-if="hideSrh" @goBack="goBack" :mesCont="parentMesCont"></search>
    <History v-if="hideHis" @goBack="goBack"></History>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Index from '@/components/Index'
import Soft from '@/components/Soft'
import Uidck from '@/components/Uidck'
import History from '@/components/head/History'
import Search from '@/components/head/Search'
export default {
  name: 'Center',
  data () {
    return {
      tabs: {
        item: {
          item: '首页',
          tab: 'Index'
        },
        item1: {
          item: '软件入门',
          tab: 'Soft'
        },
        item2: {
          item: '设计教程',
          tab: 'Uidck'
        }
      },
      styl: '0',
      curView: 'Index',
      opinionSh: false,
      parentMesCont: '',
      hideSrh: false,
      hideHis: false,
      uiLabel: ''
    }
  },
  components: {
    Index,
    Soft,
    Uidck,
    History,
    Search
  },
  props: {
    hdSw: {
      data: String,
      state: String,
      num: Number
    }
  },
  computed: mapGetters({
    newMore: 'moreCom'
  }),
  watch: {
    hdSw: function (item) {
      this.styl = '-1'
      if (item.num === 1) {
        this.hideSrh = item.state
        this.parentMesCont = item.data
        this.hideHis = false
      } else if (item.num === 2) {
        this.hideHis = item.state
        this.hideSrh = false
      }
    },
    newMore (item) {
      this.styl = item.moreSty
      this.curView = item.moreName
      this.uiLabel = item.moreLabel
    }
  },
  methods: {
    tabChange (tabItem, num) {
      this.styl = num
      this.curView = tabItem
      this.uiLabel = ''
      this.hideHis = false
      this.hideSrh = false
    },
    clickOpinion () {
      this.opinionSh = true
    },
    opnClose () {
      this.opinionSh = false
    },
    goBack (bool) {
      this.styl = '0'
      this.curView = 'Index'
      this.hideSrh = bool
      this.hideHis = bool
    }
  }
}
</script>

<style>
.Center{ position: relative; top: 60px; height: calc(100% - 60px); overflow-x: auto;}
.Center::-webkit-scrollbar {
  width: 8px;
  height: 1px;
}
.Center::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: #979A9A;
}
.Center::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: #1E1D1B;
}
.left{ position: fixed; left: 0; top: 60px; width: 120px; height: calc(100% - 60px); background-color: #282828;}
.left ul{ margin-top: 20px;}
.left ul li{ margin-bottom: 20px; color: #FAFAFA;}
.left ul li span{ display: block; line-height: 40px; margin: 0 auto; text-indent: 25px; cursor: pointer;}
.left ul li.on{ background-color: #141414; color: #FFD200;}
.feedback{ position: absolute; bottom: 30px; left: 15px; width: 90px; line-height: 40px; border-top: 1px solid #fff; text-align: center;}
.feedback span{ color: #fff; cursor: pointer;}
.feedback span:hover{ color: #FFD200;}
.right{ margin-left: 120px; padding: 0 20px 30px 15px; background-color: #1E1D1B;}
.opinion{ position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, .4); z-index: 123;}
.opinionCen{ position: absolute; top: 50%; left: 50%; width: 494px; height: 308px; margin-top: -154px; margin-left: -247px; background-color: #282828; border-radius: 5px; border: 1px solid #080807;}
.comOpinionWid{ width: 470px; margin: 0 auto;}
.opinionClose{ margin-top: 12px; text-align: right; font-family: iconfont;}
.opinionClose span{ cursor: pointer; color: #979A9A;}
.opinionClose span:hover{ color: #fafafa;}
.opinionTitle{ margin-bottom: 16px; font-size: 18px; color: #fafafa; text-align: center;}
.opinionTextarea{ display: block; height: 75px; padding: 10px; width: 450px; line-height: 22px; border: 1px solid #080807; border-radius: 5px; outline: none; resize: none; color: #FAFAFA; background-color: #1E1D1B;}
.opinionTextarea:focus{ border: 1px solid #FFD200;}
.opiniondContact{ position: relative; margin-top: 12px; margin-bottom: 28px;height: 40px; line-height: 40px;}
.opiniondContact span{ position: absolute;left: 0; top: 0; display: block; width: 80px; text-align: center; line-height: 42px; color: #fafafa;}
.opiniondContact input{ width: 390px;height: 40px; line-height: 40px; padding-left: 80px; border: 1px solid #080807; border-radius: 5px; overflow: hidden; color: #FAFAFA; background-color: #1E1D1B;}
.opiniondContact input:focus{ border: 1px solid #FFD200;}
input.opinionSub{ display: block; width: 224px; height: 36px; line-height: 36px; margin: 0 auto; font-size: 14px; color: #FAFAFA; background: linear-gradient(to right, #FFD200 , #FF7C00); cursor: pointer; border: 0; border-radius: 100px;}
</style>
