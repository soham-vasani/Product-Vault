$(function() {
	CategoryAppend();
	addDataToTable();
})

toastr.options = {
	"closeButton": true,
	"debug": false,
	"newestOnTop": false,
	"progressBar": false,
	"positionClass": "toast-top-right",
	"preventDuplicates": false,
	"onclick": null,
	"showDuration": "2000",
	"hideDuration": "2000",
	"timeOut": "1000",
	"extendedTimeOut": "1000",
	"showEasing": "swing",
	"hideEasing": "linear",
	"showMethod": "fadeIn",
	"hideMethod": "fadeOut"
}


function addBtn() {
	$("#activeChBox").hide();
	clearSubCategoryInputs();
	$("a[name='saveBtn']").attr('id', '0');
	$("#active").prop("checked", true);
}

function EditBtn(clickedId) {

	$("#activeChBox").show();
	//if user click on edit btn then setting the id of save button = clickedId.
	$("a[name='saveBtn']").attr('id', clickedId);

	let api = `http://localhost:9090/selectEachSubCategoryData/${clickedId}`;

	fetch(api)
		.then(response => {
			if (!response.ok) {
				throw new Error("network response wa not ok!");
			}
			return response.json();
		})
		.then(eachCategoryData => {
			clearSubCategoryInputs();
			
			//getting data
			let categoryId = eachCategoryData.categoryId;
			let subCategoryName = eachCategoryData.subCategoryName;
			let subCategoryDescription = eachCategoryData.subCategoryDescription;
			let subCategoryActiveBool = Boolean(eachCategoryData.activeId);

			//filling the data.
			//it select the option where option id = categoryId.
			$("#categoryDropDown option#" + categoryId).prop("selected", true);
			$("#categoryDropDown").selectpicker("refresh")
			$("#subCategoryName").val(subCategoryName);
			$("#subCategoryDescription").val(subCategoryDescription);
			$("#active").prop("checked", subCategoryActiveBool);

		})
		.catch(error => {
			console.log("error: ", error);
		})
}

function InsertAndUpdateSubCategory() {

	let categoryName = $("#categoryDropDown option:selected").text();
	let categoryId = $("#categoryDropDown option:selected").attr('id');
	let subCategoryId = $("a[name='saveBtn']").attr('id');
	let subCategoryName = $("#subCategoryName").val();
	let subCategoryDescription = $("#subCategoryDescription").val();
	let subCategoryActive = $("#active").is(":checked");
	let subCategoryActiveInt = Number(subCategoryActive);

	if (subCategoryValidate(categoryId, categoryName, subCategoryName, subCategoryDescription)) {


		let api = `http://localhost:9090/InsertUpdateSubCategory`;

		fetch(api, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				categoryId: categoryId,
				subCategoryId: subCategoryId,
				activeId: subCategoryActiveInt,
				subCategoryName: subCategoryName,
				subCategoryDescription: subCategoryDescription
			}
			)
		})
			.then(response => {
				if (!response.ok) {
					throw new Error("network response was not ok!");
				}
				return response.text();
			})
			.then(checkStatus => {

				console.log(checkStatus);

				if (checkStatus == "sub category already exist.") {
					toastr.error("sub category already exist.");
				}
				else if (checkStatus == "sub category inserted.") {
					//here data is correct show model is hiding.
					$("#subCategoryModel").modal('hide');
					toastr.success("sub category inserted.");
				}
				else if (checkStatus == "sub category updated.") {
					//here data is correct show model is hiding.
					$("#subCategoryModel").modal('hide');
					toastr.success("sub category updated.");
				}
				addDataToTable();
			})
			.catch(error => {
				console.log("error :- ", error);
			})

	}
	/*else{
		
		//by default model is showing because i remove data-dismiss="modal" in jsp.
		
		console.log("fill correct data.");
		$("#subModel").hide();
	}*/
}


