module.exports = function () {
    return {
        dist: {
            options: {
                collapseWhitespace: true,
                minifyCSS: true,
                removeComments: true
            },
            files: [{
                expand: true,
                cwd: 'src',
                src: ['**/*.*'],
                dest: 'dist'
            }]
        }
    };
};
