// popup.js
(function() {
  let overlay = document.getElementById("popupOverlay");

  function createPopup() {
    // Create and style the overlay
    overlay = document.createElement("div");
    overlay.id = "popupOverlay";
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.7);
      z-index: 10000;
      display: flex;
      justify-content: center;
      align-items: center;
      backdrop-filter: blur(5px);
      transition: opacity 0.3s ease;
      opacity: 0;
    `;

    // Create and style the modal container
    const container = document.createElement("div");
    container.id = "popupContainer";
    container.style.cssText = `
      background: #ffffff;
      padding: 24px;
      width: 90%;
      max-width: 400px;
      max-height: 80vh;
      overflow-y: auto;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
      text-align: center;
      font-family: Arial, sans-serif;
      transition: transform 0.3s ease;
      transform: scale(0.9);
    `;

    // Create and style the title
    const title = document.createElement("h2");
    title.textContent = "Welcome to MONSTRO: AMIRA";
    title.style.cssText = `
      color: #333;
      font-size: 22px;
      margin-bottom: 16px;
    `;
    container.appendChild(title);

    // Create and style the instructions area
    const instructions = document.createElement("div");
    instructions.style.cssText = `
      text-align: left;
      background: #f7f7f7;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 24px;
    `;

    // Updated instructions
    const instructionsList = [
      "Select a base image from 🙂 (or don't).",
      "Select body parts from 👃👄👁️👂🐛🥸🕶️.",
      "Double-tap to select.",
      "Pinch to re-size.",
      "Twist to rotate.",
      "Drag to move.",
      "Click 🗑️ to delete selected item.",
      "Click ↔️ to reflect/mirror selected item.",
      "Click 🚫 to deselect item.",
      "Click 👯 to duplicate selected item.",
      "Click 🔝 to bring selected item to top.",
      "Click 💾 to save your masterpiece to your phone."
    ];

    instructionsList.forEach((instruction, index) => {
      const p = document.createElement("p");
      p.textContent = `${index + 1}. ${instruction}`;
      p.style.cssText = `
        margin: 8px 0;
        color: #444;
        font-size: 16px;
        line-height: 1.4;
      `;
      instructions.appendChild(p);
    });

    container.appendChild(instructions);

    // Create and style the Close button
    const closeButton = document.createElement("button");
    closeButton.textContent = "Got it!";
    closeButton.style.cssText = `
      background: #4CAF50;
      color: white;
      border: none;
      padding: 12px 24px;
      font-size: 16px;
      cursor: pointer;
      border-radius: 8px;
      transition: background 0.3s ease;
    `;
    closeButton.addEventListener("mouseover", () => {
      closeButton.style.background = "#45a049";
    });
    closeButton.addEventListener("mouseout", () => {
      closeButton.style.background = "#4CAF50";
    });
    closeButton.addEventListener("click", closePopup);
    container.appendChild(closeButton);

    overlay.appendChild(container);
    document.body.appendChild(overlay);
  }

  function showPopup() {
    if (!overlay) {
      createPopup();
    }
    document.body.appendChild(overlay);
    setTimeout(() => {
      overlay.style.opacity = "1";
      document.getElementById("popupContainer").style.transform = "scale(1)";
    }, 10);
  }

  function closePopup() {
    overlay.style.opacity = "0";
    document.getElementById("popupContainer").style.transform = "scale(0.9)";
    setTimeout(() => {
      if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }, 300);
  }

  // Expose function globally
  window.showPopup = showPopup;

  // Show popup on first load
  window.addEventListener("load", showPopup);
})();
