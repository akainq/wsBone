
function $(userFunc) {
 window.userFunc = userFunc;
};
 
function WSBone()
    {
            this.timer = 0;
            this.state = 'stop';
            this.context = null;
            this.mainConvas = null;
            this.widgets = Array();
            var wsbone = this;

            WSBone.prototype.Start = function () {

                mainConvas = document.getElementById("mainConvas");

                if (mainConvas.width < window.innerWidth) {
                    mainConvas.width = window.innerWidth;
                    mainConvas.style.width = window.innerWidth;

                }

                if (mainConvas.height < window.innerHeight) {
                    mainConvas.height = window.innerHeight;
                    mainConvas.style.height = window.innerHeight;
                }

                context = mainConvas.getContext('2d');
                this.widgets = Array();


                mainConvas.addEventListener("click", function (event) {

                    var clearFocus = false;
                    var Focus = null;

                    for (var i = 0; i < wsbone.widgets.length; i++) {

                        if (wsbone.widgets[i].mouseClick(event)) {
                            wsbone.widgets[i].focus = true;
                            Focus = wsbone.widgets[i];
                            clearFocus = true;
                        }
                       
                    }

                    if (clearFocus)
                    for (var i = 0; i < wsbone.widgets.length; i++) {

                        if (wsbone.widgets[i] != Focus) {
                            wsbone.widgets[i].focus = false;
                        }

                    }


                }, false);

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

            WSBone.prototype.Window = function (title) {
 
                this.Visible = false;
                this.width = 200;
                this.height = 100;
                this.x = 0;
                this.y = 0;
                this.headerHeight = 25;
                this.title = title == null ? "Window" : title;
                this.id = "w1";
                this.convas = document.getElementById("mainConvas");
                this.ctx = this.convas.getContext('2d');
                this.path = new Path2D();
                this.focus = false;
                var  me = this;

                this.mouseClick =  function (event) {
      
                    var mPos = getMousePos(me.convas, event);                     
                    if (me.testHit(mPos.x, mPos.y)) {

                        if (this.OnClick != null)
                            this.OnClick(event);

                        return true;
                    }
                       
        
                };

                this.OnClick = null;

                this.testHit = function (x, y) {
                    
                    return (y > me.y && y < me.y + me.height + me.headerHeight && x > me.x && x < me.x + me.width);
                          
                }

                this.Draw = function () {
                    
                    this.ctx.beginPath();
                    this.ctx.rect(this.x, this.y, this.width, this.headerHeight);
                    this.ctx.rect(this.x, this.y + this.headerHeight, this.width, this.height);
                    this.ctx.fillStyle = '#878787';
                    this.ctx.fill();
                    this.ctx.lineWidth = 1;
                    this.ctx.strokeStyle = me.focus?"#CCC":"#000";
                    this.ctx.stroke();
                    this.ctx.closePath();
                    this.ctx.font = "14px Arial";
                    this.ctx.fillStyle = "#FFF";
                    this.ctx.fillText(this.title, this.x + 15, this.y + 15, me.width-1);
               
                }

                this.Show = function () {

                    this.Visible = true;
                }

                this.Hide = function () {

                    this.Visible = false;
                }
            }

  

           

}
 
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

},true);