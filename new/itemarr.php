﻿<?
$data=$_POST;
$content=$data['content'];
$count=$data['count'];
$num=$count+1;
$items = explode(',',$content);
$href= explode(',',$data['href']);
$check=count($href)==0?'no':'yes';
$pSrc = explode(',',$data['pSrc']);
$oppoSrc = explode(',',$data['oppoSrc']);

$pSrcPos=explode(',',$data['pSrcPos']);
$oSrcPos=explode(',',$data['oSrcPos']);

$type=$data['type'];
$shan='<span class="itemarrManagerDelete" style="background:url(images/itemdel.png) top center no-repeat;padding:5px 10px;margin-left:10px;cursor:pointer;" title="删除该行"></span>';
$add='<div style="width:380px;">
			<div id="itemarrManager" style="width:380px;margin:0 auto;">
				<span><i class="ui-icon ui-icon-circle-plus" style="display:inline-block;"></i> 添加一条新纪录</span>
			</div>
		</div>
		<span class="itemarrManagerReadIcon-1" style="position:absolute;margin-left:432px;margin-top:-15px;display:block;width:20px;height:20px;padding:0;" id="itemarrManagerReadAll" title="全部选择"></span>';
$zhua='<span id="itemarrCatchChoose" class="tBtn" style="position:absolute;margin-left:322px;margin-top:-15px;display:block;padding:0 5px;">自动抓取内容选择</span>
	<div id="itemarrCatchChooseBox" style="position:absolute;margin-left:292px;margin-top:15px;display:none;padding:10px;background:#fff;border:1px solid #ddd;">
		<span><input name="catchchoose1" id="chx_catchchoose1" type="checkbox"  checked="checked" value="1" /><label for="chx_catchchoose1">宝贝图片</label></span>
		<span><input name="catchchoose2" id="chx_catchchoose2" type="checkbox"  checked="checked" value="1" /><label for="chx_catchchoose2">标题</label></span>
		<span><input name="catchchoose3" id="chx_catchchoose3" type="checkbox"  checked="checked" value="1" /><label for="chx_catchchoose3">原价</label></span>
		<span><input name="catchchoose4" id="chx_catchchoose4" type="checkbox"  checked="checked" value="1" /><label for="chx_catchchoose4">现价</label></span>
		<span><input name="catchchoose5" id="chx_catchchoose5" type="checkbox"  checked="checked" value="1" /><label for="chx_catchchoose5">销量</label></span>
	</div>';
$auto='<span class="itemarrManagerRead itemarrManagerReadIcon-1" title="选择后自动读取标题、价格等信息"></span>';		
$idma='';$lkww='';$disx='';$dis='';
if($type=='itemPic'){$wz='宝贝主图'; $diszt='';$idma='tItisImg tPicInput';$auto='';}else{$diszt='style="display:none;"';}
if($type=='itemPicHover'){$wz='宝贝变换图片'; $disft='';$idma='tItisImg tPicInput';$auto='';}else{$disft='style="display:none;"';}
if($type=='itemTitle'){$wz='宝贝标题';$lkww='style="width:260px"';}
if($type=='itemSubTitle'){$wz='宝贝副标题';$lkww='style="width:260px"';$auto='';}
if($type=='itemPrice'){$wz='宝贝原价';}
if($type=='itemDiscountPrice'){$wz='宝贝现价';}
if($type=='itemSale'){$wz='宝贝销量';}
if($type=='itemLink'){$wz='宝贝链接';$shan=$shan;$add=$add; $dis='';$lkww='style="width:260px"';$idma='tItisHref tItisImg';$zhua=$zhua;}else{$shan='';$add='';$zhua='';}


?>
<div id="tItemPageTab" style="display:none;">
	<div id="tItemHrefPage" class="tItem-page selected">宝贝链接</div>
	</div>
