$(function() {
	//nav();
	//iteam(); //首页团队滚动
	ngqScroll(); //钢琴滚动
	aboutScroll(); //关于我们
	nNewsBox();
	banner();//banner滚动
})


function banner() {
	if ($('#banner li').length > 1) {
		var $a = $('#banner'),
			length = $a.find('li').length,
			vi = 0,
			wid, t, autoPlayTime = 8000,
			autoAnimateTime = 500,
			loop = true;
		var clone = $a.find('li').eq(0).clone().addClass('clone'),
			tipHtml = '';;
		$a.children('.list').append(clone);
		if (length > 1) {
			for (var i = 0; i < length; i++) {
				i == 0 ? tipHtml += '<span class="cur"></span>' : tipHtml += '<span></span>';
			}
			$a.children('.tip').show();
		}
		$a.children('.tip').html(tipHtml);
		var _init = function() {
			wid = $a.width();
			$a.children('.list').width(wid * (length + 1));
			$a.find('li').width(wid);
			$a.find('img').css({
				'width': wid
			});
			$a.css({
				'opacity': 1
			});
		}
		var _func = function() {
			if (vi >= length) {
				vi = 0;
				_func();
			} else {
				vi++;
				$a.children('.list').css({
					'-webkit-transform': 'translate3d(-' + wid * vi + 'px, 0px, 0px)',
					'-webkit-transition': '-webkit-transform ' + autoAnimateTime + 'ms linear'
				});
				if (vi == length) {
					$a.children('.tip').children('span').eq(0).addClass('cur').siblings().removeClass('cur');
					setTimeout(function() {
						$a.children('.list').css({
							'-webkit-transform': 'translate3d(0px, 0px, 0px)',
							'-webkit-transition': '-webkit-transform 0ms linear'
						});
					}, autoAnimateTime);
				} else {
					$a.children('.tip').children('span').eq(vi).addClass('cur').siblings().removeClass('cur');
				}
			}
		}
		var _touch = function() {
			var o_pagex = 0,
				o_pagey = 0, // 接触记录值
				e_pagex = 0,
				e_pagey = 0; // 离开记录值
			$a.bind({
				'touchstart': function(e) {
					clearInterval(t);
					o_pagex = e.originalEvent.targetTouches[0].pageX;
					o_pagey = e.originalEvent.targetTouches[0].pageY;
				},
				'touchmove': function(e) {
					e_pagex = e.originalEvent.changedTouches[0].pageX;
					e_pagey = e.originalEvent.changedTouches[0].pageY;
					var xpage = e_pagex - o_pagex; //::负数-向左边滑动::正数-向右边滑动
					var ypage = e_pagey - o_pagey;
					if (Math.abs(xpage) > Math.abs(ypage)) {
						if (xpage >= 0) {
							if (vi <= 0) {
								$a.children('.list').css({
									'-webkit-transform': 'translate3d(-' + (wid * length - xpage) + 'px, 0px, 0px)',
									'-webkit-transition': '-webkit-transform 0ms linear'
								});
								vi = length;
							}
						} else {
							if (vi >= length) {
								$a.children('.list').css({
									'-webkit-transform': 'translate3d(0px, 0px, 0px)',
									'-webkit-transition': '-webkit-transform 0ms linear'
								});
								vi = 0;
							}
						}
						$a.children('.list').css({
							'-webkit-transform': 'translate3d(-' + (wid * vi - xpage) + 'px, 0px, 0px)',
							'-webkit-transition': '-webkit-transform 0ms linear'
						});
						e.preventDefault();
					}
				},
				'touchend': function(e) {
					$a.children('.list').css({
						'-webkit-transition': '-webkit-transform ' + autoAnimateTime + 'ms linear'
					});
					e_pagex = e.originalEvent.changedTouches[0].pageX
					e_pagey = e.originalEvent.changedTouches[0].pageY
					if (Math.abs(e_pagey - o_pagey) > 0 && Math.abs(e_pagex - o_pagex) < 50) {
						vi -= 1;
						_func();
					} else {
						if (e_pagex - o_pagex > 0) { // 手指向右边滑动
							vi -= 2;
							_func();
						} else if (e_pagex - o_pagex < 0) { // 手指向左边滑动
							_func();
						}
					}
					t = setInterval(_func, autoPlayTime);
				}
			});
		}
		_touch();
		_init();
		t = setInterval(_func, autoPlayTime);
		$(window).resize(_init);
		window.onorientationchange = function() {
			_init();
		};
	}
}

