<template>
  <div>
    <div class="top-class"><span style="margin-left: 10px;">菜单管理</span></div>
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
          <el-col  :span="2">
                <span style="cursor: pointer;" @click="moreDeleteClick"><i class="el-icon-delete"></i>删除</span>
            </el-col>
          <el-col  :span="3">
              <span style="cursor: pointer;" @click="resourceNewClick"><i class="el-icon-circle-plus"></i>资源号</span>
          </el-col>
      </el-row>
      <el-table
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        ref="multipleTable"
          border
          v-loading = "tableLoading"
          :data="menuData"
          style="width: 100%;margin-top:20px">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
          label="名称"
          width="130">
          <template slot-scope="scope">
              <span>{{ scope.row.menuName }}</span>
          </template>
          </el-table-column>
          <el-table-column
          label="父级菜单"
          width="130">
          <template slot-scope="scope">
              <span>{{ scope.row.parentMenuCode }}</span>
          </template>
          </el-table-column>
          <el-table-column
          label="租户"
          width="130">
          <template slot-scope="scope">
              <span>{{ scope.row.tenantCode }}</span>
          </template>
          </el-table-column>
          <el-table-column
          label="顺序"
          width="130">
          <template slot-scope="scope">
              <span>{{ scope.row.menuOrder }}</span>
          </template>
          </el-table-column>
          <!-- <el-table-column
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
          </el-table-column> -->
          <el-table-column
          label="首地址"
          width="210">
          <template slot-scope="scope">
              <span>{{ scope.row.menuUrl }}</span>
          </template>
          </el-table-column>
          <el-table-column
          label="是否可见"
          width="130">
          <template slot-scope="scope">
              <span>{{ getLabelById(scope.row.menuVisibility) }}</span>
          </template>
          </el-table-column>
          <el-table-column
          label="是否有效"
          width="130">
          <template slot-scope="scope">
              <span>{{ getLabelById(scope.row.menuStatus) }}</span>
          </template>
          </el-table-column>
          <el-table-column label="操作"  width="80">
          <template slot-scope="scope">
              <el-button
              size="mini"
              type="primary"
              @click="handleMenuEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
          </template>
          </el-table-column>
      </el-table>
  </div>
  <el-dialog
      title="菜单管理>新增"
      :visible.sync="addNewVisible"
      width="30%">
      <div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="菜单名称" prop="menuName">
                  <el-input v-model="ruleForm.menuName"></el-input>
              </el-form-item>
              <el-form-item label="父级菜单" prop="parentMenuCode">
                  <el-input v-model="ruleForm.parentMenuCode" disabled=""></el-input>
              </el-form-item>
              <el-form-item label="租户" prop="tenantCode">
                <el-select v-model="ruleForm.tenantCode" placeholder="请选择租户">
                    <el-option v-for="(item,index) in tenantData" 
                        :key="index" :label="item.tenantName" :value="item.tenantId">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="菜单顺序" prop="menuOrder">
                  <el-input v-model="ruleForm.menuOrder"></el-input>
              </el-form-item>
              <!-- <el-form-item label="菜单样式" prop="style">
                  <el-input v-model="ruleForm.style"></el-input>
              </el-form-item>
              <el-form-item label="菜单图标" prop="icon">
                  <el-input v-model="ruleForm.icon"></el-input>
              </el-form-item> -->
              <el-form-item label="菜单首地址" prop="menuUrl">
                  <el-input v-model="ruleForm.menuUrl"></el-input>
              </el-form-item>
              <el-form-item label="菜单是否可见" prop="menuVisibility">
                <el-select v-model="ruleForm.menuVisibility" placeholder="请选择菜单可见性">
                    <el-option v-for="(item,index) in visibilityData" 
                        :key="index" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="菜单是否有效" prop="menuStatus">
                <el-select v-model="ruleForm.menuStatus" placeholder="请选择菜单有效性">
                    <el-option v-for="(item,index) in statusData" 
                        :key="index" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="submitMenuForm('ruleForm')">保存</el-button>
                  <el-button @click="addNewVisible=false">取消</el-button>
              </el-form-item>
          </el-form>
      </div>
  </el-dialog>
  <el-dialog
      title="菜单管理>资源号管理"
      :visible.sync="resourceVisible"
      width="60%">
        <div>
            <el-row >
                <el-col  :span="2">
                    <span style="cursor: pointer;" @click="addsourceClick"><i class="el-icon-circle-plus"></i>新增</span>
                </el-col>
                <el-col  :span="2">
                    <span style="cursor: pointer;" @click="sourceDeleteClick"><i class="el-icon-delete"></i>删除</span>
                </el-col>
            </el-row>
            <el-table
                tooltip-effect="dark"
                @selection-change="resourceSelectionChange"
                ref="multipleSourceTable"
                border
                v-loading = "sourceLoading"
                :data="sourceData"
                style="width: 100%;margin-top:10px">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                label="名称"
                width="150">
                <template slot-scope="scope">
                    <span>{{ scope.row.menuName }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="父级菜单"
                width="150">
                <template slot-scope="scope">
                    <span>{{ scope.row.parentMenuCode }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="顺序"
                width="130">
                <template slot-scope="scope">
                    <span>{{ scope.row.menuOrder }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="资源号服务"
                width="210">
                <template slot-scope="scope">
                    <span>{{ scope.row.menuUrl }}</span>
                </template>
                </el-table-column>
                <el-table-column label="操作"  width="83">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="primary"
                    @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
                </template>
                </el-table-column>
            </el-table>
            <el-dialog
                title="资源号新增"
                :visible.sync="resourceNewVisible"
                width="35%"
                append-to-body>
                <div>
                    <el-form :model="formInline" :rules="rulesLine" ref="formInline" label-width="100px" class="demo-formInline">
                        <el-form-item label="资源号名称" prop="resourceName">
                            <el-input v-model="formInline.resourceName"></el-input>
                        </el-form-item>
                        <el-form-item label="父级菜单">
                           <el-input v-model="formInline.parentMenuCode" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="资源号顺序" prop="resourceOrder">
                            <el-input v-model="formInline.resourceOrder" placeholder="资源号名称"></el-input>
                        </el-form-item>
                        <el-form-item label="资源号服务" prop="resourceService" >
                            <el-input v-model="formInline.resourceService"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitSourceForm('formInline')">保存</el-button>
                            <el-button @click="resourceVisible=false">取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
            
      </div>
  </el-dialog>
  </div>
</template>
<script>
import axios from "axios"
export default {
    data(){
      return{
        menuCode:'',//菜单编码
        menuName:'',
        menuFather:'',
        menuData:[],//菜单管理表格
        sourceData:[],//资源号表格
        addNewVisible:false,
        orderVisible:false,
        resourceVisible:false,
        tableLoading:false,
        resourceNewVisible:false,
        sourceLoading:false,
        createResource:false,
        tenantData:[],//所有租户
        visibilityData:[
            {name:'是',id:1},
            {name:'否',id:0},
        ],
        statusData:[
            {name:'是',id:1},
            {name:'否',id:0},
        ],
        rulesLine:{
            resourceName:[{ required: true, message: '请输入资源号名称', trigger: 'blur' }],
            resourceService:[{ required: true, message: '请输入资源号服务', trigger: 'blur' }],
        },
        formInline: {
            resourceName: '',
            resourceOrder: '',
            // resourceStyle:'',
            // resourceIcon:'',
            resourceService:'',
            parentMenuCode:'',
        },
        ruleForm: {
          menuName: '',
          parentMenu: '',
          parentMenuCode:'',
          tenantCode:'',
          menuOrder: '',
        //   style: '',
        //   icon: '',
          menuUrl: '',
          menuVisibility:'',//可见
          menuStatus:''//有效
        },
        isMenuCreated:false,//是否新建
        multipleSelection:[],
        multipleSource:[],//资源选择
        rules: {
          menuOrder:[
              { required: true, message: '请输入菜单顺序', trigger: 'blur' },
              {pattern: /^[1-9]\d*$/,message: '只能输入数字'},
          ],
          menuName: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' },
          ],
         tenantCode:[
             {required: true, message: '请选择租户', trigger: 'blur' }
         ],
          menuUrl: [
            { required: true, message: '请填写菜单首地址', trigger: 'blur' }
          ]
        },
      }
    },
    created(){
        this.getTenantManageData();
        this.getmenuManageData();
    },
    methods:{
        //资源新增
        addsourceClick(){
            this.resourceNewVisible = true;
            this.formInline= {
                resourceName: '',
                resourceOrder: '',
                resourceService:'',
                parentMenuCode:this.multipleSelection[0].name?this.multipleSelection[0].name:'',
            };
            this.createResource = true;//资源新建
        },
        //资源删除
        sourceDeleteClick(){

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
        getLabelById(id){
            let ret = "";
            if(id=="1"||id==1){
                ret ="是"
            }
            if(id=="0"||id==0){
                ret ="否"
            }
            return ret;
        },
        //z资源号新增保存
        submitSourceForm(formName){
            let postData=this.formInline;
            this.$refs[formName].validate((valid) => {
            if (valid) {
                if(this.createResource){
                    axios
                    .post("/auth/menu/menu",postData)
                    .then(function(response){
                        if(response.data.success){
                            
                            _this.resourceNewVisible=false;
                            _this.createResource=false
                            // _this.getmenuManageData();
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
                    .put("/auth/menu/menu",postData)
                    .then(function(response){
                        if(response.data.success){
                            _this.resourceNewVisible=false;
                            _this.createResource=false
                            // _this.getmenuManageData();
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
        //查询所有菜单
        getmenuManageData(){
            let _this=this;
            this.tableLoading = true;
            this.tableLoading = false;
            // axios
            // .get("/auth/all_tenants")
            //  .then(function(response){
            //      _this.tableLoading = false;
            //      _this.menuData = response.data.data;
            //  })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        resourceSelectionChange(){
            this.multipleSource = val;
        },
        submitMenuForm(formName){
            let postData=this.ruleForm;
            this.$refs[formName].validate((valid) => {
            if (valid) {
                if(this.isMenuCreated){
                    axios
                        .post("/auth/menu/menu",postData)
                        .then(function(response){
                            if(response.data.success){
                                
                                _this.addNewVisible=false;
                                _this.isMenuCreated=false
                                _this.getmenuManageData();
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
                        .put("/auth/menu/menu",postData)
                        .then(function(response){
                            if(response.data.success){
                                _this.addNewVisible=false;
                                _this.isMenuCreated=false
                                _this.getmenuManageData();
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
        addNewClick(){
            let selectedMenu = this.multipleSelection.slice(0);
            this.ruleForm= {
                menuName: '',
                parentMenu: '',
                parentMenuCode:'',
                tenantCode:'',
                menuOrder: '',
                // style: '',
                // icon: '',
                menuUrl: ''
            };
            if(selectedMenu.length>1){
                this.$notify({
                    message: '请选择单个菜单进行新建',
                    type: 'warning'
                });
            }else if(selectedMenu.length==1){
                this.ruleForm.parentMenu=selectedMenu[0];
            }else{
                this.ruleForm.parentMenu="Root";
                this.ruleForm.parentMenuCode="Root";
            }
            this.isMenuCreated = true;
            this.addNewVisible= true;
        },
        handleClose(done) {
        this.$confirm('确认关闭？')
            .then(_ => {
            done();
            })
            .catch(_ => {});
        },
        //删除多项
        moreDeleteClick(){

        },
        resourceNewClick(){
            if(this.multipleSelection.length==1){
                this.resourceVisible = true;
            }
        },
        handleMenuEdit(index, row) {
            console.log(index, row);
        },
        handleSourceEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
    },
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
</style>

