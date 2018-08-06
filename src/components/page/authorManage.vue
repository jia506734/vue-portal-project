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
                        <el-col style="cursor: pointer;" :span="3"><i class="el-icon-circle-plus"></i>资源号</el-col>
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

            </el-tab-pane>
            <el-tab-pane label="用户管理" name="second">用户管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
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
        orderVisible:false,
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
        addNewVisible:false,
         ruleForm: {
          name: '',
          fatherMenu: '',
          order: '',
          style: '',
          icon: '',
          mainMenu: ''
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