<template>
	<view class="app_limited_space__t_container">
		<!-- 有限空间 -->
		<view class="limited_space_t_wrap">
			<view class="l_spt_wrap">

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 水泥
				oneData: [{
						checkName: '料',
						checkValue: 'liaoCheck11',
						prop: 'v1',
						num: 'liaoNum11'
					},
					{
						checkName: '储罐（仓）',
						checkValue: 'cgCheck12',
						prop: 'v1',
						num: 'cgNum12'
					},
					{
						checkName: '煤粉库（地坑、仓）',
						checkValue: 'mfkCheck13',
						prop: 'v1',
						num: 'mfkNum13'
					},
					{
						checkName: '筒型储存库',
						checkValue: 'txkCheck14',
						prop: 'v1',
						num: 'txkNum14'
					},
					{
						checkName: '立式磨',
						checkValue: 'lsmCheck15',
						prop: 'v1',
						num: 'lsmNum15'
					},
					{
						checkName: '球磨机',
						checkValue: 'qmjCheck16',
						prop: 'v1',
						num: 'qmjNum16'
					},
					{
						checkName: '选粉机',
						checkValue: 'xfjCheck17',
						prop: 'v1',
						num: 'xfjNum17'
					},
					{
						checkName: '电捕集罐',
						checkValue: 'dpCheck18',
						prop: 'v1',
						num: 'dpNum18'
					},
					{
						checkName: '煤气发生炉及上部密闭空间',
						checkValue: 'mqfsCheck19',
						prop: 'v1',
						num: 'mqfsNum19'
					},
					{
						checkName: '排水器室',
						checkValue: 'psqCheck110',
						prop: 'v1',
						num: 'psqNum110'
					},
					{
						checkName: '煤气排送机间',
						checkValue: 'mqpCheck111',
						prop: 'v1',
						num: 'mqpNum111'
					},
					{
						checkName: '净化设备',
						checkValue: 'jhCheck112',
						prop: 'v1',
						num: 'jhNum113'
					},
					{
						checkName: '回转窑',
						checkValue: 'hzkCheck114',
						prop: 'v1',
						num: 'hzkNum115'
					},
					{
						checkName: '预热器',
						checkValue: 'yrqCheck116',
						prop: 'v1',
						num: 'yrqNum117'
					},
					{
						checkName: '冷却机',
						checkValue: 'lqjCheck118',
						prop: 'v1',
						num: 'lqjNum119'
					},
					{
						checkName: '篦式冷却机',
						checkValue: 'asCheck120',
						prop: 'v1',
						num: 'asNum121'
					},
					{
						checkName: '其他',
						checkValue: 'qtCheck122',
						prop: 'v1',
						num: 'qtNum123'
					},
				],
				// 混泥土
				twoData: [{
						checkName: '料仓',
						checkValue: 'lcCheck21',
						prop: 'v1',
						num: 'lcNum2'
					},
					{
						checkName: '储罐（仓）',
						checkValue: 'cglCheck22',
						prop: 'v1',
						num: 'cglNum22'
					},
					{
						checkName: '搅拌仓',
						checkValue: 'jbcCheck23',
						prop: 'v1',
						num: 'jbcNum23'
					},
					{
						checkName: '其他',
						checkValue: 'qtTwoCheck24',
						prop: 'v1',
						num: 'qtTwoNum24'
					},
				],
				//平板玻璃
				threeData: [{
						checkName: '料仓',
						checkValue: 'lcThreeCheck31',
						prop: 'v1',
						num: 'lcThreeNum31'
					},
					{
						checkName: '混合机',
						checkValue: 'hhjCheck32',
						prop: 'v1',
						num: 'hhjNum32'
					},
					{
						checkName: '回转窑',
						checkValue: 'hzqCheck33',
						prop: 'v1',
						num: 'hzqNum33'
					},
					{
						checkName: '储罐（仓）',
						checkValue: 'cgThreeCheck34',
						prop: 'v1',
						num: 'cgThreeNum34'
					},
					{
						checkName: '电捕集罐',
						checkValue: 'dpjgCheck35',
						prop: 'v1',
						num: 'dpjgNum35'
					},
					{
						checkName: '煤气发生炉及上部密闭空间',
						checkValue: 'mqfslCheck36',
						prop: 'v1',
						num: 'mqfslNum36'
					},
					{
						checkName: '排水器室',
						checkValue: 'psqThreeCheck37',
						prop: 'v1',
						num: 'psqThreeNum37'
					},
					{
						checkName: '煤气排送机间',
						checkValue: 'mqpsCheck38',
						prop: 'v1',
						num: 'mqpsNum38'
					},
					{
						checkName: '净化设备',
						checkValue: 'jhsbCheck39',
						prop: 'v1',
						num: 'jhsbNum39'
					},
					{
						checkName: '其他',
						checkValue: 'qtThreeCheck310',
						prop: 'v1',
						num: 'qtThreeNum310'
					},
				],
				//建筑卫生陶瓷
				fourData: [{
						checkName: '立式磨',
						checkValue: 'lsmFourCheck41',
						prop: 'v1',
						num: 'lsmFourNum41'
					},
					{
						checkName: '球磨机',
						checkValue: 'qmjFourCheck42',
						prop: 'v1',
						num: 'qmjFourNum42'
					},
					{
						checkName: '泥浆池',
						checkValue: 'ljcCheck43',
						prop: 'v1',
						num: 'ljcNum43'
					},
					{
						checkName: '干燥塔',
						checkValue: 'gztCheck44',
						prop: 'v1',
						num: 'gztNum44'
					},
					{
						checkName: '回转窑',
						checkValue: 'hzzCheck45',
						prop: 'v1',
						num: 'hzzNum45'
					},
					{
						checkName: '电捕集罐',
						checkValue: 'dpjgCheck46',
						prop: 'v1',
						num: 'dpjgNum46'
					},
					{
						checkName: '煤气发生炉及上部密闭空间',
						checkValue: 'mqfslFourCheck47',
						prop: 'v1',
						num: 'mqfslFourNum47'
					},
					{
						checkName: '排水器室',
						checkValue: 'psqFourCheck48',
						prop: 'v1',
						num: 'psqFourNum48'
					},
					{
						checkName: '煤气排送机间',
						checkValue: 'mqpsFourCheck49',
						prop: 'v1',
						num: 'mqpsFourNum49'
					},
					{
						checkName: '净化设备',
						checkValue: 'jhsbFourCheck410',
						prop: 'v1',
						num: 'jhsbFourNum410'
					},
					{
						checkName: '竖窑',
						checkValue: 'jlCheck411',
						prop: 'v1',
						num: 'jlNum411'
					},
					{
						checkName: '电热干燥窑',
						checkValue: 'drgCheck412',
						prop: 'v1',
						num: 'drgNum412'
					},
					{
						checkName: '其他',
						checkValue: 'qtFourCheck413',
						prop: 'v1',
						num: 'qtFourNum413'
					},
				],
				//石膏板
				fiveData: [{
						checkName: '料仓',
						checkValue: 'lcFiveCheck51',
						prop: 'v1',
						num: 'lcFiveNum51'
					},
					{
						checkName: '干燥机',
						checkValue: 'gzjFiveCheck52',
						prop: 'v1',
						num: 'gzjFiveNum52'
					},
					{
						checkName: '回转窑',
						checkValue: 'hzzFiveCheck53',
						prop: 'v1',
						num: 'hzzFiveNum53'
					},
					{
						checkName: '其他',
						checkValue: 'qtFiveCheck54',
						prop: 'v1',
						num: 'qtFiveNum54'
					},
				],
				//耐火材料
				sixData: [{
						checkName: '料仓',
						checkValue: 'sixLcCheck61',
						prop: 'v1',
						num: 'sixLcNum61'
					},
					{
						checkName: '电捕集罐',
						checkValue: 'sixDpCheck62',
						prop: 'v1',
						num: 'sixDpNum62'
					},
					{
						checkName: '煤气发生炉及上部密闭空间',
						checkValue: 'sixMqfsCheck63',
						prop: 'v1',
						num: 'sixMqfsNum63'
					},
					{
						checkName: '排水器室',
						checkValue: 'sixPsqCheck64',
						prop: 'v1',
						num: 'sixPsqNum64'
					},
					{
						checkName: '煤气排送机间',
						checkValue: 'sixMqCheck65',
						prop: 'v1',
						num: 'sixMqNum65'
					},
					{
						checkName: '净化设备',
						checkValue: 'sixJhCheck66',
						prop: 'v1',
						num: 'sixJhNum66'
					},
					{
						checkName: '其他',
						checkValue: 'sixQtCheck67',
						prop: 'v1',
						num: 'sixQtNum67'
					},
				],
				//公辅设备设施
				sevenData: [{
						checkName: '锅炉',
						checkValue: 'sevenGlCheck71',
						prop: 'v1',
						num: 'sevenGlNum71'
					},
					{
						checkName: '管道',
						checkValue: 'sevenGdCheck72',
						prop: 'v1',
						num: 'sevenGdNum72'
					},
					{
						checkName: '收粉器',
						checkValue: 'sevenSfqCheck73',
						prop: 'v1',
						num: 'sevenSfqNum73'
					},
					{
						checkName: '喷雾干燥塔',
						checkValue: 'sevenPwCheck74',
						prop: 'v1',
						num: 'sevenPwNum74'
					},
					{
						checkName: '除尘器',
						checkValue: 'sevenCcqCheck75',
						prop: 'v1',
						num: 'sevenCcqNum75'
					},
					{
						checkName: '烟道',
						checkValue: 'sevenYdCheck76',
						prop: 'v1',
						num: 'sevenYdNum76'
					},
					{
						checkName: '电缆沟',
						checkValue: 'sevenDlCheck77',
						prop: 'v1',
						num: 'sevenDlNum77'
					},
					{
						checkName: '电梯井道',
						checkValue: 'sevenDtCheck78',
						prop: 'v1',
						num: 'sevenDtNum78'
					},
					{
						checkName: '地坑',
						checkValue: 'sevenDkCheck79',
						prop: 'v1',
						num: 'sevenDkNum79'
					},
					{
						checkName: '水塔（水箱）',
						checkValue: 'sevenStCheck710',
						prop: 'v1',
						num: 'sevenStNum710'
					},
					{
						checkName: '蓄水池',
						checkValue: 'sevenCscCheck711',
						prop: 'v1',
						num: 'sevenCscNum711'
					},
					{
						checkName: '窖井',
						checkValue: 'sevenQjCheck712',
						prop: 'v1',
						num: 'sevenQjNum712'
					},
					{
						checkName: '下水道',
						checkValue: 'sevenXsdCheck713',
						prop: 'v1',
						num: 'sevenXsdNum713'
					},
					{
						checkName: '污水处理池（井）',
						checkValue: 'sevenWsCheck714',
						prop: 'v1',
						num: 'sevenWsNum714'
					},
					{
						checkName: '其他',
						checkValue: 'sevenQtCheck715',
						prop: 'v1',
						num: 'sevenQtNum715'
					},

				]
			}
		}
	}
</script>

<style>
</style>
