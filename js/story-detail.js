// 树言·旅记 - 故事详情页面功能
// 文件: js/story-detail.js

// 从URL参数获取故事ID
function getStoryIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const storyId = urlParams.get('id') || '1';
    
    // 验证故事ID是否有效
    if (!window.getStory || !window.getStory(storyId)) {
        console.warn(`故事ID ${storyId} 无效，使用默认故事`);
        return '1';
    }
    
    return storyId;
}

// 更新页面内容
function updateStoryContent() {
    const storyId = getStoryIdFromURL();
    const story = window.getStory(storyId);
    
    if (!story) {
        console.error('无法加载故事数据');
        showError('无法加载故事内容');
        return;
    }
    
    // 更新元数据
    updateStoryMetadata(story);
    
    // 更新标题和副标题
    updateStoryTitles(story);
    
    // 更新英雄图片
    updateHeroImage(story);
    
    // 更新故事内容
    updateStoryBody(story);
    
    // 更新标签
    updateStoryTags(story);
    
    // 更新导航链接
    updateNavigationLinks(storyId);
    
    // 更新页面标题
    document.title = `${story.title} - 树言·旅记`;
    
    // 更新URL（不刷新页面）
    updateURL(storyId);
    
    console.log(`故事 "${story.title}" 加载完成`);
}

// 更新故事元数据
function updateStoryMetadata(story) {
    const elements = {
        'story-date': story.date,
        'story-location': story.location,
        'story-read-time': story.readTime,
        'story-mood': story.mood
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
}

// 更新标题和副标题
function updateStoryTitles(story) {
    const titleElement = document.getElementById('story-title');
    const subtitleElement = document.getElementById('story-subtitle');
    
    if (titleElement) titleElement.textContent = story.title;
    if (subtitleElement) subtitleElement.textContent = story.subtitle;
}

// 更新英雄图片
function updateHeroImage(story) {
    const heroImage = document.getElementById('story-hero-image');
    if (heroImage && story.heroImage) {
        heroImage.src = story.heroImage;
        heroImage.alt = story.title;
    }
}

// 更新故事内容
function updateStoryBody(story) {
    const contentElement = document.getElementById('story-content');
    if (contentElement && story.content) {
        contentElement.innerHTML = story.content;
        
        // 重新初始化图片懒加载
        setTimeout(initLazyLoadImages, 100);
    }
}

// 更新故事标签
function updateStoryTags(story) {
    const tagsContainer = document.getElementById('story-tags');
    if (!tagsContainer) return;
    
    tagsContainer.innerHTML = '';
    
    story.tags.forEach(tag => {
        const tagElement = document.createElement('a');
        tagElement.href = `#`;
        tagElement.className = 'story-tag';
        tagElement.textContent = `#${tag}`;
        tagElement.onclick = (e) => {
            e.preventDefault();
            filterByTag(tag);
        };
        tagsContainer.appendChild(tagElement);
    });
}

// 更新导航链接
function updateNavigationLinks(storyId) {
    if (!window.getAdjacentStories) return;
    
    const adjacent = window.getAdjacentStories(storyId);
    const prevLink = document.getElementById('prev-story');
    const nextLink = document.getElementById('next-story');
    
    // 上一篇
    if (adjacent.prev && prevLink) {
        prevLink.href = `story.html?id=${adjacent.prev.id}`;
        prevLink.querySelector('.story-nav-title').textContent = adjacent.prev.title;
        prevLink.style.display = 'flex';
    } else if (prevLink) {
        prevLink.style.display = 'none';
    }
    
    // 下一篇
    if (adjacent.next && nextLink) {
        nextLink.href = `story.html?id=${adjacent.next.id}`;
        nextLink.querySelector('.story-nav-title').textContent = adjacent.next.title;
        nextLink.style.display = 'flex';
    } else if (nextLink) {
        nextLink.style.display = 'none';
    }
}

// 更新URL
function updateURL(storyId) {
    const newURL = `${window.location.pathname}?id=${storyId}`;
    if (window.history && window.history.replaceState) {
        window.history.replaceState({ storyId }, '', newURL);
    }
}

// 图片懒加载
function initLazyLoadImages() {
    const images = document.querySelectorAll('.story-content img[data-src]');
    
    if (!('IntersectionObserver' in window)) {
        // 不支持IntersectionObserver，直接加载所有图片
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
        });
        return;
    }
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                    img.onload = () => {
                        img.style.opacity = '1';
                    };
                }
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        imageObserver.observe(img);
    });
}