<form id="tItemForm" method="post" >
<div id="tItemHrefPageBox">
	<ul id="itemarrManagerUl" class="setform itemsetform" style="width:520px;">
				
                
                <?  
			 $hrefVal='';
			 $nn=1;$ccc=0;
			 foreach($items as $item){ if(!empty($item)){ $ccc=1;  } }
			for($i=0;$i<$count;$i++){    $b=$i+1;  $nn++; ?> 
                
               <li style="width:520px;">
			<label style="width:110px;" for="i_a<?=$b?>"><?=$wz?><?=$b?>：</label>
			<input id="i_a<?=$b?>" class="setinput <?=$idma?>" type="text" title="请输入<?=$wz?>" name="inputVal[]" value="<?=$items[$i]?>" <?=$lkww?>  data-viewimg="<?=$pSrc[$i]?>"/>
			<?=$shan?>
			
						<select id="p_itempic<?=$b?>" data-pic="i_a<?=$b?>" name="pSrcPos[]" class="j-src-pos" <?=$diszt?>>
				<option value="1" <? if($pSrcPos[$i]=='1'){echo'selected="selected"';} ?>>抓取第1张主图</option>
				<option value="2" <? if($pSrcPos[$i]=='2'){echo'selected="selected"';} ?>>抓取第2张主图</option>
				<option value="3" <? if($pSrcPos[$i]=='3'){echo'selected="selected"';} ?>>抓取第3张主图</option>
				<option value="4" <? if($pSrcPos[$i]=='4'){echo'selected="selected"';} ?>>抓取第4张主图</option>
				<option value="5" <? if($pSrcPos[$i]=='5'){echo'selected="selected"';} ?>>抓取第5张主图</option>
							</select>
			<select id="o_itempic<?=$b?>" data-pic="i_a<?=$b?>" name="oSrcPos[]" class="j-src-pos" <?=$disft?>>
				<option value="1" <? if($oSrcPos[$i]=='1'){echo'selected="selected"';} ?>>抓取第1张主图</option>
				<option value="2" <? if($oSrcPos[$i]=='2'){echo'selected="selected"';} ?>>抓取第2张主图</option>
				<option value="3" <? if($oSrcPos[$i]=='3'){echo'selected="selected"';} ?>>抓取第3张主图</option>
				<option value="4" <? if($oSrcPos[$i]=='4'){echo'selected="selected"';} ?>>抓取第4张主图</option>
				<option value="5" <? if($oSrcPos[$i]=='5'){echo'selected="selected"';} ?>>抓取第5张主图</option>
							</select>
						<span class="itemarrManagerMove itemarrManagerMoveUp" title="上移" <?=$disx?>></span>
			<span class="itemarrManagerMove itemarrManagerMoveDown" title="下移" <?=$disx?>></span>
								</li>
			
            <? } ?>
            


			</ul>
            
     <?=$add?>
            
