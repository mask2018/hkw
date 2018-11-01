<template>
  <div class="Index allWidth">
    <RecVideo></RecVideo>
    <NewVideo></NewVideo>
    <SoftVideo></SoftVideo>
    <Photography></Photography>
    <UiDesign></UiDesign>
    <Course></Course>
  </div>
</template>

<script>
import NewVideo from './index/NewVideo'
import RecVideo from './index/RecVideo'
import SoftVideo from './index/SoftVideo'
import Photography from './index/Photography'
import UiDesign from './index/UiDesign'
import Course from './index/Course'
export default {
  name: 'Index',
  data () {
    return {
    }
  },
  components: {
    NewVideo,
    RecVideo,
    SoftVideo,
    Photography,
    Course,
    UiDesign
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="less">
.bgColor1{ background-color: #b062a3;} // 精修
.bgColor2{ background-color: #494166;} // 摄影
.bgColor3{ background-color: #74c4c4;} // 室内
.bgColor4{ background-color: #ea5541;} // 插画
.bgColor5{ background-color: #eb4c8c;} // ui设计
.bgColor6{ background-color: #F5C607;} // 字体
.bgColor7{ background-color: #fbb03b;} // 海外
.bgColor8{ background-color: #FF7C00;} // 软件
.bgColor9{ background-color: #6EBD6B;} // 综合
.bgColor10{ background-color: #40B0FF;} // 海报
.bgColor11{ background-color: #00a2b9;} // 品牌
.bgColor12{ background-color: #00528E;} // 职业
.bgColor13{ background-color: #367DD5;} // C4D
.bgColor14{ background-color: #00A99D;} // 合成
.bgColor15{ background-color: #7e57c2;} // 办公
.bgColor16{ background-color: #d49688;} // 影视
.bgColor17{ background-color: #ccb374;} // 人像
.bgColor18{ background-color: #617f74;} // 店铺
.comIndexTitle{
  position: relative; padding: 20px 0 12px; height: 18px; margin-left: 5px; color: #fff;
  span{ margin-left: 20px; font-size: 12px; color: #D8D8D8; cursor: pointer;}
  .comChange{
    i{
      display: inline-block;
      position: relative; width: 16px; height: 16px; margin-right: 5px; margin-top: -2px;
      border-radius: 50%; border-width: 2px; border-style: solid;
      color: #D8D8D8; opacity: 0.6; box-sizing: border-box; vertical-align: middle;
    }
    i:before{
      content: '';
      position: absolute; right: -7px; top: 0;
      width: 0; height: 0; border-width: 4px; border-style: solid;
      border-right-color: transparent; border-left-color: transparent; border-bottom-color: transparent;
      -webkit-transform: rotate(-53deg); transform: rotate(-53deg); z-index: 3; pointer-events: none;
    }
    i:after{
      content: '';
      position: absolute; right: -2px; top: 2px; width: 6px; height: 6px;
      background-color: #1E1D1B; pointer-events: none;
    }
  }
  .comChange:hover,a:hover,.comChange:hover i{ color: #FFD200; opacity: 1;}
  a{
    position: absolute; right: 0; top: 20px; font-size: 12px; color: #fff;
  }
}
.comPaMore{
  position: absolute; left: 0; top: 5px;
  width: 188px; height: 176px; overflow: hidden; border-radius: 5px;
  .spare{
    height: 100%;
    position: relative;
    transition: opacity .2s;
    .sp1{
      position: absolute; left: 10px; top: -25px; width: 120px; height: 20px;
      border-radius: 10px; background: rgba(255,255,255,.25);
      -webkit-transform: rotate(-45deg); transform: rotate(-45deg);
    }
    .sp2{
      position: absolute; left: 140px; top: -10px; width: 100px; height: 40px;
      border-radius: 20px; background: rgba(0,0,0,.05);
      -webkit-transform: rotate(-45deg); transform: rotate(-45deg);
    }
    .sp3{
      position: absolute; left: 146px; top: 16px; width: 100px; height: 40px;
      border-radius: 20px; background: rgba(255,255,255,.25);
      -webkit-transform: rotate(-45deg); transform: rotate(-45deg);
    }
    .sp4{
      position: absolute; left: -66px; top: 180px; width: 120px; height: 20px;
      border-radius: 10px; background: rgba(0,0,0,.05);
      -webkit-transform: rotate(-45deg); transform: rotate(-45deg);
    }
    .sp5{
      position: absolute; right: -70px; bottom: -98px; width: 150px; height: 150px;
      border-radius: 50%; background: rgba(255,255,255,.25);
    }
    .sp6{
      position: absolute; left: -59px; top: -129px; width: 260px; height: 260px;
      border-radius: 50%; background: linear-gradient(45deg,rgba(0,0,0,0),rgba(0,0,0,.5)); opacity: .1;
    }
  }
  .comPaConnect{
    position: absolute; left: 0; top: 0; width: 100%; height: 100%; color: #fff; text-align: center;
    strong,span{display: block;}
    strong{ padding: 50px 0 20px; font-size: 20px;}
    span{ font-size: 18px;}
  }
}
.indexList{
  height: 186px; overflow: hidden; margin-right: -20px;
  ul{
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
</style>
