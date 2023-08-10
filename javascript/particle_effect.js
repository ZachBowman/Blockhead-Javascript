// Particle Effect Engine
// Zach Bowman
// 2007, 2015 Nightmare Games

var max_effects = 20;
var max_particles_per_effect = 200;
var particle_effect = [];

//////////////////////////////////////////////////////////////////////////////

function new_effect (sprite, amount, xorigin, yorigin, screen_w, screen_h, direction, spread,
  avg_velocity, velocity_range, acceleration, fade, fade_speed, gravity)
  {
  var effect = new Particle_Effect(sprite, amount, xorigin, yorigin, screen_w, screen_h, direction, spread,
    avg_velocity, velocity_range, acceleration, fade, fade_speed, gravity);

  particle_effect.push (effect);

  // If we're over the limit, destroy the oldest effect and keep the new one.
  if (particle_effect.length > max_effects) particle_effect.splice (0, 1);
  }

//////////////////////////////////////////////////////////////////////////////

class Particle_Effect
  {
  constructor(sprite, amount, xorigin, yorigin, screen_w, screen_h, direction, spread,
    avg_velocity, velocity_range, acceleration, fade, fade_speed, gravity)
    {
    this.particle = [];
    this.active = true;
    this.screen_width  = screen_w;
    this.screen_height = screen_h;
    if (amount > max_particles_per_effect) amount = max_particles_per_effect;

    for (let p = 0; p < amount; p += 1)
      {
      let particle = new Particle();
      particle.sprite = sprite;
      particle.x = xorigin;
      particle.y = yorigin;
      let temp = Math.round (Math.random() * spread) + direction - (spread / 2);
      particle.dir = temp * -1;
      if (particle.dir >= 360) particle.dir -= 360;
      if (particle.dir < 0) particle.dir += 360;
      
      if (velocity_range == 0) particle.velocity = avg_velocity;
      else particle.velocity = (Math.random () * velocity_range) + (avg_velocity - (velocity_range / 2));
      if (particle.velocity < 0) particle.velocity = 0;

      particle.acceleration = acceleration;
      particle.fade = fade;
      particle.fade_speed = fade_speed;
      particle.gravity = gravity;
      particle.gravity_accelerated = 0;

      this.particle.push (particle);
      }
    }

  ////////////////////////////////////////////////////////////////////////////////

  update()
    {
    let xmove, ymove;
    let alive = true;

    if (this.particle.length > 0) this.active = true;
    else this.active = false;

    let p = 0;
    while (p < this.particle.length)
      {
      alive = true;

      xmove = this.particle[p].velocity * Math.cos (to_radians (this.particle[p].dir));
      ymove = this.particle[p].velocity * Math.sin (to_radians (this.particle[p].dir));

      this.particle[p].x += xmove;
      this.particle[p].y += ymove;

           if (this.particle[p].x < 0)             alive = false;
      else if (this.particle[p].x > screen_width)  alive = false;
      else if (this.particle[p].y < 0)             alive = false;
      else if (this.particle[p].y > screen_height) alive = false;
    
      // accelerate / decelerate
      this.particle[p].velocity += this.particle[p].acceleration;
      if (this.particle[p].velocity < 0) this.particle[p].velocity = 0;

      // gravity
      this.particle[p].gravity_accelerated += this.particle[p].gravity;
      this.particle[p].y += this.particle[p].gravity_accelerated;

      // fade (transparency)
      this.particle[p].fade += this.particle[p].fade_speed;
      if (this.particle[p].fade <= 0) alive = false;

      if (!alive) this.particle.splice (p, 1);
      else p += 1;
      }
    }

  ////////////////////////////////////////////////////////////////////////////////

  draw()
    {
    for (let p = 0; p < this.particle.length; p += 1)
      {
      let temp_fade = this.particle[p].fade / 255;
      this.particle[p].sprite.draw (canvas_2d, this.particle[p].x, this.particle[p].y, temp_fade);
      }
    }
  }
