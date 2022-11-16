var $searchRequest = document.querySelector('.search-bar');
var $formSubmit = document.getElementById('form');
$formSubmit.addEventListener('submit', function (event) {
  event.preventDefault();
  var search = $searchRequest.value;
  var object = { search };
  viewSwap('result');
  getShowResult(object.search);
});

function getShowResult(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.tvmaze.com/singlesearch/shows?q==' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // searchResult(xhr.response.name);
    // if (xhr.status === 404) {

    // }
    // console.log(xhr.response);
    searchResult(xhr.response);
  });
  xhr.send();
}

// API above

var $backPage = document.querySelector('.backpage');
$backPage.addEventListener('click', function () {
});

// DOM Creation:
// TEST RUN

function searchResult(show) {

  // parent div 1
  var divOne = document.createElement('div');
  divOne.setAttribute('class', 'column-full');

  var divOneA = document.createElement('div');
  divOneA.setAttribute('class', 'row-center');

  var titleResult = document.createElement('p');
  titleResult.setAttribute('class', 'font-bold');
  titleResult.classList.add('title-result');
  // Sample entry
  var titleName = document.createTextNode(show.name);
  titleResult.appendChild(titleName);
  divOneA.appendChild(titleResult);
  divOne.appendChild(divOneA);

  var divOneB = document.createElement('div');
  divOneB.setAttribute('class', 'row-center');
  divOneB.classList.add('img-result');

  var imgResult = document.createElement('img');
  imgResult.setAttribute('src', show.image.medium);
  divOneB.appendChild(imgResult);
  divOne.appendChild(divOneB);

  // parent div 2
  var divTwo = document.createElement('div');
  divTwo.setAttribute('class', 'column-full');

  var divTwoA = document.createElement('div');
  divTwoA.setAttribute('class', 'row-center');

  var summaryResult = document.createElement('p');
  summaryResult.setAttribute('class', 'font-light');
  summaryResult.classList.add('summary');
  // Sample entry
  var summary = document.createTextNode(show.summary);
  // console.log(show.summary);
  summaryResult.appendChild(summary);
  divTwoA.appendChild(summaryResult);
  divTwo.appendChild(divTwoA);

  var divTwoB = document.createElement('div');
  divTwoB.setAttribute('class', 'row-center');
  divTwoB.classList.add('img-result');

  var addButton = document.createElement('button');
  addButton.setAttribute('class', 'font-bold');
  addButton.classList.add('add-list');
  var $add = document.createTextNode('Add to list');
  addButton.appendChild($add);
  addButton.addEventListener('click', function () {
    // console.log('click');
  });

  divTwoB.appendChild(addButton);
  divTwo.appendChild(divTwoB);

  var parent = document.querySelector('.row-result');
  parent.appendChild(divOne);
  parent.appendChild(divTwo);

}

// view swap

var $view = document.querySelectorAll('.view');

var $home = document.querySelector('.home');
// var $list = document.querySelector('.list');
var $back = document.querySelector('.backpage');
var $search = document.querySelector('.search-button');

$home.addEventListener('click', viewSwap);
$back.addEventListener('click', viewSwap);
$search.addEventListener('click', function () {
  // console.log(event.target.getAttribute('data-view'));
  // console.log(typeof event.target.getAttribute('data-view'));
});

function viewSwap(dataView) {
  data.view = dataView;

  if (event.target.getAttribute('data-view') === 'home') {
    $view[0].classList.remove('hidden');
    $view[1].classList.add('hidden');
  } else if (event.target.getAttribute('data-view') === 'result') {
    $view[0].classList.add('hidden');
    $view[1].classList.remove('hidden');
  }
}
