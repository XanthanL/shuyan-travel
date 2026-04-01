/**
 * 树言·旅记 - 故事详情页面功能
 */

function getStoryIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || '1';
}

function updateStoryContent() {
    const storyId = getStoryIdFromURL();
    const story = window.getStory ? window.getStory(storyId) : null;

    if (!story) return;

    // 更新基础信息
    document.getElementById('story-date').textContent = story.date;
    document.getElementById('story-location').textContent = story.location;
    document.getElementById('story-title').textContent = story.title;
    document.getElementById('story-subtitle').textContent = story.subtitle;

    const contentContainer = document.getElementById('story-content');
    contentContainer.innerHTML = story.content;

    // 首字下沉优化：给第一个段落加上 drop-cap 类
    const firstP = contentContainer.querySelector('p');
    if (firstP) {
        firstP.classList.add('drop-cap');
    }

    // 触发段落淡入监听
    if (window.revealObserver) {
        contentContainer.querySelectorAll('p, blockquote').forEach(el => {
            window.revealObserver.observe(el);
        });
    }

    // 更新导航... (保持不变)
    if (window.getAdjacentStories) {
        const adjacent = window.getAdjacentStories(storyId);
        const prevLink = document.getElementById('prev-story');
        const nextLink = document.getElementById('next-story');
        
        if (adjacent.prev && prevLink) {
            prevLink.href = `story.html?id=${adjacent.prev.id}`;
            prevLink.querySelector('.story-nav-title').textContent = adjacent.prev.title;
            prevLink.style.display = 'flex';
        } else if (prevLink) {
            prevLink.style.display = 'none';
        }
        
        if (adjacent.next && nextLink) {
            nextLink.href = `story.html?id=${adjacent.next.id}`;
            nextLink.querySelector('.story-nav-title').textContent = adjacent.next.title;
            nextLink.style.display = 'flex';
        } else if (nextLink) {
            nextLink.style.display = 'none';
        }
    }
    
    document.title = `${story.title} - 树言·旅记`;
}

document.addEventListener('DOMContentLoaded', () => {
    function checkStoriesLoaded() {
        if (window.getStory) {
            updateStoryContent();
        } else {
            setTimeout(checkStoriesLoaded, 100);
        }
    }
    checkStoriesLoaded();
});
