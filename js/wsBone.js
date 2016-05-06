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


