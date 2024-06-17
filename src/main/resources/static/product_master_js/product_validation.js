
$(function() {
	categoryAppend();
	addProductToTable();
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
	"timeOut": "2000",
	"extendedTimeOut": "2000",
	"showEasing": "swing",
	"hideEasing": "linear",
	"showMethod": "fadeIn",
	"hideMethod": "fadeOut"
}
function addBtn() {
	$("#activeChBox").hide();
	clearProductInput()
	$("a[name='saveBtn']").attr('id', '0');
	$("#active").prop("checked", true);
}


// we use aync wait because editProduct function is continue execting without wait for subCategoryAppend
async function editProduct(clickedId) {

	clearProductInput();
	$("#activeChBox").show();
	$("a[name='saveBtn']").attr('id', clickedId);


	const api = `http://localhost:9090/selectProductById/${clickedId}`;

	try {
		const response = await fetch(api);
		if (!response.ok) {
			throw new Error("Response was not ok!");
		}
		const productData = await response.json();


		$("#active").prop("checked", Boolean(productData.activeId)); //P_ActiveIdBool

		$("#productName").val(productData.productName); //P_Name

		$("#productDescription").val(productData.productDescription);//P_Description

		$("#productPrice").val(productData.productPrice);//P_Price

		$("#categoryDropDown option#" + productData.categoryId).prop("selected", true); //P_CategoryId
		$("#categoryDropDown").selectpicker("refresh");
		await subCategoryAppend();
		$("#subCategoryDropDown option#" + productData.subCategoryId).prop("selected", true); //P_SubCategoryId
		$("#subCategoryDropDown").selectpicker("refresh");

		$("#start_date").val(productData.productManufacturingDate); //P_ManufactureDate

		$("#productSerialNo").val(productData.productSerialNo); //P_SerialNo

		$("#warrantySupport").val(productData.warrantySupport); //P_WarrantyAndSupport				

		$('input[name="conditionOpt"][value="' + productData.productCondition + '"]').prop('checked', true); //P_Condition
		$('input[name="conditionOpt"]').selectpicker("refresh");

		let P_Color_Str = await productData.productColour;
		let P_Color_Arr = await P_Color_Str.split(",");

		await P_Color_Arr.forEach(function(clr) {
			$(`input[name="colorOpt"][value=${clr}]`).prop("checked", true);
		});

		$("#productDiscount").val(productData.productDiscount); //P_Discount

		$(".productValidFromDate").val(productData.productValidFromDate);//P_ValidFrom

		$(".productValidToDate").val(productData.productValidToDate);//P_ValidTo


	} catch (error) {
		console.log("error: ", error);
	}
}

function saveBtn() {

	let P_Id = $("a[name='saveBtn']").attr('id');
	let P_ActiveId = $("#active").is(":checked");
	let P_ActiveIdInt = Number(P_ActiveId);
	let P_Name = $("#productName").val();
	let P_Description = $("#productDescription").val();
	let P_CategoryId = $("#categoryDropDown option:selected").attr('id');
	let P_SubCategoryId = $("#subCategoryDropDown option:selected").attr('id');
	let P_Price = $("#productPrice").val();
	let P_ManufactureDate = $("#start_date").val();
	let P_SerialNo = $("#productSerialNo").val();
	let P_WarrantyAndSupport = $("#warrantySupport").val();
	let P_ImgUrl = "";
	let P_ImgUrl_length = $("#productImage")[0].files.length;
	let P_Condition = $('input[name="conditionOpt"]:checked').val();
	let P_Color = [];
	let P_Discount = $("#productDiscount").val();
	let P_ValidFrom = $(".productValidFromDate").val();
	let P_ValidTo = $(".productValidToDate").val();


	//getting the the color.	
	$('input[name="colorOpt"]:checked').each(function() {
		P_Color.push($(this).val());
	});


	if (productValidate(P_Id, P_Name, P_Description, P_CategoryId, P_SubCategoryId, P_Price, P_ManufactureDate, P_SerialNo, P_WarrantyAndSupport, P_ImgUrl_length, P_Condition, P_Color, P_Discount, P_ValidFrom, P_ValidTo)) {

		//product DTO
		let productDTO = {
			productId: P_Id,
			activeId: P_ActiveIdInt,
			categoryId: P_CategoryId,
			subCategoryId: P_SubCategoryId,
			productName: P_Name,
			productDescription: P_Description,
			productPrice: P_Price,
			productSerialNo: P_SerialNo,
			warrantySupport: P_WarrantyAndSupport,
			productCondition: P_Condition,
			productColour: String(P_Color),
			productDiscount: P_Discount,
			productImage: P_ImgUrl,
			productManufacturingDate: P_ManufactureDate,
			productValidFromDate: P_ValidFrom,
			productValidToDate: P_ValidTo
		};


		// json not allow to send file so we append all the field into form and and send it into api.
		const ProductFormData = new FormData();

		/*		let pImg = $("#productImage").prop('files')[0];
					ProductFormData.append("pImg", pImg);
					ProductFormData.append("productJson", JSON.stringify(productDTO));*/

		if (P_ImgUrl_length != 0) {
			//it contain orignal file.
			let pImg = $("#productImage").prop('files')[0];
			ProductFormData.append("pImg", pImg);
			ProductFormData.append("productJson", JSON.stringify(productDTO));
		} else {
			ProductFormData.append("productJson", JSON.stringify(productDTO));
		}

		const api = `http://localhost:9090/insertAndUpdateProduct`;

		fetch(api, {
			method: 'POST',
			body: ProductFormData
		})
			.then(response => {
				if (!response.ok) {
					throw new Error("network response was not ok!", response);
				}
				return response.text();
			})
			.then(Uploadstatus => {

				if (Uploadstatus == "product inserted") {
					toastr.success("product inserted");
					$("#productModel").modal('hide');
					clearProductInput();
					addProductToTable();
				}
				else if (Uploadstatus == "product updated") {
					toastr.success("product updated");
					$("#productModel").modal('hide');
					clearProductInput();
					addProductToTable();
				}
				else if (Uploadstatus == "product already exist") {
					toastr.error("product already exist");
				}
			})
			.catch(error => {
				console.log("error:- ", error);
			})

	}

}

function categoryAppend() {

	const api = `http://localhost:9090/select`;

	fetch(api)
		.then(response => {
			if (!response.ok) {
				throw new Error("network response was not ok!");
			}
			return response.json();
		})
		.then(CategoryData => {

			console.log(CategoryData);

			for (let i = 0; i < CategoryData.length; i++) {

				// let cId = CategoryData[i].category_id;
				// let cAId = CategoryData[i].active_id;
				// let cName = CategoryData[i].category_name;
				
				let cId = CategoryData[i].categoryId;
				let cAId = CategoryData[i].activeId;
				let cName = CategoryData[i].categoryName;

				console.log(cId,
					cAId,
					cName);

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

async function subCategoryAppend() {
	let selectedCategoryId = $("#categoryDropDown option:selected").attr('id');

	const api = `http://localhost:9090/getSubcategory/${selectedCategoryId}`;

	try {
		const response = await fetch(api);

		if (!response.ok) {
			throw new Error("network response was not ok!");
		}

		const subCategoryData = await response.json();

		$("#subCategoryDropDown").empty();
		$("#subCategoryDropDown").selectpicker("refresh");


		for (let i = 0; i < subCategoryData.length; i++) {

			let scId = subCategoryData[i].subCategoryId;
			let scName = subCategoryData[i].subCategoryName;

			let option = `<option id=${scId}>${scName}</option>`;

			$("#subCategoryDropDown").append(option);
			$("#subCategoryDropDown").selectpicker("refresh");
		}

	} catch (error) {
		console.log(error);
	}

}


function clearProductInput() {

	$("#productName").val("");
	$("#productDescription").val("");
	$("#categoryDropDown").val([]);
	$("#categoryDropDown").selectpicker("refresh");
	$("#subCategoryDropDown").val([]);
	$("#subCategoryDropDown").selectpicker("refresh");
	$("#productPrice").val("");
	$("#start_date").val("");
	$("#productSerialNo").val("");
	$("#warrantySupport").val("");
	$('#removeImg').click();
	$('input[name="conditionOpt"]').prop('checked', false);
	$("input[type=checkbox]").prop("checked", false);
	$("#productDiscount").val("");
	$(".productValidFromDate").val("");
	$(".productValidToDate").val("");

}

function productValidate(P_Id, P_Name, P_Description, P_CategoryId, P_SubCategoryId, P_Price, P_ManufactureDate, P_SerialNo, P_WarrantyAndSupport, P_ImgUrl_length, P_Condition, P_Color, P_Discount, P_ValidFrom, P_ValidTo) {

	//converting date format dd/mm/yyyy to yyyy-mm-dd
	//because date object require format

	//valid from.
	let ValidFromSplit = P_ValidFrom.split("/");
	let dd_ValidFrom = ValidFromSplit[0];
	let mm_ValidFrom = ValidFromSplit[1];
	let yyyy_ValidFrom = ValidFromSplit[2];
	let newValidFromDate = yyyy_ValidFrom + "-" + mm_ValidFrom + "-" + dd_ValidFrom;

	//valid to.
	let ValidToSplit = P_ValidTo.split("/");
	let dd_ValidTo = ValidToSplit[0];
	let mm_ValidTo = ValidToSplit[1];
	let yyyy_ValidTo = ValidToSplit[2];

	let newValidToDate = yyyy_ValidTo + "-" + mm_ValidTo + "-" + dd_ValidTo;

	const validFrom = new Date(newValidFromDate);
	const validTo = new Date(newValidToDate);

	if (P_Name.trim() == "") {
		toastr.error("space not allow in Product name");
		return false;
	} else if (P_Description.trim() == "") {
		toastr.error("Description is required");
		return false;
	} else if (P_CategoryId == null) {
		toastr.error("category is required");
		return false;
	} else if (P_SubCategoryId == null) {
		toastr.error("sub category is required");
		return false;
	} else if (P_Price < 1 || P_Price == null) {
		toastr.error("price mustbe greater then 1Rs.");
		return false;
	} else if (isNaN(P_Price)) {
		toastr.error("Price must be in number only.");
		return false;
	} else if (P_ManufactureDate == 0) {
		toastr.error("Manufacture Date is required.");
		return false;
	} else if (P_SerialNo.trim() == "") {
		toastr.error("Serial No is required.");
		return false;
	} else if (P_WarrantyAndSupport.trim() == "") {
		toastr.error("Warranty and support is required.");
		return false;
	} else if (P_Condition == undefined) {
		toastr.error("product condition is required.");
		return false;
	} else if (P_Color.length == 0) {
		toastr.error("product colour is required.");
		return false;
	} else if (P_Discount.trim() == "") {
		toastr.error("Discound is required");
		return false;
	} else if (isNaN(P_Discount)) {
		toastr.error("Discount is must be positive number!");
		return false;
	} else if (P_Discount < 0 || P_Discount >= 100) {
		toastr.error("Discount is between 0 to 99");
		return false;
	} else if (P_ValidFrom == 0 || P_ValidTo == 0) {
		toastr.error("valid-from and valid-to date is required.");
		return false;
	} else if (validFrom > validTo) {
		toastr.error("valid-from date is must be less then valid-to date");
		return false;
	}

	if (P_ImgUrl_length == 0) {

		if (P_Id != 0) {
			return true;
		} else {
			toastr.error("please select the product image.");
			return false;
		}
	} else {
		//it contain file size.
		let ImgSize = $("#productImage").prop('files')[0].size;
		if (ImgSize > 2097152) {
			/*2097152 = 2Mb*/
			toastr.error("Maximum Image size : 2 MB");
			return false;
		}
	}


	return true;
}
			
			
function addProductToTable() {
	const api = "http://localhost:9090/selectAllProduct";
$("#product_table")
	fetch(api, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => {
			if (!response.ok) {
				throw new Error("network response was not ok!");
			}
			return response.json();
		})
		.then(productData => {
			
			
			let productTableData = $("#product_table").DataTable();
			
			productTableData.clear().draw();
			
			productData.forEach((item)=>{
				
				let P_Id = item.productId;
				let P_Name = item.productName;
				let P_Description = item.productDescription;
				let P_Price = item.productPrice;
				let P_Discount = item.productDiscount;
				let P_CategoryName = item.categoryName;
				let P_Image = item.productImage;
				let P_ActiveId = item.activeId;
				
				if (P_ActiveId == 1) {
					
					productTableData.row.add([
						
						`<span data-toggle="modal"
												data-target=".addmodal"> <a onClick="editProduct(${P_Id})" class=" "
													data-toggle="tooltip" data-placement="bottom"
													data-original-title="Edit" href="javascript:void(0);"> <i
														class="fas fa-edit m-r-5 text-success"></i>
												</a>
							</span>
							<a onClick="deleteProduct(${P_Id})" data-toggle="tooltip" data-placement="bottom" data-original-title="Delete">
								<i class="far fa-trash-alt text-danger"></i>
							</a>`,
							`<span class="badge badge-success">Yes</span>`,
							`<a href="javascript:void(0)"
												data-toggle="popover" data-trigger="hover" data-html="true"
												data-placement="right"
												data-template='<div class="popover fade bs-popover-right" role="tooltip" x-placement="right"><div class="arrow"></div><h3 class="popover-header p-0 border_radius6"></h3></div>'
												data-title="<img src='http://localhost:9090/pImg/${P_Image}' height='150' class='border_radius6'>">
													<img src="http://localhost:9090/pImg/${P_Image}" alt="" width="25"
													height="25">
							</a>`,
							P_Id,
							P_Name,
							P_Description,
							P_CategoryName,
							P_Price,
							P_Discount
					]).draw();
					
				}else if (P_ActiveId == 0){
					
										productTableData.row.add([
						
						`<span data-toggle="modal"
												data-target=".addmodal"> <a onClick="editProduct(${P_Id})" class=" "
													data-toggle="tooltip" data-placement="bottom"
													data-original-title="Edit" href="javascript:void(0);"> <i
														class="fas fa-edit m-r-5 text-success"></i>
												</a>
							</span>
							<a onClick="deleteProduct(${P_Id})" data-toggle="tooltip" data-placement="bottom" data-original-title="Delete">
								<i class="far fa-trash-alt text-danger"></i>
							</a>`,
							`<span class="badge badge-danger">No</span>`,
							`<a href="javascript:void(0)"
												data-toggle="popover" data-trigger="hover" data-html="true"
												data-placement="right"
												data-template='<div class="popover fade bs-popover-right" role="tooltip" x-placement="right"><div class="arrow"></div><h3 class="popover-header p-0 border_radius6"></h3></div>'
												data-title="<img src='http://localhost:9090/pImg/${P_Image}' height='150' class='border_radius6'>">
													<img src="http://localhost:9090/pImg/${P_Image}" alt="" width="25"
													height="25">
							</a>`,
							P_Id,
							P_Name,
							P_Description,
							P_CategoryName,
							P_Price,
							P_Discount
					]).draw();
					
				}
				
				
			})
		})
		.catch(error => {
			console.log("error :-", error);
		})
}

/*function addProductToTable() {
	const api = "http://localhost:9090/selectAllProduct";

	fetch(api, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => {
			if (!response.ok) {
				throw new Error("network response was not ok!");
			}
			return response.json();
		})
		.then(productData => {

			$("#productTbody").empty();

			for (let i = 0; i < productData.length; i++) {

				let P_Id = productData[i].productId;
				let P_Name = productData[i].productName;
				let P_Description = productData[i].productDescription;
				let P_Price = productData[i].productPrice;
				let P_Discount = productData[i].productDiscount;
				let P_CategoryName = productData[i].categoryName;
				let P_Image = productData[i].productImage;
				let P_ActiveId = productData[i].activeId;



				if (P_ActiveId == 1) {

					const productRow =
						`<tr>
						<td class="text-center">
							<span data-toggle="modal"
												data-target=".addmodal"> <a onClick="editProduct(${P_Id})" class=" "
													data-toggle="tooltip" data-placement="bottom"
													data-original-title="Edit" href="javascript:void(0);"> <i
														class="fas fa-edit m-r-5 text-success"></i>
												</a>
							</span>
							<a onClick="deleteProduct(${P_Id})" data-toggle="tooltip" data-placement="bottom" data-original-title="Delete">
								<i class="far fa-trash-alt text-danger"></i>
							</a>
						</td>
						<td class=""><span class="badge badge-success">Yes</span></td>
					
						<td class="text-center">
							<a href="javascript:void(0)"
												data-toggle="popover" data-trigger="hover" data-html="true"
												data-placement="right"
												data-template='<div class="popover fade bs-popover-right" role="tooltip" x-placement="right"><div class="arrow"></div><h3 class="popover-header p-0 border_radius6"></h3></div>'
												data-title="<img src='http://localhost:9090/pImg/${P_Image}' height='150' class='border_radius6'>">
													<img src="http://localhost:9090/pImg/${P_Image}" alt="" width="25"
													height="25">
							</a>
						</td>
						<td>${P_Id}</td>
						<td>${P_Name}</td>
						<td>${P_Description}</td>
						<td>${P_CategoryName}</td>
						<td class="text-right">${P_Price} INR</td>
						<td class="text-right">${P_Discount} %</td>
					</tr>`;

					$("#productTbody").append(productRow);
					$("#productTbody").selectpicker("refresh");
				} else {

					const productRow =
						`<tr>
						<td class="text-center">
							<span data-toggle="modal"
												data-target=".addmodal"> <a onClick="editProduct(${P_Id})" class=" "
													data-toggle="tooltip" data-placement="bottom"
													data-original-title="Edit" href="javascript:void(0);"> <i
														class="fas fa-edit m-r-5 text-success"></i>
												</a>
							</span>
							<a onClick="deleteProduct(${P_Id})" data-toggle="tooltip" data-placement="bottom" data-original-title="Delete">
								<i class="far fa-trash-alt text-danger"></i>
							</a>
						</td>
						<td class=""><span class="badge badge-danger">No</span></td>
					
						<td class="text-center">
							<a href="javascript:void(0)"
												data-toggle="popover" data-trigger="hover" data-html="true"
												data-placement="right"
												data-template='<div class="popover fade bs-popover-right" role="tooltip" x-placement="right"><div class="arrow"></div><h3 class="popover-header p-0 border_radius6"></h3></div>'
												data-title="<img src='http://localhost:9090/pImg/${P_Image}' height='150' class='border_radius6'>">
													<img src="http://localhost:9090/pImg/${P_Image}" alt="" width="25"
													height="25">
							</a>
						</td>
						<td>${P_Id}</td>
						<td>${P_Name}</td>
						<td>${P_Description}</td>
						<td>${P_CategoryName}</td>
						<td class="text-right">${P_Price} INR</td>
						<td class="text-right">${P_Discount} %</td>
					</tr>`;

					$("#productTbody").append(productRow);
					$("#productTbody").selectpicker("refresh");
				}
			}
		})
		.catch(error => {
			console.log("error :-", error);
		})
}*/
function deleteProduct(clickedId) {



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

					const api = `http://localhost:9090/deleteProduct/${clickedId}`;

					fetch(api)
						.then(response => {
							if (!response.ok) {
								throw new Error("network response was not ok!");
							}
							return response.text();
						})
						.then(deleteStatus => {
							console.log(deleteStatus);
							if (deleteStatus) {
								toastr.error("product deleted!");
								addProductToTable();
							} else {
								toastr.error("product is not deleted!");
							}
						})
						.catch(error => {
							console.log("error:- ", error);
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

function ProductExcel() {

	const api = "http://localhost:9090/productExcel";

	fetch(api)
		.then(response => {
			if (!response.ok) {
				throw new Error("network response was not was ok.")
			}
			response.text();
		})
		.then(productExcel => {

			let link = $("<a>");

			link.attr('href', 'http://localhost:9090/pExcel/Product_Details.xlsx');

			$("body").append(link);

			link[0].click();
			link[0].remove();
		})
		.catch(error => {
			console.log("error:- ", error);
		})
}
