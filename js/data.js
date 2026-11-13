/* Дані Minecraft Helper (Java Edition, актуальні версії 1.20–1.21+). */
(function () {
  "use strict";

  // key: [назва укр., назва англ., форма іконки, колір, темний, світлий, додатковий]
  const PLANKS = ["#b8945a", "#8a6a3a", "#d2b07a"];
  const STONE = ["#8a8a8a", "#5a5a5a", "#acacac"];
  const IRON = ["#d9d9d9", "#9a9a9a", "#ffffff"];
  const GOLD = ["#f6d241", "#c4951c", "#fff3a6"];
  const DIAMOND = ["#4fe3d4", "#1b9c90", "#c0fff7"];

  const items = {
    log: ["Дубова колода", "Oak Log", "log", "#7a5a36", "#4f3a22", "#987246"],
    planks: ["Дубові дошки", "Oak Planks", "planks", ...PLANKS],
    stick: ["Палиця", "Stick", "stick", "#8a6a3a", "#5e4524"],
    cobble: ["Кругляк", "Cobblestone", "stone", ...STONE],
    iron: ["Залізний злиток", "Iron Ingot", "ingot", ...IRON],
    gold: ["Золотий злиток", "Gold Ingot", "ingot", ...GOLD],
    diamond: ["Алмаз", "Diamond", "gem", ...DIAMOND],
    coal: ["Вугілля", "Coal", "lump", "#333333", "#161616", "#555555"],
    redstone: ["Редстоун", "Redstone Dust", "dust", "#d61f1f", "#8a0e0e", "#ff6363"],
    string: ["Нитка", "String", "string", "#f0f0f0", "#bdbdbd", "#ffffff"],
    feather: ["Перо", "Feather", "feather", "#eeeeee", "#bdbdbd", "#ffffff"],
    flint: ["Кремінь", "Flint", "lump", "#4b4b4b", "#2a2a2a", "#6e6e6e"],
    wool: ["Вовна", "Wool", "wool", "#ececec", "#c8c8c8", "#ffffff"],
    wheat: ["Пшениця", "Wheat", "wheat", "#dcb84c", "#a5832a", "#f2d97e"],
    sugar: ["Цукор", "Sugar", "dust", "#f4f4f4", "#cdcdcd", "#ffffff"],
    egg: ["Яйце", "Egg", "ball", "#efe0c0", "#c9b48a", "#fffaf0"],
    milk: ["Відро молока", "Milk Bucket", "bucket", "#cfcfcf", "#8f8f8f", "#ffffff", "#ffffff"],
    sugarcane: ["Цукрова тростина", "Sugar Cane", "cane", "#8fd16a", "#5a9a3a", "#c2f29e"],
    paper: ["Папір", "Paper", "sheet", "#f2f1e4", "#c8c6b0", "#ffffff"],
    leather: ["Шкіра", "Leather", "hide", "#a5592f", "#6d3a1e", "#c9774a"],
    book: ["Книга", "Book", "book", "#8b4a2b", "#5a2e1a", "#b8703f", "#f2f1e4"],
    obsidian: ["Обсидіан", "Obsidian", "stone", "#2b1b40", "#140b20", "#4b3570"],
    ironblock: ["Залізний блок", "Block of Iron", "metalblock", "#dedede", "#a9a9a9", "#ffffff"],
    blazerod: ["Стрижень іфрита", "Blaze Rod", "stick", "#f6b62a", "#c47a0e"],
    blazepowder: ["Вогняний порошок", "Blaze Powder", "dust", "#f7a524", "#c4650a", "#ffd56b"],
    pearl: ["Перлина Енду", "Ender Pearl", "ball", "#1f7d6c", "#0c4a40", "#5fd0bb"],
    gunpowder: ["Порох", "Gunpowder", "dust", "#6b6b6b", "#424242", "#949494"],
    sand: ["Пісок", "Sand", "sandblock", "#e2d49c", "#c5b475", "#f3e9c2"],
    nugget: ["Залізний самородок", "Iron Nugget", "nugget", ...IRON],
    apple: ["Яблуко", "Apple", "apple", "#d42a2a", "#8a1414", "#ff7070"],
    torch: ["Факел", "Torch", "torch"],
    crafting_table: ["Верстак", "Crafting Table", "craftingtable", ...PLANKS],
    furnace: ["Піч", "Furnace", "furnace", ...STONE],
    chest: ["Скриня", "Chest", "chest", "#b07b3c", "#7a5226", "#cf9a5c"],
    wooden_pickaxe: ["Деревʼяна кирка", "Wooden Pickaxe", "pickaxe", ...PLANKS],
    stone_pickaxe: ["Камʼяна кирка", "Stone Pickaxe", "pickaxe", ...STONE],
    iron_pickaxe: ["Залізна кирка", "Iron Pickaxe", "pickaxe", ...IRON],
    diamond_pickaxe: ["Алмазна кирка", "Diamond Pickaxe", "pickaxe", ...DIAMOND],
    stone_axe: ["Камʼяна сокира", "Stone Axe", "axe", ...STONE],
    iron_shovel: ["Залізна лопата", "Iron Shovel", "shovel", ...IRON],
    shears: ["Ножиці", "Shears", "shears", ...IRON],
    flint_and_steel: ["Кресало", "Flint and Steel", "flintsteel", ...IRON],
    bucket: ["Відро", "Bucket", "bucket", ...IRON, "#4a4a4a"],
    fishing_rod: ["Вудка", "Fishing Rod", "rod", ...PLANKS],
    compass: ["Компас", "Compass", "compass", ...IRON, "#e9e9e9"],
    clock: ["Годинник", "Clock", "clock", ...GOLD, "#ffe9a0"],
    iron_sword: ["Залізний меч", "Iron Sword", "sword", ...IRON],
    bow: ["Лук", "Bow", "bow", ...PLANKS],
    arrow: ["Стріла", "Arrow", "arrow", ...PLANKS],
    shield: ["Щит", "Shield", "shield", ...PLANKS],
    iron_helmet: ["Залізний шолом", "Iron Helmet", "helmet", ...IRON],
    iron_chestplate: ["Залізний нагрудник", "Iron Chestplate", "chestplate", ...IRON],
    iron_leggings: ["Залізні поножі", "Iron Leggings", "leggings", ...IRON],
    iron_boots: ["Залізні черевики", "Iron Boots", "boots", ...IRON],
    bread: ["Хліб", "Bread", "bread", "#c88a3a", "#8f5a1e", "#e6b366"],
    cake: ["Торт", "Cake", "cake", "#c88a3a", "#8f5a1e", "#e6b366"],
    golden_apple: ["Золоте яблуко", "Golden Apple", "apple", ...GOLD],
    bookshelf: ["Книжкова полиця", "Bookshelf", "bookshelf", ...PLANKS],
    enchanting_table: ["Стіл зачарувань", "Enchanting Table", "enchanting", "#2b1b40", "#140b20", "#4b3570"],
    eye: ["Око Енду", "Eye of Ender", "eye", "#3c9a5a", "#1f5a33", "#9de0a8"],
    brewing_stand: ["Варильна стійка", "Brewing Stand", "brewing", ...STONE],
    anvil: ["Ковадло", "Anvil", "anvil", ...STONE],
    rail: ["Рейки", "Rail", "rail", ...IRON],
    minecart: ["Вагонетка", "Minecart", "minecart", ...IRON],
    boat: ["Дубовий човен", "Oak Boat", "boat", ...PLANKS],
    ladder: ["Драбина", "Ladder", "ladder", ...PLANKS],
    door: ["Дубові двері", "Oak Door", "door", ...PLANKS],
    fence: ["Дубовий паркан", "Oak Fence", "fence", ...PLANKS],
    lantern: ["Ліхтар", "Lantern", "lantern", ...IRON],
    bed: ["Ліжко", "Bed", "bed", "#d64545", "#9a2a2a", "#ef7070"],
    tnt: ["Динаміт", "TNT", "tnt", "#d83a2a", "#a02018", "#f05a48"],
    piston: ["Поршень", "Piston", "piston", ...STONE],
    hopper: ["Лійка", "Hopper", "hopper", ...STONE],
  };

  const recipeCats = [
    { id: "basics", name: "Основи", icon: "crafting_table" },
    { id: "tools", name: "Інструменти", icon: "iron_pickaxe" },
    { id: "combat", name: "Зброя", icon: "iron_sword" },
    { id: "armor", name: "Броня", icon: "iron_chestplate" },
    { id: "food", name: "Їжа", icon: "bread" },
    { id: "magic", name: "Магія і зілля", icon: "enchanting_table" },
    { id: "transport", name: "Транспорт", icon: "minecart" },
    { id: "redstone", name: "Редстоун", icon: "piston" },
    { id: "build", name: "Будівництво", icon: "door" },
  ];

  // Компактний запис: шаблон 3×3 ("." — порожньо) + легенда символів
  function r(out, count, cat, pattern, legend, extra) {
    const grid = pattern.split("/").join("").split("").map((ch) => (ch === "." ? null : legend[ch]));
    return Object.assign({ id: out, out, count, cat, grid, shapeless: false, note: "", aliases: [] }, extra || {});
  }

  const recipes = [
    r("planks", 4, "basics", "L../.../...", { L: "log" }, { shapeless: true, note: "Будь-яка колода дає 4 дошки свого типу (береза, ялина, вишня…). Можна крафтити просто в інвентарі." }),
    r("stick", 4, "basics", ".P./.P./...", { P: "planks" }, { note: "Підходять дошки будь-якого дерева. Також бамбук: 2 бамбуки по вертикалі = 1 палиця." }),
    r("crafting_table", 1, "basics", "PP./PP./...", { P: "planks" }, { note: "Крафтиться в інвентарі (сітка 2×2). Перший предмет, який варто зробити.", aliases: ["крафтинг стіл", "верстат", "workbench"] }),
    r("furnace", 1, "basics", "CCC/C.C/CCC", { C: "cobble" }, { note: "Можна також з глибинного кругляку або чорнокаменю. Переплавляє руду, готує їжу, випалює скло.", aliases: ["пічка", "плавильня"] }),
    r("chest", 1, "basics", "PPP/P.P/PPP", { P: "planks" }, { note: "Дві скрині поруч утворюють велику скриню на 54 слоти.", aliases: ["сундук", "ящик"] }),
    r("torch", 4, "basics", ".c./.S./...", { c: "coal", S: "stick" }, { note: "Замість вугілля підходить деревне вугілля (Charcoal): випали колоду в печі.", aliases: ["світло", "смолоскип"] }),
    r("bed", 1, "basics", ".../WWW/PPP", { W: "wool", P: "planks" }, { note: "Вовна будь-якого кольору (усі 3 однакові) — колір ліжка буде таким самим. Пропускає ніч і задає точку відродження.", aliases: ["кровать", "сон"] }),
    r("ironblock", 1, "basics", "III/III/III", { I: "iron" }, { note: "Компактне зберігання: блок назад розбирається на 9 злитків. Потрібен для ковадла й залізного голема." }),

    r("wooden_pickaxe", 1, "tools", "PPP/.S./.S.", { P: "planks", S: "stick" }, { note: "Видобуває камінь і вугілля. Швидко ламається — одразу переходь на камʼяну.", aliases: ["кайло", "кірка"] }),
    r("stone_pickaxe", 1, "tools", "CCC/.S./.S.", { C: "cobble", S: "stick" }, { note: "Видобуває залізну, мідну та лазуритову руду.", aliases: ["кайло", "кірка"] }),
    r("iron_pickaxe", 1, "tools", "III/.S./.S.", { I: "iron", S: "stick" }, { note: "Потрібна для алмазів, золота, редстоуну та смарагдів.", aliases: ["кайло", "кірка"] }),
    r("diamond_pickaxe", 1, "tools", "DDD/.S./.S.", { D: "diamond", S: "stick" }, { note: "Єдина (разом із незеритовою) кирка, що видобуває обсидіан і древні уламки. Покращується до незеритової на ковальському столі.", aliases: ["кайло", "кірка"] }),
    r("stone_axe", 1, "tools", "CC./CS./.S.", { C: "cobble", S: "stick" }, { note: "Швидко рубає дерево. Дзеркальний варіант шаблону теж працює." }),
    r("iron_shovel", 1, "tools", ".I./.S./.S.", { I: "iron", S: "stick" }, { note: "Для землі, піску, гравію, снігу. ПКМ по траві робить стежку." }),
    r("shears", 1, "tools", ".I./I../...", { I: "iron" }, { note: "Стрижуть овець (вовна відростає), збирають листя та павутину.", aliases: ["ножниці"] }),
    r("flint_and_steel", 1, "tools", "I../.F./...", { I: "iron", F: "flint" }, { shapeless: true, note: "Запалює портал у Незер, багаття та TNT.", aliases: ["запальничка", "кремінь і кресало"] }),
    r("bucket", 1, "tools", "I.I/.I./...", { I: "iron" }, { note: "Носить воду, лаву, молоко, рибу. Відро води — головний рятівник у шахті." }),
    r("fishing_rod", 1, "tools", "..S/.ST/S.T", { S: "stick", T: "string" }, { note: "Риба, скарби (зачаровані книги, сідла). Зачарування «Удача моря» та «Приманка» дуже корисні.", aliases: ["вудочка", "рибалка"] }),
    r("compass", 1, "tools", ".I./IRI/.I.", { I: "iron", R: "redstone" }, { note: "Вказує на точку спавну світу. Магнетизований компас (ПКМ по магнітному каменю) — на свою точку." }),
    r("clock", 1, "tools", ".G./GRG/.G.", { G: "gold", R: "redstone" }, { note: "Показує час доби — корисно під землею." }),

    r("iron_sword", 1, "combat", ".I./.I./.S.", { I: "iron", S: "stick" }, { note: "6 шкоди. Мечі з «Гостротою» та «Помахом» — основна ближня зброя." }),
    r("bow", 1, "combat", ".ST/S.T/.ST", { S: "stick", T: "string" }, { note: "Зачарування «Безкінечність» робить стріли нескінченними (потрібна 1 стріла в інвентарі)." }),
    r("arrow", 4, "combat", ".F./.S./.E.", { F: "flint", S: "stick", E: "feather" }, { note: "Кремінь випадає з гравію (≈10% шанс)." }),
    r("shield", 1, "combat", "PIP/PPP/.P.", { P: "planks", I: "iron" }, { note: "Тримай у другій руці (F). ПКМ — блок: зупиняє стріли та вибухи кріперів." }),

    r("iron_helmet", 1, "armor", "III/I.I/...", { I: "iron" }, { aliases: ["шолом", "каска"] }),
    r("iron_chestplate", 1, "armor", "I.I/III/III", { I: "iron" }, { note: "Найбільше захисту серед частин броні.", aliases: ["нагрудник", "броня"] }),
    r("iron_leggings", 1, "armor", "III/I.I/I.I", { I: "iron" }, { aliases: ["штани", "поножі"] }),
    r("iron_boots", 1, "armor", ".../I.I/I.I", { I: "iron" }, { note: "«Невагомість» (Feather Falling) на черевиках різко зменшує шкоду від падіння.", aliases: ["чоботи", "взуття"] }),

    r("bread", 1, "food", ".../WWW/...", { W: "wheat" }, { note: "5 одиниць голоду. Найпростіша їжа з ферми.", aliases: ["їжа"] }),
    r("cake", 1, "food", "MMM/SES/WWW", { M: "milk", S: "sugar", E: "egg", W: "wheat" }, { note: "Ставиться як блок, 7 шматків. Порожні відра повертаються.", aliases: ["їжа", "тортик"] }),
    r("golden_apple", 1, "food", "GGG/GAG/GGG", { G: "gold", A: "apple" }, { note: "Регенерація II та поглинання. Разом зі зіллям слабкості лікує зомбі-селянина.", aliases: ["їжа", "гепл", "gapple"] }),

    r("paper", 3, "magic", ".../RRR/...", { R: "sugarcane" }),
    r("book", 1, "magic", "PPP/L../...", { P: "paper", L: "leather" }, { shapeless: true }),
    r("bookshelf", 1, "magic", "PPP/BBB/PPP", { P: "planks", B: "book" }, { note: "15 полиць навколо столу зачарувань (з проміжком 1 блок) відкривають рівень 30." }),
    r("enchanting_table", 1, "magic", ".B./DOD/OOO", { B: "book", D: "diamond", O: "obsidian" }, { note: "Зачарування коштують досвід і лазурит.", aliases: ["чари", "енчант"] }),
    r("blazepowder", 2, "magic", "B../.../...", { B: "blazerod" }, { shapeless: true, note: "Паливо для варильної стійки та інгредієнт ока Енду." }),
    r("eye", 1, "magic", "PB./.../...", { P: "pearl", B: "blazepowder" }, { shapeless: true, note: "Кинь (ПКМ) — полетить у бік фортеці з порталом в Енд. Для порталу потрібно до 12 очей.", aliases: ["око ендера"] }),
    r("brewing_stand", 1, "magic", ".B./CCC/...", { B: "blazerod", C: "cobble" }, { note: "Для зілля. Починай з «незграбного зілля»: пляшка води + незерський наріст.", aliases: ["зілля", "алхімія"] }),
    r("anvil", 1, "magic", "BBB/.I./III", { B: "ironblock", I: "iron" }, { note: "Ремонт, перейменування та обʼєднання зачарованих книг з інструментами." }),

    r("rail", 16, "transport", "I.I/ISI/I.I", { I: "iron", S: "stick" }),
    r("minecart", 1, "transport", ".../I.I/III", { I: "iron" }),
    r("boat", 1, "transport", ".../P.P/PPP", { P: "planks" }, { note: "Дошки мають бути одного типу дерева. Човен везе і мобів — зручно транспортувати селян." }),

    r("tnt", 1, "redstone", "GSG/SGS/GSG", { G: "gunpowder", S: "sand" }, { note: "Активується кресалом, редстоуном або вогнем. Порох — з кріперів.", aliases: ["тнт", "вибухівка"] }),
    r("piston", 1, "redstone", "PPP/CIC/CRC", { P: "planks", C: "cobble", I: "iron", R: "redstone" }, { note: "Додай слизову кульку — отримаєш липкий поршень." }),
    r("hopper", 1, "redstone", "I.I/ICI/.I.", { I: "iron", C: "chest" }, { note: "Основа будь-якої автоматичної ферми та сортувальника.", aliases: ["воронка"] }),

    r("ladder", 3, "build", "S.S/SSS/S.S", { S: "stick" }),
    r("door", 3, "build", "PP./PP./PP.", { P: "planks" }, { note: "На складності «Важко» зомбі ламають деревʼяні двері — став залізні." }),
    r("fence", 3, "build", ".../PSP/PSP", { P: "planks", S: "stick" }, { note: "Висота колізії 1,5 блока — моби не перестрибнуть." }),
    r("lantern", 1, "build", "NNN/NTN/NNN", { N: "nugget", T: "torch" }, { note: "Залізні самородки — переплав залізних інструментів або 1 злиток = 9 самородків." }),
  ];

  const tipCats = [
    { id: "start", name: "Перші кроки", color: "#6abe30" },
    { id: "food", name: "Їжа", color: "#e0a030" },
    { id: "mining", name: "Видобуток", color: "#4fe3d4" },
    { id: "combat", name: "Бій", color: "#e0533f" },
    { id: "base", name: "База", color: "#c8955a" },
    { id: "farm", name: "Ферми і торгівля", color: "#9bd35a" },
    { id: "nether", name: "Незер", color: "#ff7a3a" },
    { id: "end", name: "Енд", color: "#b48cff" },
  ];

  const LV = ["", "Новачок", "Досвідчений", "Профі"];

  const tips = [
    { id: "first-night", cat: "start", lvl: 1, title: "Пережити першу ніч", text: "Дерево → верстак → деревʼяна кирка → камінь → камʼяні інструменти. До заходу сонця збудуй укриття 3×3 або закопайся в схил і закрий вхід блоком.", tags: ["ніч", "укриття", "старт"] },
    { id: "bed", cat: "start", lvl: 1, title: "Ліжко пропускає ніч", text: "3 вовни + 3 дошки. Сон пропускає ніч і задає точку відродження. Овець краще стригти ножицями — вовна відростає, а вівця лишається.", tags: ["ліжко", "сон", "вівці"], recipe: "bed" },
    { id: "no-dig-down", cat: "start", lvl: 1, title: "Не копай прямо вниз", text: "Можна провалитися в печеру або лаву. Копай сходами чи «драбиною» 1×2 і завжди дивись, куди ступаєш.", tags: ["безпека", "шахта", "лава"] },
    { id: "coords", cat: "start", lvl: 1, title: "Запиши координати бази", text: "F3 показує координати XYZ. Запиши координати дому й порталів — після смерті легко повернутися за речами (предмети зникають через 5 хвилин).", tags: ["F3", "координати", "смерть"] },
    { id: "light", cat: "start", lvl: 1, title: "Світло = менше монстрів", text: "Ворожі моби зʼявляються лише в повній темряві (рівень блокового світла 0). Обстав базу й тунелі факелами чи ліхтарями.", tags: ["факел", "спавн", "монстри"], recipe: "torch" },
    { id: "golden-carrot", cat: "food", lvl: 2, title: "Золота морква — найкраща їжа", text: "Дає найвищу насиченість серед звичайної їжі: ситість тримається довго. Морква + 8 золотих самородків. Також її люблять коні.", tags: ["насиченість", "морква", "золото"] },
    { id: "cook-meat", cat: "food", lvl: 1, title: "Смаж мʼясо", text: "Смажений стейк чи свинина — 8 одиниць голоду проти 3 у сирих. Сиру курку краще не їсти: є шанс отруєння.", tags: ["мʼясо", "піч", "отруєння"], recipe: "furnace" },
    { id: "hunger-regen", cat: "food", lvl: 2, title: "Здоровʼя відновлюється лише ситим", text: "Природна регенерація працює, коли шкала голоду 18+ (9 стегенець). Тримай голод повним перед боєм.", tags: ["здоровʼя", "регенерація", "голод"] },
    { id: "wheat-farm", cat: "food", lvl: 1, title: "Ферма пшениці з першого дня", text: "Насіння випадає з трави. Зорі землю мотикою — вода зволожує ґрунт у радіусі 4 блоків. Пшениця = хліб і корм для корів та овець.", tags: ["ферма", "пшениця", "хліб"], recipe: "bread" },
    { id: "diamonds", cat: "mining", lvl: 2, title: "Алмази — на Y −59", text: "З версії 1.18 алмазів найбільше біля Y −59…−53 у глибинному сланці. Копай довгі тунелі (strip mining) з кроком 3 блоки і завжди май відро води від лави.", tags: ["алмази", "висота", "глибинний сланець"], recipe: "iron_pickaxe" },
    { id: "iron-height", cat: "mining", lvl: 2, title: "Де шукати залізо", text: "Залізо найчастіше трапляється біля Y 15 та високо в горах (вище Y 80). У печерах його видно на стінах — шукай світло-бежеві цятки.", tags: ["залізо", "руда", "висота"] },
    { id: "fortune", cat: "mining", lvl: 3, title: "Удача III на кирці", text: "Fortune III у середньому подвоює видобуток алмазів, вугілля, редстоуну й лазуриту. Шовковий дотик (Silk Touch) — щоб забрати сам блок руди.", tags: ["зачарування", "удача", "silk touch"] },
    { id: "water-bucket", cat: "mining", lvl: 2, title: "Відро води рятує життя", text: "Гасить вогонь, перетворює лаву на обсидіан чи кругляк, а якщо вилити його перед приземленням — скасовує шкоду від падіння.", tags: ["вода", "лава", "MLG"], recipe: "bucket" },
    { id: "gravel", cat: "mining", lvl: 1, title: "Обережно з гравієм і піском", text: "Вони падають. Копаючи вгору, можна задихнутися під обвалом. Постав факел під колону — блоки, що падають на нього, ламаються.", tags: ["гравій", "пісок", "обвал"] },
    { id: "shield-creeper", cat: "combat", lvl: 1, title: "Щит проти кріперів", text: "Тримай щит у другій руці (F) і натискай ПКМ, коли кріпер шипить. Щит також зупиняє стріли скелетів.", tags: ["щит", "кріпер", "захист"], recipe: "shield" },
    { id: "crit", cat: "combat", lvl: 2, title: "Критичні удари", text: "Удар під час падіння після стрибка завдає +50% шкоди (видно зірочки). Не бий під час бігу — спринт скасовує крит.", tags: ["крит", "меч", "шкода"] },
    { id: "cooldown", cat: "combat", lvl: 2, title: "Чекай перезарядку атаки", text: "Сила удару залежить від індикатора під прицілом. Часті кліки завдають мізерної шкоди — бий ритмічно, коли індикатор заповнений.", tags: ["атака", "кулдаун", "pvp"] },
    { id: "enderman", cat: "combat", lvl: 1, title: "Не дивись ендермену в очі", text: "Погляд провокує атаку. Гарбуз на голові повністю захищає. Втеча: під дах висотою 2 блоки або у воду — ендермени її бояться.", tags: ["ендермен", "гарбуз"] },
    { id: "warden", cat: "combat", lvl: 3, title: "Древнє місто: тихо!", text: "У Глибокій темряві крадься (Shift) — так ти не створюєш вібрацій. Вовна глушить звуки. З Варденом краще не битися: він має 500 HP.", tags: ["варден", "deep dark", "древнє місто"] },
    { id: "iron-door", cat: "base", lvl: 1, title: "Захисти двері", text: "На складності «Важко» зомбі ламають деревʼяні двері. Використай залізні двері з кнопкою або хвіртку в паркані.", tags: ["двері", "зомбі", "захист"], recipe: "door" },
    { id: "mending", cat: "base", lvl: 2, title: "Лагодження — топ-зачарування", text: "Mending ремонтує предмет досвідом, який ти збираєш. Його не можна отримати на столі зачарувань — лише в торгівлі, риболовлі чи скарбах.", tags: ["mending", "лагодження", "досвід"] },
    { id: "storage", cat: "base", lvl: 1, title: "Підписуй скрині", text: "Рамка з предметом на скрині — і одразу видно, де лежить залізо, а де їжа. Великі скрині = 54 слоти.", tags: ["скриня", "сховище", "рамка"], recipe: "chest" },
    { id: "villagers", cat: "farm", lvl: 2, title: "Торгуй із селянами", text: "Постав кафедру біля безробітного селянина — він стане бібліотекарем і продаватиме зачаровані книги (навіть Mending) за смарагди.", tags: ["селяни", "торгівля", "смарагди"] },
    { id: "bonemeal", cat: "farm", lvl: 1, title: "Кістяне борошно", text: "Миттєво прискорює ріст рослин і дерев. Беруть з кісток скелетів або з компостера, куди кидають зайві рослини.", tags: ["кістка", "компостер", "ріст"] },
    { id: "iron-farm", cat: "farm", lvl: 3, title: "Залізна ферма", text: "Кілька селян, які бачать зомбі, викликають залізних големів. Їх можна автоматично збирати лавою — нескінченне залізо.", tags: ["голем", "залізо", "автоферма"], recipe: "hopper" },
    { id: "portal", cat: "nether", lvl: 2, title: "Портал у Незер", text: "Рамка 4×5 з обсидіану (кути можна не ставити — вистачить 10 блоків). Запали кресалом. Обсидіан: вода на стоячу лаву + алмазна кирка.", tags: ["портал", "обсидіан"], recipe: "flint_and_steel" },
    { id: "piglins", cat: "nether", lvl: 2, title: "Золото проти піглінів", text: "Носи хоча б одну золоту частину броні — пігліни не нападуть. Кидай їм золоті злитки в обмін на перлини, вогнестійкість, обсидіан.", tags: ["пігліни", "золото", "бартер"] },
    { id: "beds-explode", cat: "nether", lvl: 2, title: "Ліжка в Незері вибухають", text: "Не намагайся спати в Незері чи Енді — ліжко вибухає сильніше за TNT. Досвідчені гравці використовують це для видобутку древніх уламків.", tags: ["ліжко", "вибух"], recipe: "bed" },
    { id: "debris", cat: "nether", lvl: 3, title: "Древні уламки на Y 15", text: "Найбільше на Y 8–22, особливо біля 15. 4 уламки + 4 золота = незеритовий злиток. Уламки не горять у лаві.", tags: ["незерит", "уламки", "ancient debris"] },
    { id: "fire-res", cat: "nether", lvl: 3, title: "Зілля вогнестійкості", text: "Незграбне зілля + магмовий крем = 3 хвилини імунітету до вогню й лави. Обовʼязково для походів у Незер.", tags: ["зілля", "лава", "вогонь"], recipe: "brewing_stand" },
    { id: "end-prep", cat: "end", lvl: 3, title: "Підготовка до дракона", text: "Броня з «Захистом», лук з «Безкінечністю», 2–3 стаки блоків, відро води, золоті яблука, гарбуз на голову (щоб не злити ендерменів).", tags: ["дракон", "екіпірування"], recipe: "golden_apple" },
    { id: "crystals", cat: "end", lvl: 3, title: "Спочатку — кристали Енду", text: "Вони лікують дракона. Розбий їх стрілами на вершинах обсидіанових колон. Ті, що в клітках, доведеться розбивати зблизька.", tags: ["кристали", "дракон", "лук"], recipe: "bow" },
    { id: "elytra", cat: "end", lvl: 3, title: "Елітри — у містах Енду", text: "Після перемоги кинь перлину в портал-шлюз — потрапиш на зовнішні острови. Елітри висять у кораблях біля міст Енду.", tags: ["елітри", "політ", "місто енду"] },
  ];

  // Гарячі клавіші Java Edition (за замовчуванням)
  const hotkeys = [
    { k: ["W", "A", "S", "D"], d: "Рух" },
    { k: ["Пробіл"], d: "Стрибок / плисти вгору" },
    { k: ["Shift"], d: "Присісти, крастися, не падати з краю" },
    { k: ["Ctrl"], d: "Біг (або двічі W)" },
    { k: ["E"], d: "Інвентар" },
    { k: ["Q"], d: "Викинути предмет" },
    { k: ["Ctrl", "Q"], d: "Викинути весь стос" },
    { k: ["F"], d: "Поміняти предмет між руками" },
    { k: ["1–9"], d: "Вибрати слот на панелі" },
    { k: ["СКМ"], d: "Взяти блок, на який дивишся (Pick Block)" },
    { k: ["T"], d: "Чат" },
    { k: ["/"], d: "Відкрити чат з командою" },
    { k: ["Tab"], d: "Список гравців" },
    { k: ["L"], d: "Досягнення" },
    { k: ["F1"], d: "Сховати інтерфейс (для скріншотів)" },
    { k: ["F2"], d: "Скріншот (папка screenshots)" },
    { k: ["F3"], d: "Екран налагодження: координати, FPS, біом" },
    { k: ["F3", "B"], d: "Показати хітбокси сутностей" },
    { k: ["F3", "G"], d: "Межі чанків" },
    { k: ["F3", "H"], d: "Розширені підказки (міцність, ID)" },
    { k: ["F3", "A"], d: "Перезавантажити чанки (якщо зник світ)" },
    { k: ["F3", "T"], d: "Перезавантажити ресурспаки" },
    { k: ["F3", "Esc"], d: "Пауза без меню" },
    { k: ["F5"], d: "Вид від 1-ї / 3-ї особи" },
    { k: ["F11"], d: "Повноекранний режим" },
    { k: ["Shift", "ЛКМ"], d: "Швидко перемістити стос в інвентарі" },
    { k: ["2× ЛКМ"], d: "Зібрати однакові предмети в один стос" },
    { k: ["ПКМ"], d: "В інвентарі: взяти половину стосу" },
  ];

  const firstDay = [
    "Нарубати 5+ колод",
    "Скрафтити верстак і палиці",
    "Деревʼяна кирка → добути камінь",
    "Камʼяні кирка, сокира, меч",
    "Знайти вугілля і зробити факели",
    "Добути їжу (тварини, яблука)",
    "Знайти 3 вовни для ліжка",
    "Побудувати укриття до ночі",
  ];

  const modCats = [
    { id: "perf", name: "Продуктивність" },
    { id: "graphics", name: "Графіка" },
    { id: "ui", name: "Інтерфейс" },
    { id: "maps", name: "Карти" },
    { id: "qol", name: "Зручність" },
    { id: "content", name: "Новий контент" },
  ];

  const modrinth = (q) => "https://modrinth.com/mods?q=" + encodeURIComponent(q);

  const mods = [
    { id: "sodium", name: "Sodium", cat: "perf", loaders: ["Fabric", "NeoForge"], desc: "Переписує рендеринг гри. FPS часто зростає в 2–3 рази, зникають лаги при обертанні камери.", must: true },
    { id: "lithium", name: "Lithium", cat: "perf", loaders: ["Fabric", "NeoForge"], desc: "Оптимізує фізику, ШІ мобів і тіки світу без зміни ванільної поведінки. Корисний і в одиночній грі." },
    { id: "ferritecore", name: "FerriteCore", cat: "perf", loaders: ["Fabric", "NeoForge", "Forge"], desc: "Зменшує використання оперативної памʼяті — особливо помітно у великих збірках." },
    { id: "entityculling", name: "Entity Culling", cat: "perf", loaders: ["Fabric", "NeoForge", "Forge"], desc: "Не рендерить мобів і скрині, які ти не бачиш за стінами. Плюс FPS на базах і фермах." },
    { id: "modernfix", name: "ModernFix", cat: "perf", loaders: ["Fabric", "NeoForge", "Forge"], desc: "Пришвидшує запуск гри й завантаження світу, лікує витоки памʼяті." },
    { id: "iris", name: "Iris Shaders", cat: "graphics", loaders: ["Fabric", "NeoForge"], desc: "Завантажувач шейдерів, сумісний з паками для OptiFine. Працює разом із Sodium — найкращий вибір для шейдерів.", must: true },
    { id: "optifine", name: "OptiFine", cat: "graphics", loaders: ["Окремий", "Forge"], desc: "Класика: шейдери, зум, зʼєднані текстури. Несумісний із Sodium і часто виходить пізніше за нові версії гри.", url: "https://optifine.net" },
    { id: "continuity", name: "Continuity", cat: "graphics", loaders: ["Fabric", "NeoForge"], desc: "Зʼєднані текстури (скло без рамок) для ресурспаків — замінник цієї функції OptiFine." },
    { id: "jei", name: "JEI (Just Enough Items)", cat: "ui", loaders: ["NeoForge", "Forge", "Fabric"], desc: "Перегляд усіх предметів і рецептів прямо в грі, включно з модами. Клавіша R — рецепт, U — де використовується." },
    { id: "emi", name: "EMI", cat: "ui", loaders: ["Fabric", "NeoForge", "Forge"], desc: "Сучасна альтернатива JEI: дерево крафту, «закладки» з потрібними ресурсами, автозаповнення верстака." },
    { id: "jade", name: "Jade", cat: "ui", loaders: ["Fabric", "NeoForge", "Forge"], desc: "Підказка вгорі екрана: що за блок чи моб перед тобою, з якого мода, скільки HP." },
    { id: "appleskin", name: "AppleSkin", cat: "ui", loaders: ["Fabric", "NeoForge", "Forge"], desc: "Показує насиченість і скільки голоду відновить їжа — легше вибрати, що зʼїсти." },
    { id: "modmenu", name: "Mod Menu", cat: "ui", loaders: ["Fabric"], desc: "Кнопка «Моди» в меню: список встановлених модів і їхні налаштування." },
    { id: "xaero", name: "Xaero's Minimap", cat: "maps", loaders: ["Fabric", "NeoForge", "Forge"], desc: "Мінімапа в куті екрана з мітками (waypoints) і точкою смерті. Додай Xaero's World Map для великої мапи." },
    { id: "journeymap", name: "JourneyMap", cat: "maps", loaders: ["Fabric", "NeoForge", "Forge"], desc: "Мапа в реальному часі, мітки, печерний режим і навіть веб-мапа у браузері." },
    { id: "mousetweaks", name: "Mouse Tweaks", cat: "qol", loaders: ["Fabric", "NeoForge", "Forge"], desc: "Перетягування предметів мишею з затиснутою кнопкою, прокрутка коліщатком між слотами." },
    { id: "ipn", name: "Inventory Profiles Next", cat: "qol", loaders: ["Fabric", "NeoForge", "Forge"], desc: "Сортування інвентарю та скринь однією клавішею, автозаміна зламаного інструмента." },
    { id: "zoomify", name: "Zoomify", cat: "qol", loaders: ["Fabric"], desc: "Плавний зум на клавішу C — як в OptiFine, але для Fabric." },
    { id: "create", name: "Create", cat: "content", loaders: ["NeoForge", "Fabric"], desc: "Шестерні, вали, конвеєри, механічні преси та потяги. Найкращий мод для автоматизації без «магічних» машин." },
    { id: "farmersdelight", name: "Farmer's Delight", cat: "content", loaders: ["NeoForge", "Forge", "Fabric"], desc: "Кухня, плита, ніж, десятки нових страв і культур. Вписується у ванільний стиль." },
    { id: "bop", name: "Biomes O' Plenty", cat: "content", loaders: ["NeoForge", "Fabric"], desc: "Десятки нових біомів, дерев і рослин — дослідження світу знову цікаве." },
    { id: "terralith", name: "Terralith", cat: "content", loaders: ["Fabric", "NeoForge", "Datapack"], desc: "95+ нових біомів лише з ванільних блоків. Можна грати навіть без модів — як датапак." },
    { id: "waystones", name: "Waystones", cat: "content", loaders: ["NeoForge", "Forge", "Fabric"], desc: "Камені-телепорти між відкритими місцями. Рятує від довгих переходів." },
    { id: "backpacks", name: "Sophisticated Backpacks", cat: "content", loaders: ["NeoForge", "Forge"], desc: "Рюкзаки з апгрейдами: автопідбір, сортування, переплавка на ходу." },
  ].map((m) => Object.assign({ url: modrinth(m.name) }, m));

  const shaderSearch = (q) => "https://modrinth.com/shaders?q=" + encodeURIComponent(q);

  // tier: 1 — слабкий ПК, 2 — середній, 3 — потужний. perf/look — 1..5
  const shaders = [
    { id: "makeup", name: "MakeUp – Ultra Fast", tier: 1, perf: 5, look: 3, style: "Ванільний+", desc: "Створений для слабких ПК і вбудованої графіки. Тіні, вода, небо — і при цьому стабільний FPS." },
    { id: "sildurs", name: "Sildur's Vibrant Shaders", tier: 1, perf: 4, look: 4, style: "Яскравий", desc: "Пресети від Lite до Extreme — підбирається під будь-яке залізо. Соковиті кольори й гарна вода." },
    { id: "chocapic", name: "Chocapic13's Shaders", tier: 1, perf: 4, look: 3, style: "Класичний", desc: "Легкий класичний шейдер із кількома профілями якості. Хороший перший шейдер." },
    { id: "complementary-r", name: "Complementary Reimagined", tier: 2, perf: 3, look: 5, style: "Ванільний+", desc: "Найпопулярніший вибір: зберігає дух Minecraft, але додає красиве світло, туман і воду. Безліч налаштувань.", must: true },
    { id: "complementary-u", name: "Complementary Unbound", tier: 2, perf: 3, look: 5, style: "Атмосферний", desc: "Брат Reimagined з більш стилізованими хмарами, світлом і насиченою атмосферою." },
    { id: "bsl", name: "BSL Shaders", tier: 2, perf: 3, look: 4, style: "Мʼякий", desc: "Класика з мʼякими тінями, обʼємними хмарами та теплими кольорами. Добре налаштовується." },
    { id: "photon", name: "Photon", tier: 3, perf: 2, look: 5, style: "Реалістичний", desc: "Фізично коректне небо, хмари й освітлення. Дуже гарні заходи сонця." },
    { id: "bliss", name: "Bliss", tier: 3, perf: 2, look: 5, style: "Кінематографічний", desc: "Насичені кольори, туман і обʼємне світло. Ідеально для скріншотів і відео." },
    { id: "rethinking-voxels", name: "Rethinking Voxels", tier: 3, perf: 2, look: 5, style: "Кольорове світло", desc: "Кольорове освітлення від блоків: лава світить помаранчевим, аметист — фіолетовим." },
    { id: "seus-ptgi", name: "SEUS PTGI", tier: 3, perf: 1, look: 5, style: "Трасування шляху", desc: "Глобальне освітлення з трасуванням шляху — майже як RTX. Потрібна потужна відеокарта.", url: "https://www.sonicether.com" },
  ].map((s) => Object.assign({ url: shaderSearch(s.name) }, s));

  const tiers = [
    { id: 1, name: "Слабкий ПК", hint: "Вбудована графіка, старі ноутбуки" },
    { id: 2, name: "Середній ПК", hint: "Рівня GTX 1060 / RX 580 і новіші" },
    { id: 3, name: "Потужний ПК", hint: "Рівня RTX 3060 і вище" },
  ];

  // Підбір збірки
  const buildGoals = [
    { id: "fps", name: "Більше FPS", mods: ["sodium", "lithium", "ferritecore", "entityculling", "modernfix"] },
    { id: "beauty", name: "Красива картинка", mods: ["sodium", "iris", "continuity"] },
    { id: "comfort", name: "Зручність", mods: ["sodium", "emi", "jade", "appleskin", "mousetweaks", "xaero"] },
    { id: "content", name: "Нові пригоди", mods: ["sodium", "create", "farmersdelight", "terralith", "waystones", "jei"] },
  ];

  const shaderByTier = { 1: ["makeup", "sildurs"], 2: ["complementary-r", "bsl"], 3: ["photon", "bliss"] };

  window.MC = { items, recipeCats, recipes, tipCats, tips, LV, hotkeys, firstDay, modCats, mods, shaders, tiers, buildGoals, shaderByTier };
})();
