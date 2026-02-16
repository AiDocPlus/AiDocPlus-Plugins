import { Clock } from 'lucide-react';
import type { DocumentPlugin } from '../types';
import { registerPluginI18n } from '../i18n-loader';
import { registerPlugin } from '../pluginStore';
import { TimelinePluginPanel } from './TimelinePluginPanel';
import manifest from './manifest.json';
import zh from './i18n/zh.json';
import en from './i18n/en.json';
import ja from './i18n/ja.json';

registerPluginI18n('plugin-timeline', { zh, en, ja });

export const timelinePlugin: DocumentPlugin = {
  id: manifest.id,
  name: '版本时间线',
  icon: Clock,
  description: '可视化展示文档版本历史，支持版本预览和对比',
  majorCategory: 'functional',
  subCategory: 'analysis',
  i18nNamespace: 'plugin-timeline',
  PanelComponent: TimelinePluginPanel,
  hasData: () => false,
};

registerPlugin(timelinePlugin);
