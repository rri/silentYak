+++
title = "Dark Mode On i3"
date = 2025-07-01
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
# Script to toggle light and dark modes on GTK instantaneously.
#
# The theme is toggled by using the `xsettingsd` daemon that
# should already be running. The `.xsettingsd` configuration
# file is updated to set a theme value, which is a line in
# the file that is exactly one of the following:
#
# Net/ThemeName "Adwaita"     # Light theme
# Net/ThemeName "AdwaitaDark" # Dark theme
#
# Note that both the themes Adwaita and Adwaita-dark must
# already be installed on the system.
#
# The last step of the script sends the HUP signal to the
# xsettingsd daemon, which causes the setting to take
# effect immediately.
#
set -euxo pipefail

CONFIG_PATH="$HOME/.xsettingsd"

L_THEME="Adwaita"
D_THEME="Adwaita-dark"

OLD_THEME=$(pcregrep -o1 'Net/ThemeName "(.*)"' "$CONFIG_PATH")

if [ "$?" -eq 0 ]
then
    NEW_THEME="$L_THEME"
    if [ "$OLD_THEME" == "$L_THEME" ]
    then
        NEW_THEME="$D_THEME"
    fi
    sed -i \
        's/Net\/ThemeName "'$OLD_THEME'"/Net\/ThemeName "'$NEW_THEME'"/' \
        "$CONFIG_PATH"
else
    echo 'Net/ThemeName "'$L_THEME'"' >> "$CONFIG_PATH"
fi

killall -HUP xsettingsd
```

For the script above to work, you **must first install** the `gnome-themes-standard` and
`xsettingsd` packages on Gentoo, or their equivalent packages on other Linux distributions.
