<template>
  <div id="app">
    <AppHeader />

    <router-view />
    
    <Footer />
    <loginModal />
    <register />
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import loginModal from "@/components/modals/loginModal";
import register from "@/components/modals/register";
export default {
  name :'App',
  components:{
    AppHeader,
    Footer,
    loginModal,
    register
  }
}
</script>
