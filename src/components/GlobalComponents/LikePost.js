// import { useParams, useHistory } from "react-router";
// import { useEffect } from "react";
// import api from "../../apis/api";

// function LikePost() {
//   const params = useParams();
//   const history = useHistory();

//   useEffect(() => {
//     async function fetchLike() {
//       try {
//         const reponse = await api.post(`/likedpost/${params.id}`);
//         history.goBack();
//       } catch (err) {
//         console.log(err.reponse);
//       }
//     }
//     fetchLike();
//   }, []);

//   return <></>;
// }

// export default LikePost;
