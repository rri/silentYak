+++
title = "Dark Mode On i3"
date = 2025-07-01
[taxonomies]
tags = ["gentoo", "linux", "i3"]
+++

I use the [i3 tiling window manager](https://i3wm.org/) on [Gentoo Linux](https://www.gentoo.org/),
and avoid heavy-weight desktop environments like [GNOME](https://www.gnome.org/) or
[KDE](https://kde.org/). One consequence of this choice is that there isn't any 'system theme' to
speak of, that influences 'Light' and 'Dark' modes within [GTK](https://www.gtk.org/)-based
applications like [Firefox](https://www.firefox.com). What this means is that I have no way to
switch to 'Dark' mode for websites that follow the system theme --- like **this** blog --- unless I
specially set it up.

My solution for this is fairly straightforward: add a button on my desktop that allows me to switch
between light and dark modes. When I click the button, it invokes a script that toggles modes. You
can see the button --- the one with the 🌓 icon --- in the screenshots of my desktop below, right at
the bottom of the screen.

## Light Mode

![Desktop: Light Mode](desktop-l.webp "Desktop: Light Mode (i3 with Gentoo Linux)")

## Dark Mode

![Desktop: Dark Mode](desktop-d.webp "Desktop: Dark Mode (i3 with Gentoo Linux)")

## Details

The toolbar at the bottom is rendered by [i3blocks](https://github.com/vivien/i3blocks), with the
following configuration block:

```
[switch-theme]
full_text=🌓
command=/data/bin/switch-theme
```

The `switch-theme` script that the command above invokes is quite simple:

```bash
#!/bin/bash
#
# Script to toggle GTK light & dark modes.
#
# The mode is toggled by using the `xsettingsd` daemon,
# which should already be running. The `.xsettingsd`
# configuration file is updated, with exactly one of the
# following values:
#
# Net/ThemeName "Adwaita"     # Light
# Net/ThemeName "AdwaitaDark" # Dark
#
# Note that the Adwaita and Adwaita-dark themes must already
# be installed on the system.
#
# The script sends a HUP signal to the process, causing the
# setting to take effect at once.

set -euxo pipefail

CFG_PATH="$HOME/.xsettingsd"
DEF_THEME="Adwaita"
ALT_THEME="Adwaita-dark"
OLD_THEME=$(pcregrep -o1 'Net/ThemeName "(.*)"' "$CFG_PATH")
KEY="Net/ThemeName"

if [ "$?" -eq 0 ]
then
    NEW_THEME=$([ "$OLD_THEME" == "$DEF_THEME" ] &&        \
        echo -ne $ALT_THEME ||                             \
        echo -ne $DEF_THEME)
    sed -i 's#'$KEY' .*#'$KEY' "'$NEW_THEME'"#' "$CFG_PATH"
else
    echo $KEY' "'$DEF_THEME'"' >> "$CFG_PATH"
fi

killall -HUP xsettingsd
```

For the script above to work, you **must first install** the *gnome-themes-standard* and
*xsettingsd* packages on Gentoo, or their equivalents on other Linux distributions. You also need to
have the *xsettingsd* process running, which I've added to my `.xinitrc` startup script.
