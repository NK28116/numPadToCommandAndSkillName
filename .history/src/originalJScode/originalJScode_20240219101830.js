//参考元のブログからJSだけコピペ
//ここからTS+NEXTにしていきたい
//分析のためにこれは残しておく
// main.ts

var default_size = 40;
var move_counter = 0;

function create()
{
 move_counter = 0;

 input = $('#input_text').val();
 input = input.replace(/\s/g, "").toLowerCase();

 var result_text = ''
 var root = new Root();

 try
 {
  root.parse(input);
  root.update_layout();
  output(root);
 }
 catch(exc)
 {
  output_error(root.create_exception_string(exc) );
  //throw exc; // デバッグ用
 }
}

function output(root)
{
 var result_text = root.to_string();
 var result_embed = '<img src="data:image/svg+xml;charset=utf-8,~svg~" width="~w~" height="~h~">';
 result_embed = replace(result_embed, "svg", encodeURIComponent(result_text) );
 result_embed = replace(result_embed, "w", root.width);
 result_embed = replace(result_embed, "h", root.height);

 $('#output_image').html(result_embed);
 $('#output_source').val(result_text);
 $('#output_source_embed').val(result_embed);
}

function output_error(result_text)
{
 $('#output_image').html(result_text);
 $('#output_source').val('');
 $('#output_source_embed').val('');
}

function calc_arrow_target_point(sx, sy, dx, dy, arrowhead_length)
{
 var th = Math.atan2(dy - sy, dx - sx); // sx < dx という仕様なのでNaNは考えなくても良い
 var l = Math.sqrt( (sx - dx) * (sx - dx) + (sy - dy) * (sy - dy) ) - arrowhead_length;
 return [round2(sx + l * Math.cos(th) ), round2(sy + l * Math.sin(th) ) ];
}

function starts_with(text, pattern)
{
 return text.lastIndexOf(pattern, 0) === 0;
}

function replace(input, keyword, new_string)
{
 var regex = new RegExp("~" + keyword + "~", "g");
 return input.replace(regex, new_string);
}

function replace_angle_brackets(input)
{
 var ro = /\</g;
 var rc = /\>/g;
 return input.replace(ro, "&lt;").replace(rc, "&gt;");
}

function round2(val)
{
 return Math.round(val * 100) / 100;
}

function tidy_arrow_nodes(nodes)
{
 var len = nodes.length;
 if(len < 4)
  throw '矢印のノードが短すぎる';
 if(len % 2 != 0)
  throw '矢印のノードがx,yの組になっていない';
 if(len == 4)
  return nodes;

 var res = nodes.slice(0, 4);
 var y_old_1 = nodes[3];
 var y_old_2 = nodes[1];

 for(var i = 4; i < len; i += 2)
 {
  var x = nodes[i];
  var y = nodes[i + 1];
  if(y_old_1 == y_old_2 && y_old_1 == y)
  {
   res[res.length - 2] = x;
  }
  else
  {
   res.push(x);
   res.push(y);
   y_old_2 = y_old_1;
   y_old_1 = y;
  }
 }

 return res;
}

// items.js

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
// css_classes.ts

var css_classes = {
  "arrow" : ".arrow{fill:none;stroke:black;stroke-width:6;stroke-linejoin:round;marker-end:url(#arrow-end);}\n",
  "move" : ".move{fill:#d0d0d0;stroke:black;stroke-width:4;}\n",
  "btn-back" : ".btn-back{fill:white;}\n",
  "btn-push" : ".btn-push{stroke:black;stroke-width:2;}\n",
  "btn-not-use" : ".btn-not-use{fill:white;stroke:black;stroke-width:2;}\n",
  "direction" : ".direction{fill:white;stroke:black;stroke-width:3;stroke-linejoin:round;}\n",
  "direction-hold" : ".direction-hold{stroke:black;stroke-width:3;stroke-linejoin:round;}\n",
  "command" : ".command{fill:white;stroke:black;stroke-width:3;stroke-linejoin:round;}\n",
  "bracket" : ".bracket{stroke:black;stroke-width:3;stroke-linejoin:round;}\n",
  "situation" : ".situation{stroke:black;stroke-width:3;stroke-linejoin:round;}\n",
  "str" : ".str{fill:none;stroke:black;stroke-width:3;stroke-linejoin:round;stroke-linecap:round;}\n",
  "already" : ".already{opacity:0.4;}\n"
};

// text_resource.ts

var doc_prefix =
  '<?xml version="1.0" ?>\n'
  + '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n';
var svg_prefix =
  '<svg\n'
   +'\txmlns:svg="http://www.w3.org/2000/svg"\n'
   +'\txmlns="http://www.w3.org/2000/svg"\n'
   +'\txmlns:xlink="http://www.w3.org/1999/xlink"\n'
   +'\tversion="1.1"\n'
   +'\twidth="~w~"\n'
   +'\theight="~h~"\n'
  +'>\n';
