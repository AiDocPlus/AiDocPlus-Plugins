#!/bin/bash
# sync-sdk.sh — 从主程序同步 SDK 文件到插件项目
# 用法: bash scripts/sync-sdk.sh [主程序路径]

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PLUGIN_PROJECT="$(dirname "$SCRIPT_DIR")"
MAIN_PROJECT="${1:-$(dirname "$PLUGIN_PROJECT")/AiDocPlus}"

SRC_PLUGINS="$MAIN_PROJECT/apps/desktop/src-ui/src/plugins"
SDK_DIR="$PLUGIN_PROJECT/sdk"

if [ ! -d "$SRC_PLUGINS" ]; then
  echo "错误: 找不到主程序插件目录: $SRC_PLUGINS"
  echo "用法: bash scripts/sync-sdk.sh [主程序路径]"
  exit 1
fi

echo "=== 同步 SDK ==="
echo "  主程序: $MAIN_PROJECT"
echo "  目标:   $SDK_DIR"

# 同步 _framework/ 目录
echo "  → _framework/"
rm -rf "$SDK_DIR/_framework"
cp -r "$SRC_PLUGINS/_framework" "$SDK_DIR/_framework"

# 同步核心文件
for file in types.ts pluginStore.ts i18n-loader.ts constants.ts fragments.ts; do
  echo "  → $file"
  cp "$SRC_PLUGINS/$file" "$SDK_DIR/$file"
done

# 同步 shared-types
SHARED_TYPES="$MAIN_PROJECT/packages/shared-types/src/index.ts"
if [ -f "$SHARED_TYPES" ]; then
  echo "  → shared-types"
  cp "$SHARED_TYPES" "$PLUGIN_PROJECT/stubs/shared-types/src/index.d.ts"
fi

echo "=== SDK 同步完成 ==="
