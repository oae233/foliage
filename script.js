const cloudName = "foliagedrawings"; // replace with your own cloud name
const uploadPreset = "presetone"; // replace with your own upload preset



// import axios from 'axios';

let imageURLs = ['https://res.cloudinary.com/foliagedrawings/image/upload/v1707483650/s5ci6uqynhppim8wvnri.jpg','https://res.cloudinary.com/foliagedrawings/image/upload/v1707483649/f997mjowijnleyltzgja.jpg','https://res.cloudinary.com/foliagedrawings/image/upload/v1707483649/xejwintylm5pioceehun.jpg','https://res.cloudinary.com/foliagedrawings/image/upload/v1707483649/diio0tlbfs3bfw1unzkr.jpg','https://res.cloudinary.com/foliagedrawings/image/upload/v1707483648/xfljy7lkmzjztlramhhg.jpg','https://res.cloudinary.com/foliagedrawings/image/upload/v1707483021/hi5vjjdjt38kqjtujkxh.jpg','https://res.cloudinary.com/foliagedrawings/image/upload/v1707481537/n8vd6busvtxwfg5mpick.jpg','https://res.cloudinary.com/foliagedrawings/image/upload/v1707481512/aeuddqvxfaieyj0acbbo.jpg','https://res.cloudinary.com/foliagedrawings/image/upload/v1707481487/evkzjvx1ttyoavngbns4.jpg','https://res.cloudinary.com/foliagedrawings/image/upload/v1707481479/ux6f6noswqjcrm1ab9eb.jpg','https://res.cloudinary.com/foliagedrawings/image/upload/v1707481479/gqqyu701wa6fh0pdpz5x.jpg','https://res.cloudinary.com/foliagedrawings/image/upload/v1707481478/s1eerwxig1wudlcfdml8.jpg','https://res.cloudinary.com/foliagedrawings/image/upload/v1707481478/rkj6pinapmgewifurrev.jpg','https://res.cloudinary.com/foliagedrawings/image/upload/v1707481477/s4aydqip8y9vypmou3c6.jpg','https://res.cloudinary.com/foliagedrawings/image/upload/v1707480689/tkxuzapdakum2siuaoea.jpg','https://res.cloudinary.com/foliagedrawings/image/upload/v1707480665/dsdpfbmychw4itywvy5x.jpg'];

const dropArea= document.getElementById("drop-area");
const inputFile= document.getElementById("input-file");
const imageView= document.getElementById("img-view");

let imagelist = ['"Woman with a Mandolin" Pablo Picasso, 1911', '"The Submissive Reader" René Magritte, 1928', '"The Runners" Robert Delaunay, 1930', '"The Antillean Parade" Wifredo Lam, 1945', '"Study for Homage to the Square With Aura" Josef Albers, 1959', '"Rapa" Chile, 1800-1900', '"Portrait of a Seated Woman (Olga)" Pablo Picasso, 1923', '"Oriental Bliss" Paul Klee, 1938', '"Mbanchong headdress in the shape of a serpent" Guinea, 1800-1940', '"Food for Thought" Maha Malluh, 2013', '"Crystal" Frantisek Kupka, 1919-1920.', '"Composition in Blue, Red, Yellow and Black" Piet Mondrian, 1922', '"Chirisei Kyubiki" Kazuo Shiraga, 1960', '"Bindu" Sayed Haider Raza, 1986', '"Between Darkness and Light" Marc Chagall, 1938-1943', '"Anthropometry" Yves Klein, 1960'];
let selectedImageName = '';
let selectedImageNum = '';
let drawingURL = '';
let taskId = '';

// const axios = require(['axios']);
// require(['axios'], function (axios) {
// });

// console.log(axios.isCancel('something'));
 
const APIKEY = "8136c77eb624c3adc0c16d3640b9162263eb98f77aecdcb27d4a909cc3ed4384";
 



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
            drawingURL = imageUrl;
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



const headers = {
    'X-API-KEY': APIKEY
};



// const options = {
//     headers: {
//       "X-API-KEY": APIKEY,
//     },
//     data: {
//       "image_urls": [
//           `${drawingURL}`,
//           `${imageURLs[selectedImageNum]}`
//       ],
//       "process_mode": "fast",
//       "webhook_endpoint": "",
//       "webhook_secret": ""
//     },
//     url: "https://api.midjourneyapi.xyz/mj/v2/blend",
//     method: 'post'
//   };

let myForm = document.getElementById('my-form');

myForm.addEventListener('submit', function(event) {
    // Prevent the form from being submitted
    event.preventDefault();

    // Your custom behavior here...
    console.log('Form submitted');
     endpoint = 'https://api.midjourneyapi.xyz/mj/v2/blend';
     data = {
        image_urls: [
            drawingURL,
            imageURLs[selectedImageNum]
        ],
        process_mode: 'fast',
        webhook_endpoint: 'https://webhook.site/b3f62e9d-f5d6-4cd6-81b0-cfff6b90ed29',
        notify_progress: true,
        webhook_secret: ''

    };
    // console.log(imageURLs[selectedImageNum]);
    // console.log(drawingURL);
    console.log(data);

    axios.post(endpoint, data, {headers: headers})
        .then(response => {
            console.log(response.status);
            console.log(response);
            console.log(response.data.task_id);
            taskId = response.data.task_id;
            // console.log(response.data);
            // let resultImage = response.data.result_url;
            // console.log(resultImage);
        })
        .catch(error => console.error(error));
    setTimeout(function() {
        endpoint = 'https://api.midjourneyapi.xyz/mj/v2/fetch';
        data = {
            task_id: taskId
        };
        axios.post(endpoint, data)
            .then((response) => {
                console.log(response.status);
                console.log(response.data);
                while (response.data.status == "pending" || response.data.status == "processing"){
                    setTimeout(function() {
                        console.log('pending');
                        // console.log(response.data.process_time);
                        axios.post(endpoint, data)
                        .then((response) => {
                            // console.log(response.status);
                            console.log(response.data);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                    }, 3000);
                } 
                console.log(response.data.task_result.image_urls);
            })
            .catch((error) => {
                console.error(error);
            });
        }, 2000);
        
    

});


// axios(options)
//   .then(response => {
//     console.log(response.status);
//     console.log(response.data);
//   })
//   .catch(error => console.error(`Error: ${error}`));




// let submitButton = document.getElementById('submit-button');

// submitButton.addEventListener('click', function() {
//     axios.get('https://api.example.com/data')
//         .then(function(response) {
//             // handle success
//             console.log(response);
//         })
//         .catch(function(error) {
//             // handle error
//             console.log(error);
//         });
// });
