/* Генератор піксельних іконок 16×16.
 * Кожна іконка малюється в canvas з ASCII-шаблону або процедурної текстури
 * і кешується як data URL. Жодних зовнішніх зображень. */
(function () {
  "use strict";

  // Глобальні кольори, доступні в усіх шаблонах
  const GLOBAL = {
    h: "#8a6a3a", H: "#5e4524", k: "#1b1b1b", w: "#f6f6f6", y: "#ffd84a",
    o: "#ff8a1e", r: "#d23a2a", g: "#7d7d7d", s: "#cfcfcf", p: "#b8945a",
    P: "#8f6f3e", G: "#3f8f3a", z: "#7ccf4a", B: "#3a5aa8", d: "#4a4a4a",
    D: "#4fe3d4", v: "#7a3fb0",
  };

  // ASCII-шаблони. a/b/c — основний/темний/світлий колір предмета, f — додатковий.
  const ART = {
    pickaxe: [
      "................",
      "....cccccccc....",
      "...caaaaaaaab...",
      "..cab..hH..bab..",
      "..ab...hH...ba..",
      ".......hH.......",
      ".......hH.......",
      ".......hH.......",
      ".......hH.......",
      ".......hH.......",
      ".......hH.......",
      ".......hH.......",
      ".......hH.......",
      ".......HH.......",
    ],
    sword: [
      ".......cc.......",
      "......caab......",
      "......caab......",
      "......caab......",
      "......caab......",
      "......caab......",
      "......caab......",
      "......caab......",
      "......caab......",
      "......caab......",
      "....bbbbbbbb....",
      ".......hH.......",
      ".......hH.......",
      ".......hH.......",
      "......bhHb......",
    ],
    axe: [
      "................",
      ".......hH.......",
      "...caaahH.......",
      "..caaaahH.......",
      "..caaaahH.......",
      "..cabbbhH.......",
      "...b...hH.......",
      ".......hH.......",
      ".......hH.......",
      ".......hH.......",
      ".......hH.......",
      ".......hH.......",
      ".......hH.......",
      ".......HH.......",
    ],
    shovel: [
      "................",
      "......caab......",
      ".....caaaab.....",
      ".....caaaab.....",
      ".....caaaab.....",
      "......cabb......",
      ".......hH.......",
      ".......hH.......",
      ".......hH.......",
      ".......hH.......",
      ".......hH.......",
      ".......hH.......",
      ".......hH.......",
      ".......HH.......",
    ],
    ingot: [
      "................", "................", "................", "................",
      "................",
      ".....cccccc.....",
      "....caaaaaab....",
      "...caaaaaaaab...",
      "..caaaaaaaaaab..",
      "..bbbbbbbbbbbb..",
    ],
    gem: [
      "................", "................",
      ".....cccccc.....",
      "....caaaaaab....",
      "...caacaaaaab...",
      "..caacaaaaaaab..",
      "...baaaaaaaab...",
      "....baaaaaab....",
      ".....baaaab.....",
      "......baab......",
      ".......bb.......",
    ],
    stick: [
      "................", "................", "................",
      "............ab..",
      "...........ab...",
      "..........ab....",
      ".........ab.....",
      "........ab......",
      ".......ab.......",
      "......ab........",
      ".....ab.........",
      "....ab..........",
      "...ab...........",
    ],
    lump: [
      "................", "................", "................",
      ".....ccccc......",
      "....caaaaab.....",
      "...caaabaaab....",
      "...caaaaaaab....",
      "..caabaaaaaab...",
      "..caaaaaabaab...",
      "..caaaaaaaaab...",
      "...baaaaaaab....",
      "....bbbbbbb.....",
    ],
    dust: [
      "................", "................", "................", "................",
      "................", "................", "................",
      ".......c........",
      "......cab.......",
      ".....caaab..c...",
      "....caaaaab.ab..",
      "...caaaaaaab....",
      "..caaaaaaaaab...",
      "..bbbbbbbbbbb...",
    ],
    string: [
      "................", "................",
      "............aa..",
      "...........a..a.",
      "..........a.....",
      ".........a......",
      "....aa..a.......",
      "...a..aa........",
      "..a.............",
      "..a.............",
      "...a............",
      "....aa..........",
    ],
    feather: [
      "................",
      "............cw..",
      "...........cww..",
      "..........caw...",
      ".........caww...",
      "........caww....",
      ".......caww.....",
      "......caww......",
      ".....caww.......",
      "....caww........",
      "...caw..........",
      "..ab............",
      ".b..............",
    ],
    wheat: [
      "................",
      "....c..c..c.....",
      "...cac.cac.ca...",
      "....ca.ca..ca...",
      "...cab.cab.cab..",
      "....ab..ab..ab..",
      ".....b..b...b...",
      ".....b..b..b....",
      "......b.b.b.....",
      ".......bbb......",
      ".......bbb......",
      "......b.b.b.....",
      ".....b..b..b....",
    ],
    cane: [
      ".....ca...ca....",
      ".....ca...ca....",
      ".....bb...bb.c..",
      ".....ca...cacab.",
      "....cca...ca.b..",
      ".....ca...bb....",
      ".....bb...ca....",
      ".....ca...ca....",
      ".....ca...ca....",
      ".....ca...bb....",
      ".....ca...ca....",
      ".....bb...ca....",
      ".....ca...ca....",
    ],
    sheet: [
      "................",
      "...cccccccccc...",
      "...caaaaaaaab...",
      "...cabbbbbbab...",
      "...caaaaaaaab...",
      "...cabbbbbbab...",
      "...caaaaaaaab...",
      "...cabbbbbbab...",
      "...caaaaaaaab...",
      "...cabbbbbbab...",
      "...caaaaaaaab...",
      "...bbbbbbbbbb...",
    ],
    hide: [
      "................",
      "....cc....cc....",
      "...caaccccaab...",
      "...caaaaaaaab...",
      "....caaaaaab....",
      "....caaaaaab....",
      "...caaaaaaaab...",
      "...caaaaaaaab...",
      "....caaaaaab....",
      ".....bbbbbb.....",
    ],
    book: [
      "................",
      "....bbbbbbbbb...",
      "...baaaaaaaab...",
      "..baaaaaaaabf...",
      "..baacccaaabf...",
      "..baaaaaaaabf...",
      "..baaaaaaaabf...",
      "..baaaaaaaabf...",
      "..baaaaaaaabf...",
      "..bbbbbbbbbff...",
      "...fffffffff....",
    ],
    bucket: [
      "................", "................", "................",
      "..bbbbbbbbbbbb..",
      "..bffffffffffb..",
      "..baffffffffab..",
      "...baaaaaaaab...",
      "...caaaaaaaab...",
      "...caaaaaaaab...",
      "....caaaaaab....",
      "....caaaaaab....",
      ".....bbbbbb.....",
    ],
    nugget: [
      "................", "................", "................", "................",
      ".....cc.........",
      "....caab........",
      "....aabb..cc....",
      ".....bb..caab...",
      ".........aabb...",
      "......cc..bb....",
      ".....caab.......",
      ".....aabb.......",
      "......bb........",
    ],
    torch: [
      "................", "................",
      ".......oo.......",
      "......oyyo......",
      "......oyyo......",
      ".......hH.......",
      ".......hH.......",
      ".......hH.......",
      ".......hH.......",
      ".......hH.......",
      ".......hH.......",
      ".......HH.......",
    ],
    chestplate: [
      "................",
      "..aaa......aaa..",
      "..caab....caab..",
      "..caaabbbbaaab..",
      "..caaaaaaaaaab..",
      "...caaaaaaaab...",
      "...caaaaaaaab...",
      "...caaaaaaaab...",
      "...caaaaaaaab...",
      "...caaaaaaaab...",
      "...cbbbbbbbbb...",
    ],
    helmet: [
      "................", "................", "................",
      "....cccccccc....",
      "...caaaaaaaab...",
      "..caaaaaaaaaab..",
      "..caab....caab..",
      "..cab......cab..",
      "..bb........bb..",
    ],
    leggings: [
      "................",
      "..cccccccccccc..",
      "..caaaaaaaaaab..",
      "..caaaaaaaaaab..",
      "..caaab..caaab..",
      "..caaab..caaab..",
      "..caaab..caaab..",
      "..caaab..caaab..",
      "..caaab..caaab..",
      "..caaab..caaab..",
      "..cbbbb..cbbbb..",
    ],
    boots: [
      "................", "................", "................", "................",
      "...caab..caab...",
      "...caab..caab...",
      "...caab..caab...",
      "...caab..caab...",
      "..caaab..caaab..",
      "..caaab..caaab..",
      "..bbbbb..bbbbb..",
    ],
    bow: [
      "................",
      "..........hhw...",
      "........hhH.w...",
      ".......hH...w...",
      "......hH....w...",
      ".....hH.....w...",
      ".....h......w...",
      "....hH......w...",
      ".....h......w...",
      ".....hH.....w...",
      "......hH....w...",
      ".......hH...w...",
      "........hhH.w...",
      "..........hhw...",
    ],
    arrow: [
      "................",
      "............ggg.",
      "............ggg.",
      "...........hgg..",
      "..........h.....",
      ".........h......",
      "........h.......",
      ".......h........",
      "......h.........",
      "..w..h..........",
      "..wwh...........",
      "...ww...........",
      "..ww.w..........",
    ],
    shield: [
      "................",
      "..ssssssssssss..",
      "..spppPpppPpps..",
      "..spppPpppPpps..",
      "..sppppsspppps..",
      "..spppsggspPps..",
      "..sppppsspppps..",
      "...sppPpppPps...",
      "...sppPpppPps...",
      "....spPpppPs....",
      ".....spppps.....",
      "......ssss......",
    ],
    shears: [
      "................", "................",
      "....ca....ca....",
      "....cab..cab....",
      ".....cab.ab.....",
      ".....cab.ab.....",
      "......caab......",
      ".......kk.......",
      "......rr.rr.....",
      ".....r..r..r....",
      ".....r..r..r....",
      "......rr..rr....",
    ],
    flintsteel: [
      "................", "................",
      "...ssss.........",
      "..s....s........",
      "..s....s........",
      "...s..s.........",
      "....ss..........",
      ".........kkk....",
      "........kgggk...",
      ".......kgggggk..",
      ".......kgggggk..",
      "........kgggk...",
      ".........kkk....",
    ],
    bed: [
      "................", "................", "................", "................",
      "................", "................",
      ".wwwwcccccccccc.",
      ".wwwwaaaaaaaaaa.",
      ".wwwwbbbbbbbbbb.",
      ".pppppppppppppp.",
      ".pPPPPPPPPPPPPp.",
      ".pP..........Pp.",
    ],
    ladder: [
      "..hH........hH..",
      "..hHhhhhhhhhhH..",
      "..hH........hH..",
      "..hH........hH..",
      "..hHhhhhhhhhhH..",
      "..hH........hH..",
      "..hH........hH..",
      "..hHhhhhhhhhhH..",
      "..hH........hH..",
      "..hH........hH..",
      "..hHhhhhhhhhhH..",
      "..hH........hH..",
      "..hH........hH..",
      "..hHhhhhhhhhhH..",
      "..hH........hH..",
    ],
    door: [
      "...PPPPPPPPPP...",
      "...PppppppppP...",
      "...Pp..pp..pP...",
      "...Pp..pp..pP...",
      "...PppppppppP...",
      "...PppppppppP...",
      "...PpPPPPPPpP...",
      "...PppppppppP...",
      "...PppppppkpP...",
      "...PppppppkpP...",
      "...PppppppppP...",
      "...PpPPPPPPpP...",
      "...PppppppppP...",
      "...PppppppppP...",
      "...PPPPPPPPPP...",
    ],
    rail: [
      "..ss........ss..",
      ".hssHHHHHHHHssh.",
      "..ss........ss..",
      "..ss........ss..",
      ".hssHHHHHHHHssh.",
      "..ss........ss..",
      "..ss........ss..",
      ".hssHHHHHHHHssh.",
      "..ss........ss..",
      "..ss........ss..",
      ".hssHHHHHHHHssh.",
      "..ss........ss..",
      "..ss........ss..",
      ".hssHHHHHHHHssh.",
      "..ss........ss..",
    ],
    minecart: [
      "................", "................", "................", "................",
      "..g..........g..",
      "..gssssssssssg..",
      "..gddddddddddg..",
      "..gssssssssssg..",
      "..gssssssssssg..",
      "...gssssssssg...",
      "...gggggggggg...",
      "....kk....kk....",
    ],
    boat: [
      "................", "................", "................", "................",
      "................",
      ".p............p.",
      ".Pp..........pP.",
      ".Pp..P....P..pP.",
      ".PppppppppppppP.",
      "..PppppppppppP..",
      "...PPPPPPPPPP...",
    ],
    fence: [
      "................",
      "..pP........pP..",
      "..pP........pP..",
      "..pPpppppppppP..",
      "..pPPPPPPPPPpP..",
      "..pP........pP..",
      "..pP........pP..",
      "..pPpppppppppP..",
      "..pPPPPPPPPPpP..",
      "..pP........pP..",
      "..pP........pP..",
      "..pP........pP..",
      "..PP........PP..",
    ],
    rod: [
      "................",
      "............hh..",
      "...........hH.w.",
      "..........hH..w.",
      ".........hH...w.",
      "........hH....w.",
      ".......hH.....w.",
      "......hH......w.",
      ".....hH.......w.",
      "....hH.......sws",
      "...hH.........s.",
      "..hH............",
      ".HH.............",
    ],
    brewing: [
      "................",
      ".......yy.......",
      ".......oo.......",
      ".......oo.......",
      ".......oo.......",
      "...BB..oo..rr...",
      "..BwwB.oo.rwwr..",
      "..BBBB.oo.rrrr..",
      ".......oo.......",
      "..gggggggggggg..",
      "..gddddddddddg..",
      "..gggggggggggg..",
    ],
    lantern: [
      "................",
      ".......kk.......",
      "......k..k......",
      "......kkkk......",
      ".....kddddk.....",
      ".....kyoyyk.....",
      ".....kyyoyk.....",
      ".....kyoyyk.....",
      ".....kyyyyk.....",
      ".....kddddk.....",
      "......kkkk......",
    ],
    hopper: [
      "................",
      "..dddddddddddd..",
      "..dkkkkkkkkkkd..",
      "..dkkkkkkkkkkd..",
      "..dddddddddddd..",
      "....dddddddd....",
      "....dgggggdd....",
      ".....dgggdd.....",
      "......dddd......",
      ".......dd.......",
      ".......dd.......",
    ],
    anvil: [
      "................", "................", "................",
      "..dgggggggggggd.",
      "..ggggggggggggg.",
      "...ggggggggggg..",
      "......ggggg.....",
      "......ggggg.....",
      ".....ggggggg....",
      "....dgggggggd...",
      "....ddddddddd...",
    ],
    bread: [
      "................", "................", "................", "................",
      ".....cccccc.....",
      "...ccaaaaaacc...",
      "..caacaacaacab..",
      "..caaaaaaaaaab..",
      "..baaaaaaaaaab..",
      "...bbbbbbbbbb...",
    ],
    cake: [
      "................", "................", "................", "................",
      "..wwwwwwwwwwww..",
      "..wrwwwwwrwwww..",
      "..wwwwwwwwwwrw..",
      "..wwwwwwwwwwww..",
      "..waawwaawwaww..",
      "..aaaaaaaaaaaa..",
      "..caaaaaaaaaab..",
      "..caaaaaaaaaab..",
      "..bbbbbbbbbbbb..",
    ],
    apple: [
      "................",
      ".......H........",
      "........HG......",
      ".......HGG......",
      "....caa.aaab....",
      "...caaaaaaaab...",
      "..cwaaaaaaaaab..",
      "..cwaaaaaaaaab..",
      "..caaaaaaaaaab..",
      "..caaaaaaaaaab..",
      "...caaaaaaaab...",
      "....baabbaab....",
    ],
  };

  function pad(rows) {
    const out = [];
    const top = Math.max(0, Math.floor((16 - rows.length) / 2));
    for (let y = 0; y < 16; y++) {
      const src = rows[y - top] || "";
      out.push(src.padEnd(16, ".").slice(0, 16));
    }
    return out;
  }

  function rng(seed) {
    let s = 2166136261;
    for (const ch of seed) s = Math.imul(s ^ ch.charCodeAt(0), 16777619) >>> 0;
    return () => {
      s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  // ---- процедурні текстури ----
  function noise(seed, pa = 0.55, pc = 0.22) {
    const rand = rng(seed);
    const rows = [];
    for (let y = 0; y < 16; y++) {
      let row = "";
      for (let x = 0; x < 16; x++) {
        const r = rand();
        row += r < pa ? "a" : r < pa + pc ? "c" : "b";
      }
      rows.push(row);
    }
    return rows;
  }

  function stoneTex(seed) {
    const rows = noise(seed, 0.5, 0.25).map((r) => r.split(""));
    const rand = rng(seed + "seam");
    // темні "шви" між каменями
    for (let i = 0; i < 7; i++) {
      const x = Math.floor(rand() * 14), y = Math.floor(rand() * 14);
      const horiz = rand() > 0.5;
      for (let j = 0; j < 4; j++) {
        const xx = horiz ? Math.min(15, x + j) : x, yy = horiz ? y : Math.min(15, y + j);
        rows[yy][xx] = "b";
      }
    }
    return rows.map((r) => r.join(""));
  }

  function planksTex(seed) {
    const rand = rng(seed);
    const rows = [];
    for (let y = 0; y < 16; y++) {
      const band = y % 4, plank = Math.floor(y / 4);
      const seam = (plank * 7 + 3) % 16;
      let row = "";
      for (let x = 0; x < 16; x++) {
        if (band === 3) row += "b";
        else if (x === seam && band !== 3) row += "b";
        else if (band === 0) row += rand() < 0.7 ? "c" : "a";
        else row += rand() < 0.1 ? "b" : "a";
      }
      rows.push(row);
    }
    return rows;
  }

  function logTex(seed) {
    const rand = rng(seed);
    const rows = [];
    for (let y = 0; y < 16; y++) {
      let row = "";
      for (let x = 0; x < 16; x++) {
        if (x % 4 === 0) row += rand() < 0.8 ? "b" : "a";
        else row += rand() < 0.25 ? "c" : rand() < 0.15 ? "b" : "a";
      }
      rows.push(row);
    }
    return rows;
  }

  function woolTex(seed) {
    const rand = rng(seed);
    const rows = [];
    for (let y = 0; y < 16; y++) {
      let row = "";
      for (let x = 0; x < 16; x++) {
        const wave = (x + y * 2) % 5 === 0;
        row += wave ? "b" : rand() < 0.2 ? "c" : "a";
      }
      rows.push(row);
    }
    return rows;
  }

  function metalTex(seed) {
    const rand = rng(seed);
    const rows = [];
    for (let y = 0; y < 16; y++) {
      let row = "";
      for (let x = 0; x < 16; x++) {
        if (y === 15 || x === 15) row += "b";
        else if (y === 0 || x === 0) row += "c";
        else row += rand() < 0.08 ? "b" : rand() < 0.08 ? "c" : "a";
      }
      rows.push(row);
    }
    return rows;
  }

  function grassSide(seed) {
    const rand = rng(seed);
    const depth = Array.from({ length: 16 }, () => 2 + Math.floor(rand() * 4));
    const rows = noise(seed, 0.55, 0.2).map((r) => r.split(""));
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < depth[x]; y++) rows[y][x] = rand() < 0.3 ? "z" : "f";
      rows[depth[x]][x] = "G";
    }
    return rows.map((r) => r.join(""));
  }

  function grassTop(seed) {
    return noise(seed, 0.5, 0.25).map((r) => r.replace(/a/g, "f").replace(/c/g, "z").replace(/b/g, "G"));
  }

  function overlay(base, over) {
    return base.map((row, y) => {
      const o = (over[y] || "").padEnd(16, ".");
      let out = "";
      for (let x = 0; x < 16; x++) out += o[x] !== "." ? o[x] : row[x];
      return out;
    });
  }

  const OVERLAYS = {
    craftingtable: [
      "HHHHHHHHHHHHHHHH",
      "HpppHppppHpppppH",
      "HHHHHHHHHHHHHHHH",
      "H..............H",
      "H.ss.......hH..H",
      "H.sss......hH..H",
      "H..hH..........H",
      "H..hH....dd....H",
      "H..hH...dddd...H",
      "H.........hH...H",
      "H.........hH...H",
      "H..............H",
      "H..............H",
      "H..............H",
      "H..............H",
      "HHHHHHHHHHHHHHHH",
    ],
    furnace: [
      "dddddddddddddddd",
      "d..............d",
      "d..............d",
      "d...kkkkkkkk...d",
      "d...kddddddk...d",
      "d...kkkkkkkk...d",
      "d..............d",
      "d..............d",
      "d...kkkkkkkk...d",
      "d...kooyyook...d",
      "d...koyyyyok...d",
      "d...kkkkkkkk...d",
      "d..............d",
      "d..............d",
      "d..............d",
      "dddddddddddddddd",
    ],
    chest: [
      "kkkkkkkkkkkkkkkk",
      "k..............k",
      "k..............k",
      "k..............k",
      "k..............k",
      "kkkkkkksskkkkkkk",
      "k......sks.....k",
      "k......sss.....k",
      "k..............k",
      "k..............k",
      "k..............k",
      "k..............k",
      "k..............k",
      "k..............k",
      "k..............k",
      "kkkkkkkkkkkkkkkk",
    ],
    piston: [
      "pppppppppppppppp",
      "pPPPPPPPPPPPPPPp",
      "pppppppppppppppp",
      "PPPPPPPPPPPPPPPP",
      "................",
      "................",
      "......ssss......",
      "......sggs......",
      "......sggs......",
      "......ssss......",
    ],
    enchanting: [
      "rrrrrrrrrrrrrrrr",
      "ryyyyyyyyyyyyyyr",
      "rrrrrrrrrrrrrrrr",
      "yyyyyyyyyyyyyyyy",
      ".D............D.",
      "DDD..........DDD",
      ".D............D.",
    ],
  };

  function bookshelf(seed) {
    const rand = rng(seed);
    const base = planksTex(seed);
    const spines = ["r", "B", "G", "y", "o", "w", "v"];
    return base.map((row, y) => {
      if ((y >= 3 && y <= 6) || (y >= 10 && y <= 13)) {
        let out = "";
        const half = y < 8 ? 0 : 1;
        for (let x = 0; x < 16; x++) {
          if (x === 0 || x === 15) { out += "b"; continue; }
          const col = Math.floor((x + half) / 2);
          const r = rng(seed + col + "-" + half)();
          const tall = r > 0.25 || y >= (half ? 11 : 4);
          out += tall ? spines[Math.floor(r * 100) % spines.length] : "k";
        }
        return out;
      }
      if (y === 2 || y === 7 || y === 9 || y === 14) return "b".repeat(16);
      return row;
    });
  }

  function tnt(seed) {
    const base = noise(seed, 0.6, 0.2);
    return base.map((row, y) => {
      if (y >= 5 && y <= 10) {
        if (y === 7 || y === 8) return "wwkwwkwkwkwwkwww";
        return "w".repeat(16);
      }
      if (y === 0 || y === 15) return "b".repeat(16);
      return row;
    });
  }

  function dial(needle) {
    const rows = [];
    for (let y = 0; y < 16; y++) {
      let row = "";
      for (let x = 0; x < 16; x++) {
        const dx = x - 7.5, dy = y - 7.5, d = Math.sqrt(dx * dx + dy * dy);
        if (d > 6.8) row += ".";
        else if (d > 5.6) row += dx + dy < 0 ? "c" : "b";
        else row += "f";
      }
      rows.push(row.split(""));
    }
    // стрілка
    [[7, 4], [8, 4], [7, 5], [8, 5], [7, 6], [8, 6]].forEach(([x, y]) => (rows[y][x] = needle));
    [[7, 7], [8, 7], [7, 8], [8, 8]].forEach(([x, y]) => (rows[y][x] = "k"));
    [[7, 9], [8, 9], [7, 10], [8, 10]].forEach(([x, y]) => (rows[y][x] = needle === "r" ? "d" : "k"));
    return rows.map((r) => r.join(""));
  }

  function ball(withPupil) {
    const rows = [];
    for (let y = 0; y < 16; y++) {
      let row = "";
      for (let x = 0; x < 16; x++) {
        const dx = x - 7.5, dy = y - 8, d = Math.sqrt(dx * dx + dy * dy * 1.15);
        if (d > 6) row += ".";
        else if (dx + dy < -5) row += "c";
        else if (d > 4.6 && dx + dy > 2) row += "b";
        else row += "a";
      }
      rows.push(row);
    }
    if (withPupil) {
      rows[7] = rows[7].slice(0, 6) + "kkkk" + rows[7].slice(10);
      rows[8] = rows[8].slice(0, 6) + "kkkk" + rows[8].slice(10);
      rows[9] = rows[9].slice(0, 7) + "kk" + rows[9].slice(9);
    }
    return rows;
  }

  function shapeRows(shape, seed) {
    switch (shape) {
      case "stone": return stoneTex(seed);
      case "planks": return planksTex(seed);
      case "log": return logTex(seed);
      case "wool": return woolTex(seed);
      case "metalblock": return metalTex(seed);
      case "sandblock": return noise(seed, 0.5, 0.3);
      case "dirt": return noise(seed, 0.55, 0.2);
      case "grassside": return grassSide(seed);
      case "grasstop": return grassTop(seed);
      case "craftingtable": return overlay(planksTex(seed), OVERLAYS.craftingtable);
      case "furnace": return overlay(stoneTex(seed), OVERLAYS.furnace);
      case "chest": return overlay(planksTex(seed), OVERLAYS.chest);
      case "piston": return overlay(stoneTex(seed), OVERLAYS.piston);
      case "enchanting": return overlay(stoneTex(seed), OVERLAYS.enchanting);
      case "bookshelf": return bookshelf(seed);
      case "tnt": return tnt(seed);
      case "compass": return dial("r");
      case "clock": return dial("k");
      case "ball": return ball(false);
      case "eye": return ball(true);
      default: return pad(ART[shape] || ART.lump);
    }
  }

  const cache = new Map();

  function render(key, def, scale) {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 16 * scale;
    const ctx = canvas.getContext("2d");
    const [, , shape, a, b, c, f] = def;
    const pal = Object.assign({}, GLOBAL, { a, b, c, f: f || c });
    const rows = shapeRows(shape, key);
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        const ch = rows[y][x];
        if (ch === "." || !pal[ch]) continue;
        ctx.fillStyle = pal[ch];
        ctx.fillRect(x * scale, y * scale, scale, scale);
      }
    }
    return canvas.toDataURL("image/png");
  }

  const EXTRA = {
    _grasstop: ["", "", "grasstop", "#6aa84f", "#3f7a2a", "#8bd162", "#5fae3a"],
    _grassside: ["", "", "grassside", "#8a5d3b", "#5e3d24", "#a8784f", "#5fae3a"],
    _dirt: ["", "", "dirt", "#8a5d3b", "#5e3d24", "#a8784f"],
    _stone: ["", "", "stone", "#8a8a8a", "#5e5e5e", "#acacac"],
  };

  window.MCIcons = {
    get(key, scale = 4) {
      const ck = key + "@" + scale;
      if (cache.has(ck)) return cache.get(ck);
      const def = (window.MC && window.MC.items[key]) || EXTRA[key];
      if (!def) return "";
      const url = render(key, def, scale);
      cache.set(ck, url);
      return url;
    },
  };
})();
