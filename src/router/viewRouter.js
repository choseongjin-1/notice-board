export default [
    {
        path: '/view',
        name: 'viewEmptyLayout',
        component: () => import('../components/layout/EmptyLayout.vue'),
        children: [
            { 
                path: '/main',
                name: 'main', 
                component: () => import('../view/NoticeMain.vue'),
            },
        ]
    },
]