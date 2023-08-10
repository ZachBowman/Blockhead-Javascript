// Blockhead
// Nightmare Games
// Zach Bowman

////////////////////////////////////////////////////////////////////////////////

function big_block_animation ()
  {
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
  var b = random (0, 4);
  if (b === 0) title_bg_sprite = title_yellow;
  else if (b === 1) title_bg_sprite = title_blue;
  else if (b === 2) title_bg_sprite = title_red;
  else if (b === 3) title_bg_sprite = title_orange;
  else title_bg_sprite = title_green;
  }
   
////////////////////////////////////////////////////////////////////////////////
   
function new_game ()  // Start New Game
  {
  game_active = true;
  game_state = tumble_down ? TUMBLE : GAME;
  game_won = false;
  game_lost = false;
  game_check_lost = false;

  // options box
  box.x = screen_x_offset;
  box.y = screen_height - box_sprite.height;
  box_menu.x = box.x + 20;
  box_menu.y = box.y + 40;
  box_newgame.x = box.x + 160;
  box_newgame.y = box.y + 30;
  box_options.x = box.x + 290;
  box_options.y = box.y + 40;
    
  // clear blocks
  block.clear_list ();
   
  // puzzle dimensions
  puzzle_tile_width = 6;
  puzzle_tile_height = 8;
  puzzle_pixel_width = puzzle_tile_width * tile_pixel_width;
  puzzle_pixel_height = puzzle_tile_height * tile_pixel_height;
  puzzle_x = tile_pixel_width / 2;
  puzzle_y = box.y - demolition_sprite.height - puzzle_pixel_height;

  // clear block reference arrays
  number_grid = new_empty_grid (-1);
  color_grid = new_empty_grid (_);

  // generate new puzzle
  if (random_generation)
    {
    if (tumble_down)
      {
      tumble_grid = generate_color_grid();
      //while (options.length > OPTION_HEIGHT && tumble_grid.length > options[OPTION_HEIGHT].value) tumble_grid.shift();
      while (tumble_grid.length > ACTUAL_HEIGHT) tumble_grid.shift();
      tumble_finished = false;
      }
    else color_grid = generate_color_grid();
    }
  else set_manual_color_grid();  // Testing Only
  create_blocks_from_color_grid();
  
  // initialize grabber
  grabber.gx = 3;
  grabber.gy = 0;
  grabber.x = puzzle_x + (grabber.gx * tile_pixel_width) - ((grabber.width - tile_pixel_width) / 2);
  grabber.y = -63;
  grabber.dir = NONE;
  grabber.wantmove = NONE;
  grabber.movespeed = 10;
  grabber.status = 1;
  grabber.block = newblock (Z);
  block.list[grabber.block].x = grabber.x + grabber.block_offset_x;
  block.list[grabber.block].y = grabber.y + grabber.block_offset_y;

  // block frame
  frame_frame = 0;
  frame_count = 0;
  frame_delay = 1.1;
  
  // initialize conveyor
  conveyor.frame = 0;
  conveyor.x1 = puzzle_x + puzzle_pixel_width + 10;
  conveyor.x2 = conveyor.x1 + 66;
  conveyor.y1 = puzzle_y;
  conveyor.y2 = conveyor.y1;
  
  next1.x = conveyor.x1 + 8;
  next2.x = next1.x + tile_pixel_width + 22;
  next3.x = next2.x + tile_pixel_width + 22;
  next1.y = conveyor.y1 - tile_pixel_height + 4;
  next2.y = conveyor.y2 - tile_pixel_height + 4;
  next3.y = conveyor.y2 - tile_pixel_height + 4;
   
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
  block_counter.y = conveyor.y1 + (tile_pixel_height * 1.5);
  
  // color chart
  chart.x = conveyor.x1;// - 9;
  chart.y = puzzle_y + (puzzle_pixel_height / 2) - (chart_sprite.height / 2);
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
  let y = screen_y_offset + 60;

  for (let o = 0; o < options.length; o += 1)
    {
    options[o].y = y;
    y += 80;
    }

  // backgrounds
  var bg = background_index;
  while (bg === background_index) bg = random (0, background.length - 1);
  background_index = bg;
  
  youwin_bounce.bouncepop_init ();
  youlose_bounce.bouncepop_init ();
  
  initialize_timer();
  
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

  //newsong = true;
  music_state = MUSIC_NEW;
  }
   
////////////////////////////////////////////////////////////////////////////////

function generate_color_grid()
  {
  let grid = new_empty_grid (_);

  // create color_grid from scratch
  for (let gy = 0; gy < puzzle_tile_height; gy += 1)
    {
    for (let gx = 0; gx < puzzle_tile_width; gx += 1)
      {
      //if (options.length > OPTION_HEIGHT && gy < puzzle_tile_height - options[OPTION_HEIGHT].value) grid[gy][gx] = _;
      if (gy < puzzle_tile_height - ACTUAL_HEIGHT) grid[gy][gx] = _;
      else grid[gy][gx] = random (1, 6);
      }
    }
  
  // Change randomized blocks to prevent 3 in a row at start.
  let foundthree = true;
  while (foundthree === true)
    {
    foundthree = false;
    for (let gy = 0; gy < puzzle_tile_height; gy += 1)
      {
      for (let gx = 0; gx < puzzle_tile_width; gx += 1)
        {
        // check horizontal
        if (gx > 0 && gx < puzzle_tile_width - 1 && grid[gy][gx] > _
          && grid[gy][gx - 1] === grid[gy][gx]
          && grid[gy][gx + 1] === grid[gy][gx])
          {
          foundthree = true;
          while (grid[gy][gx] === grid[gy][gx - 1]) grid[gy][gx] = random (1, 6);
          }

        // check vertical
        if (gy > 0 && gy < puzzle_tile_height - 1 && grid[gy][gx] > _
          && grid[gy - 1][gx] === grid[gy][gx]
          && grid[gy + 1][gx] === grid[gy][gx])
          {
          foundthree = true;
          while (grid[gy][gx] === grid[gy - 1][gx]) grid[gy][gx] = random (1, 6);
          }
        }
      }
    }

  return grid;
  }

