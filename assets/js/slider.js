const apiURL = 'https://api.webbuilder.technolitics.com/api/v1/website-builder/website/banner/get-all-banners/66e2db81cb3d9f4f044cfc54?type=HOME_BANNER';
    
// Base URL for images
const baseURL = 'https://technolitics-s3-bucket.s3.ap-south-1.amazonaws.com/websitebuilder-s3-bucket/';

// Function to fetch and display banners
async function fetchBanners() {
    try {
        // Fetching data from the API
        const response = await fetch(apiURL);
        const responseData = await response.json();

        // Log the entire API response to inspect its structure
        console.log('Full API Response:', JSON.stringify(responseData, null, 2));

        // Check if the response contains the data object with the banners
        if (responseData && Array.isArray(responseData.data)) {
            const banners = responseData.data;  // Access the 'data' array that contains banners
            const desktopBanners = document.getElementById('desktop-banners');
            const mobileBanners = document.getElementById('mobile-banners');

            banners.forEach(banner => {
                // Check the banner structure for bannerImage and paths
                if (banner.bannerImage) {
                    const desktopImageUrl = baseURL + banner.bannerImage.webView;
                    const mobileImageUrl = baseURL + banner.bannerImage.mobileView;

                    // Log the generated image URLs for debugging
                    console.log('Desktop Image URL:', desktopImageUrl);
                    console.log('Mobile Image URL:', mobileImageUrl);

                    // Create desktop banner slide
                    const desktopSlide = document.createElement('div');
                    desktopSlide.classList.add('swiper-slide', 'bgimg');
                    desktopSlide.innerHTML = `<img src="${desktopImageUrl}" alt="bg">`;
                    desktopBanners.appendChild(desktopSlide);

                    // Create mobile banner slide
                    const mobileSlide = document.createElement('div');
                    mobileSlide.classList.add('swiper-slide', 'bgimg');
                    mobileSlide.innerHTML = `<img src="${mobileImageUrl}" alt="bg">`;
                    mobileBanners.appendChild(mobileSlide);
                } else {
                    console.error('No bannerImage found for this banner entry');
                }
            });

            // Reinitialize Swiper (if necessary)
            swiper.update();
        } else {
            console.error('API response format is unexpected or does not contain a data array.');
        }
    } catch (error) {
        console.error('Error fetching banners:', error);
    }
}

// Fetch banners when the page loads
document.addEventListener('DOMContentLoaded', fetchBanners);



document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('.swiper-container', {
      loop: true,
      autoplay: {
        delay: 6500, // Change slide every 3 seconds
        disableOnInteraction: false,
      },
      effect: 'fade', // Smooth fade transition
      speed: 2000,
      
      simulateTouch: true,
          grabCursor: true,// Transition speed
    });
});



function scrollToTop() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}
  // Delay the hiding of the preloader
  window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(function() {
      preloader.style.display = 'none';
      navigationbar.style.display='block';
     
    }, 1000); 
  });


  async function fetchTestimonials() {
    try {
        const response = await fetch('https://api.webbuilder.technolitics.com/api/v1/website-builder/website/testimonial/get-all-testimonials/66e2db81cb3d9f4f044cfc54');

        if (!response.ok) {
            throw new Error('HTTP error! Status: ' + response.status);
        }

        const data = await response.json();
        console.log(data); // Log to check structure

        if (!data || !data.data) {
            throw new Error('Unexpected data structure!');
        }

        const testimonialsContainer = $(".testimonial-carousel");
        testimonialsContainer.empty(); // Clear existing content

        data.data.forEach((testimonial) => {
            const imagepath = 'https://technolitics-s3-bucket.s3.ap-south-1.amazonaws.com/websitebuilder-s3-bucket/';
            const imageUrl = `${imagepath}${testimonial.image}`;

            const testimonialElement = `
            
                <div class="testimonial">
                <div class="test-box">
                  <div class="test-iamge">
                    <img src="${imageUrl}" alt="${testimonial.name}" /></div>
                    <div class="testimonial-text">
                        <p class="review">${testimonial.review}</p>
                        <h3 class="name">${testimonial.name}</h3>
                        <p class="profile">${testimonial.companyProfile}</p>
                    </div>
                </div>
                </div>
            `;
            testimonialsContainer.append(testimonialElement);
        });

        // Initialize OwlCarousel after testimonials are appended
        initializeCarousel();

    } catch (error) {
        console.error('Error fetching testimonials:', error);
        $('.testimonial-carousel').text('Failed to load testimonials.');
    }
}

function initializeCarousel() {
    $(".testimonial-carousel").owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1, // Mobile: 1 item per slide
            },
            864: {
                items: 1, // Tablets: 2 items per slide
            },
            1024: {
                items: 2, // Desktop: 3 items per slide
            },
            1230:{
              items:2,
            },
            1496:{
              items:3,
            }
        }
    });
}

$(document).ready(function() {
    fetchTestimonials();
});



  async function fetchBlogPosts() {
    try {
        const response = await fetch('https://api.webbuilder.technolitics.com/api/v1/website-builder/website/post/get-all-posts/66e2db81cb3d9f4f044cfc54');
        const data = await response.json();
        
        if (data && data.data) {
            displayBlogPosts(data.data);
        }
    } catch (error) {
        console.error('Error fetching blog posts:', error);
    }
}

