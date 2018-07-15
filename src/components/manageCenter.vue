<template>
    <div>
        <div class="content_section">
            <el-row style="height: 100%;">
                <el-col :span="4"  style="min-height: 100%; background-color: rgb(208, 219, 239)">
                    <el-menu :default-active="defaultActive" style="min-height: 100%;background-color: rgb(208, 219, 239)" >
                        <el-submenu index="1">
                            <template slot="title">资源中心首页</template>
                            <el-menu-item index="userList">智慧校园</el-menu-item>
                            <el-menu-item index="shopList">智慧医院</el-menu-item>
                            <el-menu-item index="foodList">智能家居</el-menu-item>
                            <el-menu-item index="orderList">智能工业</el-menu-item>
                            <el-menu-item index="adminList">智能仓储</el-menu-item>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title">返回码说明</template>
                            <el-menu-item index="userList">返回码说明</el-menu-item>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">常见错误</template>
                            <el-menu-item index="userList">常见错误F&Q</el-menu-item>
                        </el-submenu>
                        <el-submenu index="4">
                            <template slot="title">资费说明</template>
                            <el-menu-item index="userList">资费说明</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-col>
                <!-- <e-col :span="20">
                    <div style="margin-left:10px;">
                        <header class="resourceCenter_title">资源中心首页</header>
                        <div class="resourceCenter_content">
                            <div class="content_list">资源中心是探为开放平台用户所需所有相关资源的汇集地，包括：</div>
                            <div class="content_list">1.智慧校园</div>
                            <div class="content_list">2.智慧医院</div>
                            <div class="content_list">3.智能家居</div>
                            <div class="content_list">4.智能工业</div>
                            <div class="content_list">5.智能仓储</div>
                            <div class="content_list">6.智能车 -->
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