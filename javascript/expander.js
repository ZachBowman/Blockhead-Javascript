// The Expander
// Zach Bowman
// 2010 Nightmare Games
// 2016 Burning Freak Games

function Expander ()
  {
//     Texture2D sprite;
//     public bool expand_activated = false;
//     public bool expand_running = false;
//     public bool deflate_activated = false;
//     public bool deflate_running = false;
//     double width = 0;
//     double height = 0;
//     //int direction = 0;
//     //bool kill = false;
//     //double h_intensity = 0;
//     double scale;
//     int frames = 0;
//     double h_speed = 0;
//     double v_speed = 0;
//     double goal_width, goal_height;

  this.expand_begin = function (input_sprite)
    {
    // Run before using expand function

    this.expand_activated = true;
    this.expand_running = false;
    this.sprite = input_sprite;
    this.width = this.sprite.Width;
    this.height = this.sprite.Height;
    this.frames = 0;
    this.h_speed = 0;
    this.v_speed = 0;
    }
   
//     public void expand (SpriteBatch spriteBatch, int x, int y, double scale_input, int frames_input, int opacity)
//       {
//       // function must be called from each draw step
//       // image appears centered on (x, y)

//       Rectangle dest = Rectangle.Empty;

//       if (expand_activated == true && expand_running == false)  // start expanding
//         {
//         expand_running = true;
//         scale = scale_input;    // new size ratio (1 = same, 2 = double)
//         frames = frames_input;  // # of drawing frames for 1 bounce to take
//         goal_width = sprite.Width  * scale;
//         goal_height = sprite.Height * scale;
//         h_speed = (goal_width - sprite.Width) / frames;
//         v_speed = (goal_height - sprite.Height) / frames;
//         }
//       if ((width + h_speed <= goal_width) || (height + v_speed <= goal_height))
//         {
//         height += v_speed;
//         width += h_speed;
//         }
//       else  // stop expanding
//         {
//         //running = false;
//         h_speed = 0;
//         v_speed = 0;
//         width = goal_width;
//         height = goal_height;
//         }
//       dest.X = x - Convert.ToInt16(width / 2);
//       dest.Y = y - Convert.ToInt16(height / 2);
//       dest.Width = Convert.ToInt16(width);
//       dest.Height = Convert.ToInt16(height);
//       float temp_fade = Convert.ToSingle(opacity / 255);
//       spriteBatch.Draw(sprite, dest, Color.White * temp_fade);//new Color(Color.White, Convert.ToByte(opacity)));
//       }

//     public void expand_end()
//       {
//       expand_running = false;
//       expand_activated = false;
//       }

//     public void deflate_begin (Texture2D input_sprite)
//       {
//       deflate_activated = true;
//       deflate_running = false;
//       sprite = input_sprite;
//       goal_width = sprite.Width;
//       goal_height = sprite.Height;
//       }

//     public void deflate(SpriteBatch spriteBatch, int x, int y, int frames_input, int opacity)
//       {
//       // function must be called from each draw step
//       // image appears centered on (x, y)

//       Rectangle dest = Rectangle.Empty;

//       if (deflate_activated == true && deflate_running == false)  // start deflating
//         {
//         deflate_running = true;
//         frames = frames_input;      // # of drawing frames for 1 bounce to take
//         h_speed = (width - goal_width) / frames;
//         v_speed = (height - goal_height) / frames;
//         }
//       if ((width - h_speed >= goal_width) || (height - v_speed >= goal_height))
//         {
//         width -= h_speed;
//         height -= v_speed;
//         }
//       else if (width - goal_width < .5 || height - goal_height < .5) // stop deflating
//         {
//         //running = false;
//         h_speed = 0;
//         v_speed = 0;
//         width = goal_width;
//         height = goal_height;
//         }
//       dest.X = x - Convert.ToInt16(width / 2);
//       dest.Y = y - Convert.ToInt16(height / 2);
//       dest.Width = Convert.ToInt16(width);
//       dest.Height = Convert.ToInt16(height);
//       float temp_fade = Convert.ToSingle (opacity / 255);
//       spriteBatch.Draw(sprite, dest, Color.White * temp_fade);//new Color(Color.White, Convert.ToByte(opacity)));
//       }

//     public void change_sprite (Texture2D new_sprite)
//       {
//       sprite = new_sprite;
    //}
  }
