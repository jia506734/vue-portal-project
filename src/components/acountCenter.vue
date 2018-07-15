<template>
    <div>
        <div class="content_section">
            <el-row style="height: 100%;">
                <el-col :span="4"  style="min-height: 100%; background-color: rgb(208, 219, 239)">
                    <el-menu :default-active="defaultActive" style="min-height: 100%;background-color: rgb(208, 219, 239)" >
                        <el-menu-item index="1">
                            <span slot="title">基本资料</span>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <span slot="title">资质认证</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <span slot="title">修改密码</span>
                        </el-menu-item>
                    </el-menu>
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