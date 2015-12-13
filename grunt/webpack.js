module.exports = {
    htpasswd: {
        entry: './src/views/templates/tool/htpasswd/htpasswd.js',
        output: {
            filename: 'build/tool/htpasswd/htpasswd.js'
        },
        module: {
            loaders: [{
                test: /\.jsx?$/,
                loader: 'babel'
            }]
        }
    }
}
