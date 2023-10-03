var changeEvent = new Event("change");

const slider = document.getElementById("rangeslider");

$(function () {
  "use strict";

  const counter = $("#count-marker")[0];
  const subtotal = $("#subtotal-price")[0];
  const total = $("#total-price")[0];
  const numProxiesElement = $("#numProxies")[0];

  const proxieValueMultiplier = 25; // altere aqui, o valor de cada proxie para aplicar o desconto progressivo
  const maxProxies = 500;
  let numProxies = 5;

  counter.value = numProxies;
  counter.maxlength = maxProxies;

  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  subtotal.innerHTML = currencyFormatter.format(
    numProxies * proxieValueMultiplier
  );

  total.innerHTML = currencyFormatter.format(
    numProxies * proxieValueMultiplier
  );

  numProxiesElement.innerHTML = String(numProxies).padStart(2, "0");

  slider.min = 1;
  slider.max = maxProxies;
  slider.value = numProxies;
  slider.dispatchEvent(changeEvent);

  slider.addEventListener("input", (e) => {
    e.preventDefault();
    numProxies = e.target.value;
    counter.value = numProxies;
    subtotal.innerHTML = currencyFormatter.format(
      numProxies * proxieValueMultiplier
    );
    total.innerHTML = currencyFormatter.format(
      numProxies * proxieValueMultiplier
    );
    numProxiesElement.innerHTML = String(numProxies).padStart(2, "0");
  });

  $("#add-proxie").on("click", function (e) {
    e.preventDefault();
    numProxies = Number(numProxies);
    if (numProxies < maxProxies) numProxies += 1;
    counter.value = numProxies;
    slider.value = numProxies;
    slider.dispatchEvent(changeEvent);
    subtotal.innerHTML = currencyFormatter.format(
      numProxies * proxieValueMultiplier
    );
    total.innerHTML = currencyFormatter.format(
      numProxies * proxieValueMultiplier
    );
    numProxiesElement.innerHTML = String(numProxies).padStart(2, "0");
  });
  $("#sub-proxie").on("click", function (e) {
    e.preventDefault();
    numProxies = Number(numProxies);
    if (numProxies > 1) numProxies -= 1;
    counter.value = numProxies;
    slider.value = numProxies;
    slider.dispatchEvent(changeEvent);
    subtotal.innerHTML = currencyFormatter.format(
      numProxies * proxieValueMultiplier
    );
    total.innerHTML = currencyFormatter.format(
      numProxies * proxieValueMultiplier
    );
    numProxiesElement.innerHTML = String(numProxies).padStart(2, "0");
  });

  $("#next-button").on("click", function (e) {
    e.preventDefault();
    window.location.href = "/completar-dados.html";
  });
});
