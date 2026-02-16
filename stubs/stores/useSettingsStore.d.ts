/**
 * Stub: @/stores/useSettingsStore — 主程序设置 store 类型声明
 */
export interface AISettings {
  maxContentLength: number;
  [key: string]: unknown;
}

export interface SettingsState {
  ai: AISettings;
  [key: string]: unknown;
}

export declare const useSettingsStore: {
  getState(): SettingsState;
  (selector: (state: SettingsState) => unknown): unknown;
};

export declare function getAIInvokeParams(): {
  provider: string;
  apiKey: string;
  model: string;
  baseUrl?: string;
  [key: string]: unknown;
};
