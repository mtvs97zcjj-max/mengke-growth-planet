(() => {
  "use strict";

  const STORAGE_KEY = "mengke-growth-planet-v1";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const TASK_DEFS = [
    {
      id: "english_reading",
      title: "英语磨耳朵",
      description: "听读今天的 3 句生活英语",
      emoji: "🎧",
      minutes: 10,
      subject: "english",
      skill: "english"
    },
    {
      id: "pinyin_dictation",
      title: "拼音听写",
      description: "听音辨调，跟着萌可慢慢读",
      emoji: "🅿️",
      minutes: 5,
      subject: "pinyin",
      skill: "pinyin"
    },
    {
      id: "math_game",
      title: "数学小游戏",
      description: "10 以内数感，想清楚再回答",
      emoji: "🔢",
      minutes: 10,
      subject: "math",
      skill: "math"
    },
    {
      id: "hanzi_recognition",
      title: "认 3～5 个汉字",
      description: "看、听、读，再在田字格里写",
      emoji: "🈶",
      minutes: 5,
      subject: "hanzi",
      skill: "hanzi"
    },
    {
      id: "pack_schoolbag",
      title: "自己收拾书包",
      description: "书本、水杯、纸巾一样样放好",
      emoji: "🎒",
      minutes: 5,
      subject: null,
      skill: null
    }
  ];

  const INITIALS = [
    { pinyin: "b", example: "播", say: "声母 b，播，播，播" },
    { pinyin: "p", example: "坡", say: "声母 p，坡，坡，坡" },
    { pinyin: "m", example: "摸", say: "声母 m，摸，摸，摸" },
    { pinyin: "f", example: "佛", say: "声母 f，佛，佛，佛" },
    { pinyin: "d", example: "得", say: "声母 d，得，得，得" },
    { pinyin: "t", example: "特", say: "声母 t，特，特，特" },
    { pinyin: "n", example: "讷", say: "声母 n，讷，讷，讷" },
    { pinyin: "l", example: "勒", say: "声母 l，勒，勒，勒" },
    { pinyin: "g", example: "哥", say: "声母 g，哥，哥，哥" },
    { pinyin: "k", example: "科", say: "声母 k，科，科，科" },
    { pinyin: "h", example: "喝", say: "声母 h，喝，喝，喝" },
    { pinyin: "j", example: "鸡", say: "声母 j，鸡，鸡，鸡" },
    { pinyin: "q", example: "七", say: "声母 q，七，七，七" },
    { pinyin: "x", example: "西", say: "声母 x，西，西，西" },
    { pinyin: "zh", example: "知", say: "声母 zh，知，知，知" },
    { pinyin: "ch", example: "吃", say: "声母 ch，吃，吃，吃" },
    { pinyin: "sh", example: "诗", say: "声母 sh，诗，诗，诗" },
    { pinyin: "r", example: "日", say: "声母 r，日，日，日" },
    { pinyin: "z", example: "资", say: "声母 z，资，资，资" },
    { pinyin: "c", example: "刺", say: "声母 c，刺，刺，刺" },
    { pinyin: "s", example: "思", say: "声母 s，思，思，思" },
    { pinyin: "y", example: "衣", say: "声母 y，衣，衣，衣" },
    { pinyin: "w", example: "乌", say: "声母 w，乌，乌，乌" }
  ];

  const FINALS = [
    { pinyin: "a", example: "阿", say: "韵母 a，阿，张大嘴巴，阿" },
    { pinyin: "o", example: "喔", say: "韵母 o，喔，圆圆嘴巴，喔" },
    { pinyin: "e", example: "鹅", say: "韵母 e，鹅，扁扁嘴巴，鹅" },
    { pinyin: "i", example: "衣", say: "韵母 i，衣，牙齿对齐，衣" },
    { pinyin: "u", example: "乌", say: "韵母 u，乌，嘴巴圆圆，乌" },
    { pinyin: "ü", example: "迂", say: "韵母 ü，迂，嘴巴扁圆，迂" },
    { pinyin: "ai", example: "爱", say: "韵母 ai，爱，爱" },
    { pinyin: "ei", example: "欸", say: "韵母 ei，欸，欸" },
    { pinyin: "ui", example: "威", say: "韵母 ui，威，威" },
    { pinyin: "ao", example: "奥", say: "韵母 ao，奥，奥" },
    { pinyin: "ou", example: "欧", say: "韵母 ou，欧，欧" },
    { pinyin: "iu", example: "优", say: "韵母 iu，优，优" },
    { pinyin: "ie", example: "椰", say: "韵母 ie，椰，椰" },
    { pinyin: "üe", example: "月", say: "韵母 üe，月，月" },
    { pinyin: "er", example: "耳", say: "韵母 er，耳，耳" },
    { pinyin: "an", example: "安", say: "韵母 an，安，安" },
    { pinyin: "en", example: "恩", say: "韵母 en，恩，恩" },
    { pinyin: "in", example: "音", say: "韵母 in，音，音" },
    { pinyin: "un", example: "温", say: "韵母 un，温，温" },
    { pinyin: "ün", example: "云", say: "韵母 ün，云，云" },
    { pinyin: "ang", example: "昂", say: "韵母 ang，昂，昂" },
    { pinyin: "eng", example: "风", say: "韵母 eng，风，风" },
    { pinyin: "ing", example: "鹰", say: "韵母 ing，鹰，鹰" },
    { pinyin: "ong", example: "翁", say: "韵母 ong，翁，翁" }
  ];

  const TONE_DEMOS = [
    { tone: 1, pinyin: "bā", character: "八", say: "一声，平平的。bā，八，八个的八。" },
    { tone: 2, pinyin: "bá", character: "拔", say: "二声，向上爬。bá，拔，拔萝卜的拔。" },
    { tone: 3, pinyin: "bǎ", character: "把", say: "三声，先下再上。bǎ，把，一把小勺子的把。" },
    { tone: 4, pinyin: "bà", character: "爸", say: "四声，一下滑下去。bà，爸，爸爸的爸。" }
  ];

  const TONE_QUESTIONS = [
    { tone: 1, pinyin: "mā", say: "一声，妈妈，妈。" },
    { tone: 1, pinyin: "huā", say: "一声，花朵，花。" },
    { tone: 1, pinyin: "tiān", say: "一声，天空，天。" },
    { tone: 2, pinyin: "má", say: "二声，芝麻，麻。" },
    { tone: 2, pinyin: "yún", say: "二声，白云，云。" },
    { tone: 2, pinyin: "hé", say: "二声，小河，河。" },
    { tone: 3, pinyin: "mǎ", say: "三声，小马，马。" },
    { tone: 3, pinyin: "shuǐ", say: "三声，喝水，水。" },
    { tone: 3, pinyin: "gǒu", say: "三声，小狗，狗。" },
    { tone: 4, pinyin: "mà", say: "四声，慢慢走，慢。" },
    { tone: 4, pinyin: "shù", say: "四声，大树，树。" },
    { tone: 4, pinyin: "yuè", say: "四声，月亮，月。" }
  ];

  const HANZI = [
    { char: "日", pinyin: "rì", meaning: "太阳圆圆的样子", words: "红日 · 日出 · 日子", sentence: "红红的太阳升起来了。" },
    { char: "月", pinyin: "yuè", meaning: "弯弯的月亮", words: "月亮 · 月光 · 月牙", sentence: "弯弯的月亮挂在天上。" },
    { char: "山", pinyin: "shān", meaning: "高高低低的山峰", words: "大山 · 山顶 · 山水", sentence: "远处有一座青青的大山。" },
    { char: "水", pinyin: "shuǐ", meaning: "清清的水流", words: "河水 · 喝水 · 水果", sentence: "小河里的水清清亮亮。" },
    { char: "火", pinyin: "huǒ", meaning: "跳动的火苗", words: "火苗 · 灯火 · 火山", sentence: "小小的火苗暖暖的。" },
    { char: "木", pinyin: "mù", meaning: "一棵树的模样", words: "木头 · 树木 · 木马", sentence: "门外有一棵高高的树。" },
    { char: "田", pinyin: "tián", meaning: "一块块整齐的田地", words: "田地 · 田野 · 水田", sentence: "田里的禾苗绿绿的。" },
    { char: "人", pinyin: "rén", meaning: "一个站立着的人", words: "大人 · 人们 · 人口", sentence: "公园里有很多人。" },
    { char: "口", pinyin: "kǒu", meaning: "可以说话和吃饭的嘴巴", words: "开口 · 门口 · 人口", sentence: "请张开小口，慢慢说话。" },
    { char: "手", pinyin: "shǒu", meaning: "有五个手指的小手", words: "小手 · 手心 · 双手", sentence: "我用小手把书放整齐。" },
    { char: "上", pinyin: "shàng", meaning: "位置高高的地方", words: "上面 · 上学 · 上楼", sentence: "书包放在小桌子上。" },
    { char: "下", pinyin: "xià", meaning: "位置低低的地方", words: "下面 · 下雨 · 下楼", sentence: "小猫躲在桌子下面。" },
    { char: "天", pinyin: "tiān", meaning: "高高的天空", words: "天空 · 白天 · 天气", sentence: "今天的天气真好。" },
    { char: "地", pinyin: "dì", meaning: "我们脚下的大地", words: "大地 · 土地 · 地方", sentence: "小草从土地里钻出来。" },
    { char: "我", pinyin: "wǒ", meaning: "正在说自己", words: "我们 · 我的 · 自我", sentence: "我是一个勇敢的小朋友。" },
    { char: "你", pinyin: "nǐ", meaning: "正在和你说话", words: "你好 · 你们 · 你的", sentence: "你好，很高兴认识你。" },
    { char: "他", pinyin: "tā", meaning: "说到另一位小朋友", words: "他们 · 他的 · 其他", sentence: "他正在认真地看书。" },
    { char: "大", pinyin: "dà", meaning: "很大很大的样子", words: "大人 · 大象 · 长大", sentence: "大象有一个大大的耳朵。" },
    { char: "小", pinyin: "xiǎo", meaning: "很小很小的样子", words: "小心 · 小手 · 小鸟", sentence: "小鸟轻轻落在树枝上。" },
    { char: "多", pinyin: "duō", meaning: "数量很多", words: "多少 · 许多 · 好多", sentence: "花园里开了许多小花。" }
  ];

  const ENGLISH_PHRASES = [
    { text: "Hello! How are you?", translation: "你好！你好吗？", say: "Hello! How are you?" },
    { text: "Good morning, teacher!", translation: "老师，早上好！", say: "Good morning, teacher!" },
    { text: "I am happy today.", translation: "我今天很开心。", say: "I am happy today." },
    { text: "May I have some water?", translation: "我可以喝点水吗？", say: "May I have some water?" },
    { text: "Let's go to school.", translation: "我们一起去学校吧。", say: "Let's go to school." },
    { text: "Thank you very much.", translation: "非常感谢你。", say: "Thank you very much." },
    { text: "Can we be friends?", translation: "我们可以做朋友吗？", say: "Can we be friends?" }
  ];

  const ENGLISH_WORDS = [
    { word: "hello", translation: "你好", emoji: "👋" },
    { word: "apple", translation: "苹果", emoji: "🍎" },
    { word: "cat", translation: "小猫", emoji: "🐱" },
    { word: "dog", translation: "小狗", emoji: "🐶" },
    { word: "book", translation: "书本", emoji: "📖" },
    { word: "pencil", translation: "铅笔", emoji: "✏️" },
    { word: "water", translation: "水", emoji: "💧" },
    { word: "school", translation: "学校", emoji: "🏫" },
    { word: "red", translation: "红色", emoji: "🔴" },
    { word: "blue", translation: "蓝色", emoji: "🔵" },
    { word: "sun", translation: "太阳", emoji: "☀️" },
    { word: "ball", translation: "球", emoji: "⚽" }
  ];

  const CHAT_REPLIES = {
    worried: [
      "心里有一点紧张，是身体在提醒你：这件事很重要。萌可陪你把手放在小肚子上，慢慢吸气，再慢慢呼气。你觉得快要上学了，最担心哪一件事？",
      "紧张的时候，不用马上变得勇敢。我们可以先把担心说出来，再想一个很小的办法。你是在担心新老师、新同学，还是担心找不到教室？",
      "萌可听见啦。你愿意的话，我们先做三次“闻花香、吹蜡烛”的呼吸，然后一起说：我可以慢慢试一试。"
    ],
    sad: [
      "难过的时候不需要马上笑，萌可会安静陪着你。你愿意告诉我是谁或什么事让你心里酸酸的么？",
      "想哭也可以，眼泪是在帮心里的小乌云下雨。等雨小一点，我们去找一个信任的大人抱一抱，好不好？",
      "如果心里闷闷的，可以告诉爸爸妈妈、老师，或者牵着你的人。萌可会一直在这里听，但真实的大人拥抱更有力量。"
    ],
    happy: [
      "哇，你的开心像小彩灯一样亮起来啦！萌可也忍不住摇尾巴。是什么让你这么开心呀？",
      "听到你开心，我的心也像跳进了棉花糖里。快把这件事讲给我听，我要和你一起记住它！",
      "太棒啦！开心的时候可以拍一拍手，再告诉一个喜欢的人。你愿意给这份开心取个名字吗？"
    ],
    tired: [
      "累了不是偷懒，是身体在说“我想歇一会儿”。我们喝几口水，看看远处的绿色，再决定要不要继续。",
      "今天已经走了不少小步啦。先伸一个大大的懒腰，眨眨眼睛，休息十分钟也不会错过什么。",
      "萌可陪你休息，不催你。闭上眼睛听三下呼吸：吸气，呼气；再来一次。"
    ],
    homework: [
      "不想写作业的时候，先把任务缩小：只做两分钟，写完一行就停一停。你想从最简单的哪一项开始？",
      "我们可以先挑一个最轻的石头搬。比如先读一遍题，或者只找出铅笔。做完这一步，再决定下一步。",
      "不是每一分钟都必须喜欢学习。萌可陪你先做第一小步，做完就一起伸个懒腰。"
    ],
    friends: [
      "交朋友可以先从一句轻轻的话开始：我可以和你一起玩吗？你喜欢玩什么？你愿意和萌可练一遍吗？",
      "如果别人暂时没有回答，不代表你不好，可能只是他正忙着。我们可以先找喜欢同一个游戏的小朋友。",
      "会关心别人是很大的本领。记住也要保护自己的身体和感受；有人让你不舒服，就告诉老师或家长。"
    ],
    angry: [
      "生气的时候，心里像有一只小火龙。我们先把小手握紧，再慢慢松开，对它说：我知道了，我听见你了。",
      "先不伤害自己，也不伤害别人。可以去捏一捏软球、跺三下脚，等小火龙安静一点，再告诉大人发生了什么。",
      "萌可愿意听你生气。你愿意告诉我是哪件事，让你觉得不公平吗？"
    ],
    sleep: [
      "睡觉前，我们让今天的小事一件件排队回家。萌可轻轻说：今天已经完成得够好了，明天再继续。",
      "把房间灯光调暗，做三次慢慢的呼吸。你也可以想一个最喜欢、最安全的地方，萌可陪你在那里休息。"
    ],
    safety: [
      "这件事很重要，也让你不舒服了吗？请马上告诉爸爸妈妈、老师或其他你信任的大人，请他们来保护你。萌可会陪着你，但危险和受伤不能只放在心里。",
      "谢谢你愿意告诉萌可。若有人打你、碰你让你不舒服、威胁你或让你保守不舒服的秘密，请立刻离开那里，并告诉能帮助你的大人。你要被保护。"
    ],
    generic: [
      "萌可听见啦。你说“{message}”，心里一定有自己的小小感受。你希望我陪你安静一会儿，还是一起想个办法？",
      "嗯，我在认真听。可以再多说一点点吗？这件事让你开心、紧张、难过，还是有一点生气？",
      "谢谢你把这些告诉萌可。每个人都会有不明白的时候，我们不用一下子解决，可以先照顾好自己的感受。"
    ]
  };

  const DEFAULT_STATE = () => ({
    version: 1,
    profile: { name: "小朋友" },
    stars: 12,
    pet: {
      fullness: 68,
      cleanliness: 72,
      happiness: 84,
      outfit: "mint",
      accessory: "crown"
    },
    daily: {},
    customTasks: {},
    skills: { pinyin: 0, hanzi: 0, english: 0, math: 0 },
    chat: [],
    conversation: {
      topic: "",
      emotion: "",
      lastQuestion: "",
      lastUserMessage: "",
      turn: 0
    },
    settings: {
      voice: true,
      smartChat: true,
      mathDifficulty: "easy",
      englishPhraseIndex: 0
    },
    badges: {
      pinyinListened: false
    }
  });

  let state = loadState();
  let currentPinyinTone = null;
  let pinyinQuizLocked = false;
  let currentHanziIndex = 0;
  let hanziQuizLocked = false;
  let currentEnglishIndex = 0;
  let currentEnglishQuiz = null;
  let englishQuizLocked = false;
  let currentMathQuestion = null;
  let mathQuestionNo = 1;
  let mathLocked = false;
  let toastTimer = 0;
  let chatTypingTimer = 0;
  let recognition = null;
  let restTimer = 0;
  let restRemaining = 0;
  let chatBusy = false;
  let chatServiceStatus = "unknown";
  let chatServiceModel = "";
  let deferredInstallPrompt = null;
  let writingContext = null;
  let isDrawing = false;
  let lastPoint = null;
  const sessionStartedAt = Date.now();

  function loadState() {
    const fallback = DEFAULT_STATE();
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (!saved || typeof saved !== "object") return fallback;
      return {
        ...fallback,
        ...saved,
        profile: { ...fallback.profile, ...(saved.profile || {}) },
        pet: { ...fallback.pet, ...(saved.pet || {}) },
        skills: { ...fallback.skills, ...(saved.skills || {}) },
        conversation: { ...fallback.conversation, ...(saved.conversation || {}) },
        settings: { ...fallback.settings, ...(saved.settings || {}) },
        badges: { ...fallback.badges, ...(saved.badges || {}) },
        daily: saved.daily || {},
        customTasks: saved.customTasks || {},
        chat: Array.isArray(saved.chat) ? saved.chat.slice(-30) : []
      };
    } catch {
      return fallback;
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      showToast("这次记录暂时没有保存成功，请检查浏览器存储权限。");
    }
  }

  function dateKey(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function shiftDate(key, amount) {
    const [year, month, day] = key.split("-").map(Number);
    return dateKey(new Date(year, month - 1, day + amount, 12));
  }

  function lastSevenKeys() {
    const today = dateKey();
    return Array.from({ length: 7 }, (_, index) => shiftDate(today, index - 6));
  }

  function dayData(key = dateKey(), create = true) {
    if (!state.daily[key] && create) {
      state.daily[key] = {
        tasks: {},
        minutes: 0,
        correct: 0,
        quiz: { pinyin: 0, hanzi: 0, english: 0, math: 0 },
        activity: 0
      };
    }
    const record = state.daily[key];
    if (record) {
      record.tasks = record.tasks || {};
      record.quiz = record.quiz || { pinyin: 0, hanzi: 0, english: 0, math: 0 };
      record.minutes = Number(record.minutes) || 0;
      record.correct = Number(record.correct) || 0;
      record.activity = Number(record.activity) || 0;
    }
    return record;
  }

  function allTasks() {
    const custom = state.customTasks[dateKey()] || [];
    return [
      ...TASK_DEFS,
      ...custom.map((task) => ({
        ...task,
        custom: true,
        subject: null,
        skill: null,
        minutes: Number(task.minutes) || 5
      }))
    ];
  }

  function escapeHTML(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function shuffle(items) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swap = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[swap]] = [copy[swap], copy[index]];
    }
    return copy;
  }

  function randomOf(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function initMascots() {
    const template = $("#mascotTemplate");
    if (!template) return;
    $$(".mascot-slot").forEach((slot) => {
      if (!slot.querySelector(".mascot-wrap")) {
        slot.appendChild(template.content.cloneNode(true));
      }
    });
  }

  function initDateAndGreeting() {
    const now = new Date();
    const weekday = new Intl.DateTimeFormat("zh-CN", { weekday: "long" }).format(now);
    const dateText = new Intl.DateTimeFormat("zh-CN", {
      month: "long",
      day: "numeric",
      year: "numeric"
    }).format(now);
    const hour = now.getHours();
    const name = state.profile.name || "小朋友";
    let greeting = "今天也要开心呀";

    if (hour < 11) greeting = `早上好，${name}`;
    else if (hour < 14) greeting = `中午好，${name}`;
    else if (hour < 18) greeting = `下午好，${name}`;
    else greeting = `晚上好，${name}`;

    $("#dateKicker").textContent = `${dateText} · ${weekday}`;
    $("#todayHeading").textContent = greeting;
    $("#todaySubheading").textContent = pickSubheading(hour);
    $("#childNameGreeting").textContent = name;
    document.title = `${name}的萌可成长星球`;
  }

  function pickSubheading(hour) {
    if (hour < 11) return "把小小的进步，变成闪闪的星星。";
    if (hour < 14) return "吃饱、歇好，再慢慢完成今天的小计划。";
    if (hour < 18) return "一次只做一件事，做完就给自己一个笑脸。";
    return "今天做得够好啦，收好小书包，准备休息。";
  }

  function renderTasks() {
    const list = $("#taskList");
    if (!list) return;
    const record = dayData();
    const tasks = allTasks();
    list.innerHTML = tasks.map((task) => {
      const done = Boolean(record.tasks[task.id]);
      const actionLabel = done ? "已完成" : task.subject ? "去学习" : "做完啦";
      return `
        <article class="task-item ${done ? "is-done" : ""}" data-task-id="${escapeHTML(task.id)}">
          <button class="task-check" type="button" data-toggle-task="${escapeHTML(task.id)}"
            aria-label="${done ? "取消完成" : "标记完成"}：${escapeHTML(task.title)}">
            <svg class="icon"><use href="#icon-check"/></svg>
          </button>
          <div class="task-copy">
            <span class="task-emoji">${escapeHTML(task.emoji || "✨")}</span>
            <span class="task-text">
              <strong>${escapeHTML(task.title)}</strong>
              <small>${escapeHTML(task.description || "今天的小任务")}</small>
            </span>
          </div>
          <button class="task-start" type="button" data-start-task="${escapeHTML(task.id)}">${actionLabel}</button>
        </article>
      `;
    }).join("");

    const completedCount = tasks.filter((task) => record.tasks[task.id]).length;
    const percent = tasks.length ? (completedCount / tasks.length) * 100 : 0;
    $("#planDone").textContent = String(completedCount);
    $("#planProgress").style.setProperty("--progress", percent.toFixed(1));
    const progressSpan = $("#planProgress span");
    if (progressSpan) progressSpan.innerHTML = `<strong id="planDone">${completedCount}</strong>/${tasks.length}`;

    if (completedCount === tasks.length) {
      $("#planIntro").textContent = "今天的成长清单全部完成啦！萌可给你一个大大的拥抱。";
    } else if (completedCount > 0) {
      $("#planIntro").textContent = `已经完成 ${completedCount} 项啦，剩下的慢慢来，每项还能获得 10 颗星星。`;
    } else {
      $("#planIntro").textContent = "从最小的一件事开始，完成一项就会获得 10 颗星星。";
    }
  }

  function toggleTask(taskId, options = {}) {
    const task = allTasks().find((item) => item.id === taskId);
    if (!task) return;
    const record = dayData();
    const wasDone = Boolean(record.tasks[taskId]);

    if (wasDone) {
      record.tasks[taskId] = false;
      state.stars = Math.max(0, state.stars - 10);
      record.minutes = Math.max(0, record.minutes - (task.minutes || 0));
      record.activity = Math.max(0, record.activity - 1);
      if (task.skill) state.skills[task.skill] = Math.max(0, state.skills[task.skill] - 8);
      state.pet.happiness = Math.max(20, state.pet.happiness - 2);
      if (!options.quiet) showToast("已取消完成，星星也收回来啦。");
    } else {
      record.tasks[taskId] = true;
      state.stars += 10;
      record.minutes += task.minutes || 0;
      record.activity += 1;
      state.pet.happiness = Math.min(100, state.pet.happiness + 4);
      if (task.skill) state.skills[task.skill] = Math.min(100, state.skills[task.skill] + 8);
      if (!options.quiet) {
        showToast(`${task.title}完成啦！获得 10 颗星星 ⭐`, "happy");
        burstConfetti(18);
        softChime("success");
        setMascotSpeech(pick(["又完成一小步，真为你开心！", "我收到你的努力啦，给你一个大大的拥抱！", "这项完成啦，慢慢来就是最快的进步。"]), "happy");
      }
    }

    saveState();
    updateAll();
  }

  function updateCompleteButtons() {
    const record = dayData(dateKey(), false);
    $$("[data-complete-task]").forEach((button) => {
      const taskId = button.dataset.completeTask;
      const done = Boolean(record?.tasks?.[taskId]);
      button.classList.toggle("is-done", done);
      if (!button.dataset.originalHtml) button.dataset.originalHtml = button.innerHTML;
      if (done) {
        button.innerHTML = `<svg class="icon"><use href="#icon-check"/></svg>今天已经完成啦`;
      } else {
        button.innerHTML = button.dataset.originalHtml;
      }
    });
  }

  function updateStars() {
    $("#starCount").textContent = String(state.stars);
    $("#petStarCount").textContent = String(state.stars);
  }

  function updatePetUI(options = {}) {
    const pet = state.pet;
    const pairs = [
      ["fullness", pet.fullness],
      ["cleanliness", pet.cleanliness],
      ["happiness", pet.happiness]
    ];
    pairs.forEach(([name, value]) => {
      const capped = Math.max(0, Math.min(100, Math.round(value)));
      const homeMeter = $(`#${name}Meter`);
      const homeValue = $(`#${name}Value`);
      const roomMeter = $(`#pet${name.charAt(0).toUpperCase()}${name.slice(1)}Meter`);
      const roomValue = $(`#pet${name.charAt(0).toUpperCase()}${name.slice(1)}Value`);
      if (homeMeter) homeMeter.style.width = `${capped}%`;
      if (homeValue) homeValue.textContent = `${capped}%`;
      if (roomMeter) roomMeter.style.width = `${capped}%`;
      if (roomValue) roomValue.textContent = `${capped}%`;
    });

    $$(".mascot-wrap").forEach((mascot) => {
      mascot.dataset.outfit = pet.outfit || "mint";
      mascot.dataset.accessory = pet.accessory || "crown";
      if (options.expression) mascot.dataset.expression = options.expression;
    });

    $$(".outfit-card").forEach((button) => {
      button.classList.toggle("is-selected", button.dataset.outfit === pet.outfit);
    });
    $$(".accessory-button").forEach((button) => {
      button.classList.toggle("is-selected", button.dataset.accessory === pet.accessory);
    });

    updateBadges();
  }

  function setMascotSpeech(text, expression = "happy") {
    const home = $("#homePetSpeech");
    const room = $("#petRoomSpeech");
    if (home) home.textContent = text;
    if (room) room.textContent = text;
    $$(".mascot-wrap").forEach((mascot) => {
      mascot.dataset.expression = expression;
    });
  }

  function pick(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function careForPet(action) {
    if (action === "outfit") {
      navigate("pet");
      showToast("来给萌可挑一套喜欢的衣服吧。");
      return;
    }

    const costs = { feed: 4, bath: 4, play: 2 };
    const cost = costs[action];
    if (!cost) return;
    if (state.stars < cost) {
      showToast(`还差 ${cost - state.stars} 颗星星，先完成一个小任务吧。`);
      setMascotSpeech("星星不够也没关系，完成任务就可以来照顾我啦。", "neutral");
      return;
    }

    state.stars -= cost;
    if (action === "feed") {
      state.pet.fullness = Math.min(100, state.pet.fullness + 26);
      state.pet.happiness = Math.min(100, state.pet.happiness + 4);
      setMascotSpeech("果果甜甜的！我的小肚子和心里都暖暖的。", "happy");
      showToast("萌可吃到了香香的星星果果。");
    } else if (action === "bath") {
      state.pet.cleanliness = Math.min(100, state.pet.cleanliness + 28);
      state.pet.happiness = Math.min(100, state.pet.happiness + 3);
      setMascotSpeech("泡泡软乎乎的，我现在香喷喷啦！", "happy");
      showToast("萌可洗得香香软软啦。");
    } else if (action === "play") {
      state.pet.happiness = Math.min(100, state.pet.happiness + 18);
      state.pet.fullness = Math.max(10, state.pet.fullness - 4);
      state.pet.cleanliness = Math.max(10, state.pet.cleanliness - 4);
      setMascotSpeech("接住小皮球！和你一起玩，是今天最开心的事。", "happy");
      showToast("萌可和你玩了一会儿，心情亮晶晶。");
    }

    saveState();
    animateCare(action);
    softChime("care");
    updateAll();
  }

  function animateCare(action) {
    const container = $("#actionBubbles");
    if (!container) return;
    if (action === "feed") {
      ["🍓", "🍎", "✨", "💛", "🍊"].forEach((symbol, index) => {
        const heart = document.createElement("span");
        heart.className = "floating-heart";
        heart.textContent = symbol;
        heart.style.setProperty("--heart-x", `${(index - 2) * 23}px`);
        heart.style.animationDelay = `${index * 0.08}s`;
        container.appendChild(heart);
        window.setTimeout(() => heart.remove(), 1900);
      });
    } else if (action === "bath") {
      for (let index = 0; index < 15; index += 1) {
        const bubble = document.createElement("span");
        bubble.className = "floating-bubble";
        const size = 8 + Math.random() * 25;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.setProperty("--bubble-x", `${(Math.random() - 0.5) * 230}px`);
        bubble.style.animationDelay = `${Math.random() * 0.4}s`;
        bubble.style.left = `${43 + Math.random() * 14}%`;
        container.appendChild(bubble);
        window.setTimeout(() => bubble.remove(), 1900);
      }
    } else if (action === "play") {
      ["🎈", "⭐", "🎵", "💛"].forEach((symbol, index) => {
        const item = document.createElement("span");
        item.className = "floating-heart";
        item.textContent = symbol;
        item.style.setProperty("--heart-x", `${(index - 1.5) * 27}px`);
        item.style.animationDelay = `${index * 0.1}s`;
        container.appendChild(item);
        window.setTimeout(() => item.remove(), 1900);
      });
    }
  }

  function updateBadges() {
    const badges = $$("#view-pet .mini-badge");
    if (!badges.length) return;
    const taskCount = Object.values(state.daily).reduce((total, record) => {
      return total + Object.values(record.tasks || {}).filter(Boolean).length;
    }, 0);
    const streak = calculateStreak();
    badges[0]?.classList.toggle("unlocked", taskCount > 0);
    badges[1]?.classList.toggle("unlocked", Boolean(state.badges.pinyinListened));
    badges[2]?.classList.toggle("unlocked", streak >= 7);
  }

  function renderPinyinTiles() {
    const initialTiles = $("#initialTiles");
    const finalTiles = $("#finalTiles");
    if (!initialTiles || !finalTiles) return;
    initialTiles.innerHTML = INITIALS.map((item) => `
      <button class="pinyin-tile" type="button" data-pinyin-say="${escapeHTML(item.say)}">
        <span><b>${escapeHTML(item.pinyin)}</b><small>${escapeHTML(item.example)}</small></span>
      </button>
    `).join("");
    finalTiles.innerHTML = FINALS.map((item) => `
      <button class="pinyin-tile" type="button" data-pinyin-say="${escapeHTML(item.say)}">
        <span><b>${escapeHTML(item.pinyin)}</b><small>${escapeHTML(item.example)}</small></span>
      </button>
    `).join("");
  }

  function playToneDemo(tone) {
    const demo = TONE_DEMOS.find((item) => item.tone === tone);
    if (!demo) return;
    state.badges.pinyinListened = true;
    saveState();
    updateBadges();
    speakText(demo.say, { lang: "zh-CN", rate: 0.8, pitch: 1.12 });
    setMascotSpeech(`${demo.tone}声 ${demo.pinyin}，跟萌可一起慢慢读。`, "happy");
  }

  function playPinyinQuestion() {
    if (currentPinyinTone === null) currentPinyinTone = randomOf(TONE_QUESTIONS);
    speakText(currentPinyinTone.say, { lang: "zh-CN", rate: 0.8, pitch: 1.11 });
  }

  function nextPinyinQuestion() {
    const previous = currentPinyinTone;
    let next = randomOf(TONE_QUESTIONS);
    let guard = 0;
    while (previous && next.say === previous.say && guard < 8) {
      next = randomOf(TONE_QUESTIONS);
      guard += 1;
    }
    currentPinyinTone = next;
    pinyinQuizLocked = false;
    $$("#pinyinAnswers button").forEach((button) => button.classList.remove("is-correct", "is-wrong"));
    $("#pinyinFeedback").textContent = "别着急，先听两遍也没关系。";
    window.setTimeout(playPinyinQuestion, 320);
  }

  function handlePinyinAnswer(value, button) {
    if (pinyinQuizLocked || !currentPinyinTone) return;
    const correct = Number(value) === currentPinyinTone.tone;
    if (correct) {
      pinyinQuizLocked = true;
      button.classList.add("is-correct");
      $("#pinyinFeedback").textContent = "找到啦！你听得很认真。";
      awardCorrect("pinyin");
      softChime("success");
      setMascotSpeech("答对啦！你的小耳朵真灵。", "happy");
      window.setTimeout(nextPinyinQuestion, 1150);
    } else {
      button.classList.add("is-wrong");
      window.setTimeout(() => button.classList.remove("is-wrong"), 500);
      $("#pinyinFeedback").textContent = "这次不是它。再听一遍，注意声音是平、往上，还是往下？";
      setMascotSpeech("没关系，再听一遍就会更清楚。", "neutral");
      speakText("再听一遍。", { lang: "zh-CN", rate: 0.8, pitch: 1.1 });
      window.setTimeout(playPinyinQuestion, 750);
    }
  }

  function renderHanzi() {
    const item = HANZI[currentHanziIndex];
    if (!item) return;
    $("#hanziCharacter").textContent = item.char;
    $("#hanziPinyin").textContent = item.pinyin;
    $("#hanziMeaning").textContent = item.meaning;
    $("#hanziWords").textContent = item.words;
    $("#hanziSentence").textContent = item.sentence;
    $("#hanziCounter").textContent = `${currentHanziIndex + 1} / ${HANZI.length}`;
    $("#hanziQuizCharacter").textContent = item.char;
    hanziQuizLocked = false;
    $("#hanziFeedback").textContent = "认错了也很正常，我们再找一次。";
    renderHanziChoices();
    clearWritingBoard();
  }

  function renderHanziChoices() {
    const item = HANZI[currentHanziIndex];
    const options = shuffle([
      item.char,
      ...shuffle(HANZI.filter((entry) => entry.char !== item.char)).slice(0, 2).map((entry) => entry.char)
    ]);
    $("#hanziChoices").innerHTML = options.map((char) => `
      <button type="button" data-hanzi-choice="${escapeHTML(char)}">${escapeHTML(char)}</button>
    `).join("");
  }

  function speakHanzi() {
    const item = HANZI[currentHanziIndex];
    speakText(`${item.char}。${item.pinyin}。${item.meaning}。${item.words.replaceAll("·", "，")}。${item.sentence}`, {
      lang: "zh-CN",
      rate: 0.82,
      pitch: 1.1
    });
  }

  function nextHanzi(direction) {
    currentHanziIndex = (currentHanziIndex + direction + HANZI.length) % HANZI.length;
    renderHanzi();
  }

  function handleHanziChoice(button) {
    if (hanziQuizLocked) return;
    const correctChar = HANZI[currentHanziIndex].char;
    if (button.dataset.hanziChoice === correctChar) {
      hanziQuizLocked = true;
      button.classList.add("is-correct");
      $("#hanziFeedback").textContent = "认对啦！这个字已经是你的新朋友了。";
      awardCorrect("hanzi");
      softChime("success");
      setMascotSpeech(`你找到了“${correctChar}”字，眼睛像小侦探一样亮。`, "happy");
    } else {
      button.classList.add("is-wrong");
      window.setTimeout(() => button.classList.remove("is-wrong"), 500);
      $("#hanziFeedback").textContent = "不是这个字，再看一眼刚才的字形。";
      setMascotSpeech("慢慢找，先看看哪一笔最特别。", "neutral");
    }
  }

  function renderEnglish() {
    const phrase = ENGLISH_PHRASES[currentEnglishIndex % ENGLISH_PHRASES.length];
    $("#englishPhrase").textContent = phrase.text;
    $("#englishPhraseTranslation").textContent = phrase.translation;
    $("#englishWordGrid").innerHTML = ENGLISH_WORDS.map((item) => `
      <button class="english-word-button" type="button" data-english-word="${escapeHTML(item.word)}">
        <span>${escapeHTML(item.emoji)}</span>
        <strong>${escapeHTML(item.word)}</strong>
      </button>
    `).join("");
    renderEnglishQuiz();
  }

  function speakEnglishPhrase() {
    const phrase = ENGLISH_PHRASES[currentEnglishIndex % ENGLISH_PHRASES.length];
    speakText(phrase.say, { lang: "en-US", rate: 0.8, pitch: 1.08 });
    setMascotSpeech("跟我慢慢说，不用一次就说得一模一样。", "happy");
  }

  function speakEnglishWord(word) {
    speakText(`${word}. ${word}.`, { lang: "en-US", rate: 0.78, pitch: 1.06 });
  }

  function renderEnglishQuiz() {
    const target = randomOf(ENGLISH_WORDS);
    const options = shuffle([
      target,
      ...shuffle(ENGLISH_WORDS.filter((item) => item.word !== target.word)).slice(0, 2)
    ]);
    currentEnglishQuiz = target;
    englishQuizLocked = false;
    $("#englishFeedback").textContent = "可以用耳朵先找到答案。";
    $("#englishChoices").innerHTML = options.map((item) => `
      <button type="button" data-english-choice="${escapeHTML(item.word)}">
        <span>${escapeHTML(item.emoji)}</span>
        <strong>${escapeHTML(item.word)}</strong>
      </button>
    `).join("");
  }

  function playEnglishQuiz() {
    if (!currentEnglishQuiz) return;
    speakEnglishWord(currentEnglishQuiz.word);
  }

  function handleEnglishChoice(button) {
    if (englishQuizLocked || !currentEnglishQuiz) return;
    if (button.dataset.englishChoice === currentEnglishQuiz.word) {
      englishQuizLocked = true;
      button.classList.add("is-correct");
      $("#englishFeedback").textContent = "Yes! 你听对啦。";
      awardCorrect("english");
      softChime("success");
      setMascotSpeech(pick(["Yes! 你的小耳朵听见啦。", "Great! 说错也没关系，愿意听就很好。"]), "happy");
      window.setTimeout(renderEnglishQuiz, 1100);
    } else {
      button.classList.add("is-wrong");
      window.setTimeout(() => button.classList.remove("is-wrong"), 500);
      $("#englishFeedback").textContent = "Let's listen again. 再听一次。";
      setMascotSpeech("Not this one. 再听一次，我们一起找。", "neutral");
      window.setTimeout(playEnglishQuiz, 650);
    }
  }

  function newMathQuestion() {
    mathLocked = false;
    const difficulty = state.settings.mathDifficulty || "easy";
    const maximum = difficulty === "challenge" ? 20 : 10;
    const type = randomOf(difficulty === "easy" ? ["add", "add", "subtract", "count"] : ["add", "subtract", "add", "subtract"]);
    let a = 1;
    let b = 1;
    let answer = 0;
    let text = "";
    let hint = "";
    let visual = "";

    if (type === "add") {
      if (difficulty === "challenge") {
        a = 2 + Math.floor(Math.random() * 9);
        b = 2 + Math.floor(Math.random() * 9);
        while (a + b > 20) {
          a = 2 + Math.floor(Math.random() * 9);
          b = 2 + Math.floor(Math.random() * 9);
        }
      } else {
        a = 1 + Math.floor(Math.random() * 6);
        b = 1 + Math.floor(Math.random() * (9 - a));
      }
      answer = a + b;
      text = `${a} + ${b} = ?`;
      hint = `先数一数左边和右边，一共有多少个？`;
      visual = `
        <div class="math-object-group">${Array.from({ length: a }, () => '<i class="math-object"></i>').join("")}</div>
        <span class="math-operator">＋</span>
        <div class="math-object-group blue">${Array.from({ length: b }, () => '<i class="math-object"></i>').join("")}</div>
      `;
    } else if (type === "subtract") {
      a = difficulty === "challenge" ? 10 + Math.floor(Math.random() * 11) : 4 + Math.floor(Math.random() * 6);
      b = 1 + Math.floor(Math.random() * Math.max(1, a - 1));
      answer = a - b;
      text = `${a} − ${b} = ?`;
      hint = `有 ${a} 个小果子，拿走 ${b} 个，还剩下几个？`;
      visual = `
        <div class="math-object-group yellow">
          ${Array.from({ length: a }, (_, index) => `<i class="math-object ${index >= a - b ? "is-removed" : ""}"></i>`).join("")}
        </div>
        <span class="math-operator">−</span>
        <div class="math-object-group removed">${Array.from({ length: b }, () => '<i class="math-object"></i>').join("")}</div>
      `;
    } else {
      a = difficulty === "challenge" ? 11 + Math.floor(Math.random() * 10) : 3 + Math.floor(Math.random() * 8);
      answer = a;
      text = "数一数，一共有几个？";
      hint = "用小手指着，一个一个慢慢数。";
      visual = `<div class="math-object-group green">${Array.from({ length: a }, () => '<i class="math-object"></i>').join("")}</div>`;
    }

    const choiceSet = new Set([answer]);
    while (choiceSet.size < 4) {
      const offset = Math.floor(Math.random() * 7) - 3;
      const candidate = answer + offset;
      if (candidate >= 0 && candidate <= 24) choiceSet.add(candidate);
    }
    const choices = shuffle([...choiceSet]);
    currentMathQuestion = { type, a, b, answer, text, hint };
    $("#mathQuestionNumber").textContent = `第 ${mathQuestionNo} 题`;
    $("#mathQuestionText").textContent = text;
    $("#mathQuestionHint").textContent = hint;
    $("#mathVisual").innerHTML = visual;
    $("#mathAnswers").innerHTML = choices.map((choice) => `
      <button type="button" data-math-answer="${choice}">${choice}</button>
    `).join("");
    $("#mathFeedback").textContent = "慢慢想，萌可陪着你。";
    mathQuestionNo += 1;
  }

  function speakMathQuestion() {
    if (!currentMathQuestion) return;
    const question = currentMathQuestion;
    let text = "";
    if (question.type === "add") {
      text = `${question.a} 加 ${question.b}，等于几？`;
    } else if (question.type === "subtract") {
      text = `${question.a} 减 ${question.b}，等于几？`;
    } else {
      text = `数一数，一共有几个？`;
    }
    speakText(text, { lang: "zh-CN", rate: 0.86, pitch: 1.1 });
  }

  function handleMathAnswer(value, button) {
    if (mathLocked || !currentMathQuestion) return;
    if (Number(value) === currentMathQuestion.answer) {
      mathLocked = true;
      button.classList.add("is-correct");
      $("#mathFeedback").textContent = pick([
        "答对啦！你是自己找出来的答案。",
        "完全正确！刚才认真数数的样子真棒。",
        "找到啦！想清楚比答得快更重要。"
      ]);
      const currentStreak = Number($("#mathStreak").textContent) + 1;
      $("#mathStreak").textContent = String(currentStreak);
      awardCorrect("math");
      softChime("success");
      setMascotSpeech("答对啦！你不是猜的，是一步一步想出来的。", "happy");
      if (currentStreak % 3 === 0) burstConfetti(12);
      window.setTimeout(newMathQuestion, 1050);
    } else {
      button.classList.add("is-wrong");
      window.setTimeout(() => button.classList.remove("is-wrong"), 520);
      $("#mathFeedback").textContent = "再数一次试试看，先数第一组，再接着数第二组。";
      $("#mathStreak").textContent = "0";
      setMascotSpeech("答错也没关系，我们一起再数一次。", "neutral");
    }
  }

  function awardCorrect(skill) {
    const record = dayData();
    record.correct += 1;
    record.activity += 1;
    record.quiz[skill] = (record.quiz[skill] || 0) + 1;
    state.skills[skill] = Math.min(100, (state.skills[skill] || 0) + 2);
    state.pet.happiness = Math.min(100, state.pet.happiness + 1);
    saveState();
    updateStatsUI();
    updatePetUI();
  }

  function setDifficulty(difficulty) {
    state.settings.mathDifficulty = difficulty;
    saveState();
    $$("[data-difficulty]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.difficulty === difficulty);
    });
    newMathQuestion();
  }

  function initWritingBoard() {
    const canvas = $("#writingBoard");
    if (!canvas) return;
    writingContext = canvas.getContext("2d");
    writingContext.lineCap = "round";
    writingContext.lineJoin = "round";
    writingContext.strokeStyle = "#67583f";
    writingContext.lineWidth = 9;

    const pointFromEvent = (event) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: (event.clientX - rect.left) * (canvas.width / rect.width),
        y: (event.clientY - rect.top) * (canvas.height / rect.height)
      };
    };

    canvas.addEventListener("pointerdown", (event) => {
      isDrawing = true;
      lastPoint = pointFromEvent(event);
      canvas.setPointerCapture(event.pointerId);
      writingContext.beginPath();
      writingContext.moveTo(lastPoint.x, lastPoint.y);
      writingContext.lineTo(lastPoint.x + 0.1, lastPoint.y + 0.1);
      writingContext.stroke();
    });

    canvas.addEventListener("pointermove", (event) => {
      if (!isDrawing || !lastPoint) return;
      const point = pointFromEvent(event);
      writingContext.beginPath();
      writingContext.moveTo(lastPoint.x, lastPoint.y);
      writingContext.lineTo(point.x, point.y);
      writingContext.stroke();
      lastPoint = point;
    });

    const stopDrawing = () => {
      isDrawing = false;
      lastPoint = null;
    };
    canvas.addEventListener("pointerup", stopDrawing);
    canvas.addEventListener("pointercancel", stopDrawing);
    canvas.addEventListener("pointerleave", stopDrawing);
  }

  function clearWritingBoard() {
    const canvas = $("#writingBoard");
    if (!canvas || !writingContext) return;
    writingContext.clearRect(0, 0, canvas.width, canvas.height);
  }

  function navigate(viewName, options = {}) {
    const target = $(`#view-${viewName}`);
    if (!target) return;
    $$(".view").forEach((view) => {
      const active = view === target;
      view.hidden = !active;
      view.classList.toggle("is-active", active);
    });
    $$(".nav-item, .bottom-nav-item[data-go]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.go === viewName);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (viewName === "home") renderTasks();
    if (viewName === "study") updateCompleteButtons();
    if (viewName === "pet") updatePetUI();
    if (viewName === "progress") updateStatsUI();
    if (!options.fromHash && window.location.hash !== `#${viewName}`) {
      window.history.replaceState(null, "", `#${viewName}`);
    }
  }

  function selectSubject(subject, options = {}) {
    $$(".subject-tab").forEach((button) => {
      const active = button.dataset.subject === subject;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });
    $$(".subject-panel").forEach((panel) => {
      const active = panel.dataset.panel === subject;
      panel.hidden = !active;
      panel.classList.toggle("is-active", active);
    });
    if (subject === "math" && !currentMathQuestion) newMathQuestion();
    if (subject === "hanzi") renderHanziChoices();
    if (subject === "english" && !currentEnglishQuiz) renderEnglishQuiz();
    if (!options.fromHash && !$("#view-study").hidden && window.location.hash !== `#study/${subject}`) {
      window.history.replaceState(null, "", `#study/${subject}`);
    }
  }

  function applyHashRoute() {
    const [viewName, subject] = window.location.hash.replace(/^#/, "").split("/");
    const validViews = ["home", "study", "pet", "progress"];
    const validSubjects = ["pinyin", "hanzi", "english", "math"];
    if (!validViews.includes(viewName)) {
      navigate("home", { fromHash: true });
      return;
    }
    navigate(viewName, { fromHash: true });
    if (viewName === "study" && validSubjects.includes(subject)) {
      selectSubject(subject, { fromHash: true });
    }
  }

  function taskControl(taskId, button) {
    const task = allTasks().find((item) => item.id === taskId);
    if (!task) return;
    const done = Boolean(dayData(dateKey(), false)?.tasks?.[taskId]);
    if (done) {
      showToast("这项已经完成啦，可以去照顾萌可。");
      return;
    }
    if (task.subject) {
      navigate("study");
      selectSubject(task.subject);
      showToast(`已打开${task.title}，完成练习后记得点“完成”。`);
      if (task.subject === "pinyin") window.setTimeout(playPinyinQuestion, 250);
    } else {
      toggleTask(taskId);
    }
  }

  function updateStatsUI() {
    const keys = lastSevenKeys();
    const dailyData = keys.map((key) => dayData(key, false));
    const todayRecord = dayData(dateKey(), false);
    const taskCount = dailyData.reduce((total, record) => {
      return total + Object.values(record?.tasks || {}).filter(Boolean).length;
    }, 0);
    const minutes = dailyData.reduce((total, record) => total + (record?.minutes || 0), 0);
    const correct = dailyData.reduce((total, record) => total + (record?.correct || 0), 0);
    const streak = calculateStreak();

    $("#statTasks").textContent = String(taskCount);
    $("#statMinutes").textContent = String(Math.round(minutes));
    $("#statCorrect").textContent = String(correct);
    $("#statStreak").textContent = String(streak);
    $("#progressHeroDays").textContent = String(streak);
    $("#streakDays").textContent = String(streak);
    $("#pinyinCorrectCount").textContent = String(todayRecord?.quiz?.pinyin || 0);

    const energies = keys.map((key) => getEnergy(dayData(key, false)));
    const maximum = Math.max(10, ...energies);
    const weekdays = keys.map((key) => {
      const [year, month, day] = key.split("-").map(Number);
      return new Intl.DateTimeFormat("zh-CN", { weekday: "short" }).format(new Date(year, month - 1, day, 12)).replace("周", "");
    });

    $("#homeMiniBars").innerHTML = keys.map((key, index) => `
      <div class="mini-bar-col ${index === 6 ? "is-today" : ""}">
        <span class="mini-bar-track"><i style="height:${Math.max(4, (energies[index] / maximum) * 100)}%"></i></span>
        <small>${index === 6 ? "今" : escapeHTML(weekdays[index])}</small>
      </div>
    `).join("");

    $("#weeklyChart").innerHTML = keys.map((key, index) => {
      const record = dayData(key, false);
      const tasks = Object.values(record?.tasks || {}).filter(Boolean).length;
      const quiz = record?.correct || 0;
      const taskHeight = Math.max(tasks ? 8 : 2, Math.min(100, tasks * 17));
      const quizHeight = Math.max(quiz ? 8 : 2, Math.min(100, quiz * 8));
      return `
        <div class="chart-day ${index === 6 ? "is-today" : ""}">
          <div class="chart-bars">
            <i style="height:${taskHeight}%"></i>
            <i class="quiz-bar" style="height:${quizHeight}%"></i>
          </div>
          <span>${index === 6 ? "今天" : escapeHTML(weekdays[index])}</span>
        </div>
      `;
    }).join("");

    renderSkillList();
    updateWeeklyReport(taskCount, correct, streak);
  }

  function getEnergy(record) {
    if (!record) return 0;
    const tasks = Object.values(record.tasks || {}).filter(Boolean).length;
    return tasks * 10 + (record.correct || 0) * 4 + Math.min(20, (record.minutes || 0) / 2);
  }

  function calculateStreak() {
    let cursor = dateKey();
    if (getEnergy(dayData(cursor, false)) === 0) cursor = shiftDate(cursor, -1);
    let streak = 0;
    for (let index = 0; index < 60; index += 1) {
      const record = dayData(cursor, false);
      if (!record || getEnergy(record) === 0) break;
      streak += 1;
      cursor = shiftDate(cursor, -1);
    }
    return streak;
  }

  function renderSkillList() {
    const configs = [
      { key: "pinyin", label: "拼音听辨", emoji: "🎵", color: "#ef9cab" },
      { key: "hanzi", label: "汉字认读", emoji: "字", color: "#e5b850" },
      { key: "english", label: "英语听读", emoji: "Aa", color: "#72c3b0" },
      { key: "math", label: "数学数感", emoji: "＋", color: "#7ec4e5" }
    ];
    $("#skillList").innerHTML = configs.map((item) => {
      const value = Math.max(0, Math.min(100, Number(state.skills[item.key]) || 0));
      const level = value >= 80 ? "很熟练" : value >= 50 ? "在成长" : value >= 20 ? "有进步" : "刚萌芽";
      return `
        <div class="skill-row">
          <div class="skill-row-head">
            <span class="skill-name"><span>${escapeHTML(item.emoji)}</span>${escapeHTML(item.label)}</span>
            <b>${level} · ${value}%</b>
          </div>
          <div class="skill-bar"><i style="width:${value}%;--skill-color:${item.color}"></i></div>
        </div>
      `;
    }).join("");
  }

  function updateWeeklyReport(tasks, correct, streak) {
    const title = $("#weeklyReportTitle");
    const text = $("#weeklyReportText");
    if (!title || !text) return;
    if (tasks === 0 && correct === 0) {
      title.textContent = "先从小小的坚持开始";
      text.textContent = "本周还没有太多记录。可以从每天完成 1 项任务开始，让孩子体验“我能做到”的成就感。";
    } else if (streak >= 5) {
      title.textContent = "稳定的节奏正在形成";
      text.textContent = `本周完成 ${tasks} 项计划、答对 ${correct} 道题。持续的小步练习很重要，也请给孩子留出自由玩耍和充足睡眠的时间。`;
    } else if (tasks >= 5) {
      title.textContent = "愿意开始，就是好进展";
      text.textContent = `已经完成 ${tasks} 项计划、答对 ${correct} 道题。可以多问问孩子“哪一科最好玩”，让兴趣带着她继续探索。`;
    } else {
      title.textContent = "每一次尝试都在发芽";
      text.textContent = `已经完成 ${tasks} 项计划、答对 ${correct} 道题。不急着追进度，先保护孩子愿意尝试的心情。`;
    }
  }

  function updateAll() {
    renderTasks();
    updateStars();
    updatePetUI();
    updateCompleteButtons();
    updateStatsUI();
  }

  function speakText(text, options = {}) {
    if (!state.settings.voice) return;
    if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
      showToast("当前浏览器暂时不能朗读，请换用新版浏览器。");
      return;
    }
    const content = String(text || "").trim();
    if (!content) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(content);
    const lang = options.lang || "zh-CN";
    utterance.lang = lang;
    utterance.rate = options.rate ?? (lang.startsWith("zh") ? 0.82 : 0.8);
    utterance.pitch = options.pitch ?? 1.1;
    utterance.volume = options.volume ?? 1;
    const voice = selectBestVoice(lang);
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  }

  function selectBestVoice(lang) {
    if (!("speechSynthesis" in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    const prefix = lang.slice(0, 2).toLowerCase();
    const candidates = voices.filter((voice) => voice.lang.toLowerCase().startsWith(prefix));
    if (!candidates.length) return null;
    if (prefix === "zh") {
      const preferred = candidates.find((voice) => /xiaoxiao|huihui|ting|meijia|yaoyao|natural/i.test(voice.name));
      return preferred || candidates[0];
    }
    const preferredEnglish = candidates.find((voice) => /aria|jenny|samantha|natural|female/i.test(voice.name));
    return preferredEnglish || candidates[0];
  }

  function softChime(type = "success") {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const context = new AudioContextClass();
      const gain = context.createGain();
      gain.gain.setValueAtTime(0.0001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.035, context.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.48);
      gain.connect(context.destination);

      const notes = type === "care" ? [523.25, 659.25] : [659.25, 783.99, 1046.5];
      notes.forEach((frequency, index) => {
        const oscillator = context.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(frequency, context.currentTime + index * 0.07);
        oscillator.connect(gain);
        oscillator.start(context.currentTime + index * 0.07);
        oscillator.stop(context.currentTime + index * 0.07 + 0.35);
      });
      window.setTimeout(() => context.close(), 900);
    } catch {
      // Sound is an enhancement; the visual flow remains complete without it.
    }
  }

  function showToast(message, mood = "neutral") {
    const toast = $("#toast");
    if (!toast) return;
    window.clearTimeout(toastTimer);
    toast.innerHTML = `<span class="toast-pet">${mood === "happy" ? "萌可：" : ""}</span>${escapeHTML(message)}`;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2700);
  }

  function burstConfetti(count = 24) {
    const layer = $("#confettiLayer");
    if (!layer) return;
    const colors = ["#ff9eac", "#ffd56d", "#84d5bf", "#83c9ed", "#c7b7f3"];
    for (let index = 0; index < count; index += 1) {
      const piece = document.createElement("i");
      piece.className = "confetti";
      piece.style.left = `${10 + Math.random() * 80}%`;
      piece.style.background = randomOf(colors);
      piece.style.animationDelay = `${Math.random() * 0.35}s`;
      piece.style.transform = `rotate(${Math.random() * 180}deg)`;
      piece.style.width = `${5 + Math.random() * 6}px`;
      layer.appendChild(piece);
      window.setTimeout(() => piece.remove(), 2400);
    }
  }

  function openChat() {
    $("#chatOverlay").hidden = false;
    const drawer = $("#chatDrawer");
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    renderChat();
    checkChatService();
    window.setTimeout(() => $("#chatInput").focus({ preventScroll: true }), 280);
  }

  function closeChat() {
    const drawer = $("#chatDrawer");
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    window.setTimeout(() => {
      $("#chatOverlay").hidden = true;
    }, 260);
  }

  function renderChat() {
    const container = $("#chatMessages");
    if (!container) return;
    const childName = state.profile.name || "小朋友";
    const greeting = {
      role: "pet",
      text: `${childName}，我在这儿。开心的事、小小的心事，都可以慢慢说给我听。`,
      time: Date.now()
    };
    const messages = state.chat.length ? state.chat : [greeting];
    container.innerHTML = messages.map((message) => messageHTML(message)).join("");
    container.scrollTop = container.scrollHeight;
    setChatMode(chatServiceStatus);
  }

  function messageHTML(message) {
    const time = new Intl.DateTimeFormat("zh-CN", { hour: "2-digit", minute: "2-digit" }).format(new Date(message.time || Date.now()));
    return `
      <div class="chat-message ${message.role === "user" ? "is-user" : ""}">
        ${message.role === "user" ? "" : '<span class="chat-message-avatar">◕ᴗ◕</span>'}
        <div class="chat-bubble">
          ${escapeHTML(message.text).replaceAll("\n", "<br>")}
          <span class="chat-message-time">${escapeHTML(time)}</span>
        </div>
      </div>
    `;
  }

  function appendChatMessage(message, shouldSave = true) {
    const container = $("#chatMessages");
    if (!container) return;
    container.insertAdjacentHTML("beforeend", messageHTML(message));
    container.scrollTop = container.scrollHeight;
    if (shouldSave) {
      state.chat.push(message);
      state.chat = state.chat.slice(-30);
      saveState();
    }
  }

  function showTyping() {
    const container = $("#chatMessages");
    if (!container) return;
    container.insertAdjacentHTML("beforeend", `
      <div class="chat-message chat-typing" id="chatTyping">
        <span class="chat-message-avatar">◕ᴗ◕</span>
        <div class="chat-bubble"><i></i><i></i><i></i></div>
      </div>
    `);
    container.scrollTop = container.scrollHeight;
  }

  function setChatMode(status) {
    chatServiceStatus = status;
    const mode = $("#chatMode");
    if (!mode) return;
    const label = mode.querySelector("b");
    mode.classList.remove("is-online", "is-local", "is-offline", "is-thinking");
    if (!state.settings.smartChat) {
      mode.classList.add("is-local");
      if (label) label.textContent = "本地陪伴";
      return;
    }
    if (status === "online") {
      mode.classList.add("is-online");
      if (label) label.textContent = "智能陪伴 · 已连接";
    } else if (status === "thinking") {
      mode.classList.add("is-online", "is-thinking");
      if (label) label.textContent = "萌可正在认真听";
    } else if (status === "offline") {
      mode.classList.add("is-offline");
      if (label) label.textContent = "云朵打盹 · 本地陪聊";
    } else {
      mode.classList.add("is-local");
      if (label) label.textContent = "正在准备聊天";
    }
  }

  async function checkChatService(force = false) {
    if (!state.settings.smartChat) {
      setChatMode("local");
      return false;
    }
    if (!window.location.protocol.startsWith("http")) {
      setChatMode("local");
      return false;
    }
    if (!force && chatServiceStatus === "online") return true;
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 4500);
    try {
      const response = await fetch("api/chat", {
        method: "GET",
        cache: "no-store",
        signal: controller.signal
      });
      if (!response.ok) throw new Error("chat service unavailable");
      const data = await response.json();
      if (data?.configured) {
        chatServiceModel = data.model || "";
        setChatMode("online");
        return true;
      }
      setChatMode("local");
      return false;
    } catch {
      setChatMode("offline");
      return false;
    } finally {
      window.clearTimeout(timer);
    }
  }

  function setChatBusy(busy) {
    chatBusy = busy;
    const input = $("#chatInput");
    const send = $("#chatForm .send-button");
    const voice = $("#voiceChatButton");
    if (input) {
      input.disabled = busy;
      input.placeholder = busy ? "萌可正在想怎么回答你…" : "把心里的话告诉萌可……";
    }
    if (send) send.disabled = busy;
    if (voice) voice.disabled = busy;
  }

  function buildChatContext() {
    const completed = Object.entries(dayData(dateKey(), false)?.tasks || {})
      .filter(([, done]) => done)
      .map(([taskId]) => TASK_DEFS.find((task) => task.id === taskId)?.title)
      .filter(Boolean)
      .slice(0, 6);
    return {
      childName: state.profile.name || "小朋友",
      completedTasks: completed,
      stars: state.stars,
      petHappiness: Math.round(state.pet.happiness),
      timeOfDay: new Date().getHours() < 12 ? "上午" : new Date().getHours() < 18 ? "下午" : "晚上"
    };
  }

  async function requestAiReply() {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 16_000);
    const messages = state.chat.slice(-14).map((message) => ({
      role: message.role === "pet" ? "assistant" : "user",
      content: String(message.text || "").slice(0, 500)
    }));
    try {
      const response = await fetch("api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages,
          appContext: buildChatContext(),
          conversation: state.conversation
        }),
        signal: controller.signal
      });
      if (!response.ok) throw new Error(`chat request failed: ${response.status}`);
      const data = await response.json();
      const reply = String(data?.reply || "").trim();
      if (!reply) throw new Error("empty chat reply");
      chatServiceStatus = "online";
      setChatMode("online");
      return reply.replace(/\*\*/g, "").replace(/^["“]|["”]$/g, "").slice(0, 320);
    } finally {
      window.clearTimeout(timer);
    }
  }

  async function sendChatMessage(rawMessage) {
    const message = String(rawMessage || "").trim();
    if (!message || chatBusy) return;
    setChatBusy(true);
    appendChatMessage({ role: "user", text: message, time: Date.now() });
    $("#chatInput").value = "";
    showTyping();
    window.clearTimeout(chatTypingTimer);
    try {
      let reply = "";
      if (state.settings.smartChat && window.location.protocol.startsWith("http")) {
        const available = await checkChatService();
        if (available) {
          setChatMode("thinking");
          try {
            reply = await requestAiReply();
          } catch {
            setChatMode("offline");
          }
        }
      }
      if (!reply) {
        reply = getPetReply(message);
        if (chatServiceStatus !== "offline") setChatMode("local");
        await new Promise((resolve) => window.setTimeout(resolve, 420));
      }
      $("#chatTyping")?.remove();
      appendChatMessage({ role: "pet", text: reply, time: Date.now() });
      updateConversationAfterReply(message, reply);
      setMascotSpeech(reply.length > 66 ? `${reply.slice(0, 60)}…` : reply, "happy");
      speakText(reply, { lang: "zh-CN", rate: 0.83, pitch: 1.12 });
    } catch {
      $("#chatTyping")?.remove();
      const fallback = "萌可刚刚没听清这句话。你可以再慢慢说一次吗？";
      appendChatMessage({ role: "pet", text: fallback, time: Date.now() });
      setChatMode("offline");
    } finally {
      setChatBusy(false);
      window.setTimeout(() => $("#chatInput").focus({ preventScroll: true }), 80);
    }
  }

  function getPetReply(message) {
    const normalized = message.toLowerCase();
    const previous = state.conversation || {};
    const shortQuote = message.replace(/^我/, "").replace(/[。.!！]+$/, "").slice(0, 22);
    const isShortReply = /^(嗯+|是|对|对呀|不是|没有|好|好吧|不知道|可能吧)[。.!！?？]?$/.test(message);
    const topicInfo = detectTopic(message);
    const emotion = detectEmotion(normalized);

    if (/(打我|欺负|受伤|流血|摸我|坏人|害怕他|害怕她|想死|自杀|不想活|不敢回家|有人威胁)/.test(normalized)) {
      return pick(CHAT_REPLIES.safety);
    }

    if (isShortReply && previous.lastQuestion) {
      const label = previous.topic || "刚才说的那件事";
      if (/不是|没有|不知道/.test(message)) {
        return `哦，原来你刚才不是在说${label}呀。那我重新听：现在最让你在意的是哪一件事？`;
      }
      return `嗯，我记住啦。那关于${label}，你现在最想让我陪你聊哪一点？`;
    }

    if (/[吗呢？?]$/.test(message) || /^(为什么|怎么|什么|谁|哪里)/.test(message)) {
      if (/为什么.*(天|天空).*蓝/.test(message)) {
        return "阳光碰到空气里的小颗粒，蓝蓝的光更容易散到我们眼睛里，所以白天抬头常常看见蓝色。你想不想下次和大人一起看日落，看看颜色会不会变？";
      }
      if (/作业|写字|练习/.test(message)) {
        return "写得慢，常常是因为手还在练习怎么控制笔，不代表你不聪明。我们先只写最短的一行，你觉得哪一项最容易开始？";
      }
      return `这个问题我想认真和你一起想。你是从${topicInfo.label || "刚才那件事"}里冒出的这个疑问，还是听别人说的呀？`;
    }

    if (/(紧张|害怕|担心|上学|小学|老师|教室|考试)/.test(normalized)) {
      const carried = previous.emotion === "worried" ? "接着刚才那份紧张，我听见你" : "我听见你";
      return `${carried}说“${shortQuote}”。${topicInfo.label ? `原来是${topicInfo.label}让你心里悬着。` : ""}你最担心会发生哪一件小事？`;
    }
    if (/(难过|伤心|想哭|哭了|想妈妈|孤独|没人|不喜欢我)/.test(normalized)) {
      return `你说“${shortQuote}”的时候，心里是不是酸酸的？不用马上把眼泪收起来，萌可先陪你。你愿意告诉我，发生了什么吗？`;
    }
    if (/(开心|高兴|太好了|成功|赢|做到了)/.test(normalized)) {
      return `我听出来啦，你现在真的很开心。${shortQuote ? `“${shortQuote}”这件事里，` : ""}最让你骄傲的是哪一小步？`;
    }
    if (/(累|困|想休息|不想动)/.test(normalized)) {
      return `刚才那句话听起来，你真的有点累了。我们先把肩膀放下来，喝口水。你现在是想安静歇一会儿，还是想让我陪你慢慢说？`;
    }
    if (/(作业|写字|练习|学习|读书|不会)/.test(normalized)) {
      return `你不是不想做，可能是这件事现在看起来太大了。我们把“${topicInfo.label || "它"}”缩成两分钟的小任务，你想先从哪一步碰一碰？`;
    }
    if (/(朋友|同学|一起玩|交朋友)/.test(normalized)) {
      return `你说的是和小朋友相处的事，对吗？交朋友有时会有一点不知道怎么说。你最想和谁一起玩，又担心什么呢？`;
    }
    if (/(生气|讨厌|不公平|气死|烦躁)/.test(normalized)) {
      return `这件事让你心里像冒出了一只小火龙。先不伤害自己，也不伤害别人。你愿意告诉萌可，是哪句话让你最不舒服吗？`;
    }
    if (/(睡觉|晚安|做梦)/.test(normalized)) {
      return `好呀，我们慢慢安静下来。今天先不想明天的一大堆事，只记住一件做得不错的小事。你想让萌可陪你数几次呼吸？`;
    }
    if (previous.lastUserMessage && previous.topic && topicInfo.label === previous.topic) {
      return `我们还在聊${previous.topic}呢，我没有跑开。你刚才补充了“${shortQuote}”，那里面哪一部分最让你放不下？`;
    }
    if (shortQuote.length > 3) {
      return `我听见你说“${shortQuote}”。这是刚刚发生的事吗？我想先弄清楚你当时是什么感觉，再陪你一起想办法。`;
    }
    return pick(CHAT_REPLIES.generic).replace("{message}", message.slice(0, 30));
  }

  function detectTopic(message) {
    const topics = [
      { regex: /(上学|小学|学校|老师|教室|课本)/, label: "上学" },
      { regex: /(作业|写字|练习|学习|读书)/, label: "学习" },
      { regex: /(妈妈|爸爸|奶奶|爷爷|外婆|外公)/, label: "家人" },
      { regex: /(朋友|同学|小朋友)/, label: "朋友" },
      { regex: /(考试|答题|做错)/, label: "答题" },
      { regex: /(书包|东西|收拾)/, label: "收拾东西" },
      { regex: /(累|困|睡觉|休息)/, label: "休息" }
    ];
    return topics.find((topic) => topic.regex.test(message)) || { label: "" };
  }

  function detectEmotion(message) {
    if (/(紧张|害怕|担心)/.test(message)) return "worried";
    if (/(难过|伤心|想哭|哭了)/.test(message)) return "sad";
    if (/(生气|讨厌|不公平|烦躁)/.test(message)) return "angry";
    if (/(开心|高兴|成功|赢)/.test(message)) return "happy";
    if (/(累|困)/.test(message)) return "tired";
    return "";
  }

  function updateConversationAfterReply(userMessage, petReply) {
    const topic = detectTopic(userMessage).label;
    const emotion = detectEmotion(userMessage);
    const questionMatch = petReply.match(/[^？?]*[？?]/g);
    state.conversation = {
      topic: topic || state.conversation?.topic || "",
      emotion: emotion || state.conversation?.emotion || "",
      lastQuestion: questionMatch ? questionMatch[questionMatch.length - 1].trim() : "",
      lastUserMessage: userMessage,
      turn: Number(state.conversation?.turn || 0) + 1
    };
    saveState();
  }

  function setupSpeechRecognition() {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) return;
    recognition = new Recognition();
    recognition.lang = "zh-CN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => {
      $("#voiceChatButton").classList.add("is-listening");
      $("#voiceChatButton").setAttribute("aria-label", "正在听你说话");
      showToast("萌可在听，请慢慢说。");
    };
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      $("#chatInput").value = text;
      sendChatMessage(text);
    };
    recognition.onerror = () => {
      showToast("这次没有听清楚，可以再试一次或直接打字。");
    };
    recognition.onend = () => {
      $("#voiceChatButton").classList.remove("is-listening");
      $("#voiceChatButton").setAttribute("aria-label", "语音输入");
    };
  }

  function toggleVoiceInput() {
    if (!recognition) {
      showToast("当前浏览器不支持语音输入，可以直接打字聊天。");
      return;
    }
    try {
      recognition.start();
    } catch {
      recognition.stop();
    }
  }

  function startRest() {
    if (restTimer) return;
    restRemaining = 60;
    const button = $("#restButton");
    button.disabled = true;
    button.querySelector("span").textContent = `远眺 ${restRemaining} 秒`;
    setMascotSpeech("我们一起看看远处的绿色，慢慢眨眼睛。", "happy");
    speakText("我们休息一下眼睛。看看远处，慢慢眨一眨眼睛，让眼睛喝口水。", { lang: "zh-CN", rate: 0.8, pitch: 1.08 });
    showToast("护眼休息开始啦，看看 5 米外的绿色吧。");
    restTimer = window.setInterval(() => {
      restRemaining -= 1;
      button.querySelector("span").textContent = `远眺 ${Math.max(0, restRemaining)} 秒`;
      if (restRemaining <= 0) {
        window.clearInterval(restTimer);
        restTimer = 0;
        button.disabled = false;
        button.querySelector("span").textContent = "护眼休息";
        showToast("眼睛休息好啦，眨眨眼睛继续吧。");
        speakText("眼睛休息好啦。眨眨眼睛，我们轻轻地继续。", { lang: "zh-CN", rate: 0.82, pitch: 1.1 });
      }
    }, 1000);
  }

  async function refreshWeather() {
    const button = $("#weatherButton");
    button.classList.add("is-loading");
    setWeatherFallback("正在看看天气…");

    const getPosition = () => new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }
      const timer = window.setTimeout(() => resolve(null), 5000);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          window.clearTimeout(timer);
          resolve({ lat: position.coords.latitude, lon: position.coords.longitude, label: "当前位置" });
        },
        () => {
          window.clearTimeout(timer);
          resolve(null);
        },
        { timeout: 4500, maximumAge: 20 * 60 * 1000 }
      );
    });

    const position = await getPosition();
    const location = position || { lat: 36.6512, lon: 117.1201, label: "山东 · 济南参考" };
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat.toFixed(4)}&longitude=${location.lon.toFixed(4)}&current=temperature_2m,weather_code&timezone=Asia%2FShanghai`;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 7000);

    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) throw new Error("weather request failed");
      const data = await response.json();
      const temperature = Math.round(data.current?.temperature_2m);
      const code = Number(data.current?.weather_code);
      const weather = weatherFromCode(code);
      $("#weatherTemp").textContent = `${temperature}°`;
      $("#weatherText").textContent = `${location.label} · ${weather.label}`;
      $("#weatherIcon").innerHTML = `<svg class="icon"><use href="#icon-${weather.icon}"/></svg>`;
      $("#weatherIcon").style.background = weather.background;
      $("#weatherIcon").style.color = weather.color;
      showToast(`已更新${location.label}天气。`);
    } catch {
      setWeatherFallback("山东 · 参考天气");
      showToast("天气暂时没有连上，先继续今天的小计划吧。");
    } finally {
      window.clearTimeout(timeout);
      button.classList.remove("is-loading");
    }
  }

  function weatherFromCode(code) {
    if (code === 0) return { label: "晴朗", icon: "sun", background: "#fff2c5", color: "#e5a52f" };
    if ([1, 2, 3].includes(code)) return { label: "晴间多云", icon: "cloud", background: "#e9f4fa", color: "#609fbf" };
    if ([45, 48].includes(code)) return { label: "有雾", icon: "cloud", background: "#eef0ed", color: "#87918a" };
    if ([51, 53, 55, 56, 57].includes(code)) return { label: "毛毛雨", icon: "cloud", background: "#e4f0f7", color: "#5c97b3" };
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { label: "有雨", icon: "cloud", background: "#deebf3", color: "#557f9b" };
    if ([71, 73, 75, 77, 85, 86].includes(code)) return { label: "有雪", icon: "cloud", background: "#eff5f5", color: "#7f9c9a" };
    if ([95, 96, 99].includes(code)) return { label: "雷阵雨", icon: "cloud", background: "#e6e9ef", color: "#68758c" };
    return { label: "天气变化中", icon: "cloud", background: "#e9f4fa", color: "#609fbf" };
  }

  function setWeatherFallback(text) {
    const month = new Date().getMonth() + 1;
    const seasonal = month >= 11 || month <= 2 ? "12°" : month >= 6 && month <= 8 ? "27°" : "18°";
    $("#weatherTemp").textContent = seasonal;
    $("#weatherText").textContent = text;
  }

  function updateInstallUI() {
    const installed = window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    const button = $("#installAppButton");
    const help = $("#installHelpText");
    if (!button || !help) return;
    button.disabled = installed;
    button.textContent = installed ? "已安装" : "安装";
    help.textContent = installed
      ? "已经安装到桌面。下次可以直接点桌面图标打开。"
      : "安装后可以像普通应用一样，从桌面图标直接打开。";
  }

  function showInstallBanner() {
    const installed = window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    if (!window.location.protocol.startsWith("http")) return;
    if (installed) return;
    try {
      if (sessionStorage.getItem("mengke-install-dismissed") === "1") return;
    } catch {
      // Continue with the banner if session storage is unavailable.
    }
    window.setTimeout(() => {
      const banner = $("#installBanner");
      if (banner) banner.hidden = false;
    }, 1800);
  }

  async function installWorkbench() {
    if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true) {
      showToast("工作台已经安装到桌面啦。");
      return;
    }
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      try {
        await deferredInstallPrompt.userChoice;
      } finally {
        deferredInstallPrompt = null;
        $("#installBanner").hidden = true;
      }
      return;
    }
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    showToast(isIOS
      ? "请点浏览器底部的“分享”，再选“添加到主屏幕”。"
      : "请打开浏览器菜单，选择“安装应用”或“添加到主屏幕”。");
  }

  function setupInstallPrompt() {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      deferredInstallPrompt = event;
      updateInstallUI();
    });
    window.addEventListener("appinstalled", () => {
      deferredInstallPrompt = null;
      $("#installBanner").hidden = true;
      updateInstallUI();
      showToast("已经放到桌面啦，以后点图标就能打开。");
    });
    updateInstallUI();
    showInstallBanner();
  }

  function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    const localHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);
    if (window.location.protocol !== "https:" && !localHost) return;
    navigator.serviceWorker.register("sw.js").catch(() => {
      // The workbench still runs normally if offline caching is unavailable.
    });
  }

  function openSettings() {
    $("#childNameInput").value = state.profile.name || "";
    const toggle = $("#voiceToggle");
    toggle.classList.toggle("is-on", Boolean(state.settings.voice));
    toggle.setAttribute("aria-pressed", String(Boolean(state.settings.voice)));
    toggle.querySelector("b").textContent = state.settings.voice ? "已开启" : "已关闭";
    const smartToggle = $("#smartChatToggle");
    smartToggle.classList.toggle("is-on", Boolean(state.settings.smartChat));
    smartToggle.setAttribute("aria-pressed", String(Boolean(state.settings.smartChat)));
    smartToggle.querySelector("b").textContent = state.settings.smartChat ? "已开启" : "已关闭";
    updateInstallUI();
    $("#settingsDialog").showModal();
  }

  function saveSettings() {
    const name = $("#childNameInput").value.trim() || "小朋友";
    state.profile.name = name.slice(0, 12);
    saveState();
    initDateAndGreeting();
    showToast("设置保存好啦。");
  }

  function resetAllData() {
    const confirmed = window.confirm("要清空全部学习记录、星星和萌可信息吗？这个操作不能撤销。");
    if (!confirmed) return;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // A fresh in-memory state still lets the app continue.
    }
    state = DEFAULT_STATE();
    saveState();
    currentHanziIndex = 0;
    currentEnglishIndex = 0;
    newMathQuestion();
    renderHanzi();
    renderEnglish();
    renderTasks();
    updateAll();
    initDateAndGreeting();
    $("#settingsDialog").close();
    showToast("已经重新开始记录。");
  }

  function addCustomTask(title) {
    const key = dateKey();
    const custom = state.customTasks[key] || [];
    state.customTasks[key] = [
      ...custom,
      {
        id: `custom-${Date.now()}`,
        title: title.slice(0, 24),
        description: "自己添加的小任务",
        emoji: "🌟",
        minutes: 5
      }
    ];
    saveState();
    renderTasks();
    updateStatsUI();
    showToast("小任务已经加入今天的清单。");
  }

  function bindEvents() {
    document.addEventListener("click", (event) => {
      const go = event.target.closest("[data-go]");
      if (go) {
        navigate(go.dataset.go);
        return;
      }

      const subjectButton = event.target.closest("[data-open-subject]");
      if (subjectButton) {
        navigate("study");
        selectSubject(subjectButton.dataset.openSubject);
        return;
      }

      const subjectTab = event.target.closest("[data-subject]");
      if (subjectTab) {
        selectSubject(subjectTab.dataset.subject);
        return;
      }

      const checkButton = event.target.closest("[data-toggle-task]");
      if (checkButton) {
        toggleTask(checkButton.dataset.toggleTask);
        return;
      }

      const startButton = event.target.closest("[data-start-task]");
      if (startButton) {
        taskControl(startButton.dataset.startTask, startButton);
        return;
      }

      const completeButton = event.target.closest("[data-complete-task]");
      if (completeButton) {
        const taskId = completeButton.dataset.completeTask;
        const done = Boolean(dayData(dateKey(), false)?.tasks?.[taskId]);
        if (done) {
          showToast("今天这项已经完成啦。");
        } else {
          toggleTask(taskId);
        }
        return;
      }

      const careButton = event.target.closest("[data-care]");
      if (careButton) {
        careForPet(careButton.dataset.care);
        return;
      }

      const toneButton = event.target.closest("[data-tone]");
      if (toneButton) {
        playToneDemo(Number(toneButton.dataset.tone));
        return;
      }

      const pinyinTile = event.target.closest("[data-pinyin-say]");
      if (pinyinTile) {
        state.badges.pinyinListened = true;
        saveState();
        updateBadges();
        speakText(pinyinTile.dataset.pinyinSay, { lang: "zh-CN", rate: 0.8, pitch: 1.12 });
        return;
      }

      const pinyinAnswer = event.target.closest("#pinyinAnswers [data-answer]");
      if (pinyinAnswer) {
        handlePinyinAnswer(pinyinAnswer.dataset.answer, pinyinAnswer);
        return;
      }

      const hanziChoice = event.target.closest("[data-hanzi-choice]");
      if (hanziChoice) {
        handleHanziChoice(hanziChoice);
        return;
      }

      const englishWord = event.target.closest("[data-english-word]");
      if (englishWord) {
        speakEnglishWord(englishWord.dataset.englishWord);
        return;
      }

      const englishChoice = event.target.closest("[data-english-choice]");
      if (englishChoice) {
        handleEnglishChoice(englishChoice);
        return;
      }

      const difficultyButton = event.target.closest("[data-difficulty]");
      if (difficultyButton) {
        setDifficulty(difficultyButton.dataset.difficulty);
        return;
      }

      const mathAnswer = event.target.closest("[data-math-answer]");
      if (mathAnswer) {
        handleMathAnswer(mathAnswer.dataset.mathAnswer, mathAnswer);
        return;
      }

      const outfitButton = event.target.closest("[data-outfit]");
      if (outfitButton) {
        state.pet.outfit = outfitButton.dataset.outfit;
        saveState();
        updatePetUI();
        setMascotSpeech(`这套${outfitButton.querySelector("strong")?.textContent || "新衣服"}真好看！谢谢你帮我打扮。`, "happy");
        showToast("萌可换好衣服啦。");
        return;
      }

      const accessoryButton = event.target.closest("[data-accessory]");
      if (accessoryButton) {
        state.pet.accessory = accessoryButton.dataset.accessory;
        saveState();
        updatePetUI();
        showToast("配饰换好啦。");
        return;
      }

      const chatPrompt = event.target.closest("[data-chat-prompt]");
      if (chatPrompt) {
        sendChatMessage(chatPrompt.dataset.chatPrompt);
        return;
      }
    });

    $("#hanziSpeakButton").addEventListener("click", speakHanzi);
    $("#hanziSentenceButton").addEventListener("click", () => speakText(HANZI[currentHanziIndex].sentence, { lang: "zh-CN", rate: 0.82, pitch: 1.1 }));
    $("#hanziPrev").addEventListener("click", () => nextHanzi(-1));
    $("#hanziNext").addEventListener("click", () => nextHanzi(1));
    $("#clearWriting").addEventListener("click", clearWritingBoard);
    $("#hanziQuizListen").addEventListener("click", () => {
      speakText(`请找出“${HANZI[currentHanziIndex].char}”字。`, { lang: "zh-CN", rate: 0.8, pitch: 1.1 });
    });

    $("#pinyinListen").addEventListener("click", playPinyinQuestion);
    $("#speakInitials").addEventListener("click", () => {
      state.badges.pinyinListened = true;
      saveState();
      updateBadges();
      const sample = INITIALS.slice(0, 8).map((item) => item.say).join("。");
      speakText(`萌可带你听声母。${sample}。听清楚了吗？`, { lang: "zh-CN", rate: 0.8, pitch: 1.12 });
    });

    $("#englishPhraseListen").addEventListener("click", speakEnglishPhrase);
    $("#englishPhraseNext").addEventListener("click", () => {
      currentEnglishIndex = (currentEnglishIndex + 1) % ENGLISH_PHRASES.length;
      renderEnglish();
      window.setTimeout(speakEnglishPhrase, 180);
    });
    $("#englishQuizListen").addEventListener("click", playEnglishQuiz);

    $("#mathQuestionListen").addEventListener("click", speakMathQuestion);
    $("#newMathQuestion").addEventListener("click", newMathQuestion);

    $("#weatherButton").addEventListener("click", refreshWeather);
    $("#restButton").addEventListener("click", startRest);

    $("#openChatFab").addEventListener("click", openChat);
    $("#openChatBottom").addEventListener("click", openChat);
    $("#openChatFromPet").addEventListener("click", openChat);
    $("#closeChat").addEventListener("click", closeChat);
    $("#chatOverlay").addEventListener("click", closeChat);
    $("#chatForm").addEventListener("submit", (event) => {
      event.preventDefault();
      sendChatMessage($("#chatInput").value);
    });
    $("#voiceChatButton").addEventListener("click", toggleVoiceInput);

    $$("#openParentSettings, #openParentFromProgress").forEach((button) => {
      button.addEventListener("click", openSettings);
    });
    $("#settingsForm").addEventListener("submit", (event) => {
      event.preventDefault();
      if (event.submitter?.value === "cancel") {
        $("#settingsDialog").close();
        return;
      }
      saveSettings();
      $("#settingsDialog").close();
    });
    $("#voiceToggle").addEventListener("click", () => {
      state.settings.voice = !state.settings.voice;
      const toggle = $("#voiceToggle");
      toggle.classList.toggle("is-on", state.settings.voice);
      toggle.setAttribute("aria-pressed", String(state.settings.voice));
      toggle.querySelector("b").textContent = state.settings.voice ? "已开启" : "已关闭";
      saveState();
      if (state.settings.voice) speakText("语音已经打开啦，我会温柔地慢慢说。", { lang: "zh-CN", rate: 0.82 });
    });
    $("#smartChatToggle").addEventListener("click", () => {
      state.settings.smartChat = !state.settings.smartChat;
      const toggle = $("#smartChatToggle");
      toggle.classList.toggle("is-on", state.settings.smartChat);
      toggle.setAttribute("aria-pressed", String(state.settings.smartChat));
      toggle.querySelector("b").textContent = state.settings.smartChat ? "已开启" : "已关闭";
      saveState();
      if (state.settings.smartChat) {
        checkChatService(true);
      } else {
        setChatMode("local");
      }
    });
    $("#installAppButton").addEventListener("click", installWorkbench);
    $("#installBannerButton").addEventListener("click", installWorkbench);
    $("#dismissInstallBanner").addEventListener("click", () => {
      $("#installBanner").hidden = true;
      try {
        sessionStorage.setItem("mengke-install-dismissed", "1");
      } catch {
        // Dismissing for this page is enough if storage is unavailable.
      }
    });
    $("#resetDataButton").addEventListener("click", resetAllData);

    $("#customTaskButton").addEventListener("click", () => {
      $("#customTaskInput").value = "";
      $("#customTaskDialog").showModal();
      window.setTimeout(() => $("#customTaskInput").focus(), 80);
    });
    $("#customTaskForm").addEventListener("submit", (event) => {
      event.preventDefault();
      if (event.submitter?.value === "cancel") {
        $("#customTaskDialog").close();
        return;
      }
      const title = $("#customTaskInput").value.trim();
      if (!title) return;
      $("#customTaskDialog").close();
      addCustomTask(title);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && $("#chatDrawer").classList.contains("is-open")) {
        closeChat();
      }
    });

    if ("speechSynthesis" in window) {
      window.speechSynthesis.addEventListener?.("voiceschanged", () => {
        window.speechSynthesis.getVoices();
      });
    }
    window.addEventListener("hashchange", applyHashRoute);
  }

  function init() {
    initMascots();
    initDateAndGreeting();
    renderTasks();
    renderPinyinTiles();
    renderHanzi();
    renderEnglish();
    newMathQuestion();
    initWritingBoard();
    setupSpeechRecognition();
    setupInstallPrompt();
    registerServiceWorker();
    bindEvents();
    updateAll();
    setWeatherFallback("山东 · 参考天气");
    currentPinyinTone = randomOf(TONE_QUESTIONS);
    setMascotSpeech("我想和你一起完成今天的小任务！", "happy");
    setChatMode(state.settings.smartChat ? "unknown" : "local");
    if (!state.chat.length) renderChat();
    applyHashRoute();

    window.setInterval(initDateAndGreeting, 60_000);
    window.setTimeout(() => {
      if (Date.now() - sessionStartedAt >= 15 * 60_000 && document.visibilityState === "visible") {
        showToast("已经学习一会儿啦，记得看看远处，眨眨眼睛。");
        setMascotSpeech("让眼睛休息一下吧，看看远处绿绿的地方。", "happy");
      }
    }, 15 * 60_000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
