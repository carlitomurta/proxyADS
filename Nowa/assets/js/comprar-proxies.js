$(function () {
  "use strict";

  const counter = $("#count-marker")[0];
  const subtotal = $("#subtotal-price")[0];
  const total = $("#total-price")[0];
  const numProxiesElement = $("#numProxies")[0];

  const proxieValueMultiplier = 25;
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

  const slider = $(".rangeslider")
    .ionRangeSlider({
      min: 1,
      max: maxProxies,
      from: numProxies,
      onChange: function (data) {
        numProxies = data.from;
        counter.value = numProxies;
        subtotal.innerHTML = currencyFormatter.format(
          numProxies * proxieValueMultiplier
        );
        total.innerHTML = currencyFormatter.format(
          numProxies * proxieValueMultiplier
        );
      },
    })
    .data("ionRangeSlider");

  $("#add-proxie").on("click", function (e) {
    e.preventDefault();
    if (numProxies <= maxProxies) numProxies += 1;
    counter.value = numProxies;
    slider.update({ from: numProxies });
    subtotal.innerHTML = currencyFormatter.format(
      numProxies * proxieValueMultiplier
    );
    total.innerHTML = currencyFormatter.format(
      numProxies * proxieValueMultiplier
    );
  });
  $("#sub-proxie").on("click", function (e) {
    e.preventDefault();
    if (numProxies > 1) numProxies -= 1;
    counter.value = numProxies;
    slider.update({ from: numProxies });
    subtotal.innerHTML = currencyFormatter.format(
      numProxies * proxieValueMultiplier
    );
    total.innerHTML = currencyFormatter.format(
      numProxies * proxieValueMultiplier
    );
  });
});
