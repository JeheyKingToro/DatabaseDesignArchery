<template>

<div class="container mt-4">

  <h1 class="mb-4">
    Club Records
  </h1>

  <div class="card p-4">

    <table class="table table-striped">

      <thead>
        <tr>
          <th>Archer</th>
          <th>Round</th>
          <th>Club Record</th>
        </tr>
      </thead>

      <tbody>

        <tr
          v-for="record in records"
          :key="record.round_name"
        >
          <td>
            {{ record.first_name }}
            {{ record.last_name }}
          </td>

          <td>{{ record.round_name }}</td>

          <td>{{ record.club_record }}</td>
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

const records = ref([])

async function loadRecords() {

  const response = await fetch(
    'http://localhost/archery-api/api.php?action=getClubRecords'
  )

  records.value = await response.json()
}

onMounted(() => {
  loadRecords()
})

</script>