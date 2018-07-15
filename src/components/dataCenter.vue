<template>
    <div>
        <div class="content_section">
            <el-row style="height: 100%;">
                <el-col :span="4"  style="min-height: 100%; background-color: rgb(208, 219, 239)">
                    <el-menu :default-active="defaultActive" style="min-height: 100%;background-color: rgb(208, 219, 239)" >
                        <el-menu-item index="1">
                            <span slot="title">首页</span>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <span slot="title">集中巡检</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <span slot="title">分析评估</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <span slot="title">实施监控</span>
                        </el-menu-item>
                        <el-submenu index="5">
                            <template slot="title">巡检管理</template>
                            <el-menu-item index="alarmOperation">告警操作</el-menu-item>
                            <el-menu-item index="operationLog">巡检日志</el-menu-item>
                        </el-submenu>
                        <el-menu-item index="6">
                            <span slot="title">设备管理</span>
                        </el-menu-item>
                        <el-submenu index="7">
                            <template slot="title">权限管理</template>
                            <el-menu-item index="manuManage" @click="showManage(1)">菜单管理</el-menu-item>
                            <el-menu-item index="userManage" @click="showManage(2)">用户管理</el-menu-item>
                            <el-menu-item index="userManage" @click="showManage(3)">角色管理</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-col>
                <el-col :span="20">
                    <management v-if="manageShow" :menuNo = menuNo></management>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    import management from "./page/Management"
    export default {
        data(){
            return{
                manageShow:false,
                menuNo:'',
            }
        },
        methods:{
            showManage(val){
                if(val ==1){
                    this.manageShow = false;
                    this.menuNo = 1;
                }
                else if(val ==2){
                     this.manageShow = false;
                     this.menuNo = 2;
                }
                    
                else{
                    this.manageShow = false;
                    this.menuNo = 3;
                }
                    
                this.manageShow = true;
            },
        },
        components:{
            management,
        },
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
        },
    }
</script>
<style  scoped>
    /* .el-submenu__title{
        color: #bfcbd9 !important
    } */
    .content_section{
        margin-top: 20px;
        background-color: #d2d2d2;
        height:860px;
    }
    .resourceCenter_title{
        height:30px;
        border-bottom: 1px solid #000000;
    }
    .resourceCenter_content{
        margin-top: 20px;
    }
    .content_list{
        margin-top: 20px;
    }
</style>