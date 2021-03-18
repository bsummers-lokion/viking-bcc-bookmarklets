# Viking BCC Bookmarklet Project
This project was created to support transformation of certain BCC editor elements so that they become usable all of a sudden.
There are several places inside the BCC where an antiquated Java `<applet>` is used in place of a regular `<textarea>` tag, and almost no
browser currently in use can or will run it.

This project contains source files inside the `/src` directory that can be transformed into a bookmarklet that can be run in any browser.

## Getting Started

Check out the project from [Github](https://github.com/bsummers-lokion/viking-bcc-bookmarklets).  You will need a recent version of [NodeJS](https://nodejs.org/en/download/) installed on your computer in order to build it.

## Building

If this is your first time building the project, make sure that all of the dependencies are installed. From the project root in a terminal or command prompt window, execute
```
npm install
```

Wait for this to finish. When it is complete, run 

```
npm run build
```

## Using

After you have build the code, bookmarklet URLs will be available inside the folder at `./dist/bookmarklets/`. Each one of them will be named _something_.bookmarklet.txt.

Using your browser's bookmark manager, create a new bookmark for whatever it is you want to do, and then copy the contents of the _something_.bookmarklet.txt file into the Location field for the bookmark. 

Then when you're on the page that you want to use the bookmarklet on, just click it and it will run whatever code is inside it. 
