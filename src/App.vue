<template>
    <v-app>
      <AppBar/>
      <v-main class="grey lighten-3">
        <v-container>
          <v-sheet>
            <v-row>
              <v-col cols='8' offset="2">
                <ItemsList/>  
              </v-col>
            </v-row>     
           </v-sheet> 
        </v-container>
      </v-main>
    </v-app>
</template>

<script>
import ItemsList from './components/ItemsList';
import AppBar from './components/AppBar';

export default {
  name: 'App',

  components: {
    ItemsList,
    AppBar,
  },
  data: () => ({
  }),
};
</script>

<style>
/* .container {
  max-width: 1200px !important;
} */
  /* .container {
    border: 1px solid green;
  }
  .row {
    border: 1px solid red;
  }
  .col {
    border: 1px solid blue;
  } */
</style>
