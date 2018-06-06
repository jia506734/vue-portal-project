<template>
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
</template>
<style scoped>
    .header_container{
        height: 80px;
        background-color: #d2d2d2;
    }
    .header_left{
        float: left; 
        width: calc(20% - 50px);
        margin-top: 19px;
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
        margin-top: 19px;
    }
    .header_tablist{
        display: inline-block;
        width: 19%;
    }
    .header_right{
        float: right; 
        text-align: right;
        width: calc(30% - 50px);
        margin-top: 19px;
        margin-right: 50px;
    }
    .header_tiplist{
        display: inline-block;
        padding-right: 10px;
    }
    .header_tiplist + .header_tiplist{
        padding-left: 10px;
        border-left: 1px solid #000000;
    }
</style>

