const SUITABILITY_SCORE_HIGH = 100,
      SUITABILITY_SCORE_AVERGE = 50,
      SUITABILITY_SCORE_LOW = 25;

export default class CustomContextPad {
  constructor(bpmnFactory, config, contextPad, create, elementFactory, injector, translate) {
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    if (config.autoPlace !== false) {
      this.autoPlace = injector.get('autoPlace', false);
    }

    contextPad.registerProvider(this);
  }

  getContextPadEntries(element) {
    const {
      autoPlace,
      bpmnFactory,
      create,
      elementFactory,
      translate
    } = this;


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

    function appendServiceTask(type) {
      return function(event) {
        const businessObject = bpmnFactory.create('bpmn:Task');
        businessObject.typeIntern = type;
        const shape = elementFactory.createShape({
          type: 'bpmn:Task',
          businessObject: businessObject,
          width: 35,
          height: 35,
        });
        create.start(event, shape); 
      }
    }

    return {      
      'append.low-task': {
        group: 'activity',
        className: 'bpmn-icon-task icon-must custom-icon',
        title: translate('Crear actividad obligatoria'),
        action: {
          dragstart: createEvent(1),
          click: createEvent(1),
        }
      },
      'append.average-task': {
        group: 'activity',
        className: 'bpmn-icon-task icon-flexible custom-icon',
        title: translate('Crear actividad flexible'),
        action: {
          dragstart: createEvent(2),
          click: createEvent(2),
        }
      },
      'append.high-task': {
        group: 'activity',
        className: 'bpmn-icon-task icon-optional custom-icon',
        title: translate('Crear actividad opcional'),
        action: {
          dragstart: createEvent(3),
          click: createEvent(3),
        }
      }
    };
  }
}

CustomContextPad.$inject = [
  'bpmnFactory',
  'config',
  'contextPad',
  'create',
  'elementFactory',
  'injector',
  'translate'
];