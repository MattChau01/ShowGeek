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
    data.searchResults = xhr.response;
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

// VIEW SWAP

function viewSwap(dataView) {
  data.view = dataView;

  if (dataView === 'home') {
    $view[0].classList.remove('hidden');
    $view[1].classList.add('hidden');
    $view[2].classList.add('hidden');
    $view[3].classList.add('hidden');
    $view[4].classList.add('hidden');
  } else if (dataView === 'add-list') {
    // $view[1].classList.add('hidden');
    $view[2].classList.remove('hidden');
    $view[3].classList.add('hidden');
  } else if (dataView === 'list') {
    $view[0].classList.add('hidden');
    $view[2].classList.add('hidden');
    $view[1].classList.add('hidden');
    $view[3].classList.remove('hidden');
    $view[4].classList.add('hidden');
  } else if (dataView === 'delete') {
    $view[4].classList.remove('hidden');
  } else if ((dataView === 'result') || (dataView !== 'home')) {
    $view[0].classList.add('hidden');
    $view[1].classList.remove('hidden');
    $view[2].classList.add('hidden');
    $view[3].classList.add('hidden');
  }
}

// DOM CREATION FOR SEARCH RESULT:

function searchResult(show) {

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
  imgResult.id = 'imgSource';
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
    viewSwap('add-list');
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
  window.location.reload();
});

$back.addEventListener('click', function (event) {
  viewSwap('home');
  parentElement.textContent = '';
});

$list.addEventListener('click', function (event) {
  viewSwap('list');
  parentElement.textContent = '';
  // renderList();
  window.location.reload();
});

// MODAL

var $cancel = document.querySelector('.cancel');
$cancel.addEventListener('click', function () {
  event.preventDefault();
  viewSwap(data.prevView);
});

var $cancel2 = document.querySelector('.cancel-list');
$cancel2.addEventListener('click', function (event) {
  $view[4].classList.add('hidden');
  viewSwap(data.prevView);
});

// SUBMIT

var confirmButton = document.querySelector('.confirm');
confirmButton.addEventListener('click', function () {
  // console.log('clicked');
});

var $rating = document.getElementById('stars');
var $comment = document.querySelector('.comment');

var $confirmReview = document.getElementById('formTwo');
$confirmReview.addEventListener('submit', function (event) {
  event.preventDefault();
  confirmReview();
  renderList();
  $confirmReview.reset();
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
      comment: showReview,
      link: data.searchResults.image.original
    };

    object.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(object);
    viewSwap('list');

    // editing data
  } else if (data.editing !== null) {
    // console.log('data being edited');
    for (var t = 0; t < data.entries.length; t++) {
      if (data.editing.entryId === data.entries[t].entryId) {
        data.entries[t].stars = $rating.value;
        data.entries[t].comment = $comment.value;
      }
    }
    viewSwap('list');
    data.editing = null;
  }
}

// DOM CREATION FOR ADD TO LIST:

