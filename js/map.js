// 树言·旅记 - 交互式地图功能 (高德地图版)
// 文件: js/map.js

/**
 * 逻辑路线：
 * 1. 北京 (2018) - 觉醒
 * 2. 哈尔滨 (2019) - 凝固
 * 3. 敦煌 (2020) - 熵增
 * 4. 喀什 (2021) - 节奏
 * 5. 拉萨 (2022) - 剥离
 * 6. 成都 (2023) - 慢速
 * 7. 大理 (2024) - 尊严
 * 8. 雨崩 (2025) - 奖赏
 */
const travelLocations = [
    {
        id: 1,
        name: "北京",
        lat: 39.9042,
        lng: 116.4074,
        year: 2018,
        season: "春",
        description: "清晨六点，红墙下散发着几百年老楠木被风干的朽气。那是扫帚划过青砖的节拍，也是我旧生活的终点。",
        color: "#8B7355",
        storiesList: [{ title: "故宫的清晨", date: "2018.04.15", storyId: "1" }]
    },
    {
        id: 2,
        name: "哈尔滨",
        lat: 45.8038,
        lng: 126.5340,
        year: 2019,
        season: "冬",
        description: "在零下三十度的江面上，吸入的每一口空气都像碎玻璃渣子。烧刀子在胃里炸开，睫毛上的霜正变得沉重。",
        color: "#795548",
        storiesList: [{ title: "极寒之地的凝固", date: "2019.12.10", storyId: "2" }]
    },
    {
        id: 3,
        name: "敦煌",
        lat: 40.1130,
        lng: 94.6618,
        year: 2020,
        season: "秋",
        description: "壁画每天都在不可逆转地死亡。老李手里的针头很稳，他在这片荒原深处，做着一笔跟熵增对抗的赔本生意。",
        color: "#A1887F",
        storiesList: [{ title: "戈壁里的千年一瞬", date: "2020.09.22", storyId: "3" }]
    },
    {
        id: 4,
        name: "喀什",
        lat: 39.4677,
        lng: 75.9937,
        year: 2021,
        season: "夏",
        description: "时间是用铜壶和铁锤计算的。只要琴声不断，打铁的节奏不歇，帕米尔高原脚下的心跳就不会断。",
        color: "#5D4037",
        storiesList: [{ title: "喀什老城的茶馆", date: "2021.07.12", storyId: "4" }]
    },
    {
        id: 5,
        name: "拉萨",
        lat: 29.6469,
        lng: 91.1172,
        year: 2022,
        season: "夏",
        description: "在最缺氧的地方，人活得最像活人。剥离了形而上的神圣，信仰是磕响青石板的汗水，和一粒带有体温的奶渣。",
        color: "#8B7355",
        storiesList: [{ title: "众神守望的高原", date: "2022.08.05", storyId: "5" }]
    },
    {
        id: 6,
        name: "成都",
        lat: 30.5728,
        lng: 104.0668,
        year: 2023,
        season: "春",
        description: "竹椅在青瓦下发出吱呀声，盖碗茶里的叶片浮沉。在这里，慢速不再是一种罪过，而是一种与世界相处的尊严。",
        color: "#5D4037",
        storiesList: [{ title: "宽窄巷子的慢生活", date: "2023.03.11", storyId: "6" }]
    },
    {
        id: 7,
        name: "大理",
        lat: 25.6065,
        lng: 100.2676,
        year: 2024,
        season: "秋",
        description: "马铃声消失在柏油路尽头。嚼着那块咸得要命的风干肉，我才意识到，被速度吃掉的不仅仅是马帮，还有人的骨气。",
        color: "#8B7355",
        storiesList: [{ title: "洱海边的日出", date: "2024.09.10", storyId: "7" }]
    },
    {
        id: 8,
        name: "雨崩",
        lat: 28.3934,
        lng: 98.8687,
        year: 2025,
        season: "冬",
        description: "梅里雪山下的寂静是带有重量的。只有双脚被砂石反复磨砺出的痛觉，才能抵消在这片神迹面前的虚浮感。",
        color: "#A1887F",
        storiesList: [{ title: "雨崩：离神最近的地方", date: "2025.01.12", storyId: "8" }]
    }
];

