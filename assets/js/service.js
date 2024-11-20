document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('visit-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const designation = document.getElementById('designation').value;
        const resume = document.getElementById('message').value;
        const websiteProjectId = document.getElementById('websiteProjectId').value;

        const data = {
            "strings.stringOne": name,
            "strings.stringTwo": phone,
            "email": email,
            "strings.stringThree": designation,
            "remarks": resume,
            "websiteProjectId": websiteProjectId
        };

        try {
            const response = await fetch("https://api.webbuilder.technolitics.com/api/v1/website-builder/website/contact-enquiry/create-contact-enquiry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();
            alert("Enquiry submitted successfully!");
            console.log("Success:", result);
        } catch (error) {
            console.error("Error:", error);
            alert("There was an error submitting your enquiry.");
        }
    });
});