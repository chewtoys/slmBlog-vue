<template>
  <footer class="body-footer">
    <div class="copyright">
      <div class="copyright-register" v-html="copyright()"></div>
      <div class="copyright-navigation">
        <a class="navigation-li" >条款和免责</a>
        <a class="navigation-li" >关于本站</a>
      </div>
    </div>
    <div class="keep-on-record">
      <span class="nowrap">
        <img class="serve-record-icon" src="/tripartite/police_badge.png"/>
        <a target="_blank" href="//www.miitbeian.gov.cn" v-text="$config.icp"></a>
      </span>
      <a class="nowrap" target="_blank" :href="$config.keepOnRecordLink " v-text="`(${ $config.keepOnRecord })`"></a>
    </div>
  </footer>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class LayoutDefaultFooter extends Vue {
  /**
   * 生成版权
   */
  copyright() {
    const { $config } = this;
    return $config.copyRight?.replace('{{ domain }}', `<a href="${ $config.domain }">${ $config.domain?.replace('https://', '').toUpperCase() }</a>`);
  }
}
</script>

<style lang="scss" scoped>
// 底部样式
.body-footer {
  width: 100%;
  padding: 20px 10px;
  margin-top: 20px;
  font-size: .9rem;
  text-align: center;
  @include themify($themes) {
    color: themed('font-lv0-color');
    background-color: themed('bg-dp1-color');
  }
  box-sizing: border-box;
  .copyright {
    margin-bottom: 15px;

    .copyright-register {
      width: 100%;
      word-wrap: break-word;
    }

    .copyright-navigation {
      margin-top: 5px;

      .navigation-li:not(:last-child) {
        &::after {
          content: "|";
          margin: 0 7px;
        }
      }
    }
  }

  // 备案
  .serve-record-icon {
    height: 20px;
    vertical-align: middle;
  }

  .keep-on-record a {
    @include themify($themes) {
      color: themed('font-lv1-color');
    }
  }
}
</style>
