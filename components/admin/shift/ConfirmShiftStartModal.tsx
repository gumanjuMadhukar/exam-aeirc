import React from "react";
import { Modal, message } from "antd";
import { completeShift, updateShift } from "apis/shift";
import { useMutation } from "react-query";

interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
  id: any;
  value:string;
}

const ConfirmShiftStartModal = ({ handleCancel, isModalOpen, id , value}: Props) => {
  const updateShiftStatus = useMutation((data: any) => updateShift(data), {
    onSuccess: () => {
      handleCancel();
      message.success("Exam has been started.");
    },
    onError: (data: any) => {
      const errorMessage = data?.response?.data?.message;
      message.error(errorMessage);
    },
  });
  const endShiftStatus = useMutation((data: any) => completeShift(data), {
    onSuccess: () => {
      handleCancel();
      message.success("Exam has been Ended.");
    },
    onError: (data: any) => {
      const errorMessage = data?.response?.data?.message;
      message.error(errorMessage);
    },
  });

  const handleUpdate = () => {
    var data = {
      id: id,
    };
    value ==="Start" ? updateShiftStatus.mutate(data) : value ==="In Progress" ? endShiftStatus.mutate(data):""
  };
  return (
    <>
      <Modal
        title="Confirm Start Shift"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleUpdate}
      >
        <p>Id: {id}</p>
        <p>Status Value: {value}</p>
      </Modal>
    </>
  );
};

export default ConfirmShiftStartModal;
