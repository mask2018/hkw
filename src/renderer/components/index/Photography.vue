<template>
  <div class="Photography">
    <h3 class="comIndexTitle">
      <strong>摄影艺术</strong>
      <span @click="changeBatch()" v-if="newVideoShow" class="comChange"><i></i>换一批</span>
      <a href="javascript:;" target="_blank" @click="moreHref(2, 'Uidck', '摄影艺术')">更多</a>
    </h3>
    <div class="ptgUicen">
      <div class="ptgMore comPaMore">
        <div class="spare">
          <span class="sp1"></span>
          <span class="sp2"></span>
          <span class="sp3"></span>
          <span class="sp4"></span>
          <span class="sp5"></span>
          <span class="sp6"></span>
        </div>
        <a :href="method" class="comPaConnect">
          <strong>摄影艺术</strong>
          <span>共有{{numFontVideo}}节课</span>
        </a>
      </div>
      <div class="indexList">
        <ul class="clearfix">
          <li v-for="data,index in videoSlide" v-if="index<showNum" :key='data.id'>
            <span class="comLabel" :class="data.bgColor" v-if="data.label">{{data.label}}</span>
            <span class="comTime" v-if="data.time">{{data.time}}</span>
            <a :href="data.method" class="indexListImg" @click="linkAll(data.soId)" target="_play"><img v-bind:src="data.src"/></a>
            <a :href="data.method" class="indexListTitle" @click="linkAll(data.soId)" target="_play">{{data.title}}</a>
            <p class="indexListDetail"><span class="fl">{{data.grade}}</span><span class="fr"><i>{{data.number}}</i>人已学</span></p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
var ipcRenderer = require('electron').ipcRenderer
export default {
  name: 'Photography',
  data () {
    return {
      numFontVideo: 0,
      videoSlide: [],
      numCount: 0,
      showNum: 7,
      newVideoShow: true,
      method: 'http://www.aisoubai.com/'
    }
  },
  created () {
    var _this = this
    axios.get('/static/json/fontUi.json')
      .then(function (response) {
        for (let i = 0; i < _this.showNum; i++) {
          _this.$set(_this.videoSlide, i, response.data.videoSlide[i])
        }
        _this.numFontVideo = response.data.videoSlide.length
      }).catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    changeBatch () {
      this.numCount++
      var that = this
      axios.get('/static/json/fontUi.json')
        .then(function (res) {
          var num = Math.floor(res.data.videoSlide.length / that.showNum) - 1
          for (var i = 0; i < res.data.videoSlide.length; i++) {
            that.$set(that.videoSlide, i, res.data.videoSlide[i + that.showNum * that.numCount])
          }
          if (that.numCount === num) {
            that.newVideoShow = false
          }
        }).catch(function (error) {
          console.log(error)
        })
    },
    linkAll (soId) {
      let routeData = this.$router.resolve({
        name: 'ChildIndex',
        params: { id: soId },
        query: { recId: soId, name: 'one' }
      })
      ipcRenderer.send('newRouter', routeData.href)
    },
    moreHref (sty, name, labe) {
      this.$store.commit('moreCom', {moreSty: sty, moreName: name, moreLabel: labe})
    }
  }
}
</script>

<style scoped lang="less">
.ptgUicen{
  position: relative;
  overflow: hidden;
  .ptgMore{
    .spare{
      background-color: #494166;
    }
  }
  .indexList{
    margin-left: 208px;
  }
}
</style>
