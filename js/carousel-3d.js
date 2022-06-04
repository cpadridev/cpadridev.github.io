const galleryContainer = document.querySelector(".gallery-container");
const galleryControlsContainer = document.querySelector(".gallery-controls");
const galleryControls = ["previous", /*'add'*/, , "next"];
const galleryItems = document.querySelectorAll(".gallery-item");

class Carousel {
  constructor(container, items, controls) {
    this.carouselContainer = container;
    this.carouselControls = controls;
    this.carouselArray = [...items];
  }

  // Update css classes for gallery
  updateGallery() {
    this.carouselArray.forEach((el) => {
      el.classList.remove("gallery-item-1");
      el.classList.remove("gallery-item-2");
      el.classList.remove("gallery-item-3");
      el.classList.remove("gallery-item-4");
      el.classList.remove("gallery-item-5");
      el.classList.remove("gallery-item-5");
    });

    this.carouselArray.slice(0, 5).forEach((el, i) => {
      el.classList.add(`gallery-item-${i + 1}`);
    });

    var index =
      document.getElementsByClassName("gallery-item-3")[0].id;

    if (index == "1") {
      document.getElementById("description-project").innerHTML =
        "Una web para de una aplicacion de moda que comprueba la compatibilidad de los colores de la ropa que llevas puesta, y te recomienda la ropa que te puede encajar.";

      document.getElementById("tags").innerHTML =
        '<span class="tag">HTML</span> <span class="tag">CSS</span> <span class="tag">JavaScript</span>';

      document.getElementById("linkProjectDemo").href = "https://cpadridev.github.io/fime/";
      document.getElementById("linkProjectRepo").href = "https://github.com/cpadridev/fime";
    };

    if (index == "2") {
      document.getElementById("description-project").innerHTML =
        "Proximamente ...";

      document.getElementById("tags").innerHTML =
        '';

      document.getElementById("linkProjectDemo").href = "";
      document.getElementById("linkProjectRepo").href = "";
    };
  }

  // Update the current order of the carouselArray and gallery
  setCurrentState(direction) {
    if (direction.className == "gallery-controls-previous") {
      this.carouselArray.unshift(this.carouselArray.pop());
    } else {
      this.carouselArray.push(this.carouselArray.shift());
    }

    this.updateGallery();
  }

  // Construct the carousel navigation
  // setNav() {
  // galleryContainer.appendChild(document.createElement('ul')).className = 'gallery-nav';

  // this.carouselArray.forEach(item => {
  //   const nav = galleryContainer.lastElementChild;
  //   nav.appendChild(document.createElement('li'));
  // });
  // }

  // Construct the carousel controls
  setControls() {
    this.carouselControls.forEach((control) => {
      galleryControlsContainer.appendChild(
        document.createElement("button")
      ).className = `gallery-controls-${control}`;

      document.querySelector(`.gallery-controls-${control}`).innerText =
        control;
    });
  }

  // Add a click event listener to trigger setCurrentState method to rearrange carousel
  useControls() {
    const triggers = [...galleryControlsContainer.childNodes];

    triggers.forEach((control) => {
      control.addEventListener("click", (e) => {
        e.preventDefault();

        if (control.className == "gallery-controls-add") {
          const newItem = document.createElement("img");
          const latestItem = this.carouselArray.length;
          const latestIndex =
            this.carouselArray.findIndex(
              (item) =>
                item.getAttribute("data-index") == this.carouselArray.length
            ) + 1;

          // Assign the necessary properties for new gallery item
          Object.assign(newItem, {
            className: "gallery-item",
            src: `http://fakeimg.pl/300/?text=${this.carouselArray.length + 1}`,
            alt: `${this.carouselArray.length + 1}`,
            title: `${this.carouselArray.length + 1}`,
          });
          newItem.setAttribute("data-index", this.carouselArray.length + 1);

          // Then add it to the carouselArray and update the gallery
          this.carouselArray.splice(latestIndex, 0, newItem);
          document.querySelector(`[data-index="${latestItem}"]`).after(newItem);
          this.updateGallery();
        } else {
          this.setCurrentState(control);
        }
      });
    });
  }
}

const exampleCarousel = new Carousel(
  galleryContainer,
  galleryItems,
  galleryControls
);

exampleCarousel.setControls();
// exampleCarousel.setNav();
exampleCarousel.useControls();