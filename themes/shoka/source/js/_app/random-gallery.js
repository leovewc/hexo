console.log('random-gallery.js loaded');

async function fetchRandomImage() {
  try {
    const response = await fetch('/api/wallhaven-proxy');
    const data = await response.json();
    const images = data.data;
    if (images.length > 0) {
      const randomIndex = Math.floor(Math.random() * images.length);
      document.getElementById('random-image').src = images[randomIndex].path;
    }
  } catch (error) {
    console.error('Error fetching image:', error);
  }
}

window.onload = fetchRandomImage;
