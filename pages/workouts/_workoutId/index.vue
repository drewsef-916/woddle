<template>
    <main class="workout-detail">
        <h1>{{ workout.name }}</h1>
        <p>{{ workout.workoutId }}</p>
        <p>{{ workout.type }}</p>
        <ul class="workout-instructions">
            <li v-for="(step, index) in workout.steps" :key="index">{{ step }}</li>
        </ul>
        <section v-if="!!this.$store.state.currentUser.id">
            <h3>Log your score!</h3>
            <v-form @submit.prevent="scoreWorkout">
                <div v-if="workoutType === 'For Time'">
                    <v-text-field type="number" label="minutes" v-model="minutes">{{ minutes }}</v-text-field>
                    <v-text-field type="number" label="seconds" v-model="seconds">{{ seconds }}</v-text-field>
                </div>
                <div v-else-if="workoutType === 'For Rounds/AMRAP'">
                    <v-text-field type="number" label="rounds" v-model="rounds">{{ rounds }}</v-text-field>
                    <v-text-field type="number" label="reps" v-model="reps">{{ reps }}</v-text-field>
                </div>
                <div v-else-if="workoutType === 'For Completion/EMOM'">
                    <v-checkbox v-model="completed" label="Completed"></v-checkbox>
                </div>
                <div v-else>
                    <v-text-field type="number" label="weight (lbs)" v-model="weight">{{ weight }} lbs</v-text-field>
                </div>
                <v-btn type="submit" depressed large>Submit Score</v-btn>
            </v-form>
        </section>
    </main>
</template>

<script>
export default {
    data() {
        return {
            completed: false,
            weight: 0,
            minutes: 0,
            seconds: 0,
            rounds: 0,
            reps: 0,
            workoutType: ''
        }
    },
    computed: {
        workout() {
            const [wod] = this.$store.state.loadedWorkouts.filter(workout => workout.workoutId === this.$route.params.workoutId);
            this.workoutType = wod.type;
            return wod;
        }
    },
    methods: {
        scoreWorkout() {
            let score;
            if (this.workoutType === 'For Time') {
                score = ((this.minutes * 60) + parseInt(this.seconds));
            }
            if (this.workoutType === 'For Rounds/AMRAP') {
                score = this.rounds.toString() + '/' + this.reps.toString();
            }
            if (this.workoutType === 'For Completion/EMOM') {
                score = this.completed;
            }
            if (this.workoutType === 'For Weight') {
                score = parseInt(this.weight);
            }
            this.$store.dispatch('newWorkoutScore', {
                score: score,
                userId: this.$store.state.currentUser.id,
                workoutDate: null,
                workoutId: this.workout.workoutId,
            })
        }
    }
}
</script>

<style lang="scss">
    .workout-detail {
        text-align: center;
    }
    ul.workout-instructions {
        padding: 0;
    }
</style>