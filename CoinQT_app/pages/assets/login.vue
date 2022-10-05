<template>
	<tm-app ref="app">
		<!-- navbar -->
		<tm-navbar title=""  linearDeep="accent" :shadow="0">
			<template v-slot:left>
				
				<navigator  hover-class="none" open-type="navigateBack" animation-type="pop-out" animation-duration="200" >
				<tm-icon _class="px-20" :fontSize="40" name="tmicon-times"></tm-icon>
				</navigator>
			</template>
			<template v-slot:right>
				<navigator url="/pages/assets/register" open-type="navigate" hover-class="navigator-hover" animation-type="pop-in" animation-duration="3000" >
				<tm-text :font-size="32" _class="px-20" label="注册"></tm-text>
				</navigator>
			</template>
		</tm-navbar>
		<tm-sheet :margin="[230,0]" style="height: 100vh;" class="round-t-10">
			
				<tm-form @submit="login" ref="form" v-model="login_form">
					<tm-form-item required v-if="login_form.type == 1" :rules="[{required:true,message:'邮箱地址'}]">
					<tm-input   v-model="login_form.email" prefix="tmicon-md-mail-open"  placeholder="邮箱地址" :margin="[0,24]" ></tm-input>
					</tm-form-item>
					<tm-form-item  v-if="login_form.type == 2" required  :rules="[{required:true,message:'手机号'}]">
					<tm-input v-model="login_form.phone" prefix="tmicon-md-mail-open"  placeholder="手机号" :margin="[0,24]" ></tm-input>
					</tm-form-item>
					<tm-form-item required  :rules="[{required:true,message:'登录密码'}]">
					<tm-input v-model="login_form.password" :margin="[0,24]" password placeholder="登录密码"  prefix="tmicon-lock-fill" ></tm-input>
					</tm-form-item>
					
					<tm-form-item :border="false">
						<view class=" flex flex-row">
							<view class="flex-1 mr-32">
								<tm-button form-type="submit" label="登录" block></tm-button>
							</view>
							<view class="flex-1">
								<tm-button v-if="login_form.type == 1" @click="change_type(2)" :shadow="0" text form-type="reset" label="手机登录" block></tm-button>
								<tm-button v-if="login_form.type == 2" @click="change_type(1)" :shadow="0" text form-type="reset" label="邮箱登录" block></tm-button>
							</view>
		
						</view>
					</tm-form-item>
				</tm-form>
				 
		</tm-sheet>
	</tm-app>
</template>
<script lang="ts" setup>
import { ref, computed,watch } from "vue"
import { onShow, onLoad } from "@dcloudio/uni-app";
import helper from '../../common/helper.js'; 
const login_form = ref({
	email:"",
	password:"",
	phone:"",
	type:1,
	
})

const login = (e)=>{
		uni.request({
		    url: helper.websiteUrl+"/member/login", //仅为示例，并非真实接口地址。
			method:"POST",
		    data: {
		        email:e.data.email,
				phone:e.data.phone,
				password:e.data.password
		    },
		    success: (res) => {
		        console.log(res);
				uni.$tm.u.setCookie("token",res.data.token)
				uni.$tm.u.setCookie("userinfo",res.data.userinfo)
				uni.$tm.u.toast(res.data.msg)
		    }
		});
}

//邮箱 手机登录	
const change_type = (type)=>{
	login_form.value.type = type
}


</script>