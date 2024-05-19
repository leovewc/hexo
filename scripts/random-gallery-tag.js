// scripts/random-gallery-tag.js
hexo.extend.tag.register('randomgallery', function (args) {
    return `
    <img id="random-image" alt="Random Image" style="width: 100%; height: auto;">
    <script src="/js/random-gallery.js"></script>
  `;
});
