
const spaceId = "hpth0uulbqvw"
const environmentId = "master"
const accessToken = "mdsIAkZQUgeLOqVKG5Tk2UHvjpCa-rrj3crEMZzqQIM"


const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}`


const sectionTag = document.querySelector("section.grid")


const grabData = function () {
   return fetch (url)

    .then(response => response.json())
    .then(data =>{

        const assets = data.includes.Asset

        return data.items.map(item => {
            let imageUrl = "image1.jpg"

            const imageId = item.fields.image.sys.id

            const imageData = assets.find(asset => {
                return asset.sys.id = imageId
            })

            if (imageData) {
                imageUrl = imageData.fields.file.url
            }

            item.fields.image = imageUrl
            return item.fields
        })
    })
}

grabData().then(data => {

    console.log(data)

    sectionTag.innerHTML = ""

    data.forEach(item => {
        sectionTag.innerHTML = sectionTag.innerHTML + `
        <div class="item">
            <img src =  ${item.coffeeImage}>
            <div class = "title">
                <h2>${item.coffeeName}</h2>
                <p>${item.mainProperty}</p>
            </div>
            <p class="description">${item.propertyList}</p>
        </div>
        `
    })
})