<template>
    <div>
        

        <div class="mainContentBloc mt-6" v-if="mounted">
            <vx-card style="width:30%;margin-right:10px;" class="profileCard" title="# RESIDENT PROFILE :">
                <div class="avatarBloc">
                    <vs-avatar size="130px" square color="primary" style="font-size:40px;font-weight:bold;" :src="getAvatarUrl" :text="residentData.first_name.charAt(0) + residentData.last_name.charAt(0)"/>
                </div>
                <vs-divider></vs-divider>
                <div class="residentDataBloc">
                    <ul class="mt-2">
                        <li v-for="(item, index) in getDisplayedData" :key="index" class="px-8" style="display:flex;justify-content:space-between;margin-bottom:10px;">
                            <span class="title">
                                <feather-icon icon="ArrowRightIcon" svg-classes="h-3 w-3 mr-2 cursor-pointer"/>
                                {{index | formatObjectKey }} :
                            </span>
                            <span v-if="index === 'createdAt' ||index === 'updatedAt'" class="value">{{item | formatDateTime}}</span>
                            <span v-else-if="index === 'birth_date'" class="value">{{item | formatDate}}</span>
                            <span v-else-if="index === 'gender'" class="value">
                                <span v-if="item === 'm'" style="color:#3F98D6;">Male</span>
                                <span v-if="item === 'f'" style="color:#FAACCA;">Female</span>
                            </span>
                            <span v-else class="value">{{item | formatNull}}</span>
                        </li>
                    </ul>
                </div>
            </vx-card>


            <vx-card title="# RESIDENT CONTACTS :" style="width:70%;margin-left:10px;">
                <vs-table multiple v-model="selectedContacts" pagination max-items="8" search :data="residentContacts">
                    <template slot="header">
                        <vx-tooltip text="Add new contact">
                            <vs-button radius color="primary" icon="add"></vs-button>
                        </vx-tooltip>
                    </template>
                    <template slot="thead">
                        <vs-th sort-key="id">
                            ID
                        </vs-th>
                        <vs-th sort-key="first_name">
                            First name
                        </vs-th>
                        <vs-th sort-key="last_name">
                            Last name
                        </vs-th>
                        <vs-th sort-key="email">
                            Email
                        </vs-th>
                        <vs-th sort-key="phone_number">
                            Phone number
                        </vs-th>
                    </template>

                    <template slot-scope="{data}">
                        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].id}}
                            </vs-td>
                            <vs-td :data="data[indextr].first_name">
                                {{data[indextr].first_name}}
                            </vs-td>
                            <vs-td :data="data[indextr].last_name">
                                {{data[indextr].last_name}}
                            </vs-td>
                            <vs-td :data="data[indextr].email">
                                {{data[indextr].email}}
                            </vs-td>
                            <vs-td :data="data[indextr].phone_number">
                                {{data[indextr].phone_number}}
                            </vs-td>
                        </vs-tr>
                    </template>
                </vs-table>
            </vx-card>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            mounted: false,
            residentData: null,
            residentContacts: null,
            selectedContacts: [],
            breadcrumb: [{
                title: "Residents list",
                url: '/'
            }, {
                title: 'Resident profile',
                active: true
            }]
        }
    },
    mounted() {
        this.ReloadAPIData()
    },
    computed: {
        getAvatarUrl() {
            if(this.residentData && this.residentData.resident_photo) return this.$assetUrl + `/avatar/${this.residentData.resident_photo}`
            else return null
        },
        getDisplayedData() {
            var data = this.residentData
            delete data.resident_contacts
            delete data.retirement_home_id
            delete data.id
            delete data.resident_photo
            return data
        }
    },
    methods: {
        ReloadAPIData() {
            this.mounted = false
            this.$axios
            .get(`/resident/${JSON.parse(localStorage.getItem('backendUser')).data.retirement_home_id}/${this.$route.params.id}`)
            .then((response) => {
                this.residentData = response.data.data
                this.residentContacts = response.data.data.resident_contacts
                this.mounted = true
            }).catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>

<style lang="scss">
.mainContentBloc {
    display: flex;
    .profileCard {
        .avatarBloc {
            display:grid;
            place-items:center;
        }
    }
}
</style>