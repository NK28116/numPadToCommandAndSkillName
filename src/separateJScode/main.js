// main.js

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
