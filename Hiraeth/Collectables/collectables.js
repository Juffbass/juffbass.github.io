let collectablesFound = 0;
const totalCollectables = 4;
const inventory = new Set(JSON.parse(localStorage.getItem('inventory')) || []);
collectablesFound = inventory.size;

window.addEventListener('DOMContentLoaded', function () {
    const collectableAreas = document.querySelectorAll('a[href="#"]');
    const modal = document.getElementById('collectableModal');
    const closeBtn = document.querySelector('.close');
    const collectableMessage = document.getElementById('collectableMessage');
    const audio = new Audio('../Collectables/collectablefound.mp3');

    if (!modal) {
        console.error('Modal element not found');
        return;
    }

    modal.style.display = 'none';

    collectableAreas.forEach(area => {
        const title = area.getAttribute('title');
        if (inventory.has(title)) {
            area.querySelector('.image-mapper-shape').style.opacity = "0.5";
            area.querySelector('image').style.visibility = "visible";
        }

        area.addEventListener('click', function (event) {
            event.preventDefault();
            const title = this.getAttribute('title');
            console.log(`Clicked on: ${title}`);

            if (!inventory.has(title)) {
                inventory.add(title);
                collectablesFound++;
                localStorage.setItem('inventory', JSON.stringify([...inventory]));
                area.querySelector('.image-mapper-shape').style.opacity = "0.5";
                area.querySelector('image').style.visibility = "visible";
                audio.play();

                if (collectablesFound === totalCollectables) {
                    showCollectableMessage(true, title);
                } else {
                    showCollectableMessage(false, title);
                }
            } else {
                collectableMessage.textContent = `You already found ${title}`;
                modal.style.display = 'block';
                console.log('Modal should be displayed now');
                console.log(`Modal display property: ${modal.style.display}`);
            }
        });
    });

    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
        console.log('Modal closed');
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            console.log('Modal closed by clicking outside');
        }
    });

    window.addEventListener('keydown', function (event) {
        if (event.ctrlKey && event.shiftKey && event.key === 'S') {
            inventory.clear();
            localStorage.removeItem('inventory');
            collectablesFound = 0;
            collectableAreas.forEach(area => {
                area.querySelector('.image-mapper-shape').style.opacity = "1"; 
                area.querySelector('image').style.visibility = "hidden"; 
            });
            console.log('Inventory cleared');
        }
    });
});

function showCollectableMessage(allFound, title) {
    const imageSrc = `images/collectable_${title}.png`;
    const imageElement = `<img src="${imageSrc}" class="collectable-image" alt="${title}">`;
    if (allFound) {
        showModal(`${imageElement}You've found all collectables! ${collectablesFound}/${totalCollectables}. Screenshot this message and send it to Hira to get your reward!`);
    } else {
        showModal(`${imageElement}You've found a collectable! ${collectablesFound}/${totalCollectables}`);
    }
}

function showModal(message) {
    const modal = document.getElementById("collectableModal");
    const modalMessage = document.getElementById("collectableMessage");
    modalMessage.innerHTML = message;
    modal.style.display = "block";
    console.log(`Showing modal with message: ${message}`);
    console.log(`Modal display property: ${modal.style.display}`);
}
