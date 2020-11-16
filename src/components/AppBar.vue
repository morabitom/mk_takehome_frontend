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
                        <v-toolbar-title>My Inventory</v-toolbar-title>
                      </v-col>
                      <v-col>
                        <v-btn
                            elevation="2"
                            @click="newItem()"
                            :disabled="newItemExists"
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
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
    name: 'AppBar',
    computed: {
        ...mapState(['selectItems']),
        ...mapGetters(['getItemById']),
        newItemExists() {
          return (this.getItemById(0) != null);
        }
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
        async newItem() {
            await this.resetFilterState();
            this.$store.commit('createEmptyItem');
            
        },
        async resetFilterState() {
            this.select = '';
            this.maxOnly = false;
            await this.getItemsAction( {nameFilter: this.select, maxFilter: this. maxOnly});
        }
    }
}
</script>
