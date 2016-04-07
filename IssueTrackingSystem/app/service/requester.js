(function () {
	IssueTrackingSystem.factory('requester', ['$http', '$sessionStorage', function ($http, $sessionStorage) {

		function Requester() {
			this.BASEURL = 'http://softuni-social-network.azurewebsites.net/api/';
		}

		Requester.prototype.loginUser = function (username, password) {
			$http({
				method: 'POST',
				url: this.BASEURL + '/users/login',
				data: 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function successCallback(response) {
				$sessionStorage.userName = response.data.userName;
				$sessionStorage.userAccessToken = response.data.access_token;
			}, function errorCallback(error) {
				console.log(error);
			});
		};

		return new Requester();
	}]);
})();


var a = {
	"data":
			{
				"access_token":"XOzX10IMqhKVSz02BPzswlvOeCt8uNPtY5OV1aTt2r2l1j62IWW0lWwjWQApmgJpoJ63i4jllLBuyW70tqMpY8VrLCMl8ODVvPdZOGVlUWcMHKTD-tVKqRXVQZY9ESuq5BAL7UMFYODqcOhOxQ3puvFObskvPBbI_k3Ft4pbwe1OQ_peo_esc4zp5X74LKYX5naRilHSYGa6s9TQd89AsBORntQs3QrxA04VMYOiCxUFotwNUbxPfes5wSzXk6SHMdmONTIaBLRqBUZc_VqieVH6tKkuPz6SogdbJ6jj2JapzLPFruxq4zC9qDqXVPR28DNmPvSpM9JqNqEk1upZCKKMEFa668crca8BeY3KAc91-3jMNUqStu7Bq13SRjhmXVYcKPSBCXm0JFi-0mI4hhVBA5-nH3f7SaRCLAD95R6EDrmRZOtxfVDAJKU75ZbVh-LCWyU6-IXj0_REoon4CLDNDVpH-r1Fm9hEG6eOxd5PZczfk-NxaEcFKG54AjEq",
				"token_type":"bearer",
				"expires_in": 31535999,
				"userName":	"n1p3ha",
				".issued" : "Thu, 07 Apr 2016 19:59:22 GMT",
				".expires" : "Fri, 07 Apr 2017 19:59:22 GMT"
			},
	"status" : 200,
	"config" :
			{
				"method" : "POST",
				"transformRequest" : [null],
				"transformResponse" : [null],
				"url" : "http://softuni-social-network.azurewebsites.net/api//users/login",
				"data" : "username=n1p3ha&password=666666",
				"headers":
					{
						"Content-Type":"application/x-www-form-urlencoded",
						"Accept":"application/json, text/plain, */*"
					}
			},
	"statusText":"OK"
};

var app = app || {};

app.requester = (function () {
	function Requester(appId, appSecret, baseUrl) {
		this.appId = appId;
		this.appSecret = appSecret;
		this.baseUrl = baseUrl;
	}

	Requester.prototype.get = function (url, useSession) {
		var headers = getHeaders.call(this, false, useSession);
		return makeRequest('GET', url, headers, null);
	};

	Requester.prototype.post = function (url, data, useSession) {
		var headers = getHeaders.call(this, data, useSession);
		return makeRequest('POST', url, headers, data);
	};

	Requester.prototype.put = function (url, data, useSession) {
		var headers = getHeaders.call(this, data, useSession);
		return makeRequest('PUT', url, headers, data);
	};

	Requester.prototype.delete = function (url, useSession) {
		var headers = getHeaders.call(this, false, useSession);
		return makeRequest('DELETE', url, headers, null);
	};

	function makeRequest(method, url, headers, data) {
		var defer = Q.defer();

		$.ajax({
			method: method,
			url: url,
			headers: headers,
			data: JSON.stringify(data) || null,
			success: function (data) {
				defer.resolve(data);
			},
			error: function (error) {
				defer.reject(error);
			}
		});

		return defer.promise;
	}

	function getHeaders(isJSON, useSession) {
		var headers = {},
			token;

		if (isJSON) {
			headers['Content-Type'] = 'application/json';
		}

		if (useSession) {
			token = sessionStorage['sessionId'];
			headers['Authorization'] = 'Kinvey ' + token;
		} else {
			token = this.appId + ':' + this.appSecret;
			headers['Authorization'] = 'Basic ' + btoa(token);
		}

		return headers;
	}

	return {
		load: function (appId, appSecret, baseUrl) {
			return new Requester(appId, appSecret, baseUrl);
		}
	}
}());