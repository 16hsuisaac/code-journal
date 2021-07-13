/* global data */
/* exported data */

var photoURL = document.querySelector('.photourl');
var photo = document.querySelector('img');
var form = document.querySelector('.form');
var title = document.querySelector('.title');
var notes = document.querySelector('.notes');

photoURL.addEventListener('input', updateImage);
form.addEventListener('submit', submit);

function updateImage(event) {
  photo.setAttribute('src', photoURL.value);
}

function submit(event) {
  event.preventDefault();
  var object = { Title: title.value, URL: photoURL.value, Notes: notes.value };
  object.nextEntryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(object);
  photo.setAttribute('src', 'images/placeholder-image-square.jpg');
  form.reset();
  var dataEntriesJSON = JSON.stringify(data.entries);
  localStorage.setItem('data-entry', dataEntriesJSON);
}

var previousEntriesJSON = localStorage.getItem('data-entry');
if (previousEntriesJSON !== null) {
  data.entries.push(JSON.parse(previousEntriesJSON));
  data.entries.flat();
  data.nextEntryId = data.entries.length + 1;
}
