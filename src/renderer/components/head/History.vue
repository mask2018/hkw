<template>
  <div class="History">
    <p class="comTopRet"><span @click="spanRet()"><i class="comFamily icon-zuobian"></i> 返回</span></p>
    <div class="hisModl">
      <div class="hisModlCen" v-for="(data,index) in hisVideo" :key='data.id'>
        <h5 class="hisModlTitle">{{data.name}}</h5>
        <ul class="hisModlList clearfix">
          <li v-for="(data1, key) in data.items" :key='data1.id'>
            <span class="comLabel" :class="data1.bgColor" v-if="data1.label">{{data1.label}}</span>
            <span class="comTime" v-if="data.time">{{data1.time}}</span>
            <a href="javascript:;" @click="linkAll(data1.soId)" class="indexListImg" target="_play"><img v-bind:src="data1.src"/></a>
            <a href="javascript:;" @click="linkAll(data1.soId)" class="indexListTitle" target="_play">{{data1.title}}</a>
            <p class="indexListDetail clearfix"><span class="fl">{{data1.grade}}</span><span class="fr"><i>{{data1.number}}</i>人已学</span></p>
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
  name: 'History',
  data () {
    return {
      hisVideo: []
    }
  },
  created () {
    var _this = this
    axios.get('/static/json/hisVideo.json')
      .then(function (response) {
        _this.hisVideo = response.data.hisVideo
      }).catch(function (error) {
        console.log(error)
      })
  },
  mounted () {
  },
  methods: {
    spanRet () {
      this.$emit('goBack', false)
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
.History {
  position: fixed;
  left: 135px;
  top: 60px;
  width: calc(100% - 135px);
  height: 100%;
  overflow-x: auto;
  background-color: #1E1D1B;
  z-index: 16;
  .hisModl{
    .hisModlCen{
      .hisModlTitle{ margin-top: 12px; margin-bottom: 8px; font-size: 20px; color: #D8D8D8;}
      .hisModlList{
        li{
          position: relative; float: left; width: 188px; height: 176px; background-color: #282828; border-radius: 5px; transition: transform 0.25s ease;
          margin: 5px 20px 5px 0;
          .indexListImg{
            cursor: pointer;
            img{
              width: 100%; height: 114px; border-radius: 5px 5px 0 0;
            }
          }
          .indexListTitle{
            display: block; width: 90%; margin: 12px auto 8px; color: #FAFAFA;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer;
          }
          .indexListTitle:hover{ color: #FFD200;}
          .indexListDetail{
            width: 90%; margin: 0 auto; font-size: 12px; color: #979A9A;
          }
          .comLabel{
            position: absolute; right: 8px; top: 20px; width: 44px; height: 16px; line-height: 16px; text-align: center;
            border-radius: 5px; font-size: 12px; color: #fff;
          }
          .comTime{
            position: absolute; right: 8px; top: 80px; padding: 4px 12px;
            background: rgba(49,49,49,0.60); border-radius: 5px; color: #fff;
          }
        }
        li:hover{
          transform: scale(1.06,1.06)
        }
      }
    }
  }
}
.comTopRet{
  padding: 24px 0;
  color: #D8D8D8;
  span{
    cursor: pointer;
  }
}
.History::-webkit-scrollbar {
  width: 8px;
  height: 1px;
}
.History::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: #979A9A;
}
.History::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: #1E1D1B;
}
</style>
