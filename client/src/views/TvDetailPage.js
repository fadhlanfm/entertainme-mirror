import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { GET_TV, DELETE_TV, UPDATE_TV } from "../queries/tv";
import Loading from "../components/Loading";

function DetailPage() {
  const { id } = useParams();
  const history = useHistory();

  const { loading, error, data, refetch } = useQuery(GET_TV, {
    variables: { _id: id },
  });

  const [deleteTv] = useMutation(DELETE_TV);

  const [updateTv] = useMutation(UPDATE_TV);

  const [newTitle, setNewTitle] = useState("");
  const [newOverview, setNewOverview] = useState("");
  const [newPosterPath, setNewPosterPath] = useState("");
  const [newPopularity, setNewPopularity] = useState(0);
  const [newTags, setNewTags] = useState([]);

  const handleTitle = (e) => {
    setNewTitle(e.target.value);
  };
  const handleOverview = (e) => {
    setNewOverview(e.target.value);
  };
  const handlePosterPath = (e) => {
    setNewPosterPath(e.target.value);
  };
  const handlePopularity = (e) => {
    setNewPopularity(e.target.value);
  };
  const handleTags = (e) => {
    setNewTags(e.target.value);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteTv({ variables: { id } });
    toast.success("Successfully Deleted");
    history.goBack();
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = () => {
    setNewTitle(data.getTvSeriesById.title);
    setNewOverview(data.getTvSeriesById.overview);
    setNewPosterPath(data.getTvSeriesById.poster_path);
    setNewPopularity(data.getTvSeriesById.popularity);
    setNewTags(data.getTvSeriesById.tags);
    setShow(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let popular = Number(newPopularity);
    updateTv({
      variables: {
        _id: id,
        updates: {
          title: newTitle,
          overview: newOverview,
          poster_path: newPosterPath,
          popularity: popular,
          tags: newTags.split(","),
        },
      },
    });
  };
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p>Error...{error}</p>;
  }

  return (
    <>
      <div className="row">
        <div className="col">
          <img
            style={{ width: "300px", padding: "0 10px 0 20px" }}
            src={data.getTvSeriesById.poster_path}
            alt={data.getTvSeriesById._id}
          />
        </div>
        <div className="col text-left mr-3">
          <h1 className="border p-2">{data.getTvSeriesById.title}</h1>
          <h6 className="border p-2">{data.getTvSeriesById.overview}</h6>
          <h3 className="border p-2">{data.getTvSeriesById.popularity}</h3>
          <h3 className="border p-2">
            {data.getTvSeriesById.tags.map((el) => {
              return (
                <button
                  className="btn btn-success m-1"
                  disabled
                  style={{ color: "white" }}
                  key={el}
                >
                  {el}
                </button>
              );
            })}
          </h3>
          <button
            className="btn btn-secondary m-2"
            onClick={() => history.goBack()}
          >
            Back
          </button>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Tv</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label className="col-form-label">Title:</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleTitle}
                  value={newTitle}
                />
              </div>
              <div className="form-group">
                <label className="col-form-label">Overview:</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleOverview}
                  value={newOverview}
                />
              </div>
              <div className="form-group">
                <label className="col-form-label">Poster Path:</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handlePosterPath}
                  value={newPosterPath}
                />
              </div>
              <div className="form-group">
                <label className="col-form-label">Popularity:</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handlePopularity}
                  value={newPopularity}
                />
              </div>
              <div className="form-group">
                <label className="col-form-label">Tags:</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleTags}
                  value={newTags}
                />
              </div>
              <button type="submit" className="btn btn-primary m-2">
                Update
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default DetailPage;
