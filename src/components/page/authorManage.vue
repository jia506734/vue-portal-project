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
                        <el-col :span="5" style="margin-right:30px;"><el-input v-model="menuCode" placeholder="输入用户名"></el-input></el-col>
                        <el-col :span="1">手机</el-col>
                        <el-col :span="5" style="margin-right:30px;"><el-input v-model="menuName" placeholder="输入手机"></el-input></el-col>
                        <el-col :span="4"><el-button type="primary">查询</el-button></el-col>
                    </el-row>
                    <el-row style="margin-top:20px">
                        <el-col  :span="2">
                            <span style="cursor: pointer;" @click="userNewClick"><i class="el-icon-circle-plus"></i>新增</span>
                        </el-col>
                        <el-col  :span="3">
                            <span style="cursor: pointer;" @click="resourceNewClick"><i class="el-icon-circle-plus"></i>角色绑定</span>
                        </el-col>
                        <el-col  :span="2">
                            <span style="cursor: pointer;" @click=""><i class="el-icon-circle-plus"></i>导入</span>
                        </el-col>
                        <el-col  :span="3">
                            <span style="cursor: pointer;" @click=""><i class="el-icon-circle-plus"></i>导出</span>
                        </el-col>
                    </el-row>
                    <el-table
                        :data="userData"
                        style="width: 100%;margin-top:20px">
                        <el-table-column
                        label="用户名"
                        width="130">
                        <template slot-scope="scope">
                            <span>{{ scope.row.Name }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="性别"
                        width="130">
                        <template slot-scope="scope">
                            <span>{{ scope.row.sex }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="手机"
                        width="130">
                        <template slot-scope="scope">
                            <span>{{ scope.row.phone }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="有效期"
                        width="130">
                        <template slot-scope="scope">
                            <span>{{ scope.row.date }}</span>
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
                    title="用户管理>新增"
                    :visible.sync="userNewVisible"
                    width="35%">
                    <div>
                        <el-form :inline="true" :model="userInline" class="demo-form-inline" >
                            <el-form-item label="用户名" >
                                <el-input v-model="userInline.name" placeholder="用户名"></el-input>
                            </el-form-item>
                            <el-form-item label="用户姓名">
                                <el-select v-model="userInline.names" placeholder="请选择">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <el-form :inline="true" :model="userInline" class="demo-form-inline">
                            <el-form-item label="手机">
                                <el-input v-model="userInline.phone" placeholder="手机"></el-input>
                            </el-form-item>
                            <el-form-item label="邮件">
                                <el-input v-model="userInline.mail" placeholder="邮件"></el-input>
                            </el-form-item>
                        </el-form>
                        <el-form :inline="true" :model="userInline" class="demo-form-inline">
                                <el-form-item label="有效日期">
                                    <el-date-picker
                                        v-model="userInline.date"
                                        type="date"
                                        placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="是否有效">
                                    <el-select v-model="userInline.valid" placeholder="请选择">
                                        <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        <el-form :inline="true"  :model="userInline" class="demo-form-inline">
                            <el-form-item label="系统管理员">
                                <el-select v-model="userInline.sysAdmin" placeholder="请选择">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div>
                        <el-button>保存</el-button>
                        <el-button>取消</el-button>
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
                            <span style="cursor: pointer;" @click=""><i class="el-icon-circle-plus"></i>新增</span>
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
        userInline:{
            name:'',
            names:'',
            phone:'',
            mail:'',
            date:'',
            valid:'',
            sysAdmin:''
        },
        userData:[
            {
                sex: '2016-05-02',
                name: '王小虎',
                phone: '上海市普陀区金沙江路 1518 弄'
            }, {
                sex: '2016-05-04',
                name: '王小虎',
                phone: '上海市普陀区金沙江路 1517 弄'
            }, {
                sex: '2016-05-01',
                name: '王小虎',
                phone: '上海市普陀区金沙江路 1519 弄'
            }, {
                sex: '2016-05-03',
                name: '王小虎',
                phone: '上海市普陀区金沙江路 1516 弄'
            }
        ],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
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
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        addNewClick(){
            this.addNewVisible= true;
        },
        userNewClick(){
            this.userNewVisible= true;
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
    .role-div{
        width: 96%;
        margin-left: 10px;
        margin-top: -10px;
        border: 1px solid #ddd;
        height: 300px;
    }
</style>