/**
 * Created by Aleksey on 05.05.2016.
 */
/****************************************************
 *  @Discription ��������� �������
 *
 *  - OnClick
 *  - OnMouseMove
 *  - OnMouseDown
 *  - OnDblClick
 ****************************************************/

function Events() {

    var wsbone = wsBone;
    var FocusElement = wsBone.FocusElement;
    var widgets = wsbone.widgets;

    ///----------------------------------OnClick --------------------------------------///
    this.OnClick = null;

    mainConvas.addEventListener("click", function (event) {
        for (var i = 0; i < widgets.length; i++) {
            if (widgets[i].mouseClick(event)) {
                if (FocusElement != null) {
                    FocusElement.focus = false;
                }
                FocusElement = wsbone.widgets[i];
                widgets.splice(widgets.indexOf(FocusElement), 1);
                widgets.push(FocusElement);
                FocusElement.focus = true;
            }
        }
    }, false);

    this.mouseClick = function (event) {

        var mPos = getMousePos(this.convas, event);
        if (this.testHit(mPos.x, mPos.y)) {

            if (this.OnClick != null)
                this.OnClick(event);

            return true;
        }

    };
    ///----------------------------------OnClick End-----------------------------------------///


    ///----------------------------------OnMouseMove ----------------------------------------///
    this.OnMouseMove = null;

    mainConvas.addEventListener("mousemove", function (event) {

        for (var i = 0; i < widgets.length; i++) {
            widgets[i].mouseMove(event);
        }
    });
    this.mouseMove = function (event) {

        var mPos = getMousePos(this.convas, event);
        if (this.testHit(mPos.x, mPos.y)) {

            if (this.OnMouseMove != null)
                this.OnMouseMove(event);

            return true;
        }
    };

    ///----------------------------------OnMouseMove End--------------------------------------///



    ///----------------------------------OnMouseDown------------------------------------------///

    this.OnMouseDown = null;

    mainConvas.addEventListener("mousedown", function (event) {

        for (var i = 0; i < widgets.length; i++) {
            widgets[i].mouseDown(event);
        }
    });

    this.mouseDown = function (event) {

        var mPos = getMousePos(this.convas, event);
        if (this.testHit(mPos.x, mPos.y)) {

            if (this.OnMouseDown != null)
                this.OnMouseDown(event);
            return true;
        }
    };
    ///----------------------------------OnMouseDown End--------------------------------------///


    ///----------------------------------mouseDblClick--------------------------------------///

    this.OnDblClick = null;

    mainConvas.addEventListener("dblclick", function (event) {

        for (var i = 0; i < widgets.length; i++) {
            widgets[i].mouseDblClick(event);
        }
    });

    this.mouseDblClick = function (event) {

        var mPos = getMousePos(this.convas, event);
        if (this.testHit(mPos.x, mPos.y)) {

            if (this.OnDblClick != null)
                this.OnDblClick(event);
            return true;
        }
    };

    ///----------------------------------mouseDblClick End--------------------------------------///

}
