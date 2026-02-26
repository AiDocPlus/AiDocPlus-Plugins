---
name: 法院工作提示词模板全覆盖方案
overview: 在 AiDocPlus-PromptTemplates 仓库中新增"法院工作"分类，设计约70个模板，涵盖裁判文书、审判程序、执行工作、案件分析、审判管理、司法行政六大场景，确保对法院工作的全面覆盖
todos:
  - id: create-court-json
    content: 创建 court.json 分类文件，包含 72 个模板（裁判文书22个、审判程序文书15个、执行工作12个、案件分析管理12个、审判管理6个、书记员工作5个）
    status: completed
  - id: run-build
    content: 运行 build.py 生成 TypeScript 文件
    status: completed
    dependencies:
      - create-court-json
  - id: run-deploy
    content: 运行 deploy.sh 部署到主程序
    status: completed
    dependencies:
      - run-build
---

## 产品概述

在 AiDocPlus-PromptTemplates 仓库中新增"法院工作"分类，确保对法院工作的全覆盖。

## 核心功能

- **裁判文书类**（22个模板）：判决书、裁定书、调解书、决定书
- **审判程序文书类**（15个模板）：立案、庭前准备、庭审、宣判阶段文书
- **执行工作类**（12个模板）：执行启动、财产查控、强制措施、执行结案
- **案件分析与管理类**（12个模板）：案件分析、审理报告、案件管理
- **审判管理类**（6个模板）：审判工作总结、审判委员会会议纪要等
- **书记员工作类**（5个模板）：庭审记录、卷宗整理、送达记录等

## 技术方案

### 数据结构

采用 JSON 文件模式，每个分类一个 JSON 文件，包含分类元信息和所有模板。

```
{
  "key": "court",
  "name": "法院工作",
  "icon": "⚖️",
  "order": 6,
  "templates": [...]
}
```

### 模板内容规范

每个模板包含：

- `id`: 唯一标识符
- `name`: 模板名称
- `description`: 简要描述
- `content`: 完整的提示词内容（包含角色设定、任务目标、内容结构、写作要求、质量标准）
- `variables`: 变量列表（可选）
- `order`: 排序序号

### 构建和部署流程

1. 创建 `data/court.json` 文件
2. 运行 `scripts/build.py` 生成 `dist/prompt-templates.generated.ts` 和 `dist/template-categories.generated.ts`
3. 运行 `scripts/deploy.sh` 部署到主程序

## 目录结构

```
/Users/jdh/Code/AiDocPlus-PromptTemplates/
├── data/
│   └── court.json              # [NEW] 法院工作分类，包含72个模板
├── scripts/
│   ├── build.py                # 构建脚本（无需修改）
│   └── deploy.sh               # 部署脚本（无需修改）
└── dist/                       # 构建产物
```

## 实施注意事项

- 参考 `procuratorial.json`（检察工作）的格式和风格
- 每个模板的 `content` 字段需包含完整的角色设定、任务目标、内容结构、写作要求
- 模板需覆盖法院工作的完整业务流程：立案→庭前准备→开庭审理→宣判→执行