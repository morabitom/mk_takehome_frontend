<template>
    <v-card 
        elevation="10"
        class="mt-0 pa-0"
        min-height="170"
        min-width="300"
    >
        <v-form
            ref="form"
            v-model="valid"
        >
            
            
        <v-card-title class="pt-0 pb-0">
            <v-row>
            <v-col cols="8">
                <v-text-field
                    v-model="clonedItem.Name"
                    :counter="50"
                    label="Name"
                    required
            ></v-text-field>
            </v-col>
            <v-col cols="4" align="right">
                <v-text-field
                    reverse
                    v-model="clonedItem.ExternalId"
                    :counter="10"
                    label="Id"
                    required
                ></v-text-field>
            </v-col>
            </v-row>
        </v-card-title>

        <v-card-text class="pl-4 py-0 pt-0">
            <v-row>
                <v-col cols="8">
            <v-text-field
                    v-model="clonedItem.Cost"
                    label="Cost"
                    required
                    prefix="$"
                ></v-text-field>
                </v-col>
                <v-spacer></v-spacer>
            </v-row>
        </v-card-text>

        <v-card-actions class="pb-0 pa-0">
            <v-row no-gutters>
                <v-col cols="4"  align="center">
                    <v-btn
                        text
                        color="green lighten-2"
                        large
                        @click="saveChanges()">
                        Save
                    </v-btn>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="4"  align="center">
                    <v-btn 
                        text
                        large
                        color="yellow darken-2"
                        @click="discardChanges()"
                    >Discard</v-btn>
                </v-col>
            </v-row>
        </v-card-actions>
        </v-form>
        <v-progress-linear
            indeterminate
            color="cyan"
            :active="apiWaiting"
        ></v-progress-linear>
    </v-card>
</template>

<script>
import {data} from '../dataAccess/Data'

export default {
    name: 'ItemCardBack',
    props: {
        item: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            clonedItem: { ...this.item },
            apiWaiting: false,
        };
    },
    methods: {
        discardChanges() {
            this.$emit('ItemEditDone');
            this.clonedItem = { ...this.item };
        },
        async saveChanges() {
            try {
                this.apiWaiting = true;
                const responseData = await data.updateItem(this.clonedItem);
                this.$emit('ItemUpdated', responseData);
                this.$emit('ItemEditDone');
            }
            catch (ex) {
                alert(ex);
            }
            this.apiWaiting = false
        }
    }
}
</script>