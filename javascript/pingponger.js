// PING-PONGER! for Blockhead
// Zach Bowman
// 2015 Nightmare Games / Burning Freak Games

function Pingponger ()
  {
  this.activated = false;
  this.direction = 0; // degrees
  this.dx = 0;
  this.dy = 0;
  this.x = 0;
  this.y = 0;

  // update and draw
  this.pingpongchingchong = function (sprite, velocity, box)
    {
    var xmove, ymove;
    var new_direction = 0;

    if (this.activated === false && sprite.width !== null && sprite.height !== null)
     {
     this.activated = true;
     this.direction = Math.round (Math.random() * 360);
     this.dx = (Math.random() * (box.width - sprite.width)) + box.x;
     this.dy = (Math.random() * (box.height - sprite.height)) + box.y;
     }
    xmove = velocity * Math.cos(this.direction * (3.14159 / 180));  // convert degrees to radians
    ymove = velocity * Math.sin(this.direction * (3.14159 / 180));  // convert degrees to radians

    this.dx += xmove;

    if (this.dx < box.x)
     {
     this.dx = box.x;
     if (ymove <  0) new_direction = ((this.direction - 270) * -1) + 270;
     if (ymove >= 0) new_direction = ((this.direction -  90) * -1) + 90;
     this.direction = new_direction;
     }
    else if (this.dx + sprite.width > box.x + box.width)
     {
     this.dx = box.x + box.width - sprite.width;
     if (ymove <  0) new_direction = ((this.direction - 270) * -1) + 270;
     if (ymove >= 0) new_direction = ((this.direction -  90) * -1) + 90;
     this.direction = new_direction;
     }

    this.dy += ymove;

    if (this.dy < box.y)
     {
     this.dy = box.y;
     if (xmove <  0) new_direction = ((this.direction - 180) * -1) + 180;
     if (xmove >= 0) new_direction = ((this.direction - 360) * -1) + 360;
     this.direction = new_direction;
     }
    else if (this.dy + sprite.height > box.y + box.height)
     {
     this.dy = box.y + box.height - sprite.height;
     if (xmove <  0) new_direction = ((this.direction - 180) * -1) + 180;
     if (xmove >= 0) new_direction = ((this.direction - 360) * -1) + 360;
     this.direction = new_direction;
     }
    if (this.direction < 0) this.direction += 360;
    else if (this.direction >= 360) this.direction -= 360;
 
    this.x = Math.round(this.dx);
    this.y = Math.round(this.dy);
    if (sprite.draw != undefined) sprite.draw (canvas_2d, this.x, this.y);
    }
  }
