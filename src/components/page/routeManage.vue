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
      <el-button type="danger" @click="deleteRoute">删除线路</el-button>
      <el-input style="width:250px;margin-right:20px" placeholder="请输入线路名称" suffix-icon="el-icon-search" v-model="input21"> </el-input>
      <el-button type="success" @click="searchRoute">查询</el-button>
    </div>
      
    <div class="tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的" name="my">
          <my-route ref="myroutemgt"></my-route>
        </el-tab-pane>
        <el-tab-pane label="同业" name="trade">
          <trade-route ref="traderoutemgt"></trade-route>
        </el-tab-pane>
        <el-tab-pane label="网店" name="store">
          <store-route ref="storeroutemgt"></store-route>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import myRoute from '../common/commonRoute/myRoute'
import storeRoute from '../common/commonRoute/storeRoute'
import tradeRoute from '../common/commonRoute/tradeRoute'
import route from '../../router'
import { mapState} from 'vuex'
// import axios from "axios"
export default {
  data(){
    return{
      activeName:'my',
      tabName:"my",
      input21:'',
      routeData:[],
    }
  },
    components:{
      myRoute,
      storeRoute,
      tradeRoute
  },
  computed:{
    ...mapState(["tenantId",'lineId','lineCreate']),
  },
  methods:{      
      deleteRoute(){
        if(this.activeName=="my"){
          this.$refs['myroutemgt'].deleteRoute();
        }
        
      },
      handleClick(tab, event) {
        
        if(this.activeName == '我的'){
          
        }
        if(this.activeName == '同业'){
          
        }
        if(this.activeName == '网店'){
          
        }
      },
      toNewRoute(){
        this.$store.state.lineCreate = true;
        this.$router.push('/newRoute');
      },
      searchRoute(){
        this.$refs['routemgt'].searchRoute(this.input21);
      }
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


