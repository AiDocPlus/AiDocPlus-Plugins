/**
 * 内容生成类插件示例
 * 基于 summary 插件简化，展示基本结构
 *
 * 每个插件通过 manifest.json 定义元数据，index.ts 自注册到 pluginStore。
 * loader.ts 会自动发现并加载，无需修改任何核心文件。
 */
import type { DocumentPlugin } from '@/plugins/types';
import { Sparkles } from 'lucide-react';
import { registerPluginI18n } from '@/plugins/i18n-loader';
import { registerPlugin } from '@/plugins/pluginStore';
import { SummaryPluginPanel } from './SummaryPluginPanel';
import manifest from './manifest.json';
import zh from './i18n/zh.json';
import en from './i18n/en.json';
import ja from './i18n/ja.json';

// 注册插件翻译
registerPluginI18n('plugin-example-summary', { zh, en, ja });

export const exampleSummaryPlugin: DocumentPlugin = {
  id: manifest.id,
  name: manifest.name,
  icon: Sparkles,
  description: manifest.description,
  majorCategory: manifest.majorCategory,
  subCategory: manifest.subCategory,
  i18nNamespace: 'plugin-example-summary',
  PanelComponent: SummaryPluginPanel,
  hasData: (doc) => {
    const data = doc.pluginData?.[manifest.id];
    return data != null && typeof data === 'object' && 'summary' in data;
  },
};

// 自注册（模块加载时自动执行）
registerPlugin(exampleSummaryPlugin);
