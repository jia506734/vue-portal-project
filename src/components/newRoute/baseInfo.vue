<template>
    <div>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="线路名称" prop="lineName">
                <el-input v-model="ruleForm.lineName" placeholder="请输入线路名称"></el-input>
            </el-form-item>
            <el-form-item label="线路美图" prop="routePic">
                <el-upload
                    class="upload-demo"
                            ref="upload"
                            action="http://www.hctx365.cn/line/image"
                            :on-preview="handlePreview"
                            :before-upload="beforeAvatarUpload"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            :auto-upload = 'false'
                            :on-success = 'handleSuccess'
                            :data="form"
                            name="salaryBill">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
                            </el-upload>
            </el-form-item>            
            <el-form-item label="国内境外" prop="lineRange">
                <el-radio-group v-model="ruleForm.lineRange">
                <el-radio label="国内"></el-radio>
                <el-radio label="海外"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="出行方式" prop="lineTravelWay">
                <el-checkbox-group v-model="ruleForm.lineTravelWay">
                <el-checkbox :label="item.label" v-for="item in travelWay" :key="item.value" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="线路主题" prop="lineTheme">
                <el-checkbox-group v-model="ruleForm.lineTheme">
                <el-checkbox v-for="item in lineTheme" :label="item.label" :key="item.value" name="theme"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="线路状态" prop="lineStatus">
                <el-select v-model="ruleForm.lineStatus" placeholder="请选择线路状态">
                    <el-option label="下架" value="0"></el-option>
                    <el-option label="上架" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="行程天数" required>
                <el-col :span="3">
                    <el-select v-model="ruleForm.lineDay" placeholder="请选择几天">
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
                    <el-select v-model="ruleForm.lineNight" placeholder="请选择几晚">
                        <el-option
                            v-for="item in nights"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="线动时间" required>
                <el-col :span="4">
                <el-form-item prop="lineStartDate">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.lineStartDate"></el-date-picker>
                </el-form-item>
                </el-col>
                <span class="line">至</span>
                <el-col :span="4">
                <el-form-item prop="lineEndDate">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.lineEndDate"></el-date-picker>
                </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="出发地" prop="lineOrigin">
                <el-input v-model="ruleForm.lineOrigin" placeholder="请输入20字以内的描述"></el-input>
            </el-form-item>
            <el-form-item label="目的地" prop="lineDestination">
                <el-input v-model="ruleForm.lineDestination" placeholder="请输入20字以内的描述"></el-input>
            </el-form-item>
            <el-form-item label="注意事项" prop="lineNotice">
                <el-input v-model="ruleForm.lineNotice" placeholder="请输入1000字以内的描述"></el-input>
            </el-form-item>
            <el-form-item label="报名须知" prop="lineSignUpInfo">
                <el-input v-model="ruleForm.lineSignUpInfo" placeholder="请输入1000字以内的描述"></el-input>
            </el-form-item>
            <el-form-item label="退订保证" prop="lineUnsubscribeEnsure">
                <el-input v-model="ruleForm.lineUnsubscribeEnsure" placeholder="请输入1000字以内的描述"></el-input>
            </el-form-item>
            <el-form-item label="线路录入人" prop="lineEnter">
                <el-input v-model="ruleForm.lineEnter" placeholder="请输入录入人名称"></el-input>
            </el-form-item>
            <el-form-item label="客服电话" prop="lineServiceTel">
                <el-input v-model="ruleForm.lineServiceTel" placeholder="请输入客服电话"></el-input>
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
                form:{},
                travelWay:[
                    {label:'自驾游',value:0},
                    {label:'房车自驾',value:1},
                    {label:'拼车自驾',value:2},
                    {label:'海外自驾',value:3},
                    {label:'海外包车',value:4},
                    {label:'海外大巴',value:5},
                ],
                lineTheme:[
                    {label:'亲子游',value:0},
                    {label:'森林探险',value:1},
                    {label:'高山滑雪',value:2},
                    {label:'活动赛事',value:3},
                    {label:'摄影风采',value:4},
                    {label:'民族古镇',value:5},
                ],
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
                fileList:[],
                ruleForm: {
                    lineName: '',
                    lineOrigin:'',
                    lineDestination:'',
                    lineNotice:'',
                    lineSignUpInfo:'',
                    lineUnsubscribeEnsure:'',
                    lineEnter:'',
                    lineServiceTel:'',
                    lineTravelWay: [],
                    lineTheme:[],
                    lineRange: '',
                    lineDay:'',
                    lineNight:'',
                    lineStartDate:'',
                    lineEndDate:''
                },
                rules: {
                    lineDay:[{ required: true, message: '请选择几天', trigger: 'change' }],
                    lineNight:[{ required: true, message: '请选择几晚', trigger: 'change' }],
                    lineName: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                    ],
                    lineOrigin: [
                        { required: true, message: '请输入出发地', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    lineDestination: [
                        { required: true, message: '请输入目的地', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    lineNotice: [
                        { required: true, message: '请输入注意事项', trigger: 'blur' },
                        { min: 1, max: 1000, message: '长度在 1 到 1000 个字符', trigger: 'blur' }
                    ],
                    lineSignUpInfo: [
                        { required: true, message: '请输入报名须知', trigger: 'blur' },
                        { min: 1, max: 1000, message: '长度在 1 到 1000 个字符', trigger: 'blur' }
                    ],
                    lineUnsubscribeEnsure: [
                        { required: true, message: '请输入退订保证', trigger: 'blur' },
                        { min: 1, max: 1000, message: '长度在 1 到 1000 个字符', trigger: 'blur' }
                    ],
                    lineServiceTel: [
                        { required: true, message: '请输入客服电话', trigger: 'blur' }
                    ],
                    lineTravelWay: [
                        { type: 'array', required: true, message: '请至少选择一个出行方式', trigger: 'change' }
                    ],
                    lineTheme: [
                        { type: 'array', required: true, message: '请至少选择一个线路主题', trigger: 'change' }
                    ],
                    lineRange: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ]
                }
            }
        },
        computed:{
            ...mapState(["tenantId",'lineId']),
        },
        methods:{
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleSuccess(res,file,fileList){
                if(res.code===20000){
                    this.$message({
                        message: '上传成功！',
                        type: 'success'
                    });
                }else {
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                }
            },
            beforeAvatarUpload(file) {
                //let Xls = file.name.split('.');
                this.form.lineId = this.$store.state.lineId;
                this.form.imageName = file.name.split('.')[0];
                this.form.imageType = file.name.split('.')[1];
                // if(Xls[1] === 'xls'||Xls[1] === 'xlsx'){
                //     return file
                // }else {
                //     this.$message.error('上传文件只能是 xls/xlsx 格式!')
                //     return false
                // }
            },
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
                    if(this.ruleForm.lineNight==""||this.ruleForm.lineDay==""){
                        this.$notify({
                            duration: '2000',
                            message: '请填写行程天数',
                            type: 'warning'
                        });
                        return false;
                    }
                    this.ruleForm.lineTenantId = this.$store.state.tenantId;
                    let postData = this.ruleForm;
                    let lineTravelWay = [];
                    let lineTheme = [];
                    if(postData.lineRange=='国内'){
                        postData.lineRange = 0;
                    }
                    if(postData.lineRange=='海外'){
                        postData.lineRange = 1;
                    }
                    postData.lineTravelWay.forEach(function(el){
                        if(el=='自驾游'){
                            lineTravelWay.push('0')
                        }else if(el=='房车自驾'){
                            lineTravelWay.push('1')
                        }else if(el=='拼车自驾'){
                            lineTravelWay.push('2')
                        }else if(el=='海外自驾'){
                            lineTravelWay.push('3')
                        }else if(el=='海外包车'){
                            lineTravelWay.push('4')
                        }else{
                            lineTravelWay.push('5')
                        }
                    })
                    postData.lineTheme.forEach(function(el){
                        if(el=='亲子游'){
                            lineTheme.push('0')
                        }else if(el=='森林探险'){
                            lineTheme.push('1')
                        }else if(el=='高山滑雪'){
                            lineTheme.push('2')
                        }else if(el=='活动赛事'){
                            lineTheme.push('3')
                        }else if(el=='摄影风采'){
                            lineTheme.push('4')
                        }else{
                            lineTheme.push('5')
                        }
                    })
                    postData.lineTravelWay = lineTravelWay.join(',');
                    postData.lineTheme = lineTheme.join(',');
                    let _this = this
                    axios
                    .post("http://www.hctx365.cn/line/baseinfo",postData)
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
                } else {
                    this.$notify({
                        duration: '2000',
                        message: '请填写完整基本信息',
                        type: 'warning'
                    });
                    return false;
                }
            });
        }
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
        padding-left:10px;
        padding-right:10px;
    }
</style>