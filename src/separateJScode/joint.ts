// joint.js
/**、関節を表現するノードを定義します。以下はその概要です：
  *
  * - `initialize`: 親ノードを初期化します。
  *
  * - `to_string`: 関節をSVG形式の文字列に変換します。`<use>` 要素を使用して、定義された `joint` アイテムを参照します。
  *
  * - `create_arrow_first_half_nodes`: 矢印の前半部分のノードを作成します。関節の中心を起点とします。
  *
  * - `create_arrow_latter_half_nodes`: 矢印の後半部分のノードを作成します。前半部分のノードから関節までの線分を計算し、矢印の先端を求めます。
  *
  * このクラスは、関節を表現するノードを定義し、矢印の描画に必要な情報を提供します。
* @param parent
* @constructor
*/
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
