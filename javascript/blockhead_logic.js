// Blockhead
// Nightmare Games
// Zach Bowman

////////////////////////////////////////////////////////////////////////////////

function big_block_animation ()
  {
  // if (big_purple.frame === 0 && Math.round (Math.random () * 40) === 0) big_purple.frame = 1;
  // else if (big_purple.frame !== 0 && Math.round (Math.random () * 30) === 0) big_purple.frame = 0;

  if (big_purple.frame === 0 && random (0, 40) === 0) big_purple.frame = 1;
  else if (big_purple.frame !== 0 && random (0, 30) === 0) big_purple.frame = 0;
  }

////////////////////////////////////////////////////////////////////////////////

function lightning_control ()
  {
  lightning.count += 1;
  if (lightning.count >= lightning.delay)
    {
    lightning.count = 0;
    lightning.frame += 1;
    if (lightning.frame >= 16) lightning.frame = 0;
    }
  }

////////////////////////////////////////////////////////////////////////////////
 
function title_screen_bg ()
  {
  var b = random (0, 4);//Math.round (Math.random() * 4);  // 0-4
  if (b === 0) title_bg_sprite = title_yellow;
  else if (b === 1) title_bg_sprite = title_blue;
  else if (b === 2) title_bg_sprite = title_red;
  else if (b === 3) title_bg_sprite = title_orange;
  else title_bg_sprite = title_green;
  }
   
////////////////////////////////////////////////////////////////////////////////

function fadeout () { fade_direction = "out"; }
function fadein () { fade_direction = "in"; }
   
////////////////////////////////////////////////////////////////////////////////
 
function Fade_Control ()
  {
  if (fade_direction === "in")
    {
    fade_opacity -= 0.02;
    if (fade_opacity <= 0)
      {
      fade_direction = NONE;

    // if fade in completed
    // if (fader.running === false && next_game_state === NONE)
      // {
      // if (game_state === INTRO)
        // {
        // wait.init (60); // 2 second pause for ng logo
        // next_game_state = MENU;
        // fader.reset ();
        // fadeout ();
        // }
      // if (game_state === MENU) passed_intro = true;
      // }
      }
    }
  else if (fade_direction === "out")
    {
    fade_opacity += 0.02;
    if (fade_opacity >= 1.0)
      {
      fade_direction = "in";

      game_state = next_game_state;
      next_game_state = NONE;          

      // if (game_state === MENU && passed_intro === false)
        // {
        // play_sound ("blockhead");
        // }
      // else
      if (game_state === GAME && newgame === true) new_game ();
      // if (game_state != INSTRUCT1 && game_state != INSTRUCT2
          // && option_music === true && MediaPlayer.State === MediaState.Playing) MediaPlayer.Stop ();
      }
    }
  }

////////////////////////////////////////////////////////////////////////////////
   
function new_game ()  // Start New Game
  {
  // options box
  box.x = screen_x_offset;
  box.y = screen_height - box_sprite.height;
  box_menu.x = box.x + 20;
  box_menu.y = box.y + 40;
  box_newgame.x = box.x + 160;
  box_newgame.y = box.y + 30;
  box_options.x = box.x + 290;
  box_options.y = box.y + 40;
    
  option_difficulty = option_difficulty_next;
  option_timer = option_timer_next;
      
  // clear blocks
  block.clear_list ();
  // for (var b = 0; b < block.list.length; b += 1)
  //   {
  //   block.list[b].color = R;
  //   block.list[b].status = 0;
    
  //   block.list[b].change = CHANGE_NONE;
  //     // -2 = destroy check
  //     // -1 = destroy
  //     //  1 = color change 1
  //     //  2 = color change 2

  //   block.list[b].frame = 0;
  //   block.list[b].dir = NONE;
  //   block.list[b].gx = 0;
  //   block.list[b].gy = 0;
  //   block.list[b].is_checked = false;
  //   block.list[b].destroy_checked = false;
  //   block.list[b].goal_block = 0;
  //   }
    
  // clear block reference arrays
  number_grid = [[-1,-1,-1,-1,-1,-1],
                 [-1,-1,-1,-1,-1,-1],
                 [-1,-1,-1,-1,-1,-1],
                 [-1,-1,-1,-1,-1,-1],
                 [-1,-1,-1,-1,-1,-1],
                 [-1,-1,-1,-1,-1,-1],
                 [-1,-1,-1,-1,-1,-1],
                 [-1,-1,-1,-1,-1,-1]];

  color_grid = [[_,Q,_,_,_,_],
                [_,_,_,_,_,_],
                [_,_,_,_,_,_],
                [_,_,_,_,_,_],
                [_,_,_,_,_,_],
                [_,_,_,_,_,_],
                [R,_,_,_,_,_],
                [R,R,_,_,_,_]];
  
  tiles_y = color_grid.length;
  tiles_x = color_grid[0].length;

  // puzzle
  puzzle_width = tiles_x * tilesize_x;
  puzzle_height = tiles_y * tilesize_y;
  puzzle_x = tilesize_x / 2;
  puzzle_y = box.y - demolition_sprite.height - puzzle_height;// + tilesize_y;

  //generate_random_blocks ();
  read_blocks_from_grid ();
  
  // initialize grabber
  grabber.gx = 3;
  grabber.gy = 0;
  grabber.x = puzzle_x + (grabber.gx * tilesize_x) - ((grabber.width - tilesize_x) / 2);
  grabber.y = -63;
  grabber.dir = NONE;
  grabber.wantmove = NONE;
  grabber.movespeed = 10;
  grabber.status = 1;
  grabber.block = newblock (Z);
  
  // block frame
  frame_frame = 0;
  frame_count = 0;
  frame_delay = 1.1;
  
  // initialize conveyor
  conveyor.frame = 0;
  conveyor.x1 = puzzle_x + puzzle_width + 10;
  conveyor.x2 = conveyor.x1 + 66;
  conveyor.y1 = puzzle_y;
  conveyor.y2 = conveyor.y1;
  
  next1.x = conveyor.x1 + 8;
  next2.x = next1.x + tilesize_x + 10;
  next3.x = next2.x + tilesize_x + 10;
  next1.y = conveyor.y1 - tilesize_y + 4;
  next2.y = conveyor.y2 - tilesize_y + 4;
  next3.y = conveyor.y2 - tilesize_y + 4;
   
  next1.block = newblock (Z);
  next2.block = newblock (Z);
  next3.block = newblock (Z);
  if (next1.block >= 0)
    {
    block.list[next1.block].x = next1.x;
    block.list[next1.block].y = next1.y;
    }
  if (next2.block >= 0)
    {
    block.list[next2.block].x = next2.x;
    block.list[next2.block].y = next2.y;
    }
  if (next3.block >= 0)
    {
    block.list[next3.block].x = next3.x;
    block.list[next3.block].y = next3.y;
    }
  
  // block counter
  block_counter.x = conveyor.x1 + 20;
  block_counter.y = conveyor.y1 + (tilesize_y * 1.5);
  
  // color chart
  chart.x = conveyor.x1;// - 9;
  chart.y = puzzle_y + (puzzle_height / 2) - (chart_sprite.height / 2);
  //chart.v0.X = chart.x + 10;
  chart.x1 = chart.x + 20;//42;
  chart.x2 = chart.x + 50;//64;
  chart.x3 = chart.x + 80;//86;
  chart.y1 = chart.y + 23;
  chart.y2 = chart.y + 64;
  chart.block0 = 0;
  chart.block1a = 0;
  chart.block1b = 0;
  chart.block2a = 0;
  chart.block2b = 0;
  chart.arrow1 = 0;
  chart.arrow2 = 0;
    
  // options screen
  options_resume_object.x = screen_x_offset + (screen_width / 2);
  options_resume_object.y = screen_y_offset + 50;
  options_sound_object.x = options_resume_object.x - 20;
  options_sound_object.y = options_resume_object.y + 100;
  options_music_object.x = options_sound_object.x + 25;
  options_music_object.y = options_sound_object.y + 100;
  options_difficulty_object.x = options_music_object.x + 20;
  options_difficulty_object.y = options_music_object.y + 100;
  options_height_object.x = options_difficulty_object.x;
  options_height_object.y = options_difficulty_object.y + 100;
  options_timer_object.x = options_height_object.x - 20;
  options_timer_object.y = options_height_object.y + 100;
  options_menu_object.x = options_timer_object.x + 10;
  options_menu_object.y = options_timer_object.y + 100;
  
  // backgrounds
  var bg = background_index;
  while (bg === background_index) bg = random (0, background.length - 1);
  background_index = bg;
  
  youwin_bounce.bouncepop_init ();
  youlose_bounce.bouncepop_init ();
  
  game_active = true;
  game_state = GAME;
  game_won = false;
  game_lost = false;
  game_check_lost = false;
  
  // initialize timer
  timer.seconds = 0;
  timer.x = screen_x_offset + (screen_width / 2) - (timer_0_sprite.width * 3 / 2);
  timer.y = screen_y_offset;
  timer.last_miliseconds = date.getTime();
  for (var b = 0; b < block.list.length; b += 1)
    {
    // # of seconds on timer for each goal block
    if (block.list[b].goal_block === 1)
      {
      if (option_difficulty <= 3) timer.seconds += 7;
      else if (option_difficulty <= 6) timer.time += 6;
      else timer.time += 5;
      }
    }
  
  passed_intro = true;
  
  played_game = true;
  if (display_options === true)
    {
    display_options = false;
    options_fade.reset ();
    options_fade.init (192, 0, 24);
    }
  
  //if (fader != undefined) fader.reset ();
  //if (fadein != undefined)
  fadein ();

  newsong = true;
  }
   
