# Population since 1950
This is a simple app that displays a graph of population of a given country since 1950. In the back there is serverside caching allowing minimal fetches to the API providing population data. There are some bugs


## Globe Selector 

This project makes use of a D3 project found <a href="http://bl.ocks.org/KoGor/5994804">here</a> licensed under <a href="https://choosealicense.com/licenses/mit/">MIT</a>, this code is coaxed to work with React and used as a Country Selector

## React-faux-dom

I'm using <a href="https://github.com/Olical/react-faux-dom">react-faux-dom</a> to integrate D3 into React

### Note Dump
- Climate data to play with:
  - http://worldclim.org/version2
  - https://www.ncdc.noaa.gov/cdo-web/datasets
  - http://iridl.ldeo.columbia.edu/
  - <a href="https://www.esrl.noaa.gov/gmd/ccgg/trends/gl_full.html">Global CO2</a>
- <a href="http://sedac.ciesin.columbia.edu/theme/land-use/data/sets/browse">Interesting Land use Data</a>
- <a href="https://github.com/geotiffjs/geotiff.js">GeoTiff parser</a>

- <a href="http://bl.ocks.org/KoGor/5994804">Globe Country Selector</a>
- <a href="http://bl.ocks.org/duopixel/4063326">D3 animating paths</a>
- <a href="https://medium.freecodecamp.org/learn-to-create-a-line-chart-using-d3-js-4f43f1ee716b">D3 line graph tutorial</a>
