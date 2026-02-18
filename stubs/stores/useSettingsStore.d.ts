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
  provider: string | undefined;
  apiKey: string | undefined;
  model: string | undefined;
  baseUrl?: string | undefined;
};

export declare function getAIInvokeParamsForService(serviceId?: string): {
  provider: string | undefined;
  apiKey: string | undefined;
  model: string | undefined;
  baseUrl?: string | undefined;
};
