export default [
    {
        path: '/notice',
        name: 'noticeEmptyLayout',
        component: () => import('../components/layout/EmptyLayout.vue'),
        children: [
            { 
                path: '/notice/noticeLogin',
                name: 'noticeLogin', 
                component: () => import('../view/NoticeLogin.vue'),
            },
            { 
                path: '/notice/noticeMain',
                name: 'noticeMain', 
                component: () => import('../view/NoticeMain.vue'),
            },
            { 
                path: '/notice/noticeModify',
                name: 'noticeModify', 
                component: () => import('../view/NoticeModify.vue'),
            },
            { 
                path: '/notice/noticeRegister',
                name: 'noticeRegister', 
                component: () => import('../view/NoticeRegister.vue'),
            },
            { 
                path: '/notice/noticeDetail',
                name: 'noticeDetail', 
                component: () => import('../view/NoticeDetail.vue'),
            },
        ]
    },
]