let travelMap = null;

function initTravelMap() {
    if (typeof L === 'undefined') return;
    const mapContainer = document.getElementById('travel-map');
    if (!mapContainer) return;
    
    travelMap = L.map('travel-map', { zoomControl: false, attributionControl: false }).setView([35.8617, 104.1954], 4);
    
    L.tileLayer('http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
        subdomains: '1234', minZoom: 3, maxZoom: 12
    }).addTo(travelMap);
    
    L.control.zoom({ position: 'bottomright' }).addTo(travelMap);

    renderSidebarList();
    addLocationMarkers();
    addTravelRoute();
}

function renderSidebarList() {
    const listContainer = document.getElementById('location-list');
    const countBadge = document.getElementById('location-count');
    if (!listContainer) return;

    listContainer.innerHTML = '';
    countBadge.textContent = `共记录 ${travelLocations.length} 处足迹`;

    const sortedLocations = [...travelLocations].sort((a, b) => a.year - b.year);

    sortedLocations.forEach(loc => {
        const item = document.createElement('div');
        item.className = 'location-item';
        item.id = `sidebar-item-${loc.id}`;
        item.innerHTML = `
            <span class="location-item-name">${loc.name}</span>
            <span class="location-item-date">${loc.year} · ${loc.season}</span>
            <div class="location-item-desc">${loc.description}</div>
        `;
        item.onclick = () => focusLocation(loc.id);
        listContainer.appendChild(item);
    });
}

function addLocationMarkers() {
    travelLocations.forEach(location => {
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="width:24px;height:24px;background:${location.color};border:2px solid #fff;border-radius:50%;box-shadow:0 2px 5px rgba(0,0,0,0.2);display:flex;align-items:center;justify-content:center;color:white;font-size:10px;">${location.id}</div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
            popupAnchor: [0, -12]
        });
        
        const marker = L.marker([location.lat, location.lng], { icon: customIcon }).addTo(travelMap);
        marker.bindPopup(createPopupContent(location), { maxWidth: 300 });
        marker.on('click', () => focusLocation(location.id));
        marker.locationData = location;
    });
}

function createPopupContent(location) {
    const storiesHTML = location.storiesList.map(story => {
        if (story.storyId) {
            return `<li><a href="story.html?id=${story.storyId}" style="color:var(--color-accent);text-decoration:none;">${story.title}</a></li>`;
        } else {
            return `<li style="color:var(--color-earth); opacity:0.7;">${story.title}</li>`;
        }
    }).join('');
    
    return `
        <div style="font-family:var(--font-serif);padding:5px;">
            <h3 style="margin:0 0 10px 0;color:var(--color-dark-earth);border-bottom:1px solid var(--color-border);padding-bottom:5px;">${location.name}</h3>
            <p style="font-size:0.9rem;margin-bottom:10px;line-height:1.5;">${location.description}</p>
            <ul style="margin:0;padding-left:15px;font-size:0.85rem;line-height:1.6;">${storiesHTML}</ul>
        </div>
    `;
}

function focusLocation(locationId) {
    const location = travelLocations.find(l => l.id === locationId);
    if (!location || !travelMap) return;

    travelMap.flyTo([location.lat, location.lng], 7, { duration: 1.2 });

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

function addTravelRoute() {
    const routePoints = travelLocations.sort((a, b) => a.year - b.year).map(loc => [loc.lat, loc.lng]);
    L.polyline(routePoints, { color: 'var(--color-accent)', weight: 2, opacity: 0.6, dashArray: '5, 10' }).addTo(travelMap);
}

function showAllLocations() {
    if (travelMap) {
        const bounds = L.latLngBounds(travelLocations.map(loc => [loc.lat, loc.lng]));
        travelMap.fitBounds(bounds, { padding: [50, 50] });
        document.querySelectorAll('.location-item').forEach(el => el.classList.remove('active'));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('travel-map')) {
        setTimeout(initTravelMap, 100);
    }
});
