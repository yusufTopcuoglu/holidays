let holidays
let selectedCountry = 'turkey';
let selectedYear = 2024


fetch('./holidays.json')
    .then((response) => response.json())
    .then(data => {
        holidays = data
        setMainContent();
    }
)


function showYear(year) {
    selectedYear = year

    setMainContent()
}

function updateCountry() {
    const countrySelect = document.getElementById('country-select');
    const yearSelect = document.getElementById('year-select');
    selectedCountry = countrySelect.value;
    selectedYear = yearSelect.value;

    setMainContent()
}

function setMainContent() {
    const mainContent = document.getElementById('main-content');
    const yearHolidays = holidays[selectedCountry][selectedYear];

    if (yearHolidays) {
        mainContent.innerHTML = `
            <h2>Türkiyedeki resmi tatil günleri ${selectedYear}</h2>
            <ul class="styled-list">
                ${yearHolidays.map(holiday =>
            `<li class="list-item">
                        <div class="item-header">${holiday.name}</div>
                        <div class="item-description">
                            <ul>
                                ${holiday.date.map(dateVal => `<li>${dateVal}</li>`).join('')}
                            </ul>
                        </div>
                    </li>
                    `)
            .join('')}
            </ul>
        `;
    } else {
        mainContent.innerHTML = `<h2>No holidays found for ${selectedYear} (${selectedCountry.toUpperCase()})</h2>`;
    }
}