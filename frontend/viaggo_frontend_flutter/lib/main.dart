import 'package:flutter/material.dart';
import 'src/app.dart';
import 'package:flutter/services.dart';
// void main() {
//   runApp(App());
// }

void main() {
  SystemChrome.setSystemUIOverlayStyle(
    SystemUiOverlayStyle(
      systemNavigationBarColor:
          SystemUiOverlayStyle.dark.systemNavigationBarColor,
    ),
  );
  runApp(App());
}