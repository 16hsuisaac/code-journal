/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var form = document.querySelector('.form');

form.addEventListener('reset', beforeReset);
function beforeReset(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data', dataJSON);
}

var previousDataJSON = localStorage.getItem('data');
if (previousDataJSON !== null) {
  data.entries.push(JSON.parse(previousDataJSON));
  data.entries.flat();
  data.nextEntryId = (JSON.parse(previousDataJSON)).nextEntryId;
}
