/// Виджет базового окна
    function Form(title) {
        Form.prototype = Object.create(Widget.prototype);
        Widget.apply(this, arguments);
        this.headerHeight = 40;
        this.title = title == null ? "Form" : title;


        var me = this;
        var imageObj = new Image();
            imageObj.src = '../img/txture01.png';
            imageObj.onloadstart = function (ss) {

        
            };
            imageObj.onerror = function (e){
            
                console.log(e);
            }
        var pattern = this.ctx.createPattern(imageObj, 'repeat');


        this.testHit = function (x, y) {

            return (y > me.y && y < me.y + me.height + me.headerHeight && x > me.x && x < me.x + me.width);

        }

        this.Draw = function () {

           // Form.prototype.Draw.call(this);

            this.ctx.beginPath();
            this.ctx.save();

            var grd=this.ctx.createLinearGradient(0, 0,0,this.headerHeight);
                grd.addColorStop(0,"#333");
                grd.addColorStop(1,"#CCC");

            this.ctx.translate(this.x, this.y);
            this.ctx.rect(0, 0, this.width, this.headerHeight);
            this.ctx.fillStyle = grd;
            this.ctx.fill();
            this.ctx.restore();




         //   this.ctx.strokeStyle = this.focus ? "#CCC" : "#000";

          //  this.ctx.stroke();
            this.ctx.closePath();


            this.ctx.beginPath();

            this.ctx.shadowColor='black';
            this.ctx.shadowBlur=5;
            this.ctx.shadowOffsetX = 1;
            this.ctx.shadowOffsetY = 1;
            this.ctx.fill();

            this.ctx.rect(this.x, this.y + this.headerHeight, this.width, this.height);
            this.ctx.translate(this.x, this.y + this.headerHeight);
            this.ctx.fillStyle = "#CCC";
            this.ctx.fill();
            this.ctx.translate(-this.x, -(this.y + this.headerHeight));
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = this.focus ? "#AA3939" : "#333";
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.font = "16px Arial";
            this.ctx.fillStyle = "#FFF";
            this.ctx.fillText(this.title, this.x + 15, this.y + 24, this.width - 1);
          //  this.ctx.fillText(this.title, this.x + 15, this.y + 15, this.width - 1);
            //this.ctx.fillText(imageObj.readyState, this.x + 15, this.y + 115, this.width - 1);
        };


        this.OnMouseMove = function (e) {

            if(e.buttons==1){

                console.log(e.x, this.x,  (-1 * (this.x - e.x)));
                this.x = e.x + 1+ (-1* (this.x - e.x));
                this.y = e.y - (this.y - e.y);


                this.title =  "x="+this.x+" y="+ this.y ;
            }

        };


    }
