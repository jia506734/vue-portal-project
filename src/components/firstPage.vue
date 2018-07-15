<template>
    <div> 
        <div class="top">
              <div class="block">
                <el-carousel height="250px">
                    <el-carousel-item v-for="item in picArr" :key="item.id" style="margin-left:150px">
                        <img :src="item.imgUrl" />
                        <img :src="item.imgUrl" />
                        <img :src="item.imgUrl" />
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <div>
            <el-row style="margin-top:150px">
                <el-col :span="2">
                    <div style="margin-left:50px">
                        左箭头
                    </div>
                </el-col>
                <el-col :span="4">
                    <div style="margin-left:50px">
                        智慧校园
                    </div>
                </el-col>
                <el-col :span="4">
                    <div style="margin-left:50px">
                        智慧医院
                    </div>
                </el-col>
                <el-col :span="4">
                    <div style="margin-left:50px">
                       智能家具
                    </div>
                </el-col>
                <el-col :span="4">
                    <div style="margin-left:50px">
                        智能工业
                    </div>
                </el-col>
                <el-col :span="4">
                    <div style="margin-left:50px">
                        智能仓储
                    </div>
                </el-col>
                <el-col :span="2">
                    <div style="margin-left:50px">
                        右箭头
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import con1 from "@/assets/pictrue/1.jpg";
import con2 from "@/assets/pictrue/2.jpg";
import con3 from "@/assets/pictrue/3.jpg";
import con4 from "@/assets/pictrue/4.jpg";
import con5 from "@/assets/pictrue/5.jpg";
import con6 from "@/assets/pictrue/6.jpg";
import con7 from "@/assets/pictrue/7.jpg";
import con8 from "@/assets/pictrue/8.jpg";
import con9 from "@/assets/pictrue/9.jpg";
export default {
    data(){
        return{
            picArr:[
                {id:1,imgUrl: con1},
                {id:2,imgUrl: con2},
                {id:3,imgUrl: con3},
                {id:4,imgUrl: con4},
                {id:5,imgUrl: con5},
                {id:6,imgUrl: con6},
                {id:7,imgUrl: con7},
                {id:8,imgUrl: con8},
                {id:9,imgUrl: con9},
            ],
        }
    },
}
</script>

<style scoped>
    .top{
        border-bottom:solid 1px #ddd;
        height:250px;
    }
</style>

