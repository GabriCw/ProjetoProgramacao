import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart' show timeDilation;
import 'package:flutter_login/flutter_login.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import './constants.dart';
import './users.dart';
// import '../blocs/bloc.dart';
// import '../blocs/provider.dart';
// class LoginTela extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     final bloc = Provider.of(context);
//     return Container(
//       margin: EdgeInsets.all(28),
//       child: Column(
//         children: [
//           emailField(bloc),
//           passwordField(bloc),
//           Row(children: [
//             Expanded(
//               child: Container(
//                   margin: EdgeInsets.only(top: 12), child: submitButton(bloc)),
//             )
//           ])
//         ],
//       ),
//     );
//   }
//   Widget emailField(Bloc bloc) {
//     return StreamBuilder(
//       stream: bloc.email,
//       builder: (context, AsyncSnapshot<String> snapshot) {
//         return TextField(
//             onChanged: (newValue) {
//               bloc.changeEmail(newValue);
//             },
//             keyboardType: TextInputType.emailAddress,
//             decoration: InputDecoration(
//                 hintText: 'seu@email.com',
//                 labelText: 'Digite seu e-mail',
//                 errorText: snapshot.error
//                     ?.toString() //outra forma de fazer a mesma coisa
//                 ));
//       },
//     );
//   }
//   Widget passwordField(Bloc bloc) {
//     return StreamBuilder(
//       stream: bloc.password,
//       builder: (context, AsyncSnapshot<String> snapshot) => TextField(
//         onChanged: bloc.changePassword, //mais uma forma de fazer a mesma coisa
//         decoration: InputDecoration(
//             hintText: 'Senha',
//             labelText: 'Digite sua senha',
//             // resolvendo o problema do null no inicio
//             errorText: snapshot.error.toString() == 'null'
//                 ? null
//                 : snapshot.error.toString(),
//             suffixIcon: IconButton(
//                 icon: Icon(
//                     bloc.isObscureValue ? Icons.visibility : Icons.visibility_off),
//                 onPressed: () {
//                   // print(bloc.isObscure);
//                   bloc.changeState;
//                   // print(bloc.isObscure);
//                 })),
//         obscureText: bloc.isObscureValue,
//       ),
//     );
//     // return TextField(
//   }
//   Widget submitButton(Bloc bloc) {
//     return StreamBuilder(
//       stream: bloc.emailAndPasswordAreOk,
//       builder: (context, AsyncSnapshot<bool> snapshot) {
//         return ElevatedButton(
//           onPressed: snapshot.hasData ? () => bloc.submitForm(context) : null,
//           child: Text('Entrar'),
//         );
//       },
//     );
//   }
// }

class LoginTela extends StatelessWidget {
  static const routeName = '/auth';

  const LoginTela({Key? key}) : super(key: key);

  Duration get loginTime => Duration(milliseconds: timeDilation.ceil() * 2250);

  Future<String?> _loginUser(LoginData data) {
    return Future.delayed(loginTime).then((_) {
      if (!mockUsers.containsKey(data.name)) {
        return 'Usuário não encontrado!';
      }
      if (mockUsers[data.name] != data.password) {
        return 'Senha não confere!';
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
          keyName: 'Nome de usuário',
          icon: Icon(FontAwesomeIcons.userLarge),
        ),
        const UserFormField(keyName: 'Nome'),
        const UserFormField(keyName: 'Sobrenome'),
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
        return _signupUser(signupData);
      },

      // onSubmitAnimationCompleted: () {
      //   Navigator.of(context).pushReplacement(
      //     FadePageRoute(
      //       builder: (context) => const DashboardScreen(),
      //     ),
      //   );
      // },

      onRecoverPassword: (name) {
        debugPrint('Recover password info');
        debugPrint('E-mail: $name');
        return _recoverPassword(name);
        // Show new password dialog
      },
    );
  }
}