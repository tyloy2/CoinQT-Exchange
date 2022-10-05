<template>
	<tm-app>
		<tm-text :label="test" ></tm-text>
	</tm-app>
</template>

<script>
	export default {
		components: {
	
		},
		data() {
			return {
				
				
				test: "21312",
				
			};
		},
		created() {
			
		},
		onLoad() {
			uni.$tm.u.toast("213")
	
		},
		mounted() {
			
		},
		methods: {
			
		}
	};
</script>

<style>
</style>