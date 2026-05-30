<template> 
<div> 
    <div class="p-5 mb-4 bg-light rounded-3"> 
    <div class="container-fluid py-5"> 
    <h1 class="display-5 fw-bold"> 
    Archery Club Database System 

</h1> 
<p class="col-md-8 fs-4"> 
    Manage archers, scores, competitions and rounds. 

</p> 
</div> 
</div> 
<div class="row"> 
    <div class="col-md-3"> 
    <div class="card text-center shadow-sm"> 
    <div class="card-body"> 
    <h5>Total Archers</h5> 
<h2>{{ totalArchers }}</h2> 
</div> 
</div> 
</div> 
<div class="col-md-3"> 
    <div class="card text-center shadow-sm"> 
    <div class="card-body"> 
    <h5>Total Scores</h5> 
<h2>{{ totalScores }}</h2> 
</div> 
</div> 
</div> 
<div class="col-md-3"> 
    <div class="card text-center shadow-sm"> 
    <div class="card-body"> 
    <h5>Competitions</h5> 
<h2>{{ totalCompetitions }}</h2> 
</div> 
</div> 
</div> 
<div class="col-md-3"> 
    <div class="card text-center shadow-sm"> 
    <div class="card-body"> 
    <h5>Rounds</h5> 
<h2>{{ totalRounds }}</h2> 
</div> 
</div> 
</div> 
</div> 
</div> 
</template> 
<script setup> 
import { ref, onMounted } from 'vue' 
const totalArchers = ref(0) 
const totalScores = ref(0) 
const totalCompetitions = ref(0) 
const totalRounds = ref(0) 
async function loadDashboard() { 
    const archers = await fetch( 
    'http://localhost/archery-api/api.php?action=getArchers' 

) 
const scores = await fetch( 
    'http://localhost/archery-api/api.php?action=getScores' 

) 
const competitions = await fetch( 
    'http://localhost/archery-api/api.php?action=getCompetitions' 

) 
const rounds = await fetch( 
    'http://localhost/archery-api/api.php?action=getRounds' 

) 
totalArchers.value = (await archers.json()).length 
totalScores.value = (await scores.json()).length 
totalCompetitions.value = (await competitions.json()).length 
totalRounds.value = (await rounds.json()).length 

} 

onMounted(loadDashboard) 
</script>