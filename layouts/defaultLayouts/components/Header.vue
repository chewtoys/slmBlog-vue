<template>
  <header :class="['layout-header', $store.state.themes.mainBColor + '-80' ]">
    <div class="response-content max-content">
      <router-link  
        class="slm blog-logo"
        :to="{ name: 'index' }"
        @click.native="$observer.emit('popstate')"
      />
      <!-- 响应型导航栏 -->
      <nav class="layout-top-nav">
        <!-- 左侧 -->
        <ul class="header-navigation" ref="Navigation">
          <router-link
            class="navigation-item"
            tag="li"
            v-for="(item, index) in navigator"
            :to="item.to || $route.path"
            :key="index"
            @click.native="jumpNav(index)">
            <i :class="['slm', 'blog-' + item.icon]"></i>
            {{ item.name }}
            <i class="slm blog-zhankai" v-if="item.children && item.children.length"></i>
            <ul :class="['navigation-children', $store.state.themes.mainBColor + '-80']" v-if="item.children && item.children.length">
              <router-link
                tag="li"
                v-for="(childItem, childIndex) in item.children"
                :key="childIndex"
                :to="childItem.to"
                :class="[
                  'navigation-children-item',
                  {
                    'navigation-children-focus': index === $config.Navigation.config.focus && childIndex === $config.Navigation.config.focusChild,
                  }
                ]">
                  <i :class="['slm', 'blog-' + childItem.icon]"></i>
                  {{ childItem.name }}
                </router-link>
            </ul>
          </router-link>
          <FocusingDisplac v-if="!isMobile" ref="FocusingDisplac"/>                
        </ul>
        <!-- 右侧 -->
        <ul class="header-navigation-right">
          <HeaderSearch />
          <HeaderWebSetting @click.native.self="isMobile ? $emit('set-open-state', !mobileHeaderOpen) : null" />
          <HeaderThemes @click.native.self="isMobile ? $emit('set-open-state', !mobileHeaderOpen) : null" />
          <HeaderAccount @click.native.self="isMobile ? $emit('set-open-state', !mobileHeaderOpen) : null" />
        </ul>
      </nav>
      <!-- 移动端操作按钮 -->
      <i :class="[ 'slm', 'blog-menu', $store.state.themes.mainFColor ]" v-show="isMobile" @click="$emit('set-open-state', !mobileHeaderOpen)"></i>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { Navigator } from '../../../interface/router';
import { PageHeader } from 'ant-design-vue';
import navigator from '../../../config/navigation';
import FocusingDisplac from '@/components/FocusingDisplacs.vue';
import HeaderSearch from './Header/Search.vue';
import HeaderAccount from './Header/Account.vue';
import HeaderThemes from './Header/Themes.vue';
import HeaderWebSetting from './Header/WebSetting.vue';

@Component({
  components: {
    FocusingDisplac,
    HeaderSearch,
    HeaderAccount,
    HeaderThemes,
    HeaderWebSetting,
  },
  computed: {
    isMobile() {
      return this.$store.state.isMobile;
    }
  }
})
export default class LayoutDefaultHeader extends Vue {

  /**
   * 导航栏
   */
  navigator: Navigator.Config[] = [];

  /**
   * 导航聚焦的下标
   */
  navFocusIndex: number = 0;

  /**
   * 移动端Header展开状态 
   */
  @Prop(Boolean) mobileHeaderOpen;

  mounted() {
    const navConfig = this.$config.Navigation.config;
    this.navigator = navigator;
    this.$nextTick(() => {
      this.jumpNav(navConfig.focus, false);
    });
  }


  /**
   * 导航跳转事件
   * 处理底部聚焦组件移动
   * @method router-link
   * @param index     Navigation子元素下标
   * @param animation 是否展示动画
   */
  jumpNav(index: number, animation: boolean = true) {
    // const { config } = this.$config.Navigation.config;
    // if (!config[index].to) return false;
    if (this.$store.state.isMobile) return false;
    const { $refs } = this;
    const navigation = $refs.Navigation as Element;
    const focusingDisplac = $refs.FocusingDisplac as FocusingDisplac;
    
    focusingDisplac.focus(navigation.children[index], navigation, animation, { y: -15 });
  }
}
</script>

<style lang="scss" scoped>
$headerHeight: 60px;
// TODO: 加载时的logo状态
#__nuxt .nuxt-progress + #__layout .layout-header .blog-logo {
  animation: 2s logo-loading ease-in-out infinite;
}
@keyframes logo-loading {
  to {
    transform: rotate(360deg);
  }
}

