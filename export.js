// export.js

// Function to export the current stage as an image with a white background.
function exportStage() {
    if (typeof app === "undefined") {
      console.error("PIXI app is not defined.");
      return;
    }
    // Get the exported canvas from PIXI.
    const exportedCanvas = app.renderer.plugins.extract.canvas(app.stage);
    
    // Create a temporary canvas with the same dimensions.
    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = exportedCanvas.width;
    finalCanvas.height = exportedCanvas.height;
    const ctx = finalCanvas.getContext('2d');
  
    // Fill the canvas with white.
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
    
    // Draw the exported canvas on top.
    ctx.drawImage(exportedCanvas, 0, 0);
    
    // Convert the final canvas to a data URL.
    const dataURL = finalCanvas.toDataURL("image/png");
    
    // Create a temporary download link and trigger it.
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = "face_assembly.png";
    link.click();
  }
  
  // Function to create an export button (💾) in the UI.
  function createExportButton() {
    const exportButton = new PIXI.Text('💾', {
      fontFamily: 'Arial',
      fontSize: 40,
      fill: 0x000000
    });
    exportButton.anchor.set(1, 0);
    exportButton.interactive = true;
    exportButton.buttonMode = true;
    exportButton.on('pointerdown', (e) => {
      e.stopPropagation();
      exportStage();
    });
    
    // Position the export button below the bring-to-top button.
    if (bringToTopButtonContainer) {
      exportButton.x = app.screen.width - 10;
      exportButton.y = bringToTopButtonContainer.y + bringToTopButtonContainer.height + 10;
    } else {
      exportButton.x = app.screen.width - 10;
      exportButton.y = 10;
    }
    
    app.stage.addChild(exportButton);
    return exportButton;
  }
  