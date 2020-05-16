<template>
  <div>
    <!-- Home -->

    <div class="home">
      <!-- <div class="parallax_background parallax-window" data-parallax="scroll" data-image-src='image_url' data-speed="0.8"></div> -->
      <img
        class="parallax_background parallax-window"
        data-parallax="scroll"
        data-speed="0.8"
        src="../assets/images/properties.jpg"
        alt=""
      />
      <div class="home_container">
        <div class="container row justify-content-center">
          <button
            type="button"
            class="btn btn-primary btn-block col-md-10 col-12 ml-4"
            data-toggle="modal"
            data-target="#add_images_modal"
          >
            Add Images For Your Property
          </button>
          <button
            type="button"
            class="btn btn-primary btn-block col-md-10 col-12 ml-4"
          >
            Add Features For Your Property
          </button>
          <button
            type="button"
            class="btn btn-primary btn-block col-md-10 col-12 ml-4"
            data-toggle="modal"
            data-target="#map_modal"
          >
            Add/Update Location On Google Map
          </button>
        </div>
      </div>
    </div>

    <!-- Intro -->

    <div class="intro">
      <div class="container">
        <div class="row">
          <div class="col">
            <div
              class="intro_content d-flex flex-lg-row flex-column align-items-start justify-content-start"
            >
              <div class="intro_title_container">
                <div class="intro_title">{{ prop.title }}</div>
                <div class="intro_tags">
                  <ul>
                    <li v-for="feature in propFeatures" :key="feature.id">
                      <a>{{ feature.feature }}</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                class="intro_price_container ml-lg-auto d-flex flex-column align-items-start justify-content-center"
              >
                <div>For Sale</div>
                <div class="intro_price">${{ prop.price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="intro_slider_container col-lg-8"
        id="carousel"
        style="height: 30rem;"
      >
        <div
          id="carouselExampleControls"
          class="carousel slide"
          data-ride="carousel"
        >
          <div class="carousel-inner">
            <div
              v-for="image in propImages"
              :key="image.id"
              class="carousel-item"
              :class="{ active: isActive(image) }"
            >
              <img
                style="height: 30rem; width: 40rem;"
                :src="
                  'https://festive-exchanges.000webhostapp.com/images/' +
                    image.image
                "
                alt="sorry"
              />
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Property -->

    <div class="property">
      <div class="container">
        <div class="row">
          <!-- Sidebar -->

          <div class="col-lg-4">
            <div class="sidebar">
              <!-- Realtor -->
              <div class="sidebar_realtor">
                <div class="sidebar_realtor_image">
                  <img src="../assets/images/sidebar_realtor.jpg" alt="" />
                </div>
                <div class="sidebar_realtor_body text-center">
                  <div class="sidebar_realtor_title">
                    <a href="#">Maria Williams</a>
                  </div>
                  <div class="sidebar_realtor_subtitle">Senior Realtor</div>
                  <div class="sidebar_realtor_phone">
                    <span>call us: </span>01200456730
                  </div>
                  <div class="realtor_link"><a href="#">+</a></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Property Content -->
          <div class="col-lg-7 offset-lg-1">
            <div class="property_content">
              <div class="property_icons">
                <div class="property_title">Extra Facilities</div>
                <div class="property_text property_text_1">
                  <p>
                    Donec ullamcorper nulla non metus auctor fringi lla.
                    Curabitur blandit tempus porttitor.
                  </p>
                </div>
                <div
                  class="property_rooms d-flex flex-sm-row flex-column align-items-start justify-content-start"
                >
                  <!-- Property Room Item -->
                  <div class="property_room">
                    <div class="property_room_title">Bedrooms</div>
                    <div
                      class="property_room_content d-flex flex-row align-items-center justify-content-start"
                    >
                      <div class="room_icon">
                        <img src="../assets/images/room_1.png" alt="" />
                      </div>
                      <div class="room_num">4</div>
                    </div>
                  </div>

                  <!-- Property Room Item -->
                  <div class="property_room">
                    <div class="property_room_title">Bathrooms</div>
                    <div
                      class="property_room_content d-flex flex-row align-items-center justify-content-start"
                    >
                      <div class="room_icon">
                        <img src="../assets/images/room_2.png" alt="" />
                      </div>
                      <div class="room_num">3</div>
                    </div>
                  </div>

                  <!-- Property Room Item -->
                  <div class="property_room">
                    <div class="property_room_title">Area</div>
                    <div
                      class="property_room_content d-flex flex-row align-items-center justify-content-start"
                    >
                      <div class="room_icon">
                        <img src="../assets/images/room_3.png" alt="" />
                      </div>
                      <div class="room_num">7100 Sq Ft</div>
                    </div>
                  </div>

                  <!-- Property Room Item -->
                  <div class="property_room">
                    <div class="property_room_title">Patio</div>
                    <div
                      class="property_room_content d-flex flex-row align-items-center justify-content-start"
                    >
                      <div class="room_icon">
                        <img src="../assets/images/room_4.png" alt="" />
                      </div>
                      <div class="room_num">1</div>
                    </div>
                  </div>

                  <!-- Property Room Item -->
                  <div class="property_room">
                    <div class="property_room_title">Garage</div>
                    <div
                      class="property_room_content d-flex flex-row align-items-center justify-content-start"
                    >
                      <div class="room_icon">
                        <img src="../assets/images/room_5.png" alt="" />
                      </div>
                      <div class="room_num">2</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Description -->

              <div class="property_description">
                <div class="property_title">Description</div>
                <div class="property_text property_text_2">
                  <p>
                    Donec ullamcorper nulla non metus auctor fringi lla.
                    Curabitur blandit tempus porttitor.Sed lectus urna,
                    ultricies sit amet risus eget, euismod imperdiet augue. Duis
                    imperdiet, purus a pellentesque sodales, sapien mauris
                    rhoncus eros, ac blandit elit leo ac diam. Sed lectus urna,
                    ultricies sit amet risus eget, euismod imperdiet augue. Duis
                    imperdiet, purus a pellentesque sodales, sapien mauris
                    rhoncus eros, ac blandit elit leo ac diam
                  </p>
                </div>
              </div>

              <div class="property_map">
                <div class="property_title">Property on map</div>
                <div class="property_map_container">
                  <!-- Google Map -->
                  <div id="google_map" class="google_map">
                    <div class="map_container">
                      <div id="map" style="width: 100%; height: 500px;">

                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <addImages :propID="id" />
    <maap />
  </div>
</template>

<script>


import axios from "axios";
import addImages from "@/components/modals/addImages";
import maap from "@/components/modals/map";

export default {
  name: "propDetails",
  data: function() {
    return {
      prop: [],
      propFeatures: [],
      propImages: [],
      id: this.$route.params.id,
    };
  },
  mounted() {
    console.log(this.$route.params.id);
    this.id = this.$route.params.id;
    axios
      .get(`https://infinite-sierra-61577.herokuapp.com/api/getProp/${this.id}`)
      .then((res) => {
        console.log(res);
        this.prop = res.data;
      })
      .catch();
    axios
      .get(`https://infinite-sierra-61577.herokuapp.com/api/image/${this.id}`)
      .then((res) => {
        console.log(res);
        this.propImages = res.data;
      })
      .catch();
    axios
      .get(`https://infinite-sierra-61577.herokuapp.com/api/feature/${this.id}`)
      .then((res) => {
        console.log(res);
        this.propFeatures = res.data;
      })
      .catch();
  },
  methods: {
    isActive(image) {
      return image === this.propImages[0];
    },
  },
  components: {
    addImages,
    maap,
  },
};
</script>
