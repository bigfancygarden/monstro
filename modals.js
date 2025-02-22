// modals.js
const Modal = (function () {
  let modalOverlay, modalContainer;

  // Create the modal structure and append it to the document.
  function createModalStructure() {
    // Create overlay.
    modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";
    modalOverlay.style.cssText =
      "position: fixed; top: 0; left: 0; width: 100%; height: 100%; " +
      "background: rgba(0,0,0,0.5); display: none; z-index: 999;";
    
    // Create container.
    modalContainer = document.createElement("div");
    modalContainer.className = "modal-container";
    modalContainer.style.cssText =
      "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);" +
      "background: #fff; border-radius: 8px; padding: 1rem; width: 90vw; max-width: 600px;" +
      "max-height: 80vh; overflow: hidden; display: none; z-index: 1000; " +
      "box-shadow: 0 2px 10px rgba(0,0,0,0.3);";

    // Create header section.
    const header = document.createElement("div");
    header.className = "modal-header";
    header.style.cssText = "display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;";

    const title = document.createElement("h2");
    title.className = "modal-title";
    title.style.cssText = "margin: 0; font-size: 1.5rem;";
    header.appendChild(title);

    const closeButton = document.createElement("button");
    closeButton.className = "modal-close";
    closeButton.innerHTML = "&times;";
    closeButton.style.cssText =
      "font-size: 1.5rem; background: none; border: none; cursor: pointer;";
    closeButton.addEventListener("click", closeModal);
    header.appendChild(closeButton);

    modalContainer.appendChild(header);

    // Create content area (scrollable).
    const contentArea = document.createElement("div");
    contentArea.className = "modal-content";
    contentArea.style.cssText = "overflow-y: auto; max-height: calc(80vh - 70px);";
    modalContainer.appendChild(contentArea);

    // Append overlay and container to the body.
    document.body.appendChild(modalOverlay);
    document.body.appendChild(modalContainer);
  }

  // Open the modal with a given asset type and asset list.
  // onSelectAsset is a callback that receives the selected asset object.
  function openModal(assetType, assets, onSelectAsset) {
    // Create the modal structure if not already present.
    if (!modalOverlay || !modalContainer) {
      createModalStructure();
    }

    // Set modal title.
    const title = modalContainer.querySelector(".modal-title");
    title.textContent = "Select a " + assetType;

    // Populate content area.
    const contentArea = modalContainer.querySelector(".modal-content");
    contentArea.innerHTML = ""; // Clear previous content.

    if (assets && assets.length > 0) {
      const grid = document.createElement("div");
      grid.className = "modal-grid";
      grid.style.cssText =
        "display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 0.5rem;";

      assets.forEach(asset => {
        const btn = document.createElement("button");
        btn.className = "modal-asset-btn";
        btn.style.cssText = "border: none; padding: 0; background: none; cursor: pointer;";

        const img = document.createElement("img");
        img.src = asset.path;
        img.alt = asset.name;
        img.style.cssText = "width: 100%; height: auto; display: block; border-radius: 4px;";
        btn.appendChild(img);

        btn.addEventListener("click", function () {
          if (typeof onSelectAsset === "function") {
            onSelectAsset(asset);
          }
          closeModal();
        });

        grid.appendChild(btn);
      });
      contentArea.appendChild(grid);
    } else {
      const p = document.createElement("p");
      p.textContent = "No " + assetType + " assets available.";
      p.style.cssText = "text-align: center; color: #666;";
      contentArea.appendChild(p);
    }

    // Display the modal elements.
    modalOverlay.style.display = "block";
    modalContainer.style.display = "block";
  }

  // Close the modal.
  function closeModal() {
    if (modalOverlay && modalContainer) {
      modalOverlay.style.display = "none";
      modalContainer.style.display = "none";
    }
  }

  return {
    openModal,
    closeModal,
  };
})();