var svg_suffix = '</svg>\n';
var defs_prefix = '\t<defs>\n';
var defs_prefix_css = '\t\t<style type="text/css"><![CDATA[\n';
var defs_suffix_css = '\t\t]]></style>\n';
var defs_suffix = '\t</defs>\n';
var defs_allow_marker =
  '\t\t<marker\n'
   +'\t\t\t\tid="arrow-end"\n'
   +'\t\t\t\tviewBox="0 0 10 10"\n'
   +'\t\t\t\trefX="1"\n'
   +'\t\t\t\trefY="5" \n'
   +'\t\t\t\torient="auto"\n'
   +'\t\t\t\tstyle="overflow:visible"\n'
  +'\t\t>\n'
   +'\t\t\t<path d="M 0 0 L 10 5 L 0 10 z" fill="black" stroke="none"/>\n'
  +'\t\t</marker>\n';

// node.ts

function Node()
{
};

Node.prototype.add = function(child)
{
 if(this.is_finished_to_add)
  throw new Exception("記号の順番が不正");

 this.children.push(child);
};

Node.prototype.finish_to_add = function()
{
 this.is_finished_to_add = true;

 if(this.children.length == 0)
  throw '要素が空';
};

Node.prototype.update_layout_with_relative_coordinate = function()
{
 // 必要なオブジェクトでのみ実行
};

Node.prototype.update_children_layout_with_relative_coordinate = function()
{
 for(var i = 0; i < this.children.length; i++)
  this.children[i].update_layout_with_relative_coordinate();
};

Node.prototype.create_arrows = function()
{
 // 必要なオブジェクトでのみ実行
};

Node.prototype.create_arrow_first_half_nodes = function()
{
 throw "要継承";
};

Node.prototype.create_arrow_latter_half_nodes = function(first_half_nodes)
{
 throw "要継承";
};

Node.prototype.insert_joint = function(is_first_of_all, is_last_of_all)
{
 // 必要なオブジェクトでのみ実行
};

Node.prototype.to_string = function()
{
 var res = "";

 for(var i = 0; i < this.children.length; i++)
  res += this.children[i].to_string();

 return res;
};

Node.prototype.calc_global_position = function(x, y)
{
 this.gx = x;
 this.gy = y;
 for(var i = 0; i < this.children.length; i++)
 {
  var child = this.children[i];
  child.calc_global_position(x + child.x, y + child.y);
 }
};

Node.prototype.initialize = function(parent)
{
 if(parent == null)
  this.root = this;
 else
  this.root = parent.root;

 this.parent = parent;
 this.width = null;
 this.height = null;
 this.center_line_height = null;
 this.x = null;  // 親ノードを基準とした位置
 this.y = null;  // 親ノードを基準とした位置
 this.gx = null; // svg画像全体を基準とした位置
 this.gy = null; // svg画像全体を基準とした位置
 this.children = [];
 this.is_finished_to_add = false;

 /*
 this.children.debug_id = debug_id_count;
 debug_id_count++;
 this.debug_id = debug_id_count;
 debug_id_count++;
 */
};

//var debug_id_count = 0;

// line.ts

function Line(parent)
{
 this.initialize(parent);

 this.spacing = 40;
 this.spacing_joint = 10;
 this.svg_element = null;
 this.is_main = false;
 this.is_terminus = false;
}

Line.prototype = new Node();
Line.prototype.constructor = Line;

Line.prototype.update_layout_with_relative_coordinate = function()
{
 this.update_children_layout_with_relative_coordinate();

 var len = this.children.length;
 this.height = 0;
 this.width = 0;
 this.offset_x = 0;
 for(var i = 0; i < len; i++)
 {
  var child = this.children[i];
  var child_next = this.children[i + 1];

  this.center_line_height = Math.max(this.center_line_height, child.center_line_height);

  child.x = this.offset_x;
  var spacing = this.spacing;
  if( (child instanceof Joint) && (!(child_next instanceof Options) ) )
  {
   spacing = this.spacing_joint;
  }
  if( (child instanceof Loop) && (child_next instanceof Joint) )
  {
   spacing = this.spacing_joint;
  }
  this.offset_x += child.width + spacing;
  this.width += child.width;
  if(i != len - 1)
  {
   this.width += spacing;
  }
 }

 for(var i = 0; i < len; i++)
 {
  var child = this.children[i];
  child.y = this.center_line_height - child.center_line_height;
  this.height = Math.max(this.height, child.height - child.center_line_height + this.center_line_height);
 }
}

Line.prototype.create_arrows = function()
{
 var len = this.children.length;

 for(var i = 0; i < len - 1; i++)
 {
  var node0 = this.children[i];
  var node1 = this.children[i + 1];
  this.root.register_arrow_path_nodes(
    node1.create_arrow_latter_half_nodes(
      node0.create_arrow_first_half_nodes()
    )
  );
 }

 for(var i = 0; i < len; i++)
  this.children[i].create_arrows();
}

