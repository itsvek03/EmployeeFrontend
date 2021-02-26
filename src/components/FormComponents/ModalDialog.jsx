import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import Container from "./Container";
import { getEmployeeActionId } from "../../actions/EmployeeActions";

const ModalDialog = ({ showFlag, handleClose, isEdit, compId }) => {
    const dispatch = useDispatch();

    const { employee, error } = useSelector(
        (state) => state.EmployeeIdReducer
    );

    useEffect(() => {
        if (isEdit) {
            dispatch(getEmployeeActionId(compId));
        }
    }, [isEdit, dispatch, compId]);

    return (
        <Modal show={showFlag} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <h1>{error}</h1>}
                {isEdit ? (
                    <Container
                        closeFun={handleClose}
                        isEdit={true}
                        initVals={employee}
                        compId={compId}
                    />
                ) : (
                        <Container closeFun={handleClose} />
                    )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Close
          </Button>

            </Modal.Footer>

        </Modal>
    );
};

export default ModalDialog;