<?=$zhua?>
		
	<input type="hidden" id="inputReadVal" name="inputReadVal" data-iname="inputReadVal" value="<?=$data['readVal']?>" />
	<input type="hidden" id="titleAuto" name="titleAuto" value="<?=$data['titleAuto']?>" />
	<input type="hidden" id="priceAuto" name="priceAuto" value="<?=$data['priceAuto']?>" />
	<input type="hidden" id="_priceAuto" name="_priceAuto" value="<?=$data['_priceAuto']?>" />
	<input type="hidden" id="saleAuto" name="saleAuto" value="<?=$data['saleAuto']?>" />
	<input type="hidden" id="hrefVal" name="hrefVal" value="<?=$data['href']?>" />
	<input type="hidden" id="pSrcVal" name="pSrcVal" value="<?=$data['pSrc']?>" />
	<input type="hidden" id="oppoSrcVal" name="oppoSrcVal" value="<?=$data['oppoSrc']?>" />
	<input type="hidden" id="titleInfoVal" name="titleInfoVal" value="<?=$data['titleInfo']?>" />
	<input type="hidden" id="priceInfoVal" name="priceInfoVal" value="<?=$data['priceInfo']?>" />
	<input type="hidden" id="_priceInfoVal" name="_priceInfoVal" value="<?=$data['_priceInfo']?>" />
	<input type="hidden" id="saleInfoVal" name="saleInfoVal" value="<?=$data['saleInfo']?>" />
	<input type="hidden" id="erWeiMaSrcVal" name="erWeiMaSrcVal" value="<?=$data['erWeiMaSrc']?>" />
	<input type="hidden" id="checkSelectAlert" name="checkSelectAlert" value="no" />
    <?
    $subScriptSrc=isset($data['subScriptSrc'])?isset($data['subScriptSrc']):',,,,,';
	$subScript1Src=isset($data['subScript1Src'])?isset($data['subScript1Src']):',,,,,';
	$subScript2Src=isset($data['subScript2Src'])?isset($data['subScript2Src']):',,,,,';
	$subScript3Src=isset($data['subScript3Src'])?isset($data['subScript3Src']):',,,,,';
	$subScript4Src=isset($data['subScript4Src'])?isset($data['subScript4Src']):',,,,,';
	$expandText=isset($data['expandText'])?isset($data['expandText']):',,,,,';
	$expandText1=isset($data['expandText1'])?isset($data['expandText1']):',,,,,';
	$expandText2=isset($data['expandText2'])?isset($data['expandText2']):',,,,,';
	$expandText3=isset($data['expandText3'])?isset($data['expandText3']):',,,,,';
	$expandText4=isset($data['expandText4'])?isset($data['expandText4']):',,,,,';
	$expandTextSet=isset($data['expandTextSet'])?isset($data['expandTextSet']):'|;||;||;||;||;|';
	$expandText1Set=isset($data['expandText1Set'])?isset($data['expandText1Set']):'|;||;||;||;||;|';
	$expandText2Set=isset($data['expandText2Set'])?isset($data['expandText2Set']):'|;||;||;||;||;|';
	$expandText3Set=isset($data['expandText3Set'])?isset($data['expandText3Set']):'|;||;||;||;||;|';
	$expandText4Set=isset($data['expandText4Set'])?isset($data['expandText4Set']):'|;||;||;||;||;|';
	?>
	<input type="hidden" id="subScriptSrcVal" name="subScriptSrcVal" value="<?=$subScriptSrcVal?>" />
	<input type="hidden" id="subScript1SrcVal" name="subScript1SrcVal" value="<?=$subScript1SrcVal?>" />
	<input type="hidden" id="subScript2SrcVal" name="subScript2SrcVal" value="<?=$subScript2SrcVal?>" />
	<input type="hidden" id="subScript3SrcVal" name="subScript3SrcVal" value="<?=$subScript3SrcVal?>" />
	<input type="hidden" id="subScript4SrcVal" name="subScript4SrcVal" value="<?=$subScript4SrcVal?>" />
	<input type="hidden" id="expandTextVal" name="expandTextVal" value="<?=$expandTextVal?>" />
	<input type="hidden" id="expandText1Val" name="expandText1Val" value="<?=$expandText1Val?>" />
	<input type="hidden" id="expandText2Val" name="expandText2Val" value="<?=$expandText2Val?>" />
	<input type="hidden" id="expandText3Val" name="expandText3Val" value="<?=$expandText3Val?>" />
	<input type="hidden" id="expandText4Val" name="expandText4Val" value="<?=$expandText4Val?>" />
	<textarea name="expandTextSetVal" id="expandTextSetVal" style="display:none;"><?=$expandTextSetVal?></textarea>
	<textarea name="expandText1SetVal" id="expandText1SetVal" style="display:none;"><?=$expandText1SetVal?></textarea>
	<textarea name="expandText2SetVal" id="expandText2SetVal" style="display:none;"><?=$expandText2SetVal?></textarea>
	<textarea name="expandText3SetVal" id="expandText3SetVal" style="display:none;"><?=$expandText3SetVal?></textarea>
	<textarea name="expandText4SetVal" id="expandText4SetVal" style="display:none;"><?=$expandText4SetVal?></textarea>
	
	
	<textarea id="itemPicTemp1" name="itemPicTemp1" style="display:none;"><?=$data['itemPicTemp']?></textarea>
</div>
</form>


