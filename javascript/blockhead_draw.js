// Blockhead
// Nightmare Games
// Zach Bowman

////////////////////////////////////////////////////////////////////////////////

function draw_quick_menu_box()
  {
  box_sprite.draw (canvas_2d, box.x, box.y);
  if (display_options === false)
    {
    box_newgame_sprite.draw (canvas_2d, box_newgame.x, box_newgame.y);
    box_options_sprite.draw (canvas_2d, box_options.x, box_options.y);
    box_menu_sprite.draw (canvas_2d, box_menu.x, box_menu.y);
    }
  }

////////////////////////////////////////////////////////////////////////////////

function draw_options_screen()
  {
  solid_black.draw (canvas_2d, 0, 0, 0.7);

  for (let o = 0; o < options.length; o += 1)
    {
    options[o].draw (canvas_2d);
    }
  }

////////////////////////////////////////////////////////////////////////////////

function draw_background()
  {
  background[background_index].draw (canvas_2d, screen_x_offset, screen_y_offset);
  }

////////////////////////////////////////////////////////////////////////////////

function draw_block_counter()
  {
  block_counter.x = 0;
  block_counter.y = 0;
  let x = block_counter.x;
  let y = block_counter.y;
 
  // Convert the integer to a list of digits
  let counter_array = integer_to_list(goal_blocks);

  //t = "" + goal_blocks;
  //if (t.length < 2) x += counter_0_sprite.width / 2;
  if (counter_array.length < 2) x += counter_number_purple_sprites[0].width / 2;

  // Draw each digit
  for (let d = 0; d < counter_array.length; d += 1)
    {
    counter_number_purple_sprites[counter_array[d]].draw (canvas_2d, x, y);
    counter_number_white_sprites[counter_array[d]].draw (canvas_2d, x, y, pulse_fade);
    x += counter_number_purple_sprites[d].width;
    }

  x = block_counter.x;
  y = block_counter.y + 40;
  counter_label.draw (canvas_2d, x, y, 1.0);
  }

////////////////////////////////////////////////////////////////////////////////

function draw_timer()
  {
  if (ACTUAL_TIMER === true)
    {
    // Convert the integer to a list of digits
    let time_array = integer_to_list(timer.seconds);

    // Determine where the x drawing should start based on the number of digits
    timer.x = get_screen_horizontal_center() - ((timer_number_sprites[0].width * time_array.length) / 2);

    // Draw each digit
    for (let d = 0; d < time_array.length; d += 1)
      {
      timer_number_sprites[time_array[d]].draw (canvas_2d, timer.x, timer.y);
      timer.x += timer_number_sprites[0].width;
      }
    }
  }

////////////////////////////////////////////////////////////////////////////////

function integer_to_list (integer)
  {
  let found_non_zero = false;
  let list = [];
  let multiplier = 100;

  while (multiplier >= 1)
    {
    let digit = 0;

    while (integer >= multiplier)
      {
      integer -= multiplier;
      digit += 1;
      }
    if (digit > 0 || found_non_zero)
      {
      list.push(digit);
      found_non_zero = true;
      }
    multiplier /= 10;
    }

  if (list.length === 0) list.push(0);

  return list;
  }

////////////////////////////////////////////////////////////////////////////////

function draw_blocks()
  {
  let r = new Rectangle ();
  let r2 = new Rectangle ();

  r.width = tile_pixel_width;
  r2.width = tile_pixel_width;
  r2.height = tile_pixel_height;
  for (b = 0; b < block.list.length; b += 1)
    {
    if (block.list[b].alive === true)
      {
      r.x = block.list[b].x;
      r.y = block.list[b].y + tile_pixel_height - block.list[b].height;
      r.height = block.list[b].height;

      // goal frame
      if (game_state != TUMBLE && block.list[b].goal_block === 1 && block.list[b].state > -1)
        {
        frame_sprite.draw (canvas_2d, block.list[b].x, block.list[b].y, pulse_fade);
        }

      // rainbow blocks
      if (block.list[b].color === Q)
        {
        r2.width = tile_pixel_width;
        r2.height = tile_pixel_height;
        r2.x = tile_pixel_width * block.list[b].colorframe;
        r2.y = 0;
        rainbow_sprite.draw_part (canvas_2d, r2, block.list[b].x, block.list[b].y, 1.0);
        r2.x = tile_pixel_width * block.list[b].frame;
        r2.y = tile_pixel_height;
        rainbow_sprite.draw_part(canvas_2d, r2, block.list[b].x, block.list[b].y, 1.0);
        }

      // non-rainbow blocks
      else
        {
        // black block's red border
        if (block.list[b].color === K && block.list[b].state != BLOCK_DESTROY && block.list[b].state != BLOCK_MARKED)
          {
          r2.x = 0;
          r2.y = tile_pixel_height * 8;
          block_sprite.draw_part_scaled (canvas_2d, r2, r, pulse_fade);
          }

        r2.x = tile_pixel_width * block.list[b].frame;
        r2.y = tile_pixel_height * (block.list[b].color - 1);
        block_sprite.draw_part_scaled (canvas_2d, r2, r, 1.0);
        }
      }
    }
  }

////////////////////////////////////////////////////////////////////////////////

function draw_lightning()
  {
  // lightning
  if (grabber.block > -1)
    {
    let r = new Rectangle ();
    let x = grabber.x;
    let y = grabber.y + 72;

    r.x = 0;//1 + lightning.frame * 79;
    r.y = lightning.frame * 25;
    r.width = 78;
    r.height = 24;

    lightning_sprite.draw_part (canvas_2d, r, x, y);
    }
  }

////////////////////////////////////////////////////////////////////////////////

function draw_conveyor()
  {
  let r = new Rectangle ();
  r.x = 1; r.y = 1 + conveyor.frame * 21; r.width = 66; r.height = 20;

  conveyor_sprite.draw_part (canvas_2d, r, conveyor.x1, conveyor.y1);

  x = conveyor.x2; y = conveyor.y1;
  r.x = 68; r.y = 1 + conveyor.frame * 21; r.width = 64; r.height = 20;
  while (x < screen_x_offset + screen_width)
    {
    conveyor_sprite.draw_part (canvas_2d, r, x, y);
    x += 64;
    }
  }

////////////////////////////////////////////////////////////////////////////////

function draw_grabber()
  {
  let r = new Rectangle ();
  r.x = 1; r.y = 1; r.width = 78; r.height = 72;

  grabber_sprite.draw_part (canvas_2d, r, grabber.x, grabber.y, 1.0);

  y = grabber.y - 72;
  while (y > -72)
    {
    x = grabber.x; r.x = 80; r.y = 1; r.width = 78; r.height = 72;
    grabber_sprite.draw_part (canvas_2d, r, x, y);
    y -= 72;
    }
  }