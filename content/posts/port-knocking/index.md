+++
title = "Port Knocking"
date = 2025-06-23
[taxonomies]
authors = ["Ramnath R Iyer"]
tags = ["home", "linux", "networking"]
+++

Imagine that you live in a weird apocalyptic future, and you want to keep your home safe, so you
find yourself a sturdy front door and a high-quality deadbolt to secure it with. Everything is set,
and you're satisfied that you're safe.

Hardly a minute goes by before you hear a knock on the door. It's a hooligan trying to get in. You
know you're still safe, and you shoo the person away the best you can without opening the door, but
a minute later there's another knock. And then yet another --- it never stops. Checking who's at the
door is tiring work, and you can't take it anymore. You could ignore *all* knocks, but you do
occasionally get guests, and apocalypse or no, you mustn't ignore your social circle. What do you
do?

You come up with an ingenious scheme. You let your prospective guests know that when they come to
your door, they will need to use a special knock sequence that you can recognize. Only when you hear
this knock sequence will you bother to even check who's at the door. "Ignore my protocol at your own
peril!", you warn them all.

The problem with running a public SSH server on your home network is less weird but otherwise not
too different from the situation above. Even after securing your server with state-of-the-art
certificate authentication and unbreakable ciphers, you find people (mostly automated bots) still
trying all day to connect to your server with passwords. While this is not *personally* tiring, it
does end up consuming compute resources and polluting your authentication logs (and as a
consequence, obfuscating real problems). One solution to this problem is analogous to the one above
--- you ask your users to send a few packets to specific ports in a particular sequence, before
accepting an SSH connection on the usual port. This works out especially well if the user is *you*
--- for instance, if you are using SSH to connect remotely to your home server, and you don't need
to grant access to anyone else.

Here's how you get this going:

On the server ---

* Step 1: Enable `netfilter` in your Linux kernel for packet sniffing.
* Step 2: Set up the `nftables` firewall to start automatically.
* Step 3: Configure a port knocking sequence in your firewall rules.
* Step 4: Open up the relevant ports on your home network router firewall.

Steps 1 and 2 are usually specific to the Linux distribution you use, and I would recommend looking
up its documentation. For reference, [Gentoo's documentation](https://wiki.gentoo.org/wiki/Nftables)
can provide a general idea of how this is done. Step 3 is accomplished using `nftables`
[rules](nftables-rules.3287e25f.txt) that you can load (and save). Step 4 is router-dependent. For
instance, my **eero** app has a relevant section in *Settings → Network settings → Reservations &
port forwarding*.

✗ Test that you can no longer connect directly over SSH.

On the client ---

* Step 5: Set up your SSH configuration to knock on ports.
* Step 6: Test your SSH connectivity.
* Step 7: DONE!

To set up Step 5 on the client-side, you can create a simple [knock](knock.e93f3b0b.txt) script in
your `PATH`, make it executable, and [configure your SSH client](ssh_config.b8a03c9e.txt) to execute
it automatically before connecting to your server.

✓ Test that you can once again connect over SSH.

And it's as simple as that.
