module.exports = (ctx) => ({
    plugins: {
      autoprefixer: {
        browsers: ['> 0%', 'IE 9'],	
        cascade: false
      },
      'postcss-sorting': {
        'order': [
          'custom-properties',
          'dollar-variables',
          'declarations',
          'at-rules',
          'rules'
        ],
  
        'properties-order': [
            'display',
            'overflow',
            'opacity',

            'position',
            'float',
            'clear',
            'box-sizing',
            'z-index',

            'width',
            'height',
            'padding',
            'margin',
            'border',

            'font-family',
            'color',
            'font-size',
            'line-height',
            'text-align',
            'word-spacing',
            'letter-spacing',
            'font-weight',
            'text-decoration',

            'background'
        ],
  
        'unspecified-properties-position': 'bottom'
      }
    }
})