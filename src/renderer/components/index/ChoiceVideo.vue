<template>
  <div class="RecVideo">
    <h3 class="comIndexTitle"><strong>精选专辑</strong><a href="javascript:;">更多</a></h3>
    <div class="indexList">
      <ul class="clearfix">
        <li v-for="data in videoSlide" :key='data.id'>
          <span class="comLabel" :class="data.bgColor" v-if="data.label">{{data.label}}</span>
          <span class="comTime" v-if="data.time">{{data.time}}</span>
          <a :href="data.method" class="indexListImg" @click="linkAll(data.soId)" target="_play"><img v-bind:src="data.src"/></a>
          <a :href="data.method" class="indexListTitle" @click="linkAll(data.soId)" target="_play">{{data.title}}</a>
          <p class="indexListDetail"><span>{{data.label}}</span><span><i>{{data.number}}</i>人已学</span></p>
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
      videoSlide: []
    }
  },
  created () {
    var _this = this
    axios.get('/static/json/choiceVideo.json')
      .then(function (response) {
        _this.videoSlide = response.data.videoSlide
      }).catch(function (error) {
        console.log(error)
      })
  },
  methods: {
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

<style lang="less">
</style>
