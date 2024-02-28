function Parser(input, root)
{
 this.mode_list = {
   "expect_node" : {
     "is_acceptable_command" : true,
     "acceptable_delimiter" : "<(*",
     "error_message" : "未対応の文字を確認&#12290;または&#12289;空の要素を検出&#12290;または&#12289;記号の書く位置の間違い&#12290;",
     "can_finish" : false
   },
   "expect_move" : {
     "is_acceptable_command" : true,
     "acceptable_delimiter" : "->)|.",
     "error_message" : "未対応の文字を確認&#12290;または&#12289;技の記述中に繰り返しや分岐用の記号を検出&#12290;繰り返しや分岐を書くときはハイフンなどで記述中の技を閉じること&#12290;メインルート記号&#12300;*&#12301;は分岐の先頭でのみ使用可能",
     "can_finish" : true
   },
   "closed_bracket" : {
     "is_acceptable_command" : false,
     "acceptable_delimiter" : "->)",
     "error_message" : "括弧を閉じた後に不正な記述&#12290;括弧を閉じた後はハイフンをはさんで次の技を書くか外側の括弧を閉じる&#12290;",
     "can_finish" : true
   },
   "closed_option_line" : {
     "is_acceptable_command" : false,
     "acceptable_delimiter" : "|>",
     "error_message" : "分岐終端&#12300;.&#12301;後は&#12300;|&#12301;または&#12300;&gt;&#12301;で分岐を閉じなければならない&#12290;",
     "can_finish" : false
   },
 };
 this.accept_handlers = {
   "-" : {
     "handler" : function()
     {
      // 何もしない
     },
     "next" : "expect_node"
   },
   "<" : {
     "handler" : function()
     {
      if(this.is_last_container(Loop) )
      {
       throw '繰り返しの中には分岐は書けない&#12290;';
      }
      var options = new Options(this.current_line);
      this.current_line.add(options);
      this.stack.push(options);
      this.current_line = options.create_next_line();
     },
     "next" : "expect_node"
   },
   ">" : {
     "handler" : function()
     {
      if(!this.is_last_container(Options) )
      {
       throw '閉じ括弧&#12300;&gt;&#12301;に対応する開き括弧が無い&#12290;';
      }
      this.current_line.finish_to_add();
      var options = this.stack.pop();
      options.finish_to_add();
      this.current_line = options.parent;
     },
     "next" : "closed_bracket"
   },
   "|" : {
     "handler" : function()
     {
      if(!this.is_last_container(Options) )
      {
       throw '分岐中にのみ使える記号&#12300;|&#12301;を検出&#12290;';
      }
      this.current_line.finish_to_add();
      this.current_line = this.current_line.parent.create_next_line();
     },
     "next" : "expect_node"
   },
   "." : {
     "handler" : function()
     {
      if(!this.is_last_container(Options) )
      {
       throw '分岐中にのみ使える記号&#12300;.&#12301;を検出&#12290;';
      }
      this.current_line.finish_to_add();
      this.current_line.is_terminus = true;
     },
     "next" : "closed_option_line"
   },
   "(" : {
     "handler" : function()
     {
      var loop = new Loop(this.current_line);
      this.current_line.add(loop);
      this.stack.push(loop);
      this.current_line = loop.line;
     },
     "next" : "expect_node"
   },
   ")" : {
     "handler" : function()
     {
      if(!this.is_last_container(Loop) )
      {
       throw '閉じ括弧&#12300;)&#12301;に対応する開き括弧が無い&#12290;';
      }
      this.current_line.finish_to_add();
      var loop = this.stack.pop();
      this.parse_times(loop);
      loop.finish_to_add();
      loop.register_defs();
      this.current_line = loop.parent;
     },
     "next" : "closed_bracket"
   },
   "*" : {
     "handler" : function()
     {
      if(!this.is_last_container(Options) ) { throw '分岐中にのみ使える記号&#12300;*&#12301;を検出&#12290;'; }
      if(0 < this.current_line.children.length) {throw 'メインルート記号*は分岐の先頭でのみ使用可能';}

      var options = this.stack[this.stack.length - 1];
      if(options.has_main_line) {throw 'メインルート(記号*)を設定できるのは1つの分岐で1つだけ';}
      this.current_line.is_main = true;
      options.has_main_line = true;
     },
     "next" : "expect_node"
   }
 };

 this.input = input;
 this.input_parsing = input;
 this.parse_index;
 this.parse_word_length;

 this.current_mode;
 this.stack = [];

 this.root = root;
 this.current_line;
 this.current_move;
};

