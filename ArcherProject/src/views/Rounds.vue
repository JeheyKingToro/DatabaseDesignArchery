<template> 

<div> 
    <h2 class="mb-4"> 
    Rounds 

</h2> 
<div v-if="isAdmin" class="border rounded p-3 mb-3 bg-light">
    <h5>Add Round</h5>
    <input
        v-model="newRound.round_name" class="form-control mb-2" placeholder="Round name">

    <input
        v-model="newRound.total_ranges" type="number" class="form-control mb-2" placeholder="Total ranges">

    <input
        v-model="newRound.description" class="form-control mb-2" placeholder="Description">

    <button @click="addRound" class="btn btn-primary">
        Add Round
    </button>
</div>
<table class="table table-bordered table-hover"> 
    <thead class="table-dark"> 
    <tr> 
    <th>ID</th> 
<th>Round Name</th> 
<th>Total Ranges</th> 
<th>Description</th> 
<th v-if="isAdmin">Actions</th>    
</tr> 
</thead> 
<tbody> 
    <tr v-for="round in rounds" :key="round.round_id"> 
<td>{{ round.round_id }}</td> 
<td>{{ round.round_name }}</td> 
<td>{{ round.total_ranges }}</td> 
<td>{{ round.description }}</td> 
<td v-if="isAdmin">         
    <button @click="deleteRound(round.round_id)" class="btn btn-sm btn-danger">Delete</button>
</td>
</tr> 
</tbody> 
</table> 
</div> 
</template> 
<script setup> 
import { ref, onMounted } from 'vue' 
import { isAdmin } from '../store.js'
const rounds = ref([]) 
const newRound = ref({
    round_name: '',
    total_ranges: '',
    description: ''
})
async function addRound() {
    if (newRound.value.round_name == '') {
        alert('Enter round name')
        return
    }
    const response = await fetch('http://localhost/archery-api/api.php?action=addRound', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRound.value)
    })
    const result = await response.json()
    alert(result.message)
    newRound.value = {
        round_name: '',
        total_ranges: '',
        description: ''
    }
    loadRounds()
}
async function deleteRound(id) {
    const checkDelete = confirm('Delete')
    if (checkDelete == false) {
        return
    }
    const response = await fetch('http://localhost/archery-api/api.php?action=deleteRound', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            round_id: id
        })
    })
    const result = await response.json()
    alert(result.message)
    loadRounds()
}
async function loadRounds() { 
    const response = await fetch( 
    'http://localhost/archery-api/api.php?action=getRounds' 

) 
rounds.value = await response.json() 

} 
onMounted(loadRounds) 
</script>