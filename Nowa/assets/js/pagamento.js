const paymentMethods = document.getElementById("payment-method");

const stepPagamento = document.getElementById("step-pagamento");
const stepConfirmPagamento = document.getElementById(
  "step-confirmacao-pagamento"
);

const creditCardSection = document.getElementById("credit-card");
const creditDataSection = document.getElementById("credit-data");
const pixSection = document.getElementById("pix");
const pixWaitingSection = document.getElementById("pix-waiting");
const billSection = document.getElementById("bill");
const paymentSuccessSection = document.getElementById("payment-success");

let currentSection = "credit-card";

const buyButton = document.getElementById("buy-button");
const backButton = document.getElementById("back-button");

$(function () {
  "use strict";

  $("#copy-button").click(function () {
    var textToCopy = $("#pix-code").text();
    var tempTextarea = $("<textarea>");
    $("body").append(tempTextarea);
    tempTextarea.val(textToCopy).select();
    document.execCommand("copy");
    tempTextarea.remove();
  });

  $(buyButton).on("click", function (e) {
    switch (currentSection) {
      case "credit-card":
        currentSection = "credit-data";
        creditCardSection.classList.add("hidden");
        creditDataSection.classList.remove("hidden");
        break;
      case "credit-data":
        paymentSuccessHandler();
        break;
      case "pix":
        currentSection = "pix-waiting";
        paymentMethods.classList.add("hidden");
        buyButton.classList.add("hidden");
        backButton.classList.add("hidden");
        pixSection.classList.add("hidden");
        pixWaitingSection.classList.remove("hidden");
        startCountdown();
        break;
      case "bill":
        paymentSuccessHandler();
        break;

      default:
        break;
    }
  });
});

const paymentSuccessHandler = () => {
  currentSection = "payment-success";
  paymentMethods.classList.add("hidden");
  buyButton.classList.add("hidden");
  backButton.classList.add("hidden");
  stepPagamento.classList.add("done");
  stepConfirmPagamento.classList.add("active");
  paymentSuccessSection.classList.remove("hidden");
  hiddenAll();
};

const startCountdown = () => {
  let pixTimeout = "20:00";
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
};

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
  creditCardSection.classList.add("hidden");
  creditDataSection.classList.add("hidden");
  billSection.classList.add("hidden");
  pixSection.classList.add("hidden");
  pixWaitingSection.classList.add("hidden");
};

const creditRadio = document.getElementById("credit-card-radio");
const pixRadio = document.getElementById("pix-radio");
const billRadio = document.getElementById("bill-radio");

const toggleView = (e) => {
  switch (e.target.id) {
    case "credit-card-radio":
      if (e.target.checked) {
        currentSection = "credit-card";
        paymentMethods.classList.remove("hidden");
        creditCardSection.classList.remove("hidden");

        paymentSuccessSection.classList.add("hidden");
        creditDataSection.classList.add("hidden");
        billSection.classList.add("hidden");
        pixSection.classList.add("hidden");

        buyButton.innerText = "Comprar proxies";
      }
      break;
    case "bill-radio":
      if (e.target.checked) {
        currentSection = "bill";
        paymentMethods.classList.remove("hidden");
        billSection.classList.remove("hidden");

        paymentSuccessSection.classList.add("hidden");
        creditDataSection.classList.add("hidden");
        creditCardSection.classList.add("hidden");
        pixSection.classList.add("hidden");

        buyButton.innerText = "Gerar Boleto";
      }
      break;
    case "pix-radio":
      if (e.target.checked) {
        currentSection = "pix";
        paymentMethods.classList.remove("hidden");
        pixSection.classList.remove("hidden");

        paymentSuccessSection.classList.add("hidden");
        creditDataSection.classList.add("hidden");
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
