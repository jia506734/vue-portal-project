<template>
	<div class="block">
		<el-carousel height="300px">
			<el-carousel-item v-for="item in 4" :key="item">
				<h3>{{ item }}</h3>

			</el-carousel-item>
		</el-carousel>
		<div class="rightTitle">
			<el-row>
				<h3>香港7日游
					<el-tag>标签一</el-tag>
					<el-tag type="success">标签二</el-tag>
				</h3>
				<h5>
					港澳台路线，景点多样
				</h5>
			</el-row>
			<el-row class="price_bg">
				<div class="price_list">
					成人价：
					<span class="price_text">
						<em>¥</em>
						<span id="adult">2323</span>
						<em class="ml5">元/人</em>
					</span>
					儿童价：
					<span class="price_text">
						<em>¥</em>
						<span id="children">2323</span>
						<em class="ml5">元/人</em></span>
				</div>
				<div class="line_infor">
					<div class="line_day"><span>2</span>天<span>1</span>晚</div>
					<div class="line_people"><span>0</span>人预览 <span>0</span>人已报名</div>
				</div>
			</el-row>
			<el-row class="gray">
				<span>目的地：</span>XXX
			</el-row>
			<el-row class="gray">
				<span>成团人数：</span>XXX
			</el-row>
			<el-row class="gray">
				<span>行程天数：</span>XXX
			</el-row>
			<el-row class="gray icon">
				<i class="el-icon-star-off save"> 收藏</i>
				<i class="el-icon-share share"> 分享</i>
			</el-row>	
		</div>

	</div>
</template>
<script>

</script>
<style scoped>
.el-carousel{
	width: 50%;
	float: left;
}
.el-carousel__item h3 {
	color: #475669;
	font-size: 14px;
	opacity: 0.75;
	line-height: 150px;
	margin: 0;
}

.el-carousel__item:nth-child(2n) {
	background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
	background-color: #d3dce6;
}
.rightTitle{
	width: 49%;
	margin-left: 1%;
	float: left;
}
.el-tag{
	margin-left: 10px;
}
h5{
	margin-top:10px; 
	color: #FF6600;
}
.price_bg {
    background-color: #fff8ee;
    margin-top: 20px;
    width: 100%;
    position: relative;
    padding: 25px 20px 35px 10px;
    margin-top: 20px;
}
.price_list {
    margin: 4px 0px 0px 14px;
    font-size: 14px;
}
.price_text {
    font-size: 28px;
    color: #F60;
    font-family: Arial, Helvetica, sans-serif;
    margin-right: 10px;
}
.price_text em {
    font-size: 14px;
    margin-right: 5px;
    margin-left: 5px;
}
.price_bg .line_infor {
    position: absolute;
    text-align: right;
    right: 20px;
    top: 50%;
    margin-top: -23px;
}
.price_bg .line_infor .line_day {
    font-size: 14px;
    color: #f90;
}
.price_bg .line_infor .line_day span {
    font-size: 24px;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    margin-left: 5px;
    margin-right: 5px;
}
.price_bg .line_infor .line_people {
    font-size: 12px;
    color: #999;
    margin-top: 7px;
}
.line_people span {
    font-weight: bold;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    color: #666;
    margin-right: 5px;
    margin-left: 10px;
}
.gray{
	font-size: 14px;
	margin: 10px 10px;
}
.gray span{
	color: #aaa;
}
.gray.icon{
	margin-top:20px; 
}
.gray.icon i{
	margin-right: 10px; 
}
.gray.icon i.save{
	color: #FF6600;
}
.gray.icon i.save:hover{
	color: #aaa;
}
.gray.icon i.share{
	color: #6C996C;
}
</style>