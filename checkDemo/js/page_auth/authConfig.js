
/**
 * Created by Echo on 2015/12/2.
 */


var ADMIN_LIST = [
    {
        'value': 'gengxiuyu',
        'text': '耿秀玉',
        'selected': true
    },
    {
        'value': 'liushaohua',
        'text': '刘少华'
    },
    {
        'value': 'wuhaiping',
        'text': '吴海萍'
    },
    {
        'value': 'sungang01',
        'text': '孙刚'
    }
];


var PLAT_NAME = [
    {
        'value': "58",
        'text': "58"
    },
    {
        'value': "ganji",
        'text': "赶集"
    }
];
var PLAT_BIZ_NAMES = {

    '58': [
        {
            'value': "ershou",
            'text': '二手'
        },
        {
            'value': "ershouche",
            'text': '二手车'
        },
        {
            'value': 'fangchan',
            'text': '房产'

        },
        {
            'value': 'guojizhan',
            'text': '国际站'

        },
        {
            'value': 'huangye',
            'text': '黄页'

        },
        {
            'value': 'huangye-other',
            'text': '黄页-其他'

        },
        {
            'value': 'zhaopin',
            'text': '招聘'

        },
        {
            'value': '58-all',
            'text': '58-all'

        },
        {
            'value': 'sys_monitor',
            'text': '系统监控'

        }
    ],

    'ganji': [
        {
            'value': 'che',
            'text': '车辆买卖'

        },
        {
            'value': 'chongwu',
            'text': '宠物'

        },
        {
            'value': 'clife',
            'text': '创新生活'

        },
        {
            'value': 'duanzu',
            'text': '蚂蚁短租'

        },
        {
            'value': 'fang',
            'text': '房产'

        },
        {
            'value': 'huangye',
            'text': '生活服务'

        },
        {
            'value': 'huangye2',
            'text': '生活黄页'

        },
        {
            'value': 'huodong',
            'text': '同城活动'

        },
        {
            'value': 'im',
            'text': '即时通讯'

        },
        {
            'value': 'jianzhi',
            'text': '兼职招聘'

        },
        {
            'value': 'jiaoyou',
            'text': '同乡/技能交换'

        },
        {
            'value': 'jiaoyupeixun',
            'text': '教育培训'

        },
        {
            'value': 'piaowu',
            'text': '票务'

        },
        {
            'value': 'qiujianzhi',
            'text': '兼职求职简历'

        },
        {
            'value': 'qiuzhi',
            'text': '全职求职简历'

        },
        {
            'value': 'wu',
            'text': '二手物品'

        },
        {
            'value': 'yiliao',
            'text': '医疗'

        },
        {
            'value': 'zhaopin',
            'text': '全职招聘'

        }
    ]

};

var FIRST_SECOND_ORDERS_58 = {

    'normal': [
        {
            first_order: {
                'value': 'page_detail',
                'text': '页面详细分析'
            },
            second_order: [
                {
                    'value': 'pvuv',
                    'text': 'PVUV'
                },
                {
                    'value': 'clicks',
                    'text': '点击量点击率'
                },
                {
                    'value': 'jump',
                    'text': '跳出量跳出率'
                }
                ,
                {
                    'value': 'viewout',
                    'text': '退出量退出率'
                }
            ]
        },
        {
            first_order: {
                'value': 'user_structure',
                'text': '用户构成'
            },
            second_order: [
                {
                    'value': 'new_user',
                    'text': '新用户数'
                },
                {
                    'value': '2weeks_user',
                    'text': '2Weeks_User'
                },
                {
                    'value': '3week_user',
                    'text': '3week_user'
                },
                {
                    'value': 'faith_user',
                    'text': 'faith_user'
                }
            ]
        },
        {
            first_order: {
                'value': 'visitview',
                'text': '用户访问深度'
            },
            second_order: [
                {
                    'value': 'visit_count',
                    'text': '访问会话数'
                },
                {
                    'value': 'visit_time',
                    'text': '平均访问时长'
                },
                {
                    'value': 'visit_depth',
                    'text': '访问步长'
                }
            ]
        },
        {
            first_order: {
                'value': 'page_source',
                'text': '页面来源'
            },
            second_order: [
                {
                    'value': 'channel_source',
                    'text': '渠道来源'
                },
                {
                    'value': 'web_source',
                    'text': '页面转化分析'
                }
            ]
        },
        {
            first_order: {
                'value': 'conversion_analysis',
                'text': '转化分析'
            },
            second_order: [
                {
                    'value': 'list_details',
                    'text': '列表详情'
                }
            ]
        }
    ],

    '58-all': [
        {
            first_order: {
                'value': 'visitview',
                'text': '用户访问深度'
            },
            second_order: [
                {
                    'value': 'visit_count',
                    'text': '访问会话数'
                },
                {
                    'value': 'visit_time',
                    'text': '平均访问时长'
                },
                {
                    'value': 'visit_depth',
                    'text': '访问步长'
                }
            ]
        }
    ],

    'sys_monitor': [
        {
            first_order: {
                'value': 'sys_monitor',
                'text': '系统监控'
            },
            second_order: [
                {
                    'value': 'sys_fvp',
                    'text': 'FVP'
                },
                {
                    'value': 'sys_bigdata',
                    'text': '苍穹大数据平台'
                },
                {
                    'value': 'sys_crm',
                    'text': 'crm2.5'
                },
                {
                    'value': 'sys_crm3',
                    'text': 'crm3.0'
                },
                {
                    'value': 'sys_mis',
                    'text': '美事'
                },
                {
                    'value': 'sys_orders',
                    'text': '支付系统'
                },
                {
                    'value': 'sys_call',
                    'text': '呼叫中心'
                }
            ]
        }
    ]

};

var FIRST_SECOND_ORDERS_GANJI = {
    'normal': [
        {
            first_order: {
                'value': 'page_detail',
                'text': '页面详细分析'
            },
            second_order: [
                {
                    'value': 'pvuv',
                    'text': 'PVUV'
                }/*,
                {
                    'value': 'clicks',
                    'text': '点击量点击率'
                },
                {
                    'value': 'jump',
                    'text': '跳出量跳出率'
                }
                ,
                {
                    'value': 'viewout',
                    'text': '退出量退出率'
                }*/
            ]
        }
    ]
}