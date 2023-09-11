const spaceId = "hpth0uulbqvw"
const environmentId = "master"
const accessToken = "mdsIAkZQUgeLOqVKG5Tk2UHvjpCa-rrj3crEMZzqQIM"

const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}`

console.log(url)

const sectionTag = document.querySelector("section.grid")

const grabData = function () {

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            const assets = data.includes.Asset

            return data.items.map(item => {
                const imageId = item.fields.image.sys.id
                const imageData = assets.find(asset => asset.sys.id === imageId)

                let imageUrl = ""
                if (imageData) {
                    imageUrl = imageData.fields.file.url
                }

                if (imageUrl.startsWith('//')) {
                    imageUrl = 'https:' + imageUrl
                }

                console.log(imageUrl)

                return {
                    ...item.fields,
                    image: imageUrl
                    
                }
            })
        })
}



grabData().then(data => {
    const content = data.map(item => `
        <div class="item-container hidden">    
            <div class="item" data-main-property="${item.mainProperty}">
                <div class="image"><img src="${item.image}"></div>
                <div class="title">
                    <h2>${item.coffeeName}</h2>
                    <p>${item.mainProperty}</p>
                </div>
                <p class="description">${item.propertyList2}</p>
            </div>
        </div>
    `).join('');

    sectionTag.innerHTML = content;

    const uniqueProperties = new Set(data.map(item => item.mainProperty));

    uniqueProperties.forEach(property => {
        const button = document.createElement("button");
        button.innerText = property;
        button.className = `filter-${property.toLowerCase()}`;
        document.getElementById("filter").appendChild(button);

        setupObserverWhenHeadersReady();
    });

    
    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    let lastClickedButton = null;

    document.querySelectorAll("#filter button").forEach(button => {
        button.addEventListener('click', function(event) {
            const selectedProperty = toTitleCase(event.target.innerText);
            
            if (lastClickedButton === event.target) {
                showAllItems();
                lastClickedButton = null;
                return;
            }

            const allItems = document.querySelectorAll(".item-container");
            allItems.forEach(container => {
                const item = container.querySelector('.item');
                const itemProperty = item.getAttribute('data-main-property');

                if (itemProperty === selectedProperty) {
                    container.classList.remove('hidden');
                } else {
                    container.classList.add('hidden');
                }
            });

            lastClickedButton = event.target;
        });
    });

    function showAllItems() {
        const allItems = document.querySelectorAll(".item-container");
        allItems.forEach(container => container.classList.remove('hidden'));
    }
    
    showAllItems();
});

