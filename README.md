# IPC Website

# install

Since this is a lightweight static site, it includes only basic Sass compiling and an html importer for the header and footer. The only tool it uses is Gulp.

* `yarn`
* `yarn gulp` or `yarn gulp --prod` to build the files once
* `yarn gulp watch` to watch for file changes
* All files are output to `./dist`

There's no server included here, so map your server to `./dist`!

I used docker by doing:

* `docker pull nginx:alpine`
* `docker run --name ipc -v /absolute/path/to/dist/:/usr/share/nginx/html -d -p 8080:80 nginx:alpine` <-- make sure you replace the the local path

Then go to `http://192.168.99.100:8080`.