////////////////////////////////////////////////////////////////////////////////

function initialize_timer()
  {
  // initialize timer
  timer.seconds = 0;
  timer.y = screen_y_offset;
  timer.last_miliseconds = date.getTime();
  for (let b = 0; b < block.list.length; b += 1)
    {
    if (block.list[b].goal_block === 1)
      {
      // # of seconds on timer for each goal block
      if (ACTUAL_DIFFICULTY == 1) timer.seconds += 10;
      else if (ACTUAL_DIFFICULTY) timer.seconds += 9;
      else if (ACTUAL_DIFFICULTY) timer.seconds += 8;
      else if (ACTUAL_DIFFICULTY) timer.seconds += 7;
      else if (ACTUAL_DIFFICULTY) timer.seconds += 6;
      else timer.seconds += 5;
      }
    }

  clearInterval(timer_interval);
  timer_interval = setInterval(Timer_Control, 1000);
  }

function new_empty_grid (value)
  {
  let grid = [[]];
  while (grid.length < puzzle_tile_height)
    {
    let row = [];
    while (row.length < puzzle_tile_width) row.push (value);
    grid.push (row);
    }
  return grid;
  }

////////////////////////////////////////////////////////////////////////////////

// Testing only.
function set_manual_color_grid()
  {
  color_grid = [[_,_,_,_,_,_],
                [_,_,_,_,_,_],
                [_,_,_,_,_,_],
                [_,_,_,_,_,_],
                [_,_,_,_,_,_],
                [_,_,_,_,_,_],
                [_,_,_,_,_,_],
                [R,O,Y,G,B,P]];
  }

////////////////////////////////////////////////////////////////////////////////

function create_blocks_from_color_grid()
  {
  goal_blocks = 0;

  // Check number grid and create block if gridspace is empty.
  for (let gy = 0; gy < puzzle_tile_height; gy += 1)
    {
    for (let gx = 0; gx < puzzle_tile_width; gx += 1)
      {
      if (number_grid[gy][gx] == -1 && color_is_valid(color_grid[gy][gx]))
        {
        create_new_block_and_put_on_grid (color_grid[gy][gx], gx, gy);
        }
      }
    }
  }

////////////////////////////////////////////////////////////////////////////////

function create_new_block_and_put_on_grid (color, gx, gy, allow_wild = false)
  {
  let block_index = newblock (color);
  if (!block_index_is_valid (block_index))
    {
    set_grid_space_blank (gx, gy);
    return;
    }

  if (!allow_wild && (block.list[block_index].color === M || block.list[block_index].color === K || block.list[block_index].color === Q))
    {
    block.list[block_index].color = random (1, 6);
    }

  put_block_on_grid(block_index, gx, gy);

  // If the block is in the top row, start it above the container
  //if (gy === 0) block.list[block_index].y = puzzle_y - tile_pixel_height;
  }

////////////////////////////////////////////////////////////////////////////////

function set_grid_space_blank (gx, gy)
  {
  color_grid[gy][gx] = _;
  number_grid[gy][gx] = -1;
  }

////////////////////////////////////////////////////////////////////////////////

function put_block_on_grid (index, gx, gy)
  {
  var b = block.list[index];
  color_grid[gy][gx] = b.color;
  b.gx = gx;
  b.gy = gy;
  b.x = puzzle_x + (b.gx * tile_pixel_width);
  b.y = puzzle_y + (b.gy * tile_pixel_height);
  if (game_state === GAME) b.vertical_velocity = initial_velocity_on_drop;
  else if (game_state === TUMBLE) b.vertical_velocity = gravity_max_tumble;
  b.state = FALLING;
  number_grid[gy][gx] = index;
  b.goal_block = 1;
  goal_blocks += 1;
  }

////////////////////////////////////////////////////////////////////////////////

function block_index_is_valid (index)
  {
  return (index >= 0 && index < block.list.length);
  }

////////////////////////////////////////////////////////////////////////////////

