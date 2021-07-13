/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('unload', beforeUnload);
function beforeUnload(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data', dataJSON);
}

var previousDataJSON = localStorage.getItem('data');
if (previousDataJSON !== null) {
  data = (JSON.parse(previousDataJSON));
}
