

<?php

	

	/**
	 * 默认展示的代码
	 */
	$_postCode = $_POST["mod_code"];
	$_postCode_preview = $_POST["mod_code_preview"];
	$_apphide = $_GET["apphide"];


	



	/**
	 * 授权成功后
	 */
	date_default_timezone_set("prc");
	include_once './js/tao_power/API_sdk/TopSdk.php';
	include_once './js/tao_power/oauth.class.php';
	session_start();
	$longin = "";
	if( !isset($_SESSION['uid_skey']) ){	//授权成功
		setcookie("u_login", 0, time()+3600*24);
		$error = $_GET['error'];
		if($error=="access_denied"){
			$longin = "err_zi";
		}
		if( $_GET['code'] && $_COOKIE['url'] ){
			/**
			 * 获取授权用户信息
			 */
			$o = new oauth();
			$o->gets($_GET['code'],$_COOKIE['url']);
			if($o->nick){
				$u_skey =  $o->skey;
				$_SESSION['uid_skey'] = $u_skey;

				setcookie("uid_skey", $u_skey, time()+3600*24);
				setcookie("uid", $o->uid, time()+3600*24);
				setcookie("nick", $o->nick, time()+3600*24);
				setcookie("u_logoUrl", "//img.alicdn.com/imgextra/i2/1867852664/O1CN01wlfIwr1VY9e1yD9Zi_!!1867852664.png", time()+3600*24);
				setcookie("u_login", 1, time()+3600*24);
				
				/**
				 * 获取店铺信息
				 */
				// if($o->logoUrl){
				// 	setcookie("u_logoUrl", "//img.alicdn.com/imgextra".$o->logoUrl, time()+3600*24);
				// }else{
				// 	setcookie("u_logoUrl", "//img.alicdn.com/imgextra/i2/1867852664/O1CN01wlfIwr1VY9e1yD9Zi_!!1867852664.png", time()+3600*24);
				// }
					
			}
		}else{
			setcookie("u_login", 0, time()+3600*24);
		}
	}else{	
		setcookie("u_login", 1, time()+3600*24);  //是否等陆授权标记
	}



?>





