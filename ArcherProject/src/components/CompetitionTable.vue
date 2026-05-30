<template>
    <div class="card shadow-sm">
        <div class="card-body">
            <h4 class="mb-3"> Competition Results </h4>
            <table class="table table-bordered table-hover">
                <thead class="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Competition</th>
                        <th>Date</th>
                        <th>Round ID</th>
                        <th>Championship</th>
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
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>    
    import { ref, onMounted } from 'vue' 
    const competitions = ref([]) 

    async function loadCompetitions() { 
        const response = await fetch(
            'http://localhost/archery-api/api.php?action=getCompetitions')

            competitions.value = await response.json() 
            } 
            onMounted(loadCompetitions) 
</script>
