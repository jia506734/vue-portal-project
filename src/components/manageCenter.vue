<template>
    <div style="height: calc(100% - 50px);">
        <div class="content_section">
            <el-row class="content_container">
                <el-col  style="height: 100%;background: #545c64;position:absolute;width:140px;">
                    <el-menu :default-active="defaultActive" 
                    class="el-menu-vertical"
                   style="background:#545c64; width:100%;"
                   text-color="#fff"
                   text
                    router
                    active-text-color="#ffd04b" >
                    <el-menu-item index="mainPage">
                            <span slot="title">主页</span>
                        </el-menu-item>
                        <el-menu-item index="routeManage">
                            <span slot="title">线路管理</span>
                        </el-menu-item>
                        <el-menu-item index="ticketManage">
                            <span slot="title">门票管理</span>
                        </el-menu-item>
                        <!-- <el-menu-item index="airLineManage">
                            <template slot="title">机票管理</template>
                        </el-menu-item> -->
                        <!-- <el-menu-item index="insuranceManage">
                            <template slot="title">保险管理</template>
                        </el-menu-item>
                        <el-menu-item index="distributorManage">
                            <span slot="title">分销商管理</span>
                        </el-menu-item>
                        <el-menu-item index="configurationManage">
                            <span slot="title">配置管理</span>
                        </el-menu-item> -->
                        <el-menu-item index="authorManage">
                           <span slot="title">权限管理</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
                <el-col  style="position:relative;left:140px;width:calc(100% - 140px);height:100%;overflow:scroll;">
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
        /* background-color: #d2d2d2; */
        /* height:860px; */
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