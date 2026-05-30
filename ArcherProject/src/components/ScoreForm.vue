<template>
    <div class="card shadow-sm mb-4">
        <div class="card-body">
            <h4 class="mb-3"> Add Score </h4>
            <form @submit.prevent="submitScore">
                <div class="row">
                    <div class="col-md-3 mb-3"> <input v-model="archer_id" type="number" class="form-control"
                            placeholder="Archer ID" required /> </div>
                    <div class="col-md-3 mb-3"> <input v-model="round_id" type="number" class="form-control"
                            placeholder="Round ID" required /> </div>
                    <div class="col-md-3 mb-3"> <input v-model="equipment_id" type="number" class="form-control"
                            placeholder="Equipment ID" required /> </div>
                    <div class="col-md-3 mb-3"> <input v-model="total_score" type="number" class="form-control"
                            placeholder="Total Score" required /> </div>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-3"> <input v-model="score_date" type="datetime-local"
                            class="form-control" /> </div>
                    <div class="col-md-6 mb-3"> <select v-model="is_practice" class="form-select">
                            <option value="1"> Practice </option>
                            <option value="0"> Competition </option>
                        </select> </div>
                </div> <button class="btn btn-success"> Add Score </button>
            </form>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const archer_id = ref('')
const round_id = ref('')
const equipment_id = ref('')
const total_score = ref('') 
const score_date = ref('') 
const is_practice = ref('1') 

async function submitScore() { 
    await fetch(
        'http://localhost/archery-api/api.php?action=addScore',
        { method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
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
    alert('Score Added') 
    archer_id.value = '' 
    round_id.value = '' 
    equipment_id.value = '' 
    total_score.value = '' 
    score_date.value = '' 
} 
</script>
