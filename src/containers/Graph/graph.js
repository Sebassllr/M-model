import React, { Component } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-font/dist/css/bpmn-embedded.css';
import 'bpmn-js-properties-panel/styles/properties.less';
import classes from './graph.module.css';
import { emptyBpmn } from  '../empty.bpmn';
import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import customModule from './custom';
import GraphForm from './GraphForm/graphForm'
import { is } from 'bpmn-js/lib/util/ModelUtil';

class Graph extends Component{

    state = {
        selectedItem: null,
        selectedElements: []
    }

    modeler = null;
    
    componentDidMount = () => {
        if(this.modeler == null){
            this.modeler = new BpmnModeler({
                container: '#bpmnview',
                keyboard: {
                    bindTo: window
                },
                additionalModules: [
                    propertiesPanelModule,
                    propertiesProviderModule,
                    customModule
                ],
                moddleExtensions: {
                    camunda: camundaModdleDescriptor
                }
            });
            
            this.modeler.on('selection.changed', (e) => {    
                
                this.setState({
                    selectedElements: e.newSelection,
                    element: e.newSelection[0]
                });
                
            });

            this.modeler.on('element.changed', (e) => {
          
                const { element } = e;
        
                const { element: currentElement } = this.state;
            
                if (!currentElement) return;
        
                // update panel, if currently selected element changed
                if (element.id === currentElement.id) {
                    this.setState({ element });
                }
            });

            this.newBpmnDiagram();
        }
    }

    newBpmnDiagram = () => {
        this.openBpmnDiagram(emptyBpmn);
    }

    openBpmnDiagram = (xml) => {
        this.modeler.importXML(xml, (error) => {
            if (error) {
                return console.log('fail import xml');
            }

            var canvas = this.modeler.get('canvas');

            canvas.zoom('fit-viewport');
        });
    }

    render = () => {
        return(
            <div className={[classes.bpmsContainer, 'displayFlex'].join(" ")} id="bpmncontainer">
                <div className={[classes.graphContainerWidth].join(" ")}>
                    <div id="bpmnview" className={classes.bpmnGraph}></div>
                </div>
                <div className={[ classes.propertiesContainerWidth, classes.leftBorder ].join(" ")}>
                {
                    this.state.selectedElements.length === 1
                     && <ElementProperties modeler={ this.modeler } element={ this.state.element } />
                }
                {
                    ( this.state.selectedElements.length === 0 || this.state.selectedElements.length > 1 )
                    && <span>Please select an element.</span>
                }
                </div>
            </div>
        )
    }
}

function ElementProperties(props) {

    let {
      element,
      modeler
    } = props;
    
    if(modeler && element){    
        if (element.labelTarget) {
            element = element.labelTarget;
        }
    
        function updateName(type) {
            
            const bpmnReplace = modeler.get('bpmnReplace');

            let bObj = null;
            switch(type){
                case 1:
                    bObj = 'bpmn:Task';
                    break;
                case 2:
                    bObj = 'bpmn:ServiceTask';
                    break;
                case 3:
                    bObj = 'bpmn:ScriptTask';
                    break;
            }
            element.typeIntern = type;
            bpmnReplace.replaceElement(element, {
                type: bObj,
                width: 35,
                height: 35
            });
        }
    
        function updateTopic(topic) {
            
            const modeling = modeler.get('modeling');
        
            modeling.updateProperties(element, {
                'custom:topic': topic
            });
        }
    
        function makeMessageEvent() {
    
            const bpmnReplace = modeler.get('bpmnReplace');
        
            bpmnReplace.replaceElement(element, {
                type: element.businessObject.$type,
                eventDefinitionType: 'bpmn:MessageEventDefinition'
            });
        }
    
        function makeServiceTask(name) {
            const bpmnReplace = modeler.get('bpmnReplace');
        
            bpmnReplace.replaceElement(element, {
                type: 'bpmn:ServiceTask'
            });
        }
    
        function attachTimeout() {
            const modeling = modeler.get('modeling');
            const autoPlace = modeler.get('autoPlace');
            const selection = modeler.get('selection');
        
            const attrs = {
                type: 'bpmn:BoundaryEvent',
                eventDefinitionType: 'bpmn:TimerEventDefinition'
            };
        
            const position = {
                x: element.x + element.width,
                y: element.y + element.height
            };
        
            const boundaryEvent = modeling.createShape(attrs, position, element, { attach: true });
        
            const taskShape = append(boundaryEvent, {
                type: 'bpmn:Task'
            });
        
            selection.select(taskShape);
        }
    
        function isTimeoutConfigured(element) {
            const attachers = element.attachers || [];
        
            return attachers.some(e => hasDefinition(e, 'bpmn:TimerEventDefinition'));
        }
    
        function append(element, attrs) {
    
            const autoPlace = modeler.get('autoPlace');
            const elementFactory = modeler.get('elementFactory');
        
            var shape = elementFactory.createShape(attrs);
        
            return autoPlace.append(element, shape);
        };
    
        return (
            <GraphForm updateName={updateName} item={element}/>
        );
    }else{
        return <></>
    }
  }
  
  
  // helpers ///////////////////
  
  function hasDefinition(event, definitionType) {
  
    const definitions = event.businessObject.eventDefinitions || [];
  
    return definitions.some(d => is(d, definitionType));
  }

export default Graph;