if(typeof DropdownBox=="undefined" || !DropdownBox){
	var DropdownBox = {};
}
(function(){
	DropdownBox = function(options){
		this.options = {
		  //parent : $('#id')
			localData : [],
			url : '',
			requestData : {},
			refreshShowable : true,
			searchShowable : true,
			isSpecialDropData : false,
			hiddenIptName : '',
			readonly : false,
			onChangeFunc : undefined,
		};
		$.extend(this.options, options);
		this._init();
	}
	
	DropdownBox.prototype = {
		_init : function(){
			var self = this,
				refreshEle = self.options.refreshShowable?'<em class="refresh_img"></em>':'',
				searchEle = self.options.refreshShowable?'<div class="slt_srch_box"><input type="text" class="slt_srch_ipt" placeholder="请输入筛选条件"/><em></em></div>':'',
				defaultValue = self.options.parent.attr('value');
				
			self.options.parent.empty().append('<span><span class="show_label">请选择</span><em class="drop_down_img"></em>'+refreshEle+'<input type="hidden" name="'
			+self.options.hiddenIptName+'" class="hidden_val"/></span>').append('<ul class="oSbox">'+searchEle+'</ul>');
			
			if(self.options.localData.length<=0 && self.options.url){
				$.post(self.options.url, self.options.requestData, function(datas){
					self.options.localData = eval('(' + datas + ')');
					if(defaultValue && self.options.localData.length>0){
						self.value(defaultValue);
					}
				});
			}
			$.each(self.options.localData, function(i, data){
				self.options.parent.find('.oSbox').append('<li data-value="'+data.value+'">'+data.label+'</li>');
			});
			
			if(defaultValue && self.options.localData.length>0){
				self.value(defaultValue);
			}
			
			self.options.parent.find('.oSbox').width(self.options.parent.width());
			
			if(self.options.readonly){
				var parentbox = self.options.parent;
				parentbox.addClass('readonly');
			}else{
				self._bindDropdownEvent();
				self._bindSelectItemEvent();
				self._bindSearchItemEvent();
				self._bindRefreshDataEvent();
			}
		},
		_bindDropdownEvent : function(){
			var self = this;
			self.options.parent.unbind('click').bind('click', function(e){
				var oSbox = self.options.parent.find('.oSbox');
				oSbox.find('li').remove();
				$('.oSbox').not(oSbox).hide();//首先需要所有
				if(self.options.isSpecialDropData){
					var datas = $.map($('#dest_mysql_tb').find('tr'), function(tr, i){
									var colName = $(tr).find('td:eq(1)').text();
									return {
										label : colName,
										value : colName
									};
								});
					self.options.localData = datas;
				}
				$.each(self.options.localData, function(i, data){
					oSbox.append('<li data-value="'+data.value+'">'+data.label+'</li>');
				});
				$(this).find('.oSbox').toggle();
				e.stopPropagation();
			});
			
			$(document).unbind('click').bind('click', function () {
				$('.oSbox').hide();
			});
		},
		_bindSelectItemEvent : function(){
			var self = this;
			self.options.parent.delegate('.oSbox>li', 'click', function(e){
				var oldVal = self.options.parent.find('.hidden_val').val(),
					selVal = $(this).attr('data-value'),
					selLbl = $(this).text();
				self.options.parent.find('.show_label').text(selLbl);
				self.options.parent.find('.hidden_val').val(selVal);
				self.options.parent.attr('value', selVal);
				self.options.parent.find('.oSbox').hide();
				if(oldVal !== selVal && typeof(self.options.onChangeFunc) === 'function'){
					self.options.onChangeFunc.call(self);
				}
				self.options.parent.removeClass('errBorder').next('.err_box_tip').remove();
				e.stopPropagation();
			});
		},
		_bindSearchItemEvent : function(){
			var self = this;
			self.options.parent.delegate('.slt_srch_ipt', 'click keyup', function(e){
				if(e.type == 'click'){
					e.stopPropagation();
					return;
				}
				var iptVal = $(this).val(),
					grepData = $.grep(self.options.localData, function(d, i){
									return d.label.indexOf(iptVal)>-1;
							   }),
					oSbox = self.options.parent.find('.oSbox');
					
				oSbox.find('li').remove();
				$.each(grepData, function(i, data){
					oSbox.append('<li data-value="'+data.value+'">'+data.label+'</li>');
				});
				e.stopPropagation();
			});
		},
		_bindRefreshDataEvent : function(){
			var self = this;
			self.options.parent.delegate('.refresh_img', 'click', function(e){
				var oSbox = self.options.parent.find('.oSbox');
				
				oSbox.find('li').remove();
				$.post(self.options.url, self.options.requestData, function(datas){
					self.options.localData = eval('(' + datas + ')');
				});
				
				$.each(self.options.localData, function(i, data){
					oSbox.append('<li data-value="'+data.value+'">'+data.label+'</li>');
				});
				e.stopPropagation();
			});
		},
		value : function(value, isUserDefined){
			if(value){
				var datas = this.options.localData,
					valueExist = false;
				for(var i=0;i<datas.length;i++){
					if(datas[i].value == value){
						this.options.parent.find('.show_label').text(datas[i].label);
						this.options.parent.find('.hidden_val').val(value);
						this.options.parent.attr('value', value);
						valueExist = true;
						if(typeof(this.options.onChangeFunc) === 'function'){
							this.options.onChangeFunc.call(this);
						}
						break;
					}
				}
				if(!valueExist && isUserDefined){
					for(var i=0;i<this.options.localData.length;i++){
						var curData = this.options.localData[i];
						if(curData.label.indexOf('用户自定义(')>-1){
							this.options.localData.splice(i, 1);
							break;
						}
					}
					this.options.localData.push({value:value, label:'用户自定义('+value+')'});
					this.options.parent.find('.show_label').text('用户自定义('+value+')');
					this.options.parent.find('.hidden_val').val(value);
				}else if(!valueExist){
					this.options.parent.find('.show_label').text('请选择');
					this.options.parent.find('.hidden_val').val('');
				}
			}else{
				return this.options.parent.find('.hidden_val').val();
			}
		},
		label : function(){
			return this.options.parent.find('.show_label').text();
		},
		setSourceData : function(data){
			this.options.localData = data;
		},
		resetValue : function(){
			var datas = this.options.localData;
			this.options.parent.find('.show_label').text(datas.length>0?datas[0].label:'');
			this.options.parent.find('.hidden_val').val(datas.length>0?datas[0].value:'');
		}
	};
	
})();