<template>
    <div class="workout-list">
        <v-card class="workout-card" v-for="workout in workouts" :key="workout.workoutId">
            <nuxt-link :to="'/workouts/' + workout.workoutId">
            <h5>{{ workout.name }}</h5>
            <ul>
                <li v-for="(step, index) in workout.steps" :key="index">{{ step }}</li>
            </ul>
            </nuxt-link>
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    created() {
        if (!this.$store.state.loadedWorkouts) this.$store.dispatch('getWorkouts');
    },
    computed: {
        workouts() {
            return this.$store.state.loadedWorkouts;
        }
    }
}
</script>

<style lang="scss">
    div.workout-list {
        list-style: none;
        padding-left: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        .workout-card {
            flex: 0 1 30%;
            margin: 1%;

            h5 {
                color: #3af064;
            }
            li {
                color: #fff;
                list-style: none;
            }
        }
    }
</style>