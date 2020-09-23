function produceTo(data, stopReason) {
	if (data == 1) {
		return '正常经营'
	} else if (data == 2) {
		if (stopReason == 1) {
			return '停产停业-正常放假'
		} else if (stopReason == 2) {
			return '停产停业-应急部门责令停产'
		} else if (stopReason == 3) {
			return '停产停业-其他部门责令停产'
		} else if (stopReason == 4) {
			return '停产停业-拟停产搬迁'
		} else {
			return '停产停业'
		}
	} else if (data == 3) {
		return '关闭(注销/搬迁)'
	}
};

//处理地址
function resolveAddress(str, list) {
	/**
	 * try...cache 太多 全部提取为局部变量 
	 * 例：重庆市沙坪坝区青木关镇新青路社区2222递四方速递
	 */
	var textArray = [];
	var numberArray = [];
	//重庆市沙坪坝区青木关镇新青路社区2222递四方速递
	var first_reg = /.+?(省|市|自治区|自治州|县|区)/g;;
	var first_str = first_reg.exec(str);
	var str_f_bd;
	var first_number;
	//沙坪坝区青木关镇新青路社区2222递四方速递
	var f_str;

	var second_reg;
	var second_str;
	var str_s_bd;
	var second_number;
	//青木关镇新青路社区2222递四方速递
	var s_str;


	var third_reg;
	var third_str;
	var t_str;
	var fourth_reg;
	//新青路社区2222递四方速递
	var fourth_str;

	var reg = /(三峡商圈)/g;
	var reg1 = /(西站)/g;
	var reg2 = /(民防办)/g;
	var str_t_bd;
	var str_fo_bd;
	var third_number;
	var fourth_number;
	//2222递四方速递
	var fo_str;
	var arr;


	try {
		str_f_bd = first_str[0];
		first_number = changeNumber(str_f_bd, list);
		f_str = str.replace(str_f_bd, "");
		// console.log("去掉 --- 省|市|自治区|自治州|县|区 =得到", f_str) 
		second_reg = /.+?(区|县)/g;
		second_str = second_reg.exec(f_str);
		str_s_bd = second_str[0];
		second_number = changeNumber(str_s_bd, list);
		s_str = f_str.replace(str_s_bd, "");
		// console.log("去掉 --- 区|县 =得到", s_str)



		try {
			third_reg = /.+?(街道|镇)/g;
			third_str = third_reg.exec(s_str);
			str_t_bd = third_str[0];
			third_number = changeNumber(str_t_bd, list);
			t_str = s_str.replace(str_t_bd, "");
			// console.log( "去掉 --- 街道|镇 =得到", t_str);

			fourth_reg = /.+?(社区|村)/g;
			fourth_str = fourth_reg.exec(t_str);
			str_fo_bd = fourth_str[0];
			fourth_number = changeNumber(str_fo_bd, list);
			fo_str = t_str.replace(str_fo_bd, "");
			// console.log( "去掉 ---  社区|村 =得到", fo_str);
		} catch (e) {
			try {
				arr = reg.exec(s_str);
				// console.log(arr, "1111");
				if (arr == null) {
					arr = reg1.exec(s_str);
					// console.log(arr, "2222");
					if (arr == null) {
						arr = reg2.exec(s_str);
						// console.log(arr, "33333333");
					}
				}
				str_t_bd = arr[0];
				str_fo_bd = arr[1];
				third_number = changeNumber(str_t_bd, list)
				fourth_number = changeNumber(str_fo_bd, list, true);
				fo_str = s_str.replace(str_fo_bd + str_t_bd, "");
				// console.log("去掉 --- 三峡商圈|西站|民防办 =得到", fo_str);
			} catch (e) {
				str_t_bd = "";
				str_fo_bd = '';
				third_number = ""
				fourth_number = "";
				fo_str = s_str;
			}
		}


	} catch (e) {
		fo_str = str;
	}
	// console.log( "最终得到：", str_t_bd, str_t_bd, third_number, fourth_number, fo_str)


	// console.log(fourth_number ,third_number, second_number, first_number,str_fo_bd)
	textArray = [str_f_bd, str_s_bd, str_t_bd, str_fo_bd];
	numberArray = [first_number, second_number, third_number, fourth_number];
	// console.log( "最终得到：", textArray, numberArray, fo_str)
	return {
		textArray,
		numberArray,
		detail: fo_str
	}


}
//获取地址number
function changeNumber(str, list, isCommon = false) {
	var number;
	list.forEach((item, index) => {

		if (item.address == str) {
			number = item.number;
		} else {
			item.option.forEach((ele, indx) => {
				if (ele.address == str) {
					number = ele.number;
				} else {
					ele.option.forEach((_center, _i) => {
						if (_center.address == str && !isCommon) {
							number = _center.number;
						} else {
							_center.option.forEach((_last) => {
								if (_last.address == str) {
									number = _last.number;
								}
							})
						}
					});
				}
			});
		}
	});
	return number;
}

function _changeUrl(name) {
	// var name = this.safetyData.industry_category_zfl;
	switch (name) {
		case '塑料':
			return './riskMainPage/plastic';
		case '纺织':
			return './riskMainPage/textile';
		case '食品':
			return './riskMainPage/food';
		case '建材':
			return './riskMainPage/buildingMaterials';
		case '纸制品':
			return './riskMainPage/paperProducts';
		case '商贸':
			return './riskMainPage/business';
		case '轻工':
			return './riskMainPage/industryFurniture'; //comm
		case '家具':
			return './riskMainPage/industryFurniture'; //comm
		case '机械':
			return './riskMainPage/machineryTobaccoMetallurgyAndColored'; //comm1
		case '烟草':
			return './riskMainPage/machineryTobaccoMetallurgyAndColored'; //comm1
		case '冶金':
			return './riskMainPage/machineryTobaccoMetallurgyAndColored'; //comm1
		case '有色':
			return './riskMainPage/machineryTobaccoMetallurgyAndColored'; //comm1
		default:
			return '';
	}
}

export {
	produceTo,
	resolveAddress,
	changeNumber,
	_changeUrl
}