<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=8">
		<meta http-equiv="Expires" content="0">
		<meta http-equiv="Pragma" content="no-cache">
		<meta http-equiv="Cache-control" content="no-cache">
		<meta http-equiv="Cache" content="no-cache">
		<title>大师助手-WEEX-创意工具</title>
		<meta name="keywords" content="大师助手,WEEX-创意工具,WEEX-定制服务,淘宝手机店铺装修,店铺装修工具,店铺装修插件,淘宝店铺代码生成,免费淘宝代码生成">
		<meta name="description" content="大师助手淘宝/天猫店铺装修工具,安全高效店铺装修必备。店铺装修大师、美工御用工具！">
		<script src="js/require.js" data-main="js/main.js"></script>
		<link charset="utf-8" href="js/layer/theme/default/layer.css" rel="stylesheet">
		<link charset="utf-8" href="js/takecolor/spectrum.css" rel="stylesheet">
		<link charset="utf-8" href="css/index.css" rel="stylesheet">
		<link charset="utf-8" href="css/wdragUI.css" rel="stylesheet">
		<link charset="utf-8" href="css/edit.css" rel="stylesheet">
		<link charset="utf-8" href="js/smartMenu/menu.css" rel="stylesheet">
		<link charset="utf-8" href="js/tao_power/getImages.css" rel="stylesheet">
	</head>
	<body class="<?php  if($_postCode_preview){ echo "_code_preview_"; } ?>" data-code='<? echo $_postCode;?>' data-colde-preview='<? echo $_postCode_preview; ?>' data-log='<? echo $longin;?>'>
		<div class="previewCode_temp" style="display:none;"></div>
		<div class="content">
			<div class="hd"></div>
			<div class="bd">
				<div class="weexApp" data-ui="wdragUI">
					<div class="uiExpoperat">
						<div class="cnt">
							<span id="uiAdd_Sync" data-title="编辑后可同时移动位置，变化大小" style="display:none;">编组</span>
							<span data-title="右边选择对齐方式">对齐</span>
							<icon data-op="i_1" data-title="顶部对齐">&#xe60b;</icon>
							<icon data-op="i_2" data-title="垂直居中对齐">&#xe607;</icon>
							<icon data-op="i_3" data-title="底部对齐">&#xe60c;</icon>
							<icon data-op="i_4" data-title="左边对齐">&#xe60d;</icon>
							<icon data-op="i_5" data-title="水平居中对齐">&#xe608;</icon>
							<icon data-op="i_6" data-title="右边对齐">&#xe60a;</icon>
							<icon data-op="b_1" data-title="水平居中分布">&#xe603;</icon>
							<icon data-op="b_2" data-title="垂直居中分布">&#xe606;</icon>
						</div>
					</div>
					<div class="ruler">
						<span class="moveLine moveLine_l"><em>0</em></span>
						<span class="moveLine moveLine_c"><em>0</em></span>
						<span class="moveLine moveLine_r"><em>0</em></span>
						<span class="l"></span><span class="c"></span>
						<span class="r"></span>
					</div>
					<div id="top" class="pageTop">
						<div class="top_df">
							<div class="topLeft"><span><img src="img/logo.png" /></span></div>
							<div class="topRight">
								<div class="histRecord"><i class="prev">&#xe656;</i><i class="next">&#xe654;</i></div>
								<div class="Afast_key"><a class="t t3" target="_blank">快捷键<i>&#xe6b0;</i> </a>
									<ul class="fast_key">
										<li><span class="z1">全选：</span><span class="z2">Ctrl + A</span></li>
										<li><span class="z1">双击元素：</span><span class="z2">快速编辑</span></li>
										<li><span class="z1">快速复制：</span><span class="z2">Alt + 移动元素</span></li>
										<li><span class="z1">复制粘贴：</span><span class="z2">ctrl+c -> ctrl+v</span></li>
										<li><span class="z1">多选：</span><span class="z2">Ctrl + 单击</span></li>
										<li><span class="z1">撤销操作：</span><span class="z2">Ctrl + Z</span></li>
										<li><span class="z1">恢复操作：</span><span class="z2">Ctrl + Y</span></li>
										<li><span class="z1">删除元素：</span><span class="z2">Delete</span></li>
										<li><span class="z1">等比缩放：</span><span class="z2">Shift + 移动控点</span></li>
										<li><span class="z1">水平垂直移：</span><span class="z2">Shift + 移动元素</span></li>
										<li><span class="z1">1像素移动：</span><span class="z2">← ↑ → ↓</span></li>
									</ul>
								</div>
								<div class="help"><a href="../pages/help.html?o=weex" target="_blank">帮助教程</a></div>
								<div class="help"><a href="../pages/moku.html" target="_blank">模块库</a></div>
								<div class="operation">
									<span class="zairucode_weex_2">载入代码</span>
									<div class="bornedit editopt"><span class="Export_code">生成</span><span class="Import_code">导入</span></div>
									<div class="shopedit editopt"><span class="Export_code_shop">保存到店铺</span><span class="close_shop">取消</span></div>
									<span class="Preview_code">预览</span>
								</div>
								<div class="operation operation-parent-open">
									<span class="copycode_weex">复制代码</span>
									<span class="zairucode_weex">载入代码</span>
									<span class="close_weex">取消</span>
									<span class="Export_code_shop">保存</span>
								</div>
							</div>
						</div>
						<div class="top_child">
								<div class="child_open_start" style="display:none;"></div>
								<div class="topLeft"><span><img src="img/logo2.png" /></span></div>
								<div class="topRight">
									<div class="histRecord"><i class="prev">&#xe656;</i><i class="next">&#xe654;</i></div>
									<div class="operation"><span class="childSave_code">确定并返回</span><span class="child_close">退出</span></div>
								</div>
						</div>
					</div>
					<div id="left" class="pageLeft">
						<div class="le1">
							<ul><li></li></ul>
						</div>
						<div class="le2" id="appAdd-panel">
							<div class="title" id="appAdd-panel-t"><span>组件面板</span></div>
							<ul class="applistbox">
								<li class="" id="appDrawHots"><icon>&#xe611;</icon><span>绘制热区</span><icon class="in">&#xe62c;</icon></li>
								<li class="app" data-type="apwx_jtup" data-key="0"><icon>&#xe66a;</icon><span>图片</span></li>
								<li class="app" data-type="apwx_jwz" data-key="0"><icon>&#xe652;</icon><span>文字</span></li>
								<li class="app" data-type="apwx_jdjs" data-key="0"><icon>&#xe665;</icon><span>倒计时</span></li>
								<li class="app" data-type="apwx_jsp" data-key="0"><icon>&#xe619;</icon><span>视频</span></li>
								<li class="app" data-type="apwx_jnbo" data-key="0"><icon>&#xe623;</icon><span>轮播</span></li>
								<li class="app" data-type="apwx_jdtuhd" data-key="0"><icon>&#xe620;</icon><span>多图滑动</span></li>
								<li class="app" data-type="apwx_jxdh" data-key="0"><icon>&#xe6ea;</icon><span>循环动画</span></li>
								<li class="app" data-type="apwx_jtgif" data-key="0"><icon>&#xec17;</icon><span>帧动画</span></li>
								<li class="app" data-type="apwx_jkcdh" data-key="0"><icon>&#xe614;</icon><span>开场动画</span></li>
								<?=$_apphide=="false" ? '<li class="app" data-type="apwx_jkctc" data-key="0"><icon>&#xe630;</icon><span>开场弹窗</span></li>':''; ?> 
								<li class="app" data-type="apwx_jgdpic" data-key="0"><icon>&#xe698;</icon><span>滚动图片</span></li> 
								<li class="app" data-type="apwx_jgdtw" data-key="0"><icon>&#xe682;</icon><span>滚动公告</span></li>
								<li class="app" data-type="apwx_jbblb" data-key="0"><icon>&#xe639;</icon><span>宝贝列表</span></li>
								<?=$_apphide=="false" ? '<li class="app" data-type="apwx_jgwc" data-key="0"><icon>&#xe61a;</icon><span>购物车</span></li>':''; ?>
								<li class="app" data-type="apwx_jautoqt" data-key="0"><icon>&#xe60e;</icon><span>智能切图</span></li>
							</ul>
						</div>
					</div>
					<div id="box" class="pageBox">
						<div class="box-wrap">
							<div class="skin-up-save">
								<span class="setskinup-app" style="display:none;"></span>
								<span class="skin-show">样式预设</span>
								<span class="skin-save">+</span>
							</div>
							<div class="box-inner" data-boxselect="open">
								<div id="SJDZ_APP" class="canvas">
									<div class="hot-box"></div>
									<div class="app-box"></div>
								</div>
							</div>
							<div class="opBg"></div>
						</div>
					</div>
					<div id="right" class="pageRight">
						<div class="app-layer">
							<div class="app-layer-hd close tips" data-title="编辑图层"><i class="hd-i">&#xe68a;</i></div>
							<div class="app-layer-bd">
								<div class="name-hd">编辑图层</div>
								<ul class="app-layer-list"></ul>
							</div>
						</div>
						<div class="rmoveHD"></div>
						<div id="appEditPanel" class="rbd">
							<div id="adialog-signal" style="display:none;"></div>
							<div id="adialog-box" class="app-dialog"><div id="adialog-title" class="rhd"></div></div>
						</div>
					</div>
				</div>
			</div>
			<div class="ft"></div>
		</div>
		<div class="codePanel">
			<div class="appSignal" style="display:none;"><span class="getChildData"></span></div>
			<div class="Export epbox">
				<div class="hd"><span class="title">生成代码</span><span class="close">&#xe63f;</span></div>
				<div class="codetip">
					提醒：本工具生成的代码，只能在
					<a href="https://zxn.taobao.com/designer_detail.htm?designerId=1027802" target="_blank">视觉定制</a>
					的模板中使用。
					<a href="https://zxn.taobao.com/designer_detail.htm?designerId=1027802" target="_blank">点击查看全部模板>></a>
				</div>
				<div class="bd">
					<textarea id="ePcodeText"></textarea>
				</div>
				<div class="buttom"><span class="copy">复制代码</span><span class="close2">取消</span></div>
			</div>
			<div class="Import epbox">
				<div class="hd"><span class="title">导入代码</span><span class="close">&#xe63f;</span></div>
				<div class="codetip">
					请在下面输入框中，粘贴JSON代码
				</div>
				<div class="bd">
					<textarea id="ePdaoruCode"></textarea>
				</div>
				<div class="buttom"><span class="impcode">导入</span><span class="close2">取消</span></div>
			</div>
			<div class="heiBg"></div>
		</div>
		<div class="appStyles">
			<div class="skin">
				<div class="hd"><span>选择预设皮肤</span><i class="close">&#xe63f;</i></div>
				<div class="bd">
				</div>
			</div>
			<div class="heiBg"></div>
		</div>
		<div class="tbapps">
			<div class="tbapp_exchange">
				<i class="tu"></i>
				<i class="tu_get"></i>
				<i class="up_tu"></i>
				<i class="up_tu_get"></i>
				<i class="video"></i>
				<i class="tu_video"></i>
				<i class="pck"></i>
				<i class="wxk"></i>
				<i class="wxk_get"></i>
				<i class="wxitem"></i>
				<i class="wxitem_get"></i>
				<span class="open_tb_tip"></span>
			</div>
			<div class="cj_TAOTU">
				<div class="tu_panel"><div class="cj_header"><span class="hdtit">选择图片</span><span class="cjclose"></span></div>
					<div class="cj_ems"><span></span></div>
					<!-- <div class="cj_inbox"><div><span class="thd">图片地址</span><input class="inlink" name="cjlink" type="text"/><span class="tuinputOK">确定</span></div></div> -->
					<div class="cj_content">
							<div class="tu_Nav">
								<div class="listnav">
									<div class="nav tu_group" get_data="tumain"><span>图片空间</span></div>
									<div class="nav tu_group" get_data="itemtus"><span>宝贝图片</span></div>
									<div class="nav_tusc tu_group tuselected" get_data="tusck"><span>素材库</span></div>
									<div class="nav_taovideo" get_data="taovideo"><span>视频</span></div>
									<span class="cjupimg" style="display:none;"><a class="upbox">上传图片</a></span>
									<input class="cjupimg_file" type="file" value="" accept="image/*" name="cjupimg_file" style="display:none;">
									<img class="cjupimg_bgimg" src="">
								</div>
							</div>
							<div class="mainbox tumain">
								<div class="CT_tree-wrap"><div class="tree_search"><input id="Intree" type="text"/></div><div class="folder_tree"></div></div>
								<div class="cjcontainer_hd"><div class="cjsearchKey"><input id="cjseKey" type="text"/><i></i></div></div>
								<div class="cjarea-container"><div class="mod-container"><div class="search-container"></div><ul class="cjtu_result"></ul></div></div>
							</div>
							<div class="mainbox itemtus">
								<div class="search_items"><span><input type="text" name="itemname" placeholder="输入关键字"></span><div class="Price"><label>价格:</label><span><input type="text" name="startPrice"></span><label>-</label><span><input type="text" name="endPrice"></span><button id="Items_Search">搜索</button></div></div>
								<div class="btu_box"></div>
							</div>
							<div class="mainbox tusck">
								<div class="sck_box"></div>
							</div>
							<div class="mainbox taovideo">
								<div class="search_video"><span><i></i><input id="cjsearch_video" type="text" name="itemname" placeholder="输入关键字"></span></div>
								<div class="video_box"></div>
							</div>
					</div>
					<div class="cj_ft">
						<div class="cjnext_pagination nex_tu"><span class="mPrev no_more">上一页</span><span class="mNext">下一页</span></div>
						<div class="cjnext_pagination nex_titemtu"><span class="itemtuMore itemPrev no_more">上一页</span><span class="itemtuMore itemNext">下一页</span></div>
						<div class="cjnext_pagination nex_scku"><span class="srckMore scPrev no_more">上一页</span><span class="srckMore scNext no_more">下一页</span></div>
						<div class="cjnext_pagination nex_video"><span class="videoMore videoPrev no_more">上一页</span><span class="videoMore videoNext">下一页</span></div>
					</div>
				</div>
				<div class="cj_heiBG"></div>
			</div>
			<div class="WXHref">
				<div class="href_panel">
					<div class="cj_header"><span>链接小工具</span><span class="cjclose"></span></div>
		 			<div class="cj_ems"><span></span></div>
		 			<!--<div class="cj_inbox"><div><span class="thd">添加链接</span><input class="inlink" name="cjlink" type="text"/></div></div>-->
		 			<div class="cj_content">
		 				<div class="tumain">
		 					<div class="CT_tree-wrap">
		 						<div class="folder_tree">
									<div class="nav linkselected" get_data="common"><span>常用链接</span></div>
									<div class="nav" get_data="widgetid"><span>楼层链接</span></div>
									<div class="nav" get_data="items"><span>宝贝链接</span></div>
									<div class="nav" get_data="category"><span>宝贝分类</span></div>
									<div class="nav" get_data="coupon"><span>优惠券</span></div>
									<div class="nav" get_data="page"><span>店铺故事承接页</span></div>
									<div class="nav" get_data="activity"><span>自定义页面链接</span></div>
					 			</div>
					 		</div>
						<div class="cjarea-container">
							<div class="mod-container">
								<div class="modpanel" showd="common"></div>
								<div class="modpanel" showd="widgetid">
									<div class="diy-widgetid-inshop"></div>
									<div class="diy-widgetid">
										<span>输入模块widgetid：</span><input class="get-widgetid" placeholder="可联系客服获取模块widgetid" type="text" /><span class="widgetid-but">确定</span>
									</div>
								</div>
								<div class="modpanel" showd="items">
									<div class="search_items"><span><input type="text" name="itemname" placeholder="输入关键字"></span><div class="Price"><label>价格:</label><span><input type="text" name="startPrice"></span><label>-</label><span><input type="text" name="endPrice"></span><button id="Items_Search_wx">搜索</button></div></div>
								</div>
									<div class="modpanel" showd="category"></div>
									<div class="modpanel" showd="coupon"></div>
									<div class="modpanel" showd="page"></div>
									<div class="modpanel" showd="activity"></div>
								</div>
							</div>
			 			</div>
		 			</div>
		 			<div class="cj_ft"><div class="cjnext_pagination"><span class="mPrev no_more">上一页</span><span class="mNext no_more">下一页</span></div></div>
				</div>
				<div class="cj_heiBG"></div>
			</div>
			<div class="WXItems">
				<div class="href_panel">
					<div class="cj_header"><span>宝贝选择器</span><span class="cjclose"></span></div>
		 			<div class="cj_ems"><span></span></div>
		 			<div class="cj_content">
		 				<div class="tumain">
		 					<div class="CT_tree-wrap">
		 						<div class="folder_tree">
									<div class="nav linkselected" get_data="items"><span>选择宝贝</span></div>
									<div class="nav" get_data="items_Imp"><span>批量导入</span></div>
					 			</div>
					 		</div>
							<div class="cjarea-container">
								<div class="mod-container">
									<div class="modpanel" showd="items">
										<div class="search_items">
											<span class="all_icon"><i class="icon"></i>全选</span>
											<span><input type="text" name="itemname" placeholder="输入关键字"></span>
											<div class="Price"><label>价格:</label><span><input type="text" name="startPrice"></span><label>-</label><span><input type="text" name="endPrice"></span><button id="Items_Search_wx">搜索</button></div>
											<span class="Items_getmorepic_wx">获取宝贝细节图</span>
										</div>
									</div>
									<div class="modpanel" showd="items_Imp">
										<div class="Impid_items">
											<span class="tip_id">输入宝贝ID ↓</span>
											<span class="all_icon"><i class="icon"></i>全选</span>
										</div>
										<div class="Impid_main">
											<div class="left">
												<div class="tips">提示：请以回车换行区隔宝贝ID，最多只能输入10个宝贝ID以供选择。</div>
												<div class="input-box">
													<div class="input">
														<textarea class="input-area"></textarea>
													</div>
													<div class="action-bar">
														<button type="button" class="id_empty" role="button">清空ID</button>
														<button type="button" class="id_query" role="button">查询</button>
													</div>
												</div>
											</div>
											<div class="right">
												<div class="no-data">请在左侧输入宝贝ID后，点击“查询”</div>
											</div>
										</div>
									</div>
								</div>
							</div>
			 			</div>
		 			</div>
		 			<div class="cj_ft">
		 				<div class="cjnext_pagination"><span class="mPrev no_more">上一页</span><span class="mNext no_more">下一页</span></div>
		 				<div class="cj_setitems"><span class="cjclose">取消</span><span class="setItems">确定</span></div>
		 			</div>
				</div>
				<div class="cj_heiBG"></div>
			</div>
		</div>
		<div id="skinBoxs-set" class="skinBoxs">
			<div class="skins">
				<div class="hd"><span class="title">添加我的皮肤预设</span><i class="close unbind_ck">&#xe63f;</i></div>
				<div class="b btype"><span class="t">皮肤操作:</span><span><em class="select skin-opt unbind_ck" data-type="new">添加新皮肤</em><em class="skin-opt unbind_ck" data-type="up">修改皮肤</em></span></div>
				<div class="b"><span class="t">皮肤封面:</span><input class="pic" type="text" placeholder="输入图片地址" /><span class="tip">尺寸：180x200</span></div>
				<div class="b"><span class="t">皮肤描述:</span><input class="desc" type="text" /></div>
				<div class="b checkbox">
					<input class="setcheckbox" type="checkbox" id="tbu_yun" name="tbu_yun">
					<label class="title" for="tbu_yun">将保存的皮肤预设同步到云</label>
					<div class="tip">此功能需要登陆淘宝授权，如果不是频繁更换工作电脑不建议使用！</div>
				</div>
				<div class="buttom"><span class="close2 unbind_ck">取消</span><span class="save unbind_ck">保存</span></div>
			</div>
		</div>


		<div class="public-layer" style="display:none;"></div>
		<div class="layui-layer-shade" id="layui-layer-shade1" times="1" style="z-index: 19891014; background-color: rgb(0, 0, 0); opacity: 0.1;"></div>
		<div class="layui-layer layui-layer-loading" id="layui-layer1" type="loading" times="1" showtime="0" contype="string" style="z-index: 19891015; top: 50%; left: 50%; margin-top: -16px; margin-left: -16px;"><div id="" class="layui-layer-content layui-layer-loading2"></div><span class="layui-layer-setwin"></span></div>
		<div class="layui-layer-move"></div>

	
	</body>
</html>
