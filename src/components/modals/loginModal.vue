<template>
  <div class="modal" tabindex="-1" id="login_modal" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Login</h5>
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
                  type="email"
                  class="form-control mb-3"
                  required
                  placeholder="Email"
                  v-model="email"
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
                  formControlName="Password"
                  placeholder="Password"
                  v-model="password"
                />
                <span class="error-msg">
                  {{ passwordError }}
                </span>
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
            <button
              @click="login()"
              type="button"
              value="submit"
              class="btn btn-primary"
            >
              Home
            </button>
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
  name: "loginModal",
  data: function() {
    return {
      email: "",
      password: "",
      formData: "",
    };
  },
  methods: {
    login: function() {
      if (this.emailError != "" || this.passwordError != "") {
        return false;
      }
      this.formData = {
        email: this.email,
        password: this.password,
      };
      axios
        .post(
          "https://infinite-sierra-61577.herokuapp.com/api/login",
          this.formData
        )
        .then((response) => {
          console.log(response);
          this.$cookies.set('id',response.data.success.id)
          this.$cookies.set('email',response.data.success.email)
          this.$cookies.set('name',response.data.success.name)
          this.$cookies.set('phone',response.data.success.phone)
          this.$cookies.set('city',response.data.success.cityid)
          if(response.data.success.userType==1){
            this.$router.push ({path:`/sellerProfile/${response.data.success.id}`})
          }
          else{
            this.$router.push ({path:`/customerProfile/${response.data.success.id}`})
          }
          $("#login_modal .close").click()
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
  computed: {
    emailError: function() {
      if (!this.email.includes("@")) {
        return "must include @ symbol";
      }
      return "";
    },
    passwordError: function() {
      if (this.password.length < 8) {
        return "must more than or equal 8 digits";
      }
      return "";
    },
  },
};
</script>
