<template>
    <v-card 
        :loading="apiWaiting"
        elevation="10"
        class="mt-0 pa-0"
        min-height="170"
        width="300"
    >
        <template slot="progress">
            <v-progress-linear
                indeterminate
                color="cyan"
            ></v-progress-linear>
        </template>

        <v-form
            ref="form"
            v-model="valid"
        >

        <v-card-title class="pb-0">
            <v-row>
            <v-col cols="8" class="py-0 my-0">
                <v-text-field
                    v-model="privateItem.Name"
                    :counter="50"
                    :rules="nameRules"
                    label="Name"
                    required
            ></v-text-field>
            </v-col>
            <v-col cols="4" align="right" class="py-0 my-0">
                <v-text-field
                    reverse
                    v-model="privateItem.ExternalId"
                    :counter="10"
                    :rules="idRules"
                    label="Id"
                    required
                ></v-text-field>
            </v-col>
            </v-row>
        </v-card-title>

        <v-card-text class="pl-4 py-0 pt-0">
            <v-text-field
                    v-model="privateItem.Cost"
                    label="Cost"
                    :rules="costRules"
                    required
                    prefix="$"
                ></v-text-field>
        </v-card-text>

        <v-card-actions class="py-0">
                    <v-btn
                        text
                        color="green lighten-2"
                        large
                        :disabled="!valid"
                        @click="saveChanges()">
                        Save
                    </v-btn>
                <v-spacer></v-spacer>
                    <v-btn 
                        text
                        large
                        color="yellow darken-2"
                        @click="discardChanges()"
                    >Discard</v-btn>
        </v-card-actions>
        </v-form>
        
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
            privateItem: {},
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
                v => /^\d{0,6}(\.(\d{1,2})?)?$/.test(v) || 'Cost must be <1,000,000',
            ],
        };
    },
    async created() {
        this.createPrivateItem();
    },
    computed: {
        ...mapGetters(['getItemById']),
        newItem() {
            return (this.id === 0);
        },
    },
    methods: {
        ...mapActions(['updateItemAction', 'addItemAction']),
        discardChanges() {
            this.$emit('ItemEditDone');
            if (this.newItem) {
                this.$store.commit('removeEmptyItem');
            }
            else {
                this.createPrivateItem();
            }
        },
        createPrivateItem() {
                this.privateItem = cloneDeep(this.getItemById(this.id));
        },
        async saveChanges() {
            try {
                this.apiWaiting = true;
                if (this.newItem) {
                    await this.addItemAction(this.privateItem);
                }
                else {
                    await this.updateItemAction(this.privateItem);
                }
                this.$emit('ItemEditDone');
                this.$store.commit('removeEmptyItem');
            }
            catch (ex) {
                alert(ex);
            }
            this.apiWaiting = false
        }
    }
}
</script>