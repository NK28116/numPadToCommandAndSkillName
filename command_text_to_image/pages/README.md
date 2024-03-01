# pages Routing Conventions
The following file conventions are used to define routes in the pages router.

## Special Files
_app	.js .jsx .tsx	Custom App
_document	.js .jsx .tsx	Custom Document
_error	.js .jsx .tsx	Custom Error Page
404	.js .jsx .tsx	404 Error Page
500	.js .jsx .tsx	500 Error Page

## Routes

Folder convention		

index	.js .jsx .tsx	Home page
folder/index	.js .jsx .tsx	Nested page
File convention		
index	.js .jsx .tsx	Home page
file	.js .jsx .tsx	Nested page

## Dynamic Routes

Folder convention		

[folder]/index	.js .jsx .tsx	Dynamic route segment
[...folder]/index	.js .jsx .tsx	Catch-all route segment
[[...folder]]/index	.js .jsx .tsx	Optional catch-all route segment
File convention		
[file]	.js .jsx .tsx	Dynamic route segment
[...file]	.js .jsx .tsx	Catch-all route segment
[[...file]]	.js .jsx .tsx	Optional catch-all route segment