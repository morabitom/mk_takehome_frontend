<template>
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-container class="py-0 pt-3 fill-height">
          <v-row align="start" no-gutters>
              <v-col>
                  <v-row align="start" no-gutters>
                      <v-col>
                        <v-toolbar-title>Inventor.io</v-toolbar-title>
                      </v-col>
                      <v-col>
                        <v-btn
                            elevation="2"
                            @click="newItem()"
                            color="success"
                            >
                            <v-icon left>
                                mdi-plus
                            </v-icon>
                            Add Item
                        </v-btn>
                      </v-col>
                  </v-row>
              </v-col>
              <v-col centered>
                <v-responsive >
                    <v-combobox
                    filled
                    rounded
                    dense
                    clearable
                    v-model="select"
                    :items="selectItems"
                    @input.native="select=$event.srcElement.value"
                    ></v-combobox>
                </v-responsive>
              </v-col>
              <v-col>
                  <v-row align="start" no-gutters>
                      <v-col>
                        <v-checkbox
                            class="pa-2"
                            v-model="maxOnly"
                            :label="`Max Prices Only`"
                            ></v-checkbox>
                      </v-col>
                      <v-col>
                        <v-btn
                            elevation="2"
                            @click="search()"
                            >Search</v-btn>
                      </v-col>
                  </v-row>
              </v-col>
          </v-row>
      </v-container>
      </v-app-bar>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'AppBar',
    computed: {
        ...mapState(['selectItems']),
    },

    data: () => ({
        select: '',
        maxOnly: false,
    }),
    methods: {
        ...mapActions(['getItemsAction']),
        async search() {
            await this.getItemsAction( { nameFilter: this.select, maxFilter: this.maxOnly } );
        },
        newItem() {
            this.$store.commit('createEmptyItem');
        }
    }
}
</script>

<style scoped>
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