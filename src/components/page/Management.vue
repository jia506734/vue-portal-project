<template>
<div style="height:100%">
  <el-tabs type="border-card"  v-model="activeName">
    <el-tab-pane label="菜单管理" name ="menuShow">
        <el-row>
          <el-col :span="2"> 菜单编码</el-col>
          <el-col :span="4">
            <el-input v-model="menuNo"></el-input>
          </el-col>
          <el-col :span="3" style="padding-left:50px"> 菜单名称</el-col>
          <el-col :span="4">
            <el-input v-model="menuName"></el-input>
          </el-col>
          <el-col :span="3" style="padding-left:50px"> 父级菜单</el-col>
          <el-col :span="4">
            <el-input v-model="parentMenu"></el-input>
          </el-col>
          <el-col :span="3" style="padding-left:50px">
            <el-button type="primary">查询</el-button>
          </el-col>
        </el-row>
        <div style="height:757px;border:solid 1px #ddd;margin-top:5px;">
            <el-row class="bg-purple">
              <el-col :span="2">
                <i class="el-icon-plus modifycss" @click="showMenuAdd = true">新增</i>
              </el-col>
              <el-col :span="2">
                <i class="el-icon-edit modifycss">修改</i>
              </el-col>
              <el-col :span="2">
                <i class="el-icon-delete modifycss">删除</i>
              </el-col>
              <el-col :span="3">
                <p style="margin-left:10px;margin-top:6px;cursor:pointer" @click="showResourceAdd = true">资源号新增</p>
              </el-col>
            </el-row>
            <el-table
              ref="multipleTable"
              :data="tableData3"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="code"
                label="Code"
                width="120">
                <!-- <template slot-scope="scope">{{ scope.row.code }}</template> -->
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称"
                width="150">
              </el-table-column>
              <el-table-column
                prop="fatherMenu"
                label="父级菜单"
                width="150">
              </el-table-column>
              <el-table-column
                prop="order"
                label="顺序"
                width="120">
              </el-table-column>
              <el-table-column
                prop="style"
                label="样式"
                width="120">
              </el-table-column>
              <el-table-column
                prop="icon"
                label="图标"
                width="120">
              </el-table-column>
              <el-table-column
                prop="mainAdress"
                label="首地址"
                width="160">
              </el-table-column>
              <el-table-column
                prop="visible"
                label="是否可见"
                width="120">
              </el-table-column>
            </el-table>
        </div>
        <el-dialog title="菜单管理->资源号新增" :visible.sync="showResourceAdd">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="资源号名称" prop="resourceNameDia">
              <el-col :span=8><el-input v-model="ruleForm.resourceNameDia"></el-input></el-col>
              <el-col :span=16>
                <el-form-item label="父级菜单" prop="fatherName1">
                  <el-select v-model="ruleForm.fatherName1" placeholder="父级菜单">
                    
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="资源号顺序" prop="resourceOrder">
              <el-col :span=8>
                <el-input @focus="innerVisible =true"></el-input>
                <!-- <el-button type="primary" @click="innerVisible =true"></el-button> -->
              </el-col>
              <el-col :span=13>
                <el-form-item label="资源号样式" prop="resourceStyle"><el-input v-model="ruleForm.resourceStyle" clearable></el-input></el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="资源号图标" prop="resourceIcon">
              <el-col :span=8><el-input v-model="ruleForm.resourceIcon" clearable></el-input></el-col>
            </el-form-item>
            <el-form-item label="资源号服务" prop="resourceService">
              <el-col :span=21><el-input v-model="ruleForm.menuMainUrl" clearable></el-input></el-col>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="showMenuAdd = false">取 消</el-button>
            <el-button type="primary" @click="innerVisible = false">保存</el-button>
          </div>
        </el-dialog>
        <el-dialog title="菜单管理->新增" :visible.sync="showMenuAdd">
          <el-dialog
            width="30%"
            title="菜单顺序"
            :visible.sync="innerVisible"
            :show-close="closeButton"
            append-to-body>
            <i class="el-icon-back arrow-up">上移</i>
            <i class="el-icon-back arrow-down">下移</i>
            <div class="border">
              <div style="display:block;margin:10px 0 10px 30px;">
                  1、<el-button size="medium">菜单一</el-button>
              </div>
              <div style="display:block;margin:10px 0 10px 30px;">
                  2、<el-button size="medium">菜单二</el-button>
              </div>
               <div style="display:block;margin:10px 0 10px 30px;">
                  3、<el-button size="medium">菜单三</el-button>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button size="small">确认</el-button>
              <el-button size="small" @click="innerVisible = false">关闭</el-button>
            </div>
          </el-dialog>

          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="菜单名称" prop="menuNameDia">
              <el-col :span=8><el-input v-model="ruleForm.menuNameDia"></el-input></el-col>
              <el-col :span=16>
                <el-form-item label="父级菜单" prop="fatherName">
                  <el-select v-model="ruleForm.fatherName" placeholder="首页">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="菜单顺序" prop="menuOrder">
              <el-col :span=8>
                <el-input @focus="innerVisible =true"></el-input>
                <!-- <el-button type="primary" @click="innerVisible =true"></el-button> -->
              </el-col>
              <el-col :span=13>
                <el-form-item label="菜单样式" prop="menuStyle"><el-input v-model="ruleForm.menuStyle" clearable></el-input></el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="菜单图标" prop="menuIcon">
              <el-col :span=8><el-input v-model="ruleForm.menuIcon" clearable></el-input></el-col>
            </el-form-item>
            <el-form-item label="菜单首地址" prop="menuMainUrl">
              <el-col :span=21><el-input v-model="ruleForm.menuMainUrl" clearable></el-input></el-col>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="showMenuAdd = false">取 消</el-button>
            <el-button type="primary" @click="innerVisible = false">保存</el-button>
          </div>
        </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="用户管理"  name = "userShow">
          
        </el-tab-pane>
        <el-tab-pane label="角色管理"  name = "roleShow">角色管理</el-tab-pane>
      </el-tabs>
  </div>
