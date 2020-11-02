<template>
    <FlipCard :flipped='editing'>
        <template slot="front">
            <ItemCardFront
                :id="id"
                @editClick="editItem"
            />
        </template>
        <template slot="back">
            <ItemCardBack
                :id="id"
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
        id: {
            type: Number,
            default: 0,
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
    },
    created() {
        if (this.id === 0) this.editing = true;
    },
}

</script>