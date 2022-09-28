const minatureToMainSRC = function(minatureSRC) {
    return minatureSRC.src.split("%20(1)").join("")
}
const renderImageSlider = function() {
    const allImages = document.querySelectorAll(".img-carousel img")
    const slider = document.querySelector(".carousel-slider")
    slider.min = 0
    slider.max = allImages.length - 1
    slider.value = 0
    slider.step = 0.05
}
const underlineMinature = function(minature){
    const underlinedMinature = document.querySelector(".underlined-img")
    underlinedMinature.classList.remove("underlined-img")
    minature.classList.add("underlined-img")
}
const minatureOnEdge = function(minature){
    const leftSwipe = document.getElementById("left")
    const rightSwipe = document.getElementById("right")
    const minatureLeftPosition = minature.getBoundingClientRect().left
    const minatureRightPosition = minature.getBoundingClientRect().right
    const minatureWidth = minature.getBoundingClientRect().width
    const wrapper = document.querySelector(".wrapper")
    const leftBoundary = wrapper.getBoundingClientRect().left
    const rightBoundary = wrapper.getBoundingClientRect().right
    const leftBorderDistance = Math.abs(leftBoundary - minatureLeftPosition)
    const rightBorderDistance = Math.abs(rightBoundary - minatureRightPosition)

    const allImagesDiv = document.querySelectorAll(".img-carousel img")
    if(leftSwipe.style.display === "flex"){
        if(leftBorderDistance < 1.5*minatureWidth){
            allImagesDiv.forEach(minature => moveMinature(minature, "double-left"))
            disableCarouselButtons()
        }
    }
    if(rightSwipe.style.display === "flex"){
        if(rightBorderDistance < 1.5*minatureWidth){
            allImagesDiv.forEach(minature => moveMinature(minature, "double-right"))
            disableCarouselButtons()
        }
    }
    
}
const updateSliderValue = function(ind) {
    const slider = document.querySelector(".carousel-slider")
    slider.value = ind
}
const selectImage = function(){
    const allImages = document.querySelectorAll(".img-carousel img")
    const mainImage = document.querySelector(".main-img img")
    const mainImageOverlay = document.querySelector(".overlay")
    allImages.forEach((minature, ind) => minature.addEventListener("click", ()=>{
        if(mainImage.src !== minatureToMainSRC(minature)){
            mainImageOverlay.style.display = "none"
            mainImage.src = minatureToMainSRC(minature)
            underlineMinature(minature)
            minatureOnEdge(minature)
            updateSliderValue(ind)
        } else{
            mainImageOverlay.style.display = "flex"
        }
    }))
}
const minatureDisplated = function(minature){
    const minatureLeftPosition = minature.getBoundingClientRect().left
    const minatureRightPosition = minature.getBoundingClientRect().right
    const minatureWidth = minature.getBoundingClientRect().width
    const wrapper = document.querySelector(".wrapper")
    const leftBoundary = wrapper.getBoundingClientRect().left
    const rightBoundary = wrapper.getBoundingClientRect().right
    const allImagesDiv = document.querySelectorAll(".img-carousel img")
    
    if(minatureLeftPosition < leftBoundary){
        const positionDifference = leftBoundary - minatureLeftPosition
        allImagesDiv.forEach(minature => moveMinature(minature, "custom", positionDifference))
        disableCarouselButtons()
    }else if(minatureRightPosition >= rightBoundary){
        const positionDifference = rightBoundary - minatureRightPosition - minatureWidth
        allImagesDiv.forEach(minature => moveMinature(minature, "custom", positionDifference))
        disableCarouselButtons()
    }
}
const ImageSlider = function() {
    const slider = document.querySelector(".carousel-slider")
    slider.addEventListener("input", () =>{
        if(slider.value%1 > 0.8 || slider.value%1 < 0.2){
            const mainImageOverlay = document.querySelector(".overlay")
            mainImageOverlay.style.display = "none"
            const allImages = document.querySelectorAll(".img-carousel img")
            const mainImage = document.querySelector(".main-img img")
            mainImage.src = minatureToMainSRC(allImages[Math.round(slider.value)])
            underlineMinature(allImages[Math.round(slider.value)])
            minatureDisplated(allImages[Math.round(slider.value)])
        }
    })
}
const moveMinature = function(minature, swipeID, custom){
    if(swipeID === "right"){
        minature.style.transform += "translateX(-50px)"
    }else if(swipeID === "left"){
        minature.style.transform += "translateX(50px)"
    }else if(swipeID === "double-left"){
        minature.style.transform += "translateX(100px)"
    }else if(swipeID === "double-right"){
        minature.style.transform += "translateX(-100px)"
    } else if(swipeID === "custom") {
        minature.style.transform = "translateX("+custom+"px)"
    } else if(swipeID === "initial"){
        minature.style.transform = null
    }
}
const disableCarouselButtons = function(){
    const leftSwipe = document.getElementById("left")
    const rightSwipe = document.getElementById("right")
    const allImagesDiv = document.querySelectorAll(".img-carousel img")
    const wrapper = document.querySelector(".wrapper")
    const firstMinature= allImagesDiv[0].getBoundingClientRect()
    const lastMinature = allImagesDiv[allImagesDiv.length-1].getBoundingClientRect()
    const leftBoundary = wrapper.getBoundingClientRect().left
    const rightBoundary = wrapper.getBoundingClientRect().right
    if(lastMinature.right < rightBoundary){
        rightSwipe.style.display = "none"
    } else {
        rightSwipe.style.display = "flex"
    }
    if(firstMinature.left > leftBoundary+5){
        leftSwipe.style.display = "none"
        allImagesDiv.forEach(minature => moveMinature(minature, "initial"))
    }else {
        leftSwipe.style.display = "flex"
    }
}
const moveCarouselImages = function(){ 
    const swipes = document.querySelectorAll(".swipe")
    swipes.forEach(swipe => swipe.addEventListener("click", ()=>{
        const allImagesDiv = document.querySelectorAll(".img-carousel img")
        allImagesDiv.forEach(minature=> moveMinature(minature, swipe.id))
        disableCarouselButtons()
    }))
}
const zoomInMainImage = function() {
    const mainImage = document.querySelector(".main-img img")
    const allMinatures = document.querySelector(".img-carousel")
    const overlay = document.querySelector(".zoomin-overlay")
    const closeOverlay = document.querySelector(".zoomin-overlay .close")

    const gameDiv = document.querySelector(".game-description")
    const gameDivNavBar = document.querySelector(".game-navbar")
    mainImage.addEventListener("click", () => {
        console.log(mainImage)
        overlay.style.display = "block"
        mainImage.style.zIndex = "1000"
        mainImage.style.maxWidth = "150%"
    })
    closeOverlay.addEventListener("click", () => {
        console.log("zoom-in main")
        overlay.style.display = "none"
        mainImage.style.zIndex = null
        mainImage.style.maxWidth = null

    })
}
const navInMainZoom = function(){
    const navInMainZoomRight = document.querySelector(".overlay-right")
    const navInMainZoomLeft = document.querySelector(".overlay-left")
    const currentMainImg = document.querySelector(".carousel-slider")

    const mainImage = document.querySelector(".main-img img")
    const allMinatures = document.querySelectorAll(".img-carousel img")


    navInMainZoomLeft.addEventListener("click", ()=>{
        console.log(currentMainImg.value)
        if(currentMainImg.value >= 1){
            navInMainZoomRight.classList.remove("overlay-button-disabled")
            currentMainImg.value-- 
            mainImage.src = minatureToMainSRC(allMinatures[currentMainImg.value])
            underlineMinature(allMinatures[currentMainImg.value])
            minatureOnEdge(allMinatures[currentMainImg.value])
            if(currentMainImg.value < 1){
                navInMainZoomLeft.classList.add("overlay-button-disabled")
            }
        }
    })
    navInMainZoomRight.addEventListener("click", ()=>{
        console.log(currentMainImg.value, allMinatures.length-1)
        if(currentMainImg.value < allMinatures.length-1){
            navInMainZoomLeft.classList.remove("overlay-button-disabled")
            console.log(allMinatures[currentMainImg.value].src)
            currentMainImg.value++
            mainImage.src = minatureToMainSRC(allMinatures[currentMainImg.value])
            underlineMinature(allMinatures[currentMainImg.value])
            minatureOnEdge(allMinatures[currentMainImg.value])
            if(currentMainImg.value >= allMinatures.length-1){
                navInMainZoomRight.classList.add("overlay-button-disabled")
            }
        }
    })
}
navInMainZoom()
zoomInMainImage()
moveCarouselImages()
ImageSlider()
renderImageSlider()
selectImage()