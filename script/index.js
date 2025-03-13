function removeActiveclass() {
    const activeBtn = document.getElementsByClassName('active');
    for (let btn of activeBtn) {
        btn.classList.remove("active");
    }
}
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => showCategories(data.categories));
}

const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => {
            document.getElementById("allBtn").classList.add("active");
            showVideos(data.videos);
        })
};

const loadCategoryVideo = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    fetch(url)
        .then(res => (res.json()))
        .then(data => {
            removeActiveclass();
            const activeBtn = document.getElementById(`btn-${id}`);
            activeBtn.classList.add("active");
            showVideos(data.category)
        });
    ;
}


const showCategories = (categories) => {

    categories.forEach(category => {
        const container = document.getElementById("categories");
        const div = document.createElement("div");
        div.innerHTML = `
        <button id="btn-${category.category_id}" onclick="loadCategoryVideo(${category.category_id})" class="px-8 py-2 btn hover:bg-[#ff1f3d] hover:text-white">${category.category}</button>
        `
        container.appendChild(div);
    })
}

const showVideos = (videos) => {

    // console.log(videos);
    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = '';

    if (videos.length === 0) {
        videoContainer.innerHTML = `
          <section class="col-span-12 my-20 flex flex-col justify-center items-center">
                <img class="w-40" src="assets/Icon.png" alt="">
                <h2 class="pt-5 text-3xl font-bold">Opps! no vidoe available on this page.</h2>
            </section>
        `;
        return;
    }


    videos.forEach(video => {
        const div = document.createElement("div");
        // console.log(video.authors[0].profile_picture);
        div.innerHTML = `
<div class="card bg-base-100 h-full shadow-sm">
    <figure>
        <img class="w-full h-[200px] object-cover" src="${video.thumbnail}" alt="Thumbnail" />
    </figure>
    <div class="card-body">
        <div class="flex justify-between gap-5">
           <figure>
              <img class="w-16 rounded-full" src="${video.authors[0].profile_picture}" alt="Author" />
            </figure>
            <div class="flex-1 flex flex-col gap-2">
            <h2 class="card-title text-bold">${video.title}</h2>
            <p class="text-gray-400 flex gap-2">${video.authors[0].profile_name} <img class="w-[20px]" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"/></p>
            <p class="text-gray-400">${video.others.views} views</p>
            </div>
        </div>
    </div>
</div>
</div>

        `
        videoContainer.append(div);
    })

}

loadCategories();