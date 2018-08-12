<template>
    <div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
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
            <el-tab-pane label="租户管理" name="fourth">
                <div style="margin-left:20px;">
                    <el-row>
                        <el-col :span="1" >租户名称</el-col>
                        <el-col :span="5" style="margin-right:30px;"><el-input v-model="tenantName" placeholder="输入租户名"></el-input></el-col>
                        <el-col :span="4"><el-button type="primary" @click="tenantSearch">查询</el-button></el-col>
                    </el-row>
                    <el-row style="margin-top:20px">
                        <el-col  :span="2">
                            <span style="cursor: pointer;" @click="tenantNewVisible=true;isTenantCreated=true"><i class="el-icon-circle-plus"></i>新增</span>
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
        tenantNewVisible:false,//新建租户弹框
        isUserCreated:false,
        isTenantCreated:false,
        tenantList:'',//租户列表
        tenantData:[],//租户表格
        tableLoading:false,
        userName:'',
        userMobile:'',
        options4: [],
        loading: false,
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
        tenantName:'',//要查询的租户名称
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
    mounted() {
      this.tenantList = this.states.map(item => {
        return { value: item, label: item };
      });
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
        //查询租户
        getTenantManageData(){
            let _this=this;
            axios
            .get("/auth/all_tenants")
             .then(function(response){
                 
                 _this.tenantData = response.data.data;
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
            .get("/auth/users?userName="+this.userName+"&userMobile="+this.userMobile)
             .then(function(response){
                 _this.userData = response.data.data;
             })
        },
        
        /*
        重置新增界面
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
            if(tab.name=="fourth"){
                this.getTenantManageData();
            }
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
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        handleTenantEdit(index, row){
            this.tenantNewVisible=true;
            this.isTenantCreated=false;
            this.tenantForm.tenantId = row.tenantId;
            this.tenantForm.tenantName = row.tenantName;
            this.tenantForm.tenantDesc = row.tenantDesc;
            this.tenantForm.tenantAdminId = row.tenantAdminId;
        },
        handleUserEdit(index, row){
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
    }
  };
</script>
<style scoped>
    .el-dialog__title{
        color: #777 !important;
    }
    .role-div{
        width: 96%;
        margin-left: 10px;
        margin-top: -10px;
        border: 1px solid #ddd;
        height: 300px;
    }
</style>