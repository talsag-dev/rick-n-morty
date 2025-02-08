This one is a basic app to search with debouncing , filter , sort and pagination.
This project is a web application that allows users to search for characters from the "Rick and Morty" TV show. It includes features such as debouncing, filtering, sorting, and pagination to enhance the search experience.

Key components and features:

Debouncing: Reduces the number of API calls by delaying the search input processing until the user stops typing.
Filtering: Allows users to filter characters based on specific criteria.
Sorting: Enables sorting of search results based on different attributes.
Pagination: Implements infinite scrolling to load more characters as the user scrolls down.
The main components involved in this project are:

Explorer: The main component that integrates the search, filter, and infinite scroll functionalities.
FilterPanel: A component to filter the search results.
Search: A component to handle the search input.
InfiniteScroll: A component to handle infinite scrolling and data fetching.
The project uses the rickmortyapi package to fetch character data from the Rick and Morty API.
