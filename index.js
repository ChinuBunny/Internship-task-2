var video = document.querySelector('#videoElement');
var image = document.getElementById('image');
var context = image.getContext('2d');
const allow = document.querySelector('#allow');
const notallow = document.querySelector('#notallow');
const captureButton = document.getElementById('capture');

        allow.addEventListener('click', allowForCamera);
        notallow.addEventListener('click', notAllowForCamera);
        captureButton.addEventListener('click', captureImage);

        function allowForCamera() {
            if (navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: true })
                   .then(function (stream) {
                        video.srcObject = stream;
                        video.play();
                    })
                   .catch(function (error) {
                        alert("Error accessing the camera: " + error.message);
                    });
            } else {
                alert("Your browser doesn't support camera access");
            }
        }

        function notAllowForCamera() {
            alert("Camera access denied!");
            captureButton.disabled = true;
            if (video.srcObject) {
                let tracks = video.srcObject.getTracks();
                tracks.forEach(track => track.stop());
                video.srcObject = null;
            }
        }

        function captureImage() {
            if (video.readyState === 4) {
                context.drawImage(video, 0, 0, image.width, image.height);
            } else {
                alert("Video is not ready yet. Please wait...");
            }
        }