////////////////////////////////////////////////////////////////////////////////

function generate_random_blocks ()
  {
  // create color_grid from scratch
  goal_blocks = 0;
  for (var gy = 0; gy < color_grid.length; gy += 1)
    {
    for (var gx = 0; gx < color_grid[gy].length; gx += 1)
      {
      if (gy < tiles_y - option_height) color_grid[gy][gx] = _;
      else
        {
        var b = newblock (Z);
        if (b >= 0)
          {
          color_grid[gy][gx] = 'Z';
          block.list[b].gx = gx;
          block.list[b].gy = gy;
          block.list[b].x = puzzle_x + (block.list[b].gx * tilesize_x);
          block.list[b].y = puzzle_y + (block.list[b].gy * tilesize_y);
          if (block.list[b].color === M || block.list[b].color === K || block.list[b].color === Q)
            block.list[b].color = random (1, 6);
          number_grid[gy][gx] = b;
          block.list[b].goal_block = 1;
          goal_blocks += 1;
          }
        else color_grid[gy][gx] = _;
        }
      }
    }
  
  // change randomized blocks to account for 3 in a row at start
  var foundthree = 1;
  while (foundthree === 1)
    {
    foundthree = 0;
    for (var gy = 0; gy < tiles_y; gy += 1)
      {
      for (var gx = 0; gx < tiles_x; gx += 1)
        {
        var b = number_grid[gy][gx];
        if (color_grid[gy][gx] === 'Z' && b >= 0)
          {
          // if (number_grid[gy][gx - 1] >= 0 && number_grid[gy][gx + 1] >= 0
          // && number_grid[gy - 1][gx] >= 0 && number_grid[gy + 1][gx] >= 0)
          //   {
          //   if ((block.list[number_grid[gy][gx - 1]].color === block.list[b].color
          //   && block.list[number_grid[gy][gx + 1]].color === block.list[b].color)
          //   || (block.list[number_grid[gy - 1][gx]].color === block.list[b].color
          //   && block.list[number_grid[gy + 1][gx]].color === block.list[b].color))
          //     {
          //     foundthree = 1;
          //     while (block.list[b].color === block.list[number_grid[gy][gx - 1]].color
          //         || block.list[b].color === block.list[number_grid[gy - 1][gx]].color)
          //       block.list[b].color = Math.round (Math.random() * 6);
          //     }
          //   }

          // check horizontal
          if (gx > 0 && gx < tiles_x - 1
          && number_grid[gy][gx - 1] >= 0 && number_grid[gy][gx + 1] >= 0)
            {
            if (block.list[number_grid[gy][gx - 1]].color === block.list[b].color
             && block.list[number_grid[gy][gx + 1]].color === block.list[b].color)
              {
              foundthree = 1;
              while (block.list[b].color === block.list[number_grid[gy][gx - 1]].color)
                block.list[b].color = random (1, 6);//Math.round (Math.random() * 5) + 1;  // 1-6
              }
            }

          // check vertical
          if (gy > 0 && gy < tiles_y - 1
          && number_grid[gy - 1][gx] >= 0 && number_grid[gy + 1][gx] >= 0)
            {
            if (block.list[number_grid[gy - 1][gx]].color === block.list[b].color
             && block.list[number_grid[gy + 1][gx]].color === block.list[b].color)
              {
              foundthree = 1;
              while (block.list[b].color === block.list[number_grid[gy - 1][gx]].color)
                block.list[b].color = random (1, 6);//Math.round (Math.random() * 5) + 1;  // 1-6
              }
            }
          }
        }
      }
    }
  
  // change randomized blocks from Z to correct color on color_grid
  for (var gy = 0; gy < tiles_y; gy += 1)
    {
    for (var gx = 0; gx < tiles_x; gx += 1)
      {
      var b = number_grid[gy][gx];
      if (b >= 0) color_grid[gy][gx] = block.list[b].color;
      }
    }
  }

