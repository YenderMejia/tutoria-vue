import { createRouter, createWebHistory } from 'vue-router';
import CreateUser from '../components/CreateUser.vue';
import UserDashboard from '../components/UserDashboard.vue';
import TeacherDashboard from '../components/TeacherDashboard.vue';
import UserLogin from '../components/UserLogin.vue';
import UserFeedback from '../components/UserFeedback.vue'; 
import UserHistorial from '../components/UserHistorial.vue'; 
import UserMessaging from '../components/UserMessaging.vue'; 

const routes = [
  {
    path: '/create-user',
    name: 'CreateUser',
    component: CreateUser
  },
  {
    path: '/dashboard',
    name: 'UserDashboard',
    component: UserDashboard
  },
  {
    path: '/teacher-dashboard',
    name: 'TeacherDashboard',
    component: TeacherDashboard
  },
  {
    path: '/login',
    name: 'UserLogin',
    component: UserLogin
  },
  {
    path: '/feedback',
    name: 'UserFeedback',
    component: UserFeedback
  },
  {
    path: '/historial',
    name: 'UserHistorial',
    component: UserHistorial
  },
  {
    path: '/messaging',
    name: 'UserMessaging',
    component: UserMessaging
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/login'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
