const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => showCategories(data.categories));
}

const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => showVideos(data.videos));
}




const showCategories = (categories) => {

    categories.forEach(category => {
        const container = document.getElementById("categories");
        const div = document.createElement("div");
        div.innerHTML = `
        <button class="px-8 py-2 btn hover:bg-[#ff1f3d] hover:text-white">${category.category}</button>
        `
        container.appendChild(div);
    })
}

const showVideos = (videos) => {
    // console.log(videos);
    const videoContainer = document.getElementById("video-container");
    videos.forEach(video => {
        const div = document.createElement("div");
        // console.log(video.authors[0].profile_picture);
        div.innerHTML = `
<div class="card bg-base-100 h-full shadow-sm">
    <figure>
        <img src="${video.thumbnail}" alt="Thumbnail" />
    </figure>
    <div class="card-body">
        <div class="flex justify-between gap-5">
           <figure>
              <img class=" w-16 rounded-full" src="${video.authors[0].profile_picture}" alt="Author" />
            </figure>
            <div class="flex-1 flex flex-col gap-2">
            <h2 class="card-title text-bold">${video.title}</h2>
            <p>${video.authors[0].profile_name}</p>
            <p class="">${video.others.views} views</p>
            </div>
        </div>
    </div>
    <div class="card-actions justify-end m-2">
        <button class="btn btn-primary">Play Now</button>
    </div>
</div>
</div>

        `
        videoContainer.append(div);
    })

}

loadCategories();
loadVideos();