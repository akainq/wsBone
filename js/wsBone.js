
function $(userFunc) {
 window.userFunc = userFunc;
};


///Главный класс
    function WSBone() {
        this.timer = 0;
        this.state = 'stop';
        this.context = null;
        this.mainConvas = null;
        this.widgets = [];
        var FocusElement = null;
        var wsbone = this;
        var layers = [];

        //Функция запуска
        WSBone.prototype.Start = function () {

            wsbone.mainConvas = document.getElementById("mainConvas");

            if (mainConvas.width < window.innerWidth) {
                mainConvas.width = window.innerWidth;
                mainConvas.style.width = window.innerWidth;

            }

            if (mainConvas.height < window.innerHeight) {
                mainConvas.height = window.innerHeight;
                mainConvas.style.height = window.innerHeight;
            }

            context = mainConvas.getContext('2d');
            wsbone.widgets = [];


            mainConvas.addEventListener("click", function (event) {
                for (var i = 0; i < wsbone.widgets.length; i++) {
                    if (wsbone.widgets[i].mouseClick(event)) {
                        if (FocusElement != null) {
                            FocusElement.focus = false;
                        }
                        FocusElement = wsbone.widgets[i];
                        wsbone.widgets.splice(wsbone.widgets.indexOf(FocusElement), 1);
                        wsbone.widgets.push(FocusElement);
                        FocusElement.focus = true;
                    }
                }
            }, false);

            mainConvas.addEventListener("mousemove", function (event) {

                for (var i = 0; i < wsbone.widgets.length; i++) {
                    wsbone.widgets[i].mouseMove(event);
                }
            });


            mainConvas.addEventListener("dblclick", function (event) {

                for (var i = 0; i < wsbone.widgets.length; i++) {
                    wsbone.widgets[i].mouseDblClick(event);
                }
            });

            mainConvas.addEventListener("mousedown", function (event) {

                for (var i = 0; i < wsbone.widgets.length; i++) {
                    wsbone.widgets[i].mouseDown(event);
                }
            });

            console.log("started...");

            setInterval(this.Render, 10);

        }


        WSBone.prototype.AddWidget = function (widget) {

            this.widgets.push(widget);
        }


        WSBone.prototype.Render = function () {


            context.clearRect(0, 0, mainConvas.width, mainConvas.height);
            context.fillStyle = "#FFF";
            context.fillRect(0, 0, mainConvas.width, mainConvas.height);


            for (i = 0; i < wsbone.widgets.length; i++) {

                if (wsbone.widgets[i] != null)
                    if (wsbone.widgets[i].Visible == true) {

                        wsbone.widgets[i].Draw();
                    }

            }

        }

        WSBone.prototype.Resize = function () {

            if (mainConvas.width < window.innerWidth) {
                mainConvas.width = window.innerWidth;
                mainConvas.style.width = window.innerWidth;

            }

            if (mainConvas.height < window.innerHeight) {
                mainConvas.height = window.innerHeight;
                mainConvas.style.height = window.innerHeight;
            }
            wsbone.Render();
        }


    }

    /****************************************************
     *  @Discription Основной класс-прототип виджетов
     ****************************************************/
    function Widget() {

        this.Visible = true;
        this.width = 200;
        this.height = 100;
        this.x = 0;
        this.y = 0;
        this.id = NEW_ID();
        this.focus = false;
        this.convas = document.getElementById("mainConvas");
        this.ctx = this.convas.getContext('2d');

        var me = this;

        window.wsBone.AddWidget(this);

        this.mouseClick = function (event) {

            var mPos = getMousePos(this.convas, event);
            if (this.testHit(mPos.x, mPos.y)) {

                if (this.OnClick != null)
                    this.OnClick(event);

                return true;
            }


        };
        this.mouseMove = function (event) {

            var mPos = getMousePos(this.convas, event);
            if (this.testHit(mPos.x, mPos.y)) {

                if (this.OnMouseMove != null)
                    this.OnMouseMove(event);

                return true;
            }
        };

        this.mouseDblClick = function (event) {

            var mPos = getMousePos(this.convas, event);
            if (this.testHit(mPos.x, mPos.y)) {

                if (this.OnDblClick != null)
                    this.OnDblClick(event);

                return true;
            }
        };


        this.mouseDown = function (event) {

            var mPos = getMousePos(this.convas, event);
            if (this.testHit(mPos.x, mPos.y)) {

                if (this.OnMouseDown != null)
                    this.OnMouseDown(event);

                return true;
            }
        };


        this.OnClick = null;
        this.OnMouseMove = null;
        this.OnDblClick = null;
        this.OnMouseDown = null;


        this.Show = function () {

            this.Visible = true;
        }

        this.Hide = function () {

            this.Visible = false;
        }

        this.Draw = function () {

            this.ctx.beginPath();
            this.ctx.rect(this.x, this.y, this.width, this.height);
            this.ctx.fillStyle = '#878787';
            this.ctx.fill();
            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = this.focus ? "#CCC" : "#000";
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }


/// Виджет базового окна
    function Frame(title) {
        Frame.prototype = Object.create(Widget.prototype);
        Widget.apply(this, arguments);
        this.headerHeight = 40;
        this.title = title == null ? "Window" : title;


        var me = this;
        var imageObj = new Image();
        imageObj.src = '../img/txture01.png';

        var pattern = this.ctx.createPattern(imageObj, 'repeat');


        this.testHit = function (x, y) {

            return (y > me.y && y < me.y + me.height + me.headerHeight && x > me.x && x < me.x + me.width);

        }

        this.Draw = function () {

            // Widget.prototype.Draw.apply(this);


            this.ctx.beginPath();

            this.ctx.rect(this.x, this.y, this.width, this.headerHeight);
            this.ctx.rect(this.x, this.y + this.headerHeight, this.width, this.height);
            //this.ctx.fillStyle = '#878787';
            this.ctx.fillStyle = pattern;
            this.ctx.translate(this.x, this.y + this.headerHeight);
            this.ctx.fill();
            this.ctx.translate(-this.x, -(this.y + this.headerHeight));
            this.ctx.lineWidth = 3;
            this.ctx.strokeStyle = this.focus ? "#CCC" : "#000";
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.font = "14px Arial";
            this.ctx.fillStyle = "#FFF";
            this.ctx.fillText(this.title, this.x + 15, this.y + 15, this.width - 1);

        }


    }


//////////////////////////////////////////////////////////////////////////////
///           Вспомогательные утилиты
//////////////////////////////////////////////////////////////////////////////

    function getMousePos(canvas, event) {
        var mouseX = event.pageX - canvas.offsetLeft;
        var mouseY = event.pageY - canvas.offsetTop;
        return {
            x: mouseX,
            y: mouseY
        };
    }


    window.addEventListener("load", function () {
        window.wsBone = new WSBone();
        window.wsBone.Start();

        if (window.userFunc != null) {
            window.userFunc();
        }
    });

    window.addEventListener("resize", function (event) {


        if (wsBone != null) {
            wsBone.Resize(event);
        }

    }, true);


    function Import(jspath) {

        load(jspath, function (xhr) {
            if (xhr.responseText != null)
                eval(xhr.responseText);
        });

    }

    function load(url, callback) {
        var xhr;

        if (typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
        else {
            var versions = ["MSXML2.XmlHttp.5.0",
                "MSXML2.XmlHttp.4.0",
                "MSXML2.XmlHttp.3.0",
                "MSXML2.XmlHttp.2.0",
                "Microsoft.XmlHttp"]

            for (var i = 0, len = versions.length; i < len; i++) {
                try {
                    xhr = new ActiveXObject(versions[i]);
                    break;
                }
                catch (e) {
                }
            } // end for
        }

        xhr.onreadystatechange = ensureReadiness;

        function ensureReadiness() {
            if (xhr.readyState < 4) {
                return;
            }

            if (xhr.status !== 200) {
                return;
            }

            // all is well
            if (xhr.readyState === 4) {
                callback(xhr);
            }
        }

        xhr.open('GET', url, true);
        xhr.send('');
    }

// NOTE: This format of 8 chars, followed by 3 groups of 4 chars, followed by 12 chars
//       is known as a UUID and is defined in RFC4122 and is a standard for generating unique IDs.
//       This function DOES NOT implement this standard. It simply outputs a string
//       that looks similar. The standard is found here: https://www.ietf.org/rfc/rfc4122.txt
    function NEW_ID() {
        function chr4() {
            return Math.random().toString(16).slice(-4);
        }

        return chr4() + chr4() +
            '-' + chr4() +
            '-' + chr4() +
            '-' + chr4() +
            '-' + chr4() + chr4() + chr4();
    }


