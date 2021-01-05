import { saveUserConfig } from '@/service/data/user';
import $cookie from 'js-cookie';

export default {
  /**
   * 设置客户端标识
   */
  setClientUA(state, data) {
    state.isMobile = data;
  },

  /**
   * 是否正在显示遮罩层
   */
  maskUpdate(state, data) {
    state.isMask = data;
  },

  /**
   * 初始化滚动条
   */
  initGeminiScrollbar(state, data) {
    state.body.GeminiScrollbar = data;
    console.log(data);
  },

  /**
   * 初始化用户数据
   */
  initUser(state, data) {
    state.user = data;
  },

  /**
   * 设定JWT
   */
  setJWT(state, data) {
    state.jwt = data;
  },

  /**
   * 设置站点配置
   */
  setWebSetting(state, data) {
    const { web, apiServer, git, router, user } = data;
    state.setting = {
      git,
      user,
      web,
      router,
      apiServer,
    };
  },

  /**
   * 设置站点参数
   */
  async setWebOptions(state, data) {
    state.setting = {
      web: Object.assign({}, state.setting.web, data),
    };
    $cookie.set('web', JSON.stringify(state.setting.web), { expires: 365 });
    await saveUserConfig(state.setting.web);
  },
}