<template>
  <div style="height:100%;">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我的" name="my">
        <common-route :type="activeName"></common-route>
      </el-tab-pane>
      <el-tab-pane label="同业" name="trade">
        <common-route :type="activeName"></common-route>
      </el-tab-pane>
      <el-tab-pane label="网店" name="store">
        <common-route :type="activeName"></common-route>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import commonRoute from '../common/commonRoute'
export default {
  data(){
    return{
      activeName:'my',
    }
  },
    components:{
      commonRoute,
  },
  methods:{
      handleClick(tab, event) {
        if(this.activeName=="my"){
          
        }else if(this.activeName=="trade"){

        }else if(this.activeName=="store"){

        }
      }
  },
}
</script>

