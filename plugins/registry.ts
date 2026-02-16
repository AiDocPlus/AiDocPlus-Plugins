/**
 * Stub: registry.ts — 主程序插件注册表查询 API
 * 仅用于满足 fragments.ts 的 import，插件项目中不使用
 */
import type { DocumentPlugin } from './types';
import type { Document } from '@aidocplus/shared-types';

export function getPluginsForDocument(_doc: Document): DocumentPlugin[] {
  return [];
}

export function getPlugins(): DocumentPlugin[] {
  return [];
}

export function getAllPlugins(): DocumentPlugin[] {
  return [];
}

export function getPluginById(_id: string): DocumentPlugin | undefined {
  return undefined;
}
