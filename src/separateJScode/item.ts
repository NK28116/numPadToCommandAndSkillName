// items.js
/**
* このJSON構造は、リモコンのボタン構成に関する情報を提供しています。各ボタンはIDによって識別され、追加のプロパティにはsign、element、css_classes、use、meaningful_on_singleが含まれます。各プロパティが表す内容は次のとおりです。
 *
 * - id: 各ボタンの一意の識別子。
 * - sign: ボタンの略記号（適用される場合）。
 * - element: ボタンのSVG要素。
 * - css_classes: ボタンに関連付けられたCSSクラス。
 * - use: このボタンが単一の押下で意味のあるボタンを示す配列。
 * - meaningful_on_single: ボタン押下が単一の押下で意味のあるかどうかを示します。
 *
 * このデータ構造を使用して、フロントエンドで提供された構成に基づいてリモコンインターフェースを動的に生成できます。
*/
var items_array = [
  {
    "id" : "btn-back",
    "sign" : null,
    "element" : "\t\t<rect id='btn-back' x='1' y='1' width='38' height='38' rx='8' ry='8' class='btn-back'/>\n",
    "css_classes" : ["btn-back"],
    "use" : null,
    "meaningful_on_single" : false
  },{
    "id" : "lp",
    "sign" : "lp",
    "element" :
      "\t\t<g id='lp'>\n"
       +"\t\t\t<use xlink:href='#btn-back'/>\n"
       +"\t\t\t<circle cx='10' cy='13' r='7' class='btn-push'/>\n"
       +"\t\t\t<circle cx='27' cy='10' r='7' class='btn-not-use'/>\n"
       +"\t\t\t<circle cx='13' cy='30' r='7' class='btn-not-use'/>\n"
       +"\t\t\t<circle cx='30' cy='27' r='7' class='btn-not-use'/>\n"
      +"\t\t</g>\n",
    "css_classes" : ["btn-push","btn-not-use"],
    "use" : ["btn-back"],
    "meaningful_on_single" : true
  },{
    "id" : "rp",
    "sign" : "rp",
    "element" :
      "\t\t<g id='rp'>\n"
       +"\t\t\t<use xlink:href='#btn-back'/>\n"
       +"\t\t\t<circle cx='10' cy='13' r='7' class='btn-not-use'/>\n"
       +"\t\t\t<circle cx='27' cy='10' r='7' class='btn-push'/>\n"
       +"\t\t\t<circle cx='13' cy='30' r='7' class='btn-not-use'/>\n"
       +"\t\t\t<circle cx='30' cy='27' r='7' class='btn-not-use'/>\n"
      +"\t\t</g>\n",
    "css_classes" : ["btn-push","btn-not-use"],
    "use" : ["btn-back"],
    "meaningful_on_single" : true
  },{
    "id" : "lk",
    "sign" : "lk",
    "element" :
      "\t\t<g id='lk'>\n"
       +"\t\t\t<use xlink:href='#btn-back'/>\n"
       +"\t\t\t<circle cx='10' cy='13' r='7' class='btn-not-use'/>\n"
       +"\t\t\t<circle cx='27' cy='10' r='7' class='btn-not-use'/>\n"
       +"\t\t\t<circle cx='13' cy='30' r='7' class='btn-push'/>\n"
       +"\t\t\t<circle cx='30' cy='27' r='7' class='btn-not-use'/>\n"
      +"\t\t</g>\n",
    "css_classes" : ["btn-push","btn-not-use"],
    "use" : ["btn-back"],
    "meaningful_on_single" : true
  },{
    "id" : "rk",
    "sign" : "rk",
    "element" :
      "\t\t<g id='rk'>\n"
       +"\t\t\t<use xlink:href='#btn-back'/>\n"
       +"\t\t\t<circle cx='10' cy='13' r='7' class='btn-not-use'/>\n"
       +"\t\t\t<circle cx='27' cy='10' r='7' class='btn-not-use'/>\n"
       +"\t\t\t<circle cx='13' cy='30' r='7' class='btn-not-use'/>\n"
       +"\t\t\t<circle cx='30' cy='27' r='7' class='btn-push'/>\n"
      +"\t\t</g>\n",
    "css_classes" : ["btn-push","btn-not-use"],
    "use" : ["btn-back"],
    "meaningful_on_single" : true
  },{
    "id" : "wp",
    "sign" : "wp",
    "element" :
      "\t\t<g id='wp'>\n"
       +"\t\t\t<use xlink:href='#btn-back'/>\n"
       +"\t\t\t<circle cx='10' cy='13' r='7' class='btn-push'/>\n"
       +"\t\t\t<circle cx='27' cy='10' r='7' class='btn-push'/>\n"
       +"\t\t\t<circle cx='13' cy='30' r='7' class='btn-not-use'/>\n"
       +"\t\t\t<circle cx='30' cy='27' r='7' class='btn-not-use'/>\n"
      +"\t\t</g>\n",
    "css_classes" : ["btn-push","btn-not-use"],
    "use" : ["btn-back"],
    "meaningful_on_single" : true
  },{
    "id" : "wk",
    "sign" : "wk",
    "element" :
      "\t\t<g id='wk'>\n"
       +"\t\t\t<use xlink:href='#btn-back'/>\n"
       +"\t\t\t<circle cx='10' cy='13' r='7' class='btn-not-use'/>\n"
       +"\t\t\t<circle cx='27' cy='10' r='7' class='btn-not-use'/>\n"
       +"\t\t\t<circle cx='13' cy='30' r='7' class='btn-push'/>\n"
       +"\t\t\t<circle cx='30' cy='27' r='7' class='btn-push'/>\n"
      +"\t\t</g>\n",
    "css_classes" : ["btn-push","btn-not-use"],
    "use" : ["btn-back"],
    "meaningful_on_single" : true
  },{
    "id" : "wl",
    "sign" : "wl",
    "element" :
      "\t\t<g id='wl'>\n"
       +"\t\t\t<use xlink:href='#btn-back'/>\n"
       +"\t\t\t<circle cx='10' cy='13' r='7' class='btn-push'/>\n"
       +"\t\t\t<circle cx='27' cy='10' r='7' class='btn-not-use'/>\n"
       +"\t\t\t<circle cx='13' cy='30' r='7' class='btn-push'/>\n"
       +"\t\t\t<circle cx='30' cy='27' r='7' class='btn-not-use'/>\n"
      +"\t\t</g>\n",
    "css_classes" : ["btn-push","btn-not-use"],
    "use" : ["btn-back"],
    "meaningful_on_single" : true
  },{
    "id" : "wr",
    "sign" : "wr",
    "element" :
      "\t\t<g id='wr'>\n"
       +"\t\t\t<use xlink:href='#btn-back'/>\n"
       +"\t\t\t<circle cx='10' cy='13' r='7' class='btn-not-use'/>\n"
       +"\t\t\t<circle cx='27' cy='10' r='7' class='btn-push'/>\n"
       +"\t\t\t<circle cx='13' cy='30' r='7' class='btn-not-use'/>\n"
       +"\t\t\t<circle cx='30' cy='27' r='7' class='btn-push'/>\n"
      +"\t\t</g>\n",
    "css_classes" : ["btn-push","btn-not-use"],
    "use" : ["btn-back"],
    "meaningful_on_single" : true
  },{
    "id" : "sl",
    "sign" : "sl",
    "element" :
      "\t\t<g id='sl'>\n"
       +"\t\t\t<use xlink:href='#btn-back'/>\n"
       +"\t\t\t<circle cx='10' cy='13' r='7' class='btn-not-use'/>\n"
       +"\t\t\t<circle cx='27' cy='10' r='7' class='btn-push'/>\n"
       +"\t\t\t<circle cx='13' cy='30' r='7' class='btn-push'/>\n"
       +"\t\t\t<circle cx='30' cy='27' r='7' class='btn-not-use'/>\n"
      +"\t\t</g>\n",
    "css_classes" : ["btn-push","btn-not-use"],
    "use" : ["btn-back"],
    "meaningful_on_single" : true
  },{
    "id" : "bs",
    "sign" : "bs",
    "element" :
      "\t\t<g id='bs'>\n"
       +"\t\t\t<use xlink:href='#btn-back'/>\n"
       +"\t\t\t<circle cx='10' cy='13' r='7' class='btn-push'/>\n"
       +"\t\t\t<circle cx='27' cy='10' r='7' class='btn-not-use'/>\n"
       +"\t\t\t<circle cx='13' cy='30' r='7' class='btn-not-use'/>\n"
       +"\t\t\t<circle cx='30' cy='27' r='7' class='btn-push'/>\n"
      +"\t\t</g>\n",
    "css_classes" : ["btn-push","btn-not-use"],
    "use" : ["btn-back"],
    "meaningful_on_single" : true
  },{
    "id" : "nlp",
    "sign" : "nlp",
    "element" :
      "\t\t<g id='nlp'>\n"
       +"\t\t\t<use xlink:href='#btn-back'/>\n"
       +"\t\t\t<circle cx='10' cy='13' r='7' class='btn-not-use'/>\n"
       +"\t\t\t<circle cx='27' cy='10' r='7' class='btn-push'/>\n"
       +"\t\t\t<circle cx='13' cy='30' r='7' class='btn-push'/>\n"
       +"\t\t\t<circle cx='30' cy='27' r='7' class='btn-push'/>\n"
      +"\t\t</g>\n",
    "css_classes" : ["btn-push","btn-not-use"],
    "use" : ["btn-back"],
    "meaningful_on_single" : true
  },{
    "id" : "nrp",
    "sign" : "nrp",
    "element" :
      "\t\t<g id='nrp'>\n"
       +"\t\t\t<use xlink:href='#btn-back'/>\n"
       +"\t\t\t<circle cx='10' cy='13' r='7' class='btn-push'/>\n"
       +"\t\t\t<circle cx='27' cy='10' r='7' class='btn-not-use'/>\n"
       +"\t\t\t<circle cx='13' cy='30' r='7' class='btn-push'/>\n"
       +"\t\t\t<circle cx='30' cy='27' r='7' class='btn-push'/>\n"
      +"\t\t</g>\n",
    "css_classes" : ["btn-push","btn-not-use"],
    "use" : ["btn-back"],
    "meaningful_on_single" : true
  },{
    "id" : "nlk",
    "sign" : "nlk",
    "element" :
      "\t\t<g id='nlk'>\n"
       +"\t\t\t<use xlink:href='#btn-back'/>\n"
       +"\t\t\t<circle cx='10' cy='13' r='7' class='btn-push'/>\n"
       +"\t\t\t<circle cx='27' cy='10' r='7' class='btn-push'/>\n"
       +"\t\t\t<circle cx='13' cy='30' r='7' class='btn-not-use'/>\n"
       +"\t\t\t<circle cx='30' cy='27' r='7' class='btn-push'/>\n"
      +"\t\t</g>\n",
    "css_classes" : ["btn-push","btn-not-use"],
    "use" : ["btn-back"],
    "meaningful_on_single" : true
  },{
    "id" : "nrk",
    "sign" : "nrk",
    "element" :
      "\t\t<g id='nrk'>\n"
       +"\t\t\t<use xlink:href='#btn-back'/>\n"
       +"\t\t\t<circle cx='10' cy='13' r='7' class='btn-push'/>\n"
       +"\t\t\t<circle cx='27' cy='10' r='7' class='btn-push'/>\n"
       +"\t\t\t<circle cx='13' cy='30' r='7' class='btn-push'/>\n"
       +"\t\t\t<circle cx='30' cy='27' r='7' class='btn-not-use'/>\n"
      +"\t\t</g>\n",
    "css_classes" : ["btn-push","btn-not-use"],
    "use" : ["btn-back"],
    "meaningful_on_single" : true
  },{
    "id" : "all",
    "sign" : "all",
    "element" :
      "\t\t<g id='all'>\n"
       +"\t\t\t<use xlink:href='#btn-back'/>\n"
       +"\t\t\t<circle cx='10' cy='13' r='7' class='btn-push'/>\n"
       +"\t\t\t<circle cx='27' cy='10' r='7' class='btn-push'/>\n"
       +"\t\t\t<circle cx='13' cy='30' r='7' class='btn-push'/>\n"
       +"\t\t\t<circle cx='30' cy='27' r='7' class='btn-push'/>\n"
      +"\t\t</g>\n",
    "css_classes" : ["btn-push"],
    "use" : ["btn-back"],
    "meaningful_on_single" : true
  },{
    "id" : "run",
    "sign" : "{666}",
    "width" : 80,
    "element" :
      "\t\t<g id='run'>\n"
       +"\t\t\t<use xlink:href='#d6' />\n"
       +"\t\t\t<use x='20' xlink:href='#d6' />\n"
       +"\t\t\t<use x='40' xlink:href='#d6' />\n"
      +"\t\t</g>\n",
    "css_classes" : null,
    "use" : ["d6"],
    "meaningful_on_single" : true
  },{
    "id" : "step-in",
    "sign" : "{66}",
    "width" : 60,
    "element" :
      "\t\t<g id='step-in'>\n"
       +"\t\t\t<use xlink:href='#d6' />\n"
       +"\t\t\t<use x='20' xlink:href='#d6' />\n"
      +"\t\t</g>\n",
    "css_classes" : null,
    "use" : ["d6"],
    "meaningful_on_single" : true
  },{
    "id" : "step-in-hold",
    "sign" : "{66h}",
    "width" : 60,
    "element" :
      "\t\t<g id='step-in-hold'>\n"
       +"\t\t\t<use xlink:href='#d6' />\n"
       +"\t\t\t<use x='20' xlink:href='#dh6' />\n"
      +"\t\t</g>\n",
    "css_classes" : null,
    "use" : ["d6","dh6"],
    "meaningful_on_single" : true
  },{
    "id" : "step-out",
    "sign" : "{44}",
    "width" : 60,
    "element" :
      "\t\t<g id='step-out'>\n"
       +"\t\t\t<use xlink:href='#d4' />\n"
       +"\t\t\t<use x='20' xlink:href='#d4' />\n"
      +"\t\t</g>\n",
    "css_classes" : null,
    "use" : ["d4"],
    "meaningful_on_single" : true
  },{
    "id" : "side-step",
    "sign" : "{ss}",
    "width" : 60,
    "element" :
      "\t\t<g id='side-step'>\n"
       +"\t\t\t<use x='0' y='2' transform='scale(0.6,0.6)' xlink:href='#d8' />\n"
       +"\t\t\t<use x='6' y='24' transform='scale(0.6,0.6)' xlink:href='#d2' />\n"
       +"\t\t\t<use x='20' xlink:href='#d5' />\n"
      +"\t\t</g>\n",
    "css_classes" : null,
    "use" : ["d2","d5","d8"],
    "meaningful_on_single" : true
  },{
    "id" : "dh1",
    "sign" : "1h",
    "element" : "\t\t<path id='dh1' class='direction-hold' d='M 8,32 L 8,8 14.5,14.5 26,3 37,14 25.5,25.5 32,32 8,32 Z'/>\n",
    "css_classes" : ["direction-hold"],
    "use" : null,
    "meaningful_on_single" : true
  },{
    "id" : "dh2",
    "sign" : "2h",
    "element" : "\t\t<path id='dh2' class='direction-hold' d='M 20,37 L 3,20 12,20 12,4 28,4 28,20 37,20 20,37 Z'/>\n",
    "css_classes" : ["direction-hold"],
    "use" : null,
    "meaningful_on_single" : true
  },{
    "id" : "dh3",
    "sign" : "3h",
    "element" : "\t\t<path id='dh3' class='direction-hold' d='M 32,32 L 32,8 25.5,14.5 14,3 3,14 14.5,25.5 8,32 32,32 Z'/>\n",
    "css_classes" : ["direction-hold"],
    "use" : null,
    "meaningful_on_single" : true
  },{
    "id" : "dh4",
    "sign" : "4h",
    "element" : "\t\t<path id='dh4' class='direction-hold' d='M 3,20 L 20,3 20,12 36,12 36,28 20,28 20,37 3,20 Z'/>\n",
    "css_classes" : ["direction-hold"],
    "use" : null,
    "meaningful_on_single" : true
  },{
    "id" : "dh6",
    "sign" : "6h",
    "element" : "\t\t<path id='dh6' class='direction-hold' d='M 37,20 L 20,3 20,12 4,12 4,28 20,28 20,37 37,20 Z'/>\n",
    "css_classes" : ["direction-hold"],
    "use" : null,
    "meaningful_on_single" : true
  },{
    "id" : "dh7",
    "sign" : "7h",
    "element" : "\t\t<path id='dh7' class='direction-hold' d='M 8,8 L 8,32 14.5,25.5 26,37 37,26 25.5,14.5 32,8 8,8 Z'/>\n",
    "css_classes" : ["direction-hold"],
    "use" : null,
    "meaningful_on_single" : true
  },{
    "id" : "dh8",
    "sign" : "8h",
    "element" : "\t\t<path id='dh8' class='direction-hold' d='M 20,3 L 3,20 12,20 12,36 28,36 28,20 37,20 20,3 Z'/>\n",
    "css_classes" : ["direction-hold"],
    "use" : null,
    "meaningful_on_single" : true
  },{
    "id" : "dh9",
    "sign" : "9h",
    "element" : "\t\t<path id='dh9' class='direction-hold' d='M 32,8 L 32,32 25.5,25.5 14,37 3,26 14.5,14.5 8,8 32,8 Z'/>\n",
    "css_classes" : ["direction-hold"],
    "use" : null,
    "meaningful_on_single" : true
  },{
    "id" : "d1",
    "sign" : "1",
    "element" : "\t\t<path id='d1' class='direction' d='M 8,32 L 8,8 14.5,14.5 26,3 37,14 25.5,25.5 32,32 8,32 Z'/>\n",
    "css_classes" : ["direction"],
    "use" : null,
    "meaningful_on_single" : true
  },{
    "id" : "d2",
    "sign" : "2",
    "element" : "\t\t<path id='d2' class='direction' d='M 20,37 L 3,20 12,20 12,4 28,4 28,20 37,20 20,37 Z'/>\n",
    "css_classes" : ["direction"],
    "use" : null,
    "meaningful_on_single" : true
  },{
    "id" : "d3",
    "sign" : "3",
    "element" : "\t\t<path id='d3' class='direction' d='M 32,32 L 32,8 25.5,14.5 14,3 3,14 14.5,25.5 8,32 32,32 Z'/>\n",
    "css_classes" : ["direction"],
    "use" : null,
    "meaningful_on_single" : true
  },{
    "id" : "d4",
    "sign" : "4",
    "element" : "\t\t<path id='d4' class='direction' d='M 3,20 L 20,3 20,12 36,12 36,28 20,28 20,37 3,20 Z'/>\n",
    "css_classes" : ["direction"],
    "use" : null,
    "meaningful_on_single" : true
  },{
    "id" : "d5",
    "sign" : "5",
    "element" : "\t\t<path id='d5' class='direction' d='M 20,7 L 17,17 7,17 15,23 12,33 20,27 28,33 25,23 33,17 23,17 20,7 20,7 Z'/>\n",
    "css_classes" : ["direction"],
    "use" : null,
    "meaningful_on_single" : true
  },{
    "id" : "d6",
    "sign" : "6",
    "element" : "\t\t<path id='d6' class='direction' d='M 37,20 L 20,3 20,12 4,12 4,28 20,28 20,37 37,20 Z'/>\n",
    "css_classes" : ["direction"],
    "use" : null,
    "meaningful_on_single" : true
  },{
    "id" : "d7",
    "sign" : "7",
    "element" : "\t\t<path id='d7' class='direction' d='M 8,8 L 8,32 14.5,25.5 26,37 37,26 25.5,14.5 32,8 8,8 Z'/>\n",
    "css_classes" : ["direction"],
    "use" : null,
    "meaningful_on_single" : true
  },{
    "id" : "d8",
    "sign" : "8",
    "element" : "\t\t<path id='d8' class='direction' d='M 20,3 L 3,20 12,20 12,36 28,36 28,20 37,20 20,3 Z'/>\n",
    "css_classes" : ["direction"],
    "use" : null,
    "meaningful_on_single" : true
  },{
    "id" : "d9",
    "sign" : "9",
    "element" : "\t\t<path id='d9' class='direction' d='M 32,8 L 32,32 25.5,25.5 14,37 3,26 14.5,14.5 8,8 32,8 Z'/>\n",
    "css_classes" : ["direction"],
    "use" : null,
    "meaningful_on_single" : true
  },{
    "id" : "giant-swing",
    "sign" : "{641236}",
    "width" : 60,
    "element" : "\t\t<path id='giant-swing' class='command' d='M 4,5 L 55,5 55,13 12,13 C 12,26 20,29 30,29 37,29 40,26 42,23 L 36,19 51,17 55,31 49,27 C 46,33 40,37 30,37 16,37 4,30 4,14 L 4,5 Z'/>\n",
    "css_classes" : ["command"],
    "use" : null,
    "meaningful_on_single" : true
  },{
    "id" : "crouch-step",
    "sign" : "{6523}",
    "element" : "\t\t<path id='crouch-step' class='command' d='M 3,5 L 37,5 37,13 11,13 C 11,25 11,22 11,27 11,28 12,29 13,29 17,29 22,26 24,23 L 18,19 33,17 37,31 31,27 C 28,33 20,37 10,37 6,37 3,34 3,30 L 3,5 Z'/>\n",
    "css_classes" : ["command"],
    "use" : null,
    "meaningful_on_single" : true
  },{
    "id" : "qcf",
    "sign" : "{236}",
    "element" : "\t\t<path id='qcf' class='command' d='M 3,21 L 6,21 C 6,21 6,20 6,28 17,28 20,20 22,16 L 14,13 31,4 38,22 30,19 C 27,25 22,37 3,37 3,26 3,22 3,21 Z'/>\n",
    "css_classes" : ["command"],
    "use" : null,
    "meaningful_on_single" : true
  },{
    "id" : "qcb",
    "sign" : "{214}",
    "element" : "\t\t<path id='qcb' class='command' d='M 37,21 L 34,21 C 34,21 34,20 34,28 23,28 20,20 18,16 L 26,13 9,4 2,22 10,19 C 13,25 18,37 37,37 37,26 37,22 37,21 Z'/>\n",
    "css_classes" : ["command"],
    "use" : null,
    "meaningful_on_single" : true
  },{
    "id" : "pre-slide",
    "sign" : "[",
    "width" : 10,
    "element" : "\t\t<path id='pre-slide' class='bracket' d='M 3,3 L 3,37 9,37 C 2,30 2,10 9,3 L 3,3 Z'/>\n",
    "css_classes" : ["bracket"],
    "use" : null,
    "meaningful_on_single" : false
  },{
    "id" : "post-slide",
    "sign" : "]",
    "width" : 10,
    "element" : "\t\t<path id='post-slide' class='bracket' d='M 7,3 L 7,37 1,37 C 8,30 8,10 1,3 L 7,3 Z'/>\n",
    "css_classes" : ["bracket"],
    "use" : null,
    "meaningful_on_single" : false
  },{
    "id" : "counter",
    "sign" : "!",
    "width" : 15,
    "element" : "\t\t<path id='counter' class='situation' d='M 4,21 C 4,17 3,11 3,7 3,3 12,3 12,7 12,11 11,17 11,21 11,25 4,25 4,21 Z M 5,29 C 6,28 9,28 10,29 11,30 11,36 7.5,36 4,36 4,30 5,29 Z'/>\n",
    "css_classes" : ["situation"],
    "use" : null,
    "meaningful_on_single" : false
  },{
    "id" : "uncertain",
    "sign" : "?",
    "width" : 20,
    "element" : "\t\t<path id='uncertain' class='situation' d='M 8,22 C 8,17 12,17 13,11 13,9 11,7 10,7 9,7 7,9 7,11 7,14 3,14 3,11 3,5 8,3 10,3 15,3 17,7 17,11 17,15 13,17 13,22 13,25 8,25 8,22 Z M 8,29 C 9,28 11,28 12,29 13,30 13,36 10,36 7,36 7,30 8,29 Z'/>\n",
    "css_classes" : ["situation"],
    "use" : null,
    "meaningful_on_single" : false
  },{
    "id" : "posture",
    "sign" : "{pos}",
    "width" : 50,
    "element" : "\t\t<path id='posture' class='str' d='M 9,10 L 19,10 M 14,3 L 14,37 M 14,10 C 13,16 11,22 8,28 M 14,16 C 16,17 17,19 19,22 M 23,6 L 38,6 M 24,11 L 36,11 M 21,16 L 41,16 M 27,3 L 27,16 M 33,3 L 33,16 M 24,21 L 24,37 M 24,21 L 37,21 37,37 35,37 M 24,26 L 37,26 M 30,16 L 30,31 M 21,31 L 41,31 M 7,37 C 7,37 5,33 4,29 3,25 3,15 4,11 5,7 7,3 7,3 M 43,3 C 43,3 45,7 46,11 47,15 47,25 46,29 45,33 43,37 43,37'/>\n",
    "css_classes" : ["str"],
    "use" : null,
    "meaningful_on_single" : true
  },{
    "id" : "posture-",
    "sign" : "{pos_}",
    "width" : 50,
    "element" : "\t\t<use id='posture-' class='already' xlink:href='#posture' />\n",
    "css_classes" : ["already"],
    "use" : ["posture"],
    "meaningful_on_single" : true
  },{
    "id" : "back",
    "sign" : "{back}",
    "width" : 50,
    "element" : "\t\t<path id='back' class='str' d='M 7,37 C 7,37 5,33 4,29 3,25 3,15 4,11 5,7 7,3 7,3 M 43,3 C 43,3 45,7 46,11 47,15 47,25 46,29 45,33 43,37 43,37 M 11,8 L 20,8 M 20,3 L 20,13 M 10,17 L 23,12 M 39,6 L 30,9 M 30,3 L 30,15 41,15 41,12 M 18,19 L 18,37 M 18,19 L 32,19 32,37 29,37 M 18,24 L 32,24 M 18,29 L 32,29'/>\n",
    "css_classes" : ["str"],
    "use" : null,
    "meaningful_on_single" : true
  },{
    "id" : "back-",
    "sign" : "{back_}",
    "width" : 50,
    "element" : "\t\t<use id='back-' class='already' xlink:href='#back' />\n",
    "css_classes" : ["already"],
    "use" : ["back"],
    "meaningful_on_single" : true
  },{
    "id" : "parry",
    "sign" : "{parry}",
    "width" : 80,
    "element" : "\t\t<path id='parry' class='str' d='M 7,37 C 7,37 5,33 4,29 3,25 3,15 4,11 5,7 7,3 7,3 M 73,3 C 73,3 75,7 76,11 77,15 77,25 76,29 75,33 73,37 73,37 M 8,14 L 28,14 M 12,4 L 12,23 M 23,3 L 23,24 C 23,29 21,33 16,37 M 34,9 C 31,17 30,21 29,34 M 40,7 C 44,18 46,24 48,35 M 44,4 L 47,14 M 48,4 L 51,14 M 54,14 L 68,13 M 55,24 L 72,23 M 58,4 L 67,37'/>\n",
    "css_classes" : ["str"],
    "use" : null,
    "meaningful_on_single" : true
  },{
    "id" : "ws",
    "sign" : "{ws}",
    "width" : 50,
    "element" : "\t\t<path id='ws' class='str' d='M 7,37 C 7,37 5,33 4,29 3,25 3,15 4,11 5,7 7,3 7,3 M 43,3 C 43,3 45,7 46,11 47,15 47,25 46,29 45,33 43,37 43,37 M 10,15 L 40,15 M 25,4 L 25,15 M 14,19 L 17,36 M 35,15 C 35,22 33,29 30,36 M 10,36 L 40,36'/>\n",
    "css_classes" : ["str"],
    "use" : null,
    "meaningful_on_single" : true
  },{
    "id" : "ws-",
    "sign" : "{ws_}",
    "width" : 50,
    "element" : "\t\t<use id='ws-' class='already' xlink:href='#ws' />\n",
    "css_classes" : ["already"],
    "use" : ["ws"],
    "meaningful_on_single" : true
  },{
    "id" : "fc",
    "sign" : "{fc}",
    "width" : 50,
    "element" :
      "\t\t<g id='fc'>\n"
       +"\t\t\t<path class='str' d='M 7,37 C 7,37 5,33 4,29 3,25 3,15 4,11 5,7 7,3 7,3 M 43,3 C 43,3 45,7 46,11 47,15 47,25 46,29 45,33 43,37 43,37'/>\n"
       +"\t\t\t<use x='5' xlink:href='#dh2' />\n"
      +"\t\t</g>\n",
    "css_classes" : ["str"],
    "use" : ["dh2"],
    "meaningful_on_single" : true
  },{
    "id" : "fc-",
    "sign" : "{fc_}",
    "width" : 50,
    "element" : "\t\t<use id='fc-' class='already' xlink:href='#fc' />\n",
    "css_classes" : ["already"],
    "use" : ["fc"],
    "meaningful_on_single" : true
  },{
    "id" : "handstand",
    "sign" : "{handstand}",
    "width" : 40,
    "element" : "\t\t<path id='handstand' class='str' d='M 3,14 L 4,11 12,15 20,10 28,15 36,11 37,14 M 9,37 L 12,24 20,21 28,24 31,37 M 20,11 L 20,26 A 4,4 0 1,0 20.01,26'/>\n",
    "css_classes" : ["str"],
    "use" : null,
    "meaningful_on_single" : true
  },{
    "id" : "handstand-",
    "sign" : "{handstand_}",
    "width" : 40,
    "element" : "\t\t<use id='handstand-' class='already' xlink:href='#handstand' />\n",
    "css_classes" : ["already"],
    "use" : ["handstand"],
    "meaningful_on_single" : true
  },{
    "id" : "relaxed",
    "sign" : "{relaxed}",
    "width" : 40,
    "element" : "\t\t<path id='relaxed' class='str' d='M 13,34 L 7,30 10,23 21,34 28,28 36,34 38,32 M 4,18.5 C 4,24.5 13,24.5 13,18.5 13,16 10,13.5 8,13.5 5,13.5 4,16 4,18.5'/>\n",
    "css_classes" : ["str"],
    "use" : null,
    "meaningful_on_single" : true
  },{
    "id" : "relaxed-",
    "sign" : "{relaxed_}",
    "width" : 40,
    "element" : "\t\t<use id='relaxed-' class='already' xlink:href='#relaxed' />\n",
    "css_classes" : ["already"],
    "use" : ["relaxed"],
    "meaningful_on_single" : true
  },{
    "id" : "hold",
    "sign" : "{hold}",
    "width" : 60,
    "element" : "\t\t<path id='hold' class='str' d='M 7,37 C 7,37 5,33 4,29 3,25 3,15 4,11 5,7 7,3 7,3 M 53,3 C 53,3 55,7 56,11 57,15 57,25 56,29 55,33 53,37 53,37 M 10,6 L 10,34 C 10,34 10,25 10,20 10,15 19,15 19,20 19,25 19,34 19,34 M 23,20 C 23,25 23,25 23,30 23,35 31,35 31,30 31,25 31,25 31,20 31,15 23,15 23,20 Z M 36,6 L 36,34 M 49,6 L 49,34 C 49,34 49,25 49,20 49,15 41,15 41,20 41,25 41,25 41,30 41,35 49,35 49,30'/>\n",
    "css_classes" : ["str"],
    "use" : null,
    "meaningful_on_single" : false
  },{
    "id" : "times",
    "sign" : null,
    "width" : 20,
    "height" : 30,
    "element" : "\t\t<path id='times' class='str' d='M 3,12 L 17,27 M 17,12 L 3,27'/>\n",
    "css_classes" : ["str"],
    "use" : null,
    "meaningful_on_single" : false
  },{
    "id" : "times-1",
    "sign" : null,
    "width" : 20,
    "height" : 30,
    "element" : "\t\t<path id='times-1' class='str' d='M 6,10 L 10,3 10,27 M 5,27 L 15,27'/>\n",
    "css_classes" : ["str"],
    "use" : null,
    "meaningful_on_single" : false
  },{
    "id" : "times-2",
    "sign" : null,
    "width" : 20,
    "height" : 30,
    "element" : "\t\t<path id='times-2' class='str' d='M 6,10 C 6,7 7,3 10,3 14,3 14,7 14,10 14,16 9,17 5,27 L 15,27'/>\n",
    "css_classes" : ["str"],
    "use" : null,
    "meaningful_on_single" : false
  },{
    "id" : "times-3",
    "sign" : null,
    "width" : 20,
    "height" : 30,
    "element" : "\t\t<path id='times-3' class='str' d='M 6,8 C 6,6 8,3 10,3 12,3 14,6 14,8 14,10 13,14 10,14 13,14 15,17 15,20 15,23 13,27 10,27 7,27 5,23 5,20'/>\n",
    "css_classes" : ["str"],
    "use" : null,
    "meaningful_on_single" : false
  },{
    "id" : "times-4",
    "sign" : null,
    "width" : 20,
    "height" : 30,
    "element" : "\t\t<path id='times-4' class='str' d='M 7,5 L 5,18 15,18 M 12,3 L 12,27'/>\n",
    "css_classes" : ["str"],
    "use" : null,
    "meaningful_on_single" : false
  },{
    "id" : "times-5",
    "sign" : null,
    "width" : 20,
    "height" : 30,
    "element" : "\t\t<path id='times-5' class='str' d='M 15,3 L 5,3 5,14 C 7,9 15,10 15,15 15,19 15,19 15,21 15,28 5,28 5,23'/>\n",
    "css_classes" : ["str"],
    "use" : null,
    "meaningful_on_single" : false
  },{
    "id" : "times-6",
    "sign" : null,
    "width" : 20,
    "height" : 30,
    "element" : "\t\t<path id='times-6' class='str' d='M 15,6 C 14,2 5,1 5,8 5,8 5,18 5,23 5,28 15,28 15,22 L 15,17 C 15,11 5,12 5,16'/>\n",
    "css_classes" : ["str"],
    "use" : null,
    "meaningful_on_single" : false
  },{
    "id" : "times-n",
    "sign" : null,
    "width" : 20,
    "height" : 30,
    "element" : "\t\t<path id='times-n' class='str' d='M 5,27 L 5,3 15,27 15,3'/>\n",
    "css_classes" : ["str"],
    "use" : null,
    "meaningful_on_single" : false
  },{
    "id" : "times-wave-dash",
    "sign" : null,
    "width" : 20,
    "height" : 30,
    "element" : "\t\t<path id='times-wave-dash' class='str' d='M 5,15 C 6,13 7,13 8,13 10,13 10,17 12,17 13,17 14,17 15,15'/>\n",
    "css_classes" : ["str"],
    "use" : null,
    "meaningful_on_single" : false
  },{
    "id" : "joint",
    "sign" : null,
    "element" : "\t\t<circle id='joint' cx='20' cy='20' r='7'/>\n",
    "css_classes" : null,
    "use" : null,
    "meaningful_on_single" : false
  },{
    "id" : "pre-repeat",
    "sign" : null,
    "width" : 10,
    "height" : 60,
    "element" : "\t\t<path id='pre-repeat' class='str' d='M 9,3 C 9,3 4,14 3,20 2,26 2,33 3,39 4,45 9,57 9,57'/>\n",
    "css_classes" : ["str"],
    "use" : null,
    "meaningful_on_single" : false
  },{
    "id" : "post-repeat",
    "sign" : null,
    "width" : 10,
    "height" : 60,
    "element" : "\t\t<path id='post-repeat' class='str' d='M 1,3 C 1,3 6,14 7,20 8,26 8,33 7,39 6,45 1,57 1,57'/>\n",
    "css_classes" : ["str"],
    "use" : null,
    "meaningful_on_single" : false
  }
];

var items = {};
for(var i = 0; i < items_array.length; i++)
 items[items_array[i].id] = items_array[i];