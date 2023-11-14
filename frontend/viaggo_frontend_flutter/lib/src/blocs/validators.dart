import 'dart:async';
import 'package:email_validator/email_validator.dart';

mixin Validators {
  final validate_Email =
      StreamTransformer<String, String>.fromHandlers(handleData: (email, sink) {
    if (EmailValidator.validate(email)) {
      sink.add(email);
    } else {
      sink.addError('Insira um e-mail válido');
    }
  });
  final validate_Password = StreamTransformer<String, String>.fromHandlers(
    handleData: (password, sink) {
      // Usar regExp para verificar se a password contem
      // Pelo menos uma maiuscula
      RegExp exp = RegExp("[A-Z]+");
      if (!exp.hasMatch(password)) {
        sink.addError('A senha deve conter pelo menos uma letra maiúscula');
        return;
      } else if (password.length < 8) {
        sink.addError('A senha deve conter pelo menos 8 caracteres');
        return;
      } else {
        sink.add(password);
      }
    },
  );
}