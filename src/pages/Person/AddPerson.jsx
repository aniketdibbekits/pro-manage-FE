// // import  { useState } from 'react';
// // import { useCreatePersonMutation } from '../../store/api/personapi'; // Adjust the path as needed
// // import people from "../../assets/people.png";
// // import {toast} from "sonner"
// // import "./AddPerson.css";

// // function AddPerson() {
// //   const [isFormVisible, setFormVisible] = useState(false);
// //   const [email, setEmail] = useState("");
// //   const [createPerson] = useCreatePersonMutation();

// //   const handleAddClick = () => {
// //     setFormVisible(true);
// //   };

// //   const handleCancelClick = () => {
// //     setFormVisible(false);
// //     setEmail("");
// //   };

// //   const handleAddEmailClick = async () => {
// //     try {
// //       await createPerson({ email }).unwrap();
// //       console.log("Email added:", email);
// //       setFormVisible(false);
// //       setEmail("");
// //       toast.success("person added successfully")
// //     } catch (error) {
// //       console.error("Failed to add email:", error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <div className='add-people-div' onClick={handleAddClick}>
// //         <img style={{width:"20px"}} src={people} alt="Add People" />
// //         <p className='add-people-name'>Add People</p>
// //       </div>
// //       {isFormVisible && (
// //         <div className='add-people-form'>
// //           <input
// //             type="email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             placeholder="Enter email"
// //           />
// //           <button onClick={handleAddEmailClick}>Add Email</button>
// //           <button onClick={handleCancelClick}>Cancel</button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default AddPerson;
// // // ----------------------
// import { useState } from 'react';
// import { useCreatePersonMutation } from '../../store/api/personapi'; // Adjust the path as needed
// import people from "../../assets/people.png";
// import SuccessPopup from '../Person/SuccessPopup'; // Import the SuccessPopup component
// import "./AddPerson.css";

// function AddPerson() {
//   const [isFormVisible, setFormVisible] = useState(false);
//   const [email, setEmail] = useState("");
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const [createPerson] = useCreatePersonMutation();

//   const handleAddClick = () => {
//     setFormVisible(true);
//   };

//   const handleCancelClick = () => {
//     setFormVisible(false);
//     setEmail("");
//   };

//   const handleAddEmailClick = async () => {
//     try {
//       await createPerson({ email }).unwrap();
//       console.log("Email added:", email);
//       setFormVisible(false);
//       setShowSuccessPopup(true); // Show the success popup
//     } catch (error) {
//       console.error("Failed to add email:", error);
//     }
//   };

//   const handleClosePopup = () => {
//     setShowSuccessPopup(false);
//     setEmail("");
//   };

//   return (
//     <div className='add-person-container'>
//       <div className='add-people-div' onClick={handleAddClick}>
//         <img style={{ width: "20px" }} src={people} alt="Add People" />
//         <p className='add-people-name'>Add People</p>
//       </div>
//       {isFormVisible && (
//         <div className='add-people-form'>
//           <p>Add people to the board</p>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter email"
//           />
//           <button onClick={handleAddEmailClick}>Add Email</button>
//           <button onClick={handleCancelClick}>Cancel</button>
//         </div>
//       )}
//       {showSuccessPopup && (
//         <SuccessPopup email={email} onClose={handleClosePopup} />
//       )}
//     </div>
//   );
// }

// export default AddPerson;
import { useState } from 'react';
import { useCreatePersonMutation } from '../../store/api/personapi'; // Adjust the path as needed
import people from "../../assets/people.png";
import SuccessPopup from '../Person/SuccessPopup'; // Import the SuccessPopup component
import "./AddPerson.css";
import { toast } from "sonner";


function AddPerson() {
  const [isFormVisible, setFormVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [error, setError] = useState(null); // State for error message
  const [createPerson] = useCreatePersonMutation();

  const handleAddClick = () => {
    setFormVisible(true);
  };

  const handleCancelClick = () => {
    setFormVisible(false);
    setEmail("");
    setError(null); // Clear error message on cancel
  };

  const handleAddEmailClick = async () => {
    try {
      await createPerson({ email }).unwrap();
      console.log("Email added:", email);
      setFormVisible(false);
      setShowSuccessPopup(true); // Show the success popup
      setError(null); // Clear any previous error message
    } catch (error) {
      console.error("Failed to add email:", error);
      toast.error("Failed to add email");    }
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    setEmail("");
    setError(null); // Clear error message on closing popup
  };

  return (
    <div className='add-person-container'>
      <div className='add-people-div' onClick={handleAddClick}>
        <img style={{ width: "20px" }} src={people} alt="Add People" />
        <p className='add-people-name'>Add People</p>
      </div>
      {isFormVisible && (
        <div className='overlay'>
          <div className='add-people-form'>
            <p className='add-para'>Add people to the board</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter the email"
            />
            <div className='add-button'>
              <button className='cancel' onClick={handleCancelClick}>Cancel</button>
              <button className='add-email-button' onClick={handleAddEmailClick}>Add Email</button>
            </div>
            {error && <p className="error-message">{error}</p>} {/* Display error message if exists */}
          </div>
        </div>
      )}
      {showSuccessPopup && (
        <SuccessPopup email={email} onClose={handleClosePopup} />
      )}
    </div>
  );
}

export default AddPerson;
