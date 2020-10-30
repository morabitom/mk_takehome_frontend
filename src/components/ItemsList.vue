<template>
    <v-row justify-center>
        <v-col class="d-flex justify-center" cols="4" v-for="item in items" :key="item.Id">
            <ItemCard 
                :item="item"
                @updated="itemUpdated"
            />
        </v-col>
    </v-row>
</template>

<script>
import {data} from '../dataAccess/Data';
import ItemCard from './ItemCard';

export default {
    name: 'ItemsList',
    data() {
        return {
            items: [],
            message: "",
        }                                                                                                                                                                                                                 
    },
    components: {
        ItemCard,
    },
    async created() {
        await this.getItems();
    },
    methods: {
        async getItems() {
            this.message = 'Loading Items';
            this.items = await data.getItems();
            this.message = '';
        },
        itemUpdated(newItem) {
            const index = this.items.findIndex(i => i.Id === newItem.Id);
            this.items.splice(index, 1, newItem);
            this.items = [...this.items];
        }
    },

}
</script>                                                                                

<style scoped>
  .container {
    border: 1px solid green;
  }
  .row {
    border: 1px solid red;
  }
  .col {
    border: 1px solid blue;
  }
</style>