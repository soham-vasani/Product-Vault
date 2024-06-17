/*$("#categoryName").on('input',function(){
	var letters = /^(A-Za-z)+$/;
	if($("#categoryName").val().match(letters)) {
		alert();
    return true;
  }else{
	return false;
  }
})*/


$(function() {
	addDataToTable();
	
/*	//for adding datatable excel btn
	let categoryTable = $("#category_table").DataTable();
	
    // Check if DataTable instance already exists
    if (categoryTable !== undefined && categoryTable !== null) {
        categoryTable.destroy(); // Destroy existing DataTable instance
    }

    $("#category_table").DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excelHtml5',
                title: 'Excel',
                text: 'Export to excel',
                exportOptions: {
                     columns: [ 1, 2, 3]
                 }
            }
        ]
    });*/
});

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

function addDataToTable() {

	const api = `http://localhost:9090/select`;
	let allData;

	fetch(api)
		.then(response => {
			if (!response.ok) {
				throw new Error("network response was not ok!");
			}
			return response.json();
		})
		.then(data => {
			
			console.log(data);


			let CategoryTable = $("#category_table").DataTable();

			CategoryTable.clear().draw();

			data.forEach((item) => {
				

				let cId = item.categoryId;
				let cAId = item.activeId;
				let cName = item.categoryName;
				let cDescription = item.categoryDescription;

				if (cAId == 1) {
					CategoryTable.row.add([

						`<span data-toggle="modal" data-target=".addmodal">
								<a onClick="EditBtn(${cId})" class=" " data-toggle="tooltip" data-placement="bottom" data-original-title="Edit" href="javascript:void(0);"> <i class="fas fa-edit m-r-5 text-success"></i> </a>
						</span>
						<a onClick="deleteCategory(${cId})" data-toggle="tooltip" data-placement="bottom" data-original-title="Delete"> <i class="far fa-trash-alt  text-danger"></i> </a>`,
						`<span class="badge badge-success">Yes</span>`,
						cId,
						cName,
						cDescription
					]).draw();
				} else if (cAId == 0) {
					CategoryTable.row.add([

						`<span data-toggle="modal" data-target=".addmodal">
								<a onClick="EditBtn(${cId})" class=" " data-toggle="tooltip" data-placement="bottom" data-original-title="Edit" href="javascript:void(0);"> <i class="fas fa-edit m-r-5 text-success"></i> </a>
						</span>
						<a onClick="deleteCategory(${cId})" data-toggle="tooltip" data-placement="bottom" data-original-title="Delete"> <i class="far fa-trash-alt  text-danger"></i> </a>`,
						`<span class="badge badge-danger">No</span>`,
						cId,
						cName,
						cDescription
					]).draw();
				}

			})

		})
		.catch(error => {
			console.error("Error:", error);
		})
}

function InsertAndUpdate() {

	let categoryId = $("a[name='saveBtn']").attr('id');
	let categoryName = $("#categoryName").val();
	let categoryDescription = $("#categoryDescription").val();
	let categoryActive = $("#active").is(":checked");
	let categoryActiveInt = Number(categoryActive);

	if (categoryValidate(categoryName, categoryDescription)) {

		const api = `http://localhost:9090/InsertUpdateCategory`;

		fetch(api, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(
				{
					categoryId: categoryId,
					activeId: categoryActiveInt,
					categoryName: categoryName,
					categoryDescription: categoryDescription
				}
			)
		})
			.then(response => {
				if (!response.ok) {
					throw new Error("network response was not ok!");
				}
				return response.text();
			}
			)
			.then(checkStatus => {

				addDataToTable();

				if (checkStatus == "Category Inserted.") {
					toastr.success("Category Inserted.");
					$("#categoryModel").modal('hide');
					clearCategoryInputs();
				}

				if (checkStatus == "Category Updated.") {
					toastr.success("Category Updated.");
					$("#categoryModel").modal('hide');
					clearCategoryInputs();
				}

				if (checkStatus == "Category already exist.") {
					toastr.error("Category already exist.");
				}

			})
			.catch(error => {
				console.log("error", error);
			})
	}
}


function deleteCategory(clickedId) {

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

					const api = `http://localhost:9090/delete/${clickedId}`;

					fetch(api)
						.then(response => {
							if (!response.ok) {
								throw new Error("network response was not ok!");
							}
							return response.json();
						})
						.then(deleteResult => {
							if (deleteResult) {
								toastr.error("category deleted.");
								addDataToTable();
								$("#categoryModel").modal('hide');
							}
						})
						.catch(error => {
							console.log("error", error);
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

	//console.log(response);

}

function clearCategoryInputs() {
	$("#categoryName").val("");
	$("#categoryDescription").val("");
	$("input[type=checkbox]").prop("checked", false);
}

function AddBtn() {
	$("#activeChBox").hide();

	clearCategoryInputs();

	//if user click on add btn then setting the id of save button = 0.
	$("a[name='saveBtn']").attr('id', '0');

	$("#active").prop("checked", true);

	//let categoryActive = $("#active").is(":checked");
}

function EditBtn(clickedId) {

	$("#activeChBox").show();

	//if user click on edit btn then setting the id of save button = clickedId.
	$("a[name='saveBtn']").attr('id', clickedId);

	clearCategoryInputs();

	const api = `http://localhost:9090/selectEachCategoryData/${clickedId}`;

	fetch(api)
		.then(response => {
			if (!response.ok) {
				throw new Error("network response was not ok!");
			}
			return response.json();
		})
		.then(eachCategoryData => {

			if (eachCategoryData != null) {

				let categoryActive = Boolean(eachCategoryData.activeId);
				let categoryName = eachCategoryData.categoryName;
				let categoryDescription = eachCategoryData.categoryDescription;

				$("#categoryName").val(categoryName);
				$("#categoryDescription").val(categoryDescription);
				$("#active").prop("checked", categoryActive);
			}

		})
		.catch(error => {
			console.log(error);
		})
}

function categoryValidate(categoryName, categoryDescription) {

	let categoryNameRegEx = /^[a-zA-Z\s]+$/;

	if (categoryName.trim() == "") {
		toastr.error("space not allow in Category name");
		return false;
	} else if (!categoryNameRegEx.test(categoryName)) {
		toastr.error("Category name must be in character only.");
		return false;
	} else if (categoryDescription.trim() == "") {
		toastr.error("Description is required");
		return false;
	}

	return true;
}

function categoryExcel() {
	
	let CategoryTableSearch = $("#category_table").DataTable().search().trim();
		console.log(CategoryTableSearch);
		
	const api = `http://localhost:9090/getExcelData?findStr=${CategoryTableSearch}`
	
	fetch(api)
	.then(response=>{
		if(!response.ok){
			throw new Error("network response was not ok");
		}
		return response.json();
	})
	.then(categoryExcelData=>{

			const worksheet = XLSX.utils.json_to_sheet(categoryExcelData);

			const workbook = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(workbook, worksheet, "Category Data");

			XLSX.writeFile(workbook, "Category.xlsx", { compression: true });
	})
	.catch(error=>{
		console.log("error:- ",error);
	})
}



