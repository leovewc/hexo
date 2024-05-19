title: Gallery Post
date: 2013-12-25 00:16:18
categories:
- [测试]
photos:
- https://w.wallhaven.cc/full/d6/wallhaven-d6z5jl.png
- https://w.wallhaven.cc/full/pk/wallhaven-pkgkkp.png
- https://w.wallhaven.cc/full/28/wallhaven-281d5y.png
- https://w.wallhaven.cc/full/y8/wallhaven-y8q6vl.jpg
- https://w.wallhaven.cc/full/l3/wallhaven-l3zmwy.jpg
- https://w.wallhaven.cc/full/28/wallhaven-285e6x.png
- assets/111135690_p0_custom1200.jpg
- assets/110977743_p0_custom1200.jpg
- https://w.wallhaven.cc/full/d6/wallhaven-d62w6l.jpg
- https://w.wallhaven.cc/full/z8/wallhaven-z8r8zg.png
- https://w.wallhaven.cc/full/x8/wallhaven-x8my1d.png
- https://w.wallhaven.cc/full/48/wallhaven-48l8ko.jpg
- https://w.wallhaven.cc/full/3z/wallhaven-3z3l63.jpg
- https://w.wallhaven.cc/full/7p/wallhaven-7pgoly.jpg
- https://w.wallhaven.cc/full/lm/wallhaven-lmvlx2.jpg
- https://w.wallhaven.cc/full/p9/wallhaven-p9porm.jpg
- https://w.wallhaven.cc/full/rr/wallhaven-rrx26w.jpg
- https://w.wallhaven.cc/full/ex/wallhaven-exq3dr.jpg
- https://w.wallhaven.cc/full/1p/wallhaven-1pr8k9.jpg
- https://w.wallhaven.cc/full/m3/wallhaven-m3yyl1.jpg
- https://w.wallhaven.cc/full/vq/wallhaven-vq5jel.jpg
- https://w.wallhaven.cc/full/85/wallhaven-85jor2.jpg
- https://w.wallhaven.cc/full/l8/wallhaven-l8dg1r.jpg

---

The test say i can just use google image address copy

This post contains 8 photos:

All photos should be displayed properly.

<script src="/js/_app/random-gallery.js"></script>

<img id="random-image" alt="Random Image" style="width: 100%; height: auto;">

<script>
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
</script>

<script>
  async function fetchRandomImage() {
    try {
      const response = await fetch('/api/leancloud-proxy?cql=select%20nick%2C%20mail%2C%20comment%2C%20url%20from%20Comment%20where%20(rid%3D%27%27%20or%20rid%20is%20not%20exists)%20order%20by%20-createdAt%20limit%200%2C10');
      const data = await response.json();
      const images = data.results; // 假设返回数据在 `results` 字段中
      if (images.length > 0) {
        const randomIndex = Math.floor(Math.random() * images.length);
        document.getElementById('random-image').src = images[randomIndex].url; // 假设图片 URL 在 `url` 字段中
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }

  window.onload = fetchRandomImage;
</script>

*From [https://wallhaven.cc/)*