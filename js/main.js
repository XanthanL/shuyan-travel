/**
 * 树言·旅记 - 主JavaScript文件
 * 提供基本的交互功能
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('《树言·旅记》已加载');
    
    // ===== 导航系统 =====
    initNavigation();
    
    // ===== 故事卡片交互 =====
    initStoryCards();
    
    // ===== 地图预览 =====
    initMapPreview();
    
    // ===== 页面过渡效果 =====
    initPageTransitions();
    
    // ===== 阅读进度指示器 =====
    initReadingProgress();
});

/**
 * 初始化导航系统
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = getCurrentPage();
    
    // 设置当前页面激活状态
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('data-page') || link.textContent.trim();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
        
        link.addEventListener('click', function(e) {
            if (this.classList.contains('active')) {
                e.preventDefault();
                return;
            }
            
            // 移除所有激活状态
            navLinks.forEach(l => l.classList.remove('active'));
            
            // 添加当前激活状态
            this.classList.add('active');
            
            // 获取目标页面
            const targetPage = this.getAttribute('data-page') || this.textContent.trim();
            
            // 如果是时间线页面，直接滚动到顶部
            if (targetPage === '时间线' && window.location.pathname.endsWith('index.html')) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                updatePageTitle('时间线');
                return;
            }
            
            // 这里可以添加页面切换逻辑
            // 目前是单页应用，所以只是模拟
            console.log(`切换到页面: ${targetPage}`);
            
            // 更新页面标题
            updatePageTitle(targetPage);
            
            // 显示加载提示
            showPageTransition(targetPage);
        });
    });
}

/**
 * 获取当前页面名称
 */
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.endsWith('map.html')) return '旅行地图';
    if (path.endsWith('about.html')) return '关于树言';
    return '时间线'; // 默认首页
}

/**
 * 更新页面标题
 */
function updatePageTitle(pageName) {
    const baseTitle = '树言·旅记';
    if (pageName === '时间线') {
        document.title = baseTitle;
    } else {
        document.title = `${pageName} - ${baseTitle}`;
    }
}

/**
 * 初始化故事卡片交互
 */
function initStoryCards() {
    const storyCards = document.querySelectorAll('.story-card');
    
    storyCards.forEach((card, index) => {
        // 悬停效果
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            this.style.boxShadow = '0 8px 24px rgba(62, 39, 35, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        // 点击效果
        const readMoreLink = card.querySelector('.read-more');
        if (readMoreLink) {
            readMoreLink.addEventListener('click', function(e) {
                e.preventDefault();
                
                // 获取故事标题
                const storyTitle = card.querySelector('.story-title').textContent;
                const storyDate = card.querySelector('.story-date').textContent;
                
                // 显示故事详情
                showStoryDetail({
                    title: storyTitle,
                    date: storyDate,
                    content: getStoryContent(index),
                    location: card.querySelector('.story-location').textContent,
                    mood: card.querySelector('.story-mood').textContent
                });
            });
        }
    });
}

/**
 * 获取故事内容（模拟）
 */
