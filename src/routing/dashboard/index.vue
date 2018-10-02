<template>
  <v-app dark>
    <v-toolbar dense app flat class="deep-orange">
      <v-toolbar-items>
        <v-btn flat :to="'/packages'">packages</v-btn>
        <v-btn flat :to="'/users'">users</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container fluid fill-height>
      <v-layout row wrap justify-center align-center>
        <router-view></router-view>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  created() {
      this.$store.dispatch('getPackages')
      this.$store.dispatch('getUsers')
      this.$store.dispatch('getHistory')
  }
};
</script>

<style>
</style>
