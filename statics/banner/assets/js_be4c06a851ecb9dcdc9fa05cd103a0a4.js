var $$S_ = "",
$$S_$22$20$2f$3e = '" />',
$$S_$22$20_action$3d$22 = '" action="',
$$S_$22$20name$3d$22iframe = '" name="iframe',
$$S_$22$20target$3d$22iframe = '" target="iframe',
$$S_$22$20type$3d$22_file$22$20$2f$3e = '" type="file" />',
$$S_$22$20value$3d$22 = '" value="',
$$S_$22$3e$3c$2f_form$3e = '"></form>',
$$S_$22$3e$3c$2fiframe$3e = '"></iframe>',
$$S_$2e = ".",
$$S_$3c_div$3e$3c$2f_div$3e = "<div></div>",
$$S_$3c_form$20method$3d$22post$22$20_1922a467 = '<form method="post" enctype="',
$$S_$3ciframe$20id$3d$22iframe = '<iframe id="iframe',
$$S_$3cinput$20name$3d$22 = '<input name="',
$$S_$3cinput$20type$3d$22hidden$22_c14e847e = '<input type="hidden" name="',
$$S_$5c = "\\",
$$S_absolute = "absolute",
$$S_action = "action",
$$S_autoSubmit = "autoSubmit",
$$S_block = "block",
$$S_div = "div",
$$S_enctype = "enctype",
$$S_file = "file",
$$S_hidden = "hidden",
$$S_hover = "hover",
$$S_multipart$2f_form$2d_data = "multipart/form-data",
$$S_name = "name",
$$S_none = "none",
$$S_onComplete = "onComplete",
$$S_onSelect = "onSelect",
$$S_onSubmit = "onSubmit",
$$S_params = "params",
$$S_pointer = "pointer",
$$S_px = "px",
$$S_title = "title",
$$S_uploadwarp = "uploadwarp",
$$S_value = "value"; (function(b) {
	b.fn.zx_upload = function(c) {
		c = b.extend({
			name: $$S_file,
			enctype: $$S_multipart$2f_form$2d_data,
			action: $$S_,
			autoSubmit: !0,
			onSubmit: function() {},
			onComplete: function() {},
			onSelect: function() {},
			params: {}
		},
		c);
		return new b.zx_upload(this, c)
	};
	b.zx_upload = function(c, g) {
		var e = this,
		f = (new Date).getTime().toString().substr(8),
		k = b('<iframe id="iframe' + f + '" name="iframe' + f + '"></iframe>').css({   
			display: $$S_none
		}),
		h = b('<form method="post" enctype="' + g.enctype + '" action="' + g.action +  '" target="iframe' + f +  '"></form>').css({
			margin: 0,
			padding: 0
		}),
		
		chuanshunam=b('<form method="post" enctype="' + g.enctype + '" action="' + g.action +  '"><input type="hidden" name="filename" value="iframe' + f + '"></form>').css({
			margin: 0,
			padding: 0
		}),

		
		
		f = c.offset(),
		d = b($$S_$3cinput$20name$3d$22 + g.name + $$S_$22$20type$3d$22_file$22$20$2f$3e).css({
			position: $$S_absolute,
			display: $$S_block,
			opacity: 0,
			left: f.left,
			top: f.top,
			height: c.outerHeight() + $$S_px,
			width: c.outerWidth() + $$S_px,
			cursor: $$S_pointer
		});
		b.browser.msie ? (d.css({
			left: 0,
			top: 0
		}), f = b($$S_$3c_div$3e$3c$2f_div$3e).css({
			position: $$S_absolute,
			display: $$S_block,
			opacity: 0,
			left: f.left,
			top: f.top,
			height: c.outerHeight() + $$S_px,
			width: c.outerWidth() + $$S_px,
			cursor: $$S_pointer,
			overflow: $$S_hidden
		}).append(d), h.append(f)) : h.append(d);
		f = b($$S_$3c_div$3e$3c$2f_div$3e).append(h).append(k).appendTo(document.body).addClass($$S_uploadwarp);
		b.browser.msie ? d.hover(function(a) {
			c.addClass($$S_hover)
		},
		function(a) {
			c.removeClass($$S_hover)
		}).attr($$S_title, c.attr($$S_title)) : (f.css({
			display: $$S_none
		}), c.click(function(a) {
			d.click()
		}));
		d.change(function() { ! 1 !== e.onSelect(e.filename(), e.fileext()) && e.autoSubmit && e.submit()
		});
		b.extend(this, {
			autoSubmit: !0,
			onSubmit: g.onSubmit,
			onComplete: g.onComplete,
			onSelect: g.onSelect,
			filename: function() {
				var a = d.attr($$S_value);
				b.browser.msiev && 0 <= a.indexOf($$S_$5c) && (a = a.substring(a.lastIndexOf($$S_$5c) + 1));
				return a
			},
			fileext: function() {
				var a = this.filename();
				a && (a = a.substring(a.lastIndexOf($$S_$2e) + 1));
				return a
			},
			params: function(a) {
				if (a = a ? a: !1) g.params = b.extend(g.params, a);
				else return g.params
			},
			name: function(a) {
				if (a && a) d.attr($$S_name, value);
				else return d.attr($$S_name)
			},
			action: function(a) {
				if (a = a ? a: !1) h.attr($$S_action, a);
				else return h.attr($$S_action)
			},
			enctype: function(a) {
				if (a = a ? a: !1) h.attr($$S_enctype, a);
				else return h.attr($$S_enctype)
			},
			set: function(a, c) {
				function d(a, b) {
					switch (a) {
					default:
						throw Error("[jQuery.zx_upload.set] '" + a + "' is an invalid option.");
					case $$S_name:
						e.name(b);
						break;
					case $$S_action:
						e.action(b);
						break;
					case $$S_enctype:
						e.enctype(b);
						break;
					case $$S_params:
						e.params(b);
						break;
					case $$S_autoSubmit:
						e.autoSubmit = b;
						break;
					case $$S_onSubmit:
						e.onSubmit = b;
						break;
					case $$S_onComplete:
						e.onComplete = b;
						break;
					case $$S_onSelect:
						e.onSelect = b
					}
				} (c = c ? c: !1) ? d(a, c) : b.each(a,
				function(a, b) {
					d(a, b)
				})
			},
			submit: function() {
				this.onSubmit();
				b.each(g.params,
				function(a, c) {
					h.append(b($$S_$3cinput$20type$3d$22hidden$22_c14e847e + a + $$S_$22$20value$3d$22 + c + $$S_$22$20$2f$3e))  // h.append(b('<input type="hidden" name="'+ a + '" value="' + c + '" />'))
				});
				h.submit();
				k.unbind().load(function() {
					var a = document.getElementById(k.attr($$S_name)); (a = b(a.contentWindow.document.body).text()) && (a = b.evalJSON(a));
					e.onComplete(a);
					if (b.browser.msie) try {
						var c = d.clone(!0);
						d.remove();
						d = c;
						h.find($$S_div).append(d)
					} catch(f) {}
				})
			}
		})
	}
})(jQuery);