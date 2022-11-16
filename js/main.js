var $searchRequest = document.querySelector('.search-bar');
var $formSubmit = document.getElementById('form');
$formSubmit.addEventListener('submit', function (event) {
  event.preventDefault();
  var search = $searchRequest.value;
  var object = { search };
  getShowResult(object.search);
  viewSwap('results');
});

function getShowResult(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.tvmaze.com/singlesearch/shows?q=' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    searchResult(xhr.response);
  });
  xhr.send();
}

// extract text
function textOnly(text) {
  var summary = document.createElement('p');
  summary.innerHTML = text;
  return summary.textContent;
}

// truncate length
function truncate(length, string) {
  var cut = string.slice(0, length) + '...';
  return cut;
}

// API above

var $backPage = document.querySelector('.backpage');
$backPage.addEventListener('click', function () {
  $formSubmit.reset();
});

// DOM Creation:

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

  var summary = document.createTextNode(truncate(325, textOnly(show.summary)));
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

$home.addEventListener('click', function (event) {
  viewSwap('home');
});
$back.addEventListener('click', function (event) {
  viewSwap('home');
});

function viewSwap(dataView) {
  dataView = event.target.getAttribute('data-view');

  if (event.target.getAttribute('data-view') === 'home') {
    $view[0].classList.remove('hidden');
    $view[1].classList.add('hidden');
  } else if ((event.target.getAttribute('data-view') === 'result') || (event.target.getAttribute('data-view') !== 'home')) {
    $view[0].classList.add('hidden');
    $view[1].classList.remove('hidden');
  }
}
