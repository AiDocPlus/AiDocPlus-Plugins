import { Shield } from 'lucide-react';
import type { DocumentPlugin } from '../types';
import { registerPluginI18n } from '../i18n-loader';
import { registerPlugin } from '../pluginStore';
import { EncryptPluginPanel } from './EncryptPluginPanel';
import manifest from './manifest.json';
import zh from './i18n/zh.json';
import en from './i18n/en.json';
import ja from './i18n/ja.json';

registerPluginI18n('plugin-encrypt', { zh, en, ja });

export const encryptPlugin: DocumentPlugin = {
  id: manifest.id,
  name: '文档加密',
  icon: Shield,
  description: '对文档内容进行 AES 加密保护，支持密码加密和解密',
  majorCategory: 'functional',
  subCategory: 'export',
  i18nNamespace: 'plugin-encrypt',
  PanelComponent: EncryptPluginPanel,
  hasData: () => false,
};

registerPlugin(encryptPlugin);
