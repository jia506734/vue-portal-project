<template >
    <div style="margin-left:20px;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item prop="day">
                <el-steps class="marginNo" :active="activeDay" align-center @click.native="stepClick">
                  <el-step v-for="(item,index) in countRuleDetail" :title="'第'+(index+1)+'天'" description=""></el-step>
                </el-steps>
            </el-form-item>
            <el-form-item label="行程标题" prop="lineTripTitle">
                <el-input v-model="ruleForm.lineTripTitle" placeholder="请输入行程标题"></el-input>
            </el-form-item>
            <el-form-item label="预计总行程" prop="lineTotalTrip">
                <el-input v-model="ruleForm.lineTotalTrip" placeholder="请输入预计总行程"></el-input>
            </el-form-item>
            <el-form-item label="餐食信息" prop="lineMeals">
                <el-input type="textarea" :rows="3" v-model="ruleForm.lineMeals" placeholder="请输入餐食信息"></el-input>
            </el-form-item>
            <el-form-item label="住宿信息" prop="lineHotel">
                <el-input type="textarea" :rows="3" v-model="ruleForm.lineHotel" placeholder="请输入住宿信息"></el-input>
            </el-form-item>
            <el-form-item label="行程介绍" prop="lineTripIntroduce">
                <el-input type="textarea" :rows="3" v-model="ruleForm.lineTripIntroduce" placeholder="请输入行程介绍"></el-input>
            </el-form-item>
            <el-form-item label="提示" prop="lineTips">
                <el-input  type="textarea" :rows="3" v-model="ruleForm.lineTips" placeholder="请输入提示"></el-input>
            </el-form-item>
            <el-form-item label="集结日" prop="lineGatheringDay">
                <el-input v-model="ruleForm.lineGatheringDay" placeholder="请输入集结日"></el-input>
            </el-form-item>
            <el-form-item class="textCenter">
                <el-button-group>
                  <el-button type="success" icon="el-icon-circle-check-outline" @click="saveAndNext" :disabled="state || activeDay+1<countRuleDetail">保存并编辑后一天</el-button>      
                  <el-button type="success" icon="el-icon-circle-check-outline" @click="save" :disabled="state">保存</el-button>
                </el-button-group>
                <el-button type="warning" icon="el-icon-circle-close-outline" @click="cancle" :disabled="state || activeDay!=ruleDetailArr.length || ruleDetailArr.length<=1">取消</el-button>
                <el-button type="danger" icon="el-icon-delete" @click="deleteDay" :disabled="state || ruleDetailArr.length<=1">删除</el-button>
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
                activeDay: 0 ,
                dayId:[],
                ruleDetailArr:[],
                countRuleDetail:1,
                state:false,
                ruleForm: {
                    lineId: "",
                    lineTripTitle: '',
                    lineTotalTrip:'',
                    lineMeals:'',
                    lineHotel:'',
                    lineTripIntroduce:'',
                    lineTips:'',
                    lineGatheringDay:'',
                    createdBy:''
                },
                rules: {
                    lineTripTitle: [
                        { required: true, message: '请输入行程标题', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    lineTotalTrip: [
                        { message: '请输入预计总行程', trigger: 'blur' }
                    ],
                    lineMeals: [
                        { required: true, message: '请输入餐食信息', trigger: 'blur' },
                        { min: 1, max: 1000, message: '长度在 1 到 1000 个字符', trigger: 'blur' }
                    ],
                    lineHotel: [
                        { required: true, message: '请输入住宿信息', trigger: 'blur' },
                        { min: 1, max: 1000, message: '长度在 1 到 1000 个字符', trigger: 'blur' }
                    ],
                    lineTripIntroduce: [
                        { required: true, message: '请输入行程介绍', trigger: 'blur' },
                        { min: 1, max: 1000, message: '长度在 1 到 1000 个字符', trigger: 'blur' }
                    ],
                    lineTips: [
                        { message: '请输入提示', trigger: 'blur' },
                        { min: 1, max: 1000, message: '长度在 1 到 1000 个字符', trigger: 'blur' }
                    ],
                    lineGatheringDay: [
                        { required: true, message: '请输入集结日', trigger: 'blur' }
                    ]
                }
            }
        },
        components: {
        },
        computed: {
        },
        created(){
            this.ruleForm.lineId = this.$store.state.lineId;
            this.getLineDetail();
        },
        methods:{
            getLineDetail(){
                let _this = this
                axios
                .get("http://www.hctx365.cn/line/detailinfo?lineId="+this.$route.query.lineId).then(res=>{
                    if(res.data.success){
                        _this.ruleDetailArr = JSON.parse(JSON.stringify(res.data.data))
                        for(let key in _this.ruleDetailArr){
                            _this.dayId.push(_this.ruleDetailArr[key].lineDetailId)
                        }
                        _this.countRuleDetail = _this.ruleDetailArr.length
                        _this.activeDay = 0
                        _this.ruleForm = _this.ruleDetailArr[_this.activeDay]
                    }
                })
            },
            saveAndNext(){
                let _this = this
                this.$refs['ruleForm'].validate((valid) => {
                    if(valid){
                        if(this.activeDay<=this.ruleDetailArr.length){
                            this.ruleForm['lineDetailId']=this.dayId[this.activeDay]
                        }
                        this.state = true
                        axios
                        .post("http://www.hctx365.cn/line/detailinfo",this.ruleForm)
                        .then(res=>{
                            if(res.data.success){
                                 _this.$notify({                     
                                    duration:2000,
                                    message: res.data.message,
                                    type: 'success'
                                });
                                _this.dayId[_this.activeDay] = res.data.data.lineDetailId
                                _this.ruleDetailArr[_this.activeDay] = JSON.parse(JSON.stringify(_this.ruleForm))
                                _this.countRuleDetail ++
                                _this.$refs['ruleForm'].resetFields();
                                _this.activeDay ++
                            }
                            _this.state = false
                        })
                    }
                }) 
            },
            save(){
                let _this = this
                this.$refs['ruleForm'].validate((valid) => {
                    if(valid){
                        if(this.activeDay+1>this.dayId.length){
                            //保存
                            this.state = true
                            axios
                            .post("http://www.hctx365.cn/line/detailinfo",this.ruleForm)
                            .then(res=>{
                                if(res.data.success){
                                     _this.$notify({                     
                                        duration:2000,
                                        message: res.data.message,
                                        type: 'success'
                                    });
                                    _this.dayId[_this.activeDay] = res.data.data.lineDetailId
                                    _this.ruleDetailArr[_this.activeDay] = JSON.parse(JSON.stringify(_this.ruleForm))
                                }
                                _this.state = false
                            }) 
                        }else{//编辑
                            this.state = true
                            this.ruleForm['lineDetailId']=this.dayId[this.activeDay]
                            axios
                            .put("http://www.hctx365.cn/line/detailinfo",this.ruleForm)
                            .then(res=>{
                                if(res.data.success){
                                     _this.$notify({                     
                                        duration:2000,
                                        message: res.data.message,
                                        type: 'success'
                                    });
                                    _this.dayId[_this.activeDay] = res.data.data.lineDetailId
                                    _this.ruleDetailArr[_this.activeDay] = JSON.parse(JSON.stringify(_this.ruleForm))
                                }
                                _this.state = false
                            }) 
                        }
                        
                    }
                })
            },
            stepClick(e) {
                this.activeDay = e.target.innerText.replace('第','').replace('天','') - 1
                if(this.activeDay<=this.ruleDetailArr.length-1){
                   this.ruleForm = JSON.parse(JSON.stringify(this.ruleDetailArr[this.activeDay])) 
               }else{
                   this.$refs['ruleForm'].resetFields(); 
               }
            },
            cancle(){
                if(this.activeDay>0){
                    this.activeDay --
                    this.countRuleDetail --
                    this.ruleForm = JSON.parse(JSON.stringify(this.ruleDetailArr[this.activeDay]))
                }
            },
            deleteDay(){
                if(this.activeDay>=0){
                    this.state = true
                    let _this = this
                    let param =[{lineDetailInfoId:this.dayId[this.activeDay]}];
                    axios
                    .delete("http://www.hctx365.cn/line/detailinfo",{data: param})
                    .then(res=>{
                        if(res.data.success){
                             _this.$notify({                     
                                duration:2000,
                                message: res.data.message,
                                type: 'success'
                            });
                            _this.ruleDetailArr.splice(this.activeDay,1)
                            _this.dayId.splice(this.activeDay,1)
                            if(_this.activeDay==0){
                                _this.activeDay = 0
                            }else{
                               _this.activeDay -- 
                            }
                            _this.countRuleDetail --
                            _this.ruleForm = JSON.parse(JSON.stringify(_this.ruleDetailArr[_this.activeDay]))
                        }
                        _this.state = false
                    }) 
                }
            }
        }
    }
</script>
<style scoped>
    .quill-editor {
        height: 745px;
    }
    .quill-editor .ql-container {
        height: 680px;
    }    
    .ql-snow .ql-editor img {
        max-width: 480px;
    }

    .ql-editor .ql-video {
        max-width: 480px;
    }
    .textCenter{
        margin-left: -20px;
        text-align: center;
    }
    .el-button-group{
        margin-right: 10px;
    }
</style>