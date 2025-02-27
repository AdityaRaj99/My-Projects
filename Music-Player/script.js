console.log("Welcome to Spotify");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let currentlyPlayingSongItem = null; // to keep track of the current songItemPlay button

let songs = [
  {
    songName: "creative-technology",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "soulsweeper",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "tell-me-the-truth",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "vlog-background-intro-theme",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "stylish-deep-electronic",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "lost-in-dreams",
    filePath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songName: "vlog-music-beat-intro-theme",
    filePath: "songs/7.mp3",
    coverPath: "covers/7.jpg",
  },
  {
    songName: "alone",
    filePath: "songs/8.mp3",
    coverPath: "covers/8.jpg",
  },
  {
    songName: "kugelsicher-by-tremoxbeatz",
    filePath: "songs/9.mp3",
    coverPath: "covers/9.jpg",
  },
  {
    songName: "gardens-stylish-chill",
    filePath: "songs/10.mp3",
    coverPath: "covers/10.jpg",
  },
];

songItems.forEach((e, i) => {
  e.getElementsByTagName("img")[0].src = songs[i].coverPath;
  e.getElementsByClassName("songName")[0].innerText =
    songs[i].songName.toUpperCase();
});

// Handle play/pause click for masterplay

masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    if (currentlyPlayingSongItem) {
      currentlyPlayingSongItem.classList.remove("fa-circle-pause");
      currentlyPlayingSongItem.classList.add("fa-circle-play");
      currentlyPlayingSongItem = null; //reset the value when playing from masterplay
    }
    // Add this line to update the songItemPlay icon when playing from masterPlay
    const currentSongItemPlay = document.getElementById(
      (songIndex + 1).toString()
    );
    if (currentSongItemPlay) {
      currentSongItemPlay.classList.remove("fa-circle-play");
      currentSongItemPlay.classList.add("fa-circle-pause");
      currentlyPlayingSongItem = currentSongItemPlay;
    }
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
    if (currentlyPlayingSongItem) {
      currentlyPlayingSongItem.classList.remove("fa-circle-pause");
      currentlyPlayingSongItem.classList.add("fa-circle-play");
      currentlyPlayingSongItem = null;
    }
    // Add this line to update the songItemPlay icon when pausing from masterPlay
    const currentSongItemPlay = document.getElementById(
      (songIndex + 1).toString()
    );
    if (currentSongItemPlay) {
      currentSongItemPlay.classList.remove("fa-circle-pause");
      currentSongItemPlay.classList.add("fa-circle-play");
    }
  }
});
// Listen to events
audioElement.addEventListener("timeupdate", () => {
  // Upadate Seekbar
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      const clickedSongIndex = parseInt(e.target.id) - 1;

      // if there was a songItemPlay playing and it's not the currently clicked one
      if (currentlyPlayingSongItem && currentlyPlayingSongItem !== e.target) {
        audioElement.pause();
        currentlyPlayingSongItem.classList.remove("fa-circle-pause");
        currentlyPlayingSongItem.classList.add("fa-circle-play");
        gif.style.opacity = 0;
      }
      // if there is a currently playing songItem and it's the currently clicked one
      if (currentlyPlayingSongItem === e.target) {
        if (audioElement.paused) {
          audioElement.play();
          gif.style.opacity = 1;
          e.target.classList.remove("fa-circle-play");
          e.target.classList.add("fa-circle-pause");
          masterPlay.classList.remove("fa-circle-play");
          masterPlay.classList.add("fa-circle-pause");
        } else {
          audioElement.pause();
          gif.style.opacity = 0;
          e.target.classList.remove("fa-circle-pause");
          e.target.classList.add("fa-circle-play");
          masterPlay.classList.remove("fa-circle-pause");
          masterPlay.classList.add("fa-circle-play");
        }
      } else {
        songIndex = clickedSongIndex;
        makeAllPlays();
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
      }

      currentlyPlayingSongItem = e.target; //update current song item playing
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  if (currentlyPlayingSongItem) {
    currentlyPlayingSongItem.classList.remove("fa-circle-pause");
    currentlyPlayingSongItem.classList.add("fa-circle-play");
    currentlyPlayingSongItem = null;
  }
  // Add this line to update the songItemPlay icon when playing from masterPlay
  const currentSongItemPlay = document.getElementById(
    (songIndex + 1).toString()
  );
  if (currentSongItemPlay) {
    currentSongItemPlay.classList.remove("fa-circle-play");
    currentSongItemPlay.classList.add("fa-circle-pause");
    currentlyPlayingSongItem = currentSongItemPlay;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  if (currentlyPlayingSongItem) {
    currentlyPlayingSongItem.classList.remove("fa-circle-pause");
    currentlyPlayingSongItem.classList.add("fa-circle-play");
    currentlyPlayingSongItem = null;
  }
  // Add this line to update the songItemPlay icon when playing from masterPlay
  const currentSongItemPlay = document.getElementById(
    (songIndex + 1).toString()
  );
  if (currentSongItemPlay) {
    currentSongItemPlay.classList.remove("fa-circle-play");
    currentSongItemPlay.classList.add("fa-circle-pause");
    currentlyPlayingSongItem = currentSongItemPlay;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});
