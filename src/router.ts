import * as VueRouter from 'vue-router';
import Changelog from './views/changelog/Changelog.vue';
import PullRequests from './views/pull-requests/PullRequests.vue';

const routes = [
  { path: '/', component: Changelog },
  { path: '/pull-requests', component: PullRequests },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

export default router;
