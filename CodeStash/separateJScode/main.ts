// main.ts

var default_size = 40;
var move_counter = 0;

//入力された文字列からコマンドイラスト(svg)を作成
const create=()=>{
        //表示するコマンドイラストの数
     move_counter = 0;//初期化

    //入力された文字から空白を削除して小文字に変換
     input = $('#input_text').val();
     input = input.replace(/\s/g, "").toLowerCase();

     //文字列から出力されるsvgコード
     var result_text = ''
     //新規のRoot object
     var root = new Root();

     try
     {
         //inputの値をroot.parse()メソッドに渡して解析し、root.update_layout()メソッドでレイアウトを更新
      root.parse(input);
      root.update_layout();
      //更新した内容をoutputに渡す
      output(root);
     }
     catch(exc)
     {
         //エラー発生
      output_error(root.create_exception_string(exc) );
      //throw exc; // デバッグ用
     }
}

const output=(root)=>
{
    //引数rootをstringに変換
 var result_text = root.to_string();
 //result_embed変数に、SVG画像の埋め込みコードのテンプレートを代入
 // このテンプレートには、SVGデータの埋め込みと、幅と高さのプレースホルダーが含まれている
 var result_embed = '<img src="data:image/svg+xml;charset=utf-8,~svg~" width="~w~" height="~h~">';

 //replace()関数を使用して、テンプレート内のプレースホルダーを実際のデータで置き換えます。
 // SVGデータはencodeURIComponent()関数を使用してエンコードされます。
 //result_embed変数には、実際のSVG画像が埋め込まれた文字列が含まれるようになります。
 result_embed = replace(result_embed, "svg", encodeURIComponent(result_text) );
 result_embed = replace(result_embed, "w", root.width);
 result_embed = replace(result_embed, "h", root.height);

 //result_embed変数を使用して、#output_image要素のHTMLコンテンツを更新します。これにより、SVG画像が表示されます。
    // #output_source要素と#output_source_embed要素の値を、それぞれresult_textとresult_embedに設定します。
    // これにより、SVG画像の元のソースコードと埋め込みコードがテキストエリアに表示されます。
 $('#output_image').html(result_embed);
 $('#output_source').val(result_text);
 $('#output_source_embed').val(result_embed);
}

/**
*エラーメッセージをHTML要素に出力するためのものです
  *
  * 1. 引数として渡された`result_text`を、`#output_image`要素のHTMLコンテンツとして設定します。
  * これにより、エラーメッセージが表示されます。
  *
  * 2. `#output_source`要素と`#output_source_embed`要素の値を空文字列に設定します。
  * これにより、元のソースコードと埋め込みコードがクリアされます。
  * この関数は、エラーメッセージを表示するためのものであり、エラーメッセージの表示とそれに関連する要素のクリアを行います。
* @param result_text
*/
const output_error=(result_text)=>
{
 $('#output_image').html(result_text);
 $('#output_source').val('');
 $('#output_source_embed').val('');
}

/**、矢印の終点を計算するためのものです。以下はその動作の概要です。
  *
  * 1. 引数として渡された`sx`と`sy`は、矢印の始点の座標を表します。
  * 2. 引数として渡された`dx`と`dy`は、矢印の目標点（終点）の座標を表します。
  * 3. 引数として渡された`arrowhead_length`は、矢じりの長さを表します。
  * 4. `Math.atan2(dy - sy, dx - sx)`を使用して、矢印の方向を表す角度（ラジアン）を計算します。この角度は、始点から目標点までの直線の方向を示します。
  * 5. `Math.sqrt((sx - dx) * (sx - dx) + (sy - dy) * (sy - dy)) - arrowhead_length`を使用して、始点から目標点までの距離から矢じりの長さを引いた値を計算します。これにより、矢じりの終点から始点に向かって直線を引いた際の終点の位置が求められます。
  * 6. `round2(sx + l * Math.cos(th))`および`round2(sy + l * Math.sin(th))`を使用して、計算された終点の座標を丸めた値を返します。
  *、始点と目標点から矢じりの終点を計算するために使用されます。終点の座標は、直線上に矢じりの終点が配置されるように計算されます。
* @param sx
* @param sy
* @param dx
* @param dy
* @param arrowhead_length
*/
const calc_arrow_target_point=(sx, sy, dx, dy, arrowhead_length)=>
{
 var th = Math.atan2(dy - sy, dx - sx); // sx < dx という仕様なのでNaNは考えなくても良い
 var l = Math.sqrt( (sx - dx) * (sx - dx) + (sy - dy) * (sy - dy) ) - arrowhead_length;
 return [round2(sx + l * Math.cos(th) ), round2(sy + l * Math.sin(th) ) ];
}

