<template> 

<div> 
    <h2 class="mb-4"> 
    Rounds 

</h2> 
<table class="table table-bordered table-hover"> 
    <thead class="table-dark"> 
    <tr> 
    <th>ID</th> 
<th>Round Name</th> 
<th>Total Ranges</th> 
<th>Description</th> 
</tr> 
</thead> 
<tbody> 
    <tr v-for="round in rounds" :key="round.round_id"> 
<td>{{ round.round_id }}</td> 
<td>{{ round.round_name }}</td> 
<td>{{ round.total_ranges }}</td> 
<td>{{ round.description }}</td> 
</tr> 
</tbody> 
</table> 
</div> 
</template> 
<script setup> 
import { ref, onMounted } from 'vue' 
const rounds = ref([]) 
async function loadRounds() { 
    const response = await fetch( 
    'http://localhost/archery-api/api.php?action=getRounds' 

) 
rounds.value = await response.json() 

} 
onMounted(loadRounds) 
</script>