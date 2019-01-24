import React from 'react';
import { Modal, Button ,Input} from 'antd';
import  {Row,Col}  from 'antd';



class Forgotpword extends React.Component {
	
	constructor(props) {
		super(props);
		this.state={
			visible : false,
			loading: false
		}
	}

	showModal = () => {
    this.setState({
      visible: true,

    });
  }

  handleOk = (e) => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

	render (){
		return(
				<div>	
					<Button style={{ width:'100%'}} onClick={this.showModal}> Forgot Password ?</Button>
					<Modal
						title="Password Reset"
          				visible={this.state.visible}
          				onOk={this.handleOk}
          				onCancel={this.handleCancel}
          				footer={[
          				<Button key="back" onClick={this.handleCancel}>Return</Button>,
           				 <Button key="submit" type="primary" loading={this.loading} onClick={this.handleOk}>
             				 Submit
            			</Button>,
            			]}
					>
						<form>
						<Input  placeholder="Enter your Email Id" />
						<Input  type="password" placeholder={'Enter your new password'} required/>
						<Input  type="password" placeholder={'Confirm your new password'} required/>
						<Row>
						<Col xs={12} sm={12} md={12} lg={12} xl={12}>
						<Button style={{width:"100%"}} type="primary" >Send OTP </Button>
						</Col>
						<Col xs={12} sm={12} md={12} lg={12} xl={12}>
						<Input style={{width:"100%"}} placeholder={'Enter OTP'} required/>
						</Col>
						</Row>
						</form>
					</Modal>

				</div>

			);
	}

}

export default Forgotpword;