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
    console.log(data)

    const content = data.map(item => `
        <div class="item">
            <img src="${item.image}">
            <div class="title">
                <h2>${item.coffeeName}</h2>
                <p>${item.mainProperty}</p>
            </div>
            <p class="description">${item.propertyList2}</p>
        </div>
    `).join('');

    sectionTag.innerHTML = content;
})

/*
const spaceId = "hpth0uulbqvw"
const environmentId = "master"
const accessToken = "mdsIAkZQUgeLOqVKG5Tk2UHvjpCa-rrj3crEMZzqQIM"


const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}`

console.log(url)

const sectionTag = document.querySelector("section.grid")


const grabData = function () {
   return fetch (url)

    .then(response => response.json())
    .then(data => {

        const assets = data.includes.Asset

        return data.items.map(items => {

            let imageUrl = ${item.image}

            const imageId = items.fields.image.sys.id

            const imageData = assets.find(asset => {
                asset.sys.id == imageId
            })

            if (imageData) {
                imageUrl = imageData.fields.file.url
            }
           
            items.fields.image = imageUrl

                if (imageUrl.startsWith('//')) {
                        imageUrl = imageUrl.split('//').join('https://')
                        }

            console.log(imageUrl)

            return items.fields
        })
    })
}

grabData().then(data => {

    console.log(data)
    sectionTag.innerHTML = ""

    data.forEach(item => {
        sectionTag.innerHTML = sectionTag.innerHTML + `
        <div class="item">
                <img src = "${item.image}">
            <div class = "title">
                <h2>${item.coffeeName}</h2>
                <p>${item.mainProperty}</p>
            </div>
            <p class="description">${item.propertyList2}</p>
        </div>
        `
    })
})
*/