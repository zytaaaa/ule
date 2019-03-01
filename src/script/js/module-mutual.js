define(["config", "marquee"], function() {
	require(["jquery"], function() {
		/*渲染主页面*/
		var $urlphp = "http://10.31.162.112/homework/item/ule/php/";
		$.ajax({
			type: "post",
			url: $urlphp + "main.php",
			dataType: "json"
		}).done(function(data) {
			var $instr = '';
			$.each(data, function(index, value) {
				$instr += `<li>
									<a href="details.html?sid=${value.sid}" target="_blank">
										<img class="lazy" data-original="${value.url}" width="200" height="200"/>
									</a>
									<p class="prod-name">
										<a href="details.html?sid=${value.sid}" target="_blank">${value.listName}</a>
									</p>
									<p class="prod-price">
										<span>
											￥<strong>${value.price}</strong>
										</span>
									</p>
									<p class="shop_area">
										<a href="#">${value.storeName}</a>
										<a href="#">${value.provinceName}</a>
									</p>
								</li>`;
			})
			$(".main_floor3 ul").html($instr);
		});
	
		/*-----------------详情页---------------------*/
		//渲染详情页
		/*取到地址栏传来的sid的值*/
		var $usid = location.search.substring(1).split("=")[1];
		$.ajax({
			url: $urlphp + "detail.php",
			data: {
				sid: $usid
			},
			dataType: "json"
		}).done(function(data) {
			$(".sdname").html(data.storeName);
			$(".midname").html(">" + data.listName);
			$(".spic img,.bf img").attr("src", data.url);
			var arrimgurl = data.imgurl.split(",");
			var str = '';
			$.each(arrimgurl, function(index, value) {
				str += '<li><img src="' + value + '"/></li>';
			});
			$('.ulist ul').html(str);
			$(".proInfo h1,.detailtitle,.mt10").html(data.listName);
			$(".proprice dd strong,.m5 strong").html(data.price);
		});
	
		/*把商品信息储存在cookie里面*/
		//本地存储
		var sidarr = [];
		var numarr = [];
		var $tanch = $("#util-overlayer,#util-dialog"); //弹窗
		cookietoarray();//将存储的值变成
		$(".btn_add2cart").on("click", function() {
			if($.inArray($usid, sidarr) == -1) {
				sidarr.push($usid);
				numarr.push($(".pCount").val());
				localStorage.cookiesid = sidarr.toString();
				localStorage.cookienum = numarr.toString();
			} else {
				var newnum = parseInt(numarr[$.inArray($usid, sidarr)]) + parseInt($(".pCount").val());
				numarr[$.inArray($usid, sidarr)] = newnum;
				localStorage.cookienum = numarr.toString();
			}
			$tanch.show(); //显示弹窗
		});
		//点击对应的按钮关闭弹窗
		$(".close,.continue").on("click", function() {
			$tanch.hide();
		});
	
		/*--------------------------购物车----------------------------*/
		//封装函数，渲染页面
		function shopslist(sid, num) {
			$.ajax({
				url: $urlphp + "main.php",
				dataType: "json"
			}).done(function(data) {
				$.each(data, function(index, value) {
					if(sid == value.sid) {
						var clonegoodslist = $('.prolist:hidden').clone(true, true); //深度克隆被隐藏的商品列表
						clonegoodslist.find(".dnama").html(value.storeName);
						clonegoodslist.find(".proimg").find("img").attr("src", value.url);
						clonegoodslist.find(".proimg").find("img").attr('sid', value.sid);
						clonegoodslist.find(".projs").html(value.listName);
						clonegoodslist.find(".proprice").find("em").html(value.price);
						clonegoodslist.find(".prototal").find("em").html((value.price * num).toFixed(2));
						clonegoodslist.find(".procount").find("input").val(num);
						clonegoodslist.css("display", "block");
						clonegoodslist.appendTo(".cart-main");
						totalprice();
					}
				});
			})
		}
	
		//判断localStorage中有值渲染页面
		if(localStorage.cookiesid && localStorage.cookienum) {
			var sid = localStorage.cookiesid.split(",");
			var num = localStorage.cookienum.split(",");
			var allshop = 0;
			$.each(sid, function(index, value) {
				shopslist(sid[index], num[index]);
				allshop += parseInt(num[index]);
			});
			$(".cart-title").find("span").html(allshop); //计算总的商品量
			$(".head-shopcart").find(".shopcart i").html(allshop);
		}
		empty();
		function empty(){
			if(localStorage.cookiesid){
				$(".gouwu").show();
			    $(".empty-cart").hide();
			}else{
				$(".gouwu").hide();
			    $(".empty-cart").show();
			    $(".btn-ljlogin").on("click",function () {
			    	location.href="login.html";
			    })
			}
		}
		//计算总的数量和总价的函数
		function totalprice() {
			var allprice = 0;
			var allcount = 0;
			$(".prolist:visible").each(function() {
				//找不到后面的一个checkbox，又新判断了一遍
				if($(this).find("input:checkbox").is(':checked')) {
					allprice += parseFloat($(this).find(".prototal em").html());
					allcount += parseInt($(this).find(".procount input").val());
				}
			});
			$(".mycart-bar .allnum em").html(allcount);
			$(".mycart-bar .pro-allprice em").html(allprice.toFixed(2));
		};
	
		//全选按钮
		var $inputs = $(".prolist:visible").find("input:checkbox");
		$(".chk-all").on("change", function() {
			$(".prolist:visible").find("input:checkbox").prop('checked', $(this).prop('checked'));
			$(".chk-all").prop("checked", $(this).prop("checked"));
			totalprice();
		});
		$(".cart-main").on("change", $inputs, function(index, value) {
			if($(".prolist:visible").find("input:checked").length == $(".prolist:visible").find("input:checkbox").size()) {
				$(".chk-all").prop("checked", true);
			} else {
				$(".chk-all").prop("checked", false);
			}
			totalprice();
		});
		//单个商品价格的计算
		function pricejs(obj) {
			var onlyprice = parseFloat(obj.parents(".prolist").find(".proprice em").html());
			var onlynum = parseInt(obj.parents(".prolist").find(".procount input").val());
			return (onlyprice * onlynum).toFixed(2);
		}
		/*商品增加减少*/
		$(".btn-sub").on("click", function() {
			var $shul = $(this).parents(".procount").find("input").val();
			$shul--;
			if($shul < 1) {
				$shul = 1;
				$(this).css("background-color", "rgb(241, 241, 241)");
			}
			 $(this).parent(".procount").find("input").val($shul);
			$(".btn-add").css("background-color", "rgb(255, 255, 255)");
			$(this).parents(".items-store").find(".prototal em").html(pricejs($(this)));
			changecookie($(this));
			totalprice();
		})
		$(".btn-add").on("click", function() {
			var $shul = $(this).parents(".procount").find("input").val();
			$shul++;
			if($shul > 99) {
				$shul = 99;
				$(this).css("background-color", "rgb(241, 241, 241)");
			}
			$(this).parents(".procount").find("input").val($shul);
			$(".btn-sub").css("background-color", "rgb(255, 255, 255)");
			$(this).parents(".items-store").find(".prototal em").html(pricejs($(this)));
			changecookie($(this));
			totalprice();
		})
		$(".procount input").on("input", function() {
			var reg = /^\d+$/g;
			if(reg.test($(this).val())) {
				var $value = $(this).val();
				if($value > 99) {
					$(this).val(99);
				} else if($value <= 0) {
					$(this).val(1);
				} else {
					$(this).val($value);
				}
			} else {
				$(this).val(1);
			}
			$(this).parents(".items-store").find(".prototal em").html(pricejs($(this)));
			totalprice();
			changecookie($(this));
		});
	    //把改变的值放在存到本地储存中
	    function cookietoarray() {
	    	if(localStorage.cookiesid && localStorage.cookienum) {
				sidarr = localStorage.cookiesid.split(",");
				numarr = localStorage.cookienum.split(",");
			}
	    };
	    function changecookie(obj) {
	    	cookietoarray();
	    	var sid=obj.parents(".prolist").find('.proinfo img').attr('sid');
	    	numarr[$.inArray(sid,sidarr)]=obj.parents(".prolist").find(".procount input").val();
	        localStorage.cookienum=numarr.toString();
	    };
	    /*
	    $("#pdb-bottom p a:eq(0)").on("click",function(){
	    	alert(2);
	    })*/
	    //删除商品的构造函数
	    function delcookie(obj) {
	    	 cookietoarray();
	    	var $delsid=obj.parents(".prolist").find('.proinfo img').attr('sid');
	    	var $delindex=$.inArray($delsid,sidarr);
	    	sidarr.splice($delindex,1);
	    	numarr.splice($delindex,1);
	    	localStorage.cookienum=numarr.toString();
	    	localStorage.cookiesid=sidarr.toString();
	    }
	    //删除单个商品
	    $(".cart-main").on("click",".del",function () {
	    	var _this=$(this);
	    	$(".f14").html("您确定从购物车删除该商品吗?");
	    	$tanch.show();
	    	$("#pdb-bottom p a:eq(0)").show();
	    	$("#pdb-bottom p a:eq(0)").one("click",function(){
	    		_this.parents(".prolist").remove();
	    		delcookie(_this);
	    		$tanch.hide();
	    		empty();
	    	})
	    });
	    //批量删除
	    $(".cart-foot .pldel").on("click",function () {
	    		$(".prolist:visible").each(function(index,value){
	    			 var that=$(this);
	    			 $tanch.show();
	    			if($(value).find("input:checkbox").is(":checked")){
	    				$("#pdb-bottom p a:eq(0)").show();
	    				$(".f14").html("您确定从购物车删除选定的商品吗?");
	    	            $("#pdb-bottom p a:eq(0)").one("click",function(){
		    				that.remove();
		    				delcookie(that);
		    				empty();
	    			   });
	    			}else{
	    				$(".f14").html("请选择需要删除的商品！");
	    				$("#pdb-bottom p a:eq(0)").hide();
	    			}
	    		});
	    });
	    //清空购物车
	    $(".cart-foot .alldel").on("click",function () {
	    	$(".f14").html("您确定要删除当前购物车中的所有商品?");
	    	$tanch.show();
	    	$("#pdb-bottom p a:eq(0)").one("click",function(){
	    		$("#pdb-bottom p a:eq(0)").show();
	    		$(".prolist:visible").each(function(index,value){
	    			$(this).remove();
	    			delcookie($(this));
	    			empty();
	    		})
	    	});
	    });
	    
	});
});