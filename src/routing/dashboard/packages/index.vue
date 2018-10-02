<template>
  <v-layout row wrap justify-center align-center>
    <v-flex xs12>
      <v-flex xs12 text-xs-right>

      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex xs12>
                <h1 class="text-xs-center title">Packages</h1>
              </v-flex>
              <v-flex xs12>
                <v-data-table :headers="headers" :items="packages" class="elevation-0">
                  <template slot="items" slot-scope="props">
                    <td class="text-xs-left">{{ props.item.id }}</td>
                    <td class="text-xs-left">{{ props.item.name }}</td>
                    <td class="text-xs-left">{{ props.item.price }}</td>
                  </template>
                </v-data-table>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>

    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      activePackage: null,
      activeOperator: null,
      headers: [
        {
          text: 'ID',
          value: 'id'
        },
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Price',
          value: 'price'
        }
      ],

      channels: []
    };
  },
  computed: {
  ...mapState({
    packages: state => state.packages || [],
  })
  }
};
</script>

<style>
</style>