// Function to display blog posts dynamically
function displayBlogPosts(posts) {
    const blogContainer = document.getElementById('blog-container');
    blogContainer.innerHTML = ''; // Clear the container

    posts.forEach(post => {
        const { title, banner, seoDetails, createdAt, description } = post;
        const bannerImage = banner.image ? `https://technolitics-s3-bucket.s3.ap-south-1.amazonaws.com/websitebuilder-s3-bucket/${banner.image}` : 'default-image.jpg';
        const postDate = new Date(createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        const author = seoDetails.tags && seoDetails.tags.length > 0 ? seoDetails.tags[0] : 'Unknown Author';

        // Create blog card HTML
        const blogCard = `
            <div class="blog-card">
                <!-- Blog Image -->
                 <div class="blog-image"> 
                <img src="${bannerImage}" alt="Blog Cover Image">
                     <span><i class="far fa-folder"></i>Blog</span>
                        </div>
                

                    <!-- Blog Title -->
                    <h2 class="blog-title">${title}</h2>

                    <!-- Blog Meta (Date and Author) -->
                    <div class="blog-meta">
                        <span><i class="far fa-calendar"></i> ${postDate}</span>||
                        <span><i class="far fa-user"></i>PAREEK COLOURS</span>
                    </div>

                    <!-- Blog Footer (Read More link) -->
                    <div class="blog-footer">
                        <a href="blog.html?id=${post._id}" class="read-more">Read More <i class="flaticon-login"></i></a>
                    </div>
                </div>
            </div>
        `;
        
        // Append blog card to container
        blogContainer.innerHTML += blogCard;
    });
}

// Fetch blog posts on page load
fetchBlogPosts();






document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("popback");
    const closeButton = document.getElementById("close-popup");

    // Show popup if not already closed
    if (!sessionStorage.getItem("popupClosed")) {
        popup.style.display = "block";
    }

    // Close popup and set session storage
    closeButton.addEventListener("click", function () {
        popup.style.display = "none";
        sessionStorage.setItem("popupClosed", "true");
    });
});




// API URL for popup banners
const popupApiURL = 'https://api.webbuilder.technolitics.com/api/v1/website-builder/website/banner/get-all-banners/66e2db81cb3d9f4f044cfc54?type=POPUP_BANNER';

// Fetch and display the popup banners
async function fetchPopupBanners() {
    try {
        // Check if the popup was already shown in this session
        const popupShown = sessionStorage.getItem('popbackShown');
        if (popupShown) {
            console.log('Popup already shown in this session. Skipping...');
            return;
        }

        const response = await fetch(popupApiURL);
        const responseData = await response.json();

        if (responseData && Array.isArray(responseData.data)) {
            const desktopBannersContainer = document.getElementById('desktop-popup-banners').querySelector('.swiper-wrapper');
            const mobileBannersContainer = document.getElementById('mobile-popup-banners').querySelector('.swiper-wrapper');

            responseData.data.forEach(banner => {
                if (banner.bannerImage) {
                    const desktopImageUrl = baseURL + banner.bannerImage.webView;
                    const mobileImageUrl = baseURL + banner.bannerImage.mobileView;

                    // Create desktop popup banner slide
                    const desktopSlide = document.createElement('div');
                    desktopSlide.classList.add('swiper-slide');
                    desktopSlide.innerHTML = `<img src="${desktopImageUrl}" alt="Desktop Popup Banner">`;
                    desktopBannersContainer.appendChild(desktopSlide);

                    // Create mobile popup banner slide
                    const mobileSlide = document.createElement('div');
                    mobileSlide.classList.add('swiper-slide');
                    mobileSlide.innerHTML = `<img src="${mobileImageUrl}" alt="Mobile Popup Banner">`;
                    mobileBannersContainer.appendChild(mobileSlide);
                }
            });

            // Initialize Swiper for desktop and mobile popup banners
            new Swiper('#desktop-popup-banners', {
                autoplay: {
                    delay: 3000,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            });

            new Swiper('#mobile-popup-banners', {
                autoplay: {
                    delay: 3000,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            });

            // Show the popup and overlay
            document.getElementById('popup-banner').style.display = 'block';
            document.getElementById('popback').style.display = 'block';
            document.body.style.overflow = 'hidden';

            // Set session storage to prevent reappearing
            sessionStorage.setItem('popbackShown', 'true');
        } else {
            console.error('Popup API response does not contain a valid data array.');
        }
    } catch (error) {
        console.error('Error fetching popup banners:', error);
    }
}

// Close the popup
function closePopup() {
    document.getElementById('popup-banner').style.display = 'none';
    document.getElementById('popback').style.display = 'none';
    document.body.style.overflow = 'visible';
}

// Fetch banners on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchPopupBanners();
});

// Add event listener to close button
document.getElementById('close-popup').addEventListener('click', closePopup);












document.addEventListener("DOMContentLoaded", function () {
        const counters = document.querySelectorAll('.count-text');
        let isCountingStarted = false; // To avoid running multiple times
    
        const startCounting = (counter) => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-stop');
                const speed = +counter.getAttribute('data-speed');
                const increment = target / speed;
                let current = +counter.innerText;
    
                if (current < target) {
                    counter.innerText = Math.ceil(current + increment);
                    setTimeout(updateCount, 2);
                } else {
                    counter.innerText = target; // Ensure it ends at the target value
                }
            };
    
            counter.innerText = '0'; // Start the counter at zero
            updateCount();
        };
    
        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isCountingStarted) {
                    // Start the counter animation when in view
                    counters.forEach(counter => startCounting(counter));
                    isCountingStarted = true; // Prevent multiple starts
                    observer.disconnect(); // Stop observing once counters start
                }
            });
        };
    
        const observerOptions = {
            threshold: 0.5 // Trigger when 30% of the section is visible
        };
    
        const observer = new IntersectionObserver(observerCallback, observerOptions);
    
        // Observe the container that holds the counters
        const section = document.querySelector('.funfact-section');
        observer.observe(section);
    });