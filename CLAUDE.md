# AiDocPlus-Plugins 开发指南

AiDocPlus 外部插件集合。所有 21 个插件在此项目中独立开发、类型检查，构建后部署到主程序。

> **⚠️ 这是插件代码的唯一正确操作位置。** 创建、修改、调试任何具体插件都必须在本项目中进行。主程序 `src/plugins/` 下的插件目录会被 `deploy.sh` 覆盖，直接修改会丢失。

## Communication Language

**始终用中文与用户对话。** Always communicate with the user in Chinese.

## 项目概览

- **仓库**：`https://github.com/AiDocPlus/AiDocPlus-Plugins.git`
- **本地路径**：`/Users/jdh/Code/AiDocPlus-Plugins`
- **主程序源码仓库**：`/Users/jdh/Code/AiDocPlus-Main`
- **构建目标仓库**：`/Users/jdh/Code/AiDocPlus`
- **SDK 来源**：主程序 `apps/desktop/src-ui/src/plugins/` 中的框架文件
- **部署方式**：`deploy.sh` 双目标部署——同时复制到 `AiDocPlus/`（构建目标）和 `AiDocPlus-Main/`（开发目录）的 `src/plugins/` 下

## 项目结构

```
AiDocPlus-Plugins/
├── sdk/                        # SDK 副本（从主程序同步，只读）
│   ├── _framework/             # 插件框架 SDK
│   │   ├── PluginHostAPI.ts    # 核心 API（usePluginHost）
│   │   ├── PluginPanelLayout.tsx   # 内容生成类布局
│   │   ├── ToolPluginLayout.tsx    # 功能执行类布局
│   │   ├── AIContentDialog.tsx     # AI 内容生成弹窗
│   │   ├── PluginPromptBuilderDialog.tsx  # 提示词构造器
│   │   ├── pluginUtils.ts         # 工具函数
│   │   ├── ui.ts                  # UI 组件 re-export
│   │   └── i18n/                  # 框架层翻译
│   ├── types.ts                # 插件接口定义（DocumentPlugin, PluginPanelProps）
│   ├── pluginStore.ts          # 插件注册表（PLUGIN_MAP + registerPlugin）
│   ├── i18n-loader.ts          # 插件 i18n 注册工具
│   ├── constants.ts            # 默认启用插件列表 + 分类定义
│   └── fragments.ts            # 内容片段系统
├── plugins/                    # 所有 21 个插件
│   └── {name}/                 # 每个插件目录
│       ├── manifest.json       # 插件元数据（UUID、名称、分类）
│       ├── index.ts            # 插件定义 + 自注册
│       ├── {Name}PluginPanel.tsx  # 面板组件
│       └── i18n/{zh,en}.json      # 翻译文件
├── stubs/                      # 主程序内部模块类型 stub（使 SDK 类型检查通过）
├── scripts/
│   ├── sync-sdk.sh             # 从主程序同步 SDK
│   └── deploy.sh               # 部署插件到主程序
└── docs/plugin-sdk/            # SDK 开发文档
```

## 开发命令

```bash
pnpm install          # 安装依赖
pnpm typecheck        # TypeScript 类型检查
pnpm sync-sdk         # 从主程序同步最新 SDK
pnpm deploy           # 部署全部插件到主程序
pnpm deploy -- summary  # 部署单个插件
```

## 开发流程

1. 在 `plugins/{name}/` 下创建或修改插件
2. 运行 `pnpm typecheck` 验证类型
3. 运行 `pnpm deploy` 部署到主程序
4. 在主程序中 `pnpm tauri dev` 验证功能

## 插件架构

### 两大类别

| 大类 | majorCategory | 说明 | 数据特征 |
|------|--------------|------|----------|
| **内容生成类** | `content-generation` | 基于文档内容 AI 生成新内容 | 生成结果保存在 `document.pluginData`，设置独立存储 |
| **功能执行类** | `functional` | 独立于文档的工具功能 | 所有数据独立存储（`usePluginStorageStore`），不写入文档 |

### 核心机制

- **自注册**：每个插件的 `index.ts` 在 import 时自动调用 `registerPlugin()` 注册到 `PLUGIN_MAP`
- **自动发现**：主程序 `loader.ts` 使用 `import.meta.glob` 自动发现所有插件目录
- **Manifest 驱动**：每个插件自带 `manifest.json`，包含 UUID、名称、分类等元数据
- **前后端同步**：前端发现的 manifest 通过 `sync_plugin_manifests` 命令幂等同步到后端磁盘

### 插件文件结构

| 文件 | 作用 | 必需 |
|------|------|------|
| `manifest.json` | 插件元数据（UUID、名称、分类、标签等） | ✅ |
| `index.ts` | 插件定义 + 自注册（`registerPlugin()`） | ✅ |
| `{Name}PluginPanel.tsx` | 插件面板 UI 组件 | ✅ |
| `i18n/{zh,en}.json` | 国际化翻译文件 | ✅ |
| `{name}Utils.ts` | 辅助函数（可选） | ❌ |

> **零改动核心代码**：`loader.ts` 通过 `import.meta.glob` 自动发现新插件。无需修改 `registry.ts`、`constants.ts`、`plugin.rs` 或 `main.rs`。

## SDK 使用规范

### 双角色原则（强制）

