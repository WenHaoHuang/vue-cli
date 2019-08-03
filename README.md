## 百川项目开发说明

#### 目录结构

```bash
├── build                              # webpack配置
├── dll                                # webpack dll 预打包
├── element                            # element-ui自定义配置
├── src                                # 源文件
|   ├── ajax                           # 通用ajax方法
|   ├── assets                         # 公共资源文件
|   ├── components                     # 公共组件
|   ├── config                         # 项目配置文件
|   ├── directive                      # 公共自定义指令
|   ├── mixins                         # 公共mixins
|   ├── pages                          # 子项目
|   |   ├── admin                      # 管理端
|   |   ├── business                   # 业务端
|   |   └── index                      # 引导页
|   ├── util                           # 公共方法
|   └── template.html                  # template.html
├── static                             # static
├── .babelrc                           # babelrc
├── .editorconfig                      # editorconfig
├── .eslintrc.js                       # eslintrc
├── .gitignore                         # gitignore
├── .postcssrc.js                      # postcssrc
├── package.json                       # package
├── README.md                          # 项目介绍文档
└── yarn.lock                          # yarn
```

#### 启动命令

```bash
# 全部构建
npm run build  或者  yarn build

# 单独构建
# 业务端
npm run build:b 或者 yarn build:b
# 管理端
npm run build:a 或者 yarn build:a
# 引导页
npm run build:i 或者 yarn build:i
# 开发服务
npm run dev:b
# 自定义配置 启动sit，sit2，pre，prd环境
npm run dev:b --env.p=sit
# 自定义配置 启动联调环境，如果需要和后端联调，需要在build/proxyTable.js配置好代理转发地址
npm run dev:b --env.p=wanglei
```
