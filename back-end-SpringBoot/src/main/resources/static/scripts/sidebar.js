const aNodes = document.querySelectorAll('.sidebar-nav a');
if (aNodes) {
    const active = document.querySelector(".sidebar-nav .active");
    if (active && !window.location.href.startsWith("http://localhost:8080/user/userRoles/")) {
        active.classList.remove("active");
    }
    for (const a of aNodes) {
        if (a.href === window.location.href) {
            const liParent = a.parentNode;
            liParent.classList.add('active');
            break;
        }
    }
}
const button = document.querySelector('#sidebar-toggle');
const wrapper = document.querySelector('#wrapper');
const brand = document.querySelector('.sidebar-brand');


button.addEventListener('click', function(e) {
    e.preventDefault();

    wrapper.classList.toggle('toggled');
    brand.style.display = brand.style.display === "none" ? "block" : "none";
});





