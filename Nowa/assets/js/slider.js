const sliderEl = document.getElementById("rangeslider");

$(function () {
  "use strict";

  const defaultValue = (sliderEl.value / sliderEl.max) * 100;
  sliderEl.style.background = `linear-gradient(to right, #007DFF ${defaultValue}%, #E5E7EB ${defaultValue}%)`;

  sliderEl.addEventListener("input", (event) => {
    const tempSliderValue = event.target.value;
    const progress = (tempSliderValue / sliderEl.max) * 100;
    sliderEl.style.background = `linear-gradient(to right, #007DFF ${progress}%, #E5E7EB ${progress}%)`;
  });
  sliderEl.addEventListener("change", (event) => {
    const tempSliderValue = event.target.value;
    const progress = (tempSliderValue / sliderEl.max) * 100;
    sliderEl.style.background = `linear-gradient(to right, #007DFF ${progress}%, #E5E7EB ${progress}%)`;
  });
});
