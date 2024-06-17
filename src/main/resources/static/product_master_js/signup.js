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

function addUser() {
	let uName = $("#uName").val().trim();
	let uEmail = $("#uEmail").val().trim();
	let uPassword = $("#uPassword").val().trim();
	let uConformPassword = $("#uConformPassword").val().trim();

	/*console.log(uName,uEmail,uPassword,uConformPassword);*/

	if (userDataValidate(uName, uEmail, uPassword, uConformPassword)) {


		const api = "http://localhost:9090/addUser";
		fetch(api,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					userName: uName,
					emailId: uEmail,
					password: uPassword
				})
			}
		)
			.then(response => {
				if (!response.ok) {
					throw new Error("network response was not ok!");
				}
				return response.text();
			})
			.then(addUserStatus => {
				console.log(addUserStatus);
				if(addUserStatus == "user created."){
					toastr.success("user created.");
					clearUserData();
					window.location.href = "/login";
				}else{
					toastr.success("user already exist.");
				}
			})
			.catch(error => {
				console.log("error:- ", error);
			})

	}
}

function userDataValidate(uName, uEmail, uPassword, uConformPassword) {
	
	
	let userNameRegEx = /^[a-zA-Z\s]+$/;
	let emailRegEx =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

	
	if(uName.trim() == ""){
		toastr.error("space not allowed in user name field!");
		return false;
	}else if(uName.length > 15 || uName.length == 1){
		toastr.error("user name must contain 2 to 15 character.");
		return false;
	}else if(!userNameRegEx.test(uName)){
		toastr.error("user name must be character only.");
		return false;
	}else if(uEmail.trim() == ""){
		toastr.error("space not allowed in email field!");
		return false;
	}else if(!emailRegEx.test(uEmail)){
		toastr.error("enter valid email.");
		return false;
	}else if(uPassword.trim() == "" || uConformPassword.trim() == ""){
		toastr.error("space not allowed in password field!");
		return false;
	}else if(uPassword.length < 8){
		toastr.error("password must contain more than 8 character!");
		return false;
	}else if(uPassword != uConformPassword){
		toastr.error("password and conform password must be same.");
		return false;
	}
	return true;
}

function clearUserData(){
	let uName = $("#uName").val("");
	let uEmail = $("#uEmail").val("");
	let uPassword = $("#uPassword").val("");
	let uConformPassword = $("#uConformPassword").val("");
}






















