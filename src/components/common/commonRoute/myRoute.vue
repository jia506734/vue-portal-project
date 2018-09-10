<template>
    <div>
        <div style="margin-top:15px;">
          <el-table
            :border ='showBorder'
            ref="multipleTable"
            :data="routeData"
            tooltip-effect="dark"
            style="width: 100%" 
             @selection-change="handleSelectionChange">
            <el-table-column type="selection"  width="55" style="text-align:center"> </el-table-column>
            <el-table-column
              label="我的操作"
              width="180">
              <template slot-scope="scope">
                  <el-button  size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button  size="mini" type="success" @click="handleDelete(scope.$index, scope.row)">上架</el-button>
                  <el-button  size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">下架</el-button>
              </template>
            </el-table-column>
            <el-table-column label="线路名称">
                <template slot-scope="scope"><span @click="showRouteDetail(scope.row)" class="route-name">{{ scope.row.lineName}}</span></template>
            </el-table-column>
            <el-table-column label="线路国内海外">
                <template slot-scope="scope"><span>{{ getdic(scope.row.lineRange) }}</span></template>
            </el-table-column>
            <el-table-column label="出行方式" width="140">
                <template slot-scope="scope"><span>{{ getway(scope.row.lineTravelWay) }}</span></template>
            </el-table-column>
            <el-table-column label="线路主题" width="140">
                <template slot-scope="scope"><span>{{ gettheme(scope.row.lineTheme) }}</span></template>
            </el-table-column>
            <el-table-column prop="lineOrigin" label="出发起始地"></el-table-column>
            <el-table-column prop="lineDestination" label="目的地"></el-table-column>
            <el-table-column prop="lineEnter" label="线路录入人"></el-table-column>
            <el-table-column prop="lineServiceTel" label="客服电话"></el-table-column>
            <el-table-column label="线路状态">
               <template slot-scope="scope"><span >{{ getstate(scope.row.lineStatus) }}</span></template>
            </el-table-column>
            <el-table-column prop="lineDay" label="几天"></el-table-column>
            <el-table-column prop="lineNight" label="几夜"></el-table-column>
            <el-table-column prop="lineNotice" label="注意事项"></el-table-column>
            <el-table-column prop="lineSignUpInfo" label="报名须知"></el-table-column>
            <el-table-column prop="lineUnsubscribeEnsure" label="退订保证"></el-table-column>
          </el-table>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import axios from "axios"
export default {
  data(){
    return{
      showBorder:true,
      routeData: [],
      multipleSelection: []
    }
  },
  created(){
       this.getRouteData();
  },
  computed:{
  ...mapState(["tenantId","lineId",'lineCreate']),
  },
  methods:{
    deleteRoute(){
        let _this =this;
        if( this.multipleSelection.length==0){
            this.$notify({
                duration: 2000,
                message: '请至少选择一条线路',
                type: 'warning'
            });
        }else{
            //执行删除
            this.$confirm('确认删除？')
                .then(_ => {
                let param =[];
                this.multipleSelection.forEach(element => {                    
                    param.push({lineId:element.lineId});
                });
                axios
                .delete("http://www.hctx365.cn/line/baseinfo",{data: param})
                .then(function(response){
                    if(response.data.success){
                        _this.$notify({                     
                            duration:2000,
                            message: response.data.message,
                            type: 'success'
                        });
                        _this.getRouteData();
                    }
                })
            },() => {})
        }
    },
    //点击进入线路详情
    showRouteDetail(row){
        this.$router.push('showRouteDetail');
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    getdic(type){
        if(type==1){
            return '海外'
        }else{
            return '国内'
        }
    },
    getstate(type){
        if(type==1){
            return '上架'
        }else{
            return '下架'
        }
    },
    getway(ways){
        let traval = ways.split(',');
        let travalWays=[];
        traval.forEach(function(item){
            if(item==0){
                travalWays.push('自驾游');
            }else if(item==1){
                travalWays.push('房车自驾');
            }else if(item==2){
                travalWays.push('拼车自驾');
            }else if(item==3){
                travalWays.push('海外自驾');
            }else if(item==4){
                travalWays.push('海外包车');
            }else if(item==5){
                travalWays.push('海外大巴');
            }
        });
        return travalWays.join(',');
    },
    gettheme(theme){
        let traval = theme.split(',');
        let travalWays=[];
        traval.forEach(function(item){
            if(item==0){
                travalWays.push('亲子游');
            }else if(item==1){
                travalWays.push('森林探险');
            }else if(item==2){
                travalWays.push('高山滑雪');
            }else if(item==3){
                travalWays.push('活动赛事');
            }else if(item==4){
                travalWays.push('摄影风采');
            }else if(item==5){
                travalWays.push('民族古镇');
            }
        });
        return travalWays.join(',');
    },
    //制定查询线路
    searchRoute(name){
        let _this = this;
        axios
        .get("http://www.hctx365.cn/line/baseinfo?lineTenantId="+this.$store.state.tenantId+"&lineName="+name)
        .then(res=>{
            if(res.data.success){
                _this.routeData =  res.data.data;
            }
        })
    },
    getRouteData(){
        let _this = this;
        axios
        .get("http://www.hctx365.cn/line/baseinfo?lineTenantId="+this.$store.state.tenantId)
        .then(res=>{
            if(res.data.success){
                _this.routeData =  res.data.data;
            }
        })
      },
      handleEdit(index, row){
          this.$store.state.lineId = row.lineId;
          this.$store.state.lineCreate = false;
          this.$router.push({
              path: '/newRoute',
              query: {
                lineId: row.lineId
              }
            });
      },
      handleDelete(index, row) {
        console.log(index, row);
     }
  },
  watch:{
      // type(){
      //     let aa = this.type;
      // }
  },
}

</script>

<style>
    .el-table th{
        text-align: center !important;
    }
    .el-table .cell{
        text-align: center;
    }
</style>

<style scoped>
    .route-name {
        cursor: pointer;
        color:#4D88BB;
    }
    .el-button--mini, .el-button--mini.is-round{
        padding: 5px 9px !important;
    }

</style>



