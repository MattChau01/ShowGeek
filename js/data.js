/* exported data */

var data = {
  view: 'home',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousEntry = localStorage.getItem('shows-local-storage');
if (previousEntry !== null) {
  data = JSON.parse(previousEntry);
}

function stringEntry(event) {
  var inputJSON = JSON.stringify(data);
  localStorage.setItem('shows-local-storage', inputJSON);
}

window.addEventListener('beforeunload', stringEntry);
