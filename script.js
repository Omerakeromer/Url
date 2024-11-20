// ملف JavaScript - script.js
document.getElementById("shortenBtn").addEventListener("click", async () => {
    const longUrl = document.getElementById("longUrl").value;
    if (!longUrl) {
        alert("يرجى إدخال رابط صحيح!");
        return;
    }

    try {
        const response = await fetch("https://api.shrtco.de/v2/shorten?url=" + encodeURIComponent(longUrl));
        const data = await response.json();
        if (data.ok) {
            const shortUrl = data.result.short_link;
            document.getElementById("shortenedUrl").innerHTML = `الرابط المختصر: <a href="https://${shortUrl}" target="_blank">${shortUrl}</a>`;
        } else {
            alert("حدث خطأ أثناء تقصير الرابط. حاول مرة أخرى.");
        }
    } catch (error) {
        alert("تعذر الاتصال بالخادم. تحقق من اتصالك بالإنترنت.");
    }
});
