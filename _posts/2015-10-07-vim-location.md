---
layout: series
title:  "Vim's Location List"
category: today-i-learned
---

Today I learned about Vim's location list. I noticed that the pane that pops up with the [Syntastic plugin's][syntastic] `:Errors` command is not a quickfix window (because I have a shortcut of `<leader>q` to toggle the quickfix window open/closed) and that was not working. Then I noticed that in the lower left hand corner rather than saying `Quickfix List` it said `Location`.

That is what led me to my discovery. It turns out that the location list in Vim is essentially a non-global Quickfix window. The location list is local to the window rather than global (like Quickfix). Other than that different they two work very much the same. In the case of the Syntastic plugin, `:Errors` will populate the location list, `:lopen` (or `:lop`) will open the location list and `:lclose` (or `:lcl`) will close the location list. You can also use `:lnext` (or `:lne`) to navigate to the next item in the location list and `:lprevious` (or `:lpr`) to navigate to the previous item.






[syntastic]: https://github.com/scrooloose/syntastic

