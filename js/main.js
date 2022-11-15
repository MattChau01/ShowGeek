var $searchRequest = document.querySelector('.search-bar');
var $formSubmit = document.getElementById('form');
$formSubmit.addEventListener('submit', function (event) {
  event.preventDefault();
  var search = $searchRequest.value;
  var object = { search };
  getShowResult(object.search);
});

function getShowResult(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.tvmaze.com/singlesearch/shows?q==' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // if (xhr.status === 404) {

    // }
  });
  xhr.send();
}

// API above

var $backPage = document.querySelector('.backpage');
$backPage.addEventListener('click', function () {
});

// DOM Creation:
// var $showResult = document.getElementById('show-result');

// var $title = document.createElement('p');

// NO CODE BELOW
// TESTING ZONE FOR API
function test(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.tvmaze.com/singlesearch/shows?q==' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // if (xhr.status === 404) {

    // }
    // console.log(xhr.status);
    // console.log(xhr.response);
    // console.log(xhr.response.image.original);
  });
  xhr.send();
}

test('the haunting of hill house');