Parser.prototype.parse = function()
{
 this.parse_index = 0;
 this.input_parsing = this.input;

 if(starts_with(this.input_parsing, "#") )
 {
  this.input_parsing = this.input_parsing.substring(1);
  this.root.is_arrows_enable = false;
 }

 this.current_line = new Line(this.root);
 this.root.add(this.current_line);
 this.current_move = null;
 this.current_mode = this.mode_list["expect_node"];

 while(0 < this.input_parsing.length)
 {
  var command_item = this.check_command();
  if(command_item != null)
  {
   if(this.current_mode.is_acceptable_command)
   {
    this.add_command_item(command_item);
    this.current_mode = this.mode_list["expect_move"];
    continue;
   }
   else
   {
    throw 'ここに技や方向入力を書くことはできない&#12290;(原因 : ハイフン忘れ? 分岐終端&#12300;.&#12301;後の記述?)';
   }
  }

  if(this.current_move != null)
  {
   this.current_move.finish_to_add();
   this.current_move = null;
  }

  var delimiter = this.check_delimiter();
  if(delimiter != null)
  {
   this.handle_delimiter(delimiter);
  }
  else
  {
   throw this.current_mode.error_message;
  }
 }

 if(this.current_move != null)
  this.current_move.finish_to_add();
 this.current_line.finish_to_add();

 if(0 < this.stack.length)
  throw '括弧が閉じていない';
 if(!this.current_mode.can_finish)
  throw '入力が途中で終わっている';

 this.root.insert_joint(true, true);
}

Parser.prototype.check_command = function()
{
 for(var i = 0; i < items_array.length; i++)
 {
  var item = items_array[i];
  var sign = item.sign;
  if(sign != null && starts_with(this.input_parsing, sign) )
  {
   this.parse_word_length = sign.length;
   return item;
  }
 }

 return null;
}

Parser.prototype.add_command_item = function(command_item)
{
 if(this.current_move == null)
 {
  this.current_move = new Move(this.current_line);
  this.current_line.add(this.current_move);
 }
 var leaf = new Leaf(this.current_move, command_item);
 this.current_move.add(leaf);

 var sign = command_item.sign;
 this.input_parsing = this.input_parsing.substring(sign.length);
 this.parse_index += sign.length;
}

Parser.prototype.check_delimiter = function()
{
 var ic = this.input_parsing.charAt(0);
 this.parse_word_length = 1;

 var acceptable_delimiter = this.current_mode["acceptable_delimiter"];
 for(var i = 0; i < acceptable_delimiter.length; i++)
 {
  var cc = acceptable_delimiter.charAt(i);
  if(ic === cc)
  {
   return ic;
  }
 }

 return null;
}

Parser.prototype.handle_delimiter = function(delimiter)
{
 this.accept_handlers[delimiter].handler.apply(this);
 this.current_mode = this.mode_list[this.accept_handlers[delimiter].next];

 this.input_parsing = this.input_parsing.substring(1);
 this.parse_index++;
}

Parser.prototype.is_last_container = function(c)
{
 if(this.stack.length <= 0)
  return false;

 return this.stack[this.stack.length - 1] instanceof c;
}

// ちょっとイレギュラーにthis.input_parsingを読む
Parser.prototype.parse_times = function(loop)
{
 var re = /^x([123456n])(_([123456n]))?/;
 var times = re.exec(this.input_parsing.substring(1) ); // &#12300;)&#12301;の分を飛ばして判定&#12290;文字数は最終的に辻褄は合う&#12290;
 if(times == null || times.length != 4)
 {
  throw '繰り返し回数が不正&#12290;x?_?の形式で書くこと&#12290;';
 }
 else
 {
  loop.times_from = times[1];
  if(times[2] == null)
  {
   this.input_parsing = this.input_parsing.substring(2);
   this.parse_index += 2; // x[123456n]の文字数
  }
  else
  {
   this.input_parsing = this.input_parsing.substring(4);
   loop.times_to = times[3];
   this.parse_index += 4; // x[123456n]_[123456n]の文字数
  }
 }
}

Parser.prototype.create_exception_string = function(message)
{
 var i = (this.input.length == this.parse_index ? this.input.length - 1 : this.parse_index)

 return '<p>エラー : ' + message + '</p>'
   + '<p>' + (i + 1) + '文字目</p>'
   + '<p>'
    + replace_angle_brackets(this.input.substring(0, i) )
    + '<span style="color:#800000;background-color:#c0c0ff;font-weight:bold;"> '
     + replace_angle_brackets(this.input.substr(i, this.parse_word_length) )
    + ' </span>'
    + replace_angle_brackets(this.input.substring(i + this.parse_word_length) )
   + '</p>';
};
