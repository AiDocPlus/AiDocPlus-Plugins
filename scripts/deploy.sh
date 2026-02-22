#!/bin/bash
# deploy.sh — 部署插件到主程序
# 用法:
#   bash scripts/deploy.sh              # 部署全部插件
#   bash scripts/deploy.sh summary      # 部署单个插件
#   bash scripts/deploy.sh summary ppt  # 部署多个插件

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PLUGIN_PROJECT="$(dirname "$SCRIPT_DIR")"
PARENT_DIR="$(dirname "$PLUGIN_PROJECT")"

# 双目标部署：构建目标（AiDocPlus/）+ 开发目录（AiDocPlus-Main/）
BUILD_TARGET="${AIDOCPLUS_PATH:-${PARENT_DIR}/AiDocPlus}"
DEV_TARGET="${PARENT_DIR}/AiDocPlus-Main"

SRC_PLUGINS="$PLUGIN_PROJECT/plugins"

# SDK 文件列表（不部署，这些由主程序维护）
SDK_FILES=("_framework" "types.ts" "pluginStore.ts" "i18n-loader.ts" "constants.ts" "fragments.ts" "registry.ts" "env.d.ts")

# 收集有效的部署目标
TARGETS=()
BUILD_DST="$BUILD_TARGET/apps/desktop/src-ui/src/plugins"
DEV_DST="$DEV_TARGET/apps/desktop/src-ui/src/plugins"

if [ -d "$BUILD_DST" ]; then
  TARGETS+=("$BUILD_DST")
else
  echo "[skip] 构建目标不存在: $BUILD_DST"
fi

if [ -d "$DEV_DST" ]; then
  TARGETS+=("$DEV_DST")
else
  echo "[skip] 开发目录不存在: $DEV_DST"
fi

if [ ${#TARGETS[@]} -eq 0 ]; then
  echo "错误: 找不到任何有效的部署目标"
  echo "设置环境变量 AIDOCPLUS_PATH 指向构建目标根目录，或确保 AiDocPlus/ 和 AiDocPlus-Main/ 在同级目录"
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
    echo "  [x] 插件不存在: $name"
    return 1
  fi
  echo "  -> $name"
  for dst in "${TARGETS[@]}"; do
    rm -rf "$dst/$name"
    cp -r "$SRC_PLUGINS/$name" "$dst/$name"
  done
}

echo "=== 部署插件到主程序 ==="
echo "  源:   $SRC_PLUGINS"
for dst in "${TARGETS[@]}"; do
  echo "  目标: $dst"
done
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
