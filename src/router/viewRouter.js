export default [
    {
        path: '/empty',
        name: 'noticeEmptyLayout',
        component: () => import('../components/layout/EmptyLayout.vue'),
        children: [
            { 
                path: '/empty/noticeMain',
                name: 'noticeMain', 
                component: () => import('../view/NoticeMain.vue'),
            },
        ]
    },
]