import { FileSearch } from 'lucide-react';
import type { DocumentPlugin } from '../types';
import { registerPluginI18n } from '../i18n-loader';
import { registerPlugin } from '../pluginStore';
import { OfficeViewerPanel } from './OfficeViewerPanel';
import manifest from './manifest.json';
import zh from './i18n/zh.json';
import en from './i18n/en.json';
import ja from './i18n/ja.json';

// 注册插件 i18n
registerPluginI18n('plugin-officeviewer', { zh, en, ja });

export const officeViewerPlugin: DocumentPlugin = {
  id: manifest.id,
  name: 'Office 预览器',
  icon: FileSearch,
  description: '预览 PDF、DOCX、XLSX 等 Office 格式文件',
  majorCategory: 'functional',
  subCategory: 'visualization',
  i18nNamespace: 'plugin-officeviewer',
  PanelComponent: OfficeViewerPanel,
  // 功能执行类插件不在 document.pluginData 中存储数据
  hasData: () => false,
};

registerPlugin(officeViewerPlugin);
