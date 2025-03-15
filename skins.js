// skins.js

// Získání potřebných elementů
const skinsButton = document.getElementById('skins');
const aboutScreen = document.getElementById('aboutScreen');
const backToMenuFromAboutButton = document.getElementById('backToMenuFromAbout');
const menuScreen = document.getElementById('menu');

// Událost kliknutí na tlačítko "Skins" pro zobrazení obrazovky o projektu
skinsButton.addEventListener('click', () => {
    menuScreen.style.display = 'none'; // Skrytí hlavního menu
    aboutScreen.style.display = 'block'; // Zobrazení obrazovky o projektu
});

// Událost kliknutí na tlačítko "BACK TO MENU" pro návrat zpět do hlavního menu
backToMenuFromAboutButton.addEventListener('click', () => {
    aboutScreen.style.display = 'none'; // Skrytí obrazovky o projektu
    menuScreen.style.display = 'flex'; // Zobrazení hlavního menu
});

