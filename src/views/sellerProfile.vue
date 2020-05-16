<template>
  <div>
    <!-- Home -->

    <div class="home">
      <img
        class="parallax_background parallax-window"
        data-parallax="scroll"
        data-speed="0.8"
        src="../assets/images/properties.jpg"
        alt=""
      />
      <div class="home_container">
        <div class="container">
          <div class="row">
            <div class="col">
              <div
                class="home_content d-flex flex-row align-items-end justify-content-start"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Properties -->

    <div class="properties">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="section_title">{{ numItems }} Properties found</div>
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
              <singleProp :type="'admin'" :propID="prop.id" @someEvent="ChildrenEvent" />
            </div>
          </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="pagination">
                    <ul>
                        <li v-for="n in numPagesArr" :key="n" :class="{active : isActive(n)}">
                          <router-link  :to="'/sellerProfile/'+id"   @click.native="relood(n)">0{{n}}.</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  <addProp @addPropEvent="ChildrenEvent" />
  </div>

</template>

<script>
import axios from "axios";
import singleProp from "@/components/singleProp.vue";
import addProp from "@/components/modals/addProp";
export default {
  name: "sellerProfile",
  data: () => {
    return {
      id:"",
      numItems: "",
      props: "",
      numPagesArr:[],
      numPages:"",
      page:""
    };
  },
  mounted() {
    this.page = 1
    console.log(this.$route.params.id);
    this.id = this.$route.params.id 
    console.log(this.$cookies.get('id'));
    this.getSellerProps(this.$route.params.id, 1)
      .then((response) => {
        console.log(response);
        this.numItems = response.data.items;
        this.props = response.data.data.data;
        this.numPages = Math.ceil(response.data.pages);
        for (let i = 0; i < this.numPages; i++) {
          this.numPagesArr.push(i+1);
        }
      })
      .catch();
  },
  methods: {
    relood(n){
      console.log("dsa")
      this.getSellerProps(this.id,n)
      .then((response) => {
        console.log(response);
        this.page = n
        this.numItems = response.data.items;
        this.props = response.data.data.data;
        this.numPages = Math.ceil(response.data.pages);
        for (let i = 0; i < this.numPages; i++) {
          this.numPagesArr[i] = i+1;
        }
      })
      .catch();
    },
    getSellerProps: (id, page) => {
      return axios.get(
        `https://infinite-sierra-61577.herokuapp.com/api/property/${id}?page=${page}`
      );
    },
    ChildrenEvent(){
      this.getSellerProps(this.$route.params.id, this.page)
      .then((response) => {
        console.log(response);
        this.numItems = response.data.items;
        this.props = response.data.data.data;
        this.numPages = Math.ceil(response.data.pages);
        for (let i = 0; i < this.numPages; i++) {
          this.numPagesArr[i] = i+1;
        }
      })
      .catch();
    },
    isActive(n){
      console.log(n)
      console.log(this.page)
      console.log(n==this.page)
      if(n==this.page){
        return 'active'
      }
      return ''
    }
  },
  components: {
    singleProp,
    addProp,
  },
};
</script>


