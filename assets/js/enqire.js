document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    // Get the form data
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const remarks = document.getElementById('remarks').value;
    const websiteProjectId = document.getElementById('websiteProjectId').value;

    // Create the data object to be sent to the API
    const data = {
        "strings.stringOne": name,
        "strings.stringTwo": phone,
        "email": email,
        "strings.stringThree":address,
        "remarks": remarks,
        "websiteProjectId": websiteProjectId
    };

    try {
        const response = await fetch("https://api.webbuilder.technolitics.com/api/v1/website-builder/website/contact-enquiry/create-contact-enquiry", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data) // Send the form data as JSON
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        alert("Enquiry submitted successfully!");
        console.log("Success:", result); // Log the result
    } catch (error) {
        console.error("Error:", error);
        alert("There was an error submitting your enquiry.");
    }
});



