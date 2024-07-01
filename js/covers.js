// Function to fetch JSON data asynchronously
async function fetchArtists() {
    try {
        const response = await fetch('js/artists.json');
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
    const groupedArtists = groupByArtist(artistData);

    const sortedArtists = Object.entries(groupedArtists).sort((a, b) => {
        if (b[1].length === a[1].length) {
            return a[0].localeCompare(b[0]);
        }
        return b[1].length - a[1].length;
    });

    for (const [artistName, covers] of sortedArtists) {
        const artistElem = document.createElement('div');
        artistElem.classList.add('artist');

        artistElem.innerHTML = `
            <h2>${artistName}</h2>
            <div class="covers">
                ${covers.map(cover => `
                    <div>
                        <h3>${cover.title}</h3>
                        <a href="${cover.videoUrl}" target="_blank">Watch Video</a>
                    </div>
                `).join('')}
            </div>
        `;

        // Add event listener to toggle visibility of covers
        artistElem.querySelector('h2').addEventListener('click', () => {
            const coversDiv = artistElem.querySelector('.covers');
            coversDiv.classList.toggle('show');
        });

        artistsList.appendChild(artistElem);
    }
}

// Helper function to group artist data by name
function groupByArtist(data) {
    return data.reduce((acc, curr) => {
        if (!acc[curr.name]) {
            acc[curr.name] = [];
        }
        acc[curr.name].push(curr);
        return acc;
    }, {});
}

// Function to perform search
async function search() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    const artistData = await fetchArtists();

    // Filter artists based on the search input
    const filteredArtists = artistData.filter(artist =>
        artist.name.toLowerCase().includes(searchInput)
    );

    // Filter tracks based on the search input
    const filteredTracks = artistData.filter(artist =>
        !artist.name.toLowerCase().includes(searchInput) &&
        artist.title.toLowerCase().includes(searchInput)
    );

    const groupedArtists = groupByArtist(filteredArtists.concat(filteredTracks));

    const sortedArtists = Object.entries(groupedArtists).sort((a, b) => {
        if (b[1].length === a[1].length) {
            return a[0].localeCompare(b[0]);
        }
        return b[1].length - a[1].length;
    });

    const artistsList = document.getElementById('artistsList');
    artistsList.innerHTML = '';

    for (const [artistName, covers] of sortedArtists) {
        const artistElem = document.createElement('div');
        artistElem.classList.add('artist');

        const hasMatchingTrack = covers.some(cover =>
            cover.title.toLowerCase() === searchInput
        );

        artistElem.innerHTML = `
            <h2>${artistName}</h2>
            <div class="covers ${hasMatchingTrack ? 'show' : ''}">
                ${covers.map(cover => `
                    <div>
                        <h3>${cover.title}</h3>
                        <a href="${cover.videoUrl}" target="_blank">Watch Video</a>
                    </div>
                `).join('')}
            </div>
        `;

        // Add event listener to toggle visibility of covers
        artistElem.querySelector('h2').addEventListener('click', () => {
            const coversDiv = artistElem.querySelector('.covers');
            coversDiv.classList.toggle('show');
        });

        artistsList.appendChild(artistElem);
    }
}

// Event listener for search input to update search results in real-time
document.getElementById('searchInput').addEventListener('input', search);

// Event listener for Enter key to perform search
document.getElementById('searchInput').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        search();
    }
});

// Initial call to load all artists
initializeArtists();
