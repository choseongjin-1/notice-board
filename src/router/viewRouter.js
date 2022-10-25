export default [
    {
        path: '/notice',
        name: 'noticeEmptyLayout',
        component: () => import('../components/layout/EmptyLayout.vue'),
        children: [
            { 
                path: '/noticeMain',
                name: 'noticeMain', 
                component: () => import('../view/NoticeMain.vue'),
            },
        ]
    },
]