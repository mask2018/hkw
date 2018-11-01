<template>
  <div class="Load">
    <div class="LoadTab">
      <div class="LoadCell">
        <div class="LoadCont">
            <div class="spinner-container container1">
              <div class="circle1"></div>
              <div class="circle2"></div>
              <div class="circle3"></div>
              <div class="circle4"></div>
            </div>
            <div class="spinner-container container2">
              <div class="circle1"></div>
              <div class="circle2"></div>
              <div class="circle3"></div>
              <div class="circle4"></div>
            </div>
            <div class="spinner-container container3">
              <div class="circle1"></div>
              <div class="circle2"></div>
              <div class="circle3"></div>
              <div class="circle4"></div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Load',
  props: {},
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.Load{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
  z-index: 100;
  .LoadTab {
    display: table;
    width: 100%;
    height: 100%;
    .LoadCell{
      display: table-cell;
      width: 100%;
      height: 100%;
      vertical-align: middle;
      padding: 10px;
      .LoadCont{
        position: relative;
        width: 60px;
        height: 60px;
        margin: 0 auto;
        color: #fff;
        .spinner-container {
          position: absolute;
          width: 100%;
          height: 100%;
          div{
            width: 13px;
            height: 13px;
            background-color: #fff;
            border-radius: 100%;
            position: absolute;
            -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
            -ms-animation: bouncedelay 1.2s infinite ease-in-out;
            -moz-animation: bouncedelay 1.2s infinite ease-in-out;
            -o-animation: bouncedelay 1.2s infinite ease-in-out;
            animation: bouncedelay 1.2s infinite ease-in-out;
            -webkit-animation-fill-mode: both;
            -moz-animation-fill-mode: both;
            -o-animation-fill-mode: both;
            -ms-animation-fill-mode: both;
            animation-fill-mode: both;
          }
          .circle1 { top: 0; left: 0; }
          .circle2 { top: 0; right: 0; }
          .circle3 { right: 0; bottom: 0; }
          .circle4 { left: 0; bottom: 0; }
        }
        .container2 {
          -webkit-transform: rotateZ(45deg);
          -moz-transform: rotateZ(45deg);
          -o-transform: rotateZ(45deg);
          -ms-transform: rotateZ(45deg);
          transform: rotateZ(45deg);
          .circle1 {
            -webkit-animation-delay: -1.1s;
            -moz-animation-delay: -1.1s;
            -o-animation-delay: -1.1s;
            -ms-animation-delay: -1.1s;
            animation-delay: -1.1s;
          }
          .circle2 {
             -webkit-animation-delay: -0.8s;
             -moz-animation-delay: -0.8s;
             -o-animation-delay: -0.8s;
             -ms-animation-delay: -0.8s;
             animation-delay: -0.8s;
           }
          .circle3 {
            -webkit-animation-delay: -0.5s;
            -moz-animation-delay: -0.5s;
            -o-animation-delay: -0.5s;
            -ms-animation-delay: -0.5s;
            animation-delay: -0.5s;
          }
          .circle4 {
            -webkit-animation-delay: -0.2s;
            -moz-animation-delay: -0.2s;
            -ms-animation-delay: -0.2s;
            -o-animation-delay: -0.2s;
            animation-delay: -0.2s;
          }
        }
        .container3 {
          -webkit-transform: rotateZ(90deg);
          -moz-transform: rotateZ(90deg);
          -o-transform: rotateZ(90deg);
          -ms-transform: rotateZ(90deg);
          transform: rotateZ(90deg);
          .circle1 {
            -webkit-animation-delay: -1.0s;
            -moz-animation-delay: -1.0s;
            -o-animation-delay: -1.0s;
            -ms-animation-delay: -1.0s;
            animation-delay: -1.0s;
          }
          .circle2 {
            -webkit-animation-delay: -0.7s;
            -moz-animation-delay: -0.7s;
            -o-animation-delay: -0.7s;
            -ms-animation-delay: -0.7s;
            animation-delay: -0.7s;
          }
          .circle3 {
            -webkit-animation-delay: -0.4s;
            -moz-animation-delay: -0.4s;
            -ms-animation-delay: -0.4s;
            -o-animation-delay: -0.4s;
            animation-delay: -0.4s;
          }
          .circle4 {
            -webkit-animation-delay: -0.1s;
            -moz-animation-delay: -0.1s;
            -ms-animation-delay: -0.1s;
            -o-animation-delay: -0.1s;
            animation-delay: -0.1s;
          }
        }
        .container1 {
          .circle2 {
            -webkit-animation-delay: -0.9s;
            -moz-animation-delay: -0.9s;
            -o-animation-delay: -0.9s;
            -ms-animation-delay: -0.9s;
            animation-delay: -0.9s;
          }
          .circle3 {
            -webkit-animation-delay: -0.6s;
            -moz-animation-delay: -0.6s;
            -o-animation-delay: -0.6s;
            -ms-animation-delay: -0.6s;
            animation-delay: -0.6s;
          }
          .circle4 {
            -webkit-animation-delay: -0.3s;
            -moz-animation-delay: -0.3s;
            -ms-animation-delay: -0.3s;
            -o-animation-delay: -0.3s;
            animation-delay: -0.3s;
          }
        }
        @-webkit-keyframes bouncedelay {
          0%, 80%, 100% {
            -webkit-transform: scale(0.0);
            -moz-transform: scale(0.0);
            -ms-transform: scale(0.0);
            -o-transform: scale(0.0);
          }
          40% {
            -webkit-transform: scale(1.0);
            -moz-transform: scale(1.0);
            -ms-transform: scale(1.0);
            -o-transform: scale(1.0);
          }
        }
        @-moz-keyframes bouncedelay {
          0%, 80%, 100% {
            -webkit-transform: scale(0.0);
            -moz-transform: scale(0.0);
            -ms-transform: scale(0.0);
            -o-transform: scale(0.0);
          }
          40% {
            -webkit-transform: scale(1.0);
            -moz-transform: scale(1.0);
            -ms-transform: scale(1.0);
            -o-transform: scale(1.0);
          }
        }
        @-ms-keyframes bouncedelay {
          0%, 80%, 100% {
            -webkit-transform: scale(0.0);
            -moz-transform: scale(0.0);
            -ms-transform: scale(0.0);
            -o-transform: scale(0.0);
          }
          40% {
            -webkit-transform: scale(1.0);
            -moz-transform: scale(1.0);
            -ms-transform: scale(1.0);
            -o-transform: scale(1.0);
          }
        }
        @-o-keyframes bouncedelay {
          0%, 80%, 100% {
            -webkit-transform: scale(0.0);
            -moz-transform: scale(0.0);
            -ms-transform: scale(0.0);
            -o-transform: scale(0.0);
          }
          40% {
            -webkit-transform: scale(1.0);
            -moz-transform: scale(1.0);
            -ms-transform: scale(1.0);
            -o-transform: scale(1.0);
          }
        }
        @keyframes bouncedelay {
          0%, 80%, 100% {
            transform: scale(0.0);
            -webkit-transform: scale(0.0);
            -moz-transform: scale(0.0);
            -ms-transform: scale(0.0);
            -o-transform: scale(0.0);
          }
          40% {
              transform: scale(1.0);
              -webkit-transform: scale(1.0);
              -moz-transform: scale(1.0);
              -ms-transform: scale(1.0);
              -o-transform: scale(1.0);
            }
        }
      }
    }
  }
}
</style>
