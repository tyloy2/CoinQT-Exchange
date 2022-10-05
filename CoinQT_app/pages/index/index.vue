<template>
    <tm-app ref="app">
		<!-- navbar -->
		<tm-navbar title="avatar"   :shadow="0" hide-home  hideBack>
			<template v-slot:left>
				<navigator url="/pages/assets/login" hover-class="none" open-type="navigate" animation-type="pop-in" animation-duration="200" >
				<tm-avatar :font-size="60" :img='userinfo.avatar'></tm-avatar>
				</navigator>
			</template>
			<template v-slot:right>
				<tm-avatar @click="testurl" :font-size="50" img="/static/logo.png"></tm-avatar>
				<!-- <tm-icon _class="px-10" :fontSize="40" name="tmicon-comment-dots"></tm-icon> -->
				<navigator url="search" open-type="navigate" hover-class="navigator-hover" animation-type="pop-in" animation-duration="3000" >
				<tm-avatar :font-size="50" img="/static/logo.png"></tm-avatar>
				</navigator>
			</template>
		</tm-navbar>
		<tm-sheet  :margin="[0, 0]" :followTheme="true">
			<!-- asset -->
			<tm-sheet :margin="[0, 0]" :followTheme="true">
				<tm-text :font-size="24" _class="font-weight-b" label="总资产估值"></tm-text>
				<tm-divider></tm-divider>
				<tm-text label="85.61USD" :font-size="38" style="font-weight:700;" ></tm-text>
			</tm-sheet>
			<!-- carousel -->
			<tm-carousel  autoplay :margin="[0,18]" align="center" :round="3" :width="686" :height="300" :list="banner"></tm-carousel>
			
			<!-- menu -->
			<tm-grid :width="sysinfo.width" :col="4">
				<tm-grid-item dot>
					<tm-icon name="tmicon-user-fill" :font-size="42"></tm-icon>
				</tm-grid-item>
				<tm-grid-item count="HOT">
					<tm-icon name="tmicon-user-fill" :font-size="42"></tm-icon>
				</tm-grid-item>
				<tm-grid-item :count="55">
					<tm-icon name="tmicon-user-fill" :font-size="42"></tm-icon>
				</tm-grid-item>
				<tm-grid-item icon="tmicon-gem">
					<tm-icon name="tmicon-user-fill" :font-size="42"></tm-icon>
				</tm-grid-item>
			</tm-grid>
		</tm-sheet>
		<!-- quick -->
		<tm-sheet :padding="[0,0]" :margin="[0,15]" :followTheme="true" _class="overflow"  >
			 <tm-row :gutter="0" color="blue-grey"  >
				<tm-col class="flex-6"   :height="160" >
					<view class="flex-row flex-row-center-between">
						<tm-text :font-size="34" label="快捷买币" ></tm-text>
						<tm-image :width="60" :height="60" src="/static/logo.png"></tm-image>
					</view>
				</tm-col>
				 <tm-divider color="green" vertical  ></tm-divider>
				<tm-col class="flex-6"  :height="160"  >
					<view class="flex-row flex-row-center-between">
						<tm-text :font-size="34" label="C2C买币" ></tm-text>
						<tm-image :width="60" :height="60" src="/static/logo.png"></tm-image>
					</view>
				</tm-col>
			</tm-row>
		</tm-sheet>
		
		<!-- coin list -->
		<tm-sheet :padding="[0,0]" _class="overflow"  :margin="[0,0]" :followTheme="true" >
			<tm-tabs showTabsLineAni :item-width="110"  :width="636" :height="500" default-name="1" :list="coinlist"  ></tm-tabs>
			 <tm-table  :height="450" :width="638" :table-data="tableData" :header="header"></tm-table>
		</tm-sheet>
		
		<!-- end -->
        <view style="height: 150rpx;"></view>
        <tm-float-button  @click="onChangeDark" :btn="{ icon: 'tmicon-ios-sunny',color:'primary',linear:'right',linearDeep:'dark'}" style="margin-bottom: 10%;"></tm-float-button>
    </tm-app>
</template>
<script>
	import helper from '../../common/helper.js'; 
	export default {
		components: {
			helper
		},
		data() {
			return {
				banner:[
					"https://file.coinexstatic.com/2022-07-25/5D33F9D38DA075B4D176818C48AA6EFF.png",
					"https://file.coinexstatic.com/2022-07-22/8388D3449FADF0D958DABB16BE42AC54.png",
					"https://file.coinexstatic.com/2022-08-05/FD18BEF8CFAA163CA6AA5B59BE0F52D8.png",
					"https://file.coinexstatic.com/2022-03-22/C858460B76A0A6F856E4D8B6752C59AB.png",
				],
				sysinfo:"",
				test: "21312",
				tableData:[
				{
					data: {
						unpayamount: 100,
						desc: "没有",
						status: "通过",
					}
				}, {
					data: {
						paytime: {
							text:"获取",
							type:'button'
						},
						desc: {
							text:"好吧",
							color:'orange',
							light:true
						},
						status: "通过",
					}
				},
			
			],
			userinfo:"",
			header:[
				{ title: "市值",key:'paytime',width:200 },
				{ title: "价格",key:'desc',width:200  },
				{ title: "24涨跌",key:'status',sort:true,width:200 },
			],
			coinlist:[
				{ key: "1", title: "涨幅榜",icon: "" },
				{ key: "2", title: "跌幅榜", icon: "" },
				{ key: "3", title: "成交榜",dotColor:'yellow', icon: "" },
				{ key: "4", title: "市值榜", icon: "" },
			]
				
			};
		},
		created() {
			
		},
		onLoad() {
			uni.$tm.u.toast("213")
			this.userinfo = uni.$tm.u.getCookie("userinfo")
	
		},
		mounted() {
			
		},
		methods: {
			onChangeDark(){
				console.log("切换")
				app.value?.setDark()
			}
		}
	};
</script>
