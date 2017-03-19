# Mx Circles

The Mx Circles is a Mendix implementation of the [circles.js](https://github.com/lugolabs/circles) library. 
Circles js is a Lightweight JavaScript library that generates circular graphs in SVG. Now with animation.

## How to install
Place the widget inside the context of a dataview and set the radius attribute.
![Install Image][1]

![Attribute Image][2]

## Properties
### Radius
This property describes the radius of the circle. This data is based on a selected data source and can be an integer, decimal or float.

### Max Value
This property sets the maximum value of the circle by default this is 100.

### Width
The width of the ring (optional, has value 10, if not specified)

### Colors
An array of colors, with the first item coloring the full circle (optional, it will be ['#EEE'; '#F00'] if not specified) Can also be an rgba() value (example: ['rgba(255,255,255,0.25)'; 'rgba(125,125,125,0.5)'])

### Duration
Value in ms of animation's duration; defaults to 500; if 0 or null is passed, the animation will not run.

### Wraper Class
Class name to apply on the generated element wrapping the whole circle.

### Text Class
Class name to apply on the generated element wrapping the text content.

### Value Stroke Class
Class name to apply on the SVG path element which for the value amount.

### Max Value Stroke Class
Class name to apply on the SVG path element which for the maxValue amount.

[1]: docs/images/mxcirclesinstall.png
[2]: docs/images/mxcirclesattribute.png