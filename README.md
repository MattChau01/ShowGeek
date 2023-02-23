# :film_projector:	ShowGeek

ShowGeek is a web application for TV show fanatics who want to document and keep track of personal show reviews. This application uses an API called TVMaze. It's a public API that holds information about television shows across different streaming platforms such as Netflix, Hulu, and many more!

As an avid user of streaming platforms, I was inspired to build this project by an existing online database called [IMDb](https://www.imdb.com/). The review functionality was inspired by another database called [Rotten Tomatoes](https://www.rottentomatoes.com/). The combination of these two inspirations formed ShowGeek! With this application, anyone can keep track of the shows they watch on their mobile device or computer.


## Feel free to check it out!
[Click here to try this app!](https://mattchau01.github.io/ShowGeek/) :point_left:

Tutorial:

1. Click on the search bar and type in a TV show of your choice.
2. Click on the `search` button and wait for the next screen to load.
3. Click on `add show` to fill out your `rating` and `review` in the modal.
4. Click on `confirm` to see it added to your list! :raised_hands:

If you would like to see a visual tutorial click [here](#demos) to see a demo!

## Technologies used

JavaScript <br><img src="https://raw.githubusercontent.com/MattChau01/rc1022-code-solutions/3b0735d1400706dd0614fd244486d9b6b3c82a4e/javascript-view-swapping/images/javascript.png" width="60" height="60" />


HTML <br><img src="https://raw.githubusercontent.com/MattChau01/rc1022-code-solutions/3b0735d1400706dd0614fd244486d9b6b3c82a4e/javascript-view-swapping/images/html.png" width="60" height="60" />


CSS <br><img src="https://raw.githubusercontent.com/MattChau01/rc1022-code-solutions/3b0735d1400706dd0614fd244486d9b6b3c82a4e/javascript-view-swapping/images/css.png" width="60" height="60" />

[TVMAZE](https://www.tvmaze.com/api) <br><img src="https://static.tvmaze.com/images/tvm-header-logo.png" width="100" height="50" />


## Application features

- Search for TV shows based off search query
- Search results based off search are displayed
- Add a review and notes to a show
- A list is generated based off user input
- List items can be modified or deleted


## Demos

<h3><strong>How to search up a show</strong></h3> <br>
  <img src="/assets/demo1.gif" alt="demo1"> <br>
<br />
<h3><strong>How to add a show to list</strong></h3> <br>
  <img src="/assets/demo2.gif" alt="demo2">

## Stretch features

- Make the summary box scrollable to allow the full TV show summary

## Getting started

1. Create an outline of the project
    - index.html
      - Create multiple `views` to allow users to redirect `views` when clicked on `anchor tags` or `links`
    - css (directory)
        - styles.css
    - js (directory)
        - data.js
        - main.js
2. Get familiar with how [TVMAZE](https://www.tvmaze.com/api) works
    - To generate a single result per search, you can use the [single search](https://www.tvmaze.com/api#show-single-search) in your fetch request
    - Take a look at this [example](https://api.tvmaze.com/singlesearch/shows?q=stranger+things), notice that the end of a URL contains the `string` of a TV show
    - This project pulls data for the `name`, `summary`, and `image` of the result to print to the browser
3. Store data from user input into local storage to generate in list view
