// Wait
// Zach Bowman
// 2010 Nightmare Games

using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Audio;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.GamerServices;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using Microsoft.Xna.Framework.Media;
//using Microsoft.Xna.Framework.Net;
//using Microsoft.Xna.Framework.Storage;

namespace Blockhead
  {
  public class Wait
    {
    public bool activated = false;
    public bool running = false;
    public int count, total; // frames

    public void init (int t)
      {
      activated = true;
      running = true;
      count = 0;
      total = t;
      }

    public void counter ()
      {
      if (activated == true)
        {
        if (count < total)
          {
          count += 1;
          }
        else
          {
          activated = false;
          running = false;
          }
        }
      }

    public void reset()
      {
      activated = false;
      running = false;
      count = 0;
      }
    }
  }
