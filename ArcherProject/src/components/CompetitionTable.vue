<template>
    <div class="card shadow-sm">
        <div class="card-body">
            <h4 class="mb-3"> Competition Results </h4>
            
            <div v-if="isAdmin" class="border rounded p-3 mb-3 bg-light">
                <h5>Add Competition</h5>
                <input
                    v-model="newCompetition.competition_name" class="form-control mb-2" placeholder="Competition name"
                >
                <input
                    v-model="newCompetition.competition_date" type="date" class="form-control mb-2"
                >
                <input
                    v-model="newCompetition.round_id" type="number" class="form-control mb-2" placeholder="Round ID"
                >
                <select v-model="newCompetition.is_championship" class="form-select mb-2">
                    <option value="0">Not Championship</option>
                    <option value="1">Championship</option>
                </select>
                <button @click="addCompetition"class="btn btn-primary">
                    Add Competition
                </button>

            </div>

            <table class="table table-bordered table-hover">
                <thead class="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Competition</th>
                        <th>Date</th>
                        <th>Round ID</th>
                        <th>Championship</th>
                        <th v-if="isAdmin">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="competition in competitions" :key="competition.competition_id">
                        <td> {{ competition.competition_id }} </td>
                        <td> {{ competition.competition_name }} </td>
                        <td> {{ competition.competition_date }} </td>
                        <td> {{ competition.round_id }} </td>
                        <td> <span v-if="competition.is_championship == 1" class="badge bg-success"> Yes </span> <span
                                v-else class="badge bg-secondary"> No </span> </td>
                        <td v-if="isAdmin">
                            <button @click="deleteCompetition(competition.competition_id)" class="btn btn-sm btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>    
    import { ref, onMounted } from 'vue'
    import { isAdmin } from '../store.js' 
    const competitions = ref([]) 

    async function loadCompetitions() { 
        const response = await fetch(
            'http://localhost/archery-api/api.php?action=getCompetitions')

            competitions.value = await response.json() 
            } 
            onMounted(loadCompetitions) 
    const newCompetition = ref({
    competition_name: '',
    competition_date: '',
    round_id: '',
    is_championship: '0'
})

async function addCompetition() {
    if (newCompetition.value.competition_name == '') {
        alert('Enter competition name')
        return
    }

    const response = await fetch('http://localhost/archery-api/api.php?action=addCompetition', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCompetition.value)
    })

    const result = await response.json()

    alert(result.message)

    newCompetition.value = {
        competition_name: '',
        competition_date: '',
        round_id: '',
        is_championship: '0'
    }

    loadCompetitions()
}
    async function deleteCompetition(id) {
        const check = confirm('Delete this competition?')
        if (!check) {
            return
        }
        const response = await fetch('http://localhost/archery-api/api.php?action=deleteCompetition', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                competition_id: id
            })
        })
        const result = await response.json()
        alert(result.message)
        loadCompetitions()
    }
</script>