function getStoryContent(index) {
    const stories = [
        // 故事1：雨崩村的制茶老人 (2026)
        `雨下了一整夜，清晨的山谷笼罩在薄雾中。我沿着泥泞的小路向上走，空气中弥漫着泥土和植物的气息。在半山腰的一间木屋前，我遇到了制茶的老人。

他正在院子里翻晒茶叶，动作缓慢而专注。看到我时，他只是点了点头，继续手中的工作。我站在屋檐下避雨，看着他一遍遍地翻动那些深绿色的叶子。

"这雨要下到什么时候？"我终于开口问道。

老人抬起头，看了看天空："该停的时候自然会停。"

我们就这样沉默地站着，听着雨声。过了一会儿，他走进屋里，端出两杯茶。茶汤是清澈的金黄色，散发着淡淡的香气。

"尝尝，"他说，"这是去年的秋茶。"

我接过茶杯，热气温暖了我的手。茶的味道很特别，初尝微苦，回味甘甜。

"你一个人住在这里？"我问。

"嗯，"他点点头，"很多年了。"

"不觉得孤独吗？"

他笑了笑："有山，有茶，有雨，怎么会孤独？"

雨渐渐小了，阳光从云层中透出来。老人继续他的工作，我喝完茶，道了谢，继续上路。

走到山脚下时，我回头望去。木屋在阳光下闪着光，老人还在院子里，像一棵老树，安静地生长在那里。`,

        // 故事2：沙漠中的星空守望者 (2026)
        `敦煌的夜晚冷得刺骨。我裹紧外套，坐在沙丘上等待星空。远处，一个身影也在仰望天空。

他是一名天文爱好者，每年都会来这里观测星空。"城市的灯光太亮了，"他说，"只有在这里，才能看到真正的银河。"

他给我指认星座，讲述每个星座背后的故事。在浩瀚的星空下，人类的故事显得如此渺小，却又如此珍贵。

"你看那边，"他指着北方，"那是北斗七星。在古代，人们用它来辨别方向。"

"你现在用它来辨别什么？"我问。

"辨别自己，"他回答，"在星空下，你能看清自己有多渺小，也能看清自己有多重要。"

我们聊了很久，关于宇宙，关于生命，关于存在的意义。他说他曾经是个程序员，每天对着电脑屏幕，直到有一天他抬头看到了星空。

"那之后我就辞职了，"他说，"开始到处旅行，看不同的星空。"

"后悔吗？"

"从不后悔。星空教会我一件事：生命短暂，但宇宙永恒。我们要做的，就是在短暂中寻找永恒的意义。"

凌晨时分，银河清晰可见。我们不再说话，只是仰望。在那一刻，我理解了什么是真正的孤独，也理解了什么是真正的连接。`,

        // 故事3：318国道上的搭车经历 (2026)
        `在康定城外等了三个小时，终于有一辆卡车停了下来。司机是个沉默的藏族汉子，副驾驶上坐着他的小女儿。

车沿着蜿蜒的山路行驶，窗外是险峻的峡谷和奔腾的河流。小女孩偷偷看我，当我看向她时，她又迅速转过头去。

快到理塘时，司机突然开口："你为什么要走路？"

"为了遇见像你们这样的人。"我回答。

他笑了笑，这是我第一次看到他笑。

"很多人不理解，"我说，"觉得这样很傻。"

"不傻，"他说，"我年轻时也走过。"

他告诉我，二十年前，他也曾背着包走遍西藏。后来结了婚，有了孩子，就开起了卡车。

"但心里还是想走，"他说，"所以每年都会带女儿出来跑车，让她看看外面的世界。"

小女孩这时开口了："爸爸说，世界很大，我们要多看看。"

"你看到了什么？"我问她。

"看到了山，看到了云，看到了像你一样走路的人。"她认真地说。

车到理塘，我下了车。小女孩从车窗里探出头："叔叔，你要去哪里？"

"不知道，"我说，"走到哪里算哪里。"

"那你要小心哦，"她挥挥手，"再见！"

卡车消失在尘土中。我站在路边，突然觉得，这趟搭车经历，比任何风景都更值得记住。`,

        // 故事4：登山向导老陈的最后一次登顶 (2019)
        `老陈今年六十二岁，当了四十年登山向导。我们在四姑娘山镇相遇，他说这是最后一次带人登二峰。

"膝盖不行了，"他拍拍自己的腿，"但心里还想上。"

凌晨三点，我们在黑暗中出发。头灯的光束划破夜空，只能照亮前方几步路。老陈走在最前面，步伐稳健得不像六十多岁的人。

"我带了三千多人登顶，"他边走边说，"有企业家，有学生，有外国人。每个人上山的原因都不一样。"

"你呢？为什么一直带人上山？"

"因为山在那里，"他顿了顿，"也因为人需要山。"

海拔越来越高，呼吸越来越困难。老陈却像没事人一样，时不时回头看看我们。

快到峰顶时，他突然停下，指着东方："看，日出。"

金色的阳光刺破云层，照亮了整个雪山。老陈站在那里，一动不动。过了很久，他才开口：

"第一次看到这个日出是二十二岁，最后一次是六十二岁。四十年，好像只是一瞬间。"

下山时，他把向导证交给我："帮我保管吧，用不上了。"

我接过那张磨损的证件，上面有他的名字和照片，年轻的脸庞对着镜头微笑。

"还会想山吗？"我问。

"会，"他说，"但山不会想我。山在那里，永远在那里。"`,

        // 故事5：咖啡馆里的失恋女孩 (2020)
        `她在沙溪古镇的咖啡馆坐了三天，每天点同一杯美式，看同一本书——《百年孤独》。

第三天下午，雨下得很大。咖啡馆里只有我们两个人。她终于开口：

"你说，人为什么要恋爱？"

我递给她一杯热巧克力："也许是为了学会告别。"

她笑了，眼泪却掉进杯子里。原来她刚从北京逃到这里，结束了七年的感情。

"我们在一起七年，"她说，"从大学到工作。他说要结婚，我说再等等。等我有空了，他已经和别人订婚了。"

"后悔吗？"

"不后悔，只是难过。难过的是，七年的记忆，说没就没了。"

雨渐渐小了，阳光透过窗户照进来。她合上书：

"这本书我看了三遍，每次看到最后都哭。现在明白了，孤独是人生的常态，爱情只是偶然。"

"接下来去哪？"我问。

"不知道，"她说，"但不会回北京了。这里真好，安静得能听见自己的心跳。"

她离开时，在留言本上写了一句话："告别过去，才能遇见未来。"

一周后，我听说她去了大理，在一家民宿做义工。又过了一个月，她寄来一张明信片，上面写着：

"我学会了做咖啡，也学会了和自己相处。谢谢你那杯热巧克力。"`,

        // 故事6：转山路上的朝圣者 (2021)
        `在冈仁波齐转山的路上，我遇到了他。一步一叩首，额头已经磕破，血迹混着泥土和沙石。

我跟了他半天，终于忍不住问："你在祈求什么？"

他停下，看着神山："不求什么，只是走。"

晚上在帐篷里，他告诉我他的故事。儿子去年也来转山，在海拔最高的卓玛拉山口突发高原反应，没能救回来。

"他二十二岁，"老人说，"大学刚毕业，说要求个平安。结果..."

他沉默了很久，拨弄着手中的念珠。

"我把他的一部分骨灰撒在了山口，"他说，"剩下的带回家。但总觉得，他还在路上，没走完。"

所以老人来了，走儿子没走完的路。

"每走一步，就离他近一步。"他说。

第二天继续上路。他的动作依然虔诚，但眼神里多了一些东西。不是悲伤，也不是祈求，而是一种平静的接受。

到卓玛拉山口时，他停下来，从怀里掏出一个小布袋，抓了一把粉末撒向空中。

"儿子，爸爸替你走完了。"他轻声说。

风把粉末吹散，混在经幡和雪花中。老人继续叩拜，背影在雪山映衬下显得格外渺小，也格外伟大。

后来听说，他每年都会来转山，直到走不动为止。他说这不是赎罪，也不是纪念，而是一种陪伴。

"他在天上走，我在地上走。总有一天，我们会相遇。"`,

        // 故事7：百年茶馆里的弹唱老人 (2022)
        `喀什老城的百年茶馆，老人在这里弹了六十年热瓦普。手指已经变形，关节粗大，但琴声依然清澈。

我点了一壶茶，坐在他旁边。他看了我一眼，继续弹奏。曲调悠扬，带着西域的风沙和阳光。

一曲终了，他放下琴："你不是本地人。"

"来听故事的。"我说。

他笑了，露出仅剩的几颗牙齿："这里的故事，比我的琴弦还多。"

他给我讲茶馆的历史：1910年开业，他的爷爷是第一批茶客。苏联专家来过，在这里讨论石油勘探；知青来过，在这里想念家乡；外国游客来过，在这里惊叹东方神秘。

"我十六岁开始在这里弹琴，"他说，"那时候茶馆还是土坯房，现在成了旅游景点。"

"年轻人还学热瓦普吗？"

他摇头："不学了。都去学吉他，学钢琴。热瓦普太老，太土。"

但他还在弹。每天下午三点到六点，雷打不动。他说这不是坚持，是习惯。

"习惯了，就放不下了。"他抚摸着琴身，像抚摸情人的脸庞。

夕阳透过花窗照进来，把他的影子拉得很长。琴声再次响起，这次是一首古老的维吾尔民歌。

我听不懂歌词，但能听懂情感。那是关于爱情，关于离别，关于时光流逝的无奈。

离开时，我回头看了一眼。老人还在弹奏，身影和茶馆的百年木柱融为一体。

也许再过几十年，茶馆还在，琴声却没了。但至少现在，还有人记得，还有人弹奏。

这就够了。`,

        // 故事8：壁画修复师的三十年 (2023)
        `莫高窟第45窟，她在里面工作了三十年。每天八小时，只为了拯救0.1平方米的壁画。

我作为志愿者帮忙整理文献，有机会看她工作。戴着放大镜，拿着细如发丝的画笔，一点一点填补剥落的色彩。

"你看这个飞天，"她指着墙壁，"我修了三个月。每一笔都要和一千年前的人对话。"

"怎么对话？"

"看笔触，看色彩，看线条。每个时代的画师都有不同的风格。唐代的飘逸，宋代的细腻，元代的粗犷。"

她说话时眼睛不离壁画，手指在空中比划，仿佛在触摸无形的线条。

我问她会不会厌倦。每天面对同样的墙壁，做同样精细的工作。

她摇头："怎么会？这是和时间赛跑。我们慢一点，历史就少一点。"

她给我看三十年前的照片，那时候壁画还清晰可见。现在，很多细节已经模糊。

"刚来时，我能看清飞天脸上的表情。现在，只能看清轮廓了。"

"为什么还在坚持？"

"因为总要有人记得，"她说，"记得这些美丽，记得这些故事。"

有一次，她在修复时发现了一行小字，是宋代画师的题记："画此飞天，愿众生平安。"

"那一刻我哭了，"她说，"一千年前的人，和我有同样的愿望。"

离开洞窟时，她还在工作。阳光从洞口斜射进来，照在她和壁画上。

我突然明白，她修复的不是壁画，是时间。用三十年，对抗一千年。

也许对抗不了，但至少，她试过了。`,

        // 故事9：中国最北的邮递员 (2024)
        `漠河，零下四十度。他骑着摩托车在雪地里送信，这条路走了二十年。

我在邮局遇到他时，他正在整理信件。手指冻得通红，动作却熟练迅速。

"为什么不用汽车？"我问。

"有些地方只有摩托车能到，"他说，"而且，村民听到摩托车声就知道信来了。"

他给我看今天的路线图：北红村、北极村、洛古河村，全程一百二十公里，大部分是冰雪路面。

"摔过吗？"

"摔过无数次，"他笑了，"最严重的一次，腿骨折了，躺了三个月。但信还得送，就让儿子替我送。"

他的儿子现在也在邮局工作，开汽车送信。但有些偏远的地方，还是得用摩托车。

"有些老人，就等着我的摩托车声，"他说，"那是他们和外界唯一的联系。"

他给我看一封二十年前的信。收信人已经去世，寄信人也已去世。信退不回去，也送不到。

"那为什么还留着？"

"因为信总要有个归宿，"他说，"就像人一样。"

他有一个专门的盒子，装这些"无主信件"。有时候会拿出来看看，想象写信人和收信人的故事。

"这封是情书，"他指着一封泛黄的信，"小伙子写给姑娘的，但姑娘嫁人了。信没寄出去，小伙子也走了。"

"难过吗？"

"不，感动，"他说，"至少有人爱过，有人被爱过。"

出发前，他仔细检查摩托车：轮胎、刹车、油箱。然后戴上厚厚的棉帽和手套，跨上车。

摩托车发动的声音在雪地里格外响亮。他挥挥手，消失在白茫茫的天地间。

我想，他送的不仅是信，是希望，是连接，是寒冷世界里的一点温暖。

这就够了。`,

        // 故事10：最后的苗绣传人 (2025)
        `贵州千户苗寨，她九十二岁，是最后的苗绣传人。眼睛几乎看不见，手却依然灵活。

我找到她时，她正在绣一幅百鸟图。手指在绣布上移动，精准得不像盲人。

"怎么做到的？"我问。

"心里有图，"她说，"绣了八十年，闭着眼睛也能绣。"

一幅绣品要绣三个月，卖的钱还不够买丝线。但她还在绣，每天八小时，雷打不动。

"女儿不学，孙女不学，"她说，"但我要绣到绣不动。"

她给我看她的嫁衣，绣了三年，穿了三次：结婚、女儿结婚、孙女结婚。红色的底布上，绣满了凤凰、花朵、祥云。

"好看吗？"她摸着嫁衣，虽然看不见。

"好看，"我说，"是我见过最美的衣服。"

她笑了，皱纹像绣品的纹路。

"等我走了，这手艺就真的没了，"她说，"但至少，我绣完了。"

她说的"绣完了"，是指完成了所有想绣的图案：十二生肖、二十四节气、三十六种花卉、四十八种鸟兽。

"还差最后一种，"她说，"龙。绣完龙，就圆满了。"

我陪了她一个星期，看她绣龙。从龙须到龙鳞，从龙爪到龙尾。每一针都精准，每一线都用心。

最后一天，龙绣完了。金色的龙在红色底布上腾飞，栩栩如生。

她摸着绣品，手指颤抖："好了，都绣完了。"

"接下来呢？"我问。

"等，"她说，"等时间来接我。"

离开时，她送我一幅小绣品，是一只蝴蝶。"蝴蝶会飞，"她说，"你也会。带着它，去更多地方。"

三个月后，我听说她去世了。安详地睡去，手里还拿着绣针。

她的孙女后来告诉我，奶奶把所有的绣品都捐给了博物馆。"她说，放在那里，就永远不会丢了。"

我去博物馆看了那些绣品。在玻璃柜里，它们依然鲜艳，依然美丽。旁边有她的照片和简介："龙阿婆，1923-2025，最后的苗绣传人。"

我想起她的话："手艺会消失，但美丽不会。只要有人记得，就永远存在。"

是的，我记得。我会一直记得。`,

        // 故事11：圣湖边的暴风雪之夜 (2019)
        `在纳木错湖边扎营的第三天，天气预报说有小雪，我没在意。下午四点，天空突然暗下来，狂风卷着雪花扑面而来。

帐篷在狂风中剧烈摇晃，我赶紧加固地钉，但风雪太大，帐篷几乎要被连根拔起。温度从零度骤降到零下二十度，我裹上所有衣服：两件羽绒服、三条裤子、两双袜子。

更糟糕的是，我的物资出了问题。气罐在低温下罢工，煮不了热水。食物只剩下一包压缩饼干和几块巧克力。手机没信号，充电宝也快没电了。

晚上八点，风雪达到顶峰。我蜷缩在睡袋里，听着帐篷外呼啸的风声。突然，一声巨响——帐篷的一根撑杆断了！冷风灌进来，雪花在帐篷里飞舞。

我不得不用背包顶住破损处，用胶带临时修补。手指冻得麻木，胶带都粘不住。那一刻，我真的害怕了。如果帐篷完全垮掉，在零下二十度的暴风雪中，我撑不过一夜。

凌晨两点，风雪突然停了。我钻出帐篷，眼前的景象让我忘记了所有恐惧。

暴风雪后的纳木错，湖面完全结冰，像一面巨大的镜子。天空清澈如洗，银河横跨天际，星星多得数不清。念青唐古拉山在月光下泛着银光，神圣而庄严。

我坐在冰面上，看着星空，突然明白了什么是渺小，什么是伟大。在自然面前，人类的一切烦恼都显得微不足道。

天亮后，我收拾残破的帐篷准备离开。一个藏族牧民骑马经过，看到我的狼狈样子，邀请我去他的帐篷。

在温暖的牛粪火旁，他给我倒上酥油茶。"这样的暴风雪，我们一年见好几次，"他说，"但只要太阳出来，一切都会好。"

他告诉我，纳木错在藏语中是"天湖"的意思，是念青唐古拉山的妻子。每次暴风雪，都是他们在吵架，但很快就会和好。

离开时，他送我一袋糌粑。"路上吃，"他说，"山神会保佑你。"

那袋糌粑我吃了三天，直到走出无人区。每次吃的时候，都想起那个暴风雪之夜，想起星空下的纳木错，想起藏族牧民的微笑。

有些经历，当时觉得是灾难，后来才发现是礼物。那个夜晚教会我的，比任何书本都多。`,

        // 故事12：搭车穿越天山 (2020)
        `在独库公路起点等了五个小时，从早晨等到中午。这条连接南北疆的公路，每年只开放五个月，我赶上了最后一个月。

终于，一辆破旧的皮卡停下来。司机是个哈萨克族大叔，脸被晒得黝黑，眼睛像鹰一样锐利。

"去哪？"他问。
"巴音布鲁克。"我说。
"上车。"

车里堆满了工具和干粮，还有一只小羊羔。"我女儿的宠物，"他解释，"带回家。"

车在天山峡谷中穿行，一边是万丈悬崖，一边是陡峭峭壁。大叔放着哈萨克民歌，歌声粗犷而深情。

"这条路我走了三十年，"他说，"以前是土路，现在是柏油路。以前骑马，现在开车。"

他告诉我，他是牧民，夏天把羊赶到巴音布鲁克的高山牧场，冬天赶回山下的冬窝子。这条路，他每年走两次，春天一次，秋天一次。

"最危险的一次，"他说，"是2012年，山体滑坡，路断了。我和羊困在山里七天，靠吃野果和雪水活下来。"

车到乔尔玛，他停下来休息。"这里埋着168个筑路兵，"他指着远处的烈士陵园，"为了修这条路，他们永远留在了天山。"

我们继续上路。海拔越来越高，景色越来越壮丽。雪山、草原、森林、溪流，像一幅流动的画卷。

下午四点，到达巴音布鲁克。九曲十八弯的开都河在草原上蜿蜒，像一条银色的丝带。

"到了，"大叔说，"去我家喝马奶酒。"

他的家在草原深处，一顶白色的毡房。妻子正在煮奶茶，两个孩子在草原上追着小羊跑。

毡房里温暖而舒适，墙上挂着刺绣，地上铺着地毯。大叔的妻子给我倒上马奶酒，酸涩而醇厚。

"喝，"大叔说，"喝了就是朋友。"

我们聊到天黑。他讲草原的故事，我讲城市的生活。两个世界，在毡房里相遇。

晚上，我睡在毡房里。听着外面的风声、羊叫声、孩子的笑声，突然觉得，这才是生活该有的样子。

第二天离开时，大叔送我一顶哈萨克帽子。"戴着，"他说，"路上平安。"

我戴着那顶帽子，继续我的旅程。每次看到它，就想起天山，想起独库公路，想起那个哈萨克大叔。

有些路，一个人走是孤独。但有了相遇，孤独就变成了故事。`,

        // 故事13：哈尼族老人的最后一季播种 (2021)
        `元阳梯田的清晨，云雾如海。我在田埂上遇到了他，八十五岁的哈尼族老人，正在准备最后一季的播种。

"我爷爷开垦了这块田，"他指着脚下的梯田，"清朝时候，逃难到这里，用锄头一点一点挖出来的。"

他教我插秧。手要稳，眼要准，每一株都要对齐。"不对齐，水就流不均匀，"他说，"上面的田干了，下面的田淹了。"

动作缓慢但精准，像在完成一件艺术品。事实上，梯田就是艺术品，哈尼族人用1300年时间创作的大地艺术。

"我五岁开始插秧，"他说，"今年八十五岁，插了八十年。今年是最后一次，腿脚不行了。"

他给我看他的腿，关节肿大，布满伤痕。"梯田里摔的，"他笑着说，"年轻时候不当回事，老了就来找你了。"

中午，我们在田埂上吃饭。简单的米饭、咸菜、米酒。他讲梯田的故事，讲哈尼族的迁徙史，讲二十四节气与农事的关系。

"清明下种，谷雨插秧，立夏薅草，秋分收割，"他如数家珍，"老祖宗传下来的，错不得。"

下午继续插秧。太阳西斜，梯田如镜，倒映着天空和云彩。老人坐在田埂上，看着自己的作品。

"这块田，我父亲种了六十年，我种了六十五年，"他说，"明年就不种了，儿子在城里打工，不回来了。"

他的声音很平静，但眼神里有失落。

"不可惜吗？"我问。

"可惜，"他说，"但没办法。年轻人要出去，要赚钱，要过好日子。梯田养不活他们了。"

夕阳西下，我们收工。老人慢慢走回家，背影在梯田中显得渺小而伟大。

第二天我离开时，他送我一包稻种。"拿着，"他说，"也许有一天，你会找个地方种下去。"

那包稻种我一直带着。虽然我知道，我可能永远不会种它。但我更知道，有些东西，需要有人记得，有人传递。

梯田会消失吗？也许。但记忆不会。只要有人记得，就永远存在。`,

        // 故事14：地质公园里的摄影师 (2022)
        `张掖丹霞的日出，色彩如梦幻。我在观景台上遇到了他，一个拍了二十年丹霞的摄影师。

"丹霞不是石头，"他说，"是时间的画布。红色是侏罗纪，绿色是白垩纪，黄色是第三纪。"

他给我看他的相机，一台老旧的尼康，快门按了三十万次。"只拍丹霞，"他说，"只拍日出和日落。"

我们等日出。凌晨五点，天空还是深蓝色。他架好三脚架，调整参数，动作熟练得像呼吸。

"2002年第一次来，"他说，"那时候还没开发，我一个人走进来，迷路了三天。"

他讲丹霞的发现史，讲地质变迁，讲色彩形成的原理。"每一层颜色，都是一个地质年代，"他说，"我们看到的，是几百万年的历史。"

太阳升起，第一缕阳光照在丹霞上。红色、橙色、黄色、绿色、蓝色、紫色，像上帝打翻的调色盘。

快门声响起，像心跳。他拍了二十年，还是会被震撼。

"美吗？"他问。

"美，"我说，"但也在消失。"

他点头："颜色在变淡，风化在加速。我拍了二十年，能看出来。"

他给我看他的照片，从2002年到2022年，记录了丹霞的细微变化。"这张，2005年拍的，红色还很鲜艳。这张，2015年，已经开始变淡。这张，今天拍的，你看，差了多少。"

"难过吗？"我问。

"不，记录，"他说，"我的工作不是阻止消失，是记录消失。让后来的人知道，曾经有过这样的美丽。"

他告诉我，他曾经是地质学家，退休后开始拍照。"用科学理解，用艺术记录，"他说，"这是我的方式。"

日出结束，游客散去。他还在那里，整理照片，做笔记。

"明天还来吗？"我问。

"来，"他说，"只要还能走，只要还能拍。"

离开时，他送我一组照片。"拿着，"他说，"但记住，真正的照片在眼睛里，在心里。"

我后来常常想起他。在快速变化的时代，有人选择慢下来，用二十年做一件事。不是对抗时间，而是记录时间。

也许我们都应该找到自己的"丹霞"，用一生去观察，去记录，去珍惜。

因为美丽会消失，但记忆不会。只要有人记得，就永远存在。`,

        // 故事15：高原反应与陌生人的葡萄糖 (2023)
        `稻城亚丁，海拔4700米的牛奶海。高原反应突然袭来时，我正在拍照。

先是头痛，像有锤子在敲打太阳穴。然后呼吸困难，每吸一口气都像在拉风箱。眼前开始发黑，几乎站不稳。

我蹲下来，试图缓解症状，但没用。周围是兴奋的游客，没人注意到我的异常。

"你没事吧？"一个声音响起。

我抬头，看到一个女孩，二十多岁，背着专业的登山包。她递给我一瓶葡萄糖。"喝这个，"她说，"我每次来都带。"

我接过，一口气喝完。甜味在口中化开，像救命稻草。

我们在湖边坐下。她告诉我，这是她第三次来亚丁。

"第一次是2019年，"她说，"失恋了，想找个地方忘记。结果高反严重，差点没下来。"

"第二次是2021年，"她继续说，"辞职了，不知道要做什么。来这里思考人生。"

"这次呢？"我问。

"庆祝，"她笑了，"癌症康复。第三次化疗结束，医生说可以旅行了。"

我愣住了。眼前的女孩，笑容灿烂，眼神清澈，完全不像经历过生死的人。

"山不会安慰你，"她说，"但山会让你忘记。忘记痛苦，忘记恐惧，忘记自己有多渺小。"

我们聊了很久。她讲治疗的过程，讲掉光的头发，讲病房里的夜晚。我讲旅行的故事，讲路上的人，讲远方的风景。

两个陌生人，在海拔4700米的地方，分享生命中最脆弱和最坚强的部分。

症状缓解后，我们一起下山。她走得很慢，但很稳。"医生说的，"她解释，"不能快，要像老人一样走路。"

到冲古寺时，天快黑了。我们要分开了，她去香格里拉镇，我去亚丁村。

"不留个联系方式吗？"我问。

"不留了，"她摇头，"有些相遇，一次就够了。记得那瓶葡萄糖，记得这个下午，就够了。"

她转身离开，背影在夕阳中拉得很长。我突然想起她的话："山不会安慰你，但山会让你忘记。"

是的，我忘记了高原反应的痛苦，忘记了旅途的疲惫。只记得那瓶葡萄糖的甜味，记得她的笑容，记得这个海拔4700米的下午。

后来，我也开始随身带葡萄糖。不是为自己，是为可能遇到的下一个人。

有些善意，像种子。你收到了，种下了，就会发芽，开花，结果。

那瓶葡萄糖，我永远记得。`,

        // 默认故事
        '故事内容加载中...'
    ];
    
    return stories[index] || stories[stories.length - 1];

        // 默认故事
        '故事内容加载中...'
    ];
    
    return stories[index] || stories[stories.length - 1];
}

