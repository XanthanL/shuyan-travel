// 树言·旅记 - 交互式地图功能
// 文件: js/map.js

/**
 * 重新编排的逻辑路线：
 * 2018: 北京 (起点/大学所在地) -> 2019: 哈尔滨 (北上极寒) -> 
 * 2020: 敦煌 (西进戈壁) -> 2021: 喀什 (西极之地) -> 
 * 2022: 拉萨 (雪域高原) -> 2023: 成都 (盆地休整) -> 
 * 2024: 大理 (洱海定居) -> 2025: 雨崩 (当前的隐居)
 */
const travelLocations = [
    {
        id: 1,
        name: "北京",
        lat: 39.9042,
        lng: 116.4074,
        year: 2018,
        season: "春",
        stories: 3,
        description: "大学毕业的那个春天，我在这座城市的红墙下徘徊了很久，最终决定出发。",
        color: "#8B7355",
        storiesList: [
            { title: "故宫的清晨", date: "2018.04.15", storyId: "3" },
            { title: "后海的晚风", date: "2018.05.20" }
        ]
    },
    {
        id: 2,
        name: "哈尔滨",
        lat: 45.8038,
        lng: 126.5340,
        year: 2019,
        season: "冬",
        stories: 2,
        description: "为了考验意志，我一路北上。零下三十度的松花江，冰层厚得像大地一样踏实。",
        color: "#795548",
        storiesList: [
            { title: "中央大街的俄式烤肉", date: "2019.12.10" },
            { title: "江面上的冬捕", date: "2019.12.15" }
        ]
    },
    {
        id: 3,
        name: "敦煌",
        lat: 40.1130,
        lng: 94.6618,
        year: 2020,
        season: "秋",
        stories: 4,
        description: "从东北折返向西，穿过漫长的铁路线。鸣沙山的风，吹了千年都没停。",
        color: "#A1887F",
        storiesList: [
            { title: "莫高窟的静默", date: "2020.09.22" },
            { title: "月牙泉边的星空", date: "2020.09.25" }
        ]
    },
    {
        id: 4,
        name: "喀什",
        lat: 39.4677,
        lng: 75.9937,
        year: 2021,
        season: "夏",
        stories: 3,
        description: "继续向西，直到帕米尔高原的脚下。老城的茶馆里，时间是按‘壶’来计算的。",
        color: "#5D4037",
        storiesList: [
            { title: "百年茶馆的午后", date: "2021.07.12" },
            { title: "高台民居的夕阳", date: "2021.07.18" }
        ]
    },
    {
        id: 5,
        name: "拉萨",
        lat: 29.6469,
        lng: 91.1172,
        year: 2022,
        season: "夏",
        stories: 5,
        description: "沿着新藏线南下，翻过海拔五千米的山口。在这里，离天空近得让人想流泪。",
        color: "#8B7355",
        storiesList: [
            { title: "大昭寺前的阳光", date: "2022.08.05" },
            { title: "甜茶馆里的众生相", date: "2022.08.12" }
        ]
    },
    {
        id: 6,
        name: "成都",
        lat: 30.5728,
        lng: 104.0668,
        year: 2023,
        season: "春",
        stories: 4,
        description: "从高原下到盆地，这是一种湿润的回信。在这里，我学会了如何慢下来生活。",
        color: "#5D4037",
        storiesList: [
            { title: "宽窄巷子的慢生活", date: "2023.03.11", storyId: "2" },
            { title: "小酒馆里的民谣", date: "2023.03.20" }
        ]
    },
    {
        id: 7,
        name: "大理",
        lat: 25.6065,
        lng: 100.2676,
        year: 2024,
        season: "秋",
        stories: 6,
        description: "顺着横断山脉南下。苍山不墨千秋画，洱海无弦万古琴。我在这里住了很久。",
        color: "#8B7355",
        storiesList: [
            { title: "洱海边的日出", date: "2024.09.10", storyId: "1" },
            { title: "古城里的手工坊", date: "2024.10.05" }
        ]
    },
    {
        id: 8,
        name: "雨崩",
        lat: 28.3934,
        lng: 98.8687,
        year: 2025,
        season: "冬",
        stories: 2,
        description: "目前的停靠站。梅里雪山脚下的村落，进出只能靠双脚。我想在这里写完我的书。",
        color: "#A1887F",
        storiesList: [
            { title: "神瀑下的洗礼", date: "2025.01.12" },
            { title: "藏家火塘边的夜话", date: "2025.02.20" }
        ]
    }
];

let travelMap = null;