////////////////////////////////////////////////////////////////////////////////

function read_blocks_from_grid ()
  {
  for (var gy = 0; gy < tiles_y; gy += 1)
    {
    for (var gx = 0; gx < tiles_x; gx += 1)
      {
      if (color_grid[gy][gx] != _)
        {
        var b = newblock (color_grid[gy][gx]);
        if (b >= 0) number_grid[gy][gx] = b;
        put_block_on_grid (b, gx, gy);
        }
      }
    }
  }

////////////////////////////////////////////////////////////////////////////////

function put_block_on_grid (index, gx, gy)
  {
  var b = block.list[index];
  color_grid[gy][gx] = b.color;
  b.gx = gx;
  b.gy = gy;
  b.x = puzzle_x + (b.gx * tilesize_x);
  b.y = puzzle_y + (b.gy * tilesize_y);
  number_grid[gy][gx] = index;
  b.goal_block = 1;
  goal_blocks += 1;
  }

////////////////////////////////////////////////////////////////////////////////

// crappy distance checker, does not slow game down
function close_enough (x1, y1, x2, y2, distance)
  {
  if (x1 > x2 - distance && x1 < x2 + distance
      && y1 > y2 - distance && y1 < y2 + distance) return true;
  else return false;
  }

////////////////////////////////////////////////////////////////////////////////

function get_direction (x1, y1, x2, y2)
  {
  var dir_radians;
  var x_distance, y_distance;

  x_distance = x2 - x1;
  y_distance = y2 - y1;

  // get radians of direction
  if (x_distance > 0 && y_distance >= 0) dir_radians = Math.atan (y_distance / x_distance);
  else if (x_distance > 0 && y_distance < 0) dir_radians = Math.atan (y_distance / x_distance) + (2 * Math.PI);
  else if (x_distance < 0) dir_radians = Math.atan (y_distance / x_distance) + Math.PI;
  else if (x_distance === 0 && y_distance > 0) dir_radians = 90 * Math.PI / 180;
  else if (x_distance === 0 && y_distance < 0) dir_radians = 270 * Math.PI / 180;
  else dir_radians = 0;  // x_distance = 0, y_distance = 0

  return dir_radians;
  }

////////////////////////////////////////////////////////////////////////////////
 
function Block_Counter ()
  {
  goal_blocks = 0;
  for (var b = 0; b < block.list.length; b += 1)
    {
    if (block.list[b].goal_block === 1) goal_blocks += 1;
    }
  }

////////////////////////////////////////////////////////////////////////////////

function Grabber_Control ()
  {
  if (grabber.dir == NONE && grabber.gx > grabber.destination && grabber.destination != -1
    && color_grid[grabber.gy + 2, grabber.gx - 1] != 'W'
    && grabber.status == 1)
    {
    grabber.gx -= 1;
    grabber.dir = LEFT;
    }
  if (grabber.dir == NONE && grabber.gx < grabber.destination && grabber.destination != -1
    && color_grid[grabber.gy + 2, grabber.gx + 1] != 'W'
    && grabber.status == 1)
    {
    grabber.gx += 1;
    grabber.dir = RIGHT;
    }

  if (next1.block >= 0)
    {
    if (grabber.status === 0 && grabber.block === -1 && grabber.dir != RIGHT) grabber.dir = RIGHT;
    if (grabber.status === 0 && grabber.dir === RIGHT && grabber.x >= block.list[next1.block].x)
      {
      grabber.control_type = NO_CONTROL;
      grabber.dir = LEFT;
      grabber.block = next1.block;
      next1.block = next2.block;
      next2.block = next3.block;
      next3.block = newblock (Z);
      if (next3.block >= 0)
        {
        block.list[next3.block].x = next3.x;
        block.list[next3.block].y = next3.y;
        }
      }
    }
  if (grabber.dir === LEFT && grabber.status === 1)
    grabber.x -= grabber.movespeed;
  if (grabber.dir === RIGHT && grabber.status === 1) grabber.x += grabber.movespeed;
  if (grabber.dir === LEFT && grabber.status === 0)
    grabber.x -= grabber.movespeed * 2;
  if (grabber.dir === RIGHT && grabber.status === 0) grabber.x += grabber.movespeed * 2;

  // going left with a block
  if (grabber.dir === LEFT && grabber.block > -1 && grabber.x <= puzzle_x + (grabber.gx * tilesize_x) - (grabber.width - tilesize_x) / 2)
    {
    grabber.dir = NONE;
    if (grabber.status === 0) grabber.status = 1;
    if (grabber.control_type === KEYBOARD_CONTROL && key_left === true && grabber.gx > 0) grabber.destination = grabber.gx - 1;
    else if (grabber.control_type === CLICK_CONTROL && grabber.gx === grabber.destination) drop_block ();
    }

  // going left without a block
  else if (grabber.dir === LEFT && grabber.block === -1 && next1.block === -1 && grabber.x <= puzzle_x + (grabber.gx * tilesize_x) - (grabber.width - tilesize_x) / 2)
    {
    grabber.dir = NONE;
    if (grabber.status === 0) grabber.status = 1;
    }

  // going right with a block
  if (grabber.dir === RIGHT && grabber.block > -1 && grabber.x >= puzzle_x + (grabber.gx * tilesize_x) - (grabber.width - tilesize_x) / 2)
    {
    grabber.dir = NONE;
    if (grabber.status === 0) grabber.status = 1;
    if (grabber.control_type === KEYBOARD_CONTROL && key_right === true && grabber.gx < 5) grabber.destination = grabber.gx + 1;
    else if (grabber.control_type === CLICK_CONTROL && grabber.gx === grabber.destination) drop_block ();
    }

  // going right without a block
  else if (grabber.dir === RIGHT && grabber.block === -1 && next1.block === -1 && grabber.x >= puzzle_x + (grabber.gx * tilesize_x) - (grabber.width - tilesize_x) / 2)
    {
    grabber.dir = NONE;
    if (grabber.status === 0) grabber.status = 1;
    }

  if (grabber.y < puzzle_y - tilesize_y - 90) grabber.y += 2;//+ (grabber.gy * tilesize_y) - 90) grabber.y += 2;
  if (grabber.block > -1)
    {
    block.list[grabber.block].x = grabber.x + grabber.block_offset_x;
    block.list[grabber.block].y = grabber.y + grabber.block_offset_y;
    }
  // if (grabber.dir === NONE && grabber.gx === grabber.destination && grabber.block > -1 && color_grid[grabber.gy + 1][grabber.gx] === _)
  //   {
  //   block.list[grabber.block].gx = grabber.gx;
  //   block.list[grabber.block].gy = grabber.gy;
  //   block.list[grabber.block].x = puzzle_x + (block.list[grabber.block].gx * tilesize_x);
  //   block.list[grabber.block].y = puzzle_y + (block.list[grabber.block].gy * tilesize_y);
  //   color_grid[block.list[grabber.block].gy][block.list[grabber.block].gx] = block.list[grabber.block].color;
  //   number_grid[block.list[grabber.block].gy][block.list[grabber.block].gx] = grabber.block;
  //   block.list[grabber.block].is_checked = false;
  //   block.list[grabber.block].count = 0;
  //   grabber.block = -1;
  //   if (next1.block >= 0) grabber.status = 0;
  //   grabber.destination = -1;
  //   }
  }

