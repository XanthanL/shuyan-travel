// 树言·旅记 - 搜索功能
// 文件: js/search.js

// 搜索状态
let searchState = {
    query: '',
    location: '',
    mood: '',
    year: '',
    sort: 'recent',
    results: [],
    allStories: []
};

// DOM元素
let searchInput, searchButton, searchResults, noResults, loading, searchStats;
let locationFilter, moodFilter, yearFilter, sortFilter;
let resultsCount, queryText, searchQueryText;
let quickFilters, showAllButton;

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    try {
        initializeElements();
        loadAllStories();
        setupEventListeners();
        initializeFilters();
        
        // 解析 URL 参数并执行初始搜索
        parseURLParameters();
        performSearch();
    } catch (error) {
        console.error('搜索功能初始化失败:', error);
        // ... (保持错误处理逻辑不变)
    }
});

// 解析 URL 参数
function parseURLParameters() {
    const params = new URLSearchParams(window.location.search);
    
    if (params.has('query')) {
        const query = params.get('query');
        searchInput.value = query;
        searchState.query = query;
    }
    
    if (params.has('location')) {
        const location = params.get('location');
        locationFilter.value = location;
        searchState.location = location;
    }
    
    if (params.has('mood')) {
        const mood = params.get('mood');
        moodFilter.value = mood;
        searchState.mood = mood;
    }
    
    if (params.has('year')) {
        const year = params.get('year');
        yearFilter.value = year;
        searchState.year = year;
    }
}

// 初始化DOM元素
function initializeElements() {
    searchInput = document.getElementById('search-input');
    searchButton = document.getElementById('search-button');
    searchResults = document.getElementById('search-results');
    noResults = document.getElementById('no-results');
    loading = document.getElementById('loading');
    searchStats = document.getElementById('search-stats');
    
    locationFilter = document.getElementById('location-filter');
    moodFilter = document.getElementById('mood-filter');
    yearFilter = document.getElementById('year-filter');
    sortFilter = document.getElementById('sort-filter');
    
    resultsCount = document.getElementById('results-count');
    queryText = document.getElementById('query-text');
    searchQueryText = document.getElementById('search-query-text');
    
    quickFilters = document.getElementById('quick-filters');
    showAllButton = document.getElementById('show-all-stories');
}

// 加载所有故事
function loadAllStories() {
    if (window.getAllStories) {
        searchState.allStories = window.getAllStories();
        console.log(`加载了 ${searchState.allStories.length} 个故事`);
    } else {
        console.error('故事数据模块未加载');
        searchState.allStories = [];
    }
}

// 设置事件监听器
function setupEventListeners() {
    // 搜索按钮点击
    searchButton.addEventListener('click', () => {
        searchState.query = searchInput.value.trim();
        performSearch();
    });
    
    // 搜索框回车
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchState.query = searchInput.value.trim();
            performSearch();
        }
    });
    
    // 搜索框输入（实时搜索建议）
    searchInput.addEventListener('input', debounce(() => {
        const query = searchInput.value.trim();
        if (query.length > 1) {
            showSearchSuggestions(query);
        } else {
            hideSearchSuggestions();
        }
    }, 300));
    
    // 过滤器变化
    locationFilter.addEventListener('change', () => {
        searchState.location = locationFilter.value;
        performSearch();
    });
    
    moodFilter.addEventListener('change', () => {
        searchState.mood = moodFilter.value;
        performSearch();
    });
    
    yearFilter.addEventListener('change', () => {
        searchState.year = yearFilter.value;
        performSearch();
    });
    
    sortFilter.addEventListener('change', () => {
        searchState.sort = sortFilter.value;
        performSearch();
    });
    
    // 显示所有故事按钮
    showAllButton.addEventListener('click', () => {
        clearFilters();
        performSearch();
    });
    
    // 点击页面其他区域隐藏搜索建议
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-box-container')) {
            hideSearchSuggestions();
        }
    });
}

// 初始化过滤器选项
function initializeFilters() {
    if (!window.getStoryStats) return;
    
    const stats = window.getStoryStats();
    
    // 地点过滤器
    stats.locations.forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        option.textContent = location;
        locationFilter.appendChild(option);
    });
    
    // 年份过滤器
    stats.years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });
    
    // 心情过滤器（从故事中提取）
    const moods = [...new Set(searchState.allStories.map(story => story.mood))];
    moods.forEach(mood => {
        const option = document.createElement('option');
        option.value = mood;
        option.textContent = mood;
        moodFilter.appendChild(option);
    });
    
    // 快速筛选标签
    initializeQuickFilters(stats.tags);
}

