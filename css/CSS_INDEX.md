# CSS 样式索引

> 项目 CSS 文件分类与组件索引，方便快速查找所需样式。

---

## 文件清单

| 文件 | 用途 | 依赖 |
|------|------|------|
| [ak-ui.css](./ak-ui.css) | AK-UI 框架通用样式（由 SCSS 编译生成） | 无 |
| [card-demo.css](./card-demo.css) | 卡片演示页面专用样式 | — |

---

## ak-ui.css — 组件索引

### 1. 颜色工具类

| class | 效果 | 值 |
|-------|------|-----|
| `.bg-white` | 白色背景 | `white` |
| `.bg-black` | 黑色背景 | `black` |
| `.bg-low` | 低优先级背景 | `#9c9c9c` |
| `.bg-basic` | 基础色背景 | `#d8dd5a` |
| `.bg-primary` | 主色背景 | `#4aabea` |
| `.bg-secondary` | 次色背景 | `#cfc2d1` |
| `.bg-advanced` | 高级色背景 | `#f1c644` |
| `.bg-accent` | 强调色背景 | `#f6540e` |
| `.bg-blue` | 蓝色背景 | `#2bf` |
| `.bg-yellow` | 黄色背景 | `#ffd802` |
| `.bg-dark-blue` | 深蓝背景 | `#0075a8` |
| `.bg-light-blue` | 浅蓝背景 | `#3ff7ff` |
| `.bg-gray` | 灰色背景 | `#313131` |
| `.bg-dark` | 深色背景 | `#222` |

### 2. 文字与阴影工具

| class | 效果 |
|-------|------|
| `.text-shadow` | 文字阴影 `1px 1px 1px rgba(0,0,0,0.3)` |
| `.drop-shadow` | 元素投影 `drop-shadow(1px 1px 1px rgba(0,0,0,0.3))` |
| `.ak-font-serif` | 衬线字体 `Noto Serif SC, serif` |
| `.ak-font-sans-serif` | 无衬线字体 `Noto Sans SC, Roboto, Arial, sans-serif` |
| `.ak-text--title` | 标题文字（粗体 3rem） |

### 3. 按钮 — `.ak-button`

| 子组件 / 修饰符 | 说明 |
|----------------|------|
| `.ak-button` | 基础按钮 |
| `.ak-button__icon` | 按钮图标 |
| `.ak-button__label` | 按钮文字标签 |
| `.ak-button__info` | 按钮信息栏 |
| `.ak-button--block` | 块级按钮（宽度 100%） |
| `.ak-button--fab` | FAB 浮动按钮 |
| `.ak-button--outline` | 边框按钮 |
| `.ak-button--action` | 动作按钮（蓝色） |
| `.ak-button--advanced` | 高级按钮（黄色） |
| `.ak-button--light` | 浅色按钮 |
| `.ak-button--card` | 卡片式按钮 |
| `.ak-button--start` | 启动按钮（菱形+动画） |

### 4. 按钮组 — `.ak-button-group`

| 子组件 / 修饰符 | 说明 |
|----------------|------|
| `.ak-button-group` | 按钮组容器 |
| `.ak-button-group--action` | 动作按钮组 |
| `.ak-button-group--total` | 总计按钮组（左右分栏） |
| `.with-small` | 带小型侧栏的按钮组 |

### 5. 卡片 — `.ak-card`

| 修饰符 | 说明 |
|--------|------|
| `.ak-card` | 基础卡片 |
| `.ak-card--outline` | 边框卡片，含 `.title` 子元素 |
| `.ak-card--stripe` | 条纹背景卡片 |
| `.ak-card--place` | 占位卡片（带按压动效） |

### 6. 计数器 — `.ak-counter`

| 子组件 | 说明 |
|--------|------|
| `.ak-counter` | 计数器容器（inline-flex） |
| `.ak-counter__prefix` | 前缀图标 |
| `.ak-counter__content` | 数值内容 |
| `.ak-counter__suffix` | 后缀图标 |
| `.ak-counter-group` | 计数器组容器 |

### 7. 分割线 — `.ak-divider`

| 说明 |
|------|
| 左右为渐变横线，中间为文字/图标 |

### 8. 数字输入框 — `.ak-input-number`

| 子组件 | 说明 |
|--------|------|
| `.ak-input-number` | 输入框容器 |
| `.ak-input-number__inner` | 输入框本体 |
| `.ak-input-number__max` / `__min` | 最大值/最小值标签 |
| `.ak-input-number__increase` / `__decrease` | 增减按钮 |

