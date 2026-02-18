export interface ThinkParseResult {
  /** 正文内容（去除了 <think> 部分） */
  content: string;
  /** 思考内容（<think> 标签内的文本） */
  thinking: string;
  /** 是否正在思考中（流式场景：<think> 已打开但尚未关闭） */
  isThinking: boolean;
}

export function parseThinkTags(text: string): ThinkParseResult;
