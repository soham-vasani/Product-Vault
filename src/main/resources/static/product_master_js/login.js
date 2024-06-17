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

function loginUser() {

	let userEmail = $("#username").val();
	let userPassword = $("#password").val();

	if (loginDataValidate(userEmail,userPassword)) {

		const api = "http://localhost:9090/loginUser";

		fetch(api, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				emailId: userEmail,
				password: userPassword
			})
		})
			.then(response => {
				if (!response.ok) {
					throw new Error("network response was not ok!");
				}
				return response.text();
			})
			.then(loginStatus => {
				if (loginStatus == "success") {
					clearUserData()
					window.location.href = "/category";
				}
				else if (loginStatus == "fail") {
					toastr.error("Enter correct Email id / Password");
				}
			})
			.catch(error => {
				console.log("error:- ", error);
			})

	}

}

function loginDataValidate(uEmail, uPassword) {

	let emailRegEx = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


	if (uEmail.trim() == "") {
		toastr.error("space not allowed in user email field!");
		return false;
	} else if (!emailRegEx.test(uEmail)) {
		toastr.error("enter valid email.");
		return false;
	} else if (uPassword.trim() == "") {
		toastr.error("space not allowed in password field!");
		return false;
	} else if (uPassword.length < 8) {
		toastr.error("password must contain more than 8 character!");
		return false;
	}
	return true;
}

function clearUserData() {
	$("#username").val("");
	$("#password").val("");
}
