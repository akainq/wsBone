/**
 * Created by Aleksey on 05.05.2016.
 */


var frame1 = new Form('windows 1');
    frame1.OnClick = function (e) {

        console.log("Click on windows 1");
    };

    frame1.OnMouseMove = function (e) {

        if(e.buttons==1){
            frame1.title =  "x="+frame1.x+" y="+ frame1.y;
            frame1.x = e.x -  frame1.width / 2;
            frame1.y = e.y-  frame1.height / 2;;
        }
        console.log(e.buttons);
    };


    var frame2 = new Form('windows 2');
        frame2.OnClick = function (e) {
            console.log("Click on windows 2");
        };
        frame2.x = 400;
        frame2.y = 400;
        frame2.width  = 800;
        frame2.height  = 600;

        frame2.OnMouseMove = function (e) {

            if(e.buttons==1){
                frame2.title =  "x="+frame2.x+" y="+ frame2.y;
                frame2.x = e.x -  frame2.width / 2;
                frame2.y = e.y-  frame2.height / 2;;
            }
            console.log(e.buttons);
        };