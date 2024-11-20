 const imageBasePath = 'https://technolitics-s3-bucket.s3.ap-south-1.amazonaws.com/websitebuilder-s3-bucket/';

        // Parse URL to get blog post ID
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');

        // Fetch the post data using post ID
        async function fetchBlogPost(postId) {
            try {
                const response = await fetch(`https://api.webbuilder.technolitics.com/api/v1/website-builder/website/post/get-all-posts/66e2db81cb3d9f4f044cfc54`);
                if (!response.ok) {
                    throw new Error('Error fetching blog post');
                }

                const result = await response.json();
                const post = result.data.find(post => post._id === postId); // Find the specific post by ID

                if (post) {
                    displayFullPost(post);
                } else {
                    document.getElementById('blog-container').innerHTML = '<p>Post not found.</p>';
                }
            } catch (error) {
                console.error('Error:', error);
                document.getElementById('blog-container').innerHTML = '<p>Error loading the post.</p>';
            }
        }

        // Display the full blog post
        function displayFullPost(post) {
            const blogContainer = document.getElementById('blog-container');
            blogContainer.innerHTML = '';

            const postElement = document.createElement('div');
            postElement.classList.add('blog-post');

            
            // Post banner image
            if (post.banner && post.banner.image) {
                const postImage = document.createElement('img');
                postImage.src = imageBasePath + post.banner.image;
                postImage.alt = post.title;
                postElement.appendChild(postImage);
            }
              
            // Post title
            const postTitle = document.createElement('h1');
            postTitle.classList.add('blog-title');
            postTitle.textContent = post.title; // Ensure title is displayed

            // Main description
            const postDescription = document.createElement('div');
            postDescription.classList.add('blog-description');
            postDescription.innerHTML = post.description;
            postElement.appendChild(postDescription);

            // Multiple descriptions and images
            post.multipleDescriptions.forEach(descriptionBlock => {
                const description = document.createElement('div');
                description.classList.add('description-block');
                description.innerHTML = descriptionBlock.description;
                postElement.appendChild(description);

                if (descriptionBlock.singleImage && descriptionBlock.singleImage.image) {
                    const additionalImage = document.createElement('img');
                    additionalImage.src = imageBasePath + descriptionBlock.singleImage.image;
                    additionalImage.alt = 'Additional image';
                    postElement.appendChild(additionalImage);
                }
            });

            blogContainer.appendChild(postTitle); // Ensure the title is added at the top
            blogContainer.appendChild(postElement);
        }

        // Function to go back to the blog list
        function goBack() {
            window.location.href = 'index.html'; // Navigate back to the main page
        }

        // Fetch the blog post when the page loads
        window.onload = () => {
            if (postId) {
                fetchBlogPost(postId);
            } else {
                document.getElementById('blog-container').innerHTML = '<p>Invalid post ID.</p>';
            }
        };