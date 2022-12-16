# Phase 1 Mock Code Challenge: Ramen Rater

## Learning Goals
- To Design and architect features across my frontend
- Integrate JavaScript and cocktaildb API
- To learn how to debug issues in my code
- Build and iterate on the project MVP
- Access information from my API using a GET request and use it to update the
  DOM
- Listen for user events and update the DOM in response

## Introduction

It's that month of the year, `December` where all across social media ni sherehe tu! A cocktail would be a go to drink when you want to take it slow and live in the moment. But the secret to a good cocktail is all in the recipe. I bring the `Drink-Cember` website to be your tool of choice that will help you navigate the endless galaxy of cocktails. This is made easier by searching for your cocktail of choice based on your ingredient.

## Setup

- Run `json-server --watch db.json` to get the backend started
- Open the `index.html` file on your browser
- Write your code in the `index.js` file

## Endpoints

The base URL for my local API will be: `http://localhost:3000`
Whereas the base URL for my public API is: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=`

The endpoints I may need for my CRUD operation are:

- GET `/drinks`
- POST `/drinks`
- DELETE `/drinks`
- UPDATE `/drinks`

## Core Deliverables

As a user, I can:

- See all cocktail images in the `div` with the id of `cocktail`. When the page
  loads, request the data from the server to get all the cocktail objects.

- Type an ingredient on the search input in the `div` with the class `search-content`.

- Click on the search icon and see all the lists of available cocktails with the specified ingredient
- See the recipe when I click the link with the class `recipe-btn`. A brief explanation on the basic steps on how to prepare the cocktail is given.
- Create a new cocktail after submitting the `new-cocktail` form. The new cocktail should
  be added to the`.cocktail-list` div. The new cocktail does not need to persist; in
  other words, if you refresh the page, it's okay that the new cocktail is no
  longer on the page.
- Delete a cocktail. The cocktail should be removed
  from the `.cocktail-list` div, and should not be displayed in the `cocktail-detail`
  div. No need to persist.


