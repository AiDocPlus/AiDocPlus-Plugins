import { BarChart3 } from 'lucide-react';
import type { DocumentPlugin } from '../types';
import { registerPluginI18n } from '../i18n-loader';
import { registerPlugin } from '../pluginStore';
import { WritingStatsPluginPanel } from './WritingStatsPluginPanel';
import manifest from './manifest.json';
import zh from './i18n/zh.json';
import en from './i18n/en.json';
import ja from './i18n/ja.json';

registerPluginI18n('plugin-writing-stats', { zh, en, ja });

export const writingStatsPlugin: DocumentPlugin = {
  id: manifest.id,
  name: '写作统计仪表盘',
  icon: BarChart3,
  description: '追踪写作进度、目标达成率、每日产出等关键指标',
  majorCategory: 'functional',
  subCategory: 'analysis',
  i18nNamespace: 'plugin-writing-stats',
  PanelComponent: WritingStatsPluginPanel,
  hasData: () => false,
};

registerPlugin(writingStatsPlugin);