/**
 * 显示故事详情
 */
function showStoryDetail(story) {
    // 创建详情模态框
    const modal = document.createElement('div');
    modal.className = 'story-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-header">
                <div class="modal-date">${story.date}</div>
                <h2 class="modal-title">${story.title}</h2>
                <div class="modal-meta">
                    <span class="modal-location">${story.location}</span>
                    <span class="modal-mood">${story.mood}</span>
                </div>
            </div>
            <div class="modal-body">
                ${story.content.split('\n\n').map(para => `<p>${para}</p>`).join('')}
            </div>
            <div class="modal-footer">
                <button class="btn-close">关闭</button>
            </div>
        </div>
    `;
    
    // 添加到页面
    document.body.appendChild(modal);
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .story-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
        }
        
        .modal-content {
            position: relative;
            background: var(--color-paper);
            max-width: 700px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            padding: 2rem;
            border-radius: 4px;
            animation: slideUp 0.3s ease;
        }
        
        @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--color-earth);
            cursor: pointer;
            width: 2rem;
            height: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.3s;
        }
        
        .modal-close:hover {
            background: var(--color-light-earth);
        }
        
        .modal-header {
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--color-light-earth);
        }
        
        .modal-date {
            font-family: var(--font-sans);
            font-size: 0.9rem;
            color: var(--color-earth);
            letter-spacing: 0.1em;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
        }
        
        .modal-title {
            font-size: 2rem;
            font-weight: normal;
            color: var(--color-dark-earth);
            margin-bottom: 1rem;
            line-height: 1.3;
        }
        
        .modal-meta {
            display: flex;
            gap: 1.5rem;
            font-family: var(--font-sans);
            font-size: 0.9rem;
            color: var(--color-earth);
        }
        
        .modal-body {
            font-size: 1.1rem;
            line-height: 1.8;
            color: var(--color-ink);
            margin-bottom: 2rem;
        }
        
        .modal-body p {
            margin-bottom: 1.5rem;
        }
        
        .modal-footer {
            text-align: right;
            padding-top: 1rem;
            border-top: 1px solid var(--color-light-earth);
        }
        
        .btn-close {
            font-family: var(--font-sans);
            background: var(--color-accent);
            color: white;
            border: none;
            padding: 0.5rem 1.5rem;
            border-radius: 2px;
            cursor: pointer;
            font-size: 0.9rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            transition: background 0.3s;
        }
        
        .btn-close:hover {
            background: var(--color-dark-earth);
        }
    `;
    document.head.appendChild(style);
    
    // 关闭功能
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    const btnClose = modal.querySelector('.btn-close');
    
    function closeModal() {
        modal.style.animation = 'fadeOut 0.3s ease';
        modal.querySelector('.modal-content').style.animation = 'slideDown 0.3s ease';
        
        setTimeout(() => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    btnClose.addEventListener('click', closeModal);
    
    // 添加关闭动画
    const closeStyle = document.createElement('style');
    closeStyle.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes slideDown {
            from { transform: translateY(0); opacity: 1; }
            to { transform: translateY(20px); opacity: 0; }
        }
    `;
    document.head.appendChild(closeStyle);
    
    // ESC键关闭
    document.addEventListener('keydown', function escClose(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escClose);
        }
    });
}

/**
 * 初始化地图预览
 */
function initMapPreview() {
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (!mapPlaceholder) return;
    
    mapPlaceholder.addEventListener('click', function() {
        showMapPage();
    });
}

/**
 * 显示地图页面
 */
function showMapPage() {
    alert('旅行地图页面开发中...\n\n这里将展示树言的旅行足迹，包括：\n• 交互式中国地图\n• 标记去过的地方\n• 点击地点查看相关故事\n• 旅行路线可视化');
}

/**
 * 初始化页面过渡效果
 */
function initPageTransitions() {
    // 页面加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
}

/**
 * 初始化阅读进度指示器
 */
function initReadingProgress() {
    // 创建进度条
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--color-accent);
        width: 0;
        z-index: 9999;
        transition: width 0.1s;
    `;
    document.body.appendChild(progressBar);
    
    // 更新进度
    window.addEventListener('scroll', function() {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / (docHeight - winHeight)) * 100;
        
        progressBar.style.width = `${progress}%`;
    });
}

/**
 * 显示页面过渡效果
 */
function showPageTransition(pageName) {
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    transition.innerHTML = `
        <div class="transition-content">
            <div class="transition-spinner"></div>
            <div class="transition-text">正在加载 ${pageName}...</div>
        </div>
    `;
    
    transition.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--color-paper);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;
    
    document.body.appendChild(transition);
    
    // 3秒后自动消失
    setTimeout(() => {
        transition.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(transition);
        }, 300);
    }, 1500);
}

/**
 * 工具函数：格式化日期
 */
function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}年${month}月${day}日`;
}

/**
 * 工具函数：防抖
 */
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

/**
 * 工具函数：节流
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}