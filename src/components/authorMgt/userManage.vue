<template>
   <div class="user-mgt">
      <div class="top-class"><span style="margin-left: 10px;">用户管理</span></div>
      <div style="margin-left:20px;margin-top:20px;">
        <el-row>
            <el-col :span="1" >用户名</el-col>
            <el-col :span="5" style="margin-right:30px;"><el-input v-model="userName" placeholder="输入用户名"></el-input></el-col>
            <el-col :span="1">手机</el-col>
            <el-col :span="5" style="margin-right:30px;"><el-input v-model.number="userMobile" placeholder="输入手机"></el-input></el-col>
            <!--<el-col :span="1">所属租户</el-col>
            <el-col :span="5" style="margin-right:30px;"><el-input v-model="userTenant" placeholder="输入所属租户"></el-input></el-col>-->
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
            style="margin-top:20px">
            <el-table-column
            type="selection"
            fixed
            width="55">
            </el-table-column>
            <el-table-column label="操作"  width="80" fixed>
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="primary"
                    @click="handleUserEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
                </template>
            </el-table-column>
            <el-table-column
            label="用户名" >
            <template slot-scope="scope">
                <span>{{ scope.row.userName }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="所属租户" >
            <template slot-scope="scope">
                <span>{{getNameByDict(scope.row.tenantCode) }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="性别" >
            <template slot-scope="scope">
                <span v-if="scope.row.userSex==0">保密</span>
                <span v-if="scope.row.userSex==1">帅哥</span>
                <span v-if="scope.row.userSex==2">靓女</span>
            </template>
            </el-table-column>
            <el-table-column
            label="手机" >
            <template slot-scope="scope">
                <span>{{ scope.row.userMobile }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="有效期" >
            <template slot-scope="scope">
                <span>{{ scope.row.validDate }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="角色" >
            <template slot-scope="scope">
                <span>{{ scope.row.roleName}}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="是否有效" >
            <template slot-scope="scope">
                <span v-if="scope.row.userStatus==1">是</span>
                <span v-if="scope.row.userStatus==0">否</span>
            </template>
            </el-table-column>
            <el-table-column
                label="创建时间" >
                <template slot-scope="scope">
                    <span>{{ subTime(scope.row.createdDate) }}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog
        :title="createOrEdit"
        :visible.sync="userNewVisible"
        :close-on-click-modal="notClose"
        width="35%">
        <div>
            <el-form :model="userInline" :rules="rulesInline" ref="userInline" label-width="120px" class="demo-userInline">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="userInline.userName" @blur="mapName(userInline.userName)"></el-input>
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
                <el-form-item label="用户所属租户" prop="tenantCode">
                    <el-select v-model="userInline.tenantCode" placeholder="请选择租户">
                        <el-option v-for="(item,index) in tenantData" 
                            :key="index" :label="item.tenantName" :value="item.tenantId">
                        </el-option>
                    </el-select>
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
                <el-form-item>
                    <el-button type="primary" @click="onUserSubmit('userInline')">确定</el-button>
                    <el-button @click="userNewVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
        <el-dialog
        title="角色管理->角色绑定"
        :close-on-click-modal="notClose"
        :visible.sync="roleBindShow"
        width="45%">
        <div class="borderdiv">
            <el-row>
                <el-col :span="10" style="margin-right:10px;">
                    <el-select v-model="choosedRole" filterable placeholder="请输入角色名">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                 <el-col :span="3">
                    <el-button type="primary" 
                    @click="addRole"
                    :disabled="choosedRole.length==0">添加</el-button>
                </el-col>
            </el-row>
            <el-table
                :data="roleTableData"
                class="tableRole"
                border
                style="width: 100%">
                <el-table-column
                  prop="roleName"
                  label="角色"
                  width="283">
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="283">
                  <template slot-scope="scope">
                    <el-button @click="deleteRole(scope.row)" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
            </el-table>
        </div>
    </el-dialog>
   </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
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
        userTenant:'',//所属租户
        isUserCreated:false,
        roleBindShow:false,
        notClose:false,
        tenantData:[],//所有租户
        userInline:{//用户form
            userId:'',
            userName:'',
            userSex:'',
            userPwd:'',//密码
            userMobile:'',
            tenantCode:'',//用户所属租户code
            userEmail:'',
            validDate:'',
            userStatus:'',
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
            tenantCode:[
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
        options: [],
        choosedRole: '',
        roleTableData: [],
        roleHaveExist: [],
        dictData:[],//字典数据
      }
    },
    computed:{
        ...mapState(["tenantId"]),
    },
    created(){
      this.getUserManageData();
      this.getAllRoleDate();
      this.getTenantManageData();
      this.getDictData();
    },
    methods:{
        //获取字典数据
        getDictData(){
            let _this=this;
            axios
            .get("/setting/dict/map/TENANT")
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
            return ret
        },
        //校验用户名重复性
         mapName(name){
            if(name){
                let _this=this;
                axios
                .get("/auth/users?userName="+name)
                .then(function(response){
                    if(response.data.success&&response.data.data.length>0){
                        _this.$message({
                            message: '该名称已存在',
                            type: 'warning'
                        });
                        _this.userInline.userName="";
                    }
                })
            }
        },
        roleBindClick(){
            if(this.multipleSelection.length==1){
                this.bindId= this.multipleSelection[0].userId;
                this.roleBindShow = true;
                this.getAllRoleDate();
                this.getRoleData();
            }else{
                this.$notify({                     
                    duration:2000,
                    message:'请选择一个用户',
                    type: 'warning'
                });
            }
        },

        //获取用户角色
        getRoleData(){
            let _this=this;
            axios.get("/auth/roles/"+_this.bindId)
            .then(function(response){
                _this.roleTableData = response.data.data
                _this.roleHaveExist = []
                for(let key in _this.roleTableData){
                    _this.roleHaveExist.push(_this.roleTableData[key].roleId)
                }
            })
        },
        subTime(time){
            return time.substring(0,19);
        },
        //删除用户已有角色
        deleteRole(row){
            let _this=this;
            let arr = [{
                roleId:row.roleId
            }]
            axios
            .delete("/auth/role/"+_this.bindId,{data:arr})
            .then(function(response){
                if(response.data.success){
                    _this.$notify({                     
                        duration:2000,
                      message: '删除成功',
                      type: 'success'
                    });
                    _this.getRoleData()
                    _this.choosedRole=''
                }
            })
        },
        //为用户添加角色
        addRole(){
            if(this.roleHaveExist.indexOf(this.choosedRole)!=-1){
                this.$notify.error({
                    duration:2000,
                  message: '所选角色已存在，请重新选择！',
                  type: 'warning'
                });
                return
            }
            let _this=this;
            let param = {
                userId:_this.bindId,
                roleId:_this.choosedRole
            }
            axios
            .post("/auth/role/link",param)
            .then(function(response){
                if(response.data.success){
                    _this.$notify({                     
                        duration:2000,
                      message: '添加成功',
                      type: 'success'
                    });
                    _this.roleBindShow = false;
                    _this.getUserManageData();
                }
            })
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
                  duration:2000,
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
                            duration:2000,
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
            this.userName="";
            this.userMobile ="";
            let _this=this;
            _this.tableLoading= true;
            axios
            .get("/auth/users?tenantCode="+this.$store.state.tenantId)
             .then(function(response){
                 _this.tableLoading= false;
                 if(response.data.success){
                    _this.userData = response.data.data;
                    _this.userData.forEach(el=>{
                        let roleName=[];
                        let roleId=[];
                        el.userRoleList.forEach(element=>{
                            roleId.push(element.roleId);
                            roleName.push(element.roleName);
                        })
                        el.roleName = roleName.join(';')
                        el.roleId = roleId.join(';')
                    })
                 }
             })
        },
        //查询所有角色
      getAllRoleDate(){
        let _this=this;
        axios
         .get("/auth/roles?tenantCode="+this.$store.state.tenantId)
            .then(function(response){
                _this.roleData = response.data.data;
                _this.options = [];
                for(let key in _this.roleData){
                 _this.options.push({
                    'value':_this.roleData[key].roleId,
                    'label':_this.roleData[key].roleName
                 });
                }
                _this.roleDataTemp = response.data.data.slice(0);
            })
      },
        //查询指定用户
        searchUserData(){
            let _this=this;
            axios
            .get("/auth/users?userName="+this.userName+"&userMobile="+this.userMobile+"&tenantCode="+this.$store.state.tenantId)
             .then(function(response){
                 _this.userData = response.data.data;
                _this.userData.forEach(el=>{
                    let roleName=[];
                    let roleId=[];
                    el.userRoleList.forEach(element=>{
                        roleId.push(element.roleId);
                        roleName.push(element.roleName);
                    })
                    el.roleName = roleName.join(';')
                    el.roleId = roleId.join(';')
                })
             })
        },
        userNewClick(){
            this.userInline={//用户form
                userId:'',
                userName:'',
                userSex:'',
                userPwd:'',//密码
                userMobile:'',
                tenantCode:'',//用户所属租户code
                userEmail:'',
                validDate:'',
                userStatus:'',
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
            this.userInline.tenantCode = row.tenantCode;
            this.userInline.userEmail = row.userEmail;
            this.userInline.validDate = row.validDate;
            this.userInline.userStatus = row.userStatus==0?'无效':'有效';
            this.createOrEdit='用户管理>编辑';
        },
      /*
        用户新增
        */
        onUserSubmit(formName){
            if(this.userInline.userMobile.toString().length<11){
                 this.$notify.error({
                    duration:2000,
                    message: '手机号码格式不正确',
                    type: 'warning'
                });
                return false;
            }
            let postData={};
            postData.userId= this.userInline.userId;
            postData.userName= this.userInline.userName;
            postData.userSex= this.userInline.userSex;
            postData.userPwd= this.userInline.userPwd;
            postData.userMobile= this.userInline.userMobile;
            postData.tenantCode= this.userInline.tenantCode;
            postData.userEmail= this.userInline.userEmail;
            postData.validDate= this.userInline.validDate;
            postData.userStatus= this.userInline.userStatus;
            let _this= this;
            this.$refs[formName].validate((valid) => {
            if (valid) {
                if(postData.userStatus =="有效"){
                    postData.userStatus =1;
                }
                if(postData.userStatus =="无效"){
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
                    .put("/auth/user",postData)
                        .then(function(response){
                            
                            if(response.data.success){
                                _this.userNewVisible = false;
                                _this.getUserManageData();
                                _this.$notify({                     
                                    duration:2000,
                                    message: response.data.message,
                                    type: 'success'
                                });
                            }else{
                                _this.$notify.error({
                                    duration:2000,
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
<style>
    .el-select{
        width: 100%;
    }
    .user-mgt .el-date-editor.el-input, .user-mgt .el-date-editor.el-input__inner{
        width: 100% !important;
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
  .borderdiv{
    height: 250px;
    margin-top: -20px;
  }
  .tableRole{
    margin-top: 10px;
  }
  .tableRole th,.tableRole td{
    text-align: center;
  }
</style>