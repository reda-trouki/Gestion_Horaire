const messageBox = document.querySelector('.msg')
if(messageBox){
    setTimeout(() => {
        messageBox.classList.add('hide')
    }, 1700)
}
function passUserId(id) {
    const link = document.getElementById("deleteLink")
    if(link) link.href = `/user/supprimerUser/${id}`
}
const modifyUser = (id, userNom) => {
    const nameInput = document.getElementById("modifiedUserName")
    const form = document.getElementById("modifyUserForm")
    if(nameInput && form){
        nameInput.value = userNom
        form.action = "/user/modify/" + id
    }
}
const triggerSelectRoleModal = (userId) => {
    const hiddenUserIdInput = document.getElementById("userIdHiddenInput");
    if(hiddenUserIdInput){
        hiddenUserIdInput.value = userId;
    }
}


