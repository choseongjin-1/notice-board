export default [
    {
        path: '/main',
        name: 'main',
        component: () => import('../view/Main.vue'),
    },
    {
        path: '/view',
        name: 'viewEmptyLayout',
        component: () => import('../components/layout/EmptyLayout.vue'),
        children: [
            { 
                path: '/main',
                name: 'main', 
                component: () => import('../view/Main.vue'),
            },
        ]
    },
]