# Important Please Read
So we don't accidentally start working on the same things causing pointless work and wasted time like we did with the win modal, 
write down what you plan to do within the next day or few hours under the todo section, so we know who plans on doing what.

# Todo
Tuesday 12/3:  Alright so the sidebar branch isn't quite ready but I need to sleep.  I don't think what I did is the best way to it either: For resetting, I propose (and implemented) that we just reload the page and save the user's settings in Mongodb.  I haven't merged Sidebar because the sidebar buttons have issues but I will on Tuesday.  If you want to go into the sidebar branch, update your mongodb with db.options.insertMany([{ id: "flips",  flips: 2 }, {id: "max", max: 4}]) - Josiah

Tuesday, 12/4: I think that just svaing the sidebar stuff should work fine, I'm planning to create a way
to delete a(non-default) image from the database, and then do some work on the css. 

# Mongo Setup
The server expects the mongo database to have an `images` collection, which can be setup by running 
`db.images.insertMany([{url:"1.jpg", default:"true", description:"An image of the number one", id:"photo1"},{url:"2.jpg", default:"true", description:"An image of the number two", id:"photo2"},{url:"3.jpg", default:"true", description:"An image of the number three", id:"photo3"},{url:"4.jpg", default:"true", description:"An image of the number four", id:"photo4"}]);`
in the mongo shell

Likewise, the server expects the environment variables `MUSER` and `MPASSWORD` to be set, and they should be your mongo username and password. 

You can set these in the windows command prompt with `set VAR=VALUE` or in unix with `export VAR=VALUE`

# Ideas
Post Your Ideas As You Get Them:

First Idea: Implement one of those memory flash card games where you have a limited number of attempts to match all of the cards in pairs of two.  The user can customize the card designs (just change the pictures and card backs) and their fastest time is recorded as a score.  They could also maybe change other parts of the game like how many cards match and the total amount of cards.

Second Idea: Implement a photo board where any user can upload an image to have it displayed next to other images. The board could be organized by upload time/date or by likes and dislikes, and feature descriptions for each photo uploaded below them. This gives opportunity to create a server to store data uploaded by the user, and a nice front end using HTML, CSS, and js. Essentially it could be a public photo archive that users could filter/organize if they wish. 



Misc. Ideas that don't make the cut but might inspire someone:

  Website that gives users options to build their own website.  Set them up with a few website and make customizztion buttons that
  implement text boxes and colors.  (This seems largely unoriginal and kinda convoluted).
  
  
