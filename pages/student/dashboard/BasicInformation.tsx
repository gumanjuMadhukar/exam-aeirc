import { Colors } from "utils/colors";
import { EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import {
  DetailWrapper,
  DetailTitleWrapper,
  DetailItem,
  DetailLabel,
  DetailTitle,
  DetailValue,
} from "styles/profileInformation";
import { useEffect, useState } from "react";
import StudentAPI from "apis/student";
import styled from "styled-components";
import { Button, Checkbox, Col, Form, Image, Row } from "antd";

import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useMutation, useQueryClient } from "react-query";
import moment from "moment";

interface Props {
  data: any;
}
export const BasicInformation = (props: Props) => {
  const { data } = props;
  const router = useRouter();
  const queryClient = useQueryClient();
  const [editBasicInformationModalOpen, setEditBasicInformationModalOpen] =
    useState(false);

  const openCloseModal = () => {
    setEditBasicInformationModalOpen(!editBasicInformationModalOpen);
  };

  const [isChecked, setIsChecked] = useState(false);
  const [form] = Form.useForm();

  const studentAPI = new StudentAPI();
  const student_id = Cookies.get("student_id");

  const updateStudentData = useMutation((data: any) =>
    studentAPI.update(student_id, data)
  );

  const handleCheckboxChange = (e: any) => {
    setIsChecked(e.target.checked);
  };

  const enterFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  };

  // enterFullScreen();

  const handleSubmit = (data: any) => {
    // Handle form submission logic here
    console.log(data.checkbox);
    const newData = {
      is_terms_and_condition_accepted: data.checkbox,
      start_time: moment(),
    };
    updateStudentData.mutate(newData, {
      onSuccess: () => {
        queryClient.invalidateQueries(["StudentData"]);
        enterFullScreen();
        router.push("/student/dashboard/quiz");
      },
      onError: (data: any) => {
        const errorMessageWithNetworkIssue = data?.message;
        const errorMessage = data?.response?.data?.message;
      },
    });
  };

  const validateCheckbox = (rule: any, value: any) => {
    if (!value) {
      return Promise.reject("Checkbox is required");
    }
    return Promise.resolve();
  };
  const empData = data;
  return (
    <>
      <DetailWrapper>
        <DetailTitleWrapper>
          <DetailTitle>Basic Information</DetailTitle>
          {/* <EditOutlined
            style={{ color: Colors.BORDER_COLOR }}
            onClick={openCloseModal}
          /> */}
        </DetailTitleWrapper>
        <Row>
          <LeftProfile lg={8} md={24} sm={24} xs={24}>
            <ImageWrapper>
              <div>
                <ProfileImage>
                  <Image
                    className={`profile-img`}
                    src={
                      "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
                    }
                    alt="avatar"
                  />
                </ProfileImage>
              </div>
            </ImageWrapper>
          </LeftProfile>
          <Col lg={16} md={24} sm={24} xs={24} className="search-col-margin">
            <DetailItem>
              <DetailLabel xs={8}>Name:</DetailLabel>
              <DetailValue xs={16}>{empData?.name}</DetailValue>
              <DetailLabel xs={8}>Email:</DetailLabel>
              <DetailValue xs={16}>{empData?.email}</DetailValue>
              <DetailLabel xs={8}>Symbol Number:</DetailLabel>
              <DetailValue xs={16}>{empData?.symbol_number}</DetailValue>
              <DetailLabel xs={8}>Date Of Birth:</DetailLabel>
              <DetailValue xs={16}>{empData?.date_of_birth}</DetailValue>
              <DetailLabel xs={8}>Subject:</DetailLabel>
              <DetailValue xs={16} style={{ color: Colors.PRIMARY }}>
                {empData?.subject?.name}
              </DetailValue>
            </DetailItem>
          </Col>
        </Row>
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="checkbox"
            getValueFromEvent={(e) => e.target.checked}
            rules={[{ validator: validateCheckbox }]}
            required
          >
            <Checkbox>
              I declare all the data displayed here belongs me or if there is
              any mistake on the data that is of my responsibility
            </Checkbox>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Start Exam
          </Button>
        </Form>
        {/* <BasicInformationEdit
          handleCancel={openCloseModal}
          isModalOpen={editBasicInformationModalOpen}
          id={isAdmin() ? empData?.id : null}
          data={empData}
        /> */}
      </DetailWrapper>
    </>
  );
};

const LeftProfile = styled(Col)`
  background-color: #fff;
  height: 300px;
`;

const ProfileImage = styled.div`
  width: 200px;
  text-align: center;
  border: 2px solid #000;
  .ant-image {
    width: 100%;
    padding: 10px;
    .profile-img {
      &.img-padding {
        padding: 40px;
      }
      background: ${Colors.LIGHTER_BG};
      // border-radius: 50%;
    }
  }
`;

const ProfileButton = styled.div`
  text-align: center;
  margin-top: 15px;
  cursor: pointer;
`;

const ProfileText = styled.span`
  border: 1px dotted ${Colors.BORDER_COLOR};
  color: ${Colors.BORDER_COLOR};
  font-size: 14px;
  padding: 0 5px;
`;

const ImageWrapper = styled.div`
  display: flex;
  // align-items: center;
  // justify-content: center;
  height: 100%;
`;