Line.prototype.insert_joint = function(is_first_of_all, is_last_of_all)
{
 var node1 = this.children[0];
 for(var i = 1; i < this.children.length; i++)
 {
  var node2 = this.children[i];

  if( (node1 instanceof Options) &&
   ( (node2 instanceof Options) || ( (node2 instanceof Loop) && node2.has_parentheses) ) )
  {
   this.children.splice(i, 0, new Joint(this) );
   i++;
  }
  else if( (node1 instanceof Loop) && (node2 instanceof Options) )
  {
   this.children.splice(i, 0, new Joint(this) );
   i++;
  }

  node1 = node2;
 }

 if( (this.children[0] instanceof Options) && (!is_first_of_all) )
  this.children.unshift(new Joint(this) );

 if( (this.children[this.children.length - 1] instanceof Options) && (!is_last_of_all) )
  this.children.push(new Joint(this) );

 for(var i = 0; i < this.children.length; i++)
  this.children[i].insert_joint( (i == 0) && is_first_of_all, (i == this.children.length - 1) && is_last_of_all);
};

// move.js

function Move(parent)
{
 this.initialize(parent);

 this.svg_id = 'm' + move_counter; // 重複した場合&#12289;前に登録されたものを流用
 move_counter++;
 this.radius_to_round_off_corner = 8;
 this.padding = 5;
 this.arrowhead_length = 22;
 this.height = this.padding * 2 + default_size;
 this.width = this.padding * 2;
 this.center_line_height = this.height / 2;
 this.svg_element = null; // 重複した場合&#12289;前に登録されたものを流用&#12290;この変数はnullのまま&#12290;
}

Move.prototype = new Node();
Move.prototype.constructor = Move;

Move.prototype.finish_to_add = function()
{
 Node.prototype.finish_to_add.apply(this);

 var f = false;
 for(var i = 0; i < this.children.length; i++)
  f = f || this.children[i].item.meaningful_on_single;

 if(!f)
  throw '単独で項に使えない記号のみで項が書かれている&#12290;';
};

Move.prototype.update_layout_with_relative_coordinate = function()
{
 var offset_x = this.padding;
 for(var i = 0; i < this.children.length; i++)
 {
  var child = this.children[i];

  child.x = offset_x;
  offset_x += child.width;
  this.width += child.width;
  child.y = this.padding;
 }

 if(this.root.register_defs_move(this) )
  return;

 var svg_tmp =
   '\t\t<g id="~id~">\n'
    +'\t\t\t<rect class="move" width="~w~" height="~h~" rx="~r~" ry="~r~"/>\n';
 svg_tmp = replace(svg_tmp, "id", this.svg_id);
 svg_tmp = replace(svg_tmp, "w", this.width);
 svg_tmp = replace(svg_tmp, "h", this.height);
 svg_tmp = replace(svg_tmp, "r", this.radius_to_round_off_corner);

 for (var i = 0; i < this.children.length; i++)
 {
  var child = this.children[i];
  var svg_tmp2 = '\t\t\t<use x="~x~" y="~y~" xlink:href="#~leaf_id~"/>\n'
  svg_tmp2 = replace(svg_tmp2, "x", child.x);
  svg_tmp2 = replace(svg_tmp2, "y", child.y);
  svg_tmp2 = replace(svg_tmp2, "leaf_id", child.svg_id);
  svg_tmp += svg_tmp2;
 }

 svg_tmp += '\t\t</g>\n';
 this.svg_element = svg_tmp;
}

Move.prototype.to_string = function()
{
 var res = '\t<use x="~x~" y="~y~" xlink:href="#~leaf_id~"/>\n';
 res = replace(res, "x", this.gx);
 res = replace(res, "y", this.gy);
 res = replace(res, "leaf_id", this.svg_id);
 return res;
}

Move.prototype.create_arrow_first_half_nodes = function()
{
 var t = this.padding + default_size / 2;
 return [ [this.gx + this.width - t, this.gy + t] ];
};

Move.prototype.create_arrow_latter_half_nodes = function(first_half_nodes)
{
 var res = [];

 for(var i = 0; i < first_half_nodes.length; i++)
 {
  var nodes = first_half_nodes[i];

  var t = this.padding + default_size / 2;
  var cx = this.gx + t; // 1つ目のリーフの中央
  var cy = this.gy + t;
  var sx = nodes[nodes.length - 2]; // 前半ノードの最後の点
  var sy = nodes[nodes.length - 1];
  t = (cy - sy) / (cx - sx); // 前半ノードの最後の点から1つ目のリーフの中央へ線を引いたときの傾き
  var y = sy + t * (this.gx - sx); // 引いた線がthis.gxのときどの高さか?
  var dx, dy;

  if(y < this.gy) // 矢印はこのmoveの上の辺を指す
  {
   dx = sx + 1 / t * (this.gy - sy);
   dy = this.gy;
  }
  else if(y < this.gy + this.height) // 矢印はこのmoveの左の辺を指す
  {
   dx = this.gx;
   dy = y;
  }
  else // 矢印はこのmoveの下の辺を指す
  {
   dx = sx + 1 / t * (this.gy + this.height - sy);
   dy = this.gy + this.height;
  }

  res.push(nodes.concat(calc_arrow_target_point(sx, sy, dx, dy, this.arrowhead_length) ) );
 }

 return res;
};

// leaf.ts

