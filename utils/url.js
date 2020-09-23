var url={ 
  // host: 'http://api.cqgmaq.com/',//上传
  host: 'http://spmsapi.cqxddwl.com/',
  //管理员登录
  login : 'index/Login/login',
  //企业信息获取
  info : 'index/Company/info',
  //企业信息基本信息保存
  save : 'index/Company/save',
  //企业信息安全信息保存
  safeInfoSave : 'index/Company/safeInfoSave',
  //八大行业信息保存
  riskSave : 'index/Company/riskSave',
  //八大行业信息获取
  riskInfo : 'index/Company/riskInfo',
  //风险提交
  submitA : 'index/Company/submitA',
  //验证码获取
  sendRegisterSms : 'index/other/sendRegisterSms',
  //生产验证参数
  getPwd : 'index/other/getPwd',
  //首次修改密码
  firstEditPwd : 'index/account/firstEditPwd',
  //忘记密码
  forgetPwd : 'index/account/forgetPwd',
  //修改手机号
  editPhone : 'index/account/editPhone',
  //账号列表
  accountList : 'index/account/accountList',
  //修改密码
  editPwdP : 'index/account/editPwd',
  //通知未读数
  noticeC : 'index/Company/noticeC',
  //通知列表
  noticeList : 'index/Company/noticeList',
  //通知详情
  noticeInfo : 'index/Company/noticeInfo',
  //企业信息状态
  approvalStatus : 'index/Company/approvalStatus',
  //反馈记录列表
  myFeedbackList : 'index/Feedback/myFeedbackList',
  //反馈发送
  sendFeedback : 'index/Feedback/sendFeedback',
  //反馈详情
  feedbackInfo : 'index/Feedback/feedbackInfo',
  //反馈回复
  reply : 'index/Feedback/reply',
  //文件列表
  fileList : 'index/Netdisc/fileList',
  //未读通知
  noticeListWD : 'index/Company/noticeListWD',

  ///-----------后台
  loginAdmin : 'admin/Login/login',
  //管理员列表
  adminList : 'admin/admin/adminList',
  //新增管理员
  addAdmin : 'admin/admin/addAdmin',
  //编辑管理员
  editAdmin : 'admin/admin/editAdmin',
  //删除管理员
  editState : 'admin/admin/editState',
  //修改密码
  editPwd : 'admin/admin/editPwd',
  //审核企业列表
  companyList : 'admin/Review/companyList',
  //拒绝企业申请
  refuse : 'admin/Review/refuse',
  //同意企业申请
  agree : 'admin/Review/agree',
  //统计-首页
  index : 'admin/Statistics/index',
  //企业管理-地图列表
  companyListMap : 'admin/company/companyListMap',
  //企业管理-列表
  // qcompanyList : 'admin/company/companyList',
  qcompanyList : 'admin/company/companyListN',
  //企业管理-添加
  companyAdd : 'admin/company/companyAdd',
  //企业管理-修改
  companyEdit : 'admin/company/companyEdit',
  //企业管理-修改状态
  qeditState : 'admin/company/editState',
  //企业管理-地址列表
  produceAddressList : 'admin/other/produceAddressList',
  //企业管理-行业列表
  categoryList : 'admin/other/categoryList',
  //企业管理-详细信息
  companyDetails : 'admin/company/companyDetails',
  //统计-统计
  tinfo : 'admin/Statistics/info',
  //统计-风险
  risk : 'admin/Statistics/risk',
  //统计-区域
  area : 'admin/Statistics/area',
  //统计-可燃性粉尘
  krxfc : 'admin/Statistics/krxfc',
  //统计-有限空间
  yxkj : 'admin/Statistics/yxkj',
  //统计-高温熔融
  gwrr : 'admin/Statistics/gwrr',
  //统计-其他类
  orther : 'admin/Statistics/orther',
  //地址不一致企业列表
  companyListRe : 'admin/company/companyListRe',
  //地址不一致企业确认
  addressNSC : 'admin/company/addressNSC',
  //回收站列表
  companyListBin : 'admin/company/companyListBin',
  //反馈列表
  feedbackList : 'admin/Feedback/feedbackList',
  //反馈详情
  feedbackInfoC : 'admin/Feedback/feedbackInfo',
  //反馈回复
  replyC : 'admin/Feedback/reply',
  //反馈数量统计
  statistics : 'admin/Feedback/statistics',
  //反馈上报
  report : 'admin/Feedback/report',
  //公告列表
  announcementList : 'admin/Announcement/announcementList',
  //公告详情
  announcementInfo : 'admin/Announcement/announcementInfo',
  //公告发送
  sendAnnouncement : 'admin/Announcement/sendAnnouncement',
  //企业账号查询编辑时
  jydaccountGet : 'admin/company/jydaccountGet',
  //企业账号查询新增时
  jydaccount : 'admin/Company/jydaccount',
  //企业经营点新增
  companyAddOP : 'admin/company/companyAddOP',
  //邮件列表
  emailList : 'admin/Email/emailList',
  //收件人列表
  reList : 'admin/Email/reList',
  //上传文件
  uploadFile : 'index/Tool/uploadFile',
  //发送邮件
  send : 'admin/Email/send',
  //已发送邮件列表
  sendList : 'admin/Email/sendList',
  //已发送邮件列表详情
  sEmailInfo : 'admin/Email/sEmailInfo',
  //已发送邮件收件人列表
  reListS : 'admin/Email/reListS',
  //邮件详情
  emailInfo : 'admin/Email/emailInfo',
  //新增文件夹/上传文件
  upload : 'admin/Netdisc/upload',
  //编辑新增文件夹/上传文件
  editFile : 'admin/Netdisc/editFile',
  //删除新增文件夹/上传文件
  deleteFile : 'admin/Netdisc/deleteFile',
  //文件列表
  fileListC : 'admin/Netdisc/fileList',
  //删除/恢复反馈
  editStateFeedback : 'admin/Feedback/editState',
  //反馈回收站列表
  feedbackListDel : 'admin/Feedback/feedbackListDel',
  //收件箱状态改变
  editStateEmail : 'admin/Email/editState',
  //收件箱回收站
  emailListDel : 'admin/Email/emailListDel',
  //收件箱回复
  replyEmail : 'admin/Email/reply',
  //计划列表
  taskListC : 'admin/Task/taskListC',
  //计划新增
  makePlan : 'admin/Task/makePlan',
  //任务列表
  taskList : 'admin/Task/taskList',
  //任务详情
  taskInfo : 'admin/Task/taskInfo',
  //方案列表
  planListC : 'admin/Task/planListC',
  //方案新增
  addPlan : 'admin/Task/addPlan',
  //任务信息编辑
  infoEdit : 'admin/Task/infoEdit',
  //方案列表(已添加的)
  planList : 'admin/Task/planList',
  //检查内容获取
  contentList : 'admin/Task/contentList',
  //检查内容提交
  cSubmit : 'admin/Task/cSubmit',
  // 任务提交(完成检查)
  taskSubmit : 'admin/Task/taskSubmit',
  //复查提交
  zgSubmit : 'admin/Task/zgSubmit',
  //复查内容获取
  taskInfoZ : 'admin/Task/taskInfoZ',
  //执法统计
  statisticsZF : 'admin/Task/statistics',
  //检查内容编辑时需先清空
  clear : 'admin/Task/clear',
  // 统计的家次企业列表
  jcCompanyList : 'admin/Task/jcCompanyList',
  // 统计的隐患企业列表
  yhcCompanyList : 'admin/Task/yhcCompanyList',
  // 任务删除
  editStateLaw : 'admin/Task/editState',
  // 执法企业查询
  taskCC : 'admin/Task/taskCC',
  // 企业列表(街镇地址划分)
  companyListA : 'admin/company/companyListA',
  // 企业区域划分
  companyQH : 'admin/Company/companyQH',
  // 方案列表
  planListCS : 'admin/Task/planListCS',
  //获取下载文书地址
  getBookAddr:"index/Ws/printWS",
  //导出Excel
  'companyListNExcel':'admin/company/companyListNExcel',
  //新增 --- 地址不一致
  'companyAddOPS':'admin/company/companyAddOPS'  ,
  //标准化
  'standardization':'admin/Statistics/index2',
  //编辑执法文书
  "wsNumEdit":"admin/Task/wsNumEdit",
  //下级行政单位企业数量统计
  "companyCount":'admin/Statistics/index3',
  //执法预览
  'lawTaskBg':'admin/Task/Bg',
  //执法pdf
  'lawTaskBgPdfUrl':'admin/Task/Bgdc',
  //检查记录编辑
  'recordEdit':'admin/Task/recordEdit',
  //检查记录编辑(新版)
    'recordEditN':'admin/Task/recordEditN',
  "zgSubmit2":"admin/Task/zgSubmit2",
  "taskStop":"admin/Task/taskStop",
    // 新增执法计划(输入企业名称)
   'makePlanS':'admin/Task/makePlanS',
  //检查记录删除
  'recordDelete':'admin/Task/recordDelete',
  // 责令整改时间编辑
    "deadlineEdit":'admin/Task/deadlineEdit',
}

export default url;