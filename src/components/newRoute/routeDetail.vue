<template >
    <div style="margin-left:20px;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item prop="day">
                <el-steps :active="activeDay" align-center @click.native="stepClick">
                  <el-step v-for="(item,index) in ruleDetailArr.length+1" :title="'第'+(index+1)+'天'" description=""></el-step>
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
                  <el-button type="success" icon="el-icon-circle-check-outline" @click="saveAndNext">保存并编辑后一天</el-button>      
                  <el-button type="success" icon="el-icon-circle-check-outline">保存</el-button>
                </el-button-group>
                <el-button type="warning" icon="el-icon-circle-close-outline">取消</el-button>
                <el-button type="danger" icon="el-icon-delete">删除</el-button>
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
                ruleForm: {
                    lineId: "7a6bd05e-d9af-411a-99e1-cd726023125a",
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
        methods:{
            getLineDetail(){
                let _this = this
                axios
                .get("http://www.hctx365.cn/line/detailinfo",{lineId:this.$store.state.lineId})
                .then(res=>{
                    if(res.data.success){
                         _this.$notify({                     
                            duration:2000,
                            message: res.data.message,
                            type: 'success'
                        });
                    }
                })
            },
            saveAndNext(){
                let _this = this
                axios
                .post("http://www.hctx365.cn/line/detailinfo",this.ruleForm)
                .then(res=>{
                    if(res.data.success){
                         _this.$notify({                     
                            duration:2000,
                            message: res.data.message,
                            type: 'success'
                        });
                        _this.dayId.push(res.data.data.lineDetailId)
                        _this.ruleDetailArr.push(_this.ruleForm)
                        _this.ruleForm = {
                            lineId: "7a6bd05e-d9af-411a-99e1-cd726023125a",
                            lineTripTitle: '',
                            lineTotalTrip:'',
                            lineMeals:'',
                            lineHotel:'',
                            lineTripIntroduce:'',
                            lineTips:'',
                            lineGatheringDay:'',
                            createdBy:''
                        }
                        _this.activeDay ++
                    }
                })
            },
            stepClick(e) {
                this.activeDay = e.target.innerText - 1
                this.ruleForm = this.ruleDetailArr[this.activeDay]        
            },
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