const animateBtn = document.querySelector(".animate-btn");
const quoteSection = document.querySelector(".quote-section");
const todoSection = document.querySelector(".todo-section");

animateBtn.addEventListener("click", () => {
  quoteSection.classList.add("slide-up");
  todoSection.classList.add("slide-in");
});