function addToList(entry) {

  // parent div (WILL APPEND TO ROW-LIST)
  var divPrime = document.createElement('div');
  divPrime.classList.add('list-layout');
  divPrime.setAttribute('id', entry.entryId);

  // background
  var divBack = document.createElement('div');
  divBack.classList.add('background-box');
  divPrime.appendChild(divBack);

  // sub parents
  // // A
  var div1 = document.createElement('div');
  div1.classList.add('row');
  divBack.appendChild(div1);

  var div1a = document.createElement('div');
  div1a.classList.add('column-third');
  div1a.classList.add('center');
  div1.appendChild(div1a);

  var showImg = document.createElement('img');
  showImg.setAttribute('src', entry.link);
  showImg.classList.add('entry-img');
  div1a.appendChild(showImg);

  var div1b = document.createElement('div');
  div1b.classList.add('column-two-third');
  div1.appendChild(div1b);

  var div1bA = document.createElement('div');
  div1bA.classList.add('row');
  div1bA.classList.add('center');
  div1b.appendChild(div1bA);

  var showName = document.createElement('p');
  showName.classList.add('font-semibold-b');
  var nameOfShow = document.createTextNode(entry.name);
  showName.appendChild(nameOfShow);
  div1bA.appendChild(showName);

  var div1bB = document.createElement('div');
  div1bB.classList.add('row');
  div1bB.classList.add('center');
  div1b.appendChild(div1bB);

  var comment = document.createElement('p');
  comment.classList.add('font-light-b');
  var commentText = document.createTextNode(entry.comment);
  comment.appendChild(commentText);
  div1bB.appendChild(comment);

  // // B
  var div2 = document.createElement('div');
  div2.classList.add('row');
  divBack.appendChild(div2);

  var div2a = document.createElement('div');
  div2a.classList.add('column-third');
  div2a.classList.add('stars');
  /// /// STAR GENERATOR:

  var numberStars = parseInt(entry.stars);
  if (entry.stars === '0') {
    // console.log('test');
    var empty = document.createTextNode(' ');
    div2a.appendChild(empty);
    div2.appendChild(div2a);
  } else if (entry.stars <= 5) {
    for (var i = 0; i < numberStars; i++) {
      var stars = document.createElement('i');
      stars.className = 'fa-solid fa-star star-space';
      div2a.appendChild(stars);
      div2.appendChild(div2a);
    }
  }
  /// STAR GENERATOR ABOVE

  var div2b = document.createElement('div');
  div2b.classList.add('column-two-third');
  div2b.classList.add('row-center');
  div2.appendChild(div2b);

  var editIcon = document.createElement('i');
  editIcon.className = ('fa-solid fa-pencil edit');
  editIcon.setAttribute('data-view', 'add-list');
  div2b.appendChild(editIcon);

  // EDIT BUTTON BELOW

  editIcon.addEventListener('click', function (event) {
    // console.log(event.target);
    viewSwap('add-list');

    var entryNumber = event.target.closest('.list-layout').getAttribute('id');
    var parsedNumber = parseInt(entryNumber);

    var prevStars = document.getElementById('stars');
    var prevComment = document.querySelector('.comment');

    for (var p = 0; p < data.entries.length; p++) {
      if (parsedNumber === data.entries[p].entryId) {
        data.editing = data.entries[p];

        // Preload previous data
        prevStars.value = data.editing.stars;
        prevComment.value = data.editing.comment;
      }
    }
  });

  // EDIT BUTTON ABOVE

  var deleteIcon = document.createElement('i');
  deleteIcon.classList.add('fa-solid');
  deleteIcon.classList.add('fa-trash');
  deleteIcon.classList.add('delete');
  div2b.appendChild(deleteIcon);

  // DELETE BUTTON BELOW

  deleteIcon.addEventListener('click', function (event) {
    // console.log(event.target.closest('.list-layout').getAttribute('id'));
    viewSwap('delete');

    var delId = event.target.closest('.list-layout').getAttribute('id');
    var parsedDelId = parseInt(delId);
    for (var h = 0; h < data.entries.length; h++) {
      if (parsedDelId === data.entries[h].entryId) {
        data.editing = data.entries[h];
      }
    }
  });

  // DELETE BUTTON ABOVE

  return divPrime;
}

function renderList() {

  var $showList = document.querySelector('.row-list');
  if ($showList.hasChildNodes()) {
    while ($showList.firstChild) {
      $showList.removeChild($showList.firstChild);
    }
  }
  for (var j = 0; j < data.entries.length; j++) {
    var addEntry = addToList(data.entries[j]);
    $showList.appendChild(addEntry);
  }
}

// Makes sure user can stay on same page when refreshed

document.addEventListener('DOMContentLoaded', function () {
  renderList();
  data.prevView = data.view;
  var dataView = data.view;
  if (dataView !== 'result') {
    viewSwap(dataView);
  }
});

// Delete DOM

var $confirmDeletion = document.querySelector('.confirm-list');
$confirmDeletion.addEventListener('click', deleteConfirmed);

function deleteConfirmed(event) {
  var $deleteDOM = document.querySelectorAll('.list-layout');

  for (var j = 0; j < data.entries.length; j++) {
    if (data.editing.entryId === data.entries[j].entryId) {
      data.entries.splice(j, 1);
      $deleteDOM[j].remove();
    }
  }

  viewSwap(data.prevView);
  $view[4].classList.add('hidden');
}
