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
                    :rules="nameRules"
                    label="Name"
                    required
            ></v-text-field>
            </v-col>
            <v-col cols="4" align="right">
                <v-text-field
                    reverse
                    v-model="clonedItem.ExternalId"
                    :counter="10"
                    :rules="idRules"
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
                    :rules="costRules"
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
                        :disabled="!valid"
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
import { mapGetters, mapActions } from 'vuex';
import {cloneDeep} from 'lodash';

export default {
    name: 'ItemCardBack',
    props: {
        id: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            clonedItem: {},
            apiWaiting: false,

            valid: false,
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 50 || 'Name must be less than 10 characters',
            ],
            idRules: [
                v => !!v || 'Id is required',
                v => v.length <= 10 || 'Id must be valid',
            ],
            costRules: [
                v => !!v || 'Cost is required',
                v => /^\d{0,8}(\.\d{1,2})?$/.test(v) || 'Cost must be valid',
            ],
        };
    },
    async created() {
        this.cloneItem();
    },
    computed: {
        ...mapGetters(['getItemById']),
    },
    methods: {
        ...mapActions(['updateItemAction']),
        discardChanges() {
            this.$emit('ItemEditDone');
            this.cloneItem();
        },
        cloneItem() {
            this.clonedItem = cloneDeep(this.getItemById(this.id));
        },
        async saveChanges() {
            try {
                this.apiWaiting = true;
                await this.updateItemAction(this.clonedItem);
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