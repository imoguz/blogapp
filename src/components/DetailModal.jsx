import * as React from "react";
import Modal from "@mui/material/Modal";
import DeleteBlog from "./DeleteBlog";
import UpdateBlog from "./UpdateBlog";

export default function DetailModal({ open, setOpen, modalInfo }) {
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {modalInfo?.buttonName === "delete" ? (
          <DeleteBlog modalInfo={modalInfo} setOpen={setOpen} />
        ) : (
          <UpdateBlog modalInfo={modalInfo} setOpen={setOpen} />
        )}
      </Modal>
    </div>
  );
}
