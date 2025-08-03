+++
title = "Dark Mode On i3"
date = 2025-07-01T20:30:00-07:00
[taxonomies]
authors = ["Ramnath R Iyer"]
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
# following sets of values:
#
# Net/ThemeName "Adwaita"       # Light
# Net/IconThemeName "Tela"      # Light
#
# OR
#
# Net/ThemeName "Adwaita-dark"  # Dark
# Net/IconThemeName "Tela-dark" # Dark
#
# Note that these themes must already be installed. The
# script sends a HUP signal to the process, causing the
# setting to take effect at once.
#
# Also note that there's a fun bug in this script that
# I didn't bother to fix, which is: it toggles the keys
# for Net/ThemeName and Net/IconThemeName separately, so
# they will not stay in sync if they didn't start out in
# sync!

set -euxo pipefail

CFG_PATH="$HOME/.xsettingsd"

update() {
    local key="$1"
    local def="$2"
    local alt="$3"
    local old=$(pcregrep -o1 "$key "'"(.*)"' "$CFG_PATH")
    if [ "$?" -eq 0 ]
    then
        local new=$([ "$old" == "$def" ] && echo -ne "$alt" || echo -ne "$def")
        sed -i 's#'$key' .*#'$key' "'$new'"#' "$CFG_PATH"
    else
        echo $key' "'$def'"' >> "$CFG_PATH"
    fi
}

update "Net/ThemeName" "Adwaita" "Adwaita-dark"
update "Net/IconThemeName" "Tela" "Tela-dark"

killall -HUP xsettingsd
```

For the script above to work, you **must first install** the *gnome-themes-standard* and
*xsettingsd* packages on Gentoo, or their equivalents on other Linux distributions. You also need to
have the *xsettingsd* process running, which I've added to my `.xinitrc` startup script.
