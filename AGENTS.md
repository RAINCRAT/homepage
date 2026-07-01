# AGENTS.md — LAYOSERVE Home 代理配置

## 项目概述

本项目为 LAYOSERVE Home 静态前端站点，采用标准前端项目结构组织资源。首页使用 Canvas 粒子特效（移植自 [Arknights-FlowingPoints](https://github.com/BlackCoder0/Arknights-FlowingPoints)）作为背景，鼠标划过时粒子向四周扩散排斥。

## 目录结构

```
LAYOSERVE.home/
├── index.html              # 站点入口首页（粒子特效背景 + 居中导航卡片）
├── html/                   # HTML 页面目录
│   ├── card-demo.html      # 卡片展示页面（3D 倾斜鼠标跟随效果）
│   └── flowing-points.html # 粒子特效独立页面（全屏版）
├── css/                    # 编译后的 CSS 样式文件
│   ├── ak-ui.css           # AK-UI 框架样式（由 SCSS 编译生成）
│   ├── card-demo.css       # 卡片页面专用样式
│   └── CSS_INDEX.md        # CSS 样式分类索引（含组件、类名速查）
├── js/                     # JavaScript 脚本目录
│   └── card-demo.js        # 卡片页面交互脚本（jQuery）
├── images/                 # 图片资源目录
│   ├── mainword.png        # 粒子特效源图（2906×317 宽横幅文字）
│   └── Image_1782869286686_388.png
│   └── Image_1782869298060_103.png
├── assets/                 # 其他静态资源目录
├── fonts/                  # 字体文件目录
├── package.json            # 项目配置文件（npm，含 sass 编译脚本）
└── AGENTS.md               # 本文件 — 代理配置说明
```

---

## 页面功能说明

### 首页 `index.html`

- **粒子特效背景**：Canvas 全屏渲染，从 `images/mainword.png` 采样生成黑色粒子
- **粒子交互**：鼠标/手指划过时粒子向外排斥扩散，移开后缓慢回归原位
- **前景卡片**：半透明白色毛玻璃效果（`backdrop-filter: blur`），水平垂直居中
- **导航链接**：指向卡片演示页和粒子特效独立页
- **依赖**：无外部库，纯原生 JavaScript

### 粒子特效页 `html/flowing-points.html`

- 与首页相同的粒子效果，但全屏独立展示
- 右下角"重新加载"按钮可刷新粒子
- 顶部淡色标题 `FLOWING POINTS`

### 卡片演示页 `html/card-demo.html`

- 展示 AK-UI 风格卡片，鼠标悬停时 3D 倾斜跟随效果
- 依赖 jQuery 3.7.1 (CDN)

---

## 粒子系统配置

粒子系统核心参数（直接写在 HTML 的 `<script>` 中）：

```javascript
/**
 * 粒子系统核心配置项
 * 路径: /js/index.js
 * 注意: 修改后需重新加载页面生效
 */
const CONFIG = {
    // 视觉参数
    particleSize: 3,        // 粒子直径（px）
    particleMargin: 1,      // 粒子初始间距（px）  
    
    // 物理参数
    repulsionRadius: 105,   // 斥力作用半径（px）
    repulsionForce: 1.8,    // 斥力强度 [0.1-5.0]
    friction: 0.15,         // 运动阻尼 [0.01-0.3]
    returnSpeed: 0.01,      // 位置回归速度 [0.001-0.1]
    
    // 图像处理
    samplingStep: 5,        // 采样步长（px）
    maxDisplayRatio: 0.8,   // 画布最大占比 [0.5-1.0]
    
    // 性能参数
    asyncBatchSize: 200,    // 异步批处理量
    maxImageSize: 1024,     // 输入图像尺寸限制
    
    // 移动端参数（自动覆盖主配置）
    mobile: {               
        repulsionRadius: 78,   // 缩小作用半径
        repulsionForce: 1.9,   // 增强触控响应
        friction: 0.16         // 增加运动阻尼
    }
};
```

### 粒子采样逻辑（重要）

```javascript
// 原版 ArkPoints 逻辑：所有不透明像素都生成粒子
// 仅判断 alpha 通道 >= 128，不按亮度过滤
if (imgData.data[idx + 3] >= 128) {
    state.particles.push(new Particle(...));
}
```

> **注意**：曾因错误添加 `brightness < 128` 过滤导致浅色文字图片零粒子输出，已修复为原版逻辑。

---

## 构建与编译

### SCSS 编译
本项目使用 Dart Sass 将 SCSS 源文件编译为 CSS。

```bash
# 安装依赖
npm install

# 手动编译 SCSS → CSS
npx sass scss/ak-ui.scss css/ak-ui.css

# 或使用 npm script
npm run build:css
```

> **注意**：生产环境中 SCSS 源文件已被移除，仅保留编译后的 CSS 文件。

---

## 代理配置与第三方服务集成

### CDN 资源引用

| 资源 | 用途 | CDN 地址 |
|------|------|----------|
| jQuery 3.7.1 | card-demo.html 交互 | `https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js` |

### 开发服务器

```bash
# Python
python -m http.server 8080

# Node.js
node _server.js

# Live Server (VS Code 插件)
# 直接在项目根目录右键 → Open with Live Server
```

### Nginx 部署参考

```nginx
server {
    listen 80;
    server_name LAYOSERVE.home;

    root /path/to/LAYOSERVE.home;
    index index.html;

    # 静态资源缓存
    location /images/ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location /css/ {
        expires 7d;
    }
}
```

---

## 文件命名规范

- HTML 文件：使用小写字母 + 连字符（kebab-case），如 `card-demo.html`、`flowing-points.html`
- CSS 文件：与对应 HTML 同名，如 `card-demo.css`
- JS 文件：与对应 HTML 同名，如 `card-demo.js`
- 图片资源：保留原始命名，统一存放于 `images/` 目录

---

## 维护说明

1. **结构与表现分离**：`html/` 目录中的页面引用资源时使用相对路径 `../css/`、`../js/`、`../images/`。根目录 `index.html` 使用同级路径 `css/`、`images/`。
2. **首页粒子特效**：图片路径为 `images/mainword.png`，更换图片需同步更新 JS 中 `CONFIG.imageSrc`。
3. **第三方依赖**：优先使用 CDN，如需离线使用请将库文件下载至 `assets/` 目录。

## 效果聚合类

### Outline + Glow 效果聚合

在 `css/home.css` 中提供了效果聚合类，用于同时应用多种动画效果，解决分别使用 `ak-fx--outline` 和 `ak-fx--glow` 时动画冲突的问题。

- **`.ak-fx--outline-glow`**：同时应用 outline 边框渐变和 glow 发光效果，单向循环脉冲
- **使用方法**：
  ```html
  <button class="ak-button ak-button--action ak-fx--outline-glow"
          style="--ak-outline-color: var(--ak-color-primary); --ak-fx-glow-color: var(--ak-color-primary);">
      按钮文本
  </button>
  ```
- **CSS 变量**：
  - `--ak-outline-color`：outline 边框颜色
  - `--ak-fx-glow-color`：glow 发光颜色
- **实现要点**：
  - 使用 CSS 多动画管线（comma-separated `animation`），`ak-outline-fade` 管 outline、`ak-glow` 管 glow，各跑各的互不干扰
  - `ak-outline-fade`：outline 颜色从实色渐变到透明、粗细从 0.35rem 收缩到 0.2rem、偏移从 0 扩散到 1.5rem，0.7s 单向循环
  - `ak-glow`：box-shadow 从 0 到 20px 明暗脉冲，1.5s alternate 正反平滑过渡
  - 保留按钮原有的 drop shadow，不受动画覆盖

---

## CSS 样式索引

> **[css/CSS_INDEX.md](./css/CSS_INDEX.md)**

涵盖 `ak-ui.css` 全部组件（按钮、卡片、表单、动效、图标、分页、3D 立方体等）及 `card-demo.css` 所有类名与 CSS 变量。
