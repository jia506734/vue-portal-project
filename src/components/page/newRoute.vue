<template>
    <div style="width:100%">
        <div class="route-manage" >
            <span class="route-manage-top" v-if="lineCreate">{{nameCreate}}</span>
            <span class="route-manage-top" v-else>{{nameEdit}}</span>
        </div>
        <div class="tab-top">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick" :before-leave="beforeLeave">                
                <el-tab-pane label="基本信息" name="first">
                    <base-info ref="baseInfo" @next="next"></base-info>
                    <div style=" margin-top: -60px;text-align: center">
                        <el-button type="success" @click="submitForm('ruleForm')">保存并下一步</el-button>
                        <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="团期&报价" name="second">
                    <time-and-price></time-and-price>
                </el-tab-pane>
                <el-tab-pane label="线路详情" name="third">
                    <route-detail></route-detail>
                </el-tab-pane>
                <el-tab-pane label="目的地简介" name="fourth">
                    <destination></destination>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import baseInfo from '../newRoute/baseInfo'
import timeAndPrice from '../newRoute/timeAndPrice'
import routeDetail from '../newRoute/routeDetail'
import destination from '../newRoute/destination'
import { mapState} from 'vuex'
export default {
    data(){
        return{
            activeName: 'first',
            nameCreate:'线路管理 > 新建线路',
            nameEdit:'线路管理 > 编辑线路',
        }
    },
    components: {
        baseInfo,//基本信息
        timeAndPrice,//团期 价钱
        routeDetail,//线路详情
        destination
    },
    computed:{
        ...mapState(["tenantId",'lineId','lineCreate']),
    },
    methods: {
        submitForm(formName) {
            this.$refs['baseInfo'].saveBaseInfo();
        },
        next(){
            this.activeName="second"
        },

        resetForm(formName) {
            this.$refs['baseInfo'].resetFields();            
        },
        handleClick(tab, event) {
            
        },
        beforeLeave(){
            if(this.$store.state.lineId==""){
                 this.$notify({
                    duration:2000,
                    message: '请先填写基本信息',
                    type: 'warning'
                });
                return false;
            }else{
                return true;
            }
        },

    }
}
</script>


<style scoped>
    /*.limit {
        height: 30px;
        border: 1px solid #ccc;
        line-height: 30px;
        text-align: right;
    }
    .limit span {
        color: #ee2a7b;
    }*/
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
  .tab-top{
      margin-top: 10px;
      margin-left: 10px;
  }
</style>