// 初始化快速筛选标签
function initializeQuickFilters(tags) {
    quickFilters.innerHTML = '';
    
    // 热门标签（取前10个）
    const popularTags = tags.slice(0, 10);
    
    popularTags.forEach(tag => {
        const filter = document.createElement('button');
        filter.className = 'quick-filter';
        filter.textContent = `#${tag}`;
        filter.dataset.tag = tag;
        filter.addEventListener('click', () => {
            searchInput.value = tag;
            searchState.query = tag;
            performSearch();
        });
        quickFilters.appendChild(filter);
    });
}

// 执行搜索
function performSearch() {
    showLoading();
    
    // 模拟网络延迟
    setTimeout(() => {
        const results = searchStories();
        updateSearchState(results);
        renderResults(results);
        updateSearchStats();
        hideLoading();
    }, 300);
}

// 搜索故事
function searchStories() {
    let results = [...searchState.allStories];
    
    // 关键词搜索
    if (searchState.query) {
        if (window.searchStories) {
            results = window.searchStories(searchState.query);
        } else {
            // 备用搜索逻辑
            const query = searchState.query.toLowerCase();
            results = results.filter(story => 
                story.title.toLowerCase().includes(query) ||
                story.subtitle.toLowerCase().includes(query) ||
                story.location.toLowerCase().includes(query) ||
                story.content.toLowerCase().includes(query) ||
                story.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }
    }
    
    // 地点筛选
    if (searchState.location) {
        results = results.filter(story => 
            story.location.includes(searchState.location)
        );
    }
    
    // 心情筛选
    if (searchState.mood) {
        results = results.filter(story => 
            story.mood.includes(searchState.mood)
        );
    }
    
    // 年份筛选
    if (searchState.year) {
        results = results.filter(story => 
            story.date.startsWith(searchState.year)
        );
    }
    
    // 排序
    results = sortResults(results, searchState.sort);
    
    return results;
}

// 排序结果
function sortResults(results, sortBy) {
    const sorted = [...results];
    
    switch (sortBy) {
        case 'recent':
            sorted.sort((a, b) => {
                const dateA = parseDate(a.date);
                const dateB = parseDate(b.date);
                return dateB - dateA; // 最新的在前
            });
            break;
            
        case 'oldest':
            sorted.sort((a, b) => {
                const dateA = parseDate(a.date);
                const dateB = parseDate(b.date);
                return dateA - dateB; // 最旧的在前
            });
            break;
            
        case 'readTime':
            sorted.sort((a, b) => {
                const timeA = parseInt(a.readTime) || 0;
                const timeB = parseInt(b.readTime) || 0;
                return timeB - timeA; // 阅读时间长的在前
            });
            break;
            
        case 'title':
            sorted.sort((a, b) => a.title.localeCompare(b.title, 'zh-CN'));
            break;
    }
    
    return sorted;
}

// 解析日期字符串
function parseDate(dateStr) {
    const parts = dateStr.split('.');
    if (parts.length >= 3) {
        return new Date(parts[0], parts[1] - 1, parts[2]);
    }
    return new Date(0); // 默认日期
}

// 更新搜索状态
function updateSearchState(results) {
    searchState.results = results;
}

// 渲染结果
function renderResults(results) {
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        noResults.style.display = 'block';
        searchResults.style.display = 'none';
        return;
    }
    
    noResults.style.display = 'none';
    searchResults.style.display = 'grid';
    
    results.forEach(story => {
        const resultCard = createResultCard(story);
        searchResults.appendChild(resultCard);
    });
}

// 创建结果卡片
function createResultCard(story) {
    const card = document.createElement('div');
    card.className = 'search-result-card';
    
    // 提取摘要（前150个字符）
    const excerpt = extractExcerpt(story.content, 150);
    
    // 高亮搜索关键词
    const highlightedTitle = highlightText(story.title, searchState.query);
    const highlightedExcerpt = highlightText(excerpt, searchState.query);
    
    card.innerHTML = `
        <img src="${story.heroImage}" alt="${story.title}" class="result-image">
        <div class="result-content">
            <div class="result-meta">
                <span class="result-meta-item">
                    <i class="far fa-calendar"></i>
                    ${story.date}
                </span>
                <span class="result-meta-item">
                    <i class="fas fa-map-marker-alt"></i>
                    ${story.location}
                </span>
                <span class="result-meta-item">
                    <i class="far fa-clock"></i>
                    ${story.readTime}
                </span>
            </div>
            <h3 class="result-title">${highlightedTitle}</h3>
            <p class="result-excerpt">${highlightedExcerpt}</p>
            <div class="result-tags">
                ${story.tags.map(tag => `
                    <span class="result-tag">#${tag}</span>
                `).join('')}
            </div>
            <a href="${getStoryPageUrl(story.id)}" class="result-link">
                阅读完整故事
                <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `;
    
    return card;
}

