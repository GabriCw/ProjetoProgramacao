import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_login/flutter_login.dart';

const PORT = 5000;

Future<bool> userLogin(LoginData data) async {
  var body = jsonEncode({
    "login":data.name,
    "password":data.password
    });
  var url = Uri.http("localhost:$PORT", "/login");
  print(body);
  var response = await http.post(url,body: body);
  // print(response.statusCode);
  if (response.statusCode == 200){
    // print("Deu Bom");
    return true;
  } else{
    // print("Deu Ruim");
    return false;
  }
}