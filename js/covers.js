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

    // Separate "Fun Extras" from the rest of the artists
    const funExtras = groupedArtists["Fun Extras"];
    delete groupedArtists["Fun Extras"];

    // Sort the remaining artists
    const sortedArtists = Object.entries(groupedArtists).sort((a, b) => {
        if (b[1].length === a[1].length) {
            return a[0].localeCompare(b[0]);
        }
        return b[1].length - a[1].length;
    });

    // Append sorted artists to the list
    for (const [artistName, covers] of sortedArtists) {
        const artistElem = document.createElement('div');
        artistElem.classList.add('artist');

        artistElem.innerHTML = `
            <h2>${artistName}</h2>
            <div class="covers">
                ${covers.map(cover => `
                    <div class="cover-item">
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

    // Append "Fun Extras" at the end if it exists
    if (funExtras) {
        const funExtrasElem = document.createElement('div');
        funExtrasElem.classList.add('artist');

        funExtrasElem.innerHTML = `
            <h2>Fun Extras</h2>
            <div class="covers">
                ${funExtras.map(cover => `
                    <div class="cover-item">
                        <h3>${cover.title}</h3>
                        <a href="${cover.videoUrl}" target="_blank">Watch Video</a>
                    </div>
                `).join('')}
            </div>
        `;

        // Add event listener to toggle visibility of covers
        funExtrasElem.querySelector('h2').addEventListener('click', () => {
            const coversDiv = funExtrasElem.querySelector('.covers');
            coversDiv.classList.toggle('show');
        });

        artistsList.appendChild(funExtrasElem);
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

    // Separate "Fun Extras" from the rest of the artists
    const funExtras = groupedArtists["Fun Extras"];
    delete groupedArtists["Fun Extras"];

    // Sort the remaining artists
    const sortedArtists = Object.entries(groupedArtists).sort((a, b) => {
        if (b[1].length === a[1].length) {
            return a[0].localeCompare(b[0]);
        }
        return b[1].length - a[1].length;
    });

    const artistsList = document.getElementById('artistsList');
    artistsList.innerHTML = '';

    // Append sorted artists to the list
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
                    <div class="cover-item">
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

    // Append "Fun Extras" at the end if it exists
    if (funExtras) {
        const funExtrasElem = document.createElement('div');
        funExtrasElem.classList.add('artist');

        funExtrasElem.innerHTML = 
            `<h2>Fun Extras</h2>
            <div class="covers">
                ${funExtras.map(cover => `
                    <div class="cover-item">
                        <h3>${cover.title}</h3>
                        <a href="${cover.videoUrl}" target="_blank">Watch Video</a>
                    </div>
                `).join('')}
            </div>`;

        // Add event listener to toggle visibility of covers
        funExtrasElem.querySelector('h2').addEventListener('click', () => {
            const coversDiv = funExtrasElem.querySelector('.covers');
            coversDiv.classList.toggle('show');
        });

        artistsList.appendChild(funExtrasElem);
    }
}

// Event listener for search input
document.getElementById('searchInput').addEventListener('input', search);

// Event listener for Enter key in the search input
document.getElementById('searchInput').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        search();
    }
});

// Initialize the artists list when the page loads
initializeArtists();

