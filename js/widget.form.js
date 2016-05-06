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
            this.ctx.rect(this.x, this.y, this.width, this.headerHeight);
            this.ctx.rect(this.x, this.y + this.headerHeight, this.width, this.height);
           // this.ctx.fillStyle = '#878787';
            this.ctx.fillStyle = pattern;
            this.ctx.translate(this.x, this.y + this.headerHeight);
            this.ctx.fill();
            this.ctx.translate(-this.x, -(this.y + this.headerHeight));
            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = this.focus ? "#CCC" : "#000";
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.font = "14px Arial";
            this.ctx.fillStyle = "#ccc";
            this.ctx.fillText(imageObj.readyState, this.x + 15, this.y + 15, this.width - 1);
          //  this.ctx.fillText(this.title, this.x + 15, this.y + 15, this.width - 1);
            //this.ctx.fillText(imageObj.readyState, this.x + 15, this.y + 115, this.width - 1);
        }


    }
