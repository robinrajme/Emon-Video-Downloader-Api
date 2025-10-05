async function downloadVideo() {
  const url = document.getElementById("videoUrl").value.trim();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  if (!url) {
    resultDiv.innerHTML = "<p class='text-red-400'>⚠️ Please enter a video URL.</p>";
    return;
  }

  try {
    resultDiv.innerHTML = "<p class='text-yellow-400'>⏳ Processing your request...</p>";
    const apiUrl = `https://nayan-video-downloader.vercel.app/alldown?url=${encodeURIComponent(url)}`;
    const res = await fetch(apiUrl);
    const data = await res.json();

    if (data.error) throw new Error(data.error);

    let output = "<h2 class='text-xl text-green-400 mb-2'>✅ Download Links:</h2>";
    data.video && data.video.map(v => {
      output += `<a href="${v.url}" target="_blank" class="block text-blue-400 hover:underline">${v.quality || 'Download'}</a>`;
    });

    resultDiv.innerHTML = output || "<p class='text-gray-400'>No download links found.</p>";
  } catch (err) {
    resultDiv.innerHTML = `<p class='text-red-400'>❌ Error: ${err.message}</p>`;
  }
}
