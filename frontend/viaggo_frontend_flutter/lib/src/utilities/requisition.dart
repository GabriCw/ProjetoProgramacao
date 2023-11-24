import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_login/flutter_login.dart';

const PORT = 5000;

Future<bool> userLogin(LoginData data) async{
  Map<String, String> customHeaders = {"content-type": "application/json"};
  var body = jsonEncode({
    "login":data.name,
    "password":data.password
    });
  var url = Uri.http("localhost:$PORT", "/login");
  var response = await http.post(url,headers: customHeaders,body: body);
  if (response.statusCode == 200){
    return true;
  } else {
    return false;
  }
}

