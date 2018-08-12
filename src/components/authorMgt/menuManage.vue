<template>
  <div>
    <div style="margin-left:20px;margin-top:20px;">
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
          :data="menuData"
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
  </div>
</template>
<script>
export default {
    data(){
      return{
        menuCode:'',//菜单编码
        menuName:'',
        menuFather:'',
        menuData:[],//菜单管理表格
        addNewVisible:false,
        orderVisible:false,
        resourceNewVisible:false,
        formInline: {
            resourceName: '',
            resourceOrder: '',
            resourceStyle:'',
            resourceIcon:'',
            resourceService:'',
        },
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
        },
      }
    },
    methods:{
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
        resourceNewClick(){
            this.resourceNewVisible = true
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
    },
}
</script>

