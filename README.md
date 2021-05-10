# clock

The goal of this project was to play with dates and time by using the momentjs library. Also, I decided it would be fun to include a variation of Analog and Digital clocks to display time. Using canvas for Analog clocks was fun and challenging, since I used it first time.

To get data I used two rest-end points:

- "http://worldtimeapi.org/api/timezone",
- "https://restcountries.eu/rest/v2"

Of course, I wanted to keep the mobile-first approach to provide a fully-responsive layout. I used media-queries, so that the page would be compatible on all screen resolutions and all layouts.

To have more fun to the project, I added search field to search for cities from the list.

Also, I thoought it would be nice to mimic Apple's "World Clock" that's installed on all iPhones. And so, the actions like Edit and Delete were added as well. Used Angular's anymations to work with Edit/Delete actions.

I use localStorage to store selected cities in the browser's storage.

I think the result came out pretty good. But I will let you judge it.
