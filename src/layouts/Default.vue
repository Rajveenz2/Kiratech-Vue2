<template>
  <v-app id="app">
    <Loader />

    <router-view />
  </v-app>
</template>

<script>
import Loader from "@/components/Loader";

export default {
  components: {
    Loader,
  },
  data() {
    return {};
  },
  beforeUpdate() {},
  methods: {},
};
</script>