////////////////////////////////////////////////////////////////////////////////

function Chart_Control ()
  {
  if (grabber.block > -1)
    {
    chart.block0 = block.list[grabber.block].color;
    if (block.list[grabber.block].color === R)
      {
      chart.block1a = Y; chart.block1b = O; chart.arrow1 = 2;
      chart.block2a = B; chart.block2b = P; chart.arrow2 = 5;
      }
    else if (block.list[grabber.block].color === O)
      {
      chart.block1a = G; chart.block1b = Y; chart.arrow1 = 3;
      chart.block2a = P; chart.block2b = R; chart.arrow2 = 6;
      }
    else if (block.list[grabber.block].color === Y)
      {
      chart.block1a = R; chart.block1b = O; chart.arrow1 = 1;
      chart.block2a = B; chart.block2b = G; chart.arrow2 = 4;
      }
    else if (block.list[grabber.block].color === G)
      {
      chart.block1a = O; chart.block1b = Y; chart.arrow1 = 2;
      chart.block2a = P; chart.block2b = B; chart.arrow2 = 5;
      }
    else if (block.list[grabber.block].color === B)
      {
      chart.block1a = R; chart.block1b = P; chart.arrow1 = 6;
      chart.block2a = Y; chart.block2b = G; chart.arrow2 = 3;
      }
    else if (block.list[grabber.block].color === P)
      {
      chart.block1a = O; chart.block1b = R; chart.arrow1 = 1;
      chart.block2a = G; chart.block2b = B; chart.arrow2 = 4;
      }
    }
  }

////////////////////////////////////////////////////////////////////////////////
 
function Frame_Glow ()
  {
  frame_count += 1;
  if (frame_count >= frame_delay)
    {
    frame_count = 0;
    frame_frame += 1;
    if (frame_frame >= 32) frame_frame = 0;
    }
  }

////////////////////////////////////////////////////////////////////////////////

function Goal_Frame_Pulse ()  // pulsing white box for goal blocks
  {
  if (pulse_increasing === true)
    {
    pulse_fade += pulse_speed;
    if (pulse_fade >= pulse_max)
      {
      pulse_fade = pulse_max;
      pulse_increasing = false;
      }
    }
  else
    {
    pulse_fade -= pulse_speed;
    if (pulse_fade <= 0)
      {
      pulse_fade = 0;
      pulse_increasing = true;
      }
    }
  }

////////////////////////////////////////////////////////////////////////////////

function Conveyor_Control ()
  {
  var moving = 0;
  if (next1.block >= 0)
    {
    if (block.list[next1.block].x > next1.x)
      {
      block.list[next1.block].x -= 2;
      moving = 1;
      }
    }
  if (next2.block >= 0)
    {
    if (block.list[next2.block].x > next2.x)
      {
      block.list[next2.block].x -= 2;
      moving = 1;
      }
    }
  if (next3.block >= 0)
    {
    if (block.list[next3.block].x > next3.x)
      {
      block.list[next3.block].x -= 2;
      moving = 1;
      }
    }
  if (next3.block === -1)
    {
    next3.block = newblock (Z);
    if (next3.block >= 0)
      {
      block.list[next3.block].x = next3.x;
      block.list[next3.block].y = next3.y;
      }
    }
  if (next3.block >= 0 && next2.block === -1)
    {
    next2.block = next3.block;
    next3.block = -1;
    }
  if (next2.block >= 0 && next1.block === -1)
    {
    next1.block = next2.block;
    next2.block = -1;
    }
  if (moving === 1)
    {
    conveyor.frame += 1;
    if (conveyor.frame > 3) conveyor.frame = 0;
    }
  }

////////////////////////////////////////////////////////////////////////////////

function Falling_Blocks ()
  {
  for (var this_block = 0; this_block < block.list.length; this_block += 1)
    {
    if (this_block != grabber.block && this_block != next1.block && this_block != next2.block && this_block != next3.block)
      {
      var b = block.list[this_block];

      if (b.status === 1 && b.dir === DOWN)
        {
        b.y += gravity;
        if (b.y >= puzzle_y + (b.gy * tilesize_y))
          {
          b.y = puzzle_y + (b.gy * tilesize_y);
          b.dir = NONE;
          color_grid[b.gy][b.gx] = b.color;
          number_grid[b.gy][b.gx] = this_block;
          b.is_checked = false;
          if (b.gy >= tiles_y - 1) play_sound ("hit");
          else if (color_grid[b.gy + 1][b.gx] != _) play_sound ("hit");
          }
        }
      if (b.status === 1 && b.dir === NONE
        && b.gy < tiles_y - 1 && color_grid[b.gy + 1][b.gx] === _
        && b != grabber.block && b != next1.block
        && b != next2.block && b != next3.block)
        {
        b.dir = DOWN;
        color_grid[b.gy][b.gx] = _;
        number_grid[b.gy][b.gx] = -1;
        b.gy += 1;
        color_grid[b.gy][b.gx] = b.color;
        }

      block.list[this_block] = b;
      }
    }
  }

////////////////////////////////////////////////////////////////////////////////

