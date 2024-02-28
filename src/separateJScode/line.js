// line.js

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
