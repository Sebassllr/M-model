import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

import {
  append as svgAppend,
  attr as svgAttr,
  classes as svgClasses,
  create as svgCreate,
  remove as svgRemove
} from 'tiny-svg';

import {
  getRoundRectPath
} from 'bpmn-js/lib/draw/BpmnRenderUtil';

import {
  is,
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';

import { isNil } from 'min-dash';

const HIGH_PRIORITY = 1500,
      TASK_BORDER_RADIUS = 2,
      COLOR_GREEN = '#52B415',
      COLOR_YELLOW = '#ffc800',
      COLOR_RED = '#cc0000';


export default class CustomRenderer extends BaseRenderer {
  constructor(eventBus, bpmnRenderer) {
    super(eventBus, HIGH_PRIORITY);

    this.bpmnRenderer = bpmnRenderer;
  }

  canRender(element) {
    // ignore labels
    return [ 'bpmn:Task', 'bpmn:Event' ].filter(e => e === element) && !element.labelTarget;
  }

  drawConnection = function(parent, element){
    element.type = "bpmn:SequenceFlow";
  }

  drawShape(parentNode, element) {

    const shape = this.bpmnRenderer.drawShape(parentNode, element);
    let circle = null;
    let isTask = element.typeIntern ? true : false;
    switch(element.typeIntern){
      case 1:
        circle = drawCustomEndEvent(parentNode, 2, 18, 'none', 0);
        prependTo(circle, parentNode);
        const insideCircle = drawCustomEndEvent(circle, 2, 14, 'none', 0);
        prependTo(insideCircle, parentNode);
        svgRemove(shape);
        break;
      case 2: 
        circle = drawCustomEndEvent(parentNode, 2, 18, 'none', 0);
        prependTo(circle, parentNode);
        const insideCircles = drawCustomEndEvent(circle,2, 14, 'none', 4);
        prependTo(insideCircles, parentNode);
        svgRemove(shape);
        break;
      case 3:
        circle = drawCustomEndEvent(parentNode, 2, 18, 'none', 4);
        prependTo(circle, parentNode);
        svgRemove(shape);
        break;
    }

    if(isTask){
      addTextRectangle(parentNode, element); 
    }

    if(element.structOrBehavioral == 1){
      const insideCircles = drawCustomEndEvent(circle, 1, 10, 'rgb(255, 76, 76)', 0);

      svgAttr(insideCircles, {
        transform: 'translate(20, 10)'
      });

      var text = svgCreate('text'); 

      svgAttr(text, {
        fill: '#b41515',
        transform: 'translate(33, 34)',
      });

      svgClasses(text).add('djs-label'); 
    
      svgAppend(text, document.createTextNode('B')); 
    
      svgAppend(parentNode, text);

      prependTo(insideCircles, parentNode);
    }else if(element.structOrBehavioral == 2){
      const insideCircles = drawCustomEndEvent(circle, 1, 10, 'rgb(185, 255, 141)', 0);

      svgAttr(insideCircles, {
        transform: 'translate(20, 10)'
      });

      var text = svgCreate('text'); 
      
      svgAttr(text, {
        fill: '#52B415',
        transform: 'translate(33, 34)',
      });

      svgClasses(text).add('djs-label'); 
    
      svgAppend(text, document.createTextNode('S')); 

      prependTo(insideCircles, parentNode);
      
      svgAppend(parentNode, text);
      
    }

    return shape;
  }

  getShapePath(shape) {
    if (is(shape, 'bpmn:Task')) {
      return getRoundRectPath(shape, TASK_BORDER_RADIUS);
    }

    return this.bpmnRenderer.getShapePath(shape);
  }

  getSuitabilityScore(element) {
    const businessObject = getBusinessObject(element);
  
    const { suitable } = businessObject;

    return Number.isFinite(suitable) ? suitable : null;
  }

  getEventType(element) {
    const businessObject = getBusinessObject(element);
    const { typeIntern } = businessObject;

    return Number.isFinite(typeIntern) ? typeIntern : null;
  }

  getColor(suitabilityScore) {
    if (suitabilityScore > 75) {
      return COLOR_GREEN;
    } else if (suitabilityScore > 25) {
      return COLOR_YELLOW;
    }

    return COLOR_RED;
  }

}

CustomRenderer.$inject = [ 'eventBus', 'bpmnRenderer' ];

function addTextRectangle(parent, element){

  var text = svgCreate('text'); 
  
  svgAttr(text, {
    fill: '#000',
    transform: 'translate(-15, 50)',
  });

  svgClasses(text).add('djs-label'); 

  svgAppend(text, document.createTextNode(element.title)); 

  svgAppend(parent, text);

}

function prependTo(newNode, parentNode, siblingNode) {
  parentNode.insertBefore(newNode, siblingNode || parentNode.firstChild);
}


function drawCustomEndEvent(parentNode, stroke, r, fill, dashArray){
  const circle = svgCreate('circle');

  svgAttr(circle, {
    cx: 18,
    cy: 18,
    r: r,
    stroke: '#000000',
    strokeWidth: stroke,
    'stroke-opacity': 1,
    'stroke-dasharray': dashArray,
    fill: fill
  });

  svgAppend(parentNode, circle);

  return circle;
}

// helpers //////////

// copied from https://github.com/bpmn-io/bpmn-js/blob/master/lib/draw/BpmnRenderer.js
function drawRect(parentNode, width, height, borderRadius, color, fillColor) {
  const rect = svgCreate('rect');

  svgAttr(rect, {
    width: width,
    height: height,
    rx: borderRadius,
    ry: borderRadius,
    stroke: color,
    strokeWidth: 1,
    fill: fillColor
  });

  svgAppend(parentNode, rect);

  return rect;
}