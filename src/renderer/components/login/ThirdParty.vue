<template>
  <div class="ThirdParty">
    <div class="ThirdPartyHead">
    </div>
    <div class='target'>
      <ThirdParty1></ThirdParty1>
    </div>
  </div>
</template>

<script>
import ThirdParty1 from '@/components/login/ThirdParty1'
const {webContents} = require('electron')
export default {
  name: 'ThirdParty',
  data () {
    return {
    }
  },
  created: function () {
    this.$emit('comHead', false)
    console.log(this.$route.query.newHre)
    console.log(webContents)
  },
  components: {
    ThirdParty1
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.ThirdParty{
  .ThirdPartyHead{ height: 60px; -webkit-app-region: drag; background-color: #23BF36;}
  .target{ height: 500px; background-color: #1296DB;}
}
</style>
