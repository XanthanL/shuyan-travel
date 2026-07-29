// 树言·旅记 - 交互式地图功能 (高德地图版)
// 文件: js/map.js

/**
 * 逻辑路线：
 * 1. 北京 (2018) - 觉醒
 * 2. 大兴安岭 (2019.11) - 迷雾
 * 3. 哈尔滨 (2019.12) - 凝固
 * 4. 敦煌 (2020.09) - 熵增
 * 5. 张掖荒村 (2020.10) - 共温
 * 6. 喀什 (2021) - 节奏
 * 7. 拉萨 (2022) - 剥离
 * 8. 成都 (2023) - 慢速
 * 9. 苍山 (2024.05) - 马帮
 * 10. 大理 (2024.09) - 节律
 * 11. 雨崩 (2025) - 奖赏
 *
 * —— 第二季「对角线」徒步（ID ≥ 12，弃车步行，西南 → 东北）——
 * 12. 德钦 (2025.03) - 弃轮
 * 13. 奔子栏 (2025.03) - 换水
 * 14. 虎跳峡 (2025.03) - 江声
 * 15. 石鼓 (2025.03) - 转弯
 * 16. 丽江 (2025.03) - 冲街
 * 17. 华坪 (2025.04) - 翻色
 *
 * —— 第二段·攀西—大凉山 ——
 * 18. 攀枝花 (2025.04) - 浇城
 * 19. 米易 (2025.05) - 扛季
 * 20. 西昌 (2025.05) - 跨线
 * 21. 昭觉 (2025.05) - 火塘
 * 22. 悬崖村 (2025.06) - 钢梯
 * 23. 峨边 (2025.06) - 忠魂
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
        name: "大兴安岭",
        lat: 50.7833,
        lng: 124.1167,
        year: 2019,
        season: "冬",
        description: "在零下三十度的密林里，白桦树桩在手电光里像张脸。有些东西，是真的不希望被人类定义。",
        color: "#5D4037",
        storiesList: [{ title: "消失的界碑：林子里的眼睛", date: "2019.11.20", storyId: "2" }]
    },
    {
        id: 3,
        name: "哈尔滨",
        lat: 45.8038,
        lng: 126.5340,
        year: 2019,
        season: "冬",
        description: "在零下三十度的江面上，吸入的每一口空气都像碎玻璃渣子。烧刀子在胃里炸开，睫毛上的霜正变得沉重。",
        color: "#795548",
        storiesList: [{ title: "极寒之地的凝固", date: "2019.12.10", storyId: "3" }]
    },
    {
        id: 4,
        name: "敦煌",
        lat: 40.1130,
        lng: 94.6618,
        year: 2020,
        season: "秋",
        description: "壁画每天都在不可逆转地死亡。老李手里的针头很稳，他在这片荒原深处，做着一笔跟熵增对抗的赔本生意。",
        color: "#A1887F",
        storiesList: [{ title: "戈壁里的千年一瞬", date: "2020.09.22", storyId: "4" }]
    },
    {
        id: 5,
        name: "张掖",
        lat: 38.9300,
        lng: 100.4500,
        year: 2020,
        season: "秋",
        description: "在生理性失温面前，阶级共情是唯一的物理热源。那张带膻味的塑料布和辣嗓子的姜汤，砸碎了关于旅行的伪善想象。",
        color: "#8B7355",
        storiesList: [{ title: "河西走廊：那张带膻味的塑料布", date: "2020.10.05", storyId: "5" }]
    },
    {
        id: 6,
        name: "喀什",
        lat: 39.4677,
        lng: 75.9937,
        year: 2021,
        season: "夏",
        description: "时间是用铜壶和铁锤计算的。只要琴声不断，打铁的节奏不歇，帕米尔高原脚下的心跳就不会断。",
        color: "#5D4037",
        storiesList: [{ title: "喀什老城的茶馆", date: "2021.07.12", storyId: "6" }]
    },
    {
        id: 7,
        name: "拉萨",
        lat: 29.6469,
        lng: 91.1172,
        year: 2022,
        season: "夏",
        description: "在最缺氧的地方，人活得最像活人。剥离了形而上的神圣，信仰是磕响青石板的汗水，和一粒带有体温的奶渣。",
        color: "#8B7355",
        storiesList: [{ title: "众神守望的高原", date: "2022.08.05", storyId: "7" }]
    },
    {
        id: 8,
        name: "成都",
        lat: 30.5728,
        lng: 104.0668,
        year: 2023,
        season: "春",
        description: "竹椅在青瓦下发出吱呀声，盖碗茶里的叶片浮沉。在这里，慢速不再是一种罪过，而是一种与世界相处的尊严。",
        color: "#5D4037",
        storiesList: [{ title: "宽窄巷子：锦城的卸妆时刻", date: "2023.03.11", storyId: "8" }]
    },
    {
        id: 9,
        name: "苍山",
        lat: 25.7000,
        lng: 100.1500,
        year: 2024,
        season: "春",
        description: "路通了，马闲了。这世上的事，快有快的道理，慢有慢的尊严。那块咸得要命的风干肉，是旅途中最实在的东西。",
        color: "#A1887F",
        storiesList: [{ title: "苍山：最后的马帮", date: "2024.05.20", storyId: "9" }]
    },
    {
        id: 10,
        name: "大理",
        lat: 25.6065,
        lng: 100.2676,
        year: 2024,
        season: "秋",
        description: "当太阳这块烧红的重金属挤出山脊，人类的焦躁显得一文不值。自然有它的步子，我们只需要与之对齐。",
        color: "#8B7355",
        storiesList: [{ title: "洱海：晨光里的天体节律", date: "2024.09.10", storyId: "10" }]
    },
    {
        id: 11,
        name: "雨崩",
        lat: 28.3934,
        lng: 98.8687,
        year: 2025,
        season: "冬",
        description: "梅里雪山下的寂静是带有重量的。只有双脚被砂石反复磨砺出的痛觉，才能抵消在这片神迹面前的虚浮感。",
        color: "#A1887F",
        storiesList: [{ title: "雨崩：物理极处的大地真形", date: "2025.01.12", storyId: "11" }]
    },
    {
        id: 12,
        name: "德钦",
        lat: 28.4833,
        lng: 98.9167,
        year: 2025,
        season: "春",
        description: "出雨崩那天，我对停下的面包车摆了摆手。铝杖收进包底，换上一根杜鹃木杖——从这里起，不再上车。",
        color: "#795548",
        storiesList: [{ title: "德钦：把铝杖换成一根木头", date: "2025.03.05", storyId: "12" }]
    },
    {
        id: 13,
        name: "奔子栏",
        lat: 28.1667,
        lng: 99.2833,
        year: 2025,
        season: "春",
        description: "翻过一道山梁，脚下的水换了姓。金沙江浑得像一江黄汤，不喧哗，力气却一分没少。",
        color: "#8B7355",
        storiesList: [{ title: "奔子栏：金沙江递来的第一碗浑水", date: "2025.03.10", storyId: "13" }]
    },
    {
        id: 14,
        name: "虎跳峡",
        lat: 27.1783,
        lng: 100.0839,
        year: 2025,
        season: "春",
        description: "江在石头缝里发疯，发了几十万年。那声音先用耳朵听，再用胸口听，最后用脚底板听。",
        color: "#5D4037",
        storiesList: [{ title: "虎跳峡：一条江在石头缝里发疯", date: "2025.03.15", storyId: "14" }]
    },
    {
        id: 15,
        name: "石鼓",
        lat: 26.8667,
        lng: 99.9667,
        year: 2025,
        season: "春",
        description: "长江在这里学会了转弯。我在油腻的桌面上摊开地图，用铅笔把一条斜线从石鼓拉到了鹤岗。",
        color: "#A1887F",
        storiesList: [{ title: "石鼓：长江在这里学会了转弯", date: "2025.03.20", storyId: "15" }]
    },
    {
        id: 16,
        name: "丽江",
        lat: 26.8721,
        lng: 100.2299,
        year: 2025,
        season: "春",
        description: "白天的古城是一台开足马力的机器。凌晨四点，纳西阿婆用一渠雪水和一把扫帚，把它刷回了真身。",
        color: "#795548",
        storiesList: [{ title: "丽江：凌晨四点的古城", date: "2025.03.25", storyId: "16" }]
    },
    {
        id: 17,
        name: "华坪",
        lat: 26.6290,
        lng: 101.2660,
        year: 2025,
        season: "春",
        description: "对角线上第一座煤城。挖煤的手和剪芒果枝的手是同一双，一个朝地底要黑的，一个朝天上要绿的。",
        color: "#8B7355",
        storiesList: [{ title: "华坪：煤黑的地里长出金黄", date: "2025.04.08", storyId: "17" }]
    },
    {
        id: 18,
        name: "攀枝花",
        lat: 26.5823,
        lng: 101.7160,
        year: 2025,
        season: "春",
        description: "这座城是挂在山坡上的。六十年前七户人家一棵树，后来树底下浇出一座钢城——先生产，后生活。",
        color: "#5D4037",
        storiesList: [{ title: "攀枝花：一座用花名命名的钢城", date: "2025.04.20", storyId: "18" }]
    },
    {
        id: 19,
        name: "米易",
        lat: 26.8879,
        lng: 102.1103,
        year: 2025,
        season: "夏",
        description: "安宁河谷的大棚里，春天比日历早两个月。早出来的那两个月，是人凌晨三点一担一担挑进去的。",
        color: "#A1887F",
        storiesList: [{ title: "米易：大棚里的春天比日历早", date: "2025.05.02", storyId: "19" }]
    },
    {
        id: 20,
        name: "西昌",
        lat: 27.8944,
        lng: 102.2644,
        year: 2025,
        season: "夏",
        description: "邛海边补网的手和山谷里点火的手，停在同一片天底下。在月城，我跨过了那条看不见的胡焕庸线。",
        color: "#795548",
        storiesList: [{ title: "西昌：渔网和火箭停在同一片天底下", date: "2025.05.14", storyId: "20" }]
    },
    {
        id: 21,
        name: "昭觉",
        lat: 28.0145,
        lng: 102.8430,
        year: 2025,
        season: "夏",
        description: "大凉山腹地，三块石头支起一口锅，一口锅拢住一家人。火塘不熄，家就不散。",
        color: "#8B7355",
        storiesList: [{ title: "昭觉：火塘边的三块石头", date: "2025.05.24", storyId: "21" }]
    },
    {
        id: 22,
        name: "悬崖村",
        lat: 28.2560,
        lng: 103.3400,
        year: 2025,
        season: "夏",
        description: "两千五百五十六级钢梯焊在八百米绝壁上，白天是路，雨里是命。花在崖上，蜂在崖上，人就还得回崖上。",
        color: "#5D4037",
        storiesList: [{ title: "悬崖村：两千五百级钢梯上的雨", date: "2025.06.05", storyId: "22" }]
    },
    {
        id: 23,
        name: "峨边",
        lat: 29.2305,
        lng: 103.2626,
        year: 2025,
        season: "夏",
        description: "金口大峡谷里，火车从山肚子里开出来又钻回去。钢轨底下压着两千多个名字，一公里一忠魂。",
        color: "#A1887F",
        storiesList: [{ title: "峨边：每根钢轨底下都有人", date: "2025.06.18", storyId: "23" }]
    }
];

let travelMap = null;

function initTravelMap() {
    if (typeof L === 'undefined') return;
    const mapContainer = document.getElementById('travel-map');
    if (!mapContainer) return;
    
    travelMap = L.map('travel-map', { zoomControl: false, attributionControl: false }).setView([35.8617, 104.1954], 4);
    
    // 必须使用 https，GitHub Pages 下 http 瓦片会被浏览器作为混合内容拦截
    L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
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
    // 拷贝后排序，避免修改原数组；同年份的点保持数组书写顺序（稳定排序）
    // SVG 属性不支持 CSS 变量，需使用具体色值
    const sorted = [...travelLocations].sort((a, b) => a.year - b.year);
    const vehiclePoints = sorted.filter(loc => loc.id <= 11).map(loc => [loc.lat, loc.lng]);
    const walkPoints = sorted.filter(loc => loc.id >= 12).map(loc => [loc.lat, loc.lng]);

    // 第一季（ID 1-11）：乘车/飞行轨迹，虚线
    L.polyline(vehiclePoints, { color: '#795548', weight: 2, opacity: 0.5, dashArray: '5, 10' }).addTo(travelMap);

    // 第二季（ID ≥ 12）：徒步对角线，实线，从雨崩（第一季终点）起笔
    if (walkPoints.length) {
        const pivot = travelLocations.find(loc => loc.id === 11);
        const walkLine = pivot ? [[pivot.lat, pivot.lng], ...walkPoints] : walkPoints;
        L.polyline(walkLine, { color: '#BF360C', weight: 3, opacity: 0.85 }).addTo(travelMap);
    }
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
