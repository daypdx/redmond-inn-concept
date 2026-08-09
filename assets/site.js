(() => {
  const navButton = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".primary-nav");
  if (navButton && nav) {
    navButton.addEventListener("click", () => {
      const open = navButton.getAttribute("aria-expanded") !== "true";
      navButton.setAttribute("aria-expanded", String(open));
      nav.dataset.open = String(open);
    });
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        navButton.setAttribute("aria-expanded", "false");
        nav.dataset.open = "false";
      }
    });
  }

  const selectors = [...document.querySelectorAll("[data-room-select]")];
  const cards = [...document.querySelectorAll("[data-room-card]")];
  const resultName = document.querySelector("[data-comparator-name]");
  const resultCopy = document.querySelector("[data-comparator-copy]");
  const roomCopy = {
    "standard-queen": {
      name: "Standard Queen",
      copy: "The current room category with the simplest name. Confirm the exact bed setup, occupancy, amenities, access features, and policies for your dates."
    },
    "double-queen": {
      name: "Double Queen",
      copy: "A current room category to compare when a different room shape may suit your party. Confirm bed count, occupancy, amenities, and policies for your dates."
    },
    "family-kitchen": {
      name: "Family Kitchen Room",
      copy: "The current category whose name identifies a kitchen-room context. Confirm appliances, occupancy, amenities, access features, and policies for your dates."
    }
  };

  function selectRoom(id, moveFocus = false) {
    selectors.forEach((button) => {
      const selected = button.dataset.roomSelect === id;
      button.setAttribute("aria-pressed", String(selected));
      if (selected && moveFocus) button.focus();
    });
    cards.forEach((card) => { card.dataset.selected = String(card.dataset.roomCard === id); });
    if (resultName && resultCopy && roomCopy[id]) {
      resultName.textContent = roomCopy[id].name;
      resultCopy.textContent = roomCopy[id].copy;
    }
  }

  selectors.forEach((button, index) => {
    button.addEventListener("click", () => selectRoom(button.dataset.roomSelect));
    button.addEventListener("keydown", (event) => {
      const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
      if (!keys.includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % selectors.length;
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + selectors.length) % selectors.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = selectors.length - 1;
      selectRoom(selectors[next].dataset.roomSelect, true);
    });
  });
  if (selectors.length) selectRoom(selectors.find((button) => button.getAttribute("aria-pressed") === "true")?.dataset.roomSelect || selectors[0].dataset.roomSelect);
})();
