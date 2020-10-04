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
}