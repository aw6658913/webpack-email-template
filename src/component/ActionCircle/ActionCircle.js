import React from 'react';
import { Form, Select } from 'antd';
import axios from 'axios';
import mailList from '@router/router.web';
import './actionCircle.less';
const Qs = require('qs');
const closeImg = require('../../images/close-icon.png');

class ActionCircle extends React.Component {
    constructor(props){
        super(props)
        this.state={
            templateHtmlContent:'',
            acionToggle:false,
            formData:{
                targetAddress:'',
                mailTitle:'测试邮件',
                sendMan:'发件人',
                type:null
                // pass:''
            },
            loading:false
        }
    }
    setActionToggle(){
        this.setState({
            acionToggle:!this.state.acionToggle
        })
    }
    chooseENV(env){
        // this.setState({
        //     env:env
        // });
    }
    componentDidMount(){
        const { setFieldsValue } = this.props.form;
        setFieldsValue(this.state.formData);
    }
    sendMail(){
        const { validateFields } = this.props.form;
        validateFields((err, values) => {
            if(!err)
            {
                const html = '';
                const data={
                    templateHtmlContent:html,
                    name: '',
                    ...values
                }
                this.setState({
                    loading:true
                })
                axios({
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    method: 'post',
                    url: `/getHtml`,
                    data: Qs.stringify(data)
                }).then((res)=>{
                    if(res && res.data){
                        data.templateHtmlContent = res.data;
                        axios({
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            method: 'post',
                            url: `/sendMail`,
                            data: Qs.stringify(data)
                        }).then((res)=>{
                            if(res.data&&res.data.code==='EAUTH'){
                                alert(res.data.response||'操作失败');
                            }else{
                                alert('发送成功');
                            }
                        },()=>{
                            alert('操作失败');
                        }).finally(()=>{
                            this.setState({
                                loading:false
                            })
                        });
                    } else{
                        alert('获取html内容失败');
                    }
                },()=>{
                    alert('操作失败');
                }).finally(()=>{
                    this.setState({
                        loading:false
                    })
                });
            }
        })
        
    }
    render(){
        const { acionToggle, loading } = this.state;
        const { getFieldDecorator } = this.props.form;
        return <div className={'actionCircle '+ (acionToggle?'actionClicked':'')}>
            <div className="actionName" onClick={this.setActionToggle.bind(this)}>操作</div>
            <div className={'actionBox '+ (acionToggle?'actionBoxActive':'')}>
                <img src={closeImg} alt="关闭" className="closeIcon" onClick={this.setActionToggle.bind(this)}/>
                <div className="formArea">
                    <label className="formUnit">
                        <div className="labelName">目标邮箱</div>
                        {getFieldDecorator('targetAddress')(
                            <input className="formControl"/>
                        )}
                    </label>
                    <label className="formUnit">
                        <div className="labelName">邮件标题</div>
                        {getFieldDecorator('mailTitle')(
                            <input className="formControl"/>
                        )}
                    </label>
                    <label className="formUnit">
                        <div className="labelName">选择邮件</div>
                        {getFieldDecorator('mail')(
                            <select className="formControl">
                                {
                                    mailList.map((item) => {
                                        return <option value={item.path}>{item.name}</option>
                                    })
                                }
                            </select>
                        )}
                    </label>
                    <label className="formUnit">
                        <div className="labelName">发件人名称</div>
                        {getFieldDecorator('sendMan')(
                            <input className="formControl"/>
                        )}
                    </label>
                    <div className="formUnit">
                        <input className="formControl" type="button" onClick={this.sendMail.bind(this)} value={loading?'发送中……':'发送邮件'} style={{marginLeft:100}}/>
                    </div>
                </div>
            </div>
        </div>
    }
    
}
const actionCircle =  (Form.create())(ActionCircle);
export default actionCircle;
