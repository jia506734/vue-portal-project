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
                    <el-col  :span="2">
                        <span style="cursor: pointer;" @click="addwordClick"><i class="el-icon-circle-plus"></i>字段</span>
                    </el-col>
                </el-row>
                <el-table
                    tooltip-effect="dark"
                    @selection-change="handleSelectionChange"
                    ref="multipleTable"
                    border
                    v-loading = "tableLoading"
                    :data="dicData"
                    style="margin-top:20px">
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
                label="字典名称" >
                    <template slot-scope="scope">
                        <span :title="scope.row.dictItemName">{{ judgeNull(scope.row.dictItemName) }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="字典描述" >
                    <template slot-scope="scope">
                        <span :title="scope.row.dictItemDesc">{{ judgeNull(scope.row.dictItemDesc) }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="字典类别" >
                    <template slot-scope="scope">
                        <span>{{ dicType(judgeNull(scope.row.dictItemType)) }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="字典数据库" >
                    <template slot-scope="scope">
                        <span>{{ judgeNull(scope.row.dictTableSchema) }}</span>
                    </template>
                </el-table-column>            
                <el-table-column
                label="字典所在表" >
                    <template slot-scope="scope">
                        <span>{{ judgeNull(scope.row.dictTableName) }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="字典key别名" >
                    <template slot-scope="scope">
                        <span>{{ judgeNull(scope.row.dictDisplayName)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="字典value别名" >
                    <template slot-scope="scope">
                        <span>{{ judgeNull(scope.row.dictDisplayValue) }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="字典序号" >
                    <template slot-scope="scope">
                        <span>{{ judgeNull(scope.row.dictSortColName) }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="字典备注" >
                    <template slot-scope="scope">
                        <span>{{ judgeNull(scope.row.remark) }}</span>
                    </template>
                </el-table-column>
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
            <el-dialog
                title="字典数据"
                :visible.sync="dictAllData"
                :close-on-click-modal="notClose"
                width="35%">
                <el-dialog
                    title="维护字典数据"
                    :visible.sync="dictDataShow"
                    :close-on-click-modal="notClose"
                    append-to-body
                    width="30%">
                    <div>
                        <el-form :model="ruleFormData" :rules="rulesData" ref="ruleFormData" label-width="180px" class="demo-ruleFormData">
                            <el-form-item label="字典数据对应的key" prop="dictDataKey">
                                <el-input v-model="ruleFormData.dictDataKey" @blur="mapDictName(ruleFormData.dictDataKey)"></el-input>
                            </el-form-item>
                            <el-form-item label="字典数据对应的value" prop="dictDataValue">
                                <el-input v-model="ruleFormData.dictDataValue" ></el-input>
                            </el-form-item>
                            <el-form-item label="字典数据的顺序" prop="dictDataOrder">
                                <el-input v-model="ruleFormData.dictDataOrder" ></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitDictData('ruleFormData')">保存</el-button>
                                <el-button @click="dictDataShow=false">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-dialog>
                <div>
                    <el-row style="margin-top:-20px">
                        <el-col  :span="2">
                            <span style="cursor: pointer;" @click="dictDataShow = true;isDictDataCreate = true"><i class="el-icon-circle-plus"></i>新增</span>
                        </el-col>
                        <el-col :span="2">
                            <span style="cursor: pointer;" @click="deleteDictClick"><i class="el-icon-delete"></i>删除</span>
                        </el-col>
                    </el-row>
                    <el-table
                        tooltip-effect="dark"
                        @selection-change="handleDictDataChange"
                        ref="multipleDictTable"
                        border
                        v-loading = "dictDataLoading"
                        :data="dicdetailData"
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
                            @click="dictDataEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="字典数据对应的key"
                    width="150">
                        <template slot-scope="scope">
                            <span :title="scope.row.dictDataKey">{{ judgeNull(scope.row.dictDataKey) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="字典数据对应的value"
                    width="220">
                        <template slot-scope="scope">
                            <span :title="scope.row.dictDataValue">{{ judgeNull(scope.row.dictDataValue) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="字典数据的顺序"
                    width="120">
                        <template slot-scope="scope">
                            <span>{{ judgeNull(scope.row.dictDataOrder) }}</span>
                        </template>
                    </el-table-column>            
                </el-table>
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
                dictAllData:false,
                dictDataLoading:false,
                dicdetailData:[],
                ruleFormData:{//字典数据
                    dictItemId:'',
                    // dictItem:'',
                    dictDataKey:'',
                    dictDataValue:'',
                    dictDataOrder:''
                },
                rulesData:{
                    dictDataOrder:[
                        { required: false, message: '请输入字典名称', trigger: 'blur' },
                        {pattern: /^[1-9]\d*$/,message: '只能输入数字'},
                    ],
                },
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
                multipleDictData:[],
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
                dictDataShow:false,
                isDictDataCreate:false,
                selectedDictName:'',
            }
        },
        created(){
            this.getDicData();
        },
        methods:{
            initDitDetailData(){
                let _this=this;                
                axios
                .get("/setting/dict/data?dictItemName="+this.selectedDictName)
                .then(function(response){
                    _this.dicdetailData = response.data.data;
                })
            },
            //删除字典数据
            deleteDictClick(){

            },
            addwordClick(){
                if(this.multipleSelection.length==0){
                    this.$notify({                     
                        duration:2000,
                        message: '请先选择字典',
                        type: 'warning'
                    });
                    return
                }else if(this.multipleSelection.length>1){
                    this.$notify({                     
                        duration:2000,
                        message: '请选择最多一个字典',
                        type: 'warning'
                    });
                    return
                }else{  
                    this.ruleFormData.dictItemId = this.multipleSelection[0].dictItemId;  
                    this.selectedDictName = this.multipleSelection[0].dictItemName;  
                    this.dictAllData = true; 
                    this.initDitDetailData();            
                }
            },
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
                this.dictDataLoading = true;
                axios
                .get("/setting/dict")
                .then(function(response){
                    _this.dictDataLoading = false;
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
            mapDictName(name){
                // if(name){
                //     let _this=this;
                //     axios
                //     .get("/setting/dict/data?dictItemName="+name)
                //     .then(function(response){
                //       if(response.data.success&&response.data.data.length>0){
                //             _this.$message({
                //                 message: '该名称已存在',
                //                 type: 'warning'
                //             });
                //             _this.ruleFormData.dictDataKey="";
                //         }
                //     })
                // }
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
            dictDataEdit(index, row){
                this.dictDataShow=true;
                this.isDictDataCreate=false;
                this.ruleFormData.dictItemId = this.multipleSelection[0].dictItemId;
                this.ruleFormData.dictDataKey = row.dictDataKey;
                this.ruleFormData.dictDataValue = row.dictDataValue;
                this.ruleFormData.dictDataOrder = row.dictDataOrder;
                this.ruleFormData.dictDataId = row.dictDataId;
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
            //提交字典字段
            submitDictData(formName){
                let _this = this
                let postData=this.ruleFormData;
                this.$refs[formName].validate((valid) => {
                    if(valid){
                        if(this.isDictDataCreate){
                             axios
                            .post("/setting/dict/data",postData)
                            .then(function(response){
                                if(response.data.success){
                                    _this.dictDataShow=false;
                                    _this.isDictDataCreate=false
                                    _this.$notify({                     
                                        duration:2000,
                                        message: response.data.message,
                                        type: 'success'
                                    });
                                    _this.initDitDetailData();
                                    _this.ruleFormData = {
                                        dictItemId:'',
                                        dictDataKey:'',
                                        dictDataValue:'',
                                        dictDataOrder:''
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
                            .put("/setting/dict/data",postData)
                            .then(function(response){
                                if(response.data.success){
                                     _this.dictDataShow=false;
                                    _this.isDictDataCreate=false
                                    _this.$notify({                     
                                        duration:2000,
                                        message: response.data.message,
                                        type: 'success'
                                    });
                                    _this.initDitDetailData();
                                    _this.ruleFormData = {
                                        dictItemId:'',
                                        dictDataKey:'',
                                        dictDataValue:'',
                                        dictDataOrder:''
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
            handleDictDataChange(val){
                this.multipleDictData = val;
            },
            addNewClick(){
                this.isDicCreate = true;
                this.addNewVisible=true;
            },
            //删除字典数据
            deleteDictClick(){
                if(this.multipleDictData.length==0){
                    this.$notify({                     
                        duration:2000,
                        message: '请先选择需要删除的数据',
                        type: 'warning'
                    });
                    return
                }
                let _this = this
                let arr = []
                for (let key in this.multipleDictData) {
                    arr.push({
                        dictDataId : this.multipleDictData[key].dictDataId
                    })
                }
                axios
                .delete("/setting/dict/data",{data:arr})
                .then(function(response){
                    if(response.data.success){
                        _this.$notify({                     
                            duration:2000,
                          message: '删除成功',
                          type: 'success'
                        });
                        _this.initDitDetailData()
                        _this.multipleDictData=[]
                    }
                })
            },
            //删除字典
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