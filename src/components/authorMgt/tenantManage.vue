<template>
  <div>
    <div class="top-class"><span style="margin-left: 10px;">租户管理</span></div>
    <div style="margin-left:20px;margin-top:20px;">
        <el-row>
            <el-col :span="1" >租户名称</el-col>
            <el-col :span="5" style="margin-right:30px;"><el-input v-model="tenantName" placeholder="输入租户名"></el-input></el-col>
            <el-col :span="4"><el-button type="primary" @click="tenantSearch">查询</el-button></el-col>
        </el-row>
        <el-row style="margin-top:20px">
            <el-col  :span="2">
                <span style="cursor: pointer;" @click="addNewClick"><i class="el-icon-circle-plus"></i>新增</span>
            </el-col>
        </el-row>
        <el-table v-loading = "tableLoading"
            :data="tenantData"
            style="width: 180%;margin-top:20px">
            <el-table-column
            label="租户名称"
            width="200">
            <template slot-scope="scope">
                <span>{{ scope.row.tenantName }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="租户描述"
            width="280">
            <template slot-scope="scope">
                <span>{{ scope.row.tenantDesc }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="租户管理员"
            width="130">
            <template slot-scope="scope">
                <span>{{ scope.row.tenantAdminId }}</span>
            </template>
            </el-table-column>
            <el-table-column label="操作"  width="200">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleTenantEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog
        title="租户管理>新建"
        :visible.sync="tenantNewVisible"
        width="40%">
        <div class="tenant-div">
            <el-form :model="tenantForm" :rules="tenantRules" ref="tenantForm" label-width="100px" class="demo-tenantForm">
                <el-form-item label="租户名称" prop="tenantName">
                    <el-input v-model="tenantForm.tenantName"></el-input>
                </el-form-item>
                <el-form-item label="租户描述" prop="tenantDesc">
                    <el-input type="textarea" v-model="tenantForm.tenantDesc"></el-input>
                </el-form-item>
                <el-form-item label="租户管理员" prop="tenantAdminId">
                    <el-select
                        v-model="tenantForm.tenantAdminId"
                        filterable
                        remote
                        placeholder="请输入关键词"
                        :remote-method="remoteMethod"
                        :loading="loading">
                        <el-option
                        v-for="item in options4"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitTenantForm('tenantForm')">确定</el-button>
                    <el-button @click="resetForm('tenantForm')">重置</el-button>
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
        tenantForm:{//租户form
            tenantName:'',
            tenantDesc:'',
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
        tenantData:[],//租户表格
        loading:false,//远程搜索的
        options4: [],
        states: ["Alabama", "Alaska", "Arizona",
        "Arkansas", "California", "Colorado",
        "Connecticut", "Delaware", "Florida",
        "Georgia", "Hawaii", "Idaho", "Illinois",
        "Indiana", "Iowa", "Kansas", "Kentucky",
        "Louisiana", "Maine", "Maryland",
        "Massachusetts", "Michigan", "Minnesota",
        "Mississippi", "Missouri", "Montana",
        "Nebraska", "Nevada", "New Hampshire",
        "New Jersey", "New Mexico", "New York",
        "North Carolina", "North Dakota", "Ohio",
        "Oklahoma", "Oregon", "Pennsylvania",
        "Rhode Island", "South Carolina",
        "South Dakota", "Tennessee", "Texas",
        "Utah", "Vermont", "Virginia",
        "Washington", "武龙斌", "贾鹏飞",
        "张佩博"],
      }
    },
    created(){
      this.getTenantManageData();
    },
    mounted() {
      this.tenantList = this.states.map(item => {
        return { value: item, label: item };
      });
    },
    methods:{
      //新增按钮点击事件
      addNewClick(){
        this.tenantNewVisible=true;
        this.isTenantCreated=true;
        this.tenantForm={//
            tenantName:'',
            tenantDesc:'',
            tenantAdminId:'',
        }
      },
      /*
        重置新增界面
        */
        resetForm(formName) {
            this.$refs[formName].resetFields();
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
        //租户新增
        submitTenantForm(formName){
            let postData = this.tenantForm
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
                                    message: response.data.message,
                                    type: 'success'
                                });

                            }else{
                                _this.$notify.error({
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
                                    message: response.data.message,
                                    type: 'success'
                                });

                            }else{
                                _this.$notify.error({
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
            this.tenantForm.tenantName = row.tenantName;
            this.tenantForm.tenantDesc = row.tenantDesc;
            this.tenantForm.tenantAdminId = row.tenantAdminId;
        },
        //租户删除
        handleDelete(index, row) {
            console.log(index, row);
        },
        //远程搜索租户管理员
        remoteMethod(query) {
            if (query !== '') {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.options4 = this.tenantList.filter(item => {
                return item.label.toLowerCase()
                    .indexOf(query.toLowerCase()) > -1;
                });
            }, 200);
            } else {
            this.options4 = [];
            }
        },
    },
}
</script>

<style scope>
  .top-class{
    height: 35px;
    margin-top: 5px;
    border: 1px solid #ddd;
    line-height: 35px;
  }
</style>