//append category into drop down list
function CategoryAppend() {

	const api = `http://localhost:9090/select`;

	fetch(api)
		.then(response => {
			if (!response.ok) {
				throw new Error("network response was not ok!");
			}
			return response.json();
		})
		.then(CategoryData => {

			for (let i = 0; i < CategoryData.length; i++) {

				let cId = CategoryData[i].categoryId;
				let cAId = CategoryData[i].activeId;
				let cName = CategoryData[i].categoryName;
				
				console.log(cId,cAId,cName);

				if (cAId != 9 && cAId != 0) {
					let options = `<option id="${cId}">${cName}</option>`;
					$("#categoryDropDown").append(options);
				}
			}
			$("#categoryDropDown").selectpicker("refresh");
		})
		.catch(error => {
			console.log("Error: ", error);
		})
}

function addDataToTable() {

	const api = "http://localhost:9090/selectSubCategoryData";

	fetch(api)
		.then(response => {
			if (!response.ok) {
				throw new Error("network response was not ok!");
			}
			return response.json();
		})
		.then(allSubCategoryData => {

			let subCategoryTable = $("#subcategory_table").DataTable();

			subCategoryTable.clear().draw();

			allSubCategoryData.forEach((item) => {

				let categoryId = item.category_id;
				let categoryName = item.category_name;
				let subCategoryId = item.sub_category_id;
				let activeId = item.active_id;
				let subCategoryName = item.sub_category_name;
				let subCategoryDescription = item.sub_category_description;

				if (activeId == 0) {

					subCategoryTable.row.add([

						`<span data-toggle="modal" data-target=".addmodal">
							<a onClick="EditBtn(${subCategoryId})" class=" " data-toggle="tooltip" data-placement="bottom" data-original-title="Edit" href="javascript:void(0);">
								<i class="fas fa-edit m-r-5 text-success"></i>
							</a>
						</span>
						<a onClick="deleteSubCategory(${subCategoryId})" data-toggle="tooltip" data-placement="bottom" data-original-title="Delete">
							<i class="far fa-trash-alt  text-success"></i>
						</a>`,
						`<span class="badge badge-danger">No</span>`,
						subCategoryId,
						categoryName,
						subCategoryName,
						subCategoryDescription

					]).draw();

				} else if (activeId == 1) {

					subCategoryTable.row.add([

						`<span data-toggle="modal" data-target=".addmodal">
							<a onClick="EditBtn(${subCategoryId})" class=" " data-toggle="tooltip" data-placement="bottom" data-original-title="Edit" href="javascript:void(0);">
								<i class="fas fa-edit m-r-5 text-success"></i>
							</a>
						</span>
						<a onClick="deleteSubCategory(${subCategoryId})" data-toggle="tooltip" data-placement="bottom" data-original-title="Delete">
							<i class="far fa-trash-alt  text-success"></i>
						</a>`,
						`<span class="badge badge-success">Yes</span>`,
						subCategoryId,
						categoryName,
						subCategoryName,
						subCategoryDescription

					]).draw();


				}

			})

		})
		.catch(error => {
			console.log("error:- ", error);
		})
}


