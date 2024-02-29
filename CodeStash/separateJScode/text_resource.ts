// text_resource.js
/**
* `text_resource.js` ファイルは、SVG ファイルで使用されるテキストリソースを定義しています。以下はこのファイルの要約です：
  *
  * - `doc_prefix`: SVG ファイルのドキュメントプリフィックスとして使用されるテキスト。XML バージョンと SVG の DOCTYPE 宣言を含みます。
  *
  * - `svg_prefix`: SVG ファイルの開始部分のテキスト。SVG 名前空間とリンクするための xlink 名前空間も含まれます。また、SVG のバージョンと寸法（幅と高さ）を定義します。`~w~` と `~h~` の部分は実際の幅と高さに置き換えられます。
  *
  * - `svg_suffix`: SVG ファイルの終了部分のテキスト。
  *
  * - `defs_prefix`: SVG ファイル内の定義（defs）の開始部分のテキスト。
  *
  * - `defs_prefix_css`: SVG ファイル内のスタイルシートの開始部分のテキスト。CDATA セクションで囲まれた CSS スタイルが含まれます。
  *
  * - `defs_suffix_css`: SVG ファイル内のスタイルシートの終了部分のテキスト。
  *
  * - `defs_suffix`: SVG ファイル内の定義（defs）の終了部分のテキスト。
  *
  * - `defs_allow_marker`: マーカー（矢印など）を定義するためのテキスト。`arrow-end` という ID を持ち、矢印の形状が含まれます。
*/
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