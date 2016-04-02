var userData = {
	name: 'name',
	password: 'password',
	email: 'email',
	gender: 'gender',
	profilePicture: 'profilePicture',
	coverPicture: 'coverPicture'
};

var UserModel = (function () {
	function UserModel(requester) {
	}

	UserModel.prototype.login = function (dataLogin) {

	};

	UserModel.prototype.register = function (dataRegister) {
	};

	UserModel.prototype.logout = function () {
		//TODO clear session and cookies for exit from system
	};

	return {
		load: function (requester) {
			return new UserModel(requester);
		}
	}
}());
