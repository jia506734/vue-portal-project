


<template>
  <div>
      <el-container>
        <el-header>
            <div class="header_container">
            <div class="header_left">
                <div>探为-开放平台</div>
                <div class="header_left_content">Get优质IT服务，从这里开始</div>
            </div>
            <div class="header_tab">
                <span class="header_tablist"> 首页</span>
                <span class="header_tablist">资源中心</span>
                <span class="header_tablist"> 管理中心</span>
                <span class="header_tablist">数据中心</span>   
                <span class="header_tablist">账号中心</span>
            </div>
            <div class="header_right">
                <span class="header_tiplist">wulongbin-2@16.. </span>
                <span class="header_tiplist">通知</span>
                <span class="header_tiplist">退出</span>
                <span class="header_tiplist">英文</span>
            </div>
        </div>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu :default-active="defaultActive" style="min-height: 100%;background-color: #D3DCE6;" >
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
            </el-aside>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
  </div>
</template>
<style scoped>
    .header_right{
        float: right; 
        text-align: right;
        width: calc(30% - 50px);
        margin-top: 19px;
        margin-right: 50px;
    }
    .header_left{
        float: left; 
        width: calc(20% - 50px);
        margin-top: 8px;
        margin-left: 50px;
        text-align: left;
    }
    .header_left_content{
        font-size: 13px;
        margin-top: 5px;
    }
    .header_tab{
        float: left; 
        width: 50%;
        margin-top:18px;
    }
    .header_tablist{
        display: inline-block;
        width: 19%;
    }
    .header_container{
        height: 960px; 
    }
  .el-header, .el-footer {
    background-color: #d2d2d2;
    color: #333;
    text-align: center;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
