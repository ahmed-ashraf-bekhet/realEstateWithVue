<template>
  <div>
    <search />
    <props />
  </div>
</template>

<script>

import search from "@/components/search";
import props from "@/components/props";
export default {
  name: "Home",
  components: {
    search,
    props
  }
};
</script>
