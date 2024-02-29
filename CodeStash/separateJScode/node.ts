// node.js
/**
* `node.js` ファイルは、`Node` クラスを定義し、このクラスのメソッドやプロパティを提供します。以下はこのファイルの要約です：
  *
  * - `Node()`: `Node` クラスのコンストラクターです。各種プロパティを初期化します。
  *
  * - `add(child)`: 子ノードを追加します。追加された子ノードは `children` 配列に格納されます。
  *
  * - `finish_to_add()`: 子ノードの追加が完了したことをマークします。
  *
  * - `update_layout_with_relative_coordinate()`: 相対座標を使用してレイアウトを更新します。このメソッドは各サブクラスでオーバーライドされます。
  *
  * - `update_children_layout_with_relative_coordinate()`: 子ノードのレイアウトを更新します。
  *
  * - `create_arrows()`: 矢印を作成します。各サブクラスでオーバーライドされます。
  *
  * - `create_arrow_first_half_nodes()`: 矢印の前半部分のノードを作成します。各サブクラスでオーバーライドされます。
  *
  * - `create_arrow_latter_half_nodes(first_half_nodes)`: 矢印の後半部分のノードを作成します。各サブクラスでオーバーライドされます。
  *
  * - `insert_joint(is_first_of_all, is_last_of_all)`: 関節を挿入します。各サブクラスでオーバーライドされます。
  *
  * - `to_string()`: オブジェクトを文字列に変換します。各サブクラスでオーバーライドされます。
  *
  * - `calc_global_position(x, y)`: グローバル座標を計算します。
  *
  * - `initialize(parent)`: 初期化関数であり、各種プロパティを初期化します。
  *
  * このクラスは、グラフのノードや要素の基本的な振る舞いを提供します。サブクラスはこれらのメソッドをオーバーライドして特定の振る舞いを実装します。
* @constructor
*/
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