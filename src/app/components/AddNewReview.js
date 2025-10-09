import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Input } from "reactstrap";
export default function AddNewReview({addReviewHandler}){
    const [modal, setModal] = useState(false);
    const [newReview, setNewReview]= useState({
        "reviewTitle": "",
        "rating": 0,
        "comment": "",
        "date": "",
        "reviewerName": "",
        "reviwerEmail": ""
    });
      


    function handleChange(event) {
      const { name, value } = event.target;
      setNewReview({...newReview, [name]: name === "rating" ? parseFloat(value) : value});
    }
    
    function isValidEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
}

    const handleSave = () => {
    if (!newReview.reviewTitle || !newReview.comment) {
      alert("Please enter all the required fields!");
      return;
    }
    if (newReview.rating < 1 || newReview.rating > 5) {
        alert("Please enter a value between 1 and 5.");
        return;
    }
    if (newReview.reviwerEmail !== "" && !isValidEmail(newReview.reviwerEmail)) {
      console.log(newReview.reviwerEmail === "");
      alert("Please enter a valid email format!(user@example.com)");
      return;
    }
    const now = new Date();
    newReview.date = now.toISOString();

    addReviewHandler(newReview);
    setNewReview({
        "reviewTitle": "",
        "rating": 0,
        "comment": "",
        "date": "",
        "reviewerName": "",
        "reviwerEmail": ""
        });
    toggle();
    };

    const toggle = () => setModal(!modal);

    return (
        <div>
          <Button color="btn border border-dark mt-2 w-100" block onClick={toggle}>
            Add New Review
          </Button>
          <Modal isOpen={modal}>
            <ModalHeader toggle={toggle}>Add New Review</ModalHeader>
            <ModalBody>
              <Input className="border-2" type="text" name="reviewTitle" placeholder="Title your review" onChange={handleChange}></Input>
              <Input className="border-2 mt-2" type="number" name="rating" placeholder="Enter your rating" min={1} max={5} onChange={handleChange}></Input>
              <textarea className="border-2 mt-2 w-100" type="text" name="comment" placeholder="Enter your comment" onChange={handleChange} size={20} required></textarea>
              <Input className="border-2 mt-2" type="text" name="reviewerName" placeholder="Enter your name (Optional)" size={40} onChange={handleChange}></Input>
              <Input className="border-2 mt-2" type="text" name="reviwerEmail" placeholder="Enter your email (Optional)" onChange={handleChange} size={40}></Input>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handleSave}>
                Save
              </Button>
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }