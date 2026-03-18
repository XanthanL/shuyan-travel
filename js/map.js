// 树言·旅记 - 交互式地图功能
// 文件: js/map.js

// 旅行地点数据
const travelLocations = [
    {
        id: 1,
        name: "北京",
        lat: 39.9042,
        lng: 116.4074,
        year: 2018,
        season: "春",
        stories: 3,
        description: "第一次独自旅行，故宫的红墙黄瓦让我感受到历史的厚重。",
        color: "#8B7355",
        storiesList: [
            { title: "故宫的清晨", date: "2018.04.15" },
            { title: "长城的日落", date: "2018.04.16" },
            { title: "胡同里的老北京", date: "2018.04.17" }
        ]
    },
    {
        id: 2,
        name: "西安",
        lat: 34.3416,
        lng: 108.9398,
        year: 2019,
        season: "秋",
        stories: 2,
        description: "兵马俑的震撼，回民街的美食，古都的魅力让人难忘。",
        color: "#795548",
        storiesList: [
            { title: "兵马俑的沉默军队", date: "2019.10.22" },
            { title: "回民街的美食之旅", date: "2019.10.23" }
        ]
    },
    {
        id: 3,
        name: "成都",
        lat: 30.5728,
        lng: 104.0668,
        year: 2020,
        season: "夏",
        stories: 4,
        description: "熊猫基地的可爱，宽窄巷子的悠闲，火锅的麻辣鲜香。",
        color: "#5D4037",
        storiesList: [
            { title: "熊猫宝宝的午睡时间", date: "2020.07.10" },
            { title: "宽窄巷子的慢生活", date: "2020.07.11" },
            { title: "火锅店的烟火气", date: "2020.07.12" },
            { title: "都江堰的水利奇迹", date: "2020.07.13" }
        ]
    },
    {
        id: 4,
        name: "杭州",
        lat: 30.2741,
        lng: 120.1551,
        year: 2021,
        season: "春",
        stories: 3,
        description: "西湖的烟雨，龙井的清香，江南水乡的温柔。",
        color: "#8B7355",
        storiesList: [
            { title: "西湖边的晨雾", date: "2021.03.25" },
            { title: "龙井村的茶香", date: "2021.03.26" },
            { title: "灵隐寺的钟声", date: "2021.03.27" }
        ]
    },
    {
        id: 5,
        name: "厦门",
        lat: 24.4798,
        lng: 118.0894,
        year: 2022,
        season: "冬",
        stories: 2,
        description: "鼓浪屿的琴声，环岛路的骑行，海滨城市的浪漫。",
        color: "#795548",
        storiesList: [
            { title: "鼓浪屿的钢琴声", date: "2022.01.15" },
            { title: "环岛路的日落骑行", date: "2022.01.16" }
        ]
    },
    {
        id: 6,
        name: "大理",
        lat: 25.6065,
        lng: 100.2676,
        year: 2023,
        season: "秋",
        stories: 5,
        description: "苍山洱海，风花雪月，慢生活的理想之地。",
        color: "#5D4037",
        storiesList: [
            { title: "洱海边的日出", date: "2023.09.10" },
            { title: "苍山徒步记", date: "2023.09.11" },
            { title: "古城夜话", date: "2023.09.12" },
            { title: "白族三道茶", date: "2023.09.13" },
            { title: "双廊的慢时光", date: "2023.09.14" }
        ]
    },
    {
        id: 7,
        name: "哈尔滨",
        lat: 45.8038,
        lng: 126.5340,
        year: 2024,
        season: "冬",
        stories: 3,
        description: "冰雪大世界的奇幻，中央大街的俄式风情，零下30度的体验。",
        color: "#8B7355",
        storiesList: [
            { title: "冰雪大世界的奇幻夜", date: "2024.01.20" },
            { title: "中央大街的俄式建筑", date: "2024.01.21" },
            { title: "松花江上的冬泳者", date: "2024.01.22" }
        ]
    },
    {
        id: 8,
        name: "敦煌",
        lat: 40.1130,
        lng: 94.6618,
        year: 2025,
        season: "春",
        stories: 2,
        description: "莫高窟的壁画，鸣沙山的日落，丝绸之路的辉煌。",
        color: "#795548",
        storiesList: [
            { title: "莫高窟的千年壁画", date: "2025.04.18" },
            { title: "鸣沙山月牙泉", date: "2025.04.19" }
        ]
    }
];

// 地图实例
let travelMap = null;

// 初始化地图
function initTravelMap() {
    // 检查是否已经加载了Leaflet
    if (typeof L === 'undefined') {
        console.error('Leaflet.js 未加载，请确保在加载此脚本之前加载了Leaflet库');
        return;
    }
    
    // 检查地图容器是否存在
    const mapContainer = document.getElementById('travel-map');
    if (!mapContainer) {
        console.error('找不到地图容器 #travel-map');
        return;
    }
    
    // 创建地图实例，以中国为中心
    travelMap = L.map('travel-map').setView([35.8617, 104.1954], 4);
    
    // 添加OpenStreetMap图层
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 12,
        minZoom: 3
    }).addTo(travelMap);
    
    // 自定义地图样式
    travelMap.attributionControl.setPrefix('树言·旅记');
    
    // 添加旅行地点标记
    addLocationMarkers();
    
    // 添加旅行路线
    addTravelRoute();
    
    // 添加地图控件
    addMapControls();
    
    // 添加旅行统计控件
    addStatsControl();
    
    // 地图加载完成后的回调
    travelMap.whenReady(function() {
        console.log('旅行地图已加载完成');
        // 触发地图加载完成事件
        document.dispatchEvent(new CustomEvent('mapLoaded', { detail: { locations: travelLocations.length } }));
    });
}

// 添加地点标记
function addLocationMarkers() {
    travelLocations.forEach(location => {
        // 自定义图标
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: createMarkerHTML(location),
            iconSize: [28, 28],
            iconAnchor: [14, 14],
            popupAnchor: [0, -14]
        });
        
        // 创建标记
        const marker = L.marker([location.lat, location.lng], {
            icon: customIcon,
            title: location.name
        }).addTo(travelMap);
        
        // 绑定弹出窗口
        marker.bindPopup(createPopupContent(location), {
            maxWidth: 320,
            className: 'custom-popup',
            closeButton: true
        });
        
        // 添加交互效果
        marker.on('mouseover', function() {
            this.openPopup();
            highlightMarker(this);
        });
        
        marker.on('mouseout', function() {
            this.closePopup();
            unhighlightMarker(this);
        });
        
        marker.on('click', function() {
            // 点击时居中显示
            travelMap.setView([location.lat, location.lng], 6);
            // 记录点击事件
            logMapInteraction('marker_click', location.name);
        });
        
        // 存储引用
        marker.locationData = location;
    });
}

// 创建标记HTML
function createMarkerHTML(location) {
    return `
        <div style="
            width: 28px;
            height: 28px;
            background-color: ${location.color};
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 3px 6px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.2s ease;
        " title="${location.name} (${location.year}年${location.season})">
            ${location.id}
        </div>
    `;
}

// 创建弹出窗口内容
function createPopupContent(location) {
    const storiesHTML = location.storiesList.map(story => 
        `<li style="margin-bottom: 4px;">
            <a href="story.html?id=${location.id}&story=${encodeURIComponent(story.title)}" 
               style="color: var(--color-accent); text-decoration: none;"
               onmouseover="this.style.textDecoration='underline'"
               onmouseout="this.style.textDecoration='none'">
                ${story.title}
            </a>
            <span style="color: var(--color-earth); font-size: 0.85rem; margin-left: 8px;">
                ${story.date}
            </span>
        </li>`
    ).join('');
    
    return `
        <div class="map-popup-content" style="font-family: var(--font-sans);">
            <div style="
                background-color: ${location.color}20;
                padding: 12px;
                border-radius: 8px 8px 0 0;
                margin: -12px -12px 12px -12px;
            ">
                <h3 style="margin: 0; color: var(--color-dark-earth); font-size: 1.2rem;">
                    ${location.name}
                </h3>
                <div style="display: flex; gap: 12px; margin-top: 6px; font-size: 0.9rem; color: var(--color-earth);">
                    <span>📅 ${location.year}年${location.season}</span>
                    <span>📖 ${location.stories}篇故事</span>
                </div>
            </div>
            
            <p style="margin: 0 0 12px 0; line-height: 1.5; color: var(--color-ink);">
                ${location.description}
            </p>
            
            <div style="margin: 12px 0; padding: 8px; background-color: var(--color-paper); border-radius: 4px;">
                <div style="font-weight: bold; color: var(--color-dark-earth); margin-bottom: 6px; font-size: 0.9rem;">
                    相关故事：
                </div>
                <ul style="margin: 0; padding-left: 16px; font-size: 0.9rem;">
                    ${storiesHTML}
                </ul>
            </div>
            
            <div style="display: flex; gap: 8px; margin-top: 12px;">
                <a href="index.html#story-${location.id}" 
                   style="
                       flex: 1;
                       padding: 6px 12px;
                       background-color: var(--color-accent);
                       color: white;
                       text-decoration: none;
                       border-radius: 4px;
                       font-size: 0.85rem;
                       text-align: center;
                       transition: background-color 0.2s;
                   "
                   onmouseover="this.style.backgroundColor='var(--color-accent-dark)'"
                   onmouseout="this.style.backgroundColor='var(--color-accent)'">
                    查看所有故事
                </a>
                <button onclick="zoomToLocation(${location.id})"
                   style="
                       padding: 6px 12px;
                       background-color: var(--color-light-earth);
                       color: var(--color-dark-earth);
                       border: 1px solid var(--color-earth);
                       border-radius: 4px;
                       font-size: 0.85rem;
                       cursor: pointer;
                       transition: all 0.2s;
                   "
                   onmouseover="this.style.backgroundColor='var(--color-earth)'; this.style.color='white'"
                   onmouseout="this.style.backgroundColor='var(--color-light-earth)'; this.style.color='var(--color-dark-earth)'">
                    定位
                </button>
            </div>
        </div>
    `;
}

// 添加旅行路线
function addTravelRoute() {
    // 按时间排序的地点坐标
    const routePoints = travelLocations
        .sort((a, b) => {
            // 按年份和季节排序
            const seasonOrder = { "春": 0, "夏": 1, "秋": 2, "冬": 3 };
            if (a.year !== b.year) return a.year - b.year;
            return seasonOrder[a.season] - seasonOrder[b.season];
        })
        .map(loc => [loc.lat, loc.lng]);
    
    // 创建路线
    const travelRoute = L.polyline(routePoints, {
        color: 'var(--color-accent)',
        weight: 3,
        opacity: 0.7,
        dashArray: '8, 12',
        lineCap: 'round',
        lineJoin: 'round'
    }).addTo(travelMap);
    
    // 添加路线动画效果
    let dashOffset = 0;
    function animateRoute() {
        dashOffset = (dashOffset + 1) % 20;
        travelRoute.setStyle({ dashOffset: dashOffset });
        requestAnimationFrame(animateRoute);
    }
    animateRoute();
    
    // 添加路线说明
    const routeInfo = L.control({ position: 'bottomright' });
    routeInfo.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'route-info-control');
        div.innerHTML = `
            <div style="
                background-color: rgba(255, 248, 225, 0.9);
                border: 1px solid var(--color-light-earth);
                border-radius: 8px;
                padding: 10px;
                font-family: var(--font-sans);
                font-size: 0.85rem;
                color: var(--color-dark-earth);
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                max-width: 200px;
            ">
                <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
                    <div style="width: 20px; height: 3px; background: var(--color-accent); border-radius: 2px;"></div>
                    <span style="font-weight: bold;">旅行路线</span>
                </div>
                <div style="color: var(--color-earth);">
                    从${travelLocations[0].name}到${travelLocations[travelLocations.length-1].name}
                </div>
            </div>
        `;
        return div;
    };
    routeInfo.addTo(travelMap);
}

// 添加地图控件
function addMapControls() {
    // 缩放控件
    L.control.zoom({
        position: 'topleft',
        zoomInTitle: '放大',
        zoomOutTitle: '缩小'
    }).addTo(travelMap);
    
    // 比例尺
    L.control.scale({
        position: 'bottomleft',
        imperial: false,
        metric: true
    }).addTo(travelMap);
    
    // 全屏控件（如果支持）
    if (travelMap.requestFullscreen) {
        const fullscreenControl = L.control({ position: 'topright' });
        fullscreenControl.onAdd = function(map) {
            const div = L.DomUtil.create('div', 'fullscreen-control');
            div.innerHTML = `
                <button onclick="toggleFullscreen()"
                   style="
                       padding: 6px 12px;
                       background-color: var(--color-paper);
                       color: var(--color-dark-earth);
                       border: 1px solid var(--color-light-earth);
                       border-radius: 4px;
                       font-size: 0.85rem;
                       cursor: pointer;
                       transition: all 0.2s;
                       display: flex;
                       align-items: center;
                       gap: 4px;
                   "
                   onmouseover="this.style.backgroundColor='var(--color-light-earth)'"
                   onmouseout="this.style.backgroundColor='var(--color-paper)'"
                   title="全屏查看">
                    📺 全屏
                </button>
            `;
            return div;
        };
        fullscreenControl.addTo(travelMap);
    }
}

// 添加统计控件
function addStatsControl() {
    const statsControl = L.control({ position: 'topright' });
    
    statsControl.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'map-stats-control');
        
        // 计算统计数据
        const totalCities = travelLocations.length;
        const totalStories = travelLocations.reduce((sum, loc) => sum + loc.stories, 0);
        const yearsSpan = travelLocations[travelLocations.length-1].year - travelLocations[0].year + 1;
        
        // 按季节统计
        const seasonStats = travelLocations.reduce((stats, loc) => {
            stats[loc.season] = (stats[loc.season] || 0) + 1;
            return stats;
        }, {});
        
        const seasonText = Object.entries(seasonStats)
            .map(([season, count]) => `${season}${count}`)
            .join(' ');
        
        div.innerHTML = `
            <div style="
                background-color: rgba(255, 248, 225, 0.95);
                border: 1px solid var(--color-light-earth);
                border-radius: 12px;
                padding: 16px;
                font-family: var(--font-sans);
                font-size: 0.9rem;
                color: var(--color-dark-earth);
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                min-width: 200px;
                backdrop-filter: blur(4px);
            ">
                <div style="
                    font-weight: bold; 
                    margin-bottom: 12px; 
                    border-bottom: 2px solid var(--color-light-earth); 
                    padding-bottom: 8px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 1rem;
                ">
                    <span style="font-size: 1.2rem;">📍</span>
                    <span>旅行足迹</span>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px;">
                    <div style="text-align: center; padding: 8px; background-color: rgba(139, 115, 85, 0.1); border-radius: 6px;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--color-dark-earth);">${totalCities}</div>
                        <div style="font-size: 0.8rem; color: var(--color-earth);">个城市</div>
                    </div>
                    <div style="text-align: center; padding: 8px; background-color: rgba(121, 85, 72, 0.1); border-radius: 6px;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--color-dark-earth);">${totalStories}</div>
                        <div style="font-size: 0.8rem; color: var(--color-earth);">篇故事</div>
                    </div>
                </div>
                
                <div style="margin-bottom: 8px; padding: 6px; background-color: rgba(255,255,255,0.5); border-radius: 4px;">
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: var(--color-earth);">时间跨度：</span>
                        <span style="font-weight: bold;">${yearsSpan}年</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-top: 4px;">
                        <span style="color: var(--color-earth);">季节分布：</span>
                        <span style="font-weight: bold;">${seasonText}</span>
                    </div>
                </div>
                
                <button onclick="showAllLocations()"
                   style="
                       width: 100%;
                       padding: 8px;
                       background-color: var(--color-accent);
                       color: white;
                       border: none;
                       border-radius: 6px;
                       font-size: 0.85rem;
                       cursor: pointer;
                       transition: background-color 0.2s;
                       margin-top: 8px;
                       font-weight: bold;
                   "
                   onmouseover="this.style.backgroundColor='var(--color-accent-dark)'"
                   onmouseout="this.style.backgroundColor='var(--color-accent)'">
                    查看所有地点
                </button>
            </div>
        `;
        return div;
    };
    
    statsControl.addTo(travelMap);
}

// 工具函数
function highlightMarker(marker) {
    const icon = marker.getElement();
    if (icon) {
        icon.style.transform = 'scale(1.2)';
        icon.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
        icon.style.zIndex = '1000';
    }
}

function unhighlightMarker(marker) {
    const icon = marker.getElement();
    if (icon) {
        icon.style.transform = 'scale(1)';
        icon.style.boxShadow = '0 3px 6px rgba(0,0,0,0.2)';
        icon.style.zIndex = 'auto';
    }
}

function zoomToLocation(locationId) {
    const location = travelLocations.find(loc => loc.id === locationId);
    if (location && travelMap) {
        travelMap.setView([location.lat, location.lng], 6, {
            animate: true,
            duration: 1
        });
        
        // 打开该地点的弹出窗口
        travelMap.eachLayer(function(layer) {
            if (layer.locationData && layer.locationData.id === locationId) {
                layer.openPopup();
            }
        });
        
        logMapInteraction('zoom_to_location', location.name);
    }
}

function showAllLocations() {
    if (travelMap && travelLocations.length > 0) {
        // 计算包含所有地点的边界
        const bounds = L.latLngBounds(
            travelLocations.map(loc => [loc.lat, loc.lng])
        );
        
        travelMap.fitBounds(bounds, {
            padding: [50, 50],
            animate: true,
            duration: 1.5
        });
        
        logMapInteraction('show_all_locations', 'all');
    }
}

function toggleFullscreen() {
    const mapContainer = document.getElementById('travel-map');
    if (!document.fullscreenElement) {
        if (mapContainer.requestFullscreen) {
            mapContainer.requestFullscreen();
        } else if (mapContainer.webkitRequestFullscreen) {
            mapContainer.webkitRequestFullscreen();
        } else if (mapContainer.msRequestFullscreen) {
            mapContainer.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

// 记录地图交互
function logMapInteraction(action, data) {
    console.log(`地图交互: ${action} - ${data}`);
    // 这里可以添加更详细的交互日志记录
    // 例如发送到分析服务
}

// 导出函数供全局使用
window.initTravelMap = initTravelMap;
window.zoomToLocation = zoomToLocation;
window.showAllLocations = showAllLocations;
window.toggleFullscreen = toggleFullscreen;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 检查当前页面是否是地图页面
    if (document.getElementById('travel-map')) {
        // 延迟初始化，确保Leaflet已加载
        setTimeout(initTravelMap, 100);
    }
});