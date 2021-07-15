/* global data */
/* exported data */

var photoURL = document.querySelector('.photourl');
var photo = document.querySelector('img');
var form = document.querySelector('.form');
var title = document.querySelector('.title');
var notes = document.querySelector('.notes');
var ul = document.querySelector('ul');
var entriesNav = document.querySelector('.entries-nav');
var entryForm = document.querySelector('.entry-form');
var noEntries = document.querySelector('.no-entries');
var newButton = document.querySelector('.new');
var entries = document.querySelector('.entries');
var deleteButton = document.querySelector('.delete');
var modal = document.querySelector('.modal');
var cancelButton = document.querySelector('.cancel');
var confirmDelete = document.querySelector('.confirm');
var newEntry = document.querySelector('.new-entry');
var editEntry = document.querySelector('.edit-entry');
var searchBar = document.querySelector('.search');

photoURL.addEventListener('input', updateImage);
form.addEventListener('submit', submit);
entriesNav.addEventListener('click', switchtoEntries);
newButton.addEventListener('click', switchtoForm);
ul.addEventListener('click', editEntries);
deleteButton.addEventListener('click', deleteEntry);
cancelButton.addEventListener('click', cancelModal);
confirmDelete.addEventListener('click', confirmDel);
searchBar.addEventListener('input', search);

function updateImage(event) {
  photo.setAttribute('src', photoURL.value);
}

function submit(event) {
  event.preventDefault();
  if (data.editing !== null) {
    var objectEdit = { title: title.value, url: photoURL.value, notes: notes.value };
    objectEdit.entryId = data.editing.entryId;
    for (var u = 0; u < data.entries.length; u++) {
      if (parseInt(data.entries[u].entryId) === objectEdit.entryId) {
        data.entries[u] = objectEdit;
      }
    }
    var editedEntry = journalSingle(objectEdit);
    var liItems = document.querySelectorAll('li');
    for (var o = 0; o < liItems.length; o++) {
      if (parseInt(liItems[o].getAttribute('data-entry-id')) === objectEdit.entryId) {
        liItems[o] = ul.replaceChild(editedEntry, liItems[o]);
      }
    }
    form.reset();
    data.editing = null;
    deleteButton.setAttribute('class', 'delete hidden');
  } else {
    var object = { title: title.value, url: photoURL.value, notes: notes.value };
    object.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(object);
    photo.setAttribute('src', 'images/placeholder-image-square.jpg');
    form.reset();
    ul.appendChild(journalSingle(object));
  }
  switchtoEntries(event);
  newEntry.setAttribute('class', 'new-entry');
  editEntry.setAttribute('class', 'edit-entry hidden');
}

function journalSingle(object) {
  var li = document.createElement('li');
  li.setAttribute('class', 'row');
  li.setAttribute('data-entry-id', object.entryId);

  var img = document.createElement('img');
  img.setAttribute('class', 'column-half');
  img.setAttribute('src', object.url);
  li.appendChild(img);
  var div = document.createElement('div');
  div.setAttribute('class', 'column-half');
  li.appendChild(div);
  var div2 = document.createElement('div');
  div2.setAttribute('class', 'flex space-between align-center');
  div.appendChild(div2);
  var h2 = document.createElement('h2');
  div2.appendChild(h2);
  var entryTitle = document.createTextNode(object.title);
  h2.append(entryTitle);
  var pencil = document.createElement('button');
  pencil.setAttribute('class', 'edit');
  pencil.setAttribute('data-entry-id', object.entryId);
  div2.appendChild(pencil);
  var pencilText = document.createTextNode('✎');
  pencil.appendChild(pencilText);
  var p = document.createElement('p');
  div.appendChild(p);
  var description = document.createTextNode(object.notes);
  p.prepend(description);

  return li;
}

