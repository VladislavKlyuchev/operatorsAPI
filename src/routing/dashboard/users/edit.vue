<template>
     <v-layout row wrap justify-center align-center>
            <v-flex xs12 md6>
              <h1 class="text-xs-center title"> Create new user</h1>
              <v-form ref="form">
                <v-layout row wrap  class="mt-5">
                  <v-flex xs12>
                    <v-text-field label="Name" solo-inverted v-model="name" :rules="[v => !!v || 'Required']"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="UUID" v-model="uuid" solo-inverted  :rules="[v => !!v || 'Required']"></v-text-field>
                  </v-flex>
                   <v-flex xs12>
                    <v-text-field label="PIN" hint="password for 18+ channels" solo-inverted v-model="pin" :rules="[v => !!v || 'Required']"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                      <v-select label="Packages" :items="packages" item-text="name" item-value="id" v-model="packageId" :rules="[v => !!v || 'Required']" solo-inverted></v-select>
                  </v-flex>
                   <v-flex xs12>
                  <v-flex xs12>
                      <v-select label="Status" :items="statusENUM" v-model="status" :rules="[v => !!v || 'Required']" solo-inverted></v-select>
                  </v-flex>
                  </v-flex>
                  <v-flex xs12>
                    <v-btn class="mx-0 my-0 ml-2" style="min-height:48px" block color="success" @click="submit" flat>send</v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-flex>
        </v-layout>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
      id: {
          Required: true,
      }
  },
  data() {
    return {
      name: null,
      pin: null,
      packageId: null,
      status: null,
      uuid: null,
      statusENUM: [
          'ACTIVE',
          'INACTIVE'
      ]
    };
  },
  methods: {
      init() {
          console.log(this.user)
          this.name = this.user.name
          this.pin = this.user.pin
          this.packageId = this.user.packageId
          this.status = this.user.status == 1? 'ACTIVE': 'INACTIVE'
          this.uuid = this.user.uuid

      },
    submit() {
      if(this.$refs.form.validate()) {
          const body = {
              id: this.id,
              name: this.name,
              packageId: this.packageId,
              operatorId: this.operator.id,
              pin: this.pin,
              uuid: this.uuid,
              status: this.status == 'ACTIVE'? 1: 0
          }
        this.$store.dispatch('updateUser', body)
        .then(() => {
          this.name = null
          this.$router.go(-1)
        })
      }
    }
  },
  computed: {
      user() {
          return this.users.find(el => el.id == this.id)
      },
      ...mapState({
          operator: state => state.operator,
          packages: state => state.packages,
          users: state => state.users
      })
  },
  mounted() {
      this.init()
  }
};
</script>

<style>
</style>
