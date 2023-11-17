import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_login/theme.dart';
import 'package:flutter_login/widgets.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:viaggo_frontend_flutter/src/utilities/constants.dart';
import 'package:viaggo_frontend_flutter/src/utilities/transition_route_observer.dart';
// import '/widgets/animated_numeric_text.dart';
import '/widgets/fade_in.dart';
import '/widgets/round_button.dart';

class HomeScreen extends StatefulWidget {
  static const routeName = '/dashboard';

  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen>
    with SingleTickerProviderStateMixin, TransitionRouteAware {
  Future<bool> _goToLogin(BuildContext context) {
    return Navigator.of(context)
        .pushReplacementNamed('/auth')
        // we dont want to pop the screen, just replace it completely
        .then((_) => false);
  }

  final routeObserver = TransitionRouteObserver<PageRoute?>();
  static const headerAniInterval = Interval(.1, .3, curve: Curves.easeOut);
  late Animation<double> _headerScaleAnimation;
  AnimationController? _loadingController;

  @override
  void initState() {
    super.initState();

    _loadingController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1250),
    );

    _headerScaleAnimation = Tween<double>(begin: .6, end: 1).animate(
      CurvedAnimation(
        parent: _loadingController!,
        curve: headerAniInterval,
      ),
    );
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    routeObserver.subscribe(
      this,
      ModalRoute.of(context) as PageRoute<dynamic>?,
    );
  }

  @override
  void dispose() {
    routeObserver.unsubscribe(this);
    _loadingController!.dispose();
    super.dispose();
  }

  @override
  void didPushAfterTransition() => _loadingController!.forward();

  AppBar _buildAppBar(ThemeData theme) {
    // final menuBtn = IconButton(
    //   color: theme.colorScheme.secondary,
    //   icon: const Icon(FontAwesomeIcons.bars),
    //   onPressed: () {},
    // );
    final signOutBtn = IconButton(
      icon: const Icon(FontAwesomeIcons.rightFromBracket),
      color: theme.colorScheme.secondary,
      onPressed: () => _goToLogin(context),
    );
    final title = Center(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 8.0),
            child: Hero(
              tag: Constants.logoTag,
              child: Image.asset(
                '../assets/logo.png',
                filterQuality: FilterQuality.high,
                height: 70,
              ),
            ),
          ),
          // HeroText(
          //   Constants.appName,
          //   tag: Constants.titleTag,
          //   viewState: ViewState.shrunk,
          //   style: LoginThemeHelper.loginTextStyle,
          // ),
        ],
      ),
    );

    return AppBar(
      // leading: FadeIn(
      //   controller: _loadingController,
      //   offset: .3,
      //   curve: headerAniInterval,
      //   child: menuBtn,
      // ),
      actions: <Widget>[
        FadeIn(
          controller: _loadingController,
          offset: .3,
          curve: headerAniInterval,
          fadeDirection: FadeDirection.endToStart,
          child: signOutBtn,
        ),
      ],
      title: title,
      backgroundColor: theme.primaryColor.withOpacity(.1),
      elevation: 0,
      // toolbarTextStyle: TextStle(),
      // textTheme: theme.accentTextTheme,
      // iconTheme: theme.accentIconTheme,
    );
  }

  Widget _buildButton({
    Widget? icon,
    String? label,
    required Interval interval,
    Function? onPressed,
  }) {
    return RoundButton(
      icon: icon,
      label: label,
      loadingController: _loadingController,
      interval: Interval(
        interval.begin,
        interval.end,
        curve: const ElasticOutCurve(0.42),
      ),
      onPressed: () {
        onPressed!();
      },
    );
  }

  Widget _buildDashboardGrid() {
    const step = 0.04;
    const aniInterval = 0.75;

    return GridView.count(
      padding: const EdgeInsets.symmetric(
        horizontal: 32.0,
        vertical: 20,
      ),
      childAspectRatio: .9,
      // crossAxisSpacing: 5,
      crossAxisCount: 3,
      children: [
        _buildButton(
            icon: const Icon(FontAwesomeIcons.planeDeparture),
            label: 'Paris',
            interval: const Interval(0, aniInterval),
            onPressed: () {
              showToastParis(context);
            }),
        _buildButton(
            icon: Container(
              // fix icon is not centered like others for some reasons
              padding: const EdgeInsets.only(left: 16.0),
              alignment: Alignment.centerLeft,
              child: const Icon(
                FontAwesomeIcons.plane,
                size: 20,
              ),
            ),
            label: 'Rio de Janeiro',
            interval: const Interval(step, aniInterval + step),
            onPressed: () {
              showToastRJ(context);
            }),
        _buildButton(
            icon: const Icon(FontAwesomeIcons.planeArrival),
            label: 'Nova York',
            interval: const Interval(step * 2, aniInterval + step * 2),
            onPressed: () {
              // Fluttertoast.showToast(
              //   msg: 'Esta é uma mensagem de Toast',
              //   toastLength: Toast.LENGTH_SHORT, // Define a duração do Toast
              //   gravity: ToastGravity.BOTTOM, // Posição do Toast na tela
              //   backgroundColor: Colors.grey,
              //   textColor: Colors.white,
              // );
              showToastNovaYork(context);
            }),
      ],
    );
  }
  
  void showToastParis(BuildContext context) {
    final scaffold = ScaffoldMessenger.of(context);
    scaffold.showSnackBar(
      SnackBar(
        content: Container(
          height: 200, // Altura do SnackBar (ajuste conforme necessário)
          alignment: Alignment.center,
          child: Text(
            'Paris\n\nArrastão do Mbappé\n\nData ida: 21/06/2023\nData volta: 15/07/2023\nValor: R\$ 9.500,00',
            textAlign: TextAlign.center,
          ),
        ),
        behavior: SnackBarBehavior.floating,
        backgroundColor: Colors.deepPurple[400],
        margin: EdgeInsets.symmetric(vertical: 200, horizontal: 20),
        duration: Duration(seconds: 10000), // Defina a duração desejada do toast
        action: SnackBarAction(
          label: 'Fechar',
          onPressed: scaffold.hideCurrentSnackBar, // Fecha o toast ao clicar no botão "Fechar"
        ),
      ),
    );
  }

  void showToastRJ(BuildContext context) {
    final scaffold = ScaffoldMessenger.of(context);
    scaffold.showSnackBar(
      SnackBar(
        content: Container(
          height: 200, // Altura do SnackBar (ajuste conforme necessário)
          alignment: Alignment.center,
          child: Text(
            'Rio de Janeiro\n\nOlha o assalto\n\nData ida: 15/03/2023\nData volta: 15/04/2023\nValor: R\$ 8.000,00',
            textAlign: TextAlign.center,
          ),
        ),
        behavior: SnackBarBehavior.floating,
        backgroundColor: Colors.deepPurple[400],
        margin: EdgeInsets.symmetric(vertical: 200, horizontal: 20),
        duration: Duration(seconds: 10000), // Defina a duração desejada do toast
        action: SnackBarAction(
          label: 'Fechar',
          onPressed: scaffold.hideCurrentSnackBar, // Fecha o toast ao clicar no botão "Fechar"
        ),
      ),
    );
  }

  void showToastNovaYork(BuildContext context) {
    final scaffold = ScaffoldMessenger.of(context);
    scaffold.showSnackBar(
      SnackBar(
        content: Container(
          height: 200, // Altura do SnackBar (ajuste conforme necessário)
          alignment: Alignment.center,
          child: Text(
            'Nova York\n\nCelso Portioli não entra aqui!\n\nData ida: 01/01/2023\nData volta: 01/02/2023\nValor: R\$ 10.000,00',
            textAlign: TextAlign.center,
          ),
        ),
        behavior: SnackBarBehavior.floating,
        backgroundColor: Colors.deepPurple[400],
        margin: EdgeInsets.symmetric(vertical: 200, horizontal: 20),
        duration: Duration(seconds: 10000), // Defina a duração desejada do toast
        action: SnackBarAction(
          label: 'Fechar',
          onPressed: scaffold.hideCurrentSnackBar, // Fecha o toast ao clicar no botão "Fechar"
        ),
      ),
    );
  }

  Widget _buildDebugButtons() {
    const textStyle = TextStyle(fontSize: 12, color: Colors.white);

    return Positioned(
      bottom: 0,
      right: 0,
      child: Row(
        children: <Widget>[
          MaterialButton(
            materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
            color: Colors.red,
            onPressed: () => _loadingController!.value == 0
                ? _loadingController!.forward()
                // : () => {_loadingController!.reverse(),
                : {Fluttertoast.showToast(
                msg: 'Agora vc é meu namorado',
                toastLength: Toast.LENGTH_SHORT, // Define a duração do Toast
                gravity: ToastGravity.BOTTOM, // Posição do Toast na tela
                backgroundColor: Colors.grey,
                textColor: Colors.white,
              )
                },
            child: const Text('Surpresinha da Laurinha', style: textStyle),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return WillPopScope(
      onWillPop: () => _goToLogin(context),
      child: SafeArea(
        child: Scaffold(
          appBar: _buildAppBar(theme),
          body: Container(
            width: double.infinity,
            height: double.infinity,
            color: theme.primaryColor.withOpacity(.1),
            child: Stack(
              children: <Widget>[
                Column(
                  children: <Widget>[
                    const SizedBox(height: 40),
                    // Expanded(
                    //   flex: 2,
                    //   child: _buildHeader(theme),
                    // ),
                    Expanded(
                      flex: 8,
                      child: ShaderMask(
                        // blendMode: BlendMode.srcOver,
                        shaderCallback: (Rect bounds) {
                          return LinearGradient(
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                            colors: <Color>[
                              Colors.white,
                              Colors.white,
                              Colors.white,
                              Colors.white,
                              // Colors.red,
                              // Colors.yellow,
                            ],
                          ).createShader(bounds);
                        },
                        child: _buildDashboardGrid(),
                      ),
                    ),
                  ],
                ),
                if (!kReleaseMode) _buildDebugButtons(),
              ],
            ),
          ),
        ),
      ),
    );
  }
}