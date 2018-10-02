<template>

  <v-flex xs12>
    <v-layout row wrap>
      <v-flex xs10>
        <v-text-field label="Search" v-model="search" solo-inverted append-icon="search"></v-text-field>
      </v-flex>
      <v-flex xs2 text-xs-right>
        <v-btn flat color="success" to="/users/new">new User</v-btn>
      </v-flex>
      <v-flex xs12>
        <v-data-table dark :headers="headers" :items="users" class="elevation-1" :search="search">
          <template slot="items" slot-scope="props">
            <tr @click="props.expanded = !props.expanded">
              <td class="text-xs-left">{{ props.item.id }}</td>
              <td class="text-xs-left">{{ props.item.name }}</td>
              <td class="text-xs-left">{{ props.item.uuid }}</td>
              <td class="text-xs-left">
                <v-icon v-if="props.item.status" color="success">done</v-icon>
                <v-icon v-else color="error">clear</v-icon>
              </td>
              <td class="text-xs-left">{{ props.item.packageId }}</td>
              <td class="text-xs-left">
                <v-btn flat small :to="`/users/edit/${props.item.id}`">
                  <v-icon color="warning">edit</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
          <template slot="expand" slot-scope="props">
            <v-card flat light>
              <v-container fluid>
                <v-data-table :headers="subHeaders" :items="getHistory(props.item.id)" class="elevation-1" hide-actions>
                  <template slot="items" slot-scope="sub">

                    <td class="text-xs-left">{{ sub.item.createdAt }}</td>
                    <td class="text-xs-left">{{ sub.item.updatedAt }}</td>
                    <td class="text-xs-left">{{ sub.item.status }}</td>
                    <td class="text-xs-left">{{ sub.item.packageId }}</td>

                  </template>
                </v-data-table>
              </v-container>
            </v-card>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

  </v-flex>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      headers: [
        {
          text: "ID",
          value: "id",
         
        },
        { text: "Name", value: "name", },
        { text: "UUID", value: "uuid", },
        { text: "Status", value: "status",  },
        { text: "package ID", value: "packageId", },
        {
          text: "",
          value: "",
          width: '100',
          sortable: false,
          
        }
      ],
      subHeaders: [
      {
        text: 'Start',
        value: 'createdAt',
      },
      {
        text: 'End',
        value: 'updatedAt',
      },
      {
        text: 'Status',
        value: 'status'
      },
      {
        text: 'Package Id',
        value: 'packageId'
      }
      ],
      search: null
    };
  },
  methods: {
    getHistory(id) {
      return this.history.filter(hi => hi.userId === id);
    }
  },
  computed: {
    ...mapState({
    users: state => state.users,
    history: state => state.history
  })
  },
  mounted() {
    console.log(this.users)
  }
};
</script>

<style>
</style>
