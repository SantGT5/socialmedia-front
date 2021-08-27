import { useEffect } from "react";
import api from "../../apis/api";
import { useHistory, useParams } from "react-router";

function DeletePost() {
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    async function fetchDelete() {
      try {
        const response = await api.delete(`/deletepost/${params.id}`);
        history.goBack();
        
      } catch (err) {
        console.log(err.response);
      }
    }
    fetchDelete();
  }, []);

  return (
    <div>
      <i
        style={{
          fontSize: "6em",
          display: "flex",
          justifyContent: "center",
          marginTop: "1em",
        }}
        className="fas fa-spinner fa-spin"
      ></i>
    </div>
  );
}

export default DeletePost;
