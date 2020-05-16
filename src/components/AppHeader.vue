<template>
      <header class="header">
      <div class="container">
        <div class="row">
          <div class="col">
            <div
              class="header_content d-flex flex-row align-items-center justify-content-start"
            >
              <div class="logo">
                <a href="#"><img src="../assets/images/logo.png" alt=""/></a>
              </div>
              <nav class="main_nav">
                <ul>
                  <li><router-link to="/">Home</router-link></li>
                  <li><a href="#" data-toggle="modal" data-target="#login_modal">Login</a></li>
                  <li><a href="#" data-toggle="modal" data-target="#register_modal">Register</a></li>
                  <li>
                    <button
                      class="btn btn-outline-primary border-0 text-white font-weight-normal"
                      type="menu"
                      id="dropdownMenu2"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      My Activities
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                      <button
                        class="dropdown-item"
                        type="button"
                        data-toggle="modal"
                        data-target="#add_prop_modal"
                      >
                        Add Property
                      </button>
                      <button class="dropdown-item" type="button" @click="logout">
                        Logout
                      </button>
                    </div>
                  </li>
                </ul>
              </nav>
              <div class="phone_num ml-auto">
                <div class="phone_num_inner">
                  <img src="../assets/images/phone.png" alt="" /><span
                    >652-345 3222 11</span
                  >
                </div>
              </div>
              <!-- <div class="hamburger ml-auto"><i (click)="onPress()" class="fa fa-bars" aria-hidden="true"></i></div> -->
            </div>
          </div>
        </div>
      </div>
    </header>

</template>

<script>
export default {
    name:"AppHeader",
    methods:{
      logout(){
        this.$cookies.remove('id')
        this.$cookies.remove('name')
        this.$cookies.remove('email')
        this.$cookies.remove('phone')
        this.$cookies.remove('city')
      }
    }
}
</script>

