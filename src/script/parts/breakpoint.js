// PCビューの基準幅は1200px
// SPビューの基準幅は320px
// 幅980px未満～768pxのデバイス（タブレットを想定）ではPCビューを縮小して見せたい
// 幅768px未満のデバイス（スマホを想定）ではSPビューの基準値を拡大して見せたい

export function breakpoint() {
    var baseW = 1200;	//基準となるブレークポイント
    var iOSviewportW = 0;
    var ua = navigator.userAgent.toLowerCase();
    var isiOS = (ua.indexOf("iphone") > -1) || (ua.indexOf("ipod") > -1) || (ua.indexOf("ipad") > -1);
    if(isiOS){
        iOSviewportW = document.documentElement.clientWidth;
    }
    function updateMetaViewport(){
        var viewportContent;
        var w = window.outerWidth;
        if(isiOS){
            w = iOSviewportW;
        }
        if(w < baseW){
            viewportContent = "width="+baseW+"px,user-scalable=no,shrink-to-fit=yes";
        }else{
            viewportContent = "width=device-width,user-scalable=no,shrink-to-fit=yes";
        }
        document.querySelector("meta[name='viewport']").setAttribute("content", viewportContent);
    }
    //イベントハンドラ登録
    window.addEventListener("resize", updateMetaViewport, false);
    window.addEventListener("orientationchange", updateMetaViewport, false);
    //初回イベント強制発動
    var ev = document.createEvent("UIEvent");
    ev.initEvent("resize", true, true)
    window.dispatchEvent(ev);

    // !(function () {
    //     const viewport = document.querySelector('meta[name="viewport"]');
    //     function switchViewport() {
    //         const value =
    //         window.outerWidth > 360
    //             ? 'width=device-width,initial-scale=1'
    //             : 'width=360';
    //         if (viewport.getAttribute('content') !== value) {
    //         viewport.setAttribute('content', value);
    //         }
    //     }
    //     addEventListener('resize', switchViewport, false);
    //     switchViewport();
    // })();
}
