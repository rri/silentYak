+++
title = "Classification Problem"
date = 2025-08-13T19:30:00-07:00
[taxonomies]
authors = ["Ramnath R Iyer"]
tags = ["lifehack"]
+++

In a previous post, I talked about [false choices](@/posts/false-choices/index.md), situations where
one is persuaded to pick from one of several sub-optimal options like *A* versus *B* when better
ones exist outside the realm of consideration. I would like to highlight the other side of the
problem, arguably a bigger deal for many people, which is this: it is usually not obvious how to
classify a problem at hand into an *A* versus *B* situation in the first place.

Here's an example: we have the well-known *explore-exploit* tradeoff that recognizes the dilemma we
face between choosing the best option from what we know versus continuing to look for better options
(at the cost of potentially losing what we already have in hand). In [Algorithms to Live
By](https://www.amazon.com/Algorithms-Live-Computer-Science-Decisions/dp/1627790365), Brian
Christian points out that the best approach for such a problem is to dedicate the first 37% of your
time in *explore* mode and the rest in *exploit* mode, that is, picking the next available "best"
option[^1]. Here's the kicker though: for someone who isn't aware of this
tradeoff in the first place and doesn't realize that their actions *could* be classified into
exploratory or exploitative ones, how are they to even *know* to look for a solution? And besides,
it seems like we pulled this *explore-exploit* tradeoff out of thin air --- what other dimensions
are we missing?

Here are a few more:

| Category A         | Category B         |
| ------------------ | ------------------ |
| Explore            | Exploit            |
| Embracing Risk     | Mitigating Risk    |
| Effectiveness      | Efficiency         |
| Top-line Growth    | Bottom-line Growth |
| Revenue            | Profits            |

There are undoubtedly many more that could be added to this list. I would offer the following
observation: **Category B** is never enough --- one *must* spend a good chunk of their time in
**Category A**, maybe even up to 80% for some of them. I think it has something to do with how
rapidly the environment is evolving, and how well-suited we are to adapt when our world shifts
around us.

[^1]: Reference this [precise explanation](https://medium.com/data-science/an-algorithm-to-live-by-f60dccfa553d) of the optimal stopping problem and solution.
