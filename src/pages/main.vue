<template>
  <v-app>
  <v-container class="container">
    <div>
      <v-app-bar class="bar1" :elevation="10" rounded>
        <img src="./../assets/images/logo.png" class="logo" />
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon color="black" class="icn1">mdi-bell-outline</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon color="black" class="icn1">mdi-cog-outline</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon color="black" class="icn1">mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>

      <v-card
        elevation="10"
        rounded
        style="
          background-color: #35bad8;
          padding: 30px !important;
          max-height: none !important;
          margin-left: auto !important;
          margin-right: auto !important;
          margin-top: auto !important;
          margin-bottom: auto !important;
        "
      >
        <div align="center">
          <v-img src="./../assets/images/Avatar.png" class="avatar" contain />
          <v-toolbar-title class="name"> John Doe </v-toolbar-title>

          <v-toolbar-title class="status">
            Last online: 2 days ago
          </v-toolbar-title>
          <br />
          <v-row class="justify-center align-center">
            <v-btn class="btn1">
              <v-icon color="#35BAD8">mdi-telegram </v-icon>
              <v-card-text class="message"> Send Message </v-card-text>
            </v-btn>
            <v-btn class="btn2"
              ><v-icon color="#fff">mdi-plus</v-icon
              ><v-card-text class="add"> Add Friend </v-card-text></v-btn
            >
          </v-row>
        </div>
      </v-card>

      <v-card class="centerpage" :elevation="10" rounded>
        <v-card class="grid" color="transparent">
          <v-text-field v-model="search" label="Search"></v-text-field>
        </v-card>
        <div>
          <v-data-table
            class="textCapital"
            :headers="headers"
            :items="users"
            :search="search"
            :footer-props="{
              itemsPerPageOptions: [10, 20, 30, 40, 50],
              'items-per-page-text': 'Users per page:',
              'show-current-page': true,
              'show-first-last-page': true,
            }"
            @click:row="openUserDetail"
          >
            <template #item.registered.date="{ item }">
              {{ formatDate(item.registered.date) }}
            </template>
          </v-data-table>

          <v-dialog v-model="dialogVisible" max-width="500px">
            <v-card v-if="selectedUser" class="grid2">
              <v-row class="justify-center align-center">
                <img :src="selectedUser.picture.large" class="user" contain />
              </v-row>
              <v-card-title>
                <span class="headline">{{ selectedUser.fullName }}</span>
              </v-card-title>
              <v-card-text>
                <div>
                  <strong>Date:</strong>
                  {{ formatDate(selectedUser.registered.date) }}
                </div>
                <div class="textCapital">
                  <strong>Gender:</strong> {{ selectedUser.gender }}
                </div>
                <div>
                  <strong>Country:</strong> {{ selectedUser.location.country }}
                </div>
                <div><strong>Email:</strong> {{ selectedUser.email }}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" text @click="closeDialog">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <v-row class="justify-center align-center">
          <v-btn class="btn3" @click="getUsers"
            ><v-icon color="#fff">mdi-refresh</v-icon
            ><v-card-text class="add">Refresh</v-card-text></v-btn
          >
        </v-row>
      </v-card>
    </div>
  </v-container>
</v-app>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      users: [],
      search: "",
      headers: [
        {
          text: "Date",
          align: "center",
          sortable: false,
          value: "registered.date",
        },
        { text: "Name", align: "center", sortable: false, value: "fullName" },
        { text: "Gender", align: "center", value: "gender" },
        {
          text: "Country",
          align: "center",
          sortable: false,
          value: "location.country",
        },
        { text: "Email", align: "center", sortable: false, value: "email" },
      ],
      dialogVisible: false,
      selectedUser: null,
    };
  },
  mounted: function () {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      this.$setLoader();
      Axios.get("https://randomuser.me/api/?results=20")
        .then((response) => {
          this.users = response.data.results;
          let id = 1;
          for (let user of this.users) {
            user.fullName = user.name.first + " " + user.name.last;
            user.id = id;
            id++;
          }
          this.$disableLoader()
        })
        .catch((error) => {
          console.error(error);
        });
    },

    formatDate(dateString) {
      // const date = new Date(dateString);
      // const options = { timeZone: 'UTC' };
      // return date.toLocaleString('en-US', options);
      if (dateString != null) {
        const newDate = dateString;
        const date = newDate.slice(0, 10);
        return date;
      } else {
        return null;
      }
    },

    openUserDetail(item) {
      this.selectedUser = item;
      this.dialogVisible = true;
    },

    closeDialog() {
      this.dialogVisible = false;
      this.selectedUser = null;
    },
  },
};
</script>
