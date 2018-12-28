var template = $("#template").html();
var title = new RegExp('{{title}}','g');
var collections = $('[data-collection]')
var mainRow = $('#main-row');

$('.back-to-top').click(function(){
	$('html, body').animate({scrollTop:0}, 1000);
});
// window.onload = displayCollections;
window.onload = function(){
	collections.parent().removeClass('active');
	$.ajax({
		url: 'https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json',
		method: 'get',
		dataType: 'json'
	})
	.done(function(res){
		displayCollections(res)
		collections.on('click',function(){
			displayCollections.call(this,res)
		});
	})
};

function displayCollections(res){ // сада уместо аргумента е стављамо аргумент res
	mainRow.html("");
	event.preventDefault(); //и овде исптрављамо и уместо е пишемо event
	var col = $(this).data('collection');
	console.log(col);


		if(col === 'male'|| col === 'female'){
			var colFilter = res.filter(function(el){
			return el.colection === col
		});
		displayProduct(colFilter)
		}else if(col === 'newCol' || col === 'popular' || col === 'action'){
			collections.parent().removeClass('active');
			$(this).parent().addClass('active');
			var colFilter = res.filter(function(el){
				return el[col];
			})
			displayProduct(colFilter) //сада овај Product не зна који је ово colFilter. Ми у нашој done функцији знамо шта је
		}else{						  				//colFilter али ова наша ново формирана функција displayProduct не зна шта је colFilter
			displayProduct(res)		  	// и ми јој зато шаљемо тај филтер.
		}

}
function displayProduct(filter){
	var text = "";
	filter.forEach(function(e){
		text  = template.replace("{{imgSrc}}",e.imgSrc)
						.replace(title,e.productTitle)
						.replace("{{model}}",e.model)
						.replace("{{price}}",e.price);
	mainRow.append(text)
   })
}

