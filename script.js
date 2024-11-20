document.getElementById('shorten-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const longUrl = document.getElementById('long-url').value;

  try {
    const response = await fetch('http://localhost:3000/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ longUrl }),
    });

    const data = await response.json();

    if (data.shortUrl) {
      document.getElementById('result').classList.remove('hidden');
      document.getElementById('short-url').textContent = data.shortUrl;
      document.getElementById('short-url').href = data.shortUrl;
    } else {
      alert('حدث خطأ أثناء اختصار الرابط');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

document.getElementById('copy-btn').addEventListener('click', () => {
  const shortUrl = document.getElementById('short-url').textContent;
  navigator.clipboard.writeText(shortUrl).then(() => {
    alert('تم نسخ الرابط المختصر!');
  });
});