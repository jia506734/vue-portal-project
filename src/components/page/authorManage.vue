<template>
    <div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="菜单管理" name="first">
                <div style="margin-left:20px;">
                    <el-row>
                        <el-col :span="2" >菜单Code</el-col>
                        <el-col :span="4" style="margin-right:30px;"><el-input v-model="menuCode" placeholder="输入菜单Code"></el-input></el-col>
                        <el-col :span="2">菜单名称</el-col>
                        <el-col :span="4" style="margin-right:30px;"><el-input v-model="menuName" placeholder="输入菜单名称"></el-input></el-col>
                        <el-col :span="2">父级菜单</el-col>
                        <el-col :span="4" style="margin-right:30px;"><el-input v-model="menuFather" placeholder="输入父级菜单"></el-input></el-col>
                        <el-col :span="4"><el-button type="primary">查询</el-button></el-col>
                    </el-row>
                    <el-row style="margin-top:20px">
                        <el-col  :span="2">
                            <span style="cursor: pointer;" @click="addNewClick"><i class="el-icon-circle-plus"></i>新增</span>
                        </el-col>
                        <el-col  :span="3">
                            <span style="cursor: pointer;" @click="resourceNewClick"><i class="el-icon-circle-plus"></i>资源号</span>
                        </el-col>
                    </el-row>
                    <el-table
                        :data="tableData"
                        style="width: 100%;margin-top:20px">
                        <el-table-column
                        label="Code"
                        width="130">
                        <template slot-scope="scope">
                            <span>{{ scope.row.Code }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="名称"
                        width="130">
                        <template slot-scope="scope">
                            <span>{{ scope.row.Name }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="父级菜单"
                        width="130">
                        <template slot-scope="scope">
                            <span>{{ scope.row.FatherMenu }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="顺序"
                        width="130">
                        <template slot-scope="scope">
                            <span>{{ scope.row.Order }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="样式"
                        width="130">
                        <template slot-scope="scope">
                            <span>{{ scope.row.Style }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="图标"
                        width="130">
                        <template slot-scope="scope">
                            <span>{{ scope.row.Icon }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="首地址"
                        width="130">
                        <template slot-scope="scope">
                            <span>{{ scope.row.Address }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="是否可见"
                        width="130">
                        <template slot-scope="scope">
                            <span>{{ scope.row.IsSeen }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column label="操作"  width="200">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                </div>
                <el-dialog
                    title="菜单管理>新增"
                    :visible.sync="addNewVisible"
                    width="30%"
                    :before-close="handleClose">
                    <el-dialog
                        title="菜单顺序"
                        :visible.sync="orderVisible"
                        width="30%"
                        append-to-body>
                        <el-row style="margin-top: -25px;">
                            <el-col :span="24">
                                <i class="el-icon-sort-up"></i><span style="padding-right:10px">上移</span>
                                <i class="el-icon-sort-down"></i><span>下移</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <div style="height:200px;width:100%;border:1px solid #ddd">
                                    <el-row>
                                        <el-col :span="24">1.菜单1</el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="24">2.菜单2</el-col>
                                    </el-row>
                                </div>
                            </el-col>
                        </el-row>
                        <div style="text-align:center;margin-top:15px">
                            <el-button type="primary" @click="orderVisible = false">确定</el-button>
                            <el-button @click="orderVisible = false">关闭</el-button>
                        </div>
                    </el-dialog>
                    <div>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="菜单名称" prop="name">
                                <el-input v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="父级菜单" prop="fatherMenu">
                                <el-select v-model="ruleForm.fatherMenu" placeholder="请选择父级菜单">
                                <el-option label="首页" value="indexPage"></el-option>
                                <el-option label="集中巡检" value="secondSelect"></el-option>
                                <el-option label="分析评估" value="analyze"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="菜单顺序" prop="order">
                                <div style="width:100%;height:30px;border:1px solid #ddd;" @click="orderVisible = true"></div>
                            </el-form-item>
                            <el-form-item label="菜单样式" prop="style">
                                <el-input v-model="ruleForm.style"></el-input>
                            </el-form-item>
                            <el-form-item label="菜单图标" prop="icon">
                                <el-input v-model="ruleForm.icon"></el-input>
                            </el-form-item>
                            <el-form-item label="菜单首地址" prop="mainMenu">
                                <el-input v-model="ruleForm.mainMenu"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                                <el-button @click="resetForm('ruleForm')">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-dialog>
                <el-dialog
                    title="菜单管理>资源号新建"
                    :visible.sync="resourceNewVisible"
                    width="35%">
                    <div>
                        <el-form :inline="true" :model="formInline" class="demo-form-inline">
                            <el-form-item label="资源号名称" :rules="[{ required: true, message: '请输入资源号名称', trigger: 'blur' }]">
                                <el-input v-model="formInline.resourceName" placeholder="资源号名称"></el-input>
                            </el-form-item>
                            <el-form-item label="父级菜单">
                                <el-button type="primary">用户管理</el-button>
                            </el-form-item>
                        </el-form>
                        <el-form :inline="true" :model="formInline" class="demo-form-inline">
                            <el-form-item label="资源号顺序">
                                <el-input v-model="formInline.resourceOrder" placeholder="资源号名称"></el-input>
                            </el-form-item>
                            <el-form-item label="资源号样式">
                                <el-input v-model="formInline.resourceStyle" placeholder="资源号样式"></el-input>
                            </el-form-item>
                        </el-form>
                        <el-form :inline="true" :model="formInline" class="demo-form-inline">
                            <el-form-item label="资源号图标">
                                <el-input v-model="formInline.resourceIcon" placeholder="资源号图标"></el-input>
                            </el-form-item>
                            
                        </el-form>
                        <el-form :inline="true"  :model="formInline" class="demo-form-inline">
                            <el-form-item label="资源号服务" :rules="[{ required: true, message: '请输入资源号服务', trigger: 'blur' }]">
                                <el-input v-model="formInline.resourceService" placeholder="资源号服务"></el-input>
                            </el-form-item>
                        </el-form>
                        
                    </div>
                </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="用户管理" name="second">
                <div style="margin-left:20px;">
                    <el-row>
                        <el-col :span="1" >用户名</el-col>
                        <el-col :span="5" style="margin-right:30px;"><el-input v-model="userName" placeholder="输入用户名"></el-input></el-col>
                        <el-col :span="1">手机</el-col>
                        <el-col :span="5" style="margin-right:30px;"><el-input v-model="userPhone" placeholder="输入手机"></el-input></el-col>
                        <el-col :span="4"><el-button type="primary" @click="searchUserData">查询</el-button></el-col>
                    </el-row>
                    <el-row style="margin-top:20px">
                        <el-col  :span="2">
                            <span style="cursor: pointer;" @click="userNewClick"><i class="el-icon-circle-plus"></i>新增</span>
                        </el-col>
                        <el-col  :span="3">
                            <span style="cursor: pointer;" @click="resourceNewClick"><i class="el-icon-circle-plus"></i>角色绑定</span>
                        </el-col>
                        <el-col  :span="2">
                            <span style="cursor: pointer;" ><i class="el-icon-circle-plus"></i>导入</span>
                        </el-col>
                        <el-col  :span="3">
                            <span style="cursor: pointer;"><i class="el-icon-circle-plus"></i>导出</span>
                        </el-col>
                    </el-row>
                    <el-table
                        :data="userData"
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
            </el-tab-pane>
            <el-tab-pane label="角色管理" name="third">
                <div style="margin-left:20px;">
                    <el-row>
                        <el-col :span="1" >角色名</el-col>
                        <el-col :span="5" style="margin-right:30px;"><el-input v-model="menuCode" placeholder="输入角色名"></el-input></el-col>
                        <el-col :span="4"><el-button type="primary">查询</el-button></el-col>
                    </el-row>
                    <el-row style="margin-top:20px">
                        <el-col  :span="2">
                            <span style="cursor: pointer;" ><i class="el-icon-circle-plus"></i>新增</span>
                        </el-col>
                        <el-col  :span="3">
                            <span style="cursor: pointer;" @click="roleNewVisible = true"><i class="el-icon-circle-plus"></i>角色授权</span>
                        </el-col>
                    </el-row>
                    <el-table
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
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                </div>
                <el-dialog
                    title="角色管理>角色授权"
                    :visible.sync="roleNewVisible"
                    width="40%">
                    <div class="role-div">
                        
                    </div>
                </el-dialog>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
  import axios from "axios"
  export default {
    data() {
      return {
        activeName: 'first',
        menuCode:'',//菜单Code
        menuName:'',//菜单名称
        menuFather:'',//父级菜单
        resourceNewVisible:false,
        orderVisible:false,
        roleNewVisible:false,
        isUserCreated:false,
        userName:'',
        userPhone:'',
        userInline:{
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
        rulesInline:{
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
        roleData:[{
            roleName:'',
            roleDesc:'',
            valid:''
        },
        {
            roleName:'',
            roleDesc:'',
            valid:''
        }],
        userData:[],
        tableData: [],

        value: '',
        addNewVisible:false,
        userNewVisible:false,
         ruleForm: {
          name: '',
          fatherMenu: '',
          order: '',
          style: '',
          icon: '',
          mainMenu: ''
        },
        formInline: {
            resourceName: '',
            resourceOrder: '',
            resourceStyle:'',
            resourceIcon:'',
            resourceService:'',
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
         
          mainMenu: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    created(){
        //用户查询
        // this.getUserManageData();
    },
    methods: {
        /*
        获取用户管理数据
        */
        getUserManageData(){
            let _this=this;
            axios
            .get("/auth/all_users")
             .then(function(response){
                 _this.userData = response.data.data;
             })
        },
        /*
        获取菜单管理数据
        */
        getMenuManageData(){

        },

        /*
        获取角色管理数据
        */
        getRoleManageData(){

        },
        //查询指定用户
        searchUserData(){
            let _this=this;
            axios
            .get("/auth/users?userName="+this.userName+"&userPhone="+this.userPhone)
             .then(function(response){
                 _this.userData = response.data.data;
             })
        },
        /*
        用户新增
        */
        onUserSubmit(formName){
            debugger
            let postData= this.userInline;
            let _this= this;
            this.$refs[formName].validate((valid) => {
            if (valid) {
                debugger
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
                            debugger
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
        重置用户新增界面
        */
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleClick(tab, event) {
            if(tab.name=="first"){
                this.getMenuManageData();
            }
            if(tab.name=="second"){
                this.getUserManageData();
            }
            if(tab.name=="third"){
                this.getRoleManageData();
            }
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        handleUserEdit(index, row){
            debugger
            this.userNewVisible = true;
            this.userInline.userId= row.userId;
            this.userInline.userName= row.userName;
            if(row.userSex==0){
                this.userInline.userSex="保密";
            }else if(row.userSex==1){
                this.userInline.userSex="帅哥";
            }else{
                this.userInline.userSex="靓女";
            }
            this.userInline.userPwd= row.userPwd;
            this.userInline.userTenantCode= row.userTenantCode;
            this.userInline.userEmail= row.userEmail;
            this.userInline.userMobile= row.userMobile;
            if(row.userStatus==1){
                this.userInline.validDate="是";
            }else if(row.userStatus==0){
                this.userInline.validDate= "否";
            }
            if(row.sysAdmin==1){
                this.userInline.sysAdmin="系统管理员";
            }else if(row.sysAdmin==0){
                this.userInline.sysAdmin= "设备管理员";
            }
            this.isUserCreated= false;
        },
        handleUsertDelete(index, row) {
            debugger
            console.log(index, row);
        },
        addNewClick(){
            this.addNewVisible= true;
        },
        userNewClick(){
            this.userNewVisible= true;
            this.isUserCreated = true;
        },
        resourceNewClick(){
            this.resourceNewVisible = true
        },
        handleClose(done) {
        this.$confirm('确认关闭？')
            .then(_ => {
            done();
            })
            .catch(_ => {});
        },
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    }
  };
</script>
<style scoped>
    .el-dialog__title{
        color: #777;
    }
    .role-div{
        width: 96%;
        margin-left: 10px;
        margin-top: -10px;
        border: 1px solid #ddd;
        height: 300px;
    }
</style>