function journalView(entry) {
  var li = document.createElement('li');
  li.setAttribute('class', 'row');
  li.setAttribute('data-entry-id', entry.entryId);

  var img = document.createElement('img');
  img.setAttribute('class', 'column-half');
  img.setAttribute('src', entry.url);
  li.appendChild(img);
  var div = document.createElement('div');
  div.setAttribute('class', 'column-half');
  li.appendChild(div);
  var div2 = document.createElement('div');
  div2.setAttribute('class', 'flex space-between align-center');
  div.appendChild(div2);
  var h2 = document.createElement('h2');
  div2.appendChild(h2);
  var entryTitle = document.createTextNode(entry.title);
  h2.append(entryTitle);
  var pencil = document.createElement('button');
  pencil.setAttribute('class', 'edit');
  pencil.setAttribute('data-entry-id', entry.entryId);
  div2.appendChild(pencil);
  var pencilText = document.createTextNode('✎');
  pencil.appendChild(pencilText);
  var p = document.createElement('p');
  div.appendChild(p);
  var description = document.createTextNode(entry.notes);
  p.prepend(description);

  return li;
}

function parentJournalView(event) {
  for (var i = data.entries.length - 1; i >= 0; i--) {
    ul.appendChild(journalView(data.entries[i]));
  }
}

window.addEventListener('DOMContentLoaded', parentJournalView);

function switchtoEntries(event) {
  entryForm.setAttribute('class', 'entry-form hidden');
  entries.setAttribute('class', 'entries');
  data.view = 'entries';
  if (data.entries.length > 0) {
    noEntries.setAttribute('class', 'no-entries hidden');
  } else {
    entryForm.setAttribute('class', 'entries hidden');
  }
}

function switchtoForm(event) {
  data.view = 'entry-form';
  entryForm.setAttribute('class', 'entry-form');
  entries.setAttribute('class', 'entries hidden');
}

if (data.view === 'entry-form') {
  switchtoForm();
} else if (data.view === 'entries') {
  switchtoEntries();
}

function editEntries(event) {
  if (event.target.matches('.edit')) {
    for (var y = 0; y < data.entries.length; y++) {
      if (data.entries[y].entryId === parseInt(event.target.getAttribute('data-entry-id'))) {
        var notIdMath = y;
      }
    }
    data.editing = data.entries[notIdMath];
    switchtoForm();
    title.value = data.editing.title;
    photoURL.value = data.editing.url;
    notes.value = data.editing.notes;
    photo.setAttribute('src', photoURL.value);
    deleteButton.setAttribute('class', 'delete');
    newEntry.setAttribute('class', 'new-entry hidden');
    editEntry.setAttribute('class', 'edit-entry');
  }
}

function deleteEntry(event) {
  modal.className = 'modal after';
}

function cancelModal(event) {
  modal.className = 'modal before';
}

function confirmDel(event) {
  for (var b = 0; b < data.entries.length; b++) {
    if (data.entries[b].entryId === data.editing.entryId) {
      var arrayNum = b;
    }
  }
  data.entries.splice(arrayNum, 1);
  var liItems = document.querySelectorAll('li');
  for (var c = 0; c < liItems.length; c++) {
    if (parseInt(liItems[c].getAttribute('data-entry-id')) === data.editing.entryId) {
      liItems[c].remove();
    }
  }
  modal.className = 'modal before';
}

function search(event) {
  var liItems = document.querySelectorAll('li');
  var string = event.target.value;
  for (var d = 0; d < data.entries.length; d++) {
    if (data.entries[d].title === string || data.entries[d].notes.includes(string)) {
      for (var f = 0; f < liItems.length; f++) {
        if (liItems[f].getAttribute('data-entry-id') === data.entries[d].entryId) {
          liItems[d].setAttribute('class', 'row');
        } else {
          liItems[d].setAttribute('class', 'row hidden');
        }
      }
    } else {
      liItems[d].setAttribute('class', 'row');
    }
  }
  if (string === '') {
    for (var g = 0; g < liItems.length; g++) {
      liItems[g].setAttribute('class', 'row');
    }
  }
}