/*function addDataToTable() {

	const api = "http://localhost:9090/selectSubCategoryData";

	fetch(api)
		.then(response => {
			if (!response.ok) {
				throw new Error("network response was not ok!");
			}
			return response.json();
		})
		.then(allSubCategory => {

			$("#tBody").empty();

			for (let i = 0; i < allSubCategory.length; i++) {

				let categoryId = allSubCategory[i].category_id;
				let categoryName = allSubCategory[i].category_name;
				let subCategoryId = allSubCategory[i].sub_category_id;
				let activeId = allSubCategory[i].active_id;
				let subCategoryName = allSubCategory[i].sub_category_name;
				let subCategoryDescription = allSubCategory[i].sub_category_description;

				if (activeId == 0) {

					let trData =
						`<tr>
					<td class="text-center">
						<span data-toggle="modal" data-target=".addmodal">
							<a onClick="EditBtn(${subCategoryId})" class=" " data-toggle="tooltip" data-placement="bottom" data-original-title="Edit" href="javascript:void(0);">
								<i class="fas fa-edit m-r-5 text-success"></i>
							</a>
						</span>
						<a onClick="deleteSubCategory(${subCategoryId})" data-toggle="tooltip" data-placement="bottom" data-original-title="Delete">
							<i class="far fa-trash-alt  text-danger"></i>
						</a>
					</td>
					<td class=""><span class="badge badge-danger">No</span></td>
					<td>${subCategoryId}</td>
					<td>${categoryName}</td>
					<td>${subCategoryName}</td>
					<td>${subCategoryDescription}</td>
				</tr>`;

					$("#tBody").append(trData);
					$("#tBody").selectpicker("refresh");

				} else if (activeId == 1) {

					let trData =
						`<tr>
					<td class="text-center">
						<span data-toggle="modal" data-target=".addmodal">
							<a onClick="EditBtn(${subCategoryId})" class=" " data-toggle="tooltip" data-placement="bottom" data-original-title="Edit" href="javascript:void(0);">
								<i class="fas fa-edit m-r-5 text-success"></i>
							</a>
						</span>
						<a onClick="deleteSubCategory(${subCategoryId})" data-toggle="tooltip" data-placement="bottom" data-original-title="Delete">
							<i class="far fa-trash-alt  text-danger"></i>
						</a>
					</td>
					<td class=""><span class="badge badge-success">Yes</span></td>
					<td>${subCategoryId}</td>
					<td>${categoryName}</td>
					<td>${subCategoryName}</td>
					<td>${subCategoryDescription}</td>
				</tr>`;

					$("#tBody").append(trData);
					$("#tBody").selectpicker("refresh");

				}
			}

		})
		.catch(error => {
			console.log("error:- ", error);
		})
}
*/
function deleteSubCategory(clickedId) {


	$.confirm({
		title: 'Record will be permenantly deleted !',
		content: 'You wont be able to undo the action.',
		theme: 'material',
		// icon: 'fas fa-exclamation-triangle',
		type: 'red',
		buttons: {
			delete: {
				btnClass: 'btn-danger btn-min-width',
				action: function() {
					$.alert('Record deleted successfully!');


					let api = `http://localhost:9090/deleteSubCategory/${clickedId}`;

					fetch(api)
						.then(response => {
							if (!response.ok) {
								throw new Error("network respoonse was not ok!");
							}
							return response.text();
						})
						.then(deleteResult => {
							if (deleteResult) {
								toastr.error("sub category deleted");
								addDataToTable();
								$("#subCategoryModel").modal('hide');
							}
						})
						.catch(error => {
							console.log("error: ", error);
						})

				}
			},
			cancel: {
				btnClass: 'btn-secondary btn-min-width',
				action: function() {
				}
			},

		}
	});


}

function clearSubCategoryInputs() {

	$("#categoryDropDown").val([]);
	$("#categoryDropDown").selectpicker("refresh");
	$("#subCategoryName").val("");
	$("#subCategoryDescription").val("");
}

function subCategoryValidate(categoryId, categoryName, subCategoryName, subCategoryDescription) {

	let subCategoryNameRegEx = /^[a-zA-Z\s]+$/;

	if (subCategoryName.trim() == "") {
		toastr.error("space not allow in sub category name");
		return false;
	} else if (!subCategoryNameRegEx.test(subCategoryName)) {
		toastr.error("sub category name must be in character only.");
		return false;
	} else if (subCategoryDescription.trim() == "") {
		toastr.error("sub category description is required");
		return false;
	} else if (categoryId == null) {
		toastr.error("please select the category.");
		return false;
	} else if (categoryName == subCategoryName) {
		toastr.error("category and sub category name must be different.");
		return false;
	}

	return true;
}

function subCategoryExcel() {

	let SubCategoryTableSearch = $("#subcategory_table").DataTable().search().trim();

	const api = `http://localhost:9090/getSubCategoryDataForExcel?findStr=${SubCategoryTableSearch}`;

	fetch(api)
		.then(response => {
			if (!response.ok) {
				throw new Error("network response was not ok!");
			}
			return response.json();
		})
		.then(subCategoryData => {

			const worksheet = XLSX.utils.json_to_sheet(subCategoryData);

			const workbook = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(workbook, worksheet, "Sub Category Data");

			XLSX.writeFile(workbook, "Sub Category.xlsx", { compression: true });

		})
		.catch(error => {
			console.log("error:- ", error);
		})
}
