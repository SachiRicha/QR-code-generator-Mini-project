'use strict';

let qrcodeContainer = document.getElementById('qrcodeContainer');
let qrImage = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");
function  generateQR() {
  if(qrText.value.trim() !== ''){
    const encodedText = encodeURIComponent(qrText.value);
    qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodedText ;
  } else {
    alert("Wrong approach! Please Enter some Text or URL.");
  }
}

function shareQRCode() {
  const qrCodeImage = document.getElementById('qrImage');

  if(!qrCodeImage || !qrCodeImage.src){
    alert("Please generate a QR code first.")
    return;
  }

  const qrCodeUrl = qrImage.src;

  fetch(qrCodeUrl) . then(response => response.blob())
  .then(blob => {
    const file = new File([blob], 'qrcode.png',{ type: "image/png"});
    if(navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({
        title: 'QR Code',
        text: 'Check out this QR Code!',
        files: [file],
      }).then(() => {
        console.log("Thanks for sharing!");
      }).catch(err => {
        console.error("Error sharing:",err);
      });
    } else {
        alert("Sharing files is not supported in this browser.");
    }
  })
  .catch(error => {
    console.error('Error fetching QR Code image:', error);
  });
}
//   if(navigator.share){
//     navigator.share({
//       title: 'QR Code',
//       text: 'Check out this QR Code!',
//       url: qrCodeUrl
//     }).then (() => {
//       console.log("Thanks for sharing!");
//     }).catch(err => {
//       console.error("Error sharing:",err);
//     });
//   } else {
//     alert("Share API is not supported in this browser.");
//   }
// }