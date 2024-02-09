
const cloudName = "foliagedrawings"; // replace with your own cloud name
const uploadPreset = "presetone"; // replace with your own upload preset

const dropArea= document.getElementById("drop-area");
const inputFile= document.getElementById("input-file");
const imageView= document.getElementById("img-view");

inputFile.addEventListener("change", uploadImage);

function uploadImage() {
    let file = inputFile.files[0];
    let imgLink = URL.createObjectURL(file);
    imageView.style.backgroundImage = `url(${imgLink})`;
    imageView.textContent = "";
    imageView.style.border = "none";

    let formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.secure_url) {
            // Image was uploaded successfully
            let imageUrl = data.secure_url;
            console.log('Image uploaded successfully: ', imageUrl);
            // Use imageUrl here...
        } else {
            // Handle error
            console.error('Error uploading image: ', data.error.message);
        }
    })
    .catch(error => console.error('Error uploading image: ', error));
}

dropArea.addEventListener("dragover", function(event){
    event.preventDefault();
});
dropArea.addEventListener("drop", function(event){
    event.preventDefault();
    inputFile.files = event.dataTransfer.files;
    uploadImage();
});


