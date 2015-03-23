# ReactJS-Tutorial
some fun with ReactJS using my own Node/Express/MongoDB backend

https://radiant-dusk-6432.herokuapp.com/

type="text/jsx" required for JSX in script tag but for production use the React tool to precompile:

npm install -g react-tool

To use react-tool to precompile,

jsx -x jsx -w /src /build

/src is where your .jsx file is

/build is the .js file that will be loaded

-w will watch for changes; -x jsx will make sure only .jsx files are precompiled