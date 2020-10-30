<template>
    <v-app>
      <v-app-bar
      app
      color="white"
      flat
    >
      <v-container class="py-0 fill-height">
        <v-row>
          <v-col cols='4' offset-md='1'>
            <v-icon >mdi-store</v-icon>
            <v-toolbar-title>Inventor.io</v-toolbar-title>
          </v-col>
          <v-col cols='2' justify='center'>
            <v-responsive max-width="260">
              <v-autocomplete
              filled
              rounded
            ></v-autocomplete>
            </v-responsive>
          </v-col>
        </v-row>
      </v-container>
      </v-app-bar>
      <v-main class="grey lighten-3">
        <v-container>
          <v-row>
            
            <v-sheet>
            <v-col cols='8' offset-md="2">
              <ItemsList/>  
            </v-col>
            
            </v-sheet>
          </v-row>      
        </v-container>
      </v-main>
    </v-app>
</template>

<script>
import ItemsList from './components/ItemsList';

export default {
  name: 'App',

  components: {
    ItemsList,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
/* .container {
  max-width: 1200px !important;
} */
</style>
