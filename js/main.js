/**
 * 树言·旅记 - 主JavaScript文件
 * 提供基本的交互功能和动态内容加载
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('《树言·旅记》已加载 - 树言开始在路上记录故事');
    
    // ===== 初始化功能 =====
    initNavigation();
    initReadingProgress();
    initPageTransitions();
    
    // ===== 首页特定功能 =====
    const storiesContainer = document.getElementById('stories-container');
    if (storiesContainer) {
        renderStories(storiesContainer);
    }
});

/**
 * 初始化导航系统
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const path = window.location.pathname;
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (path.endsWith(href) || (path.endsWith('/') && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * 渲染故事列表
 */
function renderStories(container) {
    if (!window.getAllStories) {
        console.error('无法获取故事数据，请确保 js/stories.js 已加载');
        container.innerHTML = '<p class="text-center">故事暂时走丢了，请刷新重试...</p>';
        return;
    }
    
    const stories = window.getAllStories();
    container.innerHTML = '';
    
    stories.forEach((story, index) => {
        const card = document.createElement('article');
        card.className = 'story-card';
        
        // 提取前100个字符作为摘要
        const excerpt = extractExcerpt(story.content, 100);
        
        card.innerHTML = `
            <div class="story-date">${story.date} · ${story.location}</div>
            <h2 class="story-title">${story.title}</h2>
            <div class="story-excerpt">
                <p>${excerpt}</p>
            </div>
            <div class="story-meta">
                <span class="story-location">${story.location}</span>
                <span class="story-mood">${story.mood}</span>
            </div>
            <a href="${getStoryLink(story.id)}" class="read-more">阅读完整故事 →</a>
        `;
        
        container.appendChild(card);
        
        // 添加悬停动画
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

/**
 * 获取故事链接
 */
function getStoryLink(storyId) {
    // 统一使用动态详情页
    return `story.html?id=${storyId}`;
}

/**
 * 提取摘要
 */
function extractExcerpt(htmlContent, maxLength) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const text = tempDiv.textContent || tempDiv.innerText || "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
}

/**
 * 初始化阅读进度指示器
 */
function initReadingProgress() {
    // 创建进度条
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--color-accent);
        width: 0;
        z-index: 9999;
        transition: width 0.1s;
    `;
    document.body.appendChild(progressBar);
    
    // 更新进度
    window.addEventListener('scroll', function() {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / (docHeight - winHeight)) * 100;
        
        progressBar.style.width = `${progress}%`;
    });
}

/**
 * 初始化页面过渡效果
 */
function initPageTransitions() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
}
