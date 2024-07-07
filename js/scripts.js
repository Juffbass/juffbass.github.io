
function toggleMenu() {
    var menu = document.getElementById('mobile-menu');
    menu.classList.toggle('menu-open');
}

document.querySelectorAll('.extra-card').forEach(card => {
    card.addEventListener('click', () => {
        window.open(card.getAttribute('data-link'), '_blank');
    });
});
