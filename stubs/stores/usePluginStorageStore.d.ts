/**
 * Stub: @/stores/usePluginStorageStore — 插件独立存储 store 类型声明
 */
export interface PluginStorageState {
  getPluginData<T = unknown>(pluginId: string, key: string): T | null;
  setPluginData(pluginId: string, key: string, value: unknown): void;
  removePluginData(pluginId: string, key: string): void;
  clearPluginData(pluginId: string): void;
}

export declare const usePluginStorageStore: {
  getState(): PluginStorageState;
  (selector: (state: PluginStorageState) => unknown): unknown;
};