</template>.

<script>
  // import menu from './menu'
  export default {
    data(){
      return{
        menuName:"",
        parentMenu:"",
        showMenuAdd:false,
        innerVisible:false,
        showResourceAdd:false,
        activeName:'menuShow',
        formName:'',
        clear:true,
        closeButton:false,
        options:[
          {value:1,label:'集中巡检'},
          {value:2,label:'分析评估'},
        ],
        tableData3: [{
          code:"123456",
          name: '贾鹏飞',
          fatherMenu:'',
          order:'',
          style:'',
          icon:'',
          mainAdress:'',
          visible:''
        },{
          code:"123456",
          name: '黄盼盼',
          fatherMenu:'',
          order:'',
          style:'',
          icon:'',
          mainAdress:'',
          visible:''
        },{
          code:"123456",
          name: '王小虎',
          fatherMenu:'',
          order:'',
          style:'',
          icon:'',
          mainAdress:'',
          visible:''
        }],
        ruleForm: {
          menuNameDia: '',
          fatherName: '',
          menuOrder: '',
          menuIcon: '',
          menuMainUrl: '',
          menuStyle: '',
          resourceNameDia: '',
          fatherName1: '',
          resourceOrder: '',
          resourceIcon: '',
          resourceService: '',
          resourceStyle: '',
        },
         rules: {
          menuNameDia: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          menuMainUrl: [
            { required: true, message: '请输入菜单首地址', trigger: 'blur' }
          ],
          resourceNameDia: [
            { required: true, message: '请输入资源号名称', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          resourceService: [
            { required: true, message: '请输入资源号服务', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        }
      }
    },
    created(){
    },
    watch:{
      menuNo(val){
        if(val ==1){
            this.activeName ="menuShow";
          }else if(val == 2){
            this.activeName ="userShow";
          }else{
            this.activeName ="roleShow";
          }
      },
    },
    props:["menuNo"],
    // components:{
    //   menu,
    // },
    methods: {
        toggleSelection(rows) {
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row);
            });
          } else {
            this.$refs.multipleTable.clearSelection();
          }
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        }
    }
  }
</script>

<style scoped>
  .dialog-footer{
    text-align: center
  }
  .bg-purple {
    background: #d3dce6;
    height: 40px;
  }
  .modifycss{
    margin-top:10px;
    margin-left:10px;
    cursor: pointer;
  }
  .arrow-up::before{
    display: inline-block;
    transform: rotate(90deg)
  }
  .arrow-down{
    margin-left: 10px;
  }
  .arrow-down::before{
    display: inline-block;
    transform: rotate(270deg)
  }
  .border{
    border: 1px solid #000000;
  }
</style>
