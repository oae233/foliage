
const cloudName = "foliagedrawings"; // replace with your own cloud name
const uploadPreset = "presetone"; // replace with your own upload preset
// make a list with all the URLs of the images in order

let imageURLs = ['https://res.cloudinary.com/foliagedrawings/image/upload/v1707483650/s5ci6uqynhppim8wvnri.jpg','https://res.cloudinary.com/foliagedrawings/image/upload/v1707483649/f997mjowijnleyltzgja.jpg','https://res.cloudinary.com/foliagedrawings/image/upload/v1707483649/xejwintylm5pioceehun.jpg','https://res.cloudinary.com/foliagedrawings/image/upload/v1707483649/diio0tlbfs3bfw1unzkr.jpg','https://res.cloudinary.com/foliagedrawings/image/upload/v1707483648/xfljy7lkmzjztlramhhg.jpg','https://res.cloudinary.com/foliagedrawings/image/upload/v1707483021/hi5vjjdjt38kqjtujkxh.jpg','https://res.cloudinary.com/foliagedrawings/image/upload/v1707481537/n8vd6busvtxwfg5mpick.jpg','https://res.cloudinary.com/foliagedrawings/image/upload/v1707481512/aeuddqvxfaieyj0acbbo.jpg','https://res.cloudinary.com/foliagedrawings/image/upload/v1707481487/evkzjvx1ttyoavngbns4.jpg','https://res.cloudinary.com/foliagedrawings/image/upload/v1707481479/ux6f6noswqjcrm1ab9eb.jpg','https://res.cloudinary.com/foliagedrawings/image/upload/v1707481479/gqqyu701wa6fh0pdpz5x.jpg','https://res.cloudinary.com/foliagedrawings/image/upload/v1707481478/s1eerwxig1wudlcfdml8.jpg','https://res.cloudinary.com/foliagedrawings/image/upload/v1707481478/rkj6pinapmgewifurrev.jpg','https://res.cloudinary.com/foliagedrawings/image/upload/v1707481477/s4aydqip8y9vypmou3c6.jpg','https://res.cloudinary.com/foliagedrawings/image/upload/v1707480689/tkxuzapdakum2siuaoea.jpg','https://res.cloudinary.com/foliagedrawings/image/upload/v1707480665/dsdpfbmychw4itywvy5x.jpg']

const dropArea= document.getElementById("drop-area");
const inputFile= document.getElementById("input-file");
const imageView= document.getElementById("img-view");

let imagelist = ['"Woman with a Mandolin" Pablo Picasso, 1911', '"The Submissive Reader" René Magritte, 1928', '"The Runners" Robert Delaunay, 1930', '"The Antillean Parade" Wifredo Lam, 1945', '"Study for Homage to the Square With Aura" Josef Albers, 1959', '"Rapa" Chile, 1800-1900', '"Portrait of a Seated Woman (Olga)" Pablo Picasso, 1923', '"Oriental Bliss" Paul Klee, 1938', '"Mbanchong headdress in the shape of a serpent" Guinea, 1800-1940', '"Food for Thought" Maha Malluh, 2013', '"Crystal" Frantisek Kupka, 1919-1920.', '"Composition in Blue, Red, Yellow and Black" Piet Mondrian, 1922', '"Chirisei Kyubiki" Kazuo Shiraga, 1960', '"Bindu" Sayed Haider Raza, 1986', '"Between Darkness and Light" Marc Chagall, 1938-1943', '"Anthropometry" Yves Klein, 1960'];
let selectedImageName = '';
let selectedImageNum = '';

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


let images = document.querySelectorAll('.image-grid img');

images.forEach((img, index) => {
    img.addEventListener('click', function() {
        // Remove the selected class from all images
        images.forEach(img => img.classList.remove('selected'));

        // Add the selected class to the clicked image
        this.classList.add('selected');
        // let selectedIndex = index;
        selectedImageName = imagelist[index];
        selectedImageNum = index;
        console.log(selectedImageNum);

    });
});

let hoverText = document.getElementById('hover-text');

images.forEach((img, index) => {
    img.addEventListener('mouseover', function() {
        // Update the hover text based on the hovered image
            hoverText.textContent = imagelist[index];
        
        // hoverText.textContent = 'Hovered over image ' + (index + 1);
    });

    img.addEventListener('mouseout', function() {
        // Clear the hover text when the mouse leaves the image
        hoverText.textContent = selectedImageName;
    });
});