// 阅读进度跟踪
function setupReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'reading-progress-bar';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background-color: var(--color-accent);
        z-index: 1000;
        transition: width 0.1s;
        opacity: 0.9;
    `;
    document.body.appendChild(progressBar);
    
    let animationFrameId = null;
    
    function updateProgress() {
        const content = document.getElementById('story-content');
        if (!content) return;
        
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        const contentTop = content.offsetTop;
        const contentHeight = content.offsetHeight;
        const contentBottom = contentTop + contentHeight;
        
        // 计算在故事内容区域内的滚动百分比
        let scrollPercent = 0;
        
        if (scrollTop < contentTop) {
            scrollPercent = 0;
        } else if (scrollTop > contentBottom - windowHeight) {
            scrollPercent = 100;
        } else {
            scrollPercent = ((scrollTop - contentTop) / (contentHeight - windowHeight)) * 100;
        }
        
        progressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
        
        animationFrameId = requestAnimationFrame(updateProgress);
    }
    
    // 开始跟踪
    updateProgress();
    
    // 清理函数
    return () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        if (progressBar.parentNode) {
            progressBar.parentNode.removeChild(progressBar);
        }
    };
}

// 键盘导航
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // 忽略在输入框中的按键
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        const storyId = getStoryIdFromURL();
        const adjacent = window.getAdjacentStories ? window.getAdjacentStories(storyId) : null;
        
        // 左箭头：上一篇
        if (e.key === 'ArrowLeft' && adjacent && adjacent.prev) {
            e.preventDefault();
            window.location.href = `story.html?id=${adjacent.prev.id}`;
        }
        // 右箭头：下一篇
        else if (e.key === 'ArrowRight' && adjacent && adjacent.next) {
            e.preventDefault();
            window.location.href = `story.html?id=${adjacent.next.id}`;
        }
        // ESC：返回首页
        else if (e.key === 'Escape') {
            window.location.href = 'index.html';
        }
        // P：打印
        else if (e.key === 'p' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            window.print();
        }
    });
}

// 分享功能
function setupShareButtons() {
    const shareButtons = document.querySelectorAll('.share-button');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const type = button.classList.contains('wechat') ? 'wechat' :
                        button.classList.contains('weibo') ? 'weibo' : 'link';
            
            shareStory(type);
        });
    });
}

// 分享故事
function shareStory(type) {
    const storyId = getStoryIdFromURL();
    const story = window.getStory(storyId);
    const url = window.location.href;
    const title = story ? story.title : '树言·旅记';
    const text = story ? story.subtitle : '记录每一次出发';
    
    switch (type) {
        case 'wechat':
            alert('微信分享功能需要微信SDK支持，请手动分享链接');
            break;
            
        case 'weibo':
            const weiboUrl = `http://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title + ' - ' + text)}`;
            window.open(weiboUrl, '_blank', 'width=600,height=400');
            break;
            
        case 'link':
            copyToClipboard(url);
            break;
    }
}

// 复制到剪贴板
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('链接已复制到剪贴板！');
    }).catch(err => {
        console.error('复制失败:', err);
        // 备用方法
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('链接已复制到剪贴板！');
    });
}

// 显示提示
function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--color-dark-earth);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 10000;
        font-size: 0.9rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        animation: fadeInOut 3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3000);
}

// 显示错误
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.innerHTML = `
        <div style="
            text-align: center;
            padding: 40px 20px;
            color: var(--color-earth);
        ">
            <div style="font-size: 3rem; margin-bottom: 20px;">😔</div>
            <h3 style="color: var(--color-dark-earth); margin-bottom: 10px;">加载失败</h3>
            <p>${message}</p>
            <a href="index.html" style="
                display: inline-block;
                margin-top: 20px;
                padding: 10px 20px;
                background-color: var(--color-accent);
                color: white;
                text-decoration: none;
                border-radius: 4px;
            ">返回首页</a>
        </div>
    `;
    
    const container = document.querySelector('.story-detail-container');
    if (container) {
        container.innerHTML = '';
        container.appendChild(errorDiv);
    }
}

// 按标签筛选
function filterByTag(tag) {
    // 这里可以扩展为跳转到搜索页面
    showToast(`筛选标签: #${tag}`);
    // 临时实现：在控制台显示相关故事
    if (window.filterStoriesByTag) {
        const stories = window.filterStoriesByTag(tag);
        console.log(`找到 ${stories.length} 个相关故事:`, stories.map(s => s.title));
    }
}

// 添加打印按钮
function addPrintButton() {
    const printButton = document.createElement('button');
    printButton.id = 'story-print-button';
    printButton.innerHTML = '<i class="fas fa-print"></i> 打印';
    printButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px 16px;
        background-color: var(--color-paper);
        color: var(--color-dark-earth);
        border: 1px solid var(--color-light-earth);
        border-radius: 20px;
        cursor: pointer;
        font-size: 0.9rem;
        z-index: 100;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        transition: all 0.2s;
        display: flex;
        align-items: center;
        gap: 6px;
    `;
    
    printButton.onmouseover = () => {
        printButton.style.backgroundColor = 'var(--color-light-earth)';
    };
    
    printButton.onmouseout = () => {
        printButton.style.backgroundColor = 'var(--color-paper)';
    };
    
    printButton.onclick = () => window.print();
    
    document.body.appendChild(printButton);
    
    // 打印时隐藏按钮
    window.matchMedia('print').addListener((mql) => {
        printButton.style.display = mql.matches ? 'none' : 'flex';
    });
}

// 添加CSS动画
function addCSSAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
            15% { opacity: 1; transform: translateX(-50%) translateY(0); }
            85% { opacity: 1; transform: translateX(-50%) translateY(0); }
            100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        }
        
        .story-content img {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        .story-content img.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 添加CSS动画
    addCSSAnimations();
    
    // 等待故事数据加载
    function checkStoriesLoaded() {
        if (window.getStory) {
            updateStoryContent();
            initLazyLoadImages();
            const cleanupProgress = setupReadingProgress();
            setupKeyboardNavigation();
            setupShareButtons();
            addPrintButton();
            
            console.log('故事详情页面初始化完成');
            
            // 页面卸载时清理
            window.addEventListener('beforeunload', () => {
                if (cleanupProgress) cleanupProgress();
            });
        } else {
            setTimeout(checkStoriesLoaded, 100);
        }
    }
    
    checkStoriesLoaded();
});

// 导出函数供其他脚本使用
window.updateStoryContent = updateStoryContent;
window.shareStory = shareStory;
window.copyToClipboard = copyToClipboard;