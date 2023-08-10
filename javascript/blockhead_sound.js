function play_sound (sound)
  {
  if (options.length > OPTION_SOUND && !options[OPTION_SOUND].on()) return;

  var s;
  
  if (sound === "start")
    {
    createjs.Sound.play ("pop1");
    }
  else if (sound === "blockhead")
    {
    s = Math.floor (Math.random() * 4) + 1;
         if (s === 1) createjs.Sound.play ("blockhead1");
    else if (s === 2) createjs.Sound.play ("blockhead2");
    else if (s === 3) createjs.Sound.play ("blockhead3");
    else createjs.Sound.play ("blockhead4");
    }
  else if (sound === "gong")
    {
    createjs.Sound.play ("gong");
    }
  else if (sound === "click")
    {
    s = Math.floor (Math.random() * 10) + 1;
         if (s === 1) createjs.Sound.play ("clok1");
    else if (s === 2) createjs.Sound.play ("clok2");
    else if (s === 3) createjs.Sound.play ("clok3");
    else if (s === 4) createjs.Sound.play ("clok4");
    else if (s === 5) createjs.Sound.play ("clok5");
    else if (s === 6) createjs.Sound.play ("clok6");
    else if (s === 7) createjs.Sound.play ("clok7");
    else if (s === 8) createjs.Sound.play ("clok8");
    else if (s === 9) createjs.Sound.play ("clok9");
    else createjs.Sound.play ("clok10");
    }
  else if (sound === "p")
    {
    s = Math.floor (Math.random() * 10) + 1;
         if (s === 1) createjs.Sound.play ("p1");
    else if (s === 2) createjs.Sound.play ("p2");
    else if (s === 3) createjs.Sound.play ("p3");
    else if (s === 4) createjs.Sound.play ("p4");
    else if (s === 5) createjs.Sound.play ("p5");
    else if (s === 6) createjs.Sound.play ("p6");
    else if (s === 7) createjs.Sound.play ("p7");
    else if (s === 8) createjs.Sound.play ("p8");
    else if (s === 9) createjs.Sound.play ("p9");
    else createjs.Sound.play ("p10");
    }
  else if (sound === "hit")
    {
    s = Math.floor (Math.random() * 21) + 1;
         if (s === 1) createjs.Sound.play ("pop1");
    else if (s === 2) createjs.Sound.play ("pop2");
    else if (s === 3) createjs.Sound.play ("pop3");
    else if (s === 4) createjs.Sound.play ("pop4");
    else if (s === 5) createjs.Sound.play ("pop5");
    else if (s === 6) createjs.Sound.play ("pop6");
    else if (s === 7) createjs.Sound.play ("pop7");
    else if (s === 8) createjs.Sound.play ("pop8");
    else if (s === 9) createjs.Sound.play ("pop9");
    else if (s === 10) createjs.Sound.play ("pop10");
    else if (s === 11) createjs.Sound.play ("pop11");
    else if (s === 12) createjs.Sound.play ("pop12");
    else if (s === 13) createjs.Sound.play ("pop13");
    else if (s === 14) createjs.Sound.play ("pop14");
    else if (s === 15) createjs.Sound.play ("pop15");
    else if (s === 16) createjs.Sound.play ("pop16");
    else if (s === 17) createjs.Sound.play ("pop17");
    else if (s === 18) createjs.Sound.play ("pop18");
    else if (s === 19) createjs.Sound.play ("pop19");
    else if (s === 20) createjs.Sound.play ("pop20");
    else createjs.Sound.play ("pop21");
    }
  else if (sound === "destroy")
    {
    s = Math.floor (Math.random() * 14) + 1;
         if (s === 1) createjs.Sound.play ("wah1");
    else if (s === 2) createjs.Sound.play ("wah2");
    else if (s === 3) createjs.Sound.play ("wah3");
    else if (s === 4) createjs.Sound.play ("wah4");
    else if (s === 5) createjs.Sound.play ("wah5");
    else if (s === 6) createjs.Sound.play ("wah6");
    else if (s === 7) createjs.Sound.play ("wah7");
    else if (s === 8) createjs.Sound.play ("wah8");
    else if (s === 9) createjs.Sound.play ("wah9");
    else if (s === 10) createjs.Sound.play ("wah10");
    else if (s === 11) createjs.Sound.play ("wah11");
    else if (s === 12) createjs.Sound.play ("wah12");
    else if (s === 13) createjs.Sound.play ("wah13");
    else createjs.Sound.play ("wah14");
    }
  else if (sound === "win")
    {
    s = Math.floor (Math.random() * 3) + 1;
         if (s === 1) createjs.Sound.play ("youwin1");
    else if (s === 2) createjs.Sound.play ("youwin2");
    else createjs.Sound.play ("youwin3");
    }
  else if (sound === "lose")
    {
    s = Math.floor (Math.random() * 3) + 1;
         if (s === 1) createjs.Sound.play ("youlose1");
    else if (s === 2) createjs.Sound.play ("youlose2");
    else createjs.Sound.play ("youlose3");
    }
  }

////////////////////////////////////////////////////////////////////////////////

function Music_Control ()
  {
  //if (!options[OPTION_MUSIC].on() || music_state == MUSIC_OFF)
  if (music_state == MUSIC_OFF)
    {
    //if (!music_player.getPaused()) music_player.setPaused (true);
    if (!music_player.paused) music_player.paused = true;
    return;
    }

  if (game_state === GAME || game_state == TUMBLE)
    {
    // stop the music on game end
    if (game_won === true || game_lost === true)
      {
      //TODO: change this to stop instead of pause
      //if (music_player.getPaused() != true) music_player.setPaused (true);
      if (!music_player.paused) music_player.paused = true;
      music_state = MUSIC_STOPPED;
      }

    // pick new song
    //else if (newsong === true || music_state == MUSIC_NEW)
    else if (music_state == MUSIC_NEW)
      {
      //music_player.setPaused (true);
      music_player.paused = true;
      newsong = false;
      while (music_track === last_track)
        {
        music_track = random (0, music.length - 1);
        }
      last_track = music_track;
      music_state = MUSIC_LOADING;
      }

    // start the music
    //else if ((document.visibilityState === "visible" && music_player.getPaused() === true && music[music_track].loaded === true)
    // else if ((document.visibilityState === "visible" && music_player.paused === true && music[music_track].loaded === true)
    //   || (music_state == MUSIC_LOADING && music[music_track].loaded === true))
    else if (music_state == MUSIC_LOADING && music[music_track].loaded === true)
      {
      music_player = createjs.Sound.play (music[music_track].id);
      music_player.volume = music_volume;
      music_player.loop = -1;
      music_state = MUSIC_PLAYING;
      }
    }
  }

