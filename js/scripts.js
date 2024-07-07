
document.addEventListener('DOMContentLoaded', function() {
    var mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.addEventListener('click', function() {
        this.classList.toggle('open');
    });
});
