<template>
  <div style="height:100%;">
    <div class="route-manage" >
      <span class="route-manage-top">门票管理</span>
    </div>
    <div class="operate-button">
      <el-button >查询</el-button>  
      <el-button >重置</el-button>  
      <el-button type="primary" @click="toNewTicket" >新增</el-button>
      <el-button type="danger">删除</el-button>
      <!-- <el-input style="width:250px;margin-right:20px" placeholder="请输入线路名称" suffix-icon="el-icon-search" 
            v-model="input21"> </el-input> -->
        <div style="margin-top:20px">
            <div>
                <span>景区名称</span>
                <span ><el-input v-model="scenicName" style="width:200px"></el-input></span>
                <span style="padding-left:10px;">发布时间</span>
                <span> <el-date-picker v-model="releaseTimeF" type="date" placeholder="选择日期"></el-date-picker></span>
                <span>-</span>
                <span> <el-date-picker v-model="releaseTimeT" type="date" placeholder="选择日期"></el-date-picker></span>
                <span style="padding-left:10px;">状态</span>
                <span>
                    <el-select v-model="statevalue" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </span>
            </div>
        </div>
    </div>
      
    <div class="tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的" name="my">
          <common-ticket :type="tabName"></common-ticket>
        </el-tab-pane>
        <el-tab-pane label="同业" name="trade">
          <common-ticket :type="tabName"></common-ticket>
        </el-tab-pane>
        <el-tab-pane label="网店" name="store">
          <common-ticket :type="tabName"></common-ticket>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import commonTicket from '../common/commonTicket'
import route from '../../router'
export default {
  data(){
    return{
      scenicName:'',
      releaseTimeF:'',
      releaseTimeT:'',
      activeName:'my',
      tabName:"my",
      input21:'',
      statevalue:'',
      options: [{
          value: '私有',
          label: '私有'
        }, {
          value: '公有',
          label: '公有'
        }, {
          value: '下线',
          label: '下线'
        }],
    }
  },
    components:{
      commonTicket,
  },
  methods:{
      handleClick(tab, event) {
        this.tabName =this.activeName
      },
      toNewTicket(){
        this.$router.push('/newTicket')
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


