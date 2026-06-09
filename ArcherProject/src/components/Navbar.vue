<template> <nav class="navbar navbar-expand-lg navbar-dark bg-dark"> 
    <div class="container"> 
    <router-link class="navbar-brand" to="/"> 
    Archery Club 

</router-link> 
<div class="navbar-nav"> 
    <router-link class="nav-link" to="/archers"> 
    Archers 

</router-link> 
<router-link class="nav-link" to="/scores"> 
    Scores 

</router-link> 
<router-link class="nav-link" to="/competitions"> 
    Competitions 

</router-link> 
<router-link class="nav-link" to="/rounds"> 
    Rounds 

</router-link> 
<router-link
  to="/records"
  class="nav-link"
>
  Records
</router-link>

<router-link
  to="/pb"
  class="nav-link"
>
  PB
</router-link>


</div> 
<div>
    <button v-if="!isAdmin" class="btn btn-outline-light btn-sm" @click="handleLogin">
        Admin Login
    </button>

    <button v-if="isAdmin" class="btn btn-outline-warning btn-sm" @click="handleLogout">
        Logout
    </button>
</div>
</div> 
</nav> 
</template>

<script setup>
import { isAdmin, login, logout } from '../store.js'

async function handleLogin() {
    const username = prompt('Username:')
    const password = prompt('Password:')
    const response = await fetch('http://localhost/archery-api/api.php?action=login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
    const data = await response.json()
    if (data.success) {
        login()
        alert('Logged in as admin')
    } else {
        alert(data.message)
    }
}

function handleLogout() {
    logout()
    alert('Logged out')
}
</script>