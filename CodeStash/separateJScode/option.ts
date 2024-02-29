// options.js
/**
* オプションを表現するノードを定義
  *
  * - `initialize`: 親ノードを初期化します。
  *
  * - `create_next_line`: 新しい行（`Line`）を作成し、現在のオプションに追加します。追加された行は、現在のオプションの `current_line` プロパティに設定されます。
  *
  * - `finish_to_add`: オプションの追加が完了したときに呼び出されます。このメソッドでは、追加された子要素の数やその他の条件をチェックし、適切なエラーメッセージをスローします。
  *
  * - `update_layout_with_relative_coordinate`: 相対座標を使用してレイアウトを更新します。各子要素のレイアウトが更新され、オプション全体の幅と高さが計算されます。
  *
  * - `create_arrows`: 各子要素に対して矢印を作成します。
  *
  * - `create_arrow_first_half_nodes`: 矢印の前半部分のノードを作成します。各子要素の最後のノードからなる配列を返します。
  *
  * - `create_arrow_latter_half_nodes`: 矢印の後半部分のノードを作成します。前半部分のノードから計算された矢印の終点の座標を使用して、各子要素の矢印の後半部分のノードを作成します。
  *
  * - `insert_joint`: 各子要素に対して関節を挿入します。
  *
  * このファイルは、オプションを表現するノードの機能を提供しています。
* @param parent
* @constructor
*/
const Options=(parent)=>
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
