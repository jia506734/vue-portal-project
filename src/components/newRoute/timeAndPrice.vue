<template>
    <div class="timeAndPrice">
         <el-form :model="ruleFormcharge" :rules="rulescharge" ref="ruleFormcharge" label-width="100px" class="demo-ruleFormcharge">
            <el-form-item label="出团时间" prop="weeks">
                <div>
                    <el-checkbox-group v-model="ruleFormcharge.weeks">
                    <el-checkbox label="周一"></el-checkbox>
                    <el-checkbox label="周二"></el-checkbox>
                    <el-checkbox label="周三"></el-checkbox>
                    <el-checkbox label="周四"></el-checkbox>
                    <el-checkbox label="周五"></el-checkbox>
                    <el-checkbox label="周六"></el-checkbox>
                    <el-checkbox label="周日"></el-checkbox>
                </el-checkbox-group>
                <el-checkbox label="全选/反选" v-model="selectAll" class="all-select" @change="selectChange"></el-checkbox>
                </div>
            </el-form-item>
            <el-form-item label="成人价" prop="lineAdultPrice  ">
                <el-input v-model="ruleFormcharge.lineAdultPrice  "></el-input>
            </el-form-item>
            <el-form-item label="儿童价" prop="lineChildPrice">
                <el-input v-model="ruleFormcharge.lineChildPrice"></el-input>
            </el-form-item>
            <el-form-item label="俱乐部价格" prop="lineClubPrice">
                <el-input v-model="ruleFormcharge.lineClubPrice"></el-input>
            </el-form-item>
            <el-form-item label="同行价格" prop="linePeerPrice">
                <el-input v-model="ruleFormcharge.linePeerPrice"></el-input>
            </el-form-item>
        </el-form>
        <div style="margin-left:20px">
            <el-button type="success" @click="applyCharge">应用价格</el-button>
            <el-button type="primary" @click="clearCharge">清除价格</el-button>
        </div>
        <div class="timeTable">
            <el-row>
                <el-col :span="24" class="tableleft">
                    <div>
                        <el-table
                            :data="priceTable"
                            border
                            style="width: 100%">
                            <el-table-column label="日">
                                 <template slot-scope="scope">
                                   <div style="font-size: 20px;text-align: left;">{{getDay(scope.row.Sun.linePriceDate)}}</div>
                                   <el-row style="margin-bottom: 3px">
                                     <el-col :span="12">成人价</el-col>
                                     <el-col :span="12"><el-input v-model="scope.row.Sun.lineAdultPrice"></el-input></el-col>
                                   </el-row>
                                   <el-row style="margin-bottom: 3px">
                                     <el-col :span="12">儿童价</el-col>
                                     <el-col :span="12"><el-input v-model="scope.row.Sun.lineChildPrice"></el-input></el-col>
                                   </el-row>
                                   <el-row style="margin-bottom: 3px">
                                     <el-col :span="12">俱乐部</el-col>
                                     <el-col :span="12"><el-input v-model="scope.row.Sun.lineClubPrice"></el-input></el-col>
                                   </el-row>
                                   <el-row style="margin-bottom: 3px">
                                     <el-col :span="12">同业价</el-col>
                                     <el-col :span="12"><el-input v-model="scope.row.Sun.linePeerPrice"></el-input></el-col>
                                   </el-row>
                                </template>
                            </el-table-column>
                            <el-table-column prop="Mon" label="一" >
                                <template slot-scope="scope">
                                  <div style="font-size: 20px;text-align: left;">{{getDay(scope.row.Mon.linePriceDate)}}</div>
                                   <el-row style="margin-bottom: 3px">
                                     <el-col :span="12">成人价</el-col>
                                     <el-col :span="12"><el-input v-model="scope.row.Mon.lineAdultPrice"></el-input></el-col>
                                   </el-row>
                                   <el-row style="margin-bottom: 3px">
                                     <el-col :span="12">儿童价</el-col>
                                     <el-col :span="12"><el-input v-model="scope.row.Mon.lineChildPrice"></el-input></el-col>
                                   </el-row>
                                   <el-row style="margin-bottom: 3px">
                                     <el-col :span="12">俱乐部</el-col>
                                     <el-col :span="12"><el-input v-model="scope.row.Mon.lineClubPrice"></el-input></el-col>
                                   </el-row>
                                   <el-row style="margin-bottom: 3px">
                                     <el-col :span="12">同业价</el-col>
                                     <el-col :span="12"><el-input v-model="scope.row.Mon.linePeerPrice"></el-input></el-col>
                                   </el-row>
                                </template>
                            </el-table-column>
                            <el-table-column prop="Tues" label="二" >
                                <template slot-scope="scope">
                                  <div style="font-size: 20px;text-align: left;">{{getDay(scope.row.Tues.linePriceDate)}}</div>
                                   <el-row style="margin-bottom: 3px">
                                     <el-col :span="12">成人价</el-col>
                                     <el-col :span="12"><el-input v-model="scope.row.Tues.lineAdultPrice"></el-input></el-col>
                                   </el-row>
                                   <el-row style="margin-bottom: 3px">
                                     <el-col :span="12">儿童价</el-col>
                                     <el-col :span="12"><el-input v-model="scope.row.Tues.lineChildPrice"></el-input></el-col>
                                   </el-row>
                                   <el-row style="margin-bottom: 3px">
                                     <el-col :span="12">俱乐部</el-col>
                                     <el-col :span="12"><el-input v-model="scope.row.Tues.lineClubPrice"></el-input></el-col>
                                   </el-row>
                                   <el-row style="margin-bottom: 3px">
                                     <el-col :span="12">同业价</el-col>
                                     <el-col :span="12"><el-input v-model="scope.row.Tues.linePeerPrice"></el-input></el-col>
                                   </el-row>
                                </template>
                            </el-table-column>
                            <el-table-column prop="Wed" label="三" >
                                <template slot-scope="scope">
                                  <div style="font-size: 20px;text-align: left;">{{getDay(scope.row.Wed.linePriceDate)}}</div>
                                   <el-row style="margin-bottom: 3px">
                                     <el-col :span="12">成人价</el-col>
                                     <el-col :span="12"><el-input v-model="scope.row.Wed.lineAdultPrice"></el-input></el-col>
                                   </el-row>
                                   <el-row style="margin-bottom: 3px">
                                     <el-col :span="12">儿童价</el-col>
                                     <el-col :span="12"><el-input v-model="scope.row.Wed.lineChildPrice"></el-input></el-col>
                                   </el-row>
                                   <el-row style="margin-bottom: 3px">
                                     <el-col :span="12">俱乐部</el-col>
                                     <el-col :span="12"><el-input v-model="scope.row.Wed.lineClubPrice"></el-input></el-col>
                                   </el-row>
                                   <el-row style="margin-bottom: 3px">
                                     <el-col :span="12">同业价</el-col>
                                     <el-col :span="12"><el-input v-model="scope.row.Wed.linePeerPrice"></el-input></el-col>
                                   </el-row>
                                </template>
                            </el-table-column>
                            <el-table-column prop="Thur" label="四" >
                                <template slot-scope="scope">
                                  <div style="font-size: 20px;text-align: left;">{{getDay(scope.row.Thur.linePriceDate)}}</div>
                                   <el-row style="margin-bottom: 3px">
                                     <el-col :span="12">成人价</el-col>
                                     <el-col :span="12"><el-input v-model="scope.row.Thur.lineAdultPrice"></el-input></el-col>
                                   </el-row>
                                   <el-row style="margin-bottom: 3px">
                                     <el-col :span="12">儿童价</el-col>
                                     <el-col :span="12"><el-input v-model="scope.row.Thur.lineChildPrice"></el-input></el-col>
                                   </el-row>
                                   <el-row style="margin-bottom: 3px">
                                     <el-col :span="12">俱乐部</el-col>
                                     <el-col :span="12"><el-input v-model="scope.row.Thur.lineClubPrice"></el-input></el-col>
                                   </el-row>
                                   <el-row style="margin-bottom: 3px">
                                     <el-col :span="12">同业价</el-col>
                                     <el-col :span="12"><el-input v-model="scope.row.Thur.linePeerPrice"></el-input></el-col>
                                   </el-row>
                                </template>
                            </el-table-column>
                            <el-table-column prop="Fri" label="五" >
                                <template slot-scope="scope">
                                  <div style="font-size: 20px;text-align: left;">{{getDay(scope.row.Fri.linePriceDate)}}</div>
                                   <el-row style="margin-bottom: 3px">
                                     <el-col :span="12">成人价</el-col>
                                     <el-col :span="12"><el-input v-model="scope.row.Fri.lineAdultPrice"></el-input></el-col>
                                   </el-row>
                                   <el-row style="margin-bottom: 3px">
                                     <el-col :span="12">儿童价</el-col>
                                     <el-col :span="12"><el-input v-model="scope.row.Fri.lineChildPrice"></el-input></el-col>
                                   </el-row>
                                   <el-row style="margin-bottom: 3px">
                                     <el-col :span="12">俱乐部</el-col>
                                     <el-col :span="12"><el-input v-model="scope.row.Fri.lineClubPrice"></el-input></el-col>
                                   </el-row>
                                   <el-row style="margin-bottom: 3px">
                                     <el-col :span="12">同业价</el-col>
                                     <el-col :span="12"><el-input v-model="scope.row.Fri.linePeerPrice"></el-input></el-col>
                                   </el-row>
                                </template>
                            </el-table-column>
                            <el-table-column prop="Sat" label="六" >
                                <template slot-scope="scope">
                                 <div style="font-size: 20px;text-align: left;">{{getDay(scope.row.Sat.linePriceDate)}}</div>
                                   <el-row style="margin-bottom: 3px">
                                     <el-col :span="12">成人价</el-col>
                                     <el-col :span="12"><el-input v-model="scope.row.Sat.lineAdultPrice"></el-input></el-col>
                                   </el-row>
                                   <el-row style="margin-bottom: 3px">
                                     <el-col :span="12">儿童价</el-col>
                                     <el-col :span="12"><el-input v-model="scope.row.Sat.lineChildPrice"></el-input></el-col>
                                   </el-row>
                                   <el-row style="margin-bottom: 3px">
                                     <el-col :span="12">俱乐部</el-col>
                                     <el-col :span="12"><el-input v-model="scope.row.Sat.lineClubPrice"></el-input></el-col>
                                   </el-row>
                                   <el-row style="margin-bottom: 3px">
                                     <el-col :span="12">同业价</el-col>
                                     <el-col :span="12"><el-input v-model="scope.row.Sat.linePeerPrice"></el-input></el-col>
                                   </el-row>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import axios from "axios"
    export default{
        data(){
            return{
                priceTable:[],
                selectAll:false,
                ruleFormcharge:{
                    lineAdultPrice:'',
                    lineChildPrice:'',
                    lineClubPrice:'',
                    linePeerPrice:'',
                    weeks:[],
                    lineStartDate:'2018-05-05',
                    lineEndDate:'2018-06-25'
                },
                rulescharge:{
                    weeks: [
                        { type: 'array', required: true, message: '请至少选择一个出团时间', trigger: 'change' }
                    ],
                },
            }
        },
        computed:{
            ...mapState(["tenantId",'lineId']),
        },
        created(){
            
        },
        methods:{
            getWeekNum(days){
                let dayNum =[];
                if(days.indexOf('周日')>-1){
                    dayNum.push(1);
                }
                if(days.indexOf('周一')>-1){
                    dayNum.push(2);
                }
                if(days.indexOf('周二')>-1){
                    dayNum.push(3);
                }
                if(days.indexOf('周三')>-1){
                    dayNum.push(4);
                }
                if(days.indexOf('周四')>-1){
                    dayNum.push(5);
                }
                if(days.indexOf('周五')>-1){
                    dayNum.push(6);
                }
                if(days.indexOf('周六')>-1){
                    dayNum.push(7);
                }
                return dayNum;
            },
            getDay(date){
              let day = date ? date.split('-')[2] : '';
              return day;
            },
            selectChange(){
                if(this.selectAll){
                    this.ruleFormcharge.weeks=["周一","周二","周三","周四","周五","周六","周日"];
                }else{
                    this.ruleFormcharge.weeks=[];
                }
            },
            //应用价格
            applyCharge(){
                this.priceTable = [];
                let week7=[],week1=[],week2=[],week3=[],week4=[],week5=[],week6=[],forEachData=[];
                let _this = this;
                let postData =JSON.parse(JSON.stringify(this.ruleFormcharge));
                postData.lineId = this.$store.state.lineId;
                postData.weeks = this.getWeekNum(postData.weeks);
                if(this.ruleFormcharge.weeks.length==0){
                    this.$notify({
                        duration:2000,
                        message: '请勾选出团时间',
                        type: 'warning'
                    });
                }else{
                    axios
                    .post("http://www.hctx365.cn/line/price",postData)
                    .then(res=>{
                        if(res.data.success){
                             _this.$notify({
                                duration:2000,
                                message: res.data.message,
                                type: 'success'
                            });
                            debugger
                            let resKeys =Object.keys(res.data.data);
                            let resValues =Object.values(res.data.data);
                            resValues.forEach(function(element,index){
                              if(resKeys[index]=='1'){week7= resValues[index];forEachData=resValues[index];}
                              if(resKeys[index]=='2'){week1= resValues[index];forEachData=resValues[index];}
                              if(resKeys[index]=='3'){week2= resValues[index];forEachData=resValues[index];}
                              if(resKeys[index]=='4'){week3= resValues[index];forEachData=resValues[index];}
                              if(resKeys[index]=='5'){week4= resValues[index];forEachData=resValues[index];}
                              if(resKeys[index]=='6'){week5= resValues[index];forEachData=resValues[index];}
                              if(resKeys[index]=='7'){week6= resValues[index];forEachData=resValues[index];}
                            })
                            // let arr = _this.priceTable;
                            debugger
                            forEachData.forEach(function(item, index){
                              _this.priceTable.push({
                                Sun:week7[index]?week7[index]:[],
                                Mon:week1[index]?week1[index]:[],
                                Tues:week2[index]?week2[index]:[],
                                Wed:week3[index]?week3[index]:[],
                                Thur:week4[index]?week4[index]:[],
                                Fri:week5[index]?week5[index]:[],
                                Sat:week6[index]?week6[index]:[]
                              })
                            })
                            console.log(_this.priceTable);
                        }
                    })
                }
            },
            //清除价格
            clearCharge(){
                this.selectAll = false;
                this.ruleFormcharge = {
                    lineAdultPrice:'',
                    lineChildPrice:'',
                    lineClubPrice:'',
                    linePeerPrice:'',
                    weeks:[],
                }
            },
        },


        
    }
</script>
<style>
    .timeAndPrice tbody td{
        height:100px;
    }
    .timeTable .el-input--small .el-input__inner{
      height: 17px !important;
    }
    .timeTable .el-table--border th{
      background: #ddd;
    }
    
</style>
<style scoped>
    .all-select{
        position: absolute;
        top: 0px;
        left: 600px;
        color: #4B88DD;
    }
    .tableDiv{
      border: 1px solid #ddd;
      height: 120%; 
    }
    .line{
        padding-left: 35px;
    }
    .tableright{
        margin-left: 50px;
        margin-top: 20px;
    }
    .tableleft{
        margin:15px;
    }
    .timeTable{
      width: 46%;
    }
    .demo-ruleFormcharge .el-input--small{
        width: 20%;
    }
</style>