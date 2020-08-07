import Vuex from 'vuex';
import axios from 'axios';

import { fireDbDate, fireDb, fireBaseAuth } from "~/plugins/firebase.js";

const scoresCollection = fireDb.collection("scores");
const workoutsCollection = fireDb.collection("workouts");
const usersCollection = fireDb.collection("user-details");

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedWorkouts: [],
            userScores: [],
            currentUser: {
                email: '',
                id: '',
                firstName: '',
                lastName: ''
            },
            wod: {
                name: '',
                workoutId: '',
                steps: [],
                type: '',
                notes: ''
            }
        },
        mutations: {
            setWorkouts(state, workouts) {
                state.loadedWorkouts = workouts;
            },
            setCurrentUser(state, userInfo) {
                state.currentUser.email = userInfo.email;
                state.currentUser.id = userInfo.uid;
            },
            setUserDetails(state, details) {
                state.currentUser.firstName = details.firstName;
                state.currentUser.lastName = details.lastName;
            },
            signOutCurrentUser(state) {
                state.currentUser.email = '';
                state.currentUser.id = '';
            },
            setUserScores(state, scores) {
                state.userScores = scores;
            },
            setRandomWod(state, wod) {
                state.wod.name = wod.name;
                state.wod.workoutId = wod.workoutId;
                state.wod.steps = wod.steps;
                state.wod.type = wod.type;
                state.wod.notes = wod.notes;
            }
        },
        actions: {

            // Workout Actions
            getWorkouts({commit}) {
                workoutsCollection.get()
                .then(querySnapshot => {
                    let workoutList = [];
                    querySnapshot.forEach(doc => {
                        workoutList.push({
                            workoutId: doc.id,
                            name: doc.data().name,
                            type: doc.data().type,
                            steps: doc.data().steps,
                            notes: doc.data().notes
                        })
                    })
                    commit('setWorkouts', workoutList);
                })
                .catch(err => console.log('Something went wrong with the workouts fetch', err))
            },
            newWorkout({commit}, workoutData) {
                workoutsCollection.add({
                    name: workoutData.name,
                    type: workoutData.type,
                    notes: workoutData.notes,
                    steps: workoutData.steps
                })
                .then(docRef => console.log("Document written with ID: ", docRef.id))
                .catch(err => console.log("Error adding workout: ", err))
            },
            getUserScores(context) {
                scoresCollection.where("userId", "==", context.state.currentUser.id)
                .get()
                .then(querySnapshot => {
                    let scoresList = [];
                    querySnapshot.forEach(doc => {
                        scoresList.push({
                            score: doc.data().score,
                            userId: doc.data().userId,
                            workoutDate: doc.data().workoutDate,
                            workoutId: doc.data().workoutId
                        })
                    })
                    context.commit('setUserScores', scoresList);
                })
                .catch(err => console.log('getUserScores error', err));
            },
            newWorkoutScore({commit}, scoreData) {
                scoresCollection.add({
                    score: scoreData.score,
                    userId: scoreData.userId,
                    workoutDate: fireDbDate.fromDate(new Date()),
                    workoutId: scoreData.workoutId,
                })
                .then(docRef => console.log(`Document written with id: ${docRef.id}`))
                .catch(err => console.log("Error adding score: ", err))
            },
            generateRandomWod(context) {
                if (context.state.loadedWorkouts) {
                    const workoutIndex = Math.floor(Math.random() * context.state.loadedWorkouts.length);
                    const wod = context.state.loadedWorkouts[workoutIndex];
                    context.commit('setRandomWod', wod);
                }
            },

            // User Actions
            createUser(context, userData) {
                return fireBaseAuth.createUserWithEmailAndPassword(userData.email, userData.password)
                .catch(function (error) {
                    console.log(error);
                });
            },
            signInUser({commit}, userData) {
                return fireBaseAuth.signInWithEmailAndPassword(userData.email, userData.password)
                .then(({user}) => {
                    commit('setCurrentUser', user);
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            signOutUser({commit}) {
                return fireBaseAuth.signOut().then(function () {
                    commit('signOutCurrentUser');
                }).catch(function (error) {
                    console.log(error, 'unable to sign out user');
                });
            },
            getUserDetails(context) {
                usersCollection.where("userId", "==", context.state.currentUser.id)
                .get()
                .then(querySnapshot => {
                    let matchingUser = [];
                    querySnapshot.forEach(doc => {
                        matchingUser.push({
                            firstName: doc.data().firstName,
                            lastName: doc.data().lastName
                        })
                    })
                    context.commit('setUserDetails', matchingUser[0])
                })
                .catch(err => console.log("getUserDetails error", err))
            },
        },
        getters: {}
    })
}

export default createStore;