function Leaf(parent, item)
{
 this.initialize(parent);

 this.root.register_defs_item(item);

 this.item = item;
 this.svg_id = item.id;
 this.width = (item.width == null ? default_size : item.width);
 this.height = (item.height == null ? default_size : item.height);
 //this.svg_element = item.element;
};

Leaf.prototype = new Node();
Leaf.prototype.constructor = Leaf;

// loop.js

function Loop(parent)
{
 this.initialize(parent);

 this.add(new Line(this) );
 this.line = this.children[0];

 this.times_from = null;
 this.times_to = null;
 this.has_parentheses = false;
 this.parentheses_open_x = null;
 this.parentheses_open_y = null;
 this.parentheses_close_x = null;
 this.parentheses_close_y = null;
 this.times_x = null;
 this.times_y = null;
 this.parentheses_open_gx = null;
 this.parentheses_open_gy = null;
 this.parentheses_close_gx = null;
 this.parentheses_close_gy = null;
 this.times_gx = null;
 this.times_gy = null;

 this.height_when_has_parentheses = 70; // 即値なのは手抜き
 this.height_when_has_not_parentheses = 65; // 即値なのは手抜き
 this.center_line_height = 40; // 即値なのは手抜き
 this.times_gx_margin_left = 5;
 this.line_margin_x = 20;
};

Loop.prototype = new Node();
Loop.prototype.constructor = Loop;

Loop.prototype.register_defs = function()
{
 this.root.register_defs_item(items["times"] );

 this.root.register_defs_item(items["times-" + this.times_from] );
 if(this.times_to != null)
 {
  this.root.register_defs_item(items["times-wave-dash"] );
  this.root.register_defs_item(items["times-" + this.times_to] );
 }

 if(this.has_parentheses)
 {
  this.root.register_defs_item(items["pre-repeat"] );
  this.root.register_defs_item(items["post-repeat"] );
 }
}

Loop.prototype.finish_to_add = function()
{
 Node.prototype.finish_to_add.apply(this);

 if(this.line.children.length == 1)
 {
  if(this.line.children[0] instanceof Loop)
  {
   throw '繰り返し要素の中に単独の繰り返し要素は入れることができない';
  }
 }
 else
 {
  this.has_parentheses = true;
 }
};

Loop.prototype.update_layout_with_relative_coordinate = function()
{
 this.update_children_layout_with_relative_coordinate();

 if(this.has_parentheses)
 {
  var t_pre = items["pre-repeat"];
  var t_post = items["post-repeat"];

  this.height = this.height_when_has_parentheses;
  this.parentheses_open_x = 0;
  this.parentheses_open_y = this.height_when_has_parentheses - t_pre.height;
  this.line.x = t_pre.width + this.line_margin_x;
  this.line.y = this.center_line_height - this.line.center_line_height;
  this.parentheses_close_x = this.line.x + this.line.width + this.line_margin_x;
  this.parentheses_close_y = this.parentheses_open_y;
  this.times_x = this.parentheses_close_x + t_post.width + this.times_gx_margin_left;
  this.times_y = 0;
 }
 else
 {
  this.height = this.height_when_has_not_parentheses;
  this.line.x = 0;
  this.line.y = this.height_when_has_not_parentheses - this.line.height;
  this.times_x = this.line.x + this.line.width + this.times_gx_margin_left;
  this.times_y = 0;
 }
 this.width = this.times_x + items["times"].width + items["times-" + this.times_from].width;
 if(this.times_to != null)
  this.width += items["times-wave-dash"].width + items["times-" + this.times_to].width;
};

Loop.prototype.to_string = function()
{
 var res = '\t<g>\n';
 var svg_tmp = null;

 if(this.has_parentheses)
 {
  svg_tmp = '\t\t<use x="~x~" y="~y~" xlink:href="#pre-repeat"/>\n';
  svg_tmp = replace(svg_tmp, "x", this.parentheses_open_gx);
  res += svg_tmp = replace(svg_tmp, "y", this.parentheses_open_gy);
 }

 res += this.line.to_string();

 if(this.has_parentheses)
 {
  svg_tmp = '\t\t<use x="~x~" y="~y~" xlink:href="#post-repeat"/>\n';
  svg_tmp = replace(svg_tmp, "x", this.parentheses_close_gx);
  res += svg_tmp = replace(svg_tmp, "y", this.parentheses_close_gy);
 }

 var x = this.times_gx;
 svg_tmp = '\t\t<use x="~x~" y="~y~" xlink:href="#times"/>\n';
 svg_tmp = replace(svg_tmp, "x", x);
 res += svg_tmp = replace(svg_tmp, "y", this.times_gy);

 x += items["times"].width;
 var times_id = 'times-' + this.times_from;
 svg_tmp = '\t\t<use x="~x~" y="~y~" xlink:href="#~leaf_id~"/>\n';
 svg_tmp = replace(svg_tmp, "x", x);
 svg_tmp = replace(svg_tmp, "y", this.times_gy);
 res += replace(svg_tmp, "leaf_id", times_id);

 if(this.times_to != null)
 {
  x += items[times_id].width;
  svg_tmp = '\t\t<use x="~x~" y="~y~" xlink:href="#times-wave-dash"/>\n';
  svg_tmp = replace(svg_tmp, "x", x);
  res += svg_tmp = replace(svg_tmp, "y", this.times_gy);

  x += items["times-wave-dash"].width;
  var times_id = 'times-' + this.times_to;
  svg_tmp = '\t\t<use x="~x~" y="~y~" xlink:href="#~leaf_id~"/>\n';
  svg_tmp = replace(svg_tmp, "x", x);
  svg_tmp = replace(svg_tmp, "y", this.times_gy);
  res += replace(svg_tmp, "leaf_id", times_id);
 }

 return res + '\t</g>\n';
};

