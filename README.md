# AiDocPlus Plugins

AiDocPlus 外部插件集合 — 独立开发、独立构建、部署到主程序。

## 项目结构

```
AiDocPlus-Plugins/
├── sdk/                    # SDK 副本（从主程序同步，只读）
│   ├── _framework/         # 插件框架（PluginHostAPI, 布局组件, UI 原语）
│   ├── types.ts            # 插件接口定义
│   ├── pluginStore.ts      # 插件注册表（registerPlugin）
│   ├── i18n-loader.ts      # i18n 注册工具
│   └── constants.ts        # 分类定义
├── plugins/                # 所有插件（每个含 manifest.json + index.ts + Panel + i18n）
├── stubs/                  # 主程序内部模块类型 stub（使 SDK 类型检查通过）
├── scripts/
│   ├── sync-sdk.sh         # 从主程序同步 SDK
│   └── deploy.sh           # 部署插件到主程序
└── docs/plugin-sdk/        # SDK 开发文档
```

## 开发流程

```bash
# 1. 安装依赖
pnpm install

# 2. 同步最新 SDK（从主程序）
pnpm sync-sdk

# 3. 类型检查
pnpm typecheck

# 4. 部署全部插件到主程序
pnpm deploy

# 5. 部署单个插件
pnpm deploy:plugin -- summary
```

## 创建新插件

参考 `CLAUDE.md` 和 `.windsurf/workflows/create-plugin.md`。

## SDK 更新

当主程序 SDK 接口更新时，运行 `pnpm sync-sdk` 同步最新版本。如果主程序接口不满足插件需求，请在主程序仓库提 Issue。
