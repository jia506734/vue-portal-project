<template>
   <div>
      <div class="top-class"><span style="margin-left: 10px;">用户管理</span></div>
      <div style="margin-left:20px;margin-top:20px;">
        <el-row>
            <el-col :span="2" >用户名</el-col>
            <el-col :span="5" style="margin-right:30px;"><el-input v-model="userName" placeholder="输入用户名"></el-input></el-col>
            <el-col :span="1">手机</el-col>
            <el-col :span="5" style="margin-right:30px;"><el-input v-model.number="userMobile" placeholder="输入手机"></el-input></el-col>
            <el-col :span="4"><el-button type="primary" @click="searchUserData">查询</el-button></el-col>
        </el-row>
        <el-row style="margin-top:20px">
            <el-col  :span="2">
                <span style="cursor: pointer;" @click="userNewClick"><i class="el-icon-circle-plus"></i>新增</span>
            </el-col>
            <el-col  :span="2">
                <span style="cursor: pointer;" @click="moreDeleteClick"><i class="el-icon-delete"></i>删除</span>
            </el-col>
            <el-col  :span="3">
                <span style="cursor: pointer;" @click="roleBindClick"><i class="el-icon-circle-plus"></i>角色绑定</span>
            </el-col>
            <!-- <el-col  :span="2">
                <span style="cursor: pointer;" ><i class="el-icon-circle-plus"></i>导入</span>
            </el-col>
            <el-col  :span="3">
                <span style="cursor: pointer;"><i class="el-icon-circle-plus"></i>导出</span>
            </el-col> -->
        </el-row>
        <el-table
            border
            ref="multipleTable"
            :data="userData"
            tooltip-effect="dark"
             @selection-change="handleSelectionChange"
             v-loading = "tableLoading"
            style="width: 100%;margin-top:20px">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
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
            <el-table-column label="操作"  width="80">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="primary"
                    @click="handleUserEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog
        :title="createOrEdit"
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
                <el-form-item label="用户密码" prop="userPwd" v-if="isUserCreated">
                    <el-input v-model="userInline.userPwd" type="password"></el-input>
                </el-form-item>
                <el-form-item label="用户所属租户" prop="userTenantCode">
                    <el-select v-model="userInline.userTenantCode" placeholder="请选择租户">
                        <el-option v-for="(item,index) in tenantData" 
                            :key="index" :label="item.tenantName" :value="item.tenantId">
                        </el-option>
                    </el-select>
                    <!-- <el-input v-model="userInline.userTenantCode"></el-input> -->
                </el-form-item>
                <el-form-item label="用户手机" prop="userMobile">
                    <el-input :maxlength=11 v-model.number="userInline.userMobile"></el-input>
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
                    <el-button @click="userNewVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
        <el-dialog
        title="角色管理->角色绑定"
        :visible.sync="roleBindShow"
        width="45%">
        <div class="borderdiv">
            <el-row>
                <el-col :span="10" style="margin-right:10px;"><el-input placeholder="请输入角色名"></el-input></el-col>
                 <el-col :span="3"><el-button type="primary">添加</el-button></el-col>
            </el-row>
            
            
        </div>
    </el-dialog>
   </div>
