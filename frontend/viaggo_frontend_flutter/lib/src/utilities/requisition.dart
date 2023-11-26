import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_login/flutter_login.dart';

const userPORT = 5000;

Future<bool> userLogin(LoginData data) async {
  Map<String, String> customHeaders = {"content-type": "application/json"};
  var body = jsonEncode({"login": data.name, "password": data.password});
  var url = Uri.http("localhost:$userPORT", "/login");
  var response = await http.post(url, headers: customHeaders, body: body);
  if (response.statusCode == 200) {
    return true;
  } else {
    return false;
  }
}

Future<bool> userSignUp(SignupData data) async {
  Map<String, String> customHeaders = {"content-type": "application/json"};
  var body = jsonEncode({
    "name":
        "${data.additionalSignupData?['nome']} ${data.additionalSignupData?['sobrenome']}",
    "email": data.name,
    "password": data.password,
    "cpf": data.additionalSignupData?['cpf'],
    "mfa": true
  });
  var url = Uri.http("localhost:$userPORT", "/create-user");
  var response = await http.post(url, headers: customHeaders, body: body);
  if (response.statusCode == 200) {
    return true;
  } else {
    return false;
  }
}

Future<bool> userRecover(String data) async {
  Map<String, String> customHeaders = {"content-type": "application/json"};
  var url = Uri.http("localhost:$userPORT", "/verify-mfa", {'login': data});
  var response = await http.get(url, headers: customHeaders);
  if (response.statusCode == 200) {
    return true;
  } else {
    return false;
  }
}
