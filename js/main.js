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
    // console.log(xhr.status);
    // console.log(xhr.response);
  });
  xhr.send();
}

// TEST API

// function oneResult(name) {
//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', 'https://api.tvmaze.com/singlesearch/shows?q==' + name);
//   xhr.responseType = 'json';
//   xhr.addEventListener('load', function () {
//     console.log(xhr.status);
//     console.log(xhr.response);
//     console.log(xhr.response.name);
//     console.log(xhr.response.summary);
//   });
//   xhr.send();
// }

// oneResult('the haunting of hill house');
