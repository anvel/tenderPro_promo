/**
 * Frontend common JS styles
 *
 * Project: Promo
 * File: common.js
 *
 * @author Igor <igor@altsolution.net>
 * @package css
 */

// Get param from URL
function gup(name) {
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.href);
	if (results == null)
		return "";
	else
		return results[1];
}

$(document).ready(function() {

	//init STARTPAGE
	var page = 'promo/uchastie-v-konkursah.html';

	// init active tabs by url hash
	if (document.location.hash != '') {
		
		var page = document.location.hash;
		page = page.substr(1);
		
		// show registration by url or other page by url
		if (page == 'registaration') {

			var addToUrl = '';
		        if (gup('_openstat')) {

				addToUrl = '?_openstat=' + gup('_openstat');
			}
			document.location.href= "/registration" + addToUrl; //@temp
			
			/*
			$('#Tab li a').removeClass('active');
			$('#Tab li a[href="#registaration"]').addClass('active');
			$('#registaration').css('display','block');	
			*/	
		} else {
			$('#TabHolder .tabitem').css('display','none');	
			$('#ajax').load(page);
			$('.scrollBox .content a[href="'+page+'"]').addClass('active');	
			var id = $('.scrollBox .content a.active').parents('.tabitem').attr('id');	
			$('#TabHolder #'+id).css('display','block');			
			$('#Tab li a[href="#'+id+'"]').addClass('active');	
			initscrollbox();			
		}
	} else {
		$('#TabHolder .tabitem').css('display','none');	
		$('#ajax').load(page);
		$('.scrollBox .content a[href="'+page+'"]').addClass('active');	
		var id = $('.scrollBox .content a.active').parents('.tabitem').attr('id');	
		$('#TabHolder #'+id).css('display','block');			
		$('#Tab li a[href="#'+id+'"]').addClass('active');
		initscrollbox();	
	}	
	
	// select tabs
	$('#Tab li a').click(function() {
		// if uncamment then remove @temp 
		/*  
		$('#Tab li a').removeClass('active');
		$(this).addClass('active');
		$('#TabHolder .tabitem').css('display','none');
		$('#TabHolder .tabitem:eq('+ $('#Tab li').index($(this).parent('li')) +')').css('display','block');
		*/
		if ($(this).attr('href') == '#registaration') 
		{

			var addToUrl = '';
		        if (gup('_openstat')) {

				addToUrl = '?_openstat=' + gup('_openstat');
			}
		
			window.open("/registration" + addToUrl); //@temp
			
			/*
			$('#ajax').hide();
			document.location.href='#registaration';
			*/
		} else {
			
			// @temp temporary start
			$('#Tab li a').removeClass('active');
			$(this).addClass('active');
			$('#TabHolder .tabitem').css('display','none');
			$('#TabHolder .tabitem:eq('+ $('#Tab li').index($(this).parent('li')) +')').css('display','block');
			// @temp temporary end
			
			var page = $('div#'+$(this).attr('href')+' .content > a:first-child');
			$('.scrollBox .content a').removeClass('active');
			$(page).addClass('active');
			document.location.href='#'+page.attr('href');
			$('#ajax').load(page.attr('href'));

		}
		
		initscrollbox();		
		return false;
	});	
	
	//init scrollbox
	function initscrollbox() {
		$('.scrollBox').each(function() {
			if ( !($(this).is(':hidden')))
				{
					$(this).jScrollPane(
						{
							showArrows: true,
							animateScroll: true
						}
					);
				
					var api = $(this).data('jsp');
					
					//alert( $(this).find('.content a').length );
					//alert( $(this).find('.content a').length * 130 )
					//api.scrollTo(100,0);
					
					var throttleTimeout;
					$(window).bind(
						'resize',
						function()
						{
							if ($.browser.msie) {
								// IE fires multiple resize events while you are dragging the browser window which
								// causes it to crash if you try to update the scrollpane on every one. So we need
								// to throttle it to fire a maximum of once every 50 milliseconds...
								if (!throttleTimeout) {
									throttleTimeout = setTimeout(
										function()
										{
											api.reinitialise();
											throttleTimeout = null;
										},
										50
									);
								}
							} else {
								api.reinitialise();
							}
						}
					);	
					
				}	
		});	
	}		
	initscrollbox();
	
	// generate and input pass
	$('#makepass').click(function(){	
		$('#password, #repassword').val(mkPass(mtRand(8,10)));		
	});	
	
	function mtRand(min, max)
	{
		var range = max - min + 1;
		var n = Math.floor(Math.random() * range) + min;
		return n;
	}

	function mkPass(len)
	{
		var pass = '';
		var rnd = 0;
		var c = '';
		for (i = 0; i < len; i++) {
			rnd = mtRand(0, 2); // цифры, большие латинские, малые латинские буквы  
			if (rnd == 0) {
				c = String.fromCharCode(mtRand(48, 57));
			}
			if (rnd == 1) {
				c = String.fromCharCode(mtRand(65, 90));
			}
			if (rnd == 2) {
				c = String.fromCharCode(mtRand(97, 122));
			}
			pass += c;
		}
		return pass;
	}
	
	// undisabled 'I agree' checkbox
	$("#iagree").click(function(){	
		($(this).attr('checked')) ? $(".formButtons button").attr("disabled","") : $(".formButtons button").attr("disabled","disabled"); 		
	});	
	
	// reset default text on focus
	function defaulttext(obj){
		$(obj).focus(function () { 
			if ( $(obj).val() == $(obj).attr('alt') ) { 
				$(obj).val('');
				$(obj).addClass('active-field');
			};	
		});	
		$(obj).blur(function () {
			if ( $(obj).val() == '' ) { 
				$(obj).val( $(obj).attr('alt') );
				$(obj).removeClass('active-field');
			};	
		});
	}
	$('input[alt]').each(function(){
		defaulttext(this);
	});	
	
	// AJAX 
	$('.scrollBox .content a').click(function(){	
		$('.scrollBox .content a').removeClass('active');
		$(this).addClass('active');
		
		if ( $(this).attr('href') != '#') {
			$('#ajax').load($(this).attr('href'));	
			
			initscrollbox();		
			
			document.location.href='#' + $(this).attr('href');
		} else {
			$('#ajax').html('Ссылка несвязана нес одним документом');
		}	

		return false;
	});
	
	$("#loading").bind("ajaxSend", function(){
		$('#ajax').hide();
		//$(this).show(); 
	}).bind("ajaxComplete", function(){
		$('#ajax').show();
		//$(this).hide(); 
	});

});