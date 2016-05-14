var btn = document.querySelector( '.btn' );

var btnFront = btn.querySelector( '.btn-front' ),
    btnYes = btn.querySelector( '.btn-back .yes' ),
    btnNo = btn.querySelector( '.btn-back .no' );

btnFront.addEventListener( 'click', function( event ) {
  var mx = event.clientX - btn.offsetLeft,
      my = event.clientY - btn.offsetTop;

  var w = btn.offsetWidth,
      h = btn.offsetHeight;
    
  var directions = [
    { id: 'top', x: w/2, y: 0 },
    { id: 'right', x: w, y: h/2 },
    { id: 'bottom', x: w/2, y: h },
    { id: 'left', x: 0, y: h/2 }
  ];
  
  directions.sort( function( a, b ) {
    return distance( mx, my, a.x, a.y ) - distance( mx, my, b.x, b.y );
  } );
  
  btn.setAttribute( 'data-direction', directions.shift().id );
  btn.classList.add( 'is-open' );

} );

btnYes.addEventListener( 'click', function( event ) {   
  btn.classList.remove( 'is-open' );
} );

btnNo.addEventListener( 'click', function( event ) {
  btn.classList.remove( 'is-open' );
} );

function distance( x1, y1, x2, y2 ) {
  var dx = x1-x2;
  var dy = y1-y2;
  return Math.sqrt( dx*dx + dy*dy );
}

(function() {
	var filename='http://tympanus.net/codrops/adpacks/demoadpacks.css?' + new Date().getTime();		
	var fileref=document.createElement("link");
	fileref.setAttribute("rel", "stylesheet");
	fileref.setAttribute("type", "text/css");
	fileref.setAttribute("href", filename);
	document.getElementsByTagName("head")[0].appendChild(fileref);

	var demoad = document.createElement('div');
	demoad.id = 'cdawrap';
	demoad.innerHTML = '<span id="cda-remove" class="cda-remove" data-content="Continue to demo" aria-label="Close ad"></span>';
	document.getElementsByTagName('body')[0].appendChild(demoad);

	document.getElementById('cda-remove').addEventListener('click',function(e){
		demoad.style.display = 'none';
		e.preventDefault();
	});

	var bsa = document.createElement('script');
	bsa.type = 'text/javascript';
	bsa.async = true;
	bsa.id = '_carbonads_js';
	bsa.src = '//cdn.carbonads.com/carbon.js?zoneid=1673&serve=C6AILKT&placement=codrops';
	demoad.appendChild(bsa);

	var adChecked = false;
	var attempts = 5;
	var cntAttempts = 0;
	var adInterval;

	function checkAd() {
		if (adChecked || cntAttempts >= attempts) {
			clearInterval(adInterval);
			return;
		}

		cntAttempts++;

		var carbonImg = document.querySelector('.carbon-img');

		if (!carbonImg) return;

		var adImgHeight = carbonImg.offsetHeight;

		if (adImgHeight >= 30) {
			_gaq.push(['_trackEvent', 'Codrops Demo Ad', 'Carbon Ad VISIBLE','Carbon Ad']);
			
			adChecked = true;
		} 
	}

	if(window._gaq) {
		_gaq.push(['_trackEvent', 'Codrops Demo Ad', 'Carbon ad included', '1']);

		adInterval = setInterval(checkAd, 3000);
	}
})();