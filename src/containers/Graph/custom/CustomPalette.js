
export default class CustomPalette {
  constructor(bpmnFactory, create, elementFactory, palette, translate) {
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    palette.registerProvider(this);
  }

  getPaletteEntries(element) {
    const {
      bpmnFactory,
      create,
      elementFactory,
      translate
    } = this;

    function createAction(type, group, className, title, options) {

      function createListener(event) {
        var shape = null;// elementFactory.createShape(assign({ type: type }, options));
  
        if (options) {
          shape.businessObject.di.isExpanded = options.isExpanded;
        }
  
        create.start(event, shape);
      }
  
      var shortType = type.replace(/^bpmn:/, '');
  
      return {
        group: group,
        className: className,
        title: title || 'Crear ' + shortType,
        action: {
          dragstart: createListener,
          click: createListener
        }
      };
    }

    function createTask(suitabilityScore) {
      return function(event) {
        const businessObject = bpmnFactory.create('bpmn:Task');
        businessObject.suitable = suitabilityScore;
        const shape = elementFactory.createShape({
          type: 'bpmn:Task',
          businessObject: businessObject
        });
  
        create.start(event, shape); 
      }
    }

    function createEvent(type) {
      return function(event) {

        let businessObject = bpmnFactory.create('bpmn:Task');
        businessObject.typeIntern = type;
        businessObject.title = "Actividad";
        const shape = elementFactory.createShape({
          type: 'bpmn:Task',
          businessObject: businessObject,
          typeIntern: type,
          structOrBehavioral: 1,
          title: 'Actividad',
          width: 35,
          height: 35,
        });
        
        create.start(event, shape); 
      }
    }

    return {
      'create.double-line': {
        group: 'tools',
        className: 'custom-icon bpmn-icon-task icon-must',
        title: translate('Double line'),
        action: {
          dragstart: createEvent(1),
          click: createEvent(1),
        }
      },
      'create.low-task': {
        group: 'activity',
        className: 'custom-icon bpmn-icon-task icon-must',
        title: translate('Crear actividad obligatoria'),
        action: {
          dragstart: createEvent(1),
          click: createEvent(1),
        }
      },
      'create.average-task': {
        group: 'activity',
        className: 'custom-icon bpmn-icon-task icon-flexible',
        title: translate('Crear actividad flexible'),
        action: {
          dragstart: createEvent(2),
          click: createEvent(2),
        }
      },
      'create.high-task': {
        group: 'activity',
        className: 'custom-icon bpmn-icon-task icon-optional',
        title: translate('Crear actividad opcional'),
        action: {
          dragstart: createEvent(3),
          click: createEvent(3),
        }
      }
    }
  }
}

CustomPalette.$inject = [
  'bpmnFactory',
  'create',
  'elementFactory',
  'palette',
  'translate'
];