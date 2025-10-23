// assets/js/main.js
// Minimal interaction logic: hamburger toggle, smooth scrolling, lazy-loading images
// 注释（中/英）已包含，便于后续扩展

// Hamburger menu toggle
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Smooth scrolling for intra-page anchors
// Use behavior: 'smooth' where supported
document.addEventListener('click', (e) => {
  const a = e.target.closest && e.target.closest('a');
  if (!a) return;
  const href = a.getAttribute('href');
  if (href && href.startsWith('#')) {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({behavior:'smooth'});
  }
});

// Lazy loading images using IntersectionObserver
const lazyImages = [].slice.call(document.querySelectorAll('img[data-src]'));
if ('IntersectionObserver' in window && lazyImages.length > 0) {
  const imgObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => imgObserver.observe(img));
}

// Gallery lightbox functionality
const images = [
  'assets/images/screenshot/appstore/appstore_3Panel.png',
  'assets/images/screenshot/appstore/appstore_authorization.png',
  'assets/images/screenshot/appstore/appstore_hostlist.png',
  'assets/images/screenshot/appstore/appstore_imagellist.png',
  'assets/images/screenshot/host_mgmt/AddHost_step01.png',
  'assets/images/screenshot/host_mgmt/AddHost_step02.png',
  'assets/images/screenshot/host_mgmt/AddHost_step03.png',
  'assets/images/screenshot/host_mgmt/HostTable_Filter.png',
  'assets/images/screenshot/taskbar/taskbar_hostGroup.png',
  'assets/images/screenshot/taskbar/taskbar-appGroup.png',
  'assets/images/screenshot/taskbar/taskbar-launchApp.png',
  'assets/images/screenshot/termapp/termapp_first.png',
  'assets/images/screenshot/termapp/termapp_mysqlcli.png',
  'assets/images/screenshot/termapp/termapp_pgcli.png',
  'assets/images/screenshot/termapp/termapp_select.png',
  'assets/images/screenshot/termapp/termapp_shell.png'
];

let currentIndex = 0;
let slideshowInterval;

function openLightbox(index) {
  currentIndex = index;
  document.getElementById('lightbox-img').src = images[currentIndex];
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
  
  // Start auto-rotation when lightbox opens
  startSlideshow();
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = ''; // Re-enable scrolling
  
  // Stop slideshow when lightbox closes
  stopSlideshow();
}

function changeImage(direction) {
  stopSlideshow(); // Stop auto-rotation when manually changing images
  
  currentIndex += direction;
  
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  } else if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  
  document.getElementById('lightbox-img').src = images[currentIndex];
  
  // Restart slideshow after a delay
  setTimeout(startSlideshow, 3000);
}

function startSlideshow() {
  // Clear any existing interval
  if (slideshowInterval) {
    clearInterval(slideshowInterval);
  }
  
  // Set up auto-rotation every 5 seconds
  slideshowInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    document.getElementById('lightbox-img').src = images[currentIndex];
  }, 5000);
}

function stopSlideshow() {
  if (slideshowInterval) {
    clearInterval(slideshowInterval);
    slideshowInterval = null;
  }
}

// Enhanced gallery image lazy loading
document.addEventListener('DOMContentLoaded', function() {
  // Initialize gallery images with Intersection Observer for lazy loading
  const galleryImages = document.querySelectorAll('.gallery-item img');
  
  if ('IntersectionObserver' in window && galleryImages.length > 0) {
    const galleryObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });
    
    galleryImages.forEach(img => {
      if (img.dataset.src) {
        galleryObserver.observe(img);
      }
    });
  }
  
  // Preload lightbox images for smoother experience
  function preloadImages() {
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }
  
  // Preload all lightbox images after initial page load
  window.addEventListener('load', function() {
    preloadImages();
  });
  
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
  
  // Set the download link based on detected OS
  function setDownloadLink() {
    const os = detectOS();
    const downloadLink = document.getElementById('download-link');
    const downloadText = document.getElementById('download-text');
    const allDownloadsBtn = document.getElementById('all-downloads');
    const platformDownloads = document.getElementById('platform-specific-downloads');
    
    // Set default download text based on OS
    if (os === 'Windows') {
      downloadText.textContent = `Download for ${os}`;
      downloadLink.href = '#'; // Set to Windows download URL when available
    } else if (os === 'macOS') {
      downloadText.textContent = `Download for ${os}`;
      downloadLink.href = '#'; // Set to macOS download URL when available
    } else if (os === 'Linux') {
      downloadText.textContent = `Download for ${os}`;
      downloadLink.href = '#'; // Set to Linux download URL when available
    } else {
      downloadText.textContent = 'Download for Your OS';
      downloadLink.href = '#';
    }
    
    // Handle "All Downloads" button click
    allDownloadsBtn.addEventListener('click', function(e) {
      e.preventDefault();
      platformDownloads.classList.toggle('hidden');
    });
  }
  
  // Initialize OS detection when DOM is loaded
  setDownloadLink();
});

// Gallery filtering functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  // Add click event to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      const category = button.getAttribute('data-category');
      
      galleryItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
          item.style.display = 'block';
          // Add animation when showing
          setTimeout(() => {
            item.classList.add('fade-in');
          }, 10);
        } else {
          item.classList.remove('fade-in');
          item.style.display = 'none';
        }
      });
    });
  });

  // Keyboard navigation for lightbox
  document.addEventListener('keydown', (e) => {
    if (document.getElementById('lightbox').classList.contains('active')) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        changeImage(-1);
      } else if (e.key === 'ArrowRight') {
        changeImage(1);
      }
    }
  });
});

// Language switch is implemented via directory links in this static scaffold - no JS required for SEO-friendly approach

// Export nothing; file runs in browser
