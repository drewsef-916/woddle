<template>
    <div>
        <h2>Recent Workouts:</h2>
        <article v-for="score in scores" :key="score.id">
            <h3>Score for workout id: {{ score.workoutId }}</h3>
            <p>Workout completed on: {{ secondsToDate(score.workoutDate.seconds) }}</p>
        </article>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    mounted() {
        this.$store.dispatch('getUserScores');
    },
    methods: {
        secondsToDate(seconds) {
            return new Date(seconds * 1000).toLocaleDateString()
        }
    },
    computed: {
        scores() {
            let scoreAndWorkoutList = []; 
            const scores = this.$store.state.userScores.forEach(score => {
                let scoreWithWorkout = {};
                // const {name, notes, steps, type} = this.$store.state.loadedWorkouts.filter(workout => workout.workoutId === score.workoutId);
                const matchedWorkout = this.$store.state.loadedWorkouts.filter(workout => workout.workoutId === score.workoutId);
            });
            return this.$store.state.userScores;
        }
    }
}
</script>

<style lang="scss">
    ul {
        list-style: none;
    }
</style>