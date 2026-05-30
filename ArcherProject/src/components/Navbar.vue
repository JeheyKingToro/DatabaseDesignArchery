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

<router-link
  to="/recorder"
  class="nav-link"
>
  Recorder
</router-link>


</div> 
</div> 
</nav> 
</template>