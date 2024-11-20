const imagePath = "https://technolitics-s3-bucket.s3.ap-south-1.amazonaws.com/websitebuilder-s3-bucket/";
const apiUrl = "https://api.webbuilder.technolitics.com/api/v1/website-builder/website/product-management/get-all-products/66e2db81cb3d9f4f044cfc54?categories=";



async function loadProductDetails() {
    // Retrieve selected product and category from localStorage
    const productData = JSON.parse(localStorage.getItem('selectedProduct'));
    const categoryId = localStorage.getItem('selectedCategory');
    
    if (!productData || !categoryId) {
        console.error('Product or category data not found');
        return;
    }

    // Display selected product details
    document.getElementById('product-image').src = productData.image;
    document.getElementById('product-title').textContent = productData.title;
    document.getElementById('product-description').innerHTML = productData.description;

    // Fetch related products in the same category
    try {
        const response = await fetch(apiUrl + categoryId);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Related Products API Response:', data);

        const products = data.data; // Assuming products are in data.data
        const relatedProductsContainer = document.getElementById('related-products');

        if (!products || products.length === 0) {
            console.error('No related products found');
            return;
        }

        // Display related products, excluding the current product by ID
        products.forEach(product => {
            if (product._id !== productData.id) { // Exclude current product by _id
                const productCard = document.createElement('div');
                productCard.className = 'related-product-card';
                
                const productImage = document.createElement('img');
                productImage.src = imagePath + product.arrays.arrayOne[0];
                productImage.alt = product.title;

                const productTitle = document.createElement('h2');
                productTitle.textContent = product.title;

                // Add click event to open related product details
                productCard.addEventListener('click', () => {
                    const newProductDetails = {
                        id: product._id,       // Store the product ID for uniqueness
                        image: productImage.src,
                        title: product.title,
                        description: product.description
                    };
                    localStorage.setItem('selectedProduct', JSON.stringify(newProductDetails));
                    window.location.href = 'product-details.html'; // Reload to show the clicked related product
                });

                productCard.appendChild(productImage);
                productCard.appendChild(productTitle);
                relatedProductsContainer.appendChild(productCard);
            }
        });

    } catch (error) {
        console.error('Error fetching related products:', error);
    }
}

loadProductDetails(); // Call to load product details and related products