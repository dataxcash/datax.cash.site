// download-component.js - Reusable download section component

// Function to generate download section HTML with unique IDs
function generateDownloadSection(uniqueId) {
  return `
    <div class="mt-6 flex justify-center gap-4 flex-wrap">
      <a href="#" id="download-link-${uniqueId}" class="px-6 py-3 bg-blue-700 text-white rounded-md shadow hover:bg-blue-800 transition-colors">
        <span id="download-text-${uniqueId}">Download for Your OS</span>
      </a>
      <a href="#" class="px-6 py-3 bg-gray-200 text-gray-700 rounded-md shadow hover:bg-gray-300 transition-colors" id="all-downloads-${uniqueId}">
        📦 All Downloads
      </a>
    </div>
    <div id="platform-specific-downloads-${uniqueId}" class="mt-6 hidden">
      <div class="flex justify-center gap-4 flex-wrap">
        <a href="#" class="px-6 py-3 bg-gray-400 text-gray-500 rounded-md shadow cursor-not-allowed" id="windows-download-${uniqueId}" style="pointer-events: none;">
          📱 Windows
        </a>
        <a href="#" class="px-6 py-3 bg-gray-400 text-gray-500 rounded-md shadow cursor-not-allowed" id="macos-download-${uniqueId}" style="pointer-events: none;">
          🍎 macOS
        </a>
        <a href="https://github.com/dataxcash/data.x.cash/releases/download/firstrelease/dataX.0.99.1022.linux" class="px-6 py-3 bg-blue-700 text-white rounded-md shadow hover:bg-blue-800 transition-colors" id="linux-download-${uniqueId}">
          🐧 Linux
        </a>
      </div>
    </div>
    <p class="mt-4 text-sm text-gray-500">Free • No registration required</p>
  `;
}

// OS Detection and Auto-download selection functionality
function detectOS() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
  // Windows detection
  if (userAgent.indexOf('Win') !== -1) {
    return 'Windows';
  }
  
  // macOS detection
  if (userAgent.indexOf('Mac') !== -1) {
    return 'macOS';
  }
  
  // Linux detection
  if (userAgent.indexOf('Linux') !== -1) {
    return 'Linux';
  }
  
  // Default to 'Unknown' if no match
  return 'Unknown';
}

// Set the download link based on detected OS for a specific component instance
function setDownloadLink(uniqueId) {
  const os = detectOS();
  const downloadLink = document.getElementById(`download-link-${uniqueId}`);
  const downloadText = document.getElementById(`download-text-${uniqueId}`);
  const allDownloadsBtn = document.getElementById(`all-downloads-${uniqueId}`);
  const platformDownloads = document.getElementById(`platform-specific-downloads-${uniqueId}`);
  
  // Set default download text based on OS
  if (downloadLink && downloadText) {
    if (os === 'Windows') {
      downloadText.textContent = `Download for ${os} (Coming Soon)`;
      downloadLink.href = 'javascript:void(0)';
      downloadLink.style.opacity = '0.6';
      downloadLink.style.cursor = 'not-allowed';
    } else if (os === 'macOS') {
      downloadText.textContent = `Download for ${os} (Coming Soon)`;
      downloadLink.href = 'javascript:void(0)';
      downloadLink.style.opacity = '0.6';
      downloadLink.style.cursor = 'not-allowed';
    } else if (os === 'Linux') {
      downloadText.textContent = `Download for ${os}`;
      downloadLink.href = 'https://github.com/dataxcash/data.x.cash/releases/download/firstrelease/dataX.0.99.1022.linux';
    } else {
      downloadText.textContent = 'Download for Your OS';
      downloadLink.href = 'javascript:void(0)';
      downloadLink.style.opacity = '0.6';
      downloadLink.style.cursor = 'not-allowed';
    }
  }
  
  // Handle "All Downloads" button click
  if (allDownloadsBtn && platformDownloads) {
    allDownloadsBtn.addEventListener('click', function(e) {
      e.preventDefault();
      platformDownloads.classList.toggle('hidden');
    });
  }
}

// Initialize the download component in a specified container
function initDownloadComponent(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    // Use container ID as unique identifier
    container.innerHTML = generateDownloadSection(containerId);
    // Initialize immediately after injection with unique ID
    setDownloadLink(containerId);
  }
}

// Initialize OS detection when DOM is loaded
function initializeDownloadComponents() {
  const downloadContainers = document.querySelectorAll('[data-download-component]');
  downloadContainers.forEach(container => {
    if (container.id) {
      initDownloadComponent(container.id);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeDownloadComponents);
} else {
  // DOM already ready (e.g., script loaded late)
  initializeDownloadComponents();
}