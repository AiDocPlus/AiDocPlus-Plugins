/**
 * 功能执行类插件示例
 * 展示独立于文档的工具功能
 *
 * 每个插件通过 manifest.json 定义元数据，index.ts 自注册到 pluginStore。
 * loader.ts 会自动发现并加载，无需修改任何核心文件。
 */
import type { DocumentPlugin } from '@/plugins/types';
import { Wrench } from 'lucide-react';
import { registerPluginI18n } from '@/plugins/i18n-loader';
import { registerPlugin } from '@/plugins/pluginStore';
import { ToolPluginPanel } from './ToolPluginPanel';
import manifest from './manifest.json';
import zh from './i18n/zh.json';
import en from './i18n/en.json';
import ja from './i18n/ja.json';

// 注册插件翻译
registerPluginI18n('plugin-example-tool', { zh, en, ja });

export const exampleToolPlugin: DocumentPlugin = {
  id: manifest.id,
  name: manifest.name,
  icon: Wrench,
  description: manifest.description,
  majorCategory: manifest.majorCategory,
  subCategory: manifest.subCategory,
  i18nNamespace: 'plugin-example-tool',
  PanelComponent: ToolPluginPanel,
  // 功能执行类插件的 hasData 始终返回 false
  hasData: () => false,
};

// 自注册（模块加载时自动执行）
registerPlugin(exampleToolPlugin);
