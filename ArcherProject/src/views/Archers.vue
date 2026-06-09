
<template>

    <div class="container mt-4">

        <h1 class="mb-4">
            Archers
        </h1>

        <!-- ARCHER TABLE -->

        <div class="card p-4">

            <h3 class="mb-3">
                Archer List
            </h3>

            <table class="table table-striped">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>

                        <th>Age</th>
                        <th>Class</th>


                        <th>Date Of Birth</th>
                        <th v-if="isAdmin">
                            Actions
                        </th>
                    </tr>

                </thead>



                <tbody>


                    <tr v-for="archer in archers" :key="archer.archer_id">

                        <td>{{ archer.archer_id }}</td>
                        <td>{{ archer.first_name }}</td>
                        <td>{{ archer.last_name }}</td>
                        <td>{{ archer.gender }}</td>


                        <td>{{ calculateAge(archer.date_of_birth) }}</td>

                        <td>
                            {{ getArcherClass(
                                archer.date_of_birth,
                                archer.gender
                            ) }}
                        </td>
                        <td>{{ archer.date_of_birth }}</td>


                        <td v-if="isAdmin">

                            <button class="btn btn-warning btn-sm me-2" @click="editArcher(archer)">
                                Edit
                            </button>

                            <button class="btn btn-danger btn-sm" @click="deleteArcher(archer.archer_id)">
                                Delete
                            </button>

                        </td>

                    </tr>



                </tbody>

            </table>

        </div>

        <!-- ADD ARCHER FORM -->

        <div class="card p-4 mb-4" v-if="isAdmin">

            <form @submit.prevent="submitArcher">

                <div class="mb-3">
                    <input v-model="first_name" class="form-control" type="text" placeholder="First Name">
                </div>

                <div class="mb-3">
                    <input v-model="last_name" class="form-control" type="text" placeholder="Last Name">
                </div>

                <div class="mb-3">

                    <select v-model="gender" class="form-select">
                        <option value="Male">
                            Male
                        </option>

                        <option value="Female">
                            Female
                        </option>
                    </select>

                </div>

                <div class="mb-3">
                    <input v-model="date_of_birth" class="form-control" type="date">
                </div>

                <button type="submit" class="btn btn-primary">
                    Add Archer
                </button>

            </form>

        </div>


    </div>

</template>

<script setup>

import {ref,onMounted} from 'vue'
import {isAdmin} from '../store.js'

const archers = ref([])
const editing = ref(false)
const current_id = ref(null)
const first_name = ref('')
const last_name = ref('')
const gender = ref('Male')
const date_of_birth = ref('')

async function loadArchers() {

    const response = await fetch(
        'http://localhost/archery-api/api.php?action=getArchers'
    )

    const data = await response.json()

    archers.value = data
}

function editArcher(archer) {

    editing.value = true

    current_id.value = archer.archer_id

    first_name.value = archer.first_name
    last_name.value = archer.last_name
    gender.value = archer.gender
    date_of_birth.value = archer.date_of_birth
}

async function deleteArcher(id) {

    if (!confirm('Delete this archer?')) {
        return
    }

    const response = await fetch(
        'http://localhost/archery-api/api.php?action=deleteArcher',
        {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                archer_id: id
            })
        }
    )

    const data = await response.json()

    alert(data.message)

    loadArchers()
}

async function submitArcher() {

    if (
        !first_name.value ||
        !last_name.value ||
        !date_of_birth.value
    ) {

        alert('Please fill all fields')

        return
    }

    let action = 'addArcher'

    if (editing.value) {
        action = 'updateArcher'
    }

    const response = await fetch(
        `http://localhost/archery-api/api.php?action=${action}`,
        {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                archer_id: current_id.value,
                first_name: first_name.value,
                last_name: last_name.value,
                gender: gender.value,
                date_of_birth: date_of_birth.value
            })
        }
    )

    const data = await response.json()

    alert(data.message)

    first_name.value = ''
    last_name.value = ''
    gender.value = 'Male'
    date_of_birth.value = ''

    editing.value = false
    current_id.value = null

    loadArchers()
}

function calculateAge(date_of_birth) {

    const today = new Date()

    const birthDate = new Date(date_of_birth)

    let age = today.getFullYear() - birthDate.getFullYear()

    const monthDifference =
        today.getMonth() - birthDate.getMonth()

    if (
        monthDifference < 0 ||
        (
            monthDifference === 0 &&
            today.getDate() < birthDate.getDate()
        )
    ) {
        age--
    }

    return age
}

function getArcherClass(date_of_birth, gender) {

    const age = calculateAge(date_of_birth)

    if (age >= 70) {
        return `70+ ${gender}`
    }

    if (age >= 60) {
        return `60+ ${gender}`
    }

    if (age >= 50) {
        return `50+ ${gender}`
    }

    if (age < 14) {
        return `Under 14 ${gender}`
    }

    if (age < 16) {
        return `Under 16 ${gender}`
    }

    if (age < 18) {
        return `Under 18 ${gender}`
    }

    if (age < 21) {
        return `Under 21 ${gender}`
    }

    return `${gender} Open`
}




onMounted(() => {
    loadArchers()
})

</script>
