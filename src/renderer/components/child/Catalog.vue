<template>
  <div class="Catalog">
    <div class="listCat">
      <div v-if="newState" v-for='(data, index) in ctgList' :key="data.id" class="listIntrod">
        <h5 class="listIntrodTitle">{{data.title}}</h5>
        <div v-for='(item, org) in data.items' :key='item.id' class="introdList clearfix">
          <div class="introdDetail clearfix" @click="videoDetail(index, item.method, org)" v-bind:class='{on:item.state}'>
            <strong>{{item.detail}}</strong>
            <span v-if="item.label" @click="listDetail(index, org)">[{{item.label}}]</span>
          </div>
          <div class="contDetail" v-if="item.dpy">
            <div class="contTitl">练习题 <span @click="dtlHide(index, org)">收起</span></div>
            <div class="contList">
              <div v-for='(itemNew, num) in item.conList' :key='itemNew.id' @click="detailVideo(index, itemNew.link, num)" v-bind:class='{on:itemNew.state}' class="contListDiv">
                {{itemNew.title}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="listCatCen" v-for="(data,index) in catalogList" :key='data.id' v-bind:class='{on:index==sty}' @click="videoDetail(one, data.method, index)" v-if="!newState">
        <div>
          <h3>{{index+1}}、{{data.title}}</h3>
          <p class="clearfix">
            <span class="fl">浏览数：{{data.number}}</span>
            <span class="fr">时长：{{data.time}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Catalog',
  data () {
    return {
      newState: false,
      catalogList: [],
      ctgList: [],
      sty: 0
    }
  },
  created () {
    var _this = this
    if (_this.$route.query.Introduction === '1') {
      _this.newState = true
      axios.get('/static/json/catalogList1.json')
        .then(function (res) {
          if (res.data.ctgList.length === 0) {
            _this.$emit('tabList', false)
          } else {
            _this.ctgList = res.data.ctgList
          }
        }).catch(function (error) {
          console.log(error)
        })
    } else {
      _this.newState = false
      axios.get('/static/json/catalogList.json')
        .then(function (res) {
          if (res.data.catalogList.length === 0) {
            _this.$emit('tabList', false)
          } else {
            _this.catalogList = res.data.catalogList
          }
        }).catch(function (error) {
          console.log(error)
        })
    }
  },
  methods: {
    videoDetail (index, mtd, num) {
      if (this.$route.query.Introduction === '1') {
        for (var q = 0; q < this.ctgList.length; q++) {
          for (var e = 0; e < this.ctgList[q].items.length; e++) {
            this.ctgList[q].items[e].state = false
          }
        }
        this.ctgList[index].items.filter(function (v, i) {
          if (i === num) {
            v.state = true
          } else {
            v.state = false
          }
        })
        this.$emit('vdl', mtd)
      } else {
        this.sty = num
        this.$emit('vdl', mtd)
      }
    },
    detailVideo (index, mtd, num) {
      var that = this
      for (var q = 0; q < that.ctgList[index].items.length; q++) {
        that.ctgList[index].items[q].conList.filter(function (y, u) {
          if (u === num) {
            y.state = true
          } else {
            y.state = false
          }
        })
      }
      that.$emit('vdl', mtd)
    },
    listDetail (index, org) {
      var that = this
      for (var q = 0; q < that.ctgList.length; q++) {
        for (var e = 0; e < that.ctgList[q].items.length; e++) {
          that.ctgList[q].items[e].dpy = false
        }
      }
      that.ctgList[index].items.filter(function (v, i) {
        if (i === org) {
          v.dpy = true
        } else {
          v.dpy = false
        }
      })
    },
    dtlHide (index, org) {
      this.ctgList[index].items.filter(function (v, i) {
        v.dpy = false
      })
    }
  }
}
</script>
<style scoped lang="less">
.Catalog{
  .listIntrod{
    .listIntrodTitle{ width: 92%; margin: 8px auto; height: 22px; line-height: 22px; font-size: 16px; color: #fafafa; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
    .introdList{
      line-height: 36px; font-size: 14px; color: #979A9A;
      .introdDetail{
        width: 100%; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; cursor: pointer;
        strong{ float: left; width: 200px; margin-left: 6%;}
        span{ float: right; margin-right: 4%; color: #fafafa; cursor: pointer;}
      }
      .introdDetail:hover,.introdDetail.on{
        background-color: #1E1D1B; color: #FFD200;
      }
      .contDetail{
        position: absolute; left: 0; top: 60px; width: 300px; height: calc(100% - 130px); overflow: hidden; background-color: #282828; z-index: 11;
        .contTitl{
          height: 38px; line-height: 38px; margin-top: 8px; padding: 0 6%; font-size: 16px; color: #fafafa; overflow: hidden;
          span{ float: right; cursor: pointer;}
        }
        .contList{
          height: calc(100% - 50px); overflow-y: auto;
          .contListDiv{ padding: 0 8%; cursor: pointer;}
          .contListDiv:hover,.contListDiv.on{ background-color: #1E1D1B; color: #FFD200;}
        }
        .contList::-webkit-scrollbar {
          width: 9px;
          height: 1px;
        }
        .contList::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background: #979A9A;
        }
        .contList::-webkit-scrollbar-track {
          border-radius: 10px;
          background: #282828;
        }
      }
    }
  }
  .listCat{
    .listCatCen{
      display: block; width: 100%; color: #979A9A;
      div{
        width: 92%; margin: 0 auto; padding: 12px 0; border-bottom: 1px solid #1E1D1B; cursor: pointer;
        h3{
          width: 100%; padding-bottom: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 14px;
        }
        p{
          span{}
        }
      }
    }
    .listCatCen:hover,.listCatCen.on{
      background-color: #1E1D1B;
      h3{ color: #FFD200;}
    }
  }
}
</style>
