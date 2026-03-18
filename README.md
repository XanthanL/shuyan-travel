# 树言·旅记 - 个人网站

一个徒步旅行者的故事记录网站，采用极简设计，专注于内容呈现。

## 🎭 关于树言

树言是一个徒步旅行者，用脚步丈量中国大地，用文字记录路上遇到的人和他们的故事。这个网站是他的旅行日记，记录着温馨、欢乐、悲伤、恐怖的相遇。

## 🌐 网站特点

### 设计理念
- **极简主义**：大量留白，单栏布局
- **大地色系**：土黄、深绿、灰褐，营造温暖感
- **响应式设计**：完美适配手机、平板、电脑
- **沉浸阅读**：专注于故事本身

### 功能特性
- **时间线叙事**：所有故事按时间倒序排列
- **交互式地图**：展示旅行足迹（开发中）
- **故事详情**：点击卡片阅读完整故事
- **阅读进度**：顶部进度指示器
- **平滑动画**：优雅的页面过渡效果

## 📁 项目结构

```
shuyan-website/
├── index.html          # 首页（时间线）
├── map.html           # 旅行地图页面
├── about.html         # 关于树言页面
├── css/
│   └── style.css     # 主样式文件
├── js/
│   └── main.js       # 主JavaScript文件
├── README.md         # 项目说明
└── (未来可能添加)
    ├── stories/      # 故事详情页面
    └── images/       # 图片资源
```

## 🚀 本地运行

1. **克隆或下载项目**
   ```bash
   git clone <repository-url>
   cd shuyan-website
   ```

2. **直接打开**
   - 双击 `index.html` 在浏览器中打开
   - 或使用本地服务器：
     ```bash
     # Python 3
     python3 -m http.server 8000
     
     # 或使用 Node.js
     npx serve .
     ```

3. **访问网站**
   - 打开浏览器访问 `http://localhost:8000`

## 🌍 部署到 GitHub Pages

### 方法一：直接部署（推荐）

1. **在GitHub创建新仓库**
   - 仓库名：`shuyan-travel`（或其他名称）
   - 选择 Public
   - 不初始化README（因为已有文件）

2. **上传文件到GitHub**
   ```bash
   # 初始化Git
   git init
   git add .
   git commit -m "初始提交：树言个人网站"
   
   # 连接到GitHub仓库
   git remote add origin https://github.com/你的用户名/shuayan-travel.git
   git branch -M main
   git push -u origin main
   ```

3. **启用GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 `main` 分支
   - 点击 Save
   - 等待几分钟，访问提供的URL

### 方法二：使用自定义域名

1. **在仓库根目录创建 `CNAME` 文件**
   ```
   shuyan.com  # 你的域名
   ```

2. **在域名服务商添加CNAME记录**
   ```
   类型: CNAME
   主机: www
   值: 你的用户名.github.io
   ```

## 🛠️ 技术栈

- **HTML5**：语义化标签，增强可访问性
- **CSS3**：Flexbox布局，CSS变量，响应式设计
- **JavaScript**：原生JS，无框架依赖
- **GitHub Pages**：免费静态网站托管

## 📝 内容管理

### 添加新故事
1. 在 `index.html` 中添加新的 `.story-card` 元素
2. 在 `js/main.js` 的 `getStoryContent()` 函数中添加对应内容
3. 在 `map.html` 中添加对应地点信息

### 修改样式
- 主样式：`css/style.css`
- 页面特有样式：各HTML文件的 `<style>` 标签内

### 修改交互
- 主脚本：`js/main.js`
- 页面特有脚本：各HTML文件的 `<script>` 标签内

## 🎨 设计系统

### 色彩
```css
--color-earth: #8B7355;      /* 大地色 */
--color-dark-earth: #5D4037; /* 深大地色 */
--color-light-earth: #D7CCC8; /* 浅大地色 */
--color-paper: #FFF8E1;      /* 纸张色 */
--color-ink: #3E2723;        /* 墨色 */
--color-accent: #795548;     /* 强调色 */
```

### 字体
- 主要字体：Georgia, Times New Roman, SimSun（衬线字体）
- 辅助字体：Helvetica Neue, Arial, Microsoft YaHei（无衬线字体）

### 间距
```css
--space-xs: 0.5rem;  /* 8px */
--space-sm: 1rem;    /* 16px */
--space-md: 2rem;    /* 32px */
--space-lg: 3rem;    /* 48px */
--space-xl: 4rem;    /* 64px */
```

## 🔧 开发建议

### 性能优化
- 图片使用WebP格式
- 启用Gzip压缩
- 使用CSS Sprites（如果需要多个图标）

### 可访问性
- 所有图片都有alt文本
- 使用语义化HTML标签
- 确保足够的颜色对比度
- 支持键盘导航

### SEO优化
- 每个页面都有唯一的title和description
- 使用语义化HTML结构
- 添加Open Graph标签（社交媒体分享）

## 📚 未来计划

### 短期（1-2周）
- [ ] 添加更多故事内容
- [ ] 实现真正的交互式地图
- [ ] 添加搜索功能
- [ ] 优化移动端体验

### 中期（1-2月）
- [ ] 添加评论系统（使用GitHub Issues）
- [ ] 实现故事分类标签
- [ ] 添加RSS订阅
- [ ] 创建故事归档页面

### 长期（3-6月）
- [ ] 添加多语言支持
- [ ] 实现用户投稿功能
- [ ] 创建移动端App
- [ ] 出版电子书版本

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

1. Fork本仓库
2. 创建功能分支：`git checkout -b feature/新功能`
3. 提交更改：`git commit -am '添加新功能'`
4. 推送到分支：`git push origin feature/新功能`
5. 提交Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- 感谢所有在路上分享故事的人们
- 感谢GitHub提供免费的静态网站托管
- 感谢开源社区的各种工具和资源

---

**树言·旅记** · 始于2026年 · 故事仍在继续