// 初始化地图
function initTravelMap() {
    if (typeof L === 'undefined') return;
    
    const mapContainer = document.getElementById('travel-map');
    if (!mapContainer) return;
    
    // 使用 CartoDB Positron 浅色系底图
    travelMap = L.map('travel-map', {
        zoomControl: false,
        attributionControl: false
    }).setView([35.8617, 104.1954], 4);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 12
    }).addTo(travelMap);
    
    L.control.zoom({ position: 'bottomright' }).addTo(travelMap);

    renderSidebarList();
    addLocationMarkers();
    addTravelRoute();
}

// 渲染侧边栏
function renderSidebarList() {
    const listContainer = document.getElementById('location-list');
    const countBadge = document.getElementById('location-count');
    if (!listContainer) return;

    listContainer.innerHTML = '';
    countBadge.textContent = `共记录 ${travelLocations.length} 处足迹`;

    // 按年份正序排列，展示成长的轨迹
    const sortedLocations = [...travelLocations].sort((a, b) => a.year - b.year);

    sortedLocations.forEach(loc => {
        const item = document.createElement('div');
        item.className = 'location-item';
        item.id = `sidebar-item-${loc.id}`;
        item.innerHTML = `
            <div class="location-item-header">
                <span class="location-item-name">${loc.name}</span>
                <span class="location-item-date">${loc.year} · ${loc.season}</span>
            </div>
            <div class="location-item-desc">${loc.description}</div>
        `;
        
        item.onclick = () => focusLocation(loc.id);
        listContainer.appendChild(item);
    });
}

// 添加标记
function addLocationMarkers() {
    travelLocations.forEach(location => {
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="width:24px;height:24px;background:${location.color};border:2px solid #fff;border-radius:50%;box-shadow:0 2px 5px rgba(0,0,0,0.2);display:flex;align-items:center;justify-content:center;color:white;font-size:10px;font-family:var(--font-sans);">${location.id}</div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
            popupAnchor: [0, -12]
        });
        
        const marker = L.marker([location.lat, location.lng], {
            icon: customIcon
        }).addTo(travelMap);
        
        marker.bindPopup(createPopupContent(location), {
            maxWidth: 300,
            className: 'custom-popup'
        });

        marker.on('click', () => focusLocation(location.id));
        marker.locationData = location;
    });
}

// 弹出窗内容
function createPopupContent(location) {
    const storiesHTML = location.storiesList.map(story => {
        const url = story.storyId ? `story.html?id=${story.storyId}` : `search.html?query=${encodeURIComponent(location.name)}`;
        return `<li><a href="${url}" style="color:var(--color-accent);text-decoration:none;">${story.title}</a></li>`;
    }).join('');
    
    return `
        <div style="font-family:var(--font-serif);padding:5px;">
            <h3 style="margin:0 0 10px 0;color:var(--color-dark-earth);border-bottom:1px solid var(--color-light-earth);padding-bottom:5px;">${location.name}</h3>
            <p style="font-size:0.9rem;margin-bottom:10px;line-height:1.5;">${location.description}</p>
            <div style="font-size:0.85rem;font-weight:bold;margin-bottom:5px;color:var(--color-earth);">相关记录：</div>
            <ul style="margin:0;padding-left:15px;font-size:0.85rem;line-height:1.6;">${storiesHTML}</ul>
        </div>
    `;
}

// 平滑聚焦联动
function focusLocation(locationId) {
    const location = travelLocations.find(l => l.id === locationId);
    if (!location || !travelMap) return;

    travelMap.flyTo([location.lat, location.lng], 7, {
        duration: 1.2,
        easeLinearity: 0.25
    });

    document.querySelectorAll('.location-item').forEach(el => el.classList.remove('active'));
    const sidebarItem = document.getElementById(`sidebar-item-${locationId}`);
    if (sidebarItem) {
        sidebarItem.classList.add('active');
        sidebarItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    setTimeout(() => {
        travelMap.eachLayer(layer => {
            if (layer.locationData && layer.locationData.id === locationId) {
                layer.openPopup();
            }
        });
    }, 1300);
}

// 旅行路线 - 虚线连接
function addTravelRoute() {
    const routePoints = travelLocations
        .sort((a, b) => a.year - b.year)
        .map(loc => [loc.lat, loc.lng]);
    
    L.polyline(routePoints, {
        color: 'var(--color-accent)',
        weight: 2,
        opacity: 0.6,
        dashArray: '5, 10'
    }).addTo(travelMap);
}

function showAllLocations() {
    if (travelMap) {
        const bounds = L.latLngBounds(travelLocations.map(loc => [loc.lat, loc.lng]));
        travelMap.fitBounds(bounds, { padding: [50, 50], animate: true });
        document.querySelectorAll('.location-item').forEach(el => el.classList.remove('active'));
    }
}

// 全局导出
window.initTravelMap = initTravelMap;
window.showAllLocations = showAllLocations;

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('travel-map')) {
        setTimeout(initTravelMap, 100);
    }
});
