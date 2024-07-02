
document.getElementById('mobile-menu').addEventListener('click', function() {
    document.querySelector('.navbar').classList.toggle('active');
});

document.querySelectorAll('.extra-card').forEach(card => {
    card.addEventListener('click', () => {
        window.open(card.getAttribute('data-link'), '_blank');
    });
});