Loop.prototype.calc_global_position = function(x, y)
{
 Node.prototype.calc_global_position.call(this, x, y);

 this.parentheses_open_gx = x + this.parentheses_open_x;
 this.parentheses_open_gy = y + this.parentheses_open_y;
 this.parentheses_close_gx = x + this.parentheses_close_x;
 this.parentheses_close_gy = y + this.parentheses_close_y;
 this.times_gx = x + this.times_x;
 this.times_gy = y + this.times_y;
};

Loop.prototype.create_arrows = function()
{
 if(!this.has_parentheses)
  return;

 this.line.create_arrows();
};

Loop.prototype.create_arrow_first_half_nodes = function()
{
 var node = this.line.children[this.line.children.length - 1];
 while(node instanceof Loop)
  node = node.line.children[node.line.children.length - 1];

 if(!(node instanceof Move) )
  throw '繰り返し要素の中に想定外のノード ... ' + Object.prototype.toString.apply(node);

 return node.create_arrow_first_half_nodes();
};

Loop.prototype.create_arrow_latter_half_nodes = function(first_half_nodes)
{
 var node = this.line.children[0];
 while(node instanceof Loop)
  node = node.line.children[0];

 if(!(node instanceof Move) )
  throw '繰り返し要素の中に想定外のノード ... ' + Object.prototype.toString.apply(node);

 return node.create_arrow_latter_half_nodes(first_half_nodes);
};

// options.js

function Options(parent)
{
 this.initialize(parent);

 this.current_line = null;
 this.has_main_line = false;
 this.vertical_spacing = 20;
};

Options.prototype = new Node();
Options.prototype.constructor = Options;

Options.prototype.create_next_line = function()
{
 var line = new Line(this);
 this.add(line);
 this.current_line = line;

 return line;
};

Options.prototype.finish_to_add = function()
{
 Node.prototype.finish_to_add.apply(this);

 var children_num = this.children.length;
 if(children_num == 0)
  throw '分岐要素が空';
 if(children_num == 1)
  throw '分岐要素にルートが1つしか登録されていない';

 var t = true;
 for(var i = 0; i < children_num; i++)
  t &= this.children[i].is_terminus;
 if(t)
  throw '分岐の全てのルートを終端にすることはできない';

 t = 0;
 for(var i = 0; i < children_num; i++)
  if(this.children[i].is_main)
   t++;
 if(1 < t)
  throw '分岐のメインルートを複数検出';

 this.current_line = null;
};

Options.prototype.update_layout_with_relative_coordinate = function()
{
 this.update_children_layout_with_relative_coordinate();

 var children_num = this.children.length;
 this.width = 0;
 this.height = 0;
 this.center_line_height = 0;
 var m = this.has_main_line;
 for(var i = 0; i < children_num; i++)
 {
  var child = this.children[i];

  child.x = 0;
  child.y = this.height;

  this.width = Math.max(this.width, child.width);
  this.height += child.height;

  if(m && !child.is_main)
  {
   this.center_line_height += child.height;
  }
  else if(child.is_main)
  {
   this.center_line_height += child.center_line_height;
   m = false;
  }

  if(i != children_num - 1)
  {
   this.height += this.vertical_spacing;
   if(m)
   {
    this.center_line_height += this.vertical_spacing;
   }
  }
 }
 if(!this.has_main_line)
  this.center_line_height = this.height / 2;
};

Options.prototype.create_arrows = function()
{
 for(var i = 0; i < this.children.length; i++)
  this.children[i].create_arrows();
};

Options.prototype.create_arrow_first_half_nodes = function()
{
 var tmp = [];
 var res = [];

 var x = 0;
 for(var i = 0; i < this.children.length; i++)
 {
  var line = this.children[i];

  var e = line.children[line.children.length - 1];

  var nodes = e.create_arrow_first_half_nodes()[0]; // Options以外なのでnodesは1つ
  x = Math.max(x, nodes[nodes.length - 2] ); // 必ず1組のx,yがある

  if(line.is_terminus)
  {
   tmp.push(null);
  }
  else
  {
   tmp.push(nodes);
  }
 }

 // 右端のノード以外は&#12289;右端に揃える
 for(var i = 0; i < tmp.length; i++)
 {
  var nodes = tmp[i];
  if(nodes != null)
  {
   if(nodes[nodes.length - 2] < x)
   {
    var y = nodes[nodes.length - 1];
    nodes.push(x);
    nodes.push(y);
   }
   res.push(nodes);
  }
 }

 return res;
};

