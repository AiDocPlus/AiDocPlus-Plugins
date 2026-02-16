import { Share2 } from 'lucide-react';
import type { DocumentPlugin } from '../types';
import { registerPluginI18n } from '../i18n-loader';
import { registerPlugin } from '../pluginStore';
import { PublishPluginPanel } from './PublishPluginPanel';
import manifest from './manifest.json';
import zh from './i18n/zh.json';
import en from './i18n/en.json';
import ja from './i18n/ja.json';

registerPluginI18n('plugin-publish', { zh, en, ja });

export const publishPlugin: DocumentPlugin = {
  id: manifest.id,
  name: '内容发布',
  icon: Share2,
  description: '将文档内容格式化并发布到微信公众号、知乎、掘金等主流内容平台',
  majorCategory: 'functional',
  subCategory: 'export',
  i18nNamespace: 'plugin-publish',
  PanelComponent: PublishPluginPanel,
  hasData: () => false,
};

registerPlugin(publishPlugin);
