/* global data */
/* exported data */

var photoURL = document.querySelector('.photourl');
var photo = document.querySelector('img');

photoURL.addEventListener('input', updateImage);

function updateImage(event) {
  photo.setAttribute('src', photoURL.value);
}
