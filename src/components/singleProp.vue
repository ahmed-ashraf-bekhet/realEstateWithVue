<template>
  <div>
    <router-link :to="'/propDetails/'+prop.id">
    <div class="property_image">
      <img
        :src="
          'https://festive-exchanges.000webhostapp.com/images/' + prop.image
        "
        alt=""
      />
      <div class="tag_featured property_tag"><a href="#">Featured</a></div>
    </div>
    <div class="property_body text-center">
      <div class="property_location">{{ prop.city }}</div>
      <div class="property_title">
        <a href="property.html">{{ prop.title }}</a>
      </div>
      <div class="property_price">$ {{ prop.price }}</div>
    </div>
    </router-link>

    <div
      class="property_footer d-flex flex-row align-items-center justify-content-start"
    >
      <div>
        <div class="property_icon">
          <img src="../assets/images/icon_1.png" alt="" />
        </div>
        <span>{{ prop.area }} Km</span>
      </div>
      <div>
        <div class="property_icon">
          <img src="../assets/images/icon_2.png" alt="" />
        </div>
        <span>{{ prop.rooms }} Rooms</span>
      </div>
      <div v-if="type">
        <button
          type="button"
          class="btn btn-outline-light border-0"
          @click="deleete(propID)"
        >
          Delete Post
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "signleProp",
  data: () => {
    return {
      prop: "",
    };
  },
  props: ["propID","type"],
  mounted() {
    this.getProp(this.propID)
      .then((response) => {
        console.log(response);
        this.prop = response.data;
      })
      .catch();
  },
  methods: {
    getProp: (id) => {
      return axios.get(
        `https://infinite-sierra-61577.herokuapp.com/api/getProp/${id}`
      );
    },
    deleete(id){
        return axios.delete(`https://infinite-sierra-61577.herokuapp.com/api/property/${id}`)
        .then((response)=>{
            console.log(response)
            this.$emit('someEvent','')
        })
        .catch();
    }
  },
  };
</script>
