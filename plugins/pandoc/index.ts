import { FileOutput } from 'lucide-react';
import type { DocumentPlugin } from '../types';
import { registerPluginI18n } from '../i18n-loader';
import { registerPlugin } from '../pluginStore';
import { PandocPluginPanel } from './PandocPluginPanel';
import manifest from './manifest.json';
import zh from './i18n/zh.json';
import en from './i18n/en.json';
import ja from './i18n/ja.json';

registerPluginI18n('plugin-pandoc', { zh, en, ja });

export const pandocPlugin: DocumentPlugin = {
  id: manifest.id,
  name: 'Pandoc 导出',
  icon: FileOutput,
  description: '通过 Pandoc 将文档导出为 PDF、DOCX、EPUB、LaTeX 等高质量格式',
  majorCategory: 'functional',
  subCategory: 'export',
  i18nNamespace: 'plugin-pandoc',
  PanelComponent: PandocPluginPanel,
  hasData: () => false,
};

registerPlugin(pandocPlugin);
