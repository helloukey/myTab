// Quote Document Queries
const loader = document.querySelector(".loader");
const quoteContainer = document.querySelector(".quote-container");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const copy = document.querySelector(".copy");
const refresh = document.querySelector(".refresh");

// Loader Show & Hide
const loaderShow = () => {
  quote.classList.add("hidden");
  author.classList.add("hidden");
  loader.classList.remove("hidden");
};

const loaderHide = () => {
  if (!loader.classList.contains("hidden")) {
    quote.classList.remove("hidden");
    author.classList.remove("hidden");
    loader.classList.add("hidden");
  }
};

// Get Quote
const getQuote = async () => {
  loaderShow();
  const URL = await fetch("https://api.quotable.io/random");
  const response = await URL.json();
  return response;
};

// Updating the Quote
const updateQuote = (response) => {
  quote.textContent = response.content;
  author.textContent = `- ${response.author}`;
  if (response.content.length) {
    loaderHide();
  }
};

getQuote()
  .then((response) => {
    updateQuote(response);
  })
  .catch((err) => {
    console.log(err);
  });

// Storing Quote and Author name to clipboard
copy.addEventListener("click", () => {
  navigator.clipboard.writeText(`${quote.textContent} ${author.textContent}`);
  alert("Quote copied to your clipboard");
});

// Reloading new quote
refresh.addEventListener("click", () => {
  getQuote()
    .then((response) => {
      updateQuote(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

export {
  loader,
  quoteContainer,
  quote,
  author,
  copy,
  refresh,
  loaderShow,
  loaderHide,
  getQuote,
  updateQuote,
};
