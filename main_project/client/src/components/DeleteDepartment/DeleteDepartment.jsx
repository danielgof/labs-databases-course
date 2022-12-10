// import React from 'react'

// const DeleteDepartment = () => {
//     const [showA, setShowA] = useState(false);
//     const [showB, setShowB] = useState(false);
//     const [message, setMessage] = useState("");
//     const toggleShowA = () => setShowA(!showA);
//     const toggleShowB = () => setShowB(!showB);
//     const handleClick = async (e) => {
//       e.preventDefault();
//       try {
//       const body = JSON.stringify({
//         id: props.id
//       })
  
//       const headers = new Headers({
//           "Content-Type": "application/json",
//           "Content-Length": JSON.stringify(body).length
//       })
//         console.log(JSON.stringify({
//           id: props.id
//         }))
//         let res = await fetch("http://127.0.0.1:5000/api/v1/delete_person", {
//           method: "DELETE",
//           mode: "cors",
//           headers: headers,
//           body: body
//         });
//         // let resJson = await res.json();
//         if (res.status === 200) {
//           setMessage(`Пользователь ${props.name} был удалён из базы данных`);
//           // navigate("/home");
//         } 
//         else {
//           setMessage("Произошла ошибка при удалении пользователя");
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   return (
//     <div>
      
//     </div>
//   )
// }
// export default DeleteDepartment;