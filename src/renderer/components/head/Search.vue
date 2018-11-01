<template>
  <div class="Search">
    <p class="comTopRet"><span @click="spanRet()"><i class="comFamily icon-zuobian"></i> 返回</span></p>
    <div class="searchScreen clearfix">
      <p class="srhSrnName">共找到642门包含“<i>{{mesCont}}</i>”的视频课程</p>
      <div class="srhSrnList">
        <span v-for="data,index in screenList" :key='data.id' @click="screenBtn(data.name, index)" v-bind:class='{on:index==styl}'>{{data.name}} <i :class="data.iconClass" v-if="data.iconClass" class="comFamily"></i></span>
      </div>
    </div>
    <div class="nav" v-if="navHide">
      <div class="navCen" v-for='(data, index) in category' :key="data.id" v-if="index===1">
        <span class="navTitle">
          {{data.name}}
        </span>
        <ul class="navList">
          <li v-for="(data1, key) in data.items" @click="navLab(index, key)"  :class="{'on':data1.active}" :value="data1.identity" :key='data1.id'>
            {{data1.name}}
          </li>
        </ul>
      </div>
    </div>
    <div class="uiDckList" v-if="mesCont !== '' && mesCont !== undefined">
      <ul class="clearfix">
        <li v-for="data in uiDckListLi">
          <div class="uiDckListAll">
            <a :href="data.method" class="uiDckListImg">
              <img v-bind:src="data.src"/>
              <span>{{data.time}}</span>
            </a>
            <a :href="data.method" class="uiDckListTitle">{{data.title}}</a>
            <p class="uiDckListDetail">
              <span class="fl">{{data.label}}</span>
              <span class="fr">{{data.number}}人已学</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div v-else="mesCont === '' || mesCont === undefined" class="nullDiv">
      <div class="nullTop">
        <img src="/static/images/nullIcon.png"/>
        <p>请输入您需要搜索的内容</p>
      </div>
      <div class="listNull">
        <SearchRec></SearchRec>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import SearchRec from '../index/SearchRec'
export default {
  name: 'Search',
  data () {
    return {
      uiDckListLi: [],
      screenList: [
        {name: '最多学习'},
        {name: '最新教程'},
        {name: '筛选', iconClass: 'icon-xiabian'}
      ],
      styl: '0',
      category: [],
      condition: [],
      navHide: false
    }
  },
  components: {
    SearchRec
  },
  props: {
    mesCont: String
  },
  created () {
    var _this = this
    axios.get('/static/json/uiDckTab.json')
      .then(function (response) {
        _this.category = response.data.category
      }).catch(function (error) {
        console.log(error)
      })
  },
  mounted () {
    this.getPage(this.page)
  },
  methods: {
    navLab: function (index, key) {
      var item = this.category[index].items
      item.filter(function (v, i) {
        if (i === key) {
          v.active = true
        } else {
          v.active = false
        }
      })
    },
    spanRet () {
      this.$emit('goBack', false)
    },
    screenBtn (data, index) {
      this.styl = index
      if (index === 2) {
        if (this.navHide === true) {
          this.navHide = false
        } else {
          this.navHide = true
        }
      }
    },
    getPage (page) {
      var _this = this
      axios.get('/static/json/uiDckList.json')
        .then(function (response) {
          _this.uiDckListLi = response.data.uiDckListLi
        }).catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
<style lang="less" scoped>
.Search{
  position: fixed;
  left: 135px;
  top: 60px;
  width: calc(100% - 135px);
  height: 100%;
  overflow-x: auto;
  background-color: #1E1D1B;
  z-index: 16;
  .comTopRet{
    padding: 24px 0;
    color: #D8D8D8;
    span{
      cursor: pointer;
    }
  }
  .searchScreen{
    margin-bottom: 20px;
    padding-right: 15px;
    color: #D8D8D8;
    .srhSrnName{
      float: left;
      i{ color: #FFD200;}
    }
    .srhSrnList{
      float: right;
      text-align: right;
      span{ margin-left: 12px; cursor: pointer;}
      span.on,span:hover{ color: #FFD200;}
    }
  }
}
.nav{
  position: relative;
  margin-bottom: 20px;
  padding-top: 10px;
  background-color: #282828;
  .navCen{
    position: relative;
    padding: 10px 0;
    color: #D8D8D8;
    .navTitle{
      position: absolute;
      left: 0;
      top: 10px;
      display: block;
      width: 100px;
      padding: 3px 0;
      text-align: center;
      border: 1px solid #282828;
    }
    .navList{
      margin-left: 100px;
      overflow: hidden;
      li{
        float: left;
        padding: 3px 10px;
        border: 1px solid #282828;
        border-radius: 30px;
        cursor: pointer;
      }
      li.on{
        border: 1px solid #FFD200; color: #FFD200;
      }
    }
  }
  .navCen:nth-of-type(2) {
    border-bottom: 1px solid #1E1D1B;
  }
}
.uiDckList{
  ul{
    li{
      float: left;
      width: 215px; margin-right: 65px; margin-bottom: 30px;
      background-color: #282828; border-radius: 6px; transition: transform 0.25s ease;
      .uiDckListAll{
        .uiDckListImg{
          position: relative; display: block; width: 100%; height: 150px;
          img{ width: 100%; height: 100%; border-radius: 6px 6px 0 0;}
          span{
            position: absolute; right: 10px; bottom: 10px; padding: 3px 10px; background-color: rgba(0,0,0,.5); color: #fff; border-radius: 6px;
          }
        }
        .uiDckListTitle{
          display: block; width: 90%; margin: 16px auto 0; color: #FAFAFA;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .uiDckListTitle:hover{ color: #FFD200;}
        .uiDckListDetail{
          width: 90%; margin: 0 auto; padding: 16px 0; overflow: hidden; color: #979A9A;
        }
      }
    }
    li:hover{
      transform: scale(1.06,1.06)
    }
  }
}
.Search::-webkit-scrollbar {
  width: 8px;
  height: 1px;
}
.Search::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: #979A9A;
}
.Search::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: #1E1D1B;
}
.nullDiv{
  .nullTop{
    font-size: 14px; color: #D8D8D8; text-align: center;
    img{ display: inline-block; width: 70px; height: 62px;}
    p{
      margin-top: 16px;
    }
  }
  .listNull{}
}
</style>
