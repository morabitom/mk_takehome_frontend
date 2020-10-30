<template>
    <v-card 
        elevation="10"
        class="mt-8 pa-1"
        min-height="170"
        min-width="300"
    >
    
        <v-card-title class="pt-2">
            <v-row>
            <v-col cols="8">
                <h3 class="pl-4 text-truncate">{{ item.Name }}</h3>
            </v-col>
            <v-col cols="4" align="right">
            <h1 class="pr-2 title font-weight-light font-italic text-truncate">{{item.ExternalId}}</h1>
            </v-col>
            </v-row>
        </v-card-title>

        <v-card-text class="pl-9 py-0">
            <h1 class="title">${{item.Cost}}</h1>
        </v-card-text>

        <v-card-actions class="pb-0 pa-4">
            <v-row no-gutters>
                <v-col cols="4"  align="center">
                    <v-btn
                        text
                        color="orange lighten-2"
                        large
                        @click="editItem()">
                        Edit
                    </v-btn>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="4"  align="center">
                    <v-btn 
                        text
                        large
                        color="red lighten-2"
                    >Delete</v-btn>
                </v-col>
            </v-row>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: 'ItemCardFront',
    props: {
        item: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
        };
    },
    methods: {
        editItem() {
            this.$emit('editClick');
        },
    },
}

</script>