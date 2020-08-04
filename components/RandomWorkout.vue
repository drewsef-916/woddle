<template>
    <v-card class="random-wod">
        <v-card-title><h3>{{ workoutOfTheDay.name }}</h3></v-card-title>
        <ul>
            <li v-for="step in workoutOfTheDay.steps" :key="step.index">{{ step }}</li>
        </ul>
        <v-card-actions class="actions">
            <nuxt-link :to="'/workouts/' + workoutOfTheDay.workoutId">
                <v-btn id="wod-button" depressed large>Let's Do This! 💪</v-btn>
            </nuxt-link>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    data() {
        return {}
    },
    computed: {
        workoutOfTheDay() {
            console.log(this.$store.state.wod);
            return this.$store.state.wod;
        }
    },
    created() {
        this.$store.dispatch('generateRandomWod');
    }
}
</script>

<style scoped lang="scss">
    #wod-button {
        background-color: #eb34e5;
    }
    .random-wod {
        text-align: center;

        h3 {
            margin: auto;
        }
        ul {
            padding-left: 0;

            li {
                list-style: none;
            }
        }
    }
    .actions {
        display: flex;
        justify-content: center;
    }
</style>