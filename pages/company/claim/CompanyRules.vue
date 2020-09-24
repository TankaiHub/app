<template>
	<view class="c_r_wrap">
		<scroll-view scroll-x="true">
			<table class="c_r_table" border="0" cellpadding="0" cellspacing="0" width="805">
				<tbody>
					<tr>
						<td class="index_width">序号</td>
						<td colspan="3" class="xl86 com_td" width="134">门类</td>
						<td class="xl69" width="308" style="border-left:none;width:231pt">安全技术指导内容</td>
						<td class="xl69" width="225" style="border-left:none;width:169pt">相关依据</td>
						<td class="xl69" width="96" style="border-left:none;width:72pt">体现方式</td>
					</tr>
					<tr height="38" style="height:28.5pt">
						<td height="38" class="xl76" width="42" style="height:28.5pt;width:32pt">1</td>
						<td colspan="3" class="xl76" width="134" style="border-left:none;width:101pt">经营主体合法</td>
						<td class="xl72" width="308" style="border-left:none;width:231pt">“工商营业执照”等法定证照齐全有效，地址、营业范围等与注册（备案）信息一致。</td>
						<td class="xl73" width="225" style="border-left:none;width:169pt">《企业法人登记管理条例》第二条</td>
						<td class="xl73" width="96" style="border-left:none;width:72pt">证照原件</td>
					</tr>
					<tr height="19" style="height:14.25pt">
						<td :rowspan="infoData.fire_hydrant==1?5:4" height="228" class="xl76" width="42" style="height:171.0pt;
				 border-top:none;width:32pt">2</td>
						<td colspan="3" :rowspan="infoData.fire_hydrant==1?5:4" class="xl76" width="134" style="width:101pt">经营场所安全
						</td>
						<td class="xl121" width="308" style="border-top:none;border-left:none;width:231pt">易燃易爆生产经营场所不与居住场所在同一建筑物内。
						</td>
						<td class="xl73" width="225" style="border-top:none;border-left:none;width:169pt">《安全生产法》第三十九条</td>
						<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场</td>
					</tr>
					<tr height="19" style="height:14.25pt">
						<td height="19" class="xl121" width="308" style="height:14.25pt;border-top:none;
				 border-left:none;width:231pt">应急疏散通道畅通无堵塞，疏散指示标识正确完好。</td>
						<td class="xl73" width="225" style="border-top:none;border-left:none;width:169pt">《安全生产法》第三十九条第二款</td>
						<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场</td>
					</tr>
					<tr height="38" style="height:28.5pt" v-if="infoData.fire_hydrant==1">
						<td height="38" class="xl121" width="308" style="height:28.5pt;border-top:none;
				 border-left:none;width:231pt">装有消火栓的，标志明显、无遮挡；消火栓箱内水枪、水带配置齐全、完好有效；消防水源供水可靠。</td>
						<td class="xl73" width="225" style="border-top:none;border-left:none;width:169pt">《消防法》第二十八条</td>
						<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场、消防栓点检表</td>
					</tr>
					<tr height="57" style="height:42.75pt">
						<td height="57" class="xl121" width="308" style="height:42.75pt;border-top:none;
				 border-left:none;width:231pt">每75平方米至少配备4Kg灭火器2具，每月至少检查一次确保有效；灭火器应防潮防腐（箱装）稳固放置在明显地点且便于取用
							, 不影响安全疏散，铭牌朝外。</td>
						<td class="xl73" width="225" style="border-top:none;border-left:none;width:169pt">《建筑灭火器配置设计规范（GB
							50140-2010）》5.1、5.2.1、6.1、6.2.1及附表A01；<br>
							《建筑消防设施维护管理（GB 25201-2010）》6.1.4。</td>
						<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场、灭火器点检表</td>
					</tr>
					<tr height="95" style="height:71.25pt">
						<td height="95" class="xl121" width="308" style="height:71.25pt;border-top:none;
				 border-left:none;width:231pt">物料堆码平稳可靠，主通道宽度不小于
							2米，直接堆码的高度不超过1.4米，用支架、平台堆码的最高不超过堆垛底面宽度3倍；堆垛离厂房顶、柱距离不小于0.3米，与照明灯、墙距离不小于0.5米
							，堆垛间距不小于0.5米。</td>

						<td class="xl73" width="225" style="border-top:none;border-left:none;width:169pt">《金属切削加工安全要求（JB
							7741-1995）》4.6.6；<br>
							《机械工业职业安全卫生设计规定（JBJ 18-2000）》2.3.3；<br>
							《仓储场所消防安全管理通则（GA 1131-2014）》6.6、6.8。</td>
						<td class="xl78" style="border-top:none;border-left:none">现场</td>
					</tr>
					<tr height="76" style="height:57.0pt">
						<td :rowspan="11-((infoData.energy5==1&&work10max)?0:3)-(infoData.energy.indexOf('2')!==-1?0:3)-(infoData.energy.indexOf('4')!==-1?0:2)-(infoData.energy.indexOf('5')!==-1?0:1)"
						 class="xl76" width="42" style=" border-top:none;width:32pt">3</td>
						<td :rowspan="11-((infoData.energy5==1&&work10max)?0:3)-(infoData.energy.indexOf('2')!==-1?0:3)-(infoData.energy.indexOf('4')!==-1?0:2)-(infoData.energy.indexOf('5')!==-1?0:1)"
						 class="xl76" width="44" style="border-top:none;width:33pt">能源
							使用
							安全</td>
						<td colspan="2" :rowspan="(infoData.energy5==1&&work10max)?5:2" class="xl76" width="90" style="width:68pt">电
						</td>
						<td class="xl121" width="308" style="border-top:none;border-left:none;width:231pt">
							配电设施装入防火阻燃的配电箱（柜）内，安装有空开、漏电保护器（剩余电流保护器）、接零（地）等保护措施并保持有效，周边1.2米范围内无障碍物，配电箱（柜）内无明显积尘、无杂物，电气元件无烧损。</td>
						<td class="xl73" width="225" style="border-top:none;border-left:none;width:169pt">《低压配电设计规范（GB
							50054-2011）》4.2.5；<br>
							《机械制造企业安全生产标准化规范（AQ/T 7009-2013）》4.2.38.2.4、4.2.38.2.6。</td>
						<td class="xl78" style="border-left:none">现场</td>
					</tr>
					<tr>
						<td class="xl121" width="308" style="border-top:none;
				 border-left:none;width:231pt">电气线路绝缘层无明显老化、破损，固定线路用导管保护穿管、槽盒、架桥铺设，移动电器线路、临时用电线路必须使用护套线并安装漏电保护。</td>
						<td class="xl73" width="225" style="border-top:none;border-left:none;width:169pt">《机械制造企业安全生产标准化规范（AQ/T
							7009-2013）》4.2.38.2.1;<br>
							《低压配电设计规范（GB 50054-2011）》4.3.7、7.1、7.2；<br>
							《用电安全导则《GBT 13869-2008）》6.7；<br>
							《剩余电流动作保护装置安装和运行（GB 13955-2005）》4.5.1。</td>
						<td class="xl78" style="border-left:none">现场</td>
					</tr>
					<template v-if="infoData.energy5==1&&work10max">
						<tr height="57" style="height:42.75pt">
							<td height="57" class="xl121" width="308" style="height:42.75pt;border-top:none;
				 border-left:none;width:231pt">配电房门外开，门口防鼠板高度不低于0.4米，窗户有防护网，线缆孔洞封堵严实。</td>
							<td class="xl84" width="225" style="border-top:none;border-left:none;width:169pt">《20kV及以下变电所设计规范（GB
								50053-2013）》6.2.4；<br>
								《低压配电设计规范（GB 50054-2011）》4.3.2。</td>
							<td class="xl78" style="border-left:none">现场</td>
						</tr>
						<tr height="95" style="height:71.25pt">
							<td height="95" class="xl121" width="308" style="height:71.25pt;border-top:none;
				 border-left:none;width:231pt">配电房安全管理制度、安全操作规程上墙并严格落实，明显位置张贴相应的准确单线图（系统图）。</td>
							<td class="xl84" width="225" style="border-top:none;border-left:none;width:169pt">《建设工程施工现场供用电安全规范（GB
								50194-2014）》6.3.18；<br>
								《电业安全工作规程（DL 408-1991）》3.2；<br>
								《企业安全生产标准化基本规范（GBT 33000-2016）》5.2.3。</td>
							<td class="xl78" style="border-left:none">现场</td>
						</tr>
						<tr height="95" style="height:71.25pt">
							<td height="95" class="xl121" width="308" style="height:71.25pt;border-top:none;
				 border-left:none;width:231pt">配电房有专人管理，有二氧化碳灭火器、应急灯和绝缘手套、鞋、工具、地垫等并保持有效。</td>
							<td class="xl84" width="225" style="border-top:none;border-left:none;width:169pt">《电业安全工作规程（DL
								408-1991）》3.2；<br>
								《20kV及以下变电所设计规范（GB 50053-2013）》6.1；<br>
								《用电安全导则《GBT 13869-2008）》10；<br>
								《企业安全生产标准化基本规范（GBT 33000-2016）》5.2.2。</td>
							<td class="xl78" style="border-left:none">现场</td>
						</tr>
					</template>


					<template v-if="infoData.energy.indexOf('2')!==-1">
						<tr height="38" style="height:28.5pt">
							<td colspan="2" rowspan="3" height="114" class="xl92" width="90" style="border-right:
				 .5pt solid black;border-bottom:.5pt solid black;height:85.5pt;width:68pt">天然气</td>
							<td class="xl121" width="308" style="border-top:none;border-left:none;width:231pt">
								安装有燃气报警器、紧急截断阀且二者联动，管道法兰应设置静电跨接。</td>
							<td rowspan="2" class="xl108" width="225" style="border-bottom:.5pt solid black;
				 border-top:none;width:169pt">《石油化工可燃气体和有毒气体检测报警设计规范（GB
								50493-2009）》3.0.1；<br>
								《城镇燃气设计规范（GB 50028-2006）》10.8.5；<br>
								《石油库设计规范（GB 50074-2002）》14.2.14。</td>
							<td rowspan="2" class="xl108" width="96" style="border-bottom:.5pt solid black;
				 width:72pt">现场</td>
						</tr>
						<tr height="38" style="height:28.5pt">
							<td height="38" class="xl121" width="308" style="height:28.5pt;border-top:none;
				 border-left:none;width:231pt">企业内天然气站及使用天然气场所应安装有燃气报警器、紧急截断阀且二者联动，管道法兰应设置静电跨接。</td>
						</tr>
						<tr height="38" style="height:28.5pt">
							<td height="38" class="xl122" width="308" style="height:28.5pt;border-top:none;
				 border-left:none;width:231pt">每月至少检查一次，确保燃气无泄漏、燃气报警器有效。</td>
							<td class="xl73" width="225" style="border-top:none;border-left:none;width:169pt">《安全生产法》第三十三条第二款</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场、燃气设施点检表</td>
						</tr>

					</template>

					<template v-if="infoData.energy.indexOf('4')!==-1">
						<tr height="38" style="height:28.5pt">
							<td colspan="2" rowspan="2" height="76" class="xl76" width="90" style="height:57.0pt;
				 width:68pt">液化石油气</td>
							<td class="xl122" width="308" style="border-top:none;border-left:none;width:231pt">
								从有经营资质的单位购买，气瓶年检合格，瓶帽、防震圈等安全附件齐全。</td>
							<td class="xl73" width="225" style="border-top:none;border-left:none;width:169pt">《安全生产法》第三十四条<br>
								《特种设备安全法》第十五条、第三十二条</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场、供应单位资质信息</td>
						</tr>
						<tr height="38" style="height:28.5pt">
							<td height="38" class="xl121" width="308" style="height:28.5pt;border-top:none;
				 border-left:none;width:231pt">瓶装燃气瓶与火源保持1.5米以上距离，场所保持通风良好，最大临时储量不超过100kg。</td>
							<td class="xl73" width="225" style="border-top:none;border-left:none;width:169pt">《特种设备安全法》第三十七条</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场</td>
						</tr>

					</template>

					<tr height="38" style="height:28.5pt" v-if="infoData.energy.indexOf('5')!==-1">
						<td colspan="2" height="38" class="xl76" width="90" style="height:28.5pt;border-left:
				 none;width:68pt">醇基、生物油等液体燃料</td>
						<td class="xl121" width="308" style="border-top:none;border-left:none;width:231pt">
							从有经营资质的单位购买，储存场所保持通风良好，最大临时储量不超过100kg。</td>
						<td class="xl73" width="225" style="border-top:none;border-left:none;width:169pt">《危险化学品安全管理条例》第二十八条</td>
						<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场、供应单位资质信息</td>
					</tr>

					<tr height="38" style="height:28.5pt">
						<!-- height="1517" -->
						<td :rowspan="rowspan4" class="xl76" width="42" style="
				 border-top:none;width:32pt">4</td>
						<td :rowspan="rowspan4" class="xl76" width="44" style="border-top:none;width:33pt">日常管理安全</td>
						<td colspan="2" :rowspan="personDev" height="152" class="xl92" width="90" style="border-right:
				 .5pt solid black;border-bottom:.5pt solid black;height:114.0pt;width:68pt">人员安全</td>
						<td class="xl72" v-if="!work10max" width="308" style="border-top:none;border-left:none;width:231pt">
							对新进员工和各岗位人员开展培训，每个从业人员清楚企业危险因素和岗位安全风险，会使用灭火器等应急救援器材，掌握事故应急处置和逃生方法。</td>
						<td class="xl73" v-if="!work10max" width="225" style="border-top:none;border-left:none;width:169pt">
							《安全生产法》第二十五条</td>
						<td class="xl79" v-if="!work10max" width="96" style="border-top:none;border-left:none;width:72pt">培训记录</td>

						<td height="57" v-if="work10max" class="xl121" width="308" style="height:42.75pt;border-top:none;
				 border-left:none;width:231pt">制定年度安全培训计划，对新进员工和各岗位人员开展培训并如实记录。培训内容必须包括：岗位安全操作规程、企业安全管理规定、安全风险警示教育、事故应急处置和逃生技能等。</td>
						<td class="xl84" v-if="work10max" width="225" style="border-top:none;border-left:none;width:169pt">
							《安全生产法》第二十五条</td>
						<td class="xl73" v-if="work10max" width="96" style="border-top:none;border-left:none;width:72pt">培训计划、培训记录
						</td>
					</tr>

					<!-- <tr height="57" style="height:42.75pt">
				       </tr> -->
					<tr height="38" style="height:28.5pt" v-if="tszy">
						<td height="38" class="xl121" width="308" style="height:28.5pt;border-top:none;
				 border-left:none;width:231pt">电工、焊工、气焊（割）等特殊作业人员以及叉车、行车等特种设备操作人员持有效资格证上岗。</td>
						<td class="xl84" width="225" style="border-top:none;border-left:none;width:169pt">《安全生产法》第二十七条<br>
							《特种设备安全法》第十四条</td>
						<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">操作人员资格证</td>
					</tr>

					<template v-if="tszy || !work1">

						<template v-if="tszy">
							<tr>
								<td colspan="2" :rowspan="devSec" height="168" class="xl92" width="90" style="border-right:
				               .5pt solid black;border-bottom:.5pt solid black;height:126.0pt;width:68pt">设备安全</td>
								<td class="xl121" width="308" style="border-top:none;border-left:none;width:231pt">
									特种设备在醒目位置张贴使用登记证，设备及其安全附件、安全保护装置按规定定期校验、检修，保持合格有效。</td>
								<td class="xl73" width="225" style="border-top:none;border-left:none;width:169pt">《特种设备安全法》第三十三条、第三十九条<br>
								</td>
								<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场、设备检测报告</td>
							</tr>
						</template>
						<template v-if="!work1">
							<tr>
								<td v-if="!tszy" colspan="2" :rowspan="devSec" height="168" class="xl92" width="90" style="border-right:
				               .5pt solid black;border-bottom:.5pt solid black;height:126.0pt;width:68pt">设备安全</td>
								<td height="38" class="xl121" width="308" style="height:28.5pt;border-top:none;
				         border-left:none;width:231pt">操作平台、斜（直）梯护栏不低于1.05m，机械转动、传动部位有防护罩（栏）并保持完好。</td>
								<td class="xl73" width="225" style="border-top:none;border-left:none;width:169pt">《安全生产法》第三十三条、第三十八条<br>
									《重庆市安全生产条例》第二十一条</td>
								<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场</td>
							</tr>
							<tr height="54" style="height:40.5pt">
								<td height="54" class="xl121" width="308" style="height:40.5pt;border-top:none;
				         border-left:none;width:231pt">待检修、报废、停用等未正常使用的设备应张贴醒目标志和妥善放置，并采取断电、固定等措施保障安全。</td>
								<td class="xl79" width="225" style="border-top:none;border-left:none;width:169pt">《安全生产法》第三十二条、第三十三条；<br>
									《企业安全生产标准化基本规范（GB T33000-2016）》5.4.1.6。</td>
								<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场</td>
							</tr>
							<tr height="38" style="height:28.5pt" v-if="work10min">
								<td height="38" class="xl72" width="308" style="height:28.5pt;border-top:none;
				         border-left:none;width:231pt">各类大型机械、仪器仪表等设施设备每天班前至少点检一次，发现问题（隐患）及时消除，确认安全再上岗。</td>
								<td class="xl73" width="225" style="border-top:none;border-left:none;width:169pt">《特种设备安全法》第三十九条<br>
									《重庆市安全生产条例》第三十条第（一）、（三）项</td>
								<td class="xl79" width="96" style="border-top:none;border-left:none;width:72pt">日常检查表（点检表）</td>
							</tr>

						</template>

					</template>




					<!-- 管理安全 -->
					<template v-if="!work1">
						<tr height="38" style="height:28.5pt">
							<td colspan="2" :rowspan="work10max?3:2" class="xl76" width="90" style="width:68pt">管理安全</td>
							<td height="76" class="xl121" width="308" style="height:57.0pt;border-top:none;
				 border-left:none;width:231pt">
								经辨识企业安全风险、评估风险后果、调查应急资源后，制定事故应急预案并定期演练，并在相关场所张贴醒目的安全警示标志。每年至少演练一次综合应急预案或专项应急预案，每半年至少演练一次现场处置方案。</td>
							<td class="xl73" width="225" style="border-top:none;border-left:none;width:169pt">《安全生产法》第三十七条第一款、第三十二条<br>
								《生产安全事故应急预案管理办法》第三十三条</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">风险辨识清单、应急预案、演练记录</td>
						</tr>
						<tr height="76" style="height:57.0pt" v-if="work10max">
							<td class="xl121" width="308" style="border-top:none;border-left:none;width:231pt">
								明确专职或兼职安全管理人员，从主要负责人、安全管理人员到各班组（岗位）人员，层层明确安全责任，落实安全考核。</td>
							<td class="xl73" width="225" style="border-top:none;border-left:none;width:169pt">《安全生产法》
								第二十一条第二款</td>
							<td class="xl79" width="96" style="border-top:none;border-left:none;width:72pt">职责分工文件、考核奖惩制度</td>
						</tr>
						<tr height="95" style="height:71.25pt">
							<td height="95" class="xl121" width="308" style="height:71.25pt;border-top:none;
				 border-left:none;width:231pt">
								针对不同岗位和场所的安全风险，对设施设备安全条件、劳保用品发放使用、按规程安全操作等情况开展“日周月”安全检查并如实记录，发现问题（隐患）及时消除并形成台账。“日周月”安全检查即：班组人员每日班前（中）至少点检一次、安管人员每周至少核查一次、主要负责人每月至少抽查一次。
							</td>
							<td class="xl84" width="225" style="border-top:none;border-left:none;width:169pt">《安全生产法》第三十八条第一款<br>
								《企业安全生产标准化基本规范（GB T33000-2016）》5.5.3.1。</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">日周月隐患检查整改记录、问题整改台账</td>
						</tr>
					</template>


					<!-- //特殊作业安全// -->
					<template v-if="tszy">
						<tr height="38" style="mso-height-source:userset;height:28.5pt">
							<td v-if="!work1" class="xl76" width="56" style="
				 border-top:none;width:45pt">特殊作业安全</td>
							<td v-else class="xl76" width="56" style="
				 border-top:none;width:45pt">特殊作业安全</td>
							<td colspan="4" class="ts_word_table">
								<div class="fir_work">
									<!-- 42  44  46-->
									<table>
										<tr v-if="isShowCut">
											<td :rowspan="!work1?4:3" class="xl76 notPd" style="border-top:none; ">
												<div class="t_title">动火作业</div>
											</td>
											<td class="xl123 t_center" style="border-top:none;">
												可燃气体与氧气气瓶间距保持5m以上并有防倾倒设施，动火点与以上气瓶保持10米以上安全距离。</td>
											<td class="xl84" style="border-top:none;border-left:none;">《安全生产法》第十七条</td>
											<td class="xl73 t_footer" style="border-top:none;border-left:none;">现场</td>

										</tr>

										<tr height="38" style="" v-if="isShowCut">
											<td height="38" class="xl123 t_center" style="border-top:none;
				                   ">动火作业前清理或隔离周边易燃物并配备必要的应急器材和消防器材。</td>
											<td class="xl84" style="border-top:none;border-left:none;">《安全生产法》第十七条<br>
												《消防法》第二十一条</td>
											<td class="xl73 t_footer" style="border-top:none;border-left:none;">现场</td>
										</tr>
										<tr height="38" style="" v-if="!work1 && isShowCut">
											<td height="38" class="xl123 t_center" style="border-top:none;
				                   ">禁火区作业提前审批（安全作业票），并设置专人监护。</td>
											<td class="xl84" style="border-top:none;border-left:none;">
												《安全生产法》第十七条、第四十一条、第五十四条<br>
												《消防法》第二十一条</td>
											<td class="xl73 t_footer" style="border-top:none;border-left:none;">现场、作业审批记录</td>
										</tr>
										<tr height="38" style="" v-if="isShowCut">
											<td height="38" class="xl123 t_center" style="border-top:none;
				                   ">电焊机电源线不超过3m，焊机必须有效接地。</td>
											<td class="xl84" style="border-top:none;border-left:none;">
												《家具生产企业安全生产标准化规范（AQ/T
												7010—2013）》5.6.5.3。</td>
											<td class="xl73 t_footer" style="border-top:none;border-left:none;">现场</td>
										</tr>

										<template v-if="!work1">
											<tr height="38" style="">
												<td :rowspan="isShowUnique?2:1" height="76" class="xl76 notPd" width="44" style="height:57.0pt;border-top:
				                   none; ">
													<div class="t_title">电工作业</div>
												</td>
												<td height="38" class="xl121" style="border-top:none;
				                   border-left:none;">大面积、远距离断电作业提前审批（安全作业票），管理人员全程在场监护、上锁管理，防止其他人员误操作。</td>
												<td class="xl84" style="border-top:none;border-left:none;">
													《安全生产法》第十七条、第四十一条、第五十四条
												</td>
												<td class="xl73 t_footer" style="border-top:none;border-left:none;">现场、作业审批记录</td>
											</tr>
											<tr v-if="isShowUnique">
												<td class="xl121" style="border-top:none;border-left:none;">
													作业时佩戴经检验合格的绝缘手套、绝缘鞋等个体防护装备，作业全程断电操作。</td>
												<td class="xl84" style="border-top:none;border-left:none;">《安全生产法》第四十二条<br>
													《重庆市安全生产条例》第二十九条</td>
												<td class="xl73 t_footer" style="border-top:none;border-left:none;">现场</td>
											</tr>
											<tr height="57" style="height:42.75pt" v-if='isShowSpecial'>
												<td rowspan="3" height="171" class="xl110 notPd" style="height:128.25pt;
				                   border-top:none;">
													<div class="t_title">吊装作业</div>
												</td>
												<td class="xl121" style="border-top:none;border-left:none;">
													吊装作业提前审批（安全作业票），并设置专人监护。
												</td>
												<td class="xl84" style="border-top:none;border-left:none;">《安全生产法》第四十条；<br>
													《重庆市安全生产条例》第二十二条第（一）项、第（二）项、第（三）项、第（四）项；</td>
												<td class="xl73 t_footer" style="border-top:none;border-left:none;">现场、作业审批记录</td>
											</tr>
											<tr height="57" style="height:42.75pt" v-if="isShowSpecial">
												<td height="57" class="xl121" style="height:42.75pt;border-top:none;
				                   border-left:none;">作业前检查吊钩防脱扣装置完好、吊具无明显磨损，确保安全可靠。</td>
												<td class="xl84" style="border-top:none;border-left:none;">
													《重庆市安全生产条例》第二十二条第（一）项、第（二）项、第（三）项、第（四）项，第三十条第（一）项；</td>
												<td class="xl73 t_footer" style="border-top:none;border-left:none;">现场</td>
											</tr>
											<tr height="57" style="height:42.75pt" v-if="isShowSpecial">
												<td height="57" class="xl121" style="height:42.75pt;border-top:none;
				                   border-left:none;">作业前确认吊装运行线路下方无人员和障碍物，吊装路线不能跨越重要设备。</td>
												<td class="xl84" style="border-top:none;border-left:none;">《安全生产法》第五十四条<br>
													《重庆市安全生产条例》第二十二条第（一）项、第（二）项、第（三）项、第（四）项；</td>
												<td class="xl73 t_footer" style="border-top:none;border-left:none;">现场</td>
											</tr>
											<tr height="57" style="height:42.75pt">
												<td rowspan="2" height="95" class="xl76 notPd" style="height:71.25pt;border-top:
				                   none; ">
													<div class="t_title">高空作业</div>
												</td>
												<td class="xl121" style="border-top:none;border-left:none;">
													作业提前审批（安全作业票），作业现场有管理人员全程监护，严禁交叉作业。</td>
												<td class="xl84" style="border-top:none;border-left:none;">
													1.《安全生产法》第四十条；<br>
													2.《重庆市安全生产条例》第二十二条第（一）项、第（二）项、第（三）项、第（四）项；</td>
												<td class="xl73 t_footer" style="border-top:none;border-left:none;">现场、作业审批记录</td>
											</tr>
											<tr height="38" style="">
												<td height="38" class="xl121" style="border-top:none;
				                   border-left:none;">作业人员正确佩戴和使用安全绳、安全帽等安全防护装备，携带工具袋防止工具掉落。</td>
												<td class="xl84" style="border-top:none;border-left:none;">《安全生产法》第五十四条
												</td>
												<td class="xl73 t_footer" style="border-top:none;border-left:none;">现场</td>
											</tr>
										</template>

									</table>

								</div>

							</td>
						</tr>
					</template>

					<!-- /// -->
					<template v-if="!work1">
						<template v-if="infoData.main_process.indexOf('喷涂')!==-1">
							<tr height="95" style="height:71.25pt">
								<td colspan="2" rowspan="3" height="342" class="xl124" width="90" style="border-right:
				 .5pt solid black;border-bottom:.5pt solid black;height:256.5pt;width:68pt">喷漆、涂装作业</td>
								<td class="xl121" width="308" style="border-top:none;border-left:none;width:231pt">
									调漆房、喷漆房的墙体、天花板、地坪、送风管道等均采用难燃材料，且不得采用铝材作为结构支撑架、室体、排风管道；喷漆房应采用外开常闭式防火门；开桶、搅拌、抽取作业应采取铜制工具。</td>
								<td class="xl73" width="225" style="border-top:none;border-left:none;width:169pt">
									《建筑防火涉及规范（GB50016-2014）》第3.2条<br>
									《防止静电事故通用导则（GB12158-2006）》第6.1条</td>
								<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场</td>
							</tr>
							<tr height="171" style="height:128.25pt">
								<td height="171" class="xl121" width="308" style="height:128.25pt;border-top:none;
				 border-left:none;width:231pt">
									调漆室、喷漆房内的电气设备（包括计量用电子秤）应采用防爆型，线路应穿镀锌管，线路接头禁止裸露在外，进行可靠接地。喷漆房内的所有喷漆设备、供漆容器、输漆管路和风机等应有可靠的导除静电装置；调漆室、喷漆房外应设置人体静电导出装置；进入调漆室、喷漆房作业人员应穿戴防毒面具和防静电工作服、防静电工作鞋、防护眼镜。
								</td>
								<td class="xl73" width="225" style="border-top:none;border-left:none;width:169pt">
									《爆炸和火灾危险环境电力装置设计规范（GB50058-2014）》第5.2条<br>
									《危险场所电气防爆安全规范（AQ3009-2007）》<br>
									《防止静电事故通用导则（GB12158-2006）》第6.1条<br>
									《职业病防治法》第二十二条</td>
								<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场</td>
							</tr>
							<tr class="xl74" height="76" style="height:57.0pt">
								<td height="76" class="xl121" width="308" style="height:57.0pt;border-top:none;
				 border-left:none;width:231pt">调漆室、喷漆房内应安装可燃气体浓度报警检测装置；采用喷烘两用喷漆房的喷漆设备、烘干设备和通风系统、电加热系统应与检测和报警装置联锁。</td>
								<td class="xl73" width="225" style="border-top:none;border-left:none;width:169pt">《危险化学品安全管理条例》第二十条</td>
								<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场</td>
							</tr>
						</template>

						<tr height="57" style="height:42.75pt">
							<td colspan="2" rowspan="3" height="152" class="xl76" width="90" style="height:114.0pt;
				 width:68pt">外包作业安全</td>
							<td class="xl121" width="308" style="border-top:none;border-left:none;width:231pt">
								审核并确定外包单位有相应资质、特殊作业人员有相应资质，对外包作业人员进行安全教育和作业安全交底。</td>
							<td class="xl73" width="225" style="border-top:none;border-left:none;width:169pt">《安全生产法》第四十六条第一款</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">安全教育记录、安全交底记录</td>
						</tr>
						<tr height="57" style="height:42.75pt">
							<td height="57" class="xl121" width="308" style="height:42.75pt;border-top:none;
				 border-left:none;width:231pt">签订外包合同（协议），明确安全管理责任，并监督外包单位安全责任落实情况。</td>
							<td class="xl73" width="225" style="border-top:none;border-left:none;width:169pt">《安全生产法》第四十六条第二款</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">外包合同（协议）或安全管理协议</td>
						</tr>
						<tr height="38" style="height:28.5pt">
							<td height="38" class="xl121" width="308" style="height:28.5pt;border-top:none;
				 border-left:none;width:231pt">有限空间作业、高空作业、临时用电作业、动火作业等高风险作业提前审批（安全作业票）。</td>
							<td class="xl73" width="225" style="border-top:none;border-left:none;width:169pt">《安全生产法》第四十条</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场、作业审批记录</td>
						</tr>
					</template>


					<!-- 可燃性粉尘 -->
					<template v-if="duststate">
						<tr height="19" style="height:14.25pt">
							<td rowspan="6" height="171" class="xl70" width="42" style="height:128.25pt;
				 border-top:none;width:32pt">1</td>
							<td colspan="3" rowspan="6" class="xl92" width="134" style="border-right:.5pt solid black;
				 border-bottom:.5pt solid black;width:101pt">可燃性粉尘</td>
							<td class="xl72" width="308" style="border-top:none;border-left:none;width:231pt">粉尘涉爆场所张贴醒目的风险告知卡和安全警示标识。
							</td>
							<td class="xl72" width="225" style="border-top:none;border-left:none;width:169pt">《粉尘防爆安全规程（GB
								15577-2018）4.7。</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场</td>
						</tr>
						<tr height="38" style="height:28.5pt">
							<td height="38" class="xl72" width="308" style="height:28.5pt;border-top:none;
				 border-left:none;width:231pt">粉尘涉爆场所使用防爆型电器设备，电气线路穿镀锌钢管防爆处理，接头处采用螺纹连接。</td>
							<td class="xl72" width="225" style="border-top:none;border-left:none;width:169pt">《爆炸危险环境电力装置设计规范（GB
								50058-2014）》5.2、5.4.3。</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场</td>
						</tr>
						<tr height="38" style="height:28.5pt">
							<td height="38" class="xl72" width="308" style="height:28.5pt;border-top:none;
				 border-left:none;width:231pt">中央除尘管道采用圆管，每隔6米设置一个清扫口，有防爆或泄爆装置。</td>
							<td rowspan="4" class="xl118" width="225" style="border-bottom:.5pt solid black;
				 border-top:none;width:169pt">《工贸行业重大生产安全事故隐患判定标准(2017版)》一、专项类重大事故隐患(一)存在粉尘爆炸危险的行业领域</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场、设计资料</td>
						</tr>
						<tr height="19" style="height:14.25pt">
							<td height="19" class="xl72" width="308" style="height:14.25pt;border-top:none;
				 border-left:none;width:231pt">砂光机等可能产生火花的设备必须安装火花探测及熄灭装置。</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场</td>
						</tr>
						<tr height="19" style="height:14.25pt">
							<td height="19" class="xl72" width="308" style="height:14.25pt;border-top:none;
				 border-left:none;width:231pt">干式除尘器应安装锁气卸灰装置。</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场</td>
						</tr>
						<tr height="38" style="height:28.5pt">
							<td height="38" class="xl72" width="308" style="height:28.5pt;border-top:none;
				 border-left:none;width:231pt">建立粉尘定期清扫制度，及时清理作业现场及公共区域粉尘，确保无明显积尘并做好记录。</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场、粉尘清扫记录</td>
						</tr>
					</template>

					<!-- 有限空间 -->
					<template v-if="spaceData.state">
						<tr height="38" style="height:28.5pt">
							<td rowspan="4" height="152" class="xl70" width="42" style="height:114.0pt;
				 border-top:none;width:32pt">2</td>
							<td colspan="3" rowspan="4" class="xl92" width="134" style="border-right:.5pt solid black;
				 border-bottom:.5pt solid black;width:101pt">有限空间<br>
								（自主作业）</td>
							<td class="xl72" width="308" style="border-top:none;border-left:none;width:231pt">
								充分辨识有限空间并建立台账，现场张贴醒目的风险告知卡和安全警示标识。</td>
							<td rowspan="4" class="xl72" width="225" style="border-top:none;width:169pt">
								《工贸企业有限空间作业安全管理与监督暂行规定》（国家安全监管总局令第80号修正）第六、八、九、二十五条；</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场、有限空间台账</td>
						</tr>
						<tr height="38" style="height:28.5pt">
							<td height="38" class="xl72" width="308" style="height:28.5pt;border-top:none;
				 border-left:none;width:231pt">作业前履行审批手续（安全作业票），配置作业必需的安全绳、气体检测仪、空气呼吸器等安保和应急装备。</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场装备、作业审批手续</td>
						</tr>
						<tr height="38" style="height:28.5pt">
							<td height="38" class="xl72" width="308" style="height:28.5pt;border-top:none;
				 border-left:none;width:231pt">作业过程严格按照先通风、再检测、后作业的安全操作流程作业，监护人员全程不得离开现场。</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场</td>
						</tr>
						<tr height="38" style="height:28.5pt">
							<td height="38" class="xl72" width="308" style="height:28.5pt;border-top:none;
				 border-left:none;width:231pt">制定有限空间作业事故现场应急处置方案，并每半年演练一次。</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">应急处置方案、演练记录</td>
						</tr>
					</template>


					<template v-if="furnaceState==1">
						<tr height="57" style="height:42.75pt">
							<td rowspan="5" height="266" class="xl70" width="42" style="height:199.5pt;
				 border-top:none;width:32pt">3</td>
							<td colspan="3" rowspan="5" class="xl92" width="134" style="border-right:.5pt solid black;
				 border-bottom:.5pt solid black;width:101pt">高温熔融</td>
							<td class="xl72" width="308" style="border-top:none;border-left:none;width:231pt">
								严禁使用国家明令禁止使用的熔炼设备；高温熔融金属罐、浇包、耳轴等应定期检查检验，有裂纹、缺损和严重腐蚀的应停止使用。</td>
							<td class="xl72" width="225" style="border-top:none;border-left:none;width:169pt">《安全生产法》第三十五条<br>
								《工贸行业重大生产安全事故隐患判定标准(2017版)》二、行业类重大事故隐患(一)冶金行业(四)机械行业</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场</td>
						</tr>
						<tr height="57" style="height:42.75pt">
							<td height="57" class="xl72" width="308" style="height:42.75pt;border-top:none;
				 border-left:none;width:231pt">存放、运输高温熔融金属和熔渣的场所应防雨防水，周边无积水沟坑，且远离液压站、电气间、电缆桥架等重要防火场所和设施。</td>
							<td class="xl72" width="225" style="border-top:none;border-left:none;width:169pt">
								《工贸行业重大生产安全事故隐患判定标准(2017版)》二、行业类重大事故隐患(一)冶金行业</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场</td>
						</tr>
						<tr height="57" style="height:42.75pt">
							<td height="57" class="xl72" width="308" style="height:42.75pt;border-top:none;
				 border-left:none;width:231pt">高温熔融吊运行走区域禁止设置人员集聚场所和放置可燃、易燃物品；吊运作业有专人指挥，确认吊运线路下方无人员和障碍物方可吊运。</td>
							<td class="xl72" width="225" style="border-top:none;border-left:none;width:169pt">《化学品生产单位吊装作业安全规范（AQ
								3021-2008）》</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场</td>
						</tr>
						<tr height="38" style="height:28.5pt">
							<td height="38" class="xl72" width="308" style="height:28.5pt;border-top:none;
				 border-left:none;width:231pt">作业人员穿戴符合要求的劳保装备，严禁穿化纤衣物、拖鞋和赤膊作业。</td>
							<td class="xl72" width="225" style="border-top:none;border-left:none;width:169pt">《个体防护装备选用规范（GBT
								11651-2008）》</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场</td>
						</tr>
						<tr height="57" style="height:42.75pt">
							<td height="57" class="xl72" width="308" style="height:42.75pt;border-top:none;
				 border-left:none;width:231pt">制定高温熔融事故现场应急处置方案，并每半年演练一次。</td>
							<td class="xl72" width="225" style="border-top:none;border-left:none;width:169pt">《生产安全事故应急预案管理办法》第三十三条</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">专项应急处置方案、演练记录</td>
						</tr>
					</template>


					<template v-if="chemistryState">
						<tr height="95" style="height:71.25pt">
							<td rowspan="10" height="608" class="xl70" width="42" style="height:456.0pt;
				 border-top:none;width:32pt">4</td>
							<td colspan="2" rowspan="10" class="xl92" width="90" style="border-right:.5pt solid black;
				 border-bottom:.5pt solid black;width:68pt">危险化学品</td>
							<td rowspan="3" class="xl70" width="44" style="border-top:none;width:33pt">气体类</td>
							<td class="xl72" width="308" style="border-top:none;border-left:none;width:231pt">
								1.从有危险化学品销售资质的单位购买工业气瓶，向供应商索取“一书一签”（危险化学品安全技术说明书及化学品安全标签）；进货时审查气瓶处于有效期内，安全附件齐全、规范；企业不得自行更改气瓶瓶体和标签，不得自行倒装、充装和处置瓶内气体。
							</td>
							<td class="xl72" width="225" style="border-top:none;border-left:none;width:169pt">
								《气瓶安全技术监察规程（TSGR0006-2014）》</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场、“一书一签”、供应单位资质信息</td>
						</tr>
						<tr height="57" style="height:42.75pt">
							<td height="57" class="xl72" width="308" style="height:42.75pt;border-top:none;
				 border-left:none;width:231pt">2.气瓶存放区域与有明火区域保持10米以上距离，分类存放并有防倾倒措施，氧气与可燃气体保持5米以上间距，空瓶、实瓶、不合格瓶应分开存放并有明显标志。</td>
							<td class="xl72" width="225" style="border-top:none;border-left:none;width:169pt">
								《气瓶安全技术监察规程（TSGR0006-2014）》</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场</td>
						</tr>
						<tr height="57" style="height:42.75pt">
							<td height="57" class="xl72" width="308" style="height:42.75pt;border-top:none;
				 border-left:none;width:231pt">3.可燃气体贮存场所电气设备应整体防爆，有导除人体静电装置，安装可燃气体泄漏检测报警装置并保持通风良好。</td>
							<td class="xl72" width="225" style="border-top:none;border-left:none;width:169pt">《爆炸危险环境电力装置设计规范（GB
								50058-2014）》5.2、5.4.3。<br>
								《工业企业设计卫生标准（GBZ1-2010）》6.1.5.2。</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场</td>
						</tr>
						<tr height="57" style="height:42.75pt">
							<td rowspan="7" height="399" class="xl70" width="44" style="height:299.25pt;
				 border-top:none;width:33pt">液体和固体类</td>
							<td class="xl72" width="308" style="border-top:none;border-left:none;width:231pt">
								1.从有危险化学品销售资质的单位购买危险化学品，向供应商索取危险化学品安全技术说明书及化学品安全标签。</td>
							<td class="xl72" width="225" style="border-top:none;border-left:none;width:169pt">《危险化学品安全管理条例》第十五条</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场、“一书一签”、供应单位资质信息</td>
						</tr>
						<tr height="57" style="height:42.75pt">
							<td height="57" class="xl72" width="308" style="height:42.75pt;border-top:none;
				 border-left:none;width:231pt">2.有专用的化学品贮存区域，不同化学品隔离贮存并有明显标识，化学性质相禁忌的化学品隔开（实体隔离）贮存。落实专人管理，有化学品出入库登记记录。贮存场所严禁烟火。</td>
							<td class="xl72" width="225" style="border-top:none;border-left:none;width:169pt">
								《常用化学危险品贮存通则（GB15603-1995）第6条、第8条</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场</td>
						</tr>
						<tr height="57" style="height:42.75pt">
							<td height="57" class="xl72" width="308" style="height:42.75pt;border-top:none;
				 border-left:none;width:231pt">3.易燃易爆危险化学品贮存场所的电气设备应整体防爆，有防静电、防雷措施。易燃易爆液体贮存场所安装可燃气体泄漏检测报警装置和排风装置，二者应联动。</td>
							<td class="xl72" width="225" style="border-top:none;border-left:none;width:169pt">《爆炸危险环境电力装置设计规范（GB
								50058-2014）》5.2、5.4.3。<br>
								《工业企业设计卫生标准（GBZ1-2010）》6.1.5.2。</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场</td>
						</tr>
						<tr height="38" style="height:28.5pt">
							<td height="38" class="xl72" width="308" style="height:28.5pt;border-top:none;
				 border-left:none;width:231pt">4.剧毒化学品有单独专用库房贮存，按照“五双”（双人收发、双人记账、双人双锁、双人运输、双人使用）管理。</td>
							<td class="xl72" width="225" style="border-top:none;border-left:none;width:169pt">《剧毒化学品、放射源存放场所治安防范要求（GA
								1002-2012）》</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场、库房管理记录</td>
						</tr>
						<tr height="38" style="height:28.5pt">
							<td height="38" class="xl72" width="308" style="height:28.5pt;border-top:none;
				 border-left:none;width:231pt">5.液氨储罐上方应设喷淋装置。</td>
							<td class="xl72" width="225" style="border-top:none;border-left:none;width:169pt">
								《国务院安委会关于深入开展涉氨制冷企业液氨使用专项治理的通知》工作重点第（三）项</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场</td>
						</tr>
						<tr height="57" style="height:42.75pt">
							<td height="57" class="xl72" width="308" style="height:42.75pt;border-top:none;
				 border-left:none;width:231pt">6.液氨制冷系统应设置监控报警系统、氨气浓度报警器、事故排风机连锁装置、紧急泄放装置等。</td>
							<td class="xl72" width="225" style="border-top:none;border-left:none;width:169pt">
								《国务院安委会关于深入开展涉氨制冷企业液氨使用专项治理的通知》工作重点第（二）项；<br>
								《工业企业设计卫生标准（GBZ1-2010）》6.1.5.2。</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场</td>
						</tr>
						<tr height="95" style="height:71.25pt">
							<td height="95" class="xl72" width="308" style="height:71.25pt;border-top:none;
				 border-left:none;width:231pt">7.作业场所存放量不大于当班最大使用量，易燃易爆化学品使用区域整体防爆并严禁明火。</td>
							<td class="xl72" width="225" style="border-top:none;border-left:none;width:169pt">《建筑设计防火规范（GB
								50016-2014）第3.3.6条；<br>
								《人员密集场所消防安全管理（GA 654-2006）》第8.8.2条；<br>
								《爆炸危险环境电力装置设计规范（GB 50058-2014）》5.2、5.4.3。</td>
							<td class="xl73" width="96" style="border-top:none;border-left:none;width:72pt">现场</td>
						</tr>
					</template>
				</tbody>
			</table>
		</scroll-view>
	</view> 
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		name: "CompanyRules",
		data() {
			return {
				drawerVisible: false,
				infoData: {
					energy: [],
					main_process: []
				},
				workData: {},
				dustData: {
					dustType: []
				},
				duststate: false,
				spaceData: {
					state: false
				},
				tszy: false,
				furnaceState: 2,
				chemistryState: false,
				work10max: false, //10以上作业人数
				work10min: false, //10以下作业人数
				work1: true, //个体
				isShowCut: false, //动火作业
				isShowUnique: false, //电工作业
				isShowSpecial: false, //特种设备
			}
		},
		computed: {
			...mapState(['userInfo']),
			//人员安全
			personDev() {
				// workData.state?2:3
				if (this.tszy) {
					return 2;
				} else {
					return 1;
				}
			},

			//设备安全
			devSec() {
				if (this.work1 && this.tszy) {
					return 1;
				} else if (this.work10min && !this.tszy) {
					return 3;
				} else if (this.work10min && this.tszy) {
					return 4;
				} else if (this.work10max && !this.tszy) {
					return 2;
				} else if (this.work10max && this.tszy) {
					return 3;
				}
			},
			rowspan4() {
				// var rp;
				//个体 
				var rp = 0;
				if (this.work1) {
					rp += 1;
					//有特殊作业
					if (this.tszy) {
						rp += 1
					}
				}

				//10以下
				if (!this.work1 && this.work10min) {
					rp = 0;
					rp += 9;
					//有特殊作业
					if (this.tszy) {
						rp += 3;

					}
					//喷漆、涂装作业
					if (this.infoData.main_process.indexOf('喷涂') !== -1) {
						rp += 3
					}

				}

				console.log("=======================ddddddddd===================", rp)
				//10以上
				if (!this.work1 && this.work10max) {
					rp = 0;
					console.log("10以上", rp)
					rp += 9;
					// 有特殊作业
					if (this.tszy) {


						rp += 3;
						console.log("rp====tszy", rp)
					}
					//喷漆、涂装作业
					if (this.infoData.main_process.indexOf('喷涂') !== -1) {
						rp += 3
						console.log("rp喷漆pt", rp)
					}

				}

				console.log(rp, "==end=")


				return rp;
			},
			engrp() {
				var w = this.workData;
				console.log("============computed=============", this.workData, "111111")
				var r = 3;
				return r;
			}
		},
		watch: {},
		onShow() {
			console.log("onShow() 执行？？？？？？？？？？？");
			this.infoData.energy = [];
			this.infoData.main_process = [];
			this.workData = [];
			this.dustData.dustType = [];
			this.isShowCut = false; //动火作业
			this.isShowUnique = false; //电工作业
			this.isShowSpecial = false; //特种设备
			this.duststate = false;
			this.spaceData.state = false
			this.tszy = false;
			this.furnaceState = 2;
			this.chemistryState = false;
			this.work10max = false; //10以上作业人数
			this.work10min = false; //10以下作业人数
			this.work1 = true; //个体
			this.getInfo()
			this.getIndustry()
		},
		created() {
			console.log("created() 执行？？？？？？？？？？？");
			this.infoData.energy = [];
			this.infoData.main_process = [];
			this.workData = [];
			this.dustData.dustType = [];
			this.isShowCut = false; //动火作业
			this.isShowUnique = false; //电工作业
			this.isShowSpecial = false; //特种设备
			this.duststate = false;
			this.spaceData.state = false
			this.tszy = false;
			this.furnaceState = 2;
			this.chemistryState = false;
			this.work10max = false; //10以上作业人数
			this.work10min = false; //10以下作业人数
			this.work1 = true; //个体
			this.getInfo()
			this.getIndustry()
		},
		methods: {
			onNavBarLeft() {
				this.drawerVisible = false;
			},
			// 企业、安全信息
			getInfo() {
				this.$http.post('info', {
					company_id: this.userInfo.company_id
				}).then(res => {
					if (res.code == 200) {
						var data = res.data;
						this.infoData = {
							...data,
							energy: data.energy ? data.energy.split(',')[0].split('-') : '',
							energy5: data.energy ? data.energy.split(',')[4] : 2,
							main_process: data.main_process ? data.main_process.split(',') : []
						}
						this.workNum()
					}
				})
			},
			// 风险信息
			getIndustry() {
				this.$http.post('riskInfo', {
					company_id: this.userInfo.company_id
				}).then(res => {
					if (res.code == 200) {
						var datas = res.data;
						for (let i = 0; i < datas.length; i++) {
							if (datas[i].type == 1) {
								console.log(datas[i].state, "==============831===========")
								if (datas[i].state == 1) {
									this.spaceData.state = true
									console.log(datas[i].state, this.spaceData.state, "===============834=============")
								}
							}
							if (datas[i].type == 2) {
								if (this.infoData.industry_category === '建材' || this.infoData.industry_category === '食品') {
									this.workData = JSON.parse(datas[i].content).workOne || {};
								} else {
									this.workData = JSON.parse(datas[i].content).workTwo || {};
								}
								console.log('ssssss ', this.workData)
								var w = this.workData;
								//动火作业
								if (this.workData.state == false) {
									this.tszy = true
								}
								if (w.cutCheck || w.dcCheck) {

									this.isShowCut = true;
									console.log("动火==================作业", w.cutCheck, w.dcCheck)
								}
								//电工作业
								if (w.uniqueState) {
									this.isShowUnique = true;

									console.log("电工作业", w.uniqueWorkNum)
								}
								//特种设备
								if (w.trainCheck || w.forkliftCheck || w.potCheck || w.stressCheck) {
									this.isShowSpecial = true;
									console.log("特种设备", w.trainCheck, w.forkliftCheck, w.potCheck, w.stressCheck)
								}

							}
							if (datas[i].type == 3) {
								if (this.infoData.industry_category === '食品') {
									this.dustData = JSON.parse(datas[i].content).dustTwo || {};
								} else {
									this.dustData = JSON.parse(datas[i].content).dustOne || {};
								}
								console.log(datas[i].state == 1, this.dustData.dustType.indexOf('无') == -1, "===========898===========")
								if (datas[i].state == 1 && this.dustData.dustType.indexOf('无') == -1) {
									this.duststate = true
								}
							}
							if (datas[i].type == 4) {
								let s = JSON.parse(datas[i].content),
									state = false;
								[...s.leftData, ...s.rightData].forEach((data) => {
									if (data.value) state = true
								})
								this.chemistryState = state
							}
							if (datas[i].type == 5) {
								// let s = JSON.parse(datas[i].content);
								this.furnaceState = datas[i].state
							}
						}
					}
				})
			},
			//判断企业规模
			workNum() {
				this.work1 = false
				this.work10max = false
				this.work10min = false
				if (this.infoData.scale == 3) {
					this.work1 = true
				} else if (this.infoData.number_of_employees >= 10) {
					this.work10max = true
				} else if (this.infoData.number_of_employees < 10) {
					if (this.infoData.number_of_employees == null) {
						this.work10max = true

					} else {
						this.work10min = true
					}

				} else {

					this.work10max = true
				}
				console.log('判断企业规模', this.work1, this.work10max, this.work10min)
			}

		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.c_r_wrap {
		table {
			border-collapse: collapse;
			border-spacing: 0px;
		}

		.c_r_table {
			border: 1px solid #00a0e9;
			text-align: left;
		}

		td {
			padding: 0;
		}

		.c_r_table td {
			border: 1px solid #00a0e9 !important;
			padding: 20upx;
			font-size: 32upx;
			white-space: pre-line;
		}

		.c_r_table table tr:first-child td {
			border-top: none;
		}

		.c_r_table table tr td:first-child {
			border-left: none;
		}

		.c_r_table>tbody tr:nth-child(odd) {
			background: #ffffff;
		}

		.c_r_table .title {
			font-weight: bold;
		}

		.table-title {
			color: #1f5ee9;
			font-size: 16px;
			font-weight: bold;
			text-align: left;
			width: 805px;
			border-left: 5px solid #1f5ee9;
			margin: 20px 0;
			padding-left: 10px;
			box-sizing: border-box;
		}

		td.ts_word_table table,
		td.ts_word_table {
			padding: 0 !important;
			margin: -1px !important;
			border: none !important;
		}

		table {
			word-wrap: break-word;
			word-break: break-all;
		}

		.notPd {
			padding: 0 !important;
			width: 43px !important;
			min-width: 30px !important;
		}

		.t_title {
			width: 43px;
			text-align: center;
			white-space: initial;
		}

		.t_center {
			width: 287px;
		}

		.t_footer {
			width: 75px;
		}

		.index_width {
			width: 40upx;
		}

		.com_td {
			border-right: .5pt solid black;
			border-left: none;
			width: 101pt
		}
	}
</style>
