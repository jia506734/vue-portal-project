<template>
  <div>
    <div class="top-class"><span style="margin-left: 10px;">菜单管理</span></div>
    <div style="margin-left:20px;margin-top:20px;">
      <el-row>
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
          fixed
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
          label="名称"
          fixed
          width="130">
          <template slot-scope="scope">
              <span :title="scope.row.menuName">{{ subStr(scope.row.menuName) }}</span>
          </template>
          </el-table-column>
          <el-table-column
          label="父级菜单"
          width="130">
          <template slot-scope="scope">
              <span :title="scope.row.parentMenuCode">{{ subStr(scope.row.parentMenuCode) }}</span>
          </template>
          </el-table-column>
          <el-table-column
          label="租户"
          width="130">
          <template slot-scope="scope">
              <span>{{ scope.row.tenantName }}</span>
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
              <span :title="scope.row.menuUrl">{{ subStrLong(scope.row.menuUrl) }}</span>
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
          <el-table-column
                label="创建时间"
                width="180">
                <template slot-scope="scope">
                    <span>{{ subTime(scope.row.createdDate) }}</span>
                </template>
          </el-table-column>
          <el-table-column label="操作"  width="80" fixed="right">
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
      :title="createOrEdit"
      :visible.sync="addNewVisible"
      width="30%">
      <div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="菜单名称" prop="menuName">
                  <el-input v-model="ruleForm.menuName" @blur="mapName(ruleForm.menuName)"></el-input>
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
      width="45%">
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
                label="资源号名称"
                width="150">
                <template slot-scope="scope">
                    <span>{{ scope.row.resourceName }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="父级菜单"
                width="150">
                <template slot-scope="scope">
                    <span>{{ scope.row.ownerCode }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="资源号状态"
                width="120">
                <template slot-scope="scope">
                    <span>{{getStatus(scope.row.resourceStatus)}}</span>
                </template>
                </el-table-column>
                <el-table-column label="操作"  width="83">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="primary"
                    @click="handleResourceEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
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
                        <el-form-item label="父级菜单" prop="ownerName">
                           <el-input v-model="formInline.ownerName" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="资源状态" prop="resourceStatus">
                            <el-select v-model="formInline.resourceStatus" placeholder="请选择资源号状态">
                                <el-option v-for="(item,index) in statusData" 
                                    :key="index" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitSourceForm('formInline')">保存</el-button>
                            <el-button @click="resourceNewVisible=false">取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
            
      </div>
  </el-dialog>
  </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
import axios from "axios"
export default {
    data(){
      return{
        isMenuCreate:false,
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
        isResourceCreate:false,//资源号新建/编辑
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
            ownerCode:[{ required: true, message: '请输入父级菜单', trigger: 'blur' }],
        },
        formInline: {
            resourceName: '',
            ownerCode: '',
            ownerName: '',
            resourceStatus:'',
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
        createOrEdit:'菜单管理>新增',
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
    computed:{
        ...mapState(["tenantId"]),
    },
    created(){
        this.$store.state.tenantId = "ba43dd3f-a2db-11e8-8f98-52540016ed2f";
        this.getTenantManageData();
        this.getmenuManageData();
    },
    methods:{
        //截取字符串长度
        subStr(name){
            if(name.length > 10){
                return name.substring(0,10)+"...";
            }else{
                 return name;
            }
        },
         //截取字符串长度
        subStrLong(name){
            if(name.length > 30){
                return name.substring(0,30)+"...";
            }else{
                 return name;
            }
        },
        //校验用户名重复性
         mapName(name){
            // if(name){
            //     let _this=this;
            //     axios
            //     .get("/auth/users?userName="+name)
            //     .then(function(response){
            //         if(response.data.success&&response.data.data.length>0){
            //             _this.$message({
            //                 message: '该名称已存在',
            //                 type: 'warning'
            //             });
            //             _this.ruleForm.menuName="";
            //         }
            //     })
            // }
        },
        subTime(time){
            return time.substring(0,19);
        },
        getStatus(status){
            if(status==1){
                return "是"
            }else{
                return "否"
            }
        },
        //菜单编辑
        handleMenuEdit(index, row) {
            this.addNewVisible=true;
            this.isMenuCreate=false;
            this.ruleForm =  {
                menuId: row.menuId,
                menuName: row.menuName,
                parentMenu: row.parentMenu,
                parentMenuCode:row.parentMenuCode,
                tenantCode:row.tenantCode,
                menuOrder: row.menuOrder,
                menuUrl: row.menuUrl,
                menuVisibility:row.menuVisibility==1?'是':'否',//可见
                menuStatus:row.menuStatus==1?'是':'否'//有效
            },
            this.createOrEdit = "菜单管理>编辑"
        },
        //资源新增
        addsourceClick(){
            
            this.resourceNewVisible = true;
            let dd = this.multipleSelection[0];
            this.formInline= {
                resourceName: '',
                ownerCode:this.multipleSelection[0].menuId,
                ownerName:this.multipleSelection[0].menuName,
                resourceStatus:'',
            };
            this.createResource = true;//资源新建
        },
        //资源号删除
        sourceDeleteClick(){
            let _this = this;
            if(this.multipleSource.length==0){
                this.$notify({
                    message:'请至少选择一个资源号',
                    type: 'warning'
                });
            }else{
                this.$confirm('确认删除？')
                .then(_ => {
                    let param =[];
                    this.multipleSource.forEach(element => {
                        param.push({resourceId:element.resourceId});
                    });
                    axios
                    .delete("/auth/resource",{data: param})
                    .then(function(response){
                        if(response.data.success){
                            _this.$notify({
                                message: response.data.message,
                                type: 'success'
                            });
                            _this.getResourceData();
                        }
                    })
                  },() => {
                })
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
            let _this = this;
            let postData=this.formInline;
            
            if(postData.resourceStatus=="是"){
                postData.resourceStatus=1;
            }else if(postData.resourceStatus=="否"){
                postData.resourceStatus=0;
            }
            this.$refs[formName].validate((valid) => {
            if (valid) {
                if(this.isResourceCreate){
                    axios
                    .post("/auth/resource",postData)
                    .then(function(response){
                        if(response.data.success){
                            _this.resourceNewVisible=false;
                            _this.isResourceCreate=false
                            _this.$notify({
                                message: response.data.message,
                                type: 'success'
                            });
                            _this.getResourceData();
                        }else{
                            _this.$notify.error({
                                message: response.data.message,
                                type: 'warning'
                            });
                        }
                    })
                }else{
                     axios
                        .put("/auth/resource",postData)
                        .then(function(response){
                            if(response.data.success){
                                _this.resourceNewVisible=false;
                                _this.createResource=false
                                _this.$notify({
                                    message: response.data.message,
                                    type: 'success'
                                });
                                _this.getResourceData();
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
            axios
            .get("/auth/menu/"+this.$store.state.tenantId)
             .then(function(response){
                 _this.tableLoading = false;
                 _this.menuData = response.data.data;
             })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        resourceSelectionChange(val){
            this.multipleSource = val;
        },
        submitMenuForm(formName){
            let _this = this;
            let postData=this.ruleForm;
            postData.menuStatus=postData.menuStatus=="是"?1:0;
            postData.menuVisibility=postData.menuVisibility=="是"?1:0;
            this.$refs[formName].validate((valid) => {
            if (valid) {
                if(this.isMenuCreated){
                    axios
                        .post("/auth/menu",postData)
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
                        .put("/auth/menu",postData)
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
        //新增菜单
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
                return false;
            }else if(selectedMenu.length==1){
                this.ruleForm.parentMenu=selectedMenu[0].menuId;
                this.ruleForm.parentMenuCode=selectedMenu[0].menuName;
            }else{
                this.ruleForm.parentMenu="Root";
                this.ruleForm.parentMenuCode="Root";
            }
            this.isMenuCreated = true;
            this.addNewVisible= true;
        },
        handleClose(done) {
        // this.$confirm('确认关闭？')
        //     .then(_ => {
        //     done();
        //     })
        //     .catch(_ => {});
        },
        //删除多项菜单
        moreDeleteClick(){
            let _this = this
            if(this.multipleSelection.length==0){
                this.$notify.error({
                    message: '请至少选择一项',
                    type: 'warning'
                });
            }else{
                this.$confirm('确认删除？')
                .then(_ => {
                    let toDel = false;
                    let ret =this.multipleSelection;
                    let param = [];let postData={};
                    ret.forEach(element => {
                        if(!element.leaf){
                            toDel = true;
                            return;
                        }
                        let postData = {menuId:element.menuId,tenantCode:element.tenantCode};
                        param.push(postData);            
                    });
                    if(toDel){
                        this.$notify.error({
                            message: '请先删除子菜单',
                            type: 'warning'
                        });
                        return false;
                    }
                    axios
                    .delete("/auth/menu",{data: param})
                    .then(function(response){
                        if(response.data.success){
                            _this.$notify({
                                message: response.data.message,
                                type: 'success'
                            });
                            _this.getmenuManageData();
                        }else{
                            _this.$notify.error({
                                message: response.data.message,
                                type: 'warning'
                            });
                        }
                    })
                },() => {
                })
            }
        },
        //编辑资源号
        handleResourceEdit(index, row){
            this.resourceNewVisible = true;
            this.isResourceCreate=false;
            
            this.formInline={
                resourceName: row.resourceName,
                resourceId: row.resourceId,
                ownerCode: row.ownerCode,
                ownerName:  row.ownerCode,//row.ownerName,
                resourceStatus:row.resourceStatus==1?'是':'否',
            }
        },
        //查询所有资源号
        getResourceData(){
            this.sourceLoading = true;
            let _this= this;
            axios
            .get("/auth/resource/"+this.multipleSelection[0].menuId)
            .then(function(response){
                if(response.data.data){
                    _this.sourceData = response.data.data;
                    _this.sourceLoading = false;
                }else{
                    _this.$notify.error({
                        message: response.data.message,
                        type: 'warning'
                    });
                }
            })
        },
        resourceNewClick(){
            if(this.multipleSelection.length==1){
                this.resourceVisible = true;
                this.isResourceCreate=true;
                this.getResourceData();
            }else{
                 this.$notify({
                    message: '请先选择一个菜单',
                    type: 'warning'
                });
            }
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

