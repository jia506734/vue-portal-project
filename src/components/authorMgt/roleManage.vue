<template>
  <div>
      <div class="top-class"><span style="margin-left: 10px;">角色管理</span></div>
      <div style="margin-left:20px;margin-top:20px;">
        <el-row>
            <el-col :span="1" >角色名</el-col>
            <el-col :span="5" style="margin-right:30px;"><el-input v-model="roleName" placeholder="输入角色名"></el-input></el-col>
            <el-col :span="4"><el-button type="primary" @click="searchRoleData">查询</el-button></el-col>
        </el-row>
        <el-row style="margin-top:20px">
            <el-col  :span="2">
                <span style="cursor: pointer;" @click="roleNewClick"><i class="el-icon-circle-plus"></i>新增</span>
            </el-col>
            <el-col  :span="3">
                <span style="cursor: pointer;" @click="roleNewVisible = true"><i class="el-icon-circle-plus"></i>角色授权</span>
            </el-col>
        </el-row>
        <el-table
            v-loading = "tableLoading"
            :data="roleData"
            style="width: 100%;margin-top:20px">
            <el-table-column
            label="角色"
            width="130">
            <template slot-scope="scope">
                <span>{{ scope.row.roleName }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="角色描述"
            width="130">
            <template slot-scope="scope">
                <span>{{ scope.row.roleDesc }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="是否有效"
            width="130">
            <template slot-scope="scope">
                <span>{{ scope.row.valid }}</span>
            </template>
            </el-table-column>
            <el-table-column label="操作"  width="200">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleRoleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog
        title="角色管理>新建"
        :visible.sync="roleNewAddVisible"
        width="40%">
        <div class="role-div">
            <el-form :model="roleInline" :rules="rulesInline" ref="roleInline" label-width="120px" class="demo-roleInline">
                <el-form-item label="租户" prop="authTenant">
                    <el-input v-model="roleInline.authTenant"></el-input>
                </el-form-item>
                <el-form-item label="角色ID" prop="roleId">
                    <el-input v-model="roleInline.roleId"></el-input>
                </el-form-item>
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="roleInline.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input type="textarea" v-model="roleInline.roleDesc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onRoleSubmit('userInline')">确定</el-button>
                    <el-button @click="resetForm('userInline')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
    <el-dialog
        title="角色管理>角色授权"
        :visible.sync="roleNewVisible"
        width="40%">
        <div class="role-div">
            
        </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios"
export default {
    data(){
      return{
        roleName:'',
        roleNewAddVisible:false,
        roleNewVisible:false,
        isCreate:false,//是否新建
        roleData:[],
        tableLoading:false,
        roleInline:{//用户form
            authTenant:'',
            roleId:'',
            roleName:'',
            roleDesc:'',
        },
        rulesInline:{
          authTenant:[
                { required: true, message: '请输入租户', trigger: 'blur' },
            ],
           roleId: [
                { required: true, message: '请输入用户ID', trigger: 'blur' },
            ],
            roleName:[
                { required: true, message: '请输入用户名称', trigger: 'blur' },
            ],
        },
      }
    },
    created(){
      this.getAllDate();
    },
    methods:{
        //角色编辑
        handleRoleEdit(index, row){
            this.roleNewAddVisible=true;
            this.isCreate=false;
            this.roleInline.authTenant = row.authTenant;
            this.roleInline.roleId = row.roleId;
            this.roleInline.roleName = row.roleName;
            this.roleInline.roleDesc = row.roleDesc;
        },
      //角色新增
        onRoleSubmit(formName){
            let postData = this.roleInline;
            let _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid){
                    if(this.isCreate){
                        axios
                        .post("/role/roel",postData)
                        .then(function(response){
                            if(response.data.success){
                                _this.roleNewAddVisible=false;
                                _this.isCreate=false
                                _this.getAllDate();
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
                        .put("/role/roel",postData)
                        .then(function(response){
                            if(response.data.success){
                               _this.roleNewAddVisible=false;
                                _this.isCreate=false
                                _this.getAllDate();
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
      //查询所有角色
      getAllDate(){
        let _this=this;
            _this.tableLoading= false;
            axios
            .get("/auth/all_roles")
             .then(function(response){
                 _this.tableLoading= false;
                 _this.roleData = response.data.data;
             })
      },
      //查询指定用户
        searchRoleData(){
            // let _this=this;
            // axios
            // .get("/auth/users?userName="+this.userName+"&userMobile="+this.userMobile)
            //  .then(function(response){
            //      _this.userData = response.data.data;
            //  })
        },
        roleNewClick(){
          roleInline={//用户form
              authTenant:'',
              roleId:'',
              roleName:'',
              roleDesc:'',
          },
          this.roleNewAddVisible=true;
          this.isCreate=true;
        },
        handleRoleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
         /*
        重置新增界面
        */
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    }
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