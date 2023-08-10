// Bouncy Popup Animation
// Zach Bowman - 2007 Nightmare Games

// This version will only bounce one object
// at a time per instance of class

function BouncePop ()
  {
  this.active = false;
  this.width = 0;
  this.height = 0;
  this.direction = 0;
  this.kill = false;
  this.h_intensity = 0;
  this.v_intensity = 0;
  this.degradation = 0;
  this.frames = 0;
  this.h_speed = 0;
  this.v_speed = 0;

  this.bouncepop_init = function ()
    {
    // Run before using bouncepop function

    this.active = true;
    this.width = 0;
    this.height = 0;
    this.direction = 0;
    this.kill = false;
    this.h_intensity = 0;
    this.v_intensity = 0;
    this.degradation = 0;
    this.frames = 0;
    this.h_speed = 0;
    this.v_speed = 0;
    }

  this.bounce = function (sprite, x, y, intensity, input_degradation, input_frames)
    {
    // function must be called from each draw step
    // image appears centered on (x, y)

    var dest = new Rectangle ();

    if (this.direction === 0 && this.kill === false
        && (this.width < sprite.width || this.height < sprite.height))
      {
      this.h_intensity = intensity;          // intensity of horizontal bounce in pixels
      this.degradation = input_degradation;  // pixel amount h_intensity looses each cycle
      this.frames = input_frames;            // # of drawing frames for 1 bounce to take
      this.direction = 1;                    // direction of bounce
      this.v_intensity = this.h_intensity * sprite.height / sprite.width;
      this.h_speed = (sprite.width + this.h_intensity - this.width) / this.frames;
      this.v_speed = (sprite.height + this.v_intensity - this.height) / this.frames;
      }
    if (this.direction === 1)  // getting bigger
      {
      if (this.width >= sprite.width + this.h_intensity
       && this.height >= sprite.height + this.v_intensity)
        {
        this.direction = -1;
        this.h_intensity -= this.degradation;
        this.v_intensity = this.h_intensity * sprite.height / sprite.width;
        this.h_speed = (this.width - (sprite.width - this.h_intensity)) / this.frames;
        this.v_speed = (this.height - (sprite.height - this.v_intensity)) / this.frames;
         }
      if (this.width < sprite.width + this.h_intensity) this.width += this.h_speed;
      if (this.height < sprite.height + this.v_intensity) this.height += this.v_speed;
      }
    if (this.direction === -1)  // getting smaller
      {
      if (this.width <= sprite.width -this. h_intensity
       && this.height <= sprite.height - this.v_intensity)
        {
        this.direction = 1;
        this.h_intensity -= this.degradation;
        this.v_intensity = this.h_intensity * sprite.height / sprite.width;
        this.h_speed = (sprite.width + this.h_intensity - this.width) / this.frames;
        this.v_speed = (sprite.height + this.v_intensity - this.height) / this.frames;
        }
      if (this.width > sprite.width - this.h_intensity) this.width -= this.h_speed;
      if (this.height > sprite.height - this.v_intensity) this.height -= this.v_speed;
      }
    if (this.h_speed > this.h_intensity) this.h_speed -= 1;
    if (this.v_speed > this.v_intensity) this.v_speed -= 1;
    if (this.h_speed < 0) this.h_speed = 0;
    if (this.v_speed < 0) this.v_speed = 0;
    if (this.h_intensity <= 0 || this.v_intensity <= 0)  // not moving
      {
      this.direction = 0;
      this.h_intensity = 0;
      this.v_intensity = 0;
      this.h_speed = 0;
      this.v_speed = 0;
      this.width = sprite.width;
      this.height = sprite.height;
      this.kill = true;
      this.active = false;
      }

    dest.x = x - (this.width / 2);
    dest.y = y - (this.height / 2);
    dest.width = this.width;
    dest.height = this.height;
    
    if (sprite.draw_scaled != undefined) sprite.draw_scaled (canvas_2d, dest);
    }

  var smallbounce_init = function (sprite)
    {
    // Run before using smallbounce function

    this.active = true;
    this.width = sprite.width;
    this.height = sprite.height;
    this.direction = 0;
    this.kill = false;
    this.h_intensity = 0;
    this.v_intensity = 0;
    this.degradation = 0;
    this.frames = 0;
    this.h_speed = 0;
    this.v_speed = 0;
    }

  var smallbounce = function (sprite, x, y, intensity, d, f)
    {
    // function must be called from each draw step
    // image appears centered on (x, y)

    var dest = new Rectangle ();

    if (this.direction === 0 && this.kill === false)
      {
      this.h_intensity = this.intensity; // intensity of horizontal bounce in pixels
      this.degradation = d;         // pixel amount h_intensity looses each cycle
      this.frames = f;              // # of drawing frames for 1 bounce to take
      this.direction = 1;           // direction of bounce
      this.v_intensity = this.h_intensity * sprite.height / sprite.width;
      this.h_speed = (sprite.width + this.h_intensity - this.width) / this.frames;
      this.v_speed = (sprite.height + this.v_intensity - this.height) / this.frames;
      }
    if (this.direction === 1)  // getting bigger
      {
      if (this.width >= sprite.width + this.h_intensity
       && this.height >= sprite.height + this.v_intensity)
        {
        this.direction = -1;
        this.h_intensity -= this.degradation;
        this.v_intensity = this.h_intensity * sprite.height / sprite.width;
        this.h_speed = (this.width - (sprite.width - this.h_intensity)) / this.frames;
        this.v_speed = (this.height - (sprite.height - this.v_intensity)) / this.frames;
        }
      if (this.width  < sprite.width  + this.h_intensity) this.width += this.h_speed;
      if (this.height < sprite.height + this.v_intensity) this.height += this.v_speed;
      }
    if (this.direction === -1)  // getting smaller
      {
      if (this.width <= sprite.width - this.h_intensity
       && this.height <= sprite.height - this.v_intensity)
        {
        this.direction = 1;
        this.h_intensity -= this.degradation;
        this.v_intensity = this.h_intensity * sprite.height / sprite.width;
        this.h_speed = (sprite.width + this.h_intensity - this.width) / this.frames;
        this.v_speed = (sprite.height + this.v_intensity - this.height) / this.frames;
        }
      if (this.width > sprite.width - this.h_intensity) this.width -= this.h_speed;
      if (this.height > sprite.height - this.v_intensity) this.height -= this.v_speed;
      }
    if (this.h_speed > this.h_intensity) this.h_speed -= 1;
    if (this.v_speed > this.v_intensity) this.v_speed -= 1;
    if (this.h_speed < 0) this.h_speed = 0;
    if (this.v_speed < 0) this.v_speed = 0;
    if (this.h_intensity < .5 || this.v_intensity < .5)  // not moving
      {
      this.direction = 0;
      this.h_intensity = 0;
      this.v_intensity = 0;
      this.h_speed = 0;
      this.v_speed = 0;
      this.width = sprite.width;
      this.height = sprite.height;
      this.kill = true;
      this.active = false;
      }
    dest.x = x - this.width / 2;
    dest.y = y - this.height / 2;
    dest.width = this.width;
    dest.height = this.height;
    sprite.draw_scaled (canvas_2d, dest);
    }
  }