<script type="text/javascript">
$(function() {
	$(".itemsetform, #itemarrManagerReadAll").tooltip({
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
	
	var itemIndex = <?=$num?>,
		inputReadVal = $("#inputReadVal"),
		titleAuto = $("#titleAuto"),
		priceAuto = $("#priceAuto"),
		_priceAuto = $("#_priceAuto"),
		saleAuto = $("#saleAuto"),
		tempAuto = $("#inputReadVal"),
		hrefVal = $("#hrefVal"),
		pSrcVal = $("#pSrcVal"),
		oppoSrcVal = $("#oppoSrcVal"),
		titleInfoVal = $("#titleInfoVal"),
		priceInfoVal = $("#priceInfoVal"),
		_priceInfoVal = $("#_priceInfoVal"),
		saleInfoVal = $("#saleInfoVal"),
		erWeiMaSrcVal = $("#erWeiMaSrcVal"),
		
		subScriptSrcVal = $("#subScriptSrcVal"),
		subScript1SrcVal = $("#subScript1SrcVal"),
		subScript2SrcVal = $("#subScript2SrcVal"),
		subScript3SrcVal = $("#subScript3SrcVal"),
		subScript4SrcVal = $("#subScript4SrcVal"),
		expandTextVal = $("#expandTextVal"),
		expandText1Val = $("#expandText1Val"),
		expandText2Val = $("#expandText2Val"),
		expandText3Val = $("#expandText3Val"),
		expandText4Val = $("#expandText4Val"),
		expandTextSetVal = $("#expandTextSetVal"),
		expandText1SetVal = $("#expandText1SetVal"),
		expandText2SetVal = $("#expandText2SetVal"),
		expandText3SetVal = $("#expandText3SetVal"),
		expandText4SetVal = $("#expandText4SetVal"),
		
		type = "<?=$type?>",
		check = "<?=$check?>";
	if(type != "itemLink") {
		$("#itemarrManagerUl").on("change", "input[type='text']", function() {
			if(check == "no" && !$("#imr4").prop("checked")) {
				alert("请先设置宝贝链接，再进行标题、价格、按钮等设置！");
				$("#checkSelectAlert").val("yes");
				return;
			}
		});
	}
	$("#itemarrManager").on("click", "span", function(event) {
		$('<li style="width:520px;">'+
			'<label style="width:110px;" for="i_a'+itemIndex+'">宝贝链接'+itemIndex+'：</label>'+
			'<input id="i_a'+itemIndex+'" style="width:260px;" class="setinput" type="text" title="请输入宝贝链接" name="inputVal[]" value="" />'+
			'<span class="itemarrManagerDelete" style="background:url(/2.0/images/itemdel.png) top center no-repeat;padding:5px 10px;margin-left:10px;cursor:pointer;" title="删除该行"></span>'+
			'<span class="itemarrManagerRead itemarrManagerReadIcon-1" title="选择后自动读取标题、价格等信息"></span>'+
			'<select id="p_itempic'+itemIndex+'" name="pSrcPos[]" style="width:60px;display:none;"><option value="1" selected="selected"></option></select>'+
			'<select id="o_itempic'+itemIndex+'" name="oSrcPos[]" style="width:60px;display:none;"><option value="2" selected="selected"></option></select>'+
			'<span class="itemarrManagerMove itemarrManagerMoveUp" title="上移"></span>'+
			'<span class="itemarrManagerMove itemarrManagerMoveDown" title="下移"></span>'+
		'</li>').appendTo($("#itemarrManagerUl"));
		itemIndex++;
		$("#itemarrManagerUl").find("label:not(:hidden)").each(function(i, e) {
			$(this).html("宝贝链接"+(i+1)+"：");
		});
		var irVal = inputReadVal.val();
		inputReadVal.val(irVal + ",1");
		var v1 = titleAuto.val();
		titleAuto.val(v1 + ",0");
		var v2 = priceAuto.val();
		priceAuto.val(v2 + ",0");
		var v3 = _priceAuto.val();
		_priceAuto.val(v3 + ",0");
		var v4 = saleAuto.val();
		saleAuto.val(v4 + ",0");
		var vv1 = hrefVal.val();
		hrefVal.val(vv1+",");
		var vv2 = pSrcVal.val();
		pSrcVal.val(vv2+",");
		var vv3 = oppoSrcVal.val();
		oppoSrcVal.val(vv3+",");
		var vv4 = titleInfoVal.val();
		titleInfoVal.val(vv4+",");
		var vv5 = priceInfoVal.val();
		priceInfoVal.val(vv5+",");
		var vv6 = _priceInfoVal.val();
		_priceInfoVal.val(vv6+",");
		var vv7 = saleInfoVal.val();
		saleInfoVal.val(vv7+",");
		var vv8 = erWeiMaSrcVal.val();
		erWeiMaSrcVal.val(vv8+",");
		
		var vvs = subScriptSrcVal.val();
		subScriptSrcVal.val(vvs+",");
		var vvs1 = subScript1SrcVal.val();
		subScript1SrcVal.val(vvs1+",");
		var vvs2 = subScript2SrcVal.val();
		subScript2SrcVal.val(vvs2+",");
		var vvs3 = subScript3SrcVal.val();
		subScript3SrcVal.val(vvs3+",");
		var vvs4 = subScript4SrcVal.val();
		subScript4SrcVal.val(vvs4+",");
		
		var vvt = expandTextVal.val();
		expandTextVal.val(vvt+",");
		var vvt1 = expandText1Val.val();
		expandText1Val.val(vvt1+",");
		var vvt2 = expandText2Val.val();
		expandText2Val.val(vvt2+",");
		var vvt3 = expandText3Val.val();
		expandText3Val.val(vvt3+",");
		var vvt4 = expandText4Val.val();
		expandText4Val.val(vvt4+",");
		
		var vvts = expandTextSetVal.val();
		expandTextSetVal.val(vvts+"|;|");
		var vvts1 = expandText1SetVal.val();
		expandText1SetVal.val(vvts1+"|;|");
		var vvts2 = expandText2SetVal.val();
		expandText2SetVal.val(vvts2+"|;|");
		var vvts3 = expandText3SetVal.val();
		expandText3SetVal.val(vvts3+"|;|");
		var vvts4 = expandText4SetVal.val();
		expandText4SetVal.val(vvts4+"|;|");
	});
	$("#itemarrManagerUl").on("click", "span.itemarrManagerDelete", function(event) {
		if($(".itemarrManagerDelete").length > 1) {
			var index = $(this).parent().index(),
				irVal = inputReadVal.val(),
				arrReadVal = irVal.split(","),
				v1 = titleAuto.val(),
				av1 = v1.split(","),
				v2 = priceAuto.val(),
				av2 = v2.split(","),
				v3 = _priceAuto.val(),
				av3 = v3.split(","),
				v4 = saleAuto.val(),
				av4 = v4.split(",");
			arrReadVal[index] = 2;
			av1[index] = 2;
			av2[index] = 2;
			av3[index] = 2;
			av4[index] = 2;
			inputReadVal.val(arrReadVal.join(","));
			titleAuto.val(av1.join(","));
			priceAuto.val(av2.join(","));
			_priceAuto.val(av3.join(","));
			saleAuto.val(av4.join(","));
			$(this).parent().hide();
			$(this).prev("input").addClass("has-deleted");
			$(this).parent().children("select").remove();
			$("#itemarrManagerUl").find("label:not(:hidden)").each(function(i, e) {
				$(this).html("宝贝链接"+(i+1)+"：");
			});
		}
	});
	
	$("#itemarrManagerUl").on("click", "span.itemarrManagerMove", function(event) {
		var _t = $(this),
			_li = _t.parent(),
			_ul = $("#itemarrManagerUl"),
			index =_li.index(),
			irVal = inputReadVal.val(),
			targetIndex = index +1,
			arrReadVal = irVal.split(","),
			arrReadValLen = arrReadVal.length,
			v1 = titleAuto.val(),
			av1 = v1.split(","),
			v2 = priceAuto.val(),
			av2 = v2.split(","),
			v3 = _priceAuto.val(),
			av3 = v3.split(","),
			v4 = saleAuto.val(),
			av4 = v4.split(","), 
			//..//
			vv1 = hrefVal.val(),
			avv1 = vv1.split(","),
			vv2 = pSrcVal.val(),
			avv2 = vv2.split(","),
			vv3 = oppoSrcVal.val(),
			avv3 = vv3.split(","),
			vv4 = titleInfoVal.val(),
			avv4 = vv4.split(","),
			vv5 = priceInfoVal.val(),
			avv5 = vv5.split(","),
			vv6 = _priceInfoVal.val(),
			avv6 = vv6.split(","),
			vv7 = saleInfoVal.val(),
			avv7 = vv7.split(","),
			vv8 = erWeiMaSrcVal.val(),
			avv8 = vv8.split(","),
			
			vvs = subScriptSrcVal.val(),
			avvs = vvs.split(","),
			vvs1 = subScript1SrcVal.val(),
			avvs1 = vvs1.split(","),
			vvs2 = subScript2SrcVal.val(),
			avvs2 = vvs2.split(","),
			vvs3 = subScript3SrcVal.val(),
			avvs3 = vvs3.split(","),
			vvs4 = subScript4SrcVal.val(),
			avvs4 = vvs4.split(","),
			vvt = expandTextVal.val(),
			avvt = vvt.split(","),
			vvt1 = expandText1Val.val(),
			avvt1 = vvt1.split(","),
			vvt2 = expandText2Val.val(),
			avvt2 = vvt2.split(","),
			vvt3 = expandText3Val.val(),
			avvt3 = vvt3.split(","),
			vvt4 = expandText4Val.val(),
			avvt4 = vvt4.split(","),
			vvts = expandTextSetVal.val(),
			avvts = vvts.split("|;|"),
			vvts1 = expandText1SetVal.val(),
			avvts1 = vvts1.split("|;|"),
			vvts2 = expandText2SetVal.val(),
			avvts2 = vvts2.split("|;|"),
			vvts3 = expandText3SetVal.val(),
			avvts3 = vvts3.split("|;|"),
			vvts4 = expandText4SetVal.val(),
			avvts4 = vvts4.split("|;|"),
			
			targetTemp, tav1, tav2, tav3, tav4,
			tavv1, tavv2, tavv3, tavv4, tavv5, tavv6, tavv7, tavv8,
			tavvs, tavvs1, tavvs2, tavvs3, tavvs4,
			tavvt, tavvt1, tavvt2, tavvt3, tavvt4,
			tavvts, tavvts1, tavvts2, tavvts3, tavvts4;
		$(".lastitemarrManagerMove").removeClass("lastitemarrManagerMove");
		_li.addClass("lastitemarrManagerMove");
		if(_t.hasClass("itemarrManagerMoveUp")) {
			targetIndex = index - 1;
			if(targetIndex <= 0) {
				_li.prependTo(_ul);
			} else {
				_li.insertBefore(_ul.children("li:eq("+targetIndex+")"));
			}
		} else {
			_li.insertAfter(_ul.children("li:eq("+targetIndex+")"));
		}
		if(targetIndex < 0 || targetIndex > arrReadValLen - 1) {
			return;
		}
		targetTemp = arrReadVal[targetIndex];
		tav1 = av1[targetIndex];
		tav2 = av1[targetIndex];
		tav3 = av1[targetIndex];
		tav4 = av1[targetIndex];
		tavv1 = avv1[targetIndex];
		tavv2 = avv2[targetIndex];
		tavv3 = avv3[targetIndex];
		tavv4 = avv4[targetIndex];
		tavv5 = avv5[targetIndex];
		tavv6 = avv6[targetIndex];
		tavv7 = avv7[targetIndex];
		tavv8 = avv8[targetIndex];
		
		tavvs = avvs[targetIndex];
		tavvs1 = avvs1[targetIndex];
		tavvs2 = avvs2[targetIndex];
		tavvs3 = avvs3[targetIndex];
		tavvs4 = avvs4[targetIndex];
		tavvt = avvt[targetIndex];
		tavvt1 = avvt1[targetIndex];
		tavvt2 = avvt2[targetIndex];
		tavvt3 = avvt3[targetIndex];
		tavvt4 = avvt4[targetIndex];
		tavvts = avvts[targetIndex];
		tavvts1 = avvts1[targetIndex];
		tavvts2 = avvts2[targetIndex];
		tavvts3 = avvts3[targetIndex];
		tavvts4 = avvts4[targetIndex];
		
		arrReadVal[targetIndex] = arrReadVal[index];
		av1[targetIndex] = av1[index];
		av2[targetIndex] = av2[index];
		av3[targetIndex] = av3[index];
		av4[targetIndex] = av4[index];
		avv1[targetIndex] = avv1[index];
		avv2[targetIndex] = avv2[index];
		avv3[targetIndex] = avv3[index];
		avv4[targetIndex] = avv4[index];
		avv5[targetIndex] = avv5[index];
		avv6[targetIndex] = avv6[index];
		avv7[targetIndex] = avv7[index];
		avv8[targetIndex] = avv8[index];
		
		avvs[targetIndex] = avvs[index];
		avvs1[targetIndex] = avvs1[index];
		avvs2[targetIndex] = avvs2[index];
		avvs3[targetIndex] = avvs3[index];
		avvs4[targetIndex] = avvs4[index];
		avvt[targetIndex] = avvt[index];
		avvt1[targetIndex] = avvt1[index];
		avvt2[targetIndex] = avvt2[index];
		avvt3[targetIndex] = avvt3[index];
		avvt4[targetIndex] = avvt4[index];
		avvts[targetIndex] = avvts[index];
		avvts1[targetIndex] = avvts1[index];
		avvts2[targetIndex] = avvts2[index];
		avvts3[targetIndex] = avvts3[index];
		avvts4[targetIndex] = avvts4[index];
		
		arrReadVal[index] = targetTemp;
		av1[index] = tav1;
		av2[index] = tav2;
		av3[index] = tav3;
		av4[index] = tav4;
		avv1[index] = tavv1;
		avv2[index] = tavv2;
		avv3[index] = tavv3;
		avv4[index] = tavv4;
		avv5[index] = tavv5;
		avv6[index] = tavv6;
		avv7[index] = tavv7;
		avv8[index] = tavv8;
		
		avvs[index] = tavvs;
		avvs1[index] = tavvs1;
		avvs2[index] = tavvs2;
		avvs3[index] = tavvs3;
		avvs4[index] = tavvs4;
		avvt[index] = tavvt;
		avvt1[index] = tavvt1;
		avvt2[index] = tavvt2;
		avvt3[index] = tavvt3;
		avvt4[index] = tavvt4;
		avvts[index] = tavvts;
		avvts1[index] = tavvts1;
		avvts2[index] = tavvts2;
		avvts3[index] = tavvts3;
		avvts4[index] = tavvts4;
		
		inputReadVal.val(arrReadVal.join(","));
		titleAuto.val(av1.join(","));
		priceAuto.val(av2.join(","));
		_priceAuto.val(av3.join(","));
		saleAuto.val(av4.join(","));
		hrefVal.val(avv1.join(","));
		pSrcVal.val(avv2.join(","));
		oppoSrcVal.val(avv3.join(","));
		titleInfoVal.val(avv4.join(","));
		priceInfoVal.val(avv5.join(","));
		_priceInfoVal.val(avv6.join(","));
		saleInfoVal.val(avv7.join(","));
		erWeiMaSrcVal.val(avv8.join(","));
		
		subScriptSrcVal.val(avvs.join(","));
		subScript1SrcVal.val(avvs1.join(","));
		subScript2SrcVal.val(avvs2.join(","));
		subScript3SrcVal.val(avvs3.join(","));
		subScript4SrcVal.val(avvs4.join(","));
		expandTextVal.val(avvt.join(","));
		expandText1Val.val(avvt1.join(","));
		expandText2Val.val(avvt2.join(","));
		expandText3Val.val(avvt3.join(","));
		expandText4Val.val(avvt4.join(","));
		expandTextSetVal.val(avvts.join("|;|"));
		expandText1SetVal.val(avvts1.join("|;|"));
		expandText2SetVal.val(avvts2.join("|;|"));
		expandText3SetVal.val(avvts3.join("|;|"));
		expandText4SetVal.val(avvts4.join("|;|"));
		
		$("#itemarrManagerUl").find("label:not(:hidden)").each(function(i, e) {
			$(this).html("宝贝链接"+(i+1)+"：");
		});
	});
	
	$("#itemarrManagerReadAll").on("click", function() {
		if($(this).hasClass("itemarrManagerReadIcon-0")) {
			$(this).removeClass("itemarrManagerReadIcon-0").addClass("itemarrManagerReadIcon-1");
			$("#itemarrManagerUl").find("span.itemarrManagerReadIcon-0").each(function() {
				$(this).trigger("click");
			});
		} else {
			$(this).removeClass("itemarrManagerReadIcon-1").addClass("itemarrManagerReadIcon-0");
			$("#itemarrManagerUl").find("span.itemarrManagerReadIcon-1").each(function() {
				$(this).trigger("click");
			});
		}
	});
	
	$("#itemarrManagerUl").on("click", "span.itemarrManagerRead", function(event) {
		var index = $(this).parent().index(),
			irVal = inputReadVal.val(),
			arrReadVal = irVal.split(",");
		if(arrReadVal[index] == "1") {
			arrReadVal[index] = 0;
			$(this).addClass("itemarrManagerReadIcon-0").removeClass("itemarrManagerReadIcon-1");
		} else {
			arrReadVal[index] = 1;
			$(this).addClass("itemarrManagerReadIcon-1").removeClass("itemarrManagerReadIcon-0");
		}
		inputReadVal.val(arrReadVal.join(","));
	});
	$("#itemarrManagerUl").on("click", "span.itemarrManagerAuto", function(event) {
		var index = $(this).parent().index(),
			taVal = tempAuto.val(),
			arrAutoVal = taVal.split(","),
			inputVal = $(this).prev();
		if(arrAutoVal[index] == "1") {
			arrAutoVal[index] = 0;
			$(this).addClass("itemarrManagerReadIcon-0").removeClass("itemarrManagerReadIcon-1");
			inputVal.removeClass("disabled").prop("readonly", false).attr("title", "请输入宝贝链接");
		} else {
			arrAutoVal[index] = 1;
			$(this).addClass("itemarrManagerReadIcon-1").removeClass("itemarrManagerReadIcon-0");
			inputVal.addClass("disabled").prop("readonly", true).attr("title", "您已选择了始终自动更新宝贝链接，取消后可以设置宝贝链接");
		}
		tempAuto.val(arrAutoVal.join(","));
	});
	
	setTimeout(function() {
		$(".setinput").blur();
		var other = require("scripts/other");
		if($("#itemPicTemp1").html() == "") {
			var tAjax = require("scripts/tAjax");
			tAjax.ajaxJson("giiforp.php",{item: $("#hrefVal").val().split(","), random: Math.random()*10000}, function(m) {
				if(m[0] == "yes") {
					for(var j=1;j<m.length;j++) {
						if(m[j]) {
							if(m[j]["colorImg"] && m[j]["colorImg"] != "") {
								var colorImg = m[j]["colorImg"], val = $("select.j-src-pos:eq("+(j-1)*2+")").val(), val1 = $("select.j-src-pos:eq("+((j-1)*2+1)+")").val(), checkSelected = false, checkSelected1 = false;
								$("select.j-src-pos:eq("+(j-1)*2+")").append('<optgroup label="宝贝多色图片">');
								$("select.j-src-pos:eq("+((j-1)*2+1)+")").append('<optgroup label="宝贝多色图片">');
								for(var i = 0; i<colorImg.length;i++) {
									if(val == parseInt(colorImg[i].valueId,10) + 1) {
										checkSelected = true;
										$("select.j-src-pos:eq("+(j-1)*2+")").children("option[value='"+val+"']").remove();
									}
									if(val1 == parseInt(colorImg[i].valueId,10) + 1) {
										checkSelected1 = true;
										$("select.j-src-pos:eq("+((j-1)*2+1)+")").children("option[value='"+val1+"']").remove();
									}
									$("select.j-src-pos:eq("+(j-1)*2+")").append('<option value="'+(parseInt(colorImg[i].valueId,10) + 1)+'" >'+colorImg[i].name+'</option>');
									$("select.j-src-pos:eq("+((j-1)*2+1)+")").append('<option value="'+(parseInt(colorImg[i].valueId,10) + 1)+'" >'+colorImg[i].name+'</option>');
									m[j][ colorImg[i].valueId] = colorImg[i].imgUrl;
								}
								$("select.j-src-pos:eq("+(j-1)*2+")").append('</optgroup>');
								$("select.j-src-pos:eq("+((j-1)*2+1)+")").append('</optgroup>');
								$("select.j-src-pos:eq("+(j-1)*2+")").val(val);
								$("select.j-src-pos:eq("+((j-1)*2+1)+")").val(val1);
								if(!checkSelected && val > 5) {
									$("select.j-src-pos:eq("+(j-1)*2+")").children("option[value='"+val+"']").remove();
									//$("select.j-src-pos:eq("+(j-1)*2+")").val(1);
								}
								if(!checkSelected1 && val1 > 5) {
									$("select.j-src-pos:eq("+((j-1)*2+1)+")").children("option[value='"+val1+"']").remove();
									//$("select.j-src-pos:eq("+((j-1)*2+1)+")").val(1);
								}
							}
						}
					}
					$("#itemPicTemp1").html(JSON.stringify(m));
				}
			});
		}
	}, 1);
	
	$("#itemarrManagerUl").on("click.usBtn", ".usBtnForPic", function() {
		if(check == "no" && !$("#imr4").prop("checked")) {
			return;
		}
		var _t = $(this), val  = _t.siblings("input[name='inputVal[]']").val();
		$("input[name='inputVal[]']:not(.has-deleted)").each(function() {
			$(this).val(val);
		})
	});
	
	$("#itemarrManagerUl").on("change", "select", function() {
		if(check == "no" && !$("#imr4").prop("checked")) {
			alert("请先设置宝贝链接，再进行标题、价格、按钮等设置！");
			$("#checkSelectAlert").val("yes");
			return;
		}
		var other = require("scripts/other"),
			itemPicTemp = $("#itemPicTemp1"),
			_this = $(this),
			_tVal = _this.val(),
			val = itemPicTemp.html(), index = 0, id = _this.attr("data-pic");
		if(type == "itemPic") {
			index = _this.index("select[name='pSrcPos[]']");
		} else {
			index = _this.index("select[name='oSrcPos[]']");
		}
		if("<?=$data['itemMode']?>" == "ptitem") {
			if(val == "") {
				other.itempicajaxselect(_tVal, index, id);
			} else {
				other.itempicconfigselect(_tVal, index, id, "pt");
			}
		} else if("<?=$data['itemMode']?>" == "pptitem") {
			if(val == "") {
				other.itempicajaxselect_ppt(_tVal, index, id);
			} else {
				other.itempicconfigselect(_tVal, index, id, "ppt");
			}
		}
	});
	
	if(type == "itemPic" || type == "itemPicHover") {
		$("#itemarrManagerUl").on("change.tpi", ".tPicInput", function() {
			var _select = $(this).next();
			if(type == "itemPicHover") {
				_select = _select.next();
				_select.val(2);
			} else {
				_select.val(1);
			}
		});
	} else {
		$("#itemarrManagerUl").off("change.tpi");
	}
	
	$("#itemarrCatchChoose").on("click", function(event) {
		var catchBox = $("#itemarrCatchChooseBox");
		if(catchBox.is(":hidden")) {
			catchBox.show();
		} else {
			catchBox.hide();
		}
	});
	$("#itemarrCatchChooseBox").on("change", "input[type='checkbox']", function(event) {
		var arr = [1,1,1,1,1];
		if(!$("#chx_catchchoose1").prop("checked")) {
			arr[0] = 2;
		}
		if(!$("#chx_catchchoose2").prop("checked")) {
			arr[1] = 2;
		}
		if(!$("#chx_catchchoose3").prop("checked")) {
			arr[2] = 2;
		}
		if(!$("#chx_catchchoose4").prop("checked")) {
			arr[3] = 2;
		}
		if(!$("#chx_catchchoose5").prop("checked")) {
			arr[4] = 2;
		}
		$("#catchChooseWM").val(arr.join(","));
	});
});
//222222
</script>

