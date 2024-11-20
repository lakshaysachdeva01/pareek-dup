document.getElementById('careerform').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    // Get the form data
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const remarks = document.getElementById('dsignation').value;
    const resume = document.querySelector('input[name="resume"]').files[0];
    const websiteProjectId = document.getElementById('websiteProjectId').value;

    // Log the websiteProjectId value
    console.log("Website Project ID:", websiteProjectId); // <- This logs the value to the console

    // Create the form data object
    const formData = new FormData();
    formData.append("strings.stringOne", name);
    formData.append("strings.stringTwo", phone);
    formData.append("email", email);
    formData.append("remarks", remarks);
    formData.append("files.fileOne", resume); // Attach the file
    formData.append("websiteProjectId", websiteProjectId);

    try {
        const response = await fetch("https://api.webbuilder.technolitics.com/api/v1/website-builder/website/career-enquiry/create-career-enquiry", {
            method: "POST",
            body: formData // Send the form data as FormData (for file uploads)
        });

        if (!response.ok) {
            const errorMessage = await response.text(); // Get the response text in case of an error
            throw new Error(`Error ${response.status}: ${errorMessage}`);
        }

        const result = await response.json();
        alert("Career enquiry submitted successfully!");
        console.log("Success:", result); // Log the result
    } catch (error) {
        console.error("Error:", error);
        alert(`There was an error submitting your career enquiry: ${error.message}`);
    }
});
