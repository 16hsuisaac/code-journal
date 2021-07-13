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
  var object = { title: title.value, url: photoURL.value, notes: notes.value };
  object.nextEntryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(object);
  photo.setAttribute('src', 'images/placeholder-image-square.jpg');
  form.reset();
}
