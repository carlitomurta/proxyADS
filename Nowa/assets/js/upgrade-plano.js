var changeEvent = new Event("change");

const counter = document.getElementById("count-marker");
const subtotal = document.getElementById("subtotal-price");
const total = document.getElementById("total-price");

const actualProxiesElement = document.getElementById("actualProxies");
const newProxiesElement = document.getElementById("newProxies");
const totalProxiesElement = document.getElementById("totalProxies");

const minSlider = document.getElementById("min-slider");
const maxSlider = document.getElementById("max-slider");

const slider = document.getElementById("rangeslider");

const proxieValueMultiplier = 25;
const maxProxies = 500;
const actualProxies = 5;
let newProxies = 0;
let totalProxies = actualProxies + newProxies;

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
});

$(function () {
  "use strict";

  counter.value = actualProxies;
  counter.max = maxProxies;
  counter.min = actualProxies;

  subtotal.innerHTML = currencyFormatter.format(
    newProxies * proxieValueMultiplier
  );

  total.innerHTML = currencyFormatter.format(
    newProxies * proxieValueMultiplier
  );

  newProxiesElement.innerHTML = String(newProxies).padStart(2, "0");
  actualProxiesElement.innerHTML = String(actualProxies).padStart(2, "0");
  totalProxiesElement.innerHTML = String(totalProxies).padStart(2, "0");

  slider.min = actualProxies;
  slider.max = maxProxies;
  slider.value = actualProxies;
  slider.dispatchEvent(changeEvent);

  minSlider.innerHTML = String(actualProxies).padStart(2, "0");
  maxSlider.innerHTML = String(maxProxies).padStart(2, "0");

  slider.addEventListener("input", (e) => {
    e.preventDefault();
    newProxies = e.target.value - actualProxies;
    counter.value = actualProxies + newProxies;
    totalProxies = actualProxies + newProxies;
    subtotal.innerHTML = currencyFormatter.format(
      newProxies * proxieValueMultiplier
    );
    total.innerHTML = currencyFormatter.format(
      newProxies * proxieValueMultiplier
    );
    newProxiesElement.innerHTML = String(newProxies).padStart(2, "0");
    totalProxiesElement.innerHTML = String(totalProxies).padStart(2, "0");
  });

  $("#add-proxie").on("click", (e) => {
    e.preventDefault();
    if (totalProxies < maxProxies) newProxies += 1;
    counter.value = actualProxies + newProxies;
    slider.value = actualProxies + newProxies;
    slider.dispatchEvent(changeEvent);
    totalProxies = actualProxies + newProxies;
    subtotal.innerHTML = currencyFormatter.format(
      newProxies * proxieValueMultiplier
    );
    total.innerHTML = currencyFormatter.format(
      newProxies * proxieValueMultiplier
    );
    newProxiesElement.innerHTML = String(newProxies).padStart(2, "0");
    totalProxiesElement.innerHTML = String(totalProxies).padStart(2, "0");
  });

  $("#sub-proxie").on("click", (e) => {
    e.preventDefault();
    if (totalProxies > actualProxies) newProxies -= 1;
    counter.value = actualProxies + newProxies;
    slider.value = actualProxies + newProxies;
    slider.dispatchEvent(changeEvent);
    totalProxies = actualProxies + newProxies;
    subtotal.innerHTML = currencyFormatter.format(
      newProxies * proxieValueMultiplier
    );
    total.innerHTML = currencyFormatter.format(
      newProxies * proxieValueMultiplier
    );
    newProxiesElement.innerHTML = String(newProxies).padStart(2, "0");
    totalProxiesElement.innerHTML = String(totalProxies).padStart(2, "0");
  });

  $("#upgrade-button").on("click", function (e) {
    window.location.href = "upgrade-plano-pagamento.html";
  });
});

const handleAmount = (value) => {
  const temp = actualProxies + newProxies;
  if (temp + value < maxProxies) newProxies += value;
  counter.value = actualProxies + newProxies;
  totalProxies = actualProxies + newProxies;
  slider.value = actualProxies + newProxies;
  slider.dispatchEvent(changeEvent);
  newProxiesElement.innerHTML = String(newProxies).padStart(2, "0");
  totalProxiesElement.innerHTML = String(totalProxies).padStart(2, "0");
  subtotal.innerHTML = currencyFormatter.format(
    newProxies * proxieValueMultiplier
  );
  total.innerHTML = currencyFormatter.format(
    newProxies * proxieValueMultiplier
  );
};
