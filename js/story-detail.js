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
    document.getElementById('story-content').innerHTML = story.content;
    
    // 更新导航
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
