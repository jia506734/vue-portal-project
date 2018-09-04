<template>
    <div>
         <el-form :model="ruleFormcharge" :rules="rulescharge" ref="ruleFormcharge" label-width="100px" class="demo-ruleFormcharge">
            <el-form-item label="出团时间" prop="weeks">
                <el-checkbox-group v-model="ruleFormcharge.weeks">
                    <el-checkbox label="周一"></el-checkbox>
                    <el-checkbox label="周二"></el-checkbox>
                    <el-checkbox label="周三"></el-checkbox>
                    <el-checkbox label="周四"></el-checkbox>
                    <el-checkbox label="周五"></el-checkbox>
                    <el-checkbox label="周六"></el-checkbox>
                    <el-checkbox label="周日"></el-checkbox>
                </el-checkbox-group>
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
                    <div>2018年6月</div>
                    <div>
                        <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                            <el-table-column prop="Sun" label="日"></el-table-column>
                            <el-table-column prop="Mon" label="一" ></el-table-column>
                            <el-table-column prop="Tues" label="二" ></el-table-column>
                            <el-table-column prop="Wed" label="三" ></el-table-column>
                            <el-table-column prop="Thur" label="四" ></el-table-column>
                            <el-table-column prop="Fri" label="五" ></el-table-column>
                            <el-table-column prop="Sat" label="六" ></el-table-column>
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
                ruleFormcharge:{
                    lineAdultPrice:'',
                    lineChildPrice:'',
                    lineClubPrice:'',
                    linePeerPrice:'',
                    weeks:[],
                    lineStartDate:'2018-05-05',
                    lineEndDate:'2018-05-25'
                },
                rulescharge:{
                    weeks: [
                        { type: 'array', required: true, message: '请至少选择一个出团时间', trigger: 'change' }
                    ],
                },
                tableData:[
                    {Sun:'',Mon:'1',Tues:'2',Wed:'3',Thur:'4',Fri:'5',Sat:'6'},
                ],
            }
        },
        computed:{
            ...mapState(["tenantId",'lineId']),
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
                return dayNum.join(',');
            },
            //应用价格
            applyCharge(){
                debugger
                let postData = this.ruleFormcharge;
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
                            _this.$store.state.lineId = res.data.data.lineId;
                        }
                    })
                }
            },
            //清除价格
            clearCharge(){
                this.ruleFormcharge.weeks=[];
            },
        },


        
    }
</script>
<style scoped>
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
        width:100%;
        height:500px;
        background:#ddd;
        margin-left: 20px;
        margin-top: 20px;
    }
    .demo-ruleFormcharge .el-input--small{
        width: 20%;
    }
</style>