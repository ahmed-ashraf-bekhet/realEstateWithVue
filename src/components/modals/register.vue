<template>
  <div class="modal" tabindex="-1" id="register_modal" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Register</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form method="post">
          <div class="modal-body">
            <div class="col-12">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control mb-3"
                  v-model="name"
                  placeholder="Name"
                />
                <span class="error-msg">
                  {{ nameError }}
                </span>
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <input
                  type="email"
                  class="form-control mb-3"
                  v-model="email"
                  required
                  placeholder="Email"
                />
                <span class="error-msg">
                  {{ emailError }}
                </span>
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <input
                  type="password"
                  minlength="8"
                  class="form-control mb-3"
                  v-model="password"
                  placeholder="Password"
                />
                <span class="error-msg">
                  {{ passwordError }}
                </span>
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <input
                  type="password"
                  minlength="8"
                  class="form-control mb-3"
                  v-model="c_password"
                  placeholder="Confirm Password"
                />
                <span class="error-msg">
                  {{ c_passwordError }}
                </span>
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <input
                  type="number"
                  class="form-control mb-3"
                  v-model="phone"
                  placeholder="Phone Number"
                />
                <span class="error-msg">
                  {{ phoneError }}
                </span>
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <select
                  @change="onUserSelect"
                  class="form-control"
                  id="userType"
                >
                  <option value="0">Customer</option>
                  <option value="1">Seller</option>
                </select>
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
              @click="register"
              type="button"
              value="submit"
              class="btn btn-primary"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import $ from 'jquery'; 
export default {
  name: "register",
  data: function() {
    return {
      name: "",
      email: "",
      password: "",
      c_password: "",
      phone: "",
      userType: 0,
      city: 2,
      cities: "",
    };
  },
  methods: {
    onSelect(event) {
      this.city = event.target.value;
      console.log(this.cityid);
    },
    onUserSelect(event) {
      this.userType = event.target.value;
      console.log(this.userType);
    },
    register() {
      if (this.nameError || this.emailError || this.passwordError || this.phoneError || this.c_passwordError) {
        console.log("error")
        return;
      }
      let formData = {
        name: this.name,
        email: this.email,
        password: this.password,
        phone: this.phone,
        userType: this.userType,
        cityid: this.city,
      };
      axios
        .post("https://infinite-sierra-61577.herokuapp.com/api/register", formData)
        .then((res) => {
          console.log(res);
          this.$cookies.set('id',res.data.success.id)
          this.$cookies.set('email',res.data.success.email)
          this.$cookies.set('name',res.data.success.name)
          this.$cookies.set('phone',res.data.success.phone)
          this.$cookies.set('city',res.data.success.cityid)
          if(res.data.success.userType==1){
            this.$router.push ({path:`/sellerProfile/${res.data.success.id}`})
          }
          else{
            this.$router.push ({path:`/customerProfile/${res.data.success.id}`})
          }
          $("#register_modal .close").click()
        })
        .catch();
    },
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
  computed: {
    nameError: function() {
      if (this.name === "") {
        return "this field cannot be empty";
      }
      return "";
    },
    emailError: function() {
      if (this.email === "") {
        return "this field cannot be empty";
      }
      else if(!this.email.includes('@')){
        return "this field must contain @ symbol";
      }
      return "";
    },
    passwordError: function() {
      if (this.password.length < 8) {
        return "this field must be at least 8 digits";
      }
      return "";
    },
    c_passwordError: function() {
      if (this.c_password < 8) {
        return "this field must be at least 8 digits";
      } else if (this.c_password !== this.password) {
        return "Not the same password";
      }
      return "";
    },
    phoneError: function() {
      if (this.phone === "") {
        return "this field cannot be empty";
      }
      return "";
    },
  },
};
</script>
