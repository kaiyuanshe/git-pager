# Git Pager

[![NPM Dependency](https://david-dm.org/kaiyuanshe/git-pager.svg)](https://david-dm.org/kaiyuanshe/git-pager)
[![Build Status](https://travis-ci.com/kaiyuanshe/git-pager.svg?branch=master)](https://travis-ci.com/kaiyuanshe/git-pager) [![Greenkeeper badge](https://badges.greenkeeper.io/kaiyuanshe/git-pager.svg)](https://greenkeeper.io/)

## 技术架构

- 前端技术栈：[`npm init react-app . --typescript`](https://github.com/facebook/create-react-app)

- 后端技术栈：

  - [Koa](http://koa.bootcss.com/)

  - [LeanCloud](https://leancloud.cn/)

## 本地开发

### 单独启动前端开发环境

1. 执行命令 `npm run front`

2. 浏览器访问 http://localhost:3000/?repository=your-repo&token=your-token

### 前端生产环境 + 后端调试环境

1. 执行命令 `lean up`（需装好 [LeanCloud 命令行工具](https://leancloud.cn/docs/leanengine_cli.html)）

2. 浏览器访问 http://localhost:3000/?repository=your-repo

## 远程部署

```shell
npm run deploy
```

## 其它命令

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