// 提取摘要
function extractExcerpt(content, maxLength) {
    // 移除HTML标签
    const text = content.replace(/<[^>]*>/g, ' ');
    // 移除多余空格
    const cleanText = text.replace(/\s+/g, ' ').trim();
    
    if (cleanText.length <= maxLength) {
        return cleanText;
    }
    
    // 在完整单词处截断
    let excerpt = cleanText.substring(0, maxLength);
    const lastSpace = excerpt.lastIndexOf(' ');
    
    if (lastSpace > 0) {
        excerpt = excerpt.substring(0, lastSpace);
    }
    
    return excerpt + '...';
}

// 高亮文本
function highlightText(text, query) {
    if (!query || query.trim() === '') {
        return text;
    }
    
    const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
    return text.replace(regex, '<span class="suggestion-highlight">$1</span>');
}

// 转义正则表达式特殊字符
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 更新搜索统计
function updateSearchStats() {
    const count = searchState.results.length;
    resultsCount.textContent = count;
    
    if (searchState.query) {
        queryText.textContent = searchState.query;
        searchQueryText.style.display = 'inline';
    } else {
        searchQueryText.style.display = 'none';
    }
}

// 显示搜索建议
function showSearchSuggestions(query) {
    if (!query || query.length < 2) return;
    
    const suggestions = getSearchSuggestions(query);
    const suggestionsContainer = document.getElementById('search-suggestions');
    
    if (suggestions.length === 0) {
        hideSearchSuggestions();
        return;
    }
    
    suggestionsContainer.innerHTML = '';
    
    suggestions.forEach(suggestion => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.innerHTML = `<div class="suggestion-text">${highlightText(suggestion, query)}</div>`;
        
        item.addEventListener('click', () => {
            searchInput.value = suggestion;
            searchState.query = suggestion;
            performSearch();
            hideSearchSuggestions();
        });
        
        suggestionsContainer.appendChild(item);
    });
    
    suggestionsContainer.style.display = 'block';
}

// 获取搜索建议
function getSearchSuggestions(query) {
    const suggestions = new Set();
    const queryLower = query.toLowerCase();
    
    // 从故事标题中提取建议
    searchState.allStories.forEach(story => {
        if (story.title.toLowerCase().includes(queryLower)) {
            suggestions.add(story.title);
        }
        
        if (story.location.toLowerCase().includes(queryLower)) {
            suggestions.add(story.location);
        }
        
        story.tags.forEach(tag => {
            if (tag.toLowerCase().includes(queryLower)) {
                suggestions.add(tag);
            }
        });
    });
    
    // 添加一些通用建议
    const commonSuggestions = ['日出', '慢生活', '历史', '哲学', '文化', '自然', '旅行感悟'];
    commonSuggestions.forEach(suggestion => {
        if (suggestion.toLowerCase().includes(queryLower)) {
            suggestions.add(suggestion);
        }
    });
    
    return Array.from(suggestions).slice(0, 8); // 最多8条建议
}

// 隐藏搜索建议
function hideSearchSuggestions() {
    const suggestionsContainer = document.getElementById('search-suggestions');
    suggestionsContainer.style.display = 'none';
}

// 显示加载状态
function showLoading() {
    loading.style.display = 'block';
    searchResults.style.display = 'none';
    noResults.style.display = 'none';
}

// 隐藏加载状态
function hideLoading() {
    loading.style.display = 'none';
}

// 清空过滤器
function clearFilters() {
    searchInput.value = '';
    locationFilter.value = '';
    moodFilter.value = '';
    yearFilter.value = '';
    sortFilter.value = 'recent';
    
    searchState.query = '';
    searchState.location = '';
    searchState.mood = '';
    searchState.year = '';
    searchState.sort = 'recent';
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 获取故事页面URL
function getStoryPageUrl(storyId) {
    return `story.html?id=${storyId}`;
}

// 导出函数供其他脚本使用
window.performSearch = performSearch;
window.clearFilters = clearFilters;
window.getStoryPageUrl = getStoryPageUrl;