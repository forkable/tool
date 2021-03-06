! function ($) {
	var r, $$, consts, settings = {},
		roots = {},
		caches = {},
		clickTime = 0,
		ctTime = null,
		_consts = {
			className: {
				BUTTON: "button",
				LEVEL: "level",
				ICO_LOADING: "ico_loading",
				SWITCH: "switch",
				NAME: "node_name"
			},
			event: {
				NODECREATED: "ztree_nodeCreated", 
				CLICK: "ztree_click",
				EXPAND: "ztree_expand",
				COLLAPSE: "ztree_collapse",
				ASYNC_SUCCESS: "ztree_async_success",
				ASYNC_ERROR: "ztree_async_error",
				REMOVE: "ztree_remove",
				SELECTED: "ztree_selected",
				UNSELECTED: "ztree_unselected"
			},
			id: {
				A: "_a",
				ICON: "_ico",
				SPAN: "_span",
				SWITCH: "_switch",
				UL: "_ul"
			},
			line: {
				ROOT: "root",
				ROOTS: "roots",
				CENTER: "center",
				BOTTOM: "bottom",
				NOLINE: "noline",
				LINE: "line"
			},
			folder: {
				OPEN: "open",
				CLOSE: "close",
				DOCU: "docu"
			},
			node: {
				CURSELECTED: "curSelectedNode"
			}
		},
		_setting = {
			treeId: "",
			treeObj: null,
			view: {
				addDiyDom: null,
				autoCancelSelected: !0,
				dblClickExpand: !0,
				expandSpeed: "fast",
				fontCss: {},
				nameIsHTML: !1,
				selectedMulti: !0,
				showIcon: !0,
				showLine: !0,
				showTitle: !0,
				txtSelectedEnable: !1
			},
			data: {
				key: {
					children: "children",
					name: "name",
					title: "",
					url: "url",
					icon: "icon"
				},
				simpleData: {
					enable: !1,
					idKey: "id",
					pIdKey: "pId",
					rootPId: null
				},
				keep: {
					parent: !1,
					leaf: !1
				}
			},
			async: {
				enable: !1,
				contentType: "application/x-www-form-urlencoded",
				type: "post",
				dataType: "text",
				url: "",
				autoParam: [],
				otherParam: [],
				dataFilter: null
			},
			callback: {
				beforeAsync: null,
				beforeClick: null,
				beforeDblClick: null,
				beforeRightClick: null,
				beforeMouseDown: null,
				beforeMouseUp: null,
				beforeExpand: null,
				beforeCollapse: null,
				beforeRemove: null,
				onAsyncError: null,
				onAsyncSuccess: null,
				onNodeCreated: null,
				onClick: null,
				onDblClick: null,
				onRightClick: null,
				onMouseDown: null,
				onMouseUp: null,
				onExpand: null,
				onCollapse: null,
				onRemove: null
			}
		},
		_initRoot = function (a) {
			var b = data.getRoot(a);
			b || (b = {}, data.setRoot(a, b)), b[a.data.key.children] = [], b.expandTriggerFlag = !1, b.curSelectedList = [], b.noSelection = !0, b.createdNodes = [], b.zId = 0, b._ver = (new Date).getTime()
		},
		_initCache = function (a) {
			var b = data.getCache(a);
			b || (b = {}, data.setCache(a, b)), b.nodes = [], b.doms = []
		},
		_bindEvent = function (a) {
			var b = a.treeObj,
				c = consts.event;
			b.bind(c.NODECREATED, function (b, c, d) {
				tools.apply(a.callback.onNodeCreated, [b, c, d])
			}), b.bind(c.CLICK, function (b, c, d, e, f) {
				tools.apply(a.callback.onClick, [c, d, e, f])
			}), b.bind(c.EXPAND, function (b, c, d) {
				tools.apply(a.callback.onExpand, [b, c, d])
			}), b.bind(c.COLLAPSE, function (b, c, d) {
				tools.apply(a.callback.onCollapse, [b, c, d])
			}), b.bind(c.ASYNC_SUCCESS, function (b, c, d, e) {
				tools.apply(a.callback.onAsyncSuccess, [b, c, d, e])
			}), b.bind(c.ASYNC_ERROR, function (b, c, d, e, f, g) {
				tools.apply(a.callback.onAsyncError, [b, c, d, e, f, g])
			}), b.bind(c.REMOVE, function (b, c, d) {
				tools.apply(a.callback.onRemove, [b, c, d])
			}), b.bind(c.SELECTED, function (b, c, d) {
				tools.apply(a.callback.onSelected, [c, d])
			}), b.bind(c.UNSELECTED, function (b, c, d) {
				tools.apply(a.callback.onUnSelected, [c, d])
			})
		},
		_unbindEvent = function (a) {
			var b = a.treeObj,
				c = consts.event;
			b.unbind(c.NODECREATED).unbind(c.CLICK).unbind(c.EXPAND).unbind(c.COLLAPSE).unbind(c.ASYNC_SUCCESS).unbind(c.ASYNC_ERROR).unbind(c.REMOVE).unbind(c.SELECTED).unbind(c.UNSELECTED)
		},
		_eventProxy = function (a) {
			var k, b = a.target,
				c = data.getSetting(a.data.treeId),
				d = "",
				e = null,
				f = "",
				g = "",
				h = null,
				i = null,
				j = null;
			if (tools.eqs(a.type, "mousedown") ? g = "mousedown" : tools.eqs(a.type, "mouseup") ? g = "mouseup" : tools.eqs(a.type, "contextmenu") ? g = "contextmenu" : tools.eqs(a.type, "click") ? tools.eqs(b.tagName, "span") && null !== b.getAttribute("treeNode" + consts.id.SWITCH) ? (d = tools.getNodeMainDom(b).id, f = "switchNode") : (ctTime && clearTimeout(ctTime), j = tools.getMDom(c, b, [{
					tagName: "a",
					attrName: "treeNode" + consts.id.A
				}]), 0 == clickTime ? j && (d = tools.getNodeMainDom(j).id, f = "clickNode") : (g = "dblclick", j && (d = tools.getNodeMainDom(j).id, f = "switchNode")), clickTime++, ctTime = setTimeout(function () {
					clickTime = 0
				}, 200)) : tools.eqs(a.type, "dblclick"), g.length > 0 && 0 == d.length && (j = tools.getMDom(c, b, [{
					tagName: "a",
					attrName: "treeNode" + consts.id.A
				}]), j && (d = tools.getNodeMainDom(j).id)), d.length > 0) switch (e = data.getNodeCache(c, d), f) {
				case "switchNode":
					e.isParent ? tools.eqs(a.type, "click") || tools.eqs(a.type, "dblclick") && tools.apply(c.view.dblClickExpand, [c.treeId, e], c.view.dblClickExpand) ? h = handler.onSwitchNode : f = "" : f = "";
					break;
				case "clickNode":
					h = handler.onClickNode
			}
			switch (g) {
				case "mousedown":
					i = handler.onZTreeMousedown;
					break;
				case "mouseup":
					i = handler.onZTreeMouseup;
					break;
				case "dblclick":
					i = handler.onZTreeDblclick;
					break;
				case "contextmenu":
					i = handler.onZTreeContextmenu
			}
			return k = {
				stop: !1,
				node: e,
				nodeEventType: f,
				nodeEventCallback: h,
				treeEventType: g,
				treeEventCallback: i
			}
		},
		_initNode = function (a, b, c, d, e, f) {
			if (c) {
				var h = data.getRoot(a),
					i = a.data.key.children;
				c.level = b, c.tId = a.treeId + "_" + ++h.zId, c.parentTId = d ? d.tId : null, c.open = "string" == typeof c.open ? tools.eqs(c.open, "true") : !!c.open, c[i] && c[i].length > 0 ? (c.isParent = !0, c.zAsync = !0) : (c.isParent = "string" == typeof c.isParent ? tools.eqs(c.isParent, "true") : !!c.isParent, c.open = c.isParent && !a.async.enable ? c.open : !1, c.zAsync = !c.isParent), c.isFirstNode = e, c.isLastNode = f, c.getParentNode = function () {
					return data.getNodeCache(a, c.parentTId)
				}, c.getPreNode = function () {
					return data.getPreNode(a, c)
				}, c.getNextNode = function () {
					return data.getNextNode(a, c)
				}, c.getIndex = function () {
					return data.getNodeIndex(a, c)
				}, c.getPath = function () {
					return data.getNodePath(a, c)
				}, c.isAjaxing = !1, data.fixPIdKeyValue(a, c)
			}
		},
		_init = {
			bind: [_bindEvent],
			unbind: [_unbindEvent],
			caches: [_initCache],
			nodes: [_initNode],
			proxys: [_eventProxy],
			roots: [_initRoot],
			beforeA: [],
			afterA: [],
			innerBeforeA: [],
			innerAfterA: [],
			zTreeTools: []
		},
		data = {
			addNodeCache: function (a, b) {
				data.getCache(a).nodes[data.getNodeCacheId(b.tId)] = b
			},
			getNodeCacheId: function (a) {
				return a.substring(a.lastIndexOf("_") + 1)
			},
			addAfterA: function (a) {
				_init.afterA.push(a)
			},
			addBeforeA: function (a) {
				_init.beforeA.push(a)
			},
			addInnerAfterA: function (a) {
				_init.innerAfterA.push(a)
			},
			addInnerBeforeA: function (a) {
				_init.innerBeforeA.push(a)
			},
			addInitBind: function (a) {
				_init.bind.push(a)
			},
			addInitUnBind: function (a) {
				_init.unbind.push(a)
			},
			addInitCache: function (a) {
				_init.caches.push(a)
			},
			addInitNode: function (a) {
				_init.nodes.push(a)
			},
			addInitProxy: function (a, b) {
				b ? _init.proxys.splice(0, 0, a) : _init.proxys.push(a)
			},
			addInitRoot: function (a) {
				_init.roots.push(a)
			},
			addNodesData: function (a, b, c, d) {
				var f, e = a.data.key.children;
				b[e] ? c >= b[e].length && (c = -1) : (b[e] = [], c = -1), b[e].length > 0 && 0 === c ? (b[e][0].isFirstNode = !1, view.setNodeLineIcos(a, b[e][0])) : b[e].length > 0 && 0 > c && (b[e][b[e].length - 1].isLastNode = !1, view.setNodeLineIcos(a, b[e][b[e].length - 1])), b.isParent = !0, 0 > c ? b[e] = b[e].concat(d) : (f = [c, 0].concat(d), b[e].splice.apply(b[e], f))
			},
			addSelectedNode: function (a, b) {
				var c = data.getRoot(a);
				data.isSelectedNode(a, b) || c.curSelectedList.push(b)
			},
			addCreatedNode: function (a, b) {
				if (a.callback.onNodeCreated || a.view.addDiyDom) {
					var c = data.getRoot(a);
					c.createdNodes.push(b)
				}
			},
			addZTreeTools: function (a) {
				_init.zTreeTools.push(a)
			},
			exSetting: function (a) {
				$.extend(!0, _setting, a)
			},
			fixPIdKeyValue: function (a, b) {
				a.data.simpleData.enable && (b[a.data.simpleData.pIdKey] = b.parentTId ? b.getParentNode()[a.data.simpleData.idKey] : a.data.simpleData.rootPId)
			},
			getAfterA: function () {
				for (var d = 0, e = _init.afterA.length; e > d; d++) _init.afterA[d].apply(this, arguments)
			},
			getBeforeA: function () {
				for (var d = 0, e = _init.beforeA.length; e > d; d++) _init.beforeA[d].apply(this, arguments)
			},
			getInnerAfterA: function () {
				for (var d = 0, e = _init.innerAfterA.length; e > d; d++) _init.innerAfterA[d].apply(this, arguments)
			},
			getInnerBeforeA: function () {
				for (var d = 0, e = _init.innerBeforeA.length; e > d; d++) _init.innerBeforeA[d].apply(this, arguments)
			},
			getCache: function (a) {
				return caches[a.treeId]
			},
			getNodeIndex: function (a, b) {
				var c, d, e, f;
				if (!b) return null;
				for (c = a.data.key.children, d = b.parentTId ? b.getParentNode() : data.getRoot(a), e = 0, f = d[c].length - 1; f >= e; e++)
					if (d[c][e] === b) return e;
				return -1
			},
			getNextNode: function (a, b) {
				var c, d, e, f;
				if (!b) return null;
				for (c = a.data.key.children, d = b.parentTId ? b.getParentNode() : data.getRoot(a), e = 0, f = d[c].length - 1; f >= e; e++)
					if (d[c][e] === b) return e == f ? null : d[c][e + 1];
				return null
			},
			getNodeByParam: function (a, b, c, d) {
				var e, f, g, h;
				if (!b || !c) return null;
				for (e = a.data.key.children, f = 0, g = b.length; g > f; f++) {
					if (b[f][c] == d) return b[f];
					if (h = data.getNodeByParam(a, b[f][e], c, d)) return h
				}
				return null
			},
			getNodeCache: function (a, b) {
				if (!b) return null;
				var c = caches[a.treeId].nodes[data.getNodeCacheId(b)];
				return c ? c : null
			},
			getNodeName: function (a, b) {
				var c = a.data.key.name;
				return "" + b[c]
			},
			getNodePath: function (a, b) {
				if (!b) return null;
				var c;
				return c = b.parentTId ? b.getParentNode().getPath() : [], c && c.push(b), c
			},
			getNodeTitle: function (a, b) {
				var c = "" === a.data.key.title ? a.data.key.name : a.data.key.title;
				return "" + b[c]
			},
			getNodes: function (a) {
				return data.getRoot(a)[a.data.key.children]
			},
			getNodesByParam: function (a, b, c, d) {
				var e, f, g, h;
				if (!b || !c) return [];
				for (e = a.data.key.children, f = [], g = 0, h = b.length; h > g; g++) b[g][c] == d && f.push(b[g]), f = f.concat(data.getNodesByParam(a, b[g][e], c, d));
				return f
			},
			getNodesByParamFuzzy: function (a, b, c, d) {
				var e, f, g, h;
				if (!b || !c) return [];
				for (e = a.data.key.children, f = [], d = d.toLowerCase(), g = 0, h = b.length; h > g; g++) "string" == typeof b[g][c] && b[g][c].toLowerCase().indexOf(d) > -1 && f.push(b[g]), f = f.concat(data.getNodesByParamFuzzy(a, b[g][e], c, d));
				return f
			},
			getNodesByFilter: function (a, b, c, d, e) {
				var f, g, h, i, j;
				if (!b) return d ? null : [];
				for (f = a.data.key.children, g = d ? null : [], h = 0, i = b.length; i > h; h++) {
					if (tools.apply(c, [b[h], e], !1)) {
						if (d) return b[h];
						g.push(b[h])
					}
					if (j = data.getNodesByFilter(a, b[h][f], c, d, e), d && j) return j;
					g = d ? j : g.concat(j)
				}
				return g
			},
			getPreNode: function (a, b) {
				var c, d, e, f;
				if (!b) return null;
				for (c = a.data.key.children, d = b.parentTId ? b.getParentNode() : data.getRoot(a), e = 0, f = d[c].length; f > e; e++)
					if (d[c][e] === b) return 0 == e ? null : d[c][e - 1];
				return null
			},
			getRoot: function (a) {
				return a ? roots[a.treeId] : null
			},
			getRoots: function () {
				return roots
			},
			getSetting: function (a) {
				return settings[a]
			},
			getSettings: function () {
				return settings
			},
			getZTreeTools: function (a) {
				var b = this.getRoot(this.getSetting(a));
				return b ? b.treeTools : null
			},
			initCache: function () {
				for (var b = 0, c = _init.caches.length; c > b; b++) _init.caches[b].apply(this, arguments)
			},
			initNode: function () {
				for (var g = 0, h = _init.nodes.length; h > g; g++) _init.nodes[g].apply(this, arguments)
			},
			initRoot: function () {
				for (var b = 0, c = _init.roots.length; c > b; b++) _init.roots[b].apply(this, arguments)
			},
			isSelectedNode: function (a, b) {
				var d, e, c = data.getRoot(a);
				for (d = 0, e = c.curSelectedList.length; e > d; d++)
					if (b === c.curSelectedList[d]) return !0;
				return !1
			},
			removeNodeCache: function (a, b) {
				var d, e, c = a.data.key.children;
				if (b[c])
					for (d = 0, e = b[c].length; e > d; d++) data.removeNodeCache(a, b[c][d]);
				data.getCache(a).nodes[data.getNodeCacheId(b.tId)] = null
			},
			removeSelectedNode: function (a, b) {
				var d, e, c = data.getRoot(a);
				for (d = 0, e = c.curSelectedList.length; e > d; d++) b !== c.curSelectedList[d] && data.getNodeCache(a, c.curSelectedList[d].tId) || (c.curSelectedList.splice(d, 1), a.treeObj.trigger(consts.event.UNSELECTED, [a.treeId, b]), d--, e--)
			},
			setCache: function (a, b) {
				caches[a.treeId] = b
			},
			setRoot: function (a, b) {
				roots[a.treeId] = b
			},
			setZTreeTools: function () {
				for (var c = 0, d = _init.zTreeTools.length; d > c; c++) _init.zTreeTools[c].apply(this, arguments)
			},
			transformToArrayFormat: function (a, b) {
				var c, d, e, f;
				if (!b) return [];
				if (c = a.data.key.children, d = [], tools.isArray(b))
					for (e = 0, f = b.length; f > e; e++) d.push(b[e]), b[e][c] && (d = d.concat(data.transformToArrayFormat(a, b[e][c])));
				else d.push(b), b[c] && (d = d.concat(data.transformToArrayFormat(a, b[c])));
				return d
			},
			transformTozTreeFormat: function (a, b) {
				var c, d, h, i, e = a.data.simpleData.idKey,
					f = a.data.simpleData.pIdKey,
					g = a.data.key.children;
				if (!e || "" == e || !b) return [];
				if (tools.isArray(b)) {
					for (h = [], i = {}, c = 0, d = b.length; d > c; c++) i[b[c][e]] = b[c];
					for (c = 0, d = b.length; d > c; c++) i[b[c][f]] && b[c][e] != b[c][f] ? (i[b[c][f]][g] || (i[b[c][f]][g] = []), i[b[c][f]][g].push(b[c])) : h.push(b[c]);
					return h
				}
				return [b]
			}
		},
		event = {
			bindEvent: function () {
				for (var b = 0, c = _init.bind.length; c > b; b++) _init.bind[b].apply(this, arguments)
			},
			unbindEvent: function () {
				for (var b = 0, c = _init.unbind.length; c > b; b++) _init.unbind[b].apply(this, arguments)
			},
			bindTree: function (a) {
				var b = {
						treeId: a.treeId
					},
					c = a.treeObj;
				a.view.txtSelectedEnable || c.bind("selectstart", handler.onSelectStart).css({
					"-moz-user-select": "-moz-none"
				}), c.bind("click", b, event.proxy), c.bind("dblclick", b, event.proxy), c.bind("mouseover", b, event.proxy), c.bind("mouseout", b, event.proxy), c.bind("mousedown", b, event.proxy), c.bind("mouseup", b, event.proxy), c.bind("contextmenu", b, event.proxy)
			},
			unbindTree: function (a) {
				var b = a.treeObj;
				b.unbind("selectstart", handler.onSelectStart).unbind("click", event.proxy).unbind("dblclick", event.proxy).unbind("mouseover", event.proxy).unbind("mouseout", event.proxy).unbind("mousedown", event.proxy).unbind("mouseup", event.proxy).unbind("contextmenu", event.proxy)
			},
			doProxy: function () {
				var c, d, e, b = [];
				for (c = 0, d = _init.proxys.length; d > c && (e = _init.proxys[c].apply(this, arguments), b.push(e), !e.stop); c++);
				return b
			},
			proxy: function (a) {
				var c, d, e, f, g, h, b = data.getSetting(a.data.treeId);
				if (!tools.uCanDo(b, a)) return !0;
				for (c = event.doProxy(a), d = !0, e = !1, f = 0, g = c.length; g > f; f++) h = c[f], h.nodeEventCallback && (e = !0, d = h.nodeEventCallback.apply(h, [a, h.node]) && d), h.treeEventCallback && (e = !0, d = h.treeEventCallback.apply(h, [a, h.node]) && d);
				return d
			}
		},
		handler = {
			onSwitchNode: function (a, b) {
				var c = data.getSetting(a.data.treeId);
				if (b.open) {
					if (0 == tools.apply(c.callback.beforeCollapse, [c.treeId, b], !0)) return !0;
					data.getRoot(c).expandTriggerFlag = !0, view.switchNode(c, b)
				} else {
					if (0 == tools.apply(c.callback.beforeExpand, [c.treeId, b], !0)) return !0;
					data.getRoot(c).expandTriggerFlag = !0, view.switchNode(c, b)
				}
				return !0
			},
			onClickNode: function (a, b) {
				var c = data.getSetting(a.data.treeId),
					d = c.view.autoCancelSelected && (a.ctrlKey || a.metaKey) && data.isSelectedNode(c, b) ? 0 : c.view.autoCancelSelected && (a.ctrlKey || a.metaKey) && c.view.selectedMulti ? 2 : 1;
				return 0 == tools.apply(c.callback.beforeClick, [c.treeId, b, d], !0) ? !0 : (0 === d ? view.cancelPreSelectedNode(c, b) : view.selectNode(c, b, 2 === d), c.treeObj.trigger(consts.event.CLICK, [a, c.treeId, b, d]), !0)
			},
			onZTreeMousedown: function (a, b) {
				var c = data.getSetting(a.data.treeId);
				return tools.apply(c.callback.beforeMouseDown, [c.treeId, b], !0) && tools.apply(c.callback.onMouseDown, [a, c.treeId, b]), !0
			},
			onZTreeMouseup: function (a, b) {
				var c = data.getSetting(a.data.treeId);
				return tools.apply(c.callback.beforeMouseUp, [c.treeId, b], !0) && tools.apply(c.callback.onMouseUp, [a, c.treeId, b]), !0
			},
			onZTreeDblclick: function (a, b) {
				var c = data.getSetting(a.data.treeId);
				return tools.apply(c.callback.beforeDblClick, [c.treeId, b], !0) && tools.apply(c.callback.onDblClick, [a, c.treeId, b]), !0
			},
			onZTreeContextmenu: function (a, b) {
				var c = data.getSetting(a.data.treeId);
				return tools.apply(c.callback.beforeRightClick, [c.treeId, b], !0) && tools.apply(c.callback.onRightClick, [a, c.treeId, b]), "function" != typeof c.callback.onRightClick
			},
			onSelectStart: function (a) {
				var b = a.originalEvent.srcElement.nodeName.toLowerCase();
				return "input" === b || "textarea" === b
			}
		},
		tools = {
			apply: function (a, b, c) {
				return "function" == typeof a ? a.apply(r, b ? b : []) : c
			},
			canAsync: function (a, b) {
				var c = a.data.key.children;
				return a.async.enable && b && b.isParent && !(b.zAsync || b[c] && b[c].length > 0)
			},
			clone: function (a) {
				var b, c;
				if (null === a) return null;
				b = tools.isArray(a) ? [] : {};
				for (c in a) b[c] = a[c] instanceof Date ? new Date(a[c].getTime()) : "object" == typeof a[c] ? tools.clone(a[c]) : a[c];
				return b
			},
			eqs: function (a, b) {
				return a.toLowerCase() === b.toLowerCase()
			},
			isArray: function (a) {
				return "[object Array]" === Object.prototype.toString.apply(a)
			},
			$: function (a, b, c) {
				return b && "string" != typeof b && (c = b, b = ""), "string" == typeof a ? $(a, c ? c.treeObj.get(0).ownerDocument : null) : $("#" + a.tId + b, c ? c.treeObj : null)
			},
			getMDom: function (a, b, c) {
				if (!b) return null;
				for (; b && b.id !== a.treeId;) {
					for (var d = 0, e = c.length; b.tagName && e > d; d++)
						if (tools.eqs(b.tagName, c[d].tagName) && null !== b.getAttribute(c[d].attrName)) return b;
					b = b.parentNode
				}
				return null
			},
			getNodeMainDom: function (a) {
				return $(a).parent("li").get(0) || $(a).parentsUntil("li").parent().get(0)
			},
			isChildOrSelf: function (a, b) {
				return $(a).closest("#" + b).length > 0
			},
			uCanDo: function () {
				return !0
			}
		},
		view = {
			addNodes: function (a, b, c, d, e) {
				if (!a.data.keep.leaf || !b || b.isParent)
					if (tools.isArray(d) || (d = [d]), a.data.simpleData.enable && (d = data.transformTozTreeFormat(a, d)), b) {
						var f = $$(b, consts.id.SWITCH, a),
							g = $$(b, consts.id.ICON, a),
							h = $$(b, consts.id.UL, a);
						b.open || (view.replaceSwitchClass(b, f, consts.folder.CLOSE), view.replaceIcoClass(b, g, consts.folder.CLOSE), b.open = !1, h.css({
							display: "none"
						})), data.addNodesData(a, b, c, d), view.createNodes(a, b.level + 1, d, b, c), e || view.expandCollapseParentNode(a, b, !0)
					} else data.addNodesData(a, data.getRoot(a), c, d), view.createNodes(a, 0, d, null, c)
			},
			appendNodes: function (a, b, c, d, e, f, g) {
				var h, i, l, m, j, k, n, o, p, q;
				if (!c) return [];
				for (h = [], i = a.data.key.children, j = d ? d : data.getRoot(a), k = j[i], (!k || e >= k.length) && (e = -1), n = 0, o = c.length; o > n; n++) p = c[n], f && (l = (0 === e || k.length == c.length) && 0 == n, m = 0 > e && n == c.length - 1, data.initNode(a, b, p, d, l, m, g), data.addNodeCache(a, p)), q = [], p[i] && p[i].length > 0 && (q = view.appendNodes(a, b + 1, p[i], p, -1, f, g && p.open)), g && (view.makeDOMNodeMainBefore(h, a, p), view.makeDOMNodeLine(h, a, p), data.getBeforeA(a, p, h), view.makeDOMNodeNameBefore(h, a, p), data.getInnerBeforeA(a, p, h), view.makeDOMNodeIcon(h, a, p), data.getInnerAfterA(a, p, h), view.makeDOMNodeNameAfter(h, a, p), data.getAfterA(a, p, h), p.isParent && p.open && view.makeUlHtml(a, p, h, q.join("")), view.makeDOMNodeMainAfter(h, a, p), data.addCreatedNode(a, p));
				return h
			},
			appendParentULDom: function (a, b) {
				var e, f, g, c = [],
					d = $$(b, a);
				!d.get(0) && b.parentTId && (view.appendParentULDom(a, b.getParentNode()), d = $$(b, a)), e = $$(b, consts.id.UL, a), e.get(0) && e.remove(), f = a.data.key.children, g = view.appendNodes(a, b.level + 1, b[f], b, -1, !1, !0), view.makeUlHtml(a, b, c, g.join("")), d.append(c.join(""))
			},
			asyncNode: function (d, e, f, g) {
				var i, l, icoObj, tmpParam, pKey, spKey, p, _tmpV;
				if (e && !e.isParent) return tools.apply(g), !1;
				if (e && e.isAjaxing) return !1;
				if (0 == tools.apply(d.callback.beforeAsync, [d.treeId, e], !0)) return tools.apply(g), !1;
				for (e && (e.isAjaxing = !0, icoObj = $$(e, consts.id.ICON, d), icoObj.attr({
						style: "",
						"class": consts.className.BUTTON + " " + consts.className.ICO_LOADING
					})), tmpParam = {}, i = 0, l = d.async.autoParam.length; e && l > i; i++) pKey = d.async.autoParam[i].split("="), spKey = pKey, pKey.length > 1 && (spKey = pKey[1], pKey = pKey[0]), tmpParam[spKey] = e[pKey];
				if (tools.isArray(d.async.otherParam))
					for (i = 0, l = d.async.otherParam.length; l > i; i += 2) tmpParam[d.async.otherParam[i]] = d.async.otherParam[i + 1];
				else
					for (p in d.async.otherParam) tmpParam[p] = d.async.otherParam[p];
				return _tmpV = data.getRoot(d)._ver, $.ajax({
					contentType: d.async.contentType,
					cache: !1,
					type: d.async.type,
					url: tools.apply(d.async.url, [d.treeId, e], d.async.url),
					data: tmpParam,
					dataType: d.async.dataType,
					success: function (a) {
						if (_tmpV == data.getRoot(d)._ver) {
							var b = [];
							try {
								b = a && 0 != a.length ? "string" == typeof a ? eval("(" + a + ")") : a : []
							} catch (err) {
								b = a
							}
							e && (e.isAjaxing = null, e.zAsync = !0), view.setNodeLineIcos(d, e), b && "" !== b ? (b = tools.apply(d.async.dataFilter, [d.treeId, e, b], b), view.addNodes(d, e, -1, b ? tools.clone(b) : [], !!f)) : view.addNodes(d, e, -1, [], !!f), d.treeObj.trigger(consts.event.ASYNC_SUCCESS, [d.treeId, e, a]), tools.apply(g)
						}
					},
					error: function (a, b, c) {
						_tmpV == data.getRoot(d)._ver && (e && (e.isAjaxing = null), view.setNodeLineIcos(d, e), d.treeObj.trigger(consts.event.ASYNC_ERROR, [d.treeId, e, a, b, c]))
					}
				}), !0
			},
			cancelPreSelectedNode: function (a, b, c) {
				var e, f, d = data.getRoot(a).curSelectedList;
				for (e = d.length - 1; e >= 0; e--)
					if (f = d[e], b === f || !b && (!c || c !== f)) {
						if ($$(f, consts.id.A, a).removeClass(consts.node.CURSELECTED), b) {
							data.removeSelectedNode(a, b);
							break
						}
						d.splice(e, 1), a.treeObj.trigger(consts.event.UNSELECTED, [a.treeId, f])
					}
			},
			createNodeCallback: function (a) {
				var b, c;
				if (a.callback.onNodeCreated || a.view.addDiyDom)
					for (b = data.getRoot(a); b.createdNodes.length > 0;) c = b.createdNodes.shift(), tools.apply(a.view.addDiyDom, [a.treeId, c]), a.callback.onNodeCreated && a.treeObj.trigger(consts.event.NODECREATED, [a.treeId, c])
			},
			createNodes: function (a, b, c, d, e) {
				var f, g, h, j, k, i, l;
				c && 0 != c.length && (f = data.getRoot(a), g = a.data.key.children, h = !d || d.open || !!$$(d[g][0], a).get(0), f.createdNodes = [], i = view.appendNodes(a, b, c, d, e, !0, h), d ? (l = $$(d, consts.id.UL, a), l.get(0) && (j = l)) : j = a.treeObj, j && (e >= 0 && (k = j.children()[e]), e >= 0 && k ? $(k).before(i.join("")) : j.append(i.join(""))), view.createNodeCallback(a))
			},
			destroy: function (a) {
				a && (data.initCache(a), data.initRoot(a), event.unbindTree(a), event.unbindEvent(a), a.treeObj.empty(), delete settings[a.treeId])
			},
			expandCollapseNode: function (a, b, c, d, e) {
				var h, i, j, k, l, f = data.getRoot(a),
					g = a.data.key.children;
				return b ? (f.expandTriggerFlag && (i = e, h = function () {
					i && i(), b.open ? a.treeObj.trigger(consts.event.EXPAND, [a.treeId, b]) : a.treeObj.trigger(consts.event.COLLAPSE, [a.treeId, b])
				}, e = h, f.expandTriggerFlag = !1), !b.open && b.isParent && (!$$(b, consts.id.UL, a).get(0) || b[g] && b[g].length > 0 && !$$(b[g][0], a).get(0)) && (view.appendParentULDom(a, b), view.createNodeCallback(a)), b.open == c ? (tools.apply(e, []), void 0) : (j = $$(b, consts.id.UL, a), k = $$(b, consts.id.SWITCH, a), l = $$(b, consts.id.ICON, a), b.isParent ? (b.open = !b.open, b.iconOpen && b.iconClose && l.attr("style", view.makeNodeIcoStyle(a, b)), b.open ? (view.replaceSwitchClass(b, k, consts.folder.OPEN), view.replaceIcoClass(b, l, consts.folder.OPEN), 0 == d || "" == a.view.expandSpeed ? (j.show(), tools.apply(e, [])) : b[g] && b[g].length > 0 ? j.slideDown(a.view.expandSpeed, e) : (j.show(), tools.apply(e, []))) : (view.replaceSwitchClass(b, k, consts.folder.CLOSE), view.replaceIcoClass(b, l, consts.folder.CLOSE), 0 != d && "" != a.view.expandSpeed && b[g] && b[g].length > 0 ? j.slideUp(a.view.expandSpeed, e) : (j.hide(), tools.apply(e, [])))) : tools.apply(e, []), void 0)) : (tools.apply(e, []), void 0)
			},
			expandCollapseParentNode: function (a, b, c, d, e) {
				if (b) {
					if (!b.parentTId) return view.expandCollapseNode(a, b, c, d, e), void 0;
					view.expandCollapseNode(a, b, c, d), b.parentTId && view.expandCollapseParentNode(a, b.getParentNode(), c, d, e)
				}
			},
			expandCollapseSonNode: function (a, b, c, d, e) {
				var k, l, f = data.getRoot(a),
					g = a.data.key.children,
					h = b ? b[g] : f[g],
					i = b ? !1 : d,
					j = data.getRoot(a).expandTriggerFlag;
				if (data.getRoot(a).expandTriggerFlag = !1, h)
					for (k = 0, l = h.length; l > k; k++) h[k] && view.expandCollapseSonNode(a, h[k], c, i);
				data.getRoot(a).expandTriggerFlag = j, view.expandCollapseNode(a, b, c, d, e)
			},
			isSelectedNode: function (a, b) {
				if (!b) return !1;
				var d, c = data.getRoot(a).curSelectedList;
				for (d = c.length - 1; d >= 0; d--)
					if (b === c[d]) return !0;
				return !1
			},
			makeDOMNodeIcon: function (a, b, c) {
				var d = data.getNodeName(b, c),
					e = b.view.nameIsHTML ? d : d.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
				a.push("<span id='", c.tId, consts.id.ICON, "' title='' treeNode", consts.id.ICON, " class='", view.makeNodeIcoClass(b, c), "' style='", view.makeNodeIcoStyle(b, c), "'></span><span id='", c.tId, consts.id.SPAN, "' class='", consts.className.NAME, "'>", e, "</span>")
			},
			makeDOMNodeLine: function (a, b, c) {
				a.push("<span id='", c.tId, consts.id.SWITCH, "' title='' class='", view.makeNodeLineClass(b, c), "' treeNode", consts.id.SWITCH, "></span>")
			},
			makeDOMNodeMainAfter: function (a) {
				a.push("</li>")
			},
			makeDOMNodeMainBefore: function (a, b, c) {
				a.push("<li id='", c.tId, "' class='", consts.className.LEVEL, c.level, "' tabindex='0' hidefocus='true' treenode>")
			},
			makeDOMNodeNameAfter: function (a) {
				a.push("</a>")
			},
			makeDOMNodeNameBefore: function (a, b, c) {
				var h, d = data.getNodeTitle(b, c),
					e = view.makeNodeUrl(b, c),
					f = view.makeNodeFontCss(b, c),
					g = [];
				for (h in f) g.push(h, ":", f[h], ";");
				a.push("<a id='", c.tId, consts.id.A, "' class='", consts.className.LEVEL, c.level, "' treeNode", consts.id.A, ' onclick="', c.click || "", '" ', null != e && e.length > 0 ? "href='" + e + "'" : "", " target='", view.makeNodeTarget(c), "' style='", g.join(""), "'"), tools.apply(b.view.showTitle, [b.treeId, c], b.view.showTitle) && d && a.push("title='", d.replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), "'"), a.push(">")
			},
			makeNodeFontCss: function (a, b) {
				var c = tools.apply(a.view.fontCss, [a.treeId, b], a.view.fontCss);
				return c && "function" != typeof c ? c : {}
			},
			makeNodeIcoClass: function (a, b) {
				var c = ["ico"];
				return b.isAjaxing || (c[0] = (b.iconSkin ? b.iconSkin + "_" : "") + c[0], b.isParent ? c.push(b.open ? consts.folder.OPEN : consts.folder.CLOSE) : c.push(consts.folder.DOCU)), consts.className.BUTTON + " " + c.join("_")
			},
			makeNodeIcoStyle: function (a, b) {
				var d, c = [];
				return b.isAjaxing || (d = b.isParent && b.iconOpen && b.iconClose ? b.open ? b.iconOpen : b.iconClose : b[a.data.key.icon], d && c.push("background:url(", d, ") 0 0 no-repeat;"), 0 != a.view.showIcon && tools.apply(a.view.showIcon, [a.treeId, b], !0) || c.push("width:0px;height:0px;")), c.join("")
			},
			makeNodeLineClass: function (a, b) {
				var c = [];
				return a.view.showLine ? 0 == b.level && b.isFirstNode && b.isLastNode ? c.push(consts.line.ROOT) : 0 == b.level && b.isFirstNode ? c.push(consts.line.ROOTS) : b.isLastNode ? c.push(consts.line.BOTTOM) : c.push(consts.line.CENTER) : c.push(consts.line.NOLINE), b.isParent ? c.push(b.open ? consts.folder.OPEN : consts.folder.CLOSE) : c.push(consts.folder.DOCU), view.makeNodeLineClassEx(b) + c.join("_")
			},
			makeNodeLineClassEx: function (a) {
				return consts.className.BUTTON + " " + consts.className.LEVEL + a.level + " " + consts.className.SWITCH + " "
			},
			makeNodeTarget: function (a) {
				return a.target || "_blank"
			},
			makeNodeUrl: function (a, b) {
				var c = a.data.key.url;
				return b[c] ? b[c] : null
			},
			makeUlHtml: function (a, b, c, d) {
				c.push("<ul id='", b.tId, consts.id.UL, "' class='", consts.className.LEVEL, b.level, " ", view.makeUlLineClass(a, b), "' style='display:", b.open ? "block" : "none", "'>"), c.push(d), c.push("</ul>")
			},
			makeUlLineClass: function (a, b) {
				return a.view.showLine && !b.isLastNode ? consts.line.LINE : ""
			},
			removeChildNodes: function (a, b) {
				var c, d, e, f, g, h;
				if (b && (c = a.data.key.children, d = b[c])) {
					for (e = 0, f = d.length; f > e; e++) data.removeNodeCache(a, d[e]);
					data.removeSelectedNode(a), delete b[c], a.data.keep.parent ? $$(b, consts.id.UL, a).empty() : (b.isParent = !1, b.open = !1, g = $$(b, consts.id.SWITCH, a), h = $$(b, consts.id.ICON, a), view.replaceSwitchClass(b, g, consts.folder.DOCU), view.replaceIcoClass(b, h, consts.folder.DOCU), $$(b, consts.id.UL, a).remove())
				}
			},
			scrollIntoView: function (a) {
				if (a)
					if (a.scrollIntoViewIfNeeded) a.scrollIntoViewIfNeeded();
					else if (a.scrollIntoView) a.scrollIntoView(!1);
				else try {
					a.focus().blur()
				} catch (b) {}
			},
			setFirstNode: function (a, b) {
				var c = a.data.key.children,
					d = b[c].length;
				d > 0 && (b[c][0].isFirstNode = !0)
			},
			setLastNode: function (a, b) {
				var c = a.data.key.children,
					d = b[c].length;
				d > 0 && (b[c][d - 1].isLastNode = !0)
			},
			removeNode: function (a, b) {
				var f, g, h, i, j, k, l, m, c = data.getRoot(a),
					d = a.data.key.children,
					e = b.parentTId ? b.getParentNode() : c;
				if (b.isFirstNode = !1, b.isLastNode = !1, b.getPreNode = function () {
						return null
					}, b.getNextNode = function () {
						return null
					}, data.getNodeCache(a, b.tId)) {
					for ($$(b, a).remove(), data.removeNodeCache(a, b), data.removeSelectedNode(a, b), f = 0, g = e[d].length; g > f; f++)
						if (e[d][f].tId == b.tId) {
							e[d].splice(f, 1);
							break
						}
					view.setFirstNode(a, e), view.setLastNode(a, e), k = e[d].length, a.data.keep.parent || 0 != k ? a.view.showLine && k > 0 && (l = e[d][k - 1], h = $$(l, consts.id.UL, a), i = $$(l, consts.id.SWITCH, a), j = $$(l, consts.id.ICON, a), e == c ? 1 == e[d].length ? view.replaceSwitchClass(l, i, consts.line.ROOT) : (m = $$(e[d][0], consts.id.SWITCH, a), view.replaceSwitchClass(e[d][0], m, consts.line.ROOTS), view.replaceSwitchClass(l, i, consts.line.BOTTOM)) : view.replaceSwitchClass(l, i, consts.line.BOTTOM), h.removeClass(consts.line.LINE)) : (e.isParent = !1, e.open = !1, h = $$(e, consts.id.UL, a), i = $$(e, consts.id.SWITCH, a), j = $$(e, consts.id.ICON, a), view.replaceSwitchClass(e, i, consts.folder.DOCU), view.replaceIcoClass(e, j, consts.folder.DOCU), h.css("display", "none"))
				}
			},
			replaceIcoClass: function (a, b, c) {
				var d, e;
				if (b && !a.isAjaxing && (d = b.attr("class"), void 0 != d)) {
					switch (e = d.split("_"), c) {
						case consts.folder.OPEN:
						case consts.folder.CLOSE:
						case consts.folder.DOCU:
							e[e.length - 1] = c
					}
					b.attr("class", e.join("_"))
				}
			},
			replaceSwitchClass: function (a, b, c) {
				var d, e;
				if (b && (d = b.attr("class"), void 0 != d)) {
					switch (e = d.split("_"), c) {
						case consts.line.ROOT:
						case consts.line.ROOTS:
						case consts.line.CENTER:
						case consts.line.BOTTOM:
						case consts.line.NOLINE:
							e[0] = view.makeNodeLineClassEx(a) + c;
							break;
						case consts.folder.OPEN:
						case consts.folder.CLOSE:
						case consts.folder.DOCU:
							e[1] = c
					}
					b.attr("class", e.join("_")), c !== consts.folder.DOCU ? b.removeAttr("disabled") : b.attr("disabled", "disabled")
				}
			},
			selectNode: function (a, b, c) {
				c || view.cancelPreSelectedNode(a, null, b), $$(b, consts.id.A, a).addClass(consts.node.CURSELECTED), data.addSelectedNode(a, b), a.treeObj.trigger(consts.event.SELECTED, [a.treeId, b])
			},
			setNodeFontCss: function (a, b) {
				var c = $$(b, consts.id.A, a),
					d = view.makeNodeFontCss(a, b);
				d && c.css(d)
			},
			setNodeLineIcos: function (a, b) {
				if (b) {
					var c = $$(b, consts.id.SWITCH, a),
						d = $$(b, consts.id.UL, a),
						e = $$(b, consts.id.ICON, a),
						f = view.makeUlLineClass(a, b);
					0 == f.length ? d.removeClass(consts.line.LINE) : d.addClass(f), c.attr("class", view.makeNodeLineClass(a, b)), b.isParent ? c.removeAttr("disabled") : c.attr("disabled", "disabled"), e.removeAttr("style"), e.attr("style", view.makeNodeIcoStyle(a, b)), e.attr("class", view.makeNodeIcoClass(a, b))
				}
			},
			setNodeName: function (a, b) {
				var e, c = data.getNodeTitle(a, b),
					d = $$(b, consts.id.SPAN, a);
				d.empty(), a.view.nameIsHTML ? d.html(data.getNodeName(a, b)) : d.text(data.getNodeName(a, b)), tools.apply(a.view.showTitle, [a.treeId, b], a.view.showTitle) && (e = $$(b, consts.id.A, a), e.attr("title", c ? c : ""))
			},
			setNodeTarget: function (a, b) {
				var c = $$(b, consts.id.A, a);
				c.attr("target", view.makeNodeTarget(b))
			},
			setNodeUrl: function (a, b) {
				var c = $$(b, consts.id.A, a),
					d = view.makeNodeUrl(a, b);
				null == d || 0 == d.length ? c.removeAttr("href") : c.attr("href", d)
			},
			switchNode: function (a, b) {
				if (b.open || !tools.canAsync(a, b)) view.expandCollapseNode(a, b, !b.open);
				else if (a.async.enable) {
					if (!view.asyncNode(a, b)) return view.expandCollapseNode(a, b, !b.open), void 0
				} else b && view.expandCollapseNode(a, b, !b.open)
			}
		};
	$.fn.zTree = {
		consts: _consts,
		_z: {
			tools: tools,
			view: view,
			event: event,
			data: data
		},
		getZTreeObj: function (a) {
			var b = data.getZTreeTools(a);
			return b ? b : null
		},
		destroy: function (a) {
			if (a && a.length > 0) view.destroy(data.getSetting(a));
			else
				for (var b in settings) view.destroy(settings[b])
		},
		init: function (a, b, c) {
			var e, f, g, d = tools.clone(_setting);
			return $.extend(!0, d, b), d.treeId = a.attr("id"), d.treeObj = a, d.treeObj.empty(), settings[d.treeId] = d, "undefined" == typeof document.body.style.maxHeight && (d.view.expandSpeed = ""), data.initRoot(d), e = data.getRoot(d), f = d.data.key.children, c = c ? tools.clone(tools.isArray(c) ? c : [c]) : [], e[f] = d.data.simpleData.enable ? data.transformTozTreeFormat(d, c) : c, data.initCache(d), event.unbindTree(d), event.bindTree(d), event.unbindEvent(d), event.bindEvent(d), g = {
				setting: d,
				addNodes: function (a, b, c, e) {
					function h() {
						view.addNodes(d, a, b, g, 1 == e)
					}
					var f, g;
					return a || (a = null), a && !a.isParent && d.data.keep.leaf ? null : (f = parseInt(b, 10), isNaN(f) ? (e = !!c, c = b, b = -1) : b = f, c ? (g = tools.clone(tools.isArray(c) ? c : [c]), tools.canAsync(d, a) ? view.asyncNode(d, a, e, h) : h(), g) : null)
				},
				cancelSelectedNode: function (a) {
					view.cancelPreSelectedNode(d, a)
				},
				destroy: function () {
					view.destroy(d)
				},
				expandAll: function (a) {
					return a = !!a, view.expandCollapseSonNode(d, null, a, !0), a
				},
				expandNode: function (a, b, c, e, f) {
					function g() {
						var b = $$(a, d).get(0);
						b && e !== !1 && view.scrollIntoView(b)
					}
					return a && a.isParent ? (b !== !0 && b !== !1 && (b = !a.open), f = !!f, f && b && 0 == tools.apply(d.callback.beforeExpand, [d.treeId, a], !0) ? null : f && !b && 0 == tools.apply(d.callback.beforeCollapse, [d.treeId, a], !0) ? null : (b && a.parentTId && view.expandCollapseParentNode(d, a.getParentNode(), b, !1), b !== a.open || c ? (data.getRoot(d).expandTriggerFlag = f, !tools.canAsync(d, a) && c ? view.expandCollapseSonNode(d, a, b, !0, g) : (a.open = !b, view.switchNode(this.setting, a), g()), b) : null)) : null
				},
				getNodes: function () {
					return data.getNodes(d)
				},
				getNodeByParam: function (a, b, c) {
					return a ? data.getNodeByParam(d, c ? c[d.data.key.children] : data.getNodes(d), a, b) : null
				},
				getNodeByTId: function (a) {
					return data.getNodeCache(d, a)
				},
				getNodesByParam: function (a, b, c) {
					return a ? data.getNodesByParam(d, c ? c[d.data.key.children] : data.getNodes(d), a, b) : null
				},
				getNodesByParamFuzzy: function (a, b, c) {
					return a ? data.getNodesByParamFuzzy(d, c ? c[d.data.key.children] : data.getNodes(d), a, b) : null
				},
				getNodesByFilter: function (a, b, c, e) {
					return b = !!b, a && "function" == typeof a ? data.getNodesByFilter(d, c ? c[d.data.key.children] : data.getNodes(d), a, b, e) : b ? null : []
				},
				getNodeIndex: function (a) {
					var b, c, e, f;
					if (!a) return null;
					for (b = d.data.key.children, c = a.parentTId ? a.getParentNode() : data.getRoot(d), e = 0, f = c[b].length; f > e; e++)
						if (c[b][e] == a) return e;
					return -1
				},
				getSelectedNodes: function () {
					var c, e, a = [],
						b = data.getRoot(d).curSelectedList;
					for (c = 0, e = b.length; e > c; c++) a.push(b[c]);
					return a
				},
				isSelectedNode: function (a) {
					return data.isSelectedNode(d, a)
				},
				reAsyncChildNodes: function (a, b, c) {
					var e, f, g, h, i;
					if (this.setting.async.enable) {
						if (e = !a, e && (a = data.getRoot(d)), "refresh" == b) {
							for (f = this.setting.data.key.children, g = 0, h = a[f] ? a[f].length : 0; h > g; g++) data.removeNodeCache(d, a[f][g]);
							data.removeSelectedNode(d), a[f] = [], e ? this.setting.treeObj.empty() : (i = $$(a, consts.id.UL, d), i.empty())
						}
						view.asyncNode(this.setting, e ? null : a, !!c)
					}
				},
				refresh: function () {
					this.setting.treeObj.empty();
					var a = data.getRoot(d),
						b = a[d.data.key.children];
					data.initRoot(d), a[d.data.key.children] = b, data.initCache(d), view.createNodes(d, 0, a[d.data.key.children], null, -1)
				},
				removeChildNodes: function (a) {
					if (!a) return null;
					var b = d.data.key.children,
						c = a[b];
					return view.removeChildNodes(d, a), c ? c : null
				},
				removeNode: function (a, b) {
					a && (b = !!b, b && 0 == tools.apply(d.callback.beforeRemove, [d.treeId, a], !0) || (view.removeNode(d, a), b && this.setting.treeObj.trigger(consts.event.REMOVE, [d.treeId, a])))
				},
				selectNode: function (a, b, c) {
					function f() {
						if (!c) {
							var b = $$(a, d).get(0);
							view.scrollIntoView(b)
						}
					}
					if (a && tools.uCanDo(d)) {
						if (b = d.view.selectedMulti && b, a.parentTId) view.expandCollapseParentNode(d, a.getParentNode(), !0, !1, f);
						else if (!c) try {
							$$(a, d).focus().blur()
						} catch (e) {}
						view.selectNode(d, a, b)
					}
				},
				transformTozTreeNodes: function (a) {
					return data.transformTozTreeFormat(d, a)
				},
				transformToArray: function (a) {
					return data.transformToArrayFormat(d, a)
				},
				updateNode: function (a) {
					if (a) {
						var c = $$(a, d);
						c.get(0) && tools.uCanDo(d) && (view.setNodeName(d, a), view.setNodeTarget(d, a), view.setNodeUrl(d, a), view.setNodeLineIcos(d, a), view.setNodeFontCss(d, a))
					}
				}
			}, e.treeTools = g, data.setZTreeTools(d, g), e[f] && e[f].length > 0 ? view.createNodes(d, 0, e[f], null, -1) : d.async.enable && d.async.url && "" !== d.async.url && view.asyncNode(d), g
		}
	}, r = $.fn.zTree, $$ = tools.$, consts = r.consts
}(jQuery),
function (a) {
	var r, s, t, u, v, x, y, z, A, b = {
			event: {
				CHECK: "ztree_check"
			},
			id: {
				CHECK: "_check"
			},
			checkbox: {
				STYLE: "checkbox",
				DEFAULT: "chk",
				DISABLED: "disable",
				FALSE: "false",
				TRUE: "true",
				FULL: "full",
				PART: "part",
				FOCUS: "focus"
			},
			radio: {
				STYLE: "radio",
				TYPE_ALL: "all",
				TYPE_LEVEL: "level"
			}
		},
		c = {
			check: {
				enable: !1,
				autoCheckTrigger: !1,
				chkStyle: b.checkbox.STYLE,
				nocheckInherit: !1,
				chkDisabledInherit: !1,
				radioType: b.radio.TYPE_LEVEL,
				chkboxType: {
					Y: "ps",
					N: "ps"
				}
			},
			data: {
				key: {
					checked: "checked"
				}
			},
			callback: {
				beforeCheck: null,
				onCheck: null
			}
		},
		d = function (a) {
			var b = v.getRoot(a);
			b.radioCheckedList = []
		},
		e = function () {},
		f = function (a) {
			var b = a.treeObj,
				c = t.event;
			b.bind(c.CHECK, function (b, c, d, e) {
				b.srcEvent = c, s.apply(a.callback.onCheck, [b, d, e])
			})
		},
		g = function (a) {
			var b = a.treeObj,
				c = t.event;
			b.unbind(c.CHECK)
		},
		h = function (a) {
			var j, b = a.target,
				c = v.getSetting(a.data.treeId),
				d = "",
				e = null,
				f = "",
				g = "",
				h = null,
				i = null;
			if (s.eqs(a.type, "mouseover") ? c.check.enable && s.eqs(b.tagName, "span") && null !== b.getAttribute("treeNode" + t.id.CHECK) && (d = s.getNodeMainDom(b).id, f = "mouseoverCheck") : s.eqs(a.type, "mouseout") ? c.check.enable && s.eqs(b.tagName, "span") && null !== b.getAttribute("treeNode" + t.id.CHECK) && (d = s.getNodeMainDom(b).id, f = "mouseoutCheck") : s.eqs(a.type, "click") && c.check.enable && s.eqs(b.tagName, "span") && null !== b.getAttribute("treeNode" + t.id.CHECK) && (d = s.getNodeMainDom(b).id, f = "checkNode"), d.length > 0) switch (e = v.getNodeCache(c, d), f) {
				case "checkNode":
					h = n.onCheckNode;
					break;
				case "mouseoverCheck":
					h = n.onMouseoverCheck;
					break;
				case "mouseoutCheck":
					h = n.onMouseoutCheck
			}
			return j = {
				stop: "checkNode" === f,
				node: e,
				nodeEventType: f,
				nodeEventCallback: h,
				treeEventType: g,
				treeEventCallback: i
			}
		},
		i = function (a, b, c, d) {
			var h, i;
			c && (h = a.data.key.checked, "string" == typeof c[h] && (c[h] = s.eqs(c[h], "true")), c[h] = !!c[h], c.checkedOld = c[h], "string" == typeof c.nocheck && (c.nocheck = s.eqs(c.nocheck, "true")), c.nocheck = !!c.nocheck || a.check.nocheckInherit && d && !!d.nocheck, "string" == typeof c.chkDisabled && (c.chkDisabled = s.eqs(c.chkDisabled, "true")), c.chkDisabled = !!c.chkDisabled || a.check.chkDisabledInherit && d && !!d.chkDisabled, "string" == typeof c.halfCheck && (c.halfCheck = s.eqs(c.halfCheck, "true")), c.halfCheck = !!c.halfCheck, c.check_Child_State = -1, c.check_Focus = !1, c.getCheckStatus = function () {
				return v.getCheckStatus(a, c)
			}, a.check.chkStyle == t.radio.STYLE && a.check.radioType == t.radio.TYPE_ALL && c[h] && (i = v.getRoot(a), i.radioCheckedList.push(c)))
		},
		j = function (a, b, c) {
			a.data.key.checked, a.check.enable && (v.makeChkFlag(a, b), c.push("<span ID='", b.tId, t.id.CHECK, "' class='", u.makeChkClass(a, b), "' treeNode", t.id.CHECK, b.nocheck === !0 ? " style='display:none;'" : "", "></span>"))
		},
		k = function (a, b) {
			b.checkNode = function (a, b, c, d) {
				var f, e = this.setting.data.key.checked;
				a.chkDisabled !== !0 && (b !== !0 && b !== !1 && (b = !a[e]), d = !!d, (a[e] !== b || c) && (d && 0 == s.apply(this.setting.callback.beforeCheck, [this.setting.treeId, a], !0) || s.uCanDo(this.setting) && this.setting.check.enable && a.nocheck !== !0 && (a[e] = b, f = x(a, t.id.CHECK, this.setting), (c || this.setting.check.chkStyle === t.radio.STYLE) && u.checkNodeRelation(this.setting, a), u.setChkClass(this.setting, f, a), u.repairParentChkClassWithSelf(this.setting, a), d && this.setting.treeObj.trigger(t.event.CHECK, [null, this.setting.treeId, a]))))
			}, b.checkAllNodes = function (a) {
				u.repairAllChk(this.setting, !!a)
			}, b.getCheckedNodes = function (a) {
				var b = this.setting.data.key.children;
				return a = a !== !1, v.getTreeCheckedNodes(this.setting, v.getRoot(this.setting)[b], a)
			}, b.getChangeCheckedNodes = function () {
				var a = this.setting.data.key.children;
				return v.getTreeChangeCheckedNodes(this.setting, v.getRoot(this.setting)[a])
			}, b.setChkDisabled = function (a, b, c, d) {
				b = !!b, c = !!c, d = !!d, u.repairSonChkDisabled(this.setting, a, b, d), u.repairParentChkDisabled(this.setting, a.getParentNode(), b, c)
			};
			var c = b.updateNode;
			b.updateNode = function (a, d) {
				var e, f;
				c && c.apply(b, arguments), a && this.setting.check.enable && (e = x(a, this.setting), e.get(0) && s.uCanDo(this.setting) && (f = x(a, t.id.CHECK, this.setting), (1 == d || this.setting.check.chkStyle === t.radio.STYLE) && u.checkNodeRelation(this.setting, a), u.setChkClass(this.setting, f, a), u.repairParentChkClassWithSelf(this.setting, a)))
			}
		},
		l = {
			getRadioCheckedList: function (a) {
				var c, d, b = v.getRoot(a).radioCheckedList;
				for (c = 0, d = b.length; d > c; c++) v.getNodeCache(a, b[c].tId) || (b.splice(c, 1), c--, d--);
				return b
			},
			getCheckStatus: function (a, b) {
				if (!a.check.enable || b.nocheck || b.chkDisabled) return null;
				var c = a.data.key.checked,
					d = {
						checked: b[c],
						half: b.halfCheck ? b.halfCheck : a.check.chkStyle == t.radio.STYLE ? 2 === b.check_Child_State : b[c] ? b.check_Child_State > -1 && b.check_Child_State < 2 : b.check_Child_State > 0
					};
				return d
			},
			getTreeCheckedNodes: function (a, b, c, d) {
				var e, f, g, h, i;
				if (!b) return [];
				for (e = a.data.key.children, f = a.data.key.checked, g = c && a.check.chkStyle == t.radio.STYLE && a.check.radioType == t.radio.TYPE_ALL, d = d ? d : [], h = 0, i = b.length; i > h && (b[h].nocheck === !0 || b[h].chkDisabled === !0 || b[h][f] != c || (d.push(b[h]), !g)) && (v.getTreeCheckedNodes(a, b[h][e], c, d), !(g && d.length > 0)); h++);
				return d
			},
			getTreeChangeCheckedNodes: function (a, b, c) {
				var d, e, f, g;
				if (!b) return [];
				for (d = a.data.key.children, e = a.data.key.checked, c = c ? c : [], f = 0, g = b.length; g > f; f++) b[f].nocheck !== !0 && b[f].chkDisabled !== !0 && b[f][e] != b[f].checkedOld && c.push(b[f]), v.getTreeChangeCheckedNodes(a, b[f][d], c);
				return c
			},
			makeChkFlag: function (a, b) {
				var c, d, e, f, g, h, i;
				if (b) {
					if (c = a.data.key.children, d = a.data.key.checked, e = -1, b[c])
						for (f = 0, g = b[c].length; g > f; f++)
							if (h = b[c][f], i = -1, a.check.chkStyle == t.radio.STYLE) {
								if (i = h.nocheck === !0 || h.chkDisabled === !0 ? h.check_Child_State : h.halfCheck === !0 ? 2 : h[d] ? 2 : h.check_Child_State > 0 ? 2 : 0, 2 == i) {
									e = 2;
									break
								}
								0 == i && (e = 0)
							} else if (a.check.chkStyle == t.checkbox.STYLE) {
						if (i = h.nocheck === !0 || h.chkDisabled === !0 ? h.check_Child_State : h.halfCheck === !0 ? 1 : h[d] ? -1 === h.check_Child_State || 2 === h.check_Child_State ? 2 : 1 : h.check_Child_State > 0 ? 1 : 0, 1 === i) {
							e = 1;
							break
						}
						if (2 === i && e > -1 && f > 0 && i !== e) {
							e = 1;
							break
						}
						if (2 === e && i > -1 && 2 > i) {
							e = 1;
							break
						}
						i > -1 && (e = i)
					}
					b.check_Child_State = e
				}
			}
		},
		m = {},
		n = {
			onCheckNode: function (a, b) {
				var c, d, e;
				return b.chkDisabled === !0 ? !1 : (c = v.getSetting(a.data.treeId), d = c.data.key.checked, 0 == s.apply(c.callback.beforeCheck, [c.treeId, b], !0) ? !0 : (b[d] = !b[d], u.checkNodeRelation(c, b), e = x(b, t.id.CHECK, c), u.setChkClass(c, e, b), u.repairParentChkClassWithSelf(c, b), c.treeObj.trigger(t.event.CHECK, [a, c.treeId, b]), !0))
			},
			onMouseoverCheck: function (a, b) {
				if (b.chkDisabled === !0) return !1;
				var c = v.getSetting(a.data.treeId),
					d = x(b, t.id.CHECK, c);
				return b.check_Focus = !0, u.setChkClass(c, d, b), !0
			},
			onMouseoutCheck: function (a, b) {
				if (b.chkDisabled === !0) return !1;
				var c = v.getSetting(a.data.treeId),
					d = x(b, t.id.CHECK, c);
				return b.check_Focus = !1, u.setChkClass(c, d, b), !0
			}
		},
		o = {},
		p = {
			checkNodeRelation: function (a, b) {
				var c, d, e, i, j, f = a.data.key.children,
					g = a.data.key.checked,
					h = t.radio;
				if (a.check.chkStyle == h.STYLE) {
					if (i = v.getRadioCheckedList(a), b[g])
						if (a.check.radioType == h.TYPE_ALL) {
							for (d = i.length - 1; d >= 0; d--) c = i[d], c[g] && c != b && (c[g] = !1, i.splice(d, 1), u.setChkClass(a, x(c, t.id.CHECK, a), c), c.parentTId != b.parentTId && u.repairParentChkClassWithSelf(a, c));
							i.push(b)
						} else
							for (j = b.parentTId ? b.getParentNode() : v.getRoot(a), d = 0, e = j[f].length; e > d; d++) c = j[f][d], c[g] && c != b && (c[g] = !1, u.setChkClass(a, x(c, t.id.CHECK, a), c));
					else if (a.check.radioType == h.TYPE_ALL)
						for (d = 0, e = i.length; e > d; d++)
							if (b == i[d]) {
								i.splice(d, 1);
								break
							}
				} else b[g] && (!b[f] || 0 == b[f].length || a.check.chkboxType.Y.indexOf("s") > -1) && u.setSonNodeCheckBox(a, b, !0), b[g] || b[f] && 0 != b[f].length && !(a.check.chkboxType.N.indexOf("s") > -1) || u.setSonNodeCheckBox(a, b, !1), b[g] && a.check.chkboxType.Y.indexOf("p") > -1 && u.setParentNodeCheckBox(a, b, !0), !b[g] && a.check.chkboxType.N.indexOf("p") > -1 && u.setParentNodeCheckBox(a, b, !1)
			},
			makeChkClass: function (a, b) {
				var g, c = a.data.key.checked,
					d = t.checkbox,
					e = t.radio,
					f = "";
				return f = b.chkDisabled === !0 ? d.DISABLED : b.halfCheck ? d.PART : a.check.chkStyle == e.STYLE ? b.check_Child_State < 1 ? d.FULL : d.PART : b[c] ? 2 === b.check_Child_State || -1 === b.check_Child_State ? d.FULL : d.PART : b.check_Child_State < 1 ? d.FULL : d.PART, g = a.check.chkStyle + "_" + (b[c] ? d.TRUE : d.FALSE) + "_" + f, g = b.check_Focus && b.chkDisabled !== !0 ? g + "_" + d.FOCUS : g, t.className.BUTTON + " " + d.DEFAULT + " " + g
			},
			repairAllChk: function (a, b) {
				var c, d, e, f, g, h;
				if (a.check.enable && a.check.chkStyle === t.checkbox.STYLE)
					for (c = a.data.key.checked, d = a.data.key.children, e = v.getRoot(a), f = 0, g = e[d].length; g > f; f++) h = e[d][f], h.nocheck !== !0 && h.chkDisabled !== !0 && (h[c] = b), u.setSonNodeCheckBox(a, h, b)
			},
			repairChkClass: function (a, b) {
				if (b && (v.makeChkFlag(a, b), b.nocheck !== !0)) {
					var c = x(b, t.id.CHECK, a);
					u.setChkClass(a, c, b)
				}
			},
			repairParentChkClass: function (a, b) {
				if (b && b.parentTId) {
					var c = b.getParentNode();
					u.repairChkClass(a, c), u.repairParentChkClass(a, c)
				}
			},
			repairParentChkClassWithSelf: function (a, b) {
				if (b) {
					var c = a.data.key.children;
					b[c] && b[c].length > 0 ? u.repairParentChkClass(a, b[c][0]) : u.repairParentChkClass(a, b)
				}
			},
			repairSonChkDisabled: function (a, b, c, d) {
				var e, f, g, h;
				if (b && (e = a.data.key.children, b.chkDisabled != c && (b.chkDisabled = c), u.repairChkClass(a, b), b[e] && d))
					for (f = 0, g = b[e].length; g > f; f++) h = b[e][f], u.repairSonChkDisabled(a, h, c, d)
			},
			repairParentChkDisabled: function (a, b, c, d) {
				b && (b.chkDisabled != c && d && (b.chkDisabled = c), u.repairChkClass(a, b), u.repairParentChkDisabled(a, b.getParentNode(), c, d))
			},
			setChkClass: function (a, b, c) {
				b && (c.nocheck === !0 ? b.hide() : b.show(), b.attr("class", u.makeChkClass(a, c)))
			},
			setParentNodeCheckBox: function (a, b, c, d) {
				var h, i, j, k, e = a.data.key.children,
					f = a.data.key.checked,
					g = x(b, t.id.CHECK, a);
				if (d || (d = b), v.makeChkFlag(a, b), b.nocheck !== !0 && b.chkDisabled !== !0 && (b[f] = c, u.setChkClass(a, g, b), a.check.autoCheckTrigger && b != d && a.treeObj.trigger(t.event.CHECK, [null, a.treeId, b])), b.parentTId) {
					if (h = !0, !c)
						for (i = b.getParentNode()[e], j = 0, k = i.length; k > j; j++)
							if (i[j].nocheck !== !0 && i[j].chkDisabled !== !0 && i[j][f] || (i[j].nocheck === !0 || i[j].chkDisabled === !0) && i[j].check_Child_State > 0) {
								h = !1;
								break
							}
					h && u.setParentNodeCheckBox(a, b.getParentNode(), c, d)
				}
			},
			setSonNodeCheckBox: function (a, b, c, d) {
				var e, f, g, h, i, j, k;
				if (b) {
					if (e = a.data.key.children, f = a.data.key.checked, g = x(b, t.id.CHECK, a), d || (d = b), h = !1, b[e])
						for (i = 0, j = b[e].length; j > i; i++) k = b[e][i], u.setSonNodeCheckBox(a, k, c, d), k.chkDisabled === !0 && (h = !0);
					b != v.getRoot(a) && b.chkDisabled !== !0 && (h && b.nocheck !== !0 && v.makeChkFlag(a, b), b.nocheck !== !0 && b.chkDisabled !== !0 ? (b[f] = c, h || (b.check_Child_State = b[e] && b[e].length > 0 ? c ? 2 : 0 : -1)) : b.check_Child_State = -1, u.setChkClass(a, g, b), a.check.autoCheckTrigger && b != d && b.nocheck !== !0 && b.chkDisabled !== !0 && a.treeObj.trigger(t.event.CHECK, [null, a.treeId, b]))
				}
			}
		},
		q = {
			tools: o,
			view: p,
			event: m,
			data: l
		};
	a.extend(!0, a.fn.zTree.consts, b), a.extend(!0, a.fn.zTree._z, q), r = a.fn.zTree, s = r._z.tools, t = r.consts, u = r._z.view, v = r._z.data, r._z.event, x = s.$, v.exSetting(c), v.addInitBind(f), v.addInitUnBind(g), v.addInitCache(e), v.addInitNode(i), v.addInitProxy(h, !0), v.addInitRoot(d), v.addBeforeA(j), v.addZTreeTools(k), y = u.createNodes, u.createNodes = function (a, b, c, d) {
		y && y.apply(u, arguments), c && u.repairParentChkClassWithSelf(a, d)
	}, z = u.removeNode, u.removeNode = function (a, b) {
		var c = b.getParentNode();
		z && z.apply(u, arguments), b && c && (u.repairChkClass(a, c), u.repairParentChkClass(a, c))
	}, A = u.appendNodes, u.appendNodes = function (a, b, c, d) {
		var h = "";
		return A && (h = A.apply(u, arguments)), d && v.makeChkFlag(a, d), h
	}
}(jQuery),
function (a) {
	var q, r, s, t, u, w, x, y, z, A, B, C, b = {
			event: {
				DRAG: "ztree_drag",
				DROP: "ztree_drop",
				RENAME: "ztree_rename",
				DRAGMOVE: "ztree_dragmove"
			},
			id: {
				EDIT: "_edit",
				INPUT: "_input",
				REMOVE: "_remove"
			},
			move: {
				TYPE_INNER: "inner",
				TYPE_PREV: "prev",
				TYPE_NEXT: "next"
			},
			node: {
				CURSELECTED_EDIT: "curSelectedNode_Edit",
				TMPTARGET_TREE: "tmpTargetzTree",
				TMPTARGET_NODE: "tmpTargetNode"
			}
		},
		c = {
			edit: {
				enable: !1,
				editNameSelectAll: !1,
				showRemoveBtn: !0,
				showRenameBtn: !0,
				removeTitle: "remove",
				renameTitle: "rename",
				drag: {
					autoExpandTrigger: !1,
					isCopy: !0,
					isMove: !0,
					prev: !0,
					next: !0,
					inner: !0,
					minMoveSize: 5,
					borderMax: 10,
					borderMin: -5,
					maxShowNodeNum: 5,
					autoOpenTime: 500
				}
			},
			view: {
				addHoverDom: null,
				removeHoverDom: null
			},
			callback: {
				beforeDrag: null,
				beforeDragOpen: null,
				beforeDrop: null,
				beforeEditName: null,
				beforeRename: null,
				onDrag: null,
				onDragMove: null,
				onDrop: null,
				onRename: null
			}
		},
		d = function (a) {
			var b = u.getRoot(a),
				c = u.getRoots();
			b.curEditNode = null, b.curEditInput = null, b.curHoverNode = null, b.dragFlag = 0, b.dragNodeShowBefore = [], b.dragMaskList = new Array, c.showHoverDom = !0
		},
		e = function () {},
		f = function (a) {
			var b = a.treeObj,
				c = s.event;
			b.bind(c.RENAME, function (b, c, d, e) {
				r.apply(a.callback.onRename, [b, c, d, e])
			}), b.bind(c.DRAG, function (b, c, d, e) {
				r.apply(a.callback.onDrag, [c, d, e])
			}), b.bind(c.DRAGMOVE, function (b, c, d, e) {
				r.apply(a.callback.onDragMove, [c, d, e])
			}), b.bind(c.DROP, function (b, c, d, e, f, g, h) {
				r.apply(a.callback.onDrop, [c, d, e, f, g, h])
			})
		},
		g = function (a) {
			var b = a.treeObj,
				c = s.event;
			b.unbind(c.RENAME), b.unbind(c.DRAG), b.unbind(c.DRAGMOVE), b.unbind(c.DROP)
		},
		h = function (a) {
			var l, b = a.target,
				c = u.getSetting(a.data.treeId),
				d = a.relatedTarget,
				e = "",
				f = null,
				g = "",
				h = "",
				i = null,
				j = null,
				k = null;
			if (r.eqs(a.type, "mouseover") ? (k = r.getMDom(c, b, [{
					tagName: "a",
					attrName: "treeNode" + s.id.A
				}]), k && (e = r.getNodeMainDom(k).id, g = "hoverOverNode")) : r.eqs(a.type, "mouseout") ? (k = r.getMDom(c, d, [{
					tagName: "a",
					attrName: "treeNode" + s.id.A
				}]), k || (e = "remove", g = "hoverOutNode")) : r.eqs(a.type, "mousedown") && (k = r.getMDom(c, b, [{
					tagName: "a",
					attrName: "treeNode" + s.id.A
				}]), k && (e = r.getNodeMainDom(k).id, g = "mousedownNode")), e.length > 0) switch (f = u.getNodeCache(c, e), g) {
				case "mousedownNode":
					i = m.onMousedownNode;
					break;
				case "hoverOverNode":
					i = m.onHoverOverNode;
					break;
				case "hoverOutNode":
					i = m.onHoverOutNode
			}
			return l = {
				stop: !1,
				node: f,
				nodeEventType: g,
				nodeEventCallback: i,
				treeEventType: h,
				treeEventCallback: j
			}
		},
		i = function (a, b, c) {
			c && (c.isHover = !1, c.editNameFlag = !1)
		},
		j = function (a, b) {
			b.cancelEditName = function (a) {
				var b = u.getRoot(this.setting);
				b.curEditNode && t.cancelCurEditNode(this.setting, a ? a : null, !0)
			}, b.copyNode = function (a, b, c, d) {
				function g() {
					t.addNodes(e.setting, a, -1, [f], d)
				}
				if (!b) return null;
				if (a && !a.isParent && this.setting.data.keep.leaf && c === s.move.TYPE_INNER) return null;
				var e = this,
					f = r.clone(b);
				return a || (a = null, c = s.move.TYPE_INNER), c == s.move.TYPE_INNER ? r.canAsync(this.setting, a) ? t.asyncNode(this.setting, a, d, g) : g() : (t.addNodes(this.setting, a.parentNode, -1, [f], d), t.moveNode(this.setting, a, f, c, !1, d)), f
			}, b.editName = function (a) {
				a && a.tId && a === u.getNodeCache(this.setting, a.tId) && (a.parentTId && t.expandCollapseParentNode(this.setting, a.getParentNode(), !0), t.editNode(this.setting, a))
			}, b.moveNode = function (a, b, c, d) {
				function f() {
					t.moveNode(e.setting, a, b, c, !1, d)
				}
				if (!b) return b;
				if (a && !a.isParent && this.setting.data.keep.leaf && c === s.move.TYPE_INNER) return null;
				if (a && (b.parentTId == a.tId && c == s.move.TYPE_INNER || w(b, this.setting).find("#" + a.tId).length > 0)) return null;
				a || (a = null);
				var e = this;
				return r.canAsync(this.setting, a) && c === s.move.TYPE_INNER ? t.asyncNode(this.setting, a, d, f) : f(), b
			}, b.setEditable = function (a) {
				return this.setting.edit.enable = a, this.refresh()
			}
		},
		k = {
			setSonNodeLevel: function (a, b, c) {
				var d, e, f;
				if (c && (d = a.data.key.children, c.level = b ? b.level + 1 : 0, c[d]))
					for (e = 0, f = c[d].length; f > e; e++) c[d][e] && u.setSonNodeLevel(a, c, c[d][e])
			}
		},
		l = {},
		m = {
			onHoverOverNode: function (a, b) {
				var c = u.getSetting(a.data.treeId),
					d = u.getRoot(c);
				d.curHoverNode != b && m.onHoverOutNode(a), d.curHoverNode = b, t.addHoverDom(c, b)
			},
			onHoverOutNode: function (a) {
				var c = u.getSetting(a.data.treeId),
					d = u.getRoot(c);
				d.curHoverNode && !u.isSelectedNode(c, d.curHoverNode) && (t.removeTreeDom(c, d.curHoverNode), d.curHoverNode = null)
			},
			onMousedownNode: function (c, d) {
				function I(c) {
					function rb() {
						q = null, D = "", E = s.move.TYPE_INNER, p.css({
							display: "none"
						}), window.zTreeMoveTimer && (clearTimeout(window.zTreeMoveTimer), window.zTreeMoveTargetNodeTId = null)
					}
					var d, e, f, j, k, y, I, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, $, _, ab, bb, cb, db, eb, fb, gb, hb, ib, jb, kb, lb, mb, nb, ob, pb, qb, sb, tb, ub, vb, wb, xb, yb, zb;
					if (0 == h.dragFlag && Math.abs(F - c.clientX) < g.edit.drag.minMoveSize && Math.abs(G - c.clientY) < g.edit.drag.minMoveSize) return !0;
					if (y = g.data.key.children, n.css("cursor", "pointer"), 0 == h.dragFlag) {
						if (0 == r.apply(g.callback.beforeDrag, [g.treeId, l], !0)) return J(c), !0;
						for (d = 0, e = l.length; e > d; d++) 0 == d && (h.dragNodeShowBefore = []), f = l[d], f.isParent && f.open ? (t.expandCollapseNode(g, f, !f.open), h.dragNodeShowBefore[f.tId] = !0) : h.dragNodeShowBefore[f.tId] = !1;
						if (h.dragFlag = 1, i.showHoverDom = !1, r.showIfameMask(g, !0), I = !0, K = -1, l.length > 1)
							for (L = l[0].parentTId ? l[0].getParentNode()[y] : u.getNodes(g), k = [], d = 0, e = L.length; e > d; d++)
								if (void 0 !== h.dragNodeShowBefore[L[d].tId] && (I && K > -1 && K + 1 !== d && (I = !1), k.push(L[d]), K = d), l.length === k.length) {
									l = k;
									break
								}
						for (I && (z = l[0].getPreNode(), A = l[l.length - 1].getNextNode()), o = w("<ul class='zTreeDragUL'></ul>", g), d = 0, e = l.length; e > d; d++) f = l[d], f.editNameFlag = !1, t.selectNode(g, f, d > 0), t.removeTreeDom(g, f), d > g.edit.drag.maxShowNodeNum - 1 || (j = w("<li id='" + f.tId + "_tmp'></li>", g), j.append(w(f, s.id.A, g).clone()), j.css("padding", "0"), j.children("#" + f.tId + s.id.A).removeClass(s.node.CURSELECTED), o.append(j), d == g.edit.drag.maxShowNodeNum - 1 && (j = w("<li id='" + f.tId + "_moretmp'><a>  ...  </a></li>", g), o.append(j)));
						o.attr("id", l[0].tId + s.id.UL + "_tmp"), o.addClass(g.treeObj.attr("class")), o.appendTo(n), p = w("<span class='tmpzTreeMove_arrow'></span>", g), p.attr("id", "zTreeMove_arrow_tmp"), p.appendTo(n), g.treeObj.trigger(s.event.DRAG, [c, g.treeId, l])
					}
					if (1 == h.dragFlag) {
						q && p.attr("id") == c.target.id && D && c.clientX + m.scrollLeft() + 2 > a("#" + D + s.id.A, q).offset().left ? (M = a("#" + D + s.id.A, q), c.target = M.length > 0 ? M.get(0) : c.target) : q && (q.removeClass(s.node.TMPTARGET_TREE), D && a("#" + D + s.id.A, q).removeClass(s.node.TMPTARGET_NODE + "_" + s.move.TYPE_PREV).removeClass(s.node.TMPTARGET_NODE + "_" + b.move.TYPE_NEXT).removeClass(s.node.TMPTARGET_NODE + "_" + b.move.TYPE_INNER)), q = null, D = null, v = !1, x = g, N = u.getSettings();
						for (O in N) N[O].treeId && N[O].edit.enable && N[O].treeId != g.treeId && (c.target.id == N[O].treeId || a(c.target).parents("#" + N[O].treeId).length > 0) && (v = !0, x = N[O]);
						if (P = m.scrollTop(), Q = m.scrollLeft(), R = x.treeObj.offset(), S = x.treeObj.get(0).scrollHeight, T = x.treeObj.get(0).scrollWidth, U = c.clientY + P - R.top, V = x.treeObj.height() + R.top - c.clientY - P, W = c.clientX + Q - R.left, X = x.treeObj.width() + R.left - c.clientX - Q, Y = U < g.edit.drag.borderMax && U > g.edit.drag.borderMin, Z = V < g.edit.drag.borderMax && V > g.edit.drag.borderMin, $ = W < g.edit.drag.borderMax && W > g.edit.drag.borderMin, _ = X < g.edit.drag.borderMax && X > g.edit.drag.borderMin, ab = U > g.edit.drag.borderMin && V > g.edit.drag.borderMin && W > g.edit.drag.borderMin && X > g.edit.drag.borderMin, bb = Y && x.treeObj.scrollTop() <= 0, cb = Z && x.treeObj.scrollTop() + x.treeObj.height() + 10 >= S, db = $ && x.treeObj.scrollLeft() <= 0, eb = _ && x.treeObj.scrollLeft() + x.treeObj.width() + 10 >= T, c.target && r.isChildOrSelf(c.target, x.treeId)) {
							for (fb = c.target; fb && fb.tagName && !r.eqs(fb.tagName, "li") && fb.id != x.treeId;) fb = fb.parentNode;
							for (gb = !0, d = 0, e = l.length; e > d; d++) {
								if (f = l[d], fb.id === f.tId) {
									gb = !1;
									break
								}
								if (w(f, g).find("#" + fb.id).length > 0) {
									gb = !1;
									break
								}
							}
							gb && c.target && r.isChildOrSelf(c.target, fb.id + s.id.A) && (q = a(fb), D = fb.id)
						}
						f = l[0], ab && r.isChildOrSelf(c.target, x.treeId) && (!q && (c.target.id == x.treeId || bb || cb || db || eb) && (v || !v && f.parentTId) && (q = x.treeObj), Y ? x.treeObj.scrollTop(x.treeObj.scrollTop() - 10) : Z && x.treeObj.scrollTop(x.treeObj.scrollTop() + 10), $ ? x.treeObj.scrollLeft(x.treeObj.scrollLeft() - 10) : _ && x.treeObj.scrollLeft(x.treeObj.scrollLeft() + 10), q && q != x.treeObj && q.offset().left < x.treeObj.offset().left && x.treeObj.scrollLeft(x.treeObj.scrollLeft() + q.offset().left - x.treeObj.offset().left)), o.css({
							top: c.clientY + P + 3 + "px",
							left: c.clientX + Q + 3 + "px"
						}), hb = 0, ib = 0, q && q.attr("id") != x.treeId ? (jb = null == D ? null : u.getNodeCache(x, D), kb = (c.ctrlKey || c.metaKey) && g.edit.drag.isMove && g.edit.drag.isCopy || !g.edit.drag.isMove && g.edit.drag.isCopy, lb = !(!z || D !== z.tId), mb = !(!A || D !== A.tId), nb = f.parentTId && f.parentTId == D, ob = (kb || !mb) && r.apply(x.edit.drag.prev, [x.treeId, l, jb], !!x.edit.drag.prev), pb = (kb || !lb) && r.apply(x.edit.drag.next, [x.treeId, l, jb], !!x.edit.drag.next), qb = !(!kb && nb || x.data.keep.leaf && !jb.isParent || !r.apply(x.edit.drag.inner, [x.treeId, l, jb], !!x.edit.drag.inner)), ob || pb || qb ? (sb = a("#" + D + s.id.A, q), tb = jb.isLastNode ? null : a("#" + jb.getNextNode().tId + s.id.A, q.next()), ub = sb.offset().top, vb = sb.offset().left, wb = ob ? qb ? .25 : pb ? .5 : 1 : -1, xb = pb ? qb ? .75 : ob ? .5 : 0 : -1, yb = (c.clientY + P - ub) / sb.height(), (1 == wb || wb >= yb && yb >= -.2) && ob ? (hb = 1 - p.width(), ib = ub - p.height() / 2, E = s.move.TYPE_PREV) : (0 == xb || yb >= xb && 1.2 >= yb) && pb ? (hb = 1 - p.width(), ib = null == tb || jb.isParent && jb.open ? ub + sb.height() - p.height() / 2 : tb.offset().top - p.height() / 2, E = s.move.TYPE_NEXT) : qb ? (hb = 5 - p.width(), ib = ub, E = s.move.TYPE_INNER) : rb(), q && (p.css({
							display: "block",
							top: ib + "px",
							left: vb + hb + "px"
						}), sb.addClass(s.node.TMPTARGET_NODE + "_" + E), (B != D || C != E) && (H = (new Date).getTime()), jb && jb.isParent && E == s.move.TYPE_INNER && (zb = !0, window.zTreeMoveTimer && window.zTreeMoveTargetNodeTId !== jb.tId ? (clearTimeout(window.zTreeMoveTimer), window.zTreeMoveTargetNodeTId = null) : window.zTreeMoveTimer && window.zTreeMoveTargetNodeTId === jb.tId && (zb = !1), zb && (window.zTreeMoveTimer = setTimeout(function () {
							E == s.move.TYPE_INNER && jb && jb.isParent && !jb.open && (new Date).getTime() - H > x.edit.drag.autoOpenTime && r.apply(x.callback.beforeDragOpen, [x.treeId, jb], !0) && (t.switchNode(x, jb), x.edit.drag.autoExpandTrigger && x.treeObj.trigger(s.event.EXPAND, [x.treeId, jb]))
						}, x.edit.drag.autoOpenTime + 50), window.zTreeMoveTargetNodeTId = jb.tId)))) : rb()) : (E = s.move.TYPE_INNER, q && r.apply(x.edit.drag.inner, [x.treeId, l, null], !!x.edit.drag.inner) ? q.addClass(s.node.TMPTARGET_TREE) : q = null, p.css({
							display: "none"
						}), window.zTreeMoveTimer && (clearTimeout(window.zTreeMoveTimer), window.zTreeMoveTargetNodeTId = null)), B = D, C = E, g.treeObj.trigger(s.event.DRAGMOVE, [c, g.treeId, l])
					}
					return !1
				}

				function J(c) {
					function A() {
						var a, b, d;
						if (v) {
							if (!j)
								for (a = 0, b = l.length; b > a; a++) t.removeNode(g, l[a]);
							E == s.move.TYPE_INNER ? t.addNodes(x, k, -1, z) : t.addNodes(x, k.getParentNode(), E == s.move.TYPE_PREV ? k.getIndex() : k.getIndex() + 1, z)
						} else if (j && E == s.move.TYPE_INNER) t.addNodes(x, k, -1, z);
						else if (j) t.addNodes(x, k.getParentNode(), E == s.move.TYPE_PREV ? k.getIndex() : k.getIndex() + 1, z);
						else if (E != s.move.TYPE_NEXT)
							for (a = 0, b = z.length; b > a; a++) t.moveNode(x, k, z[a], E, !1);
						else
							for (a = -1, b = z.length - 1; b > a; b--) t.moveNode(x, k, z[b], E, !1);
						t.selectNodes(x, z), d = w(z[0], g).get(0), t.scrollIntoView(d), g.treeObj.trigger(s.event.DROP, [c, x.treeId, z, k, E, j])
					}
					var d, e, f, j, k, z;
					if (window.zTreeMoveTimer && (clearTimeout(window.zTreeMoveTimer), window.zTreeMoveTargetNodeTId = null), B = null, C = null, m.unbind("mousemove", I), m.unbind("mouseup", J), m.unbind("selectstart", K), n.css("cursor", "auto"), q && (q.removeClass(s.node.TMPTARGET_TREE), D && a("#" + D + s.id.A, q).removeClass(s.node.TMPTARGET_NODE + "_" + s.move.TYPE_PREV).removeClass(s.node.TMPTARGET_NODE + "_" + b.move.TYPE_NEXT).removeClass(s.node.TMPTARGET_NODE + "_" + b.move.TYPE_INNER)), r.showIfameMask(g, !1), i.showHoverDom = !0, 0 != h.dragFlag) {
						for (h.dragFlag = 0, d = 0, e = l.length; e > d; d++) f = l[d], f.isParent && h.dragNodeShowBefore[f.tId] && !f.open && (t.expandCollapseNode(g, f, !f.open), delete h.dragNodeShowBefore[f.tId]);
						if (o && o.remove(), p && p.remove(), j = (c.ctrlKey || c.metaKey) && g.edit.drag.isMove && g.edit.drag.isCopy || !g.edit.drag.isMove && g.edit.drag.isCopy, !j && q && D && l[0].parentTId && D == l[0].parentTId && E == s.move.TYPE_INNER && (q = null), q) {
							if (k = null == D ? null : u.getNodeCache(x, D), 0 == r.apply(g.callback.beforeDrop, [x.treeId, l, k, E, j], !0)) return t.selectNodes(y, l), void 0;
							z = j ? r.clone(l) : l, E == s.move.TYPE_INNER && r.canAsync(x, k) ? t.asyncNode(x, k, !1, A) : A()
						} else t.selectNodes(y, l), g.treeObj.trigger(s.event.DROP, [c, g.treeId, l, null, null, null])
					}
				}

				function K() {
					return !1
				}
				var e, f, j, k, l, o, p, q, z, A, m, n, v, x, y, B, C, D, E, F, G, H, g = u.getSetting(c.data.treeId),
					h = u.getRoot(g),
					i = u.getRoots();
				if (2 == c.button || !g.edit.enable || !g.edit.drag.isCopy && !g.edit.drag.isMove) return !0;
				if (j = c.target, k = u.getRoot(g).curSelectedList, l = [], u.isSelectedNode(g, d))
					for (e = 0, f = k.length; f > e; e++) {
						if (k[e].editNameFlag && r.eqs(j.tagName, "input") && null !== j.getAttribute("treeNode" + s.id.INPUT)) return !0;
						if (l.push(k[e]), l[0].parentTId !== k[e].parentTId) {
							l = [d];
							break
						}
					} else l = [d];
				return t.editNodeBlur = !0, t.cancelCurEditNode(g), m = a(g.treeObj.get(0).ownerDocument), n = a(g.treeObj.get(0).ownerDocument.body), v = !1, x = g, y = g, B = null, C = null, D = null, E = s.move.TYPE_INNER, F = c.clientX, G = c.clientY, H = (new Date).getTime(), r.uCanDo(g) && m.bind("mousemove", I), m.bind("mouseup", J), m.bind("selectstart", K), c.preventDefault && c.preventDefault(), !0
			}
		},
		n = {
			getAbs: function (a) {
				var b = a.getBoundingClientRect(),
					c = document.body.scrollTop + document.documentElement.scrollTop,
					d = document.body.scrollLeft + document.documentElement.scrollLeft;
				return [b.left + d, b.top + c]
			},
			inputFocus: function (a) {
				a.get(0) && (a.focus(), r.setCursorPosition(a.get(0), a.val().length))
			},
			inputSelect: function (a) {
				a.get(0) && (a.focus(), a.select())
			},
			setCursorPosition: function (a, b) {
				if (a.setSelectionRange) a.focus(), a.setSelectionRange(b, b);
				else if (a.createTextRange) {
					var c = a.createTextRange();
					c.collapse(!0), c.moveEnd("character", b), c.moveStart("character", b), c.select()
				}
			},
			showIfameMask: function (a, b) {
				for (var d, e, f, g, h, i, c = u.getRoot(a); c.dragMaskList.length > 0;) c.dragMaskList[0].remove(), c.dragMaskList.shift();
				if (b)
					for (d = w("iframe", a), e = 0, f = d.length; f > e; e++) g = d.get(e), h = r.getAbs(g), i = w("<div id='zTreeMask_" + e + "' class='zTreeMask' style='top:" + h[1] + "px; left:" + h[0] + "px; width:" + g.offsetWidth + "px; height:" + g.offsetHeight + "px;'></div>", a), i.appendTo(w("body", a)), c.dragMaskList.push(i)
			}
		},
		o = {
			addEditBtn: function (a, b) {
				if (!(b.editNameFlag || w(b, s.id.EDIT, a).length > 0) && r.apply(a.edit.showRenameBtn, [a.treeId, b], a.edit.showRenameBtn)) {
					var c = w(b, s.id.A, a),
						d = "<span class='" + s.className.BUTTON + " edit' id='" + b.tId + s.id.EDIT + "' title='" + r.apply(a.edit.renameTitle, [a.treeId, b], a.edit.renameTitle) + "' treeNode" + s.id.EDIT + " style='display:none;'></span>";
					c.append(d), w(b, s.id.EDIT, a).bind("click", function () {
						return r.uCanDo(a) && 0 != r.apply(a.callback.beforeEditName, [a.treeId, b], !0) ? (t.editNode(a, b), !1) : !1
					}).show()
				}
			},
			addRemoveBtn: function (a, b) {
				if (!(b.editNameFlag || w(b, s.id.REMOVE, a).length > 0) && r.apply(a.edit.showRemoveBtn, [a.treeId, b], a.edit.showRemoveBtn)) {
					var c = w(b, s.id.A, a),
						d = "<span class='" + s.className.BUTTON + " remove' id='" + b.tId + s.id.REMOVE + "' title='" + r.apply(a.edit.removeTitle, [a.treeId, b], a.edit.removeTitle) + "' treeNode" + s.id.REMOVE + " style='display:none;'></span>";
					c.append(d), w(b, s.id.REMOVE, a).bind("click", function () {
						return r.uCanDo(a) && 0 != r.apply(a.callback.beforeRemove, [a.treeId, b], !0) ? (t.removeNode(a, b), a.treeObj.trigger(s.event.REMOVE, [a.treeId, b]), !1) : !1
					}).bind("mousedown", function () {
						return !0
					}).show()
				}
			},
			addHoverDom: function (a, b) {
				u.getRoots().showHoverDom && (b.isHover = !0, a.edit.enable && (t.addEditBtn(a, b), t.addRemoveBtn(a, b)), r.apply(a.view.addHoverDom, [a.treeId, b]))
			},
			cancelCurEditNode: function (a, b, c) {
				var g, h, i, d = u.getRoot(a),
					e = a.data.key.name,
					f = d.curEditNode;
				if (f) {
					if (g = d.curEditInput, h = b ? b : c ? f[e] : g.val(), r.apply(a.callback.beforeRename, [a.treeId, f, h, c], !0) === !1) return !1;
					f[e] = h, i = w(f, s.id.A, a), i.removeClass(s.node.CURSELECTED_EDIT), g.unbind(), t.setNodeName(a, f), f.editNameFlag = !1, d.curEditNode = null, d.curEditInput = null, t.selectNode(a, f, !1), a.treeObj.trigger(s.event.RENAME, [a.treeId, f, c])
				}
				return d.noSelection = !0, !0
			},
			editNode: function (a, b) {
				var d, e, c = u.getRoot(a);
				return t.editNodeBlur = !1, u.isSelectedNode(a, b) && c.curEditNode == b && b.editNameFlag ? (setTimeout(function () {
					r.inputFocus(c.curEditInput)
				}, 0), void 0) : (d = a.data.key.name, b.editNameFlag = !0, t.removeTreeDom(a, b), t.cancelCurEditNode(a), t.selectNode(a, b, !1), w(b, s.id.SPAN, a).html("<input type=text class='rename' id='" + b.tId + s.id.INPUT + "' treeNode" + s.id.INPUT + " >"), e = w(b, s.id.INPUT, a), e.attr("value", b[d]), a.edit.editNameSelectAll ? r.inputSelect(e) : r.inputFocus(e), e.bind("blur", function () {
					t.editNodeBlur || t.cancelCurEditNode(a)
				}).bind("keydown", function (b) {
					"13" == b.keyCode ? (t.editNodeBlur = !0, t.cancelCurEditNode(a)) : "27" == b.keyCode && t.cancelCurEditNode(a, null, !0)
				}).bind("click", function () {
					return !1
				}).bind("dblclick", function () {
					return !1
				}), w(b, s.id.A, a).addClass(s.node.CURSELECTED_EDIT), c.curEditInput = e, c.noSelection = !1, c.curEditNode = b, void 0)
			},
			moveNode: function (a, b, c, d, e, f) {
				var i, j, k, l, m, n, o, p, q, r, v, x, y, z, A, B, C, g = u.getRoot(a),
					h = a.data.key.children;
				if (b != c && (!a.data.keep.leaf || !b || b.isParent || d != s.move.TYPE_INNER)) {
					if (i = c.parentTId ? c.getParentNode() : g, j = null === b || b == g, j && null === b && (b = g), j && (d = s.move.TYPE_INNER), k = b.parentTId ? b.getParentNode() : g, d != s.move.TYPE_PREV && d != s.move.TYPE_NEXT && (d = s.move.TYPE_INNER), d == s.move.TYPE_INNER && (j ? c.parentTId = null : (b.isParent || (b.isParent = !0, b.open = !!b.open, t.setNodeLineIcos(a, b)), c.parentTId = b.tId)), j ? (l = a.treeObj, m = l) : (f || d != s.move.TYPE_INNER ? f || t.expandCollapseNode(a, b.getParentNode(), !0, !1) : t.expandCollapseNode(a, b, !0, !1), l = w(b, a), m = w(b, s.id.UL, a), l.get(0) && !m.get(0) && (n = [], t.makeUlHtml(a, b, n, ""), l.append(n.join(""))), m = w(b, s.id.UL, a)), o = w(c, a), o.get(0) ? l.get(0) || o.remove() : o = t.appendNodes(a, c.level, [c], null, -1, !1, !0).join(""), m.get(0) && d == s.move.TYPE_INNER ? m.append(o) : l.get(0) && d == s.move.TYPE_PREV ? l.before(o) : l.get(0) && d == s.move.TYPE_NEXT && l.after(o), r = -1, v = 0, x = null, y = null, z = c.level, c.isFirstNode) r = 0, i[h].length > 1 && (x = i[h][1], x.isFirstNode = !0);
					else if (c.isLastNode) r = i[h].length - 1, x = i[h][r - 1], x.isLastNode = !0;
					else
						for (p = 0, q = i[h].length; q > p; p++)
							if (i[h][p].tId == c.tId) {
								r = p;
								break
							} if (r >= 0 && i[h].splice(r, 1), d != s.move.TYPE_INNER)
						for (p = 0, q = k[h].length; q > p; p++) k[h][p].tId == b.tId && (v = p);
					d == s.move.TYPE_INNER ? (b[h] || (b[h] = new Array), b[h].length > 0 && (y = b[h][b[h].length - 1], y.isLastNode = !1), b[h].splice(b[h].length, 0, c), c.isLastNode = !0, c.isFirstNode = 1 == b[h].length) : b.isFirstNode && d == s.move.TYPE_PREV ? (k[h].splice(v, 0, c), y = b, y.isFirstNode = !1, c.parentTId = b.parentTId, c.isFirstNode = !0, c.isLastNode = !1) : b.isLastNode && d == s.move.TYPE_NEXT ? (k[h].splice(v + 1, 0, c), y = b, y.isLastNode = !1, c.parentTId = b.parentTId, c.isFirstNode = !1, c.isLastNode = !0) : (d == s.move.TYPE_PREV ? k[h].splice(v, 0, c) : k[h].splice(v + 1, 0, c), c.parentTId = b.parentTId, c.isFirstNode = !1, c.isLastNode = !1), u.fixPIdKeyValue(a, c), u.setSonNodeLevel(a, c.getParentNode(), c), t.setNodeLineIcos(a, c), t.repairNodeLevelClass(a, c, z), !a.data.keep.parent && i[h].length < 1 ? (i.isParent = !1, i.open = !1, A = w(i, s.id.UL, a), B = w(i, s.id.SWITCH, a), C = w(i, s.id.ICON, a), t.replaceSwitchClass(i, B, s.folder.DOCU), t.replaceIcoClass(i, C, s.folder.DOCU), A.css("display", "none")) : x && t.setNodeLineIcos(a, x), y && t.setNodeLineIcos(a, y), a.check && a.check.enable && t.repairChkClass && (t.repairChkClass(a, i), t.repairParentChkClassWithSelf(a, i), i != c.parent && t.repairParentChkClassWithSelf(a, c)), f || t.expandCollapseParentNode(a, c.getParentNode(), !0, e)
				}
			},
			removeEditBtn: function (a, b) {
				w(b, s.id.EDIT, a).unbind().remove()
			},
			removeRemoveBtn: function (a, b) {
				w(b, s.id.REMOVE, a).unbind().remove()
			},
			removeTreeDom: function (a, b) {
				b.isHover = !1, t.removeEditBtn(a, b), t.removeRemoveBtn(a, b), r.apply(a.view.removeHoverDom, [a.treeId, b])
			},
			repairNodeLevelClass: function (a, b, c) {
				if (c !== b.level) {
					var d = w(b, a),
						e = w(b, s.id.A, a),
						f = w(b, s.id.UL, a),
						g = s.className.LEVEL + c,
						h = s.className.LEVEL + b.level;
					d.removeClass(g), d.addClass(h), e.removeClass(g), e.addClass(h), f.removeClass(g), f.addClass(h)
				}
			},
			selectNodes: function (a, b) {
				for (var c = 0, d = b.length; d > c; c++) t.selectNode(a, b[c], c > 0)
			}
		},
		p = {
			tools: n,
			view: o,
			event: l,
			data: k
		};
	a.extend(!0, a.fn.zTree.consts, b), a.extend(!0, a.fn.zTree._z, p), q = a.fn.zTree, r = q._z.tools, s = q.consts, t = q._z.view, u = q._z.data, q._z.event, w = r.$, u.exSetting(c), u.addInitBind(f), u.addInitUnBind(g), u.addInitCache(e), u.addInitNode(i), u.addInitProxy(h), u.addInitRoot(d), u.addZTreeTools(j), x = t.cancelPreSelectedNode, t.cancelPreSelectedNode = function (a, b) {
		var d, e, c = u.getRoot(a).curSelectedList;
		for (d = 0, e = c.length; e > d && (b && b !== c[d] || (t.removeTreeDom(a, c[d]), !b)); d++);
		x && x.apply(t, arguments)
	}, y = t.createNodes, t.createNodes = function (a, b, c, d) {
		y && y.apply(t, arguments), c && t.repairParentChkClassWithSelf && t.repairParentChkClassWithSelf(a, d)
	}, z = t.makeNodeUrl, t.makeNodeUrl = function (a) {
		return a.edit.enable ? null : z.apply(t, arguments)
	}, A = t.removeNode, t.removeNode = function (a, b) {
		var c = u.getRoot(a);
		c.curEditNode === b && (c.curEditNode = null), A && A.apply(t, arguments)
	}, B = t.selectNode, t.selectNode = function (a, b) {
		var d = u.getRoot(a);
		return u.isSelectedNode(a, b) && d.curEditNode == b && b.editNameFlag ? !1 : (B && B.apply(t, arguments), t.addHoverDom(a, b), !0)
	}, C = r.uCanDo, r.uCanDo = function (a, b) {
		var c = u.getRoot(a);
		return b && (r.eqs(b.type, "mouseover") || r.eqs(b.type, "mouseout") || r.eqs(b.type, "mousedown") || r.eqs(b.type, "mouseup")) ? !0 : (c.curEditNode && (t.editNodeBlur = !1, c.curEditInput.focus()), !c.curEditNode && (C ? C.apply(t, arguments) : !0))
	}
}(jQuery);
