document.addEventListener("DOMContentLoaded", () => {
    const taskBoxes = document.getElementsByClassName("box")
    const colors = ["red", "orange", "blue", "cyan"]
    if(taskBoxes){
        let i
        [...taskBoxes].map((taskBox, index) => {
            if(index % 4 === 0) i = 0
            taskBox.classList.add(colors[i])
            console.log(`index of box: ${index}, i: ${i}`)
            i++
        })
    }
})
const messageBox = document.querySelector('.msg')
if(messageBox){
    setTimeout(() => {
        messageBox.classList.add('hide')
    }, 1700)
}