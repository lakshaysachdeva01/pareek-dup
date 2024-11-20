const apiUrl = "https://api.webbuilder.technolitics.com/api/v1/website-builder/website/product-management/get-all-products/66e2db81cb3d9f4f044cfc54";
const imagePath = "https://technolitics-s3-bucket.s3.ap-south-1.amazonaws.com/websitebuilder-s3-bucket/";

async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('API Response:', data);

        const products = data.data; // Accessing products from the response
        const productContainer = document.getElementById('product-container');

        if (!products || products.length === 0) {
            console.error('No products found in the response');
            return;
        }

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            const productImage = document.createElement('img');
            // Assuming cover image is stored in arrayOne[0]
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
        console.error('Error fetching products:', error);
    }
}

fetchProducts();



const categoryApiUrl = "https://api.webbuilder.technolitics.com/api/v1/website-builder/website/category/get-all-categories/66e2db81cb3d9f4f044cfc54";
async function fetchCategories() {
    try {
        const response = await fetch(categoryApiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Category API Response:', data);

        const categories = data.data; // Assuming categories are in data.data array
        const categoryContainers = document.querySelectorAll('.category-container'); // Select all containers

        if (!categories || categories.length === 0) {
            console.error('No categories found');
            return;
        }

        categories.forEach(category => {
            categoryContainers.forEach(container => {
                const categoryCard = document.createElement('li');
                categoryCard.className = 'a';
                categoryCard.textContent = category.name; // Assuming the category name is here

                // On click, navigate to category-items page and store the category ID in localStorage
                categoryCard.addEventListener('click', () => {
                    localStorage.setItem('selectedCategory', category._id); // Store the category ID
                    window.location.href = 'category-items.html'; // Navigate to the category items page
                });

                container.appendChild(categoryCard);
            });
        });

    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

fetchCategories();




