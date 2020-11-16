<template>
    <v-row justify-center>
        <div class="notification is-info" v-show="message">{{ message }}</div>
        <v-col class="d-flex justify-center" xl="4" md="6" sm="12" v-for="item in items" :key="item.Id">
            <ItemCard 
                :id="item.Id"
            />
            
        </v-col>
    </v-row>
</template>

<script>
import ItemCard from './ItemCard';
import {mapState, mapActions} from 'vuex';

export default {
    name: 'ItemsList',
    data() {
        return {
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
        ...mapActions(['getItemsAction']),
        async getItems() {
            this.message = 'Loading Items';
            await this.getItemsAction();
            this.message = '';
        },
    },
    computed: {
        ...mapState(['items']),
    },
    watch: {

    }

}
</script>
