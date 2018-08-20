<template>
  <div>
      <div class="top-class"><span style="margin-left: 10px;">角色管理</span></div>
      <div style="margin-left:20px;margin-top:20px;">
        <el-row>
            <el-col :span="2" >角色名</el-col>
            <el-col :span="5" style="margin-right:30px;"><el-input v-model="roleName" placeholder="输入角色名"></el-input></el-col>
            <el-col :span="4"><el-button type="primary" @click="searchRoleData">查询</el-button></el-col>
        </el-row>
        <el-row style="margin-top:20px">
            <el-col  :span="2">
                <span style="cursor: pointer;" @click="roleNewClick"><i class="el-icon-circle-plus"></i>新增</span>
            </el-col>
            <el-col  :span="2">
                <span style="cursor: pointer;" @click="moreDeleteClick"><i class="el-icon-delete"></i>删除</span>
            </el-col>
            <el-col  :span="3">
                <span style="cursor: pointer;" @click="roleAuth"><i class="el-icon-circle-plus"></i>角色授权</span>
            </el-col>
        </el-row>
        <el-table
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
            ref="multipleTable"
            border
            v-loading = "tableLoading"
            :data="roleData"
            style="width: 100%;margin-top:20px">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            label="角色"
            width="130">
            <template slot-scope="scope">
                <span>{{ scope.row.roleName }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="角色描述"
            width="650">
            <template slot-scope="scope">
                <span :title="scope.row.roleDesc">{{  subStr(scope.row.roleDesc) }}</span>
            </template>
            </el-table-column>
            <!-- <el-table-column
            label="是否有效"
            width="130">
            <template slot-scope="scope">
                <span>{{ scope.row.valid }}</span>
            </template>
            </el-table-column> -->
            <el-table-column label="操作"  width="80">
            <template slot-scope="scope">
                <el-button
                size="mini"
                type="primary"
                @click="handleRoleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog
        :title="createOrEdit"
        :visible.sync="roleNewAddVisible"
        width="35%">
        <div class="role-div">
            <el-form :model="roleInline" :rules="rulesInline" ref="roleInline" label-width="120px" class="demo-roleInline">
                <el-form-item label="租户" prop="tenantCode">
                    <el-select v-model="roleInline.tenantCode" placeholder="请选择">
                        <el-option
                        v-for="item in tenantData"
                        :key="item.tenantId"
                        :label="item.tenantName"
                        :value="item.tenantId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="角色ID" prop="roleId">
                    <el-input v-model="roleInline.roleId"></el-input>
                </el-form-item> -->
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="roleInline.roleName" @blur="mapName(roleInline.roleName)"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input type="textarea" v-model="roleInline.roleDesc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onRoleSubmit('roleInline')">确定</el-button>
                    <el-button @click="roleNewAddVisible=false">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
    <el-dialog
        title="角色管理>角色授权"
        :visible.sync="roleNewVisible"
        width="40%">
        <div class="role-div">
            <el-tree
            :props="props"
            :load="loadNode"
            lazy
            @check-change="handleCheckChange"
            node-key="id"
            :default-expanded-keys="[1, 2]"
            show-checkbox>
            </el-tree>
            <div style="margin-top:20px;text-align: center;">
                <el-button type="primary">保存</el-button>
                <el-button @click="roleNewVisible = false">取消</el-button>
            </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios"
export default {
    data(){
      return{
        roleName:'',
        createOrEdit:'角色管理>新建',
        multipleSelection:'',
        roleNewAddVisible:false,
        roleNewVisible:false,
        selectedRole:'',
        isCreate:false,//是否新建
        roleData:[],//
        tenantData:[],//所有租户
        tableLoading:false,
        roleInline:{//用户form
            tenantCode:'',
            roleName:'',
            roleDesc:'',
        },
         props: {
          label: 'name',
          children: 'zones',
        //   isLeaf: 'leaf'
        },
        count: 1,
        rulesInline:{
          tenantCode:[
                { required: true, message: '请输入租户', trigger: 'blur' },
            ],
            roleName:[
                { required: true, message: '请输入用户名称', trigger: 'blur' },
            ],
        },
      }
    },
    created(){
      this.getAllDate();
      this.getAllTenant();
    },
    methods:{
        //截取字符串长度
        subStr(name){
            if(name.length > 50){
                return name.substring(0,50)+"...";
            }else{
                 return name;
            }
        },
        //校验重复性
        mapName(name){
            if(name){
                let _this=this;
                axios
                .get("/auth/roles?roleName="+name)
                .then(function(response){
                    if(response.data.success&&response.data.data.length>0){
                        _this.$message({
                            message: '该名称已存在',
                            type: 'warning'
                        });
                        _this.roleInline.roleName="";
                    }
                })
            }
        },
        //树形控件
        handleCheckChange(data, checked, indeterminate) {
            console.log(data, checked, indeterminate);
        },
        handleNodeClick(data) {
            
            console.log(data);
        },
        loadNode(node, resolve) {
            if(node.label==="新建"||node.label==="编辑"||node.label==="删除"||node.level > 2){
                return resolve([]);
            }
            // if (node.level === 0) {
            //     return resolve([{ name: 'Root' }]);
            // }
            if (node.level === 0) {
                return resolve([{ name: '线路管理' },{ name: '门票管理' },{ name: '权限管理' }]);
            }
            if (node.level === 1&&node.label === "权限管理") {
                return resolve([{ name: '菜单管理' },{ name: '角色管理' },{ name: '用户管理' },{ name: ' 租户管理' }]);
            }
            setTimeout(() => {
                const data = [{
                    name: '新建',
                    // leaf: true
                }, {
                    name: '编辑',
                    // leaf: true
                }, {
                    name: '删除',
                    // leaf: true
                }];

                resolve(data);
            }, 500);
            
        },
        roleAuth(){
            if(this.multipleSelection.length==1){
                this.roleNewVisible = true;
                this.selectedRole = this.multipleSelection[0].roleId;
            }else{
                this.$notify.error({
                    message: '请选择一个且最多一个角色',
                    type: 'waining'
                });
            }
            
        },
      //多选选择项
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //角色编辑
        handleRoleEdit(index, row){
            this.roleNewAddVisible=true;
            this.isCreate=false;
            this.roleInline.tenantCode = row.tenantCode;
            this.roleInline.roleName = row.roleName;
            this.roleInline.roleDesc = row.roleDesc;
            this.roleInline.roleId = row.roleId;
            this.createOrEdit = "角色管理>编辑"
        },
      //角色新增
        onRoleSubmit(formName){
            let postData = this.roleInline;
            let _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid){
                    if(this.isCreate){
                        axios
                        .post("auth/role",postData)
                        .then(function(response){
                            if(response.data.success){
                                _this.roleNewAddVisible=false;
                                _this.isCreate=false
                                _this.getAllDate();
                                _this.$notify({
                                    message: response.data.message,
                                    type: 'success'
                                });

                            }else{
                                _this.$notify.error({
                                    message: response.data.message,
                                    type: 'waining'
                                });
                            }
                        })
                    }else{
                        axios
                        .put("/auth/role",postData)
                        .then(function(response){
                            if(response.data.success){
                               _this.roleNewAddVisible=false;
                                _this.isCreate=false
                                _this.getAllDate();
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
            })
            
        },
      //批量删除
      moreDeleteClick(){
          let _this = this;
          if(this.multipleSelection.length==0){
              this.$notify({
                message: '请选择至少一个角色',
                type: 'warning'
            });
          }else{
              this.$confirm('确认删除？')
                .then(_ => {
                let param =[];
                this.multipleSelection.forEach(element => {
                    param.push({roleId:element.roleId});
                });
                axios
                .delete("/auth/role",{data: param})
                .then(function(response){
                    if(response.data.success){
                        _this.$notify({
                            message: response.data.message,
                            type: 'success'
                        });
                        _this.getAllDate();
                    }
                })
            },() => {})
          }
      },
      //查询所有角色
      getAllDate(){
        let _this=this;
        _this.tableLoading= false;
        axios
        .get("/auth/all_roles")
        .then(function(response){
            _this.tableLoading= false;
            _this.roleData = response.data.data;
        })
      },
      //查询所有 租户
      getAllTenant(){
          let _this=this;
        axios
        .get("/auth/all_tenants")
        .then(function(response){
            _this.tenantData = response.data.data;
        })
      },
      //查询指定用户
        searchRoleData(){
            let _this=this;
            _this.tableLoading= true;
            axios
            .get("/auth/roles?roleName="+this.roleName)
             .then(function(response){
                 _this.tableLoading= false;
                 _this.roleData = response.data.data;
             })
        },
        roleNewClick(){
          this.roleInline={//用户form
              tenantCode:'',
              roleName:'',
              roleDesc:'',
          },
          this.roleNewAddVisible=true;
          this.isCreate=true;
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
</style>