import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart' show timeDilation;
import 'package:flutter_login/flutter_login.dart';
import 'package:viaggo_frontend_flutter/src/utilities/requisition.dart';
import '../utilities/custom_route.dart';
import 'home_screen.dart';

class LoginScreen extends StatelessWidget {
  static const routeName = '/auth';

  const LoginScreen({Key? key}) : super(key: key);

  Duration get loginTime => Duration(milliseconds: timeDilation.ceil() * 2250);

  Future<String?> _loginUser(LoginData data) async {
    var loginOk = await userLogin(data);
    return Future.delayed(loginTime).then((_) {
      if (!loginOk) {
        return 'Dados de login incorretos!';
      }
      return null;
    });
  }

  Future<String?> _signupUser(SignupData data) async {
    var userOK = await userSignUp(data);
    return Future.delayed(loginTime).then((_) {
      if (!userOK) {
        return 'Não foi possível adicionar o usuário!';
      }
      return null;
    });
  }

  Future<String?> _recoverPassword(String name) async {
    var userExists = await userRecover(name);
    return Future.delayed(loginTime).then((_) {
      if (!userExists) {
        return 'E-mail não encontrado!';
      }
      return null;
    });
  }

  @override
  Widget build(BuildContext context) {
    return FlutterLogin(
      logo: const AssetImage('../assets/logo.png'),
      logoTag: "logo",
      titleTag: "title",
      navigateBackAfterRecovery: true,
      loginAfterSignUp: false,
      additionalSignupFields: [
        const UserFormField(keyName: 'nome', displayName: 'Nome'),
        const UserFormField(keyName: 'sobrenome', displayName: 'Sobrenome'),
        UserFormField(
          keyName: 'cpf',
          displayName: 'CPF',
          userType: LoginUserType.text,
          fieldValidator: (value) {
            final phoneRegExp = RegExp(
              '^[0-9]{3}?[0-9]{3}?[0-9]{3}?[0-9]{2}\$',
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
        final upperRegExp = RegExp("(?=.*?[A-Z])");
        final lowerRegExp = RegExp("(?=.*?[a-z])");
        final numerRegExp = RegExp("(?=.*?[0-9])");
        if (value!.isEmpty) {
          return 'O campo de senha está vazio!';
        } else if (!upperRegExp.hasMatch(value)) {
          return 'A senha deve conter pelo menos UMA letra maiúscula!';
        } else if (!lowerRegExp.hasMatch(value)) {
          return 'A senha deve conter pelo menos UMA letra minúscula!';
        } else if (!numerRegExp.hasMatch(value)) {
          return 'A senha deve conter pelo menos UM número!';
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
      },
    );
  }
}
