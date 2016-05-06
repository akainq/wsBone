/**
 * Created by Aleksey on 06.05.2016.
 */

/****************************************************
 *  @Discription Основной класс-прототип виджетов
 ****************************************************/
function Widget() {

    this.Visible = true;
    this.width = 200;
    this.height = 100;
    this.x = 0;
    this.y = 0;
    this.id = 111;
    this.focus = false;
    this.convas = document.getElementById("mainConvas");
    this.ctx = this.convas.getContext('2d');

    var me = this;

    Widget.prototype = Object.create(Events.prototype);
    Events.apply(this, arguments);

    window.wsBone.AddWidget(this);


    this.Show = function () {

        this.Visible = true;
    }

    this.Hide = function () {

        this.Visible = false;
    }

    Widget.prototype.Draw = function () {

        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = '#878787';
        this.ctx.fill();
        this.ctx.lineWidth = 1;
       //   this.ctx.strokeStyle = this.focus ? "#CCC" : "#000";
       //  this.ctx.stroke();
        this.ctx.closePath();
    }
}

