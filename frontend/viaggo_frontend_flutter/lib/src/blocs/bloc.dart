import 'dart:async';
import 'package:rxdart/rxdart.dart';
import 'package:gerenciamento_de_estado/src/blocs/validators.dart';
import 'package:cherry_toast/cherry_toast.dart';
import 'package:flutter/material.dart';

class Bloc with Validators {
  final _emailController = BehaviorSubject<String>();
  final _passwordController = BehaviorSubject<String>();
  final _isObscureController = BehaviorSubject<bool>.seeded(true);

  Stream<String> get email => _emailController.stream.transform(validate_Email);
  Stream<String> get password => 
      _passwordController.stream.transform(validate_Password);
  Stream<bool> get emailAndPasswordAreOk =>
      CombineLatestStream.combine2(email, password, (e, p) => true);
  
  // Possível causa de erro!
  Stream<bool> get isObscure => _isObscureController.stream;
  Stream<bool> get passwordOrisObscure => CombineLatestStream.combine2(password, isObscure, (p, o) => true) ;
  bool get isObscureValue => _isObscureController.value;

  void submitForm(BuildContext context) {
    final email = _emailController.value;
    final password = _passwordController.value;
    CherryToast.success(title: Text('$email, $password')).show(context);
  }

  Function(String) get changeEmail => _emailController.sink.add;
  Function(String) get changePassword => _passwordController.sink.add;
  void get changeState => _isObscureController.sink.add(!_isObscureController.value);

  void dispose() {
    _emailController.close();
    _passwordController.close();
  }
}
