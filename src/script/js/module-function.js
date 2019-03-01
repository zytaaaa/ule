define(["config"], function() {
	require(["jquery"], function() {
		var $urlphp="http://10.31.162.112/homework/item/ule/php/";
		function loginsucc() {
			 if(localStorage.userphone){
				var phone=localStorage.userphone.split("");
				phone.splice(3,4,"*","*","*","*").join("");
				$(".welcome a").html(phone);
				$(".nologin").hide();
				$(".aleadylogin").show();
			}else{
				$(".welcome a").html("");
				$(".nologin").show();
				$(".aleadylogin").hide();
			}
			$(".aleadylogin").on("click",function () {
				localStorage.removeItem("userphone");
			})
		}
		//各页面导入头部和底部
		$(".toph").load("tophead.html",function () {//主页面
			//登录成功
			loginsucc();
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
					for(var i in data) {//href="http://search.ule.com/search.do?keywords=${i}" target="_blank"
					    str+=`<li><a >${i}</a><span>约${data[i]}个物品</span></li>`;
					}
					$(".searchconten").html(str);
					$(".searchconten li").each(function () {
					    $(this).on("click",function () {
							$("#keywords").val($(this).find("a").html());
							$(".searchconten").hide();
						})
					})
					if($("#keywords").val()==""){
						$(".searchconten").hide();
					}else{
						$(".searchconten").show();
					}
					 $("html").on("click",function(ev){
				    	$("#keywords").css("outline","none");
				    	if(!$(ev.target).is(".searchconten li")){
				    		$("#keywords").val("省钱大作战，有你更精彩!");
				    	    $(".searchconten").hide();
				    	}
				    	
				     })
				});
				
			})
		    $("#keywords").on("focus",function () {
		    	$("#keywords").css("outline","2px solid #0033CC");
		    	$("#keywords").select();
		    })
		   
		}); 
		$(".tophlr").load("tophead.html", function() { //登录注册页面
			loginsucc();
			$(".head-shopcar").css("display", "none");
			$(".head-serch").css("display", "none");
		});
		$(".tophx").load("tophead.html", function() { //详情页面
			loginsucc();
			$(".head-shopcar").css("display", "none");
			$(".head-serch").css("margin-right", "0");
			$(".head-serch p a").css("color", "#666666");
		});
		$(".tophg").load("tophead.html", function() {//购物车页面
			$(".head-shopcar").css("display", "none");
			$(".head-serch").css("display", "none");
			$(".head-cart").css("display", "block");
			$(".wrapper").css("width", "950px");
			loginsucc();
		});
		$("footer").load("footer.html");
      
        //点击购物车图标进入购物车页面
        $(".shopcart").on("click",function () {
        	 location.href="cart.html";
        });

		/*----------------注册------------------*/
		var $telflag=null;
		var $passflag=null;
		var $confimpassflag=null;
		var $yzmflag=null;
		var $agreeflag=null;
		$(".item input").on("focus",function () {
			$(this).css({"border":"1.5px solid #60BDE8","border-radius":"4px"});
		})
		$(".item input").on("blur",function () {
			$(this).css({"border":"1px solid #cacaca","border-radius":"0px"});
		})
		/*手机号验证*/
		$(".phone").find("input").on("focus",function () {
			$(this).siblings("span").html("请填写正确的手机号码，方便接受订单通知、找回密码等").removeClass().addClass("conmit").css("line-height","20px");
		})
		$(".phone").find("input").on("blur",function () {
			var _this=$(this);
			if($(this).val()!=""){
				var tel=/^1[3578]\d{9}$/;
				if(tel.test($(this).val())){
					$.ajax({
					    type:"post",
					    data:{
					    	$tel:$(this).val()
					    },
					    url:$urlphp+"confimtel.php"
				    }).done(function (data) {
				    	console.log(data);
				    	if(data){
				    		_this.siblings("span").html("该手机号以注册，请<a href='login.html' style='color:#06c'>登录</a>").removeClass().addClass("error").css("line-height","40px");
				    	    $telflag=false;
				    	}else{
				    		_this.siblings("span").html("").removeClass().addClass("bingo");
				    		$telflag=true;
				    	}
				    })
				}else{
					$(this).siblings("span").removeClass().addClass("error").html("请填写正确的手机号码，方便接受订单通知、找回密码等").css("line-height","20px");
				    $telflag=false;
				}
			}else{
				$(this).siblings("span").removeClass().addClass("error").html("手机号不能为空").css("line-height","40px");
			    $telflag=false;
			}
		});
		/*密码验证*/
		$("#password").on("blur",function () {
			var regnum=/\d+/; //数字
			var reglowercase=/[a-z]+/;  //小写
			var reguppercase=/[A-Z]+/;  //大写
			var other=/[^0-9a-zA-Z]+/;  //其他字符
			var num=0;
			if(regnum.test($(this).val())){
					num++;
			}
			if(reglowercase.test($(this).val())){
					num++;
			}
			if(reguppercase.test($(this).val())){
					num++;
			}
			if(other.test($(this).val())){
					num++;
			}
			
		    if($(this).val()!=""){
			   if(($(this).val().length>=6 && $(this).val().length<=20) && num>1){
			   	   if(num==2){
			   	    	$(this).siblings("span").removeClass().addClass("conmit").html("密码安全级别较低，建议密码最好包含数字，大小写字母，特殊符号").css("line-height","20px");
			   	   }else{
			   	   	   $(this).siblings("span").removeClass().addClass("bingo").html("密码安全级别较高").css("line-height","40px");
			   	   }
			   	   $passflag=true;
			   }else{
			   	  $passflag=false;
			   	  $(this).siblings("span").removeClass().addClass("error").html("建议使用大小写字母、数字和符号两种以上的组合，6-20个字符").css("line-height","20px");
			   }
		   }else{
		      $passflag=false;
		   	  $(this).siblings("span").removeClass().addClass("error").html("密码不能为空").css("line-height","40px");
		   }
		});
		
		/*确认密码*/
		$("#qrpassword").on("blur",function () {
			if($(this).val()!=""){
				if($(this).val()==$("#password").val()){
					$(this).siblings("span").removeClass().addClass("bingo").html("两次密码输入一致");
					$confimpassflag=true;
				}else{
					$(this).siblings("span").removeClass().addClass("error").html("两次密码输入的不一致");
					$confimpassflag=false;
				}
			}else{
				$(this).siblings("span").removeClass().addClass("error").html("确认密码不能为空");
				$confimpassflag=false;
			}
		})
		/*同意条款*/
		$("#agre").on("click",function () {
			if($("#agre").prop("checked")){
				$("#agre").siblings("p").hide();
				$agreeflag=true;
			}else{
				$("#agre").siblings("p").show();
				$agreeflag=false;
			}
		});
		/*验证码*/
		function rannum(max,min) {
			return Math.round(Math.random()*(max-min))+min;
		}
		/*点击验证码更换*/
		$(".imgbtn").on("click",function () {
			var $sz=rannum(9999,1000);
			$(this).html($sz);
		});
		$("#yzm").on("blur",function () {
			if($(this).val()!=""){
				if($(this).val()==$(this).siblings("div").html()){
					$(this).siblings("span").removeClass().addClass("bingo").html("");
					$yzmflag=true;
				}else{
					$(this).siblings("span").removeClass().addClass("error").html("验证码输入错误");
					$yzmflag=false;
				}
			}else{
				$(this).siblings("span").removeClass().addClass("error").html("验证码不能为空");
				$yzmflag=false;
			}
		});
		/*提交到后端*/
		$(".reg-btn a").on("click",function () {
			if($("#phone").val()==""){
				$("#phone").siblings("span").removeClass().addClass("error").html("手机号不能为空");
			}
			if($("#yzm").val()==""){
				$("#yzm").siblings("span").removeClass().addClass("error").html("验证码不能为空");
			}
			if($("#password").val()==""){
				$("#password").siblings("span").removeClass().addClass("error").html("密码不能为空");
			}
			if($("#qrpassword").val()==""){
				$("#qrpassword").siblings("span").removeClass().addClass("error").html("确认密码不能为空");
			}
			if($telflag && $passflag && $confimpassflag && $yzmflag && $agreeflag){
				$.ajax({
					type:"post",
					url:$urlphp+"registor.php",
					data:{
						$tel:$("#phone").val(),
						$password:$("#password").val()
					}
				}).done(function () {
					 location.href="login.html";
				})
			}
		});
		
		/*---------------登录------------*/
		$("#loginphone").on("focus",function () {
			$(this).css("border","1px solid #cacaca");
			$(this).select();
		})
		$("#loginpassword").on("focus",function () {
			if($(this).val()!=""){
				$(this).siblings("span").hide();
			    $(this).select();
			}
		})
		
		/*手机号验证*/
		$("#loginphone").on("blur",function () {
			if($(this).val()!=""){
				$.ajax({
					type:"post",
					url:$urlphp+"confimtel.php",
					data:{
						$tel:$(this).val()
					}
				}).done(function (data) {
					if(data){
						$("#loginphone").siblings("span").hide();
					}else{
						$("#loginphone").siblings("span").show().html("该账号不存在，请重新输入!");
					    $("#loginphone").css("border","1px solid red");
					}
				})
			}
		});
		/*手机号密码发送到后端验证*/
		$("#login-btn").on("click",function () {
			$.ajax({
				type:"post",
				url:$urlphp+"login.php",
				data:{
					$tel:$("#loginphone").val(),
					$pass:$("#loginpassword").val()
				}
			}).done(function (data) {
				console.log(data);
				if(!data){
				    $("#loginpassword").siblings("span").show().html("密码错误");
				}else{
					location.href="index.html";
					localStorage.setItem("userphone",$("#loginphone").val());
				}
			});
		});
		
	})
})