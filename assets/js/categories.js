
const apiUrl = "https://api.webbuilder.technolitics.com/api/v1/website-builder/website/product-management/get-all-products/66e2db81cb3d9f4f044cfc54?categories=";
const imagePath = "https://technolitics-s3-bucket.s3.ap-south-1.amazonaws.com/websitebuilder-s3-bucket/";



async function fetchCategoryItems() {
    // Get category ID from localStorage
    const categoryId = localStorage.getItem('selectedCategory');
    console.log("Selected Category ID:", categoryId);  // Log category ID to ensure it's fetched

    if (!categoryId) {
        console.error('No category selected');
        return;
    }

    try {
        // Fetch products based on selected category ID
        const response = await fetch(apiUrl + categoryId);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Category Items API Response:', data);  // Log full API response to debug

        const products = data.data; // Assuming products are in data.data array
        const productContainer = document.getElementById('product-container');

        // Check if products array exists and is not empty
        if (!products || products.length === 0) {
            console.error('No products found for this category');
            return;
        }

        // Loop through and display products
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            const productImage = document.createElement('img');
            productImage.src = imagePath + product.arrays.arrayOne[0]; 
            productImage.alt = product.title;

            const productTitle = document.createElement('h2');
            productTitle.textContent = product.title;

            // Add click event to open product details
            productCard.addEventListener('click', () => {
                const productDetails = {
                    image: productImage.src,
                    title: product.title,
                    description: product.description
                };
                localStorage.setItem('selectedProduct', JSON.stringify(productDetails));
                window.location.href = 'product-details.html';
            });

            productCard.appendChild(productImage);
            productCard.appendChild(productTitle);
            productContainer.appendChild(productCard);
        });

    } catch (error) {
        console.error('Error fetching category items:', error);  // Log error for debugging
    }
}

fetchCategoryItems(); 