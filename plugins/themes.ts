const path = require('path');
const fs = require('fs');
const { generateTheme } = require('antd-theme-generator');

// 输出路径
const outputFilePath = path.join(__dirname, '../static/style/antd.less');
// const antdFnFilePath = path.join(__dirname, '../static/style/antd-fn.less');
const outMinFilePath = path.join(__dirname, '../static/style/antd-min.less');
// 导出类名

fs.writeFileSync(outputFilePath, antdConstants());

const options = {
  antDir: path.join(__dirname, '../node_modules/ant-design-vue'),
  stylesDir: path.join(__dirname, '../assets/less/styles'),
  // varFile: path.join(__dirname, '../assets/less/styles/variables.less'),
  // mainLessFile: path.join(__dirname, '../assets/less/styles/index.less'),
  themeVariables: [
    '@primary-color',
    '@secondary-color',
    '@text-color',
    '@text-color-secondary',
    '@heading-color',
    '@layout-body-background',
    '@btn-primary-bg',
    '@layout-header-background'
  ],
  indexFileName: 'index.html',
  outputFilePath,
}
generateTheme(options)
  .then(() => { 
    console.log('主题编译成功!');

    // 获取文件并压缩抽取处理
    let outFile = fs.readFileSync(outputFilePath).toString();
    // let antdFnFile = fs.readFileSync(antdFnFilePath).toString();
    
    // 压缩
    const excludeClass = [
      'steps', // 步骤条
      // 'menu',  // 菜单/导航
      'descriptions', // 描述列表
      'dropdown', // 下拉菜单
      'calendar', // 日历
      'fullcalendar', // 填充日历
      'cascader', // 级联
      'card', // 卡片
      'badge', // 徽章
      'comment', // 评论
    ]
    const excludeReg = new RegExp(`\\.(\\w)+(-(${ excludeClass.join('|') })-)(\\S|\\s)+`, 'g')
    // outFile = outFile
    //   .replace(excludeReg, '')
    //   .replace(/\n/g, '')
    // ;
    // outFile += antdFnFile;
    outFile = outFile.split(/\n/g).map(item => {
      return item
        .replace(excludeReg, '')
        .replace(/\s+/g, ' ')
        .replace(/\s(>|\+)\s/g, '$1')
        .replace(/(:|,|})\s/g, '$1')
        .replace(/\s({)/g, '$1')
      ;
    }).join(' ');

    outFile = outFile
      .replace('body{color:@text-color;background-color:#fff;}', '')
      .replace('  h1, h2, h3, h4, h5, h6{color:@heading-color;}', '')
    ;

    // 输出
    fs.writeFileSync(outMinFilePath, outFile);
  })
  .catch(error => {
    console.log('主题编译失败：', error);
  })
;



