#!/bin/bash
# deploy.sh — 部署插件到主程序
# 用法:
#   bash scripts/deploy.sh              # 部署全部插件
#   bash scripts/deploy.sh summary      # 部署单个插件
#   bash scripts/deploy.sh summary ppt  # 部署多个插件

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PLUGIN_PROJECT="$(dirname "$SCRIPT_DIR")"
MAIN_PROJECT="${AIDOCPLUS_PATH:-$(dirname "$PLUGIN_PROJECT")/AiDocPlus}"

SRC_PLUGINS="$PLUGIN_PROJECT/plugins"
DST_PLUGINS="$MAIN_PROJECT/apps/desktop/src-ui/src/plugins"

# SDK 文件列表（不部署，这些由主程序维护）
SDK_FILES=("_framework" "types.ts" "pluginStore.ts" "i18n-loader.ts" "constants.ts" "fragments.ts" "registry.ts" "env.d.ts")

if [ ! -d "$DST_PLUGINS" ]; then
  echo "错误: 找不到主程序插件目录: $DST_PLUGINS"
  echo "设置环境变量 AIDOCPLUS_PATH 指向主程序根目录，或确保主程序在同级目录"
  exit 1
fi

is_sdk_file() {
  local name="$1"
  for sdk in "${SDK_FILES[@]}"; do
    if [ "$name" = "$sdk" ]; then
      return 0
    fi
  done
  return 1
}

deploy_plugin() {
  local name="$1"
  if is_sdk_file "$name"; then
    return 0
  fi
  if [ ! -d "$SRC_PLUGINS/$name" ]; then
    echo "  ✗ 插件不存在: $name"
    return 1
  fi
  echo "  → $name"
  rm -rf "$DST_PLUGINS/$name"
  cp -r "$SRC_PLUGINS/$name" "$DST_PLUGINS/$name"
}

echo "=== 部署插件到主程序 ==="
echo "  源:   $SRC_PLUGINS"
echo "  目标: $DST_PLUGINS"
echo ""

if [ $# -eq 0 ]; then
  # 部署全部插件
  echo "部署全部插件..."
  for dir in "$SRC_PLUGINS"/*/; do
    name=$(basename "$dir")
    deploy_plugin "$name"
  done
else
  # 部署指定插件
  echo "部署指定插件..."
  for name in "$@"; do
    deploy_plugin "$name"
  done
fi

echo ""
echo "=== 部署完成 ==="
echo "请在主程序中运行 pnpm tauri dev 验证"
