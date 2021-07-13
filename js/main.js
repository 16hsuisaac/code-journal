/* global data */
/* exported data */

var photoURL = document.querySelector('.photourl');
var photo = document.querySelector('img');
var form = document.querySelector('.form');
var title = document.querySelector('.title');
var notes = document.querySelector('.notes');
var ul = document.querySelector('ul');

photoURL.addEventListener('input', updateImage);
form.addEventListener('submit', submit);

function updateImage(event) {
  photo.setAttribute('src', photoURL.value);
}

function submit(event) {
  event.preventDefault();
  var object = { title: title.value, url: photoURL.value, notes: notes.value };
  object.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(object);
  photo.setAttribute('src', 'images/placeholder-image-square.jpg');
  form.reset();
}

function journalView(entry) {
  var li = document.createElement('li');
  li.setAttribute('class', 'row');

  var img = document.createElement('img');
  img.setAttribute('class', 'column-half');
  img.setAttribute('src', entry.url);
  li.appendChild(img);
  var div = document.createElement('div');
  div.setAttribute('class', 'column-half');
  li.appendChild(div);
  var h2 = document.createElement('h2');
  div.appendChild(h2);
  var entryTitle = document.createTextNode(entry.title);
  h2.append(entryTitle);
  var p = document.createElement('p');
  div.appendChild(p);
  var description = document.createTextNode(entry.notes);
  p.append(description);

  return li;
}

function parentJournalView(event) {
  for (var i = 0; i < data.entries.length; i++) {
    ul.appendChild(journalView(data.entries[i]));
  }
}

window.addEventListener('DOMContentLoaded', parentJournalView);
