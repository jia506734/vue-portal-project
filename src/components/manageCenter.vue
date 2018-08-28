<template>
    <div style="height: calc(100% - 50px);">
        <div class="content_section">
            <el-row class="content_container">
                <el-col  style="height: 100%;background: #545c64;position:absolute;width:200px;">
                    <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        text
                        router
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                        <el-menu-item index="mainPage">
                            <span slot="title">主页</span>
                        </el-menu-item>
                        <el-menu-item index="routeManage">
                            <span slot="title">线路管理</span>
                        </el-menu-item>
                        <el-menu-item index="ticketManage">
                            <span slot="title">门票管理</span>
                        </el-menu-item>
                        <el-submenu index="configManage">
                            <template slot="title">
                            <span>配置管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/dictionaryMgt">字典管理</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="authorManage">
                            <template slot="title">
                            <span>权限管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/menuManage">菜单管理</el-menu-item>
                                <el-menu-item index="/userManage">用户管理</el-menu-item>
                                <el-menu-item index="/roleManage">角色管理</el-menu-item>
                                <el-menu-item index="/tenantManage">租户管理</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-col>
                <el-col  style="position:relative;left:200px;width:calc(100% - 200px);height:100%;overflow-y:scroll;">
                   <keep-alive>
				     <router-view></router-view>
				  </keep-alive>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                defaultActive:'mainPage',
            }
        }
		// computed: {
		// 	defaultActive: function(){
		// 		return this.$route.path.replace('/', '');
		// 	}
        // },
    }
</script>
<style>
    .el-menu-vertical{
        /* width: 222px; */
    }
</style>

<style  scoped>
    .content_section{
        height:100%;
    }
    .content_container{
        height:100%;
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