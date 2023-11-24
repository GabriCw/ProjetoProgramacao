import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart' show timeDilation;
import 'package:flutter_login/flutter_login.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:viaggo_frontend_flutter/src/utilities/requisition.dart';
import '../utilities/constants.dart';
import '../utilities/users.dart';
import '../utilities/custom_route.dart';
import 'home_screen.dart';
import '../utilities/requisition.dart';

class LoginScreen extends StatelessWidget {
  static const routeName = '/auth';

  const LoginScreen({Key? key}) : super(key: key);

  Duration get loginTime => Duration(milliseconds: timeDilation.ceil() * 2250);

  Future<String?> _loginUser(LoginData data) {
    return Future.delayed(loginTime).then((_) {
      // print(data);
      // print(userLogin(data));
      if (userLogin(data) == false) {
        return 'Dados de login incorretos!';
      }
      return null;
    });
  }

  Future<String?> _signupUser(SignupData data) {
    return Future.delayed(loginTime).then((_) {
      return null;
    });
  }

  Future<String?> _recoverPassword(String name) {
    return Future.delayed(loginTime).then((_) {
      if (!mockUsers.containsKey(name)) {
        return 'E-mail não encontrado!';
      }
      return null;
    });
  }

  Future<String?> _signupConfirm(String error, LoginData data) {
    return Future.delayed(loginTime).then((_) {
      return null;
    });
  }

  @override
  Widget build(BuildContext context) {
    return FlutterLogin(
      // title: Constants.appName,
      logo: const AssetImage('../assets/logo.png'),
      logoTag: Constants.logoTag,
      titleTag: Constants.titleTag,
      navigateBackAfterRecovery: true,
      // onConfirmRecover: _signupConfirm,
      // onConfirmSignup: _signupConfirm,
      loginAfterSignUp: true,
      additionalSignupFields: [
        const UserFormField(
          keyName: 'username',
          icon: Icon(FontAwesomeIcons.userLarge),
        ),
        const UserFormField(keyName: 'nome'),
        const UserFormField(keyName: 'sobrenome'),
        UserFormField(
          keyName: 'cpf',
          displayName: 'CPF',
          userType: LoginUserType.text,
          fieldValidator: (value) {
            final phoneRegExp = RegExp(
              '^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}\$',
            );
            if (value != null &&
                value.length < 11 &&
                !phoneRegExp.hasMatch(value)) {
              return "CPF inválido!";
            }
            return null;
          },
        ),
      ],

      userValidator: (value) {
        if (!value!.contains('@') || !value.endsWith('.com')) {
          return "E-mail deve conter '@' e terminarar com '.com'";
        }
        return null;
      },

      passwordValidator: (value) {
        if (value!.isEmpty) {
          return 'O campo de senha está vazio!';
        }
        return null;
      },

      onLogin: (loginData) {
        debugPrint('Login info');
        debugPrint('E-mail: ${loginData.name}');
        debugPrint('Senha: ${loginData.password}');
        return _loginUser(loginData);
      },

      onSignup: (signupData) {
        debugPrint('Signup info');
        debugPrint('E-mail: ${signupData.name}');
        debugPrint('Senha: ${signupData.password}');
        signupData.additionalSignupData?.forEach((key, value) {
          debugPrint('$key: $value');
        });
        // print(signupData.additionalSignupData?.entries);
        return _signupUser(signupData);
      },

      onSubmitAnimationCompleted: () {
        Navigator.of(context).pushReplacement(
          FadePageRoute(
            builder: (context) => const HomeScreen(),
          ),
        );
      },

      onRecoverPassword: (name) {
        debugPrint('Recover password info');
        debugPrint('E-mail: $name');
        return _recoverPassword(name);
        // Show new password dialog
      },
    );
  }
}