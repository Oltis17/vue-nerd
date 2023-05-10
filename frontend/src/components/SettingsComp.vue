<template>
    <div class="wrapper">
        <div>
            <span style="padding-right: 20px;">
                Time:
            </span>
            <Toggle v-model="$store.state.time" onLabel="UTC" offLabel="local" class="toggle-time"/> 

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
@media (max-width: 800px) {
    .wrapper {
        background-color: transparent !important;
        border-radius: 0px !important;
        position: inherit !important;
    }
}
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