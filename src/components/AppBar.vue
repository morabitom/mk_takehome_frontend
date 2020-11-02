<template>
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-container class="py-0 fill-height">
        <v-row>
          <v-col cols='4' offset-md='1'>
            <v-toolbar-title>Inventor.io</v-toolbar-title>
          </v-col>
          <v-col>
              <v-btn
                color="success"
                >
                <v-icon left>
                    mdi-plus
                </v-icon>
                Add Item
            </v-btn>
          </v-col>
          <v-col cols='2' justify='center'>
            <v-responsive max-width="260">
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
              <v-checkbox
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
        }
    }
}
</script>