function Color_Change ()
  {
  for (var b = 0; b < block.list.length; b += 1)
    {
    var gy = block.list[b].gy;
    var gx = block.list[b].gx;
    if (block.list[b].status === 1)
      {
      if (block.list[b].is_checked === false && block.list[b].dir === NONE)
        {
        block.list[b].is_checked = true;
        if (block.list[b].color === R)
          {
          if (gy < tiles_y - 1 && color_grid[gy + 1][gx] === B) changecolor (gy + 1, gx, P);
          if (gy < tiles_y - 1 && color_grid[gy + 1][gx] === Y) changecolor (gy + 1, gx, O);
          if (gx > 0           && color_grid[gy][gx - 1] === B) changecolor (gy, gx - 1, P);
          if (gx > 0           && color_grid[gy][gx - 1] === Y) changecolor (gy, gx - 1, O);
          if (gx < tiles_x - 1 && color_grid[gy][gx + 1] === B) changecolor (gy, gx + 1, P);
          if (gx < tiles_x - 1 && color_grid[gy][gx + 1] === Y) changecolor (gy, gx + 1, O);
          }
        else if (block.list[b].color === O)
          {
          if (gy < tiles_y - 1 && color_grid[gy + 1][gx] === P) changecolor (gy + 1, gx, R);
          if (gy < tiles_y - 1 && color_grid[gy + 1][gx] === G) changecolor (gy + 1, gx, Y);
          if (gx > 0           && color_grid[gy][gx - 1] === P) changecolor (gy, gx - 1, R);
          if (gx > 0           && color_grid[gy][gx - 1] === G) changecolor (gy, gx - 1, Y);
          if (gx < tiles_x - 1 && color_grid[gy][gx + 1] === P) changecolor (gy, gx + 1, R);
          if (gx < tiles_x - 1 && color_grid[gy][gx + 1] === G) changecolor (gy, gx + 1, Y);
          }
        else if (block.list[b].color === Y)
          {
          if (gy < tiles_y - 1 && color_grid[gy + 1][gx] === R) changecolor (gy + 1, gx, O);
          if (gy < tiles_y - 1 && color_grid[gy + 1][gx] === B) changecolor (gy + 1, gx, G);
          if (gx > 0           && color_grid[gy][gx - 1] === R) changecolor (gy, gx - 1, O);
          if (gx > 0           && color_grid[gy][gx - 1] === B) changecolor (gy, gx - 1, G);
          if (gx < tiles_x - 1 && color_grid[gy][gx + 1] === R) changecolor (gy, gx + 1, O);
          if (gx < tiles_x - 1 && color_grid[gy][gx + 1] === B) changecolor (gy, gx + 1, G);
          }
        else if (block.list[b].color === G)
          {
          if (gy < tiles_y - 1 && color_grid[gy + 1][gx] === O) changecolor (gy + 1, gx, Y);
          if (gy < tiles_y - 1 && color_grid[gy + 1][gx] === P) changecolor (gy + 1, gx, B);
          if (gx > 0           && color_grid[gy][gx - 1] === O) changecolor (gy, gx - 1, Y);
          if (gx > 0           && color_grid[gy][gx - 1] === P) changecolor (gy, gx - 1, B);
          if (gx < tiles_x - 1 && color_grid[gy][gx + 1] === O) changecolor (gy, gx + 1, Y);
          if (gx < tiles_x - 1 && color_grid[gy][gx + 1] === P) changecolor (gy, gx + 1, B);
          }
        else if (block.list[b].color === B)
          {
          if (gy < tiles_y - 1 && color_grid[gy + 1][gx] === Y) changecolor (gy + 1, gx, G);
          if (gy < tiles_y - 1 && color_grid[gy + 1][gx] === R) changecolor (gy + 1, gx, P);
          if (gx > 0           && color_grid[gy][gx - 1] === Y) changecolor (gy, gx - 1, G);
          if (gx > 0           && color_grid[gy][gx - 1] === R) changecolor (gy, gx - 1, P);
          if (gx < tiles_x - 1 && color_grid[gy][gx + 1] === Y) changecolor (gy, gx + 1, G);
          if (gx < tiles_x - 1 && color_grid[gy][gx + 1] === R) changecolor (gy, gx + 1, P);
          }
        else if (block.list[b].color === P)
          {
          if (gy < tiles_y - 1 && color_grid[gy + 1][gx] === G) changecolor (gy + 1, gx, B);
          if (gy < tiles_y - 1 && color_grid[gy + 1][gx] === O) changecolor (gy + 1, gx, R);
          if (gx > 0           && color_grid[gy][gx - 1] === G) changecolor (gy, gx - 1, B);
          if (gx > 0           && color_grid[gy][gx - 1] === O) changecolor (gy, gx - 1, R);
          if (gx < tiles_x - 1 && color_grid[gy][gx + 1] === G) changecolor (gy, gx + 1, B);
          if (gx < tiles_x - 1 && color_grid[gy][gx + 1] === O) changecolor (gy, gx + 1, R);
          }
        }
      }
    }
  }

////////////////////////////////////////////////////////////////////////////////

