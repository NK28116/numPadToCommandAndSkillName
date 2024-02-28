// leaf.js

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
