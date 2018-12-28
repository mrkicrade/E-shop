/*
var template = $("#template").html();
var title = new RegExp('{{title}}','g');
var collections = $('[data-collection]'); // селектуј све што има неки атрибут data-collection
var mainRow = $('#main-row');
collections.on('click',displayCollections);

display ();

function display (){
	$.ajax({
	url: 'https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json',
	method: 'get',
	dataType: 'json'
})
.done(function(res) {
	console.log(res);
	var text = "";
	res.forEach(function(e){
		text  = template.replace("{{imgSrc}}",e.imgSrc)
						.replace(title,e.productTitle)
						.replace("{{model}}",e.model)
						.replace("{{price}}",e.price);
		mainRow.append(text)
	})
})
}
$('.back-to-top').click(function(){
	$('html, body').animate({scrollTop:0}, 1000);
});

function displayCollections(e){
	mainRow.html("");
	e.preventDefault(); //да се спречи да се кликом на избор колекције иде на почетак стране
	var col = $(this).data('collection'); //дај ми шта је у атрибуту data (мишка или женска колекција).
	$.ajax({
	url: 'https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json',
	method: 'get',
	dataType: 'json'
})
.done(function(res) {
	if(col === 'male' || col === 'female'){
		var colFilter = res.filter(function(el){ //добијамо array који је филтриран у односу на категорију коју смо кликнули
			return el.colection === col; // врати елемент где му је колекција једнака овоме на пта смо ми кликнули
																	// када имамо и newCol, popular, action ово онда није тачно зато што тражимо е од елемента collection
		})
		var text = "";
		colFilter.forEach(function(e){ // уместо што до сада узимали све производе из базе, сада узимамо само оно што је филтрирано
			text  = template.replace("{{imgSrc}}",e.imgSrc)
							.replace(title,e.productTitle)
							.replace("{{model}}",e.model)
							.replace("{{price}}",e.price);
			mainRow.append(text)
		})
	}else if(col === 'newCol' || col === 'popular' || col === 'action'){
		var colFilter = res.filter(function(el){
			return el[col]; //ово је зато што знамо сада да су newCol, popular и action булиан вредности, тако да ако узмемо варијаблу col
											// и ако она на пример има вредност popular овде ће писати popular, што значи дај ми из елемента шта је
											// popular и он ће рећи рецимо true. Ако врати true овај елемент који је тренутно у овом лупу биће саставни део
											// овог филтера.
		})
		var text = "";
		colFilter.forEach(function(e){ // уместо што до сада узимали све производе из базе, сада узимамо само оно што је филтрирано
			text  = template.replace("{{imgSrc}}",e.imgSrc)
							.replace(title,e.productTitle)
							.replace("{{model}}",e.model)
							.replace("{{price}}",e.price);
			mainRow.append(text)
	   })
	 }
  })
}
*/
var template = $("#template").html();
var title = new RegExp('{{title}}','g');
var collections = $('[data-collection]')
var mainRow = $('#main-row');
// collections.on('click',displayCollections); ово ћемо сада да катујемо

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
/*
Видимо овде да функција display ради исту ствар као и функција displayCollections. Зато можемо и да кажемо да када се
учита наш програм зашто се одмах не би позвала функција displayCollections. Али ми у том случају немамо довољно
аргумената. DisplayCollections функција служи нама да бисмо могли да бирамо колекције тј. да ако кликнемо на женску колекцију да
добијемо женску колекцију или ако кликнемо ма мишку да добијемо мушку колекцију итд....Наиме, ми имамо наш if којипита да ли је ова
наша варијабла col male, female, newCol, popular или action. Зато ми на крају нашег else if стејтмента опетдодајемо else јер се
питамо шта ако није ни једно од тих услова? Зато ћемо да позовемо нашу displayProduct функцију и уместо филтера послаћемо јој наш
респонзив res.
*/
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
/*
Имамо сада још један проблем који требамо да решимо. У варијабли collections имамо да када год кликнемо на
male, female, newCol, popular или action ми покрећемо функцију displayCollections. То је све у реду али онда
та функција сваки пут када ми кликнемо она одлази у сервер и прикупља податке са сервера. Циљ је да када се
учита наш window да се само једном оде на сервер и прикупе се подаци, а затим да се позивају све ове наше
радње. Зато ћемо да ставимо да када се учита наш window покрене се нека анонимна функција уместо displayCollections.
Зато смо сада катовали наш ajax и убацили га у нову анонимну функцију. И сада додајемо нашу done функцију, узмемо наш
резултат и позовемо нашу displayCollections функцију.
*/
/* Решавање проблема који сада настаје са colFilter-ом.
Сада имамо ситуацију да наш colFilter не зна шта је res. То је зато што сада када смо кликнули на ове неше collections
позвали смо displayCollections функцију, међутим, та функција не зна сада шта је res. Зато ћемо сада да катујемо наше
colletions и да кажемо да се то дешава само када прикупимо све податке са сервера.
*/
/* Решавање проблема који настаје у вези синтаксе this
Сада се у конзоли јавља да је this у ствари window а не дугме које смо притисли. То и јесте логично јер како сада стоје
ствари ми смо наместили да када стигну подаци желимо да на клик позовемо неку функцију, а унутар те функције this није
дугме које кликћемо већ је this window. То се исправља тако што стављамо унутар те функције синтаксу call(this,res).
Тиме смо рекли да је у функцији коју позивамо нека this буде оно на шта смо кликнули.
*/
