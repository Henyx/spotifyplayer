const playlists = [
  {
    background: "url('https://henyx.github.io/assets/waves-bg.jpg')",
    mainTrack: {
      title: "PUNKWARE202",
      artist: "Beastboi. - Topic",
      src: "https://henyx.github.io/codepen-audio/track1.mp3",
      cover: "https://henyx.github.io/assets/cover1.jpg",
      duration: "3:28"
    },
    tracks: [
      {
        title: "PUNKWARE202",
        artist: "Beastboi. - Topic",
        src: "https://henyx.github.io/codepen-audio/track1.mp3",
        cover: "https://henyx.github.io/assets/cover1.jpg",
        duration: "3:28"
      },
      {
        title: "Punishment Prejudice",
        artist: "Nosphere - Topic",
        src: "https://henyx.github.io/codepen-audio/track2.mp3",
        cover: "https://henyx.github.io/assets/cover2.jpg",
        duration: "3:52"
      },
      {
        title: "Falling in Love",
        artist: "No Mana - Topic",
        src: "https://henyx.github.io/codepen-audio/track3.mp3",
        cover: "https://henyx.github.io/assets/cover3.jpg",
        duration: "3:38"
      }
    ]
  }
];

playlists.forEach((data, index) => {
  const container = document.createElement("div");
  container.className = "playlist";
  container.style.setProperty("--bg", data.background);

  const content = document.createElement("div");
  content.className = "playlist-content";

  const mainTrack = document.createElement("div");
  mainTrack.className = "main-track";
  mainTrack.innerHTML = `
    <img src="${data.mainTrack.cover}" />
    <div class="track-info">
      <h3>${data.mainTrack.title}</h3>
      <p>${data.mainTrack.artist}</p>
    </div>
  `;

  const audio = new Audio(data.mainTrack.src);
  let currentTrackIndex = 0;

  const controls = document.createElement("div");
  controls.className = "audio-controls";
  const playBtn = document.createElement("button");
  playBtn.innerHTML = "▶️";
  const range = document.createElement("input");
  range.type = "range";
  range.value = 0;
  range.min = 0;
  range.max = 100;

  controls.appendChild(playBtn);
  controls.appendChild(range);

  let isPlaying = false;
  playBtn.onclick = () => {
    if (isPlaying) {
      audio.pause();
      playBtn.innerHTML = "▶️";
    } else {
      audio.play();
      playBtn.innerHTML = "⏸️";
    }
    isPlaying = !isPlaying;
  };

  range.addEventListener("input", () => {
    audio.currentTime = (range.value / 100) * audio.duration;
  });

  audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
      range.value = (audio.currentTime / audio.duration) * 100;
    }
  });

  const trackList = document.createElement("div");
  trackList.className = "track-list";

  data.tracks.forEach((track, i) => {
    const trackEl = document.createElement("div");
    trackEl.className = "track";
    if (i === 0) trackEl.classList.add("active");
    trackEl.innerHTML = `
      <img src="${track.cover}" />
      <div class="meta">
        <span>${track.title}</span>
        <span>${track.artist}</span>
      </div>
      <div class="duration">${track.duration}</div>
    `;
    trackEl.onclick = () => {
      if (currentTrackIndex !== i) {
        audio.pause();
        isPlaying = false;
        playBtn.innerHTML = "▶️";

        currentTrackIndex = i;
        audio.src = track.src;
        audio.play();
        isPlaying = true;
        playBtn.innerHTML = "⏸️";

        // Update header
        mainTrack.querySelector("img").src = track.cover;
        mainTrack.querySelector("h3").textContent = track.title;
        mainTrack.querySelector("p").textContent = track.artist;

        trackList.querySelectorAll(".track").forEach(el => el.classList.remove("active"));
        trackEl.classList.add("active");
      }
    };
    trackList.appendChild(trackEl);
  });

  content.appendChild(mainTrack);
  content.appendChild(controls);
  content.appendChild(trackList);
  container.appendChild(content);
  document.body.appendChild(container);
});
