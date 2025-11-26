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
  if (!href) return;
  // Ignore plain '#', it's not a valid selector or target
  if (href === '#') {
    e.preventDefault();
    return;
  }
  // Only smooth-scroll when there is a valid hash target
  if (href.startsWith('#')) {
    const el = document.querySelector(href);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});

// Enhanced lazy loading images using IntersectionObserver with better error handling
const lazyImages = [].slice.call(document.querySelectorAll('img[data-src]'));
if ('IntersectionObserver' in window && lazyImages.length > 0) {
  // Add rootMargin to start loading images before they enter the viewport
  // Add threshold to trigger when 10% of the image is visible
  const imgObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.dataset.src;
        
        // Set decoding to async for better performance
        img.decoding = 'async';
        
        // Set up error handling for image loading
        img.onload = () => {
          img.removeAttribute('data-src');
          img.classList.add('loaded');
          // Remove loading class when image is loaded
          img.classList.remove('loading');
        };
        
        img.onerror = () => {
          // Fallback to a placeholder if image fails to load
          img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=';
          img.removeAttribute('data-src');
          // Remove loading class when image fails to load
          img.classList.remove('loading');
        };
        
        img.src = src;
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px', // Start loading 50px before entering viewport
    threshold: 0.1 // Trigger when 10% of the image is visible
  });
  
  lazyImages.forEach(img => {
    // Add a loading class for styling
    img.classList.add('loading');
    imgObserver.observe(img);
  });
} else if (lazyImages.length > 0) {
  // Fallback for browsers that don't support IntersectionObserver
  lazyImages.forEach(img => {
    if (img.dataset.src) {
      img.src = img.dataset.src;
      img.onload = () => {
        img.removeAttribute('data-src');
        img.classList.add('loaded');
        img.classList.remove('loading');
      };
      img.onerror = () => {
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=';
        img.removeAttribute('data-src');
        img.classList.remove('loading');
      };
    }
  });
}

// Gallery lightbox functionality with captions
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

// Extract captions from gallery items
const captions = [
  'App Store 3 Panel View',
  'App Store Authorization',
  'App Store Host List',
  'App Store Image List',
  'Add Host Step 1',
  'Add Host Step 2',
  'Add Host Step 3',
  'Host Table Filter',
  'Taskbar Host Group',
  'Taskbar App Group',
  'Taskbar Launch App',
  'First Terminal',
  'MySQL CLI',
  'PostgreSQL CLI',
  'App Select',
  'Shell Terminal'
];

let currentIndex = 0;
let slideshowInterval;

function openLightbox(index) {
  currentIndex = index;
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  
  // Set image and caption
  lightboxImg.src = images[currentIndex];
  if (lightboxCaption) {
    lightboxCaption.textContent = captions[currentIndex];
  }
  
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
  
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  
  // Set image and caption
  lightboxImg.src = images[currentIndex];
  if (lightboxCaption) {
    lightboxCaption.textContent = captions[currentIndex];
  }
  
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
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    
    lightboxImg.src = images[currentIndex];
    if (lightboxCaption) {
      lightboxCaption.textContent = captions[currentIndex];
    }
  }, 5000);
}

function stopSlideshow() {
  if (slideshowInterval) {
    clearInterval(slideshowInterval);
    slideshowInterval = null;
  }
}

// Enhanced gallery image lazy loading with better error handling
document.addEventListener('DOMContentLoaded', function() {
  // Initialize gallery images with Intersection Observer for lazy loading
  const galleryImages = document.querySelectorAll('.gallery-item img');
  
  if ('IntersectionObserver' in window && galleryImages.length > 0) {
    const galleryObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            // Set decoding to async for better performance
            img.decoding = 'async';
            
            // Set up error handling for image loading
            img.onload = () => {
              img.removeAttribute('data-src');
              img.classList.add('loaded');
              // Remove loading class when image is loaded
              img.classList.remove('loading');
            };
            
            img.onerror = () => {
              // Fallback to a placeholder if image fails to load
              img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzM0MTU1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2NjZDU4MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlByZWxvYWQgRmFpbGVkPC90ZXh0Pjwvc3ZnPg==';
              img.removeAttribute('data-src');
              // Remove loading class when image fails to load
              img.classList.remove('loading');
            };
            
            img.src = img.dataset.src;
          }
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '100px 0px', // Start loading 100px before entering viewport for gallery images
      threshold: 0.1 // Trigger when 10% of the image is visible
    });
    
    galleryImages.forEach(img => {
      if (img.dataset.src) {
        // Add a loading class for styling
        img.classList.add('loading');
        galleryObserver.observe(img);
      }
    });
  }
  
  // Fallback loading for browsers that don't support IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    galleryImages.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.onload = () => {
          img.removeAttribute('data-src');
          img.classList.add('loaded');
          img.classList.remove('loading');
        };
        img.onerror = () => {
          img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzM0MTU1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2NjZDU4MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlByZWxvYWQgRmFpbGVkPC90ZXh0Pjwvc3ZnPg==';
          img.removeAttribute('data-src');
          img.classList.remove('loading');
        };
      }
    });
  }
  
  // Preload lightbox images for smoother experience
  function preloadImages() {
    // Only preload if lightbox exists on this page
    if (!document.getElementById('lightbox')) {
      return;
    }
    
    // Get actual image sources from the page instead of hardcoded array
    const galleryImages = document.querySelectorAll('.gallery-item img[data-src]');
    galleryImages.forEach(img => {
      const preloadImg = new Image();
      preloadImg.src = img.dataset.src;
      // Also handle errors in preloading
      preloadImg.onerror = () => {
        console.warn('Failed to preload image:', img.dataset.src);
      };
    });
  }
  
  // Preload all lightbox images after initial page load
  window.addEventListener('load', function() {
    // Add a small delay to ensure DOM is fully ready
    setTimeout(preloadImages, 100);
  });
});

// Gallery filtering functionality with animations
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
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.classList.contains('active')) {
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