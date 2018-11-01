<template>
  <div class="Uidck allWidth">
    <p style="color: #fff;">{{uiLabel}}</p>
    <div class="spanAct"><span v-for='(item,index) in condition' :value="item.identity">{{item.name}} <i @click="delFn(index)">×</i></span></div>
    <div class="nav">
      <div class="navCen" v-for='(data, index) in category' :key="data.id">
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
    <div class="uiDckList">
      <ul class="clearfix">
        <li v-for="data in uiDckListLi">
          <div class="uiDckListAll">
            <a href="javascript:;" class="uiDckListImg" @click="linkAll(data.soId)" target="_play">
              <img v-bind:src="data.src"/>
              <span>{{data.time}}</span>
            </a>
            <a href="javascript:;" class="uiDckListTitle" @click="linkAll(data.soId)" target="_play">{{data.title}}</a>
            <p class="uiDckListDetail">
              <span class="fl">{{data.label}}</span>
              <span class="fr">{{data.number}}人已学</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
var ipcRenderer = require('electron').ipcRenderer
export default {
  name: 'Uidck',
  data () {
    return {
      uiDckListLi: [],
      page: 1,
      category: [],
      sel: [],
      condition: []
    }
  },
  created () {
    var _this = this
    axios.get('/static/json/uiDckTab.json')
      .then(function (response) {
        _this.category = response.data.category
        _this.category[1].items.filter(function (v, i) {
          if (_this.uiLabel === '') {
            _this.category[1].items[0].active = true
          } else {
            if (_this.uiLabel === _this.category[1].items[i].name) {
              v.active = true
            } else {
              v.active = false
            }
          }
        })
      }).catch(function (error) {
        console.log(error)
      })
  },
  props: {
    uiLabel: ''
  },
  methods: {
    navLab: function (index, key) {
      var item = this.category[index].items
      var that = this
      item.filter(function (v, i) {
        console.log(i)
        if (i === key) {
          v.active = true
          if (item[i].identity > 1) {
            if (item[i].name === '全部') {
              that.condition.filter(function (v2, q) {
                if (v.identity === v2.identity) {
                  that.condition.splice(q, 1)
                }
              })
            } else {
              that.condition.filter(function (v2, q) {
                if (v.name === v2.name) {
                  that.condition.splice(q, 1)
                }
              })
              if (that.condition.length > 0) {
                for (var b = 0; b < that.condition.length; b++) {
                  if (that.condition[b].identity === index) {
                    that.condition.splice(b, 1)
                  }
                }
              }
              that.condition.push({name: item[i].name, identity: item[i].identity})
            }
          }
        } else {
          v.active = false
        }
      })
    },
    delFn (index) {
      var that = this
      var item = that.condition
      var items = that.category
      items.filter(function (v, i) {
        var items1 = items[i].items
        items1.filter(function (v1, i1) {
          if (items1[i1].identity === item[index].identity) {
            items1[i1].active = false
            if (items1[i1].name === '全部') {
              items1[i1].active = true
            }
          }
        })
      })
      that.condition.splice(index, 1)
    },
    select: function (index, i, j) {
      var _this = this
      _this.sel[i] = j
      _this.$set(_this.sel, i, j)
    },
    getPage (page) {
      var _this = this
      axios.get('/static/json/uiDckList.json')
        .then(function (response) {
          _this.uiDckListLi = response.data.uiDckListLi
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
  },
  mounted () {
    this.getPage(this.page)
    this.select(this.index, this.ind)
  }
}
</script>

<style lang="less" scoped>
.Uidck{
  position: relative;
  padding: 30px 0;
  .spanAct{
    position: absolute; left: 300px; top: 56px; color: #fff; z-index: 6;
    span{
      padding: 0 10px; border: 1px solid #FFD200; color: #FFD200; border-radius: 100px;
      i{
        display: inline-block; cursor: pointer; color: #fff;
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
    margin-right: -20px;
    ul{
      li{
        float: left;
        width: 188px; margin-right: 20px; margin-bottom: 30px;
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
}
</style>
