// Hiệu ứng tuyết rơi
const createSnowflake = () => {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.textContent = "❄";
    snowflake.style.left = Math.random() * window.innerWidth + "px";
    snowflake.style.animationDuration = Math.random() * 3 + 2 + "s";
    snowflake.style.opacity = Math.random();
    snowflake.style.fontSize = Math.random() * 10 + 10 + "px";

    document.body.appendChild(snowflake);

    setTimeout(() => {
        snowflake.remove();
    }, 5000);
};

let snowing = true;
setInterval(() => {
    if (snowing) createSnowflake();
}, 50);

// Lấy các phần tử DOM
const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause-btn");

// Danh sách nhạc
const playlist = [
    "/y2mate.com - Bobby Helms  Jingle Bell Rock Lyrics.mp3",
    "/y2mate.com - Brenda Lee  Rockin Around The Christmas Tree Lyrics.mp3",
    "/y2mate.com - José Feliciano  Feliz Navidad.mp3",
    "/y2mate.com - Mariah Carey  All I Want For Christmas Is You Lyrics.mp3",
    "/y2mate.com - Wham  Last Christmas Lyrics.mp3",
];

// Biến trạng thái
let isPlaying = false;
let currentTrack = 0;

// Lấy trạng thái nhạc từ sessionStorage nếu có
if (sessionStorage.getItem("isPlaying") === "true") {
    isPlaying = true;
    currentTrack = parseInt(sessionStorage.getItem("currentTrack"), 10);
    audio.src = playlist[currentTrack];
    audio.play();
}

// Hàm phát nhạc
const playMusic = () => {
    if (audio.src !== playlist[currentTrack]) {
        audio.src = playlist[currentTrack]; // Gán bài nhạc hiện tại
    }
    audio.play();
    isPlaying = true;
    sessionStorage.setItem("isPlaying", "true");
    sessionStorage.setItem("currentTrack", currentTrack);
};

// Hàm dừng nhạc
const pauseMusic = () => {
    audio.pause();
    isPlaying = false;
    sessionStorage.setItem("isPlaying", "false");
};

// Cập nhật biểu tượng nút Play/Pause
const updateButtonIcon = () => {
    playPauseBtn.textContent = isPlaying ? "⏸️" : "▶️";
};

// Sự kiện click vào nút Play/Pause
playPauseBtn.addEventListener("click", () => {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
    updateButtonIcon();
});

// Tự động chuyển bài khi bài hiện tại kết thúc
audio.addEventListener("ended", () => {
    currentTrack = (currentTrack + 1) % playlist.length; // Chuyển sang bài tiếp theo
    playMusic();
    updateButtonIcon();
});
// Thêm sự kiện cho nút "Nhấn vào đây nè"
const showMessageButton = document.getElementById("show-message-btn");
const message = document.getElementById("message");

showMessageButton.addEventListener("click", () => {
    // Hiển thị phần lời chúc khi nhấn nút
    message.style.display = message.style.display === "none" ? "block" : "none";
});
