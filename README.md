DO NOT USE PIE
-

Just use uBlock Origin. It works the best by far and even Pie agrees since they were "inspired" by it?

* https://www.theregister.com/2025/01/04/pie_adblock_ublock_origin_code/
* https://old.reddit.com/r/uBlockOrigin/comments/1hr6xjc/ubo_quick_filters_list_being_stolen_by_team/

It wasn't till AFTER called out by this reddit post that the repo magically showed up.

* https://www.youtube.com/watch?v=yJa_3o3RjPY

  
Pie is slop from the same group who run the Honey scam extension, Payal. 

* https://www.youtube.com/watch?v=VTxnM3J0I0k
  
None of these entities are trustworthy.


DO NOT USE HONEY
-
* https://www.youtube.com/watch?v=vc4yL3YTwWk
* https://www.youtube.com/watch?v=4H4sScCB1cY
* https://www.youtube.com/watch?v=ItiXffyTgQg
* https://www.youtube.com/watch?v=N9FhM8DMHCM
* https://wiki.rossmanngroup.com/index.php/Honey_Browser_Plugin

DO NOT USE PAYPAL
-
Paypal has a history of screwing people over. This is well documented here (and in subsequent linked videos in the description):
* https://www.youtube.com/watch?v=izuM2e7B8Mo
* https://www.youtube.com/watch?v=VAqzPw1CO_8

above is my notes. below is original readme:

---
---
---
---
---
---
---
---
---



## PIE Adblock Rules and Scriptlet Reader

This repo is an open-source repository of PIE's adblock rules and scriptlets reader. We are constantly adding new rules as our users report ads and hope to create a stronger adblocking community together. Our filters are constantly being updated by our team here in the US!

## Filterlists
In `filterlists/`, you will find our custom text filters that include cosmetic EasyList-style rules as well as scriptlet-based rules that tackle more persistent issues on certain sites. These rules may or may not be covered by other filter lists but were generated in response to users reporting ads/annoyances on specific sites.

To add our list to your adblocker's filter list rules, you can download or reference it from here!
https://cdn.pie.org/adb-filters/pie_custom.txt

## Scriptlets
In `scriptlets/`, you will find our scriptlet reader source code and scriptlet source functions. Pie believes this scriptlet reader to be more plug-and-play ready than the other AST-based rule readers available online. Our scriptlet reader works on both UBO and ADG style scriptlet rules.

In `scriptlets/example.js`, you will find a simple example usage reading a scriptlet text rule (like those you will find in `filterlists/scriptlet-rules.txt`) and then calling on Chrome's `executeScript` API to run it. We hope this helps you get off the ground using scriptlets!

Scriptlets were built from [AdguardTeam/Scriptlets](https://github.com/AdguardTeam/Scriptlets) with slight modifications. To generate a new version of the built scriptlets, or for much more detailed documentation, please refer to their repo.

Our modifications primarily include:
* Adding deduping if the scriptlet with the same source has already been called on this page
* Debug logging
* Refactoring out plain "javascript"-style rules #%#(() => into scriptlet/site-unique, to avoid adding remote JS snippets to our rules text files

We will continue to develop tools to make adblocking accessible for the public, and commit to improving both our tools and our filterlists going forward.

## Usage

To test the scriptlets, see the example in `scriptlets/example.js` or run while inside `scriptlets/` with:
```sh
npm run test
```

## About


Portions of the Adblock Rules are modified versions of text rules from [[uAssets]](https://github.com/uBlockOrigin/uAssets) and scriplets from [[AdGuard Scriptlets]](https://github.com/AdguardTeam/Scriptlets), which is also licensed under the GPL v3 license.

[[GPLv3 License]](https://github.com/piedotorg/pie-adblock-rules/blob/main/LICENSE)

© The People’s Internet Experiment 2025. Repository open source licensed under GNU GPLv3 License.
