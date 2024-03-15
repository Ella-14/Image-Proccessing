let calls = 0;

const url = "https://dog.ceo/api/breeds/image/random";

let mainBuffer = "image.jpg"

const fetchImage = async () => {
  let imageUrl;
  await fetch(url)
    .then(res => res.json())
    .then(res => {
      imageUrl = res.message;
    })
    .catch(err => {
      console.error("Could not fetch data");
    });

  if (imageUrl) {
    await fetch("http://localhost:3000/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url: imageUrl
      })
    }).then(res => console.log(res)).catch(err => console.error(err));
  }
}



const drawColorCanvas = () => {
  let image = new Image();
  image.src = "./image.jpg";

  // Set up the canvas
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");

  // When the image is loaded, draw it to the canvas
  image.onload = function() {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    // Get the image data
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    // Put the modified image data back onto the canvas
    ctx.putImageData(imageData, 0, 0);
  };

  return canvas;
}

const drawGrayScaleImage = () => {  

  let image = new Image();
  image.src = "./image.jpg";

  // Set up the canvas
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");

  // When the image is loaded, draw it to the canvas
  image.onload = function() {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    // Get the image data
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    // Loop through each pixel and apply the grayscale weighted method
    for (var i = 0; i < data.length; i += 4) {
      var avg = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      data[i] = avg;
      data[i + 1] = avg;
      data[i + 2] = avg;
    }

    // Put the modified image data back onto the canvas
    ctx.putImageData(imageData, 0, 0);
  };

  return canvas;
}
  
window.onload = () => {
  let div = document.querySelector("div");

  let el = document.createElement("img");
  el.src = "./image.jpg"

  setTimeout(() => {
    div.appendChild(el);
  }, 1000);

  setTimeout(() => {
    div.appendChild(drawColorCanvas());
  }, 2000);

  setTimeout(() => {
    div.querySelector("canvas").classList.add("mirror");
  }, 3000);

  setTimeout(() => {
    div.querySelector("canvas").remove();    
    div.appendChild(drawGrayScaleImage());
    div.querySelector("canvas").classList.add("mirror");
  }, 4000);
}

setInterval(() => {
  fetchImage();
}, 7000);