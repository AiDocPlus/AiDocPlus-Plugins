/**
 * Stub: @/i18n — 主程序 i18n 模块类型声明
 * 仅用于插件项目类型检查，不提供实现
 */
import i18n from 'i18next';

export default i18n;
export type SupportedLanguage = 'zh' | 'en' | 'ja';
export const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['zh', 'en', 'ja'];
export const DEFAULT_LANGUAGE: SupportedLanguage = 'zh';
export async function changeAppLanguage(_lang: SupportedLanguage): Promise<void> {}
export { useTranslation } from 'react-i18next';
export { Trans } from 'react-i18next';
