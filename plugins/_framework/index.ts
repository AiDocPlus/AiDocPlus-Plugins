import { registerPluginI18n } from '../i18n-loader';
import zh from './i18n/zh.json';
import en from './i18n/en.json';

// 注册插件框架层翻译
registerPluginI18n('plugin-framework', { zh, en });