### 9. 动效 — `.ak-fx`

| 修饰符 | 说明 |
|--------|------|
| `.ak-fx--glow` | 发光动画 |
| `.ak-fx--outline` | 边框淡化动画 |
| `.ak-fx--skew-left` | 向左倾斜 10deg |
| `.ak-fx--skew-right` | 向右倾斜 10deg |

### 10. 图标 — `.ak-icon`

| 变体 | 说明 |
|------|------|
| `.ak-icon` | 基础 SVG 图标（1em × 1em） |
| `.ak-icon--stuff` | 带圆形边框的装饰图标 |

辅助图标：
- `.triangle-right` — CSS 三角形（右箭头）

### 11. 等级标签 — `.ak-level`

| 子组件 | 说明 |
|--------|------|
| `.ak-level` | 等级容器 |
| `.ak-level .label` | 顶部标签文字 |
| `.ak-level .content` | 中间内容区 |
| `.ak-level .prefix-icon` | 左侧图标 |
| `.ak-level .suffix-icon` | 右侧图标 |

### 12. 加载动画 — `.ak-loading`

| 说明 |
|------|
| 菱形旋转 + 扩散动画（`.ak-radio`） |

### 13. 媒体 — `.ak-media`

| 修饰符 | 说明 |
|--------|------|
| `.ak-media--album` | 相册样式（带边框和背面阴影） |

### 14. 3D 立方体 — `.ak-cube`

| 子组件 / 类 | 说明 |
|------------|------|
| `.ak-cube` | 3D 立方体容器 |
| `.ak-face` | 立方体面 |
| `.ak-face.front` / `.back` / `.right` / `.left` / `.top` / `.bottom` | 六个方位面 |
| `.ak-face__lines` | 面上的装饰线条 |
| `.perspective` | 透视容器 |

### 15. 面板 — `.ak-panel-right`

| 说明 |
|------|
| 右侧透视倾斜面板 |

### 16. 分页 — `.ak-pagination`

| 子组件 | 说明 |
|--------|------|
| `.ak-pagination .prev` / `.next` | 上一页/下一页按钮 |
| `.ak-pagination .cur` | 当前页码（含 `.title`、`.label`、`.number`） |

### 17. San — `.ak-san`

| 子组件 | 说明 |
|--------|------|
| `.ak-san` | San 组件容器 |
| `.ak-san .brain` | 大脑图标 |
| `.ak-san .add` | 添加按钮 |
| `.ak-san .cur` | 当前值 |
| `.ak-san .total` | 总计值 |
| `.ak-san-container` | San 容器（带底部色条） |

### 18. CSS 变量

| 变量名 | 默认值 |
|--------|--------|
| `--ak-color-*` | 各色值（white, black, low, basic, primary, ...） |
| `--ak-fx-glow-color` | `rgba(255,255,255,0.3)` |
| `--ak-outline-color` | `gray` |
| `--ak-loading-color` | `white` / `#ffd802` |
| `--cube-size` | `100px` |
| `--cube-border-width` | `0.2rem` |
| `--cube-color` | `rgba(34,187,255,0.5)` |
| `--level-label-bgcolor` | `black` |
| `--level-label-text` | `"OPERATION"` |
| `--level-prefix-icon-color` | `#2bf` |
| `--button-group-bgcolor` | `rgba(5,166,220,0.9)` |
| `--icon-border-color` | `#d8dd5a` |

---

## card-demo.css — 类名索引

| class | 说明 |
|-------|------|
| `.card-container` | 卡片外层容器（带动画过渡） |
| `.card` / `.card-inner` | 卡片本体 |
| `.card-ani-in` | 卡片进入动画（zoom-in 0.4s） |
| `.card-ani-out` | 卡片退出动画（zoom-out 0.4s） |
| `.card-bg` | 卡片背景层 |
| `.image-area` | 图片区域容器 |
| `.image-main` | 图片本体（带位移过渡） |
| `.dot-pattern` | 圆点装饰图案 |
| `.badge` | 徽章标签 |
| `.badge-shadow` | 徽章阴影 |
| `.title` | 卡片标题 |
| `.subtitle` | 卡片副标题 |
| `.overlay-area` | 覆盖层区域 |
| `.overlay-img` | 覆盖层图片 |
| `.brand-logo` | 品牌 logo |
