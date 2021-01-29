const auth = "563492ad6f917000010000010f144a9b10924fe3964586361790a2ab";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const submitButton = document.querySelector(".submit-btn");
let searchValue;

function handleEvent(event) {
  event.preventDefault();
}
submitButton.addEventListener("click", handleEvent);

searchInput.addEventListener("input", updateInput);

function updateInput(e) {
  searchValue = e.target.value;
}
async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}
function generatePictures(data) {
  // Dodawanie obrazów
  data.photos.forEach((photo) => {
    console.log(photo);
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `<img src=${photo.src.large}>
    <div class="textAndDownload">
    <p>${photo.photographer}</p>
    <a href=${photo.src.original}> Download </a>
    </div>`;
    gallery.appendChild(galleryImg);
  });
}
async function curatedPhotos() {
  // Dodanie zdjęć po załadowaniu strony
  // https://api.pexels.com/v1/curated?per_page=
  const data = await fetchApi("https://api.pexels.com/v1/curated?per_page=");
  generatePictures(data);
}

async function searchPhotos(query) {
  clear(); // Czyszczenie starych zdjęć i pola wyszukiwania
  const data = await fetchApi(
    `https://api.pexels.com/v1/search?query=${query}&per_page=15`
  );
  generatePictures(data);
}
function clear() {
  // Czyszczenie starych zdjęć i pola wyszukiwania
  gallery.innerHTML = "";
  searchInput.value = "";
}
curatedPhotos(); // Wygenerowanie zdjęć od razu po wejsciu
submitButton.addEventListener("click", function () {
  searchPhotos(searchValue);
});