function Destroy_Blocks ()
  {
  for (var gy = 0; gy < tiles_y; gy += 1)
    {
    for (var gx = 0; gx < tiles_x; gx += 1)
      {
      // horizontal match
      if (gx > 0 && gx < tiles_x - 1 && number_grid[gy][gx] >= 0 && number_grid[gy][gx - 1] >= 0 && number_grid[gy][gx + 1] >= 0)
        {
        if (iscolor (color_grid[gy][gx])
        && color_grid[gy][gx - 1] === color_grid[gy][gx]
        && color_grid[gy][gx + 1] === color_grid[gy][gx]
        && block.list[number_grid[gy][gx - 1]].dir === NONE
        && block.list[number_grid[gy][gx]].dir === NONE
        && block.list[number_grid[gy][gx + 1]].dir === NONE
        && block.list[number_grid[gy][gx - 1]].change === CHANGE_NONE
        && block.list[number_grid[gy][gx]].change === CHANGE_NONE
        && block.list[number_grid[gy][gx + 1]].change === CHANGE_NONE)
          {
          block.list[number_grid[gy][gx - 1]].change = CHANGE_MARKED;
          block.list[number_grid[gy][gx]].change = CHANGE_MARKED;
          block.list[number_grid[gy][gx + 1]].change = CHANGE_MARKED;
          play_sound ("destroy");
          //color_flasher (block.list[number_grid[gy][gx]]);
          }
        }
      // vertical match
      if (gy > 0 && gy < tiles_y - 1 && number_grid[gy][gx] >= 0 && number_grid[gy - 1][gx] >= 0 && number_grid[gy + 1][gx] >= 0)
        {
        if (iscolor (color_grid[gy][gx])
        && color_grid[gy - 1][gx] === color_grid[gy][gx]
        && color_grid[gy + 1][gx] === color_grid[gy][gx]
        && block.list[number_grid[gy - 1][gx]].dir === NONE
        && block.list[number_grid[gy][gx]].dir === NONE
        && block.list[number_grid[gy + 1][gx]].dir === NONE
        && block.list[number_grid[gy - 1][gx]].change === CHANGE_NONE
        && block.list[number_grid[gy][gx]].change === CHANGE_NONE
        && block.list[number_grid[gy + 1][gx]].change === CHANGE_NONE)
          {
          block.list[number_grid[gy - 1][gx]].change = CHANGE_MARKED;
          block.list[number_grid[gy][gx]].change = CHANGE_MARKED;
          block.list[number_grid[gy + 1][gx]].change = CHANGE_MARKED;
          play_sound ("destroy");
          //color_flasher (block.list[number_grid[gy][gx]]);
          }
        }
      if (number_grid[gy][gx] >= 0)
        {
        // black block
        if (color_grid[gy][gx] === K && block.list[number_grid[gy][gx]].dir === NONE
          && block.list[number_grid[gy][gx]].change === CHANGE_NONE)
          {
          block.list[number_grid[gy][gx]].change = CHANGE_DESTROY;
          // particle_smoke (Convert.ToInt16 (block.list[number_grid[gy][gx]].x + (tilesize_x / 2)),
                         // Convert.ToInt16 (block.list[number_grid[gy][gx]].y + (tilesize_y / 2)));
          // left
          if (gx > 0 && number_grid[gy][gx - 1] > -1)
            {
            if (block.list[number_grid[gy][gx - 1]].dir === NONE && block.list[number_grid[gy][gx - 1]].change <= 0)
              block.list[number_grid[gy][gx - 1]].change = CHANGE_DESTROY;
            }
          // right
          if (gx < tiles_x - 1 && number_grid[gy][gx + 1] >= 0)
            {
            if (block.list[number_grid[gy][gx + 1]].dir === NONE && block.list[number_grid[gy][gx + 1]].change <= 0)
              block.list[number_grid[gy][gx + 1]].change = CHANGE_DESTROY;
            }
          // below
          if (gy < tiles_y - 1 && number_grid[gy + 1][gx] >= 0)
            {
            if (block.list[number_grid[gy + 1][gx]].dir === NONE && block.list[number_grid[gy + 1][gx]].change <= 0)
              block.list[number_grid[gy + 1][gx]].change = CHANGE_DESTROY;
            }
          // if (number_grid[gy - 1][gx] >= 0)
          //   {
          //   if (block.list[number_grid[gy - 1][gx]].dir === NONE && block.list[number_grid[gy - 1][gx]].change <= 0)
          //     block.list[number_grid[gy - 1][gx]].change = CHANGE_DESTROY;
          //   }
          // play_sound ("destroy");
          }

        // rainbow block random effects
        else if (color_grid[gy][gx] === Q)
          {
          if (block.list[number_grid[gy][gx]].dir === NONE)
            {
            if (block.list[number_grid[gy][gx]].change === CHANGE_NONE)
              {
              // random color
              block.list[number_grid[gy][gx]].color = changecolor (gy, gx, random (1, 8));
              if (gx > 0 && isblock (color_grid[gy][gx - 1])) changecolor (gy, gx - 1, random (1, 9));
              if (gx < tiles_x - 1 && isblock (color_grid[gy][gx + 1])) changecolor (gy, gx + 1, random (1, 9));
              if (gy < tiles_y - 1 && isblock (color_grid[gy + 1][gx])) changecolor (gy + 1, gx, random (1, 9));

              // particle_effect[free_particle ()].create (color2sprite (block.list[number_grid[gy][gx]].color), 150,
                                                      // Convert.ToInt16 (block.list[number_grid[gy][gx]].x + (tilesize_x / 2)),
                                                      // Convert.ToInt16 (block.list[number_grid[gy][gx]].y + (tilesize_y / 2)),
                                                      // screen_width, screen_height, 0, 360, 4, 3, -.01, 255, -1, 0);
              // particle_effect[free_particle ()].create (particle_white, 75,
                                                      // Convert.ToInt16 (block.list[number_grid[gy][gx]].x + (tilesize_x / 2)),
                                                      // Convert.ToInt16 (block.list[number_grid[gy][gx]].y + (tilesize_y / 2)),
                                                      // screen_width, screen_height, 0, 360, 3, 3, -.01, 255, -1, 0);
              }
            }
          }
        }
      }
    }

  // uncheck all blocks
  for (var b = 0; b < block.list.length; b += 1) block.list[b].destroy_checked = false;

  // check blocks again by color_grid location for chain destruction
  var block_found = true;
  while (block_found === true)
    {
    block_found = false;
    for (var gy = 0; gy < tiles_y; gy += 1)
      {
      for (var gx = 0; gx < tiles_x; gx += 1)
        {
        if (number_grid[gy][gx] >= 0)
          {
          if (block.list[number_grid[gy][gx]].change === CHANGE_MARKED)
            {
            block_found = true;
            block.list[number_grid[gy][gx]].change = CHANGE_DESTROY;
            block.list[number_grid[gy][gx]].destroy_checked = true;

            if (gx > 0 && number_grid[gy][gx - 1] >= 0
              && block.list[number_grid[gy][gx - 1]].color === block.list[number_grid[gy][gx]].color
              && block.list[number_grid[gy][gx - 1]].change <= 0 && block.list[number_grid[gy][gx - 1]].change >= -1
              && block.list[number_grid[gy][gx - 1]].dir === NONE && block.list[number_grid[gy][gx - 1]].destroy_checked === false)
              {
              block.list[number_grid[gy][gx - 1]].change = CHANGE_MARKED;
              }

            if (gx < tiles_x - 1 && number_grid[gy][gx + 1] >= 0
              && block.list[number_grid[gy][gx + 1]].color === block.list[number_grid[gy][gx]].color
              && block.list[number_grid[gy][gx + 1]].change <= 0 && block.list[number_grid[gy][gx + 1]].change >= -1
              && block.list[number_grid[gy][gx + 1]].dir === NONE && block.list[number_grid[gy][gx + 1]].destroy_checked === false)
              {
              block.list[number_grid[gy][gx + 1]].change = CHANGE_MARKED;
              }

            if (gy > 0 && number_grid[gy - 1][gx] >= 0
              && block.list[number_grid[gy - 1][gx]].color === block.list[number_grid[gy][gx]].color
              && block.list[number_grid[gy - 1][gx]].change <= 0 && block.list[number_grid[gy - 1][gx]].change >= -1
              && block.list[number_grid[gy - 1][gx]].dir === NONE && block.list[number_grid[gy - 1][gx]].destroy_checked === false)
              {
              block.list[number_grid[gy - 1][gx]].change = CHANGE_MARKED;
              }

            if (gy < tiles_y - 1 && number_grid[gy + 1][gx] >= 0
              && block.list[number_grid[gy + 1][gx]].color === block.list[number_grid[gy][gx]].color
              && block.list[number_grid[gy + 1][gx]].change <= 0 && block.list[number_grid[gy + 1][gx]].change >= -1
              && block.list[number_grid[gy + 1][gx]].dir === NONE && block.list[number_grid[gy + 1][gx]].destroy_checked === false)
              {
              block.list[number_grid[gy + 1][gx]].change = CHANGE_MARKED;
              }
            }
          }
        }
      }
    }
  }

