// Toggle edit mode on the ID card
function toggleEdit() {
    const isEditable = document.getElementById("edit-button").innerText === "Save Changes";
    const contentElements = document.querySelectorAll("[contenteditable]");

    contentElements.forEach(element => {
        element.contentEditable = !isEditable;
    });

    // Toggle button text
    document.getElementById("edit-button").innerText = isEditable ? "Edit Card" : "Save Changes";

    // Enable or disable image click for changing based on edit mode
    const profileImage = document.getElementById('profile-image');
    if (!isEditable) {
        profileImage.addEventListener('click', triggerImageUpload);
    } else {
        profileImage.removeEventListener('click', triggerImageUpload);
    }
}

// Trigger image upload
function triggerImageUpload() {
    const imageInput = document.createElement('input');
    imageInput.type = 'file';
    imageInput.accept = 'image/*';
    imageInput.onchange = changeImage;
    imageInput.click();
}

// Change the image when a new one is selected
function changeImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const image = document.getElementById('profile-image');
        image.src = reader.result; // Set the new image as base64 string
    }
    reader.readAsDataURL(event.target.files[0]);
}

// Download the ID card as a PDF using html2pdf
function downloadCard() {
    // Create a clone of the element to force desktop layout for download
    const element = document.getElementById('id-card-wrapper').cloneNode(true);

    // Force the cards to be side-by-side in the cloned element (desktop layout)
    element.style.display = 'flex';
    element.style.flexDirection = 'row';
    element.style.justifyContent = 'space-between';

    // Configuration options for html2pdf
    const options = {
        margin: 0.5,
        filename: 'id_card.pdf',
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { scale: 3 }, // Better scaling for higher quality
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Generate the PDF with the forced desktop layout and download
    html2pdf().from(element).set(options).save();
}
