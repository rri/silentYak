+++
title = "No Comment"
date = 2025-07-19T22:30:00-07:00
[taxonomies]
authors = ["Ramnath R Iyer"]
tags = ["meta", "lifehack"]
+++

Getting things done is a great way to keep moving forward in life with a sense of satisfaction. But
sometimes, all one really needs is closure, and *quitting* is a perfectly good alternative.

I spent a good deal of time chipping away at creating a commenting system for this blog. The way it
would work is that you would have a simple JavaScript-based submission form at the bottom of each
post, and comment submissions (aka, replies) would traverse an [AWS CloudFront
Function](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html)
for a clever spam check[^1] and an [AWS Lambda Function](https://aws.amazon.com/lambda/) for
actual processing. Processing would result in the comment data (consisting of a simple *name* and
*reply* enriched to create a child post that rendered beautifully below its parent) being sent to
GitHub as a [pull
request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request),
authenticated to my personal account that hosts the [source code for this
blog](https://github.com/rri/silentYak). I would then review and manually approve these pull
requests as they came in (I didn't expect much comment traffic anyway).

But I remained on the fence as to whether I even *wanted* to make this blog that interactive, and I
never did get to a solution that motivated me to complete the work. And the work stayed in a limbo
until two days ago, when I finally decided to abandon the idea altogether. And now a weight has been
lifted off my shoulders....

[^1]: The idea behind the clever spam check was to track a sequence of calls to CloudFront as the
    user navigated the site, and match this sequence against a state machine on the server side
    (using a key-value store available to CloudFront). For instance, a human would focus the text
    box and then type several characters --- each of these 'human-like' events would generate calls
    to the server that drove the state machine. The state machine itself would remain hidden from
    view to the user, so while a bot could, in theory, replicate the call sequence, doing so would
    be a lot more challenging process to undertake.
