define(["config"], function() {
	require(["jquery"], function() {
		/*无缝切换*/
		(function() {
			$.fn.extend({
				tab: function(options) {
					defalut = { //默认参数
						/*左右运动的默认参数*/
						movetag: ".marq",
						btns: ".order li",
						content:$(".marq>li").eq(1).width(),
						eventype: "mouseover",
						activeClass:"orderhover",
						/*上下运动的默认参数*/
						motion:true,/*运动的方向判断，是上下，还是左右*/
						sxbtns:".slide-index h4",
						activeclss2:"h4hover",
						ydcontent:".slide-items",
						ydheight:$(".cheaplist").eq(1).height()
					}
					var setting = $.extend(true, defalut, options);
					$(this).each(function() {
						var _this=$(this);
						if(setting.motion){
							$(this).find(setting.btns).on(setting.eventype, function() {
								$(this).addClass(setting.activeClass).siblings().removeClass(setting.activeClass);
								_this.find(setting.movetag).stop(true).animate({
									"left":"-"+setting.content*$(this).index()
								})
							})
						}else{
							$(this).find(setting.sxbtns).on(setting.eventype,function(){
								$(this).addClass(setting.activeclss2).siblings().removeClass(setting.activeclss2);
								_this.find(setting.ydcontent).stop(true).animate({
									"top":"-"+setting.ydheight*$(this).index()
								})
							})
						}
					})
				}
			})
		})();
		
		/*商品增加减少*/
		(function () {
			var $shul=$(".pCount").val();
		    var $num=$shul;
		    $(".sub").on("click",function () {
		    	$num--;
		    	if($num<1){
		    		$num=1;
		    		$(this).css("background-color","rgb(241, 241, 241)");
		    	}
		    	$(".add").css("background-color","rgb(255, 255, 255)");
		    	$(".pCount").val($num);
		    })	
		    $(".add").on("click",function () {
		    	$num++;
		    	if($num>99){
		    		$num=99;
		    		$(this).css("background-color","rgb(241, 241, 241)");
		    	}
		    	$(".sub").css("background-color","rgb(255, 255, 255)");
		    	$(".pCount").val($num);
		    })
		    $(".pCount").on("focus",function () {
		    	$(this).css("border","1px solid #00BBEE");
		    })
		    $(".pCount").on("blur",function () {
		    	$(this).css("border","1px solid #999");
		    })
		    
		})();
	})
})