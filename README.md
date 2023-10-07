# Git Pager

[![CI & CD](https://github.com/kaiyuanshe/git-pager/actions/workflows/main.yml/badge.svg)][1]

## 技术架构

- 前端技术栈：

  - 编程语言: [TypeScript v5][2]
  - 组件引擎: [React v17][3]
  - 组件套件: [Bootstrap v4][4]
  - 状态管理: [MobX v5][5]
  - PWA 框架: [Workbox v7][6]
  - CI / CD: [GitHub Actions][7] + [Vercel][8]

- 后端技术栈：

  - [Koa][9]
  - [LeanCloud][10]

## 本地开发

### 单独启动前端开发环境

1.  执行命令 `npm run front`
2.  浏览器访问 http://localhost:3000/?repository=your-repo&token=your-token

### 前端生产环境 + 后端调试环境

1.  执行命令 `lean up`（需装好 [LeanCloud 命令行工具][11]）
2.  浏览器访问 http://localhost:3000/?repository=your-repo

## 远程部署

```shell
npm run deploy
```

## 其它命令

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

[1]: https://github.com/kaiyuanshe/git-pager/actions/workflows/main.yml
[2]: https://www.typescriptlang.org/
[3]: https://react.dev/
[4]: https://getbootstrap.com/docs/4.6/
[5]: https://github.com/mobxjs/mobx/tree/mobx4and5/docs
[6]: https://developers.google.com/web/tools/workbox
[7]: https://github.com/features/actions
[8]: https://vercel.com/
[9]: http://koa.bootcss.com/
[10]: https://leancloud.cn/
[11]: https://leancloud.cn/docs/leanengine_cli.html
