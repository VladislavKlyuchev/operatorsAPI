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
                                <v-data-table
    :headers="headers"
    :items="packages"
    class="elevation-0"
  >
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
  methods: {
    update() {
      if (this.activePackage !== null && this.channels.length !== 0) {
        const body = this.channels.map((el, key) => {
          return {
            channelId: el.id,
            packageId: this.activePackage,
            order: key
          };
        });
        this.$store.dispatch("sortChannels", body).then();
      }
    },
    deleteChannel(id) {
      const channel = {
        channelId: id,
        packageId: this.activePackage
      };
      this.$store
        .dispatch("deleteChannelFromPackage", { channel: channel })
        .then(() => {
          this.channels = this.channelsWithPackage.filter(
            el => el.packageId == this.activePackage
          );
        });
    }
  },
  watch: {
    activePackage(val) {
      this.channels = this.channelsWithPackage.filter(
        el => el.packageId == this.activePackage
      );
    },
  },
  computed: {
      filterPackages() {
          console.log(this.activeOperator)
          return this.packages.filter((el) => {
              console.log(el)
              return el.operatorId == this.activeOperator ? true: false
          })
      },
  ...mapState({
    packages: state => state.packages,
    channelsWithPackage: state =>
      state.channelsWithPackage.sort((a, b) => a.order - b.order),
    operators: state => state.operators
  })
  }
};
</script>

<style>
</style>
