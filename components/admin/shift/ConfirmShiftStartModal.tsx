import React from "react";
import { Modal, message } from "antd";
import { updateShift } from "apis/shift";
import { useMutation } from "react-query";

interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
  id: any;
}

const ConfirmShiftStartModal = ({ handleCancel, isModalOpen, id }: Props) => {
    const updateShiftStatus = useMutation((data:any)=> updateShift(data),{
        onSuccess:() => {
            handleCancel();
            message.success("Exam has been started.");
        },
        onError:(data:any)=> {
            const errorMessage = data?.response?.data?.message;
            message.error(errorMessage);
        }
    })
    
    const handleUpdate= () => {
        var data={
            shift_id:id,
        }
        updateShiftStatus.mutate(data);
    }
  return (
    <>
      <Modal title="Confirm Start Shift" open={isModalOpen} onCancel={handleCancel} onOk={handleUpdate}>
        <p>{id}</p>
      </Modal>
    </>
  );
};

export default ConfirmShiftStartModal;
