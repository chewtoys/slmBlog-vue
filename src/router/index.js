import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['@com/Home'], resolve)
    },
    // 文章路由
    {
      path: '/article',
      component: resolve => require(['@pub/vue/parentRouter'], resolve),
      children: [
        {
          path: 'addArticle',
          name: 'addArticle',
          meta: {
            requireAuth: 'admin'
          },
          component: resolve => require(['@com/article/addArticle'], resolve)
        },
        {
          path: 'againEditor',
          name: 'againEditor',
          meta: {
            requireAuth: 'login'
          },
          component: resolve => require(['@com/article/addArticle'], resolve)
        },
        {
          path: ':id',
          name: 'article',
          component: resolve => require(['@com/article/index'], resolve)
        }
      ]
    },
    // 用户路由
    {
      path: '/user',
      name: 'user',
      component: resolve => require(['@pub/vue/parentRouter'], resolve),
      children: [
        {
          path: 'login',
          name: 'login',
          meta: {
            requireAuth: 'register'
          },
          component: resolve => require(['@com/user/login'], resolve)
        },
        {
          path: 'register',
          name: 'register',
          meta: {
            requireAuth: 'register'
          },
          component: resolve => require(['@com/user/login'], resolve)
        }
      ]
    },
    // 其他路由
    {
      path: '/other',
      component: resolve => require(['@pub/vue/parentRouter'], resolve),
      children: [
        {
          path: 'thisSite',
          name: 'thisSite',
          component: resolve => require(['@com/other/thisSite'], resolve)
        },
        {
          path: 'terms',
          name: 'terms',
          component: resolve => require(['@com/other/terms'], resolve)
        },
        {
          path: 'message',
          name: 'message',
          component: resolve => require(['@com/other/terms'], resolve)
        },
        {
          path: 'friendship',
          component: resolve => require(['@com/other/friendship'], resolve)
        }
      ]
    },
    {
      path: '*',
      name: 'error',
      component: resolve => require(['@pub/vue/error'], resolve)
    }
  ],
  permissions: function (to, cb) {
    let user = JSON.parse(localStorage.getItem('userInfo'))
    let name = false
    if (to === 'login' && !user) {
      // 未登录
      name = 'login'
    } else if (to === 'register' && user) {
      // 已登录
      name = 'home'
    } else if (to === 'admin' && (!user || user.groupid !== 9999)) {
      // 非管理
      name = 'home'
    }
    cb && cb(name, !name)
    return !name
  },
  menu: [
    {
      tag: '文章',
      sub: [
        ['首页', '/'],
        ['置顶', '#'],
        ['最新', '#'],
        ['最热', '#'],
        ['精品', '#'],
        ['讨论', '#']
      ]
    },
    {
      tag: '技术',
      sub: [
        ['JavaScript', '#'],
        ['PHP', '#'],
        ['CSS', '#'],
        ['HTML', '#']
      ]
    },
    {
      tag: '资源',
      sub: [
        ['Windows', '#'],
        ['Andorid', '#'],
        ['Web', '#'],
        ['other', '#']
      ]
    },
    {
      tag: '账号',
      sub: [
        ['登录', { name: 'login' }, 'register'],
        ['注册', { name: 'register' }, 'register'],
        ['发帖', { name: 'addArticle' }, 'admin'],
        ['管理账号', '#', 'login'],
        ['安全退出', 'outLogin', 'login']
      ]
    }
  ]
})
