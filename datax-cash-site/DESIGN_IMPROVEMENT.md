# 设计改进建议

## 问题
当前网站设计存在以下问题：
- Logo大小在每个HTML文件中单独定义 (`h-10`, `h-6` 等)
- 修改logo大小需要编辑多个文件
- 没有统一的样式管理
- 维护困难，容易出错

## 解决方案

### 1. 创建统一的CSS文件
创建了 `assets/css/common.css` 文件来管理公共样式。

### 2. 使用CSS变量
```css
:root {
  --logo-height: 1.5rem; /* 全局logo高度 */
}

.logo {
  height: var(--logo-height);
  width: auto;
}
```

### 3. 在HTML中使用统一的类名
```html
<!-- 旧方式 - 不推荐 -->
<img src="assets/images/logo.svg" alt="datax.cash logo" class="h-6 w-auto">

<!-- 新方式 - 推荐 -->
<img src="assets/images/logo.svg" alt="datax.cash logo" class="logo">
```

## 优势

### ✅ 集中管理
- 所有logo样式在一个地方定义
- 修改logo大小只需要改一个CSS变量

### ✅ 灵活性
- 提供多种logo尺寸选项 (`.logo`, `.logo-small`, `.logo-large`)
- 可以根据页面需求选择合适的尺寸

### ✅ 维护性
- 减少重复代码
- 降低出错概率
- 便于团队协作

## 实施步骤

### 1. 在所有HTML文件中引入CSS
```html
<link href="assets/css/common.css" rel="stylesheet">
```

### 2. 替换logo类名
将所有 `h-6 w-auto`, `h-8 w-auto`, `h-10 w-auto` 等替换为 `logo`

### 3. 调整logo大小
只需要修改 `common.css` 中的 `--logo-height` 变量：
```css
:root {
  --logo-height: 1.25rem; /* 小logo */
  /* 或 */
  --logo-height: 2rem;     /* 大logo */
}
```

## 示例

当前已经在 `index.html` 中实施了这个改进。其他页面可以按照相同方式修改。

### 修改前后对比

**修改前：**
- 需要编辑9个HTML文件
- 每个文件都有硬编码的尺寸类

**修改后：**
- 只需要修改1个CSS变量
- 所有页面自动更新

这就是良好的前端架构设计！