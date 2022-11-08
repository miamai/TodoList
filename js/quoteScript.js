const quoteText = document.querySelector(".quote");
const authorName = document.querySelector(".name");
const quoteBtn = document.querySelector(".quote-button");
const copyBtn = document.querySelector(".copy");
const shareBtn = document.querySelector(".share");

function randomQuote() {
  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "Loading...";
  fetch("http://api.quotable.io/random")
    .then((res) => res.json())
    .then((result) => {
      quoteText.innerText = result.content;
      authorName.innerText = result.author;
      quoteBtn.innerText = "New Quote";
      quoteBtn.classList.remove("loading");
    });
}

quoteBtn.addEventListener("click", randomQuote);
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteText.innerText);
});

shareBtn.addEventListener("click", () => {
  let shareUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
  window.open(shareUrl, "_blank");
});
