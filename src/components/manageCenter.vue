<template>
    <div>
        <div class="content_section">
            <el-row style="height: 100%;">
                <el-col :span="4"  style="height: 100%;background: #545c64;">
                    <el-menu :default-active="defaultActive" 
                    class="el-menu-vertical"
                    background-color="#545c64"
                    text-color="#fff"
                    router
                    active-text-color="#ffd04b" >
                        <el-menu-item index="routeManage">
                            <span slot="title">线路管理</span>
                        </el-menu-item>
                        <el-menu-item index="ticketManage">
                            <span slot="title">门票管理</span>
                        </el-menu-item>
                        <el-menu-item index="airLineManage">
                            <template slot="title">机票管理</template>
                        </el-menu-item>
                        <el-menu-item index="insuranceManage">
                            <template slot="title">保险管理</template>
                        </el-menu-item>
                        <el-menu-item index="distributorManage">
                            <span slot="title">分销商管理</span>
                        </el-menu-item>
                        <el-menu-item index="configurationManage">
                            <span slot="title">配置管理</span>
                        </el-menu-item>
                        <el-menu-item index="authorManage">
                           <span slot="title">权限管理</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="20">
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
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
        },
    }
</script>
<style>
    .el-menu-vertical{
        /* width: 200x;
        height: 100%; */
    }
</style>

<style  scoped>
    .content_section{
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