function aboutScroll(){
	// about滚动
		if ($('#iaboutImg2 .list li').length > 2) {
			! function() {
				var $id = $('#iaboutImg2'),
					$list = $id.find('.list'),
					index = 0,
					_width = $list.children('li').outerWidth(true),
					oLeft = $("#about_l2"),
					oRight = $("#about_r2"),
					_speed = 300,
					_size = $list.children('li').length,
					t,
					_interval = 2000;
	
				$list.append($list.html()).width(_size * _width * 2);
	
				function fun() {
					if (index > _size) {
						$id.find('.list').css({
							'left': 0
						});
						index = 1;
						fun();
					} else if (index < 1) {
						$id.find('.list').css({
							'left': -_size * _width
						});
						index = _size - 1;
						fun();
					} else {
						$list.stop().animate({
							'left': -index * _width
						}, _speed);
					}
				}
				oLeft.click(function() {
					index++;
					fun();
				});
				oRight.click(function() {
					index--;
					fun();
				})
				$id.bind({
					'mouseenter': function() {
						clearInterval(t);
					},
					'mouseleave': function() {
						t = setInterval(function() {
							index++;
							fun();
						}, _interval);
					}
				})
	
				t = setInterval(function() {
					index++;
					fun();
				}, _interval);
	
			}()
		}
		//end
}

function nav() {
	// 顶部导航
	$('#nav .drop').each(function(index, element) {
		if ($(this).find('dd').length == 0) {
			$(this).remove();
		}
	})
	$('#nav li').hover(function() {
		$(this).children('.drop').stop(true, true).slideDown(200);
	}, function() {
		$(this).children('.drop').stop(true, true).slideUp(200);
	})
}


function iteam() {
	//案例滚
	if ($('#iteam .list li').length > 4) {
		! function() {
			var $id = $('#iteam'),
				$list = $id.find('.list'),
				index = 0,
				_width = $list.children('li').outerWidth(true),
				oLeft = $("#caseLeft"),
				oRight = $("#caseRight"),
				_speed = 300,
				_size = $list.children('li').length,
				t,
				_interval = 4000;

			$list.append($list.html()).width(_size * _width * 2);

			function fun() {
				if (index > _size) {
					$id.find('.list').css({
						'left': 0
					});
					index = 1;
					fun();
				} else if (index < 1) {
					$id.find('.list').css({
						'left': -_size * _width
					});
					index = _size - 1;
					fun();
				} else {
					$list.stop().animate({
						'left': -index * _width
					}, _speed);
				}
			}
			oLeft.click(function() {
				index++;
				fun();
			});
			oRight.click(function() {
				index--;
				fun();
			})
			$id.bind({
				'mouseenter': function() {
					clearInterval(t);
				},
				'mouseleave': function() {
					t = setInterval(function() {
						index++;
						fun();
					}, _interval);
				}
			})

			t = setInterval(function() {
				index++;
				fun();
			}, _interval);

		}()
	}
}


function ngqScroll() {
	//案例滚
	if ($('#ngqScroll .list li').length > 1) {
		! function() {
			var $id = $('#ngqScroll'),
				$list = $id.find('.list'),
				index = 0,
				_width = $list.children('li').outerWidth(true),
				oLeft = $("#caseLeft"),
				oRight = $("#caseRight"),
				_speed = 300,
				_size = $list.children('li').length,
				t,
				_interval = 5000;

			$list.append($list.html()).width(_size * _width * 2);

			function fun() {
				if (index > _size) {
					$id.find('.list').css({
						'left': 0
					});
					index = 1;
					fun();
				} else if (index < 1) {
					$id.find('.list').css({
						'left': -_size * _width
					});
					index = _size - 1;
					fun();
				} else {
					$list.stop().animate({
						'left': -index * _width
					}, _speed);
				}
			}
			oLeft.click(function() {
				index++;
				fun();
			});
			oRight.click(function() {
				index--;
				fun();
			})
			$id.bind({
				'mouseenter': function() {
					clearInterval(t);
				},
				'mouseleave': function() {
					t = setInterval(function() {
						index++;
						fun();
					}, _interval);
				}
			})

			t = setInterval(function() {
				index++;
				fun();
			}, _interval);

		}()
	}
}



function nabout() {
	$("#naboutMap .ndzNav span").on("click", function() {
		var oIndex = $(this).index();
		$(this).addClass("curr").siblings().removeClass("curr");
		$("#naboutMap .mpRight .box").eq(oIndex).stop(true, true).fadeIn(300).siblings().stop(true, true).fadeOut(300);

		$("#naboutMap .mpLeft .imgBox").eq(oIndex).stop(true, true).fadeIn(300).siblings().stop(true, true).fadeOut(300)

	})
}





function nNewsBox() {
	$(".nNewsBox").each(function() {
		var that = $(this);
		that.find(".list li").hover(function() {
			var oIndex = $(this).index();
			$(this).addClass("curr").siblings().removeClass("curr");
			that.find(".imgBOx img").eq(oIndex).stop(true, true).fadeIn(200)
				.siblings().stop(true, true).fadeOut(800);
		})
	})

}
