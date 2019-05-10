import Vue from 'vue'
import NuxtLoading from './components/nuxt-loading.vue'

import '..\\static\\css\\icon.css'

import _42d6b8de from '..\\layouts\\components\\background.vue'
import _252fad7e from '..\\layouts\\components\\footer.vue'
import _2805da70 from '..\\layouts\\components\\header.vue'
import _943ab478 from '..\\layouts\\components\\Toast.vue'
import _6f6c098b from '..\\layouts\\default.vue'

const layouts = { "_components/background": _42d6b8de,"_components/footer": _252fad7e,"_components/header": _2805da70,"_components/Toast": _943ab478,"_default": _6f6c098b }

export default {
  head: {"title":"slmblog","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"},{"hid":"description","name":"description","itemprop":"description","content":"欢迎浏览史莱姆的博客٩( °༥° )و，让我们一起交流技术一起嗨皮分享！史莱姆的博客为个人站点，注重前端开发。"},{"name":"keywords","content":"史莱姆的博客,html5,css3,es6,微信小程序,网站开发,技术交流,源码分享,php,nodejs"},{"name":"referrer","content":"origin"},{"name":"renderer","content":"webkit"},{"http-equiv":"X-UA-Compatible","content":"IE=edge"},{"itemprop":"author","content":"史莱姆[qq: 478889187]"},{"itemprop":"image","hid":"qqlogo","content":"https:\u002F\u002Fimg.slmblog.com\u002FQQLOGO.jpg"},{"itemprop":"name","hid":"qqname","content":"史莱姆的博客"},{"name":"format-detection","content":"telephone=no"},{"name":"robots","content":"all"},{"name":"Copyright","content":"slmblog.com"},{"name":"theme-color","content":"#fff"},{"name":"baidu-site-verification","content":"y5VuyW34xO"},{"name":"google-site-verification","content":"LsmBI4ZEP2h0Ni17kTFRG7A_kKO7zONt51w_GYjM2Gs"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"https:\u002F\u002Fimg.slmblog.com\u002Ffavicon.ico"}],"style":[],"script":[]},

  render(h, props) {
    const loadingEl = h('NuxtLoading', { ref: 'loading' })
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      },
      on: {
        beforeEnter(el) {
          // Ensure to trigger scroll event after calling scrollBehavior
          window.$nuxt.$nextTick(() => {
            window.$nuxt.$emit('triggerScroll')
          })
        }
      }
    }, [ templateEl ])

    return h('div', {
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,
      transitionEl
    ])
  },
  data: () => ({
    isOnline: true,
    layout: null,
    layoutName: ''
  }),
  beforeCreate() {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created() {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (process.client) {
      window.$nuxt = this
      this.refreshOnlineStatus()
      // Setup the listeners
      window.addEventListener('online', this.refreshOnlineStatus)
      window.addEventListener('offline', this.refreshOnlineStatus)
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },

  mounted() {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },

  computed: {
    isOffline() {
      return !this.isOnline
    }
  },
  methods: {
    refreshOnlineStatus() {
      if (process.client) {
        if (typeof window.navigator.onLine === 'undefined') {
          // If the browser doesn't support connection status reports
          // assume that we are online because most apps' only react
          // when they now that the connection has been interrupted
          this.isOnline = true
        } else {
          this.isOnline = window.navigator.onLine
        }
      }
    },

    errorChanged() {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail()
        if (this.$loading.finish) this.$loading.finish()
      }
    },

    setLayout(layout) {
      if(layout && typeof layout !== 'string') throw new Error('[nuxt] Avoid using non-string value as layout property.')

      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      this.layoutName = layout
      this.layout = layouts['_' + layout]
      return this.layout
    },
    loadLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      return Promise.resolve(layouts['_' + layout])
    }
  },
  components: {
    NuxtLoading
  }
}
