<template>
    <div>
        <h1>This is the user detail page for user with id: {{ $route.params.uid }}</h1>
        <ScoresList />
    </div>
</template>

<script>
import ScoresList from '~/components/ScoresList.vue';

export default {
    components: {
        ScoresList
    },
    validate({ params, store }) {
        return params.uid === store.state.currentUser.id;
    },
}
</script>

<style>
    
</style>