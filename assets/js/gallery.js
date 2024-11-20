//----------------gallery cover-------------------------//
let galleryData = []; 
let itemsPerPage = 10; 
let currentPage = 1; 

async function fetchGallery() {
  try {
    const response = await fetch('https://api.webbuilder.technolitics.com/api/v1/website-builder/website/gallery/get-all-galleries/66e2db81cb3d9f4f044cfc54');

    if (!response.ok) {
      throw new Error('HTTP error! Status: ' + response.status);
    }

    const data = await response.json();

    if (!data || !data.data) {
      throw new Error('Unexpected data structure!');
    }

    galleryData = data.data;
    displayGallery();
  } catch (error) {
    console.error('Error fetching gallery:', error);
    document.getElementById('gallery').innerText = 'Failed to load gallery.';
  }
}

function displayGallery() {
 const galleryContainer = document.getElementById('gallery');
 galleryContainer.innerHTML = ''; 

 const startIndex = (currentPage - 1) * itemsPerPage;
 const endIndex = startIndex + itemsPerPage;

 galleryData.slice(startIndex, endIndex).forEach((gallery, index) => {
   const mediaDetails = gallery.mediaDetails;

   if (mediaDetails && mediaDetails.mediaType === 'IMAGE' && Array.isArray(mediaDetails.images) && mediaDetails.images.length > 0) {
     const imagePath = "https://technolitics-s3-bucket.s3.ap-south-1.amazonaws.com/websitebuilder-s3-bucket/";
     const coverImageUrl = `${imagePath}${mediaDetails.images[0]}`; 

     const galleryElement = document.createElement('div');
     galleryElement.className = 'coveritem'; 

     galleryElement.innerHTML = `
     <div class="cover-span">
       <img src="${coverImageUrl}" alt="Cover Image" class="cover-image" data-gallery-index="${index}" />
       <div class="cover-anime"><h4 id="hover">${gallery.title}</h4></div></div>
       <h4 id="title" class="title">${gallery.title}</h4>
     `;


     galleryElement.querySelector('.cover-span').addEventListener('click', function() {
       const encodedTitle = encodeURIComponent(gallery.title);
       window.location.href = `fullgallery.html?galleryIndex=${index}&title=${encodedTitle}`;
     });

     galleryContainer.appendChild(galleryElement);
   }
 });
}



fetchGallery();


