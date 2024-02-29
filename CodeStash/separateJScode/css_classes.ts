// css_classes.js
/**
* `css_classes.js` ファイルは、SVG 要素に適用される CSS クラスの定義を含んでいます。各クラスはその名前と対応する CSS スタイルを持っています。以下はこのファイルの要約です：
  *
  * - `.arrow`: 矢印のスタイルを定義します。線の色、太さ、端点のスタイル、およびマーカーのエンドを指定します。
  *
  * - `.move`: 移動要素のスタイルを定義します。塗りつぶしの色、線の色、太さを指定します。
  *
  * - `.btn-back`: ボタン（戻る）のスタイルを定義します。塗りつぶしの色を指定します。
  *
  * - `.btn-push`: ボタン（押す）のスタイルを定義します。線の色と太さを指定します。
  *
  * - `.btn-not-use`: 使用しないボタンのスタイルを定義します。塗りつぶしの色、線の色、太さを指定します。
  *
  * - `.direction`: 方向指示のスタイルを定義します。塗りつぶしの色、線の色、太さ、および端点のスタイルを指定します。
  *
  * - `.direction-hold`: 方向指示ホールドのスタイルを定義します。線の色、太さ、および端点のスタイルを指定します。
  *
  * - `.command`: コマンドのスタイルを定義します。塗りつぶしの色、線の色、太さ、および端点のスタイルを指定します。
  *
  * - `.bracket`: ブラケットのスタイルを定義します。線の色、太さ、および端点のスタイルを指定します。
  *
  * - `.situation`: シチュエーションのスタイルを定義します。線の色、太さ、および端点のスタイルを指定します。
  *
  * - `.str`: ストレートのスタイルを定義します。線の色、太さ、端点のスタイルを指定します。
  *
  * - `.already`: すでに使用されているスタイルの透明度を指定します。
*/
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