<template>
  <div class="RecVideo">
    <h3 class="comIndexTitle">
      <strong>推荐视频</strong>
      <span @click="changeBatch()" v-if="newVideoShow" class="comChange"><i></i>换一批</span>
    </h3>
    <div class="indexList newVideo">
      <ul class="clearfix">
        <li v-for="(data,index) in videoSlide" :key='data.id' v-if="index<showNum1">
          <span class="comLabel" :class="data.bgColor" v-if="data.label">{{data.label}}</span>
          <span class="comTime" v-if="data.time">{{data.time}}</span>
          <a href="javascript:;" @click="linkAll(data.soId)" class="indexListImg" target="_play"><img v-bind:src="data.src"/></a>
          <a href="javascript:;" @click="linkAll(data.soId)" class="indexListTitle" target="_play">{{data.title}}</a>
          <p class="indexListDetail clearfix"><span class="fl">{{data.grade}}</span><span class="fr"><i>{{data.number}}</i>人已学</span></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
var ipcRenderer = require('electron').ipcRenderer
export default {
  name: 'Index',
  data () {
    return {
      videoSlide: [],
      numCount: 0,
      showNum1: 10,
      newVideoShow: true,
      method: 'http://www.aisoubai.com/'
    }
  },
  components: {
  },
  created () {
    var _this = this
    axios.get('/static/json/recVideo.json')
      .then(function (response) {
        for (let i = 0; i < _this.showNum1; i++) {
          _this.$set(_this.videoSlide, i, response.data.videoSlide[i])
        }
        var num = Math.floor(response.data.videoSlide.length / _this.showNum1) - 1
        if (num < 1) {
          _this.newVideoShow = false
        }
      }).catch(function (error) {
        console.log(error)
      })
  },
  mounted () {
  },
  methods: {
    changeBatch () {
      this.numCount++
      var that = this
      axios.get('/static/json/recVideo.json')
        .then(function (res) {
          var num = Math.floor(res.data.videoSlide.length / that.showNum1) - 1
          for (var i = 0; i < res.data.videoSlide.length; i++) {
            that.$set(that.videoSlide, i, res.data.videoSlide[i + that.showNum1 * that.numCount])
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
    }
  }
}
</script>

<style lang="less" scoped>
.indexList{
  height: 372px;
}
.comIndexTitle{
  overflow: hidden;
  span{
    float: right;
    margin-right: 20px;
  }
}
</style>
