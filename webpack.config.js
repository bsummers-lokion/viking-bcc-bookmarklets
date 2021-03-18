const path = require('path');
const fs = require('fs');

const mappedEntries = {};
const sourceFiles = fs.readdirSync(path.join(__dirname, 'src'))
    .filter((file) => {
        return file.match(/js$/);
    })
    .forEach((filename) => {
        const absoluteFilename = path.join(__dirname, 'src', filename);
        let key = filename;
        const index = filename.indexOf('.');
        if (index !== -1) {
            key = filename.substring(0, index);
            mappedEntries[key] = absoluteFilename;
        } else {
            mappedEntries[key] = absoluteFilename;
        }
    });

console.info(mappedEntries);

module.exports = {
    name: 'become-textareas',
    mode: 'production',
    resolve: {
        extensions: ['*', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ]
    },
    entry: mappedEntries,
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist', 'code'),
    },
    optimization: {
        minimize: true,
    },
    target: ['web', 'es5'],
    plugins: [
        {
            apply: (compiler) => {

                // Delete the /dist directory
                compiler.hooks.beforeRun.tap('BeforeRunPlugin', (compilation) => {
                    const directoryToRemove = path.join(__dirname, 'dist');
                    fs.rmdirSync(directoryToRemove, {recursive: true});
                    fs.mkdirSync(path.join(__dirname, 'dist'));
                    fs.mkdirSync(path.join(__dirname, 'dist', 'code'));
                    fs.mkdirSync(path.join(__dirname, 'dist', 'bookmarklets'));
                });

                compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {

                    // After the compiled code has been emitted to the output folder, read all of the files inside it.
                    fs.readdir('dist/code', (err, files) => {
                        if (err) {
                            return console.log('Unable to read compiled bookmarklet files');
                        }

                        // For each file in this directory, read the file contents, URL encode the whole thing,
                        // prefix the URL encoded string with "javascript:", and place it in the code/bookmarklets directory
                        files.forEach((filename) => {

                            // Get the compiled code pathname
                            const absolutePath = path.join(__dirname, 'dist', 'code', filename);

                            // Read the file
                            fs.readFile(absolutePath, (err, buffer) => {
                                if (err) {
                                    return console.log('Cannot read file ' + absolutePath);
                                }

                                // Transform the file contents into "javascript:the_file_contents_urlencoded"
                                let script = buffer.toString().trim();

                                const bangFunctionPattern = /^!function/
                                const needsVoidWrapper = script.match(bangFunctionPattern);
                                if (needsVoidWrapper) {
                                    // Remove the leading `!function()...` and replace it with `void(function()...`
                                    script = script.replace(bangFunctionPattern, 'void(function');

                                    // Remove the final semicolon and replace it with ')'
                                    script = script.replace(/;$/, ')');
                                }


                                if (script.match(/^!function/)) {
                                }


                                const bookmarklet = `javascript:${encodeURI(script)}`;

                                const bookmarkletFile = path.join(__dirname, 'dist', 'bookmarklets', filename.replace(/\.bundle\.js/, '.bookmarklet.txt'));

                                // Write the file to disk
                                fs.writeFile(bookmarkletFile, bookmarklet, (err) => {
                                    if (!!err) {
                                        console.log(err);
                                    } else {
                                        console.log(`Successfully wrote ${bookmarkletFile}`);
                                    }
                                });
                            });
                        });
                    });

                    console.log('Bookmarklet building is complete. Copy the contents of one of the files in `./dist/bookmarklets` to your browser\'s bookmarks manager.');
                });
            }
        }
    ]
};