使用本项目创建/修改插件时，你是**外部插件开发者**角色：
- ✅ 只能依据 `sdk/_framework/` 导出的接口编写代码
- ✅ 从 `sdk/types.ts` 导入类型
- ✅ 从 `sdk/pluginStore.ts` 导入 `registerPlugin`
- ✅ 从 `sdk/i18n-loader.ts` 导入 `registerPluginI18n`
- ❌ 不得直接 import 主程序内部模块（`@/stores`、`@tauri-apps`、`@/i18n` 等）

### PluginHostAPI（主程序公共 API）

插件通过 `usePluginHost()` hook 获取主程序 API：

| 子 API | 说明 |
|--------|------|
| `host.content` | 文档内容访问（正文、AI 内容、合并区、其他插件片段） |
| `host.ai` | AI 服务（chat、chatStream、isAvailable、truncateContent） |
| `host.storage` | 插件独立持久化存储（get/set/remove/clear） |
| `host.docData` | 文档数据（仅内容生成类：getData/setData/markDirty/requestSave） |
| `host.ui` | UI 能力（showStatus、copyToClipboard、showSaveDialog、showOpenDialog） |
| `host.platform` | 平台能力（invoke 代理、getConfig、t 翻译） |
| `host.events` | 事件订阅（on/off） |

### 命令权限白名单

插件通过 `host.platform.invoke()` 调用后端命令，仅限白名单：
- `write_binary_file`、`read_file_base64`、`get_temp_dir`、`open_file_with_app`
- `test_smtp_connection`、`send_email`
- `check_pandoc`、`pandoc_export`
- `list_versions`、`get_version`
- `wechat_http_request`

### 接口不足时

如果主程序 SDK 接口不满足插件功能需求，请在主程序仓库提 Issue，说明：
1. 需要的接口功能
2. 使用场景
3. 建议的 API 设计

## 国际化（i18n）

### 插件 i18n 规范

每个插件必须自带翻译文件（`i18n/{zh,en}.json`），通过 `registerPluginI18n` 注册到 i18next 命名空间。

```typescript
// index.ts 中注册
import { registerPluginI18n } from '../i18n-loader';
import zh from './i18n/zh.json';
import en from './i18n/en.json';
registerPluginI18n('plugin-xxx', { zh, en });
```

### 插件中使用翻译

插件通过 `host.platform.t(key, params)` 获取翻译（自动加上插件命名空间前缀）：

```typescript
const host = usePluginHost();
const t = host.platform.t;

// t('title') 等价于 i18next.t('plugin-xxx:title')
<Button>{t('generate')}</Button>
<span>{t('status.success', { count: 5 })}</span>
```

### 翻译文件要求

- **禁止硬编码中文**：所有显示给用户的文字必须通过 `t()` 调用
- **必须同时提供** zh（中文）和 en（英文）两个翻译文件
- **翻译 key 应有意义**：如 `title`、`description`、`generate`、`status.success` 等

### 主程序 i18n 规范（参考）

主程序使用 `react-i18next`，翻译文件位于 `src-ui/src/i18n/locales/{zh,en}/translation.json`。

- React 组件中：`const { t } = useTranslation();` + `t('namespace.key', { defaultValue: '...' })`
- 非 React 上下文：`import i18n from '@/i18n';` + `i18n.t('namespace.key')`
- 所有 `t()` 调用必须带 `defaultValue` 作为回退

## SDK 同步

SDK 文件是主程序的**只读副本**，不要直接修改。当主程序 SDK 更新时：

```bash
pnpm sync-sdk
```

## 当前插件（21 个）

### 内容生成类（13 个）

| 插件 | 目录 | 说明 |
|------|------|------|
| 摘要 | `summary/` | AI 多风格文档摘要 — **新内容生成类插件首选参考** |
| PPT | `ppt/` | AI 生成演示文稿 |
| 测试题 | `quiz/` | AI 生成单选、多选、判断题 |
| 思维导图 | `mindmap/` | AI 生成 Markdown 格式思维导图 |
| 翻译 | `translation/` | AI 多语言翻译 |
| 平行翻译 | `parallel-translation/` | AI 双语对照翻译 |
| 图表 | `diagram/` | AI 生成 Mermaid 图表 |
| 统计 | `analytics/` | 纯前端文档统计分析 |
| 教案 | `lessonplan/` | AI 生成结构化教案 |
| 表格 | `table/` | AI 生成表格 |
| 时间线 | `timeline/` | AI 生成时间线 |
| 审阅 | `review/` | AI 文档审阅和批注 |
| 写作统计 | `writing-stats/` | 写作数据统计分析 |

### 功能执行类（8 个）

| 插件 | 目录 | 说明 |
|------|------|------|
| 邮件 | `email/` | AI 辅助撰写邮件 — **新功能执行类插件首选参考** |
| 文档对比 | `diff/` | 文档版本对比 |
| 加密 | `encrypt/` | 文档加密保护 |
| 水印 | `watermark/` | 文档水印添加 |
| TTS | `tts/` | 文档朗读 |
| Office 预览 | `officeviewer/` | 预览 PDF/DOCX/XLSX/PPTX |
| Pandoc 导出 | `pandoc/` | 通过 Pandoc 导出多种格式 |
| 发布 | `publish/` | 文档发布到外部平台 |