function color_is_valid (color)
  {
  return (color > _ && color <= Z);
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
  if (grabber.dir === NONE && grabber.gx > grabber.destination && grabber.destination != -1
    && color_grid[grabber.gy + 2, grabber.gx - 1] != 'W'
    && grabber.status == 1)
    {
    grabber.gx -= 1;
    grabber.dir = LEFT;
    }
  if (grabber.dir === NONE && grabber.gx < grabber.destination && grabber.destination != -1
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
  if (grabber.dir === LEFT && grabber.block > -1 && grabber.x <= puzzle_x + (grabber.gx * tile_pixel_width) - (grabber.width - tile_pixel_width) / 2)
    {
    grabber.dir = NONE;
    if (grabber.status === 0) grabber.status = 1;
    if (grabber.control_type === KEYBOARD_CONTROL && key_left === true && grabber.gx > 0) grabber.destination = grabber.gx - 1;
    else if (grabber.control_type === CLICK_CONTROL && grabber.gx === grabber.destination) drop_block ();
    }

  // going left without a block
  else if (grabber.dir === LEFT && grabber.block === -1 && next1.block === -1 && grabber.x <= puzzle_x + (grabber.gx * tile_pixel_width) - (grabber.width - tile_pixel_width) / 2)
    {
    grabber.dir = NONE;
    if (grabber.status === 0) grabber.status = 1;
    }

  // going right with a block
  if (grabber.dir === RIGHT && grabber.block > -1 && grabber.x >= puzzle_x + (grabber.gx * tile_pixel_width) - (grabber.width - tile_pixel_width) / 2)
    {
    grabber.dir = NONE;
    if (grabber.status === 0) grabber.status = 1;
    if (grabber.control_type === KEYBOARD_CONTROL && key_right === true && grabber.gx < 5) grabber.destination = grabber.gx + 1;
    else if (grabber.control_type === CLICK_CONTROL && grabber.gx === grabber.destination) drop_block ();
    }

  // going right without a block
  else if (grabber.dir === RIGHT && grabber.block === -1 && next1.block === -1 && grabber.x >= puzzle_x + (grabber.gx * tile_pixel_width) - (grabber.width - tile_pixel_width) / 2)
    {
    grabber.dir = NONE;
    if (grabber.status === 0) grabber.status = 1;
    }

  if (grabber.y < puzzle_y - tile_pixel_height - 90) grabber.y += 2;//+ (grabber.gy * tile_pixel_height) - 90) grabber.y += 2;
  if (grabber.block > -1)
    {
    block.list[grabber.block].x = grabber.x + grabber.block_offset_x;
    block.list[grabber.block].y = grabber.y + grabber.block_offset_y;
    }
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

function Update_Goal_Frame_Pulse()  // pulsing white box for goal blocks
  {
  if (isNaN(pulse_fade)) pulse_fade = 0.0;

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

function Update_Loading_Text()
  {
  click_here_counter += 1;
  if (click_here_counter >= click_here_delay)
    {
    click_here_counter = 0;
    if (click_here_onoff === true) click_here_onoff = false;
    else click_here_onoff = true;
    }
  }

////////////////////////////////////////////////////////////////////////////////

function Conveyor_Control()
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

function Tumble_Control()
  {
  // TODO:
  // - make it smarter by tracking finished columns
  // - make the timing less random if need be

  // randomness to create a delay between blocks
  if (random (0, 3) === 0)
    {
    // try fairly hard to find a column with blocks left
    let x = random (0, puzzle_tile_width - 1);
    let column_retry = 0;
    while (tumble_grid[0][x] === _ && column_retry < 6)
      {
      x = random (0, puzzle_tile_width - 1);
      column_retry += 1;
      }
    let y = tumble_grid.length - 1;

    let endloop = false;
    while (!endloop)
      {
      if (tumble_grid[y][x] != _)
        {
        create_new_block_and_put_on_grid (tumble_grid[y][x], x, 0);
        endloop = true;
        tumble_grid[y][x] = _;
        }
      y -= 1;
      if (y < 0) endloop = true;
      }
    }
  }

////////////////////////////////////////////////////////////////////////////////

function Check_Tumble_Finished()
  {
  let tumble_finished = true;

  for (x = 0; x < tumble_grid[0].length; x += 1)
    {
    if (tumble_grid[0][x] != _) tumble_finished = false;
    }

  for (let index = 0; index < block.list.length; index += 1)
    {
    if (block_is_falling(block.list[index])) tumble_finished = false;
    else if (should_start_falling(index)) tumble_finished = false;
    }

  if (tumble_finished)
    {
    game_state = GAME;
    initialize_timer();
    }
  }

////////////////////////////////////////////////////////////////////////////////

function Falling_Blocks()
  {
  // Check every block
  for (let index = 0; index < block.list.length; index += 1)
    {
    // Cases:
    // - not falling and shouldn't
    // - not falling but should
    // - falling and should keep going
    // - falling but should stop

    // CURRENT ISSUE:
    // color grid problem.  falling blocks fill up the grid, don't place _ behind them and then new blocks can't fall.

    // Skip blocks that aren't in the puzzle yet
    if (index === grabber.block || index === next1.block || index === next2.block || index === next3.block) continue;

    var b = block.list[index];

    // Starts falling
    if (should_start_falling(index))
      {
      if (game_state === GAME) b.vertical_velocity = initial_velocity_on_drop;
      else if (game_state === TUMBLE) b.vertical_velocity = gravity_max_tumble;
      b.state = FALLING;
      color_grid[b.gy][b.gx] = _;
      number_grid[b.gy][b.gx] = -1;
      b.gy += 1;
      color_grid[b.gy][b.gx] = b.color;
      }

    // Already falling
    if (b.alive === true && block_is_falling(b))
      {
      b.vertical_velocity += gravity_acceleration;
      b.y += Math.round(b.vertical_velocity);

      // Entering a new grid space.  Check if we need to stop falling.
      if (b.y >= puzzle_y + (b.gy * tile_pixel_height))
        {
        color_grid[b.gy][b.gx] = b.color;
        number_grid[b.gy][b.gx] = index;

        // Don't check for color change on blocks that fell during tumble mode
        if (game_state === GAME) b.is_checked = false;
        else if (game_state === TUMBLE) b.is_checked = true;

        // Stops falling
        if (!should_keep_falling(index))
          {
          b.vertical_velocity = 0;
          b.y = puzzle_y + (b.gy * tile_pixel_height);
          b.state = CHANGE_NONE;
          play_sound ("hit");

          // Bounce on landing
          // TODO: need new block states for FALLING and BOUNCE to get this working or else infinite bouncing and stuck on tumble.
          //b.vertical_velocity = -1;  // This feels good.  Also try -2 just to see.
          }

        // Keeps falling
        else
          {
          color_grid[b.gy][b.gx] = _;
          number_grid[b.gy][b.gx] = -1;
          b.gy += 1;
          color_grid[b.gy][b.gx] = b.color;
          }
        }
      }

    block.list[index] = b;
    }
  }

////////////////////////////////////////////////////////////////////////////////

function should_start_falling (block_index)
  {
  let b = block.list[block_index];

  if (block_index === grabber.block) return false;
  if (block_index === next1.block) return false;
  if (block_index === next2.block) return false;
  if (block_index === next3.block) return false;

  if (b.state != CHANGE_NONE) return false;
  if (b.alive === false) return false;
  if (block_is_falling(b)) return false;
  if (b.gy >= puzzle_tile_height - 1) return false;
  if (color_grid[b.gy + 1][b.gx] != _) return false;

  return true;
  }

////////////////////////////////////////////////////////////////////////////////

function should_keep_falling (block_index)
  {
  let b = block.list[block_index];

  //if (b.alive === false) return false;
  if (b.gy >= puzzle_tile_height - 1) return false;
  if (color_grid[b.gy + 1][b.gx] != _) return false;

  return true;
  }

////////////////////////////////////////////////////////////////////////////////

function Color_Change ()
  {
  for (var b = 0; b < block.list.length; b += 1)
    {
    var gy = block.list[b].gy;
    var gx = block.list[b].gx;
    if (block.list[b].alive === true)
      {
      if (block.list[b].is_checked === false && !block_is_falling (block.list[b]))
        {
        block.list[b].is_checked = true;
        if (block.list[b].color === R)
          {
          if (gy < puzzle_tile_height - 1 && color_grid[gy + 1][gx] === B) changecolor (gy + 1, gx, P);
          if (gy < puzzle_tile_height - 1 && color_grid[gy + 1][gx] === Y) changecolor (gy + 1, gx, O);
          if (gx > 0           && color_grid[gy][gx - 1] === B) changecolor (gy, gx - 1, P);
          if (gx > 0           && color_grid[gy][gx - 1] === Y) changecolor (gy, gx - 1, O);
          if (gx < puzzle_tile_width - 1 && color_grid[gy][gx + 1] === B) changecolor (gy, gx + 1, P);
          if (gx < puzzle_tile_width - 1 && color_grid[gy][gx + 1] === Y) changecolor (gy, gx + 1, O);
          }
        else if (block.list[b].color === O)
          {
          if (gy < puzzle_tile_height - 1 && color_grid[gy + 1][gx] === P) changecolor (gy + 1, gx, R);
          if (gy < puzzle_tile_height - 1 && color_grid[gy + 1][gx] === G) changecolor (gy + 1, gx, Y);
          if (gx > 0           && color_grid[gy][gx - 1] === P) changecolor (gy, gx - 1, R);
          if (gx > 0           && color_grid[gy][gx - 1] === G) changecolor (gy, gx - 1, Y);
          if (gx < puzzle_tile_width - 1 && color_grid[gy][gx + 1] === P) changecolor (gy, gx + 1, R);
          if (gx < puzzle_tile_width - 1 && color_grid[gy][gx + 1] === G) changecolor (gy, gx + 1, Y);
          }
        else if (block.list[b].color === Y)
          {
          if (gy < puzzle_tile_height - 1 && color_grid[gy + 1][gx] === R) changecolor (gy + 1, gx, O);
          if (gy < puzzle_tile_height - 1 && color_grid[gy + 1][gx] === B) changecolor (gy + 1, gx, G);
          if (gx > 0           && color_grid[gy][gx - 1] === R) changecolor (gy, gx - 1, O);
          if (gx > 0           && color_grid[gy][gx - 1] === B) changecolor (gy, gx - 1, G);
          if (gx < puzzle_tile_width - 1 && color_grid[gy][gx + 1] === R) changecolor (gy, gx + 1, O);
          if (gx < puzzle_tile_width - 1 && color_grid[gy][gx + 1] === B) changecolor (gy, gx + 1, G);
          }
        else if (block.list[b].color === G)
          {
          if (gy < puzzle_tile_height - 1 && color_grid[gy + 1][gx] === O) changecolor (gy + 1, gx, Y);
          if (gy < puzzle_tile_height - 1 && color_grid[gy + 1][gx] === P) changecolor (gy + 1, gx, B);
          if (gx > 0           && color_grid[gy][gx - 1] === O) changecolor (gy, gx - 1, Y);
          if (gx > 0           && color_grid[gy][gx - 1] === P) changecolor (gy, gx - 1, B);
          if (gx < puzzle_tile_width - 1 && color_grid[gy][gx + 1] === O) changecolor (gy, gx + 1, Y);
          if (gx < puzzle_tile_width - 1 && color_grid[gy][gx + 1] === P) changecolor (gy, gx + 1, B);
          }
        else if (block.list[b].color === B)
          {
          if (gy < puzzle_tile_height - 1 && color_grid[gy + 1][gx] === Y) changecolor (gy + 1, gx, G);
          if (gy < puzzle_tile_height - 1 && color_grid[gy + 1][gx] === R) changecolor (gy + 1, gx, P);
          if (gx > 0           && color_grid[gy][gx - 1] === Y) changecolor (gy, gx - 1, G);
          if (gx > 0           && color_grid[gy][gx - 1] === R) changecolor (gy, gx - 1, P);
          if (gx < puzzle_tile_width - 1 && color_grid[gy][gx + 1] === Y) changecolor (gy, gx + 1, G);
          if (gx < puzzle_tile_width - 1 && color_grid[gy][gx + 1] === R) changecolor (gy, gx + 1, P);
          }
        else if (block.list[b].color === P)
          {
          if (gy < puzzle_tile_height - 1 && color_grid[gy + 1][gx] === G) changecolor (gy + 1, gx, B);
          if (gy < puzzle_tile_height - 1 && color_grid[gy + 1][gx] === O) changecolor (gy + 1, gx, R);
          if (gx > 0           && color_grid[gy][gx - 1] === G) changecolor (gy, gx - 1, B);
          if (gx > 0           && color_grid[gy][gx - 1] === O) changecolor (gy, gx - 1, R);
          if (gx < puzzle_tile_width - 1 && color_grid[gy][gx + 1] === G) changecolor (gy, gx + 1, B);
          if (gx < puzzle_tile_width - 1 && color_grid[gy][gx + 1] === O) changecolor (gy, gx + 1, R);
          }block
        }
      }
    }
  }

////////////////////////////////////////////////////////////////////////////////

function Destroy_Blocks ()
  {
  for (var gy = 0; gy < puzzle_tile_height; gy += 1)
    {
    for (var gx = 0; gx < puzzle_tile_width; gx += 1)
      {
      // horizontal match
      if (gx > 0 && gx < puzzle_tile_width - 1 && number_grid[gy][gx] >= 0 && number_grid[gy][gx - 1] >= 0 && number_grid[gy][gx + 1] >= 0)
        {
        if (char_is_color (color_grid[gy][gx])
        && color_grid[gy][gx - 1] === color_grid[gy][gx]
        && color_grid[gy][gx + 1] === color_grid[gy][gx]
        && block_is_ready(block.list[number_grid[gy][gx]])
        && block_is_ready(block.list[number_grid[gy][gx - 1]])
        && block_is_ready(block.list[number_grid[gy][gx + 1]]))
          {
          block.list[number_grid[gy][gx - 1]].state = BLOCK_MARKED;
          block.list[number_grid[gy][gx]].state = BLOCK_MARKED;
          block.list[number_grid[gy][gx + 1]].state = BLOCK_MARKED;
          play_sound ("destroy");
          //color_flasher (block.list[number_grid[gy][gx]]);
          }
        }
      // vertical match
      if (gy > 0 && gy < puzzle_tile_height - 1 && number_grid[gy][gx] >= 0 && number_grid[gy - 1][gx] >= 0 && number_grid[gy + 1][gx] >= 0)
        {
        if (char_is_color (color_grid[gy][gx])
        && color_grid[gy - 1][gx] === color_grid[gy][gx]
        && color_grid[gy + 1][gx] === color_grid[gy][gx]
        && block_is_ready(block.list[number_grid[gy][gx]])
        && block_is_ready(block.list[number_grid[gy - 1][gx]])
        && block_is_ready(block.list[number_grid[gy + 1][gx]]))
          {
          block.list[number_grid[gy - 1][gx]].state = BLOCK_MARKED;
          block.list[number_grid[gy][gx]].state = BLOCK_MARKED;
          block.list[number_grid[gy + 1][gx]].state = BLOCK_MARKED;
          play_sound ("destroy");
          //color_flasher (block.list[number_grid[gy][gx]]);
          }
        }
      //if (number_grid[gy][gx] >= 0)
      if (block_exists_at_location (gy, gx))
        {
        // black block
        if (color_grid[gy][gx] === K && block_is_ready(block.list[number_grid[gy][gx]]))
          {
          block.list[number_grid[gy][gx]].state = BLOCK_DESTROY;

          particle_smoke (block.list[number_grid[gy][gx]].x + (tile_pixel_width / 2), block.list[number_grid[gy][gx]].y + (tile_pixel_height / 2));

          // left
          if (block_exists_at_location (gy, gx - 1) && block_is_ready_for_destruction(block.list[number_grid[gy][gx - 1]]))
            {
            block.list[number_grid[gy][gx - 1]].state = BLOCK_DESTROY;
            }

          // right
          if (block_exists_at_location (gy, gx + 1) && block_is_ready_for_destruction(block.list[number_grid[gy][gx + 1]]))
            {
            block.list[number_grid[gy][gx + 1]].state = BLOCK_DESTROY;
            }

          // below
          if (block_exists_at_location (gy + 1, gx) && block_is_ready_for_destruction(block.list[number_grid[gy + 1][gx]]))
            {
            block.list[number_grid[gy + 1][gx]].state = BLOCK_DESTROY;
            }

          // above (only happens if a ranbow block turns the one below it black).
          if (block_exists_at_location (gy - 1, gx) && block_is_ready_for_destruction(block.list[number_grid[gy - 1][gx]]))
            {
            block.list[number_grid[gy - 1][gx]].state = BLOCK_DESTROY;
            }

          // play_sound ("destroy");
          }

        // rainbow block random effects
        else if (color_grid[gy][gx] === Q)
          {
          if (!block_is_falling(block.list[number_grid[gy][gx]]))
            {
            if (block.list[number_grid[gy][gx]].state === CHANGE_NONE)
              {
              // random color
              block.list[number_grid[gy][gx]].color = changecolor (gy, gx, random (1, 8));
              if (gx > 0 && char_is_block (color_grid[gy][gx - 1])) changecolor (gy, gx - 1, random (1, 9));
              if (gx < puzzle_tile_width - 1 && char_is_block (color_grid[gy][gx + 1])) changecolor (gy, gx + 1, random (1, 9));
              if (gy < puzzle_tile_height - 1 && char_is_block (color_grid[gy + 1][gx])) changecolor (gy + 1, gx, random (1, 9));

              particle_starburst (block.list[number_grid[gy][gx]].color, 150, 
                block.list[number_grid[gy][gx]].x + (tile_pixel_width / 2), block.list[number_grid[gy][gx]].y + (tile_pixel_height / 2));

              particle_starburst (M, 30,
                block.list[number_grid[gy][gx]].x + (tile_pixel_width / 2), block.list[number_grid[gy][gx]].y + (tile_pixel_height / 2));
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
    for (var gy = 0; gy < puzzle_tile_height; gy += 1)
      {
      for (var gx = 0; gx < puzzle_tile_width; gx += 1)
        {
        if (number_grid[gy][gx] >= 0)
          {
          if (block.list[number_grid[gy][gx]].state === BLOCK_MARKED)
            {
            block_found = true;
            block.list[number_grid[gy][gx]].state = BLOCK_DESTROY;
            block.list[number_grid[gy][gx]].destroy_checked = true;

            if (block_exists_at_location (gy, gx - 1)
              && block.list[number_grid[gy][gx - 1]].color === block.list[number_grid[gy][gx]].color
              && block.list[number_grid[gy][gx - 1]].state <= CHANGE_NONE
              && block.list[number_grid[gy][gx - 1]].state >= BLOCK_MARKED
              && !block_is_falling (block.list[number_grid[gy][gx - 1]])
              && block.list[number_grid[gy][gx - 1]].destroy_checked === false)
              {
              block.list[number_grid[gy][gx - 1]].state = BLOCK_MARKED;
              }

            if (block_exists_at_location (gy, gx + 1)
              && block.list[number_grid[gy][gx + 1]].color === block.list[number_grid[gy][gx]].color
              && block.list[number_grid[gy][gx + 1]].state <= CHANGE_NONE
              && block.list[number_grid[gy][gx + 1]].state >= BLOCK_MARKED
              && !block_is_falling (block.list[number_grid[gy][gx + 1]])
              && block.list[number_grid[gy][gx + 1]].destroy_checked === false)
              {
              block.list[number_grid[gy][gx + 1]].state = BLOCK_MARKED;
              }

            if (block_exists_at_location (gy - 1, gx)
              && block.list[number_grid[gy - 1][gx]].color === block.list[number_grid[gy][gx]].color
              && block.list[number_grid[gy - 1][gx]].state <= CHANGE_NONE
              && block.list[number_grid[gy - 1][gx]].state >= BLOCK_MARKED
              && !block_is_falling (block.list[number_grid[gy - 1][gx]])
              && block.list[number_grid[gy - 1][gx]].destroy_checked === false)
              {
              block.list[number_grid[gy - 1][gx]].state = BLOCK_MARKED;
              }

            if (block_exists_at_location (gy + 1, gx)
              && block.list[number_grid[gy + 1][gx]].color === block.list[number_grid[gy][gx]].color
              && block.list[number_grid[gy + 1][gx]].state <= CHANGE_NONE
              && block.list[number_grid[gy + 1][gx]].state >= BLOCK_MARKED
              && !block_is_falling (block.list[number_grid[gy + 1][gx]])
              && block.list[number_grid[gy + 1][gx]].destroy_checked === false)
              {
              block.list[number_grid[gy + 1][gx]].state = BLOCK_MARKED;
              }
            }
          }
        }
      }
    }
  }

////////////////////////////////////////////////////////////////////////////////

// returns true if block is in a state that lets it be destroyed or color changed (not falling or changing).
function block_is_ready (block)
  {
  return !block_is_falling (block) && block.state === CHANGE_NONE;
  }

////////////////////////////////////////////////////////////////////////////////

// returns true if block is in any state that lets it be destroyed.
function block_is_ready_for_destruction (block)
  {
  return !block_is_falling (block) && block.state <= CHANGE_NONE;
  }

////////////////////////////////////////////////////////////////////////////////

// returns true if block is falling
function block_is_falling (block)
  {
  //return block.vertical_velocity > 0 || block.state === FALLING;
  return block.state === FALLING;
  }

////////////////////////////////////////////////////////////////////////////////

function block_exists_at_location (gy, gx)
  {
  if (gx < 0) return false;
  if (gx >= puzzle_tile_width) return false;
  if (gy < 0) return false;
  if (gy >= puzzle_tile_height) return false;
  if (number_grid[gy][gx] < 0) return false;
  return true;
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
    if (block.list[b].alive === true)
      {
      if (block.list[b].state != CHANGE_NONE) block.list[b].count += 1;
      if (block.list[b].state === CHANGE_NONE)
        {
        // regular idles
        if (block.list[b].color < M)
          {
          if (block.list[b].frame === 0 && random (0, 150) === 0) block.list[b].frame = 1;
          else if (block.list[b].frame != 0 && random (0, 15) === 0) block.list[b].frame = 0;
          }

        // metal
        else if (block.list[b].color === M) block.list[b].frame = 0;

        // black
        else if (block.list[b].color === K)
          {
          block.list[b].frame = 0;
          }

        // rainbow
        else if (block.list[b].color === Q)
          {
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
      else if (block.list[b].state === CHANGE_COLOR1 && block.list[b].count >= block.list[b].delay)
        {
        block.list[b].count = 0;
        if (block.list[b].frame === 0 || block.list[b].frame === 1) block.list[b].frame = 2;
        else if (block.list[b].frame >= 2 && block.list[b].frame <= 4) block.list[b].frame += 1;
        else if (block.list[b].frame === 5) { block.list[b].frame = 1; block.list[b].state = CHANGE_NONE; }
        }
      else if (block.list[b].state === CHANGE_COLOR2 && block.list[b].count >= block.list[b].delay)
        {
        block.list[b].count = 0;
        if (block.list[b].frame === 0 || block.list[b].frame === 1) block.list[b].frame = 6;
        else if (block.list[b].frame >= 6 && block.list[b].frame <= 8) block.list[b].frame += 1;
        else if (block.list[b].frame === 9) { block.list[b].frame = 1; block.list[b].state = CHANGE_NONE; }
        }
      else if (block.list[b].state === BLOCK_DESTROY && block.list[b].count >= block.list[b].delay)
        {
        block.list[b].count = 0;

        // destroy colored blocks
        if (block.list[b].color < K)
          {
          block.list[b].frame = 1;
          block.list[b].height -= 10;
          if (block.list[b].height <= 0)
            {
            block.list[b].alive = false;
            block.list[b].state = CHANGE_NONE;
            block.list[b].frame = 0;
            block.list[b].vertical_velocity = 0;
            block.list[b].goal_block = 0;
            color_grid[block.list[b].gy][block.list[b].gx] = _;
            number_grid[block.list[b].gy][block.list[b].gx] = -1;
            block.list[b].height = tile_pixel_height;
            }
          }

        // destroy black blocks
        else if (block.list[b].color === K)
          {
          if (block.list[b].frame < 5) block.list[b].frame = 5;
          else if (block.list[b].frame < 8) block.list[b].frame += 1;
          else if (block.list[b].frame === 8)
            {
            block.list[b].alive = false;
            block.list[b].state = CHANGE_NONE;
            block.list[b].frame = 0;
            block.list[b].vertical_velocity = 0;
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

function Timer_Control()
  {
  if (game_state != GAME) return;
  if (!game_active) return;
  //if (!options[OPTION_TIMER].value) return;
  if (!ACTUAL_TIMER) return;
  if (display_options) return;

  timer.seconds -= 1;
  }

////////////////////////////////////////////////////////////////////////////////

function Check_Win()
  {
  if (game_active === true)
    {
    // check if won
    game_won = true;
    for (var b = 0; b < block.list.length; b += 1)
      if (block.list[b].goal_block === 1 && block.list[b].alive === true) game_won = false;

    if (game_won === true)
      {
      game_active = false;
      play_sound ("win");
      fade_target = 0.5;
      }

    // check if lost
    else
      {
      game_lost = true;
      
      for (var gx = 0; gx < puzzle_tile_width; gx += 1)
        {
        if (color_grid[0][gx] === _) game_lost = false;
        }
      
      for (var b = 0; b < block.list.length; b += 1)
        {
        if (block_is_falling (block.list[b]) || block.list[b].state != CHANGE_NONE) game_lost = false;
        }
      
      if (ACTUAL_TIMER === true && timer.seconds <= 0) game_lost = true; // time ran out

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
          fade_target = 0.5;
          }
        }
      }
    }
  }

////////////////////////////////////////////////////////////////////////////////

// TODO: Separate creating a new block and finding an empty slot into 2 different methods.

// Creates a new block in the first empty array slot and returns the index of the new block.
function newblock (color)
  {
  if (!color_is_valid (color)) return -1;

  let i = 0;
  while (block.list[i].alive === true)
    {
    i += 1;
    if (i >= block.list.length) break;
    }
  if (i < block.list.length)
    {
    block.list[i].alive = true;
    if (color === Z)
      {
      if (random (0, 100) <= 2) block.list[i].color = Q;
      else if (random (0, 100) < 11 - ACTUAL_DIFFICULTY) block.list[i].color = K;
      else if (random (0, 100) < ACTUAL_DIFFICULTY * 2) block.list[i].color = M;
      else block.list[i].color = random (1, 6);
      }
    else block.list[i].color = color;
    block.list[i].vertical_velocity = 0;
    block.list[i].frame = 0;
    block.list[i].colorframe = 0;
    block.list[i].is_checked = true;
    block.list[i].count = 0;
    block.list[i].delay = 1;
    block.list[i].state = CHANGE_NONE;
    block.list[i].glowcount = 0;
    block.list[i].glowdelay = 4;
    block.list[i].goal_block = 0;
    block.list[i].height = tile_pixel_height;
    return i;
    }
  else return -1;
  }

////////////////////////////////////////////////////////////////////////////////

function char_is_block (ch)
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

function char_is_color (color)
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
      block.list[i].state = CHANGE_COLOR1;
      block.list[i].frame = 2;
      }
    if (color === block.list[i].color - 1 || color === block.list[i].color + 5)
      {
      block.list[i].state = CHANGE_COLOR2;
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
  else return particle_white;
  }
 
////////////////////////////////////////////////////////////////////////////////

function Update_Particles()
  {
  let p = 0;
  while (p < particle_effect.length)
     {
     if (!particle_effect[p].active) particle_effect.splice (p, 1);
     else
       {
       particle_effect[p].update ();
       p += 1;
       }
     }
  }

////////////////////////////////////////////////////////////////////////////////

function particle_vertical_highlight (x, y)
  {
  new_effect (vertical_highlight_sprite, 1, x, y, screen_width, screen_height, 0, 0, 0, 0, 0, 64, -3, 0);
  }

////////////////////////////////////////////////////////////////////////////////

function particle_starburst (color, amount, x, y)
  {
  let sprite = color2sprite (color)
  if (color > 5) sprite = particle_white;
  new_effect (color2sprite (color), amount, x, y, screen_width, screen_height, 90, 360, 4, 3, -.01, 255, -5, 0);
  }

////////////////////////////////////////////////////////////////////////////////

function particle_firework (color, x, y)
  {
  let sprite = color2sprite (color)
  if (color > 5) sprite = particle_white;
  new_effect (sprite, 100, x, y, screen_width, screen_height, 90, 360, 4, 3, -.01, 255, -2, .09);
  }

////////////////////////////////////////////////////////////////////////////////
 
function particle_smoke (x, y)
  {
  new_effect(particle_smoke_sprite, 20, x - (particle_smoke_sprite.width / 2), y - (particle_smoke_sprite.height / 2),
    screen_width, screen_height, 90, 150, .4, .7, 0, 48, -.15, 0);
  }
 
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
  // if (options.length > OPTION_SOUND) options[OPTION_SOUND].value = DEFAULT_SOUND;
  // if (options.length > OPTION_MUSIC) options[OPTION_MUSIC].value = DEFAULT_MUSIC;
  // if (options.length > OPTION_DIFFICULTY) options[OPTION_DIFFICULTY].value = DEFAULT_DIFFICULTY;
  // if (options.length > OPTION_HEIGHT) options[OPTION_HEIGHT].value = DEFAULT_HEIGHT;
  // if (options.length > OPTION_TIMER) options[OPTION_TIMER].value = DEFAULT_TIMER;

  ACTUAL_SOUND = DEFAULT_SOUND;
  ACTUAL_MUSIC = DEFAULT_MUSIC;
  ACTUAL_DIFFICULTY = DEFAULT_DIFFICULTY;
  ACTUAL_HEIGHT = DEFAULT_HEIGHT;
  ACTUAL_TIMER = DEFAULT_TIMER;

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
    block.list[grabber.block].x = puzzle_x + (block.list[grabber.block].gx * tile_pixel_width);
    block.list[grabber.block].y = grabber.y + grabber.block_offset_y;
    color_grid[0][block.list[grabber.block].gx] = block.list[grabber.block].color;
    number_grid[0][block.list[grabber.block].gx] = grabber.block;
    block.list[grabber.block].is_checked = false;
    block.list[grabber.block].count = 0;
    if (game_state === GAME) block.list[grabber.block].vertical_velocity = initial_velocity_on_drop;
    else if (game_state === TUMBLE) block.list[grabber.block].vertical_velocity = gravity_max_tumble;
    block.list[grabber.block].state = FALLING;
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

function get_screen_horizontal_center()
  {
  return screen_x_offset + (screen_width / 2)
  }

////////////////////////////////////////////////////////////////////////////////

function get_screen_vertical_center()
  {
  return screen_y_offset + (screen_height / 2)
  }

////////////////////////////////////////////////////////////////////////////////

function Update_Options()
  {
  for (let o = 0; o < options.length; o += 1)
    {
    if (options[o].sprites_loaded < 2) options[o].update_if_sprites_loaded();
    }

  if (options.length > OPTION_SOUND && ACTUAL_SOUND != options[OPTION_SOUND].value) ACTUAL_SOUND = options[OPTION_SOUND].value;
  if (options.length > OPTION_MUSIC && ACTUAL_MUSIC != options[OPTION_MUSIC].value) ACTUAL_MUSIC = options[OPTION_MUSIC].value;
  if (options.length > OPTION_DIFFICULTY && ACTUAL_DIFFICULTY != options[OPTION_DIFFICULTY].value) ACTUAL_DIFFICULTY = options[OPTION_DIFFICULTY].value;
  if (options.length > OPTION_HEIGHT && ACTUAL_HEIGHT != options[OPTION_HEIGHT].value) ACTUAL_HEIGHT = options[OPTION_HEIGHT].value;
  if (options.length > OPTION_TIMER && ACTUAL_TIMER != options[OPTION_TIMER].value) ACTUAL_TIMER = options[OPTION_TIMER].value;
  }

////////////////////////////////////////////////////////////////////////////////

function toggle_options() {display_options = !display_options;}

////////////////////////////////////////////////////////////////////////////////

function toggle_music()
  {
  if (options.length <= OPTION_MUSIC) return;

  options[OPTION_MUSIC].cycle_value();
  music_state = options[OPTION_MUSIC].value ? MUSIC_LOADING : MUSIC_OFF;
  // if (options[OPTION_MUSIC].value == true)
  //   {
  //   options[OPTION_MUSIC].value = false;
  //   music_state = MUSIC_OFF;
  //   }
  // else
  //   {
  //   //options[OPTION_MUSIC].value = true;
  //   if (game_won == true || game_lost == true) music_state = MUSIC_STOPPED;
  //   else music_state = MUSIC_LOADING;
  //   }
  }
  