</template>
<script>
import axios from "axios"
export default {
    data(){
         var checkEmail = (rule, value, callback) => {
            if (!value) {
                return callback();
            }
            if (value) {
                setTimeout(() => {
                    var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                    if (!reg.test(value)) {
                        callback(new Error('请输入有效的电子邮箱！'));
                    } else {
                        callback();
                    }
                }, 500);
            }
        };
      return{
        createOrEdit:'用户管理>新增',
        isUserCreated:false,
        roleBindShow:false,
        tenantData:[],//所有租户
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
            sysAdmin:'',
        },
        roleData:[],//角色列表
        roleDataTemp:[],
        tableLoading:false,
        rulesInline:{//用户规则
            userName: [
                { required: true, message: '请输入用户名称', trigger: 'blur' },
            ],
            userPwd:[
                { required: true, message: '请输入用户密码', trigger: 'blur' },
                { min: 8, max: 15, message: '长度在 8 到 15 个字符', trigger: 'blur' },
                {pattern: /^(\w){6,20}$/,message: '只能输入6-20个字母、数字、下划线'}
            ],
            userTenantCode:[
                { required: true, message: '请输入所属租户', trigger: 'blur' },
            ],
            userMobile:[
                { required: true, message: '请输入手机号', trigger: 'blur' },
                {pattern: /^[1-9]\d*$/,message: '只能输入数字'},
            ],
            userEmail: [
                {validator: checkEmail, trigger: 'blur,change'}
            ],
        },
        forUserStatus:[{label:"有效",value:"1"},{label:"无效",value:"0"}],
        forSexs: [{value: '0',label: '保密'}, {value: '1',label: '帅哥'}, {value: '2靓女',label: '靓女'}],
        forRoles:[{value: '1', label: '系统管理员'},{ value: '0',label: '设备管理员'}],
        userName:'',
        userMobile:'',
        userData:[],
        userNewVisible:false,
        multipleSelection: [],
        bindId:'',
      }
    },
    created(){
      this.getUserManageData();
      this.getAllRoleDate();
      this.getTenantManageData();
    },
    methods:{
        roleBindClick(){
            if(this.multipleSelection.length==1){
                this.bindId= this.multipleSelection[0].userId;
                this.roleBindShow = true;
                 this.getRoleData();
            }else{
                this.$notify({
                    message:'请选择一个用户',
                    type: 'warning'
                });
            }
        },
        //查询所有租户
        getTenantManageData(){
            let _this=this;
            axios
            .get("/auth/all_tenants")
             .then(function(response){
                 _this.tenantData = response.data.data;
             })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //批量删除
        moreDeleteClick(){
          let _this = this;
          if(this.multipleSelection.length==0){
              this.$notify({
                message: '请选择至少一个用户',
                type: 'warning'
            });
          }else{
            this.$confirm('确认删除？')
                .then(_ => {
                let param =[];
                let user={};
                this.multipleSelection.forEach(element => {
                    user.userId = element.userId;
                    param.push(user);
                });
                axios
                .delete("/auth/user",{data: param})
                .then(function(response){
                    if(response.data.success){
                        _this.$notify({
                            message: response.data.message,
                            type: 'success'
                        });
                        _this.getUserManageData()
                    }
                })
              },() => {}
            )}
        },
      /*
        获取用户管理数据
        */
        getUserManageData(){
            let _this=this;
            _this.tableLoading= true;
            axios
            .get("/auth/all_users")
             .then(function(response){
                 _this.tableLoading= false;
                 _this.userData = response.data.data;
             })
        },
        //查询所有角色
      getAllRoleDate(){
        let _this=this;
        axios
        .get("/auth/all_roles")
            .then(function(response){
                _this.roleData = response.data.data;
                _this.roleDataTemp = response.data.data.slice(0);
            })
      },
        //查询指定用户
        searchUserData(){
            let _this=this;
            axios
            .get("/auth/users?userName="+this.userName+"&userMobile="+this.userMobile)
             .then(function(response){
                 _this.userData = response.data.data;
             })
        },
        userNewClick(){
            this.userInline={//用户form
                userId:'',
                userName:'',
                userSex:'',
                userPwd:'',//密码
                userMobile:'',
                userTenantCode:'',//用户所属租户code
                userEmail:'',
                validDate:'',
                userStatus:'',
                sysAdmin:'',
            };
            this.userNewVisible= true;
            this.isUserCreated = true;
        },
        handleUserEdit(index, row){
            this.userNewVisible=true;
            this.isUserCreated=false;
            this.userInline.userId = row.userId;
            this.userInline.userName = row.userName;
            this.userInline.userSex = row.userSex==0?"保密":(row.userSex==1?"帅哥":'靓女');
            this.userInline.userPwd = row.userPwd;
            this.userInline.userMobile = row.userMobile;
            this.userInline.userTenantCode = row.userTenantCode;
            this.userInline.userEmail = row.userEmail;
            this.userInline.validDate = row.validDate;
            this.userInline.userStatus = row.userStatus==0?'无效':'有效';
            this.userInline.sysAdmin = row.userStatus==0?'系统管理员':'设备管理员';
            this.createOrEdit='用户管理>编辑';
        },
      /*
        用户新增
        */
        onUserSubmit(formName){
            if(this.userInline.userMobile.length<11){
                 _this.$notify.error({
                    message: '手机号码格式不正确',
                    type: 'warning'
                });
            }
            let postData= this.userInline;
            let _this= this;
            this.$refs[formName].validate((valid) => {
            if (valid) {
                
                if(postData.sysAdmin =="系统管理员"){
                    postData.sysAdmin =1;
                }else{
                    postData.sysAdmin =0;
                }
                if(postData.userStatus =="有效"){
                    postData.userStatus =1;
                }else{
                    postData.userStatus =0;
                }
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
                    .post("/auth/user",postData)
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
                    .put("/auth/user",postData)
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
                                    type: 'warning'
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
    margin-top: 15px;
    background: #ddd; 
    border: 1px solid #ddd;
    line-height: 35px;
  }
  .borderdiv{
    border: 1px solid #ddd;
    height: 250px;
    margin-top: -20px;
  }
</style>