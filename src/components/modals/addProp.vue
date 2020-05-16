<template>
  <div>
    <div class="modal" tabindex="-1" id="add_prop_modal" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add New Property</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form enctype="multipart/form-data" method="post">
            <div class="modal-body">
              <div class="col-12">
                <div class="form-group">
                  <input
                    v-model="title"
                    type="text"
                    class="form-control mb-3"
                    placeholder="Title"
                  />
                  <span class="error-msg">
                    {{ titleError }}
                  </span>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <input
                    v-model="description"
                    type="text"
                    class="form-control mb-3"
                    required
                    placeholder="Description"
                  />
                  <span class="error-msg">
                    {{ descError }}
                  </span>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <input
                    v-model="address"
                    type="text"
                    class="form-control mb-3"
                    placeholder="Address"
                  />
                  <span class="error-msg">
                    {{ addressError }}
                  </span>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <input
                    @change="onFileSelect"
                    type="file"
                    name="image"
                    class="form-control mb-3"
                  />
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <input
                    v-model="rooms"
                    type="number"
                    class="form-control mb-3"
                    placeholder="Number Of Rooms"
                  />
                  <span class="error-msg">
                    {{ roomsError }}
                  </span>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <input
                    v-model="price"
                    type="number"
                    class="form-control mb-3"
                    placeholder="Price"
                  />
                  <span class="error-msg">
                    {{ priceError }}
                  </span>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <input
                    v-model="area"
                    type="number"
                    class="form-control mb-3"
                    placeholder="Area"
                  />
                  <span class="error-msg">
                    {{ areaError }}
                  </span>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <select @change="onSelect" class="form-control" id="userType">
                    <option
                      v-for="city of cities"
                      :key="city.id"
                      :value="city.id"
                    >
                      {{ city.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <input
                @click="add()"
                type="button"
                value="submit"
                class="btn btn-primary"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import $ from 'jquery'; 
export default {
  name: "addProp",
  data: () => {
    return {
      cities: "",
      title: "",
      description: "",
      address: "",
      rooms: "",
      price: "",
      area: "",
      image: "",
      cityid: 2,
    };
  },
  mounted() {
    axios
      .get("https://infinite-sierra-61577.herokuapp.com/api/city")
      .then((response) => {
        console.log(response.data);
        this.cities = response.data;
      })
      .catch();
  },
  methods: {
    onSelect(event) {
      this.cityid = event.target.value;
      console.log(this.cityid);
    },  
    onFileSelect(event) {
      this.image = event.target.files[0];
      console.log(this.image);
    },
    add() {
      const imageForm = new FormData();
      const myFormData = new FormData();
      imageForm.append("image", this.image);
      axios
        .post(
          "https://festive-exchanges.000webhostapp.com/api/upload",
          imageForm
        )
        .then((res) => {
          console.log(res);
          myFormData.append("image", res.data);
          myFormData.append("title", this.title);
          myFormData.append("description", this.description);
          myFormData.append("address", this.address);
          myFormData.append("rooms", this.rooms);
          myFormData.append("price", this.price);
          myFormData.append("cityid", this.cityid);
          myFormData.append("area", this.area);
          myFormData.append("userid", 22);
          axios
            .post(
              "https://infinite-sierra-61577.herokuapp.com/api/property",
              myFormData
            )
            .then((res) => {
              console.log(res);
              this.$emit('addPropEvent','');
              $("#add_prop_modal .close").click()
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    titleError: function() {
      if (this.title === "") {
        return "this field cannot be empty";
      }
      return "";
    },
    descError: function() {
      if (this.description === "") {
        return "this field cannot be empty";
      }
      return "";
    },
    addressError: function() {
      if (this.address === "") {
        return "this field cannot be empty";
      }
      return "";
    },
    roomsError: function() {
      if (this.rooms === "") {
        return "this field cannot be empty";
      }
      return "";
    },
    priceError: function() {
      if (this.price === "") {
        return "this field cannot be empty";
      }
      return "";
    },
    areaError: function() {
      if (this.area === "") {
        return "this field cannot be empty";
      }
      return "";
    },
  },
};
</script>