Options.prototype.create_arrow_latter_half_nodes = function(first_half_nodes)
{
 var res = [];

 for(var i = 0; i < this.children.length; i++)
 {
  var line = this.children[i];
  var e = line.children[0];

  res.push(e.create_arrow_latter_half_nodes(first_half_nodes)[0] );
 }

 return res;
};

Options.prototype.insert_joint = function(is_first_of_all, is_last_of_all)
{
 for(var i = 0; i < this.children.length; i++)
  this.children[i].insert_joint(is_first_of_all, is_last_of_all);
}

// joint.ts

function Joint(parent)
{
 this.initialize(parent);

 this.root.register_defs_item(items["joint"] );

 this.width = 40;
 this.height = 40;
 this.center_line_height = this.height / 2;
 this.arrowhead_length = 26;
};

Joint.prototype = new Node();
Joint.prototype.constructor = Joint;

Joint.prototype.to_string = function()
{
 var res = '\t<use x="~x~" y="~y~" xlink:href="#joint"/>\n';
 res = replace(res, "x", this.gx);
 res = replace(res, "y", this.gy);
 return res;
}

Joint.prototype.create_arrow_first_half_nodes = function()
{
 return [ [this.gx + this.width / 2, this.gy + this.height / 2] ];
};

Joint.prototype.create_arrow_latter_half_nodes = function(first_half_nodes)
{
 var res = [];

 for(var i = 0; i < first_half_nodes.length; i++)
 {
  var nodes = first_half_nodes[i];
  var sx = nodes[nodes.length - 2]; // 前半ノードの最後の点
  var sy = nodes[nodes.length - 1];
  var dx = this.gx + this.width / 2;
  var dy = this.gy + this.height / 2;
  res.push(nodes.concat(calc_arrow_target_point(sx, sy, dx, dy, this.arrowhead_length) ) );
 }

 return res;
};

function Root()
{
 this.initialize(null);
 this.use_css = {"arrow" : css_classes.arrow, "move" : css_classes.move};
 this.use_elements = {};
 this.move_elements = [];
 this.is_arrows_enable = true;
 this.arrow_path_nodes = [];
 this.parse_index;
 this.parse_word_length;
 this.input = null;
 this.padding = 5;
 this.parser;
}

Root.prototype = new Node();
Root.prototype.constructor = Root;

Root.prototype.parse = function(input)
{
 this.parser = new Parser(input, this);
 this.parser.parse();
};

Root.prototype.register_defs_item = function(item)
{
 if(item.css_classes != null)
  for (var i = 0; i < item.css_classes.length; i++)
   this.use_css[item.css_classes[i] ] = true;

 this.use_elements[item.id] = true;
 if(item.use != null)
 {
  for (var i = 0; i < item.use.length; i++)
  {
   var use_id = item.use[i];
   this.use_elements[use_id] = true;
   this.register_defs_item(items[use_id] );
  }
 }
};

// 全く同じmoveがあった場合&#12289;登録せずにtrueを返す&#12290;
Root.prototype.register_defs_move = function(move)
{
 for(var i = 0; i < this.move_elements.length; i++)
 {
  var o = this.move_elements[i];
  var exist = false;

  if(move.children.length != o.children.length)
  {
   continue;
  }

  var j;
  for(j = 0; j < move.children.length; j++)
  {
   if(move.children[j].svg_id != o.children[j].svg_id)
   {
    break;
   }
  }
  if(j == move.children.length)
  {
   move.svg_id = o.svg_id;
   return true;
  }
 }

 this.move_elements.push(move);
 return false;
}

Root.prototype.register_arrow_path_nodes = function(nodes)
{
 this.arrow_path_nodes = this.arrow_path_nodes.concat(nodes);
}

Root.prototype.to_string = function()
{
 var c = this.children[0];

 var is_arrows_enable = (this.is_arrows_enable && 0 < this.arrow_path_nodes.length);

 var res = doc_prefix + svg_prefix;
 res = replace(res, "w", this.width);
 res = replace(res, "h", this.height);

 res += defs_prefix;

 res += defs_prefix_css;
 for(var key in this.use_css)
  res += css_classes[key];
 res += defs_suffix_css;

 if(is_arrows_enable)
  res += defs_allow_marker;

 for(var key in this.use_elements)
  res += items[key].element;

 for(var i = 0; i < this.move_elements.length; i++)
  res += this.move_elements[i].svg_element;

 res += defs_suffix;

 if(is_arrows_enable)
  res += this.arrows_to_string();

 res += c.to_string();
 res += svg_suffix;

 return res;
};

Root.prototype.arrows_to_string = function()
{
 var res = '\t<g id="arrows">\n';

 for(var i = 0; i < this.arrow_path_nodes.length; i++)
 {
  var arrow_path_node = tidy_arrow_nodes(this.arrow_path_nodes[i] );

  res += '\t\t<path class="arrow" d="M ' + arrow_path_node[0] + ',' + arrow_path_node[1] + ' L';

  for(var j = 2; j < arrow_path_node.length; j += 2)
  {
   res += ' ' + arrow_path_node[j] + ',' + arrow_path_node[j + 1];
  }

  res += '"/>\n';
 }

 res += '\t</g>\n';

 return res;
}

