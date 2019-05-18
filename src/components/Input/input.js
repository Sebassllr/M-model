import React from 'react';
import classes from './input.module.css'
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const input = props => {
    let input;
    switch(props.type){
        case 'input': 
            input = <input className={[classes.Input, classes.width100].join(" ")} {...props}/>
            break;
        case 'textarea': 
            input = <textarea className={[classes.Input, classes.width100].join(" ")} {...props}/>
            break;
        case 'select': 
            input = (<select className={[classes.Input, classes.width100].join(" ")} {...props} >
                        {props.options.map(i => <option key={i._id} value={JSON.stringify(i)}>{i.name}</option>)}
                    </select>);
            break;
        case 'radio':
            input = (
                <div className={["displayFlex", classes.radioContainer].join(" ")}>
                    {props.radios.map((i, pos) => {
                        return (
                            <div key={pos}>
                                <input name={i.name} id={pos} {...props}  defaultChecked  />
                                <label className={classes.radioInputs} htmlFor={pos}>{i.title}</label>
                            </div>
                        )
                    })}
                </div>
            );
            break;
        case 'wysiwyg' :
            input = (
                <>
                    <Editor
                        editorState={props.editorState}
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"
                        onEditorStateChange={props.onEditorStateChange}
                    />
                </>
            );
            break;
        default: 
            input = <input className={[classes.Input, classes.width100].join(" ")} {...props}/>
    }

    return(
        <div className={[classes.width100, classes.div, "displayFlex", props.type === "wysiwyg" ? classes.wysi : null].join(" ")} >
            <label className={[classes.width100, classes.Label].join(" ")}>
                {props.required ? <span className="redRequired">* </span> : null} {props.name}
            </label>
            {input}
        </div>
    );
}

export default input;