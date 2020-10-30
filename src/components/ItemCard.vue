<template>
    <FlipCard :flipped='editing'>
        <template slot="front">
            <ItemCardFront
                :item="item"
                @editClick="editItem"
            />
        </template>
        <template slot="back">
            <ItemCardBack
                :item="item"
                @ItemUpdated="itemUpdated"
                @ItemEditDone="editItemDone"
                />
        </template>
    </FlipCard>
</template>

<script>
import FlipCard from './FlipCard';
import ItemCardFront from './ItemCardFront'
import ItemCardBack from './ItemCardBack'

export default {
    name: 'ItemCard',
    props: {
        item: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            editing: false,
        };
    },
    components: {
      FlipCard,
      ItemCardFront,
      ItemCardBack,
    },
    methods: {
        editItem() {
            this.editing = true;
        },
        editItemDone() {
            this.editing = false;
        },
        itemUpdated() {
            this.$emit('ItemUpdated');
        }
    }
}




</script>