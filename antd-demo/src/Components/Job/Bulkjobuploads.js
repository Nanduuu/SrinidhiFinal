import React from 'react';
import {Input,Upload, message, Button, Icon, Row,Col, Spin} from 'antd';
import {connect} from 'react-redux';
import axios from 'axios';

const mapStateToProps=(state)=>{

}

const mapDispatchToProps=(dispatch)=>{

}


class Bulkjobuploads extends React.Component{

constructor(props){
	super(props)
	this.state = { 
						
						jobsDoc: [],
    					uploading: false,
    					fileUploadStatus : false,
				};
}

OnSubmit = ()=>{
	const formData = new FormData();

	if (this.state.jobsDoc.length === 0){

		 message.error("Select file before upload")


	}else{

		this.setState({
			fileUploadStatus:true,
		})

		formData.append('jobs', this.state.jobsDoc.pop());
		axios.post('/api/Bulkjobuploads/' ,formData ).then ((res)=>{
				message.success(res.data.msg);
				this.setState({
		     	 uploading: true,
		     	 fileUploadStatus:false,
		    	});
		    
			})
	}
}

render(){
	const { uploading, jobsDoc ,coverList} = this.state;
    const propsjobsDoc = {
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.jobsDoc.indexOf(file);
          const newFileList = state.jobsDoc.slice();
          newFileList.splice(index, 1);
          return {
            jobsDoc: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(state => ({
         jobsDoc : [file],
           
        }));
        return false;
      },
      jobsDoc,
    };

	return(

			<div>
				{ this.state.fileUploadStatus ? <Spin size="large" /> : null}
				<Row>	
					<Col>	
						<Upload {...propsjobsDoc}>
						    <Button>
						      <Icon type="upload" /> Click to Select File
						    </Button>
						  </Upload>
					</Col>
					<Col>
						<Button onClick = {this.OnSubmit}>Submit</Button>
					</Col>
				</Row>
			</div>


		)


}

}

export default connect () (Bulkjobuploads);