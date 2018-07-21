<template>
  <div style="height:100%;">
    <div class="route-manage" >
      <span class="route-manage-top">线路管理</span>
    </div>
    <div class="operate-button">
      <el-button type="primary" @click="toNewRoute" >新建线路</el-button>
      <!-- <router-link to="toNewRoute">
        <el-button type="primary" >新建线路</el-button>
      </router-link> -->
      <el-button type="danger">删除线路</el-button>
      <el-input style="width:250px;margin-right:20px" placeholder="请输入线路名称" suffix-icon="el-icon-search" 
            v-model="input21"> </el-input>
    </div>
      
    <div class="tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的" name="my">
          <common-route :type="tabName"></common-route>
        </el-tab-pane>
        <el-tab-pane label="同业" name="trade">
          <common-route :type="tabName"></common-route>
        </el-tab-pane>
        <el-tab-pane label="网店" name="store">
          <common-route :type="tabName"></common-route>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import commonRoute from '../common/commonRoute'
import route from '../../router'
export default {
  data(){
    return{
      activeName:'my',
      tabName:"my",
      input21:'',
    }
  },
    components:{
      commonRoute,
  },
  methods:{
      handleClick(tab, event) {
        this.tabName =this.activeName
      },
      toNewRoute(){
        this.$router.push('/newRoute')
      },
  },
}
</script>

<style scoped>
  .route-manage{
    width:100%;
    height:40px;
    background:#ddd;
    margin-top: 15px;
  }

  .route-manage-top{
    margin-left: 20px;
    line-height: 40px;
  }
  .operate-button{
    margin: 15px;
  }
  .operate-button button{
    width: 110px;
  }
  .tabs{
    padding-left: 15px;
  }
</style>


