define(["config"], function() {
	require(["jquery"], function() {
		/*渲染主页面*/
		$.ajax({
			type: "post",
			url: "http://10.31.162.112/homework/item/ule/php/",
			dataType: "json"
		}).done(function(data) {
			var $instr = '';
			$.each(data,function(index, value) {
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
		})
	});
});