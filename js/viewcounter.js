// View counter and last update fetcher using Neocities API
// Replace 'YOUR_SITE_NAME' with your actual Neocities site name

function getViewCount() {
    const siteName = 'sirseemington'; // <<< CHANGE THIS to your Neocities username
    const apiUrl = `https://weirdscifi.ratiosemper.com/neocities.php?sitename=${siteName}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.result === "success") {
                console.log('Neocities data:', data);

                // Update view count
                const viewCountEl = document.getElementById('viewcount');
                if (viewCountEl && data.info.views) {
                    viewCountEl.textContent = data.info.views;
                }

            } else {
                console.error('Neocities API error:', data);
            }
        })
        .catch(error => {
            console.error('Failed to fetch view count:', error);
        });
}

function addZero(num) {
    return num < 10 ? '0' + num : num;
}

// Auto-update last update date from your log entries
function updateLastUpdateFromLog() {
    const el = document.getElementById('lastupdate');
    if (!el) return;

    const logbox = document.querySelector('.logbox ul');
    if (!logbox) return;

    const items = logbox.querySelectorAll('li');
    for (let item of items) {
        const text = item.textContent.trim();
        // Match date pattern at start of line after bullet removal
        const match = text.match(/^(\d{2}\/\d{2}\/\d{2})\s*::/);
        if (match) {
            el.textContent = match[1];
            break;
        }
    }
}// Toggle stats panel open/closed
function initStatsPanel() {
    const panel = document.getElementById('statsPanel');
    const toggle = document.getElementById('statsToggle');

    if (!panel || !toggle) return;

    // Start collapsed
    panel.classList.add('collapsed');

    toggle.addEventListener('click', function() {
        panel.classList.toggle('collapsed');
    });
}

// Run on page load
document.addEventListener('DOMContentLoaded', function() {
    getViewCount();
    updateLastUpdateFromLog();
    initStatsPanel();
});