function antdConstants() { return `
@primary-color: @blue-6;
@text-color: fade(@black, 65%);
@text-color-secondary: fade(@black, 45%);
@heading-color: fade(#000, 85%);
@layout-body-background: #f0f2f5;
@btn-primary-bg: @primary-color;
@layout-header-background: #001529;
html {-webkit-tap-highlight-color: rgba(0, 0, 0, 0);}
body {color: @text-color;background-color: #fff;}
h1,
h2,
h3,
h4,
h5,
h6 {color: @heading-color;}
abbr[title],
abbr[data-original-title] {border-bottom: 0;}
a {color: @primary-color;background-color: transparent;}
a:hover {color: color(~\`colorPalette("@{primary-color}", 5)\`);}
a:active {color: color(~\`colorPalette("@{primary-color}", 7)\`);}
a[disabled] {color: rgba(0, 0, 0, 0.25);}
img {border-style: none;}
table {border-collapse: collapse;}
caption {color: @text-color-secondary;}
input,
button,
select,
optgroup,
textarea {color: inherit;}
button::-moz-focus-inner,
[type='button']::-moz-focus-inner,
[type='reset']::-moz-focus-inner,
[type='submit']::-moz-focus-inner {border-style: none;}
fieldset {border: 0;}
legend {color: inherit;}
mark {background-color: #feffe6;}
::selection {color: #fff;background: @primary-color;}
.anticon {color: inherit;}
html {--antd-wave-shadow-color: @primary-color;}
[ant-click-animating-without-extra-node='true']::after, .ant-click-animating-node {border-radius: inherit;box-shadow: 0 0 0 0 @primary-color;box-shadow: 0 0 0 0 var(--antd-wave-shadow-color);}
.ant-alert {color: @text-color;border-radius: 4px;}
.ant-alert-success {background-color: #f6ffed;border: 1px solid #b7eb8f;}
.ant-alert-success .ant-alert-icon {color: #52c41a;}
.ant-alert-info {background-color: #e6f7ff;border: 1px solid #91d5ff;}
.ant-alert-info .ant-alert-icon {color: #1890ff;}
.ant-alert-warning {background-color: #fffbe6;border: 1px solid #ffe58f;}
.ant-alert-warning .ant-alert-icon {color: #faad14;}
.ant-alert-error {background-color: #fff1f0;border: 1px solid #ffa39e;}
.ant-alert-error .ant-alert-icon {color: #f5222d;}
.ant-alert-close-icon {background-color: transparent;border: none;}
.ant-alert-close-icon .anticon-close {color: @text-color-secondary;}
.ant-alert-close-icon .anticon-close:hover {color: rgba(0, 0, 0, 0.75);}
.ant-alert-close-text {color: @text-color-secondary;}
.ant-alert-close-text:hover {color: rgba(0, 0, 0, 0.75);}
.ant-alert-with-description {color: @text-color;border-radius: 4px;}
.ant-alert-with-description .ant-alert-message {color: @heading-color;}
.ant-alert-message {color: @heading-color;}
.ant-alert-banner {border: 0;border-radius: 0;}
.ant-anchor {color: @text-color;}
.ant-anchor-wrapper {background-color: #fff;}
.ant-anchor-ink::before {background-color: #e8e8e8;}
.ant-anchor-ink-ball {background-color: #fff;border: 2px solid @primary-color;border-radius: 8px;}
.ant-anchor-link-title {color: @text-color;}
.ant-anchor-link-active > .ant-anchor-link-title {color: @primary-color;}
.ant-select-auto-complete {color: @text-color;}
.ant-select-auto-complete.ant-select .ant-select-selection {border: 0;box-shadow: none;}
.ant-select-auto-complete.ant-select .ant-input {background: transparent;border-width: 1px;}
.ant-select-auto-complete.ant-select .ant-input:focus, .ant-select-auto-complete.ant-select .ant-input:hover {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);border-right-width: 1px !important;}
.ant-select-auto-complete.ant-select .ant-input[disabled] {color: rgba(0, 0, 0, 0.25);background-color: #f5f5f5;background-color: transparent;}
.ant-select-auto-complete.ant-select .ant-input[disabled]:hover {border-color: #d9d9d9;border-right-width: 1px !important;}
.ant-avatar {color: @text-color;color: #fff;background: #ccc;border-radius: 50%;}
.ant-avatar-image {background: transparent;}
.ant-avatar-lg {border-radius: 50%;}
.ant-avatar-sm {border-radius: 50%;}
.ant-avatar-square {border-radius: 4px;}
.ant-back-top {color: @text-color;}
.ant-back-top-content {color: #fff;background-color: @text-color-secondary;border-radius: 20px;}
.ant-back-top-content:hover {background-color: @text-color;}
.ant-back-top-icon {
}
.ant-badge {color: @text-color;color: unset;}
.ant-badge-count {color: #fff;background: #f5222d;border-radius: 10px;box-shadow: 0 0 0 1px #fff;}
.ant-badge-count a, .ant-badge-count a:hover {color: #fff;}
.ant-badge-dot {background: #f5222d;border-radius: 100%;box-shadow: 0 0 0 1px #fff;}
.ant-badge-status-dot {border-radius: 50%;}
.ant-badge-status-success {background-color: #52c41a;}
.ant-badge-status-processing {background-color: #1890ff;}
.ant-badge-status-processing::after {border: 1px solid #1890ff;border-radius: 50%;}
.ant-badge-status-default {background-color: #d9d9d9;}
.ant-badge-status-error {background-color: #f5222d;}
.ant-badge-status-warning {background-color: #faad14;}
.ant-badge-status-pink {background: #eb2f96;}
.ant-badge-status-magenta {background: #eb2f96;}
.ant-badge-status-red {background: #f5222d;}
.ant-badge-status-volcano {background: #fa541c;}
.ant-badge-status-orange {background: #fa8c16;}
.ant-badge-status-yellow {background: #fadb14;}
.ant-badge-status-gold {background: #faad14;}
.ant-badge-status-cyan {background: #13c2c2;}
.ant-badge-status-lime {background: #a0d911;}
.ant-badge-status-green {background: #52c41a;}
.ant-badge-status-blue {background: #1890ff;}
.ant-badge-status-geekblue {background: #2f54eb;}
.ant-badge-status-purple {background: #722ed1;}
.ant-badge-status-text {color: @text-color;}
.ant-breadcrumb {color: @text-color;color: @text-color-secondary;}
.ant-breadcrumb a {color: @text-color-secondary;}
.ant-breadcrumb a:hover {color: color(~\`colorPalette("@{primary-color}", 5)\`);}
.ant-breadcrumb > span:last-child {color: @text-color;}
.ant-breadcrumb > span:last-child a {color: @text-color;}
.ant-breadcrumb-separator {color: @text-color-secondary;}
.ant-btn {background-image: none;border: 1px solid transparent;box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);border-radius: 4px;color: @text-color;background-color: #fff;border-color: #d9d9d9;}
.ant-btn:not([disabled]):active {box-shadow: none;}
.ant-btn-lg {border-radius: 4px;}
.ant-btn-sm {border-radius: 4px;}
.ant-btn > a:only-child {color: currentColor;}
.ant-btn > a:only-child::after {background: transparent;}
.ant-btn:hover, .ant-btn:focus {color: color(~\`colorPalette("@{btn-primary-bg}", 5)\`);background-color: #fff;border-color: color(~\`colorPalette("@{btn-primary-bg}", 5)\`);}
.ant-btn:hover > a:only-child, .ant-btn:focus > a:only-child {color: currentColor;}
.ant-btn:hover > a:only-child::after, .ant-btn:focus > a:only-child::after {background: transparent;}
.ant-btn:active, .ant-btn.active {color: color(~\`colorPalette("@{btn-primary-bg}", 7)\`);background-color: #fff;border-color: color(~\`colorPalette("@{btn-primary-bg}", 7)\`);}
.ant-btn:active > a:only-child, .ant-btn.active > a:only-child {color: currentColor;}
.ant-btn:active > a:only-child::after, .ant-btn.active > a:only-child::after {background: transparent;}
.ant-btn-disabled, .ant-btn.disabled, .ant-btn[disabled], .ant-btn-disabled:hover, .ant-btn.disabled:hover, .ant-btn[disabled]:hover, .ant-btn-disabled:focus, .ant-btn.disabled:focus, .ant-btn[disabled]:focus, .ant-btn-disabled:active, .ant-btn.disabled:active, .ant-btn[disabled]:active, .ant-btn-disabled.active, .ant-btn.disabled.active, .ant-btn[disabled].active {color: rgba(0, 0, 0, 0.25);background-color: #f5f5f5;border-color: #d9d9d9;box-shadow: none;}
.ant-btn-disabled > a:only-child, .ant-btn.disabled > a:only-child, .ant-btn[disabled] > a:only-child, .ant-btn-disabled:hover > a:only-child, .ant-btn.disabled:hover > a:only-child, .ant-btn[disabled]:hover > a:only-child, .ant-btn-disabled:focus > a:only-child, .ant-btn.disabled:focus > a:only-child, .ant-btn[disabled]:focus > a:only-child, .ant-btn-disabled:active > a:only-child, .ant-btn.disabled:active > a:only-child, .ant-btn[disabled]:active > a:only-child, .ant-btn-disabled.active > a:only-child, .ant-btn.disabled.active > a:only-child, .ant-btn[disabled].active > a:only-child {color: currentColor;}
.ant-btn-disabled > a:only-child::after, .ant-btn.disabled > a:only-child::after, .ant-btn[disabled] > a:only-child::after, .ant-btn-disabled:hover > a:only-child::after, .ant-btn.disabled:hover > a:only-child::after, .ant-btn[disabled]:hover > a:only-child::after, .ant-btn-disabled:focus > a:only-child::after, .ant-btn.disabled:focus > a:only-child::after, .ant-btn[disabled]:focus > a:only-child::after, .ant-btn-disabled:active > a:only-child::after, .ant-btn.disabled:active > a:only-child::after, .ant-btn[disabled]:active > a:only-child::after, .ant-btn-disabled.active > a:only-child::after, .ant-btn.disabled.active > a:only-child::after, .ant-btn[disabled].active > a:only-child::after {background: transparent;}
.ant-btn:hover, .ant-btn:focus, .ant-btn:active, .ant-btn.active {background: #fff;}
.ant-btn-primary {color: #fff;background-color: @btn-primary-bg;border-color: @btn-primary-bg;box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);}
.ant-btn-primary > a:only-child {color: currentColor;}
.ant-btn-primary > a:only-child::after {background: transparent;}
.ant-btn-primary:hover, .ant-btn-primary:focus {color: #fff;background-color: color(~\`colorPalette("@{btn-primary-bg}", 5)\`);border-color: color(~\`colorPalette("@{btn-primary-bg}", 5)\`);}
.ant-btn-primary:hover > a:only-child, .ant-btn-primary:focus > a:only-child {color: currentColor;}
.ant-btn-primary:hover > a:only-child::after, .ant-btn-primary:focus > a:only-child::after {background: transparent;}
.ant-btn-primary:active, .ant-btn-primary.active {color: #fff;background-color: color(~\`colorPalette("@{btn-primary-bg}", 7)\`);border-color: color(~\`colorPalette("@{btn-primary-bg}", 7)\`);}
.ant-btn-primary:active > a:only-child, .ant-btn-primary.active > a:only-child {color: currentColor;}
.ant-btn-primary:active > a:only-child::after, .ant-btn-primary.active > a:only-child::after {background: transparent;}
.ant-btn-primary-disabled, .ant-btn-primary.disabled, .ant-btn-primary[disabled], .ant-btn-primary-disabled:hover, .ant-btn-primary.disabled:hover, .ant-btn-primary[disabled]:hover, .ant-btn-primary-disabled:focus, .ant-btn-primary.disabled:focus, .ant-btn-primary[disabled]:focus, .ant-btn-primary-disabled:active, .ant-btn-primary.disabled:active, .ant-btn-primary[disabled]:active, .ant-btn-primary-disabled.active, .ant-btn-primary.disabled.active, .ant-btn-primary[disabled].active {color: rgba(0, 0, 0, 0.25);background-color: #f5f5f5;border-color: #d9d9d9;box-shadow: none;}
.ant-btn-primary-disabled > a:only-child, .ant-btn-primary.disabled > a:only-child, .ant-btn-primary[disabled] > a:only-child, .ant-btn-primary-disabled:hover > a:only-child, .ant-btn-primary.disabled:hover > a:only-child, .ant-btn-primary[disabled]:hover > a:only-child, .ant-btn-primary-disabled:focus > a:only-child, .ant-btn-primary.disabled:focus > a:only-child, .ant-btn-primary[disabled]:focus > a:only-child, .ant-btn-primary-disabled:active > a:only-child, .ant-btn-primary.disabled:active > a:only-child, .ant-btn-primary[disabled]:active > a:only-child, .ant-btn-primary-disabled.active > a:only-child, .ant-btn-primary.disabled.active > a:only-child, .ant-btn-primary[disabled].active > a:only-child {color: currentColor;}
.ant-btn-primary-disabled > a:only-child::after, .ant-btn-primary.disabled > a:only-child::after, .ant-btn-primary[disabled] > a:only-child::after, .ant-btn-primary-disabled:hover > a:only-child::after, .ant-btn-primary.disabled:hover > a:only-child::after, .ant-btn-primary[disabled]:hover > a:only-child::after, .ant-btn-primary-disabled:focus > a:only-child::after, .ant-btn-primary.disabled:focus > a:only-child::after, .ant-btn-primary[disabled]:focus > a:only-child::after, .ant-btn-primary-disabled:active > a:only-child::after, .ant-btn-primary.disabled:active > a:only-child::after, .ant-btn-primary[disabled]:active > a:only-child::after, .ant-btn-primary-disabled.active > a:only-child::after, .ant-btn-primary.disabled.active > a:only-child::after, .ant-btn-primary[disabled].active > a:only-child::after {background: transparent;}
.ant-btn-group .ant-btn-primary:not(:first-child):not(:last-child) {border-right-color: color(~\`colorPalette("@{primary-color}", 5)\`);border-left-color: color(~\`colorPalette("@{primary-color}", 5)\`);}
.ant-btn-group .ant-btn-primary:not(:first-child):not(:last-child):disabled {border-color: #d9d9d9;}
.ant-btn-group .ant-btn-primary:first-child:not(:last-child) {border-right-color: color(~\`colorPalette("@{primary-color}", 5)\`);}
.ant-btn-group .ant-btn-primary:first-child:not(:last-child)[disabled] {border-right-color: #d9d9d9;}
.ant-btn-group .ant-btn-primary:last-child:not(:first-child), .ant-btn-group .ant-btn-primary + .ant-btn-primary {border-left-color: color(~\`colorPalette("@{primary-color}", 5)\`);}
.ant-btn-group .ant-btn-primary:last-child:not(:first-child)[disabled], .ant-btn-group .ant-btn-primary + .ant-btn-primary[disabled] {border-left-color: #d9d9d9;}
.ant-btn-ghost {color: @text-color;background-color: transparent;border-color: #d9d9d9;}
.ant-btn-ghost > a:only-child {color: currentColor;}
.ant-btn-ghost > a:only-child::after {background: transparent;}
.ant-btn-ghost:hover, .ant-btn-ghost:focus {color: color(~\`colorPalette("@{btn-primary-bg}", 5)\`);background-color: transparent;border-color: color(~\`colorPalette("@{btn-primary-bg}", 5)\`);}
.ant-btn-ghost:hover > a:only-child, .ant-btn-ghost:focus > a:only-child {color: currentColor;}
.ant-btn-ghost:hover > a:only-child::after, .ant-btn-ghost:focus > a:only-child::after {background: transparent;}
.ant-btn-ghost:active, .ant-btn-ghost.active {color: color(~\`colorPalette("@{btn-primary-bg}", 7)\`);background-color: transparent;border-color: color(~\`colorPalette("@{btn-primary-bg}", 7)\`);}
.ant-btn-ghost:active > a:only-child, .ant-btn-ghost.active > a:only-child {color: currentColor;}
.ant-btn-ghost:active > a:only-child::after, .ant-btn-ghost.active > a:only-child::after {background: transparent;}
.ant-btn-ghost-disabled, .ant-btn-ghost.disabled, .ant-btn-ghost[disabled], .ant-btn-ghost-disabled:hover, .ant-btn-ghost.disabled:hover, .ant-btn-ghost[disabled]:hover, .ant-btn-ghost-disabled:focus, .ant-btn-ghost.disabled:focus, .ant-btn-ghost[disabled]:focus, .ant-btn-ghost-disabled:active, .ant-btn-ghost.disabled:active, .ant-btn-ghost[disabled]:active, .ant-btn-ghost-disabled.active, .ant-btn-ghost.disabled.active, .ant-btn-ghost[disabled].active {color: rgba(0, 0, 0, 0.25);background-color: #f5f5f5;border-color: #d9d9d9;box-shadow: none;}
.ant-btn-ghost-disabled > a:only-child, .ant-btn-ghost.disabled > a:only-child, .ant-btn-ghost[disabled] > a:only-child, .ant-btn-ghost-disabled:hover > a:only-child, .ant-btn-ghost.disabled:hover > a:only-child, .ant-btn-ghost[disabled]:hover > a:only-child, .ant-btn-ghost-disabled:focus > a:only-child, .ant-btn-ghost.disabled:focus > a:only-child, .ant-btn-ghost[disabled]:focus > a:only-child, .ant-btn-ghost-disabled:active > a:only-child, .ant-btn-ghost.disabled:active > a:only-child, .ant-btn-ghost[disabled]:active > a:only-child, .ant-btn-ghost-disabled.active > a:only-child, .ant-btn-ghost.disabled.active > a:only-child, .ant-btn-ghost[disabled].active > a:only-child {color: currentColor;}
.ant-btn-ghost-disabled > a:only-child::after, .ant-btn-ghost.disabled > a:only-child::after, .ant-btn-ghost[disabled] > a:only-child::after, .ant-btn-ghost-disabled:hover > a:only-child::after, .ant-btn-ghost.disabled:hover > a:only-child::after, .ant-btn-ghost[disabled]:hover > a:only-child::after, .ant-btn-ghost-disabled:focus > a:only-child::after, .ant-btn-ghost.disabled:focus > a:only-child::after, .ant-btn-ghost[disabled]:focus > a:only-child::after, .ant-btn-ghost-disabled:active > a:only-child::after, .ant-btn-ghost.disabled:active > a:only-child::after, .ant-btn-ghost[disabled]:active > a:only-child::after, .ant-btn-ghost-disabled.active > a:only-child::after, .ant-btn-ghost.disabled.active > a:only-child::after, .ant-btn-ghost[disabled].active > a:only-child::after {background: transparent;}
.ant-btn-dashed {color: @text-color;background-color: #fff;border-color: #d9d9d9;border-style: dashed;}
.ant-btn-dashed > a:only-child {color: currentColor;}
.ant-btn-dashed > a:only-child::after {background: transparent;}
.ant-btn-dashed:hover, .ant-btn-dashed:focus {color: color(~\`colorPalette("@{btn-primary-bg}", 5)\`);background-color: #fff;border-color: color(~\`colorPalette("@{btn-primary-bg}", 5)\`);}
.ant-btn-dashed:hover > a:only-child, .ant-btn-dashed:focus > a:only-child {color: currentColor;}
.ant-btn-dashed:hover > a:only-child::after, .ant-btn-dashed:focus > a:only-child::after {background: transparent;}
.ant-btn-dashed:active, .ant-btn-dashed.active {color: color(~\`colorPalette("@{btn-primary-bg}", 7)\`);background-color: #fff;border-color: color(~\`colorPalette("@{btn-primary-bg}", 7)\`);}
.ant-btn-dashed:active > a:only-child, .ant-btn-dashed.active > a:only-child {color: currentColor;}
.ant-btn-dashed:active > a:only-child::after, .ant-btn-dashed.active > a:only-child::after {background: transparent;}
.ant-btn-dashed-disabled, .ant-btn-dashed.disabled, .ant-btn-dashed[disabled], .ant-btn-dashed-disabled:hover, .ant-btn-dashed.disabled:hover, .ant-btn-dashed[disabled]:hover, .ant-btn-dashed-disabled:focus, .ant-btn-dashed.disabled:focus, .ant-btn-dashed[disabled]:focus, .ant-btn-dashed-disabled:active, .ant-btn-dashed.disabled:active, .ant-btn-dashed[disabled]:active, .ant-btn-dashed-disabled.active, .ant-btn-dashed.disabled.active, .ant-btn-dashed[disabled].active {color: rgba(0, 0, 0, 0.25);background-color: #f5f5f5;border-color: #d9d9d9;box-shadow: none;}
.ant-btn-dashed-disabled > a:only-child, .ant-btn-dashed.disabled > a:only-child, .ant-btn-dashed[disabled] > a:only-child, .ant-btn-dashed-disabled:hover > a:only-child, .ant-btn-dashed.disabled:hover > a:only-child, .ant-btn-dashed[disabled]:hover > a:only-child, .ant-btn-dashed-disabled:focus > a:only-child, .ant-btn-dashed.disabled:focus > a:only-child, .ant-btn-dashed[disabled]:focus > a:only-child, .ant-btn-dashed-disabled:active > a:only-child, .ant-btn-dashed.disabled:active > a:only-child, .ant-btn-dashed[disabled]:active > a:only-child, .ant-btn-dashed-disabled.active > a:only-child, .ant-btn-dashed.disabled.active > a:only-child, .ant-btn-dashed[disabled].active > a:only-child {color: currentColor;}
.ant-btn-dashed-disabled > a:only-child::after, .ant-btn-dashed.disabled > a:only-child::after, .ant-btn-dashed[disabled] > a:only-child::after, .ant-btn-dashed-disabled:hover > a:only-child::after, .ant-btn-dashed.disabled:hover > a:only-child::after, .ant-btn-dashed[disabled]:hover > a:only-child::after, .ant-btn-dashed-disabled:focus > a:only-child::after, .ant-btn-dashed.disabled:focus > a:only-child::after, .ant-btn-dashed[disabled]:focus > a:only-child::after, .ant-btn-dashed-disabled:active > a:only-child::after, .ant-btn-dashed.disabled:active > a:only-child::after, .ant-btn-dashed[disabled]:active > a:only-child::after, .ant-btn-dashed-disabled.active > a:only-child::after, .ant-btn-dashed.disabled.active > a:only-child::after, .ant-btn-dashed[disabled].active > a:only-child::after {background: transparent;}
.ant-btn-danger {color: #fff;background-color: #ff4d4f;border-color: #ff4d4f;box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);}
.ant-btn-danger > a:only-child {color: currentColor;}
.ant-btn-danger > a:only-child::after {background: transparent;}
.ant-btn-danger:hover, .ant-btn-danger:focus {color: #fff;background-color: #ff7875;border-color: #ff7875;}
.ant-btn-danger:hover > a:only-child, .ant-btn-danger:focus > a:only-child {color: currentColor;}
.ant-btn-danger:hover > a:only-child::after, .ant-btn-danger:focus > a:only-child::after {background: transparent;}
.ant-btn-danger:active, .ant-btn-danger.active {color: #fff;background-color: #d9363e;border-color: #d9363e;}
.ant-btn-danger:active > a:only-child, .ant-btn-danger.active > a:only-child {color: currentColor;}
.ant-btn-danger:active > a:only-child::after, .ant-btn-danger.active > a:only-child::after {background: transparent;}
.ant-btn-danger-disabled, .ant-btn-danger.disabled, .ant-btn-danger[disabled], .ant-btn-danger-disabled:hover, .ant-btn-danger.disabled:hover, .ant-btn-danger[disabled]:hover, .ant-btn-danger-disabled:focus, .ant-btn-danger.disabled:focus, .ant-btn-danger[disabled]:focus, .ant-btn-danger-disabled:active, .ant-btn-danger.disabled:active, .ant-btn-danger[disabled]:active, .ant-btn-danger-disabled.active, .ant-btn-danger.disabled.active, .ant-btn-danger[disabled].active {color: rgba(0, 0, 0, 0.25);background-color: #f5f5f5;border-color: #d9d9d9;box-shadow: none;}
.ant-btn-danger-disabled > a:only-child, .ant-btn-danger.disabled > a:only-child, .ant-btn-danger[disabled] > a:only-child, .ant-btn-danger-disabled:hover > a:only-child, .ant-btn-danger.disabled:hover > a:only-child, .ant-btn-danger[disabled]:hover > a:only-child, .ant-btn-danger-disabled:focus > a:only-child, .ant-btn-danger.disabled:focus > a:only-child, .ant-btn-danger[disabled]:focus > a:only-child, .ant-btn-danger-disabled:active > a:only-child, .ant-btn-danger.disabled:active > a:only-child, .ant-btn-danger[disabled]:active > a:only-child, .ant-btn-danger-disabled.active > a:only-child, .ant-btn-danger.disabled.active > a:only-child, .ant-btn-danger[disabled].active > a:only-child {color: currentColor;}
.ant-btn-danger-disabled > a:only-child::after, .ant-btn-danger.disabled > a:only-child::after, .ant-btn-danger[disabled] > a:only-child::after, .ant-btn-danger-disabled:hover > a:only-child::after, .ant-btn-danger.disabled:hover > a:only-child::after, .ant-btn-danger[disabled]:hover > a:only-child::after, .ant-btn-danger-disabled:focus > a:only-child::after, .ant-btn-danger.disabled:focus > a:only-child::after, .ant-btn-danger[disabled]:focus > a:only-child::after, .ant-btn-danger-disabled:active > a:only-child::after, .ant-btn-danger.disabled:active > a:only-child::after, .ant-btn-danger[disabled]:active > a:only-child::after, .ant-btn-danger-disabled.active > a:only-child::after, .ant-btn-danger.disabled.active > a:only-child::after, .ant-btn-danger[disabled].active > a:only-child::after {background: transparent;}
.ant-btn-link {color: @primary-color;background-color: transparent;border-color: transparent;box-shadow: none;}
.ant-btn-link > a:only-child {color: currentColor;}
.ant-btn-link > a:only-child::after {background: transparent;}
.ant-btn-link:hover, .ant-btn-link:focus {color: color(~\`colorPalette("@{btn-primary-bg}", 5)\`);background-color: transparent;border-color: color(~\`colorPalette("@{btn-primary-bg}", 5)\`);}
.ant-btn-link:hover > a:only-child, .ant-btn-link:focus > a:only-child {color: currentColor;}
.ant-btn-link:hover > a:only-child::after, .ant-btn-link:focus > a:only-child::after {background: transparent;}
.ant-btn-link:active, .ant-btn-link.active {color: color(~\`colorPalette("@{btn-primary-bg}", 7)\`);background-color: transparent;border-color: color(~\`colorPalette("@{btn-primary-bg}", 7)\`);}
.ant-btn-link:active > a:only-child, .ant-btn-link.active > a:only-child {color: currentColor;}
.ant-btn-link:active > a:only-child::after, .ant-btn-link.active > a:only-child::after {background: transparent;}
.ant-btn-link-disabled, .ant-btn-link.disabled, .ant-btn-link[disabled], .ant-btn-link-disabled:hover, .ant-btn-link.disabled:hover, .ant-btn-link[disabled]:hover, .ant-btn-link-disabled:focus, .ant-btn-link.disabled:focus, .ant-btn-link[disabled]:focus, .ant-btn-link-disabled:active, .ant-btn-link.disabled:active, .ant-btn-link[disabled]:active, .ant-btn-link-disabled.active, .ant-btn-link.disabled.active, .ant-btn-link[disabled].active {color: rgba(0, 0, 0, 0.25);background-color: #f5f5f5;border-color: #d9d9d9;box-shadow: none;}
.ant-btn-link-disabled > a:only-child, .ant-btn-link.disabled > a:only-child, .ant-btn-link[disabled] > a:only-child, .ant-btn-link-disabled:hover > a:only-child, .ant-btn-link.disabled:hover > a:only-child, .ant-btn-link[disabled]:hover > a:only-child, .ant-btn-link-disabled:focus > a:only-child, .ant-btn-link.disabled:focus > a:only-child, .ant-btn-link[disabled]:focus > a:only-child, .ant-btn-link-disabled:active > a:only-child, .ant-btn-link.disabled:active > a:only-child, .ant-btn-link[disabled]:active > a:only-child, .ant-btn-link-disabled.active > a:only-child, .ant-btn-link.disabled.active > a:only-child, .ant-btn-link[disabled].active > a:only-child {color: currentColor;}
.ant-btn-link-disabled > a:only-child::after, .ant-btn-link.disabled > a:only-child::after, .ant-btn-link[disabled] > a:only-child::after, .ant-btn-link-disabled:hover > a:only-child::after, .ant-btn-link.disabled:hover > a:only-child::after, .ant-btn-link[disabled]:hover > a:only-child::after, .ant-btn-link-disabled:focus > a:only-child::after, .ant-btn-link.disabled:focus > a:only-child::after, .ant-btn-link[disabled]:focus > a:only-child::after, .ant-btn-link-disabled:active > a:only-child::after, .ant-btn-link.disabled:active > a:only-child::after, .ant-btn-link[disabled]:active > a:only-child::after, .ant-btn-link-disabled.active > a:only-child::after, .ant-btn-link.disabled.active > a:only-child::after, .ant-btn-link[disabled].active > a:only-child::after {background: transparent;}
.ant-btn-link:hover, .ant-btn-link:focus, .ant-btn-link:active {border-color: transparent;}
.ant-btn-link-disabled, .ant-btn-link.disabled, .ant-btn-link[disabled], .ant-btn-link-disabled:hover, .ant-btn-link.disabled:hover, .ant-btn-link[disabled]:hover, .ant-btn-link-disabled:focus, .ant-btn-link.disabled:focus, .ant-btn-link[disabled]:focus, .ant-btn-link-disabled:active, .ant-btn-link.disabled:active, .ant-btn-link[disabled]:active, .ant-btn-link-disabled.active, .ant-btn-link.disabled.active, .ant-btn-link[disabled].active {color: rgba(0, 0, 0, 0.25);background-color: transparent;border-color: transparent;box-shadow: none;}
.ant-btn-link-disabled > a:only-child, .ant-btn-link.disabled > a:only-child, .ant-btn-link[disabled] > a:only-child, .ant-btn-link-disabled:hover > a:only-child, .ant-btn-link.disabled:hover > a:only-child, .ant-btn-link[disabled]:hover > a:only-child, .ant-btn-link-disabled:focus > a:only-child, .ant-btn-link.disabled:focus > a:only-child, .ant-btn-link[disabled]:focus > a:only-child, .ant-btn-link-disabled:active > a:only-child, .ant-btn-link.disabled:active > a:only-child, .ant-btn-link[disabled]:active > a:only-child, .ant-btn-link-disabled.active > a:only-child, .ant-btn-link.disabled.active > a:only-child, .ant-btn-link[disabled].active > a:only-child {color: currentColor;}
.ant-btn-link-disabled > a:only-child::after, .ant-btn-link.disabled > a:only-child::after, .ant-btn-link[disabled] > a:only-child::after, .ant-btn-link-disabled:hover > a:only-child::after, .ant-btn-link.disabled:hover > a:only-child::after, .ant-btn-link[disabled]:hover > a:only-child::after, .ant-btn-link-disabled:focus > a:only-child::after, .ant-btn-link.disabled:focus > a:only-child::after, .ant-btn-link[disabled]:focus > a:only-child::after, .ant-btn-link-disabled:active > a:only-child::after, .ant-btn-link.disabled:active > a:only-child::after, .ant-btn-link[disabled]:active > a:only-child::after, .ant-btn-link-disabled.active > a:only-child::after, .ant-btn-link.disabled.active > a:only-child::after, .ant-btn-link[disabled].active > a:only-child::after {background: transparent;}
.ant-btn-icon-only {border-radius: 4px;}
.ant-btn-icon-only.ant-btn-lg {border-radius: 4px;}
.ant-btn-icon-only.ant-btn-sm {border-radius: 4px;}
.ant-btn-round {border-radius: 32px;}
.ant-btn-round.ant-btn-lg {border-radius: 40px;}
.ant-btn-round.ant-btn-sm {border-radius: 24px;}
.ant-btn-circle, .ant-btn-circle-outline {border-radius: 50%;}
.ant-btn-circle.ant-btn-lg, .ant-btn-circle-outline.ant-btn-lg {border-radius: 50%;}
.ant-btn-circle.ant-btn-sm, .ant-btn-circle-outline.ant-btn-sm {border-radius: 50%;}
.ant-btn::before {background: #fff;border-radius: inherit;}
.ant-btn-group-lg > .ant-btn, .ant-btn-group-lg > span > .ant-btn {border-radius: 0;}
.ant-btn-group-sm > .ant-btn, .ant-btn-group-sm > span > .ant-btn {border-radius: 0;}
.ant-btn-group .ant-btn-primary + .ant-btn:not(.ant-btn-primary):not([disabled]) {border-left-color: transparent;}
.ant-btn-group .ant-btn {border-radius: 0;}
.ant-btn-group > .ant-btn:only-child {border-radius: 4px;}
.ant-btn-group > span:only-child > .ant-btn {border-radius: 4px;}
.ant-btn-group > .ant-btn:first-child:not(:last-child), .ant-btn-group > span:first-child:not(:last-child) > .ant-btn {border-top-left-radius: 4px;border-bottom-left-radius: 4px;}
.ant-btn-group > .ant-btn:last-child:not(:first-child), .ant-btn-group > span:last-child:not(:first-child) > .ant-btn {border-top-right-radius: 4px;border-bottom-right-radius: 4px;}
.ant-btn-group-sm > .ant-btn:only-child {border-radius: 4px;}
.ant-btn-group-sm > span:only-child > .ant-btn {border-radius: 4px;}
.ant-btn-group-sm > .ant-btn:first-child:not(:last-child), .ant-btn-group-sm > span:first-child:not(:last-child) > .ant-btn {border-top-left-radius: 4px;border-bottom-left-radius: 4px;}
.ant-btn-group-sm > .ant-btn:last-child:not(:first-child), .ant-btn-group-sm > span:last-child:not(:first-child) > .ant-btn {border-top-right-radius: 4px;border-bottom-right-radius: 4px;}
.ant-btn-group > .ant-btn-group:not(:first-child):not(:last-child) > .ant-btn {border-radius: 0;}
.ant-btn-group > .ant-btn-group:first-child:not(:last-child) > .ant-btn:last-child {border-top-right-radius: 0;border-bottom-right-radius: 0;}
.ant-btn-group > .ant-btn-group:last-child:not(:first-child) > .ant-btn:first-child {border-top-left-radius: 0;border-bottom-left-radius: 0;}
.ant-btn-background-ghost {color: #fff;background: transparent !important;border-color: #fff;}
.ant-btn-background-ghost.ant-btn-primary {color: @btn-primary-bg;background-color: transparent;border-color: @btn-primary-bg;}
.ant-btn-background-ghost.ant-btn-primary > a:only-child {color: currentColor;}
.ant-btn-background-ghost.ant-btn-primary > a:only-child::after {background: transparent;}
.ant-btn-background-ghost.ant-btn-primary:hover, .ant-btn-background-ghost.ant-btn-primary:focus {color: color(~\`colorPalette("@{btn-primary-bg}", 5)\`);background-color: transparent;border-color: color(~\`colorPalette("@{btn-primary-bg}", 5)\`);}
.ant-btn-background-ghost.ant-btn-primary:hover > a:only-child, .ant-btn-background-ghost.ant-btn-primary:focus > a:only-child {color: currentColor;}
.ant-btn-background-ghost.ant-btn-primary:hover > a:only-child::after, .ant-btn-background-ghost.ant-btn-primary:focus > a:only-child::after {background: transparent;}
.ant-btn-background-ghost.ant-btn-primary:active, .ant-btn-background-ghost.ant-btn-primary.active {color: color(~\`colorPalette("@{btn-primary-bg}", 7)\`);background-color: transparent;border-color: color(~\`colorPalette("@{btn-primary-bg}", 7)\`);}
.ant-btn-background-ghost.ant-btn-primary:active > a:only-child, .ant-btn-background-ghost.ant-btn-primary.active > a:only-child {color: currentColor;}
.ant-btn-background-ghost.ant-btn-primary:active > a:only-child::after, .ant-btn-background-ghost.ant-btn-primary.active > a:only-child::after {background: transparent;}
.ant-btn-background-ghost.ant-btn-primary-disabled, .ant-btn-background-ghost.ant-btn-primary.disabled, .ant-btn-background-ghost.ant-btn-primary[disabled], .ant-btn-background-ghost.ant-btn-primary-disabled:hover, .ant-btn-background-ghost.ant-btn-primary.disabled:hover, .ant-btn-background-ghost.ant-btn-primary[disabled]:hover, .ant-btn-background-ghost.ant-btn-primary-disabled:focus, .ant-btn-background-ghost.ant-btn-primary.disabled:focus, .ant-btn-background-ghost.ant-btn-primary[disabled]:focus, .ant-btn-background-ghost.ant-btn-primary-disabled:active, .ant-btn-background-ghost.ant-btn-primary.disabled:active, .ant-btn-background-ghost.ant-btn-primary[disabled]:active, .ant-btn-background-ghost.ant-btn-primary-disabled.active, .ant-btn-background-ghost.ant-btn-primary.disabled.active, .ant-btn-background-ghost.ant-btn-primary[disabled].active {color: rgba(0, 0, 0, 0.25);background-color: #f5f5f5;border-color: #d9d9d9;box-shadow: none;}
.ant-btn-background-ghost.ant-btn-primary-disabled > a:only-child, .ant-btn-background-ghost.ant-btn-primary.disabled > a:only-child, .ant-btn-background-ghost.ant-btn-primary[disabled] > a:only-child, .ant-btn-background-ghost.ant-btn-primary-disabled:hover > a:only-child, .ant-btn-background-ghost.ant-btn-primary.disabled:hover > a:only-child, .ant-btn-background-ghost.ant-btn-primary[disabled]:hover > a:only-child, .ant-btn-background-ghost.ant-btn-primary-disabled:focus > a:only-child, .ant-btn-background-ghost.ant-btn-primary.disabled:focus > a:only-child, .ant-btn-background-ghost.ant-btn-primary[disabled]:focus > a:only-child, .ant-btn-background-ghost.ant-btn-primary-disabled:active > a:only-child, .ant-btn-background-ghost.ant-btn-primary.disabled:active > a:only-child, .ant-btn-background-ghost.ant-btn-primary[disabled]:active > a:only-child, .ant-btn-background-ghost.ant-btn-primary-disabled.active > a:only-child, .ant-btn-background-ghost.ant-btn-primary.disabled.active > a:only-child, .ant-btn-background-ghost.ant-btn-primary[disabled].active > a:only-child {color: currentColor;}
.ant-btn-background-ghost.ant-btn-primary-disabled > a:only-child::after, .ant-btn-background-ghost.ant-btn-primary.disabled > a:only-child::after, .ant-btn-background-ghost.ant-btn-primary[disabled] > a:only-child::after, .ant-btn-background-ghost.ant-btn-primary-disabled:hover > a:only-child::after, .ant-btn-background-ghost.ant-btn-primary.disabled:hover > a:only-child::after, .ant-btn-background-ghost.ant-btn-primary[disabled]:hover > a:only-child::after, .ant-btn-background-ghost.ant-btn-primary-disabled:focus > a:only-child::after, .ant-btn-background-ghost.ant-btn-primary.disabled:focus > a:only-child::after, .ant-btn-background-ghost.ant-btn-primary[disabled]:focus > a:only-child::after, .ant-btn-background-ghost.ant-btn-primary-disabled:active > a:only-child::after, .ant-btn-background-ghost.ant-btn-primary.disabled:active > a:only-child::after, .ant-btn-background-ghost.ant-btn-primary[disabled]:active > a:only-child::after, .ant-btn-background-ghost.ant-btn-primary-disabled.active > a:only-child::after, .ant-btn-background-ghost.ant-btn-primary.disabled.active > a:only-child::after, .ant-btn-background-ghost.ant-btn-primary[disabled].active > a:only-child::after {background: transparent;}
.ant-btn-background-ghost.ant-btn-danger {color: #ff4d4f;background-color: transparent;border-color: #ff4d4f;}
.ant-btn-background-ghost.ant-btn-danger > a:only-child {color: currentColor;}
.ant-btn-background-ghost.ant-btn-danger > a:only-child::after {background: transparent;}
.ant-btn-background-ghost.ant-btn-danger:hover, .ant-btn-background-ghost.ant-btn-danger:focus {color: #ff7875;background-color: transparent;border-color: #ff7875;}
.ant-btn-background-ghost.ant-btn-danger:hover > a:only-child, .ant-btn-background-ghost.ant-btn-danger:focus > a:only-child {color: currentColor;}
.ant-btn-background-ghost.ant-btn-danger:hover > a:only-child::after, .ant-btn-background-ghost.ant-btn-danger:focus > a:only-child::after {background: transparent;}
.ant-btn-background-ghost.ant-btn-danger:active, .ant-btn-background-ghost.ant-btn-danger.active {color: #d9363e;background-color: transparent;border-color: #d9363e;}
.ant-btn-background-ghost.ant-btn-danger:active > a:only-child, .ant-btn-background-ghost.ant-btn-danger.active > a:only-child {color: currentColor;}
.ant-btn-background-ghost.ant-btn-danger:active > a:only-child::after, .ant-btn-background-ghost.ant-btn-danger.active > a:only-child::after {background: transparent;}
.ant-btn-background-ghost.ant-btn-danger-disabled, .ant-btn-background-ghost.ant-btn-danger.disabled, .ant-btn-background-ghost.ant-btn-danger[disabled], .ant-btn-background-ghost.ant-btn-danger-disabled:hover, .ant-btn-background-ghost.ant-btn-danger.disabled:hover, .ant-btn-background-ghost.ant-btn-danger[disabled]:hover, .ant-btn-background-ghost.ant-btn-danger-disabled:focus, .ant-btn-background-ghost.ant-btn-danger.disabled:focus, .ant-btn-background-ghost.ant-btn-danger[disabled]:focus, .ant-btn-background-ghost.ant-btn-danger-disabled:active, .ant-btn-background-ghost.ant-btn-danger.disabled:active, .ant-btn-background-ghost.ant-btn-danger[disabled]:active, .ant-btn-background-ghost.ant-btn-danger-disabled.active, .ant-btn-background-ghost.ant-btn-danger.disabled.active, .ant-btn-background-ghost.ant-btn-danger[disabled].active {color: rgba(0, 0, 0, 0.25);background-color: #f5f5f5;border-color: #d9d9d9;box-shadow: none;}
.ant-btn-background-ghost.ant-btn-danger-disabled > a:only-child, .ant-btn-background-ghost.ant-btn-danger.disabled > a:only-child, .ant-btn-background-ghost.ant-btn-danger[disabled] > a:only-child, .ant-btn-background-ghost.ant-btn-danger-disabled:hover > a:only-child, .ant-btn-background-ghost.ant-btn-danger.disabled:hover > a:only-child, .ant-btn-background-ghost.ant-btn-danger[disabled]:hover > a:only-child, .ant-btn-background-ghost.ant-btn-danger-disabled:focus > a:only-child, .ant-btn-background-ghost.ant-btn-danger.disabled:focus > a:only-child, .ant-btn-background-ghost.ant-btn-danger[disabled]:focus > a:only-child, .ant-btn-background-ghost.ant-btn-danger-disabled:active > a:only-child, .ant-btn-background-ghost.ant-btn-danger.disabled:active > a:only-child, .ant-btn-background-ghost.ant-btn-danger[disabled]:active > a:only-child, .ant-btn-background-ghost.ant-btn-danger-disabled.active > a:only-child, .ant-btn-background-ghost.ant-btn-danger.disabled.active > a:only-child, .ant-btn-background-ghost.ant-btn-danger[disabled].active > a:only-child {color: currentColor;}
.ant-btn-background-ghost.ant-btn-danger-disabled > a:only-child::after, .ant-btn-background-ghost.ant-btn-danger.disabled > a:only-child::after, .ant-btn-background-ghost.ant-btn-danger[disabled] > a:only-child::after, .ant-btn-background-ghost.ant-btn-danger-disabled:hover > a:only-child::after, .ant-btn-background-ghost.ant-btn-danger.disabled:hover > a:only-child::after, .ant-btn-background-ghost.ant-btn-danger[disabled]:hover > a:only-child::after, .ant-btn-background-ghost.ant-btn-danger-disabled:focus > a:only-child::after, .ant-btn-background-ghost.ant-btn-danger.disabled:focus > a:only-child::after, .ant-btn-background-ghost.ant-btn-danger[disabled]:focus > a:only-child::after, .ant-btn-background-ghost.ant-btn-danger-disabled:active > a:only-child::after, .ant-btn-background-ghost.ant-btn-danger.disabled:active > a:only-child::after, .ant-btn-background-ghost.ant-btn-danger[disabled]:active > a:only-child::after, .ant-btn-background-ghost.ant-btn-danger-disabled.active > a:only-child::after, .ant-btn-background-ghost.ant-btn-danger.disabled.active > a:only-child::after, .ant-btn-background-ghost.ant-btn-danger[disabled].active > a:only-child::after {background: transparent;}
.ant-btn-background-ghost.ant-btn-link {color: @primary-color;background-color: transparent;border-color: transparent;color: #fff;}
.ant-btn-background-ghost.ant-btn-link > a:only-child {color: currentColor;}
.ant-btn-background-ghost.ant-btn-link > a:only-child::after {background: transparent;}
.ant-btn-background-ghost.ant-btn-link:hover, .ant-btn-background-ghost.ant-btn-link:focus {color: color(~\`colorPalette("@{primary-color}", 5)\`);background-color: transparent;border-color: transparent;}
.ant-btn-background-ghost.ant-btn-link:hover > a:only-child, .ant-btn-background-ghost.ant-btn-link:focus > a:only-child {color: currentColor;}
.ant-btn-background-ghost.ant-btn-link:hover > a:only-child::after, .ant-btn-background-ghost.ant-btn-link:focus > a:only-child::after {background: transparent;}
.ant-btn-background-ghost.ant-btn-link:active, .ant-btn-background-ghost.ant-btn-link.active {color: color(~\`colorPalette("@{primary-color}", 7)\`);background-color: transparent;border-color: transparent;}
.ant-btn-background-ghost.ant-btn-link:active > a:only-child, .ant-btn-background-ghost.ant-btn-link.active > a:only-child {color: currentColor;}
.ant-btn-background-ghost.ant-btn-link:active > a:only-child::after, .ant-btn-background-ghost.ant-btn-link.active > a:only-child::after {background: transparent;}
.ant-btn-background-ghost.ant-btn-link-disabled, .ant-btn-background-ghost.ant-btn-link.disabled, .ant-btn-background-ghost.ant-btn-link[disabled], .ant-btn-background-ghost.ant-btn-link-disabled:hover, .ant-btn-background-ghost.ant-btn-link.disabled:hover, .ant-btn-background-ghost.ant-btn-link[disabled]:hover, .ant-btn-background-ghost.ant-btn-link-disabled:focus, .ant-btn-background-ghost.ant-btn-link.disabled:focus, .ant-btn-background-ghost.ant-btn-link[disabled]:focus, .ant-btn-background-ghost.ant-btn-link-disabled:active, .ant-btn-background-ghost.ant-btn-link.disabled:active, .ant-btn-background-ghost.ant-btn-link[disabled]:active, .ant-btn-background-ghost.ant-btn-link-disabled.active, .ant-btn-background-ghost.ant-btn-link.disabled.active, .ant-btn-background-ghost.ant-btn-link[disabled].active {color: rgba(0, 0, 0, 0.25);background-color: #f5f5f5;border-color: #d9d9d9;box-shadow: none;}
.ant-btn-background-ghost.ant-btn-link-disabled > a:only-child, .ant-btn-background-ghost.ant-btn-link.disabled > a:only-child, .ant-btn-background-ghost.ant-btn-link[disabled] > a:only-child, .ant-btn-background-ghost.ant-btn-link-disabled:hover > a:only-child, .ant-btn-background-ghost.ant-btn-link.disabled:hover > a:only-child, .ant-btn-background-ghost.ant-btn-link[disabled]:hover > a:only-child, .ant-btn-background-ghost.ant-btn-link-disabled:focus > a:only-child, .ant-btn-background-ghost.ant-btn-link.disabled:focus > a:only-child, .ant-btn-background-ghost.ant-btn-link[disabled]:focus > a:only-child, .ant-btn-background-ghost.ant-btn-link-disabled:active > a:only-child, .ant-btn-background-ghost.ant-btn-link.disabled:active > a:only-child, .ant-btn-background-ghost.ant-btn-link[disabled]:active > a:only-child, .ant-btn-background-ghost.ant-btn-link-disabled.active > a:only-child, .ant-btn-background-ghost.ant-btn-link.disabled.active > a:only-child, .ant-btn-background-ghost.ant-btn-link[disabled].active > a:only-child {color: currentColor;}
.ant-btn-background-ghost.ant-btn-link-disabled > a:only-child::after, .ant-btn-background-ghost.ant-btn-link.disabled > a:only-child::after, .ant-btn-background-ghost.ant-btn-link[disabled] > a:only-child::after, .ant-btn-background-ghost.ant-btn-link-disabled:hover > a:only-child::after, .ant-btn-background-ghost.ant-btn-link.disabled:hover > a:only-child::after, .ant-btn-background-ghost.ant-btn-link[disabled]:hover > a:only-child::after, .ant-btn-background-ghost.ant-btn-link-disabled:focus > a:only-child::after, .ant-btn-background-ghost.ant-btn-link.disabled:focus > a:only-child::after, .ant-btn-background-ghost.ant-btn-link[disabled]:focus > a:only-child::after, .ant-btn-background-ghost.ant-btn-link-disabled:active > a:only-child::after, .ant-btn-background-ghost.ant-btn-link.disabled:active > a:only-child::after, .ant-btn-background-ghost.ant-btn-link[disabled]:active > a:only-child::after, .ant-btn-background-ghost.ant-btn-link-disabled.active > a:only-child::after, .ant-btn-background-ghost.ant-btn-link.disabled.active > a:only-child::after, .ant-btn-background-ghost.ant-btn-link[disabled].active > a:only-child::after {background: transparent;}
.ant-fullcalendar {color: @text-color;border-top: 1px solid #d9d9d9;}
.ant-fullcalendar table {background-color: transparent;border-collapse: collapse;}
.ant-fullcalendar table, .ant-fullcalendar th, .ant-fullcalendar td {border: 0;}
.ant-fullcalendar-calendar-table {border-spacing: 0;}
.ant-fullcalendar-value {color: @text-color;background: transparent;border-radius: 2px;}
.ant-fullcalendar-value:hover {background: color(~\`colorPalette("@{primary-color}", 1)\`);}
.ant-fullcalendar-value:active {color: #fff;background: @primary-color;}
.ant-fullcalendar-today .ant-fullcalendar-value, .ant-fullcalendar-month-panel-current-cell .ant-fullcalendar-value {box-shadow: 0 0 0 1px @primary-color inset;}
.ant-fullcalendar-selected-day .ant-fullcalendar-value, .ant-fullcalendar-month-panel-selected-cell .ant-fullcalendar-value {color: #fff;background: @primary-color;}
.ant-fullcalendar-disabled-cell-first-of-row .ant-fullcalendar-value {border-top-left-radius: 4px;border-bottom-left-radius: 4px;}
.ant-fullcalendar-disabled-cell-last-of-row .ant-fullcalendar-value {border-top-right-radius: 4px;border-bottom-right-radius: 4px;}
.ant-fullcalendar-last-month-cell .ant-fullcalendar-value, .ant-fullcalendar-next-month-btn-day .ant-fullcalendar-value {color: rgba(0, 0, 0, 0.25);}
.ant-fullcalendar-month-panel-table {border-collapse: separate;}
.ant-fullcalendar-fullscreen {border-top: 0;}
.ant-fullcalendar-fullscreen .ant-fullcalendar-month, .ant-fullcalendar-fullscreen .ant-fullcalendar-date {color: @text-color;border-top: 2px solid #e8e8e8;}
.ant-fullcalendar-fullscreen .ant-fullcalendar-month:hover, .ant-fullcalendar-fullscreen .ant-fullcalendar-date:hover {background: color(~\`colorPalette("@{primary-color}", 1)\`);}
.ant-fullcalendar-fullscreen .ant-fullcalendar-month:active, .ant-fullcalendar-fullscreen .ant-fullcalendar-date:active {background: color(~\`colorPalette("@{primary-color}", 2)\`);}
.ant-fullcalendar-fullscreen .ant-fullcalendar-value {background: transparent;}
.ant-fullcalendar-fullscreen .ant-fullcalendar-today .ant-fullcalendar-value {color: @text-color;}
.ant-fullcalendar-fullscreen .ant-fullcalendar-month-panel-current-cell .ant-fullcalendar-month, .ant-fullcalendar-fullscreen .ant-fullcalendar-today .ant-fullcalendar-date {background: transparent;border-top-color: @primary-color;}
.ant-fullcalendar-fullscreen .ant-fullcalendar-month-panel-current-cell .ant-fullcalendar-value, .ant-fullcalendar-fullscreen .ant-fullcalendar-today .ant-fullcalendar-value {box-shadow: none;}
.ant-fullcalendar-fullscreen .ant-fullcalendar-month-panel-selected-cell .ant-fullcalendar-month, .ant-fullcalendar-fullscreen .ant-fullcalendar-selected-day .ant-fullcalendar-date {background: color(~\`colorPalette("@{primary-color}", 1)\`);}
.ant-fullcalendar-fullscreen .ant-fullcalendar-month-panel-selected-cell .ant-fullcalendar-value, .ant-fullcalendar-fullscreen .ant-fullcalendar-selected-day .ant-fullcalendar-value {color: @primary-color;}
.ant-fullcalendar-fullscreen .ant-fullcalendar-last-month-cell .ant-fullcalendar-date, .ant-fullcalendar-fullscreen .ant-fullcalendar-next-month-btn-day .ant-fullcalendar-date {color: rgba(0, 0, 0, 0.25);}
.ant-fullcalendar-disabled-cell:not(.ant-fullcalendar-today) .ant-fullcalendar-date, .ant-fullcalendar-disabled-cell:not(.ant-fullcalendar-today) .ant-fullcalendar-date:hover {background: transparent;}
.ant-fullcalendar-disabled-cell .ant-fullcalendar-value {color: rgba(0, 0, 0, 0.25);border-radius: 0;}
.ant-card {color: @text-color;background: #fff;border-radius: 2px;}
.ant-card-hoverable:hover {border-color: rgba(0, 0, 0, 0.09);box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);}
.ant-card-bordered {border: 1px solid #e8e8e8;}
.ant-card-head {color: @heading-color;background: transparent;border-bottom: 1px solid #e8e8e8;border-radius: 2px 2px 0 0;}
.ant-card-head .ant-tabs {color: @text-color;}
.ant-card-head .ant-tabs-bar {border-bottom: 1px solid #e8e8e8;}
.ant-card-extra {color: @text-color;}
.ant-card-grid {border: 0;border-radius: 0;box-shadow: 1px 0 0 0 #e8e8e8, 0 1px 0 0 #e8e8e8, 1px 1px 0 0 #e8e8e8, 1px 0 0 0 #e8e8e8 inset, 0 1px 0 0 #e8e8e8 inset;}
.ant-card-grid-hoverable:hover {box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);}
.ant-card-cover img {border-radius: 2px 2px 0 0;}
.ant-card-actions {background: #fafafa;border-top: 1px solid #e8e8e8;}
.ant-card-actions > li {color: @text-color-secondary;}
.ant-card-actions > li > span:hover {color: @primary-color;}
.ant-card-actions > li > span a:not(.ant-btn), .ant-card-actions > li > span > .anticon {color: @text-color-secondary;}
.ant-card-actions > li > span a:not(.ant-btn):hover, .ant-card-actions > li > span > .anticon:hover {color: @primary-color;}
.ant-card-actions > li:not(:last-child) {border-right: 1px solid #e8e8e8;}
.ant-card-type-inner .ant-card-head {background: #fafafa;}
.ant-card-meta-title {color: @heading-color;}
.ant-card-meta-description {color: @text-color-secondary;}
.ant-card-loading-block {background: linear-gradient(90deg, rgba(207, 216, 220, 0.2), rgba(207, 216, 220, 0.4), rgba(207, 216, 220, 0.2));background-size: 600% 600%;border-radius: 2px;}
.ant-carousel {color: @text-color;}
.ant-carousel .slick-slider {-webkit-tap-highlight-color: transparent;}
.ant-carousel .slick-vertical .slick-slide {border: 1px solid transparent;}
.ant-carousel .slick-prev, .ant-carousel .slick-next {color: transparent;background: transparent;border: 0;}
.ant-carousel .slick-prev:hover, .ant-carousel .slick-next:hover, .ant-carousel .slick-prev:focus, .ant-carousel .slick-next:focus {color: transparent;background: transparent;}
.ant-carousel .slick-dots li button {color: transparent;background: #fff;border: 0;border-radius: 1px;}
.ant-carousel .slick-dots li.slick-active button {background: #fff;}
.ant-cascader {color: @text-color;}
.ant-cascader-input.ant-input {background-color: transparent !important;}
.ant-cascader-picker {color: @text-color;background-color: #fff;border-radius: 4px;}
.ant-cascader-picker-with-value .ant-cascader-picker-label {color: transparent;}
.ant-cascader-picker-disabled {color: rgba(0, 0, 0, 0.25);background: #f5f5f5;}
.ant-cascader-picker:focus .ant-cascader-input {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(90, 105, 46, 0.2);}
.ant-cascader-picker-show-search.ant-cascader-picker-focused {color: rgba(0, 0, 0, 0.25);}
.ant-cascader-picker-clear {color: rgba(0, 0, 0, 0.25);background: #fff;}
.ant-cascader-picker-clear:hover {color: @text-color-secondary;}
.ant-cascader-picker-arrow {color: rgba(0, 0, 0, 0.25);}
.ant-cascader-picker-label:hover + .ant-cascader-input {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);border-right-width: 1px !important;}
.ant-cascader-menus {background: #fff;border-radius: 4px;box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);}
.ant-cascader-menu {border-right: 1px solid #e8e8e8;}
.ant-cascader-menu:first-child {border-radius: 4px 0 0 4px;}
.ant-cascader-menu:last-child {border-right-color: transparent;border-radius: 0 4px 4px 0;}
.ant-cascader-menu:only-child {border-radius: 4px;}
.ant-cascader-menu-item:hover {background: color(~\`colorPalette("@{primary-color}", 1)\`);}
.ant-cascader-menu-item-disabled {color: rgba(0, 0, 0, 0.25);}
.ant-cascader-menu-item-disabled:hover {background: transparent;}
.ant-cascader-menu-item-active:not(.ant-cascader-menu-item-disabled), .ant-cascader-menu-item-active:not(.ant-cascader-menu-item-disabled):hover {background-color: #fafafa;}
.ant-cascader-menu-item-expand .ant-cascader-menu-item-expand-icon, .ant-cascader-menu-item-loading-icon {color: @text-color-secondary;}
.ant-cascader-menu-item-disabled.ant-cascader-menu-item-expand .ant-cascader-menu-item-expand-icon, .ant-cascader-menu-item-disabled.ant-cascader-menu-item-loading-icon {color: rgba(0, 0, 0, 0.25);}
.ant-cascader-menu-item .ant-cascader-menu-item-keyword {color: #f5222d;}
.ant-checkbox {color: @text-color;}
.ant-checkbox-wrapper:hover .ant-checkbox-inner, .ant-checkbox:hover .ant-checkbox-inner, .ant-checkbox-input:focus + .ant-checkbox-inner {border-color: @primary-color;}
.ant-checkbox-checked::after {border: 1px solid @primary-color;border-radius: 2px;}
.ant-checkbox-inner {background-color: #fff;border: 1px solid #d9d9d9;border-radius: 2px;border-collapse: separate;}
.ant-checkbox-inner::after {border: 2px solid #fff;border-top: 0;border-left: 0;}
.ant-checkbox-checked .ant-checkbox-inner::after {border: 2px solid #fff;border-top: 0;border-left: 0;}
.ant-checkbox-checked .ant-checkbox-inner {background-color: @primary-color;border-color: @primary-color;}
.ant-checkbox-disabled.ant-checkbox-checked .ant-checkbox-inner::after {border-color: rgba(0, 0, 0, 0.25);}
.ant-checkbox-disabled .ant-checkbox-inner {background-color: #f5f5f5;border-color: #d9d9d9 !important;}
.ant-checkbox-disabled .ant-checkbox-inner::after {border-color: #f5f5f5;border-collapse: separate;}
.ant-checkbox-disabled + span {color: rgba(0, 0, 0, 0.25);}
.ant-checkbox-wrapper {color: @text-color;}
.ant-checkbox-group {color: @text-color;}
.ant-checkbox-indeterminate .ant-checkbox-inner {background-color: #fff;border-color: #d9d9d9;}
.ant-checkbox-indeterminate .ant-checkbox-inner::after {background-color: @primary-color;border: 0;}
.ant-checkbox-indeterminate.ant-checkbox-disabled .ant-checkbox-inner::after {background-color: rgba(0, 0, 0, 0.25);border-color: rgba(0, 0, 0, 0.25);}
.ant-collapse {color: @text-color;background-color: #fafafa;border: 1px solid #d9d9d9;border-bottom: 0;border-radius: 4px;}
.ant-collapse > .ant-collapse-item {border-bottom: 1px solid #d9d9d9;}
.ant-collapse > .ant-collapse-item:last-child, .ant-collapse > .ant-collapse-item:last-child > .ant-collapse-header {border-radius: 0 0 4px 4px;}
.ant-collapse > .ant-collapse-item > .ant-collapse-header {color: @heading-color;}
.ant-collapse > .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow {color: inherit;}
.ant-collapse-content {color: @text-color;background-color: #fff;border-top: 1px solid #d9d9d9;}
.ant-collapse-item:last-child > .ant-collapse-content {border-radius: 0 0 4px 4px;}
.ant-collapse-borderless {background-color: #fafafa;border: 0;}
.ant-collapse-borderless > .ant-collapse-item {border-bottom: 1px solid #d9d9d9;}
.ant-collapse-borderless > .ant-collapse-item:last-child, .ant-collapse-borderless > .ant-collapse-item:last-child .ant-collapse-header {border-radius: 0;}
.ant-collapse-borderless > .ant-collapse-item > .ant-collapse-content {background-color: transparent;border-top: 0;}
.ant-collapse .ant-collapse-item-disabled > .ant-collapse-header, .ant-collapse .ant-collapse-item-disabled > .ant-collapse-header > .arrow {color: rgba(0, 0, 0, 0.25);}
.ant-color-picker {color: rgba(0, 0, 0, 0.65);}
.ant-color-picker .pickr .pcr-button:focus {box-shadow: none;}
.ant-color-picker.ant-color-picker-disabled .ant-color-picker-selection {background: #f5f5f5;box-shadow: none;border: 1px solid #d9d9d9;}
.ant-color-picker.ant-color-picker-disabled .ant-color-picker-selection:hover, .ant-color-picker.ant-color-picker-disabled .ant-color-picker-selection:focus, .ant-color-picker.ant-color-picker-disabled .ant-color-picker-selection:active {border: 1px solid #d9d9d9;box-shadow: none;}
.ant-color-picker-open .ant-color-picker-selection {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(90, 105, 46, 0.2);}
.ant-color-picker-selection {background-color: #fff;border: 1px solid #d9d9d9;border-top-width: 1.02px;border-radius: 4px;}
.ant-color-picker-selection:hover {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);border-right-width: 1px !important;}
.ant-color-picker-icon {color: inherit;color: rgba(0, 0, 0, 0.25);}
.ant-comment-avatar img {border-radius: 50%;}
.ant-comment-content-author-name {color: @text-color-secondary;}
.ant-comment-content-author-name > * {color: @text-color-secondary;}
.ant-comment-content-author-name > *:hover {color: @text-color-secondary;}
.ant-comment-content-author-time {color: #ccc;}
.ant-comment-actions > li {color: @text-color-secondary;}
.ant-comment-actions > li > span {color: @text-color-secondary;}
.ant-comment-actions > li > span:hover {color: #595959;}
.ant-calendar-picker-container {color: @text-color;}
.ant-calendar-picker {color: @text-color;}
.ant-calendar-picker:hover .ant-calendar-picker-input:not(.ant-input-disabled) {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);}
.ant-calendar-picker:focus .ant-calendar-picker-input:not(.ant-input-disabled) {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(90, 105, 46, 0.2);}
.ant-calendar-picker-clear {color: rgba(0, 0, 0, 0.25);background: #fff;}
.ant-calendar-picker-clear:hover {color: @text-color-secondary;}
.ant-calendar-picker-icon {color: rgba(0, 0, 0, 0.25);}
.ant-calendar {background-color: #fff;background-clip: padding-box;border: 1px solid #fff;border-radius: 4px;box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);}
.ant-calendar-input-wrap {border-bottom: 1px solid #e8e8e8;}
.ant-calendar-input {color: @text-color;background: #fff;border: 0;}
.ant-calendar-input::-moz-placeholder {color: #bfbfbf;}
.ant-calendar-input:-ms-input-placeholder {color: #bfbfbf;}
.ant-calendar-input::-webkit-input-placeholder {color: #bfbfbf;}
.ant-calendar-header {border-bottom: 1px solid #e8e8e8;}
.ant-calendar-header a:hover {color: color(~\`colorPalette("@{primary-color}", 5)\`);}
.ant-calendar-header .ant-calendar-century-select, .ant-calendar-header .ant-calendar-decade-select, .ant-calendar-header .ant-calendar-year-select, .ant-calendar-header .ant-calendar-month-select {color: @heading-color;}
.ant-calendar-header .ant-calendar-prev-century-btn, .ant-calendar-header .ant-calendar-next-century-btn, .ant-calendar-header .ant-calendar-prev-decade-btn, .ant-calendar-header .ant-calendar-next-decade-btn, .ant-calendar-header .ant-calendar-prev-month-btn, .ant-calendar-header .ant-calendar-next-month-btn, .ant-calendar-header .ant-calendar-prev-year-btn, .ant-calendar-header .ant-calendar-next-year-btn {color: @text-color-secondary;}
.ant-calendar-header .ant-calendar-prev-century-btn::before, .ant-calendar-header .ant-calendar-prev-decade-btn::before, .ant-calendar-header .ant-calendar-prev-year-btn::before, .ant-calendar-header .ant-calendar-prev-century-btn::after, .ant-calendar-header .ant-calendar-prev-decade-btn::after, .ant-calendar-header .ant-calendar-prev-year-btn::after {border: 0 solid #aaa;border-width: 1.5px 0 0 1.5px;border-radius: 1px;}
.ant-calendar-header .ant-calendar-prev-century-btn:hover::before, .ant-calendar-header .ant-calendar-prev-decade-btn:hover::before, .ant-calendar-header .ant-calendar-prev-year-btn:hover::before, .ant-calendar-header .ant-calendar-prev-century-btn:hover::after, .ant-calendar-header .ant-calendar-prev-decade-btn:hover::after, .ant-calendar-header .ant-calendar-prev-year-btn:hover::after {border-color: @text-color;}
.ant-calendar-header .ant-calendar-next-century-btn::before, .ant-calendar-header .ant-calendar-next-decade-btn::before, .ant-calendar-header .ant-calendar-next-year-btn::before, .ant-calendar-header .ant-calendar-next-century-btn::after, .ant-calendar-header .ant-calendar-next-decade-btn::after, .ant-calendar-header .ant-calendar-next-year-btn::after {border: 0 solid #aaa;border-width: 1.5px 0 0 1.5px;border-radius: 1px;}
.ant-calendar-header .ant-calendar-next-century-btn:hover::before, .ant-calendar-header .ant-calendar-next-decade-btn:hover::before, .ant-calendar-header .ant-calendar-next-year-btn:hover::before, .ant-calendar-header .ant-calendar-next-century-btn:hover::after, .ant-calendar-header .ant-calendar-next-decade-btn:hover::after, .ant-calendar-header .ant-calendar-next-year-btn:hover::after {border-color: @text-color;}
.ant-calendar-header .ant-calendar-prev-month-btn::before, .ant-calendar-header .ant-calendar-prev-month-btn::after {border: 0 solid #aaa;border-width: 1.5px 0 0 1.5px;border-radius: 1px;}
.ant-calendar-header .ant-calendar-prev-month-btn:hover::before, .ant-calendar-header .ant-calendar-prev-month-btn:hover::after {border-color: @text-color;}
.ant-calendar-header .ant-calendar-next-month-btn::before, .ant-calendar-header .ant-calendar-next-month-btn::after {border: 0 solid #aaa;border-width: 1.5px 0 0 1.5px;border-radius: 1px;}
.ant-calendar-header .ant-calendar-next-month-btn:hover::before, .ant-calendar-header .ant-calendar-next-month-btn:hover::after {border-color: @text-color;}
.ant-calendar table {background-color: transparent;border-collapse: collapse;}
.ant-calendar table, .ant-calendar th, .ant-calendar td {border: 0;}
.ant-calendar-calendar-table {border-spacing: 0;}
.ant-calendar-date {color: @text-color;background: transparent;border: 1px solid transparent;border-radius: 2px;}
.ant-calendar-date:hover {background: color(~\`colorPalette("@{primary-color}", 1)\`);}
.ant-calendar-date:active {color: #fff;background: color(~\`colorPalette("@{primary-color}", 5)\`);}
.ant-calendar-today .ant-calendar-date {color: @primary-color;border-color: @primary-color;}
.ant-calendar-selected-day .ant-calendar-date {background: color(~\`colorPalette("@{primary-color}", 2)\`);}
.ant-calendar-last-month-cell .ant-calendar-date, .ant-calendar-next-month-btn-day .ant-calendar-date, .ant-calendar-last-month-cell .ant-calendar-date:hover, .ant-calendar-next-month-btn-day .ant-calendar-date:hover {color: rgba(0, 0, 0, 0.25);background: transparent;border-color: transparent;}
.ant-calendar-disabled-cell .ant-calendar-date {color: rgba(0, 0, 0, 0.25);background: #f5f5f5;border: 1px solid transparent;border-radius: 0;}
.ant-calendar-disabled-cell .ant-calendar-date:hover {background: #f5f5f5;}
.ant-calendar-disabled-cell.ant-calendar-selected-day .ant-calendar-date::before {background: rgba(0, 0, 0, 0.1);border-radius: 2px;}
.ant-calendar-disabled-cell.ant-calendar-today .ant-calendar-date::before {border: 1px solid rgba(0, 0, 0, 0.25);border-radius: 2px;}
.ant-calendar-disabled-cell-first-of-row .ant-calendar-date {border-top-left-radius: 4px;border-bottom-left-radius: 4px;}
.ant-calendar-disabled-cell-last-of-row .ant-calendar-date {border-top-right-radius: 4px;border-bottom-right-radius: 4px;}
.ant-calendar-footer {border-top: 1px solid #e8e8e8;}
.ant-calendar-footer:empty {border-top: 0;}
.ant-calendar .ant-calendar-today-btn-disabled, .ant-calendar .ant-calendar-clear-btn-disabled {color: rgba(0, 0, 0, 0.25);}
.ant-calendar .ant-calendar-clear-btn::after {color: rgba(0, 0, 0, 0.25);}
.ant-calendar .ant-calendar-clear-btn:hover::after {color: @text-color-secondary;}
.ant-calendar .ant-calendar-ok-btn {background-image: none;border: 1px solid transparent;box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);color: #fff;background-color: @btn-primary-bg;border-color: @btn-primary-bg;box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);border-radius: 4px;}
.ant-calendar .ant-calendar-ok-btn:not([disabled]):active {box-shadow: none;}
.ant-calendar .ant-calendar-ok-btn-lg {border-radius: 4px;}
.ant-calendar .ant-calendar-ok-btn-sm {border-radius: 4px;}
.ant-calendar .ant-calendar-ok-btn > a:only-child {color: currentColor;}
.ant-calendar .ant-calendar-ok-btn > a:only-child::after {background: transparent;}
.ant-calendar .ant-calendar-ok-btn:hover, .ant-calendar .ant-calendar-ok-btn:focus {color: #fff;background-color: color(~\`colorPalette("@{btn-primary-bg}", 5)\`);border-color: color(~\`colorPalette("@{btn-primary-bg}", 5)\`);}
.ant-calendar .ant-calendar-ok-btn:hover > a:only-child, .ant-calendar .ant-calendar-ok-btn:focus > a:only-child {color: currentColor;}
.ant-calendar .ant-calendar-ok-btn:hover > a:only-child::after, .ant-calendar .ant-calendar-ok-btn:focus > a:only-child::after {background: transparent;}
.ant-calendar .ant-calendar-ok-btn:active, .ant-calendar .ant-calendar-ok-btn.active {color: #fff;background-color: color(~\`colorPalette("@{btn-primary-bg}", 7)\`);border-color: color(~\`colorPalette("@{btn-primary-bg}", 7)\`);}
.ant-calendar .ant-calendar-ok-btn:active > a:only-child, .ant-calendar .ant-calendar-ok-btn.active > a:only-child {color: currentColor;}
.ant-calendar .ant-calendar-ok-btn:active > a:only-child::after, .ant-calendar .ant-calendar-ok-btn.active > a:only-child::after {background: transparent;}
.ant-calendar .ant-calendar-ok-btn-disabled, .ant-calendar .ant-calendar-ok-btn.disabled, .ant-calendar .ant-calendar-ok-btn[disabled], .ant-calendar .ant-calendar-ok-btn-disabled:hover, .ant-calendar .ant-calendar-ok-btn.disabled:hover, .ant-calendar .ant-calendar-ok-btn[disabled]:hover, .ant-calendar .ant-calendar-ok-btn-disabled:focus, .ant-calendar .ant-calendar-ok-btn.disabled:focus, .ant-calendar .ant-calendar-ok-btn[disabled]:focus, .ant-calendar .ant-calendar-ok-btn-disabled:active, .ant-calendar .ant-calendar-ok-btn.disabled:active, .ant-calendar .ant-calendar-ok-btn[disabled]:active, .ant-calendar .ant-calendar-ok-btn-disabled.active, .ant-calendar .ant-calendar-ok-btn.disabled.active, .ant-calendar .ant-calendar-ok-btn[disabled].active {color: rgba(0, 0, 0, 0.25);background-color: #f5f5f5;border-color: #d9d9d9;box-shadow: none;}
.ant-calendar .ant-calendar-ok-btn-disabled > a:only-child, .ant-calendar .ant-calendar-ok-btn.disabled > a:only-child, .ant-calendar .ant-calendar-ok-btn[disabled] > a:only-child, .ant-calendar .ant-calendar-ok-btn-disabled:hover > a:only-child, .ant-calendar .ant-calendar-ok-btn.disabled:hover > a:only-child, .ant-calendar .ant-calendar-ok-btn[disabled]:hover > a:only-child, .ant-calendar .ant-calendar-ok-btn-disabled:focus > a:only-child, .ant-calendar .ant-calendar-ok-btn.disabled:focus > a:only-child, .ant-calendar .ant-calendar-ok-btn[disabled]:focus > a:only-child, .ant-calendar .ant-calendar-ok-btn-disabled:active > a:only-child, .ant-calendar .ant-calendar-ok-btn.disabled:active > a:only-child, .ant-calendar .ant-calendar-ok-btn[disabled]:active > a:only-child, .ant-calendar .ant-calendar-ok-btn-disabled.active > a:only-child, .ant-calendar .ant-calendar-ok-btn.disabled.active > a:only-child, .ant-calendar .ant-calendar-ok-btn[disabled].active > a:only-child {color: currentColor;}
.ant-calendar .ant-calendar-ok-btn-disabled > a:only-child::after, .ant-calendar .ant-calendar-ok-btn.disabled > a:only-child::after, .ant-calendar .ant-calendar-ok-btn[disabled] > a:only-child::after, .ant-calendar .ant-calendar-ok-btn-disabled:hover > a:only-child::after, .ant-calendar .ant-calendar-ok-btn.disabled:hover > a:only-child::after, .ant-calendar .ant-calendar-ok-btn[disabled]:hover > a:only-child::after, .ant-calendar .ant-calendar-ok-btn-disabled:focus > a:only-child::after, .ant-calendar .ant-calendar-ok-btn.disabled:focus > a:only-child::after, .ant-calendar .ant-calendar-ok-btn[disabled]:focus > a:only-child::after, .ant-calendar .ant-calendar-ok-btn-disabled:active > a:only-child::after, .ant-calendar .ant-calendar-ok-btn.disabled:active > a:only-child::after, .ant-calendar .ant-calendar-ok-btn[disabled]:active > a:only-child::after, .ant-calendar .ant-calendar-ok-btn-disabled.active > a:only-child::after, .ant-calendar .ant-calendar-ok-btn.disabled.active > a:only-child::after, .ant-calendar .ant-calendar-ok-btn[disabled].active > a:only-child::after {background: transparent;}
.ant-calendar .ant-calendar-ok-btn-disabled, .ant-calendar .ant-calendar-ok-btn.disabled, .ant-calendar .ant-calendar-ok-btn[disabled], .ant-calendar .ant-calendar-ok-btn-disabled:hover, .ant-calendar .ant-calendar-ok-btn.disabled:hover, .ant-calendar .ant-calendar-ok-btn[disabled]:hover, .ant-calendar .ant-calendar-ok-btn-disabled:focus, .ant-calendar .ant-calendar-ok-btn.disabled:focus, .ant-calendar .ant-calendar-ok-btn[disabled]:focus, .ant-calendar .ant-calendar-ok-btn-disabled:active, .ant-calendar .ant-calendar-ok-btn.disabled:active, .ant-calendar .ant-calendar-ok-btn[disabled]:active, .ant-calendar .ant-calendar-ok-btn-disabled.active, .ant-calendar .ant-calendar-ok-btn.disabled.active, .ant-calendar .ant-calendar-ok-btn[disabled].active {color: rgba(0, 0, 0, 0.25);background-color: #f5f5f5;border-color: #d9d9d9;box-shadow: none;}
.ant-calendar .ant-calendar-ok-btn-disabled > a:only-child, .ant-calendar .ant-calendar-ok-btn.disabled > a:only-child, .ant-calendar .ant-calendar-ok-btn[disabled] > a:only-child, .ant-calendar .ant-calendar-ok-btn-disabled:hover > a:only-child, .ant-calendar .ant-calendar-ok-btn.disabled:hover > a:only-child, .ant-calendar .ant-calendar-ok-btn[disabled]:hover > a:only-child, .ant-calendar .ant-calendar-ok-btn-disabled:focus > a:only-child, .ant-calendar .ant-calendar-ok-btn.disabled:focus > a:only-child, .ant-calendar .ant-calendar-ok-btn[disabled]:focus > a:only-child, .ant-calendar .ant-calendar-ok-btn-disabled:active > a:only-child, .ant-calendar .ant-calendar-ok-btn.disabled:active > a:only-child, .ant-calendar .ant-calendar-ok-btn[disabled]:active > a:only-child, .ant-calendar .ant-calendar-ok-btn-disabled.active > a:only-child, .ant-calendar .ant-calendar-ok-btn.disabled.active > a:only-child, .ant-calendar .ant-calendar-ok-btn[disabled].active > a:only-child {color: currentColor;}
.ant-calendar .ant-calendar-ok-btn-disabled > a:only-child::after, .ant-calendar .ant-calendar-ok-btn.disabled > a:only-child::after, .ant-calendar .ant-calendar-ok-btn[disabled] > a:only-child::after, .ant-calendar .ant-calendar-ok-btn-disabled:hover > a:only-child::after, .ant-calendar .ant-calendar-ok-btn.disabled:hover > a:only-child::after, .ant-calendar .ant-calendar-ok-btn[disabled]:hover > a:only-child::after, .ant-calendar .ant-calendar-ok-btn-disabled:focus > a:only-child::after, .ant-calendar .ant-calendar-ok-btn.disabled:focus > a:only-child::after, .ant-calendar .ant-calendar-ok-btn[disabled]:focus > a:only-child::after, .ant-calendar .ant-calendar-ok-btn-disabled:active > a:only-child::after, .ant-calendar .ant-calendar-ok-btn.disabled:active > a:only-child::after, .ant-calendar .ant-calendar-ok-btn[disabled]:active > a:only-child::after, .ant-calendar .ant-calendar-ok-btn-disabled.active > a:only-child::after, .ant-calendar .ant-calendar-ok-btn.disabled.active > a:only-child::after, .ant-calendar .ant-calendar-ok-btn[disabled].active > a:only-child::after {background: transparent;}
.ant-calendar-range-picker-input {background-color: transparent;border: 0;}
.ant-calendar-range-picker-input::-moz-placeholder {color: #bfbfbf;}
.ant-calendar-range-picker-input:-ms-input-placeholder {color: #bfbfbf;}
.ant-calendar-range-picker-input::-webkit-input-placeholder {color: #bfbfbf;}
.ant-calendar-range-picker-separator {color: @text-color-secondary;}
.ant-input-disabled .ant-calendar-range-picker-separator {color: rgba(0, 0, 0, 0.25);}
.ant-calendar-range-left .ant-calendar-time-picker-inner {border-right: 1px solid #e8e8e8;}
.ant-calendar-range-right .ant-calendar-time-picker-inner {border-left: 1px solid #e8e8e8;}
.ant-calendar-range-middle {color: @text-color-secondary;}
.ant-calendar-range .ant-calendar-today :not(.ant-calendar-disabled-cell) :not(.ant-calendar-last-month-cell) :not(.ant-calendar-next-month-btn-day) .ant-calendar-date {color: @primary-color;background: color(~\`colorPalette("@{primary-color}", 2)\`);border-color: @primary-color;}
.ant-calendar-range .ant-calendar-selected-start-date .ant-calendar-date, .ant-calendar-range .ant-calendar-selected-end-date .ant-calendar-date {color: #fff;background: @primary-color;border: 1px solid transparent;}
.ant-calendar-range .ant-calendar-selected-start-date .ant-calendar-date:hover, .ant-calendar-range .ant-calendar-selected-end-date .ant-calendar-date:hover {background: @primary-color;}
.ant-calendar-range .ant-calendar-input, .ant-calendar-range .ant-calendar-time-picker-input {color: @text-color;background-color: #fff;background-image: none;border: 1px solid #d9d9d9;border-radius: 4px;border: 0;box-shadow: none;}
.ant-calendar-range .ant-calendar-input::-moz-placeholder, .ant-calendar-range .ant-calendar-time-picker-input::-moz-placeholder {color: #bfbfbf;}
.ant-calendar-range .ant-calendar-input:-ms-input-placeholder, .ant-calendar-range .ant-calendar-time-picker-input:-ms-input-placeholder {color: #bfbfbf;}
.ant-calendar-range .ant-calendar-input::-webkit-input-placeholder, .ant-calendar-range .ant-calendar-time-picker-input::-webkit-input-placeholder {color: #bfbfbf;}
.ant-calendar-range .ant-calendar-input:hover, .ant-calendar-range .ant-calendar-time-picker-input:hover {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);border-right-width: 1px !important;}
.ant-calendar-range .ant-calendar-input:focus, .ant-calendar-range .ant-calendar-time-picker-input:focus {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(90, 105, 46, 0.2);}
.ant-calendar-range .ant-calendar-input-disabled, .ant-calendar-range .ant-calendar-time-picker-input-disabled {color: rgba(0, 0, 0, 0.25);background-color: #f5f5f5;}
.ant-calendar-range .ant-calendar-input-disabled:hover, .ant-calendar-range .ant-calendar-time-picker-input-disabled:hover {border-color: #d9d9d9;border-right-width: 1px !important;}
.ant-calendar-range .ant-calendar-input[disabled], .ant-calendar-range .ant-calendar-time-picker-input[disabled] {color: rgba(0, 0, 0, 0.25);background-color: #f5f5f5;}
.ant-calendar-range .ant-calendar-input[disabled]:hover, .ant-calendar-range .ant-calendar-time-picker-input[disabled]:hover {border-color: #d9d9d9;border-right-width: 1px !important;}
.ant-calendar-range .ant-calendar-input:focus, .ant-calendar-range .ant-calendar-time-picker-input:focus {box-shadow: none;}
.ant-calendar-range .ant-calendar-in-range-cell {border-radius: 0;}
.ant-calendar-range .ant-calendar-in-range-cell::before {background: color(~\`colorPalette("@{primary-color}", 1)\`);border: 0;border-radius: 0;}
.ant-calendar-range .ant-calendar-header, .ant-calendar-range .ant-calendar-month-panel-header, .ant-calendar-range .ant-calendar-year-panel-header, .ant-calendar-range .ant-calendar-decade-panel-header {border-bottom: 0;}
.ant-calendar-range .ant-calendar-body, .ant-calendar-range .ant-calendar-month-panel-body, .ant-calendar-range .ant-calendar-year-panel-body, .ant-calendar-range .ant-calendar-decade-panel-body {border-top: 1px solid #e8e8e8;}
.ant-calendar-range.ant-calendar-time .ant-calendar-time-picker-inner {background: none;}
.ant-calendar-range.ant-calendar-time .ant-calendar-time-picker-combobox {background-color: #fff;border-top: 1px solid #e8e8e8;}
.ant-calendar-range.ant-calendar-show-time-picker .ant-calendar-body {border-top-color: transparent;}
.ant-calendar-time-picker {background-color: #fff;}
.ant-calendar-time-picker-inner {background-color: #fff;background-clip: padding-box;}
.ant-calendar-time-picker-select {border-right: 1px solid #e8e8e8;}
.ant-calendar-time-picker-select:first-child {border-left: 0;}
.ant-calendar-time-picker-select:last-child {border-right: 0;}
.ant-calendar-time-picker-select li:hover {background: color(~\`colorPalette("@{primary-color}", 1)\`);}
.ant-calendar-time-picker-select li:focus {color: @primary-color;}
li.ant-calendar-time-picker-select-option-selected {background: #f5f5f5;}
li.ant-calendar-time-picker-select-option-disabled {color: rgba(0, 0, 0, 0.25);}
li.ant-calendar-time-picker-select-option-disabled:hover {background: transparent;}
.ant-calendar-time .ant-calendar-day-select {color: @heading-color;}
.ant-calendar-time .ant-calendar-footer .ant-calendar-time-picker-btn-disabled {color: rgba(0, 0, 0, 0.25);}
.ant-calendar-month-panel {background: #fff;border-radius: 4px;}
.ant-calendar-month-panel-header {border-bottom: 1px solid #e8e8e8;}
.ant-calendar-month-panel-header a:hover {color: color(~\`colorPalette("@{primary-color}", 5)\`);}
.ant-calendar-month-panel-header .ant-calendar-month-panel-century-select, .ant-calendar-month-panel-header .ant-calendar-month-panel-decade-select, .ant-calendar-month-panel-header .ant-calendar-month-panel-year-select, .ant-calendar-month-panel-header .ant-calendar-month-panel-month-select {color: @heading-color;}
.ant-calendar-month-panel-header .ant-calendar-month-panel-prev-century-btn, .ant-calendar-month-panel-header .ant-calendar-month-panel-next-century-btn, .ant-calendar-month-panel-header .ant-calendar-month-panel-prev-decade-btn, .ant-calendar-month-panel-header .ant-calendar-month-panel-next-decade-btn, .ant-calendar-month-panel-header .ant-calendar-month-panel-prev-month-btn, .ant-calendar-month-panel-header .ant-calendar-month-panel-next-month-btn, .ant-calendar-month-panel-header .ant-calendar-month-panel-prev-year-btn, .ant-calendar-month-panel-header .ant-calendar-month-panel-next-year-btn {color: @text-color-secondary;}
.ant-calendar-month-panel-header .ant-calendar-month-panel-prev-century-btn::before, .ant-calendar-month-panel-header .ant-calendar-month-panel-prev-decade-btn::before, .ant-calendar-month-panel-header .ant-calendar-month-panel-prev-year-btn::before, .ant-calendar-month-panel-header .ant-calendar-month-panel-prev-century-btn::after, .ant-calendar-month-panel-header .ant-calendar-month-panel-prev-decade-btn::after, .ant-calendar-month-panel-header .ant-calendar-month-panel-prev-year-btn::after {border: 0 solid #aaa;border-width: 1.5px 0 0 1.5px;border-radius: 1px;}
.ant-calendar-month-panel-header .ant-calendar-month-panel-prev-century-btn:hover::before, .ant-calendar-month-panel-header .ant-calendar-month-panel-prev-decade-btn:hover::before, .ant-calendar-month-panel-header .ant-calendar-month-panel-prev-year-btn:hover::before, .ant-calendar-month-panel-header .ant-calendar-month-panel-prev-century-btn:hover::after, .ant-calendar-month-panel-header .ant-calendar-month-panel-prev-decade-btn:hover::after, .ant-calendar-month-panel-header .ant-calendar-month-panel-prev-year-btn:hover::after {border-color: @text-color;}
.ant-calendar-month-panel-header .ant-calendar-month-panel-next-century-btn::before, .ant-calendar-month-panel-header .ant-calendar-month-panel-next-decade-btn::before, .ant-calendar-month-panel-header .ant-calendar-month-panel-next-year-btn::before, .ant-calendar-month-panel-header .ant-calendar-month-panel-next-century-btn::after, .ant-calendar-month-panel-header .ant-calendar-month-panel-next-decade-btn::after, .ant-calendar-month-panel-header .ant-calendar-month-panel-next-year-btn::after {border: 0 solid #aaa;border-width: 1.5px 0 0 1.5px;border-radius: 1px;}
.ant-calendar-month-panel-header .ant-calendar-month-panel-next-century-btn:hover::before, .ant-calendar-month-panel-header .ant-calendar-month-panel-next-decade-btn:hover::before, .ant-calendar-month-panel-header .ant-calendar-month-panel-next-year-btn:hover::before, .ant-calendar-month-panel-header .ant-calendar-month-panel-next-century-btn:hover::after, .ant-calendar-month-panel-header .ant-calendar-month-panel-next-decade-btn:hover::after, .ant-calendar-month-panel-header .ant-calendar-month-panel-next-year-btn:hover::after {border-color: @text-color;}
.ant-calendar-month-panel-header .ant-calendar-month-panel-prev-month-btn::before, .ant-calendar-month-panel-header .ant-calendar-month-panel-prev-month-btn::after {border: 0 solid #aaa;border-width: 1.5px 0 0 1.5px;border-radius: 1px;}
.ant-calendar-month-panel-header .ant-calendar-month-panel-prev-month-btn:hover::before, .ant-calendar-month-panel-header .ant-calendar-month-panel-prev-month-btn:hover::after {border-color: @text-color;}
.ant-calendar-month-panel-header .ant-calendar-month-panel-next-month-btn::before, .ant-calendar-month-panel-header .ant-calendar-month-panel-next-month-btn::after {border: 0 solid #aaa;border-width: 1.5px 0 0 1.5px;border-radius: 1px;}
.ant-calendar-month-panel-header .ant-calendar-month-panel-next-month-btn:hover::before, .ant-calendar-month-panel-header .ant-calendar-month-panel-next-month-btn:hover::after {border-color: @text-color;}
.ant-calendar-month-panel-footer {border-top: 1px solid #e8e8e8;}
.ant-calendar-month-panel-table {border-collapse: separate;}
.ant-calendar-month-panel-selected-cell .ant-calendar-month-panel-month {color: #fff;background: @primary-color;}
.ant-calendar-month-panel-selected-cell .ant-calendar-month-panel-month:hover {color: #fff;background: @primary-color;}
.ant-calendar-month-panel-cell-disabled .ant-calendar-month-panel-month, .ant-calendar-month-panel-cell-disabled .ant-calendar-month-panel-month:hover {color: rgba(0, 0, 0, 0.25);background: #f5f5f5;}
.ant-calendar-month-panel-month {color: @text-color;background: transparent;border-radius: 2px;}
.ant-calendar-month-panel-month:hover {background: color(~\`colorPalette("@{primary-color}", 1)\`);}
.ant-calendar-year-panel {background: #fff;border-radius: 4px;}
.ant-calendar-year-panel-header {border-bottom: 1px solid #e8e8e8;}
.ant-calendar-year-panel-header a:hover {color: color(~\`colorPalette("@{primary-color}", 5)\`);}
.ant-calendar-year-panel-header .ant-calendar-year-panel-century-select, .ant-calendar-year-panel-header .ant-calendar-year-panel-decade-select, .ant-calendar-year-panel-header .ant-calendar-year-panel-year-select, .ant-calendar-year-panel-header .ant-calendar-year-panel-month-select {color: @heading-color;}
.ant-calendar-year-panel-header .ant-calendar-year-panel-prev-century-btn, .ant-calendar-year-panel-header .ant-calendar-year-panel-next-century-btn, .ant-calendar-year-panel-header .ant-calendar-year-panel-prev-decade-btn, .ant-calendar-year-panel-header .ant-calendar-year-panel-next-decade-btn, .ant-calendar-year-panel-header .ant-calendar-year-panel-prev-month-btn, .ant-calendar-year-panel-header .ant-calendar-year-panel-next-month-btn, .ant-calendar-year-panel-header .ant-calendar-year-panel-prev-year-btn, .ant-calendar-year-panel-header .ant-calendar-year-panel-next-year-btn {color: @text-color-secondary;}
.ant-calendar-year-panel-header .ant-calendar-year-panel-prev-century-btn::before, .ant-calendar-year-panel-header .ant-calendar-year-panel-prev-decade-btn::before, .ant-calendar-year-panel-header .ant-calendar-year-panel-prev-year-btn::before, .ant-calendar-year-panel-header .ant-calendar-year-panel-prev-century-btn::after, .ant-calendar-year-panel-header .ant-calendar-year-panel-prev-decade-btn::after, .ant-calendar-year-panel-header .ant-calendar-year-panel-prev-year-btn::after {border: 0 solid #aaa;border-width: 1.5px 0 0 1.5px;border-radius: 1px;}
.ant-calendar-year-panel-header .ant-calendar-year-panel-prev-century-btn:hover::before, .ant-calendar-year-panel-header .ant-calendar-year-panel-prev-decade-btn:hover::before, .ant-calendar-year-panel-header .ant-calendar-year-panel-prev-year-btn:hover::before, .ant-calendar-year-panel-header .ant-calendar-year-panel-prev-century-btn:hover::after, .ant-calendar-year-panel-header .ant-calendar-year-panel-prev-decade-btn:hover::after, .ant-calendar-year-panel-header .ant-calendar-year-panel-prev-year-btn:hover::after {border-color: @text-color;}
.ant-calendar-year-panel-header .ant-calendar-year-panel-next-century-btn::before, .ant-calendar-year-panel-header .ant-calendar-year-panel-next-decade-btn::before, .ant-calendar-year-panel-header .ant-calendar-year-panel-next-year-btn::before, .ant-calendar-year-panel-header .ant-calendar-year-panel-next-century-btn::after, .ant-calendar-year-panel-header .ant-calendar-year-panel-next-decade-btn::after, .ant-calendar-year-panel-header .ant-calendar-year-panel-next-year-btn::after {border: 0 solid #aaa;border-width: 1.5px 0 0 1.5px;border-radius: 1px;}
.ant-calendar-year-panel-header .ant-calendar-year-panel-next-century-btn:hover::before, .ant-calendar-year-panel-header .ant-calendar-year-panel-next-decade-btn:hover::before, .ant-calendar-year-panel-header .ant-calendar-year-panel-next-year-btn:hover::before, .ant-calendar-year-panel-header .ant-calendar-year-panel-next-century-btn:hover::after, .ant-calendar-year-panel-header .ant-calendar-year-panel-next-decade-btn:hover::after, .ant-calendar-year-panel-header .ant-calendar-year-panel-next-year-btn:hover::after {border-color: @text-color;}
.ant-calendar-year-panel-header .ant-calendar-year-panel-prev-month-btn::before, .ant-calendar-year-panel-header .ant-calendar-year-panel-prev-month-btn::after {border: 0 solid #aaa;border-width: 1.5px 0 0 1.5px;border-radius: 1px;}
.ant-calendar-year-panel-header .ant-calendar-year-panel-prev-month-btn:hover::before, .ant-calendar-year-panel-header .ant-calendar-year-panel-prev-month-btn:hover::after {border-color: @text-color;}
.ant-calendar-year-panel-header .ant-calendar-year-panel-next-month-btn::before, .ant-calendar-year-panel-header .ant-calendar-year-panel-next-month-btn::after {border: 0 solid #aaa;border-width: 1.5px 0 0 1.5px;border-radius: 1px;}
.ant-calendar-year-panel-header .ant-calendar-year-panel-next-month-btn:hover::before, .ant-calendar-year-panel-header .ant-calendar-year-panel-next-month-btn:hover::after {border-color: @text-color;}
.ant-calendar-year-panel-footer {border-top: 1px solid #e8e8e8;}
.ant-calendar-year-panel-table {border-collapse: separate;}
.ant-calendar-year-panel-year {color: @text-color;background: transparent;border-radius: 2px;}
.ant-calendar-year-panel-year:hover {background: color(~\`colorPalette("@{primary-color}", 1)\`);}
.ant-calendar-year-panel-selected-cell .ant-calendar-year-panel-year {color: #fff;background: @primary-color;}
.ant-calendar-year-panel-selected-cell .ant-calendar-year-panel-year:hover {color: #fff;background: @primary-color;}
.ant-calendar-year-panel-last-decade-cell .ant-calendar-year-panel-year, .ant-calendar-year-panel-next-decade-cell .ant-calendar-year-panel-year {color: rgba(0, 0, 0, 0.25);}
.ant-calendar-decade-panel {background: #fff;border-radius: 4px;}
.ant-calendar-decade-panel-header {border-bottom: 1px solid #e8e8e8;}
.ant-calendar-decade-panel-header a:hover {color: color(~\`colorPalette("@{primary-color}", 5)\`);}
.ant-calendar-decade-panel-header .ant-calendar-decade-panel-century-select, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-decade-select, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-year-select, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-month-select {color: @heading-color;}
.ant-calendar-decade-panel-header .ant-calendar-decade-panel-prev-century-btn, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-next-century-btn, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-prev-decade-btn, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-next-decade-btn, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-prev-month-btn, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-next-month-btn, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-prev-year-btn, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-next-year-btn {color: @text-color-secondary;}
.ant-calendar-decade-panel-header .ant-calendar-decade-panel-prev-century-btn::before, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-prev-decade-btn::before, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-prev-year-btn::before, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-prev-century-btn::after, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-prev-decade-btn::after, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-prev-year-btn::after {border: 0 solid #aaa;border-width: 1.5px 0 0 1.5px;border-radius: 1px;}
.ant-calendar-decade-panel-header .ant-calendar-decade-panel-prev-century-btn:hover::before, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-prev-decade-btn:hover::before, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-prev-year-btn:hover::before, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-prev-century-btn:hover::after, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-prev-decade-btn:hover::after, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-prev-year-btn:hover::after {border-color: @text-color;}
.ant-calendar-decade-panel-header .ant-calendar-decade-panel-next-century-btn::before, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-next-decade-btn::before, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-next-year-btn::before, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-next-century-btn::after, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-next-decade-btn::after, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-next-year-btn::after {border: 0 solid #aaa;border-width: 1.5px 0 0 1.5px;border-radius: 1px;}
.ant-calendar-decade-panel-header .ant-calendar-decade-panel-next-century-btn:hover::before, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-next-decade-btn:hover::before, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-next-year-btn:hover::before, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-next-century-btn:hover::after, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-next-decade-btn:hover::after, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-next-year-btn:hover::after {border-color: @text-color;}
.ant-calendar-decade-panel-header .ant-calendar-decade-panel-prev-month-btn::before, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-prev-month-btn::after {border: 0 solid #aaa;border-width: 1.5px 0 0 1.5px;border-radius: 1px;}
.ant-calendar-decade-panel-header .ant-calendar-decade-panel-prev-month-btn:hover::before, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-prev-month-btn:hover::after {border-color: @text-color;}
.ant-calendar-decade-panel-header .ant-calendar-decade-panel-next-month-btn::before, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-next-month-btn::after {border: 0 solid #aaa;border-width: 1.5px 0 0 1.5px;border-radius: 1px;}
.ant-calendar-decade-panel-header .ant-calendar-decade-panel-next-month-btn:hover::before, .ant-calendar-decade-panel-header .ant-calendar-decade-panel-next-month-btn:hover::after {border-color: @text-color;}
.ant-calendar-decade-panel-footer {border-top: 1px solid #e8e8e8;}
.ant-calendar-decade-panel-table {border-collapse: separate;}
.ant-calendar-decade-panel-decade {color: @text-color;background: transparent;border-radius: 2px;}
.ant-calendar-decade-panel-decade:hover {background: color(~\`colorPalette("@{primary-color}", 1)\`);}
.ant-calendar-decade-panel-selected-cell .ant-calendar-decade-panel-decade {color: #fff;background: @primary-color;}
.ant-calendar-decade-panel-selected-cell .ant-calendar-decade-panel-decade:hover {color: #fff;background: @primary-color;}
.ant-calendar-decade-panel-last-century-cell .ant-calendar-decade-panel-decade, .ant-calendar-decade-panel-next-century-cell .ant-calendar-decade-panel-decade {color: rgba(0, 0, 0, 0.25);}
.ant-calendar-week-number .ant-calendar-body tr:hover {background: color(~\`colorPalette("@{primary-color}", 1)\`);}
.ant-calendar-week-number .ant-calendar-body tr.ant-calendar-active-week {background: color(~\`colorPalette("@{primary-color}", 2)\`);}
.ant-calendar-week-number .ant-calendar-body tr .ant-calendar-selected-day .ant-calendar-date, .ant-calendar-week-number .ant-calendar-body tr .ant-calendar-selected-day:hover .ant-calendar-date {color: @text-color;background: transparent;}
.ant-descriptions-title {color: @heading-color;}
.ant-descriptions-view {border-radius: 4px;}
.ant-descriptions-row:last-child {border-bottom: none;}
.ant-descriptions-item-label {color: @heading-color;}
.ant-descriptions-item-content {color: @text-color;}
.ant-descriptions-bordered .ant-descriptions-view {border: 1px solid #e8e8e8;}
.ant-descriptions-bordered .ant-descriptions-item-label, .ant-descriptions-bordered .ant-descriptions-item-content {border-right: 1px solid #e8e8e8;}
.ant-descriptions-bordered .ant-descriptions-item-label:last-child, .ant-descriptions-bordered .ant-descriptions-item-content:last-child {border-right: none;}
.ant-descriptions-bordered .ant-descriptions-item-label {background-color: #fafafa;}
.ant-descriptions-bordered .ant-descriptions-row {border-bottom: 1px solid #e8e8e8;}
.ant-descriptions-bordered .ant-descriptions-row:last-child {border-bottom: none;}
.ant-divider {color: @text-color;background: #e8e8e8;}
.ant-divider-horizontal.ant-divider-with-text-center, .ant-divider-horizontal.ant-divider-with-text-left, .ant-divider-horizontal.ant-divider-with-text-right {color: @heading-color;background: transparent;}
.ant-divider-horizontal.ant-divider-with-text-center::before, .ant-divider-horizontal.ant-divider-with-text-left::before, .ant-divider-horizontal.ant-divider-with-text-right::before, .ant-divider-horizontal.ant-divider-with-text-center::after, .ant-divider-horizontal.ant-divider-with-text-left::after, .ant-divider-horizontal.ant-divider-with-text-right::after {border-top: 1px solid #e8e8e8;}
.ant-divider-dashed {background: none;border-color: #e8e8e8;border-style: dashed;border-width: 1px 0 0;}
.ant-divider-horizontal.ant-divider-with-text-center.ant-divider-dashed, .ant-divider-horizontal.ant-divider-with-text-left.ant-divider-dashed, .ant-divider-horizontal.ant-divider-with-text-right.ant-divider-dashed {border-top: 0;}
.ant-divider-horizontal.ant-divider-with-text-center.ant-divider-dashed::before, .ant-divider-horizontal.ant-divider-with-text-left.ant-divider-dashed::before, .ant-divider-horizontal.ant-divider-with-text-right.ant-divider-dashed::before, .ant-divider-horizontal.ant-divider-with-text-center.ant-divider-dashed::after, .ant-divider-horizontal.ant-divider-with-text-left.ant-divider-dashed::after, .ant-divider-horizontal.ant-divider-with-text-right.ant-divider-dashed::after {border-style: dashed none none;}
.ant-divider-vertical.ant-divider-dashed {border-width: 0 0 0 1px;}
.ant-drawer-left.ant-drawer-open .ant-drawer-content-wrapper {box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);}
.ant-drawer-right.ant-drawer-open .ant-drawer-content-wrapper {box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);}
.ant-drawer-top.ant-drawer-open .ant-drawer-content-wrapper {box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);}
.ant-drawer-bottom.ant-drawer-open .ant-drawer-content-wrapper {box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.15);}
.ant-drawer-title {color: @heading-color;}
.ant-drawer-content {background-color: #fff;background-clip: padding-box;border: 0;}
.ant-drawer-close {color: @text-color-secondary;background: transparent;border: 0;}
.ant-drawer-close:focus, .ant-drawer-close:hover {color: rgba(0, 0, 0, 0.75);}
.ant-drawer-header {color: @text-color;background: #fff;border-bottom: 1px solid #e8e8e8;border-radius: 4px 4px 0 0;}
.ant-drawer-header-no-title {color: @text-color;background: #fff;}
.ant-drawer-mask {background-color: rgba(0, 0, 0, 0.45);}
.ant-drawer-open-content {box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);}
.ant-dropdown {color: @text-color;}
.ant-dropdown-menu {background-color: #fff;background-clip: padding-box;border-radius: 4px;box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);}
.ant-dropdown-menu-item-group-title {color: @text-color-secondary;}
.ant-dropdown-menu-item, .ant-dropdown-menu-submenu-title {color: @text-color;}
.ant-dropdown-menu-item > a, .ant-dropdown-menu-submenu-title > a {color: @text-color;}
.ant-dropdown-menu-item-selected, .ant-dropdown-menu-submenu-title-selected, .ant-dropdown-menu-item-selected > a, .ant-dropdown-menu-submenu-title-selected > a {color: @primary-color;background-color: color(~\`colorPalette("@{primary-color}", 1)\`);}
.ant-dropdown-menu-item:hover, .ant-dropdown-menu-submenu-title:hover {background-color: color(~\`colorPalette("@{primary-color}", 1)\`);}
.ant-dropdown-menu-item-disabled, .ant-dropdown-menu-submenu-title-disabled {color: rgba(0, 0, 0, 0.25);}
.ant-dropdown-menu-item-disabled:hover, .ant-dropdown-menu-submenu-title-disabled:hover {color: rgba(0, 0, 0, 0.25);background-color: #fff;}
.ant-dropdown-menu-item-divider, .ant-dropdown-menu-submenu-title-divider {background-color: #e8e8e8;}
.ant-dropdown-menu-item .ant-dropdown-menu-submenu-arrow-icon, .ant-dropdown-menu-submenu-title .ant-dropdown-menu-submenu-arrow-icon {color: @text-color-secondary;}
.ant-dropdown-menu-submenu.ant-dropdown-menu-submenu-disabled .ant-dropdown-menu-submenu-title, .ant-dropdown-menu-submenu.ant-dropdown-menu-submenu-disabled .ant-dropdown-menu-submenu-title .ant-dropdown-menu-submenu-arrow-icon {color: rgba(0, 0, 0, 0.25);background-color: #fff;}
.ant-dropdown-menu-submenu-selected .ant-dropdown-menu-submenu-title {color: @primary-color;}
.ant-dropdown-menu-dark, .ant-dropdown-menu-dark .ant-dropdown-menu {background: @layout-header-background;}
.ant-dropdown-menu-dark .ant-dropdown-menu-item, .ant-dropdown-menu-dark .ant-dropdown-menu-submenu-title, .ant-dropdown-menu-dark .ant-dropdown-menu-item > a {color: rgba(255, 255, 255, 0.65);}
.ant-dropdown-menu-dark .ant-dropdown-menu-item .ant-dropdown-menu-submenu-arrow::after, .ant-dropdown-menu-dark .ant-dropdown-menu-submenu-title .ant-dropdown-menu-submenu-arrow::after, .ant-dropdown-menu-dark .ant-dropdown-menu-item > a .ant-dropdown-menu-submenu-arrow::after {color: rgba(255, 255, 255, 0.65);}
.ant-dropdown-menu-dark .ant-dropdown-menu-item:hover, .ant-dropdown-menu-dark .ant-dropdown-menu-submenu-title:hover, .ant-dropdown-menu-dark .ant-dropdown-menu-item > a:hover {color: #fff;background: transparent;}
.ant-dropdown-menu-dark .ant-dropdown-menu-item-selected, .ant-dropdown-menu-dark .ant-dropdown-menu-item-selected:hover, .ant-dropdown-menu-dark .ant-dropdown-menu-item-selected > a {color: #fff;background: @primary-color;}
.ant-empty-normal {color: rgba(0, 0, 0, 0.25);}
.ant-empty-small {color: rgba(0, 0, 0, 0.25);}
.ant-form {color: @text-color;}
.ant-form legend {color: @text-color-secondary;border: 0;border-bottom: 1px solid #d9d9d9;}
.ant-form output {color: @text-color;}
.ant-form legend {color: @text-color-secondary;border: 0;border-bottom: 1px solid #d9d9d9;}
.ant-form output {color: @text-color;}
.ant-form-item-required::before {color: #f5222d;}
.ant-form-item-label > label {color: @heading-color;}
.ant-form-item {color: @text-color;}
.ant-form-explain, .ant-form-extra {color: @text-color-secondary;}
form .ant-upload {background: transparent;}
.has-success.has-feedback .ant-form-item-children-icon {color: #52c41a;}
.has-warning .ant-form-explain, .has-warning .ant-form-split {color: #faad14;}
.has-warning .ant-input, .has-warning .ant-input:hover {background-color: #fff;border-color: #faad14;}
.has-warning .ant-input:focus {border-color: #ffc53d;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(250, 173, 20, 0.2);}
.has-warning .ant-input:not([disabled]):hover {border-color: #faad14;}
.has-warning .ant-calendar-picker-open .ant-calendar-picker-input {border-color: #ffc53d;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(250, 173, 20, 0.2);}
.has-warning .ant-input-affix-wrapper .ant-input, .has-warning .ant-input-affix-wrapper .ant-input:hover {background-color: #fff;border-color: #faad14;}
.has-warning .ant-input-affix-wrapper .ant-input:focus {border-color: #ffc53d;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(250, 173, 20, 0.2);}
.has-warning .ant-input-affix-wrapper:hover .ant-input:not(.ant-input-disabled) {border-color: #faad14;}
.has-warning .ant-input-prefix {color: #faad14;}
.has-warning .ant-input-group-addon {color: #faad14;background-color: #fff;border-color: #faad14;}
.has-warning .has-feedback {color: #faad14;}
.has-warning .ant-form-explain, .has-warning .ant-form-split {color: #faad14;}
.has-warning .ant-input, .has-warning .ant-input:hover {background-color: #fff;border-color: #faad14;}
.has-warning .ant-input:focus {border-color: #ffc53d;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(250, 173, 20, 0.2);}
.has-warning .ant-input:not([disabled]):hover {border-color: #faad14;}
.has-warning .ant-calendar-picker-open .ant-calendar-picker-input {border-color: #ffc53d;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(250, 173, 20, 0.2);}
.has-warning .ant-input-affix-wrapper .ant-input, .has-warning .ant-input-affix-wrapper .ant-input:hover {background-color: #fff;border-color: #faad14;}
.has-warning .ant-input-affix-wrapper .ant-input:focus {border-color: #ffc53d;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(250, 173, 20, 0.2);}
.has-warning .ant-input-affix-wrapper:hover .ant-input:not(.ant-input-disabled) {border-color: #faad14;}
.has-warning .ant-input-prefix {color: #faad14;}
.has-warning .ant-input-group-addon {color: #faad14;background-color: #fff;border-color: #faad14;}
.has-warning .has-feedback {color: #faad14;}
.has-warning.has-feedback .ant-form-item-children-icon {color: #faad14;}
.has-warning .ant-select-selection {border-color: #faad14;}
.has-warning .ant-select-selection:hover {border-color: #faad14;}
.has-warning .ant-select-open .ant-select-selection, .has-warning .ant-select-focused .ant-select-selection {border-color: #ffc53d;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(250, 173, 20, 0.2);}
.has-warning .ant-calendar-picker-icon::after, .has-warning .ant-time-picker-icon::after, .has-warning .ant-picker-icon::after, .has-warning .ant-select-arrow, .has-warning .ant-cascader-picker-arrow {color: #faad14;}
.has-warning .ant-input-number, .has-warning .ant-time-picker-input {border-color: #faad14;}
.has-warning .ant-input-number-focused, .has-warning .ant-time-picker-input-focused, .has-warning .ant-input-number:focus, .has-warning .ant-time-picker-input:focus {border-color: #ffc53d;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(250, 173, 20, 0.2);}
.has-warning .ant-input-number:not([disabled]):hover, .has-warning .ant-time-picker-input:not([disabled]):hover {border-color: #faad14;}
.has-warning .ant-cascader-picker:focus .ant-cascader-input {border-color: #ffc53d;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(250, 173, 20, 0.2);}
.has-warning .ant-cascader-picker:hover .ant-cascader-input {border-color: #faad14;}
.has-error .ant-form-explain, .has-error .ant-form-split {color: #f5222d;}
.has-error .ant-input, .has-error .ant-input:hover {background-color: #fff;border-color: #f5222d;}
.has-error .ant-input:focus {border-color: #ff4d4f;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2);}
.has-error .ant-input:not([disabled]):hover {border-color: #f5222d;}
.has-error .ant-calendar-picker-open .ant-calendar-picker-input {border-color: #ff4d4f;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2);}
.has-error .ant-input-affix-wrapper .ant-input, .has-error .ant-input-affix-wrapper .ant-input:hover {background-color: #fff;border-color: #f5222d;}
.has-error .ant-input-affix-wrapper .ant-input:focus {border-color: #ff4d4f;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2);}
.has-error .ant-input-affix-wrapper:hover .ant-input:not(.ant-input-disabled) {border-color: #f5222d;}
.has-error .ant-input-prefix {color: #f5222d;}
.has-error .ant-input-group-addon {color: #f5222d;background-color: #fff;border-color: #f5222d;}
.has-error .has-feedback {color: #f5222d;}
.has-error .ant-form-explain, .has-error .ant-form-split {color: #f5222d;}
.has-error .ant-input, .has-error .ant-input:hover {background-color: #fff;border-color: #f5222d;}
.has-error .ant-input:focus {border-color: #ff4d4f;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2);}
.has-error .ant-input:not([disabled]):hover {border-color: #f5222d;}
.has-error .ant-calendar-picker-open .ant-calendar-picker-input {border-color: #ff4d4f;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2);}
.has-error .ant-input-affix-wrapper .ant-input, .has-error .ant-input-affix-wrapper .ant-input:hover {background-color: #fff;border-color: #f5222d;}
.has-error .ant-input-affix-wrapper .ant-input:focus {border-color: #ff4d4f;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2);}
.has-error .ant-input-affix-wrapper:hover .ant-input:not(.ant-input-disabled) {border-color: #f5222d;}
.has-error .ant-input-prefix {color: #f5222d;}
.has-error .ant-input-group-addon {color: #f5222d;background-color: #fff;border-color: #f5222d;}
.has-error .has-feedback {color: #f5222d;}
.has-error.has-feedback .ant-form-item-children-icon {color: #f5222d;}
.has-error .ant-select-selection {border-color: #f5222d;}
.has-error .ant-select-selection:hover {border-color: #f5222d;}
.has-error .ant-select-open .ant-select-selection, .has-error .ant-select-focused .ant-select-selection {border-color: #ff4d4f;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2);}
.has-error .ant-select.ant-select-auto-complete .ant-input:focus {border-color: #f5222d;}
.has-error .ant-input-group-addon .ant-select-selection {border-color: transparent;box-shadow: none;}
.has-error .ant-calendar-picker-icon::after, .has-error .ant-time-picker-icon::after, .has-error .ant-picker-icon::after, .has-error .ant-select-arrow, .has-error .ant-cascader-picker-arrow {color: #f5222d;}
.has-error .ant-input-number, .has-error .ant-time-picker-input {border-color: #f5222d;}
.has-error .ant-input-number-focused, .has-error .ant-time-picker-input-focused, .has-error .ant-input-number:focus, .has-error .ant-time-picker-input:focus {border-color: #ff4d4f;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2);}
.has-error .ant-input-number:not([disabled]):hover, .has-error .ant-time-picker-input:not([disabled]):hover {border-color: #f5222d;}
.has-error .ant-mention-wrapper .ant-mention-editor, .has-error .ant-mention-wrapper .ant-mention-editor:not([disabled]):hover {border-color: #f5222d;}
.has-error .ant-mention-wrapper.ant-mention-active:not([disabled]) .ant-mention-editor, .has-error .ant-mention-wrapper .ant-mention-editor:not([disabled]):focus {border-color: #ff4d4f;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2);}
.has-error .ant-cascader-picker:focus .ant-cascader-input {border-color: #ff4d4f;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2);}
.has-error .ant-cascader-picker:hover .ant-cascader-input {border-color: #f5222d;}
.has-error .ant-transfer-list {border-color: #f5222d;}
.has-error .ant-transfer-list-search:not([disabled]) {border-color: #d9d9d9;}
.has-error .ant-transfer-list-search:not([disabled]):hover {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);border-right-width: 1px !important;}
.has-error .ant-transfer-list-search:not([disabled]):focus {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(90, 105, 46, 0.2);}
.is-validating.has-feedback .ant-form-item-children-icon {color: @primary-color;}
.ant-form {color: @text-color;}
.ant-form legend {color: @text-color-secondary;border: 0;border-bottom: 1px solid #d9d9d9;}
.ant-form output {color: @text-color;}
.ant-form legend {color: @text-color-secondary;border: 0;border-bottom: 1px solid #d9d9d9;}
.ant-form output {color: @text-color;}
.ant-form-item-required::before {color: #f5222d;}
.ant-form-item-label > label {color: @heading-color;}
.ant-form-item {color: @text-color;}
.ant-form-explain, .ant-form-extra {color: @text-color-secondary;}
form .ant-upload {background: transparent;}
.has-success.has-feedback .ant-form-item-children-icon {color: #52c41a;}
.has-warning .ant-form-explain, .has-warning .ant-form-split {color: #faad14;}
.has-warning .ant-input, .has-warning .ant-input:hover {background-color: #fff;border-color: #faad14;}
.has-warning .ant-input:focus {border-color: #ffc53d;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(250, 173, 20, 0.2);}
.has-warning .ant-input:not([disabled]):hover {border-color: #faad14;}
.has-warning .ant-calendar-picker-open .ant-calendar-picker-input {border-color: #ffc53d;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(250, 173, 20, 0.2);}
.has-warning .ant-input-affix-wrapper .ant-input, .has-warning .ant-input-affix-wrapper .ant-input:hover {background-color: #fff;border-color: #faad14;}
.has-warning .ant-input-affix-wrapper .ant-input:focus {border-color: #ffc53d;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(250, 173, 20, 0.2);}
.has-warning .ant-input-affix-wrapper:hover .ant-input:not(.ant-input-disabled) {border-color: #faad14;}
.has-warning .ant-input-prefix {color: #faad14;}
.has-warning .ant-input-group-addon {color: #faad14;background-color: #fff;border-color: #faad14;}
.has-warning .has-feedback {color: #faad14;}
.has-warning .ant-form-explain, .has-warning .ant-form-split {color: #faad14;}
.has-warning .ant-input, .has-warning .ant-input:hover {background-color: #fff;border-color: #faad14;}
.has-warning .ant-input:focus {border-color: #ffc53d;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(250, 173, 20, 0.2);}
.has-warning .ant-input:not([disabled]):hover {border-color: #faad14;}
.has-warning .ant-calendar-picker-open .ant-calendar-picker-input {border-color: #ffc53d;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(250, 173, 20, 0.2);}
.has-warning .ant-input-affix-wrapper .ant-input, .has-warning .ant-input-affix-wrapper .ant-input:hover {background-color: #fff;border-color: #faad14;}
.has-warning .ant-input-affix-wrapper .ant-input:focus {border-color: #ffc53d;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(250, 173, 20, 0.2);}
.has-warning .ant-input-affix-wrapper:hover .ant-input:not(.ant-input-disabled) {border-color: #faad14;}
.has-warning .ant-input-prefix {color: #faad14;}
.has-warning .ant-input-group-addon {color: #faad14;background-color: #fff;border-color: #faad14;}
.has-warning .has-feedback {color: #faad14;}
.has-warning.has-feedback .ant-form-item-children-icon {color: #faad14;}
.has-warning .ant-select-selection {border-color: #faad14;}
.has-warning .ant-select-selection:hover {border-color: #faad14;}
.has-warning .ant-select-open .ant-select-selection, .has-warning .ant-select-focused .ant-select-selection {border-color: #ffc53d;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(250, 173, 20, 0.2);}
.has-warning .ant-calendar-picker-icon::after, .has-warning .ant-time-picker-icon::after, .has-warning .ant-picker-icon::after, .has-warning .ant-select-arrow, .has-warning .ant-cascader-picker-arrow {color: #faad14;}
.has-warning .ant-input-number, .has-warning .ant-time-picker-input {border-color: #faad14;}
.has-warning .ant-input-number-focused, .has-warning .ant-time-picker-input-focused, .has-warning .ant-input-number:focus, .has-warning .ant-time-picker-input:focus {border-color: #ffc53d;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(250, 173, 20, 0.2);}
.has-warning .ant-input-number:not([disabled]):hover, .has-warning .ant-time-picker-input:not([disabled]):hover {border-color: #faad14;}
.has-warning .ant-cascader-picker:focus .ant-cascader-input {border-color: #ffc53d;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(250, 173, 20, 0.2);}
.has-warning .ant-cascader-picker:hover .ant-cascader-input {border-color: #faad14;}
.has-error .ant-form-explain, .has-error .ant-form-split {color: #f5222d;}
.has-error .ant-input, .has-error .ant-input:hover {background-color: #fff;border-color: #f5222d;}
.has-error .ant-input:focus {border-color: #ff4d4f;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2);}
.has-error .ant-input:not([disabled]):hover {border-color: #f5222d;}
.has-error .ant-calendar-picker-open .ant-calendar-picker-input {border-color: #ff4d4f;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2);}
.has-error .ant-input-affix-wrapper .ant-input, .has-error .ant-input-affix-wrapper .ant-input:hover {background-color: #fff;border-color: #f5222d;}
.has-error .ant-input-affix-wrapper .ant-input:focus {border-color: #ff4d4f;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2);}
.has-error .ant-input-affix-wrapper:hover .ant-input:not(.ant-input-disabled) {border-color: #f5222d;}
.has-error .ant-input-prefix {color: #f5222d;}
.has-error .ant-input-group-addon {color: #f5222d;background-color: #fff;border-color: #f5222d;}
.has-error .has-feedback {color: #f5222d;}
.has-error .ant-form-explain, .has-error .ant-form-split {color: #f5222d;}
.has-error .ant-input, .has-error .ant-input:hover {background-color: #fff;border-color: #f5222d;}
.has-error .ant-input:focus {border-color: #ff4d4f;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2);}
.has-error .ant-input:not([disabled]):hover {border-color: #f5222d;}
.has-error .ant-calendar-picker-open .ant-calendar-picker-input {border-color: #ff4d4f;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2);}
.has-error .ant-input-affix-wrapper .ant-input, .has-error .ant-input-affix-wrapper .ant-input:hover {background-color: #fff;border-color: #f5222d;}
.has-error .ant-input-affix-wrapper .ant-input:focus {border-color: #ff4d4f;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2);}
.has-error .ant-input-affix-wrapper:hover .ant-input:not(.ant-input-disabled) {border-color: #f5222d;}
.has-error .ant-input-prefix {color: #f5222d;}
.has-error .ant-input-group-addon {color: #f5222d;background-color: #fff;border-color: #f5222d;}
.has-error .has-feedback {color: #f5222d;}
.has-error.has-feedback .ant-form-item-children-icon {color: #f5222d;}
.has-error .ant-select-selection {border-color: #f5222d;}
.has-error .ant-select-selection:hover {border-color: #f5222d;}
.has-error .ant-select-open .ant-select-selection, .has-error .ant-select-focused .ant-select-selection {border-color: #ff4d4f;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2);}
.has-error .ant-select.ant-select-auto-complete .ant-input:focus {border-color: #f5222d;}
.has-error .ant-input-group-addon .ant-select-selection {border-color: transparent;box-shadow: none;}
.has-error .ant-calendar-picker-icon::after, .has-error .ant-time-picker-icon::after, .has-error .ant-picker-icon::after, .has-error .ant-select-arrow, .has-error .ant-cascader-picker-arrow {color: #f5222d;}
.has-error .ant-input-number, .has-error .ant-time-picker-input {border-color: #f5222d;}
.has-error .ant-input-number-focused, .has-error .ant-time-picker-input-focused, .has-error .ant-input-number:focus, .has-error .ant-time-picker-input:focus {border-color: #ff4d4f;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2);}
.has-error .ant-input-number:not([disabled]):hover, .has-error .ant-time-picker-input:not([disabled]):hover {border-color: #f5222d;}
.has-error .ant-mention-wrapper .ant-mention-editor, .has-error .ant-mention-wrapper .ant-mention-editor:not([disabled]):hover {border-color: #f5222d;}
.has-error .ant-mention-wrapper.ant-mention-active:not([disabled]) .ant-mention-editor, .has-error .ant-mention-wrapper .ant-mention-editor:not([disabled]):focus {border-color: #ff4d4f;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2);}
.has-error .ant-cascader-picker:focus .ant-cascader-input {border-color: #ff4d4f;border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2);}
.has-error .ant-cascader-picker:hover .ant-cascader-input {border-color: #f5222d;}
.has-error .ant-transfer-list {border-color: #f5222d;}
.has-error .ant-transfer-list-search:not([disabled]) {border-color: #d9d9d9;}
.has-error .ant-transfer-list-search:not([disabled]):hover {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);border-right-width: 1px !important;}
.has-error .ant-transfer-list-search:not([disabled]):focus {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(90, 105, 46, 0.2);}
.is-validating.has-feedback .ant-form-item-children-icon {color: @primary-color;}
.ant-input {color: @text-color;background-color: #fff;background-image: none;border: 1px solid #d9d9d9;border-radius: 4px;}
.ant-input::-moz-placeholder {color: #bfbfbf;}
.ant-input:-ms-input-placeholder {color: #bfbfbf;}
.ant-input::-webkit-input-placeholder {color: #bfbfbf;}
.ant-input:hover {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);border-right-width: 1px !important;}
.ant-input:focus {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(90, 105, 46, 0.2);}
.ant-input-disabled {color: rgba(0, 0, 0, 0.25);background-color: #f5f5f5;}
.ant-input-disabled:hover {border-color: #d9d9d9;border-right-width: 1px !important;}
.ant-input[disabled] {color: rgba(0, 0, 0, 0.25);background-color: #f5f5f5;}
.ant-input[disabled]:hover {border-color: #d9d9d9;border-right-width: 1px !important;}
.ant-input-group {color: @text-color;border-collapse: separate;border-spacing: 0;}
.ant-input-group-addon:not(:first-child):not(:last-child), .ant-input-group-wrap:not(:first-child):not(:last-child), .ant-input-group > .ant-input:not(:first-child):not(:last-child) {border-radius: 0;}
.ant-input-group .ant-input:focus {border-right-width: 1px;}
.ant-input-group .ant-input:hover {border-right-width: 1px;}
.ant-input-group-addon {color: @text-color;background-color: #fafafa;border: 1px solid #d9d9d9;border-radius: 4px;}
.ant-input-group-addon .ant-select .ant-select-selection {background-color: inherit;border: 1px solid transparent;box-shadow: none;}
.ant-input-group-addon .ant-select-open .ant-select-selection, .ant-input-group-addon .ant-select-focused .ant-select-selection {color: @primary-color;}
.ant-input-group > .ant-input:first-child, .ant-input-group-addon:first-child {border-top-right-radius: 0;border-bottom-right-radius: 0;}
.ant-input-group > .ant-input:first-child .ant-select .ant-select-selection, .ant-input-group-addon:first-child .ant-select .ant-select-selection {border-top-right-radius: 0;border-bottom-right-radius: 0;}
.ant-input-group > .ant-input-affix-wrapper:not(:first-child) .ant-input {border-top-left-radius: 0;border-bottom-left-radius: 0;}
.ant-input-group > .ant-input-affix-wrapper:not(:last-child) .ant-input {border-top-right-radius: 0;border-bottom-right-radius: 0;}
.ant-input-group-addon:first-child {border-right: 0;}
.ant-input-group-addon:last-child {border-left: 0;}
.ant-input-group > .ant-input:last-child, .ant-input-group-addon:last-child {border-top-left-radius: 0;border-bottom-left-radius: 0;}
.ant-input-group > .ant-input:last-child .ant-select .ant-select-selection, .ant-input-group-addon:last-child .ant-select .ant-select-selection {border-top-left-radius: 0;border-bottom-left-radius: 0;}
.ant-input-group.ant-input-group-compact-addon:not(:first-child):not(:last-child), .ant-input-group.ant-input-group-compact-wrap:not(:first-child):not(:last-child), .ant-input-group.ant-input-group-compact > .ant-input:not(:first-child):not(:last-child) {border-right-width: 1px;}
.ant-input-group.ant-input-group-compact > * {border-radius: 0;}
.ant-input-group.ant-input-group-compact > *:not(:last-child) {border-right-width: 1px;}
.ant-input-group.ant-input-group-compact > .ant-select > .ant-select-selection, .ant-input-group.ant-input-group-compact > .ant-calendar-picker .ant-input, .ant-input-group.ant-input-group-compact > .ant-select-auto-complete .ant-input, .ant-input-group.ant-input-group-compact > .ant-cascader-picker .ant-input, .ant-input-group.ant-input-group-compact > .ant-mention-wrapper .ant-mention-editor, .ant-input-group.ant-input-group-compact > .ant-time-picker .ant-time-picker-input, .ant-input-group.ant-input-group-compact > .ant-input-group-wrapper .ant-input {border-right-width: 1px;border-radius: 0;}
.ant-input-group.ant-input-group-compact > *:first-child, .ant-input-group.ant-input-group-compact > .ant-select:first-child > .ant-select-selection, .ant-input-group.ant-input-group-compact > .ant-calendar-picker:first-child .ant-input, .ant-input-group.ant-input-group-compact > .ant-select-auto-complete:first-child .ant-input, .ant-input-group.ant-input-group-compact > .ant-cascader-picker:first-child .ant-input, .ant-input-group.ant-input-group-compact > .ant-mention-wrapper:first-child .ant-mention-editor, .ant-input-group.ant-input-group-compact > .ant-time-picker:first-child .ant-time-picker-input {border-top-left-radius: 4px;border-bottom-left-radius: 4px;}
.ant-input-group.ant-input-group-compact > *:last-child, .ant-input-group.ant-input-group-compact > .ant-select:last-child > .ant-select-selection, .ant-input-group.ant-input-group-compact > .ant-calendar-picker:last-child .ant-input, .ant-input-group.ant-input-group-compact > .ant-select-auto-complete:last-child .ant-input, .ant-input-group.ant-input-group-compact > .ant-cascader-picker:last-child .ant-input, .ant-input-group.ant-input-group-compact > .ant-cascader-picker-focused:last-child .ant-input, .ant-input-group.ant-input-group-compact > .ant-mention-wrapper:last-child .ant-mention-editor, .ant-input-group.ant-input-group-compact > .ant-time-picker:last-child .ant-time-picker-input {border-right-width: 1px;border-top-right-radius: 4px;border-bottom-right-radius: 4px;}
.ant-input-affix-wrapper {color: @text-color;}
.ant-input-affix-wrapper:hover .ant-input:not(.ant-input-disabled) {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);border-right-width: 1px !important;}
.ant-input-affix-wrapper .ant-input-prefix, .ant-input-affix-wrapper .ant-input-suffix {color: @text-color;}
.ant-input-affix-wrapper .ant-input-disabled ~ .ant-input-suffix .anticon {color: rgba(0, 0, 0, 0.25);}
.ant-input-password-icon {color: @text-color-secondary;}
.ant-input-password-icon:hover {color: #333;}
.ant-input-clear-icon {color: rgba(0, 0, 0, 0.25);}
.ant-input-clear-icon:hover {color: @text-color-secondary;}
.ant-input-clear-icon:active {color: @text-color;}
.ant-input-textarea-clear-icon {color: rgba(0, 0, 0, 0.25);}
.ant-input-textarea-clear-icon:hover {color: @text-color-secondary;}
.ant-input-textarea-clear-icon:active {color: @text-color;}
.ant-input-search-icon {color: @text-color-secondary;}
.ant-input-search-icon:hover {color: rgba(0, 0, 0, 0.8);}
.ant-input-search-enter-button input {border-right: 0;}
.ant-input-search-enter-button + .ant-input-group-addon, .ant-input-search-enter-button input + .ant-input-group-addon {border: 0;}
.ant-input-search-enter-button + .ant-input-group-addon .ant-input-search-button, .ant-input-search-enter-button input + .ant-input-group-addon .ant-input-search-button {border-top-left-radius: 0;border-bottom-left-radius: 0;}
.ant-input-number {color: @text-color;background-color: #fff;background-image: none;border: 1px solid #d9d9d9;border-radius: 4px;}
.ant-input-number::-moz-placeholder {color: #bfbfbf;}
.ant-input-number:-ms-input-placeholder {color: #bfbfbf;}
.ant-input-number::-webkit-input-placeholder {color: #bfbfbf;}
.ant-input-number:hover {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);border-right-width: 1px !important;}
.ant-input-number:focus {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(90, 105, 46, 0.2);}
.ant-input-number-disabled {color: rgba(0, 0, 0, 0.25);background-color: #f5f5f5;}
.ant-input-number-disabled:hover {border-color: #d9d9d9;border-right-width: 1px !important;}
.ant-input-number[disabled] {color: rgba(0, 0, 0, 0.25);background-color: #f5f5f5;}
.ant-input-number[disabled]:hover {border-color: #d9d9d9;border-right-width: 1px !important;}
.ant-input-number-handler {color: @text-color-secondary;}
.ant-input-number-handler:active {background: #f4f4f4;}
.ant-input-number-handler:hover .ant-input-number-handler-up-inner, .ant-input-number-handler:hover .ant-input-number-handler-down-inner {color: color(~\`colorPalette("@{primary-color}", 5)\`);}
.ant-input-number-handler-up-inner, .ant-input-number-handler-down-inner {color: inherit;color: @text-color-secondary;}
.ant-input-number:hover {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);border-right-width: 1px !important;}
.ant-input-number-focused {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(90, 105, 46, 0.2);}
.ant-input-number-disabled {color: rgba(0, 0, 0, 0.25);background-color: #f5f5f5;}
.ant-input-number-disabled:hover {border-color: #d9d9d9;border-right-width: 1px !important;}
.ant-input-number-input {background-color: transparent;border: 0;border-radius: 4px;}
.ant-input-number-input::-moz-placeholder {color: #bfbfbf;}
.ant-input-number-input:-ms-input-placeholder {color: #bfbfbf;}
.ant-input-number-input::-webkit-input-placeholder {color: #bfbfbf;}
.ant-input-number-handler-wrap {background: #fff;border-left: 1px solid #d9d9d9;border-radius: 0 4px 4px 0;}
.ant-input-number-handler-up {border-top-right-radius: 4px;}
.ant-input-number-handler-down {border-top: 1px solid #d9d9d9;border-bottom-right-radius: 4px;}
.ant-input-number-handler-up-disabled:hover .ant-input-number-handler-up-inner, .ant-input-number-handler-down-disabled:hover .ant-input-number-handler-down-inner {color: rgba(0, 0, 0, 0.25);}
.ant-layout {background: @layout-body-background;}
.ant-layout-header {background: @layout-header-background;}
.ant-layout-footer {color: @text-color;background: @layout-body-background;}
.ant-layout-sider {background: @layout-header-background;}
.ant-layout-sider-trigger {color: #fff;background: #002140;}
.ant-layout-sider-zero-width-trigger {color: #fff;background: @layout-header-background;border-radius: 0 4px 4px 0;}
.ant-layout-sider-zero-width-trigger:hover {background: #db6bfc;}
.ant-layout-sider-zero-width-trigger-right {border-radius: 4px 0 0 4px;}
.ant-layout-sider-light {background: #fff;}
.ant-layout-sider-light .ant-layout-sider-trigger {color: @text-color;background: #fff;}
.ant-layout-sider-light .ant-layout-sider-zero-width-trigger {color: @text-color;background: #fff;}
.ant-list {color: @text-color;}
.ant-list-empty-text {color: rgba(0, 0, 0, 0.25);}
.ant-list-item-content {color: @text-color;}
.ant-list-item-meta-title {color: @text-color;}
.ant-list-item-meta-title > a {color: @text-color;}
.ant-list-item-meta-title > a:hover {color: @primary-color;}
.ant-list-item-meta-description {color: @text-color-secondary;}
.ant-list-item-action > li {color: @text-color-secondary;}
.ant-list-item-action-split {background-color: #e8e8e8;}
.ant-list-header {background: transparent;}
.ant-list-footer {background: transparent;}
.ant-list-empty {color: @text-color-secondary;}
.ant-list-split .ant-list-item {border-bottom: 1px solid #e8e8e8;}
.ant-list-split .ant-list-item:last-child {border-bottom: none;}
.ant-list-split .ant-list-header {border-bottom: 1px solid #e8e8e8;}
.ant-list-something-after-last-item .ant-spin-container > .ant-list-items > .ant-list-item:last-child {border-bottom: 1px solid #e8e8e8;}
.ant-list-vertical .ant-list-item-meta-title {color: @heading-color;}
.ant-list-grid .ant-col > .ant-list-item {border-bottom: none;}
.ant-list-bordered {border: 1px solid #d9d9d9;border-radius: 4px;}
.ant-list-bordered .ant-list-item {border-bottom: 1px solid #e8e8e8;}
.ant-mentions {color: @text-color;background-color: #fff;background-image: none;border: 1px solid #d9d9d9;border-radius: 4px;}
.ant-mentions::-moz-placeholder {color: #bfbfbf;}
.ant-mentions:-ms-input-placeholder {color: #bfbfbf;}
.ant-mentions::-webkit-input-placeholder {color: #bfbfbf;}
.ant-mentions:hover {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);border-right-width: 1px !important;}
.ant-mentions:focus {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(90, 105, 46, 0.2);}
.ant-mentions-disabled {color: rgba(0, 0, 0, 0.25);background-color: #f5f5f5;}
.ant-mentions-disabled:hover {border-color: #d9d9d9;border-right-width: 1px !important;}
.ant-mentions[disabled] {color: rgba(0, 0, 0, 0.25);background-color: #f5f5f5;}
.ant-mentions[disabled]:hover {border-color: #d9d9d9;border-right-width: 1px !important;}
.ant-mentions-disabled > textarea {color: rgba(0, 0, 0, 0.25);background-color: #f5f5f5;}
.ant-mentions-disabled > textarea:hover {border-color: #d9d9d9;border-right-width: 1px !important;}
.ant-mentions-focused {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(90, 105, 46, 0.2);}
.ant-mentions > textarea {border: none;}
.ant-mentions > textarea::-moz-placeholder {color: #bfbfbf;}
.ant-mentions > textarea:-ms-input-placeholder {color: #bfbfbf;}
.ant-mentions > textarea::-webkit-input-placeholder {color: #bfbfbf;}
.ant-mentions-measure {color: transparent;}
.ant-mentions-dropdown {color: @text-color;background-color: #fff;border-radius: 4px;box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);}
.ant-mentions-dropdown-menu-item {color: @text-color;}
.ant-mentions-dropdown-menu-item:hover {background-color: color(~\`colorPalette("@{primary-color}", 1)\`);}
.ant-mentions-dropdown-menu-item:first-child {border-radius: 4px 4px 0 0;}
.ant-mentions-dropdown-menu-item:last-child {border-radius: 0 0 4px 4px;}
.ant-mentions-dropdown-menu-item-disabled {color: rgba(0, 0, 0, 0.25);}
.ant-mentions-dropdown-menu-item-disabled:hover {color: rgba(0, 0, 0, 0.25);background-color: #fff;}
.ant-mentions-dropdown-menu-item-selected {color: @text-color;background-color: #fafafa;}
.ant-mentions-dropdown-menu-item-active {background-color: color(~\`colorPalette("@{primary-color}", 1)\`);}
.ant-menu {color: @text-color;background: #fff;box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);}
.ant-menu-item-group-title {color: @text-color-secondary;}
.ant-menu-submenu-selected {color: @primary-color;}
.ant-menu-item:active, .ant-menu-submenu-title:active {background: color(~\`colorPalette("@{primary-color}", 1)\`);}
.ant-menu-item > a {color: @text-color;}
.ant-menu-item > a:hover {color: @primary-color;}
.ant-menu-item > a::before {background-color: transparent;}
.ant-menu-item > .ant-badge > a {color: @text-color;}
.ant-menu-item > .ant-badge > a:hover {color: @primary-color;}
.ant-menu-item-divider {background-color: #e8e8e8;}
.ant-menu-item:hover, .ant-menu-item-active, .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open, .ant-menu-submenu-active, .ant-menu-submenu-title:hover {color: @primary-color;}
.ant-menu-horizontal > .ant-menu-item:hover, .ant-menu-horizontal > .ant-menu-item-active, .ant-menu-horizontal > .ant-menu-submenu .ant-menu-submenu-title:hover {background-color: transparent;}
.ant-menu-item-selected {color: @primary-color;}
.ant-menu-item-selected > a, .ant-menu-item-selected > a:hover {color: @primary-color;}
.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {background-color: color(~\`colorPalette("@{primary-color}", 1)\`);}
.ant-menu-inline, .ant-menu-vertical, .ant-menu-vertical-left {border-right: 1px solid #e8e8e8;}
.ant-menu-vertical-right {border-left: 1px solid #e8e8e8;}
.ant-menu-vertical.ant-menu-sub, .ant-menu-vertical-left.ant-menu-sub, .ant-menu-vertical-right.ant-menu-sub {border-right: 0;}
.ant-menu-vertical.ant-menu-sub .ant-menu-item, .ant-menu-vertical-left.ant-menu-sub .ant-menu-item, .ant-menu-vertical-right.ant-menu-sub .ant-menu-item {border-right: 0;}
.ant-menu-vertical.ant-menu-sub .ant-menu-item::after, .ant-menu-vertical-left.ant-menu-sub .ant-menu-item::after, .ant-menu-vertical-right.ant-menu-sub .ant-menu-item::after {border-right: 0;}
.ant-menu > .ant-menu-item-divider {background-color: #e8e8e8;}
.ant-menu-submenu-popup {background: #fff;border-radius: 4px;}
.ant-menu-submenu > .ant-menu {background-color: #fff;border-radius: 4px;}
.ant-menu-submenu-vertical > .ant-menu-submenu-title .ant-menu-submenu-arrow::before, .ant-menu-submenu-vertical-left > .ant-menu-submenu-title .ant-menu-submenu-arrow::before, .ant-menu-submenu-vertical-right > .ant-menu-submenu-title .ant-menu-submenu-arrow::before, .ant-menu-submenu-inline > .ant-menu-submenu-title .ant-menu-submenu-arrow::before, .ant-menu-submenu-vertical > .ant-menu-submenu-title .ant-menu-submenu-arrow::after, .ant-menu-submenu-vertical-left > .ant-menu-submenu-title .ant-menu-submenu-arrow::after, .ant-menu-submenu-vertical-right > .ant-menu-submenu-title .ant-menu-submenu-arrow::after, .ant-menu-submenu-inline > .ant-menu-submenu-title .ant-menu-submenu-arrow::after {background: #fff;background: @text-color ;background-image: linear-gradient(to right, @text-color, @text-color);background-image: none ;border-radius: 2px;}
.ant-menu-submenu-vertical > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after, .ant-menu-submenu-vertical-left > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after, .ant-menu-submenu-vertical-right > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after, .ant-menu-submenu-inline > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after, .ant-menu-submenu-vertical > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before, .ant-menu-submenu-vertical-left > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before, .ant-menu-submenu-vertical-right > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before, .ant-menu-submenu-inline > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before {background: linear-gradient(to right, @primary-color, @primary-color);}
.ant-menu-vertical .ant-menu-submenu-selected, .ant-menu-vertical-left .ant-menu-submenu-selected, .ant-menu-vertical-right .ant-menu-submenu-selected {color: @primary-color;}
.ant-menu-vertical .ant-menu-submenu-selected > a, .ant-menu-vertical-left .ant-menu-submenu-selected > a, .ant-menu-vertical-right .ant-menu-submenu-selected > a {color: @primary-color;}
.ant-menu-horizontal {border: 0;border-bottom: 1px solid #e8e8e8;box-shadow: none;}
.ant-menu-horizontal > .ant-menu-item, .ant-menu-horizontal > .ant-menu-submenu {border-bottom: 2px solid transparent;}
.ant-menu-horizontal > .ant-menu-item:hover, .ant-menu-horizontal > .ant-menu-submenu:hover, .ant-menu-horizontal > .ant-menu-item-active, .ant-menu-horizontal > .ant-menu-submenu-active, .ant-menu-horizontal > .ant-menu-item-open, .ant-menu-horizontal > .ant-menu-submenu-open, .ant-menu-horizontal > .ant-menu-item-selected, .ant-menu-horizontal > .ant-menu-submenu-selected {color: @primary-color;border-bottom: 2px solid @primary-color;}
.ant-menu-horizontal > .ant-menu-item > a {color: @text-color;}
.ant-menu-horizontal > .ant-menu-item > a:hover {color: @primary-color;}
.ant-menu-horizontal > .ant-menu-item-selected > a {color: @primary-color;}
.ant-menu-vertical .ant-menu-item::after, .ant-menu-vertical-left .ant-menu-item::after, .ant-menu-vertical-right .ant-menu-item::after, .ant-menu-inline .ant-menu-item::after {border-right: 3px solid @primary-color;}
.ant-menu-inline-collapsed-tooltip a {color: rgba(255, 255, 255, 0.85);}
.ant-menu-root.ant-menu-vertical, .ant-menu-root.ant-menu-vertical-left, .ant-menu-root.ant-menu-vertical-right, .ant-menu-root.ant-menu-inline {box-shadow: none;}
.ant-menu-sub.ant-menu-inline {border: 0;border-radius: 0;box-shadow: none;}
.ant-menu-item-disabled, .ant-menu-submenu-disabled {color: rgba(0, 0, 0, 0.25) !important;background: none;border-color: transparent !important;}
.ant-menu-item-disabled > a, .ant-menu-submenu-disabled > a {color: rgba(0, 0, 0, 0.25) !important;}
.ant-menu-item-disabled > .ant-menu-submenu-title, .ant-menu-submenu-disabled > .ant-menu-submenu-title {color: rgba(0, 0, 0, 0.25) !important;}
.ant-menu-item-disabled > .ant-menu-submenu-title > .ant-menu-submenu-arrow::before, .ant-menu-submenu-disabled > .ant-menu-submenu-title > .ant-menu-submenu-arrow::before, .ant-menu-item-disabled > .ant-menu-submenu-title > .ant-menu-submenu-arrow::after, .ant-menu-submenu-disabled > .ant-menu-submenu-title > .ant-menu-submenu-arrow::after {background: rgba(0, 0, 0, 0.25) !important;}
.ant-menu-dark, .ant-menu-dark .ant-menu-sub {color: rgba(255, 255, 255, 0.65);background: @layout-header-background;}
.ant-menu-dark .ant-menu-submenu-title .ant-menu-submenu-arrow::after, .ant-menu-dark .ant-menu-sub .ant-menu-submenu-title .ant-menu-submenu-arrow::after, .ant-menu-dark .ant-menu-submenu-title .ant-menu-submenu-arrow::before, .ant-menu-dark .ant-menu-sub .ant-menu-submenu-title .ant-menu-submenu-arrow::before {background: #fff;}
.ant-menu-dark.ant-menu-submenu-popup {background: transparent;}
.ant-menu-dark .ant-menu-inline.ant-menu-sub {background: #000c17;box-shadow: 0 2px 8px rgba(0, 0, 0, 0.45) inset;}
.ant-menu-dark.ant-menu-horizontal {border-bottom: 0;}
.ant-menu-dark.ant-menu-horizontal > .ant-menu-item, .ant-menu-dark.ant-menu-horizontal > .ant-menu-submenu {border-color: @layout-header-background;border-bottom: 0;}
.ant-menu-dark .ant-menu-item, .ant-menu-dark .ant-menu-item-group-title, .ant-menu-dark .ant-menu-item > a {color: rgba(255, 255, 255, 0.65);}
.ant-menu-dark.ant-menu-inline, .ant-menu-dark.ant-menu-vertical, .ant-menu-dark.ant-menu-vertical-left, .ant-menu-dark.ant-menu-vertical-right {border-right: 0;}
.ant-menu-dark.ant-menu-inline .ant-menu-item, .ant-menu-dark.ant-menu-vertical .ant-menu-item, .ant-menu-dark.ant-menu-vertical-left .ant-menu-item, .ant-menu-dark.ant-menu-vertical-right .ant-menu-item {border-right: 0;}
.ant-menu-dark.ant-menu-inline .ant-menu-item::after, .ant-menu-dark.ant-menu-vertical .ant-menu-item::after, .ant-menu-dark.ant-menu-vertical-left .ant-menu-item::after, .ant-menu-dark.ant-menu-vertical-right .ant-menu-item::after {border-right: 0;}
.ant-menu-dark .ant-menu-item:hover, .ant-menu-dark .ant-menu-item-active, .ant-menu-dark .ant-menu-submenu-active, .ant-menu-dark .ant-menu-submenu-open, .ant-menu-dark .ant-menu-submenu-selected, .ant-menu-dark .ant-menu-submenu-title:hover {color: #fff;background-color: transparent;}
.ant-menu-dark .ant-menu-item:hover > a, .ant-menu-dark .ant-menu-item-active > a, .ant-menu-dark .ant-menu-submenu-active > a, .ant-menu-dark .ant-menu-submenu-open > a, .ant-menu-dark .ant-menu-submenu-selected > a, .ant-menu-dark .ant-menu-submenu-title:hover > a {color: #fff;}
.ant-menu-dark .ant-menu-item:hover > .ant-menu-submenu-title > .ant-menu-submenu-arrow::after, .ant-menu-dark .ant-menu-item-active > .ant-menu-submenu-title > .ant-menu-submenu-arrow::after, .ant-menu-dark .ant-menu-submenu-active > .ant-menu-submenu-title > .ant-menu-submenu-arrow::after, .ant-menu-dark .ant-menu-submenu-open > .ant-menu-submenu-title > .ant-menu-submenu-arrow::after, .ant-menu-dark .ant-menu-submenu-selected > .ant-menu-submenu-title > .ant-menu-submenu-arrow::after, .ant-menu-dark .ant-menu-submenu-title:hover > .ant-menu-submenu-title > .ant-menu-submenu-arrow::after, .ant-menu-dark .ant-menu-item:hover > .ant-menu-submenu-title:hover > .ant-menu-submenu-arrow::after, .ant-menu-dark .ant-menu-item-active > .ant-menu-submenu-title:hover > .ant-menu-submenu-arrow::after, .ant-menu-dark .ant-menu-submenu-active > .ant-menu-submenu-title:hover > .ant-menu-submenu-arrow::after, .ant-menu-dark .ant-menu-submenu-open > .ant-menu-submenu-title:hover > .ant-menu-submenu-arrow::after, .ant-menu-dark .ant-menu-submenu-selected > .ant-menu-submenu-title:hover > .ant-menu-submenu-arrow::after, .ant-menu-dark .ant-menu-submenu-title:hover > .ant-menu-submenu-title:hover > .ant-menu-submenu-arrow::after, .ant-menu-dark .ant-menu-item:hover > .ant-menu-submenu-title > .ant-menu-submenu-arrow::before, .ant-menu-dark .ant-menu-item-active > .ant-menu-submenu-title > .ant-menu-submenu-arrow::before, .ant-menu-dark .ant-menu-submenu-active > .ant-menu-submenu-title > .ant-menu-submenu-arrow::before, .ant-menu-dark .ant-menu-submenu-open > .ant-menu-submenu-title > .ant-menu-submenu-arrow::before, .ant-menu-dark .ant-menu-submenu-selected > .ant-menu-submenu-title > .ant-menu-submenu-arrow::before, .ant-menu-dark .ant-menu-submenu-title:hover > .ant-menu-submenu-title > .ant-menu-submenu-arrow::before, .ant-menu-dark .ant-menu-item:hover > .ant-menu-submenu-title:hover > .ant-menu-submenu-arrow::before, .ant-menu-dark .ant-menu-item-active > .ant-menu-submenu-title:hover > .ant-menu-submenu-arrow::before, .ant-menu-dark .ant-menu-submenu-active > .ant-menu-submenu-title:hover > .ant-menu-submenu-arrow::before, .ant-menu-dark .ant-menu-submenu-open > .ant-menu-submenu-title:hover > .ant-menu-submenu-arrow::before, .ant-menu-dark .ant-menu-submenu-selected > .ant-menu-submenu-title:hover > .ant-menu-submenu-arrow::before, .ant-menu-dark .ant-menu-submenu-title:hover > .ant-menu-submenu-title:hover > .ant-menu-submenu-arrow::before {background: #fff;}
.ant-menu-dark .ant-menu-item:hover {background-color: transparent;}
.ant-menu-dark .ant-menu-item-selected {color: #fff;border-right: 0;}
.ant-menu-dark .ant-menu-item-selected::after {border-right: 0;}
.ant-menu-dark .ant-menu-item-selected > a, .ant-menu-dark .ant-menu-item-selected > a:hover {color: #fff;}
.ant-menu-dark .ant-menu-item-selected .anticon {color: #fff;}
.ant-menu-dark .ant-menu-item-selected .anticon + span {color: #fff;}
.ant-menu.ant-menu-dark .ant-menu-item-selected, .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {background-color: @primary-color;}
.ant-menu-dark .ant-menu-item-disabled, .ant-menu-dark .ant-menu-submenu-disabled, .ant-menu-dark .ant-menu-item-disabled > a, .ant-menu-dark .ant-menu-submenu-disabled > a {color: rgba(255, 255, 255, 0.35) !important;}
.ant-menu-dark .ant-menu-item-disabled > .ant-menu-submenu-title, .ant-menu-dark .ant-menu-submenu-disabled > .ant-menu-submenu-title {color: rgba(255, 255, 255, 0.35) !important;}
.ant-menu-dark .ant-menu-item-disabled > .ant-menu-submenu-title > .ant-menu-submenu-arrow::before, .ant-menu-dark .ant-menu-submenu-disabled > .ant-menu-submenu-title > .ant-menu-submenu-arrow::before, .ant-menu-dark .ant-menu-item-disabled > .ant-menu-submenu-title > .ant-menu-submenu-arrow::after, .ant-menu-dark .ant-menu-submenu-disabled > .ant-menu-submenu-title > .ant-menu-submenu-arrow::after {background: rgba(255, 255, 255, 0.35) !important;}
.ant-message {color: @text-color;}
.ant-message-notice-content {background: #fff;border-radius: 4px;box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);}
.ant-message-success .anticon {color: #52c41a;}
.ant-message-error .anticon {color: #f5222d;}
.ant-message-warning .anticon {color: #faad14;}
.ant-message-info .anticon, .ant-message-loading .anticon {color: #1890ff;}
.ant-modal {color: @text-color;}
.ant-modal-title {color: @heading-color;}
.ant-modal-content {background-color: #fff;background-clip: padding-box;border: 0;border-radius: 4px;box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);}
.ant-modal-close {color: @text-color-secondary;background: transparent;border: 0;}
.ant-modal-close:focus, .ant-modal-close:hover {color: rgba(0, 0, 0, 0.75);}
.ant-modal-header {color: @text-color;background: #fff;border-bottom: 1px solid #e8e8e8;border-radius: 4px 4px 0 0;}
.ant-modal-footer {background: transparent;border-top: 1px solid #e8e8e8;border-radius: 0 0 4px 4px;}
.ant-modal-mask {background-color: rgba(0, 0, 0, 0.45);}
.ant-modal-confirm-body .ant-modal-confirm-title {color: @heading-color;}
.ant-modal-confirm-body .ant-modal-confirm-content {color: @text-color;}
.ant-modal-confirm-error .ant-modal-confirm-body > .anticon {color: #f5222d;}
.ant-modal-confirm-warning .ant-modal-confirm-body > .anticon, .ant-modal-confirm-confirm .ant-modal-confirm-body > .anticon {color: #faad14;}
.ant-modal-confirm-info .ant-modal-confirm-body > .anticon {color: #1890ff;}
.ant-modal-confirm-success .ant-modal-confirm-body > .anticon {color: #52c41a;}
.ant-notification {color: @text-color;}
.ant-notification-notice {background: #fff;border-radius: 4px;box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);}
.ant-notification-notice-message {color: @heading-color;}
.ant-notification-notice-message-single-line-auto-margin {background-color: transparent;}
.anticon.ant-notification-notice-icon-success {color: #52c41a;}
.anticon.ant-notification-notice-icon-info {color: #1890ff;}
.anticon.ant-notification-notice-icon-warning {color: #faad14;}
.anticon.ant-notification-notice-icon-error {color: #f5222d;}
.ant-notification-notice-close {color: @text-color-secondary;}
.ant-notification-notice-close:hover {color: #1c2e3a;}
.ant-page-header {color: @text-color;background-color: #fff;}
.ant-page-header-ghost {background-color: inherit;}
.ant-page-header-back-button {color: @primary-color;color: #000;}
.ant-page-header-back-button:focus, .ant-page-header-back-button:hover {color: color(~\`colorPalette("@{primary-color}", 5)\`);}
.ant-page-header-back-button:active {color: color(~\`colorPalette("@{primary-color}", 7)\`);}
.ant-page-header-heading-title {color: @heading-color;}
.ant-page-header-heading-sub-title {color: @text-color-secondary;}
.ant-page-header-footer .ant-tabs-bar {border-bottom: 0;}
.ant-pagination {color: @text-color;}
.ant-pagination-item {background-color: #fff;border: 1px solid #d9d9d9;border-radius: 4px;}
.ant-pagination-item a {color: @text-color;}
.ant-pagination-item:focus, .ant-pagination-item:hover {border-color: @primary-color;}
.ant-pagination-item:focus a, .ant-pagination-item:hover a {color: @primary-color;}
.ant-pagination-item-active {background: #fff;border-color: @primary-color;}
.ant-pagination-item-active a {color: @primary-color;}
.ant-pagination-item-active:focus, .ant-pagination-item-active:hover {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);}
.ant-pagination-item-active:focus a, .ant-pagination-item-active:hover a {color: color(~\`colorPalette("@{primary-color}", 5)\`);}
.ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-link-icon, .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-link-icon {color: @primary-color;}
.ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-ellipsis, .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-ellipsis {color: rgba(0, 0, 0, 0.25);}
.ant-pagination-prev, .ant-pagination-next, .ant-pagination-jump-prev, .ant-pagination-jump-next {color: @text-color;border-radius: 4px;}
.ant-pagination-prev a, .ant-pagination-next a {color: @text-color;}
.ant-pagination-prev:hover a, .ant-pagination-next:hover a {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);}
.ant-pagination-prev .ant-pagination-item-link, .ant-pagination-next .ant-pagination-item-link {background-color: #fff;border: 1px solid #d9d9d9;border-radius: 4px;}
.ant-pagination-prev:focus .ant-pagination-item-link, .ant-pagination-next:focus .ant-pagination-item-link, .ant-pagination-prev:hover .ant-pagination-item-link, .ant-pagination-next:hover .ant-pagination-item-link {color: @primary-color;border-color: @primary-color;}
.ant-pagination-disabled a, .ant-pagination-disabled:hover a, .ant-pagination-disabled:focus a, .ant-pagination-disabled .ant-pagination-item-link, .ant-pagination-disabled:hover .ant-pagination-item-link, .ant-pagination-disabled:focus .ant-pagination-item-link {color: rgba(0, 0, 0, 0.25);border-color: #d9d9d9;}
.ant-pagination-options-quick-jumper input {color: @text-color;background-color: #fff;background-image: none;border: 1px solid #d9d9d9;border-radius: 4px;}
.ant-pagination-options-quick-jumper input::-moz-placeholder {color: #bfbfbf;}
.ant-pagination-options-quick-jumper input:-ms-input-placeholder {color: #bfbfbf;}
.ant-pagination-options-quick-jumper input::-webkit-input-placeholder {color: #bfbfbf;}
.ant-pagination-options-quick-jumper input:hover {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);border-right-width: 1px !important;}
.ant-pagination-options-quick-jumper input:focus {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(90, 105, 46, 0.2);}
.ant-pagination-options-quick-jumper input-disabled {color: rgba(0, 0, 0, 0.25);background-color: #f5f5f5;}
.ant-pagination-options-quick-jumper input-disabled:hover {border-color: #d9d9d9;border-right-width: 1px !important;}
.ant-pagination-options-quick-jumper input[disabled] {color: rgba(0, 0, 0, 0.25);background-color: #f5f5f5;}
.ant-pagination-options-quick-jumper input[disabled]:hover {border-color: #d9d9d9;border-right-width: 1px !important;}
.ant-pagination-simple .ant-pagination-prev .ant-pagination-item-link, .ant-pagination-simple .ant-pagination-next .ant-pagination-item-link {border: 0;}
.ant-pagination-simple .ant-pagination-simple-pager input {background-color: #fff;border: 1px solid #d9d9d9;border-radius: 4px;}
.ant-pagination-simple .ant-pagination-simple-pager input:hover {border-color: @primary-color;}
.ant-pagination.mini .ant-pagination-item:not(.ant-pagination-item-active) {background: transparent;border-color: transparent;}
.ant-pagination.mini .ant-pagination-prev .ant-pagination-item-link, .ant-pagination.mini .ant-pagination-next .ant-pagination-item-link {background: transparent;border-color: transparent;}
.ant-pagination.ant-pagination-disabled .ant-pagination-item {background: #f5f5f5;border-color: #d9d9d9;}
.ant-pagination.ant-pagination-disabled .ant-pagination-item a {color: rgba(0, 0, 0, 0.25);background: transparent;border: none;}
.ant-pagination.ant-pagination-disabled .ant-pagination-item-active {background: #dbdbdb;border-color: transparent;}
.ant-pagination.ant-pagination-disabled .ant-pagination-item-active a {color: #fff;}
.ant-pagination.ant-pagination-disabled .ant-pagination-item-link, .ant-pagination.ant-pagination-disabled .ant-pagination-item-link:hover, .ant-pagination.ant-pagination-disabled .ant-pagination-item-link:focus {color: @text-color-secondary;background: #f5f5f5;border-color: #d9d9d9;}
.ant-popover {color: @text-color;}
.ant-popover::after {background: rgba(255, 255, 255, 0.01);}
.ant-popover-inner {background-color: #fff;background-clip: padding-box;border-radius: 4px;box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);box-shadow: 0 0 8px rgba(0, 0, 0, 0.15) ;}
.ant-popover-title {color: @heading-color;border-bottom: 1px solid #e8e8e8;}
.ant-popover-inner-content {color: @text-color;}
.ant-popover-message {color: @text-color;}
.ant-popover-message > .anticon {color: #faad14;}
.ant-popover-arrow {background: transparent;border-style: solid;border-width: 4.24264069px;}
.ant-popover-placement-top > .ant-popover-content > .ant-popover-arrow, .ant-popover-placement-topLeft > .ant-popover-content > .ant-popover-arrow, .ant-popover-placement-topRight > .ant-popover-content > .ant-popover-arrow {border-top-color: transparent;border-right-color: #fff;border-bottom-color: #fff;border-left-color: transparent;box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.07);}
.ant-popover-placement-right > .ant-popover-content > .ant-popover-arrow, .ant-popover-placement-rightTop > .ant-popover-content > .ant-popover-arrow, .ant-popover-placement-rightBottom > .ant-popover-content > .ant-popover-arrow {border-top-color: transparent;border-right-color: transparent;border-bottom-color: #fff;border-left-color: #fff;box-shadow: -3px 3px 7px rgba(0, 0, 0, 0.07);}
.ant-popover-placement-bottom > .ant-popover-content > .ant-popover-arrow, .ant-popover-placement-bottomLeft > .ant-popover-content > .ant-popover-arrow, .ant-popover-placement-bottomRight > .ant-popover-content > .ant-popover-arrow {border-top-color: #fff;border-right-color: transparent;border-bottom-color: transparent;border-left-color: #fff;box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.06);}
.ant-popover-placement-left > .ant-popover-content > .ant-popover-arrow, .ant-popover-placement-leftTop > .ant-popover-content > .ant-popover-arrow, .ant-popover-placement-leftBottom > .ant-popover-content > .ant-popover-arrow {border-top-color: #fff;border-right-color: #fff;border-bottom-color: transparent;border-left-color: transparent;box-shadow: 3px -3px 7px rgba(0, 0, 0, 0.07);}
.ant-progress {color: @text-color;}
.ant-progress-inner {background-color: #f5f5f5;border-radius: 100px;}
.ant-progress-success-bg, .ant-progress-bg {background-color: #1890ff;border-radius: 100px;}
.ant-progress-success-bg {background-color: #52c41a;}
.ant-progress-text {color: @text-color-secondary;}
.ant-progress-status-active .ant-progress-bg::before {background: #fff;border-radius: 10px;}
.ant-progress-status-exception .ant-progress-bg {background-color: #f5222d;}
.ant-progress-status-exception .ant-progress-text {color: #f5222d;}
.ant-progress-status-success .ant-progress-bg {background-color: #52c41a;}
.ant-progress-status-success .ant-progress-text {color: #52c41a;}
.ant-progress-circle .ant-progress-inner {background-color: transparent;}
.ant-progress-circle .ant-progress-text {color: @text-color;}
.ant-progress-circle.ant-progress-status-exception .ant-progress-text {color: #f5222d;}
.ant-progress-circle.ant-progress-status-success .ant-progress-text {color: #52c41a;}
.ant-radio-group {color: @text-color;}
.ant-radio-wrapper {color: @text-color;}
.ant-radio {color: @text-color;}
.ant-radio-wrapper:hover .ant-radio, .ant-radio:hover .ant-radio-inner, .ant-radio-input:focus + .ant-radio-inner {border-color: @primary-color;}
.ant-radio-input:focus + .ant-radio-inner {box-shadow: 0 0 0 3px rgba(90, 105, 46, 0.08);}
.ant-radio-checked::after {border: 1px solid @primary-color;border-radius: 50%;}
.ant-radio-inner {background-color: #fff;border-color: #d9d9d9;border-style: solid;border-width: 1px;border-radius: 100px;}
.ant-radio-inner::after {background-color: @primary-color;border-top: 0;border-left: 0;border-radius: 8px;}
.ant-radio-checked .ant-radio-inner {border-color: @primary-color;}
.ant-radio-disabled .ant-radio-inner {background-color: #f5f5f5;border-color: #d9d9d9 !important;}
.ant-radio-disabled .ant-radio-inner::after {background-color: rgba(0, 0, 0, 0.2);}
.ant-radio-disabled + span {color: rgba(0, 0, 0, 0.25);}
.ant-radio-button-wrapper {color: @text-color;background: #fff;border: 1px solid #d9d9d9;border-top-width: 1.02px;border-left: 0;}
.ant-radio-button-wrapper a {color: @text-color;}
.ant-radio-button-wrapper:not(:first-child)::before {background-color: #d9d9d9;}
.ant-radio-button-wrapper:first-child {border-left: 1px solid #d9d9d9;border-radius: 4px 0 0 4px;}
.ant-radio-button-wrapper:last-child {border-radius: 0 4px 4px 0;}
.ant-radio-button-wrapper:first-child:last-child {border-radius: 4px;}
.ant-radio-button-wrapper:hover {color: @primary-color;}
.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {color: @primary-color;background: #fff;border-color: @primary-color;box-shadow: -1px 0 0 0 @primary-color;}
.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)::before {background-color: @primary-color !important;}
.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):first-child {border-color: @primary-color;box-shadow: none !important;}
.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover {color: color(~\`colorPalette("@{primary-color}", 5)\`);border-color: color(~\`colorPalette("@{primary-color}", 5)\`);box-shadow: -1px 0 0 0 color(~\`colorPalette("@{primary-color}", 5)\`);}
.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):active {color: color(~\`colorPalette("@{primary-color}", 7)\`);border-color: color(~\`colorPalette("@{primary-color}", 7)\`);box-shadow: -1px 0 0 0 color(~\`colorPalette("@{primary-color}", 7)\`);}
.ant-radio-group-solid .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {color: #fff;background: @primary-color;border-color: @primary-color;}
.ant-radio-group-solid .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover {color: #fff;background: color(~\`colorPalette("@{primary-color}", 5)\`);border-color: color(~\`colorPalette("@{primary-color}", 5)\`);}
.ant-radio-group-solid .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):active {color: #fff;background: color(~\`colorPalette("@{primary-color}", 7)\`);border-color: color(~\`colorPalette("@{primary-color}", 7)\`);}
.ant-radio-button-wrapper-disabled {color: rgba(0, 0, 0, 0.25);background-color: #f5f5f5;border-color: #d9d9d9;}
.ant-radio-button-wrapper-disabled:first-child, .ant-radio-button-wrapper-disabled:hover {color: rgba(0, 0, 0, 0.25);background-color: #f5f5f5;border-color: #d9d9d9;}
.ant-radio-button-wrapper-disabled:first-child {border-left-color: #d9d9d9;}
.ant-radio-button-wrapper-disabled.ant-radio-button-wrapper-checked {color: #fff;background-color: #e6e6e6;border-color: #d9d9d9;box-shadow: none;}
.ant-rate {color: @text-color;color: #fadb14;}
.ant-rate-star {color: inherit;}
.ant-rate-star-first, .ant-rate-star-second {color: #e8e8e8;}
.ant-rate-star-half .ant-rate-star-first, .ant-rate-star-full .ant-rate-star-second {color: inherit;}
.ant-result-success .ant-result-icon > .anticon {color: #52c41a;}
.ant-result-error .ant-result-icon > .anticon {color: #f5222d;}
.ant-result-info .ant-result-icon > .anticon {color: #1890ff;}
.ant-result-warning .ant-result-icon > .anticon {color: #faad14;}
.ant-result-title {color: @heading-color;}
.ant-result-subtitle {color: @text-color-secondary;}
.ant-result-content {background-color: #fafafa;}
.ant-select {color: @text-color;}
.ant-select > ul > li > a {background-color: #fff;}
.ant-select-arrow {color: inherit;color: rgba(0, 0, 0, 0.25);}
.ant-select-selection {background-color: #fff;border: 1px solid #d9d9d9;border-top-width: 1.02px;border-radius: 4px;}
.ant-select-selection:hover {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);border-right-width: 1px !important;}
.ant-select-focused .ant-select-selection, .ant-select-selection:focus, .ant-select-selection:active {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(90, 105, 46, 0.2);}
.ant-select-selection__clear {color: rgba(0, 0, 0, 0.25);background: #fff;}
.ant-select-selection__clear:hover {color: @text-color-secondary;}
.ant-select-disabled {color: rgba(0, 0, 0, 0.25);}
.ant-select-disabled .ant-select-selection {background: #f5f5f5;}
.ant-select-disabled .ant-select-selection:hover, .ant-select-disabled .ant-select-selection:focus, .ant-select-disabled .ant-select-selection:active {border-color: #d9d9d9;box-shadow: none;}
.ant-select-disabled .ant-select-selection--multiple .ant-select-selection__choice {color: rgba(0, 0, 0, 0.33);background: #f5f5f5;}
.ant-select-disabled .ant-select-selection__choice__remove {color: rgba(0, 0, 0, 0.25);}
.ant-select-disabled .ant-select-selection__choice__remove:hover {color: rgba(0, 0, 0, 0.25);}
.ant-select-selection__placeholder, .ant-select-search__field__placeholder {color: #bfbfbf;}
.ant-select-search--inline .ant-select-search__field {background: transparent;border-width: 0;border-radius: 4px;}
.ant-select-selection--multiple .ant-select-selection__choice {color: @text-color;background-color: #fafafa;border: 1px solid #e8e8e8;border-radius: 2px;}
.ant-select-selection--multiple .ant-select-selection__choice__remove {color: inherit;color: @text-color-secondary;}
.ant-select-selection--multiple .ant-select-selection__choice__remove:hover {color: rgba(0, 0, 0, 0.75);}
.ant-select-open .ant-select-selection {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(90, 105, 46, 0.2);}
.ant-select-combobox .ant-select-search__field {box-shadow: none;}
.ant-select-dropdown {color: @text-color;background-color: #fff;border-radius: 4px;box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);}
.ant-select-dropdown-menu-item-group-title {color: @text-color-secondary;}
.ant-select-dropdown-menu-item-group-list .ant-select-dropdown-menu-item:first-child:not(:last-child), .ant-select-dropdown-menu-item-group:not(:last-child) .ant-select-dropdown-menu-item-group-list .ant-select-dropdown-menu-item:last-child {border-radius: 0;}
.ant-select-dropdown-menu-item {color: @text-color;}
.ant-select-dropdown-menu-item:hover:not(.ant-select-dropdown-menu-item-disabled) {background-color: color(~\`colorPalette("@{primary-color}", 1)\`);}
.ant-select-dropdown-menu-item-selected {color: @text-color;background-color: #fafafa;}
.ant-select-dropdown-menu-item-disabled {color: rgba(0, 0, 0, 0.25);}
.ant-select-dropdown-menu-item-disabled:hover {color: rgba(0, 0, 0, 0.25);}
.ant-select-dropdown-menu-item-active:not(.ant-select-dropdown-menu-item-disabled) {background-color: color(~\`colorPalette("@{primary-color}", 1)\`);}
.ant-select-dropdown-menu-item-divider {background-color: #e8e8e8;}
.ant-select-dropdown.ant-select-dropdown--multiple .ant-select-dropdown-menu-item .ant-select-selected-icon {color: transparent;}
.ant-select-dropdown.ant-select-dropdown--multiple .ant-select-dropdown-menu-item:hover .ant-select-selected-icon {color: rgba(0, 0, 0, 0.87);}
.ant-select-dropdown.ant-select-dropdown--multiple .ant-select-dropdown-menu-item-selected .ant-select-selected-icon, .ant-select-dropdown.ant-select-dropdown--multiple .ant-select-dropdown-menu-item-selected:hover .ant-select-selected-icon {color: @primary-color;}
.ant-skeleton-header .ant-skeleton-avatar {background: #f2f2f2;}
.ant-skeleton-header .ant-skeleton-avatar.ant-skeleton-avatar-circle {border-radius: 50%;}
.ant-skeleton-header .ant-skeleton-avatar-lg.ant-skeleton-avatar-circle {border-radius: 50%;}
.ant-skeleton-header .ant-skeleton-avatar-sm.ant-skeleton-avatar-circle {border-radius: 50%;}
.ant-skeleton-content .ant-skeleton-title {background: #f2f2f2;}
.ant-skeleton-content .ant-skeleton-paragraph > li {background: #f2f2f2;}
.ant-skeleton.ant-skeleton-active .ant-skeleton-content .ant-skeleton-title, .ant-skeleton.ant-skeleton-active .ant-skeleton-content .ant-skeleton-paragraph > li {background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);background-size: 400% 100%;}
.ant-skeleton.ant-skeleton-active .ant-skeleton-avatar {background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);background-size: 400% 100%;}
.ant-slider {color: @text-color;}
.ant-slider-rail {background-color: #f5f5f5;border-radius: 2px;}
.ant-slider-track {background-color: color(~\`colorPalette("@{primary-color}", 3)\`);border-radius: 4px;}
.ant-slider-handle {background-color: #fff;border: solid 2px color(~\`colorPalette("@{primary-color}", 3)\`);border-radius: 50%;box-shadow: 0;}
.ant-slider-handle:focus {border-color: #7b8758;box-shadow: 0 0 0 5px rgba(90, 105, 46, 0.2);}
.ant-slider-handle.ant-tooltip-open {border-color: @primary-color;}
.ant-slider:hover .ant-slider-rail {background-color: #e1e1e1;}
.ant-slider:hover .ant-slider-track {background-color: color(~\`colorPalette("@{primary-color}", 4)\`);}
.ant-slider:hover .ant-slider-handle:not(.ant-tooltip-open) {border-color: color(~\`colorPalette("@{primary-color}", 4)\`);}
.ant-slider-mark-text {color: @text-color-secondary;}
.ant-slider-mark-text-active {color: @text-color;}
.ant-slider-step {background: transparent;}
.ant-slider-dot {background-color: #fff;border: 2px solid #e8e8e8;border-radius: 50%;}
.ant-slider-dot-active {border-color: #adb497;}
.ant-slider-disabled .ant-slider-track {background-color: rgba(0, 0, 0, 0.25) !important;}
.ant-slider-disabled .ant-slider-handle, .ant-slider-disabled .ant-slider-dot {background-color: #fff;border-color: rgba(0, 0, 0, 0.25) !important;box-shadow: none;}
.ant-spin {color: @text-color;color: @primary-color;}
.ant-spin-container::after {background: #fff;}
.ant-spin-tip {color: @text-color-secondary;}
.ant-spin-dot-item {background-color: @primary-color;border-radius: 100%;}
.ant-statistic {color: @text-color;}
.ant-statistic-title {color: @text-color-secondary;}
.ant-statistic-content {color: @heading-color;}
.ant-steps {color: @text-color;}
.ant-steps-item-icon {border: 1px solid rgba(0, 0, 0, 0.25);border-radius: 32px;}
.ant-steps-item-icon > .ant-steps-icon {color: @primary-color;}
.ant-steps-item-tail::after {background: #e8e8e8;border-radius: 1px;}
.ant-steps-item-title {color: @text-color;}
.ant-steps-item-title::after {background: #e8e8e8;}
.ant-steps-item-subtitle {color: @text-color-secondary;}
.ant-steps-item-description {color: @text-color-secondary;}
.ant-steps-item-wait .ant-steps-item-icon {background-color: #fff;border-color: rgba(0, 0, 0, 0.25);}
.ant-steps-item-wait .ant-steps-item-icon > .ant-steps-icon {color: rgba(0, 0, 0, 0.25);}
.ant-steps-item-wait .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot {background: rgba(0, 0, 0, 0.25);}
.ant-steps-item-wait > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {color: @text-color-secondary;}
.ant-steps-item-wait > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after {background-color: #e8e8e8;}
.ant-steps-item-wait > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-description {color: @text-color-secondary;}
.ant-steps-item-wait > .ant-steps-item-container > .ant-steps-item-tail::after {background-color: #e8e8e8;}
.ant-steps-item-process .ant-steps-item-icon {background-color: #fff;border-color: @primary-color;}
.ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon {color: @primary-color;}
.ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot {background: @primary-color;}
.ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {color: @heading-color;}
.ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after {background-color: #e8e8e8;}
.ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-description {color: @text-color;}
.ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-tail::after {background-color: #e8e8e8;}
.ant-steps-item-process .ant-steps-item-icon {background: @primary-color;}
.ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon {color: #fff;}
.ant-steps-item-finish .ant-steps-item-icon {background-color: #fff;border-color: @primary-color;}
.ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {color: @primary-color;}
.ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot {background: @primary-color;}
.ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {color: @text-color;}
.ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after {background-color: @primary-color;}
.ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-description {color: @text-color-secondary;}
.ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-tail::after {background-color: @primary-color;}
.ant-steps-item-error .ant-steps-item-icon {background-color: #fff;border-color: #f5222d;}
.ant-steps-item-error .ant-steps-item-icon > .ant-steps-icon {color: #f5222d;}
.ant-steps-item-error .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot {background: #f5222d;}
.ant-steps-item-error > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {color: #f5222d;}
.ant-steps-item-error > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after {background-color: #e8e8e8;}
.ant-steps-item-error > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-description {color: #f5222d;}
.ant-steps-item-error > .ant-steps-item-container > .ant-steps-item-tail::after {background-color: #e8e8e8;}
.ant-steps-item.ant-steps-next-error .ant-steps-item-title::after {background: #f5222d;}
.ant-steps .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role='button']:hover .ant-steps-item-title, .ant-steps .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role='button']:hover .ant-steps-item-subtitle, .ant-steps .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role='button']:hover .ant-steps-item-description {color: @primary-color;}
.ant-steps .ant-steps-item:not(.ant-steps-item-active):not(.ant-steps-item-process) > .ant-steps-item-container[role='button']:hover .ant-steps-item-icon {border-color: @primary-color;}
.ant-steps .ant-steps-item:not(.ant-steps-item-active):not(.ant-steps-item-process) > .ant-steps-item-container[role='button']:hover .ant-steps-item-icon .ant-steps-icon {color: @primary-color;}
.ant-steps-item-custom .ant-steps-item-icon {background: none;border: 0;}
.ant-steps-item-custom.ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon {color: @primary-color;}
.ant-steps-small .ant-steps-item-icon {border-radius: 24px;}
.ant-steps-small .ant-steps-item-description {color: @text-color-secondary;}
.ant-steps-small .ant-steps-item-custom .ant-steps-item-icon {background: none;border: 0;border-radius: 0;}
.ant-steps-dot .ant-steps-item-icon, .ant-steps-dot.ant-steps-small .ant-steps-item-icon {background: transparent;border: 0;}
.ant-steps-dot .ant-steps-item-icon .ant-steps-icon-dot, .ant-steps-dot.ant-steps-small .ant-steps-item-icon .ant-steps-icon-dot {border-radius: 100px;}
.ant-steps-dot .ant-steps-item-icon .ant-steps-icon-dot::after, .ant-steps-dot.ant-steps-small .ant-steps-item-icon .ant-steps-icon-dot::after {background: rgba(0, 0, 0, 0.001);}
.ant-steps-navigation .ant-steps-item::after {border: 1px solid rgba(0, 0, 0, 0.25);border-bottom: none;border-left: none;}
.ant-steps-navigation .ant-steps-item::before {background-color: @primary-color;}
.ant-steps-flex-not-supported.ant-steps-horizontal.ant-steps-label-horizontal .ant-steps-item {background: #fff;}
.ant-steps-flex-not-supported.ant-steps-dot .ant-steps-item .ant-steps-icon-dot::before, .ant-steps-flex-not-supported.ant-steps-dot .ant-steps-item .ant-steps-icon-dot::after {background: #fff;}
.ant-steps-flex-not-supported.ant-steps-dot .ant-steps-item-wait .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot {background: #ccc;}
.ant-switch {color: @text-color;background-color: rgba(0, 0, 0, 0.25);border: 1px solid transparent;border-radius: 100px;}
.ant-switch-inner {color: #fff;}
.ant-switch-loading-icon, .ant-switch::after {background-color: #fff;border-radius: 18px;}
.ant-switch::after {box-shadow: 0 2px 4px 0 rgba(0, 35, 11, 0.2);}
.ant-switch-loading-icon {background: transparent;}
.ant-switch-loading .ant-switch-loading-icon {color: @text-color;}
.ant-switch-checked.ant-switch-loading .ant-switch-loading-icon {color: @primary-color;}
.ant-switch:focus {box-shadow: 0 0 0 2px rgba(90, 105, 46, 0.2);}
.ant-switch:focus:hover {box-shadow: none;}
.ant-switch-checked {background-color: @primary-color;}
.ant-table {color: @text-color;}
.ant-table table {border-radius: 4px 4px 0 0;border-collapse: separate;border-spacing: 0;}
.ant-table-thead > tr > th {color: @heading-color;background: #fafafa;border-bottom: 1px solid #e8e8e8;}
.ant-table-thead > tr > th .anticon-filter, .ant-table-thead > tr > th .ant-table-filter-icon {color: #bfbfbf;}
.ant-table-thead > tr > th .ant-table-filter-selected.anticon {color: @primary-color;}
.ant-table-thead > tr > th .ant-table-column-sorter .ant-table-column-sorter-inner {color: #bfbfbf;}
.ant-table-thead > tr > th .ant-table-column-sorter .ant-table-column-sorter-inner .ant-table-column-sorter-up.on, .ant-table-thead > tr > th .ant-table-column-sorter .ant-table-column-sorter-inner .ant-table-column-sorter-down.on {color: @primary-color;}
.ant-table-thead > tr > th.ant-table-column-has-actions {background-clip: padding-box;-webkit-background-clip: border-box;}
.ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-filters .anticon-filter.ant-table-filter-open, .ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-filters .ant-table-filter-icon.ant-table-filter-open {color: @text-color-secondary;background: #e5e5e5;}
.ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-filters:hover .anticon-filter:hover, .ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-filters:hover .ant-table-filter-icon:hover {color: @text-color-secondary;background: #e5e5e5;}
.ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-filters:hover .anticon-filter:active, .ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-filters:hover .ant-table-filter-icon:active {color: @text-color;}
.ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-sorters:hover {background: #f2f2f2;}
.ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-sorters:hover .anticon-filter, .ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-sorters:hover .ant-table-filter-icon {background: #f2f2f2;}
.ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-sorters:active .ant-table-column-sorter-up:not(.on), .ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-sorters:active .ant-table-column-sorter-down:not(.on) {color: @text-color-secondary;}
.ant-table-thead > tr > th .ant-table-header-column .ant-table-column-sorters::before {background: transparent;}
.ant-table-thead > tr > th .ant-table-header-column .ant-table-column-sorters:hover::before {background: rgba(0, 0, 0, 0.04);}
.ant-table-thead > tr:first-child > th:first-child {border-top-left-radius: 4px;}
.ant-table-thead > tr:first-child > th:last-child {border-top-right-radius: 4px;}
.ant-table-thead > tr:not(:last-child) > th[colspan] {border-bottom: 0;}
.ant-table-tbody > tr > td {border-bottom: 1px solid #e8e8e8;}
.ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td, .ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td, .ant-table-thead > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td, .ant-table-tbody > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td {background: color(~\`colorPalette("@{primary-color}", 1)\`);}
.ant-table-thead > tr.ant-table-row-selected > td.ant-table-column-sort, .ant-table-tbody > tr.ant-table-row-selected > td.ant-table-column-sort {background: #fafafa;}
.ant-table-thead > tr:hover.ant-table-row-selected > td, .ant-table-tbody > tr:hover.ant-table-row-selected > td {background: #fafafa;}
.ant-table-thead > tr:hover.ant-table-row-selected > td.ant-table-column-sort, .ant-table-tbody > tr:hover.ant-table-row-selected > td.ant-table-column-sort {background: #fafafa;}
.ant-table-thead > tr:hover {background: none;}
.ant-table-footer {color: @heading-color;background: #fafafa;border-top: 1px solid #e8e8e8;border-radius: 0 0 4px 4px;}
.ant-table-footer::before {background: #fafafa;}
.ant-table.ant-table-bordered .ant-table-footer {border: 1px solid #e8e8e8;}
.ant-table-title {border-radius: 4px 4px 0 0;}
.ant-table.ant-table-bordered .ant-table-title {border: 1px solid #e8e8e8;}
.ant-table-title + .ant-table-content {border-radius: 4px 4px 0 0;}
.ant-table-bordered .ant-table-title + .ant-table-content, .ant-table-bordered .ant-table-title + .ant-table-content table, .ant-table-bordered .ant-table-title + .ant-table-content .ant-table-thead > tr:first-child > th {border-radius: 0;}
.ant-table-without-column-header .ant-table-title + .ant-table-content, .ant-table-without-column-header table {border-radius: 0;}
.ant-table-without-column-header.ant-table-bordered.ant-table-empty .ant-table-placeholder {border-top: 1px solid #e8e8e8;border-radius: 4px;}
.ant-table-tbody > tr.ant-table-row-selected td {color: inherit;background: #fafafa;}
.ant-table-thead > tr > th.ant-table-column-sort {background: #f5f5f5;}
.ant-table-tbody > tr > td.ant-table-column-sort {background: rgba(0, 0, 0, 0.01);}
.ant-table-header {background: #fafafa;}
.ant-table-header table {border-radius: 4px 4px 0 0;}
.ant-table-loading .ant-table-body {background: #fff;}
.ant-table-bordered .ant-table-header > table, .ant-table-bordered .ant-table-body > table, .ant-table-bordered .ant-table-fixed-left table, .ant-table-bordered .ant-table-fixed-right table {border: 1px solid #e8e8e8;border-right: 0;border-bottom: 0;}
.ant-table-bordered.ant-table-empty .ant-table-placeholder {border-right: 1px solid #e8e8e8;border-left: 1px solid #e8e8e8;}
.ant-table-bordered.ant-table-fixed-header .ant-table-header > table {border-bottom: 0;}
.ant-table-bordered.ant-table-fixed-header .ant-table-body > table {border-top-left-radius: 0;border-top-right-radius: 0;}
.ant-table-bordered.ant-table-fixed-header .ant-table-header + .ant-table-body > table, .ant-table-bordered.ant-table-fixed-header .ant-table-body-inner > table {border-top: 0;}
.ant-table-bordered .ant-table-thead > tr:not(:last-child) > th {border-bottom: 1px solid #e8e8e8;}
.ant-table-bordered .ant-table-thead > tr > th, .ant-table-bordered .ant-table-tbody > tr > td {border-right: 1px solid #e8e8e8;}
.ant-table-placeholder {color: rgba(0, 0, 0, 0.25);background: #fff;border-top: 1px solid #e8e8e8;border-bottom: 1px solid #e8e8e8;border-radius: 0 0 4px 4px;}
.ant-table-filter-dropdown {background: #fff;border-radius: 4px;box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);}
.ant-table-filter-dropdown .ant-dropdown-menu {border: 0;border-radius: 4px 4px 0 0;box-shadow: none;}
.ant-table-filter-dropdown .ant-dropdown-menu-sub {border-radius: 4px;box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);}
.ant-table-filter-dropdown .ant-dropdown-menu .ant-dropdown-submenu-contain-selected .ant-dropdown-menu-submenu-title::after {color: @primary-color;}
.ant-table-filter-dropdown > .ant-dropdown-menu > .ant-dropdown-menu-item:last-child, .ant-table-filter-dropdown > .ant-dropdown-menu > .ant-dropdown-menu-submenu:last-child .ant-dropdown-menu-submenu-title {border-radius: 0;}
.ant-table-filter-dropdown-btns {border-top: 1px solid #e8e8e8;}
.ant-table-filter-dropdown-link {color: @primary-color;}
.ant-table-filter-dropdown-link:hover {color: color(~\`colorPalette("@{primary-color}", 5)\`);}
.ant-table-filter-dropdown-link:active {color: color(~\`colorPalette("@{primary-color}", 7)\`);}
.ant-table-selection .anticon-down {color: #bfbfbf;}
.ant-table-selection-menu {background: #fff;border-radius: 4px;box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);}
.ant-table-selection-menu .ant-action-down {color: #bfbfbf;}
.ant-table-selection-down:hover .anticon-down {color: rgba(0, 0, 0, 0.6);}
.ant-table-row-expand-icon {color: @primary-color;color: inherit;background: #fff;border: 1px solid #e8e8e8;border-radius: 2px;}
.ant-table-row-expand-icon:focus, .ant-table-row-expand-icon:hover {color: color(~\`colorPalette("@{primary-color}", 5)\`);}
.ant-table-row-expand-icon:active {color: color(~\`colorPalette("@{primary-color}", 7)\`);}
.ant-table-row-expand-icon:focus, .ant-table-row-expand-icon:hover, .ant-table-row-expand-icon:active {border-color: currentColor;}
tr.ant-table-expanded-row,
tr.ant-table-expanded-row:hover {background: #fbfbfb;}
.ant-table-scroll table .ant-table-fixed-columns-in-body:not([colspan]) {color: transparent;}
.ant-table-fixed-header > .ant-table-content > .ant-table-scroll > .ant-table-body {background: #fff;}
.ant-table-fixed-header .ant-table-scroll .ant-table-header::-webkit-scrollbar {border: 1px solid #e8e8e8;border-width: 0 0 1px 0;}
.ant-table-hide-scrollbar {scrollbar-color: transparent transparent;}
.ant-table-hide-scrollbar::-webkit-scrollbar {background-color: transparent;}
.ant-table-bordered.ant-table-fixed-header .ant-table-scroll .ant-table-header::-webkit-scrollbar {border: 1px solid #e8e8e8;border-width: 1px 1px 1px 0;}
.ant-table-bordered.ant-table-fixed-header .ant-table-scroll .ant-table-header.ant-table-hide-scrollbar .ant-table-thead > tr:only-child > th:last-child {border-right-color: transparent;}
.ant-table-fixed-left, .ant-table-fixed-right {border-radius: 0;}
.ant-table-fixed-left table, .ant-table-fixed-right table {background: #fff;}
.ant-table-fixed-header .ant-table-fixed-left .ant-table-body-outer .ant-table-fixed, .ant-table-fixed-header .ant-table-fixed-right .ant-table-body-outer .ant-table-fixed {border-radius: 0;}
.ant-table-fixed-left {box-shadow: 6px 0 6px -4px rgba(0, 0, 0, 0.15);}
.ant-table-fixed-left, .ant-table-fixed-left table {border-radius: 4px 0 0 0;}
.ant-table-fixed-left .ant-table-thead > tr > th:last-child {border-top-right-radius: 0;}
.ant-table-fixed-right {box-shadow: -6px 0 6px -4px rgba(0, 0, 0, 0.15);}
.ant-table-fixed-right, .ant-table-fixed-right table {border-radius: 0 4px 0 0;}
.ant-table-fixed-right .ant-table-expanded-row {color: transparent;}
.ant-table-fixed-right .ant-table-thead > tr > th:first-child {border-top-left-radius: 0;}
.ant-table.ant-table-scroll-position-left .ant-table-fixed-left {box-shadow: none;}
.ant-table.ant-table-scroll-position-right .ant-table-fixed-right {box-shadow: none;}
.ant-table-small {border: 1px solid #e8e8e8;border-radius: 4px;}
.ant-table-small > .ant-table-title {border-bottom: 1px solid #e8e8e8;}
.ant-table-small > .ant-table-content > .ant-table-footer {background-color: transparent;border-top: 1px solid #e8e8e8;}
.ant-table-small > .ant-table-content > .ant-table-footer::before {background-color: transparent;}
.ant-table-small > .ant-table-content > .ant-table-header > table, .ant-table-small > .ant-table-content > .ant-table-body > table, .ant-table-small > .ant-table-content > .ant-table-scroll > .ant-table-header > table, .ant-table-small > .ant-table-content > .ant-table-scroll > .ant-table-body > table, .ant-table-small > .ant-table-content > .ant-table-fixed-left > .ant-table-header > table, .ant-table-small > .ant-table-content > .ant-table-fixed-right > .ant-table-header > table, .ant-table-small > .ant-table-content > .ant-table-fixed-left > .ant-table-body-outer > .ant-table-body-inner > table, .ant-table-small > .ant-table-content > .ant-table-fixed-right > .ant-table-body-outer > .ant-table-body-inner > table {border: 0;}
.ant-table-small > .ant-table-content > .ant-table-header > table > .ant-table-thead > tr > th, .ant-table-small > .ant-table-content > .ant-table-body > table > .ant-table-thead > tr > th, .ant-table-small > .ant-table-content > .ant-table-scroll > .ant-table-header > table > .ant-table-thead > tr > th, .ant-table-small > .ant-table-content > .ant-table-scroll > .ant-table-body > table > .ant-table-thead > tr > th, .ant-table-small > .ant-table-content > .ant-table-fixed-left > .ant-table-header > table > .ant-table-thead > tr > th, .ant-table-small > .ant-table-content > .ant-table-fixed-right > .ant-table-header > table > .ant-table-thead > tr > th, .ant-table-small > .ant-table-content > .ant-table-fixed-left > .ant-table-body-outer > .ant-table-body-inner > table > .ant-table-thead > tr > th, .ant-table-small > .ant-table-content > .ant-table-fixed-right > .ant-table-body-outer > .ant-table-body-inner > table > .ant-table-thead > tr > th {background-color: transparent;}
.ant-table-small > .ant-table-content > .ant-table-header > table > .ant-table-thead > tr, .ant-table-small > .ant-table-content > .ant-table-body > table > .ant-table-thead > tr, .ant-table-small > .ant-table-content > .ant-table-scroll > .ant-table-header > table > .ant-table-thead > tr, .ant-table-small > .ant-table-content > .ant-table-scroll > .ant-table-body > table > .ant-table-thead > tr, .ant-table-small > .ant-table-content > .ant-table-fixed-left > .ant-table-header > table > .ant-table-thead > tr, .ant-table-small > .ant-table-content > .ant-table-fixed-right > .ant-table-header > table > .ant-table-thead > tr, .ant-table-small > .ant-table-content > .ant-table-fixed-left > .ant-table-body-outer > .ant-table-body-inner > table > .ant-table-thead > tr, .ant-table-small > .ant-table-content > .ant-table-fixed-right > .ant-table-body-outer > .ant-table-body-inner > table > .ant-table-thead > tr {border-bottom: 1px solid #e8e8e8;}
.ant-table-small > .ant-table-content > .ant-table-header > table > .ant-table-thead > tr > th.ant-table-column-sort, .ant-table-small > .ant-table-content > .ant-table-body > table > .ant-table-thead > tr > th.ant-table-column-sort, .ant-table-small > .ant-table-content > .ant-table-scroll > .ant-table-header > table > .ant-table-thead > tr > th.ant-table-column-sort, .ant-table-small > .ant-table-content > .ant-table-scroll > .ant-table-body > table > .ant-table-thead > tr > th.ant-table-column-sort, .ant-table-small > .ant-table-content > .ant-table-fixed-left > .ant-table-header > table > .ant-table-thead > tr > th.ant-table-column-sort, .ant-table-small > .ant-table-content > .ant-table-fixed-right > .ant-table-header > table > .ant-table-thead > tr > th.ant-table-column-sort, .ant-table-small > .ant-table-content > .ant-table-fixed-left > .ant-table-body-outer > .ant-table-body-inner > table > .ant-table-thead > tr > th.ant-table-column-sort, .ant-table-small > .ant-table-content > .ant-table-fixed-right > .ant-table-body-outer > .ant-table-body-inner > table > .ant-table-thead > tr > th.ant-table-column-sort {background-color: rgba(0, 0, 0, 0.01);}
.ant-table-small > .ant-table-content .ant-table-header {background-color: transparent;border-radius: 4px 4px 0 0;}
.ant-table-small > .ant-table-content .ant-table-placeholder, .ant-table-small > .ant-table-content .ant-table-row:last-child td {border-bottom: 0;}
.ant-table-small.ant-table-bordered {border-right: 0;}
.ant-table-small.ant-table-bordered .ant-table-title {border: 0;border-right: 1px solid #e8e8e8;border-bottom: 1px solid #e8e8e8;}
.ant-table-small.ant-table-bordered .ant-table-content {border-right: 1px solid #e8e8e8;}
.ant-table-small.ant-table-bordered .ant-table-footer {border: 0;border-top: 1px solid #e8e8e8;}
.ant-table-small.ant-table-bordered .ant-table-placeholder {border-right: 0;border-bottom: 0;border-left: 0;}
.ant-table-small.ant-table-bordered .ant-table-thead > tr > th.ant-table-row-cell-last, .ant-table-small.ant-table-bordered .ant-table-tbody > tr > td:last-child {border-right: none;}
.ant-table-small.ant-table-bordered .ant-table-fixed-left .ant-table-thead > tr > th:last-child, .ant-table-small.ant-table-bordered .ant-table-fixed-left .ant-table-tbody > tr > td:last-child {border-right: 1px solid #e8e8e8;}
.ant-table-small.ant-table-bordered .ant-table-fixed-right {border-right: 1px solid #e8e8e8;border-left: 1px solid #e8e8e8;}
.ant-table-small.ant-table-fixed-header > .ant-table-content > .ant-table-scroll > .ant-table-body {border-radius: 0 0 4px 4px;}
.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {background: #fafafa;border: 1px solid #e8e8e8;border-radius: 4px 4px 0 0;}
.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {color: @primary-color;background: #fff;border-color: #e8e8e8;border-bottom: 1px solid #fff;}
.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active::before {border-top: 2px solid transparent;}
.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-disabled {color: @primary-color;color: rgba(0, 0, 0, 0.25);}
.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab .ant-tabs-close-x {color: @text-color-secondary;}
.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab .ant-tabs-close-x:hover {color: @heading-color;}
.ant-tabs-extra-content .ant-tabs-new-tab {color: @text-color;border: 1px solid #e8e8e8;border-radius: 2px;}
.ant-tabs-extra-content .ant-tabs-new-tab:hover {color: @primary-color;border-color: @primary-color;}
.ant-tabs-vertical.ant-tabs-card .ant-tabs-card-bar.ant-tabs-left-bar .ant-tabs-tab, .ant-tabs-vertical.ant-tabs-card .ant-tabs-card-bar.ant-tabs-right-bar .ant-tabs-tab {border-bottom: 1px solid #e8e8e8;}
.ant-tabs-vertical.ant-tabs-card.ant-tabs-left .ant-tabs-card-bar.ant-tabs-left-bar .ant-tabs-tab {border-right: 0;border-radius: 4px 0 0 4px;}
.ant-tabs-vertical.ant-tabs-card.ant-tabs-right .ant-tabs-card-bar.ant-tabs-right-bar .ant-tabs-tab {border-left: 0;border-radius: 0 4px 4px 0;}
.ant-tabs .ant-tabs-card-bar.ant-tabs-bottom-bar .ant-tabs-tab {border-top: 0;border-bottom: 1px solid #e8e8e8;border-radius: 0 0 4px 4px;}
.ant-tabs .ant-tabs-card-bar.ant-tabs-bottom-bar .ant-tabs-tab-active {color: @primary-color;}
.ant-tabs {color: @text-color;}
.ant-tabs-ink-bar {background-color: @primary-color;}
.ant-tabs-bar {border-bottom: 1px solid #e8e8e8;}
.ant-tabs-bottom .ant-tabs-bottom-bar {border-top: 1px solid #e8e8e8;border-bottom: none;}
.ant-tabs-tab-prev, .ant-tabs-tab-next {color: @text-color-secondary;background-color: transparent;border: 0;}
.ant-tabs-tab-prev:hover, .ant-tabs-tab-next:hover {color: @text-color;}
.ant-tabs-tab-btn-disabled, .ant-tabs-tab-btn-disabled:hover {color: rgba(0, 0, 0, 0.25);}
.ant-tabs-nav .ant-tabs-tab::before {border-top: 2px solid transparent;border-radius: 4px 4px 0 0;}
.ant-tabs-nav .ant-tabs-tab:hover {color: color(~\`colorPalette("@{primary-color}", 5)\`);}
.ant-tabs-nav .ant-tabs-tab:active {color: color(~\`colorPalette("@{primary-color}", 7)\`);}
.ant-tabs-nav .ant-tabs-tab-active {color: @primary-color;}
.ant-tabs-nav .ant-tabs-tab-disabled, .ant-tabs-nav .ant-tabs-tab-disabled:hover {color: rgba(0, 0, 0, 0.25);}
.ant-tabs .ant-tabs-left-bar, .ant-tabs .ant-tabs-right-bar {border-bottom: 0;}
.ant-tabs .ant-tabs-left-bar {border-right: 1px solid #e8e8e8;}
.ant-tabs .ant-tabs-left-content {border-left: 1px solid #e8e8e8;}
.ant-tabs .ant-tabs-right-bar {border-left: 1px solid #e8e8e8;}
.ant-tabs .ant-tabs-right-content {border-right: 1px solid #e8e8e8;}
.ant-tag {color: @text-color;background: #fafafa;border: 1px solid #d9d9d9;border-radius: 4px;}
.ant-tag, .ant-tag a, .ant-tag a:hover {color: @text-color;}
.ant-tag .anticon-close {color: @text-color-secondary;}
.ant-tag .anticon-close:hover {color: @heading-color;}
.ant-tag-has-color {border-color: transparent;}
.ant-tag-has-color, .ant-tag-has-color a, .ant-tag-has-color a:hover, .ant-tag-has-color .anticon-close, .ant-tag-has-color .anticon-close:hover {color: #fff;}
.ant-tag-checkable {background-color: transparent;border-color: transparent;}
.ant-tag-checkable:not(.ant-tag-checkable-checked):hover {color: @primary-color;}
.ant-tag-checkable:active, .ant-tag-checkable-checked {color: #fff;}
.ant-tag-checkable-checked {background-color: @primary-color;}
.ant-tag-checkable:active {background-color: color(~\`colorPalette("@{primary-color}", 7)\`);}
.ant-tag-pink {color: #eb2f96;background: #fff0f6;border-color: #ffadd2;}
.ant-tag-pink-inverse {color: #fff;background: #eb2f96;border-color: #eb2f96;}
.ant-tag-magenta {color: #eb2f96;background: #fff0f6;border-color: #ffadd2;}
.ant-tag-magenta-inverse {color: #fff;background: #eb2f96;border-color: #eb2f96;}
.ant-tag-red {color: #f5222d;background: #fff1f0;border-color: #ffa39e;}
.ant-tag-red-inverse {color: #fff;background: #f5222d;border-color: #f5222d;}
.ant-tag-volcano {color: #fa541c;background: #fff2e8;border-color: #ffbb96;}
.ant-tag-volcano-inverse {color: #fff;background: #fa541c;border-color: #fa541c;}
.ant-tag-orange {color: #fa8c16;background: #fff7e6;border-color: #ffd591;}
.ant-tag-orange-inverse {color: #fff;background: #fa8c16;border-color: #fa8c16;}
.ant-tag-yellow {color: #fadb14;background: #feffe6;border-color: #fffb8f;}
.ant-tag-yellow-inverse {color: #fff;background: #fadb14;border-color: #fadb14;}
.ant-tag-gold {color: #faad14;background: #fffbe6;border-color: #ffe58f;}
.ant-tag-gold-inverse {color: #fff;background: #faad14;border-color: #faad14;}
.ant-tag-cyan {color: #13c2c2;background: #e6fffb;border-color: #87e8de;}
.ant-tag-cyan-inverse {color: #fff;background: #13c2c2;border-color: #13c2c2;}
.ant-tag-lime {color: #a0d911;background: #fcffe6;border-color: #eaff8f;}
.ant-tag-lime-inverse {color: #fff;background: #a0d911;border-color: #a0d911;}
.ant-tag-green {color: #52c41a;background: #f6ffed;border-color: #b7eb8f;}
.ant-tag-green-inverse {color: #fff;background: #52c41a;border-color: #52c41a;}
.ant-tag-blue {color: #1890ff;background: #e6f7ff;border-color: #91d5ff;}
.ant-tag-blue-inverse {color: #fff;background: #1890ff;border-color: #1890ff;}
.ant-tag-geekblue {color: #2f54eb;background: #f0f5ff;border-color: #adc6ff;}
.ant-tag-geekblue-inverse {color: #fff;background: #2f54eb;border-color: #2f54eb;}
.ant-tag-purple {color: #722ed1;background: #f9f0ff;border-color: #d3adf7;}
.ant-tag-purple-inverse {color: #fff;background: #722ed1;border-color: #722ed1;}
.ant-time-picker-panel {color: @text-color;}
.ant-time-picker-panel-inner {background-color: #fff;background-clip: padding-box;border-radius: 4px;box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);}
.ant-time-picker-panel-input {border: 0;}
.ant-time-picker-panel-input::-moz-placeholder {color: #bfbfbf;}
.ant-time-picker-panel-input:-ms-input-placeholder {color: #bfbfbf;}
.ant-time-picker-panel-input::-webkit-input-placeholder {color: #bfbfbf;}
.ant-time-picker-panel-input-wrap {border-bottom: 1px solid #e8e8e8;}
.ant-time-picker-panel-input-invalid {border-color: #f5222d;}
.ant-time-picker-panel-select {border-left: 1px solid #e8e8e8;}
.ant-time-picker-panel-select:first-child {border-left: 0;}
.ant-time-picker-panel-select:last-child {border-right: 0;}
.ant-time-picker-panel-select li:focus {color: @primary-color;}
.ant-time-picker-panel-select li:hover {background: color(~\`colorPalette("@{primary-color}", 1)\`);}
li.ant-time-picker-panel-select-option-selected {background: #f5f5f5;}
li.ant-time-picker-panel-select-option-selected:hover {background: #f5f5f5;}
li.ant-time-picker-panel-select-option-disabled {color: rgba(0, 0, 0, 0.25);}
li.ant-time-picker-panel-select-option-disabled:hover {background: transparent;}
li.ant-time-picker-panel-select-option-disabled:focus {color: rgba(0, 0, 0, 0.25);}
.ant-time-picker-panel-addon {border-top: 1px solid #e8e8e8;}
.ant-time-picker {color: @text-color;}
.ant-time-picker-input {color: @text-color;background-color: #fff;background-image: none;border: 1px solid #d9d9d9;border-radius: 4px;}
.ant-time-picker-input::-moz-placeholder {color: #bfbfbf;}
.ant-time-picker-input:-ms-input-placeholder {color: #bfbfbf;}
.ant-time-picker-input::-webkit-input-placeholder {color: #bfbfbf;}
.ant-time-picker-input:hover {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);border-right-width: 1px !important;}
.ant-time-picker-input:focus {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);border-right-width: 1px !important;box-shadow: 0 0 0 2px rgba(90, 105, 46, 0.2);}
.ant-time-picker-input-disabled {color: rgba(0, 0, 0, 0.25);background-color: #f5f5f5;}
.ant-time-picker-input-disabled:hover {border-color: #d9d9d9;border-right-width: 1px !important;}
.ant-time-picker-input[disabled] {color: rgba(0, 0, 0, 0.25);background-color: #f5f5f5;}
.ant-time-picker-input[disabled]:hover {border-color: #d9d9d9;border-right-width: 1px !important;}
.ant-time-picker-input[disabled] {color: rgba(0, 0, 0, 0.25);background-color: #f5f5f5;}
.ant-time-picker-input[disabled]:hover {border-color: #d9d9d9;border-right-width: 1px !important;}
.ant-time-picker-icon, .ant-time-picker-clear {color: rgba(0, 0, 0, 0.25);}
.ant-time-picker-icon .ant-time-picker-clock-icon, .ant-time-picker-clear .ant-time-picker-clock-icon {color: rgba(0, 0, 0, 0.25);}
.ant-time-picker-clear {background: #fff;}
.ant-time-picker-clear:hover {color: @text-color-secondary;}
.ant-timeline {color: @text-color;}
.ant-timeline-item-tail {border-left: 2px solid #e8e8e8;}
.ant-timeline-item-pending .ant-timeline-item-head {background-color: transparent;}
.ant-timeline-item-head {background-color: #fff;border: 2px solid transparent;border-radius: 100px;}
.ant-timeline-item-head-blue {color: @primary-color;border-color: @primary-color;}
.ant-timeline-item-head-red {color: #f5222d;border-color: #f5222d;}
.ant-timeline-item-head-green {color: #52c41a;border-color: #52c41a;}
.ant-timeline-item-head-gray {color: rgba(0, 0, 0, 0.25);border-color: rgba(0, 0, 0, 0.25);}
.ant-timeline-item-head-custom {border: 0;border-radius: 0;}
.ant-timeline.ant-timeline-pending .ant-timeline-item-last .ant-timeline-item-tail {border-left: 2px dotted #e8e8e8;}
.ant-timeline.ant-timeline-reverse .ant-timeline-item-pending .ant-timeline-item-tail {border-left: 2px dotted #e8e8e8;}
.ant-tooltip {color: @text-color;}
.ant-tooltip-inner {color: #fff;background-color: rgba(0, 0, 0, 0.75);border-radius: 4px;box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);}
.ant-tooltip-arrow {background: transparent;}
.ant-tooltip-arrow::before {background-color: rgba(0, 0, 0, 0.75);}
.ant-tooltip-placement-top .ant-tooltip-arrow::before, .ant-tooltip-placement-topLeft .ant-tooltip-arrow::before, .ant-tooltip-placement-topRight .ant-tooltip-arrow::before {box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.07);}
.ant-tooltip-placement-right .ant-tooltip-arrow::before, .ant-tooltip-placement-rightTop .ant-tooltip-arrow::before, .ant-tooltip-placement-rightBottom .ant-tooltip-arrow::before {box-shadow: -3px 3px 7px rgba(0, 0, 0, 0.07);}
.ant-tooltip-placement-left .ant-tooltip-arrow::before, .ant-tooltip-placement-leftTop .ant-tooltip-arrow::before, .ant-tooltip-placement-leftBottom .ant-tooltip-arrow::before {box-shadow: 3px -3px 7px rgba(0, 0, 0, 0.07);}
.ant-tooltip-placement-bottom .ant-tooltip-arrow::before, .ant-tooltip-placement-bottomLeft .ant-tooltip-arrow::before, .ant-tooltip-placement-bottomRight .ant-tooltip-arrow::before {box-shadow: -3px -3px 7px rgba(0, 0, 0, 0.07);}
.ant-transfer-customize-list .ant-table-wrapper .ant-table-small {border: 0;border-radius: 0;}
.ant-transfer-customize-list .ant-table-wrapper .ant-table-small > .ant-table-content > .ant-table-body > table > .ant-table-thead > tr > th {background: #fafafa;}
.ant-transfer-customize-list .ant-table-wrapper .ant-table-small > .ant-table-content .ant-table-row:last-child td {border-bottom: 1px solid #e8e8e8;}
.ant-transfer {color: @text-color;}
.ant-transfer-disabled .ant-transfer-list {background: #f5f5f5;}
.ant-transfer-list {border: 1px solid #d9d9d9;border-radius: 4px;}
.ant-transfer-list-search-action {color: rgba(0, 0, 0, 0.25);}
.ant-transfer-list-search-action .anticon {color: rgba(0, 0, 0, 0.25);}
.ant-transfer-list-search-action .anticon:hover {color: @text-color-secondary;}
.ant-transfer-list-header {color: @text-color;background: #fff;border-bottom: 1px solid #e8e8e8;border-radius: 4px 4px 0 0;}
.ant-transfer-list-content-item:not(.ant-transfer-list-content-item-disabled):hover {background-color: color(~\`colorPalette("@{primary-color}", 1)\`);}
.ant-transfer-list-content-item-disabled {color: rgba(0, 0, 0, 0.25);}
.ant-transfer-list-body-not-found {color: rgba(0, 0, 0, 0.25);}
.ant-transfer-list-footer {border-top: 1px solid #e8e8e8;border-radius: 0 0 4px 4px;}
.ant-tree.ant-tree-directory > li span.ant-tree-node-content-wrapper, .ant-tree.ant-tree-directory .ant-tree-child-tree > li span.ant-tree-node-content-wrapper {border-radius: 0;}
.ant-tree.ant-tree-directory > li span.ant-tree-node-content-wrapper:hover, .ant-tree.ant-tree-directory .ant-tree-child-tree > li span.ant-tree-node-content-wrapper:hover {background: transparent;}
.ant-tree.ant-tree-directory > li span.ant-tree-node-content-wrapper:hover::before, .ant-tree.ant-tree-directory .ant-tree-child-tree > li span.ant-tree-node-content-wrapper:hover::before {background: color(~\`colorPalette("@{primary-color}", 1)\`);}
.ant-tree.ant-tree-directory > li span.ant-tree-node-content-wrapper.ant-tree-node-selected, .ant-tree.ant-tree-directory .ant-tree-child-tree > li span.ant-tree-node-content-wrapper.ant-tree-node-selected {color: #fff;background: transparent;}
.ant-tree.ant-tree-directory > li.ant-tree-treenode-selected > span.ant-tree-switcher, .ant-tree.ant-tree-directory .ant-tree-child-tree > li.ant-tree-treenode-selected > span.ant-tree-switcher {color: #fff;}
.ant-tree.ant-tree-directory > li.ant-tree-treenode-selected > span.ant-tree-checkbox .ant-tree-checkbox-inner, .ant-tree.ant-tree-directory .ant-tree-child-tree > li.ant-tree-treenode-selected > span.ant-tree-checkbox .ant-tree-checkbox-inner {border-color: @primary-color;}
.ant-tree.ant-tree-directory > li.ant-tree-treenode-selected > span.ant-tree-checkbox.ant-tree-checkbox-checked::after, .ant-tree.ant-tree-directory .ant-tree-child-tree > li.ant-tree-treenode-selected > span.ant-tree-checkbox.ant-tree-checkbox-checked::after {border-color: #fff;}
.ant-tree.ant-tree-directory > li.ant-tree-treenode-selected > span.ant-tree-checkbox.ant-tree-checkbox-checked .ant-tree-checkbox-inner, .ant-tree.ant-tree-directory .ant-tree-child-tree > li.ant-tree-treenode-selected > span.ant-tree-checkbox.ant-tree-checkbox-checked .ant-tree-checkbox-inner {background: #fff;}
.ant-tree.ant-tree-directory > li.ant-tree-treenode-selected > span.ant-tree-checkbox.ant-tree-checkbox-checked .ant-tree-checkbox-inner::after, .ant-tree.ant-tree-directory .ant-tree-child-tree > li.ant-tree-treenode-selected > span.ant-tree-checkbox.ant-tree-checkbox-checked .ant-tree-checkbox-inner::after {border-color: @primary-color;}
.ant-tree.ant-tree-directory > li.ant-tree-treenode-selected > span.ant-tree-node-content-wrapper::before, .ant-tree.ant-tree-directory .ant-tree-child-tree > li.ant-tree-treenode-selected > span.ant-tree-node-content-wrapper::before {background: @primary-color;}
.ant-tree-checkbox {color: @text-color;}
.ant-tree-checkbox-wrapper:hover .ant-tree-checkbox-inner, .ant-tree-checkbox:hover .ant-tree-checkbox-inner, .ant-tree-checkbox-input:focus + .ant-tree-checkbox-inner {border-color: @primary-color;}
.ant-tree-checkbox-checked::after {border: 1px solid @primary-color;border-radius: 2px;}
.ant-tree-checkbox-inner {background-color: #fff;border: 1px solid #d9d9d9;border-radius: 2px;border-collapse: separate;}
.ant-tree-checkbox-inner::after {border: 2px solid #fff;border-top: 0;border-left: 0;}
.ant-tree-checkbox-checked .ant-tree-checkbox-inner::after {border: 2px solid #fff;border-top: 0;border-left: 0;}
.ant-tree-checkbox-checked .ant-tree-checkbox-inner {background-color: @primary-color;border-color: @primary-color;}
.ant-tree-checkbox-disabled.ant-tree-checkbox-checked .ant-tree-checkbox-inner::after {border-color: rgba(0, 0, 0, 0.25);}
.ant-tree-checkbox-disabled .ant-tree-checkbox-inner {background-color: #f5f5f5;border-color: #d9d9d9 !important;}
.ant-tree-checkbox-disabled .ant-tree-checkbox-inner::after {border-color: #f5f5f5;border-collapse: separate;}
.ant-tree-checkbox-disabled + span {color: rgba(0, 0, 0, 0.25);}
.ant-tree-checkbox-wrapper {color: @text-color;}
.ant-tree-checkbox-group {color: @text-color;}
.ant-tree-checkbox-indeterminate .ant-tree-checkbox-inner {background-color: #fff;border-color: #d9d9d9;}
.ant-tree-checkbox-indeterminate .ant-tree-checkbox-inner::after {background-color: @primary-color;border: 0;}
.ant-tree-checkbox-indeterminate.ant-tree-checkbox-disabled .ant-tree-checkbox-inner::after {background-color: rgba(0, 0, 0, 0.25);border-color: rgba(0, 0, 0, 0.25);}
.ant-tree {color: @text-color;}
.ant-tree li span[draggable], .ant-tree li span[draggable='true'] {border-top: 2px transparent solid;border-bottom: 2px transparent solid;}
.ant-tree li.drag-over > span[draggable] {color: white;background-color: @primary-color;}
.ant-tree li.drag-over-gap-top > span[draggable] {border-top-color: @primary-color;}
.ant-tree li.drag-over-gap-bottom > span[draggable] {border-bottom-color: @primary-color;}
.ant-tree li.filter-node > span {color: #f5222d !important;}
.ant-tree li.ant-tree-treenode-loading span.ant-tree-switcher.ant-tree-switcher_open .ant-tree-switcher-loading-icon, .ant-tree li.ant-tree-treenode-loading span.ant-tree-switcher.ant-tree-switcher_close .ant-tree-switcher-loading-icon {color: @primary-color;}
.ant-tree li .ant-tree-node-content-wrapper {color: @text-color;border-radius: 2px;}
.ant-tree li .ant-tree-node-content-wrapper:hover {background-color: color(~\`colorPalette("@{primary-color}", 1)\`);}
.ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected {background-color: color(~\`colorPalette("@{primary-color}", 2)\`);}
.ant-tree li span.ant-tree-switcher, .ant-tree li span.ant-tree-iconEle {border: 0 none;}
li.ant-tree-treenode-disabled > span:not(.ant-tree-switcher),
li.ant-tree-treenode-disabled > .ant-tree-node-content-wrapper,
li.ant-tree-treenode-disabled > .ant-tree-node-content-wrapper span {color: rgba(0, 0, 0, 0.25);}
li.ant-tree-treenode-disabled > .ant-tree-node-content-wrapper:hover {background: transparent;}
.ant-tree.ant-tree-show-line li span.ant-tree-switcher {color: @text-color-secondary;background: #fff;}
.ant-tree.ant-tree-show-line li:not(:last-child)::before {border-left: 1px solid #d9d9d9;}
.ant-select-tree-checkbox {color: @text-color;}
.ant-select-tree-checkbox-wrapper:hover .ant-select-tree-checkbox-inner, .ant-select-tree-checkbox:hover .ant-select-tree-checkbox-inner, .ant-select-tree-checkbox-input:focus + .ant-select-tree-checkbox-inner {border-color: @primary-color;}
.ant-select-tree-checkbox-checked::after {border: 1px solid @primary-color;border-radius: 2px;}
.ant-select-tree-checkbox-inner {background-color: #fff;border: 1px solid #d9d9d9;border-radius: 2px;border-collapse: separate;}
.ant-select-tree-checkbox-inner::after {border: 2px solid #fff;border-top: 0;border-left: 0;}
.ant-select-tree-checkbox-checked .ant-select-tree-checkbox-inner::after {border: 2px solid #fff;border-top: 0;border-left: 0;}
.ant-select-tree-checkbox-checked .ant-select-tree-checkbox-inner {background-color: @primary-color;border-color: @primary-color;}
.ant-select-tree-checkbox-disabled.ant-select-tree-checkbox-checked .ant-select-tree-checkbox-inner::after {border-color: rgba(0, 0, 0, 0.25);}
.ant-select-tree-checkbox-disabled .ant-select-tree-checkbox-inner {background-color: #f5f5f5;border-color: #d9d9d9 !important;}
.ant-select-tree-checkbox-disabled .ant-select-tree-checkbox-inner::after {border-color: #f5f5f5;border-collapse: separate;}
.ant-select-tree-checkbox-disabled + span {color: rgba(0, 0, 0, 0.25);}
.ant-select-tree-checkbox-wrapper {color: @text-color;}
.ant-select-tree-checkbox-group {color: @text-color;}
.ant-select-tree-checkbox-indeterminate .ant-select-tree-checkbox-inner {background-color: #fff;border-color: #d9d9d9;}
.ant-select-tree-checkbox-indeterminate .ant-select-tree-checkbox-inner::after {background-color: @primary-color;border: 0;}
.ant-select-tree-checkbox-indeterminate.ant-select-tree-checkbox-disabled .ant-select-tree-checkbox-inner::after {background-color: rgba(0, 0, 0, 0.25);border-color: rgba(0, 0, 0, 0.25);}
.ant-select-tree {color: @text-color;}
.ant-select-tree li .ant-select-tree-node-content-wrapper {color: @text-color;border-radius: 2px;}
.ant-select-tree li .ant-select-tree-node-content-wrapper:hover {background-color: color(~\`colorPalette("@{primary-color}", 1)\`);}
.ant-select-tree li .ant-select-tree-node-content-wrapper.ant-select-tree-node-selected {background-color: color(~\`colorPalette("@{primary-color}", 2)\`);}
.ant-select-tree li span.ant-select-tree-switcher, .ant-select-tree li span.ant-select-tree-iconEle {border: 0 none;}
.ant-select-tree li span.ant-select-icon_loading .ant-select-switcher-loading-icon {color: @primary-color;}
.ant-select-tree li span.ant-select-tree-switcher.ant-select-tree-switcher_open .ant-select-switcher-loading-icon, .ant-select-tree li span.ant-select-tree-switcher.ant-select-tree-switcher_close .ant-select-switcher-loading-icon {color: @primary-color;}
li.ant-select-tree-treenode-disabled > span:not(.ant-select-tree-switcher),
li.ant-select-tree-treenode-disabled > .ant-select-tree-node-content-wrapper,
li.ant-select-tree-treenode-disabled > .ant-select-tree-node-content-wrapper span {color: rgba(0, 0, 0, 0.25);}
li.ant-select-tree-treenode-disabled > .ant-select-tree-node-content-wrapper:hover {background: transparent;}
.ant-select-tree-dropdown {color: @text-color;}
.ant-select-tree-dropdown .ant-select-dropdown-search {background: #fff;}
.ant-select-tree-dropdown .ant-select-dropdown-search .ant-select-search__field {border: 1px solid #d9d9d9;border-radius: 4px;}
.ant-select-tree-dropdown .ant-select-not-found {color: rgba(0, 0, 0, 0.25);}
.ant-upload {color: @text-color;}
.ant-upload.ant-upload-select-picture-card {background-color: #fafafa;border: 1px dashed #d9d9d9;border-radius: 4px;}
.ant-upload.ant-upload-select-picture-card:hover {border-color: @primary-color;}
.ant-upload.ant-upload-drag {background: #fafafa;border: 1px dashed #d9d9d9;border-radius: 4px;}
.ant-upload.ant-upload-drag.ant-upload-drag-hover:not(.ant-upload-disabled) {border-color: color(~\`colorPalette("@{primary-color}", 7)\`);}
.ant-upload.ant-upload-drag:not(.ant-upload-disabled):hover {border-color: color(~\`colorPalette("@{primary-color}", 5)\`);}
.ant-upload.ant-upload-drag p.ant-upload-drag-icon .anticon {color: color(~\`colorPalette("@{primary-color}", 5)\`);}
.ant-upload.ant-upload-drag p.ant-upload-text {color: @heading-color;}
.ant-upload.ant-upload-drag p.ant-upload-hint {color: @text-color-secondary;}
.ant-upload.ant-upload-drag .anticon-plus {color: rgba(0, 0, 0, 0.25);}
.ant-upload.ant-upload-drag .anticon-plus:hover {color: @text-color-secondary;}
.ant-upload.ant-upload-drag:hover .anticon-plus {color: @text-color-secondary;}
.ant-upload-list {color: @text-color;}
.ant-upload-list-item-card-actions .anticon {color: rgba(0, 0, 0, 0.45);}
.ant-upload-list-item-info .anticon-loading, .ant-upload-list-item-info .anticon-paper-clip {color: @text-color-secondary;}
.ant-upload-list-item .anticon-close {color: @text-color-secondary;}
.ant-upload-list-item .anticon-close:hover {color: @text-color;}
.ant-upload-list-item:hover .ant-upload-list-item-info {background-color: color(~\`colorPalette("@{primary-color}", 1)\`);}
.ant-upload-list-item-error, .ant-upload-list-item-error .anticon-paper-clip, .ant-upload-list-item-error .ant-upload-list-item-name {color: #f5222d;}
.ant-upload-list-item-error .ant-upload-list-item-card-actions .anticon {color: #f5222d;}
.ant-upload-list-picture .ant-upload-list-item, .ant-upload-list-picture-card .ant-upload-list-item {border: 1px solid #d9d9d9;border-radius: 4px;}
.ant-upload-list-picture .ant-upload-list-item:hover, .ant-upload-list-picture-card .ant-upload-list-item:hover {background: transparent;}
.ant-upload-list-picture .ant-upload-list-item-error, .ant-upload-list-picture-card .ant-upload-list-item-error {border-color: #f5222d;}
.ant-upload-list-picture .ant-upload-list-item:hover .ant-upload-list-item-info, .ant-upload-list-picture-card .ant-upload-list-item:hover .ant-upload-list-item-info {background: transparent;}
.ant-upload-list-picture .ant-upload-list-item-uploading, .ant-upload-list-picture-card .ant-upload-list-item-uploading {border-style: dashed;}
.ant-upload-list-picture-card .ant-upload-list-item-info::before {background-color: rgba(0, 0, 0, 0.5);}
.ant-upload-list-picture-card .ant-upload-list-item-actions .anticon-eye-o, .ant-upload-list-picture-card .ant-upload-list-item-actions .anticon-download, .ant-upload-list-picture-card .ant-upload-list-item-actions .anticon-delete {color: rgba(255, 255, 255, 0.85);}
.ant-upload-list-picture-card .ant-upload-list-item-actions .anticon-eye-o:hover, .ant-upload-list-picture-card .ant-upload-list-item-actions .anticon-download:hover, .ant-upload-list-picture-card .ant-upload-list-item-actions .anticon-delete:hover {color: #fff;}
.ant-upload-list-picture-card .ant-upload-list-item-uploading.ant-upload-list-item {background-color: #fafafa;}
.ant-upload-list-picture-card .ant-upload-list-item-uploading-text {color: @text-color-secondary;}
.ant-upload-list .ant-upload-success-icon {color: #52c41a;}
.bezierEasingMixin() {
@functions: ~\`(function() {var NEWTON_ITERATIONS = 4;var NEWTON_MIN_SLOPE = 0.001;var SUBDIVISION_PRECISION = 0.0000001;var SUBDIVISION_MAX_ITERATIONS = 10;var kSplineTableSize = 11;var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);var float32ArraySupported = typeof Float32Array === 'function';function A (aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
  function B (aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
  function C (aA1)      { return 3.0 * aA1; }
  function calcBezier (aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT; }
  function getSlope (aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1); }
  function binarySubdivide (aX, aA, aB, mX1, mX2) {var currentX, currentT, i = 0;do {currentT = aA + (aB - aA) / 2.0;currentX = calcBezier(currentT, mX1, mX2) - aX;if (currentX > 0.0) {aB = currentT;} else {aA = currentT;}
    } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);return currentT;}
  function newtonRaphsonIterate (aX, aGuessT, mX1, mX2) {for (var i = 0; i < NEWTON_ITERATIONS; ++i) {var currentSlope = getSlope(aGuessT, mX1, mX2);if (currentSlope === 0.0) {return aGuessT;}
     var currentX = calcBezier(aGuessT, mX1, mX2) - aX;aGuessT -= currentX / currentSlope;}
   return aGuessT;}
  var BezierEasing = function (mX1, mY1, mX2, mY2) {if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {throw new Error('bezier x values must be in [0, 1] range');}
    var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);if (mX1 !== mY1 || mX2 !== mY2) {for (var i = 0; i < kSplineTableSize; ++i) {sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);}
    }
    function getTForX (aX) {var intervalStart = 0.0;var currentSample = 1;var lastSample = kSplineTableSize - 1;for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {intervalStart += kSampleStepSize;}
      --currentSample;var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);var guessForT = intervalStart + dist * kSampleStepSize;var initialSlope = getSlope(guessForT, mX1, mX2);if (initialSlope >= NEWTON_MIN_SLOPE) {return newtonRaphsonIterate(aX, guessForT, mX1, mX2);} else if (initialSlope === 0.0) {return guessForT;} else {return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);}
    }
    return function BezierEasing (x) {if (mX1 === mY1 && mX2 === mY2) {return x; 
      }
      if (x === 0) {return 0;}
      if (x === 1) {return 1;}
      return calcBezier(getTForX(x), mY1, mY2);};};this.colorEasing = BezierEasing(0.26, 0.09, 0.37, 0.18);return '';})()\`;}
.bezierEasingMixin();
.tinyColorMixin() {
@functions: ~\`(function() {
var trimLeft = /^\s+/,
    trimRight = /\s+$/,
    tinyCounter = 0,
    mathRound = Math.round,
    mathMin = Math.min,
    mathMax = Math.max,
    mathRandom = Math.random;
function tinycolor (color, opts) {color = (color) ? color : '';opts = opts || { };if (color instanceof tinycolor) {return color;}
    if (!(this instanceof tinycolor)) {return new tinycolor(color, opts);}
    var rgb = inputToRGB(color);this._originalInput = color,
    this._r = rgb.r,
    this._g = rgb.g,
    this._b = rgb.b,
    this._a = rgb.a,
    this._roundA = mathRound(100*this._a) / 100,
    this._format = opts.format || rgb.format;this._gradientType = opts.gradientType;if (this._r < 1) { this._r = mathRound(this._r); }
    if (this._g < 1) { this._g = mathRound(this._g); }
    if (this._b < 1) { this._b = mathRound(this._b); }
    this._ok = rgb.ok;this._tc_id = tinyCounter++;}
tinycolor.prototype = {isDark: function() {return this.getBrightness() < 128;},
    isLight: function() {return !this.isDark();},
    isValid: function() {return this._ok;},
    getOriginalInput: function() {return this._originalInput;},
    getFormat: function() {return this._format;},
    getAlpha: function() {return this._a;},
    getBrightness: function() {var rgb = this.toRgb();return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;},
    getLuminance: function() {var rgb = this.toRgb();var RsRGB, GsRGB, BsRGB, R, G, B;RsRGB = rgb.r/255;GsRGB = rgb.g/255;BsRGB = rgb.b/255;if (RsRGB <= 0.03928) {R = RsRGB / 12.92;} else {R = Math.pow(((RsRGB + 0.055) / 1.055), 2.4);}
        if (GsRGB <= 0.03928) {G = GsRGB / 12.92;} else {G = Math.pow(((GsRGB + 0.055) / 1.055), 2.4);}
        if (BsRGB <= 0.03928) {B = BsRGB / 12.92;} else {B = Math.pow(((BsRGB + 0.055) / 1.055), 2.4);}
        return (0.2126 * R) + (0.7152 * G) + (0.0722 * B);},
    setAlpha: function(value) {this._a = boundAlpha(value);this._roundA = mathRound(100*this._a) / 100;return this;},
    toHsv: function() {var hsv = rgbToHsv(this._r, this._g, this._b);return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };},
    toHsvString: function() {var hsv = rgbToHsv(this._r, this._g, this._b);var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);return (this._a == 1) ?
          "hsv("  + h + ", " + s + "%, " + v + "%)" :
          "hsva(" + h + ", " + s + "%, " + v + "%, "+ this._roundA + ")";},
    toHsl: function() {var hsl = rgbToHsl(this._r, this._g, this._b);return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };},
    toHslString: function() {var hsl = rgbToHsl(this._r, this._g, this._b);var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);return (this._a == 1) ?
          "hsl("  + h + ", " + s + "%, " + l + "%)" :
          "hsla(" + h + ", " + s + "%, " + l + "%, "+ this._roundA + ")";},
    toHex: function(allow3Char) {return rgbToHex(this._r, this._g, this._b, allow3Char);},
    toHexString: function(allow3Char) {return '#' + this.toHex(allow3Char);},
    toHex8: function(allow4Char) {return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);},
    toHex8String: function(allow4Char) {return '#' + this.toHex8(allow4Char);},
    toRgb: function() {return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };},
    toRgbString: function() {return (this._a == 1) ?
          "rgb("  + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" :
          "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";},
    toPercentageRgb: function() {return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };},
    toPercentageRgbString: function() {return (this._a == 1) ?
          "rgb("  + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" :
          "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";},
    toName: function() {if (this._a === 0) {return "transparent";}
        if (this._a < 1) {return false;}
        return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;},
    toFilter: function(secondColor) {var hex8String = '#' + rgbaToArgbHex(this._r, this._g, this._b, this._a);var secondHex8String = hex8String;var gradientType = this._gradientType ? "GradientType = 1, " : "";if (secondColor) {var s = tinycolor(secondColor);secondHex8String = '#' + rgbaToArgbHex(s._r, s._g, s._b, s._a);}
        return "progid:DXImageTransform.Microsoft.gradient("+gradientType+"startColorstr="+hex8String+",endColorstr="+secondHex8String+")";},
    toString: function(format) {var formatSet = !!format;format = format || this._format;var formattedString = false;var hasAlpha = this._a < 1 && this._a >= 0;var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");if (needsAlphaFormat) {if (format === "name" && this._a === 0) {return this.toName();}
            return this.toRgbString();}
        if (format === "rgb") {formattedString = this.toRgbString();}
        if (format === "prgb") {formattedString = this.toPercentageRgbString();}
        if (format === "hex" || format === "hex6") {formattedString = this.toHexString();}
        if (format === "hex3") {formattedString = this.toHexString(true);}
        if (format === "hex4") {formattedString = this.toHex8String(true);}
        if (format === "hex8") {formattedString = this.toHex8String();}
        if (format === "name") {formattedString = this.toName();}
        if (format === "hsl") {formattedString = this.toHslString();}
        if (format === "hsv") {formattedString = this.toHsvString();}
        return formattedString || this.toHexString();},
    clone: function() {return tinycolor(this.toString());},
    _applyModification: function(fn, args) {var color = fn.apply(null, [this].concat([].slice.call(args)));this._r = color._r;this._g = color._g;this._b = color._b;this.setAlpha(color._a);return this;},
    lighten: function() {return this._applyModification(lighten, arguments);},
    brighten: function() {return this._applyModification(brighten, arguments);},
    darken: function() {return this._applyModification(darken, arguments);},
    desaturate: function() {return this._applyModification(desaturate, arguments);},
    saturate: function() {return this._applyModification(saturate, arguments);},
    greyscale: function() {return this._applyModification(greyscale, arguments);},
    spin: function() {return this._applyModification(spin, arguments);},
    _applyCombination: function(fn, args) {return fn.apply(null, [this].concat([].slice.call(args)));},
    analogous: function() {return this._applyCombination(analogous, arguments);},
    complement: function() {return this._applyCombination(complement, arguments);},
    monochromatic: function() {return this._applyCombination(monochromatic, arguments);},
    splitcomplement: function() {return this._applyCombination(splitcomplement, arguments);},
    triad: function() {return this._applyCombination(triad, arguments);},
    tetrad: function() {return this._applyCombination(tetrad, arguments);}
};
tinycolor.fromRatio = function(color, opts) {if (typeof color == "object") {var newColor = {};for (var i in color) {if (color.hasOwnProperty(i)) {if (i === "a") {newColor[i] = color[i];}
                else {newColor[i] = convertToPercentage(color[i]);}
            }
        }
        color = newColor;}
    return tinycolor(color, opts);};
function inputToRGB(color) {var rgb = { r: 0, g: 0, b: 0 };var a = 1;var s = null;var v = null;var l = null;var ok = false;var format = false;if (typeof color == "string") {color = stringInputToObject(color);}
    if (typeof color == "object") {if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {rgb = rgbToRgb(color.r, color.g, color.b);ok = true;format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";}
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {s = convertToPercentage(color.s);v = convertToPercentage(color.v);rgb = hsvToRgb(color.h, s, v);ok = true;format = "hsv";}
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {s = convertToPercentage(color.s);l = convertToPercentage(color.l);rgb = hslToRgb(color.h, s, l);ok = true;format = "hsl";}
        if (color.hasOwnProperty("a")) {a = color.a;}
    }
    a = boundAlpha(a);return {ok: ok,
        format: color.format || format,
        r: mathMin(255, mathMax(rgb.r, 0)),
        g: mathMin(255, mathMax(rgb.g, 0)),
        b: mathMin(255, mathMax(rgb.b, 0)),
        a: a
    };}
function rgbToRgb(r, g, b){return {r: bound01(r, 255) * 255,
        g: bound01(g, 255) * 255,
        b: bound01(b, 255) * 255
    };}
function rgbToHsl(r, g, b) {r = bound01(r, 255);g = bound01(g, 255);b = bound01(b, 255);var max = mathMax(r, g, b), min = mathMin(r, g, b);var h, s, l = (max + min) / 2;if(max == min) {h = s = 0; 
    }
    else {var d = max - min;s = l > 0.5 ? d / (2 - max - min) : d / (max + min);switch(max) {case r: h = (g - b) / d + (g < b ? 6 : 0); break;case g: h = (b - r) / d + 2; break;case b: h = (r - g) / d + 4; break;}
        h /= 6;}
    return { h: h, s: s, l: l };}
function hslToRgb(h, s, l) {var r, g, b;h = bound01(h, 360);s = bound01(s, 100);l = bound01(l, 100);function hue2rgb(p, q, t) {if(t < 0) t += 1;if(t > 1) t -= 1;if(t < 1/6) return p + (q - p) * 6 * t;if(t < 1/2) return q;if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;return p;}
    if(s === 0) {r = g = b = l; 
    }
    else {var q = l < 0.5 ? l * (1 + s) : l + s - l * s;var p = 2 * l - q;r = hue2rgb(p, q, h + 1/3);g = hue2rgb(p, q, h);b = hue2rgb(p, q, h - 1/3);}
    return { r: r * 255, g: g * 255, b: b * 255 };}
function rgbToHsv(r, g, b) {r = bound01(r, 255);g = bound01(g, 255);b = bound01(b, 255);var max = mathMax(r, g, b), min = mathMin(r, g, b);var h, s, v = max;var d = max - min;s = max === 0 ? 0 : d / max;if(max == min) {h = 0; 
    }
    else {switch(max) {case r: h = (g - b) / d + (g < b ? 6 : 0); break;case g: h = (b - r) / d + 2; break;case b: h = (r - g) / d + 4; break;}
        h /= 6;}
    return { h: h, s: s, v: v };}
 function hsvToRgb(h, s, v) {h = bound01(h, 360) * 6;s = bound01(s, 100);v = bound01(v, 100);var i = Math.floor(h),
        f = h - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s),
        mod = i % 6,
        r = [v, q, p, p, t, v][mod],
        g = [t, v, v, q, p, p][mod],
        b = [p, p, t, v, v, q][mod];return { r: r * 255, g: g * 255, b: b * 255 };}
function rgbToHex(r, g, b, allow3Char) {var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
    ];if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);}
    return hex.join("");}
function rgbaToHex(r, g, b, a, allow4Char) {var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16)),
        pad2(convertDecimalToHex(a))
    ];if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);}
    return hex.join("");}
function rgbaToArgbHex(r, g, b, a) {var hex = [
        pad2(convertDecimalToHex(a)),
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
    ];return hex.join("");}
tinycolor.equals = function (color1, color2) {if (!color1 || !color2) { return false; }
    return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();};
tinycolor.random = function() {return tinycolor.fromRatio({r: mathRandom(),
        g: mathRandom(),
        b: mathRandom()
    });};
function desaturate(color, amount) {amount = (amount === 0) ? 0 : (amount || 10);var hsl = tinycolor(color).toHsl();hsl.s -= amount / 100;hsl.s = clamp01(hsl.s);return tinycolor(hsl);}
function saturate(color, amount) {amount = (amount === 0) ? 0 : (amount || 10);var hsl = tinycolor(color).toHsl();hsl.s += amount / 100;hsl.s = clamp01(hsl.s);return tinycolor(hsl);}
function greyscale(color) {return tinycolor(color).desaturate(100);}
function lighten (color, amount) {amount = (amount === 0) ? 0 : (amount || 10);var hsl = tinycolor(color).toHsl();hsl.l += amount / 100;hsl.l = clamp01(hsl.l);return tinycolor(hsl);}
function brighten(color, amount) {amount = (amount === 0) ? 0 : (amount || 10);var rgb = tinycolor(color).toRgb();rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * - (amount / 100))));rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * - (amount / 100))));rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * - (amount / 100))));return tinycolor(rgb);}
function darken (color, amount) {amount = (amount === 0) ? 0 : (amount || 10);var hsl = tinycolor(color).toHsl();hsl.l -= amount / 100;hsl.l = clamp01(hsl.l);return tinycolor(hsl);}
function spin(color, amount) {var hsl = tinycolor(color).toHsl();var hue = (hsl.h + amount) % 360;hsl.h = hue < 0 ? 360 + hue : hue;return tinycolor(hsl);}
function complement(color) {var hsl = tinycolor(color).toHsl();hsl.h = (hsl.h + 180) % 360;return tinycolor(hsl);}
function triad(color) {var hsl = tinycolor(color).toHsl();var h = hsl.h;return [
        tinycolor(color),
        tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })
    ];}
function tetrad(color) {var hsl = tinycolor(color).toHsl();var h = hsl.h;return [
        tinycolor(color),
        tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })
    ];}
function splitcomplement(color) {var hsl = tinycolor(color).toHsl();var h = hsl.h;return [
        tinycolor(color),
        tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l}),
        tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l})
    ];}
function analogous(color, results, slices) {results = results || 6;slices = slices || 30;var hsl = tinycolor(color).toHsl();var part = 360 / slices;var ret = [tinycolor(color)];for (hsl.h = ((hsl.h - (part * results >> 1)) + 720) % 360; --results; ) {hsl.h = (hsl.h + part) % 360;ret.push(tinycolor(hsl));}
    return ret;}
function monochromatic(color, results) {results = results || 6;var hsv = tinycolor(color).toHsv();var h = hsv.h, s = hsv.s, v = hsv.v;var ret = [];var modification = 1 / results;while (results--) {ret.push(tinycolor({ h: h, s: s, v: v}));v = (v + modification) % 1;}
    return ret;}
tinycolor.mix = function(color1, color2, amount) {amount = (amount === 0) ? 0 : (amount || 50);var rgb1 = tinycolor(color1).toRgb();var rgb2 = tinycolor(color2).toRgb();var p = amount / 100;var rgba = {r: ((rgb2.r - rgb1.r) * p) + rgb1.r,
        g: ((rgb2.g - rgb1.g) * p) + rgb1.g,
        b: ((rgb2.b - rgb1.b) * p) + rgb1.b,
        a: ((rgb2.a - rgb1.a) * p) + rgb1.a
    };return tinycolor(rgba);};
tinycolor.readability = function(color1, color2) {var c1 = tinycolor(color1);var c2 = tinycolor(color2);return (Math.max(c1.getLuminance(),c2.getLuminance())+0.05) / (Math.min(c1.getLuminance(),c2.getLuminance())+0.05);};
tinycolor.isReadable = function(color1, color2, wcag2) {var readability = tinycolor.readability(color1, color2);var wcag2Parms, out;out = false;wcag2Parms = validateWCAG2Parms(wcag2);switch (wcag2Parms.level + wcag2Parms.size) {case "AAsmall":
        case "AAAlarge":
            out = readability >= 4.5;break;case "AAlarge":
            out = readability >= 3;break;case "AAAsmall":
            out = readability >= 7;break;}
    return out;};
tinycolor.mostReadable = function(baseColor, colorList, args) {var bestColor = null;var bestScore = 0;var readability;var includeFallbackColors, level, size ;args = args || {};includeFallbackColors = args.includeFallbackColors ;level = args.level;size = args.size;for (var i= 0; i < colorList.length ; i++) {readability = tinycolor.readability(baseColor, colorList[i]);if (readability > bestScore) {bestScore = readability;bestColor = tinycolor(colorList[i]);}
    }
    if (tinycolor.isReadable(baseColor, bestColor, {"level":level,"size":size}) || !includeFallbackColors) {return bestColor;}
    else {args.includeFallbackColors=false;return tinycolor.mostReadable(baseColor,["#fff", "#000"],args);}
};
var names = tinycolor.names = {aliceblue: "f0f8ff",
    antiquewhite: "faebd7",
    aqua: "0ff",
    aquamarine: "7fffd4",
    azure: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "000",
    blanchedalmond: "ffebcd",
    blue: "00f",
    blueviolet: "8a2be2",
    brown: "a52a2a",
    burlywood: "deb887",
    burntsienna: "ea7e5d",
    cadetblue: "5f9ea0",
    chartreuse: "7fff00",
    chocolate: "d2691e",
    coral: "ff7f50",
    cornflowerblue: "6495ed",
    cornsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "0ff",
    darkblue: "00008b",
    darkcyan: "008b8b",
    darkgoldenrod: "b8860b",
    darkgray: "a9a9a9",
    darkgreen: "006400",
    darkgrey: "a9a9a9",
    darkkhaki: "bdb76b",
    darkmagenta: "8b008b",
    darkolivegreen: "556b2f",
    darkorange: "ff8c00",
    darkorchid: "9932cc",
    darkred: "8b0000",
    darksalmon: "e9967a",
    darkseagreen: "8fbc8f",
    darkslateblue: "483d8b",
    darkslategray: "2f4f4f",
    darkslategrey: "2f4f4f",
    darkturquoise: "00ced1",
    darkviolet: "9400d3",
    deeppink: "ff1493",
    deepskyblue: "00bfff",
    dimgray: "696969",
    dimgrey: "696969",
    dodgerblue: "1e90ff",
    firebrick: "b22222",
    floralwhite: "fffaf0",
    forestgreen: "228b22",
    fuchsia: "f0f",
    gainsboro: "dcdcdc",
    ghostwhite: "f8f8ff",
    gold: "ffd700",
    goldenrod: "daa520",
    gray: "808080",
    green: "008000",
    greenyellow: "adff2f",
    grey: "808080",
    honeydew: "f0fff0",
    hotpink: "ff69b4",
    indianred: "cd5c5c",
    indigo: "4b0082",
    ivory: "fffff0",
    khaki: "f0e68c",
    lavender: "e6e6fa",
    lavenderblush: "fff0f5",
    lawngreen: "7cfc00",
    lemonchiffon: "fffacd",
    lightblue: "add8e6",
    lightcoral: "f08080",
    lightcyan: "e0ffff",
    lightgoldenrodyellow: "fafad2",
    lightgray: "d3d3d3",
    lightgreen: "90ee90",
    lightgrey: "d3d3d3",
    lightpink: "ffb6c1",
    lightsalmon: "ffa07a",
    lightseagreen: "20b2aa",
    lightskyblue: "87cefa",
    lightslategray: "789",
    lightslategrey: "789",
    lightsteelblue: "b0c4de",
    lightyellow: "ffffe0",
    lime: "0f0",
    limegreen: "32cd32",
    linen: "faf0e6",
    magenta: "f0f",
    maroon: "800000",
    mediumaquamarine: "66cdaa",
    mediumblue: "0000cd",
    mediumorchid: "ba55d3",
    mediumpurple: "9370db",
    mediumseagreen: "3cb371",
    mediumslateblue: "7b68ee",
    mediumspringgreen: "00fa9a",
    mediumturquoise: "48d1cc",
    mediumvioletred: "c71585",
    midnightblue: "191970",
    mintcream: "f5fffa",
    mistyrose: "ffe4e1",
    moccasin: "ffe4b5",
    navajowhite: "ffdead",
    navy: "000080",
    oldlace: "fdf5e6",
    olive: "808000",
    olivedrab: "6b8e23",
    orange: "ffa500",
    orangered: "ff4500",
    orchid: "da70d6",
    palegoldenrod: "eee8aa",
    palegreen: "98fb98",
    paleturquoise: "afeeee",
    palevioletred: "db7093",
    papayawhip: "ffefd5",
    peachpuff: "ffdab9",
    peru: "cd853f",
    pink: "ffc0cb",
    plum: "dda0dd",
    powderblue: "b0e0e6",
    purple: "800080",
    rebeccapurple: "663399",
    red: "f00",
    rosybrown: "bc8f8f",
    royalblue: "4169e1",
    saddlebrown: "8b4513",
    salmon: "fa8072",
    sandybrown: "f4a460",
    seagreen: "2e8b57",
    seashell: "fff5ee",
    sienna: "a0522d",
    silver: "c0c0c0",
    skyblue: "87ceeb",
    slateblue: "6a5acd",
    slategray: "708090",
    slategrey: "708090",
    snow: "fffafa",
    springgreen: "00ff7f",
    steelblue: "4682b4",
    tan: "d2b48c",
    teal: "008080",
    thistle: "d8bfd8",
    tomato: "ff6347",
    turquoise: "40e0d0",
    violet: "ee82ee",
    wheat: "f5deb3",
    white: "fff",
    whitesmoke: "f5f5f5",
    yellow: "ff0",
    yellowgreen: "9acd32"
};
var hexNames = tinycolor.hexNames = flip(names);
function flip(o) {var flipped = { };for (var i in o) {if (o.hasOwnProperty(i)) {flipped[o[i]] = i;}
    }
    return flipped;}
function boundAlpha(a) {a = parseFloat(a);if (isNaN(a) || a < 0 || a > 1) {a = 1;}
    return a;}
function bound01(n, max) {if (isOnePointZero(n)) { n = "100%"; }
    var processPercent = isPercentage(n);n = mathMin(max, mathMax(0, parseFloat(n)));if (processPercent) {n = parseInt(n * max, 10) / 100;}
    if ((Math.abs(n - max) < 0.000001)) {return 1;}
    return (n % max) / parseFloat(max);}
function clamp01(val) {return mathMin(1, mathMax(0, val));}
function parseIntFromHex(val) {return parseInt(val, 16);}
function isOnePointZero(n) {return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;}
function isPercentage(n) {return typeof n === "string" && n.indexOf('%') != -1;}
function pad2(c) {return c.length == 1 ? '0' + c : '' + c;}
function convertToPercentage(n) {if (n <= 1) {n = (n * 100) + "%";}
    return n;}
function convertDecimalToHex(d) {return Math.round(parseFloat(d) * 255).toString(16);}
function convertHexToDecimal(h) {return (parseIntFromHex(h) / 255);}
var matchers = (function() {var CSS_INTEGER = "[-\\+]?\\d+%?";var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";return {CSS_UNIT: new RegExp(CSS_UNIT),
        rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
        rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
        hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
        hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
        hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
        hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
        hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
        hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
    };})();
function isValidCSSUnit(color) {return !!matchers.CSS_UNIT.exec(color);}
function stringInputToObject(color) {color = color.replace(trimLeft, '').replace(trimRight, '').toLowerCase();var named = false;if (names[color]) {color = names[color];named = true;}
    else if (color == 'transparent') {return { r: 0, g: 0, b: 0, a: 0, format: "name" };}
    var match;if ((match = matchers.rgb.exec(color))) {return { r: match[1], g: match[2], b: match[3] };}
    if ((match = matchers.rgba.exec(color))) {return { r: match[1], g: match[2], b: match[3], a: match[4] };}
    if ((match = matchers.hsl.exec(color))) {return { h: match[1], s: match[2], l: match[3] };}
    if ((match = matchers.hsla.exec(color))) {return { h: match[1], s: match[2], l: match[3], a: match[4] };}
    if ((match = matchers.hsv.exec(color))) {return { h: match[1], s: match[2], v: match[3] };}
    if ((match = matchers.hsva.exec(color))) {return { h: match[1], s: match[2], v: match[3], a: match[4] };}
    if ((match = matchers.hex8.exec(color))) {return {r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: convertHexToDecimal(match[4]),
            format: named ? "name" : "hex8"
        };}
    if ((match = matchers.hex6.exec(color))) {return {r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            format: named ? "name" : "hex"
        };}
    if ((match = matchers.hex4.exec(color))) {return {r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            a: convertHexToDecimal(match[4] + '' + match[4]),
            format: named ? "name" : "hex8"
        };}
    if ((match = matchers.hex3.exec(color))) {return {r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            format: named ? "name" : "hex"
        };}
    return false;}
function validateWCAG2Parms(parms) {var level, size;parms = parms || {"level":"AA", "size":"small"};level = (parms.level || "AA").toUpperCase();size = (parms.size || "small").toLowerCase();if (level !== "AA" && level !== "AAA") {level = "AA";}
    if (size !== "small" && size !== "large") {size = "small";}
    return {"level":level, "size":size};}
this.tinycolor = tinycolor;})()\`;}
.tinyColorMixin();
.colorPaletteMixin() {
@functions: ~\`(function() {var hueStep = 2;var saturationStep = 16;var saturationStep2 = 5;var brightnessStep1 = 5;var brightnessStep2 = 15;var lightColorCount = 5;var darkColorCount = 4;var getHue = function(hsv, i, isLight) {var hue;if (hsv.h >= 60 && hsv.h <= 240) {hue = isLight ? hsv.h - hueStep * i : hsv.h + hueStep * i;} else {hue = isLight ? hsv.h + hueStep * i : hsv.h - hueStep * i;}
    if (hue < 0) {hue += 360;} else if (hue >= 360) {hue -= 360;}
    return Math.round(hue);};var getSaturation = function(hsv, i, isLight) {var saturation;if (isLight) {saturation = Math.round(hsv.s * 100) - saturationStep * i;} else if (i === darkColorCount) {saturation = Math.round(hsv.s * 100) + saturationStep;} else {saturation = Math.round(hsv.s * 100) + saturationStep2 * i;}
    if (saturation > 100) {saturation = 100;}
    if (isLight && i === lightColorCount && saturation > 10) {saturation = 10;}
    if (saturation < 6) {saturation = 6;}
    return Math.round(saturation);};var getValue = function(hsv, i, isLight) {if (isLight) {return Math.round(hsv.v * 100) + brightnessStep1 * i;}
    return Math.round(hsv.v * 100) - brightnessStep2 * i;};this.colorPalette = function(color, index) {var isLight = index <= 6;var hsv = tinycolor(color).toHsv();var i = isLight ? lightColorCount + 1 - index : index - lightColorCount - 1;return tinycolor({h: getHue(hsv, i, isLight),
      s: getSaturation(hsv, i, isLight),
      v: getValue(hsv, i, isLight),
    }).toHexString();};})()\`;}
.colorPaletteMixin();
@blue-1: color(~\`colorPalette('@{blue-6}', 1) \`);
@blue-2: color(~\`colorPalette('@{blue-6}', 2) \`);
@blue-3: color(~\`colorPalette('@{blue-6}', 3) \`);
@blue-4: color(~\`colorPalette('@{blue-6}', 4) \`);
@blue-5: color(~\`colorPalette('@{blue-6}', 5) \`);
@blue-6: #1890ff;
@blue-7: color(~\`colorPalette('@{blue-6}', 7) \`);
@blue-8: color(~\`colorPalette('@{blue-6}', 8) \`);
@blue-9: color(~\`colorPalette('@{blue-6}', 9) \`);
@blue-10: color(~\`colorPalette('@{blue-6}', 10) \`);
@purple-1: color(~\`colorPalette('@{purple-6}', 1) \`);
@purple-2: color(~\`colorPalette('@{purple-6}', 2) \`);
@purple-3: color(~\`colorPalette('@{purple-6}', 3) \`);
@purple-4: color(~\`colorPalette('@{purple-6}', 4) \`);
@purple-5: color(~\`colorPalette('@{purple-6}', 5) \`);
@purple-6: #722ed1;
@purple-7: color(~\`colorPalette('@{purple-6}', 7) \`);
@purple-8: color(~\`colorPalette('@{purple-6}', 8) \`);
@purple-9: color(~\`colorPalette('@{purple-6}', 9) \`);
@purple-10: color(~\`colorPalette('@{purple-6}', 10) \`);
@cyan-1: color(~\`colorPalette('@{cyan-6}', 1) \`);
@cyan-2: color(~\`colorPalette('@{cyan-6}', 2) \`);
@cyan-3: color(~\`colorPalette('@{cyan-6}', 3) \`);
@cyan-4: color(~\`colorPalette('@{cyan-6}', 4) \`);
@cyan-5: color(~\`colorPalette('@{cyan-6}', 5) \`);
@cyan-6: #13c2c2;
@cyan-7: color(~\`colorPalette('@{cyan-6}', 7) \`);
@cyan-8: color(~\`colorPalette('@{cyan-6}', 8) \`);
@cyan-9: color(~\`colorPalette('@{cyan-6}', 9) \`);
@cyan-10: color(~\`colorPalette('@{cyan-6}', 10) \`);
@green-1: color(~\`colorPalette('@{green-6}', 1) \`);
@green-2: color(~\`colorPalette('@{green-6}', 2) \`);
@green-3: color(~\`colorPalette('@{green-6}', 3) \`);
@green-4: color(~\`colorPalette('@{green-6}', 4) \`);
@green-5: color(~\`colorPalette('@{green-6}', 5) \`);
@green-6: #52c41a;
@green-7: color(~\`colorPalette('@{green-6}', 7) \`);
@green-8: color(~\`colorPalette('@{green-6}', 8) \`);
@green-9: color(~\`colorPalette('@{green-6}', 9) \`);
@green-10: color(~\`colorPalette('@{green-6}', 10) \`);
@magenta-1: color(~\`colorPalette('@{magenta-6}', 1) \`);
@magenta-2: color(~\`colorPalette('@{magenta-6}', 2) \`);
@magenta-3: color(~\`colorPalette('@{magenta-6}', 3) \`);
@magenta-4: color(~\`colorPalette('@{magenta-6}', 4) \`);
@magenta-5: color(~\`colorPalette('@{magenta-6}', 5) \`);
@magenta-6: #eb2f96;
@magenta-7: color(~\`colorPalette('@{magenta-6}', 7) \`);
@magenta-8: color(~\`colorPalette('@{magenta-6}', 8) \`);
@magenta-9: color(~\`colorPalette('@{magenta-6}', 9) \`);
@magenta-10: color(~\`colorPalette('@{magenta-6}', 10) \`);
@pink-1: color(~\`colorPalette('@{pink-6}', 1) \`);
@pink-2: color(~\`colorPalette('@{pink-6}', 2) \`);
@pink-3: color(~\`colorPalette('@{pink-6}', 3) \`);
@pink-4: color(~\`colorPalette('@{pink-6}', 4) \`);
@pink-5: color(~\`colorPalette('@{pink-6}', 5) \`);
@pink-6: #eb2f96;
@pink-7: color(~\`colorPalette('@{pink-6}', 7) \`);
@pink-8: color(~\`colorPalette('@{pink-6}', 8) \`);
@pink-9: color(~\`colorPalette('@{pink-6}', 9) \`);
@pink-10: color(~\`colorPalette('@{pink-6}', 10) \`);
@red-1: color(~\`colorPalette('@{red-6}', 1) \`);
@red-2: color(~\`colorPalette('@{red-6}', 2) \`);
@red-3: color(~\`colorPalette('@{red-6}', 3) \`);
@red-4: color(~\`colorPalette('@{red-6}', 4) \`);
@red-5: color(~\`colorPalette('@{red-6}', 5) \`);
@red-6: #f5222d;
@red-7: color(~\`colorPalette('@{red-6}', 7) \`);
@red-8: color(~\`colorPalette('@{red-6}', 8) \`);
@red-9: color(~\`colorPalette('@{red-6}', 9) \`);
@red-10: color(~\`colorPalette('@{red-6}', 10) \`);
@orange-1: color(~\`colorPalette('@{orange-6}', 1) \`);
@orange-2: color(~\`colorPalette('@{orange-6}', 2) \`);
@orange-3: color(~\`colorPalette('@{orange-6}', 3) \`);
@orange-4: color(~\`colorPalette('@{orange-6}', 4) \`);
@orange-5: color(~\`colorPalette('@{orange-6}', 5) \`);
@orange-6: #fa8c16;
@orange-7: color(~\`colorPalette('@{orange-6}', 7) \`);
@orange-8: color(~\`colorPalette('@{orange-6}', 8) \`);
@orange-9: color(~\`colorPalette('@{orange-6}', 9) \`);
@orange-10: color(~\`colorPalette('@{orange-6}', 10) \`);
@yellow-1: color(~\`colorPalette('@{yellow-6}', 1) \`);
@yellow-2: color(~\`colorPalette('@{yellow-6}', 2) \`);
@yellow-3: color(~\`colorPalette('@{yellow-6}', 3) \`);
@yellow-4: color(~\`colorPalette('@{yellow-6}', 4) \`);
@yellow-5: color(~\`colorPalette('@{yellow-6}', 5) \`);
@yellow-6: #fadb14;
@yellow-7: color(~\`colorPalette('@{yellow-6}', 7) \`);
@yellow-8: color(~\`colorPalette('@{yellow-6}', 8) \`);
@yellow-9: color(~\`colorPalette('@{yellow-6}', 9) \`);
@yellow-10: color(~\`colorPalette('@{yellow-6}', 10) \`);
@volcano-1: color(~\`colorPalette('@{volcano-6}', 1) \`);
@volcano-2: color(~\`colorPalette('@{volcano-6}', 2) \`);
@volcano-3: color(~\`colorPalette('@{volcano-6}', 3) \`);
@volcano-4: color(~\`colorPalette('@{volcano-6}', 4) \`);
@volcano-5: color(~\`colorPalette('@{volcano-6}', 5) \`);
@volcano-6: #fa541c;
@volcano-7: color(~\`colorPalette('@{volcano-6}', 7) \`);
@volcano-8: color(~\`colorPalette('@{volcano-6}', 8) \`);
@volcano-9: color(~\`colorPalette('@{volcano-6}', 9) \`);
@volcano-10: color(~\`colorPalette('@{volcano-6}', 10) \`);
@geekblue-1: color(~\`colorPalette('@{geekblue-6}', 1) \`);
@geekblue-2: color(~\`colorPalette('@{geekblue-6}', 2) \`);
@geekblue-3: color(~\`colorPalette('@{geekblue-6}', 3) \`);
@geekblue-4: color(~\`colorPalette('@{geekblue-6}', 4) \`);
@geekblue-5: color(~\`colorPalette('@{geekblue-6}', 5) \`);
@geekblue-6: #2f54eb;
@geekblue-7: color(~\`colorPalette('@{geekblue-6}', 7) \`);
@geekblue-8: color(~\`colorPalette('@{geekblue-6}', 8) \`);
@geekblue-9: color(~\`colorPalette('@{geekblue-6}', 9) \`);
@geekblue-10: color(~\`colorPalette('@{geekblue-6}', 10) \`);
@lime-1: color(~\`colorPalette('@{lime-6}', 1) \`);
@lime-2: color(~\`colorPalette('@{lime-6}', 2) \`);
@lime-3: color(~\`colorPalette('@{lime-6}', 3) \`);
@lime-4: color(~\`colorPalette('@{lime-6}', 4) \`);
@lime-5: color(~\`colorPalette('@{lime-6}', 5) \`);
@lime-6: #a0d911;
@lime-7: color(~\`colorPalette('@{lime-6}', 7) \`);
@lime-8: color(~\`colorPalette('@{lime-6}', 8) \`);
@lime-9: color(~\`colorPalette('@{lime-6}', 9) \`);
@lime-10: color(~\`colorPalette('@{lime-6}', 10) \`);
@gold-1: color(~\`colorPalette('@{gold-6}', 1) \`);
@gold-2: color(~\`colorPalette('@{gold-6}', 2) \`);
@gold-3: color(~\`colorPalette('@{gold-6}', 3) \`);
@gold-4: color(~\`colorPalette('@{gold-6}', 4) \`);
@gold-5: color(~\`colorPalette('@{gold-6}', 5) \`);
@gold-6: #faad14;
@gold-7: color(~\`colorPalette('@{gold-6}', 7) \`);
@gold-8: color(~\`colorPalette('@{gold-6}', 8) \`);
@gold-9: color(~\`colorPalette('@{gold-6}', 9) \`);
@gold-10: color(~\`colorPalette('@{gold-6}', 10) \`);
@preset-colors: pink, magenta, red, volcano, orange, yellow, gold, cyan, lime, green, blue, geekblue,
  purple;
@ant-prefix: ant;
@html-selector: html;
@info-color: @blue-6;
@success-color: @green-6;
@processing-color: @blue-6;
@error-color: @red-6;
@highlight-color: @red-6;
@warning-color: @gold-6;
@normal-color: #d9d9d9;
@white: #fff;
@black: #000;
@primary-1: color(~\`colorPalette('@{primary-color}', 1) \`); 
@primary-2: color(~\`colorPalette('@{primary-color}', 2) \`); 
@primary-3: color(~\`colorPalette('@{primary-color}', 3) \`); 
@primary-4: color(~\`colorPalette('@{primary-color}', 4) \`); 
@primary-5: color(
  ~\`colorPalette('@{primary-color}', 5) \`
); 
@primary-6: @primary-color; 
@primary-7: color(~\`colorPalette('@{primary-color}', 7) \`); 
@primary-8: color(~\`colorPalette('@{primary-color}', 8) \`); 
@primary-9: color(~\`colorPalette('@{primary-color}', 9) \`); 
@primary-10: color(~\`colorPalette('@{primary-color}', 10) \`); 
@body-background: #fff;
@component-background: #fff;
@font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
  'Segoe UI Emoji', 'Segoe UI Symbol';
@code-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
@text-color-inverse: @white;
@icon-color: inherit;
@icon-color-hover: fade(@black, 75%);
@heading-color-dark: fade(@white, 100%);
@text-color-dark: fade(@white, 85%);
@text-color-secondary-dark: fade(@white, 65%);
@text-selection-bg: @primary-color;
@font-variant-base: tabular-nums;
@font-feature-settings-base: 'tnum';
@font-size-base: 14px;
@font-size-lg: @font-size-base + 2px;
@font-size-sm: 12px;
@heading-1-size: ceil(@font-size-base * 2.71);
@heading-2-size: ceil(@font-size-base * 2.14);
@heading-3-size: ceil(@font-size-base * 1.71);
@heading-4-size: ceil(@font-size-base * 1.42);
@line-height-base: 1.5;
@border-radius-base: 4px;
@border-radius-sm: 2px;
@padding-lg: 24px; 
@padding-md: 16px; 
@padding-sm: 12px; 
@padding-xs: 8px; 
@control-padding-horizontal: @padding-sm;
@control-padding-horizontal-sm: @padding-xs;
@item-active-bg: @primary-1;
@item-hover-bg: @primary-1;
@iconfont-css-prefix: anticon;
@link-color: @primary-color;
@link-hover-color: color(~\`colorPalette('@{link-color}', 5) \`);
@link-active-color: color(~\`colorPalette('@{link-color}', 7) \`);
@link-decoration: none;
@link-hover-decoration: none;
@ease-base-out: cubic-bezier(0.7, 0.3, 0.1, 1);
@ease-base-in: cubic-bezier(0.9, 0, 0.3, 0.7);
@ease-out: cubic-bezier(0.215, 0.61, 0.355, 1);
@ease-in: cubic-bezier(0.55, 0.055, 0.675, 0.19);
@ease-in-out: cubic-bezier(0.645, 0.045, 0.355, 1);
@ease-out-back: cubic-bezier(0.12, 0.4, 0.29, 1.46);
@ease-in-back: cubic-bezier(0.71, -0.46, 0.88, 0.6);
@ease-in-out-back: cubic-bezier(0.71, -0.46, 0.29, 1.46);
@ease-out-circ: cubic-bezier(0.08, 0.82, 0.17, 1);
@ease-in-circ: cubic-bezier(0.6, 0.04, 0.98, 0.34);
@ease-in-out-circ: cubic-bezier(0.78, 0.14, 0.15, 0.86);
@ease-out-quint: cubic-bezier(0.23, 1, 0.32, 1);
@ease-in-quint: cubic-bezier(0.755, 0.05, 0.855, 0.06);
@ease-in-out-quint: cubic-bezier(0.86, 0, 0.07, 1);
@border-color-base: hsv(0, 0, 85%); 
@border-color-split: hsv(0, 0, 91%); 
@border-color-inverse: @white;
@border-width-base: 1px; 
@border-style-base: solid; 
@outline-blur-size: 0;
@outline-width: 2px;
@outline-color: @primary-color;
@background-color-light: hsv(0, 0, 98%); 
@background-color-base: hsv(0, 0, 96%); 
@disabled-color: fade(#000, 25%);
@disabled-bg: @background-color-base;
@disabled-color-dark: fade(#fff, 35%);
@shadow-color: rgba(0, 0, 0, 0.15);
@shadow-color-inverse: @component-background;
@box-shadow-base: @shadow-1-down;
@shadow-1-up: 0 -2px 8px @shadow-color;
@shadow-1-down: 0 2px 8px @shadow-color;
@shadow-1-left: -2px 0 8px @shadow-color;
@shadow-1-right: 2px 0 8px @shadow-color;
@shadow-2: 0 4px 12px @shadow-color;
@btn-font-weight: 400;
@btn-border-radius-base: @border-radius-base;
@btn-border-radius-sm: @border-radius-base;
@btn-border-width: @border-width-base;
@btn-border-style: @border-style-base;
@btn-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
@btn-primary-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
@btn-text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
@btn-primary-color: #fff;
@btn-default-color: @text-color;
@btn-default-bg: @component-background;
@btn-default-border: @border-color-base;
@btn-danger-color: #fff;
@btn-danger-bg: color(~\`colorPalette('@{error-color}', 5) \`);
@btn-danger-border: color(~\`colorPalette('@{error-color}', 5) \`);
@btn-disable-color: @disabled-color;
@btn-disable-bg: @disabled-bg;
@btn-disable-border: @border-color-base;
@btn-padding-base: 0 @padding-md - 1px;
@btn-font-size-lg: @font-size-lg;
@btn-font-size-sm: @font-size-base;
@btn-padding-lg: @btn-padding-base;
@btn-padding-sm: 0 @padding-xs - 1px;
@btn-height-base: 32px;
@btn-height-lg: 40px;
@btn-height-sm: 24px;
@btn-circle-size: @btn-height-base;
@btn-circle-size-lg: @btn-height-lg;
@btn-circle-size-sm: @btn-height-sm;
@btn-square-size: @btn-height-base;
@btn-square-size-lg: @btn-height-lg;
@btn-square-size-sm: @btn-height-sm;
@btn-group-border: @primary-5;
@checkbox-size: 16px;
@checkbox-color: @primary-color;
@checkbox-check-color: #fff;
@checkbox-border-width: @border-width-base;
@descriptions-bg: #fafafa;
@dropdown-selected-color: @primary-color;
@empty-font-size: @font-size-base;
@radio-size: 16px;
@radio-dot-color: @primary-color;
@radio-button-bg: @btn-default-bg;
@radio-button-checked-bg: @btn-default-bg;
@radio-button-color: @btn-default-color;
@radio-button-hover-color: @primary-5;
@radio-button-active-color: @primary-7;
@screen-xs: 480px;
@screen-xs-min: @screen-xs;
@screen-sm: 576px;
@screen-sm-min: @screen-sm;
@screen-md: 768px;
@screen-md-min: @screen-md;
@screen-lg: 992px;
@screen-lg-min: @screen-lg;
@screen-xl: 1200px;
@screen-xl-min: @screen-xl;
@screen-xxl: 1600px;
@screen-xxl-min: @screen-xxl;
@screen-xs-max: (@screen-sm-min - 1px);
@screen-sm-max: (@screen-md-min - 1px);
@screen-md-max: (@screen-lg-min - 1px);
@screen-lg-max: (@screen-xl-min - 1px);
@screen-xl-max: (@screen-xxl-min - 1px);
@grid-columns: 24;
@grid-gutter-width: 0;
@layout-footer-background: @layout-body-background;
@layout-header-height: 64px;
@layout-header-padding: 0 50px;
@layout-footer-padding: 24px 50px;
@layout-sider-background: @layout-header-background;
@layout-trigger-height: 48px;
@layout-trigger-background: #002140;
@layout-trigger-color: #fff;
@layout-zero-trigger-width: 36px;
@layout-zero-trigger-height: 42px;
@layout-sider-background-light: #fff;
@layout-trigger-background-light: #fff;
@layout-trigger-color-light: @text-color;
@zindex-badge: auto;
@zindex-table-fixed: auto;
@zindex-affix: 10;
@zindex-back-top: 10;
@zindex-picker-panel: 10;
@zindex-popup-close: 10;
@zindex-modal: 1000;
@zindex-modal-mask: 1000;
@zindex-message: 1010;
@zindex-notification: 1010;
@zindex-popover: 1030;
@zindex-dropdown: 1050;
@zindex-picker: 1050;
@zindex-tooltip: 1060;
@animation-duration-slow: 0.3s; 
@animation-duration-base: 0.2s;
@animation-duration-fast: 0.1s; 
@collapse-panel-border-radius: @border-radius-base;
@dropdown-vertical-padding: 5px;
@dropdown-edge-child-vertical-padding: 4px;
@dropdown-font-size: @font-size-base;
@dropdown-line-height: 22px;
@label-required-color: @highlight-color;
@label-color: @heading-color;
@form-warning-input-bg: @input-bg;
@form-item-margin-bottom: 24px;
@form-item-trailing-colon: true;
@form-vertical-label-padding: 0 0 8px;
@form-vertical-label-margin: 0;
@form-item-label-colon-margin-right: 8px;
@form-item-label-colon-margin-left: 2px;
@form-error-input-bg: @input-bg;
@input-height-base: 32px;
@input-height-lg: 40px;
@input-height-sm: 24px;
@input-padding-horizontal: @control-padding-horizontal - 1px;
@input-padding-horizontal-base: @input-padding-horizontal;
@input-padding-horizontal-sm: @control-padding-horizontal-sm - 1px;
@input-padding-horizontal-lg: @input-padding-horizontal;
@input-padding-vertical-base: 4px;
@input-padding-vertical-sm: 1px;
@input-padding-vertical-lg: 6px;
@input-placeholder-color: hsv(0, 0, 75%);
@input-color: @text-color;
@input-border-color: @border-color-base;
@input-bg: @component-background;
@input-number-hover-border-color: @input-hover-border-color;
@input-number-handler-active-bg: #f4f4f4;
@input-number-handler-hover-bg: @primary-5;
@input-number-handler-bg: @component-background;
@input-number-handler-border-color: @border-color-base;
@input-addon-bg: @background-color-light;
@input-hover-border-color: @primary-5;
@input-disabled-bg: @disabled-bg;
@input-outline-offset: 0 0;
@select-border-color: @border-color-base;
@select-item-selected-color: @text-color;
@select-item-selected-font-weight: 600;
@select-dropdown-bg: @component-background;
@select-dropdown-vertical-padding: @dropdown-vertical-padding;
@select-dropdown-edge-child-vertical-padding: @dropdown-edge-child-vertical-padding;
@select-dropdown-font-size: @dropdown-font-size;
@select-dropdown-line-height: @dropdown-line-height;
@select-item-selected-bg: @background-color-light;
@select-item-active-bg: @item-active-bg;
@select-background: @component-background;
@cascader-dropdown-vertical-padding: @dropdown-vertical-padding;
@cascader-dropdown-edge-child-vertical-padding: @dropdown-edge-child-vertical-padding;
@cascader-dropdown-font-size: @dropdown-font-size;
@cascader-dropdown-line-height: @dropdown-line-height;
@anchor-border-color: @border-color-split;
@tooltip-max-width: 250px;
@tooltip-color: #fff;
@tooltip-bg: rgba(0, 0, 0, 0.75);
@tooltip-arrow-width: 5px;
@tooltip-distance: @tooltip-arrow-width - 1px + 4px;
@tooltip-arrow-color: @tooltip-bg;
@popover-bg: @component-background;
@popover-color: @text-color;
@popover-min-width: 177px;
@popover-arrow-width: 6px;
@popover-arrow-color: @popover-bg;
@popover-arrow-outer-color: @popover-bg;
@popover-distance: @popover-arrow-width + 4px;
@modal-body-padding: 24px;
@modal-header-bg: @component-background;
@modal-header-border-color-split: @border-color-split;
@modal-heading-color: @heading-color;
@modal-footer-bg: transparent;
@modal-footer-border-color-split: @border-color-split;
@modal-mask-bg: fade(@black, 45%);
@progress-default-color: @processing-color;
@progress-remaining-color: @background-color-base;
@progress-text-color: @text-color;
@progress-radius: 100px;
@menu-inline-toplevel-item-height: 40px;
@menu-item-height: 40px;
@menu-collapsed-width: 80px;
@menu-bg: @component-background;
@menu-popup-bg: @component-background;
@menu-item-color: @text-color;
@menu-highlight-color: @primary-color;
@menu-item-active-bg: @item-active-bg;
@menu-item-active-border-width: 3px;
@menu-item-group-title-color: @text-color-secondary;
@menu-icon-size: @font-size-base;
@menu-icon-size-lg: @font-size-lg;
@menu-item-vertical-margin: 4px;
@menu-item-font-size: @font-size-base;
@menu-item-boundary-margin: 8px;
@menu-dark-color: @text-color-secondary-dark;
@menu-dark-bg: @layout-header-background;
@menu-dark-arrow-color: #fff;
@menu-dark-submenu-bg: #000c17;
@menu-dark-highlight-color: #fff;
@menu-dark-item-active-bg: @primary-color;
@menu-dark-selected-item-icon-color: @white;
@menu-dark-selected-item-text-color: @white;
@menu-dark-item-hover-bg: transparent;
@spin-dot-size-sm: 14px;
@spin-dot-size: 20px;
@spin-dot-size-lg: 32px;
@table-header-bg: @background-color-light;
@table-header-color: @heading-color;
@table-header-sort-bg: @background-color-base;
@table-body-sort-bg: rgba(0, 0, 0, 0.01);
@table-row-hover-bg: @primary-1;
@table-selected-row-color: inherit;
@table-selected-row-bg: #fafafa;
@table-body-selected-sort-bg: @table-selected-row-bg;
@table-selected-row-hover-bg: @table-selected-row-bg;
@table-expanded-row-bg: #fbfbfb;
@table-padding-vertical: 16px;
@table-padding-horizontal: 16px;
@table-border-radius-base: @border-radius-base;
@table-footer-bg: @background-color-light;
@table-footer-color: @heading-color;
@table-header-bg-sm: transparent;
@tag-default-bg: @background-color-light;
@tag-default-color: @text-color;
@tag-font-size: @font-size-sm;
@time-picker-panel-column-width: 56px;
@time-picker-panel-width: @time-picker-panel-column-width * 3;
@time-picker-selected-bg: @background-color-base;
@carousel-dot-width: 16px;
@carousel-dot-height: 3px;
@carousel-dot-active-width: 24px;
@badge-height: 20px;
@badge-dot-size: 6px;
@badge-font-size: @font-size-sm;
@badge-font-weight: normal;
@badge-status-size: 6px;
@badge-text-color: @component-background;
@rate-star-color: @yellow-6;
@rate-star-bg: @border-color-split;
@card-head-color: @heading-color;
@card-head-background: transparent;
@card-head-padding: 16px;
@card-inner-head-padding: 12px;
@card-padding-base: 24px;
@card-actions-background: @background-color-light;
@card-skeleton-bg: #cfd8dc;
@card-background: @component-background;
@card-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
@card-radius: @border-radius-sm;
@comment-padding-base: 16px 0;
@comment-nest-indent: 44px;
@comment-font-size-base: @font-size-base;
@comment-font-size-sm: @font-size-sm;
@comment-author-name-color: @text-color-secondary;
@comment-author-time-color: #ccc;
@comment-action-color: @text-color-secondary;
@comment-action-hover-color: #595959;
@tabs-card-head-background: @background-color-light;
@tabs-card-height: 40px;
@tabs-card-active-color: @primary-color;
@tabs-title-font-size: @font-size-base;
@tabs-title-font-size-lg: @font-size-lg;
@tabs-title-font-size-sm: @font-size-base;
@tabs-ink-bar-color: @primary-color;
@tabs-bar-margin: 0 0 16px 0;
@tabs-horizontal-margin: 0 32px 0 0;
@tabs-horizontal-padding: 12px 16px;
@tabs-horizontal-padding-lg: 16px;
@tabs-horizontal-padding-sm: 8px 16px;
@tabs-vertical-padding: 8px 24px;
@tabs-vertical-margin: 0 0 16px 0;
@tabs-scrolling-size: 32px;
@tabs-highlight-color: @primary-color;
@tabs-hover-color: @primary-5;
@tabs-active-color: @primary-7;
@tabs-card-gutter: 2px;
@tabs-card-tab-active-border-top: 2px solid transparent;
@back-top-color: #fff;
@back-top-bg: @text-color-secondary;
@back-top-hover-bg: @text-color;
@avatar-size-base: 32px;
@avatar-size-lg: 40px;
@avatar-size-sm: 24px;
@avatar-font-size-base: 18px;
@avatar-font-size-lg: 24px;
@avatar-font-size-sm: 14px;
@avatar-bg: #ccc;
@avatar-color: #fff;
@avatar-border-radius: @border-radius-base;
@switch-height: 22px;
@switch-sm-height: 16px;
@switch-sm-checked-margin-left: -(@switch-sm-height - 3px);
@switch-disabled-opacity: 0.4;
@switch-color: @primary-color;
@switch-shadow-color: fade(#00230b, 20%);
@pagination-item-size: 32px;
@pagination-item-size-sm: 24px;
@pagination-font-family: Arial;
@pagination-font-weight-active: 500;
@pagination-item-bg-active: @component-background;
@page-header-padding: 24px;
@page-header-padding-vertical: 16px;
@page-header-padding-breadcrumb: 12px;
@page-header-back-color: #000;
@breadcrumb-base-color: @text-color-secondary;
@breadcrumb-last-item-color: @text-color;
@breadcrumb-font-size: @font-size-base;
@breadcrumb-icon-font-size: @font-size-base;
@breadcrumb-link-color: @text-color-secondary;
@breadcrumb-link-color-hover: @primary-5;
@breadcrumb-separator-color: @text-color-secondary;
@breadcrumb-separator-margin: 0 @padding-xs;
@slider-margin: 14px 6px 10px;
@slider-rail-background-color: @background-color-base;
@slider-rail-background-color-hover: #e1e1e1;
@slider-track-background-color: @primary-3;
@slider-track-background-color-hover: @primary-4;
@slider-handle-border-width: 2px;
@slider-handle-background-color: @component-background;
@slider-handle-color: @primary-3;
@slider-handle-color-hover: @primary-4;
@slider-handle-color-focus: tint(@primary-color, 20%);
@slider-handle-color-focus-shadow: fade(@primary-color, 20%);
@slider-handle-color-tooltip-open: @primary-color;
@slider-handle-shadow: 0;
@slider-dot-border-color: @border-color-split;
@slider-dot-border-color-active: tint(@primary-color, 50%);
@slider-disabled-color: @disabled-color;
@slider-disabled-background-color: @component-background;
@tree-title-height: 24px;
@tree-child-padding: 18px;
@tree-directory-selected-color: #fff;
@tree-directory-selected-bg: @primary-color;
@tree-node-hover-bg: @item-hover-bg;
@tree-node-selected-bg: @primary-2;
@collapse-header-padding: 12px 16px;
@collapse-header-padding-extra: 40px;
@collapse-header-bg: @background-color-light;
@collapse-content-padding: @padding-md;
@collapse-content-bg: @component-background;
@skeleton-color: #f2f2f2;
@transfer-header-height: 40px;
@transfer-disabled-bg: @disabled-bg;
@transfer-list-height: 200px;
@message-notice-content-padding: 10px 16px;
@wave-animation-width: 6px;
@alert-success-border-color: ~\`colorPalette('@{success-color}', 3) \`;
@alert-success-bg-color: ~\`colorPalette('@{success-color}', 1) \`;
@alert-success-icon-color: @success-color;
@alert-info-border-color: ~\`colorPalette('@{info-color}', 3) \`;
@alert-info-bg-color: ~\`colorPalette('@{info-color}', 1) \`;
@alert-info-icon-color: @info-color;
@alert-warning-border-color: ~\`colorPalette('@{warning-color}', 3) \`;
@alert-warning-bg-color: ~\`colorPalette('@{warning-color}', 1) \`;
@alert-warning-icon-color: @warning-color;
@alert-error-border-color: ~\`colorPalette('@{error-color}', 3) \`;
@alert-error-bg-color: ~\`colorPalette('@{error-color}', 1) \`;
@alert-error-icon-color: @error-color;
@list-header-background: transparent;
@list-footer-background: transparent;
@list-empty-text-padding: @padding-md;
@list-item-padding: @padding-sm 0;
@list-item-meta-margin-bottom: @padding-md;
@list-item-meta-avatar-margin-right: @padding-md;
@list-item-meta-title-margin-bottom: @padding-sm;
@statistic-title-font-size: @font-size-base;
@statistic-content-font-size: 24px;
@statistic-unit-font-size: 16px;
@statistic-font-family: @font-family;
@drawer-header-padding: 16px 24px;
@drawer-body-padding: 24px;
@timeline-width: 2px;
@timeline-color: @border-color-split;
@timeline-dot-border-width: 2px;
@timeline-dot-color: @primary-color;
@timeline-dot-bg: @component-background;
@typography-title-font-weight: 600;
@typography-title-margin-top: 1.2em;
@typography-title-margin-bottom: 0.5em;
`; }