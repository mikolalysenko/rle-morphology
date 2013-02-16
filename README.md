rle-morphology
==============
[Mathematical morphology](http://en.wikipedia.org/wiki/Mathematical_Morphology) operators for narrow band level sets.  This is part of the [rle](https://github.com/mikolalysenko/rle-core) collection of libraries.

Installation
============
Via npm:

    npm install rle-morphology
    
Demo
====
Here:

[http://mikolalysenko.github.com/rle-morphology/example/www/index.html](http://mikolalysenko.github.com/rle-morphology/example/www/index.html)
    
API
=====
There are four different functions exported by this library.

### `dilate(volume, structuring_element)`
This dilates a volume by the structuring element.  The structuring element is represented by a flat list of points, for example the output from one of the methods in `rle-stencils`.

### `erode(volume, structuring_element)`
Erodes the volume by the element.  The basic input and behavior is consistent with `dilate`.

### `opening(volume, structuring_element)`
Performs a morphological opening.  This is useful if you want to remove tiny features your shape.  It is equivalent to doing:

    dilate(erode(volume, element), element)


### `closing(volume, structuring_element)`
Performs a morphological closing.  This removes any tiny holes or cracks in your shape.  It is equivalent to:

    erode(dilate(volume, element), element)


Credits
=======
(c) 2013 Mikola Lysenko.  BSD License
