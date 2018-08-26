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
                fixed
                width="55">
            </el-table-column>
            <el-table-column label="操作"  width="80" fixed>
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="primary"
                    @click="handleRoleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
                </template>
            </el-table-column>
            <el-table-column
            label="角色"
            width="160">
            <template slot-scope="scope">
                <span>{{ scope.row.roleName }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="所属租户"
            width="200">
            <template slot-scope="scope">
                <span>{{ scope.row.tenantCode }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="角色描述"
            width="650">
            <template slot-scope="scope">
                <span :title="scope.row.roleDesc">{{  subStr(scope.row.roleDesc) }}</span>
            </template>
            </el-table-column>
            <el-table-column
                label="创建时间"
                width="180">
                <template slot-scope="scope">
                    <span>{{ subTime(scope.row.createdDate) }}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column
            label="是否有效"
            width="130">
            <template slot-scope="scope">
                <span>{{ scope.row.valid }}</span>
            </template>
            </el-table-column> -->
            
        </el-table>
    </div>
    <el-dialog
        :title="createOrEdit"
        :close-on-click-modal="notClose"
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
        :close-on-click-modal="notClose"
        :visible.sync="roleNewVisible"
        width="40%">
        <div class="role-div">
            <el-tree
                ref="tree"
                :props="props"
                :data="treeDataCur"
                show-checkbox
                node-key="id"
                :default-expanded-keys="[]"
                :default-checked-keys="defaultCheckedKeys">
            </el-tree>
            <div style="margin-top:20px;text-align: center;">
                <el-button @click="saveTree" type="primary">保存</el-button>
                <el-button @click="roleNewVisible = false">取消</el-button>
            </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios"
import {mapActions, mapState} from 'vuex'
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
        notClose:false,
        tableLoading:false,
        roleInline:{//用户form
            tenantCode:'',
            roleName:'',
            roleDesc:'',
        },
        props: {
            label: 'label',
            children: 'children'
        },
        treeData:[],
        treeDataCur: [],
        defaultCheckedKeys: [],
        checkedKeys:[],
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
    computed:{
        ...mapState(["tenantId"]),
    },
    created(){
      this.$store.state.tenantId = "ba43dd3f-a2db-11e8-8f98-52540016ed2f";
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
        roleAuth(){
            if(this.multipleSelection.length==1){
                this.roleNewVisible = true;
                this.selectedRole = this.multipleSelection[0].roleId;
                this.getRoleRight(this.multipleSelection[0].tenantCode);
            }else{
                this.$notify({
                    duration:2000,
                    message: '请选择一个且最多一个角色',
                    type: 'waining'
                });
            }
            
        },
        getRoleRight(tenantCode){
            var _this = this;
            this.treeDataCur = [];
            this.checkedKeys = [];
            axios
            .get("/auth/menu/tree/"+tenantCode+"/"+this.selectedRole)
            .then(function(response){
                _this.treeData = response.data.data;
                _this.stepRunTree(_this.treeData,_this.treeDataCur)
                _this.$nextTick(function () {
                    _this.$refs.tree.setCheckedKeys(_this.checkedKeys)
                })
            })
        },
        //递归遍历树结构方法
        stepRunTree(tree,treeNow){
            for(var key in tree){
                treeNow.push({
                    id:"",
                    label:"",
                    children:[]
                });
                treeNow[key].id = tree[key].menuId;
                treeNow[key].label = tree[key].menuName
                if(tree[key].checked){
                    this.checkedKeys.push(tree[key].menuId)
                }
                if(tree[key].childrenMenuList&&tree[key].childrenMenuList.length>0){
                    this.stepRunTree(tree[key].childrenMenuList,treeNow[key].children)
                }
            }
        },
        //保存树
        saveTree(){
            var _this = this;
            var arr = this.$refs.tree.getCheckedKeys();
            axios
            .post("/auth/role/resource?roleId="+this.selectedRole,arr) 
            .then(function(response){
                if(response.data.success){
                    _this.$notify({
                        duration: 2000,
                        message: '保存成功',
                        type: 'success'
                    });
                    _this.roleNewVisible = false;
                }
            })
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
                        .post("/auth/role",postData)
                        .then(function(response){
                            if(response.data.success){
                                _this.roleNewAddVisible=false;
                                _this.isCreate=false
                                _this.getAllDate();
                                _this.$notify({                     
                                    duration:2000,
                                    message: response.data.message,
                                    type: 'success'
                                });

                            }else{
                                _this.$notify({
                                    duration:2000,
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
            })
            
        },
        subTime(time){
            return time.substring(0,19);
        },
      //批量删除
      moreDeleteClick(){
          let _this = this;
          if(this.multipleSelection.length==0){
              this.$notify({                     
                  duration:2000,
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
                            duration:2000,
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
        .get("/auth/roles?tenantCode="+this.$store.state.tenantId)
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

<style>
  .el-select{
      width:100%;
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

</style>