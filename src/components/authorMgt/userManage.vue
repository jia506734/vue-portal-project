<template>
   <div>
      <div class="top-class">用户管理</div>
      <div style="margin-left:20px;margin-top:20px;">
        <el-row>
            <el-col :span="1" >用户名</el-col>
            <el-col :span="5" style="margin-right:30px;"><el-input v-model="userName" placeholder="输入用户名"></el-input></el-col>
            <el-col :span="1">手机</el-col>
            <el-col :span="5" style="margin-right:30px;"><el-input v-model="userMobile" placeholder="输入手机"></el-input></el-col>
            <el-col :span="4"><el-button type="primary" @click="searchUserData">查询</el-button></el-col>
        </el-row>
        <el-row style="margin-top:20px">
            <el-col  :span="2">
                <span style="cursor: pointer;" @click="userNewClick"><i class="el-icon-circle-plus"></i>新增</span>
            </el-col>
            <!--<el-col  :span="3">
                <span style="cursor: pointer;" ><i class="el-icon-circle-plus"></i>角色绑定</span>
            </el-col>
            <el-col  :span="2">
                <span style="cursor: pointer;" ><i class="el-icon-circle-plus"></i>导入</span>
            </el-col>
            <el-col  :span="3">
                <span style="cursor: pointer;"><i class="el-icon-circle-plus"></i>导出</span>
            </el-col>-->
        </el-row>
        <el-table
            :data="userData"
             v-loading = "tableLoading"
            style="width: 100%;margin-top:20px">
            <el-table-column
            label="用户名"
            width="130">
            <template slot-scope="scope">
                <span>{{ scope.row.userName }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="性别"
            width="130">
            <template slot-scope="scope">
                <span v-if="scope.row.userSex==0">保密</span>
                <span v-if="scope.row.userSex==1">帅哥</span>
                <span v-if="scope.row.userSex==2">靓女</span>
            </template>
            </el-table-column>
            <el-table-column
            label="手机"
            width="130">
            <template slot-scope="scope">
                <span>{{ scope.row.userMobile }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="有效期"
            width="130">
            <template slot-scope="scope">
                <span>{{ scope.row.validDate }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="角色"
            width="130">
            <template slot-scope="scope">
                <span>{{ scope.row.role }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="是否有效"
            width="130">
            <template slot-scope="scope">
                <span v-if="scope.row.userStatus==1">是</span>
                <span v-if="scope.row.userStatus==0">否</span>
            </template>
            </el-table-column>
            <el-table-column label="操作"  width="200">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleUserEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleUserDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog
        title="用户管理>新增"
        :visible.sync="userNewVisible"
        width="35%">
        <div>
            <el-form :model="userInline" :rules="rulesInline" ref="userInline" label-width="120px" class="demo-userInline">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="userInline.userName"></el-input>
                </el-form-item>
                <el-form-item label="用户性别" prop="userSex">
                    <el-select v-model="userInline.userSex" placeholder="请选择用户性别">
                        <el-option
                            v-for="item in forSexs"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户密码" prop="userPwd">
                    <el-input v-model="userInline.userPwd"></el-input>
                </el-form-item>
                <el-form-item label="用户所属租户" prop="userTenantCode">
                    <el-input v-model="userInline.userTenantCode"></el-input>
                </el-form-item>
                <el-form-item label="用户手机" prop="userMobile">
                    <el-input v-model="userInline.userMobile"></el-input>
                </el-form-item>
                <el-form-item label="用户邮件" prop="userEmail">
                    <el-input v-model="userInline.userEmail"></el-input>
                </el-form-item>
                <el-form-item label="有效日期" prop="validDate">
                    <el-date-picker format="yyyy-MM-dd"
                        v-model="userInline.validDate"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="用户状态" prop="userStatus">
                    <el-select v-model="userInline.userStatus" placeholder="请选择用户状态">
                        <el-option
                            v-for="item in forUserStatus"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="系统管理员" prop="sysAdmin">
                    <el-select v-model="userInline.sysAdmin" placeholder="请选择系统管理员">
                        <el-option
                            v-for="item in forRoles"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onUserSubmit('userInline')">立即创建</el-button>
                    <el-button @click="resetForm('userInline')">重置</el-button>
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
        userInline:{//用户form
            userId:'',
            userName:'',
            userSex:'',
            userPwd:'',//密码
            userMobile:'',
            userTenantCode:'',//用户所属租户code
            userEmail:'',
            validDate:'',
            userStatus:'',
        },
        tableLoading:false,
        rulesInline:{//用户规则
            userName: [
                { required: true, message: '请输入用户名称', trigger: 'blur' },
            ],
            userPwd:[
                { required: true, message: '请输入用户密码', trigger: 'blur' },
            ],
            userTenantCode:[
                { required: true, message: '请输入所属租户', trigger: 'blur' },
            ],
            userMobile:[
                { required: true, message: '请输入手机号', trigger: 'blur' },
            ],
        },
        forUserStatus:[{label:"有效",value:"1"},{label:"无效",value:"0"}],
        forSexs: [{value: '0',label: '保密'}, {value: '1',label: '帅哥'}, {value: '2靓女',label: '靓女'}],
        forRoles:[{value: '1', label: '系统管理员'},{ value: '0',label: '设备管理员'}],
        userName:'',
        userMobile:'',
        userData:[],
        userNewVisible:false,
      }
    },
    created(){
      this.getUserManageData();
    },
    methods:{
      /*
        获取用户管理数据
        */
        getUserManageData(){
            let _this=this;
            _this.tableLoading= true;
            axios
            .get("http://139.199.101.146:10010/auth/all_users")
             .then(function(response){
                 _this.tableLoading= false;
                 _this.userData = response.data.data;
             })
        },
        //查询指定用户
        searchUserData(){
            let _this=this;
            axios
            .get("http://139.199.101.146:10010/auth/users?userName="+this.userName+"&userMobile="+this.userMobile)
             .then(function(response){
                 _this.userData = response.data.data;
             })
        },
        userNewClick(){
            this.userNewVisible= true;
            this.isUserCreated = true;
        },
      /*
        用户新增
        */
        onUserSubmit(formName){
            
            let postData= this.userInline;
            let _this= this;
            this.$refs[formName].validate((valid) => {
            if (valid) {
                
                if(postData.userSex =="保密"){
                    postData.userSex=0;
                }
                if(postData.userSex =="帅哥"){
                    postData.userSex=1;
                }
                if(postData.userSex =="靓女"){
                    postData.userSex=2;
                }
                postData.userSex=parseInt(postData.userSex);
                let date = new Date(postData.validDate)
                postData.validDate =date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(); 
                if(this.isUserCreated){
                    axios
                    .post("http://139.199.101.146:10010/auth/user",postData)
                        .then(function(response){
                            if(response.data.success){
                                _this.userNewVisible = false;
                                _this.getUserManageData();
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
                    .put("http://139.199.101.146:10010/auth/user",postData)
                        .then(function(response){
                            
                            if(response.data.success){
                                _this.userNewVisible = false;
                                _this.getUserManageData();
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
            });
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