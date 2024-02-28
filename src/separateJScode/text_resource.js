// text_resource.js

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