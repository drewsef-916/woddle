<template>
    <main class="workouts-main">
        <h2>Workout of the Day</h2>
        <RandomWorkout />
        <h2>Popular Workouts</h2>
        <WorkoutList />
    </main>
</template>

<script>
import WorkoutList from '~/components/WorkoutList.vue';
import RandomWorkout from '~/components/RandomWorkout.vue';

export default {
    components: {
        WorkoutList,
        RandomWorkout
    }
}
</script>

<style lang="scss">
.workouts-main {
    h2 {
        text-align: center;
        margin: 2em 0 1em;
    }
}
</style>