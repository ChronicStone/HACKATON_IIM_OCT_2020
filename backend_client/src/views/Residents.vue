<template>
	<div>
		<div class="flex flex-wrap items-center actionsBox mt-0">
        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
          <vs-dropdown vs-trigger-click class="cursor-pointer">
            <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
              <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ residentList.length - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : totalRowsInTable }} of {{ totalRowsInTable }}</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>
            <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
            <vs-dropdown-menu>

              <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                <span>20</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(50)">
                <span>50</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(100)">
                <span>100</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(250)">
                <span>250</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>

        <!-- TABLE ACTION COL-2: SEARCH & EXPORT AS CSV -->
          <vs-input class="sm:mr-4 mr-0 sm:w-auto w-full sm:order-normal order-3 sm:mt-0 mt-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Search..." />
          <!-- <vs-button class="mb-4 md:mb-0" @click="gridApi.exportDataAsCsv()">Export as CSV</vs-button> -->

          <!-- ACTION - DROPDOWN -->
          <vs-dropdown vs-trigger-click class="cursor-pointer">

            <div class="p-3 shadow-drop rounded-lg d-theme-dark-light-bg cursor-pointer flex items-end justify-center text-lg font-medium w-32">
              <span class="mr-2 leading-none">Actions</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>

            <vs-dropdown-menu style="width:140px;">

              <vs-dropdown-item @click="$router.push('/addTestTaker')">
                <span class="flex items-center">
                  <feather-icon icon="EditIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Create</span>
                </span>
              </vs-dropdown-item>

              <vs-dropdown-item @click="$router.push('/import')">
                <span class="flex items-center">
                  <feather-icon icon="UploadIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Import</span>
                </span>
              </vs-dropdown-item>

            </vs-dropdown-menu>
          </vs-dropdown>

          <vs-button class="ml-4" @click="activeFilters = !activeFilterss">Filters</vs-button>
          <vs-tooltip text="Tooltip Default">
            <vs-button type="filled" icon="refresh" class="ml-4" @click="ReloadAPIData()"></vs-button>
          </vs-tooltip>
      </div>

		<ag-grid-vue
			ref="agGridTable"
			:components="gridComponents"
			:gridOptions="gridOptions"
			class="ag-theme-material w-100 my-4 ag-grid-table"
			:columnDefs="columnDefs"
			:defaultColDef="defaultColDef"
			:rowData="residentList"
			colResizeDefault="stretch"
			:animateRows="true"
			:floatingFilter="true"
			:pagination="true"
			:paginationPageSize="paginationPageSize"
			:suppressPaginationPanel="true"
			:enableRtl="$vs.rtl"
			rowSelection="multiple"
			@selection-changed="onSelectionChanged"
			@grid-ready="ReloadAPIData"
			:enableCellTextSelection="true"
			style="height:58vh;">
      	</ag-grid-vue>
	</div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import "@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss";
import CellRendererActions from "./cell-renderer/CellRendererActions.vue";
import CellRendererValue from "./cell-renderer/CellRendererValue.vue";
import CellRendererDate from "./cell-renderer/CellRendererDate.vue";
import CellRendererDateTime from "./cell-renderer/CellRendererDateTime.vue";
// import vSelect from "vue-select";
// import Datepicker from "vuejs-datepicker";

export default {
	components: {
		AgGridVue,
		CellRendererActions,
		CellRendererValue,
		CellRendererDate,
		CellRendererDateTime
	},
	data() {
		return {
			mounted: false,
			residentList: [],
			selected: [],

			searchQuery: '',

			// AgGrid Setup
			gridApi: null,
			columnApi: null,
			gridOptions: {},
			defaultColDef: {
				sortable: true,
				resizable: true,
				suppressMenu: true,
			},

			// AgGrid Cell Renderers
			gridComponents: {
				CellRendererValue,
				CellRendererDate,
				CellRendererDateTime,
				CellRendererActions
			},

			// AgGrid Columns def
			columnDefs: [
				{
					headerName: "ID",
					field: "id",
					width: 150,
					checkboxSelection: true,
					cellRendererFramework: "CellRendererActions",
					headerCheckboxSelectionFilteredOnly: true,
					headerCheckboxSelection: true,
				},
				{
					headerName: "First name",
					field: "first_name",
					width: 200,
					cellRendererFramework: "CellRendererValue",
					
				},
				{
					headerName: "Last name",
					field: "last_name",
					width: 200,
					cellRendererFramework: "CellRendererValue",
					
				},
				{
					headerName: "Other name",
					field: "other_name",
					width: 200,
					cellRendererFramework: "CellRendererValue",
					
				},
				{
					headerName: "Birth date",
					field: "birth_date",
					width: 200,
					cellRendererFramework: "CellRendererDate",
					
				},
				{
					headerName: "Creation date",
					field: "createdAt",
					width: 200,
					cellRendererFramework: "CellRendererDateTime",
					
				},
				{
					headerName: "Last update date",
					field: "updatedAt",
					width: 200,
					cellRendererFramework: "CellRendererDateTime",
				},
			],
		}
	},
	computed: {
		totalRowsInTable() {
			if (this.gridApi) return this.gridApi.getDisplayedRowCount()
			else return 0
		},
		paginationPageSize() {
			if (this.gridApi) return this.gridApi.paginationGetPageSize();
			else return 20;
		},
		totalPages() {
			if (this.gridApi) return this.gridApi.paginationGetTotalPages();
			else return 0;
		},
		currentPage: {
			get() {
				if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1;
				else return 1;
			},
			set(val) {
				this.gridApi.paginationGoToPage(val - 1);
			},
		},
	},
	methods: {
		updateSearchQuery(val) {
			this.gridApi.setQuickFilter(val);
		},
		onSelectionChanged() {
			var selectedRows = this.gridApi.getSelectedRows();
			this.selected = this.gridApi.getSelectedRows();
			//document.querySelector('#selectedRows').innerHTML = this.selected.length;
		},
		ready(params) {
			console.log(params);
			console.log('init');
		},
		ReloadAPIData(params) {
			if(params) {
				this.gridApi = params.api
				this.columnApi = params.columnApi
			}
			this.$vs.loading()
			this.$axios.get(`/resident/${JSON.parse(localStorage.getItem('backendUser')).data.retirement_home_id}`)
			.then((response) => {
				this.residentList = response.data.data
				this.$vs.loading.close()
				this.mounted = true
				this.gridApi.sizeColumnsToFit()
			}).catch((err) => {
				console.log(err);
			})
		},
	},	
}
</script>

<style lang="scss">

</style>
