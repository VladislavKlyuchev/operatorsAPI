import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/routing/auth'
import { store } from '../../store'
import Dashboard from '@/routing/dashboard'
import packages from '@/routing/dashboard/packages'
import users from '@/routing/dashboard/users';
import newUsers from '@/routing/dashboard/users/new';
import editUser from '@/routing/dashboard/users/edit'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter(to, from, next) {
        store.state.auth ? next() : next('/auth')
      },
      children: [

        {
          path: 'packages',
          name: 'packages',
          component: packages
        },
       
        {
          path: 'users',
          component: users
        },
        {
          path: 'users/new',
          component: newUsers
        },
        {
          path: 'users/edit/:id',
          props: true,
          component: editUser
        },
        {
          path: '*',
          component: packages
        }
      ]
    },

  ]
})
