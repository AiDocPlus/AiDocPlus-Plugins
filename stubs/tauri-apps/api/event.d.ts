/**
 * Stub: @tauri-apps/api/event
 */
export declare function listen<T = unknown>(event: string, handler: (event: { payload: T }) => void): Promise<() => void>;
export declare function emit(event: string, payload?: unknown): Promise<void>;
