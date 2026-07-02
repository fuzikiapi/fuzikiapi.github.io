// v0.1 AETHER — interação leve

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    card.style.transform = "scale(0.97)";
    setTimeout(() => {
      card.style.transform = "scale(1)";
    }, 120);
  });
});