Root.prototype.update_layout = function()
{
 var c = this.children[0];

 c.update_layout_with_relative_coordinate();

 this.calc_global_position(this.padding, this.padding);
 this.width = c.width + this.padding * 2;
 this.height = c.height + this.padding * 2;

 this.create_arrows();
};

Root.prototype.create_arrows = function()
{
 this.children[0].create_arrows();
}

Root.prototype.insert_joint = function(is_first_of_all, is_last_of_all)
{
 this.children[0].insert_joint(true, true);
};

Root.prototype.create_exception_string = function(message)
{
 return this.parser.create_exception_string(message);
};
function Parser(input, root)
{
 this.mode_list = {
   "expect_node" : {
     "is_acceptable_command" : true,
     "acceptable_delimiter" : "<(*",
     "error_message" : "未対応の文字を確認&#12290;または&#12289;空の要素を検出&#12290;または&#12289;記号の書く位置の間違い&#12290;",
     "can_finish" : false
   },
   "expect_move" : {
     "is_acceptable_command" : true,
     "acceptable_delimiter" : "->)|.",
     "error_message" : "未対応の文字を確認&#12290;または&#12289;技の記述中に繰り返しや分岐用の記号を検出&#12290;繰り返しや分岐を書くときはハイフンなどで記述中の技を閉じること&#12290;メインルート記号&#12300;*&#12301;は分岐の先頭でのみ使用可能",
     "can_finish" : true
   },
   "closed_bracket" : {
     "is_acceptable_command" : false,
     "acceptable_delimiter" : "->)",
     "error_message" : "括弧を閉じた後に不正な記述&#12290;括弧を閉じた後はハイフンをはさんで次の技を書くか外側の括弧を閉じる&#12290;",
     "can_finish" : true
   },
   "closed_option_line" : {
     "is_acceptable_command" : false,
     "acceptable_delimiter" : "|>",
     "error_message" : "分岐終端&#12300;.&#12301;後は&#12300;|&#12301;または&#12300;&gt;&#12301;で分岐を閉じなければならない&#12290;",
     "can_finish" : false
   },
 };
 this.accept_handlers = {
   "-" : {
     "handler" : function()
     {
      // 何もしない
     },
     "next" : "expect_node"
   },
   "<" : {
     "handler" : function()
     {
      if(this.is_last_container(Loop) )
      {
       throw '繰り返しの中には分岐は書けない&#12290;';
      }
      var options = new Options(this.current_line);
      this.current_line.add(options);
      this.stack.push(options);
      this.current_line = options.create_next_line();
     },
     "next" : "expect_node"
   },
   ">" : {
     "handler" : function()
     {
      if(!this.is_last_container(Options) )
      {
       throw '閉じ括弧&#12300;&gt;&#12301;に対応する開き括弧が無い&#12290;';
      }
      this.current_line.finish_to_add();
      var options = this.stack.pop();
      options.finish_to_add();
      this.current_line = options.parent;
     },
     "next" : "closed_bracket"
   },
   "|" : {
     "handler" : function()
     {
      if(!this.is_last_container(Options) )
      {
       throw '分岐中にのみ使える記号&#12300;|&#12301;を検出&#12290;';
      }
      this.current_line.finish_to_add();
      this.current_line = this.current_line.parent.create_next_line();
     },
     "next" : "expect_node"
   },
   "." : {
     "handler" : function()
     {
      if(!this.is_last_container(Options) )
      {
       throw '分岐中にのみ使える記号&#12300;.&#12301;を検出&#12290;';
      }
      this.current_line.finish_to_add();
      this.current_line.is_terminus = true;
     },
     "next" : "closed_option_line"
   },
   "(" : {
     "handler" : function()
     {
      var loop = new Loop(this.current_line);
      this.current_line.add(loop);
      this.stack.push(loop);
      this.current_line = loop.line;
     },
     "next" : "expect_node"
   },
   ")" : {
     "handler" : function()
     {
      if(!this.is_last_container(Loop) )
      {
       throw '閉じ括弧&#12300;)&#12301;に対応する開き括弧が無い&#12290;';
      }
      this.current_line.finish_to_add();
      var loop = this.stack.pop();
      this.parse_times(loop);
      loop.finish_to_add();
      loop.register_defs();
      this.current_line = loop.parent;
     },
     "next" : "closed_bracket"
   },
   "*" : {
     "handler" : function()
     {
      if(!this.is_last_container(Options) ) { throw '分岐中にのみ使える記号&#12300;*&#12301;を検出&#12290;'; }
      if(0 < this.current_line.children.length) {throw 'メインルート記号*は分岐の先頭でのみ使用可能';}

      var options = this.stack[this.stack.length - 1];
      if(options.has_main_line) {throw 'メインルート(記号*)を設定できるのは1つの分岐で1つだけ';}
      this.current_line.is_main = true;
      options.has_main_line = true;
     },
     "next" : "expect_node"
   }
 };

 this.input = input;
 this.input_parsing = input;
 this.parse_index;
 this.parse_word_length;

 this.current_mode;
 this.stack = [];

 this.root = root;
 this.current_line;
 this.current_move;
};

