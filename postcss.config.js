module.exports = {
      plugins: [
        require('postcss-ie11'),
        require('autoprefixer')({grid: true}),
        require('cssnano')
      ]
    }