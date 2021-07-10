import React, { Component } from 'react';
import './NodePropertiesEditor.css';
import Model from '../../model/Model';

export interface DecoratorPropertiesEditorProps {
    data: any;
    appModel: Model;
    changed: any;
}

export interface DecoratorPropertiesEditorState {
    data: any;
    text: string;
}

export default class DecoratorPropertiesEditor extends Component<DecoratorPropertiesEditorProps, DecoratorPropertiesEditorState> {

    constructor(props: DecoratorPropertiesEditorProps) {
        super(props);
        this.state = {
            data: this.props.data,
            text: this.props.data ? JSON.stringify(this.props.data, null, 2) : '',
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps: DecoratorPropertiesEditorProps) {
        if (nextProps.data !== this.props.data) {
            // console.log(`DecoratorPropertiesEditor: UNSAFE_componentWillReceiveProps: new data:`, nextProps.data);
            this.setState({
                data: nextProps.data,
                text: nextProps.data ? JSON.stringify(nextProps.data, null, 2) : '',
            }, () => {

            });
        }
    }

    public onChange = (event: any) => {
        let nativeEvent: any = event.nativeEvent;
        switch (nativeEvent.target.name) {
            case 'text':
                this.setState({
                    text: nativeEvent.target.value
                });
                break;
        }
    }

    public onDecoratorChanged = (event: any) => {
        let data;
        try {
            data = JSON.parse(this.state.text);
        } catch (e) {
            console.log(`onDecoratorChanged: ERROR: parsing JSON`);
        }
        if (data) {
            this.props.changed('updateDecorator', data);
        }
    }

    render() {
        return (
            <div className={'DecoratorPropertiesEditor'}>
                <textarea name="text" value={this.state.text} rows={20}
                    onChange={this.onChange}
                    onBlur={this.onDecoratorChanged}
                />
            </div>
        )
    }
}