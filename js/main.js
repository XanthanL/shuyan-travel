/**
 * 树言·旅记 - 主JavaScript文件
 */

document.addEventListener('DOMContentLoaded', function() {
    initPageTransitions();
    if (document.getElementById('stories-container')) {
        setTimeout(loadStories, 100);
    }
});

function loadStories() {
    if (window.getAllStories) {
        renderStories(window.getAllStories());
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
        container.appendChild(createStoryCard(story));
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(document.querySelectorAll('.story-card')).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100); 
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.story-card').forEach(card => observer.observe(card));
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
