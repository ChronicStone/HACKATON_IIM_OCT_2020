<template>
    <div>
    <div class="mb-8">
        <div class="flex justify-between">
            <vs-button
            style="float:left;"
            class="mb-6"
            :href="'public_files/example_import.xlsx'">Download reference file</vs-button>
        </div>
        <import-excel :on-success="loadDataInTable" />
    </div>

    <vx-card v-if="tableData.length && header.length">
      <vs-table
        stripe
        pagination
        :max-items="50"
        search
        :data="tableData">
        <template slot="header">
          <!--<h4>{{ sheetName }}</h4>-->
          <div class="flex justify-between">
            <div class="flex">
              <vs-button @click.prevent="comfirmImport()" class="mt-4 mb-6">Import residents</vs-button>
            </div>
          </div>
        </template>

        <template slot="thead" class="mt-4">
          <vs-th
            v-for="heading in header"
            :key="heading">{{ heading }}</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr
            :state="setError(tr, indextr)"
            :data="tr"
            :key="indextr"
            v-for="(tr, indextr) in data">
            <vs-td
              :data="col"
              v-for="(col, indexcol) in data[indextr]"
              :key="indexcol + col">
                {{col}}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vx-card>
    </div>
</template>

<script>
import ImportExcel from "@/components/excel/ImportExcel.vue";

export default {
    components: {
        ImportExcel
    },
    data() {
        return {
            tableData: [],
            tableDataErr:[],
            header: [],
            sheetName: "",
            groupName: "",
            errForm: false,
            errMails: false,
            nbFalseMail: 0,
            sentData: [],
            sortKey: "errMail",
            reverse: false,

            // EXPORT ERR
            fileName: '',
            formats:['xlsx', 'csv', 'txt'],
            cellAutoWidth: true,
            selectedFormat: 'xlsx',
            activePrompt: false
        }
    },
    computed: {

    },
    methods: {
        loadDataInTable({ results, header, meta }) {
            this.header = header
            this.tableData = results
            this.sheetName = meta.sheetName
        },
        setError(val, id) {
            const data = this.tableData[id]
            if (data.first_name && data.last_name && data.birth_date) {
                return "";
            } else {
                return "danger";
            }
        },
        comfirmImport() {
            this.$vs.dialog({
                type: "confirm",
                color: "primary",
                title: `Import`,
                text: "Import current upload as Candidates ?",
                accept: this.importRequest,
                parameters: [this.tableData],
            });
        },
        importRequest(parameters) {
            this.$vs.loading();
            const retirementHomeId = JSON.parse(localStorage.getItem('backendUser')).data.retirement_home_id
            const newResidentsArray = this.tableData.map(resident => {
                return {
                    retirement_home_id: retirementHomeId,
                    first_name: resident.first_name,
                    last_name: resident.last_name,
                    other_name: resident.other_name,
                    birth_date: resident.birth_date
                }
            })

            this.$axios
            .post("/resident/import", { residents: newResidentsArray })
            .then((response) => {
                console.log(response);
                this.$nextTick(() => {this.$vs.loading.close()})
                if(response.data.success) {
                    if(response.data.created > 0) {
                        this.$vs.notify({
                            title: 'Success',
                            text: `${response.data.created} residents have been imported !`,
                            color: 'success'
                        });
                    }
                    if(response.data.not_created > 0) {
                        this.$vs.notify({
                            title: 'Warning',
                            text: `${response.data.not_created} residents have not been imported !`,
                            color: 'warning'
                        });
                    }
                    this.$router.push('/')
                }
            })
            
        }
    }
}
</script>

<style lang="scss">

</style>