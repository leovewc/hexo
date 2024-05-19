// source/js/random-gallery.js
const apiKey = 'YOUR_WALLHAVEN_API_KEY';
const apiUrl = 'https://wallhaven.cc/api/v1/search?q=id:12757&categories=111&purity=110&sorting=toplist&order=desc&topRange=1y&ai_art_filter=1&page=3';

async function getRandomImage() {
    try {
        const response = await fetch(`${apiUrl}&apikey=${apiKey}`);
        const data = await response.json();
        const images = data.data;
        if (images.length > 0) {
            const randomIndex = Math.floor(Math.random() * images.length);
            return images[randomIndex].path;
        }
        return null;
    } catch (error) {
        console.error('Error fetching image:', error);
        return null;
    }
}

async function displayRandomImage() {
    const imgElement = document.getElementById('random-image');
    const randomImage = await getRandomImage();
    if (randomImage) {
        imgElement.src = randomImage;
    }
}

// ÿ��ҳ�����ʱ��ʾ���ͼƬ
window.onload = displayRandomImage;
