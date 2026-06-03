<template>

<div class="container mt-4">

  <h1 class="mb-4">
    Scores
  </h1>


  <!-- FILTERS -->

  <div class="card p-4 mb-4" v-if="isAdmin">

    <h3 class="mb-3">
      Filters
    </h3>

    <div class="row">

      <div class="col-md-4 mb-3">
        <label class="form-label">
          Start Date
        </label>
        <input
          type="date"
          class="form-control"
          v-model="startDate"
        >

      </div>

      <div class="col-md-4 mb-3">
        <label class="form-label">
          End Date
        </label>
        <input
          type="date"
          class="form-control"
          v-model="endDate"
        >

      </div>

      <div class="col-md-4 mb-3">
        <label class="form-label">
          Round
        </label>
        <select
          class="form-select"
          v-model="selectedRound"
        >

          <option value="">
            All Rounds
          </option>

          <option
            v-for="round in rounds"
            :key="round.round_id"
            :value="round.round_name"
          >
            {{ round.round_name }}
          </option>

        </select>

      </div>

    </div>

  </div>

  <!-- SCORE TABLE -->

  <div class="card p-4">

    <table class="table table-striped">

      <thead>

        <tr>
          <th>ID</th>
          <th>Archer</th>
          <th>Round</th>
          <th>Equipment</th>
          <th>Total Score</th>
          <th>Date</th>
          <th>Status</th>
        </tr>

      </thead>

      <tbody>

        <tr
          v-for="score in filteredScores"
          :key="score.score_id"
        >

          <td>{{ score.score_id }}</td>

          <td>
            {{ score.first_name }}
            {{ score.last_name }}
          </td>

          <td>
            {{ score.round_name }}
          </td>

          <td>
            {{ score.equipment_name }}
          </td>

          <td>
            {{ score.total_score }}
          </td>

          <td>
            {{ score.score_date }}
          </td>

          <td>
            {{ score.status }}
          </td>

        </tr>

      </tbody>

    </table>

  </div>

  <!-- ADD SCORE FORM -->

  <div class="card p-4 mb-4" v-if="isAdmin">

    <h3 class="mb-3">
      Add New Score
    </h3>

    <form @submit.prevent="submitScore">

      <div class="row">

        <!-- ARCHER -->

        <div class="col-md-4 mb-3">

          <label class="form-label">
            Archer
          </label>

          <select
            class="form-select"
            v-model="archer_id"
          >

            <option value="">
              Select Archer
            </option>

            <option
              v-for="archer in archers"
              :key="archer.archer_id"
              :value="archer.archer_id"
            >
              {{ archer.first_name }}
              {{ archer.last_name }}
            </option>

          </select>

        </div>

        <!-- ROUND -->

        <div class="col-md-4 mb-3">

          <label class="form-label">
            Round
          </label>

          <select
            class="form-select"
            v-model="round_id"
          >

            <option value="">
              Select Round
            </option>

            <option
              v-for="round in rounds"
              :key="round.round_id"
              :value="round.round_id"
            >
              {{ round.round_name }}
            </option>

          </select>

        </div>

        <!-- EQUIPMENT -->

        <div class="col-md-4 mb-3">

          <label class="form-label">
            Equipment
          </label>

          <select
            class="form-select"
            v-model="equipment_id"
          >

            <option value="">
              Select Equipment
            </option>

            <option
              v-for="equipment in equipmentList"
              :key="equipment.equipment_id"
              :value="equipment.equipment_id"
            >
              {{ equipment.equipment_name }}
            </option>

          </select>

        </div>

      </div>

      <div class="row">

        <!-- SCORE -->

        <div class="col-md-4 mb-3">

          <label class="form-label">
            Total Score
          </label>

          <input
            type="number"
            class="form-control"
            v-model="total_score"
          >

        </div>

        <!-- DATE -->

        <div class="col-md-4 mb-3">

          <label class="form-label">
            Score Date
          </label>

          <input
            type="datetime-local"
            class="form-control"
            v-model="score_date"
          >

        </div>

        <!-- PRACTICE -->

        <div class="col-md-4 mb-3">

          <label class="form-label">
            Score Type
          </label>

          <select
            class="form-select"
            v-model="is_practice"
          >

            <option :value="1">
              Practice
            </option>

            <option :value="0">
              Competition
            </option>

          </select>

        </div>

      </div>

      <button
        type="submit"
        class="btn btn-primary"
      >
        Submit Score
      </button>

    </form>

  </div>
</div>

</template>

<script setup>

import {ref,computed,onMounted} from 'vue'
import { isAdmin } from '../store.js'

/*
========================================
DATA
========================================
*/

const scores = ref([])
const archers = ref([])
const rounds = ref([])
const equipmentList = ref([])

/*
========================================
FORM
========================================
*/

const archer_id = ref('')
const round_id = ref('')
const equipment_id = ref('')
const total_score = ref('')
const score_date = ref('')
const is_practice = ref(1)

/*
========================================
FILTERS
========================================
*/

const startDate = ref('')
const endDate = ref('')
const selectedRound = ref('')

/*
========================================
LOAD SCORES
========================================
*/

async function loadScores() {

  const response = await fetch(
    'http://localhost/archery-api/api.php?action=getScores'
  )

  scores.value = await response.json()
}

/*
========================================
LOAD ARCHERS
========================================
*/

async function loadArchers() {

  const response = await fetch(
    'http://localhost/archery-api/api.php?action=getArchers'
  )

  archers.value = await response.json()
}

/*
========================================
LOAD ROUNDS
========================================
*/

async function loadRounds() {

  const response = await fetch(
    'http://localhost/archery-api/api.php?action=getRounds'
  )

  rounds.value = await response.json()
}

/*
========================================
LOAD EQUIPMENT
========================================
*/

async function loadEquipment() {

  const response = await fetch(
    'http://localhost/archery-api/api.php?action=getEquipment'
  )

  equipmentList.value = await response.json()
}

/*
========================================
SUBMIT SCORE
========================================
*/

async function submitScore() {

  const response = await fetch(
    'http://localhost/archery-api/api.php?action=addScore',
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({

        archer_id: archer_id.value,

        round_id: round_id.value,

        equipment_id: equipment_id.value,

        total_score: total_score.value,

        score_date: score_date.value,

        is_practice: is_practice.value
      })
    }
  )

  const data = await response.json()

  alert(data.message)

  archer_id.value = ''
  round_id.value = ''
  equipment_id.value = ''
  total_score.value = ''
  score_date.value = ''

  loadScores()
}

/*
========================================
FILTERED SCORES
========================================
*/

const filteredScores = computed(() => {

  return scores.value.filter(score => {

    const scoreDate =
      score.score_date.split(' ')[0]

    const matchStart =
      !startDate.value ||
      scoreDate >= startDate.value

    const matchEnd =
      !endDate.value ||
      scoreDate <= endDate.value

    const matchRound =
      !selectedRound.value ||
      score.round_name === selectedRound.value

    return (
      matchStart &&
      matchEnd &&
      matchRound
    )
  })
})

/*
========================================
MOUNT
========================================
*/

onMounted(() => {

  loadScores()

  loadArchers()

  loadRounds()

  loadEquipment()
})

</script>

