
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/index","pages/3pl_user/car_info","pages/3pl_user/form","pages/3pl_line/index","pages/user/index","pages/role/index","pages/role/certification","pages/role/binding","pages/setting/index","pages/setting/user_guide","pages/setting/Legal_provisions","pages/setting/User_agreement","pages/setting/Privacy_policy","pages/setting/About_us","pages/setting/password","pages/address/index","pages/address/add","pages/address/editor","pages/customer/list","pages/customer/add","pages/customer/editor","pages/car/list","pages/car/add","pages/car/editor","pages/carriers/list","pages/carriers/editor","pages/carriers/add"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#eee","titleNView":false},"tabBar":{"color":"#333","selectedColor":"deepskyblue","backgroundColor":"#eee","borderStyle":"black","list":[{"pagePath":"pages/3pl_user/car_info","text":"整车"},{"pagePath":"pages/3pl_line/index","text":"零担"},{"pagePath":"pages/user/index","text":"我的"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"xiangmu","compilerVersion":"3.1.9","entryPagePath":"pages/customer/list","entryPageQuery":"","realEntryPagePath":"pages/login/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/index","meta":{"isQuit":true},"window":{"navigationBarTitleText":"uni-app"}},{"path":"/pages/3pl_user/car_info","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"uni-app"}},{"path":"/pages/3pl_user/form","meta":{},"window":{"navigationBarTitleText":"uni-app"}},{"path":"/pages/3pl_line/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"uni-app","enablePullDownRefresh":true}},{"path":"/pages/user/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"uni-app"}},{"path":"/pages/role/index","meta":{},"window":{"navigationBarTitleText":"uni-app"}},{"path":"/pages/role/certification","meta":{},"window":{"navigationBarTitleText":"uni-app"}},{"path":"/pages/role/binding","meta":{},"window":{"navigationBarTitleText":"uni-app"}},{"path":"/pages/setting/index","meta":{},"window":{"navigationBarTitleText":"uni-app"}},{"path":"/pages/setting/user_guide","meta":{},"window":{"navigationBarTitleText":"uni-app"}},{"path":"/pages/setting/Legal_provisions","meta":{},"window":{"navigationBarTitleText":"uni-app"}},{"path":"/pages/setting/User_agreement","meta":{},"window":{"navigationBarTitleText":"uni-app"}},{"path":"/pages/setting/Privacy_policy","meta":{},"window":{"navigationBarTitleText":"uni-app"}},{"path":"/pages/setting/About_us","meta":{},"window":{"navigationBarTitleText":"uni-app"}},{"path":"/pages/setting/password","meta":{},"window":{"navigationBarTitleText":"uni-app"}},{"path":"/pages/address/index","meta":{},"window":{"navigationBarTitleText":"uni-app","enablePullDownRefresh":true}},{"path":"/pages/address/add","meta":{},"window":{"navigationBarTitleText":"uni-app"}},{"path":"/pages/address/editor","meta":{},"window":{"navigationBarTitleText":"uni-app"}},{"path":"/pages/customer/list","meta":{},"window":{"navigationBarTitleText":"uni-app"}},{"path":"/pages/customer/add","meta":{},"window":{"navigationBarTitleText":"uni-app"}},{"path":"/pages/customer/editor","meta":{},"window":{"navigationBarTitleText":"uni-app"}},{"path":"/pages/car/list","meta":{},"window":{"navigationBarTitleText":"uni-app","enablePullDownRefresh":true}},{"path":"/pages/car/add","meta":{},"window":{"navigationBarTitleText":"uni-app"}},{"path":"/pages/car/editor","meta":{},"window":{"navigationBarTitleText":"uni-app"}},{"path":"/pages/carriers/list","meta":{},"window":{"navigationBarTitleText":"uni-app"}},{"path":"/pages/carriers/editor","meta":{},"window":{"navigationBarTitleText":"uni-app"}},{"path":"/pages/carriers/add","meta":{},"window":{"navigationBarTitleText":"uni-app"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
