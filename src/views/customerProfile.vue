<template>
  <!-- Home -->
  <div>
    <div class="home" style="height: 25rem;">
      <!-- <div class="parallax_background parallax-window" data-parallax="scroll"
        data-image-src='image_url' data-speed="0.8"></div> -->

      <img
        class="parallax_background parallax-window"
        data-parallax="scroll"
        data-speed="0.8"
        src="http://infinite-sierra-61577.herokuapp.com/images/properties.jpg"
        alt=""
      />
    </div>

    <!-- Home Search -->
    <div class="home_search">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="home_search_container">
              <div class="home_search_content">
                <form
                  method="post"
                  class="search_form d-flex flex-row align-items-start justfy-content-start"
                >
                  <div class="search_form_content row">
                    <div>
                      <select @change="saleSelect" class="search_form_select">
                        <option value="0">Sale/Rent</option>
                        <option value="1">Sale</option>
                        <option value="2">Rent</option>
                      </select>
                    </div>
                    <div>
                      <select @change="typeSelect" class="search_form_select">
                        <option value="0">All Types</option>
                        <option
                          :value="type.id"
                          v-for="type in types"
                          :key="type.id"
                        >
                          {{ type.type }}
                        </option>
                      </select>
                    </div>
                    <div>
                      <select @change="citySelect" class="search_form_select">
                        <option value="0">All Cities</option>
                        <option
                          :value="city.id"
                          v-for="city in cities"
                          :key="city.id"
                        >
                          {{ city.name }}
                        </option>
                      </select>
                    </div>
                    <div>
                      <select @change="roomsSelect" class="search_form_select">
                        <option value="0">Rooms</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">More Than 3</option>
                      </select>
                    </div>
                    <div>
                      <select @change="areaSelect" class="search_form_select">
                        <option value="0">Area</option>
                        <option value="50">From 50 <br />To 100m</option>
                        <option value="100">From 100 <br />To 200m</option>
                        <option value="200">From 200 <br />To 300m</option>
                        <option value="300">More Than 300m</option>
                      </select>
                    </div>
                    <div>
                      <select @change="priceSelect" class="search_form_select">
                        <option value="0">Price</option>
                        <option value="5000"
                          >From 5000 <br />To 50000L.E.</option
                        >
                        <option value="50000"
                          >From 50000 <br />To 200000L.E.</option
                        >
                        <option value="200000"
                          >From 200000 <br />To 1000000L.E.</option
                        >
                        <option value="1000000">More Than 1000000 L.E.</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="button"
                    @click="searrrch(1)"
                    class="search_form_button ml-auto"
                  >
                    search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Properties -->
    <div class="properties">
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
        </div>
        <div class="row" id="propsPart">
          <div class="col-lg-12 mt-5 pt-5">
            <div class="section_title">
              {{ numItems }} Properties found distributed on all pages
            </div>
            <div class="section_subtitle">Search your dream home</div>
          </div>
        </div>
        <div class="row properties_row">
          <div
            class="col-xl-4 col-lg-6 property_col"
            v-for="prop in props"
            :key="prop.id"
          >
            <div class="property">
              <singleProp :type="''" :propID="prop.id" @someEvent="ChildrenEvent" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="pagination">
              <ul>
                <li
                  v-for="n in numPagesArr"
                  :key="n"
                  :class="{ active: isActive(n) }"
                >
                  <router-link
                    :to="'/customerProfile/' + id"
                    @click.native="relood(n)"
                    >0{{ n }}.</router-link
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import singleProp from "../components/singleProp";
export default {
  name: "customerProfile",
  data: function() {
    return {
      id: "",
      numItems: "",
      props: "",
      numPagesArr: [],
      numPages: "",
      page: "",
      cities: [],
      types: [],
      sale: 0,
      type: 0,
      city: this.$cookies.get("city"),
      rooms: 0,
      area: 0,
      price: 0,
    };
  },
  components: {
    singleProp,
  },
  mounted() {
    this.getTypes();
    this.getCities();
    this.page = 1;
    console.log(this.$route.params.id);
    console.log(this.$cookies.get("id"));
    this.id = this.$route.params.id;
    this.searrrch(1)
      .then((response) => {
        console.log(response);
        this.numItems = response.data.items;
        this.props = response.data.data.data;
        this.numPages = Math.ceil(response.data.pages);
        for (let i = 0; i < this.numPages; i++) {
          this.numPagesArr[i] = i + 1;
        }
      })
      .catch();
  },
  methods: {
    saleSelect(event) {
      this.sale = event.target.value;
    },
    priceSelect(event) {
      this.price = event.target.value;
    },
    areaSelect(event) {
      this.area = event.target.value;
    },
    typeSelect(event) {
      this.type = event.target.value;
    },
    citySelect(event) {
      this.city = event.target.value;
    },
    roomsSelect() {
      this.rooms = event.target.value;
    },
    searrrch(page) {
      let formData = {
        sale: this.sale,
        type: this.type,
        city: this.city,
        rooms: this.rooms,
        area: this.area,
        price: this.price,
      };
      axios
        .post(
          `https://infinite-sierra-61577.herokuapp.com/api/search?page=${page}`,
          formData
        )
        .then((response) => {
          console.log(response);
          this.page = 1;
          this.numItems = response.data.items;
          this.props = response.data.data.data;
          this.numPages = Math.ceil(response.data.pages);
          this.numPagesArr = [];
          for (let i = 0; i < this.numPages; i++) {
            this.numPagesArr[i] = i + 1;
          }
        })
        .catch();
    },
    getTypes() {
      axios
        .get("https://infinite-sierra-61577.herokuapp.com/api/type")
        .then((res) => {
          console.log(res);
          this.types = res.data;
          console.log(this.types);
        });
    },
    getCities() {
      axios
        .get("https://infinite-sierra-61577.herokuapp.com/api/city")
        .then((res) => {
          this.cities = res.data;
        });
    },
    relood(n) {
      console.log("dsa");
      this.searrrch(n)
        .then((response) => {
          console.log(response);
          this.page = n;
          this.numItems = response.data.items;
          this.props = response.data.data.data;
          this.numPages = Math.ceil(response.data.pages);
          for (let i = 0; i < this.numPages; i++) {
            this.numPagesArr[i] = i + 1;
          }
        })
        .catch();
    },
    ChildrenEvent() {
      this.searrrch(this.page)
        .then((response) => {
          console.log(response);
          this.numItems = response.data.items;
          this.props = response.data.data.data;
          this.numPages = Math.ceil(response.data.pages);
          for (let i = 0; i < this.numPages; i++) {
            this.numPagesArr[i] = i + 1;
          }
        })
        .catch();
    },
    isActive(n) {
      console.log(n);
      console.log(this.page);
      console.log(n == this.page);
      if (n == this.page) {
        return "active";
      }
      return "";
    },
  },
};
</script>