// 公共
.layout-header {
  position: fixed;
  z-index: 30;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: $headerHeight;
  margin: auto;
  @include themify($themes) {
    color: themed('font-lv0-color');
    // background-color: themed('bg-dp1-color-f');
    background-color: rgba($color: themed('bg-dp1-color-f'), $alpha: .8);
  }
  // border-radius: 0 0 20px 20px;
  // transition: 1s;
  user-select: none;
  backdrop-filter: saturate(180%) blur(20px);
  align-items: center;

  &:hover {
    z-index: 99;
    top: 2px;
    height: $headerHeight - 2px;
    line-height: $headerHeight;
    transition: 0s;

    .navigation-item .slm {
      height: $headerHeight + 2;
    }

    .header-navigation-right {
      margin-top: -2px;
    }
  }
  
  .blog-logo {
    display: flex;
    float: right;
    margin: 0 20px 0 0;
    font-size: 50px;
    align-items: center;
    
    @include themify($themes) {
      color: themed('font-lv0-color');
    }
    cursor: pointer;
    text-decoration: none;
  }

  .response-content {
    display: flex;
    width: 100%;
    height: 100%;
    margin: auto;
  }

  .blog-menu {
    position: fixed;
    top: 0;
    left: 10px;
    // opacity: .4;
    // font-size: 27px;
    line-height: 50px;
    z-index: 9999;

    &:active {
      @include themify($themes) {
        color: themed('font-lv0-color-hover');
      }
    }
  }

  .layout-top-nav {
    display: inline-flex;
    width: 100%;
    height: 100%;
    margin: auto;
    padding-right: 20px;
    justify-content: space-between;
    align-items: center;

    .header-navigation {
      position: relative;
      display: flex;
      height: 100%;
      margin-bottom: 0;

      .navigation-item {
        position: relative;
        display: flex;
        align-items: center;
        width: 90px;
        padding: 0 10px;
        text-align: center;
        white-space: nowrap;
        cursor: pointer;

        &:hover {
          @include themify($themes) {
            color: themed('font-lv0-color-hover');
          }

          .navigation-children {
            position: absolute;
            display: block;
            top: 0;
            left: 0;
            text-align: left;
            line-height: $headerHeight / 1.5;
            white-space: nowrap;
            // padding: 0 10px;
            @include themify($themes) {
              // background-color: themed('bg-dp1-color-f');
              background-color: rgba($color: themed('bg-dp1-color-f'), $alpha: .8);
            }
            transform: translateY($headerHeight - 2);
            backdrop-filter: saturate(180%) blur(20px);
          }

          .blog-zhankai {
            transform: rotate(-180deg);
          }
        }

        .blog-zhankai {
          display: inline-block;
          margin-left: 5px;
          font-size: .7em;
          transition: .5s;
        }
      }

      .navigation-children {
        display: none;

        &:last-child {
          border-radius: 0 0 20px 20px;
        }

        .navigation-children-item {
          padding: 0 20px;

          &:hover,
          &.navigation-children-focus {
            @include themify($themes) {
              background-color: themed('bg-dp1-color-hover');
              // background-color: rgba($color: themed('bg-dp1-color-f'), $alpha: .9);
            }
            transition: .5s;
            transform: scale(1.1);
          }
        }
      }
    }

    .header-navigation-right {
      display: flex;
      margin-bottom: 0;

      li {
        width: 40px;
        text-align: center;
        line-height: 40px;
        margin: 0 10px;
        border-radius: 50%;
        @include themify($themes) {
          background-color: themed('bg-dp4-color');
        }
        cursor: pointer;

        &:hover {
          @include themify($themes) {
            background-color: themed('bg-dp4-color-hover');
          }
        }
      }
    }
  }
}

// 移动端
.layout-default-mobile .layout-header {
  $headerHeight: 50px;
  display: block;
  width: 100%;
  height: $headerHeight;
  margin: 0;
  border-radius: 0;
  
  .blog-logo {
    height: 80%;
    margin: -5px 50vw 0;
    font-size: $headerHeight - 10px;
    transform: translateX(-50%);
  }

  .layout-top-nav {
    position: absolute;
    display: block;
    top: 0;
    width: $mobileAsideWidth;
    height: 100vh;
    padding-top: $mobileAsideWidth / 2 + 50px;
    padding-right: 0;
    box-sizing: border-box;
    background-color: rgba(30, 32, 38, .8);
    transform: translateX(-100%);
    z-index: 2;
    // backdrop-filter: saturate(180%) blur(20px);

    &::before {
      position: absolute;
      opacity: 0;
      z-index: -1;
      top: 0;
      left: $mobileAsideWidth;
      content: '';
      width: calc(100vw - #{$mobileAsideWidth});
      height: 100vh;
      background-color: rgba($color: #000, $alpha: .5);
      transition: 0s;
      pointer-events: none;
    }

    .header-navigation {
      overflow-y: scroll;
      overflow-x: hidden;
      display: block;
      height: calc(100vh - 300px);

      .navigation-item {
        width: auto;
        margin: 0;
        padding: 0;
        // border-bottom: 1px solid rgba($color: #b6c3db, $alpha: .1);


        &:hover {
          
          .navigation-children {
            position: relative;
            background-color: rgba($color: #000, $alpha: .2);
            border-bottom: 1px rgba($color: #000, $alpha: .2) solid;
            border-radius: 0 0 10px 10px;
            transform: translateX(0);
          }
        }
      }

      .blog-zhankai {
        // position: absolute;
        // right: 0;
        display: none;
      }
    }

    .navigation-item  {
      width: 100%;
    }
  }
}
.layout-default-mobile.mobile-header-open  .layout-top-nav::before {
  opacity: 1;
  transition: .5s .8s;
  pointer-events: initial;
}
</style>
