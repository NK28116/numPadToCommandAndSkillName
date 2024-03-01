

# app Routing Conventions
The following file conventions are used to define routes and handle metadata in the app router.

## Routing Files
|              |                |                              |
|--------------|----------------|------------------------------|
| layout       | .js .jsx .tsx  | Layout                       |
| page         | .js .jsx .tsx  | Page                         |
| loading      | .js .jsx .tsx	 | Loading UI                   |
| not-found	   | .js .jsx .tsx  | Not found UI                 |
| error	       | .js .jsx .tsx  | Error UI                     |
| global-error | .js .jsx .tsx  | 	Global error UI             |
| route        | .js .ts        | API endpoint                 |
| template     | .js .jsx .tsx  | 	Re-rendered layout          |
| default      | .js .jsx .tsx  | Parallel route fallback page |

## Nested Routes
folder	Route segment
folder/folder	Nested route segment

## Dynamic Routes
|               |                                   |
|---------------|-----------------------------------|
| [folder]      | 	Dynamic route segment            |
| [...folder]   | 	Catch-all route segment          |
| [[...folder]] | 	Optional catch-all route segment |

## Route Groups and Private Folders
|           |                                                  |
|-----------|--------------------------------------------------|
| (folder)	 | Group routes without affecting routing           |
| _folder	  | Opt folder and all child segments out of routing |

## Parallel and Intercepted Routes
|                |                             |
|----------------|-----------------------------|
| @folder        | 	Named slot                 |
| (.)folder      | 	Intercept same level       |
| (..)folder     | 	Intercept one level above  |
| (..)(..)folder | 	Intercept two levels above |
| (...)folder    | 	Intercept from root        |

## Metadata File Conventions
App Icons

|            |                            |                          |
|------------|----------------------------|--------------------------|
| favicon    | 	.ico                      | 	Favicon file            |
| icon       | 	.ico .jpg .jpeg .png .svg | 	App Icon file           |
| icon       | 	.js .ts .tsx	             | Generated App Icon       |
| apple-icon | 	.jpg .jpeg, .png	         | Apple App Icon file      |
| apple-icon | 	.js .ts .tsx	             | Generated Apple App Icon |

## Open Graph and Twitter Images
|                  |                       |                            |
|------------------|-----------------------|----------------------------|
| opengraph-image  | 	.jpg .jpeg .png .gif | 	Open Graph image file     |
| opengraph-image	 | .js .ts .tsx	         | Generated Open Graph image |
| twitter-image	   | .jpg .jpeg .png .gif  | 	Twitter image file        |
| twitter-image	   | .js .ts .tsx          | 	Generated Twitter image   |

## SEO
|          |          |                       |
|----------|----------|-----------------------|
| sitemap	 | .xml	    | Sitemap file          |
| sitemap	 | .js .ts	 | Generated Sitemap     |
| robots	  | .txt	    | Robots file           |
| robots	  | .js .ts	 | Generated Robots file |