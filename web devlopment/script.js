var playlist = [];

function addSongToPlaylist(song) {
  if (!playlist.includes(song)) {
    playlist.push(song);
    renderPlaylist();
  }
}

function removeSongFromPlaylist(song) {
  var index = playlist.indexOf(song);
  if (index !== -1) {
    playlist.splice(index, 1);
    renderPlaylist();
  }
}

function renderPlaylist() {
  var playlistElement = document.getElementById("playlist");
  playlistElement.innerHTML = "";

  for (var i = 0; i < playlist.length; i++) {
    var song = playlist[i];

    var li = document.createElement("li");
    var text = document.createTextNode(song);
    var button = document.createElement("button");

    button.innerText = "Remove";
    button.onclick = (function(song) {
      return function() {
        removeSongFromPlaylist(song);
      };
    })(song);

    li.appendChild(text);
    li.appendChild(button);

    playlistElement.appendChild(li);
  }
}

var audioPlayer = document.getElementById("audioPlayer");
var librarySongs = document.querySelectorAll("#library li");

for (var i = 0; i < librarySongs.length; i++) {
  var song = librarySongs[i];
  var src = song.getAttribute("data-src");

  song.addEventListener("click", function() {
    audioPlayer.src = src;
    audioPlayer.play();
    addSongToPlaylist(song.textContent);
  });
}
