define(["config"], function() {
	require(["jquery"], function() {
		//各页面导入头部和底部
		$(".toph").load("tophead.html",function () {//主页面
			/*顶部悬浮*/
			$(window).on('scroll', function() {
				var $top = $(window).scrollTop();
				if($top>700){
					$(".capyheader").css("display","block");
				}else{
					$(".capyheader").css("display","none");
				}
			});
			/*头部搜索框的搜索引擎*/
		    $("#keywords").on("input",function () {
				$.ajax({
					type:"get",
					url:"https://search.ule.com/api/suggest.action?callback=ule&query="+$("#keywords").val(),
		            dataType:"jsonp",
		            jsonpCallback:"ule"
				}).done(function(data){
					var str="";
					for(var i in data) {
					    str+=`<li><a href="http://search.ule.com/search.do?keywords=${i}" target="_blank">${i}</a><span>约${data[i]}个物品</span></li>`;
					}
					if($("#keywords").val()==""){
						
						$(".searchconten").hide();
					}
					$(".searchconten").html(str);
				});
			})
		    $("#keywords").on("focus",function () {
		    	$("#keywords").css("outline","2px solid #0033CC");
		    	$("#keywords").val("");
		    })
		     $("#keywords").on("blur",function () {
		     	$("#keywords").css("outline","none");
		    	$("#keywords").val("省钱大作战，有你更精彩!");
		    })
		}); 
		$(".tophlr").load("tophead.html", function() { //登录注册页面
			$(".head-shopcar").css("display", "none");
			$(".head-serch").css("display", "none");
		});
		$(".tophx").load("tophead.html", function() { //详情页面
			$(".head-shopcar").css("display", "none");
			$(".head-serch").css("margin-right", "0");
			$(".head-serch p a").css("color", "#666666");
		});
		$(".tophg").load("tophead.html", function() {
			$(".head-shopcar").css("display", "none");
			$(".head-serch").css("display", "none");
			$(".head-cart").css("display", "block");
			$(".wrapper").css("width", "950px");
		});
		$("footer").load("footer.html");

		
	})
})