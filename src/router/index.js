import { createRouter, createWebHistory } from 'vue-router'
import viewRouter from './viewRouter'

const routes = [
    ...viewRouter,
    { path: "/", redirect: "/notice/noticeMain" },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
  
router.onError((error) => {
    console.error('routerError', error);
    const targetPath = router.history.pending.fullPath

    if (error.name === 'ChunkLoadError') {
        window.location.href = targetPath || '/';
    }
});
export default router