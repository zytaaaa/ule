define(["config","marquee"], function() {
	require(["jquery"], function() {
		/*1.轮播图*/
		var $ban=$("#banner");
		var $lbtn=$(".btn-lunbo li");
		var $limg=$(".slide>li");
		var $lbtimer=null;
		var $num=0
		$lbtn.on("mouseover",function () {
			$num=$(this).index();
			lb();
		});
		$lbtimer=setInterval(function () {
			$num++;
			if($num>$lbtn.length-1){
				$num=0;
			}
			lb();
		},5000)
		function lb() {
			$lbtn.eq($num).css("background-position","-47px -158px").siblings("li").css("background-position"," -67px -158px")
		    $limg.eq($num).stop(true).animate({"opacity":1}).siblings("li").stop(true).animate({"opacity":0});
		}
		$ban.hover(function () {
			clearInterval($lbtimer);
		},function () {
			$lbtimer=setInterval(function () {
			   $num++;
			   if($num>$lbtn.length-1){
				  $num=0;
			   }
			   lb();
		    },5000);
		 });
		
		/*滑过商品列表显示的样式*/
		$(".m1-section_1 li,.main_floor2 li").hover(function () {
			$(this).css({
				position:"relative",
				top:"-3px",
				"box-shadow":" 0 16px 30px -14px rgba(0,36,100,0.3)",
                transition: "box-shadow .5s"
		    })
		},function () {
			$(this).css({
				top:0,
				"box-shadow":"none"
			})
		})
		$(".main_floor3 ul").on("mouseover","li",function () {
			$(this).css({
				position:"relative",
				top:"-3px",
				"box-shadow":" 0 16px 30px -14px rgba(0,36,100,0.3)",
                transition: "box-shadow .5s"
		    })
		});
		$(".main_floor3 ul").on("mouseout","li",function () {
			$(this).css({
				top:0,
				"box-shadow":"none"
			})
		});
		$(".m1-section_2>a,.m1-section_3 li").hover(function () {
			$("<div>").appendTo($(this)).css({
				width:$(this).width(),
				height:$(this).height(),
				background:"#fff",
				position:"absolute",
				top:0,
				left:0,
				opacity:0.3
			})
		},function () {
			$(this).children("div").remove();
		})
		/*左右的无缝切换*/
		var $oli=$(".marq>li");
		var $oulwidth=$oli.length*$oli.eq(1).width();
		$(".marq").width($oulwidth);
		$(".wfqh").tab({});
		/*上下的无缝切换*/
		var $cheaplist=$(".slide-items>.cheaplist");
		var $slideheight=$cheaplist.length*$cheaplist.eq(0).height();
		$(".slide-items").height($slideheight);
		$(".m1-section_1").tab({
			motion:false  //改变切换的方向，默认的是水平
		})
		
		/*楼梯效果*/
		var $floatli=$("#floatTool li").not(".last");
		var $loucheng=$(".louceng");
		$(window).on("scroll",function () {
			var $topjl=$(this).scrollTop();
			if($topjl>1100){
				$("#floatTool").show();
			}else{
				$("#floatTool").hide();
			}
			
			$loucheng.each(function (index,value) {
				var $louchengtop=$(value).offset().top+$(value).height()/2;
				if($topjl<$louchengtop){
					$floatli.eq(index).find("label").css("display","block").end().siblings().find("label").hide();
					$floatli.eq(index).find("span").hide().end().siblings().find("span").show();
					return false;
				}
			})
		});
		$floatli.on("click",function () {
		    var $louchengtop=$loucheng.eq($(this).index()).offset().top-$(".capyheader").height()-20;
		    $("html,body").animate({
		    	scrollTop:$louchengtop
		    });
		    $(this).find("label").css("display","block").end().siblings().find("label").hide();
			$(this).find("span").hide().end().siblings().find("span").show();
		})
		$(".last").on("click",function () {
			$("html,body").animate({
				scrollTop:0
			})
		})
		
		//懒加载
		  //jqlazy
		  require(["jqlazy"],function () {
			  	$("img.lazy").lazyload({
				effect: "fadeIn"
			})
		  })
	});
});