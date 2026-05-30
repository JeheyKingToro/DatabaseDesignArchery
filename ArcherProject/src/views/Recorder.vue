```vue
<template>

<div class="container mt-4">

  <h1 class="mb-4">
    Recorder Panel
  </h1>

  <div class="card p-4">

    <table class="table table-striped">

      <thead>

        <tr>
          <th>Score ID</th>
          <th>Archer</th>
          <th>Round</th>
          <th>Equipment</th>
          <th>Total</th>
          <th>Status</th>
          <th>Competition</th>
          <th>Actions</th>
        </tr>

      </thead>

      <tbody>

        <tr
          v-for="score in scores"
          :key="score.score_id"
        >

          <td>{{ score.score_id }}</td>

          <td>
            {{ score.first_name }}
            {{ score.last_name }}
          </td>

          <td>{{ score.round_name }}</td>

          <td>{{ score.equipment_name }}</td>

          <td>{{ score.total_score }}</td>

          <td>{{ score.status }}</td>

          <td>

            <select
              class="form-select"
              v-model="score.competition_id"
            >

              <option :value="null">
                Practice Score
              </option>

              <option
                v-for="competition in competitions"
                :key="competition.competition_id"
                :value="competition.competition_id"
              >
                {{ competition.competition_name }}
              </option>

            </select>

          </td>

          <td>

            <button
              class="btn btn-success btn-sm"
              @click="approveScore(score)"
            >
              Approve
            </button>

          </td>

        </tr>

      </tbody>

    </table>

  </div>

</div>

</template>

<script setup>

import {
  ref,
  onMounted
} from 'vue'

const scores = ref([])
const competitions = ref([])

async function loadScores() {

  const response = await fetch(
    'http://localhost/archery-api/api.php?action=getStagedScores'
  )

  scores.value = await response.json()
}

async function loadCompetitions() {

  const response = await fetch(
    'http://localhost/archery-api/api.php?action=getCompetitions'
  )

  competitions.value = await response.json()
}

async function approveScore(score) {

  const response = await fetch(
    'http://localhost/archery-api/api.php?action=approveScore',
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({

        score_id: score.score_id,

        competition_id: score.competition_id

      })
    }
  )

  const data = await response.json()

  alert(data.message)

  loadScores()
}

onMounted(() => {

  loadScores()

  loadCompetitions()
})

</script>
```
