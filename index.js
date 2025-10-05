async function downloadVideo() {
  const url = document.getElementById("videoURL").value.trim();
  const resultDiv = document.getElementById("result");
  const loader = document.getElementById("loader");

  if (!url) {
    resultDiv.innerHTML = "<p style='color:red'>❌ Please enter a video URL!</p>";
    return;
  }

  resultDiv.innerHTML = "";
  loader.classList.remove("hidden");

  try {
    const apiUrl = `https://emon-video-downloader.onrender.com/alldown?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    loader.classList.add("hidden");

    if (data && data.data && data.data.length > 0) {
      resultDiv.innerHTML = data.data.map(v => `
        <a href="${v.url}" target="_blank">⬇️ Download (${v.quality || 'Video'})</a>
      `).join("");
    } else {
      resultDiv.innerHTML = "<p style='color:red'>⚠️ No download links found.</p>";
    }

  } catch (err) {
    console.error(err);
    loader.classList.add("hidden");
    resultDiv.innerHTML = "<p style='color:red'>🚨 Error fetching video.</p>";
  }
}
