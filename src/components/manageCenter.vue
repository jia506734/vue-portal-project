<template>
    <div>
        <div class="content_section">
            <el-row style="height: 100%;">
                <el-col :span="4"  style="height: 100%;background: #545c64;">
                    <el-menu :default-active="defaultActive" 
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b" >
                        <el-submenu index="1">
                            <template slot="title">线路管理</template>
                            <el-menu-item index="1-1">线路管理-同业</el-menu-item>
                            <el-menu-item index="1-2">线路管理-网店</el-menu-item>
                            <el-submenu index="1-3">
                                <template slot="title">新建线路</template>
                                <el-menu-item index="1-3-1">第一步基本信息</el-menu-item>
                                <el-menu-item index="1-3-2">第二步-团队&费用</el-menu-item>
                                <el-menu-item index="1-3-3">第三步-线路详情</el-menu-item>
                                <el-menu-item index="1-3-4">第四步-目的地简介</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title">门票管理</template>
                            <el-menu-item index="2-1">门票管理-同业</el-menu-item>
                            <el-menu-item index="2-2">门票管理-网店</el-menu-item>
                            <el-submenu index="2-3">
                                <template slot="title">新建线路-新增</template>
                                <el-menu-item index="2-3-1">基本信息</el-menu-item>
                                <el-menu-item index="2-3-2">门票价格</el-menu-item>
                                <el-menu-item index="2-3-3">景区介绍</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-menu-item index="3">
                            <template slot="title">机票管理</template>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <template slot="title">保险管理</template>
                        </el-menu-item>
                        <el-menu-item index="5">
                            <span slot="title">分销商管理</span>
                        </el-menu-item>
                        <el-menu-item index="6">
                            <span slot="title">配置管理</span>
                        </el-menu-item>
                        <el-submenu index="7">
                            <template slot="title">权限管理</template>
                            <el-menu-item index="7-1">菜单管理</el-menu-item>
                            <el-menu-item index="7-2">用户管理</el-menu-item>
                           <el-menu-item index="7-3">权限管理</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-col>
                <el-col :span="20">
                    <management ></management>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    import management from "./page/Management"
    export default {
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
        },
        components:{
            management
        }
    }
</script>
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