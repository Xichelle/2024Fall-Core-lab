function openPopup(url, windowName) {
    // Opens a popup window with a unique name for each link
    window.open(url, windowName, 'width=800,height=600,scrollbars=yes');
}

const myCursor = document.getElementById("cursor")
console.log(myCursor)
window.addEventListener("mousemove", function(e) {
    const x = e.pageX
    const y = e.pageY
    myCursor.style.width = '160px'
    console.log(myCursor.style.width)
    myCursor.style.transform = `translate(${x - 80/2}px, ${y - 80/2}px)`;
    console.log(e)
})

// click to append a new img based on mouse position
window.addEventListener("click", function(e) {
    const x = e.clientX
    const y = e.clientY
    const img = document.createElement("img")
    img.src = myCursor.src
    console.log(img.src)
    img.style.width = '80px'
    img.style.transform = `translate(${x - 80/2}px, ${y - 80/2}px)`;
    document.body.appendChild(img)
    console.log(img)
})