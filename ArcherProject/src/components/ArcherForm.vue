<template>
  <div class="card p-4">

    <h2 class="mb-4">
      Add Archer
    </h2>

    <form @submit.prevent="submitArcher">

      <div class="mb-3">
        <input
          v-model="first_name"
          type="text"
          class="form-control"
          placeholder="First Name"
          required
        >
      </div>

      <div class="mb-3">
        <input
          v-model="last_name"
          type="text"
          class="form-control"
          placeholder="Last Name"
          required
        >
      </div>

      <div class="mb-3">

        <select
          v-model="gender"
          class="form-select"
        >
          <option value="Male">
            Male
          </option>

          <option value="Female">
            Female
          </option>
        </select>

      </div>

      <div class="mb-3">
        <input
          v-model="date_of_birth"
          type="date"
          class="form-control"
          required
        >
      </div>

      <button
        type="submit"
        class="btn btn-primary"
      >
        Add Archer
      </button>

    </form>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const first_name = ref('')
const last_name = ref('')
const gender = ref('Male')
const date_of_birth = ref('')

async function submitArcher() {

  console.log('Button clicked')

  const payload = {
    first_name: first_name.value,
    last_name: last_name.value,
    gender: gender.value,
    date_of_birth: date_of_birth.value
  }

  console.log(payload)

  const response = await fetch(
    'http://localhost/archery-api/api.php?action=addArcher',
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(payload)
    }
  )

  const data = await response.json()

  console.log(data)

  alert(data.message)

  first_name.value = ''
  last_name.value = ''
  gender.value = 'Male'
  date_of_birth.value = ''
}
</script>

