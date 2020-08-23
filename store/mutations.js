export default {
	set_adminUserInfo(state, obj) {
		state.adminUserInfo = obj;
	},
	set_userInfo(state, obj) {
		state.userInfo = obj;
		state.isLogin = true;
	}, 
	set_table_data(state, arr) {
		state.table_data = arr;
	},
	set_admin_index_addrInfo(state, obj) {
		state.admin_index_addrInfo = obj;
	},
	set_admin_item_company_info(state, obj) {
		state.admin_item_company_info = obj;
	},
	set_admin_law_plan_info(state, val) {  
		state.admin_law_plan_info = val; 
	},
	set_admin_law_detail_info(state, obj) {
		state.admin_law_detail_info = obj;
	},
	set_admin_law_item_plan_info(state, obj) {
		state.admin_law_item_plan_info = obj;
	},
	set_admin_law_add_law_plan_arr(state, obj) { 
		if (obj.bool) { 
			state.admin_law_add_law_plan_arr.push(obj.label);
		}else { 
			state.admin_law_add_law_plan_arr = obj.label;
		}
	},
	set_admin_law_company_detail_info(state, obj) {
		state.admin_law_company_detail_info = obj;
	}, 
	set_admin_law_add_company(state, arr) {
		state.admin_law_add_company = arr;
	},
	set_admin_law_add_company_select_info(state, val) {
		if (val.state && val.state == 'set') {
			var key = val.key,
				value = val.val; 
			state.admin_law_add_company_select_info[key] = value;
		}else {
			state.admin_law_add_company_select_info = val;
		} 
	},
	
}