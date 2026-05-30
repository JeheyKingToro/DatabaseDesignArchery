<template>

<div class="container mt-4">

  <h1 class="mb-4">
    Personal Bests
  </h1>

  <div class="card p-4">

    <table class="table table-striped">

      <thead>
        <tr>
          <th>Archer</th>
          <th>Round</th>
          <th>PB</th>
        </tr>
      </thead>

      <tbody>

        <tr
          v-for="pb in pbs"
          :key="pb.round_name"
        >
          <td>
            {{ pb.first_name }}
            {{ pb.last_name }}
          </td>

          <td>{{ pb.round_name }}</td>

          <td>{{ pb.personal_best }}</td>
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

const pbs = ref([])

async function loadPBs() {

  const response = await fetch(
    'http://localhost/archery-api/api.php?action=getPBs'
  )

  pbs.value = await response.json()
}

onMounted(() => {
  loadPBs()
})

</script>