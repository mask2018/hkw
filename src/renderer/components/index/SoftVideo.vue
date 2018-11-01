<template>
  <div class="SoftVideo">
    <h3 class="comIndexTitle">
      <strong>软件入门</strong>
      <span>共<i class="yfColor">{{numFontVideo}}</i>软件教程</span>
      <a href="javascript:;" @click="moreHref(1, 'Soft')">更多</a>
    </h3>
    <div class="indexList">
      <ul class="clearfix">
        <li v-for="data,index in videoSlide" v-if="index<8" :key='data.id'>
          <a :href="data.method" class="indexListImg" @click="linkAll(data.soId, data.itdn)" target="_play">
            <img v-bind:src="data.src"/>
            <span class="comLabel" :class="data.bgColor" v-if="data.label">{{data.label}}</span>
          </a>
          <a :href="data.method" class="indexListTitle" @click="linkAll(data.soId, data.itdn)" target="_play">{{data.title}}</a>
          <p class="indexListDetail"><span>主课程<i>{{data.number}}</i>节</span></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
var ipcRenderer = require('electron').ipcRenderer
export default {
  name: 'SoftVideo',
  data () {
    return {
      videoSlide: [],
      numFontVideo: 0
    }
  },
  created () {
    var _this = this
    axios.get('/static/json/softVideo.json')
      .then(function (response) {
        _this.videoSlide = response.data.videoSlide
        _this.numFontVideo = response.data.videoSlide.length
      }).catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    linkAll (soId, itdn) {
      let routeData = this.$router.resolve({
        name: 'ChildIndex',
        params: { id: soId },
        query: { recId: soId, Introduction: itdn }
      })
      ipcRenderer.send('newRouter', routeData.href)
    },
    moreHref (sty, name) {
      this.$store.commit('moreCom', {moreSty: sty, moreName: name})
    }
  }
}
</script>

<style scoped lang="less">
.SoftVideo{
  .yfColor{
    color: #FBB03B;
  }
  .indexList{
    li{
      .indexListImg{
        position: relative; display: block; width: 45px; height: 45px; margin: 28px auto; cursor: pointer; z-index: 11;
        img{
          width: 45px; height: 45px; border-radius: 0;
        }
        .comLabel{
          top: -10px; right: -45px; width: 36px; font-size: 12px; color: #fff;
          height: 20px; line-height: 20px; border-radius: 50px 50px 50px 0;
        }
      }
      .indexListTitle{
        margin: 12px auto; text-align: center;
      }
      .indexListDetail{ text-align: center;}
    }
  }
}
</style>
