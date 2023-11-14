import 'dart:async';
import 'package:rxdart/rxdart.dart';
import 'package:gerenciamento_de_estado/src/blocs/validators.dart';
import 'package:cherry_toast/cherry_toast.dart';
import 'package:flutter/material.dart';

class Bloc with Validators {
  final _emailController = BehaviorSubject<String>();
  final _passwordController = BehaviorSubject<String>();
  var isObscure = BehaviorSubject();

  Stream<String> get email => _emailController.stream.transform(validate_Email);
  Stream<String> get password =>
      _passwordController.stream.transform(validate_Password);
  Stream<bool> get emailAndPasswordAreOk =>
      CombineLatestStream.combine2(email, password, (e, p) => true);
  void get pisObscure => isObscure.sink.add(true);

  void submitForm(BuildContext context) {
    final email = _emailController.value;
    final password = _passwordController.value;
    CherryToast.success(title: Text('$email, $password')).show(context);
  }

  Function(String) get changeEmail => _emailController.sink.add;
  Function(String) get changePassword => _passwordController.sink.add;
  void get changeState => isObscure.sink.add(!isObscure.value);

  void dispose() {
    _emailController.close();
    _passwordController.close();
  }
}
