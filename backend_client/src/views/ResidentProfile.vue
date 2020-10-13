<template>
    <div>
        <vx-card class="p-0" style="padding:0px;display:flex;">
            <div style="display:flex;">
                <vs-icon class="mt-0 mr-2" size="small" icon="home"></vs-icon>
                <vs-breadcrumb :items="breadcrumb" separator="chevron_right"></vs-breadcrumb>
            </div>
        </vx-card>

        <pre>
            {{residentData}}
        </pre>
    </div>
</template>

<script>
export default {
    data() {
        return {
            residentData: null,
            breadcrumb: [{
                title: "Residents list",
                url: ''
            }, {
                title: 'Resident profile',
                active: true
            }]
        }
    },
    mounted() {
        this.ReloadAPIData()
    },
    methods: {
        ReloadAPIData() {
            this.$axios
            .get(`/resident/${JSON.parse(localStorage.getItem('backendUser')).data.retirement_home_id}/${this.$route.params.id}`)
            .then((response) => {
                this.residentData = response.data.data
            }).catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>

<style lang="scss">

</style>