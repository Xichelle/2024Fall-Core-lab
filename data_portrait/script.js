document.addEventListener("click", () => {
    const image1 = document.getElementById("image1");
    const image2 = document.getElementById("image2");
    const image3 = document.getElementById("image3");
  
    // 点击时改变每张图片的位置，分散开
    image1.style.top = "20%";
    image1.style.left = "20%";
  
    image2.style.top = "50%";
    image2.style.left = "80%";
  
    image3.style.top = "80%";
    image3.style.left = "50%";
  });
  