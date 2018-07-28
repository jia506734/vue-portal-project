<template>
    <div style="width:100%">
        <div class="route-manage" >
            <span class="route-manage-top">线路管理 > 新建线路</span>
        </div>
        <div class="tab-top">
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="first">
                    <div>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="线路名称" prop="name">
                                <el-input v-model="ruleForm.name" placeholder="请输入线路名称"></el-input>
                            </el-form-item>
                            <el-form-item label="线路美图" prop="routePic">
                                <el-upload
                                    class="upload-demo"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :file-list="fileList2"
                                    list-type="picture">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                    </el-upload>
                            </el-form-item>

                            <el-form-item label="国内境外" prop="resource">
                                <el-radio-group v-model="ruleForm.resource">
                                <el-radio label="国内"></el-radio>
                                <el-radio label="海外"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="出行方式" prop="type">
                                <el-checkbox-group v-model="ruleForm.type">
                                <el-checkbox label="自驾游" name="type"></el-checkbox>
                                <el-checkbox label="房车自驾" name="type"></el-checkbox>
                                <el-checkbox label="拼车自驾" name="type"></el-checkbox>
                                <el-checkbox label="海外自驾" name="type"></el-checkbox>
                                <el-checkbox label="海外包车" name="type"></el-checkbox>
                                <el-checkbox label="海外大巴" name="type"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="线路主题" prop="theme">
                                <el-checkbox-group v-model="ruleForm.theme">
                                <el-checkbox label="亲子游" name="theme"></el-checkbox>
                                <el-checkbox label="森林探险" name="theme"></el-checkbox>
                                <el-checkbox label="高山滑雪" name="theme"></el-checkbox>
                                <el-checkbox label="活动赛事" name="theme"></el-checkbox>
                                <el-checkbox label="摄影风采" name="theme"></el-checkbox>
                                <el-checkbox label="民族古镇" name="theme"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>

                            <el-form-item label="出发地" prop="from">
                                <el-input v-model="ruleForm.from" placeholder="请输入20字以内的描述"></el-input>
                            </el-form-item>
                            <el-form-item label="目的地" prop="to">
                                <el-input v-model="ruleForm.to" placeholder="请输入20字以内的描述"></el-input>
                            </el-form-item>
                            <el-form-item label="注意事项" prop="atention">
                                <el-input v-model="ruleForm.atention" placeholder="请输入1000字以内的描述"></el-input>
                            </el-form-item>
                            <el-form-item label="报名须知" prop="needKnow">
                                <el-input v-model="ruleForm.needKnow" placeholder="请输入1000字以内的描述"></el-input>
                            </el-form-item>
                            <el-form-item label="退订保证" prop="backPromise">
                                <el-input v-model="ruleForm.backPromise" placeholder="请输入1000字以内的描述"></el-input>
                            </el-form-item>
                            <el-form-item label="线路录入人" prop="owner">
                                <el-input v-model="ruleForm.owner" placeholder="请输入录入人名称"></el-input>
                            </el-form-item>
                            <el-form-item label="客服电话" prop="hotLine">
                                <el-input v-model="ruleForm.hotLine" placeholder="请输入客服电话"></el-input>
                            </el-form-item>
                            <el-form-item label="俱乐部报价" prop="charge">
                                <el-input v-model="ruleForm.charge" placeholder="请输入俱乐部报价"></el-input>
                            </el-form-item>
                            <el-form-item label="同行报价" prop="otherCharge">
                                <el-input v-model="ruleForm.otherCharge" placeholder="请输入同行报价"></el-input>
                            </el-form-item>
                            <el-form-item label="市场价" prop="macketCharge">
                                <el-input v-model="ruleForm.macketCharge" placeholder="请输入市场价"></el-input>
                            </el-form-item>
                            <!-- <el-form-item>
                                <el-button @click="submitForm('ruleForm')">下一步</el-button>
                                <el-button type="primary" @click="resetForm('ruleForm')">取消</el-button>
                            </el-form-item> -->
                        </el-form>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="团期&报价" name="second">
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
                </el-tab-pane>
                <el-tab-pane label="线路详情" name="third">线路详情</el-tab-pane>
                <el-tab-pane label="目的地简介" name="fourth">目的地简介</el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            tableData:[
                {Sun:'',Mon:'1',Tues:'2',Wed:'3',Thur:'4',Fri:'5',Sat:'6'},
            ],
            fileList2:[],
            activeName2: 'first',
            ruleForm: {
                name: '',
                from:'',
                to:'',
                atention:'',
                needKnow:'',
                backPromise:'',
                owner:'',
                charge:'',
                otherCharge:'',
                macketCharge:'',
                hotLine:'',
                type: [],
                theme:[],
                resource: '',
            },
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
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    // { min: 1, max: 50, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                from: [
                    { required: true, message: '请输入出发地', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
                to: [
                    { required: true, message: '请输入目的地', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
                atention: [
                    { required: true, message: '请输入注意事项', trigger: 'blur' },
                    { min: 1, max: 1000, message: '长度在 1 到 1000 个字符', trigger: 'blur' }
                ],
                needKnow: [
                    { required: true, message: '请输入报名须知', trigger: 'blur' },
                    { min: 1, max: 1000, message: '长度在 1 到 1000 个字符', trigger: 'blur' }
                ],
                backPromise: [
                    { required: true, message: '请输入退订保证', trigger: 'blur' },
                    { min: 1, max: 1000, message: '长度在 1 到 1000 个字符', trigger: 'blur' }
                ],
                atention: [
                    { required: true, message: '请输入注意事项', trigger: 'blur' }
                ],
                hotLine: [
                    { required: true, message: '请输入客服电话', trigger: 'blur' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个出行方式', trigger: 'change' }
                ],
                theme: [
                    { type: 'array', required: true, message: '请至少选择一个线路主题', trigger: 'change' }
                ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        //应用价格
        applyCharge(){

        },
        //清除价格
        clearCharge(){
            this.ruleFormcharge.goTime=[];
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                
            } else {
                this.activeName2 = 'second'
                // return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleClick(tab, event) {
            console.log(tab, event);
        }

    }
}
</script>


<style scoped>
    .demo-ruleForm{
        height: 811px;
        overflow-y: auto
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
