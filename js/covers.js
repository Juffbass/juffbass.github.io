// Function to fetch JSON data asynchronously
async function fetchArtists() {
    try {
        const response = await fetch('artists.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching artists data:', error);
        return []; // Return an empty array if there's an error
    }
}

// Function to initialize the artists list
async function initializeArtists() {
    const artistsList = document.getElementById('artistsList');
    artistsList.innerHTML = '';

    const artistData = await fetchArtists();

    artistData.forEach(artist => {
        const artistElem = document.createElement('div');
        artistElem.classList.add('artist');

        artistElem.innerHTML = `
            <h2>${artist.name}</h2>
            <div class="covers">
                ${artist.covers.map(cover => `
                    <div>
                        <h3>${cover.title}</h3>
                        <a href="${cover.videoUrl}" target="_blank">
                            <img src="${cover.thumbnail}" alt="Thumbnail">
                        </a>
                    </div>
                `).join('')}
            </div>
        `;

        artistsList.appendChild(artistElem);
    });
}

// Function to perform search
function search() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();

    if (searchInput === '') {
        initializeArtists(); // Show all artists if search input is empty
        return;
    }

    fetchArtists().then(artistData => {
        const filteredArtists = artistData.filter(artist => artist.name.toLowerCase().includes(searchInput));

        const artistsList = document.getElementById('artistsList');
        artistsList.innerHTML = '';

        filteredArtists.forEach(artist => {
            const artistElem = document.createElement('div');
            artistElem.classList.add('artist');

            artistElem.innerHTML = `
                <h2>${artist.name}</h2>
                <div class="covers">
                    ${artist.covers.map(cover => `
                        <div>
                            <h3>${cover.title}</h3>
                            <a href="${cover.videoUrl}" target="_blank">
                                <img src="${cover.thumbnail}" alt="Thumbnail">
                            </a>
                        </div>
                    `).join('')}
                </div>
            `;

            artistsList.appendChild(artistElem);
        });
    }).catch(error => {
        console.error('Error fetching artists data:', error);
    });
}

// Initial call to load all artists
initializeArtists();
