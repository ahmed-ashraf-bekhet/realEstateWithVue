<template>
  <div class="home">
    <!-- Home Slider -->
    <div class="home_slider_container">
      <div class="owl-carousel owl-theme home_slider">
        <!-- Slide -->
        <div class="owl-item">
          <div 
            class="home_slider_background"
          ></div>
          <div class="slide_container">
            <div class="container"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
    name:"search"
}
</script>


<style scoped>
    .home_slider_container{
        background-color: orange;
        background-image: url(../assets/images/Capture4.jpg);
    }
</style>