////////////////////////////////////////////////////////////////////////////////

function color_flasher (b)
  {
  // color_flash.reset ();
  // color_flash.init (128, 0, 10);
  // if (b.color === R) color_flash_sprite = solid_red;
  // if (b.color === O) color_flash_sprite = solid_orange;
  // if (b.color === Y) color_flash_sprite = solid_yellow;
  // if (b.color === G) color_flash_sprite = solid_green;
  // if (b.color === B) color_flash_sprite = solid_blue;
  // if (b.color === P) color_flash_sprite = solid_purple;
  }

////////////////////////////////////////////////////////////////////////////////

function Block_Animations ()
  {
  for (var b = 0; b < block.list.length; b += 1)
    {
    if (block.list[b].status === 1)
      {
      if (block.list[b].change != 0) block.list[b].count += 1;
      if (block.list[b].change === CHANGE_NONE)
        {
        if (block.list[b].color < M)
          {
          // if (block.list[b].frame === 0 && Math.round (Math.random() * 150) === 0) block.list[b].frame = 1;
          // else if (block.list[b].frame != 0 && Math.round (Math.random() * 15) === 0) block.list[b].frame = 0;

          if (block.list[b].frame === 0 && random (0, 150) === 0) block.list[b].frame = 1;
          else if (block.list[b].frame != 0 && random (0, 15) === 0) block.list[b].frame = 0;
          }

        // metal
        else if (block.list[b].color === M) block.list[b].frame = 0;

        // rainbow
        else if (block.list[b].color === Q)
          {
          // if (Math.round (Math.random() * 10) === 0) block.list[b].frame = Math.round (Math.random() * 5) + 1;
          if (random (0, 10) === 0) block.list[b].frame = random (0, 12);
          block.list[b].glowcount += 1;
          if (block.list[b].glowcount >= block.list[b].glowdelay)
            {
            block.list[b].glowcount = 0;
            block.list[b].colorframe += 1;
            if (block.list[b].colorframe > 23) block.list[b].colorframe = 0;
            }
          }
        }
      else if (block.list[b].change === CHANGE_COLOR1 && block.list[b].count >= block.list[b].delay)
        {
        block.list[b].count = 0;
        if (block.list[b].frame === 0 || block.list[b].frame === 1) block.list[b].frame = 2;
        else if (block.list[b].frame >= 2 && block.list[b].frame <= 4) block.list[b].frame += 1;
        else if (block.list[b].frame === 5) { block.list[b].frame = 1; block.list[b].change = CHANGE_NONE; }
        }
      else if (block.list[b].change === CHANGE_COLOR2 && block.list[b].count >= block.list[b].delay)
        {
        block.list[b].count = 0;
        if (block.list[b].frame === 0 || block.list[b].frame === 1) block.list[b].frame = 6;
        else if (block.list[b].frame >= 6 && block.list[b].frame <= 8) block.list[b].frame += 1;
        else if (block.list[b].frame === 9) { block.list[b].frame = 1; block.list[b].change = CHANGE_NONE; }
        }
      else if (block.list[b].change === CHANGE_DESTROY && block.list[b].count >= block.list[b].delay)
        {
        block.list[b].count = 0;
        if (block.list[b].color < K)
          {
          block.list[b].frame = 1;
          block.list[b].height -= 10;
          if (block.list[b].height <= 0)
            {
            block.list[b].status = 0;
            block.list[b].change = CHANGE_NONE;
            block.list[b].frame = 0;
            block.list[b].dir = NONE;
            block.list[b].goal_block = 0;
            color_grid[block.list[b].gy][block.list[b].gx] = _;
            number_grid[block.list[b].gy][block.list[b].gx] = -1;
            block.list[b].height = tilesize_y;
            }
          }
        else if (block.list[b].color === K)
          {
          if (block.list[b].frame < 5) block.list[b].frame = 5;
          else if (block.list[b].frame < 8) block.list[b].frame += 1;
          else if (block.list[b].frame === 8)
            {
            block.list[b].status = 0;
            block.list[b].change = CHANGE_NONE;
            block.list[b].frame = 0;
            block.list[b].dir = NONE;
            block.list[b].goal_block = -1;
            color_grid[block.list[b].gy][block.list[b].gx] = _;
            number_grid[block.list[b].gy][block.list[b].gx] = -1;
            }
          }
        }
      }
    }
  }

////////////////////////////////////////////////////////////////////////////////

function Timer_Control ()
  {
  current_miliseconds = date.getTime ();

  if (timer.current_miliseconds >= timer.last_miliseconds + 1000)
    {
    timer.seconds -= 1;
    timer.last += 1000;
    }
  }

////////////////////////////////////////////////////////////////////////////////

function Check_Win ()
  {
  if (game_active === true)
    {
    // check if won
    game_won = true;
    for (var b = 0; b < block.list.length; b += 1)
      if (block.list[b].goal_block === 1 && block.list[b].status === 1) game_won = false;

    if (game_won === true)
      {
      game_active = false;
      play_sound ("win");
      //if (option_music === true && MediaPlayer.State === MediaState.Playing) MediaPlayer.Stop ();
      }

    // check if lost
    else
      {
      game_lost = true;
      
      for (var gx = 0; gx < tiles_x; gx += 1)
        {
        if (color_grid[0][gx] === _) game_lost = false;
        }
      
      for (var b = 0; b < block.list.length; b += 1)
        {
        if (block.list[b].dir != NONE || block.list[b].change != 0) game_lost = false;
        }
      
      if (option_timer === true && timer.time <= 0) game_lost = true; // time ran out
      if (game_lost === true)
        {
        if (game_check_lost === false)
          {
          game_check_lost = true;  // force the game to wait one frame for block destruction
          game_lost = false;
          }
        else if (game_check_lost === true)
          {
          game_active = false;
          play_sound ("lose");
          //if (option_music === true && MediaPlayer.State === MediaState.Playing) MediaPlayer.Stop ();
          }
        }
      }
    }
  }

////////////////////////////////////////////////////////////////////////////////

