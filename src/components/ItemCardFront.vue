<template>
    <v-card 
        elevation="10"
        class="mt-11 pa-1"
        min-height="140"
        width="300"
    >
    
        <v-card-title class="pt-2">
                <h3 class="pl-4 text-truncate">{{ item.Name }}</h3>
                <v-spacer></v-spacer>
                <h1 class="pr-2 title font-weight-light font-italic text-truncate align-right">{{item.ExternalId}}</h1>
        </v-card-title>

        <v-card-text class="pl-9 py-0">
            <h1 class="title">${{item.Cost}}</h1>
        </v-card-text>

        <v-card-actions class="py-0 my-0">
                    <v-btn
                        text
                        color="orange lighten-2"
                        large
                        @click="editItem()">
                        Edit
                    </v-btn>
                <v-spacer></v-spacer>
                    <v-btn 
                        text
                        large
                        color="red lighten-2"
                        @click="deleteItem()"
                    >Delete</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapActions} from 'vuex';

export default {
    name: 'ItemCardFront',
    props: {
        id: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        item() {
            return this.$store.getters.getItemById(this.id);
        }
    },
    methods: {
        ...mapActions(['deleteItemAction']),
        editItem() {
            this.$emit('editClick');
        },
        async deleteItem() {
            await this.deleteItemAction(this.id);
        },
    },
    data() {
        return {
        };
    },  
    
}

</script>