var test;
$(document).ready(function(){
	/*******************************/
	/* Event Handlers
	/*******************************/

	$('.top-buttons').on('click','button',function(){
		var clicked = $(this).html();
		outWithTheOld( clicked );
		getSomeGiphs( clicked );
	});

	$('#add-form').on('submit', function(event){
		event.preventDefault();

		var t = $(this).find('input');
		var u = t.val();
		addButton( u );
		outWithTheOld( u );
		getSomeGiphs( u );
		
		t.val('');

	});

	$('.result-content').on('click', 'img', function(){
		console.log('tried');
		toggleShimmy( $(this) );
	});

	/*******************************/
	/* Functions
	/*******************************/

	/* newzies */
	// function to show initial set of buttons on the screen
	function newzies(){
		var dfltGiphs = ['Mean Girls', 'Hair Flip', 'Basic', 'PSL', 'Katy Perry', 'Cant Even', 'I Dont Get It', 'Ryan Gosling Hey Girl', 'Carrie Bradshaw', 'Sunless Tanner', 'Real Housewives', 'Uggs'];
		dfltGiphs.forEach(function(item){
			addButton(item);
		});
	}
	newzies();

	/* outWithTheOld */
	// function to clear old giphs and reset the title
	// param: new title or search term
	function outWithTheOld( inWithNew ){
		$('.result-content').empty().append('<h2>'+ inWithNew + '</h2>'); 
	}

	/* getSomeGiphs */
	// function to get an object of giphs from giphy api
	// param: text to be searched in giphy api... don't pass special characters 
	function getSomeGiphs( searchWord ){
		var krKey = '4wWV4TLvFLl2A737YNO3ZM2DNpMq66iw';
		var gphyURL = 'https://api.giphy.com/v1/gifs/search';

		searchWord = searchWord.toLowerCase().replace(/ /gi,'+');

		var whatWeGot = $.ajax({
			url: gphyURL,
			data: {q: searchWord, api_key: krKey, limit: 6, rating: 'g'},
			method: 'GET',
			success: function(response){
				var r = response.data;
				r.forEach( function(item){
					var c = '';
					c += '<div class="giph-holder">';
					c += '<img src="' + item.images.fixed_width_still.url + '">';
					c += '<a href="'+ item.url +'" target="_blank"><h4>' + item.title + '</h4></a>';
					c += '</div>';
					$('.result-content').append(c);
				} );
			},
			timeout: 30000
		});
	}

	/* addButton */
	// function to create a new button and add it to the UI
	// param: string representing what the button should represent
	function addButton( thing ){
		var b = '<button class="kr-btn">' + thing + '</button>';
		$('.top-buttons').append( b );
	}

	/* toggleShimmy */
	// function to toggle between a moving and non-moving giph
	// this assumes a 200w fixed width /downsampled giph is showing on the screen
	// param: image object which will toggle movement 
	function toggleShimmy( thing ){
		var t = thing.attr('src');
		if( t.indexOf('200w_d.gif') > 0 ){
			thing.attr('src', t.replace('200w_d.gif','200w_s.gif')).toggleClass('dancing');
		}else{
			thing.attr('src', t.replace('200w_s.gif','200w_d.gif')).toggleClass('dancing');
		}
	}

});