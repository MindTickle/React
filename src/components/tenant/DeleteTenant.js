import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { Popconfirm } from 'antd';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class TenantDeleteForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }


  handleSubmit = e => {
    e.preventDefault();
    var id = this.state.id;
    fetch(`http://localhost:3001/Tenant/`,{
        method : "delete",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "identity" : {
            "id" : this.state.id
        }
        })
      })
    .then(response => response.json())
    .catch(error => console.log('Error fetching and parsing data', error));
  };
  state = {
      "id" : '',
  }

  idHandler(event){
      this.setState({
          id : event.target.value
      })
  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const idError = isFieldTouched('id') && getFieldError('id');
    return (
      <Form layout="inline">
        <Form.Item validateStatus={idError ? 'error' : ''} help={idError || ''}>
          {getFieldDecorator('id', {
            rules: [{ required: true, message: 'Please input your id!' }],
          })(
            <Input
              prefix={<Icon type="data" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Id" value={this.state.id} onChange={this.idHandler.bind(this)}
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
          <Popconfirm
            title="Are you sure？"
            icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
            onConfirm = {this.handleSubmit}
            >
            <a href="#">Delete</a>
        </Popconfirm>
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default TenantDeleteForm;