<template>
    <div>
        <div class="top-class"><span style="margin-left: 10px;">字典管理</span></div>
            <div style="margin-left:20px;margin-top:20px;">
                <el-row>
                    <el-col :span="1">名称</el-col>
                    <el-col :span="4" style="margin-right:30px;"><el-input v-model="dicName" placeholder="输入名称"></el-input></el-col>
                    <el-col :span="4"><el-button type="primary" @click="getDicDataByName(dicName)">查询</el-button></el-col>
                </el-row>
                <el-row style="margin-top:20px">
                    <el-col  :span="2">
                        <span style="cursor: pointer;" @click="addNewClick"><i class="el-icon-circle-plus"></i>新增</span>
                    </el-col>
                    <el-col :span="2">
                            <span style="cursor: pointer;" @click="moreDeleteClick"><i class="el-icon-delete"></i>删除</span>
                        </el-col>
                </el-row>
                <el-table
                    tooltip-effect="dark"
                    @selection-change="handleSelectionChange"
                    ref="multipleTable"
                    border
                    v-loading = "tableLoading"
                    :data="dicData"
                    style="width: 100%;margin-top:20px">
                <el-table-column
                    fixed
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column label="操作"  width="80" fixed>
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="primary"
                        @click="handleDictEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
                    </template>
                </el-table-column>
                <el-table-column
                label="字典名称"
                width="130">
                    <template slot-scope="scope">
                        <span :title="scope.row.dictItemName">{{ judgeNull(scope.row.dictItemName) }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="字典描述"
                width="130">
                    <template slot-scope="scope">
                        <span :title="scope.row.dictItemDesc">{{ judgeNull(scope.row.dictItemDesc) }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="字典类别"
                width="130">
                    <template slot-scope="scope">
                        <span>{{ dicType(judgeNull(scope.row.dictItemType)) }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="字典数据库"
                width="130">
                    <template slot-scope="scope">
                        <span>{{ judgeNull(scope.row.dictTableSchema) }}</span>
                    </template>
                </el-table-column>            
                <el-table-column
                label="字典所在表"
                width="130">
                    <template slot-scope="scope">
                        <span>{{ judgeNull(scope.row.dictTableName) }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="字典key别名"
                width="130">
                    <template slot-scope="scope">
                        <span>{{ judgeNull(scope.row.dictDisplayName)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="字典value别名"
                    width="180">
                    <template slot-scope="scope">
                        <span>{{ judgeNull(scope.row.dictDisplayValue) }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="字典序号"
                    width="180">
                    <template slot-scope="scope">
                        <span>{{ judgeNull(scope.row.dictSortColName) }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="字典备注"
                    width="180">
                    <template slot-scope="scope">
                        <span>{{ judgeNull(scope.row.remark) }}</span>
                    </template>
                </el-table-column> -->
            </el-table>
            <el-dialog
                :title="createOrEdit"
                :visible.sync="addNewVisible"
                :close-on-click-modal="notClose"
                width="30%">
                <div>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                        <el-form-item label="字典名称" prop="dictItemName">
                            <el-input v-model="ruleForm.dictItemName" @blur="mapName(ruleForm.dictItemName)"></el-input>
                        </el-form-item>
                        <el-form-item label="字典描述" prop="dictItemDesc">
                            <el-input v-model="ruleForm.dictItemDesc" ></el-input>
                        </el-form-item>

                        <el-form-item label="字典类别" prop="dictItemType">
                            <el-select v-model="ruleForm.dictItemType" placeholder="请选择字典类别">
                                <el-option v-for="(item,index) in statusData" 
                                    :key="index" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="字典数据库" prop="dictTableSchema">
                            <el-input v-model="ruleForm.dictTableSchema" ></el-input>
                        </el-form-item>
                        <el-form-item label="字典表名称" prop="dictTableName">
                            <el-input v-model="ruleForm.dictTableName" ></el-input>
                        </el-form-item>
                        <el-form-item label="字典Key别名" prop="dictDisplayName">
                            <el-input v-model="ruleForm.dictDisplayName" ></el-input>
                        </el-form-item>
                        <el-form-item label="字典Value别名" prop="dictDisplayValue">
                            <el-input v-model="ruleForm.dictDisplayValue" ></el-input>
                        </el-form-item>
                        <el-form-item label="字典序号" prop="dictSortColName">
                            <el-input v-model="ruleForm.dictSortColName" ></el-input>
                        </el-form-item>
                        <el-form-item label="字典备注" prop="remark">
                            <el-input v-model="ruleForm.remark" ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitMenuForm('ruleForm')">保存</el-button>
                            <el-button @click="addNewVisible=false">取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import {mapActions, mapState} from 'vuex'
    import axios from "axios"
    export default{
        data(){
            return{
                createOrEdit:"字典管理->新增",
                addNewVisible:false,
                tableLoading:false,
                notClose:false,
                dicName:'',//要筛选的字典名称
                statusData:[
                    {name:'独立表',id:1},
                    {name:'公用表',id:0},
                ],
                multipleSelection:[],//表格选中集
                dicData:[],//字典数据集
                ruleForm:{
                    dictItemName:'',
                    dictItemDesc:'',
                    dictItemType:'',
                    dictTableSchema:'',
                    dictTableName:'',
                    dictDisplayName:'',
                    dictDisplayValue:'',
                    dictSortColName:'',
                    remark:'',
                },
                rules:{
                    dictItemName:[{ required: true, message: '请输入字典名称', trigger: 'blur' }],
                },
                isDicCreate:false,
            }
        },
        created(){
            this.getDicData();
        },
        methods:{
            //切割时间
            subTime(time){
                return time.substring(0,19);
            },
            //判null变空字符串
            judgeNull(obj){
                return obj==null?"":obj
            },
            //字典类别
            dicType(type){
                if(type==1){
                    return "独立表"
                }else{
                    return "公用表"
                }
            },
            //获取数据
            getDicData(){
                let _this=this;
                axios
                .get("/setting/dict")
                .then(function(response){
                    _this.dicData = response.data.data;
                })
            },
            //获取指定数据
            getDicDataByName(name){
                let _this=this;
                axios
                .get("/setting/dict?dictItemName="+name)
                .then(function(response){
                    _this.dicData = response.data.data;
                })
            },
            //校验用户名重复性
            mapName(name){
                if(name){
                    let _this=this;
                    axios
                    .get("/setting/dict?dictItemName="+name)
                    .then(function(response){
                      if(response.data.success&&response.data.data.length>0){
                            _this.$message({
                                message: '该名称已存在',
                                type: 'warning'
                            });
                            _this.ruleForm.dictItemName="";
                        }
                    })
                }
            },
            //编辑字典
            handleDictEdit(index, row){
                this.addNewVisible=true;
                this.isDicCreate=false;
                this.ruleForm.userId = row.userId;
                this.ruleForm.dictItemName = row.dictItemName;
                this.ruleForm.dictItemType = row.dictItemType==0?"公用表":'独立表';
                this.ruleForm.dictItemDesc = row.dictItemDesc;
                this.ruleForm.dictTableSchema = row.dictTableSchema;
                this.ruleForm.dictTableName = row.dictTableName;
                this.ruleForm.dictDisplayName = row.dictDisplayName;
                this.ruleForm.dictDisplayValue = row.dictDisplayValue;
                this.ruleForm.dictSortColName = row.dictSortColName;
                this.ruleForm.remark = row.remark;
                this.ruleForm['dictItemId'] = row.dictItemId;
                this.createOrEdit='字典管理>编辑';
            },
            //提交字典数据
            submitMenuForm(formName){
                let _this = this
                let postData=this.ruleForm;
                if(postData.dictItemType=="独立表"){
                    postData.dictItemType =1;
                }
                if(postData.dictItemType=="公用表"){
                    postData.dictItemType =0;
                }
                this.$refs[formName].validate((valid) => {
                    if(valid){
                        if(this.isDicCreate){
                             axios
                            .post("/setting/dict",postData)
                            .then(function(response){
                                if(response.data.success){
                                    _this.addNewVisible=false;
                                    _this.isDicCreate=false
                                    _this.$notify({                     
                                        duration:2000,
                                        message: response.data.message,
                                        type: 'success'
                                    });
                                    _this.getDicData();
                                    _this.ruleForm = {
                                        dictItemName:'',
                                        dictItemDesc:'',
                                        dictItemType:'',
                                        dictTableSchema:'',
                                        dictTableName:'',
                                        dictDisplayName:'',
                                        dictDisplayValue:'',
                                        dictSortColName:'',
                                        remark:'',
                                    }
                                }else{
                                    _this.$notify.error({
                                        message: response.data.message,
                                        type: 'warning'
                                    });
                                }
                            })
                        }else{
                            axios
                            .put("/setting/dict",postData)
                            .then(function(response){
                                if(response.data.success){
                                    _this.addNewVisible=false;
                                    _this.isDicCreate=false
                                    _this.$notify({                     
                                        duration:2000,
                                        message: response.data.message,
                                        type: 'success'
                                    });
                                    _this.getDicData();
                                    _this.ruleForm = {
                                        dictItemName:'',
                                        dictItemDesc:'',
                                        dictItemType:'',
                                        dictTableSchema:'',
                                        dictTableName:'',
                                        dictDisplayName:'',
                                        dictDisplayValue:'',
                                        dictSortColName:'',
                                        remark:'',
                                    }
                                }else{
                                    _this.$notify.error({
                                        message: response.data.message,
                                        type: 'warning'
                                    });
                                }
                            })
                        }
                    }
                })
            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            addNewClick(){
                this.isDicCreate = true;
                this.addNewVisible=true;
            },
            moreDeleteClick(){
                if(this.multipleSelection.length==0){
                    this.$notify({                     
                        duration:2000,
                        message: '请先选择需要删除的字典',
                        type: 'warning'
                    });
                    return
                }
                let _this = this
                let arr = []
                for (let key in this.multipleSelection) {
                    arr.push({
                        dictItemId : this.multipleSelection[key].dictItemId
                    })
                }
                axios
                .delete("/setting/dict",{data:arr})
                .then(function(response){
                    if(response.data.success){
                        _this.$notify({                     
                            duration:2000,
                          message: '删除成功',
                          type: 'success'
                        });
                        _this.getDicData()
                        _this.multipleSelection=[]
                    }
                })
            },
        },
    }
</script>
<style scope>
  .top-class{
    height: 35px;
    margin-top: 15px;
    background: #ddd; 
    border: 1px solid #ddd;
    line-height: 35px;
  }
  .el-select{
      width:100%;
  }
</style>