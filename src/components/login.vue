<template>
  	<div class="login_page fillcontain">
		<div id="indexContainer"><img :src="url"/></div>
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
				<div class="text_left" style="margin-bottom:10px;">LOGIN 登录</div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm">
					<el-form-item prop="username">
						<div class="text_left">用户名</div>
						<el-input v-model="loginForm.username" placeholder="手机号/邮箱登录"><span>dsfsf</span></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<div class="text_left">密码</div>
						<el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item>
				    	<el-button  type="primary" @click="submitForm('loginForm')" class="submit_btn">登录></el-button>
						<div class="else-button" @click="toRegister">注册账号</div>
						<div class="else-button" @click="toChangePass">忘记密码?</div>
				  	</el-form-item>
				</el-form>
	  		</section>
	  	</transition>
  	</div>
</template>

<script>
	import {mapActions, mapState} from 'vuex'
	export default {
	    data(){
			return {
				url:require( '../../static/image/login_back.jpg'),
				loginForm: {
					username: '',
					password: '',
				},
				rules: {
					username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
				},
				showLogin: false,
			}
		},
		computed:{
			...mapState(["tenantId","register"]),
		},
		mounted(){
			this.showLogin = true;
			// if (!this.adminInfo.id) {
    		// 	this.getAdminData()
    		// }
		},
		methods: {
			toChangePass(){
				this.$store.state.register= 0;
				this.$router.push('register');
			},
			toRegister(){
				this.$store.state.register= 1;
				this.$router.push('register');
			},
			async submitForm(formName) {
                this.$router.push('mainPage')
			},
		},
	}
</script>

<style  scoped>	
	#indexContainer img{
		position: absolute;
    	width: 100%;
    	height: 100%;
	}
	.text_left{
		text-align: left;
	}
	.login_page{
		left: 0;
		top: 0;
		bottom: 0;
		position: absolute;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		right: 0;
		/* background-image: url("../../static/image/login-background.jpg") */
	}
	.else-button{
 		font-size:12px;
		float:right;
		cursor: pointer;
	}
	.else-button + .else-button {
		padding-right:10px;
	}
	.manage_tip{
		position: absolute;
		width: 100%;
		top: -100px;
		left: 0;
		color: white;
		font-size: 25px;
	}
	.submit_btn{
		width:100px;
		text-align: center;
		float: left;
	}
	.form_contianer{
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fff;
		width: 20%;
		transform: translate(-50%,-50%);
		-webkit-transform:translate(-50%,-50%);
		-ms-transform: translate(-50%,-50%);
		-moz-transform: translate(-50%,-50%);
		position: absolute;
		left: 49%;
		top: 50%;
	}
	.tip{
		font-size: 12px;
		color: red;
	}
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>