//------------image gallery -------------------//

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  const galleryTitle = getUrlParameter('title');



  let galleryfullData = []; 
 
  let currentImageIndex = 0; 
  
  async function fetchfullGallery() {
    try {
      const response = await fetch('https://api.webbuilder.technolitics.com/api/v1/website-builder/website/gallery/get-all-galleries/66e2db81cb3d9f4f044cfc54');
      
      if (!response.ok) {
        throw new Error('HTTP error! Status: ' + response.status);
      }
  
      const data = await response.json();
      
      if (!data || !data.data) {
        throw new Error('Unexpected data structure!');
      }
  
      galleryData = data.data;
      displayfullGallery();
    } catch (error) {
      console.error('Error fetching gallery:', error);
      document.getElementById('gallery').innerText = 'Failed to load gallery.';
    }
  }
  
  function displayfullGallery() {
    const galleryContainer = document.getElementById('gallery');
    galleryContainer.innerHTML = ''; 
  
    const urlParams = new URLSearchParams(window.location.search);
    const galleryIndex = parseInt(urlParams.get('galleryIndex'));
  
    if (isNaN(galleryIndex) || galleryIndex < 0 || galleryIndex >= galleryData.length) {
      galleryContainer.innerText = 'Invalid gallery index!';
      return;
    }
  
    const selectedGallery = galleryData[galleryIndex];
    const mediaDetails = selectedGallery.mediaDetails;
  
    if (mediaDetails && mediaDetails.mediaType === 'IMAGE' && Array.isArray(mediaDetails.images)) {
      mediaDetails.images.forEach((imageName, index) => {
        const imagePath = "https://technolitics-s3-bucket.s3.ap-south-1.amazonaws.com/websitebuilder-s3-bucket/";
        const imageUrl = `${imagePath}${imageName}`;
  
        const imageElement = document.createElement('figure');
        imageElement.className = 'imagess';
        imageElement.innerHTML = `
        
          <img src="${imageUrl}" alt="Gallery Image" class="modal"/>
          
        `;
  
      
        imageElement.querySelector('img').onclick = () => {
          openModal(index, mediaDetails.images);
        };
  
        galleryContainer.appendChild(imageElement);
      });
    }
  }
  
  
  function openModal(index, images) {
    currentImageIndex = index; 
    const imageUrl = getFullImagePath(images[currentImageIndex]);
    document.querySelector('.popup-image img').src = imageUrl;
    document.querySelector('.popup-image').style.display = "block";
  }
 
  function getFullImagePath(imageName) {
    const imagePath = "https://technolitics-s3-bucket.s3.ap-south-1.amazonaws.com/websitebuilder-s3-bucket/";
    return `${imagePath}${imageName}`;
  }
  
  document.querySelector('.popup-image span').onclick = () => {
    document.querySelector('.popup-image').style.display = "none";
  };
  

  document.getElementById('show-prev').onclick = () => {
    navigateImage(-1); 
  };
  
  document.getElementById('show-next').onclick = () => {
    navigateImage(1); 
  };
  
  // Add event listener for keydown events to navigate using arrow keys
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      navigateImage(-1); // Left arrow key navigates to the previous image
    } else if (event.key === 'ArrowRight') {
      navigateImage(1); // Right arrow key navigates to the next image
    }
  });
  
  function navigateImage(direction) {
    const mediaDetails = galleryData[parseInt(new URLSearchParams(window.location.search).get('galleryIndex'))].mediaDetails;
    const images = mediaDetails.images;
    
    currentImageIndex += direction;
  
    if (currentImageIndex < 0) {
      currentImageIndex = images.length - 1; 
    } else if (currentImageIndex >= images.length) {
      currentImageIndex = 0; 
    }
  
    // Update the image display accordingly
    // document.getElementById('image-display').src = images[currentImageIndex];
  
  
 
    const newImageUrl = getFullImagePath(images[currentImageIndex]);
    document.querySelector('.popup-image img').src = newImageUrl;
  }
 
  fetchfullGallery();
  



  document.addEventListener('DOMContentLoaded', () => {
    fetchVideos();
  });

  function fetchVideos() {
    const apiUrl = 'https://api.webbuilder.technolitics.com/api/v1/website-builder/website/gallery/get-all-galleries/65d0951a52fd1189b6d9f8df?type=VIDEO';

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Data received:', data);

        const videoGallery = document.getElementById('video-gallery');
        videoGallery.innerHTML = ''; 
        const videos = data.data;

        if (videos && Array.isArray(videos) && videos.length > 0) {
          videos.forEach(video => {
            console.log('Processing video:', video);

            const mediaDetails = video.mediaDetails;
            if (mediaDetails && mediaDetails.mediaType === 'VIDEO' && mediaDetails.videoLink) {
              const videoContainer = document.createElement('div');
              videoContainer.className = 'video-container';

              const videoId = extractYouTubeID(mediaDetails.videoLink);
              if (videoId) {
                const iframe = document.createElement('iframe');
                iframe.width = '100%';
                iframe.height = '315';
                iframe.src = `https://www.youtube.com/embed/${videoId}`; 
                iframe.frameBorder = '0';
                iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                iframe.allowFullscreen = true;

                const title = document.createElement('h1');
                title.textContent = video.title || 'Untitled';
                videoContainer.appendChild(iframe);
                videoContainer.appendChild(title);
                
                videoGallery.appendChild(videoContainer);
              }
            }
          });
        } else {
          console.warn('No videos available or invalid data format');
          videoGallery.innerHTML = '<p>No videos available.</p>';
        }
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
        const videoGallery = document.getElementById('video-gallery');
        videoGallery.innerHTML = `<p class="error">Failed to load videos. Please try again later.</p>`;
      });
  }

  function extractYouTubeID(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  }