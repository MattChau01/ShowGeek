// SUBMIT

// submission for search results

var $searchRequest = document.querySelector('.search-bar');
var $formSubmit = document.getElementById('formOne');
$formSubmit.addEventListener('submit', function (event) {
  event.preventDefault();
  getShowResult($searchRequest.value);
  viewSwap('result');
  $formSubmit.reset();
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

// EXTRACT TEXT
function textOnly(text) {
  var summary = document.createElement('p');
  summary.innerHTML = text;
  return summary.textContent;
}

// TRUNCATE
function truncate(length, string) {
  var cut = string.slice(0, length) + '...';
  return cut;
}

// API above

// DOM CREATION FOR SEARCH RESULT:

function searchResult(show) {

  // parent div 1
  var divOne = document.createElement('div');
  divOne.classList.add('column-full');
  divOne.setAttribute('id', 'parOne');

  var divOneA = document.createElement('div');
  divOneA.setAttribute('class', 'row-center');

  var titleResult = document.createElement('p');
  titleResult.classList.add('font-bold');
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
  imgResult.setAttribute('src', show.image.original);
  divOneB.appendChild(imgResult);
  divOne.appendChild(divOneB);

  // parent div 2
  var divTwo = document.createElement('div');
  divTwo.classList.add('column-full');
  divTwo.setAttribute('id', 'parTwo');

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
  addButton.setAttribute('data-view', 'add-list');
  addButton.classList.add('font-bold');
  addButton.classList.add('add-list');
  var $add = document.createTextNode('Add to list');
  addButton.appendChild($add);
  addButton.addEventListener('click', function () {
    // console.log(event.target);
    viewSwap('add-list');
    // $view[2].classList.remove('hidden');
  });

  divTwoB.appendChild(addButton);
  divTwo.appendChild(divTwoB);

  var parent = document.querySelector('.row-result');
  parent.appendChild(divOne);
  parent.appendChild(divTwo);

}

// ICONS

var $view = document.querySelectorAll('.view');
var $home = document.querySelector('.home');
var $list = document.querySelector('.list');
var $back = document.querySelector('.backpage');
var parentElement = document.getElementById('show-result');

$home.addEventListener('click', function (event) {
  viewSwap('home');
  parentElement.textContent = '';
});

$back.addEventListener('click', function (event) {
  viewSwap('home');
  parentElement.textContent = '';
});

$list.addEventListener('click', function (event) {
  viewSwap('list');
  parentElement.textContent = '';
});

// VIEW SWAP

function viewSwap(dataView) {
  data.view = dataView;

  if (dataView === 'home') {
    $view[0].classList.remove('hidden');
    $view[1].classList.add('hidden');
    $view[3].classList.add('hidden');
  } else if (dataView === 'add-list') {
    $view[2].classList.remove('hidden');
  } else if (dataView === 'list') {
    $view[0].classList.add('hidden');
    $view[1].classList.add('hidden');
    $view[3].classList.remove('hidden');
  } else if ((dataView === 'result') || (dataView !== 'home')) {
    $view[0].classList.add('hidden');
    $view[1].classList.remove('hidden');
    $view[2].classList.add('hidden');
    $view[3].classList.add('hidden');
  }
}

// MODAL

var $cancel = document.querySelector('.cancel');
$cancel.addEventListener('click', function () {
  event.preventDefault();
  viewSwap('result');
});

// SUBMIT

// submission for show review

var confirmButton = document.querySelector('.confirm');
confirmButton.addEventListener('click', function () {
  // console.log('confirm button clicked!');
});

var $rating = document.getElementById('stars');
var $comment = document.querySelector('.comment');

var $confirmReview = document.getElementById('formTwo');
$confirmReview.addEventListener('submit', function (event) {
  event.preventDefault();
  confirmReview();
  // console.log('submitted');
});

function confirmReview(event) {
  if (data.editing === null) {
    var numberStars = $rating.value;
    var showReview = $comment.value;
    var $showTitle = document.querySelector('.title-result');
    var showName = $showTitle.textContent;

    var object = {
      name: showName,
      stars: numberStars,
      comment: showReview
    };

    object.entryId = data.nextEntryId;
    data.nextEntryId++;
  }
  // console.log(object);
}

// DOM CREATION FOR ADD TO LIST:
