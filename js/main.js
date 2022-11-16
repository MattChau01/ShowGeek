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
    // searchResult(xhr.response.name);
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
// TEST RUN

function searchResult(name) {
  // parent div 1
  var divOne = document.createElement('div');
  divOne.setAttribute('class', 'column-full');

  var divOneA = document.createElement('div');
  divOneA.setAttribute('class', 'row-center');

  var titleResult = document.createElement('p');
  titleResult.setAttribute('class', 'font-bold');
  titleResult.classList.add('title-result');
  // Sample entry
  var titleName = document.createTextNode('The Haunting Hill House');
  titleResult.appendChild(titleName);
  divOneA.appendChild(titleResult);
  divOne.appendChild(divOneA);

  var divOneB = document.createElement('div');
  divOneB.setAttribute('class', 'row-center');
  divOneB.classList.add('img-result');

  var imgResult = document.createElement('img');
  imgResult.setAttribute('src', 'https://static.tvmaze.com/uploads/images/medium_portrait/168/420526.jpg');
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
  var summary = document.createTextNode('The haunting of hill house is a modern reimagining of Shirley Jackson\'s classic 1959 novel. Flashing between past and present, a fractured family confronts haunting memories of their old home and the terrifying events that drove them from it.');
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

searchResult(name);

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
