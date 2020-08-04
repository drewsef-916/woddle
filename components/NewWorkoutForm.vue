<template>
    <main class="add-workout">
        <p>Add workout steps starting with the time requirement for an AMRAP, the rep scheme, or the number of rounds necessary for completion.</p>
        <p>Here's good ol' Fran for an example:</p>
        <ol>
            <li>21 - 15 - 9</li>
            <li>Thrusters (95#/65#)</li>
            <li>Pull-ups</li>
        </ol>
        <p>For an AMRAP-style workout like Cindy, steps should go like this:</p>
        <ol>
            <li>AMRAP 20</li>
            <li>5 pull-ups</li>
            <li>10 push-ups</li>
            <li>15 air squats</li>
        </ol>
        <p>And for EMOM workouts:</p>
        <ol>
            <li>EMOM 15</li>
            <li>Min 1: 8 db thruster (45#/35#)</li>
            <li>Min 2: 30 double under</li>
            <li>Min 3: 10 alt db lunge (45#/35#)</li>
        </ol>
        <v-form @submit.prevent="onSave">
            <v-text-field label="Workout Name" v-model="newWorkout.name"></v-text-field>
            <v-select label="Workout Type" :items="workoutTypes" v-model="newWorkout.type" required></v-select>
            <v-text-field label="Workout Step" v-model="currentStep">{{ currentStep }}</v-text-field>
            <v-text-field label="Notes" v-model="newWorkout.notes"></v-text-field>
            <v-btn @click="addStep"><v-icon depressed small>mdi-plus-thick</v-icon>&nbsp;Add Step</v-btn>
            <v-btn depressed large type="submit">Save</v-btn>
        </v-form>
    </main>
</template>

<script>
export default {
    data: () => ({
        valid: false,
        currentStep: '',
        workoutTypes: ['For Completion/EMOM', 'For Time', 'For Rounds/AMRAP', 'For Weight'],
        newWorkout: {
            name: '',
            type: '',
            notes: '',
            steps: []
        }
    }),
    methods: {
        onSave() {
            this.$store.dispatch('newWorkout', this.newWorkout);
        },
        addStep() {
            if (this.currentStep === '') return
            this.newWorkout.steps.push(this.currentStep);
            this.currentStep = '';
        }
    }
}
</script>

<style lang="scss">
.add-workout {
    ol {
        margin-bottom: 2em;
    }
    p, li {
        font-size: 1.2em;
    }
}
    input {
        border: 0;
    }
</style>