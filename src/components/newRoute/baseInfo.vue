<template>
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
            <el-form-item label="行程天数" required>
                <el-col :span="3">
                    <el-select v-model="ruleForm.dayvalue" placeholder="请选择几天">
                        <el-option
                            v-for="item in days"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <span class="line">-</span>
                <el-col :span="4">
                    <el-select v-model="ruleForm.nightvalue" placeholder="请选择几晚">
                        <el-option
                            v-for="item in nights"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
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
        </el-form>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import axios from "axios"
    export default{
        data(){
            return{                
                days:[
                    {label:"一天",value:"1"},
                    {label:"三天",value:"3"},
                    {label:"五天",value:"5"},
                    {label:"七天",value:"7"},
                ],
                nights:[
                    {label:"一晚",value:"1"},
                    {label:"二晚",value:"2"},
                    {label:"四晚",value:"4"},
                    {label:"六晚",value:"6"},
                ],
                fileList2:[],
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
                    dayvalue:'',
                    nightvalue:'',
                },
                rules: {
                    dayvalue:[{ required: true, message: '请选择几天', trigger: 'change' }],
                    nightvalue:[{ required: true, message: '请选择几晚', trigger: 'change' }],
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
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
        computed:{
            ...mapState(["tenantId"]),
        },
        methods:{
            handleRemove(file, fileList) {
            },
            handlePreview(file) {
            },
            //重置基本信息表单
            resetFields(){
                this.$refs['ruleForm'].resetFields();
            },
            //保存基本信息
            saveBaseInfo(){
                this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    if(ruleForm.nightvalue==""||ruleForm.dayvalue==""){
                        this.$notify({
                            duration: '2000',
                            message: '请填写行程天数',
                            type: 'warning'
                        });
                        return false;
                    }

                } else {
                    this.$notify({
                        duration: '2000',
                        message: '请填写完整基本信息',
                        type: 'warning'
                    });
                    return false;
                }
                });
            },
        }
    }
</script>
<style scoped>
    .demo-ruleForm{
        height: 811px;
        overflow-y: auto
    }
    .line{
        float: left;
    }
</style>