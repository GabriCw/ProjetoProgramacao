import 'package:flutter/material.dart';
import 'telas/login_screen.dart';
import './utilities/transition_route_observer.dart';
import 'telas/home_screen.dart';

class App extends StatelessWidget {
  const App({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Login',
      theme: ThemeData(
        primarySwatch: Colors.orange,
        textSelectionTheme:
            const TextSelectionThemeData(cursorColor: Colors.orange),
        // fontFamily: 'SourceSansPro',
        textTheme: TextTheme(
          displaySmall: const TextStyle(
            fontFamily: 'OpenSans',
            fontSize: 45.0,
            // fontWeight: FontWeight.w400,
            color: Colors.orange,
          ),
          labelLarge: const TextStyle(
            // OpenSans is similar to NotoSans but the uppercases look a bit better IMO
            fontFamily: 'OpenSans',
          ),
          bodySmall: TextStyle(
            fontFamily: 'NotoSans',
            fontSize: 12.0,
            fontWeight: FontWeight.normal,
            color: Colors.deepPurple[300],
          ),
          displayLarge: const TextStyle(fontFamily: 'Quicksand'),
          displayMedium: const TextStyle(fontFamily: 'Quicksand'),
          headlineMedium: const TextStyle(fontFamily: 'Quicksand'),
          headlineSmall: const TextStyle(fontFamily: 'NotoSans'),
          titleLarge: const TextStyle(fontFamily: 'NotoSans'),
          titleMedium: const TextStyle(fontFamily: 'NotoSans'),
          bodyLarge: const TextStyle(fontFamily: 'NotoSans'),
          bodyMedium: const TextStyle(fontFamily: 'NotoSans'),
          titleSmall: const TextStyle(fontFamily: 'NotoSans'),
          labelSmall: const TextStyle(fontFamily: 'NotoSans'),
        ),
        colorScheme: ColorScheme.fromSwatch(primarySwatch: Colors.deepPurple)
            .copyWith(secondary: Colors.orange),
      ),
      navigatorObservers: [TransitionRouteObserver()],
      initialRoute: LoginScreen.routeName,
      routes: {
        LoginScreen.routeName: (context) => const LoginScreen(),
        HomeScreen.routeName: (context) => const HomeScreen(),
      },
    );
  }
}