Parser.prototype.parse = function()
{
 this.parse_index = 0;
 this.input_parsing = this.input;

 if(starts_with(this.input_parsing, "#") )
 {
  this.input_parsing = this.input_parsing.substring(1);
  this.root.is_arrows_enable = false;
 }

 this.current_line = new Line(this.root);
 this.root.add(this.current_line);
 this.current_move = null;
 this.current_mode = this.mode_list["expect_node"];

 while(0 < this.input_parsing.length)
 {
  var command_item = this.check_command();
  if(command_item != null)
  {
   if(this.current_mode.is_acceptable_command)
   {
    this.add_command_item(command_item);
    this.current_mode = this.mode_list["expect_move"];
    continue;
   }
   else
   {
    throw 'ここに技や方向入力を書くことはできない&#12290;(原因 : ハイフン忘れ? 分岐終端&#12300;.&#12301;後の記述?)';
   }
  }

  if(this.current_move != null)
  {
   this.current_move.finish_to_add();
   this.current_move = null;
  }

  var delimiter = this.check_delimiter();
  if(delimiter != null)
  {
   this.handle_delimiter(delimiter);
  }
  else
  {
   throw this.current_mode.error_message;
  }
 }

 if(this.current_move != null)
  this.current_move.finish_to_add();
 this.current_line.finish_to_add();

 if(0 < this.stack.length)
  throw '括弧が閉じていない';
 if(!this.current_mode.can_finish)
  throw '入力が途中で終わっている';

 this.root.insert_joint(true, true);
}

Parser.prototype.check_command = function()
{
 for(var i = 0; i < items_array.length; i++)
 {
  var item = items_array[i];
  var sign = item.sign;
  if(sign != null && starts_with(this.input_parsing, sign) )
  {
   this.parse_word_length = sign.length;
   return item;
  }
 }

 return null;
}

Parser.prototype.add_command_item = function(command_item)
{
 if(this.current_move == null)
 {
  this.current_move = new Move(this.current_line);
  this.current_line.add(this.current_move);
 }
 var leaf = new Leaf(this.current_move, command_item);
 this.current_move.add(leaf);

 var sign = command_item.sign;
 this.input_parsing = this.input_parsing.substring(sign.length);
 this.parse_index += sign.length;
}

Parser.prototype.check_delimiter = function()
{
 var ic = this.input_parsing.charAt(0);
 this.parse_word_length = 1;

 var acceptable_delimiter = this.current_mode["acceptable_delimiter"];
 for(var i = 0; i < acceptable_delimiter.length; i++)
 {
  var cc = acceptable_delimiter.charAt(i);
  if(ic === cc)
  {
   return ic;
  }
 }

 return null;
}

Parser.prototype.handle_delimiter = function(delimiter)
{
 this.accept_handlers[delimiter].handler.apply(this);
 this.current_mode = this.mode_list[this.accept_handlers[delimiter].next];

 this.input_parsing = this.input_parsing.substring(1);
 this.parse_index++;
}

Parser.prototype.is_last_container = function(c)
{
 if(this.stack.length <= 0)
  return false;

 return this.stack[this.stack.length - 1] instanceof c;
}

// ちょっとイレギュラーにthis.input_parsingを読む
Parser.prototype.parse_times = function(loop)
{
 var re = /^x([123456n])(_([123456n]))?/;
 var times = re.exec(this.input_parsing.substring(1) ); // &#12300;)&#12301;の分を飛ばして判定&#12290;文字数は最終的に辻褄は合う&#12290;
 if(times == null || times.length != 4)
 {
  throw '繰り返し回数が不正&#12290;x?_?の形式で書くこと&#12290;';
 }
 else
 {
  loop.times_from = times[1];
  if(times[2] == null)
  {
   this.input_parsing = this.input_parsing.substring(2);
   this.parse_index += 2; // x[123456n]の文字数
  }
  else
  {
   this.input_parsing = this.input_parsing.substring(4);
   loop.times_to = times[3];
   this.parse_index += 4; // x[123456n]_[123456n]の文字数
  }
 }
}

Parser.prototype.create_exception_string = function(message)
{
 var i = (this.input.length == this.parse_index ? this.input.length - 1 : this.parse_index)

 return '<p>エラー : ' + message + '</p>'
   + '<p>' + (i + 1) + '文字目</p>'
   + '<p>'
    + replace_angle_brackets(this.input.substring(0, i) )
    + '<span style="color:#800000;background-color:#c0c0ff;font-weight:bold;"> '
     + replace_angle_brackets(this.input.substr(i, this.parse_word_length) )
    + ' </span>'
    + replace_angle_brackets(this.input.substring(i + this.parse_word_length) )
   + '</p>';
};
