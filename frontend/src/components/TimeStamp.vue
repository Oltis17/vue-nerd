<template>
    <span>
        <span v-if="!moreThan30(date)">
            <Timeago :datetime="date"/> ({{dateTime(date)}})
        </span>
        <span v-if="moreThan30(date)">
            {{dateTime(date)}}
        </span>
    </span>
</template>

<script>
import { Timeago } from 'vue2-timeago';
import moment from 'moment';

export default {
    props: ['date'],
    components: {
        Timeago,
    },
    methods: {
        dateTime(value) {
        return moment(value).format(' DD MMMM YYYY, HH:MM');
        },
        moreThan30(value) {
            const then = moment(value);
            const now = moment(new Date());
            if (now.diff(then, 'days') > 31) {
                return true;
            }
            return false;
        },
    }
};

</script>