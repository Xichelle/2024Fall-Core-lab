let sheep = document.getElementById("sheep");
let counter = document.getElementById("counter");
let sheepCount = 0;

document.body.addEventListener("click", () => {
    
    if (!sheep.classList.contains("jump")) {
        
        sheep.classList.add("jump");

       
        sheepCount++;
        counter.innerHTML = `You have already let ${sheepCount} sheep jumped over the fence`;

        
        setTimeout(() => {
            sheep.classList.remove("jump");
            sheep.style.right = "-80px"; 
        }, 2000); 
    }
});
