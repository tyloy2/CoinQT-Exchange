<template>
    <tm-app>
		<tm-sheet  :margin="[0,0]"  :padding="[0,0]">
               <tm-tabs showTabsLineAni activeFontSize="32" :item-width="110"  :width="636" :height="500" default-name="1" :list="coinlist"  ></tm-tabs>
			   <tm-sheet>
				   <view class="flex flex-row flex-start	">
				   	<view class="px-0">
				   		<tm-icon  name="tmicon-all" ></tm-icon>
				   	</view>
				   	<view class="px-10">
				   		<tm-text label="ETHW/USDT" class="text-align-left" style="float: left;"></tm-text> 
				   	</view>
				   	<view class="px-5 flex-11">
				   		<tm-text label="-22%"></tm-text>
				   	</view>
					<view class="px-10" >
						<tm-icon  name="tmicon-chart-line" ></tm-icon>
					</view>
					<view class="px-10">
						<tm-icon  name="tmicon-zidingyi"></tm-icon>
					</view>
					<view class="px-10">
						<tm-icon  name="tmicon-applicationgroup" ></tm-icon>
					</view>
				   </view>
			   </tm-sheet>
			   <view class="flex flex-row flex-center	">
			   <tm-tabs  default-name="1" align="center" :list="cointype"  :item-width="210" showTabsLineAni ></tm-tabs>
			   </view>
			   
			   <tm-sheet>
			 
			  <view class="flex flex-row flex-row-between">
					<view class="px-0">
					    <tm-segtab :width="360" bgColor="white" color="primary" class="border-1"  activeColor="white" :list="tablist" defaultValue="1"></tm-segtab>
						<tm-input :margin="[0,20]" ></tm-input>
						<tm-input :margin="[0,20]" ></tm-input>
						<tm-input :margin="[0,20]" ></tm-input>
					</view>
					<view class="px-10">
						 <tm-table @rowClick='onClick'  :height="450" :width="638" :table-data="tableData" :header="header"></tm-table>
					</view>
			   </view>
			    </tm-sheet>
				
			<tm-tabs  default-name="1"  :list="ordertype"  :item-width="130" showTabsLineAni ></tm-tabs>
			<tm-segtab    color="primary" class="border-1"  activeColor="white" :list="tablist" defaultValue="1"></tm-segtab>
			   
		</tm-sheet>
    </tm-app>
</template>
<script lang="ts" setup>
import { ref } from "vue"
import { onShow, onLoad } from "@dcloudio/uni-app";
const coinlist = ref([
	    { key: "1", title: "交易", icon: "" },
	    { key: "2", title: "兑换", icon: "" },
])

const cointype = ref([
	    { key: "1", title: "现货", icon: "" },
	    { key: "2", title: "资金池", icon: "" },
])

const ordertype = ref([
	    { key: "1", title: "当前委托", icon: "" },
	    { key: "2", title: "历史委托", icon: "" },
])

const tablist = ref([
    {text:'买入',id:'1'},
    {text:'卖出',id:'2'},
])

const header = ref([
    { title: "价格",width:150,key:'paytime' },
	{ title: "数量",width:150,key:'unpayamount'},
])

const tableData = ref([
    {
        data: {
            unpayamount: 18,
            paytime: "44.21233",
        }
    }, {
        data: {
            unpayamount: 25,
            paytime: "44.21233",
        }
    },
    {
        data: {
			unpayamount: 25,
				paytime: "44.21233",
			}
    }
])

function onClick(row,col){
	console.log(row)
	uni.$tm.u.toast("行:"+String(row)+",列"+String(col))
}

</script>