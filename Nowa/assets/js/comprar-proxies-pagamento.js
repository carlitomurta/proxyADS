const creditCardSection = document.getElementById("credit-card");
const creditDataSection = document.getElementById("credit-data");
const pixSection = document.getElementById("pix");
const pixWaitingSection = document.getElementById("pix-waiting");
const billSection = document.getElementById("bill");

const buyButton = document.getElementById("buy-button");

$(function () {
  "use strict";

  let pixTimeout = "20:00";

  $("#copy-button").click(function () {
    var textToCopy = $("#pix-code").text();
    var tempTextarea = $("<textarea>");
    $("body").append(tempTextarea);
    tempTextarea.val(textToCopy).select();
    document.execCommand("copy");
    tempTextarea.remove();
  });

  const interval = setInterval(() => {
    var timer = pixTimeout.split(":");
    var minutes = parseInt(timer[0], 10);
    var seconds = parseInt(timer[1], 10);
    --seconds;
    minutes = seconds < 0 && minutes > 0 ? --minutes : minutes;
    if (minutes == 0 && seconds == 0) clearInterval(interval);
    seconds = seconds < 0 ? 59 : seconds;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    $("#countdown-pix").html(minutes + ":" + seconds);
    pixTimeout = minutes + ":" + seconds;
  }, 1000);
});

const handleCPF = (event) => {
  let input = event.target;
  input.value = cpfMask(input.value);
};

const cpfMask = (v) => {
  v = v.replace(/\D/g, "");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return v;
};

const hiddenAll = () => {
  creditCardSection.classList.toggle("hidden");
};

const creditRadio = document.getElementById("credit-card-radio");
const pixRadio = document.getElementById("pix-radio");
const billRadio = document.getElementById("bill-radio");

const toggleView = (e) => {
  switch (e.target.id) {
    case "credit-card-radio":
      if (e.target.checked) {
        creditCardSection.classList.remove("hidden");
        billSection.classList.add("hidden");
        pixSection.classList.add("hidden");
        buyButton.innerText = "Comprar proxies";
      }
      break;
    case "bill-radio":
      if (e.target.checked) {
        billSection.classList.remove("hidden");
        creditCardSection.classList.add("hidden");
        pixSection.classList.add("hidden");
        buyButton.innerText = "Gerar Boleto";
      }
      break;
    case "pix-radio":
      if (e.target.checked) {
        pixSection.classList.remove("hidden");
        creditCardSection.classList.add("hidden");
        billSection.classList.add("hidden");
        buyButton.innerText = "Gerar PIX";
      }
      break;
  }
};

creditRadio.addEventListener("change", toggleView);
pixRadio.addEventListener("change", toggleView);
billRadio.addEventListener("change", toggleView);
