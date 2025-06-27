// === script.js for Spotify-style playlist embed ===

document.addEventListener("DOMContentLoaded", () => {
  const audio = new Audio();
  const playButton = document.querySelector(".play-pause");
  const progressBar = document.querySelector(".progress");
  const tracks = document.querySelectorAll(".track");
  const mainImg = document.querySelector(".main-track img");
  const mainTitle = document.querySelector(".track-info h3");
  const mainArtist = document.querySelector(".track-info p");

  let currentTrackIndex = 0;
  let isPlaying = false;

  const trackData = [
    {
      title: "PUNKWARE202",
      artist: "Beastboi. - Topic",
      src: "https://henyx.github.io/codepen-audio/ShineBefore.mp3",
      cover: "https://i.imgur.com/Joc9PGr.png",
      duration: "3:28"
    },
    {
      title: "Punishment Prejudice",
      artist: "Nosphere - Topic",
      src: "https://henyx.github.io/codepen-audio/ShineAfter.mp3",
      cover: "https://i.imgur.com/0MQeG9z.jpg",
      duration: "3:52"
    },
    {
      title: "Falling in Love",
      artist: "No Mana - Topic",
      src: "https://henyx.github.io/codepen-audio/Falling.mp3",
      cover: "https://i.imgur.com/t1qfMfW.png",
      duration: "3:38"
    }
  ];

  function loadTrack(index) {
    const track = trackData[index];
    audio.src = track.src;
    mainImg.src = track.cover;
    mainTitle.textContent = track.title;
    mainArtist.textContent = track.artist;

    tracks.forEach((t, i) => {
      t.classList.toggle("active", i === index);
    });

    currentTrackIndex = index;
  }

  function togglePlay() {
    if (audio.paused) {
      audio.play();
      isPlaying = true;
      playButton.textContent = "❚❚";
    } else {
      audio.pause();
      isPlaying = false;
      playButton.textContent = "▶";
    }
  }

  playButton.addEventListener("click", togglePlay);

  tracks.forEach((track, index) => {
    track.addEventListener("click", () => {
      loadTrack(index);
      audio.play();
      isPlaying = true;
      playButton.textContent = "❚❚";
    });
  });

  audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
      progressBar.value = (audio.currentTime / audio.duration) * 100;
    }
  });

  progressBar.addEventListener("input", () => {
    if (audio.duration) {
      audio.currentTime = (progressBar.value / 100) * audio.duration;
    }
  });

  audio.addEventListener("ended", () => {
    playButton.textContent = "▶";
    isPlaying = false;
  });

  // Load the initial track
  loadTrack(currentTrackIndex);
});
