var navData = [{
		text: '首页',
		href: '../index/index'
	},
	{
		text: '风险分析',
		href: '../tj/tj'
	},
	{
		text: '企业管理',
		href: '../businessManagement/businessManagement'
	},
	{
		text: '监管执法',
		href: '',
		children: [{
				text: '执法计划',
				href: '../law/lawPlan'
			},
			{
				text: '执法统计',
				href: '../law/lawCount'
			},
		]
	},
	{
		text: '系统管理',
		href: '',
		children: [{
				text: '账号设置',
				href: "../system/accountSettings"
			},
			{
				text: '资源共享',
				href: "../system/resourcePost"
			},
			{
				text: '消息通知',
				children: [{
						text: '企业反馈',
						href: "../system/companyFeedbackC"
					},
					{
						text: '发件箱',
						href: "../system/companyMsg"
					},
					{
						text: '收件箱',
						href: "../system/emailGet"
					}
				]
			}
		]
	}
];


// { 
//             name: '首页',
//             href: 'home',
//             icon:'iconhome-fill'
//           }, {
//             name: '企业信息',
//             href: 'companyTableHome',
//             icon:'iconorder-fill'

//           }
//           ,{
//             name: '安全技术要求',
//             href: 'companyRules',
//             icon:'iconbili'
//           }, {
//             name: '消息通知',
//             href: 'message',
//             icon:'iconemail-fill',
//             num:this.badgeNum
//           },
//           {
//             name: '账号设置',
//             href: 'settin',
//             icon:'iconset'
//           },
//           {
//             name: '问题反馈',
//             href: 'companyFeedback',
//             icon:'iconfankui'
//           },{
//             name: '资源下载',
//             href: 'resourceDown',
//             icon:'iconxiazai1'
//           },
	
var comNavData = [{
		text: '首页',
		href: '../home/home'
	},
	{
		text: '企业信息',
		href: '/pages/company/companyTable/companyTable'
	},
	{
		text: '安全技术要求',
		href: ''
	},
	{
		text: '消息通知',
		href: '', 
	},
	{
		text: '问题反馈',
		href: '', 
	},
	{
		text:'资源下载',
		herf: ''
	}
];

var lawData = [{
		"label": "经营主体合法",
		"disabled": false,
		"checked": false,
		"level": "1",
		"id":1,
	},
	{
		"label": "经营场所安全",
		"disabled": false,
		"checked": false,
		"level": "1",
		"id":2,
	},
	{
		"label": "能源使用安全",
		"disabled": false,
		"checked": false,
		"level": "1",
		"id":3,
		"isUnfold": false,
		"children": [{
				"label": "电",
				"level": "2",
				"disabled": false,
				"checked": false,
				"id":31
			},
			{
				"label": "天然气",
				"level": "2",
				"disabled": false,
				"checked": false,
				"id":32
			},
			{
				"label": "液化石油气",
				"level": "2",
				"disabled": false,
				"checked": false,
				"id":33
			},
			{
				"label": "醇基、生物油等液体燃料",
				"level": "2",
				"disabled": false,
				"checked": false,
				"id":34
			}
		]
	},
	{
		"label": "日常管理安全",
		"disabled": false,
		"checked": false,
		"level": "1",
		"id":4,
		"isUnfold": false,
		"children": [{
				"label": "管理安全",
				"level": "2",
				"disabled": false,
				"checked": false,
				"id":41
			},
			{
				"label": "设备安全",
				"level": "2",
				"disabled": false,
				"checked": false,
				"id":42
			},
			{
				"label": "人员安全",
				"level": "2",
				"disabled": false,
				"checked": false,
				"id":43
			},
			{
				"label": "特殊作业安全",
				"level": "2",
				"disabled": false,
				"checked": false,
				"isUnfold": false,
				"id":44,
				"children": [{
						"label": "动火作业",
						"level": "3",
						"disabled": false,
						"checked": false,
						"id":441,
					},
					{
						"label": "电工作业",
						"level": "3",
						"disabled": false,
						"checked": false,
						"id":442,
					},
					{
						"label": "吊装作业",
						"level": "3",
						"disabled": false,
						"checked": false,
						"id":443
					},
					{
						"label": "高空作业",
						"level": "3",
						"disabled": false,
						"checked": false,
						"id":444
					}, {
						"label": "喷漆、涂装作业",
						"level": "3",
						"disabled": false,
						"checked": false,
						"id":445
					}
				]
			},

			{
				"label": "外包作业安全",
				"level": "2",
				"disabled": false,
				"checked": false,
				"id":45
			}
		]
	},
	{
		"label": "风险信息",
		"disabled": false,
		"level": "1",
		"isUnfold": false,
		"checked": false,
		"id":5,
		"children": [{
				"label": "可燃性粉尘",
				"level": "2",
				"disabled": false,
				"checked": false,
				"id":51
			},
			{
				"label": "有限空间（自主作业）",
				"level": "2",
				"disabled": false,
				"checked": false,
				"id":52
			},
			{
				"label": "高温熔融",
				"level": "2",
				"disabled": false,
				"checked": false,
				"id":53
			},
			{
				"label": "危险化学品",
				"level": "2",
				"disabled": false,
				"checked": false,
				"isUnfold": false,
				"id":54,
				"children": [{
						"label": "气体类",
						"level": "3",
						"disabled": false,
						"checked": false,
						"id":541
					},
					{
						"label": "液体和固体类",
						"level": "3",
						"disabled": false,
						"checked": false,
						"id":542
					}
				]
			}
		]
	}
]

export {
	navData,
	lawData,
	comNavData
}
