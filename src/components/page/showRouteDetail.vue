<template>
    <div>
        <manage></manage>
        <div>
            <!-- 左侧 -->
            <div class="menu-wrapper" ref="menuWrapper"> 
                <ul>
                    <li v-for="(item,index) in goods" :key="index" class="menu-item" :class="{'current': currentIndex == index}" @click="selectMenu(index, $event)">
                        <span class="text">
                            <span  class="icon" :class="classMap[item.type]"></span>{{item.name}}
                        </span>
                    </li>
                </ul>
            </div>
            <!-- 右侧 -->
            <div class="food-wrapper" ref="foodsWrapper">
                <ul>
                    <li v-for="(item,index) in goods" :key="index" class="food-list food-list-hook">
                        <h1 class="title">{{item.name}}</h1>
                        <ul>
                            <!-- 特殊变量 $event 在内联语句处理器中访问原始的 DOM 事件 -->
                            <li  v-for="(food, num) in item.foods" :key="num" class="food-item"  @click="getFoods(food, $event)">
                                <div class="icon">
                                    <img :src="food.icon" alt="" width="57px" height="57px" style="border-radius: 4px;">
                                </div>
                                <div class="content">
                                    <h2 class="name">{{food.name}}</h2>
                                    <p class="desc">{{food.description}}</p>
                                    <div class="desc">
                                        <span style="margin-right: 12px">{{'月售'+food.sellCount+'份'}}</span>
                                        <span>{{'好评率'+food.rating+'%'}}</span>
                                    </div>
                                    <div class="price">
                                        <span>￥{{food.price}}</span>
                                        <span v-show="food.oldPrice !== ''" class="old-price">￥{{food.oldPrice}}</span>
                                    </div>
                                    <div class="cart-wrapper">
                                        <cartcontrol :food="food" @cartAdd="cartAdd"> </cartcontrol> //我是一个自定义组件请不要在意
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    
</template>

<script>
import manage from "../manage"
export default {
    data(){
        return{
            goods: [
                {name:'ddd',type:'3'}
            ],
        }
    },
    components:{
        manage
    },
}
</script>

<style scoped>

</style>

