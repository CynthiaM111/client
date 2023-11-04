import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory,Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Form, Input, Select } from 'antd';
import styles from "./styles.module.css";
import {
  PageContainer,
  FormContainer,
  FormWrapper,
  FormTitle,
} from './style';

const SchoolRegistration = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();

  useEffect(() => {
    const handleSchoolRegistration = async () => {
      try {
        const url = `https://corneredu.onrender.com/users/${param.id}/registration/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    handleSchoolRegistration();
  }, [param]);

  const history = useHistory();

  const onFinish = async (values) => {
    try {
      const schoolRegistrationData = {
        university: values.university,
        linkedinProfilelink: values.linkedinProfilelink,
      };

      const url = `/users/${param.id}/registration/${param.token}`;
      const { data } = await axios.post(url, schoolRegistrationData);

      console.log(data); // Handle success
      history.push('/registration-confirmation');
    } catch (error) {
      console.log(error); // Handle error
    }
  };

  return (
    <div>
      {validUrl ? (
        <PageContainer>
          <FormContainer>
            <FormWrapper>
              <Form onFinish={onFinish}>
                <FormTitle>University Admin Registration</FormTitle>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your name',
                    },
                    {
                      min: 3,
                      message: 'Please enter at least 3 characters for name',
                    },
                  ]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Fullname" />
                </Form.Item>
                <Form.Item
                  name="university"
                  rules={[
                    {
                      required: true,
                      message: 'Please select your university!',
                    },
                  ]}
                >
                  <Select prefix={<UserOutlined />} placeholder="University">
                    <Select.Option value="UR-BUSOGO">UR-BUSOGO</Select.Option>
                    <Select.Option value="UR-HUYE">UR-HUYE</Select.Option>
                    <Select.Option value="UR-REMERA">UR-REMERA</Select.Option>
                    <Select.Option value="UR-NYARUGENGE">UR-NYARUGENGE</Select.Option>
                    <Select.Option value="UR-RUKARA">UR-RUKARA</Select.Option>
                    <Select.Option value="UR-RUSIZI">UR-RUSIZI</Select.Option>
                    <Select.Option value="UR-GIKONDO">UR-GIKONDO</Select.Option>
                    <Select.Option value="AUKA">AUKA</Select.Option>
                    <Select.Option value="KEPLER">KEPLER</Select.Option>
                    <Select.Option value="INES">INES</Select.Option>
                    <Select.Option value="UK">UK</Select.Option>
                    <Select.Option value="UNILAK">UNILAK</Select.Option>
                    <Select.Option value="ULK">ULK</Select.Option>

                    {/* Add other university options here */}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="linkedinProfilelink"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your LinkedIn profile link',
                    },
                    {
                      min: 3,
                      message:
                        'Please enter at least 3 characters for the LinkedIn profile link',
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="LinkedIn profile"
                  />
                </Form.Item>
                <Form.Item>
                <Link to="/registration-confirmation">
						   <button className={styles.green_btn}>Register As Admin</button>
				 	</Link>
                  
                </Form.Item>
              </Form>
            </FormWrapper>
          </FormContainer>
        </PageContainer>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </div>
  );
};

export default SchoolRegistration;
