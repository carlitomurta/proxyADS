$(function () {
  "use strict";

  const email = $("#email");

  const userEmail = "samuel@gmail.com";

  email.val(userEmail);

  const subtotal = $("#subtotal-price")[0];
  const total = $("#total-price")[0];
  const numProxiesElement = $("#numProxies")[0];

  const proxieValueMultiplier = 25;
  let numProxies = 5;

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
});

const handlePhone = (event) => {
  let input = event.target;
  input.value = phoneMask(input.value);
};

const phoneMask = (value) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{2})(\d)/, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value;
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

const handleZipCode = (event) => {
  let input = event.target;
  input.value = zipCodeMask(input.value);
};

const zipCodeMask = (value) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{5})(\d)/, "$1-$2");
  return value;
};

let registerForm = $("#register-form")[0];

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e);
  console.log("Formulário enviado");
});
