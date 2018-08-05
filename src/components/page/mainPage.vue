<template>
    <div class="indexPage">
        <el-row>
            <el-col :span="12">
                <div class="totalData">
                    <div class="totalHead">
                        数据统计
                    </div>
                    <div class="row-other">
                        <el-row class="row-el">
                            <el-col :span="21">订单总数</el-col>
                            <el-col :span="3">0个</el-col>
                        </el-row>
                    </div>
                    <div  class="row-other">
                        <el-row class="row-el">
                            <el-col :span="21">总营收额</el-col>
                            <el-col :span="3">0.0元</el-col>
                        </el-row>
                    </div>
                    <div  class="row-other">
                        <el-row class="row-el">
                            <el-col :span="21">线路总数</el-col>
                            <el-col :span="3">8个</el-col>
                        </el-row>
                    </div>
                    <div  class="row-other">
                        <el-row class="row-el">
                            <el-col :span="21">被挑选量</el-col>
                            <el-col :span="3">25次</el-col>
                        </el-row>
                    </div>
                    <div style="height:40px"></div>
                    
                </div>
            </el-col>
            <el-col :span="12">
                <div class="totalData">
                    <div class="totalHead">
                        今日新增
                    </div>
                    <div class="row-other">
                        <el-row class="row-el">
                            <el-col :span="21">订单总数</el-col>
                            <el-col :span="3">0个</el-col>
                        </el-row>
                    </div>
                    <div  class="row-other">
                        <el-row class="row-el">
                            <el-col :span="21">今日营收</el-col>
                            <el-col :span="3">0.00元</el-col>
                        </el-row>
                    </div>
                    <div  class="row-other">
                        <el-row class="row-el">
                            <el-col :span="21">进入浏览量</el-col>
                            <el-col :span="3">288次</el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
        </el-row>
        
        <!-- <div class="todayData">
            <div class="todayHead">
                数据统计
            </div>
        </div> -->
    </div>
</template>

<style scoped>
    .row-other{
        border-bottom:1px solid #6dcac1;
        height:40px
    }
    .indexPage{
        margin: 10px 0px 0px 20px;
    }
    .totalData{
        width:90%;
        height: 240px;
        background: white;
        font-size: 14px;
    }
    .row-el{
        line-height: 25px;
        padding: 10px;
    }
    .todayData{
        width:40%;
        height: 250px;
        background: #ddd;
        float: left;
    }
    .totalHead{
        margin-top: 10px;
        height: 35px;
        background: #6dcac1;
        line-height: 30px;
        text-align: center;
    }
</style>

