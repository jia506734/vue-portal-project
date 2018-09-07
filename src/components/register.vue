<template>
  	<div class="login_page fillcontain">
		<div style="height: 100%;width: 100%;"><img :src="url"/></div>
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer">
		  		<div class="manage_tip">
		  			<h1>LOGO</h1>
		  		</div>
				<div class="text_left" style="margin-bottom:20px;">{{formName}}</div>
		    	<el-form :model="ruleFormAcount" :rules="rulesAcount" ref="ruleFormAcount" label-width="100px">
					<el-form-item prop="acountName" label="用户名">
						<el-input v-model="ruleFormAcount.acountName" placeholder="手机号/邮箱登录"></el-input>
					</el-form-item>
					<el-form-item prop="acountPass" label="密码">
						<el-input type="password" placeholder="密码" v-model="ruleFormAcount.acountPass"></el-input>
					</el-form-item>
                    <el-form-item label="所属租户" prop="tenant">
						<el-select v-model="ruleFormAcount.tenant" placeholder="请选择所属租户">
							<el-option
							v-for="item in tenantData"
							:key="item.tenantId"
							:label="item.tenantName"
							:value="item.tenantId">
							</el-option>
						</el-select>
					</el-form-item>
                    <el-form-item  label="手机验证码">
                        <el-col :span="19">
                            <el-form-item prop="phoneValid">
                                <el-input placeholder="手机验证码" v-model="ruleFormAcount.phoneValid"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item >
                                <el-button size="mini" type="primary">点击获取</el-button>
                            </el-form-item>
                        </el-col>
						
                        
					</el-form-item>
					<el-form-item>
				    	<el-button  type="primary" @click="submitAcountForm('rulesAcount')" class="submit_btn">注册></el-button>
                        <el-button  @click="toBack" class="submit_btn">返回登录></el-button>
				  	</el-form-item>
				</el-form>
	  		</section>
	  	</transition>
  	</div>
</template>

<script>
	import axios from "axios"
	import {mapActions, mapState} from 'vuex'
	export default {
	    data(){
			// var checkPass = (rule, value, callback) => {
			// 	if (!value) {
			// 	return callback(new Error('确认密码不能为空'));
			// 	}
			// 	setTimeout(() => {
			// 		if (value!=this.ruleFormForget.acountPass) {
			// 			callback(new Error('两次密码不一致'));
			// 			this.ruleFormForget.acountAgainPass ="";
			// 		} 
			// 	}, 1000);
			// };
			return {
				url:require( '../../static/image/login-background.jpg'),
                formName:'',
				ruleFormAcount:{
					acountName:'',
					acountPass:'',
					tenant:'',//所属租户  
                    phoneValid:'', 
				},
				rulesAcount:{
					acountName: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			        ],
					acountPass: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
					tenant:[
						{ required: true, message: '请选择租户', trigger: 'change'}
					],
                    phoneValid: [
						{ required: true, message: '请输入验证码', trigger: 'blur' }
					],
				},
				tenantData:[],
			}
		},
		computed:{
			...mapState(["register"]),
		},
		mounted(){
		},
		created(){
            this.formName =this.$store.state.register==1?"Register 注册":"修改密码"
			this.getTenantData();
		},
		methods: {
			//获取租户		
			getTenantData(){
				let _this= this;
				axios
				.get("/auth/all_tenants")
				.then(function(response){
					_this.tenantData = response.data.data;
				})
			},
            //修改密码提交
			submitForgetForm(ruleFormForget){
				this.$refs[ruleFormForget].validate((valid) => {
                    if(valid){
						//提交修改
						this.forgetPassShow = false;
					}
				 });
			},
			//账号注册提交
			submitAcountForm(ruleFormAcount){
				 this.$refs[ruleFormAcount].validate((valid) => {
                    if(valid){
						//注册账号
						this.registAcountShow = false;
					}
				 });
			},
            toBack(){
                this.$router.push('index.html')
            },
		},
	}
</script>

<style  scoped>
    .el-button--mini, .el-button--mini.is-round{
            padding: 7px 2px !important;
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
		/* background-image: url("/static/image/login-background.jpg") */
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
		left: 50%;
		top: 50%;
	}
	.tip{
		font-size: 12px;
		color: red;
	}
    .el-select{
        width: 100%;
    }
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>
