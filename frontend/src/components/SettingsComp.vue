<template>
    <div class="wrapper">
        <div>
            <Toggle v-model="$store.state.time" onLabel="UTC" offLabel="local" class="toggle-time"/> 
            <span>
                Time
            </span>
        </div>
        
    </div>
</template>

<script>
import Toggle from '@vueform/toggle'
export default {
  data() {
    return {
        localTime: false,
    };
  },
  components: {
    Toggle,
  },
  

}
</script>

<style src="@vueform/toggle/themes/default.css"></style>
<style scoped>
.wrapper {
    position: absolute;
    top: 0px;
    right: -80px;
    background-color: rgb(77, 77, 77);

    padding: 10px;
    border-radius: 12px;
    width: 150px;
    
}

.wrapper div {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.toggle-time {
    --toggle-width: 4rem;
}

span {
    color: white;
}

</style>