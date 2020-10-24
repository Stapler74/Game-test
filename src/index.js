import './style/style.css';

document.querySelector(".play-pause").addEventListener("click", function() {
    this.classList.toggle("paused");
  });