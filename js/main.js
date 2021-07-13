/* global data */
/* exported data */

var photoURL = document.querySelector('.photourl');
var photo = document.querySelector('img');
var form = document.querySelector('.form');
var title = document.querySelector('.title');
var notes = document.querySelector('.notes');
var i = 1;

photoURL.addEventListener('input', updateImage);
form.addEventListener('submit', submit);

function updateImage(event) {
  photo.setAttribute('src', photoURL.value);
}

function submit(event) {
  var object = { Title: title.value, URL: photoURL.value, Notes: notes.value };
  object.nextEntryID = i;
  i++;
  data.entries.append(object);
  photoURL.value = 'images/placeholder-image-square.jpg';
  title.value = '';
  notes.value = '';
}
