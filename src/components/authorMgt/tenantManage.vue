<template>
  <div>
    <div class="top-class"><span style="margin-left: 10px;">租户管理</span></div>
    <div style="margin-left:20px;margin-top:20px;">
        <el-row>
            <el-col :span="2" >租户名称</el-col>
            <el-col :span="5" style="margin-right:30px;"><el-input v-model="tenantName" placeholder="输入租户名"></el-input></el-col>
            <el-col :span="4"><el-button type="primary" @click="tenantSearch">查询</el-button></el-col>
        </el-row>
        <el-row style="margin-top:20px">
            <el-col  :span="2">
                <span style="cursor: pointer;" @click="addNewClick"><i class="el-icon-circle-plus"></i>新增</span>
            </el-col>
            <el-col  :span="2">
                <span style="cursor: pointer;" @click="moreDeleteClick"><i class="el-icon-delete"></i>删除</span>
            </el-col>
        </el-row>
        <el-table v-loading = "tableLoading"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
            ref="multipleTable"
            border
            :data="tenantData"
            style="margin-top:20px">
            <el-table-column
                type="selection"
                fixed >
            </el-table-column>
            <el-table-column label="操作" width="80" fixed>
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="primary"
                    @click="handleTenantEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
                </template>
            </el-table-column>
            <el-table-column width="180"
            label="租户名称" >
            <template slot-scope="scope" >
                <span>{{ scope.row.tenantName }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="租户期限" width="180">
            <template slot-scope="scope">
                <span>{{ scope.row.validDate }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="租户描述" 
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
                <span :title="scope.row.tenantDesc">{{ scope.row.tenantDesc }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="租户管理员" width="180">
            <template slot-scope="scope">
                <span>{{getNameByDict(scope.row.tenantAdminId) }}</span>
            </template>
            </el-table-column>
            <el-table-column
                label="创建时间" width="180">
                <template slot-scope="scope">
                    <span>{{ subTime(scope.row.createdDate) }}</span>
                </template>
             </el-table-column>
        </el-table>
    </div>
    <el-dialog
        :title="createOrEdit"
        :visible.sync="tenantNewVisible"
        :close-on-click-modal="notClose"
        width="40%">
        <div class="tenant-div">
            <el-form :model="tenantForm" :rules="tenantRules" ref="tenantForm" label-width="100px" class="demo-tenantForm">
                <el-form-item label="租户名称" prop="tenantName">
                    <el-input v-model="tenantForm.tenantName" @blur="mapName(tenantForm.tenantName)"></el-input>
                </el-form-item>
                <el-form-item label="租户期限" >
                    <el-col :span="24">
                        <el-date-picker type="date" placeholder="选择日期" v-model="tenantForm.validDate" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="租户描述" prop="tenantDesc">
                    <el-input type="textarea" v-model="tenantForm.tenantDesc"></el-input>
                </el-form-item>
                <el-form-item label="租户管理员" prop="tenantAdminId" style="width: 100%;">
                    <el-select
                        v-model="tenantForm.tenantAdminId"
                        filterable
                        remote
                        placeholder="请输入关键词"
                        :remote-method="remoteMethod"
                        :loading="loading">
                        <el-option
                        v-for="item in userOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitTenantForm('tenantForm')">确定</el-button>
                    <el-button @click="tenantNewVisible=false">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios"
export default {
    data(){
      return{
        tenantName:'',
        notClose:false,
        createOrEdit:'租户管理>新建',
        tenantForm:{//租户form
            tenantName:'',
            tenantDesc:'',
            validDate:'',
            tenantAdminId:'',
        },
        tenantRules:{//租户规则
            tenantName: [
                { required: true, message: '请输入租户名称', trigger: 'blur' },
            ],
            tenantDesc: [
                { required: true, message: '请填写租户描述', trigger: 'blur' }
            ],
            tenantAdminId: [
                { required: true, message: '请输入租户管理员名称', trigger: 'blur' },
            ],
        },
        tenantNewVisible:false,
        isTenantCreated:false,//是否新建
        tableLoading:false,
        multipleSelection:[],
        tenantData:[],//租户表格
        loading:false,//远程搜索的
        userOptions: [],
        dictData:[],//字典数据
      }
    },
    created(){
        this.getUserManageData();
        this.getTenantManageData();
        this.getDictData();
    },
    methods:{
        //获取字典数据
        getDictData(){
            let _this=this;
            axios
            .get("/setting/dict/map/USER")
            .then(function(response){
                if(response.data.success){
                    let resKeys =Object.keys(response.data.data);
                    let resValues =Object.values(response.data.data);
                    resKeys.forEach(function(el,index){
                        _this.dictData.push({key:el,value:resValues[index]});
                    })
                }
            })
        },  
        //翻译租户Code
        getNameByDict(key){
            let ret='';
            this.dictData.forEach(function(element){
                if(element.key==key){
                    ret = element.value;
                    return false;
                }
            })
            return ret;
        },
        //新建租户校验是否重名
        mapName(name){
            if(name){
                let _this=this;
                axios
                .get("/auth/tenants?tenantName="+name)
                .then(function(response){
                    if(response.data.success&&response.data.data.length>0){
                        _this.$message({
                            message: '该名称已存在',
                            type: 'warning'
                        });
                        _this.tenantForm.tenantName="";
                    }
                })
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
      //新增按钮点击事件
      addNewClick(){
        this.createOrEdit='租户管理>新建';
        this.tenantNewVisible=true;
        this.isTenantCreated=true;
        this.tenantForm={//
            tenantName:'',
            tenantDesc:'',
            tenantAdminId:'',
        }
      },
        //批量删除
        moreDeleteClick(){
          let _this = this;
          if(this.multipleSelection.length==0){
              this.$notify({                     
                duration:2000,
                message: '请选择至少一个租户',
                type: 'warning'
            });
          }else{
            this.$confirm('确认删除？')
            .then(_ => {
                let param =[];
                this.multipleSelection.forEach(element => {
                    param.push({tenantId:element.tenantId});
                });
                axios
                .delete("/auth/tenant",{data: param})
                .then(function(response){
                    if(response.data.success){
                        _this.$notify({                     
                            duration:2000,
                            message: response.data.message,
                            type: 'success'
                        });
                        _this.getTenantManageData();
                    }
                })
             },() => {}) 
          }
        },
      //查询所有租户
        getTenantManageData(){
            let _this=this;
            _this.tableLoading = true;
            axios
            .get("/auth/all_tenants")
             .then(function(response){
                 _this.tableLoading = false;
                 _this.tenantData = response.data.data;
             })
        },
        getTime(time){
            let year = time.getFullYear();
            let month = time.getMonth()+1;
            let day = time.getDate();
            return (year+'-'+month+'-'+day)
        },
        //租户新增
        submitTenantForm(formName){
            let postData = this.tenantForm;
            this.tenantForm.validDate = this.getTime(this.tenantForm.validDate);
            let _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid){
                    if(this.isTenantCreated){
                        axios
                        .post("/auth/tenant",postData)
                        .then(function(response){
                            if(response.data.success){
                                _this.tenantNewVisible=false;
                                _this.isTenantCreated=false
                                _this.getTenantManageData();
                                _this.$notify({                     
                                    duration:2000,
                                    message: response.data.message,
                                    type: 'success'
                                });

                            }else{
                                _this.$notify.error({
                                    duration:2000,
                                    message: response.data.message,
                                    type: 'success'
                                });
                            }
                        })
                    }else{
                        axios
                        .put("/auth/tenant",postData)
                        .then(function(response){
                            if(response.data.success){
                                _this.tenantNewVisible=false;
                                _this.isTenantCreated=false
                                _this.getTenantManageData();
                                _this.$notify({                     
                                    duration:2000,
                                    message: response.data.message,
                                    type: 'success'
                                });

                            }else{
                                _this.$notify.error({
                                    duration:2000,
                                    message: response.data.message,
                                    type: 'success'
                                });
                            }
                        })
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
            
        },
        subTime(time){
            return time.substring(0,19);
        },
        //租户查询
        tenantSearch(){
            let _this=this;
            axios
            .get("/auth/tenants?tenantName="+this.tenantName)
             .then(function(response){
                 _this.tenantData = response.data.data;
             })
        },
        //租户编辑
        handleTenantEdit(index, row){
            this.tenantNewVisible=true;
            this.isTenantCreated=false;
            this.tenantForm.tenantId = row.tenantId;
            this.tenantForm.validDate = new Date(row.validDate);
            this.tenantForm.tenantName = row.tenantName;
            this.tenantForm.tenantDesc = row.tenantDesc;
            this.tenantForm.tenantAdminId = row.tenantAdminId;
            this.userOptions=[{label:this.getNameByDict(row.tenantAdminId),value:row.tenantAdminId}],
            this.createOrEdit='租户管理>编辑';
        },
        //租户删除
        handleDelete(index, row) {
            console.log(index, row);
        },
        /*
        获取用户管理数据
        */
        getUserManageData(){
            let _this=this;
            axios
            .get("/auth/all_users")
             .then(function(response){
                 _this.userData = response.data.data;
                 _this.userList = _this.userData.map(item => {
                    return { value: item.userId, label: item.userName };
                });
             })
        },
        //远程搜索租户管理员
        remoteMethod(query) {
            if (query !== '') {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.userOptions = this.userList.filter(item => {
                return item.label.toLowerCase()
                    .indexOf(query.toLowerCase()) > -1;
                });
            }, 200);
            } else {
                this.userOptions = [];
            }
        },
    },
}
</script>
<style>
    .el-select {
        width: 100%;
    }
</style>

<style scope>
  .top-class{
    height: 35px;
    margin-top: 15px;
    background: #ddd; 
    border: 1px solid #ddd;
    line-height: 35px;
  }
</style>