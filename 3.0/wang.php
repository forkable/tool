<form id="tForm" form-data="jwb" method="post" >
<div id="tabs" class="form-tabs-title">
	<ul>
		<li><a href="#tabs-1">内容设置</a></li>
		<li><a href="#tabs-2" style="display:none;">样式设置</a></li>
		<li><a href="#tabs-99" style="display:none;">视频教程</a></li>
	</ul>
	<div class="formlayout">
		<div class="form-tabs-content">
			<div id="tabs-1">
				<ul class="setform">
					<li style="display:none;">
						<label for="i1">应用ID：</label>
						<input id="i1" class="setinput disabled" type="text" title="自动生成，无需填写" readonly="readonly" name="appID" value="<?=$_POST['appID']?>" />
					</li>
					<li>
						<label for="ibeli1">应用名称：</label>
						<input id="ibeli1" class="setinput " type="text" title="该应用的名称，允许修改，用于在图层面板中标识应用" junezx_vali_str="true" name="appLabel" value="<?=$_POST['appLabel']?>" />
					</li>
					<li>
						<label for="i2">旺旺ID：</label>
						<input id="i2" class="setinput" type="text" title="请输入旺旺ID。重要提醒：只有填写主旺旺时才可开启分流。" junezx_vali_str="true" name="wangID" value="<?=$_POST['wangID']?>" />
						<span id="i2-error" class="june-i-error" style="position:absolute;top: 0; left: 368px; display: none;"><i></i>子旺旺格式错误</span>
					</li>
					<li>
						<label for="i3">旺旺昵称：</label>
						<input id="i3" class="setinput" type="text" title="请输入旺旺的昵称。" junezx_vali_str="true" name="wangNickName" value="<?=$_POST['wangNickName']?>" />
					</li>

					<li>
						<label for="wangMode">旺旺风格：</label>
						<select id="wangMode" name="wangMode">
							<option value="1" <? if($_POST['wangMode']=='1'){echo'selected="selected"';} ?>>大旺旺</option>
							<option value="2" <? if($_POST['wangMode']=='2'){echo'selected="selected"';} ?>>小旺旺</option>
						</select>
					</li>
					<li>
						<label for="shuntMode" id="shuntModeTitle">分流方式：</label>
						<select id="shuntMode" name="shuntMode">
							<option value="2" <? if($_POST['shuntMode']=='2'){echo'selected="selected"';} ?>>不分流</option>
							<option value="1" <? if($_POST['shuntMode']=='1'){echo'selected="selected"';} ?>>分流</option>
						</select>
						<span id="shuntMode-error" class="june-i-error" style="position:absolute;top: 0; left: 368px; display: none;"><i></i>请选择不分流</span>
					</li>
					<li>
						<label for="sdtzCharacterColor">昵称文字颜色：</label>
						<div class="setcolorpanel">
							<div class="sp-replacer sp-light"><div class="sp-preview"><div class="sp-preview-inner" style="background-color:<?=$_POST['characterColor']?>;"></div></div></div>
							<input id="sdtzCharacterColor" class="setinputcolor tColorPicker" type="text" title="" name="characterColor" value="<?=$_POST['characterColor']?>" />
						</div>
					</li>
					<li>
						<label for="i8">昵称文字大小：</label>
						<input id="i8" class="setinput" type="text" title="请输入文字的大小，无需加px；如：12。" name="characterSize" value="<?=$_POST['characterSize']?>" />
					</li>
					<li style="display:none;">
						<label for="sdtzCharacterBgColor">昵称背景颜色：</label>
						<div class="setcolorpanel">
							<div class="sp-replacer sp-light"><div class="sp-preview"><div class="sp-preview-inner" style="background-color:<?=$_POST['characterBgColor']?>;"></div></div></div>
							<input id="sdtzCharacterBgColor" class="setinputcolor tColorPicker" type="text" title="" name="characterBgColor" value="<?=$_POST['characterBgColor']?>" />
						</div>
					</li>
					<li>
						<label for="characterFont">昵称字体：</label>
						<select id="characterFont" name="characterFont">
							<option value="宋体" <? if($_POST['characterFont']=='宋体'){echo'selected="selected"';} ?> data-style="font-family:宋体;">宋体</option>
                <option value="黑体" <? if($_POST['characterFont']=='黑体'){echo'selected="selected"';} ?> data-style="font-family:黑体;">黑体</option>
                <option value="微软雅黑" <? if($_POST['characterFont']=='微软雅黑'){echo'selected="selected"';} ?> data-style="font-family:微软雅黑;">雅黑</option>
                <option value="楷体" <? if($_POST['characterFont']=='楷体'){echo'selected="selected"';} ?> data-style="font-family:楷体;">楷体</option>
                <option value="Arial" <? if($_POST['characterFont']=='Arial'){echo'selected="selected"';} ?> data-style="font-family:Arial;">Arial</option>
                <option value="Verdana" <? if($_POST['characterFont']=='Verdana'){echo'selected="selected"';} ?> data-style="font-family:Verdana;">Verdana</option>
                <option value="Georgia" <? if($_POST['characterFont']=='Georgia'){echo'selected="selected"';} ?> data-style="font-family:Georgia;">Georgia</option>
                <option value="Times New Roman" <? if($_POST['characterFont']=='Times New Roman'){echo'selected="selected"';} ?> data-style="font-family:Times New Roman;">Times New Roman</option>
                <option value="Trebuchet MS" <? if($_POST['characterFont']=='Trebuchet MS'){echo'selected="selected"';} ?> data-style="font-family:Trebuchet MS;">Trebuchet MS</option>
                <option value="Courier" <? if($_POST['characterFont']=='Courier'){echo'selected="selected"';} ?> data-style="font-family:Courier;">Courier</option>
                <option value="Impact" <? if($_POST['characterFont']=='Impact'){echo'selected="selected"';} ?> data-style="font-family:Impact;">Impact</option>
                <option value="Comic Sans MS" <? if($_POST['characterFont']=='Comic Sans MS'){echo'selected="selected"';} ?> data-style="font-family:Comic Sans MS;">Comic Sans MS</option>
                <option value="Tahoma" <? if($_POST['characterFont']=='Tahoma'){echo'selected="selected"';} ?> data-style="font-family:Tahoma;">Tahoma</option>
                <option value="Symbol" <? if($_POST['characterFont']=='Symbol'){echo'selected="selected"';} ?> data-style="font-family:Symbol;">Symbol</option>
                <option value="Palatino Linotype" <? if($_POST['characterFont']=='Palatino Linotype'){echo'selected="selected"';} ?> data-style="font-family:Palatino Linotype;">Palatino Linotype</option>
                <option value="Bookman Old Style" <? if($_POST['characterFont']=='Bookman Old Style'){echo'selected="selected"';} ?> data-style="font-family:Bookman Old Style;">Bookman Old Style</option>
						</select>
					</li>
					<li>
						<label for="characterWeight">昵称文字粗细：</label>
						<select id="characterWeight" name="characterWeight">
							<option value="normal" <? if($_POST['characterWeight']=='normal'){echo'selected="selected"';} ?>>正常</option>
							<option value="bold" <? if($_POST['characterWeight']=='bold'){echo'selected="selected"';} ?>>粗体</option>
						</select>
					</li>
					<li style="display:none;">
						<label for="characterStyle">昵称文字斜体：</label>
						<select id="characterStyle" name="characterStyle">
							<option value="normal" <? if($_POST['characterStyle']=='normal'){echo'selected="selected"';} ?>>正常</option>
							<option value="italic" <? if($_POST['characterStyle']=='italic'){echo'selected="selected"';} ?>>斜体</option>
						</select>
					</li>
					<li>
						<label for="tt_i1">提示文字：</label>
						<input id="tt_i1" class="setinput" type="text" title="鼠标经过应用时的提示文字" junezx_vali_str="true" name="tipText" value="<?=$_POST['tipText']?>" />
					</li>
				</ul>
			</div>
			<div id="tabs-2">
				<ul class="setform">
					<li>
						<label for="ii3">应用上边距：</label>
						<input id="ii3" class="setinput" type="text" title="应用的上边距，如需精确调整，请在此处输入数值。" name="top" value="<?=$_POST['top']?>" />
					</li>
					<li>
						<label for="ii4">应用左边距：</label>
						<input id="ii4" class="setinput" type="text" title="应用的左边距，如需精确调整，请在此处输入数值。" name="left" value="<?=$_POST['left']?>" />
					</li>
				</ul>
			</div>
			<div id="tabs-99">
				<embed allowScriptAccess="never" flashvars="scene=taobao_shop" width="488" height="324" src="" type="application/x-shockwave-flash" wmode="opaque">
				</embed>
				<a class="june-preview" style="display:block;margin:5px auto;text-align:center;" href="" target="_blank">新窗口全屏观看</a>
			</div>
				
		</div>
	</div>
</div>
</form>
<script type="text/javascript">
$(function() {
//加载表单样式
	$("#tabs").tabs();
	$("#tForm select").selectmenu();
	$(".setform").tooltip({
		position: {
			my: "left top",
			at: "left bottom+5"
		},
		show: {
			duration: "fast"
		},
		hide: {
			effect: "hide"
		}
	});

	$("#i2").bind("input propertychange change",function(event){
		var wwID=$("#i2").val();
 		if(wwID.indexOf("：")>-1) {
 			$("#i2-error").show();
 		}else{
 			$("#i2-error").hide();
 		}
	    if(wwID.indexOf(":")>-1) {	    	
			$("#shuntMode-error").show();
			$("#shuntModeTitle").text("子旺旺不可分流：");
		} else {
			$("#shuntMode-error").hide();
			$("#shuntModeTitle").text("分流方式：");
		}
	});	

});
</script>