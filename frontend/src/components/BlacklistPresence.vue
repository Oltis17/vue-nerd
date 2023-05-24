<template>
    <div style="overflow-x: auto;">
        <table class="is-desktop">
            <tr>
                <td rowspan="3">Blacklist</td>
                <td colspan="30" style="text-align: center;">Last 30 Days</td>
            </tr>
            <tr>
                <td v-for="(v, k) in months" :key="k" :colspan="v" style="border-left: 1px solid white; padding-left: 5px;"><span v-if="v > 2">{{ k }}</span></td>
            </tr>
            <tr>
                
                <td v-for="d in days" :key="d">{{ d }}</td>
            </tr>
            
            <tr v-for="b in bl" :key="b">
                <td style="text-align: right; padding-right: 10px;">{{ b.name }}</td>
                <td v-for="(k, v) in days" :key="k" :class="{yes: b.history.includes(v)}" :title="`${b.name} ${v}`" class="grey">
                    <span v-if="b.history.includes(v)"><i class="fa fa-solid fa-check"></i></span>
                    <span v-else><i class="fa fa-solid fa-xmark"></i></span>
                </td>
            </tr>
        </table>
    </div>
    

</template>

<script>
import moment from 'moment';

export default {
    props: ['bl'],
    data() {
        return {
            days: {},
            months: {},
        };
    },
    mounted() {
        var today = new Date();
        for (var i = 30; i >= 0; i--) {
            var date = new Date(new Date().setDate(today.getDate() - i));
            var month = moment(date).format("MMM YYYY");
            if (month in this.months) {
                this.months[month] += 1;
            }
            else {
                this.months[month] = 1;
            }
            var full = moment(date).format("YYYY-MM-DD");
            var short = moment(date).format("DD");
            this.days[full] = short;
        }

    }
}


</script>

<style scoped>
@media screen(max-width: 800px) {
    .is-mobile {
        display: block !important;
    }
    .is-desktop {
        display: none !important;
    }
}

.is-mobile {
    display: none;
}
.yes {
    background-color: green !important;
}

td {
    text-align: center;
    padding: 4px;
}

.grey {
    background-color: rgba(240, 255, 255, 0.192);
}

table {
    border-collapse: collapse;
}

</style>