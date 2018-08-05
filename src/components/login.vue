<template>
  	<div class="login_page fillcontain">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
		  		<div class="manage_tip">
		  			<h1>LOGO</h1>
		  		</div>
				<div style="float:left;margin-bottom:20px;">LOGIN 登录</div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm">
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" placeholder="手机号/邮箱登录"><span>dsfsf</span></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item>
				    	<el-button  type="primary" @click="submitForm('loginForm')" class="submit_btn">登录></el-button>
						<span class="else-button">注册账号</span>
						<span class="else-button">忘记密码?</span>
						
				  	</el-form-item>
				</el-form>
				<!-- <p class="tip">温馨提示：</p>
				<p class="tip">未登录过的新用户，自动注册</p>
				<p class="tip">注册过的用户可凭账号密码登录</p> -->
	  		</section>
	  	</transition>
  	</div>
</template>

<script>
	// import {mapActions, mapState} from 'vuex'

	export default {
	    data(){
			return {
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
		mounted(){
			this.showLogin = true;
			// if (!this.adminInfo.id) {
    		// 	this.getAdminData()
    		// }
		},
		methods: {
			async submitForm(formName) {
                this.$router.push('manage')
			},
		},
	}
</script>

<style  scoped>
	.login_page{
		    left: 0;
    top: 0;
    bottom: 0;
    position: absolute;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    right: 0;
		background-image: url("../assets/pictrue/7.jpg")
	}
	.else-button{
 		font-size:12px;float:right
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
		float: left;
	}
	.form_contianer{
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fff;
		width: 25%;
		transform: translate(-50%,-50%);
		position: absolute;
		left: 50%;
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
