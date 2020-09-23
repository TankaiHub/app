export default {
	
	isLogin:false,//登录
	adminUserInfo:{},//后台用户信息
	
	table_data:[],//表格信息
	admin_index_addrInfo:null, //首页地址信息
	admin_item_company_info:{},//企业管理 -- 编辑 -- 企业信息
	
	admin_law_plan_info:{},//执法计划 -- 检查
	admin_law_detail_info:{},//执法计划 -- 检查 -- 详情 -- 查看详情
	admin_law_item_plan_info:{},//执法计划 -- 检查 -- 详情 -- 查看详情 -- 开始检查 -- 方案内容 / 编辑 /  检查
	admin_law_company_detail_info:{},//page -- seeDetails 执法计划 -- 检查   企业信息
	admin_law_add_law_plan_arr:[],///执法计划 新增执法内容, 
	admin_law_add_company:[],///////执法计划 -- 添加企业
	admin_law_add_company_select_info:{},///////执法计划 -- 添加企业 -- select
	admin_law_edit_law_content:{},//执法计划 --编辑检查内容
	admin_feedbackDetail:{},//企业反馈--详情
	admin_email_send:{},//发送邮件
	
	///////////////////企业端////////////////////////
	userInfo:{},//用户信息 ,
	home_login_lock:true,//登陆判断是否有多个企业
	userHomeInfoData:{}, //登陆获取的数据
	
}