/**、与えられたテキストが指定されたパターンで始まるかどうかを判定する。
 *
 * 1. 引数として渡された`text`は、検査されるテキストを表します。
 * 2. 引数として渡された`pattern`は、検査されるテキストが始まるかどうかを判定するためのパターンを表します。
 * 3. `text.lastIndexOf(pattern, 0)`を使用して、テキストの先頭から指定されたパターンを検索します。`lastIndexOf()`メソッドは、指定されたパターンが見つかった最後の位置を返します。第二引数に`0`を指定することで、テキストの先頭から検索を行います。
 * 4. 検索結果が`0`と等しい場合、つまり指定されたパターンがテキストの先頭にある場合は`true`を返します。それ以外の場合は`false`を返します。
* @param text
* @param pattern
*/
const starts_with=(text, pattern)=>
{
 return text.lastIndexOf(pattern, 0) === 0;
}

/**
* 、与えられた入力文字列中の特定のキーワードを新しい文字列で置き換える
 *
 * 1. 引数として渡された`input`は、置換対象の入力文字列を表します。
 * 2. 引数として渡された`keyword`は、置換するキーワードを表します。
 * 3. 引数として渡された`new_string`は、置換後の新しい文字列を表します。
 * 4. `new RegExp("~" + keyword + "~", "g")`を使用して、置換対象のキーワードを含む正規表現オブジェクトを作成します。ここで、`"g"`フラグは、置換対象の文字列内のすべての一致を置換するために使用されます。
 * 5. `input.replace(regex, new_string)`を使用して、入力文字列内のすべての置換対象のキーワードを新しい文字列で置き換えます。置換された結果が新しい文字列として返されます。
* @param input
* @param keyword
* @param new_string
*/
const replace=(input, keyword, new_string)=>
{
 var regex = new RegExp("~" + keyword + "~", "g");
 return input.replace(regex, new_string);
}

/**
* 与えられた入力文字列内の角括弧(`<`と`>`)をHTMLエンティティ(`&lt;`と`&gt;`)に置き換える
 *
 * 1. `input`引数は、角括弧を置換する対象の入力文字列を表します。
 *
 * 2. `/\</g`と`/\>/g`は、それぞれ`<`と`>`を検索するための正規表現パターンを表します。`/g`フラグは、入力文字列内のすべての一致を置換するために使用されます。
 *
 * 3. `input.replace(ro, "&lt;")`は、`input`文字列内のすべての`<`を`&lt;`に置き換えます。同様に、`input.replace(rc, "&gt;")`は、`input`文字列内のすべての`>`を`&gt;`に置き換えます。
 *
 * 4. 両方の置換が行われた結果が、新しい文字列として返されます。
 *
 * この関数は、HTML内で角括弧(`<`と`>`)をそのまま表示する際にエスケープするために使用されます。
 * HTMLエンティティに置き換えることで、ブラウザがそれらをタグとして解釈せずにそのまま表示します。
* @param input
*/
const replace_angle_brackets=(input)=>
{
 var ro = /\</g;
 var rc = /\>/g;
 return input.replace(ro, "&lt;").replace(rc, "&gt;");
}

/**
* 与えられた値を小数点以下2桁に丸め
 *
 * 1. `val`引数は、丸める対象の数値を表します。
 *
 * 2. `Math.round(val * 100)`を使用して、与えられた値を小数点以下2桁まで拡大します。具体的には、与えられた値に100を掛けています。
 *
 * 3. `/ 100`を使用して、2桁目の小数点以下を四捨五入して元の桁数に戻します。
 *
 * 4. 四捨五入された結果が、新しい数値として返されます。
* @param val
*/
const round2=(val)=>
{
 return Math.round(val * 100) / 100;
}

/**
*与えられた矢印のノードの配列を整理する
 *
 * 1. `nodes`引数は、整理する矢印のノードの配列を表します。
 * 2. `len`変数に`nodes`配列の長さを格納します。
 *
 * 3. `len`が4未満の場合、つまりノードが不十分な場合は例外を投げます。
 *
 * 4. `len`が偶数でない場合、つまりx座標とy座標の組になっていない場合は例外を投げます。
 *
 * 5. `len`が4の場合は、ノードの整理が必要ないのでそのまま`nodes`を返します。
 *
 * 6. `nodes.slice(0, 4)`を使用して、最初の4つのノードを`res`配列にコピーします。
 *
 * 7. `y_old_1`と`y_old_2`に最初のy座標と2番目のy座標を格納します。
 *
 * 8. `for`ループを使用して、残りのノードを処理します。インデックス`i`を4から始めて、2つずつ増やしていきます。
 *
 * 9. 各ループで、x座標とy座標を取得し、直前の2つのy座標が同じであるかを確認します。
 *
 * 10. 直前の2つのy座標が同じである場合、直前のx座標を更新します。
 *
 * 11. 直前の2つのy座標が異なる場合、新しいx座標とy座標を`res`配列に追加し、`y_old_1`と`y_old_2`を更新します。
 *
 * 12. 整理されたノードの配列`res`を返します。
 *
 * この関数は、矢印のノードの配列を整理して、連続するy座標が同じ場合にx座標を更新します。これにより、不要なノードが除去され、よりシンプルな表現が得られます。
* @param nodes
*/
const tidy_arrow_nodes=(nodes)=>
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
