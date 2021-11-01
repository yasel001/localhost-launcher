// main.js

// Modules pour controler la vie de l'application et créer une fenêtre de navigation native
const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

function createWindow() {
  // Créer la fenêtre de navigation.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 1024,
    title: "Localhost - Launcher",
    icon: __dirname + "./asset/img/icon.png",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.setMenuBarVisibility(false);
  // et charger l'index.html de l'application.
  mainWindow.loadFile("./site/index.html");

  // Ouvrir les outils de développement.
  //mainWindow.webContents.openDevTools();
}

// Cette méthode sera appelée quand Electron aura fini
// de s'initialiser et sera prêt à créer des fenêtres de navigation.
// Certaines APIs peuvent être utilisées uniquement quant cet événement est émit.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // Sur macOS il est d'usage de recréer une fenêtre dans l'application quand
    // l'icône du dock est cliquée et qu'il n'y a pas d'autre fenêtre ouverte.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quitter quand toutes les fenêtres sont fermées, sauf sur macOS. Sur macOS, il est courant
// pour les applications et leur barre de menu de rester actives jusqu’à ce que l’utilisateur quitte
// explicitement avec Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// Dans ce fichier, vous pouvez inclure le reste du code spécifique du
// processus principal de votre application. Vous pouvez également le mettre dans des fichiers séparés et les inclure ici.
