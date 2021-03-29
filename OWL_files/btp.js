//U.S. Olympic and Paralympic Foundation

!function(e,i){if(!e.pixie){var n=e.pixie=function(e,i,a){n.actionQueue.push({action:e,actionValue:i,params:a})};n.actionQueue=[];var a=i.createElement("script");a.async=!0,a.src="//acdn.adnxs.com/dmp/up/pixie.js";var t=i.getElementsByTagName("head")[0];t.insertBefore(a,t.firstChild)}}(window,document);
pixie('init', '38123165-769f-418b-8353-57dbd8d28487');
pixie('event', 'PageView');

function createCybbaPixel(src){
  var input = document.createElement('img');
  input.setAttribute('src',src);
  input.setAttribute('width', 1);
  input.setAttribute('height', 1);
  input.setAttribute('alt', "");
  input.setAttribute('style', "display:none !important;");
  document.body.appendChild(input); 
}

var cybConvInt = setInterval(cybConvChk,1000);

function cybConvChk(){
	if(window.location.href.includes("donation/thank-you") && document.querySelector("dd[data-ng-bind*='transaction.id']")){
		window.cybOrderData = {
			order_id: document.querySelector("dd[data-ng-bind*='transaction.id']").textContent,
			value: document.querySelector("dd[data-ng-bind*='transaction.charged_total_gross_amount | scFormatCurrency:transaction.charged_currency_code:2']").textContent.match(/[0-9,.]+/)[0].replace(",","")
		};
		createCybbaPixel("//secure.adnxs.com/px?id=1303992&order_id="+cybOrderData.order_id+"&value="+cybOrderData.value+"&other=[USD]&t=2");
		pixie('event', 'Purchase'); 
		window._vteq = window._vteq || [];
		window._vteq.push({
				confirmation: {
					items: [],
					orderId: cybOrderData.order_id,
					total: cybOrderData.value
				}
		});
		clearInterval(cybConvInt);
	}
}

try{ var shopUrlCYB = 'support.teamusa.org'
  !function(){var t=function(t){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src=t;var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)},e=Math.floor(5e4*Math.random());t("//d2rp1k1dldbai6.cloudfront.net/cybba_latest.min.js"),t("https://files1.cybba.solutions/"+shopUrlCYB+"/loader.min.js?v="+e),window._vteq=window._vteq||[],setTimeout(function(){window._vtsdk||t("https://storage.googleapis.com/cybcdn/"+shopUrlCYB+"/loader.js?v="+e)},1100),setTimeout(function(){"nestedVarDefined"in window&&!nestedVarDefined("_vtsdk.state.eventQueue")&&"_vtsdk"in window&&_vtsdk.init()},3e3)}();
}catch(e){}