var pokemonRepository = (function () {
 var repository = [];

 var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

//to push values
 function add(item) {
   repository.push(item);
 }

// to return array values
 function getAll() {
   return repository;
 }


 function addListItem(pokemon) {
   var pokemonList = $('.pokemon-list');
   var listItem = $('<li class="pokemon-list-item"></li>');
   pokemonList.append($listItem);
   var button = ('<button type="button" data-toggle="modal" data-target="#pokemonModal"</button>');
   button.text(pokemon.name);
   listItem.append($button);
   button.on('click', function () {
   showDetails(pokemon);
   });
 }

 function showDetails(pokemon) {
   pokemonRepository.loadDetails(pokemon).then(function () {
     showModal(pokemon);
   });
 }

 function loadList() {

   return.ajax(apiUrl, { dataType: 'json' })
   .then(function(item) {
     .each(item.results, function(index, item) {
       var pokemon = {
         name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
         detailsUrl: item.url
       };
       add(pokemon);
     });
   }).catch(function(error) {
     console.write(error);
   });
 }

 function loadDetails(item) {
   var url = item.detailsUrl;
   return .ajax(url)
   .then(function(details) {

     item.imageUrl = details.sprites.front_default;
     item.height = details.height;
     item.weight = details.weight;

     if (details.types.length == 2 ) {
			item.types = [details.types[0].type.name, details.types[1].type.name];
		} else {
			item.types = [details.types[0].type.name];
		}
  }).catch(function(error) {
     console.error(error);
   });
 }

 function showModal(item) {
   ('#modal-body').html('');

   var nameElement = ('h5');
   nameElement.html(item.name.charAt(0).toUpperCase() + item.name.slice(1));

   var imageElement = ('<img src="' + item.imageUrl + '">');
   ('div.pokemon-img').html(imageElement);

   ('div.pokemon-height').html('Height: ' + item.height + 'm');

   ('div.pokemon-weight').html('Weight: ' + item.weight + 'm');

   ('div.pokemon-types').html('Type(s): ' + item.types);
 }

 (document).ready(function(){
     ('#pokemon-search').on('keyup', function(){
       var value = (this).val().toLowerCase();
       ('.pokemon-list_item').filter(function(){
         (this).toggle((this).text().toLowerCase().indexOf(value) > -1)
       });
     });
   });

 return {
   add: add,
   getAll: getAll,
   addListItem: addListItem,
   search: search,
   showDetails: showDetails,
   loadList: loadList,
   loadDetails: loadDetails,
   showModal: showModal,
 };
})();

pokemonRepository.loadList().then(function() {
pokemonRepository.catchAll().forEach(function(pokeList) {
pokemonRepository.addListItem(pokeList);
  });
});
