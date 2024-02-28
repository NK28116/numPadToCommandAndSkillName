function Root()
{
 this.initialize(null);
 this.use_css = {"arrow" : css_classes.arrow, "move" : css_classes.move};
 this.use_elements = {};
 this.move_elements = [];
 this.is_arrows_enable = true;
 this.arrow_path_nodes = [];
 this.parse_index;
 this.parse_word_length;
 this.input = null;
 this.padding = 5;
 this.parser;
}

Root.prototype = new Node();
Root.prototype.constructor = Root;

Root.prototype.parse = function(input)
{
 this.parser = new Parser(input, this);
 this.parser.parse();
};

Root.prototype.register_defs_item = function(item)
{
 if(item.css_classes != null)
  for (var i = 0; i < item.css_classes.length; i++)
   this.use_css[item.css_classes[i] ] = true;

 this.use_elements[item.id] = true;
 if(item.use != null)
 {
  for (var i = 0; i < item.use.length; i++)
  {
   var use_id = item.use[i];
   this.use_elements[use_id] = true;
   this.register_defs_item(items[use_id] );
  }
 }
};

// 全く同じmoveがあった場合&#12289;登録せずにtrueを返す&#12290;
Root.prototype.register_defs_move = function(move)
{
 for(var i = 0; i < this.move_elements.length; i++)
 {
  var o = this.move_elements[i];
  var exist = false;

  if(move.children.length != o.children.length)
  {
   continue;
  }

  var j;
  for(j = 0; j < move.children.length; j++)
  {
   if(move.children[j].svg_id != o.children[j].svg_id)
   {
    break;
   }
  }
  if(j == move.children.length)
  {
   move.svg_id = o.svg_id;
   return true;
  }
 }

 this.move_elements.push(move);
 return false;
}

Root.prototype.register_arrow_path_nodes = function(nodes)
{
 this.arrow_path_nodes = this.arrow_path_nodes.concat(nodes);
}

Root.prototype.to_string = function()
{
 var c = this.children[0];

 var is_arrows_enable = (this.is_arrows_enable && 0 < this.arrow_path_nodes.length);

 var res = doc_prefix + svg_prefix;
 res = replace(res, "w", this.width);
 res = replace(res, "h", this.height);

 res += defs_prefix;

 res += defs_prefix_css;
 for(var key in this.use_css)
  res += css_classes[key];
 res += defs_suffix_css;

 if(is_arrows_enable)
  res += defs_allow_marker;

 for(var key in this.use_elements)
  res += items[key].element;

 for(var i = 0; i < this.move_elements.length; i++)
  res += this.move_elements[i].svg_element;

 res += defs_suffix;

 if(is_arrows_enable)
  res += this.arrows_to_string();

 res += c.to_string();
 res += svg_suffix;

 return res;
};

Root.prototype.arrows_to_string = function()
{
 var res = '\t<g id="arrows">\n';

 for(var i = 0; i < this.arrow_path_nodes.length; i++)
 {
  var arrow_path_node = tidy_arrow_nodes(this.arrow_path_nodes[i] );

  res += '\t\t<path class="arrow" d="M ' + arrow_path_node[0] + ',' + arrow_path_node[1] + ' L';

  for(var j = 2; j < arrow_path_node.length; j += 2)
  {
   res += ' ' + arrow_path_node[j] + ',' + arrow_path_node[j + 1];
  }

  res += '"/>\n';
 }

 res += '\t</g>\n';

 return res;
}

Root.prototype.update_layout = function()
{
 var c = this.children[0];

 c.update_layout_with_relative_coordinate();

 this.calc_global_position(this.padding, this.padding);
 this.width = c.width + this.padding * 2;
 this.height = c.height + this.padding * 2;

 this.create_arrows();
};

Root.prototype.create_arrows = function()
{
 this.children[0].create_arrows();
}

Root.prototype.insert_joint = function(is_first_of_all, is_last_of_all)
{
 this.children[0].insert_joint(true, true);
};

Root.prototype.create_exception_string = function(message)
{
 return this.parser.create_exception_string(message);
};