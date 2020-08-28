<template>
	<view class="app_exprot_excel_container">
		<button @click='tableToExcel'>导出</button>
	</view>
</template>

<script>
	export default {
		props:{
			fileName:String,
			jsonData:Array,
			headerData:Array
		},
		data() {
			return {
				saveExcel:null
			} 
		},
		mounted() { 
			// document.addEventListener("plusready", this.onPlusReady, false);
			this.onPlusReady();
		},
		methods: {
			// 扩展API加载完毕后调用onPlusReady回调函数  
			onPlusReady() {
				// var log = plus.android.util.Log 
				
				this.saveExcel = function(urls) {
					//private
					plus.io.requestFileSystem(plus.io.PRIVATE_DOC, function(fs) {
						console.log("requestFileSystem");
						// 创建文件夹
						fs.root.getDirectory('testDir', {
							create: true
						}, function(dirEntry) {
							console.log("getDirectory");
							// 创建文件
							dirEntry.getFile('testExcel.xls', {
								create: true
							}, function(fileEntry) {
								console.log("getFile");
								fileEntry.createWriter(function(writer) {
									console.log("createWriter");
									writer.onwrite = function(e) {
										console.log("Write data success!");
									};
									// 写入内容;
									writer.write(urls);
									writer.onwriteend = function(e) {} 
								}, function(e) {
									console.log(e.message);
								});
							});
						});

					});
				}
			
			},
			tableToExcel() {
				//要导出的json数据
				const jsonData = [{
						name: '路人甲',
						phone: '123456',
						email: '123@123456.com'
					},
					{
						name: '炮灰乙',
						phone: '123456',
						email: '123@123456.com'
					},
					{
						name: '土匪丙',
						phone: '123456',
						email: '123@123456.com'
					},
					{
						name: '流氓丁',
						phone: '123456',
						email: '123@123456.com'
					},
				]
				//列标题
				let worksheet = "sheet1";
				let str = '<tr><td>姓名</td><td>电话</td><td>邮箱</td></tr>';
				//循环遍历，每行加入tr标签，每个单元格加td标签
				for (let i = 0; i < jsonData.length; i++) {
					str += '<tr>';
					for (let item in jsonData[i]) {
						//增加\t为了不让表格显示科学计数法或者其他格式
						str += `<td>${ jsonData[i][item] + '\t'}</td>`;
					}
					str += '</tr>';
				}
				//下载的表格模板数据
				let template =
					`<html xmlns:o="urn:schemas-microsoft-com:office:office" 
			      xmlns:x="urn:schemas-microsoft-com:office:excel" 
			      xmlns="http://www.w3.org/TR/REC-html40">
			      <head><!--[if gte mso 9]><xml encoding="UTF-8"><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
			        <x:Name>${worksheet}</x:Name>
			        <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
			        </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
			        </head><body><table>${str}</table></body></html>`;
				//下载模板
				this.saveExcel(template);
			}

		}
	}
</script>

<style>
</style>
