<template>
    
    <div>

        <h1>Ändra profil</h1>

    </div>

</template>

<script>   
    
    export default {
    
        data() {

            return {

                name: Meteor.user().name

            }

        }
    
    }

</script>