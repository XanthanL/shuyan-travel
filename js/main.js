/**
 * 树言·旅记 - 主JavaScript文件
 */

document.addEventListener('DOMContentLoaded', function() {
    initPageTransitions();
    initProgressBar();
    if (document.getElementById('stories-container')) {
        setTimeout(loadStories, 100);
    }
    initScrollReveal();
});

function initProgressBar() {
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressContainer.appendChild(progressBar);
    document.body.prepend(progressContainer);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });
}

function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 初始页面可能已经存在的段落（如 About 页面）
    document.querySelectorAll('.story-excerpt, .story-content p, .about-content p').forEach(el => {
        revealObserver.observe(el);
    });

    window.revealObserver = revealObserver; // 供动态生成内容调用
}

function loadStories() {
    if (window.getAllStories) {
        const stories = window.getAllStories();
        renderStories(stories);
    }
}

function renderStories(stories) {
    const container = document.getElementById('stories-container');
    if (!container) return;
    
    if (stories.length === 0) {
        container.innerHTML = '<p class="text-center">还没有故事被记录...</p>';
        return;
    }
    
    container.innerHTML = '';
    stories.forEach((story, index) => {
        const card = createStoryCard(story);
        container.appendChild(card);
        
        // 监测卡片整体
        const cardObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(() => {
                    card.classList.add('visible');
                    // 监测卡片内的段落
                    card.querySelectorAll('.story-excerpt, .story-card-title, .story-card-subtitle').forEach(el => {
                        el.classList.add('revealed');
                    });
                }, index * 150);
                cardObserver.unobserve(card);
            }
        }, { threshold: 0.1 });
        cardObserver.observe(card);
    });
}

function createStoryCard(story) {
    const article = document.createElement('article');
    article.className = 'story-card';
    article.onclick = () => {
        window.location.href = `story.html?id=${story.id}`;
    };
    
    // 摘要处理
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = story.content;
    const plainText = (tempDiv.textContent || tempDiv.innerText || "").replace(/\s+/g, ' ').trim();
    const excerpt = plainText.substring(0, 150) + "...";

    article.innerHTML = `
        <div class="story-card-content">
            <div class="story-meta">
                <span>${story.date}</span>
                <span>${story.location}</span>
            </div>
            <h2 class="story-card-title">${story.title}</h2>
            <p class="story-card-subtitle">${story.subtitle}</p>
            <p class="story-excerpt">${excerpt}</p>
            <a href="story.html?id=${story.id}" class="read-more">翻开日记</a>
        </div>
    `;
    
    return article;
}

function initPageTransitions() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
}