function newblock (color)
  {
  var i = 0;
  while (block.list[i].status === 1)
    {
    i += 1;
    if (i >= block.list.length) break;
    }
  if (i < block.list.length)
    {
    block.list[i].status = 1;
    if (color === Z)
      {
      // if (Math.round (Math.random() * 100) <= 2) block.list[i].color = Q;
      // else if (Math.round (Math.random() * 100) < 11 - option_difficulty) block.list[i].color = K;
      // else if (Math.round (Math.random() * 100) < option_difficulty * 2) block.list[i].color = M;
      // else block.list[i].color = Math.round (Math.random() * 6) + 1;

      if (random (0, 100) <= 2) block.list[i].color = Q;
      else if (random (0, 100) < 11 - option_difficulty) block.list[i].color = K;
      else if (random (0, 100) < option_difficulty * 2) block.list[i].color = M;
      else block.list[i].color = random (1, 6);
      }
    else block.list[i].color = color;
    block.list[i].dir = NONE;
    block.list[i].frame = 0;
    block.list[i].colorframe = 0;
    block.list[i].is_checked = true;
    block.list[i].count = 0;
    block.list[i].delay = 1;
    block.list[i].change = CHANGE_NONE;
    block.list[i].glowcount = 0;
    block.list[i].glowdelay = 4;
    block.list[i].goal_block = 0;
    block.list[i].height = tilesize_y;
    return i;
    }
  else return -1;
  }

////////////////////////////////////////////////////////////////////////////////

function isblock (ch)
  {
  if (ch === R) return true;
  else if (ch === O) return true;
  else if (ch === Y) return true;
  else if (ch === G) return true;
  else if (ch === B) return true;
  else if (ch === P) return true;
  else if (ch === M) return true;
  else if (ch === K) return true;
  else if (ch === Q) return true;
  else return false;
  }

////////////////////////////////////////////////////////////////////////////////

function iscolor (color)
  {
  if (color === R) return true;
  else if (color === O) return true;
  else if (color === Y) return true;
  else if (color === G) return true;
  else if (color === B) return true;
  else if (color === P) return true;
  else return false;
  }

////////////////////////////////////////////////////////////////////////////////

function changecolor (iy, ix, color)
  {
  var i = number_grid[iy][ix];
  if (i >= 0)
    {
    if (color === block.list[i].color + 1 || color === block.list[i].color - 5)
      {
      block.list[i].change = CHANGE_COLOR1;
      block.list[i].frame = 2;
      }
    if (color === block.list[i].color - 1 || color === block.list[i].color + 5)
      {
      block.list[i].change = CHANGE_COLOR2;
      block.list[i].frame = 6;
      }
    color_grid[iy][ix] = color;
    block.list[i].color = color;
    if (block.list[i].frame > 1 || block.list[i].color === M) block.list[i].frame = 0;
    }
  return color;
  }

////////////////////////////////////////////////////////////////////////////////

function color2sprite (c)
  {
  if (c === R) return particle_red;
  else if (c === O) return particle_orange;
  else if (c === Y) return particle_yellow;
  else if (c === G) return particle_green;
  else if (c === B) return particle_blue;
  else if (c === P) return particle_purple;
  //else if (c === M) return particle_grey;
  //else if (c === K) return particle_black;
  else return particle_white;
  }
 
//////////////////////////////////////////////////////////////////////////////
 
// function new_effect (sprite, amount, xorigin, yorigin, screen_w, screen_h, direction, spread,
//   avg_velocity, velocity_range, acceleration, fade, fade_speed, gravity)
//   {
//   var effect = new Particle_Effect ();

//   effect.create (sprite, amount, xorigin, yorigin, screen_w, screen_h, direction, spread,
//     avg_velocity, velocity_range, acceleration, fade, fade_speed, gravity);

//   particle_effect.push (effect);
//   if (particle_effect.length > max_effects) particle_effect.splice (0, 1);
//   }

////////////////////////////////////////////////////////////////////////////////

// function Update_Particles ()  // move around all the active effects
//   {
//   var p = 0;
//   while (p < particle_effect.length)
//     {
//     if (!particle_effect[p].active) particle_effect.splice (p, 1);
//     else
//       {
//       particle_effect[p].update ();
//       p += 1;
//       }
//     }
//   }

////////////////////////////////////////////////////////////////////////////////

// function particle_vertical_highlight (x, y)
//   {
//   new_effect (vertical_highlight_sprite, 1, x, y, screen_width, screen_height, 0, 0, 0, 0, 0, 96, -4, 0);
//   }

////////////////////////////////////////////////////////////////////////////////

// function particle_sunburst (color, x, y)
//   {
//   // particle_effect[free_particle ()].create (color2sprite (color), 100, x, y,
//                                             // screen_width, screen_height, 90, 360, 5, 3, -.01, 255, -3, 0);
//   }

////////////////////////////////////////////////////////////////////////////////

// function particle_firework (color, x, y)
//   {
//   var sprite = color2sprite (color)
//   if (color > 5) sprite = particle_white;
//   new_effect (sprite, 100, x, y, screen_width, screen_height, 90, 360, 4, 3, -.01, 255, -2, .09);
//   }

////////////////////////////////////////////////////////////////////////////////
 
// function particle_smoke (x, y)
//   {
//   // particle_effect[free_particle ()].create (particle_smoke_sprite, 20, x - (particle_smoke_sprite.width / 2),
//                                            // y - (particle_smoke_sprite.height / 2), screen_width, screen_height,
//                                            // 90, 150, .4, .7, 0, 48, -.15, 0);
//   }
 
////////////////////////////////////////////////////////////////////////////////

function move_menu ()
  {
  if (game_active === true)
    {
    menu_new.y = menu_resume.y + 75;
    menu_instruct.y = menu_new.y + 75;
    }
  }

////////////////////////////////////////////////////////////////////////////////

function set_default_options ()
  {
  option_sound = true;
  option_music = true;
  option_difficulty = 2;
  option_difficulty_next = 2;
  option_height = 3;
  option_timer = false;
  option_timer_next = true;
  played_game = false;
  }

////////////////////////////////////////////////////////////////////////////////

function to_radians (degrees)
  {
  return degrees * (Math.PI / 180);
  }

////////////////////////////////////////////////////////////////////////////////

function drop_block ()
  {
  if (grabber.dir === NONE && grabber.block > -1 && color_grid[0][grabber.gx] === _)
    {
    block.list[grabber.block].gx = grabber.gx;
    block.list[grabber.block].gy = 0;//grabber.gy;
    block.list[grabber.block].x = puzzle_x + (block.list[grabber.block].gx * tilesize_x);
    block.list[grabber.block].y = grabber.y + grabber.block_offset_y;
    color_grid[0][block.list[grabber.block].gx] = block.list[grabber.block].color;
    number_grid[0][block.list[grabber.block].gx] = grabber.block;
    block.list[grabber.block].is_checked = false;
    block.list[grabber.block].count = 0;
    block.list[grabber.block].dir = DOWN;
    grabber.block = -1;
    if (next1.block >= 0) grabber.status = 0;
    }
  }

////////////////////////////////////////////////////////////////////////////////

function random (lowest, highest)
  {
  return Math.floor ((Math.random () * (highest - lowest + 1)) + lowest);
  }

////////////////////////////////////////////////////////////////////////////////
