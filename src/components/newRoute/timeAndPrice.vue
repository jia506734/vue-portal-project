<template>
    <div>
         <el-form :model="ruleFormcharge" :rules="rulescharge" ref="ruleFormcharge" label-width="100px" class="demo-ruleFormcharge">
            <el-form-item label="线动时间" required>
                <el-col :span="6">
                <el-form-item prop="start">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleFormcharge.start" style="width: 100%;"></el-date-picker>
                </el-form-item>
                </el-col>
                <el-col class="line" :span="2">至</el-col>
                <el-col :span="6">
                <el-form-item prop="end">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleFormcharge.end" style="width: 100%;"></el-date-picker>
                </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="出团时间" prop="goTime">
                <el-checkbox-group v-model="ruleFormcharge.goTime">
                <el-checkbox label="周一" name="type"></el-checkbox>
                <el-checkbox label="周二" name="type"></el-checkbox>
                <el-checkbox label="周三" name="type"></el-checkbox>
                <el-checkbox label="周四" name="type"></el-checkbox>
                <el-checkbox label="周五" name="type"></el-checkbox>
                <el-checkbox label="周六" name="type"></el-checkbox>
                <el-checkbox label="周日" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="市场价格" prop="marketCharge">
                <el-input v-model="ruleFormcharge.marketCharge"></el-input>
            </el-form-item>
            <el-form-item label="同业价格" prop="friendCharge">
                <el-input v-model="ruleFormcharge.friendCharge"></el-input>
            </el-form-item>
        </el-form>
        <div style="margin-left:20px">
            <el-button type="success" @click="applyCharge">应用价格</el-button>
            <el-button type="primary" @click="clearCharge">清除价格</el-button>
        </div>
        <div class="timeTable">
            <el-row>
                <el-col :span="10" class="tableleft">
                    <div>2018年6月</div>
                    <div>
                            <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                            <el-table-column
                            prop="Sun"
                            label="日"
                            width="65">
                            </el-table-column>
                            <el-table-column
                            prop="Mon"
                            label="一"
                            width="65">
                            </el-table-column>
                            <el-table-column
                            prop="Tues"
                            label="二"
                            width="65">
                            </el-table-column>
                            <el-table-column
                            prop="Wed"
                            label="三"
                            width="65">
                            </el-table-column>
                            <el-table-column
                            prop="Thur"
                            label="四"
                            width="65">
                            </el-table-column>
                            <el-table-column
                            prop="Fri"
                            label="五"
                            width="65">
                            </el-table-column>
                            <el-table-column
                            prop="Sat"
                            label="六"
                            width="65">
                            </el-table-column>
                        </el-table>
                    </div>
                </el-col>
                <el-col :span="10" class="tableright">
                    <div>2018年7月</div>
                    <div>
                            <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                            <el-table-column
                            prop="Sun"
                            label="日"
                            width="65">
                            </el-table-column>
                            <el-table-column
                            prop="Mon"
                            label="一"
                            width="65">
                            </el-table-column>
                            <el-table-column
                            prop="Tues"
                            label="二"
                            width="65">
                            </el-table-column>
                            <el-table-column
                            prop="Wed"
                            label="三"
                            width="65">
                            </el-table-column>
                            <el-table-column
                            prop="Thur"
                            label="四"
                            width="65">
                            </el-table-column>
                            <el-table-column
                            prop="Fri"
                            label="五"
                            width="65">
                            </el-table-column>
                            <el-table-column
                            prop="Sat"
                            label="六"
                            width="65">
                            </el-table-column>
                        </el-table>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                ruleFormcharge:{
                    start:'',
                    end:'',
                    goTime:[],
                    marketCharge:'',
                },
                rulescharge:{
                    start: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    end: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    goTime: [
                        { type: 'array', required: true, message: '请至少选择一个出团时间', trigger: 'change' }
                    ],
                    marketCharge: [
                        { required: true, message: '请输入市场价格', trigger: 'blur' },
                    ],
                    friendCharge: [
                        { required: true, message: '请输入同业价格', trigger: 'blur' },
                    ],
                },
                tableData:[
                    {Sun:'',Mon:'1',Tues:'2',Wed:'3',Thur:'4',Fri:'5',Sat:'6'},
                ],
            }
        },
        methods:{
            //应用价格
            applyCharge(){

            },
            //清除价格
            clearCharge(){
                this.ruleFormcharge.goTime=[];
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
        margin-left: 30px;
        margin-top: 20px;
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