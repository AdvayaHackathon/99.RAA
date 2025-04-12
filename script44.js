const fileInput = document.getElementById('fileInput');
const imagePreview = document.getElementById('imagePreview');
const previewImage = document.createElement('img');
const previewText = imagePreview.querySelector('.preview-text');
const uploadButton = document.getElementById('uploadButton');

// Add the img element to the preview area
imagePreview.appendChild(previewImage);

fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = function(e) {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block'; // Show image
            previewText.style.display = 'none'; // Hide text
        }

        reader.readAsDataURL(file); // Read the file as a data URL
    } else {
        // Reset preview if no file or non-image file selected
        previewImage.src = '';
        previewImage.style.display = 'none'; // Hide image
        previewText.style.display = 'block'; // Show text
        alert('Please select a valid image file.');
    }
});

uploadButton.addEventListener('click', () => {
    const file = fileInput.files[0];
    if (file) {
        // *Placeholder for actual upload logic*
        // In a real application, you would send the 'file' object
        // to a server using fetch() or XMLHttpRequest.
        alert(`Uploading "${file.name}"... (Note: This is a demo, no actual upload occurs)`);
        console.log('File selected for upload:', file);

        // Optional: Clear preview after "upload"
        // fileInput.value = null; // Reset file input
        // previewImage.src = '';
        // previewImage.style.display = 'none';
        // previewText.style.display = 'block';
    } else {
        alert('Please choose an image to upload first.');
    }
});
